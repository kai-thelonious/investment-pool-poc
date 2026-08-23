import { Wallet, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { kamiTheme } from '../constants/theme';
import { UserItem } from '../data/mockData';

interface MetricCardsProps {
  currentUser: UserItem;
  currentUserCurrentValue: number;
  currentUserSharePercent: string | number;
  fundTotal: number;
  totalPendingDeposits: number;
}

export default function MetricCards({
  currentUser,
  currentUserCurrentValue,
  currentUserSharePercent,
  fundTotal,
  totalPendingDeposits,
}: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Current User Stake Card */}
      <div className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}>
        <div className="flex items-center gap-2.5 mb-1.5 font-sans">
          <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
            <Wallet size={18} />
          </div>
          <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}>
            {currentUser.name}&apos;s Stake
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">${currentUserCurrentValue.toLocaleString()}</h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2 flex items-center gap-1`}>
          <ArrowUpRight size={13} className="text-[#1B365D] shrink-0" />
          <span><strong>{currentUserSharePercent}%</strong> allocation of pool</span>
        </p>
      </div>

      {/* Total Pool Assets Card */}
      <div className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}>
        <div className="flex items-center gap-2.5 mb-1.5 font-sans">
          <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
            <TrendingUp size={18} />
          </div>
          <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}>
            Total Pool Assets
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">${fundTotal.toLocaleString()}</h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          Net asset value across portfolio tiers
        </p>
      </div>

      {/* Pending Capital Commitments Card */}
      <div className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:col-span-2 lg:col-span-1`}>
        <div className="flex items-center gap-2.5 mb-1.5 font-sans">
          <div className="p-1.5 sm:p-2 bg-[#E8E6DC] text-[#3D3D3A] rounded-md shrink-0">
            <DollarSign size={18} />
          </div>
          <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}>
            Pending Commitments
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">${totalPendingDeposits.toLocaleString()}</h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          {totalPendingDeposits > 0 ? 'Awaiting General Partner sign-off' : 'All subscriptions settled'}
        </p>
      </div>
    </div>
  );
}
