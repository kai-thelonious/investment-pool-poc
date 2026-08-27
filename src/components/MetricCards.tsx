import { useLocation } from 'react-router-dom';
import { Wallet, TrendingUp, DollarSign, Award, Users, Receipt, ShieldCheck } from 'lucide-react';
import { kamiTheme } from '../constants/theme';
import { UserItem, DividendItem, TransactionItem } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface MetricCardsProps {
  currentUser: UserItem;
  currentUserCurrentValue: number;
  currentUserSharePercent: string | number;
  fundTotal: number;
  totalPendingDeposits: number;
  users: UserItem[];
  dividends: DividendItem[];
  transactions: TransactionItem[];
}

export default function MetricCards({
  currentUser,
  currentUserCurrentValue,
  currentUserSharePercent,
  fundTotal,
  totalPendingDeposits,
  users,
  dividends,
  transactions,
}: MetricCardsProps) {
  const location = useLocation();
  const path = location.pathname;
  const { profile } = useAuth();
  const isGP = profile?.role === 'admin';

  // Hide/restrict top three metric card components when viewing as an investor
  if (!isGP) {
    return null;
  }

  // Calculate Investor-specific Total Dividends Received
  const shareRatio = Number(currentUserSharePercent) / 100;
  const userDividendsEarned = dividends.reduce(
    (sum, d) => sum + Math.round(d.totalPayout * shareRatio),
    0
  );

  // Calculate Ledger-specific Total Inflows & Counts
  const completedInflows = transactions
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingTxCount = transactions.filter((t) => t.status === 'Pending Approval').length;

  // --- ROUTE 1: INVESTOR VIEW (/) ---
  if (path === '/') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 font-sans">
        {/* Investor Portfolio Value */}
        <div
          className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 font-sans">
            <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
              <Wallet size={18} />
            </div>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
            >
              {currentUser.name}&apos;s Stake
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
            ${currentUserCurrentValue.toLocaleString()}
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
            Current Net Asset Value in pool
          </p>
        </div>

        {/* Investor Ownership Share */}
        <div
          className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 font-sans">
            <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
              <TrendingUp size={18} />
            </div>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
            >
              Pool Ownership Share
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
            {currentUserSharePercent}%
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
            Pro-rata equity share of total pool
          </p>
        </div>

        {/* Investor Total Dividends Earned */}
        <div
          className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:col-span-2 lg:col-span-1`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 font-sans">
            <div className="p-1.5 sm:p-2 bg-[#E8E6DC] text-[#3D3D3A] rounded-md shrink-0">
              <Award size={18} />
            </div>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
            >
              Net Yield Distributed
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
            ${userDividendsEarned.toLocaleString()}
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
            Cumulative dividend payouts received
          </p>
        </div>
      </div>
    );
  }

  // --- ROUTE 2: GENERAL PARTNER COMMAND CENTER (/admin) ---
  if (path === '/admin') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 font-sans">
        {/* Total Fund NAV */}
        <div
          className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 font-sans">
            <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
              <TrendingUp size={18} />
            </div>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
            >
              Total Fund NAV
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
            ${fundTotal.toLocaleString()}
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
            Aggregate asset valuation under management
          </p>
        </div>

        {/* Active LP Count */}
        <div
          className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 font-sans">
            <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
              <Users size={18} />
            </div>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
            >
              Active Limited Partners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
            {users.length} LPs
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
            Verified pool equity participants
          </p>
        </div>

        {/* Unsettled Capital Clearances */}
        <div
          className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:col-span-2 lg:col-span-1`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 font-sans">
            <div className="p-1.5 sm:p-2 bg-[#E8E6DC] text-[#3D3D3A] rounded-md shrink-0">
              <DollarSign size={18} />
            </div>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
            >
              Clearance Queue
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
            ${totalPendingDeposits.toLocaleString()}
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
            {pendingTxCount > 0
              ? `${pendingTxCount} pending subscription request(s)`
              : 'Clearances queue fully settled'}
          </p>
        </div>
      </div>
    );
  }

  // --- ROUTE 3: TRANSACTION LEDGER (/ledger) ---
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 font-sans">
      {/* Total Settled Inflows */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}
      >
        <div className="flex items-center gap-2.5 mb-1.5 font-sans">
          <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
            <Receipt size={18} />
          </div>
          <span
            className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
          >
            Settled Inflows
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
          ${completedInflows.toLocaleString()}
        </h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          Total cleared capital subscriptions
        </p>
      </div>

      {/* Total Audit Records */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)]`}
      >
        <div className="flex items-center gap-2.5 mb-1.5 font-sans">
          <div className="p-1.5 sm:p-2 bg-[#E4ECF5] text-[#1B365D] rounded-md shrink-0">
            <ShieldCheck size={18} />
          </div>
          <span
            className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
          >
            Audit History
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
          {transactions.length} Entries
        </h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          Immutable transaction ledger logs
        </p>
      </div>

      {/* Unsettled Pending Queue */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:col-span-2 lg:col-span-1`}
      >
        <div className="flex items-center gap-2.5 mb-1.5 font-sans">
          <div className="p-1.5 sm:p-2 bg-[#E8E6DC] text-[#3D3D3A] rounded-md shrink-0">
            <DollarSign size={18} />
          </div>
          <span
            className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${kamiTheme.textMuted} truncate`}
          >
            Pending Approvals
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal mt-1 text-[#141413]">
          {pendingTxCount} Pending
        </h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-2`}>
          {totalPendingDeposits > 0
            ? `$${totalPendingDeposits.toLocaleString()} awaiting clearance`
            : 'No pending queue'}
        </p>
      </div>
    </div>
  );
}
