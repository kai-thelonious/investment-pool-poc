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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Current User Stake Card */}
      <div className={`${kamiTheme.cardBg} p-6 rounded-lg border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}>
        <div className="flex items-center gap-3 mb-2 font-sans">
          <div className="p-2 bg-[#E4ECF5] text-[#1B365D] rounded">
            <Wallet size={20} />
          </div>
          <span className={`text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted}`}>
            {currentUser.name}'s Stake
          </span>
        </div>
        <h2 className="text-3xl font-normal mt-2">${currentUserCurrentValue.toLocaleString()}</h2>
        <p className={`text-xs font-sans ${kamiTheme.textSub} mt-2 flex items-center gap-1`}>
          <ArrowUpRight size={14} className="text-[#1B365D]" />
          <strong>{currentUserSharePercent}%</strong> allocation of total fund pool
        </p>
      </div>

      {/* Total Pool Assets Card */}
      <div className={`${kamiTheme.cardBg} p-6 rounded-lg border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}>
        <div className="flex items-center gap-3 mb-2 font-sans">
          <div className="p-2 bg-[#E4ECF5] text-[#1B365D] rounded">
            <TrendingUp size={20} />
          </div>
          <span className={`text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted}`}>Total Pool Assets</span>
        </div>
        <h2 className="text-3xl font-normal mt-2">${fundTotal.toLocaleString()}</h2>
        <p className={`text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          Net asset value across all portfolio tiers
        </p>
      </div>

      {/* Pending Capital Commitments Card */}
      <div className={`${kamiTheme.cardBg} p-6 rounded-lg border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}>
        <div className="flex items-center gap-3 mb-2 font-sans">
          <div className="p-2 bg-[#E8E6DC] text-[#3D3D3A] rounded">
            <DollarSign size={20} />
          </div>
          <span className={`text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted}`}>Pending Capital Commitments</span>
        </div>
        <h2 className="text-3xl font-normal mt-2">${totalPendingDeposits.toLocaleString()}</h2>
        <p className={`text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          {totalPendingDeposits > 0 ? 'Awaiting General Partner sign-off' : 'All subscriptions settled'}
        </p>
      </div>
    </div>
  );
}
