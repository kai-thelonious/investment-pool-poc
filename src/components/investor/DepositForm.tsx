import { FormEvent } from 'react';
import { PlusCircle } from 'lucide-react';
import { kamiTheme } from '../../constants/theme';
import { UserItem } from '../../data/mockData';

interface DepositFormProps {
  currentUser: UserItem;
  depositInput: string;
  setDepositInput: (val: string) => void;
  handleUserDeposit: (e: FormEvent) => void;
}

export default function DepositForm({
  currentUser,
  depositInput,
  setDepositInput,
  handleUserDeposit,
}: DepositFormProps) {
  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder} flex flex-col justify-between`}>
      <div>
        <h2 className="text-lg sm:text-xl font-normal mb-1 flex items-center gap-2 text-[#141413]">
          <PlusCircle className="text-[#1B365D]" size={18} /> Capital Subscription
        </h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mb-4 sm:mb-6`}>
          Submitting as <strong>{currentUser.name}</strong>.
        </p>

        <form onSubmit={handleUserDeposit} className="space-y-4 font-sans">
          <div>
            <label className={`block text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${kamiTheme.textMuted} mb-2`}>
              Subscription Amount ($)
            </label>
            <input
              type="number"
              value={depositInput}
              onChange={(e) => setDepositInput(e.target.value)}
              placeholder="e.g. 5000"
              className={`w-full ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-md py-2.5 px-3 ${kamiTheme.textPrimary} text-sm focus:outline-none focus:border-[#1B365D] transition-colors`}
            />
          </div>
          <button
            type="submit"
            className={`w-full ${kamiTheme.accentInk} ${kamiTheme.accentInkHover} text-white text-xs font-semibold tracking-wider uppercase py-3 rounded-md transition-all shadow-sm`}
          >
            Transmit Capital Request
          </button>
        </form>
      </div>

      {currentUser.pending > 0 && (
        <div className={`mt-4 sm:mt-6 p-3 rounded-lg border ${kamiTheme.accentLight} text-xs font-sans`}>
          Status: <strong>${currentUser.pending.toLocaleString()}</strong> awaiting GP review.
        </div>
      )}
    </div>
  );
}
