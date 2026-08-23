import { FormEvent } from 'react';
import InvestorView from '../components/investor/InvestorView';
import { FundHistoryItem, UserItem, DividendItem, SectorExposureItem, RiskReturnItem } from '../data/mockData';

interface InvestorPageProps {
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

export default function InvestorPage({
  fundHistory,
  currentUser,
  currentUserSharePercent,
  dividends,
  sectors,
  riskData,
  depositInput,
  setDepositInput,
  handleUserDeposit,
}: InvestorPageProps) {
  return (
    <InvestorView
      fundHistory={fundHistory}
      currentUser={currentUser}
      currentUserSharePercent={currentUserSharePercent}
      dividends={dividends}
      sectors={sectors}
      riskData={riskData}
      depositInput={depositInput}
      setDepositInput={setDepositInput}
      handleUserDeposit={handleUserDeposit}
    />
  );
}