import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, X, Eye, User } from 'lucide-react';
import { kamiTheme } from '../constants/theme';
import { TransactionItem } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface TransactionLedgerProps {
  transactions: TransactionItem[];
}

export default function TransactionLedger({ transactions }: TransactionLedgerProps) {
  const { profile } = useAuth();
  const isGP = profile?.role === 'admin';
  const currentUserName = profile?.name || 'Alice Smith';

  const [scopeFilter, setScopeFilter] = useState<'mine' | 'all'>(isGP ? 'all' : 'mine');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending Approval' | 'Cancelled'>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // 1. Filter transactions by Scope (My Transactions vs All Pool Activity)
  const scopedTransactions = transactions.filter((tx) => {
    if (scopeFilter === 'mine') {
      return tx.user.toLowerCase() === currentUserName.toLowerCase();
    }
    return true;
  });

  // 2. Filter transactions by Search Term and Status Filter
  const filteredTransactions = scopedTransactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Status Counts
  const completedCount = scopedTransactions.filter(t => t.status === 'Completed').length;
  const pendingCount = scopedTransactions.filter(t => t.status === 'Pending Approval').length;
  const cancelledCount = scopedTransactions.filter(t => t.status === 'Cancelled').length;

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: 'All' | 'Completed' | 'Pending Approval' | 'Cancelled') => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleScopeFilterChange = (scope: 'mine' | 'all') => {
    setScopeFilter(scope);
    setCurrentPage(1);
  };

  const renderParticipantName = (tx: TransactionItem) => {
    const isMine = tx.user.toLowerCase() === currentUserName.toLowerCase();
    if (isGP || isMine) {
      return (
        <span className="font-medium text-[#141413] flex items-center gap-1.5">
          {tx.user}
          {isMine && (
            <span className="text-[9px] font-bold bg-[#E4ECF5] text-[#1B365D] px-1.5 py-0.2 rounded uppercase">
              You
            </span>
          )}
        </span>
      );
    }
    // Anonymize for other LPs in 'All' scope
    return <span className="text-gray-500 font-normal italic">Syndicate LP</span>;
  };

  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder} shadow-sm font-sans mt-6 sm:mt-8 space-y-6`}>
      {/* HEADER & COUNTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6DC] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-normal text-[#141413]">Transaction Ledger</h2>
          <p className={`text-[11px] sm:text-xs ${kamiTheme.textSub} mt-0.5`}>
            Real-time capital movement and audit history.
          </p>
        </div>
        <span className={`self-start sm:self-auto text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-lg border ${kamiTheme.accentLight}`}>
          {filteredTransactions.length} of {scopedTransactions.length} Records
        </span>
      </div>

      {/* MODEL 2 SCOPE FILTER TOGGLE (My Transactions vs All Pool Activity) */}
      <div className="flex items-center gap-2 bg-[#FAF9F5] p-1.5 rounded-lg border border-[#E8E6DC] self-start w-full sm:w-auto font-sans text-xs">
        <button
          onClick={() => handleScopeFilterChange('mine')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
            scopeFilter === 'mine'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'text-[#6B6A64] hover:text-[#141413]'
          }`}
        >
          <User size={13} />
          <span>My Activity</span>
        </button>

        <button
          onClick={() => handleScopeFilterChange('all')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
            scopeFilter === 'all'
              ? 'bg-[#1B365D] text-white shadow-sm'
              : 'text-[#6B6A64] hover:text-[#141413]'
          }`}
        >
          <Eye size={13} />
          <span>All Pool Activity {isGP ? '(GP Access)' : '(Anonymized)'}</span>
        </button>
      </div>

      {/* CONTROLS: SEARCH BAR & STATUS FILTER PILLS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by ID, participant name, or transaction type..."
            className={`w-full pl-9 ${searchTerm ? 'pr-8' : 'pr-3'} ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-lg py-2 px-3 text-xs text-[#141413] focus:outline-none focus:border-[#1B365D] transition-colors`}
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold overflow-x-auto pb-1 md:pb-0">
          <span className="text-[#6B6A64] text-[10px] uppercase font-bold flex items-center gap-1 mr-1">
            <Filter size={11} /> Filter:
          </span>
          <button
            onClick={() => handleStatusFilterChange('All')}
            className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
              statusFilter === 'All'
                ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-sm'
                : 'bg-[#FAF9F5] text-[#6B6A64] border-[#E8E6DC] hover:text-[#141413]'
            }`}
          >
            All ({scopedTransactions.length})
          </button>
          <button
            onClick={() => handleStatusFilterChange('Completed')}
            className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
              statusFilter === 'Completed'
                ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-sm'
                : 'bg-[#FAF9F5] text-[#6B6A64] border-[#E8E6DC] hover:text-[#141413]'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => handleStatusFilterChange('Pending Approval')}
            className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
              statusFilter === 'Pending Approval'
                ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-sm'
                : 'bg-[#FAF9F5] text-[#6B6A64] border-[#E8E6DC] hover:text-[#141413]'
            }`}
          >
            Pending ({pendingCount})
          </button>
          {cancelledCount > 0 && (
            <button
              onClick={() => handleStatusFilterChange('Cancelled')}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                statusFilter === 'Cancelled'
                  ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-sm'
                  : 'bg-[#FAF9F5] text-[#6B6A64] border-[#E8E6DC] hover:text-[#141413]'
              }`}
            >
              Cancelled ({cancelledCount})
            </button>
          )}
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className={`border-b ${kamiTheme.cardBorder} text-[#6B6A64] uppercase tracking-wider font-semibold`}>
              <th className="pb-3 px-2.5 whitespace-nowrap">Reference ID</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Date</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Participant</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Type</th>
              <th className="pb-3 px-2.5 whitespace-nowrap">Amount</th>
              <th className="pb-3 px-2.5 text-right whitespace-nowrap">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8E6DC]/60">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F5F4ED]/50 transition-colors">
                  <td className="py-3.5 px-2.5 font-mono font-medium text-[#141413] whitespace-nowrap">{tx.id}</td>
                  <td className="py-3.5 px-2.5 text-[#504E49] whitespace-nowrap">{tx.date}</td>
                  <td className="py-3.5 px-2.5 whitespace-nowrap">{renderParticipantName(tx)}</td>
                  <td className="py-3.5 px-2.5 text-[#504E49] whitespace-nowrap">{tx.type}</td>
                  <td className="py-3.5 px-2.5 font-semibold text-[#141413] whitespace-nowrap">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-2.5 text-[#141413] text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase border ${
                        tx.status === 'Completed'
                          ? 'bg-[#E4ECF5] text-[#1B365D] border-[#1B365D]/20'
                          : tx.status === 'Pending Approval'
                          ? 'bg-amber-500/10 text-amber-800 border-amber-500/30'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-[#6B6A64]">
                  No transaction records matched your search query &quot;<strong>{searchTerm || statusFilter}</strong>&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION CONTROLS */}
      {filteredTransactions.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E6DC] text-xs font-sans">
          <span className="text-[#6B6A64] text-[11px] sm:text-xs">
            Showing <strong>{startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredTransactions.length)}</strong> of <strong>{filteredTransactions.length}</strong> records
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={safeCurrentPage === 1}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-semibold transition-all ${
                safeCurrentPage === 1
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400'
                  : 'bg-[#FAF9F5] border-[#E8E6DC] text-[#141413] hover:bg-[#E8E6DC]/40'
              }`}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            <span className="px-2.5 text-[11px] font-semibold text-[#141413]">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={safeCurrentPage >= totalPages}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-semibold transition-all ${
                safeCurrentPage >= totalPages
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400'
                  : 'bg-[#FAF9F5] border-[#E8E6DC] text-[#141413] hover:bg-[#E8E6DC]/40'
              }`}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
