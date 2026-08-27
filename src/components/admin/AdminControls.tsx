import { FormEvent } from 'react';
import { ShieldCheck, TrendingUp, DollarSign, Award, Check, X } from 'lucide-react';
import { kamiTheme } from '../../constants/theme';
import { TransactionItem } from '../../data/mockData';

interface AdminControlsProps {
  totalPendingDeposits: number;
  handleApproveDeposit: () => void;
  handleApproveSingleTransaction: (txId: string, participantName: string, amount: number) => void;
  handleRejectSingleTransaction: (txId: string, participantName: string, amount: number) => void;
  newValuationInput: string;
  setNewValuationInput: (value: string) => void;
  handleUpdateFundValue: (e: FormEvent) => void;
  dividendAmountInput: string;
  setDividendAmountInput: (value: string) => void;
  dividendQuarterInput: string;
  setDividendQuarterInput: (value: string) => void;
  dividendYieldInput: string;
  setDividendYieldInput: (value: string) => void;
  handleDeclareDividend: (e: FormEvent) => void;
  transactions: TransactionItem[];
  fundTotal: number;
}

export default function AdminControls({
  totalPendingDeposits,
  handleApproveDeposit,
  handleApproveSingleTransaction,
  handleRejectSingleTransaction,
  newValuationInput,
  setNewValuationInput,
  handleUpdateFundValue,
  dividendAmountInput,
  setDividendAmountInput,
  dividendQuarterInput,
  setDividendQuarterInput,
  dividendYieldInput,
  setDividendYieldInput,
  handleDeclareDividend,
  transactions,
  fundTotal,
}: AdminControlsProps) {
  const pendingTx = transactions.filter((t) => t.status === 'Pending Approval');
  const estimatedMgmtFee = Math.round(fundTotal * 0.02);
  const estimatedCarry = Math.round(Math.max(0, fundTotal - 100000) * 0.2);

  return (
    <div className="space-y-6">
      {/* GP Performance & Fee Metrics Card */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-sm`}
      >
        <h3 className="font-normal text-base sm:text-lg mb-1 text-[#141413] flex items-center gap-2">
          <ShieldCheck className="text-[#1B365D]" size={18} /> GP Carry & Management Fees
        </h3>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mb-4`}>
          Estimated annual General Partner economics.
        </p>

        <div className="grid grid-cols-2 gap-3 font-sans text-xs">
          <div className="p-3 bg-[#FAF9F5] border border-[#E8E6DC] rounded-lg">
            <span className="text-[#6B6A64] text-[10px] uppercase font-semibold block">
              Annual Mgmt Fee (2%)
            </span>
            <span className="font-bold text-sm text-[#141413] mt-1 block">
              ${estimatedMgmtFee.toLocaleString()}/yr
            </span>
          </div>
          <div className="p-3 bg-[#FAF9F5] border border-[#E8E6DC] rounded-lg">
            <span className="text-[#6B6A64] text-[10px] uppercase font-semibold block">
              Est. Carried Interest (20%)
            </span>
            <span className="font-bold text-sm text-emerald-700 mt-1 block">
              ${estimatedCarry.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Capital Clearances Queue */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-sm`}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-normal text-base sm:text-lg text-[#141413]">
            Capital Clearances Queue
          </h3>
          <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            {pendingTx.length} Pending
          </span>
        </div>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mb-4`}>
          Review and approve incoming LP subscription requests.
        </p>

        {pendingTx.length > 0 ? (
          <div className="font-sans space-y-3">
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {pendingTx.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 bg-[#FAF9F5] border border-[#E8E6DC] rounded-lg flex items-center justify-between gap-2 text-xs"
                >
                  <div className="truncate">
                    <span className="font-semibold text-[#141413] block truncate">{tx.user}</span>
                    <span className="text-[10px] text-[#6B6A64] font-mono block">
                      {tx.id} • {tx.date}
                    </span>
                    <span className="font-bold text-[#1B365D] block mt-0.5">
                      ${tx.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleApproveSingleTransaction(tx.id, tx.user, tx.amount)}
                      title="Approve & Mint Shares"
                      className="p-1.5 bg-[#1B365D] hover:bg-[#2D5A8A] text-white rounded transition-colors"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => handleRejectSingleTransaction(tx.id, tx.user, tx.amount)}
                      title="Reject Subscription Request"
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pendingTx.length > 1 && (
              <button
                onClick={handleApproveDeposit}
                className={`w-full ${kamiTheme.accentInk} ${kamiTheme.accentInkHover} text-white text-xs font-semibold tracking-wider uppercase py-2.5 rounded-lg transition-all shadow-sm mt-2`}
              >
                Approve All (${totalPendingDeposits.toLocaleString()})
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E8E6DC] text-center text-xs font-sans text-[#6B6A64]">
            All capital requests are settled and approved.
          </div>
        )}
      </div>

      {/* Fund Revaluation Form */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-sm`}
      >
        <h3 className="font-normal text-base sm:text-lg mb-1 text-[#141413] flex items-center gap-2">
          <TrendingUp size={18} className="text-[#1B365D]" /> Post Valuation Mark
        </h3>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mb-4`}>
          Re-evaluate aggregate net asset value.
        </p>
        <form onSubmit={handleUpdateFundValue} className="space-y-3 font-sans">
          <div className="relative">
            <DollarSign size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              value={newValuationInput}
              onChange={(e) => setNewValuationInput(e.target.value)}
              placeholder="New Valuation Total (e.g. 175000)"
              className={`w-full pl-8 ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-lg py-2.5 px-3 text-xs ${kamiTheme.textPrimary} focus:outline-none focus:border-[#1B365D]`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3D3D3A] hover:bg-[#141413] text-white text-xs font-semibold tracking-wider uppercase py-3 rounded-lg transition-all shadow-sm"
          >
            Post Mark to Ledger
          </button>
        </form>
      </div>

      {/* Issue Dividend Distribution Form */}
      <div
        className={`${kamiTheme.cardBg} p-5 sm:p-6 rounded-xl border ${kamiTheme.cardBorder} shadow-sm`}
      >
        <h3 className="font-normal text-base sm:text-lg mb-1 text-[#141413] flex items-center gap-2">
          <Award size={18} className="text-[#1B365D]" /> Declare Dividend Payout
        </h3>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mb-4`}>
          Distribute quarterly yield to pool participants.
        </p>
        <form onSubmit={handleDeclareDividend} className="space-y-3 font-sans text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-semibold uppercase text-[#6B6A64] mb-1">
                Quarter
              </label>
              <input
                type="text"
                value={dividendQuarterInput}
                onChange={(e) => setDividendQuarterInput(e.target.value)}
                placeholder="Q2 26"
                className={`w-full ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-lg py-2 px-3 focus:outline-none focus:border-[#1B365D]`}
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase text-[#6B6A64] mb-1">
                Yield %
              </label>
              <input
                type="number"
                step="0.1"
                value={dividendYieldInput}
                onChange={(e) => setDividendYieldInput(e.target.value)}
                placeholder="2.5"
                className={`w-full ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-lg py-2 px-3 focus:outline-none focus:border-[#1B365D]`}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase text-[#6B6A64] mb-1">
              Total Payout ($){' '}
              <span className="normal-case font-normal text-gray-500">
                (Leave blank to auto-compute)
              </span>
            </label>
            <input
              type="number"
              value={dividendAmountInput}
              onChange={(e) => setDividendAmountInput(e.target.value)}
              placeholder={`Auto: $${Math.round(fundTotal * ((parseFloat(dividendYieldInput) || 2.5) / 100)).toLocaleString()}`}
              className={`w-full ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#1B365D]`}
            />
          </div>

          <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E8E6DC] text-[11px] font-sans text-[#504E49] flex items-center justify-between">
            <span>Calculated Payout ({dividendYieldInput || '2.5'}% of NAV):</span>
            <span className="font-bold text-[#1B365D]">
              $
              {(dividendAmountInput
                ? parseFloat(dividendAmountInput)
                : Math.round(fundTotal * ((parseFloat(dividendYieldInput) || 2.5) / 100))
              ).toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            className={`w-full ${kamiTheme.accentInk} ${kamiTheme.accentInkHover} text-white text-xs font-semibold tracking-wider uppercase py-3 rounded-lg transition-all shadow-sm`}
          >
            Authorize & Execute Dividend Distribution
          </button>
        </form>
      </div>
    </div>
  );
}
