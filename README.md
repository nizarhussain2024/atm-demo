# ATM Bank App

A functional ATM banking application built with React and TypeScript.

## Features

- PIN authentication
- Check balance
- Withdraw funds
- Deposit funds
- Card type highlighting after successful login
- Retro CRT-style display aesthetic

## Test Accounts

| Name | PIN | Card Type | Initial Balance |
|------|-----|-----------|-----------------|
| Peter Parker | 1234 | Visa | $1,500.00 |
| Mary Jane | 5678 | Mastercard | $2,750.50 |
| Harry Osborn | 9999 | Star | $10,000.00 |
| Gwen Stacy | 1111 | Pulse | $500.25 |
| Eddie Brock | 2222 | Cirrus | $3,200.00 |
| Felicia Hardy | 3333 | Plus | $8,500.75 |

## How to Run

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
cd server
npm install
npm start
```

3. In a new terminal, start the frontend:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080` (or the port shown in your terminal)

### Important Notes

- The backend server must be running (`cd server && npm start`)
- The frontend expects the backend at `http://localhost:3001` by default
- Test accounts are created automatically in the SQLite DB on first run (`server/atm.sqlite`)

### Troubleshooting

**Backend Issues:**
- If API calls fail, verify the backend is running on port 3001
- Visit `http://localhost:3001/health` to confirm the backend is healthy
- If PINs don’t work, delete `server/atm.sqlite` and restart the backend

**Frontend Issues:**
- Restart dev server after making changes
- Check browser console for network errors

## Browser Compatibility

This application works best in modern browsers:
- Chrome (recommended) - Tested and works best
- Firefox - Fully supported
- Safari - Fully supported
- Edge - Fully supported

**Note**: The app uses modern web APIs and requires a browser with ES6+ support.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS for retro CRT effects
- **Backend**: Express.js (Node.js)
- **Data Store**: SQLite (`server/atm.sqlite`)
- **State Management**: React Hooks (useState, useCallback) - Custom `useATM` hook
- **Routing**: React Router DOM
- **UI Components**: Radix UI components (via shadcn/ui)

## Database (SQLite)

- **File**: `server/atm.sqlite` (auto-created and seeded on first backend start)
- **Table**: `accounts` (PINs stored hashed in `pin_hash`)

To inspect the DB:

```bash
cd server
sqlite3 atm.sqlite "SELECT id, name, card_type, balance FROM accounts;"
```

## Usage

1. Click the "Enter PIN" button on the welcome screen
2. Enter a 4-digit PIN using the on-screen keypad
3. After successful authentication, choose from:
   - Check Balance - View your current account balance
   - Withdraw Funds - Withdraw money from your account
   - Deposit Funds - Deposit money into your account
4. Use "Exit" to end your session or "Re-Enter PIN" to switch accounts

## Testing in Browser

### Quick Test (2 minutes)

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Open browser** → `http://localhost:8080`

3. **Quick Test Flow**:
   - Click "Enter PIN" → Enter `1234` → Should see "Hi Peter Parker!"
   - Click "Balance" → Should show `$1,500.00`
   - Click "Withdraw" → Enter `100` → Should show new balance `$1,400.00`
   - Click "Deposit" → Enter `50` → Should show new balance `$1,450.00`

### Test Account Quick Reference

| Name | PIN | Card Type | Initial Balance | Use Case |
|------|-----|-----------|-----------------|----------|
| Peter Parker | 1234 | Visa | $1,500.00 | Standard testing |
| Mary Jane | 5678 | Mastercard | $2,750.50 | General testing |
| Harry Osborn | 9999 | Star | $10,000.00 | Large balance |
| Gwen Stacy | 1111 | Pulse | $500.25 | Low balance / error testing |
| Eddie Brock | 2222 | Cirrus | $3,200.00 | Medium balance |
| Felicia Hardy | 3333 | Plus | $8,500.75 | High balance |

### Expected Behavior

- Card type logos dimmed (25% opacity) before login
- After login, matching card type highlighted (100% opacity)
- Balance updates immediately after deposit/withdrawal
- Error messages display clearly on screen
- Transaction completion shows transaction type and new balance
- PIN masked with asterisks (*) during entry

## Project Structure

```
src/
  components/
    ATM/
      ATMMachine.tsx      # Main ATM container
      ATMKeypad.tsx       # Numeric keypad
      ATMSideButton.tsx   # Physical side buttons
      ATMScreenWithButtons.tsx  # Screen layout
      screens/            # Individual screen components
  hooks/
    useATM.ts            # ATM state management hook
  assets/                # Image assets
```
