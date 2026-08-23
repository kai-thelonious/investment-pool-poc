import { kamiTheme } from '../constants/theme';
import { TransactionItem } from '../data/mockData';

interface TransactionLedgerProps {
  transactions: TransactionItem[];
}

export default function TransactionLedger({ transactions }: TransactionLedgerProps) {
  return (
    <div className={`${kamiTheme.cardBg} p-8 rounded-lg border ${kamiTheme.cardBorder} shadow-sm font-sans mt-8`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-serif font-normal text-[#141413]">Transaction Ledger</h2>
          <p className={`text-xs ${kamiTheme.textSub} mt-0.5`}>Real-time capital movement and audit history.</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${kamiTheme.accentLight}`}>
          {transactions.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className={`border-b ${kamiTheme.cardBorder} text-[#6B6A64] uppercase tracking-wider font-semibold`}>
              <th className="pb-3 px-2">Reference ID</th>
              <th className="pb-3 px-2">Date</th>
              <th className="pb-3 px-2">Participant</th>
              <th className="pb-3 px-2">Type</th>
              <th className="pb-3 px-2">Amount</th>
              <th className="pb-3 px-2 text-right">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8E6DC]/60">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#F5F4ED]/50 transition-colors">
                <td className="py-3.5 px-2 font-mono font-medium text-[#141413]">{tx.id}</td>
                <td className="py-3.5 px-2 text-[#504E49]">{tx.date}</td>
                <td className="py-3.5 px-2 font-medium text-[#141413]">{tx.user}</td>
                <td className="py-3.5 px-2 text-[#504E49]">{tx.type}</td>
                <td className="py-3.5 px-2 font-semibold text-[#141413]">
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="py-3.5 px-2 text-right">
                  <span
                    className={`inline-block px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase border ${
                      tx.status === 'Completed'
                        ? 'bg-[#E4ECF5] text-[#1B365D] border-[#1B365D]/20'
                        : 'bg-amber-500/10 text-amber-800 border-amber-500/30'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
