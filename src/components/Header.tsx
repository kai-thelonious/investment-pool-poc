import { User, Shield, Users, FileText, Database, LogOut } from 'lucide-react';
import { kamiTheme } from '../constants/theme';
import { UserItem } from '../data/mockData';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface HeaderProps {
  activeUserId: string;
  setActiveUserId: (id: string) => void;
  users: UserItem[];
  isSupabaseLive?: boolean;
}

export default function Header({ activeUserId, setActiveUserId, users, isSupabaseLive }: HeaderProps) {
  const { profile, signOut } = useAuth(); // Consume profile and signOut

  return (
    <header className="max-w-7xl mx-auto mb-10 pb-6 border-b border-[#E8E6DC] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B365D]"></span>
          <span className={`text-xs uppercase tracking-widest font-sans font-semibold ${kamiTheme.textSub}`}>
            Editorial Fund Report
          </span>
        </div>
        <h1 className="text-4xl font-normal tracking-tight">Apex Syndicate Pool</h1>
      </div>

      <div className="flex items-center gap-3 font-sans">
        {/* DATA SOURCE INDICATOR */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${isSupabaseLive ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
          <Database size={13} className={isSupabaseLive ? 'text-emerald-600' : 'text-amber-600'} />
          <span>{isSupabaseLive ? 'Supabase Live' : 'Mock Fallback'}</span>
        </div>

        {/* USER SELECTOR DROPDOWN */}
        <div className="flex items-center gap-2 bg-[#FAF9F5] px-3 py-1.5 rounded-lg border border-[#E8E6DC]">
          <Users size={14} className="text-[#1B365D]" />
          <select
            value={activeUserId}
            onChange={(e) => setActiveUserId(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[#141413] focus:outline-none cursor-pointer"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* ROUTER NAVIGATION TAB GROUP */}
        <div className="bg-[#E8E6DC]/60 p-1 rounded-lg border border-[#E5E3D8] flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${isActive
                ? 'bg-[#FAF9F5] text-[#141413] shadow-sm'
                : 'text-[#6B6A64] hover:text-[#141413]'
              }`
            }
          >
            <User size={14} /> Investor View
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${isActive
                ? 'bg-[#1B365D] text-white shadow-sm'
                : 'text-[#6B6A64] hover:text-[#141413]'
              }`
            }
          >
            <Shield size={14} /> General Partner
          </NavLink>
          <NavLink
            to="/ledger"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${isActive
                ? 'bg-[#FAF9F5] text-[#141413] shadow-sm'
                : 'text-[#6B6A64] hover:text-[#141413]'
              }`
            }
          >
            <FileText size={14} /> Ledger
          </NavLink>
        </div>

        {/* SIGN OUT BUTTON & PROFILE BADGE */}
        {profile && (
          <button
            onClick={signOut}
            title="Sign Out"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8E6DC]/40 hover:bg-red-50 hover:text-red-700 text-[#504E49] rounded-lg border
  border-[#E5E3D8] text-xs font-semibold transition-all"
          >
            <LogOut size={14} />
          </button>
        )}
      </div>
    </header>
  );
}