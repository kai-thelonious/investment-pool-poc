import { User, Shield, Users, FileText, Database, LogOut } from 'lucide-react';
import { kamiTheme } from '../constants/theme';
import { UserItem } from '../data/mockData';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeUserId: string;
  setActiveUserId: (id: string) => void;
  users: UserItem[];
  isSupabaseLive?: boolean;
}

export default function Header({ activeUserId, setActiveUserId, users, isSupabaseLive }: HeaderProps) {
  const { profile, signOut } = useAuth();

  return (
    <header className="max-w-7xl mx-auto mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-[#E8E6DC] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B365D]"></span>
            <span className={`text-[10px] sm:text-xs uppercase tracking-widest font-sans font-semibold ${kamiTheme.textSub}`}>
              Editorial Fund Report
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#141413]">Apex Syndicate Pool</h1>
        </div>

        {/* Mobile Sign Out Button */}
        {profile && (
          <button
            onClick={signOut}
            title="Sign Out"
            className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 bg-[#E8E6DC]/40 hover:bg-red-50 hover:text-red-700 text-[#504E49] rounded-lg border border-[#E5E3D8] text-xs font-sans font-semibold transition-all"
          >
            <LogOut size={14} />
            <span className="hidden xs:inline">Sign Out</span>
          </button>
        )}
      </div>

      <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 font-sans">
        {/* DATA SOURCE & USER SELECTOR ROW */}
        <div className="flex items-center gap-2 w-full xs:w-auto">
          <div className={`flex-1 xs:flex-none flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-semibold ${
            isSupabaseLive ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <Database size={13} className={isSupabaseLive ? 'text-emerald-600' : 'text-amber-600'} />
            <span>{isSupabaseLive ? 'Supabase Live' : 'Mock Fallback'}</span>
          </div>

          <div className="flex-1 xs:flex-none flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1.5 rounded-lg border border-[#E8E6DC]">
            <Users size={13} className="text-[#1B365D] shrink-0" />
            <select
              value={activeUserId}
              onChange={(e) => setActiveUserId(e.target.value)}
              className="bg-transparent text-[11px] sm:text-xs font-semibold text-[#141413] focus:outline-none cursor-pointer w-full"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ROUTER NAVIGATION TAB GROUP */}
        <div className="bg-[#E8E6DC]/60 p-1 rounded-lg border border-[#E5E3D8] flex items-center justify-between xs:justify-start gap-1 w-full xs:w-auto overflow-x-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded text-[11px] sm:text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex-1 xs:flex-none ${
                isActive
                  ? 'bg-[#FAF9F5] text-[#141413] shadow-sm'
                  : 'text-[#6B6A64] hover:text-[#141413]'
              }`
            }
          >
            <User size={13} /> Investor
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded text-[11px] sm:text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex-1 xs:flex-none ${
                isActive
                  ? 'bg-[#1B365D] text-white shadow-sm'
                  : 'text-[#6B6A64] hover:text-[#141413]'
              }`
            }
          >
            <Shield size={13} /> Partner
          </NavLink>
          <NavLink
            to="/ledger"
            className={({ isActive }) =>
              `flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded text-[11px] sm:text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex-1 xs:flex-none ${
                isActive
                  ? 'bg-[#FAF9F5] text-[#141413] shadow-sm'
                  : 'text-[#6B6A64] hover:text-[#141413]'
              }`
            }
          >
            <FileText size={13} /> Ledger
          </NavLink>
        </div>

        {/* Desktop Sign Out Button */}
        {profile && (
          <button
            onClick={signOut}
            title="Sign Out"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#E8E6DC]/40 hover:bg-red-50 hover:text-red-700 text-[#504E49] rounded-lg border border-[#E5E3D8] text-xs font-semibold transition-all"
          >
            <LogOut size={14} />
          </button>
        )}
      </div>
    </header>
  );
}