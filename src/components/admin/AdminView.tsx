import { FormEvent } from 'react';
import AssetBreakdownChart from './AssetBreakdownChart';
import AdminControls from './AdminControls';
import { PortfolioItem } from '../../data/mockData';

interface AdminViewProps {
  portfolio: PortfolioItem[];
  totalPendingDeposits: number;
  handleApproveDeposit: () => void;
  newValuationInput: string;
  setNewValuationInput: (value: string) => void;
  handleUpdateFundValue: (e: FormEvent) => void;
}

export default function AdminView({
  portfolio,
  totalPendingDeposits,
  handleApproveDeposit,
  newValuationInput,
  setNewValuationInput,
  handleUpdateFundValue,
}: AdminViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <AssetBreakdownChart portfolio={portfolio} />
      <AdminControls
        totalPendingDeposits={totalPendingDeposits}
        handleApproveDeposit={handleApproveDeposit}
        newValuationInput={newValuationInput}
        setNewValuationInput={setNewValuationInput}
        handleUpdateFundValue={handleUpdateFundValue}
      />
    </div>
  );
}
