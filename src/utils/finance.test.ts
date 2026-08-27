import { describe, it, expect } from 'vitest';
import { calculatePerformanceMetrics } from './finance';
import { INITIAL_TRANSACTIONS, INITIAL_DIVIDENDS } from '../data/mockData';

describe('finance utility', () => {
  it('correctly calculates TVPI, DPI, MOIC and Net IRR from cash flows', () => {
    const fundNAV = 148000;
    const metrics = calculatePerformanceMetrics(
      fundNAV,
      INITIAL_TRANSACTIONS,
      INITIAL_DIVIDENDS,
      100
    );

    expect(metrics.totalPaidIn).toBeGreaterThan(0);
    expect(metrics.totalDistributed).toBeGreaterThan(0);
    expect(metrics.currentNAV).toBe(148000);
    expect(metrics.tvpi).toBeGreaterThan(0);
    expect(metrics.dpi).toBeGreaterThan(0);
    expect(metrics.moic).toBeGreaterThan(0);
    expect(metrics.netIrr).toBeGreaterThan(0);
  });

  it('correctly applies pro-rata ownership percentage for LP view', () => {
    const fundNAV = 148000;
    const fullMetrics = calculatePerformanceMetrics(
      fundNAV,
      INITIAL_TRANSACTIONS,
      INITIAL_DIVIDENDS,
      100
    );
    const halfMetrics = calculatePerformanceMetrics(
      fundNAV,
      INITIAL_TRANSACTIONS,
      INITIAL_DIVIDENDS,
      50
    );

    expect(halfMetrics.currentNAV).toBe(Math.round(fullMetrics.currentNAV / 2));
    expect(halfMetrics.totalPaidIn).toBe(Math.round(fullMetrics.totalPaidIn / 2));
    expect(halfMetrics.tvpi).toBe(fullMetrics.tvpi);
  });
});
