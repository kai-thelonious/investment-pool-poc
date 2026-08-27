import { supabase } from '../utils/supabase';
import {
  INITIAL_FUND_TOTAL,
  INITIAL_FUND_HISTORY,
  INITIAL_USERS,
  INITIAL_TRANSACTIONS,
  INITIAL_DIVIDENDS,
  INITIAL_RISK_RETURN_DATA,
  UserItem,
  TransactionItem,
  FundHistoryItem,
  PortfolioItem,
  DividendItem,
  SectorExposureItem,
  RiskReturnItem,
} from '../data/mockData';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface DataFetchResult<T> {
  data: T;
  isLive: boolean;
}

export const dataService = {
  /**
   * Fetch profiles/users list
   */
  async getProfiles(): Promise<DataFetchResult<UserItem[]>> {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (!error && data && data.length > 0) {
        const formatted: UserItem[] = data.map((u) => ({
          id: String(u.id),
          name: u.name || 'Anonymous',
          deposited: Number(u.deposited || 0),
          pending: Number(u.pending || 0),
        }));
        return { data: formatted, isLive: true };
      }
    } catch (err) {
      console.warn('Profiles fetch notice:', err);
    }
    return { data: INITIAL_USERS, isLive: false };
  },

  /**
   * Fetch fund history & pool NAV valuation
   */
  async getFundHistory(): Promise<DataFetchResult<{ history: FundHistoryItem[]; total: number }>> {
    try {
      const { data, error } = await supabase
        .from('fund_history')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        const history: FundHistoryItem[] = data.map((h) => ({
          date: h.quarter || h.date || 'N/A',
          value: Number(h.pool_value || h.value || 0),
        }));
        const total = history[history.length - 1].value;
        return { data: { history, total }, isLive: true };
      }
    } catch (err) {
      console.warn('Fund history fetch notice:', err);
    }
    return { data: { history: INITIAL_FUND_HISTORY, total: INITIAL_FUND_TOTAL }, isLive: false };
  },

  /**
   * Fetch transaction ledger
   */
  async getTransactions(): Promise<DataFetchResult<TransactionItem[]>> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        const formatted: TransactionItem[] = data.map((tx) => ({
          id: String(tx.id),
          date: tx.created_at
            ? tx.created_at.split('T')[0]
            : tx.date || new Date().toISOString().split('T')[0],
          user: tx.participant_name || tx.user || 'Unknown Participant',
          type: tx.type || 'Subscription',
          amount: Number(tx.amount || 0),
          status: tx.status || 'Completed',
        }));
        return { data: formatted, isLive: data.length > 0 };
      }
    } catch (err) {
      console.warn('Transactions fetch notice:', err);
    }
    return { data: INITIAL_TRANSACTIONS, isLive: false };
  },

  /**
   * Fetch or compute portfolio allocation & sector exposure
   */
  async getSectorsAndPortfolio(
    currentTotal: number
  ): Promise<DataFetchResult<{ sectors: SectorExposureItem[]; portfolio: PortfolioItem[] }>> {
    const computedPortfolio: PortfolioItem[] = [
      { name: 'US Equities', value: Math.round(currentTotal * 0.44) },
      { name: 'Global Debt Securities', value: Math.round(currentTotal * 0.26) },
      { name: 'Private Equity Stake', value: Math.round(currentTotal * 0.18) },
      { name: 'Cash Reserves', value: Math.round(currentTotal * 0.12) },
    ];

    try {
      const { data, error } = await supabase.from('sector_allocation').select('*');
      if (!error && data && data.length > 0) {
        const sectors: SectorExposureItem[] = data.map((s) => ({
          sector: s.sector,
          allocation: Number(s.allocation || 0),
          color: s.color || '#1B365D',
        }));
        return { data: { sectors, portfolio: computedPortfolio }, isLive: true };
      }
    } catch (err) {
      console.warn('Sector allocation fetch notice:', err);
    }

    const defaultSectors: SectorExposureItem[] = [
      {
        sector: 'Fintech & Payments',
        allocation: Math.round(currentTotal * 0.32),
        color: '#1B365D',
      },
      { sector: 'Enterprise SaaS', allocation: Math.round(currentTotal * 0.24), color: '#2D5A8A' },
      {
        sector: 'Clean Energy & Climate',
        allocation: Math.round(currentTotal * 0.2),
        color: '#4A7BB0',
      },
      {
        sector: 'Global Debt Securities',
        allocation: Math.round(currentTotal * 0.14),
        color: '#7EA6D0',
      },
      {
        sector: 'Cash & Short-Term Reserves',
        allocation: Math.round(currentTotal * 0.1),
        color: '#C0D5EC',
      },
    ];

    return { data: { sectors: defaultSectors, portfolio: computedPortfolio }, isLive: false };
  },

  /**
   * Fetch risk metrics
   */
  async getRiskMetrics(): Promise<DataFetchResult<RiskReturnItem[]>> {
    try {
      const { data, error } = await supabase.from('risk_metrics').select('*');
      if (!error && data && data.length > 0) {
        const formatted: RiskReturnItem[] = data.map((r) => ({
          name: r.name,
          riskScore: Number(r.risk_score || r.riskScore || 0),
          expectedYield: Number(r.expected_yield || r.expectedYield || 0),
          allocation: Number(r.allocation || 0),
        }));
        return { data: formatted, isLive: true };
      }
    } catch (err) {
      console.warn('Risk metrics fetch notice:', err);
    }
    return { data: INITIAL_RISK_RETURN_DATA, isLive: false };
  },

  /**
   * Fetch dividends
   */
  async getDividends(): Promise<DataFetchResult<DividendItem[]>> {
    try {
      const { data, error } = await supabase
        .from('dividends')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        const formatted: DividendItem[] = data.map((d) => ({
          id: d.id,
          quarter: d.quarter || 'N/A',
          totalPayout: Number(d.total_payout || d.totalPayout || 0),
          yieldPercent: Number(d.yield_percent || d.yieldPercent || 0),
          payoutDate: d.payout_date || d.payoutDate || new Date().toISOString().split('T')[0],
          status: d.status || 'Distributed',
        }));
        return { data: formatted, isLive: true };
      }
    } catch (err) {
      console.warn('Dividends fetch notice:', err);
    }
    return { data: INITIAL_DIVIDENDS, isLive: false };
  },

  /**
   * Selective Supabase Realtime Subscription helper
   */
  subscribeToTableChanges(tableName: string, onTableChange: () => void): RealtimeChannel {
    return supabase
      .channel(`realtime-${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        onTableChange();
      })
      .subscribe();
  },
};
