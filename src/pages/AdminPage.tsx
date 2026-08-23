import { FormEvent } from 'react';
import AdminView from '../components/admin/AdminView';
import { PortfolioItem, TransactionItem, UserItem } from '../data/mockData';

interface AdminPageProps {
  portfolio: PortfolioItem[];
  users: UserItem[];
  totalPendingDeposits: number;
  handleApproveDeposit: () => void;
  handleApproveSingleTransaction: (txId: string, participantName: string, amount: number) => void;
  handleRejectSingleTransaction: (txId: string, participantName: string, amount: number) => void;
  newValuationInput: string;
  setNewValuationInput: (val: string) => void;
  handleUpdateFundValue: (e: FormEvent) => void;
  dividendAmountInput: string;
  setDividendAmountInput: (value: string) => void;
  dividendQuarterInput: string;
  setDividendQuarterInput: (value: string) => void;
  dividendYieldInput: string;
  setDividendYieldInput: (value: string) => void;
  handleDeclareDividend: (e: FormEvent) => void;
  transactions: TransactionItem[];
  fundTotal: number;
}

export default function AdminPage({
  portfolio,
  users,
  totalPendingDeposits,
  handleApproveDeposit,
  handleApproveSingleTransaction,
  handleRejectSingleTransaction,
  newValuationInput,
  setNewValuationInput,
  handleUpdateFundValue,
  dividendAmountInput,
  setDividendAmountInput,
  dividendQuarterInput,
  setDividendQuarterInput,
  dividendYieldInput,
  setDividendYieldInput,
  handleDeclareDividend,
  transactions,
  fundTotal,
}: AdminPageProps) {
  return (
    <AdminView
      portfolio={portfolio}
      users={users}
      totalPendingDeposits={totalPendingDeposits}
      handleApproveDeposit={handleApproveDeposit}
      handleApproveSingleTransaction={handleApproveSingleTransaction}
      handleRejectSingleTransaction={handleRejectSingleTransaction}
      newValuationInput={newValuationInput}
      setNewValuationInput={setNewValuationInput}
      handleUpdateFundValue={handleUpdateFundValue}
      dividendAmountInput={dividendAmountInput}
      setDividendAmountInput={setDividendAmountInput}
      dividendQuarterInput={dividendQuarterInput}
      setDividendQuarterInput={setDividendQuarterInput}
      dividendYieldInput={dividendYieldInput}
      setDividendYieldInput={setDividendYieldInput}
      handleDeclareDividend={handleDeclareDividend}
      transactions={transactions}
      fundTotal={fundTotal}
    />
  );
}