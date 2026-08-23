import { FormEvent } from 'react';
import AssetBreakdownChart from './AssetBreakdownChart';
import AdminControls from './AdminControls';
import { PortfolioItem, TransactionItem } from '../../data/mockData';

interface AdminViewProps {
  portfolio: PortfolioItem[];
  totalPendingDeposits: number;
  handleApproveDeposit: () => void;
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
  totalPendingDeposits,
  handleApproveDeposit,
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <AssetBreakdownChart portfolio={portfolio} />
      <AdminControls
        totalPendingDeposits={totalPendingDeposits}
        handleApproveDeposit={handleApproveDeposit}
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
  );
}
