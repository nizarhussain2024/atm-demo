import React from 'react';
import { ATMScreenWithButtons } from '../ATMScreenWithButtons';

interface MainMenuScreenProps {
  userName: string;
  onWithdraw: () => void;
  onDeposit: () => void;
  onBalance: () => void;
  onReEnterPin: () => void;
  onExit: () => void;
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  userName,
  onWithdraw,
  onDeposit,
  onBalance,
  onReEnterPin,
  onExit,
}) => {
  return (
    <ATMScreenWithButtons
      leftButtons={[
        {},
        {},
        { label: 'Withdraw', onClick: onWithdraw },
        { label: 'Deposit', onClick: onDeposit },
      ]}
      rightButtons={[
        {},
        { label: 'Exit', onClick: onExit },
        { label: 'Balance', onClick: onBalance },
        { label: 'Re-Enter PIN', onClick: onReEnterPin },
      ]}
    >
      <div className="text-center w-full" style={{ paddingTop: '3px' }}>
        <h1 className="text-[12px] leading-[1.2] tracking-wide text-white font-bold" style={{ fontFamily: 'Amiga, monospace' }}>Hi {userName}!</h1>
        <p className="text-[12px] leading-[1.2] mt-1 tracking-wide text-white font-bold" style={{ fontFamily: 'Amiga, monospace' }}>Please make a choice...</p>
      </div>
    </ATMScreenWithButtons>
  );
};
