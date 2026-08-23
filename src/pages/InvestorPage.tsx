import { FormEvent } from 'react';
import InvestorView from '../components/investor/InvestorView';
import { FundHistoryItem, UserItem, DividendItem } from '../data/mockData';

interface InvestorPageProps {
  fundHistory: FundHistoryItem[];
  currentUser: UserItem;
  currentUserSharePercent: number | string;
  dividends: DividendItem[];
  depositInput: string;
  setDepositInput: (val: string) => void;
  handleUserDeposit: (e: FormEvent) => void;
}

export default function InvestorPage({
  fundHistory,
  currentUser,
  currentUserSharePercent,
  dividends,
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
      depositInput={depositInput}
      setDepositInput={setDepositInput}
      handleUserDeposit={handleUserDeposit}
    />
  );
}