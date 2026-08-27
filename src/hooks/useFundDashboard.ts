import { useState } from 'react';
import { useFundData } from './useFundData';
import { useAuthProfile } from './useAuthProfile';
import { useTransactions } from './useTransactions';

export function useFundDashboard() {
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // 1. Fund NAV and Data hook
  const fundData = useFundData();

  // 2. User Profiles and Share calculation hook
  const authProfile = useAuthProfile(fundData.fundTotal);

  // 3. Transactions hook
  const txData = useTransactions(
    authProfile.currentUser,
    authProfile.users,
    authProfile.setUsers,
    fundData.setFundTotal
  );

  const isSupabaseLive =
    fundData.isFundDataLive || authProfile.isProfilesLive || txData.isTransactionsLive;

  const isSubmitting = fundData.isSubmitting || txData.isSubmitting;

  return {
    role,
    setRole,
    // Fund Data
    fundTotal: fundData.fundTotal,
    fundHistory: fundData.fundHistory,
    portfolio: fundData.portfolio,
    dividends: fundData.dividends,
    sectors: fundData.sectors,
    riskData: fundData.riskData,
    newValuationInput: fundData.newValuationInput,
    setNewValuationInput: fundData.setNewValuationInput,
    dividendAmountInput: fundData.dividendAmountInput,
    setDividendAmountInput: fundData.setDividendAmountInput,
    dividendQuarterInput: fundData.dividendQuarterInput,
    setDividendQuarterInput: fundData.setDividendQuarterInput,
    dividendYieldInput: fundData.dividendYieldInput,
    setDividendYieldInput: fundData.setDividendYieldInput,
    handleUpdateFundValue: fundData.handleUpdateFundValue,
    handleDeclareDividend: fundData.handleDeclareDividend,

    // Auth & Profile Data
    users: authProfile.users,
    activeUserId: authProfile.activeUserId,
    setActiveUserId: authProfile.setActiveUserId,
    currentUser: authProfile.currentUser,
    currentUserSharePercent: authProfile.currentUserSharePercent,
    currentUserCurrentValue: authProfile.currentUserCurrentValue,

    // Transactions Data
    transactions: txData.transactions,
    depositInput: txData.depositInput,
    setDepositInput: txData.setDepositInput,
    totalPendingDeposits: txData.totalPendingDeposits,
    handleUserDeposit: txData.handleUserDeposit,
    handleApproveDeposit: txData.handleApproveDeposit,
    handleApproveSingleTransaction: txData.handleApproveSingleTransaction,
    handleRejectSingleTransaction: txData.handleRejectSingleTransaction,

    // Status
    isSupabaseLive,
    isSubmitting,
  };
}
