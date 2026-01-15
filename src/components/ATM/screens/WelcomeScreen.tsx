import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';

interface WelcomeScreenProps {
  onEnterPin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterPin }) => {
  return (
    <ATMScreenWithButtons
      rightButtons={[
        {},
        {},
        {},
        { label: 'Enter PIN', onClick: onEnterPin },
      ]}
    >
      <div className="flex flex-col items-center justify-center h-full text-center -mt-[6px]">
        <h1 className="atm-title whitespace-pre-line">
          Welcome to the{'\n'}ATM
        </h1>
      </div>
    </ATMScreenWithButtons>
  );
};
