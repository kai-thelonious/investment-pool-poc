import { FormEvent } from 'react';
import AdminView from '../components/admin/AdminView';
import { PortfolioItem } from '../data/mockData';

interface AdminPageProps {
    portfolio: PortfolioItem[];
    totalPendingDeposits: number;
    handleApproveDeposit: () => void;
    newValuationInput: string;
    setNewValuationInput: (val: string) => void;
    handleUpdateFundValue: (e: FormEvent) => void;
}

export default function AdminPage({
    portfolio,
    totalPendingDeposits,
    handleApproveDeposit,
    newValuationInput,
    setNewValuationInput,
    handleUpdateFundValue,
}: AdminPageProps) {
    return (
        <AdminView
            portfolio={portfolio}
            totalPendingDeposits={totalPendingDeposits}
            handleApproveDeposit={handleApproveDeposit}
            newValuationInput={newValuationInput}
            setNewValuationInput={setNewValuationInput}
            handleUpdateFundValue={handleUpdateFundValue}
        />
    );
}