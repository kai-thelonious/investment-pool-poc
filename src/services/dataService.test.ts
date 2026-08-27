import { describe, it, expect } from 'vitest';
import { dataService } from './dataService';

describe('dataService', () => {
  it('returns fallback profiles when Supabase is unavailable', async () => {
    const result = await dataService.getProfiles();
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0]).toHaveProperty('id');
    expect(result.data[0]).toHaveProperty('name');
    expect(result.data[0]).toHaveProperty('deposited');
  });

  it('returns fund history and NAV pool valuation total', async () => {
    const result = await dataService.getFundHistory();
    expect(result.data).toBeDefined();
    expect(result.data.history.length).toBeGreaterThan(0);
    expect(typeof result.data.total).toBe('number');
  });

  it('returns transactions ledger items', async () => {
    const result = await dataService.getTransactions();
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('computes portfolio and sector exposure based on current total', async () => {
    const currentTotal = 1000000;
    const result = await dataService.getSectorsAndPortfolio(currentTotal);
    expect(result.data.portfolio.length).toBe(4);
    expect(result.data.sectors.length).toBeGreaterThan(0);

    const totalPortfolioVal = result.data.portfolio.reduce((sum, item) => sum + item.value, 0);
    expect(totalPortfolioVal).toBe(currentTotal);
  });
});
