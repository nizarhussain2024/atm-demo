import React from 'react';
import { useATM } from '@/hooks/useATM';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PinEntryScreen } from './screens/PinEntryScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { BalanceScreen } from './screens/BalanceScreen';
import { WithdrawScreen } from './screens/WithdrawScreen';
import { DepositScreen } from './screens/DepositScreen';
import { TransactionCompleteScreen } from './screens/TransactionCompleteScreen';
import { CreditCardLogos } from './CreditCardLogos';

import atmSign from '@/assets/atm_sign.png';
import graffiti from '@/assets/graffiti.png';
import stickerGraf from '@/assets/sticker_graf.png';

export const ATMMachine: React.FC = () => {
  const atm = useATM();

  const renderScreen = () => {
    switch (atm.currentScreen) {
      case 'welcome':
        return <WelcomeScreen onEnterPin={atm.startSession} />;
      
      case 'pin-entry':
        return (
          <PinEntryScreen
            enteredPin={atm.enteredPin}
            errorMessage={atm.errorMessage}
            onDigitPress={atm.enterPinDigit}
            onClear={atm.clearPin}
            onDelete={atm.deleteLastPinDigit}
            onSubmit={atm.submitPin}
            onCancel={atm.resetATM}
          />
        );
      
      case 'main-menu':
        return (
          <MainMenuScreen
            userName={atm.currentAccount?.name || ''}
            onWithdraw={atm.goToWithdraw}
            onDeposit={atm.goToDeposit}
            onBalance={atm.goToBalance}
            onReEnterPin={atm.reEnterPin}
            onExit={atm.resetATM}
          />
        );
      
      case 'balance':
        return (
          <BalanceScreen
            balance={atm.currentAccount?.balance || 0}
            onBack={atm.goToMainMenu}
          />
        );
      
      case 'withdraw':
        return (
          <WithdrawScreen
            enteredAmount={atm.enteredAmount}
            balance={atm.currentAccount?.balance || 0}
            errorMessage={atm.errorMessage}
            onDigitPress={atm.enterAmountDigit}
            onClear={atm.clearAmount}
            onDelete={atm.deleteLastAmountDigit}
            onSubmit={atm.submitWithdrawal}
            onBack={atm.goToMainMenu}
          />
        );
      
      case 'deposit':
        return (
          <DepositScreen
            enteredAmount={atm.enteredAmount}
            errorMessage={atm.errorMessage}
            onDigitPress={atm.enterAmountDigit}
            onClear={atm.clearAmount}
            onDelete={atm.deleteLastAmountDigit}
            onSubmit={atm.submitDeposit}
            onBack={atm.goToMainMenu}
          />
        );
      
      case 'transaction-complete':
        return (
          <TransactionCompleteScreen
            transactionType={atm.lastTransaction?.type || 'withdraw'}
            amount={atm.lastTransaction?.amount || 0}
            newBalance={atm.currentAccount?.balance || 0}
            onContinue={atm.goToMainMenu}
            onExit={atm.resetATM}
          />
        );
      
      default:
        return <WelcomeScreen onEnterPin={atm.startSession} />;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* ATM Header Sign */}
      <div className="flex justify-center mb-0">
        <div className="atm-header">
          <img src={atmSign} alt="ATM Header" className="atm-header-img" />
          <img src={graffiti} alt="" className="atm-graffiti" />
        </div>
      </div>

      {/* Grayish connector between sign and body */}
      <div className="w-[390px] h-[8px] bg-[hsl(0,0%,56.1%)]" />

      {/* ATM Body */}
      <div className="bg-[#e8e4dc] rounded-b-lg shadow-2xl p-5 pt-0 pb-[41rem] w-[390px] relative">
        {/* Credit Card Logos above screen - highlight specific card type when logged in */}
        <CreditCardLogos activeCardType={atm.currentAccount?.cardType} />

        {/* Main Screen Area with buttons */}
        <div>
          {renderScreen()}
        </div>

        {/* Sticker Graffiti - positioned from top */}
        <img 
          src={stickerGraf} 
          alt="" 
          className="absolute top-[227px] left-10 w-32 h-auto z-10"
        />

        {/* Systems text - positioned absolutely */}
        <span 
          className="absolute top-[233px] left-[271px] font-['Courier_New',monospace] text-[11px] text-[#808080] font-bold tracking-wide"
          style={{ paddingTop: '13px', fontWeight: 'bold' }}
        >
          SYSTEMS
        </span>
      </div>
    </div>
  );
};
