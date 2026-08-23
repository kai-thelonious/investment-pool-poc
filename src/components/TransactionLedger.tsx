import { kamiTheme } from '../constants/theme';
import { TransactionItem } from '../data/mockData';

interface TransactionLedgerProps {
  transactions: TransactionItem[];
}

export default function TransactionLedger({ transactions }: TransactionLedgerProps) {
  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder} shadow-sm font-sans mt-6 sm:mt-8`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-normal text-[#141413]">Transaction Ledger</h2>
          <p className={`text-[11px] sm:text-xs ${kamiTheme.textSub} mt-0.5`}>Real-time capital movement and audit history.</p>
        </div>
        <span className={`self-start sm:self-auto text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded border ${kamiTheme.accentLight}`}>
          {transactions.length} Records
        </span>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className={`border-b ${kamiTheme.cardBorder} text-[#6B6A64] uppercase tracking-wider font-semibold`}>
              <th className="pb-3 px-2.5 whitespace-nowrap">Reference ID</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Date</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Participant</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Type</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Amount</th>
              <th className="pb-3 px-2.5 text-right whitespace-nowrap">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8E6DC]/60">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#F5F4ED]/50 transition-colors">
                <td className="py-3 px-2.5 font-mono font-medium text-[#141413] whitespace-nowrap">{tx.id}</td>
                <td className="py-3 px-2.5 text-[#504E49] whitespace-nowrap">{tx.date}</td>
                <td className="py-3 px-2.5 font-medium text-[#141413] whitespace-nowrap">{tx.user}</td>
                <td className="py-3 px-2.5 text-[#504E49] whitespace-nowrap">{tx.type}</td>
                <td className="py-3 px-2.5 font-semibold text-[#141413] whitespace-nowrap">
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="py-3 px-2.5 text-right whitespace-nowrap">
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
