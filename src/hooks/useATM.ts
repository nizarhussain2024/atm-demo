import { useState, useCallback } from 'react';
import { apiClient } from '@/integrations/api/client';

export type CardType = 'star' | 'pulse' | 'mastercard' | 'cirrus' | 'plus' | 'visa';

export interface Account {
  pin: string;
  name: string;
  balance: number;
  cardType: CardType;
}

export type ATMScreen = 
  | 'welcome' 
  | 'pin-entry' 
  | 'main-menu' 
  | 'balance' 
  | 'withdraw' 
  | 'withdraw-amount'
  | 'deposit' 
  | 'deposit-amount'
  | 'transaction-complete'
  | 'error';

// API helper function
async function callATMApi(action: string, pin?: string, amount?: number) {
  const { data, error } = await apiClient.functions.invoke('atm-api', {
    body: { action, pin, amount }
  });
  
  if (error) {
    throw new Error(error.message || 'API request failed');
  }
  
  return data;
}

export function useATM() {
  const [currentScreen, setCurrentScreen] = useState<ATMScreen>('welcome');
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastTransaction, setLastTransaction] = useState<{ type: 'withdraw' | 'deposit'; amount: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetATM = useCallback(() => {
    setCurrentScreen('welcome');
    setCurrentAccount(null);
    setEnteredPin('');
    setEnteredAmount('');
    setErrorMessage('');
    setLastTransaction(null);
  }, []);

  const startSession = useCallback(() => {
    setCurrentScreen('pin-entry');
    setEnteredPin('');
  }, []);

  const enterPinDigit = useCallback((digit: string) => {
    if (enteredPin.length < 4) {
      setEnteredPin(prev => prev + digit);
    }
  }, [enteredPin]);

  const clearPin = useCallback(() => {
    setEnteredPin('');
  }, []);

  const deleteLastPinDigit = useCallback(() => {
    setEnteredPin(prev => prev.slice(0, -1));
  }, []);

  const submitPin = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await callATMApi('login', enteredPin);
      
      if (response.success) {
        // Fetch balance after login
        const balanceResponse = await callATMApi('balance', enteredPin);
        
        setCurrentAccount({
          pin: enteredPin,
          name: response.name,
          balance: balanceResponse.balance,
          cardType: response.cardType as CardType
        });
        setCurrentScreen('main-menu');
        setErrorMessage('');
      } else {
        setErrorMessage(response.error || 'Invalid PIN. Please try again.');
        setEnteredPin('');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage('Invalid PIN. Please try again.');
      setEnteredPin('');
    } finally {
      setIsLoading(false);
    }
  }, [enteredPin]);

  const goToBalance = useCallback(async () => {
    if (!currentAccount) return;
    
    setIsLoading(true);
    try {
      const response = await callATMApi('balance', currentAccount.pin);
      if (response.success) {
        setCurrentAccount(prev => prev ? { ...prev, balance: response.balance } : null);
      }
      setCurrentScreen('balance');
    } catch (error) {
      console.error('Balance error:', error);
      setCurrentScreen('balance');
    } finally {
      setIsLoading(false);
    }
  }, [currentAccount]);

  const goToWithdraw = useCallback(() => {
    setCurrentScreen('withdraw');
    setEnteredAmount('');
  }, []);

  const goToDeposit = useCallback(() => {
    setCurrentScreen('deposit');
    setEnteredAmount('');
  }, []);

  const goToMainMenu = useCallback(() => {
    setCurrentScreen('main-menu');
    setEnteredAmount('');
    setErrorMessage('');
  }, []);

  const enterAmountDigit = useCallback((digit: string) => {
    if (enteredAmount.length < 8) {
      setEnteredAmount(prev => prev + digit);
    }
  }, [enteredAmount]);

  const clearAmount = useCallback(() => {
    setEnteredAmount('');
  }, []);

  const deleteLastAmountDigit = useCallback(() => {
    setEnteredAmount(prev => prev.slice(0, -1));
  }, []);

  const submitWithdrawal = useCallback(async () => {
    const amount = parseFloat(enteredAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }
    if (!currentAccount) return;

    setIsLoading(true);
    try {
      const response = await callATMApi('withdraw', currentAccount.pin, amount);
      
      if (response.success) {
        setCurrentAccount(prev => prev ? { ...prev, balance: response.newBalance } : null);
        setLastTransaction({ type: 'withdraw', amount });
        setCurrentScreen('transaction-complete');
        setErrorMessage('');
      } else {
        setErrorMessage(response.error || 'Withdrawal failed.');
      }
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      setErrorMessage('Withdrawal failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [enteredAmount, currentAccount]);

  const submitDeposit = useCallback(async () => {
    const amount = parseFloat(enteredAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }
    if (!currentAccount) return;

    setIsLoading(true);
    try {
      const response = await callATMApi('deposit', currentAccount.pin, amount);
      
      if (response.success) {
        setCurrentAccount(prev => prev ? { ...prev, balance: response.newBalance } : null);
        setLastTransaction({ type: 'deposit', amount });
        setCurrentScreen('transaction-complete');
        setErrorMessage('');
      } else {
        setErrorMessage(response.error || 'Deposit failed.');
      }
    } catch (error: any) {
      console.error('Deposit error:', error);
      setErrorMessage('Deposit failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [enteredAmount, currentAccount]);

  const reEnterPin = useCallback(() => {
    setCurrentAccount(null);
    setCurrentScreen('pin-entry');
    setEnteredPin('');
    setEnteredAmount('');
    setErrorMessage('');
  }, []);

  return {
    currentScreen,
    currentAccount,
    enteredPin,
    enteredAmount,
    errorMessage,
    lastTransaction,
    isLoading,
    resetATM,
    startSession,
    enterPinDigit,
    clearPin,
    deleteLastPinDigit,
    submitPin,
    goToBalance,
    goToWithdraw,
    goToDeposit,
    goToMainMenu,
    enterAmountDigit,
    clearAmount,
    deleteLastAmountDigit,
    submitWithdrawal,
    submitDeposit,
    reEnterPin,
  };
}
