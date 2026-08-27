export interface UserItem {
  id: string;
  name: string;
  deposited: number;
  pending: number;
}

export interface FundHistoryItem {
  date: string;
  value: number;
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
  { id: 'usr-1', name: 'Alice Smith', deposited: 45000, pending: 5000 },
  { id: 'usr-2', name: 'Bob Jones', deposited: 25000, pending: 6000 },
  { id: 'usr-3', name: 'Charlie Day', deposited: 12500, pending: 3500 },
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'TX-111',
    date: '2026-08-23',
    user: 'Bob Jones',
    type: 'High-Yield Debt Request',
    amount: 6000,
    status: 'Pending Approval',
  },
  {
    id: 'TX-110',
    date: '2026-08-22',
    user: 'Charlie Day',
    type: 'Q3 Subscription Request',
    amount: 3500,
    status: 'Pending Approval',
  },
  {
    id: 'TX-109',
    date: '2026-08-20',
    user: 'Alice Smith',
    type: 'Summer Pool Top-Up',
    amount: 5000,
    status: 'Pending Approval',
  },
  {
    id: 'TX-108',
    date: '2026-08-12',
    user: 'Bob Jones',
    type: 'Debt Pool Tranche',
    amount: 7500,
    status: 'Completed',
  },
  {
    id: 'TX-107',
    date: '2026-07-05',
    user: 'Alice Smith',
    type: 'Dividend Reinvestment',
    amount: 2500,
    status: 'Completed',
  },
  {
    id: 'TX-106',
    date: '2026-06-22',
    user: 'Charlie Day',
    type: 'Q2 Top-Up',
    amount: 5000,
    status: 'Completed',
  },
  {
    id: 'TX-105',
    date: '2026-05-18',
    user: 'Bob Jones',
    type: 'Secondary Subscription',
    amount: 10000,
    status: 'Completed',
  },
  {
    id: 'TX-104',
    date: '2026-04-10',
    user: 'Alice Smith',
    type: 'Follow-on Tranche',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'TX-103',
    date: '2026-03-05',
    user: 'Charlie Day',
    type: 'Angel Subscription',
    amount: 7500,
    status: 'Completed',
  },
  {
    id: 'TX-102',
    date: '2026-02-01',
    user: 'Bob Jones',
    type: 'Seed Commitment',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'TX-101',
    date: '2026-01-15',
    user: 'Alice Smith',
    type: 'Initial Subscription',
    amount: 30000,
    status: 'Completed',
  },
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { name: 'US Equities', value: 65000 },
  { name: 'Global Debt', value: 38000 },
  { name: 'Private Equity', value: 27000 },
  { name: 'Cash Reserves', value: 18000 },
];

export const INITIAL_DIVIDENDS: DividendItem[] = [
  {
    id: 1,
    quarter: 'Q1 25',
    totalPayout: 2125,
    yieldPercent: 2.5,
    payoutDate: '2025-03-31',
    status: 'Distributed',
  },
  {
    id: 2,
    quarter: 'Q2 25',
    totalPayout: 2450,
    yieldPercent: 2.5,
    payoutDate: '2025-06-30',
    status: 'Distributed',
  },
  {
    id: 3,
    quarter: 'Q3 25',
    totalPayout: 2800,
    yieldPercent: 2.5,
    payoutDate: '2025-09-30',
    status: 'Distributed',
  },
  {
    id: 4,
    quarter: 'Q4 25',
    totalPayout: 3250,
    yieldPercent: 2.5,
    payoutDate: '2025-12-31',
    status: 'Distributed',
  },
  {
    id: 5,
    quarter: 'Q1 26',
    totalPayout: 3700,
    yieldPercent: 2.5,
    payoutDate: '2026-03-31',
    status: 'Distributed',
  },
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
