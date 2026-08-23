import { useState, FormEvent } from 'react';
import { TrendingUp, Award } from 'lucide-react';
import ValuationChart from './ValuationChart';
import DepositForm from './DepositForm';
import DividendsTab from './DividendsTab';
import { FundHistoryItem, UserItem, DividendItem } from '../../data/mockData';

interface InvestorViewProps {
  fundHistory: FundHistoryItem[];
  currentUser: UserItem;
  currentUserSharePercent: number | string;
  dividends: DividendItem[];
  depositInput: string;
  setDepositInput: (val: string) => void;
  handleUserDeposit: (e: FormEvent) => void;
}

export default function InvestorView({
  fundHistory,
  currentUser,
  currentUserSharePercent,
  dividends,
  depositInput,
  setDepositInput,
  handleUserDeposit,
}: InvestorViewProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'dividends'>('chart');

  return (
    <div className="space-y-4">
      {/* Sub-tab switcher for Investor View */}
      <div className="flex items-center gap-2 border-b border-[#E8E6DC] pb-3 font-sans">
        <button
          onClick={() => setActiveTab('chart')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'chart'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'bg-[#FAF9F5] text-[#6B6A64] hover:text-[#141413] border border-[#E8E6DC]'
          }`}
        >
          <TrendingUp size={15} /> Fund Valuation
        </button>
        <button
          onClick={() => setActiveTab('dividends')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dividends'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'bg-[#FAF9F5] text-[#6B6A64] hover:text-[#141413] border border-[#E8E6DC]'
          }`}
        >
          <Award size={15} /> Dividends & Yields ({dividends.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'chart' ? (
          <ValuationChart fundHistory={fundHistory} />
        ) : (
          <DividendsTab
            dividends={dividends}
            currentUser={currentUser}
            currentUserSharePercent={currentUserSharePercent}
          />
        )}

        <DepositForm
          currentUser={currentUser}
          depositInput={depositInput}
          setDepositInput={setDepositInput}
          handleUserDeposit={handleUserDeposit}
        />
      </div>
    </div>
  );
}
