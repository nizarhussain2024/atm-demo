import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';

interface TransactionCompleteScreenProps {
  transactionType: 'withdraw' | 'deposit';
  amount: number;
  newBalance: number;
  onContinue: () => void;
  onExit: () => void;
}

export const TransactionCompleteScreen: React.FC<TransactionCompleteScreenProps> = ({
  transactionType,
  amount,
  newBalance,
  onContinue,
  onExit,
}) => {
  const actionText = transactionType === 'withdraw' ? 'Withdrawn' : 'Deposited';

  return (
    <ATMScreenWithButtons
      screenType="transaction-complete"
      rightButtons={[
        {},
        { label: 'Exit', onClick: onExit },
        { label: 'Continue', onClick: onContinue },
        {},
      ]}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 
          className="leading-[1.2] mb-1 tracking-wide text-white font-bold"
          style={{ fontFamily: 'Amiga, monospace', fontSize: '12px' }}
        >
          Transaction Complete!
        </h1>
        <p 
          className="leading-[1.2] tracking-wide text-white font-bold"
          style={{ fontFamily: 'Amiga, monospace', fontSize: '12px' }}
        >
          {actionText}: ${amount.toFixed(2)}
        </p>
        <p 
          className="leading-[1.2] mt-1 tracking-wide text-white font-bold"
          style={{ fontFamily: 'Amiga, monospace', fontSize: '12px' }}
        >
          New Balance: ${newBalance.toFixed(2)}
        </p>
      </div>
    </ATMScreenWithButtons>
  );
};
