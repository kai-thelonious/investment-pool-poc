import TransactionLedger from '../components/TransactionLedger';
import { TransactionItem } from '../data/mockData';

interface LedgerPageProps {
    transactions: TransactionItem[];
}

export default function LedgerPage({ transactions }: LedgerPageProps) {
    return <TransactionLedger transactions={transactions} />;
}