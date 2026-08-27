import { Info, TrendingUp, DollarSign, Award, PieChart } from 'lucide-react';
import { kamiTheme } from '../constants/theme';
import { calculatePerformanceMetrics } from '../utils/finance';
import { TransactionItem, DividendItem } from '../data/mockData';

interface PEMetricsBarProps {
  fundNAV: number;
  transactions: TransactionItem[];
  dividends: DividendItem[];
  sharePercent?: number | string;
  title?: string;
}

export default function PEMetricsBar({
  fundNAV,
  transactions,
  dividends,
  sharePercent = 100,
  title = 'Institutional Fund Performance Metrics',
}: PEMetricsBarProps) {
  const numericShare =
    typeof sharePercent === 'string' ? parseFloat(sharePercent) || 100 : sharePercent;
  const metrics = calculatePerformanceMetrics(fundNAV, transactions, dividends, numericShare);

  return (
    <div
      className={`${kamiTheme.cardBg} p-5 rounded-xl border ${kamiTheme.cardBorder} shadow-sm font-sans space-y-4`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E8E6DC] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#1B365D] text-white rounded-md">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#141413]">
              {title}
            </h3>
            <p className="text-[11px] text-[#6B6A64]">
              Private Equity & Venture Capital standard performance benchmarks
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#E4ECF5] text-[#1B365D] rounded border border-[#1B365D]/20">
          Pro-Rata Basis: {numericShare}%
        </span>
      </div>

      {/* KPI METRIC CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* TVPI */}
        <div className="p-3.5 bg-white/70 rounded-lg border border-[#E8E6DC] relative group">
          <div className="flex items-center justify-between text-[#6B6A64] mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
              TVPI
              <Info size={11} className="text-[#1B365D] cursor-help" />
            </span>
            <PieChart size={13} className="text-[#1B365D]" />
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-[#141413]">{metrics.tvpi}x</p>
          <p className="text-[10px] text-[#6B6A64] mt-0.5">Total Value to Paid-In</p>

          {/* Tooltip */}
          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 bg-[#141413] text-white text-[10px] rounded shadow-xl z-20 pointer-events-none">
            <strong>TVPI (Total Value / Paid-In)</strong>: Measures total cumulative value (NAV +
            distributions) returned per dollar invested.
          </div>
        </div>

        {/* DPI */}
        <div className="p-3.5 bg-white/70 rounded-lg border border-[#E8E6DC] relative group">
          <div className="flex items-center justify-between text-[#6B6A64] mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
              DPI
              <Info size={11} className="text-[#1B365D] cursor-help" />
            </span>
            <Award size={13} className="text-[#1B365D]" />
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-[#141413]">{metrics.dpi}x</p>
          <p className="text-[10px] text-[#6B6A64] mt-0.5">Distributed to Paid-In</p>

          {/* Tooltip */}
          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 bg-[#141413] text-white text-[10px] rounded shadow-xl z-20 pointer-events-none">
            <strong>DPI (Distributed / Paid-In)</strong>: Measures actual realized cash
            distributions returned to capital providers.
          </div>
        </div>

        {/* MOIC */}
        <div className="p-3.5 bg-white/70 rounded-lg border border-[#E8E6DC] relative group">
          <div className="flex items-center justify-between text-[#6B6A64] mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
              MOIC / RVPI
              <Info size={11} className="text-[#1B365D] cursor-help" />
            </span>
            <DollarSign size={13} className="text-[#1B365D]" />
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-[#141413]">{metrics.moic}x</p>
          <p className="text-[10px] text-[#6B6A64] mt-0.5">Residual Value to Paid-In</p>

          {/* Tooltip */}
          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 bg-[#141413] text-white text-[10px] rounded shadow-xl z-20 pointer-events-none">
            <strong>MOIC / RVPI</strong>: Multiple on Invested Capital representing remaining
            unrealized asset valuation held in pool.
          </div>
        </div>

        {/* Net IRR */}
        <div className="p-3.5 bg-white/70 rounded-lg border border-[#E8E6DC] relative group">
          <div className="flex items-center justify-between text-[#6B6A64] mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
              Est. Net IRR
              <Info size={11} className="text-[#1B365D] cursor-help" />
            </span>
            <TrendingUp size={13} className="text-[#1B365D]" />
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-emerald-800 dark:text-emerald-400">
            {metrics.netIrr}% <span className="text-[10px] font-normal text-[#6B6A64]">p.a.</span>
          </p>
          <p className="text-[10px] text-[#6B6A64] mt-0.5">Annualized Return Rate</p>

          {/* Tooltip */}
          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 bg-[#141413] text-white text-[10px] rounded shadow-xl z-20 pointer-events-none">
            <strong>Net IRR (Internal Rate of Return)</strong>: Compound annual rate of return
            earned on invested capital over elapsed pool lifecycle.
          </div>
        </div>
      </div>
    </div>
  );
}
