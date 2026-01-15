import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';
import { ATMKeypad } from '../ATMKeypad';

interface PinEntryScreenProps {
  enteredPin: string;
  errorMessage: string;
  onDigitPress: (digit: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const PinEntryScreen: React.FC<PinEntryScreenProps> = ({
  enteredPin,
  errorMessage,
  onDigitPress,
  onClear,
  onDelete,
  onSubmit,
  onCancel,
}) => {
  const maskedPin = '*'.repeat(enteredPin.length);

  return (
    <div className="flex flex-col items-center">
      <ATMScreenWithButtons
        rightButtons={[
          { label: 'Cancel', onClick: onCancel },
          {},
          {},
          {},
        ]}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 
            className="text-[12px] leading-[0.2] mb-2 tracking-wide text-white font-bold"
            style={{ fontFamily: 'Amiga, monospace' }}
          >
            Enter Your PIN
          </h1>
          <div 
            className="text-[12px] tracking-[0.3em] mb-2 flex items-center text-white font-bold"
            style={{ height: '0rem', position: 'relative', top: '16px', fontFamily: 'Amiga, monospace' }}
          >
            {maskedPin || '____'}
          </div>
          {errorMessage && (
            <p 
              className="text-[12px] tracking-wide text-white font-bold absolute"
              style={{ top: '109px', left: '16px', textAlign: 'center', width: 'calc(100% - 32px)', fontFamily: 'Amiga, monospace' }}
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
