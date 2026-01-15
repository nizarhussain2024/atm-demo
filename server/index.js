// Simple Express Server for ATM Demo
// Runs locally with SQLite database

const express = require('express');
const cors = require('cors');
const { DB_PATH, openDb, migrateAndSeed, findAccountByPin, updateBalanceById } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ATM API Server is running!',
    endpoints: {
      api: 'POST /api/atm-api'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy' });
});

// ATM API endpoint
app.post('/api/atm-api', async (req, res) => {
  try {
    const { action, pin, amount } = req.body;
    console.log(`ATM API: ${action}`, { pin: pin ? '****' : undefined, amount });

    switch (action) {
      case 'login': {
        if (!pin) {
          return res.status(400).json({ success: false, error: 'PIN required' });
        }

        const account = await findAccountByPin(db, pin);
        if (!account) {
          return res.status(401).json({ success: false, error: 'Invalid PIN' });
        }

        return res.json({
          success: true,
          name: account.name,
          cardType: account.card_type,
          accountId: account.id,
        });
      }

      case 'balance': {
        if (!pin) {
          return res.status(400).json({ success: false, error: 'PIN required' });
        }

        const account = await findAccountByPin(db, pin);
        if (!account) {
          return res.status(401).json({ success: false, error: 'Invalid PIN' });
        }

        return res.json({
          success: true,
          balance: parseFloat(account.balance),
        });
      }

      case 'deposit': {
        if (!pin || !amount || amount <= 0) {
          return res.status(400).json({ success: false, error: 'Invalid PIN or amount' });
        }

        const account = await findAccountByPin(db, pin);
        if (!account) {
          return res.status(401).json({ success: false, error: 'Invalid PIN' });
        }

        const newBalance = parseFloat(account.balance) + amount;
        await updateBalanceById(db, account.id, newBalance);

        return res.json({
          success: true,
          newBalance,
        });
      }

      case 'withdraw': {
        if (!pin || !amount || amount <= 0) {
          return res.status(400).json({ success: false, error: 'Invalid PIN or amount' });
        }

        const account = await findAccountByPin(db, pin);
        if (!account) {
          return res.status(401).json({ success: false, error: 'Invalid PIN' });
        }

        const currentBalance = parseFloat(account.balance);
        if (amount > currentBalance) {
          return res.status(400).json({ success: false, error: 'Insufficient funds' });
        }

        const newBalance = currentBalance - amount;
        await updateBalanceById(db, account.id, newBalance);

        return res.json({
          success: true,
          newBalance,
        });
      }

      default:
        return res.status(400).json({ success: false, error: 'Unknown action' });
    }
  } catch (error) {
    console.error('ATM API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
async function startServer() {
  db = await openDb();
  await migrateAndSeed(db);
  app.listen(PORT, () => {
    console.log(`\nATM Server running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/atm-api`);
    console.log(`SQLite DB: ${DB_PATH}\n`);
  });
}

startServer().catch(console.error);
