import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';
import { ATMKeypad } from '../ATMKeypad';

interface DepositScreenProps {
  enteredAmount: string;
  errorMessage: string;
  onDigitPress: (digit: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const DepositScreen: React.FC<DepositScreenProps> = ({
  enteredAmount,
  errorMessage,
  onDigitPress,
  onClear,
  onDelete,
  onSubmit,
  onBack,
}) => {
  const displayAmount = enteredAmount ? `$${enteredAmount}` : '$0';

  return (
    <div className="flex flex-col items-center">
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
            Deposit Funds
          </h1>
          <p 
            className="leading-[1.2] mb-1 tracking-wide text-white font-bold"
            style={{ fontFamily: 'Amiga, monospace', fontSize: '12px' }}
          >
            {displayAmount}
          </p>
          {errorMessage && (
            <p 
              className="text-[12px] tracking-wide text-white font-bold"
              style={{ fontFamily: 'Amiga, monospace' }}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </ATMScreenWithButtons>

      {/* Keypad */}
      <ATMKeypad
        onDigitPress={onDigitPress}
        onClear={onClear}
        onEnter={onSubmit}
        onDelete={onDelete}
      />
    </div>
  );
};
