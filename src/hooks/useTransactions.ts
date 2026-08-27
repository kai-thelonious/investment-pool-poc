import { useState, useEffect, useCallback, FormEvent } from 'react';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import { dataService } from '../services/dataService';
import { TRANSACTION_STATUS } from '../constants/status';
import { INITIAL_TRANSACTIONS, TransactionItem, UserItem } from '../data/mockData';

export function useTransactions(
  currentUser: UserItem,
  users: UserItem[],
  setUsers: React.Dispatch<React.SetStateAction<UserItem[]>>,
  setFundTotal: React.Dispatch<React.SetStateAction<number>>
) {
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [depositInput, setDepositInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isTransactionsLive, setIsTransactionsLive] = useState<boolean>(false);

  const loadTransactions = useCallback(async () => {
    const res = await dataService.getTransactions();
    setTransactions(res.data);
    setIsTransactionsLive(res.isLive);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTransactions();
    const channel = dataService.subscribeToTableChanges('transactions', loadTransactions);
    return () => {
      channel.unsubscribe();
    };
  }, [loadTransactions]);

  const totalPendingDeposits = users.reduce((sum, u) => sum + Number(u.pending), 0);

  const handleUserDeposit = async (e: FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositInput);
    if (!val || val <= 0 || !currentUser.id) {
      toast.error('Please enter a valid deposit amount.');
      return;
    }

    setIsSubmitting(true);

    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, pending: u.pending + val } : u))
    );

    const newTx: TransactionItem = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      user: currentUser.name,
      type: 'Subscription Request',
      amount: val,
      status: TRANSACTION_STATUS.PENDING,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setDepositInput('');

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
        status: TRANSACTION_STATUS.PENDING,
      });
      toast.success(`Subscription request of $${val.toLocaleString()} submitted for approval.`);
    } catch (err) {
      console.warn('Supabase deposit sync notice:', err);
      toast.info(`Subscription request of $${val.toLocaleString()} queued (local mode).`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveDeposit = async () => {
    if (totalPendingDeposits === 0) {
      toast.info('No pending deposits to approve.');
      return;
    }

    setIsSubmitting(true);

    setUsers((prev) =>
      prev.map((u) => ({
        ...u,
        deposited: u.deposited + u.pending,
        pending: 0,
      }))
    );

    setFundTotal((prev) => prev + totalPendingDeposits);

    setTransactions((prev) =>
      prev.map((tx) =>
        tx.status === TRANSACTION_STATUS.PENDING
          ? { ...tx, status: TRANSACTION_STATUS.COMPLETED }
          : tx
      )
    );

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
        .update({ status: TRANSACTION_STATUS.COMPLETED })
        .eq('status', TRANSACTION_STATUS.PENDING);

      toast.success(
        `Approved all pending deposits totaling $${totalPendingDeposits.toLocaleString()}.`
      );
    } catch (err) {
      console.warn('Supabase approval sync notice:', err);
      toast.info(
        `Approved pending deposits of $${totalPendingDeposits.toLocaleString()} (local mode).`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveSingleTransaction = async (
    txId: string,
    participantName: string,
    amount: number
  ) => {
    setIsSubmitting(true);
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === txId ? { ...tx, status: TRANSACTION_STATUS.COMPLETED } : tx))
    );

    const targetUser = users.find((u) => u.name === participantName);
    if (targetUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id
            ? {
                ...u,
                deposited: u.deposited + amount,
                pending: Math.max(0, u.pending - amount),
              }
            : u
        )
      );

      setFundTotal((prev) => prev + amount);

      try {
        await supabase
          .from('profiles')
          .update({
            deposited: Number(targetUser.deposited) + amount,
            pending: Math.max(0, Number(targetUser.pending) - amount),
          })
          .eq('id', targetUser.id);
      } catch (err) {
        console.warn('Profile approval sync notice:', err);
      }
    }

    try {
      await supabase
        .from('transactions')
        .update({ status: TRANSACTION_STATUS.COMPLETED })
        .eq('id', txId);
      toast.success(`Transaction ${txId} approved for ${participantName}.`);
    } catch (err) {
      console.warn('Transaction approval sync notice:', err);
      toast.info(`Transaction ${txId} approved (local mode).`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectSingleTransaction = async (
    txId: string,
    participantName: string,
    amount: number
  ) => {
    setIsSubmitting(true);
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === txId ? { ...tx, status: TRANSACTION_STATUS.CANCELLED } : tx))
    );

    const targetUser = users.find((u) => u.name === participantName);
    if (targetUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id ? { ...u, pending: Math.max(0, u.pending - amount) } : u
        )
      );

      try {
        await supabase
          .from('profiles')
          .update({
            pending: Math.max(0, Number(targetUser.pending) - amount),
          })
          .eq('id', targetUser.id);
      } catch (err) {
        console.warn('Profile rejection sync notice:', err);
      }
    }

    try {
      await supabase
        .from('transactions')
        .update({ status: TRANSACTION_STATUS.CANCELLED })
        .eq('id', txId);
      toast.error(`Transaction ${txId} rejected for ${participantName}.`);
    } catch (err) {
      console.warn('Transaction rejection sync notice:', err);
      toast.info(`Transaction ${txId} rejected (local mode).`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    transactions,
    depositInput,
    setDepositInput,
    totalPendingDeposits,
    isSubmitting,
    isTransactionsLive,
    handleUserDeposit,
    handleApproveDeposit,
    handleApproveSingleTransaction,
    handleRejectSingleTransaction,
  };
}
