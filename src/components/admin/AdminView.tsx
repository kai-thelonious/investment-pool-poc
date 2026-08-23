import { FormEvent } from 'react';
import AssetBreakdownChart from './AssetBreakdownChart';
import LPCapitalDistributionChart from './LPCapitalDistributionChart';
import AdminControls from './AdminControls';
import { PortfolioItem, TransactionItem, UserItem } from '../../data/mockData';

interface AdminViewProps {
  portfolio: PortfolioItem[];
  users: UserItem[];
  totalPendingDeposits: number;
  handleApproveDeposit: () => void;
  handleApproveSingleTransaction: (txId: string, participantName: string, amount: number) => void;
  handleRejectSingleTransaction: (txId: string, participantName: string, amount: number) => void;
  newValuationInput: string;
  setNewValuationInput: (value: string) => void;
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

export default function AdminView({
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
}: AdminViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
      {/* Left Matrix Column: Visualizations Stack (Spans 2 Columns) */}
      <div className="lg:col-span-2 space-y-6 sm:space-y-8">
        <AssetBreakdownChart portfolio={portfolio} />
        <LPCapitalDistributionChart users={users} />
      </div>

      {/* Right Column: General Partner Controls & Command Drawers (Spans 1 Column) */}
      <div className="lg:col-span-1">
        <AdminControls
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
      </div>
    </div>
  );
}
