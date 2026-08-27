import { FormEvent } from 'react';
import InvestorView from '../components/investor/InvestorView';
import {
  FundHistoryItem,
  UserItem,
  DividendItem,
  SectorExposureItem,
  RiskReturnItem,
  TransactionItem,
} from '../data/mockData';

interface InvestorPageProps {
  fundHistory: FundHistoryItem[];
  currentUser: UserItem;
  currentUserSharePercent: number | string;
  dividends: DividendItem[];
  sectors: SectorExposureItem[];
  riskData: RiskReturnItem[];
  transactions: TransactionItem[];
  fundTotal: number;
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
  transactions,
  fundTotal,
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
      transactions={transactions}
      fundTotal={fundTotal}
      depositInput={depositInput}
      setDepositInput={setDepositInput}
      handleUserDeposit={handleUserDeposit}
    />
  );
}
