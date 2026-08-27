import { TransactionItem, DividendItem } from '../data/mockData';

export interface PerformanceMetrics {
  totalPaidIn: number;
  totalDistributed: number;
  currentNAV: number;
  tvpi: number; // Total Value to Paid-In (e.g. 1.35x)
  dpi: number; // Distributed to Paid-In (e.g. 0.18x)
  moic: number; // Multiple on Invested Capital / RVPI (e.g. 1.17x)
  netIrr: number; // Net Internal Rate of Return percentage (e.g. 18.5%)
}

/**
 * Calculates PE/VC institutional performance metrics from cash flows
 */
export function calculatePerformanceMetrics(
  fundTotalNAV: number,
  transactions: TransactionItem[],
  dividends: DividendItem[],
  sharePercent: number = 100
): PerformanceMetrics {
  const shareRatio = sharePercent / 100;

  // 1. Calculate Total Paid-In Capital (Completed subscription inflows)
  const poolPaidIn = transactions
    .filter((t) => t.status === 'Completed' || t.status === 'Completed')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalPaidIn = Math.max(1, Math.round(poolPaidIn * shareRatio));

  // 2. Calculate Total Distributions Paid Out
  const poolDistributed = dividends.reduce((sum, d) => sum + Number(d.totalPayout || 0), 0);

  const totalDistributed = Math.round(poolDistributed * shareRatio);
  const currentNAV = Math.round(fundTotalNAV * shareRatio);

  // 3. Compute Ratios
  const tvpi = (currentNAV + totalDistributed) / totalPaidIn;
  const dpi = totalDistributed / totalPaidIn;
  const moic = currentNAV / totalPaidIn;

  // 4. Estimate Annualized Net IRR based on estimated fund age (approx 2 years)
  const fundAgeYears = 1.75;
  const netIrrDecimal = Math.pow(tvpi, 1 / fundAgeYears) - 1;
  const netIrr = Number((netIrrDecimal * 100).toFixed(1));

  return {
    totalPaidIn,
    totalDistributed,
    currentNAV,
    tvpi: Number(tvpi.toFixed(2)),
    dpi: Number(dpi.toFixed(2)),
    moic: Number(moic.toFixed(2)),
    netIrr: isNaN(netIrr) || !isFinite(netIrr) ? 0 : netIrr,
  };
}
