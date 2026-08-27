import { useState, useEffect, useCallback, FormEvent } from 'react';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import { dataService } from '../services/dataService';
import {
  INITIAL_FUND_TOTAL,
  INITIAL_FUND_HISTORY,
  INITIAL_PORTFOLIO,
  INITIAL_DIVIDENDS,
  INITIAL_SECTOR_EXPOSURE,
  INITIAL_RISK_RETURN_DATA,
  FundHistoryItem,
  PortfolioItem,
  DividendItem,
  SectorExposureItem,
  RiskReturnItem,
} from '../data/mockData';

export function useFundData() {
  const [fundTotal, setFundTotal] = useState<number>(INITIAL_FUND_TOTAL);
  const [fundHistory, setFundHistory] = useState<FundHistoryItem[]>(INITIAL_FUND_HISTORY);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [dividends, setDividends] = useState<DividendItem[]>(INITIAL_DIVIDENDS);
  const [sectors, setSectors] = useState<SectorExposureItem[]>(INITIAL_SECTOR_EXPOSURE);
  const [riskData, setRiskData] = useState<RiskReturnItem[]>(INITIAL_RISK_RETURN_DATA);

  const [newValuationInput, setNewValuationInput] = useState<string>('');
  const [dividendAmountInput, setDividendAmountInput] = useState<string>('');
  const [dividendQuarterInput, setDividendQuarterInput] = useState<string>('Q2 26');
  const [dividendYieldInput, setDividendYieldInput] = useState<string>('2.5');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isFundDataLive, setIsFundDataLive] = useState<boolean>(false);

  const loadFundHistory = useCallback(async () => {
    const res = await dataService.getFundHistory();
    setFundHistory(res.data.history);
    setFundTotal(res.data.total);
    if (res.isLive) setIsFundDataLive(true);
  }, []);

  const loadDividends = useCallback(async () => {
    const res = await dataService.getDividends();
    setDividends(res.data);
    if (res.isLive) setIsFundDataLive(true);
  }, []);

  const loadSectorsAndPortfolio = useCallback(async (currentFundTotal: number) => {
    const res = await dataService.getSectorsAndPortfolio(currentFundTotal);
    setSectors(res.data.sectors);
    setPortfolio(res.data.portfolio);
    if (res.isLive) setIsFundDataLive(true);
  }, []);

  const loadRiskMetrics = useCallback(async () => {
    const res = await dataService.getRiskMetrics();
    setRiskData(res.data);
    if (res.isLive) setIsFundDataLive(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFundHistory();
    loadDividends();
    loadRiskMetrics();
  }, [loadFundHistory, loadDividends, loadRiskMetrics]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSectorsAndPortfolio(fundTotal);
  }, [fundTotal, loadSectorsAndPortfolio]);

  useEffect(() => {
    const historyChannel = dataService.subscribeToTableChanges('fund_history', loadFundHistory);
    const dividendChannel = dataService.subscribeToTableChanges('dividends', loadDividends);
    const sectorChannel = dataService.subscribeToTableChanges('sector_allocation', () =>
      loadSectorsAndPortfolio(fundTotal)
    );
    const riskChannel = dataService.subscribeToTableChanges('risk_metrics', loadRiskMetrics);

    return () => {
      historyChannel.unsubscribe();
      dividendChannel.unsubscribe();
      sectorChannel.unsubscribe();
      riskChannel.unsubscribe();
    };
  }, [loadFundHistory, loadDividends, loadSectorsAndPortfolio, loadRiskMetrics, fundTotal]);

  const handleUpdateFundValue = async (e: FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newValuationInput);
    if (!val || val <= 0) {
      toast.error('Please enter a valid NAV pool valuation.');
      return;
    }

    setIsSubmitting(true);
    const newHistoryItem: FundHistoryItem = { date: 'Current', value: val };

    setFundTotal(val);
    setFundHistory((prev) => [...prev, newHistoryItem]);
    setNewValuationInput('');

    try {
      await supabase.from('fund_history').insert({
        quarter: 'Current',
        pool_value: val,
      });
      toast.success(`Fund NAV valuation updated to $${val.toLocaleString()}.`);
    } catch (err) {
      console.warn('Supabase valuation update notice:', err);
      toast.info(`Fund NAV valuation updated to $${val.toLocaleString()} (local mode).`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeclareDividend = async (e: FormEvent) => {
    e.preventDefault();
    const yieldRate = parseFloat(dividendYieldInput) || 2.5;
    const amount = parseFloat(dividendAmountInput) || Math.round(fundTotal * (yieldRate / 100));
    if (!amount || amount <= 0 || !dividendQuarterInput) {
      toast.error('Please enter a valid dividend payout amount and quarter.');
      return;
    }

    setIsSubmitting(true);
    const newDiv: DividendItem = {
      id: Date.now(),
      quarter: dividendQuarterInput,
      totalPayout: amount,
      yieldPercent: yieldRate,
      payoutDate: new Date().toISOString().split('T')[0],
      status: 'Distributed',
    };

    setDividends((prev) => [newDiv, ...prev]);
    setDividendAmountInput('');

    try {
      await supabase.from('dividends').insert({
        quarter: dividendQuarterInput,
        total_payout: amount,
        yield_percent: yieldRate,
        payout_date: new Date().toISOString().split('T')[0],
        status: 'Distributed',
      });
      toast.success(
        `Declared ${dividendQuarterInput} dividend distribution of $${amount.toLocaleString()}.`
      );
    } catch (err) {
      console.warn('Supabase dividend declare notice:', err);
      toast.info(
        `Declared ${dividendQuarterInput} dividend distribution of $${amount.toLocaleString()} (local mode).`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fundTotal,
    setFundTotal,
    fundHistory,
    portfolio,
    dividends,
    sectors,
    riskData,
    newValuationInput,
    setNewValuationInput,
    dividendAmountInput,
    setDividendAmountInput,
    dividendQuarterInput,
    setDividendQuarterInput,
    dividendYieldInput,
    setDividendYieldInput,
    isFundDataLive,
    isSubmitting,
    handleUpdateFundValue,
    handleDeclareDividend,
  };
}
