import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';
import { ATMKeypad } from '../ATMKeypad';

interface WithdrawScreenProps {
  enteredAmount: string;
  balance: number;
  errorMessage: string;
  onDigitPress: (digit: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const WithdrawScreen: React.FC<WithdrawScreenProps> = ({
  enteredAmount,
  balance,
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
            className="text-[12px] leading-[1.2] mb-1 tracking-wide text-white font-bold"
            style={{ fontFamily: 'Amiga, monospace' }}
          >
            Withdraw Funds
          </h1>
          <p 
            className="text-[12px] leading-[1.2] mb-1 tracking-wide text-white font-bold"
            style={{ fontFamily: 'Amiga, monospace' }}
          >
            Available: ${balance.toFixed(2)}
          </p>
          <p 
            className="text-[12px] leading-[1.2] mb-1 tracking-wide text-white font-bold"
            style={{ fontFamily: 'Amiga, monospace' }}
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
