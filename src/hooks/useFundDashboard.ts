import { useState, useEffect, useCallback, FormEvent } from 'react';
import { supabase } from '../utils/supabase';
import {
  INITIAL_FUND_TOTAL,
  INITIAL_FUND_HISTORY,
  INITIAL_USERS,
  INITIAL_TRANSACTIONS,
  INITIAL_PORTFOLIO,
  INITIAL_DIVIDENDS,
  INITIAL_SECTOR_EXPOSURE,
  INITIAL_RISK_RETURN_DATA,
  UserItem,
  TransactionItem,
  FundHistoryItem,
  PortfolioItem,
  DividendItem,
  SectorExposureItem,
  RiskReturnItem,
} from '../data/mockData';

export function useFundDashboard() {
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // Overall Fund State
  const [fundTotal, setFundTotal] = useState<number>(INITIAL_FUND_TOTAL);
  const [fundHistory, setFundHistory] = useState<FundHistoryItem[]>(INITIAL_FUND_HISTORY);

  // Multi-user state
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [activeUserId, setActiveUserId] = useState<string>('usr-1');

  // Transaction Ledger Data
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);

  // Portfolio Allocation
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);

  // Quarterly Dividends Data
  const [dividends, setDividends] = useState<DividendItem[]>(INITIAL_DIVIDENDS);

  // Sector Exposure & Risk Metrics Data
  const [sectors, setSectors] = useState<SectorExposureItem[]>(INITIAL_SECTOR_EXPOSURE);
  const [riskData, setRiskData] = useState<RiskReturnItem[]>(INITIAL_RISK_RETURN_DATA);

  // Form inputs state
  const [depositInput, setDepositInput] = useState<string>('');
  const [newValuationInput, setNewValuationInput] = useState<string>('');

  // Supabase Live Status
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(false);

  // --- DATA LOADER ---
  const loadData = useCallback(async () => {
    let hasLiveSupabaseData = false;
    try {
      // 1. Fetch Users / Profiles
      const { data: userData, error: userError } = await supabase.from('profiles').select('*');
      if (!userError && userData && userData.length > 0) {
        hasLiveSupabaseData = true;
        const formattedUsers: UserItem[] = userData.map(u => ({
          id: String(u.id),
          name: u.name || 'Anonymous',
          deposited: Number(u.deposited || 0),
          pending: Number(u.pending || 0),
        }));
        setUsers(formattedUsers);
        setActiveUserId(prev => (prev && formattedUsers.some(u => u.id === prev) ? prev : formattedUsers[0].id));
      }

      // 2. Fetch Fund History
      const { data: historyData, error: historyError } = await supabase
        .from('fund_history')
        .select('*')
        .order('id', { ascending: true });

      if (!historyError && historyData && historyData.length > 0) {
        hasLiveSupabaseData = true;
        const formattedHistory: FundHistoryItem[] = historyData.map(h => ({
          date: h.quarter || h.date || 'N/A',
          value: Number(h.pool_value || h.value || 0),
        }));
        setFundHistory(formattedHistory);
        setFundTotal(formattedHistory[formattedHistory.length - 1].value);
      }

      // 3. Fetch Transactions
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*');

      if (!txError && txData) {
        if (txData.length > 0) {
          hasLiveSupabaseData = true;
          const formattedTx: TransactionItem[] = txData.map(tx => ({
            id: String(tx.id),
            date: tx.created_at ? tx.created_at.split('T')[0] : tx.date || new Date().toISOString().split('T')[0],
            user: tx.participant_name || tx.user || 'Unknown Participant',
            type: tx.type || 'Subscription',
            amount: Number(tx.amount || 0),
            status: tx.status || 'Completed',
          }));
          setTransactions(formattedTx);
        } else {
          // If Supabase is live but transactions is empty, reset to empty list
          setTransactions([]);
        }
      }

      // 4. Compute Portfolio breakdown from fundTotal
      const currentTotal = historyData && historyData.length > 0 
        ? Number(historyData[historyData.length - 1].pool_value)
        : INITIAL_FUND_TOTAL;

      setPortfolio([
        { name: 'US Equities', value: Math.round(currentTotal * 0.44) },
        { name: 'Global Debt Securities', value: Math.round(currentTotal * 0.26) },
        { name: 'Private Equity Stake', value: Math.round(currentTotal * 0.18) },
        { name: 'Cash Reserves', value: Math.round(currentTotal * 0.12) },
      ]);

      setSectors([
        { sector: 'Fintech & Payments', allocation: Math.round(currentTotal * 0.32), color: '#1B365D' },
        { sector: 'Enterprise SaaS', allocation: Math.round(currentTotal * 0.24), color: '#2D5A8A' },
        { sector: 'Clean Energy & Climate', allocation: Math.round(currentTotal * 0.20), color: '#4A7BB0' },
        { sector: 'Global Debt Securities', allocation: Math.round(currentTotal * 0.14), color: '#7EA6D0' },
        { sector: 'Cash & Short-Term Reserves', allocation: Math.round(currentTotal * 0.10), color: '#C0D5EC' },
      ]);

      // 5. Fetch Sector Allocation from Supabase if table exists
      const { data: sectorData, error: sectorErr } = await supabase
        .from('sector_allocation')
        .select('*');

      if (!sectorErr && sectorData && sectorData.length > 0) {
        hasLiveSupabaseData = true;
        setSectors(
          sectorData.map(s => ({
            sector: s.sector,
            allocation: Number(s.allocation || 0),
            color: s.color || '#1B365D',
          }))
        );
      }

      // 6. Fetch Risk Metrics from Supabase if table exists
      const { data: riskMetricsData, error: riskErr } = await supabase
        .from('risk_metrics')
        .select('*');

      if (!riskErr && riskMetricsData && riskMetricsData.length > 0) {
        hasLiveSupabaseData = true;
        setRiskData(
          riskMetricsData.map(r => ({
            name: r.name,
            riskScore: Number(r.risk_score || r.riskScore || 0),
            expectedYield: Number(r.expected_yield || r.expectedYield || 0),
            allocation: Number(r.allocation || 0),
          }))
        );
      }

      // 7. Fetch Dividends if table exists
      const { data: dividendData, error: dividendError } = await supabase
        .from('dividends')
        .select('*')
        .order('id', { ascending: true });

      if (!dividendError && dividendData && dividendData.length > 0) {
        hasLiveSupabaseData = true;
        const formattedDividends: DividendItem[] = dividendData.map(d => ({
          id: d.id,
          quarter: d.quarter || 'N/A',
          totalPayout: Number(d.total_payout || d.totalPayout || 0),
          yieldPercent: Number(d.yield_percent || d.yieldPercent || 0),
          payoutDate: d.payout_date || d.payoutDate || new Date().toISOString().split('T')[0],
          status: d.status || 'Distributed',
        }));
        setDividends(formattedDividends);
      }

      setIsSupabaseLive(hasLiveSupabaseData);
    } catch (err) {
      console.warn('Supabase fetch notice: using fallback local state', err);
      setIsSupabaseLive(false);
    }
  }, []);

  // --- SUPABASE DATA FETCHING & REALTIME SUBSCRIPTION ---
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();

    // Attach WebSocket listener for table mutations
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fund_history' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dividends' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sector_allocation' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'risk_metrics' }, () => loadData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData]);

  // --- COMPUTED PROPERTIES ---
  const currentUser: UserItem = users.find(u => u.id === activeUserId) || users[0] || {
    id: 'usr-1',
    name: 'Alice Smith',
    deposited: 0,
    pending: 0,
  };

  const totalCapitalDeposited = users.reduce((sum, u) => sum + Number(u.deposited), 0);

  const currentUserSharePercent = totalCapitalDeposited > 0
    ? ((currentUser.deposited / totalCapitalDeposited) * 100).toFixed(1)
    : 0;

  const currentUserCurrentValue = Math.round((fundTotal * Number(currentUserSharePercent)) / 100);

  const totalPendingDeposits = users.reduce((sum, u) => sum + Number(u.pending), 0);

  // --- HANDLERS / ACTIONS ---
  const handleUserDeposit = async (e: FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositInput);
    if (!val || val <= 0 || !currentUser.id) return;

    // Local Optimistic Update
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, pending: u.pending + val } : u))
    );

    const newTx: TransactionItem = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      user: currentUser.name,
      type: 'Subscription Request',
      amount: val,
      status: 'Pending Approval',
    };

    setTransactions(prev => [newTx, ...prev]);
    setDepositInput('');

    // Persist to Supabase
    try {
      await supabase
        .from('profiles')
        .update({ pending: Number(currentUser.pending) + val })
        .eq('id', currentUser.id);

      await supabase.from('transactions').insert({
        id: newTx.id,
        user_id: currentUser.id,
        participant_name: currentUser.name,
        type: 'Subscription Request',
        amount: val,
        status: 'Pending Approval',
      });
    } catch (err) {
      console.warn('Supabase deposit sync notice:', err);
    }
  };

  const handleApproveDeposit = async () => {
    if (totalPendingDeposits === 0) return;

    // Local Optimistic Update
    setUsers(prev =>
      prev.map(u => ({
        ...u,
        deposited: u.deposited + u.pending,
        pending: 0,
      }))
    );

    setFundTotal(prev => prev + totalPendingDeposits);

    setTransactions(prev =>
      prev.map(tx => (tx.status === 'Pending Approval' ? { ...tx, status: 'Completed' } : tx))
    );

    // Persist to Supabase
    try {
      for (const u of users) {
        if (u.pending > 0) {
          await supabase
            .from('profiles')
            .update({
              deposited: Number(u.deposited) + Number(u.pending),
              pending: 0,
            })
            .eq('id', u.id);
        }
      }

      await supabase
        .from('transactions')
        .update({ status: 'Completed' })
        .eq('status', 'Pending Approval');
    } catch (err) {
      console.warn('Supabase approval sync notice:', err);
    }
  };

  const handleUpdateFundValue = async (e: FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newValuationInput);
    if (!val || val <= 0) return;

    const newHistoryItem: FundHistoryItem = { date: 'Current', value: val };

    // Local Optimistic Update
    setFundTotal(val);
    setFundHistory(prev => [...prev, newHistoryItem]);
    setNewValuationInput('');

    // Persist to Supabase
    try {
      await supabase.from('fund_history').insert({
        quarter: 'Current',
        pool_value: val,
      });
    } catch (err) {
      console.warn('Supabase valuation update notice:', err);
    }
  };

  return {
    role,
    setRole,
    fundTotal,
    fundHistory,
    users,
    activeUserId,
    setActiveUserId,
    currentUser,
    currentUserSharePercent,
    currentUserCurrentValue,
    totalPendingDeposits,
    transactions,
    portfolio,
    dividends,
    sectors,
    riskData,
    depositInput,
    setDepositInput,
    newValuationInput,
    setNewValuationInput,
    isSupabaseLive,
    handleUserDeposit,
    handleApproveDeposit,
    handleUpdateFundValue,
  };
}