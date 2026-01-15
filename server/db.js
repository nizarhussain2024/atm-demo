const path = require("path");
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const DB_PATH = path.join(__dirname, "atm.sqlite");

async function openDb() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
}

async function migrateAndSeed(db) {
  await db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      pin_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      balance REAL NOT NULL DEFAULT 0,
      card_type TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const row = await db.get("SELECT COUNT(*) AS count FROM accounts");
  if ((row?.count ?? 0) > 0) return;

  const now = new Date().toISOString();
  const seed = [
    { id: "1", pin: "1234", name: "Peter Parker", balance: 1500.0, card_type: "visa" },
    { id: "2", pin: "5678", name: "Mary Jane", balance: 2750.5, card_type: "mastercard" },
    { id: "3", pin: "9999", name: "Harry Osborn", balance: 10000.0, card_type: "star" },
    { id: "4", pin: "1111", name: "Gwen Stacy", balance: 500.25, card_type: "pulse" },
    { id: "5", pin: "2222", name: "Eddie Brock", balance: 3200.0, card_type: "cirrus" },
    { id: "6", pin: "3333", name: "Felicia Hardy", balance: 8500.75, card_type: "plus" },
  ];

  await db.exec("BEGIN");
  try {
    for (const a of seed) {
      const pin_hash = await bcrypt.hash(a.pin, 10);
      await db.run(
        `INSERT INTO accounts (id, pin_hash, name, balance, card_type, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [a.id, pin_hash, a.name, a.balance, a.card_type, now, now]
      );
    }
    await db.exec("COMMIT");
  } catch (e) {
    await db.exec("ROLLBACK");
    throw e;
  }
}

async function findAccountByPin(db, pin) {
  const accounts = await db.all("SELECT id, name, balance, card_type, pin_hash FROM accounts");
  for (const account of accounts) {
    const isMatch = await bcrypt.compare(pin, account.pin_hash);
    if (isMatch) return account;
  }
  return null;
}

async function updateBalanceById(db, accountId, newBalance) {
  const now = new Date().toISOString();
  await db.run(
    "UPDATE accounts SET balance = ?, updated_at = ? WHERE id = ?",
    [newBalance, now, accountId]
  );
}

module.exports = {
  DB_PATH,
  openDb,
  migrateAndSeed,
  findAccountByPin,
  updateBalanceById,
};

