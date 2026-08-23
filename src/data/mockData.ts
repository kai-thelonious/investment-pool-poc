export interface FundHistoryItem {
  date: string;
  value: number;
}

export interface UserItem {
  id: string;
  name: string;
  deposited: number;
  pending: number;
}

export interface TransactionItem {
  id: string;
  date: string;
  user: string;
  type: string;
  amount: number;
  status: string;
}

export interface PortfolioItem {
  name: string;
  value: number;
}

export interface DividendItem {
  id: string | number;
  quarter: string;
  totalPayout: number;
  yieldPercent: number;
  payoutDate: string;
  status: string;
}

export interface SectorExposureItem {
  sector: string;
  allocation: number;
  color: string;
}

export interface RiskReturnItem {
  name: string;
  riskScore: number;
  expectedYield: number;
  allocation: number;
}

export const INITIAL_FUND_TOTAL: number = 148000;

export const INITIAL_FUND_HISTORY: FundHistoryItem[] = [
  { date: 'Q1 25', value: 85000 },
  { date: 'Q2 25', value: 98000 },
  { date: 'Q3 25', value: 112000 },
  { date: 'Q4 25', value: 130000 },
  { date: 'Q1 26', value: 148000 },
];

export const INITIAL_USERS: UserItem[] = [
  { id: 'usr-1', name: '[MOCK] Alice Smith', deposited: 45000, pending: 0 },
  { id: 'usr-2', name: '[MOCK] Bob Jones', deposited: 25000, pending: 0 },
  { id: 'usr-3', name: '[MOCK] Charlie Day', deposited: 12500, pending: 0 },
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  { id: 'TX-104', date: '2026-03-01', user: '[MOCK] Alice Smith', type: 'Subscription', amount: 15000, status: 'Completed' },
  { id: 'TX-103', date: '2026-02-15', user: '[MOCK] Bob Jones', type: 'Subscription', amount: 25000, status: 'Completed' },
  { id: 'TX-102', date: '2026-01-10', user: '[MOCK] Charlie Day', type: 'Subscription', amount: 12500, status: 'Completed' },
  { id: 'TX-101', date: '2026-01-01', user: '[MOCK] Alice Smith', type: 'Initial Deposit', amount: 30000, status: 'Completed' },
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { name: '[MOCK] US Equities', value: 65000 },
  { name: '[MOCK] Global Debt', value: 38000 },
  { name: '[MOCK] Private Equity', value: 27000 },
  { name: '[MOCK] Cash Reserves', value: 18000 },
];

export const INITIAL_DIVIDENDS: DividendItem[] = [
  { id: 1, quarter: 'Q1 25', totalPayout: 2125, yieldPercent: 2.5, payoutDate: '2025-03-31', status: 'Distributed' },
  { id: 2, quarter: 'Q2 25', totalPayout: 2450, yieldPercent: 2.5, payoutDate: '2025-06-30', status: 'Distributed' },
  { id: 3, quarter: 'Q3 25', totalPayout: 2800, yieldPercent: 2.5, payoutDate: '2025-09-30', status: 'Distributed' },
  { id: 4, quarter: 'Q4 25', totalPayout: 3250, yieldPercent: 2.5, payoutDate: '2025-12-31', status: 'Distributed' },
  { id: 5, quarter: 'Q1 26', totalPayout: 3700, yieldPercent: 2.5, payoutDate: '2026-03-31', status: 'Distributed' },
];

export const INITIAL_SECTOR_EXPOSURE: SectorExposureItem[] = [
  { sector: 'Fintech & Payments', allocation: 48000, color: '#1B365D' },
  { sector: 'Enterprise SaaS', allocation: 35000, color: '#2D5A8A' },
  { sector: 'Clean Energy & Climate', allocation: 32000, color: '#4A7BB0' },
  { sector: 'Global Debt Securities', allocation: 30000, color: '#7EA6D0' },
  { sector: 'Cash & Short-Term Reserves', allocation: 20000, color: '#C0D5EC' },
];

export const INITIAL_RISK_RETURN_DATA: RiskReturnItem[] = [
  { name: 'US Core Equities Fund', riskScore: 4.2, expectedYield: 12.5, allocation: 65000 },
  { name: 'SaaS Growth Venture', riskScore: 7.8, expectedYield: 22.0, allocation: 27000 },
  { name: 'Global High-Yield Debt', riskScore: 3.5, expectedYield: 7.8, allocation: 38000 },
  { name: 'Short-Term Cash Reserves', riskScore: 1.1, expectedYield: 4.5, allocation: 18000 },
];
