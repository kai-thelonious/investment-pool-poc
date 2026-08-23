import { FormEvent } from 'react';
import { kamiTheme } from '../../constants/theme';

interface AdminControlsProps {
  totalPendingDeposits: number;
  handleApproveDeposit: () => void;
  newValuationInput: string;
  setNewValuationInput: (value: string) => void;
  handleUpdateFundValue: (e: FormEvent) => void;
}

export default function AdminControls({
  totalPendingDeposits,
  handleApproveDeposit,
  newValuationInput,
  setNewValuationInput,
  handleUpdateFundValue,
}: AdminControlsProps) {
  return (
    <div className="space-y-6">
      {/* Capital Clearances */}
      <div className={`${kamiTheme.cardBg} p-6 rounded-lg border ${kamiTheme.cardBorder}`}>
        <h3 className="font-normal text-lg mb-1">Capital Clearances</h3>
        <p className={`text-xs font-sans ${kamiTheme.textSub} mb-4`}>Approve incoming investor subscriptions.</p>
        {totalPendingDeposits > 0 ? (
          <div className="font-sans space-y-3">
            <div className="text-xs p-3 bg-[#F5F4ED] border border-[#E8E6DC] rounded">
              Unsettled deposits: <span className="font-bold text-[#1B365D]">${totalPendingDeposits.toLocaleString()}</span>
            </div>
            <button
              onClick={handleApproveDeposit}
              className={`w-full ${kamiTheme.accentInk} ${kamiTheme.accentInkHover} text-white text-xs font-semibold tracking-wider uppercase py-2.5 rounded transition-all shadow-sm`}
            >
              Approve & Mint Shares
            </button>
          </div>
        ) : (
          <p className={`text-xs font-sans ${kamiTheme.textMuted}`}>No pending commitments.</p>
        )}
      </div>

      {/* Fund Revaluation Form */}
      <div className={`${kamiTheme.cardBg} p-6 rounded-lg border ${kamiTheme.cardBorder}`}>
        <h3 className="font-normal text-lg mb-1">Post Valuation Mark</h3>
        <p className={`text-xs font-sans ${kamiTheme.textSub} mb-4`}>Re-evaluate aggregate net asset value.</p>
        <form onSubmit={handleUpdateFundValue} className="space-y-3 font-sans">
          <input
            type="number"
            value={newValuationInput}
            onChange={(e) => setNewValuationInput(e.target.value)}
            placeholder="New Valuation Total (e.g. 160000)"
            className={`w-full ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded py-2 px-3 text-xs ${kamiTheme.textPrimary} focus:outline-none focus:border-[#1B365D]`}
          />
          <button
            type="submit"
            className="w-full bg-[#3D3D3A] hover:bg-[#141413] text-white text-xs font-semibold tracking-wider uppercase py-2.5 rounded transition-all shadow-sm"
          >
            Post Mark to Ledger
          </button>
        </form>
      </div>
    </div>
  );
}
