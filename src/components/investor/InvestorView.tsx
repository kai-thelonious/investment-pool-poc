import { useState, FormEvent } from 'react';
import { TrendingUp, Award, BarChart2 } from 'lucide-react';
import ValuationChart from './ValuationChart';
import DepositForm from './DepositForm';
import DividendsTab from './DividendsTab';
import SectorExposureChart from '../analytics/SectorExposureChart';
import RiskReturnScatterChart from '../analytics/RiskReturnScatterChart';
import {
  FundHistoryItem,
  UserItem,
  DividendItem,
  SectorExposureItem,
  RiskReturnItem,
} from '../../data/mockData';

interface InvestorViewProps {
  fundHistory: FundHistoryItem[];
  currentUser: UserItem;
  currentUserSharePercent: number | string;
  dividends: DividendItem[];
  sectors: SectorExposureItem[];
  riskData: RiskReturnItem[];
  depositInput: string;
  setDepositInput: (val: string) => void;
  handleUserDeposit: (e: FormEvent) => void;
}

export default function InvestorView({
  fundHistory,
  currentUser,
  currentUserSharePercent,
  dividends,
  sectors,
  riskData,
  depositInput,
  setDepositInput,
  handleUserDeposit,
}: InvestorViewProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'dividends' | 'analytics'>('chart');

  return (
    <div className="space-y-4">
      {/* Sub-tab switcher for Investor View */}
      <div className="flex items-center gap-2 border-b border-[#E8E6DC] pb-3 font-sans overflow-x-auto">
        <button
          onClick={() => setActiveTab('chart')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'chart'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'bg-[#FAF9F5] text-[#6B6A64] hover:text-[#141413] border border-[#E8E6DC]'
          }`}
        >
          <TrendingUp size={14} /> Fund Valuation
        </button>

        <button
          onClick={() => setActiveTab('dividends')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'dividends'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'bg-[#FAF9F5] text-[#6B6A64] hover:text-[#141413] border border-[#E8E6DC]'
          }`}
        >
          <Award size={14} /> Dividends & Yields ({dividends.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'bg-[#FAF9F5] text-[#6B6A64] hover:text-[#141413] border border-[#E8E6DC]'
          }`}
        >
          <BarChart2 size={14} /> Sector & Risk Analytics
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {activeTab === 'chart' && <ValuationChart fundHistory={fundHistory} />}

        {activeTab === 'dividends' && (
          <DividendsTab
            dividends={dividends}
            currentUser={currentUser}
            currentUserSharePercent={currentUserSharePercent}
          />
        )}

        {activeTab === 'analytics' && (
          <div className="lg:col-span-2 space-y-6">
            <SectorExposureChart sectors={sectors} />
            <RiskReturnScatterChart items={riskData} />
          </div>
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
