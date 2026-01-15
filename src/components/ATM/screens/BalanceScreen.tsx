import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';

interface BalanceScreenProps {
  balance: number;
  onBack: () => void;
}

export const BalanceScreen: React.FC<BalanceScreenProps> = ({ balance, onBack }) => {
  return (
    <ATMScreenWithButtons
      rightButtons={[
        {},
        { label: 'Back', onClick: onBack },
        {},
        {},
      ]}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 
          className="leading-[1.2] mb-2 tracking-wide text-white font-bold"
          style={{ fontFamily: 'Amiga, monospace', fontSize: '12px' }}
        >
          Your Balance
        </h1>
        <p 
          className="leading-[1.2] tracking-wide text-white font-bold"
          style={{ fontFamily: 'Amiga, monospace', fontSize: '12px' }}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </ATMScreenWithButtons>
  );
};
