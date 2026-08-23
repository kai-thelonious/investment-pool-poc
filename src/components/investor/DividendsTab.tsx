import { DollarSign, Award } from 'lucide-react';
import { kamiTheme } from '../../constants/theme';
import { DividendItem, UserItem } from '../../data/mockData';

interface DividendsTabProps {
  dividends: DividendItem[];
  currentUser: UserItem;
  currentUserSharePercent: number | string;
}

export default function DividendsTab({
  dividends,
  currentUser,
  currentUserSharePercent,
}: DividendsTabProps) {
  const shareNum = Number(currentUserSharePercent) || 0;
  const totalUserDividends = dividends.reduce(
    (sum, d) => sum + Math.round((d.totalPayout * shareNum) / 100),
    0
  );

  return (
    <div className={`lg:col-span-2 ${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-normal flex items-center gap-2 text-[#141413]">
            <Award className="text-[#1B365D]" size={18} /> Quarterly Yield & Dividends
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-0.5`}>
            Historical yield distributions and {currentUser.name}&apos;s pro-rata allocation ({shareNum}%).
          </p>
        </div>
        <div className="self-start sm:self-auto flex items-center gap-1.5 bg-[#E4ECF5] text-[#1B365D] px-3 py-1.5 rounded-lg border border-[#1B365D]/20 text-xs font-sans font-semibold">
          <DollarSign size={14} />
          Total Received: ${totalUserDividends.toLocaleString()}
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className={`border-b ${kamiTheme.cardBorder} text-[#6B6A64] uppercase tracking-wider font-semibold`}>
              <th className="pb-3 px-2.5 whitespace-nowrap">Quarter</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Payout Date</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Yield Rate</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Pool Payout</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Your Share ({shareNum}%)</th>
              <th className="pb-3 px-2.5 text-right whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E6DC]/60">
            {dividends.map((div) => {
              const userCut = Math.round((div.totalPayout * shareNum) / 100);
              return (
                <tr key={div.id} className="hover:bg-[#F5F4ED]/50 transition-colors">
                  <td className="py-3 px-2.5 font-mono font-medium text-[#141413] whitespace-nowrap">{div.quarter}</td>
                  <td className="py-3 px-2.5 text-[#504E49] whitespace-nowrap">{div.payoutDate}</td>
                  <td className="py-3 px-2.5 font-semibold text-[#1B365D] whitespace-nowrap">{div.yieldPercent}%</td>
                  <td className="py-3 px-2.5 text-[#141413] whitespace-nowrap">${div.totalPayout.toLocaleString()}</td>
                  <td className="py-3 px-2.5 font-bold text-[#141413] whitespace-nowrap">${userCut.toLocaleString()}</td>
                  <td className="py-3 px-2.5 text-right whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase border bg-[#E4ECF5] text-[#1B365D] border-[#1B365D]/20">
                      {div.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
