import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  LogOut,
  Shield,
  FileText,
  DollarSign,
  Database,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileDropdownProps {
  isSupabaseLive?: boolean;
}

export default function UserProfileDropdown({ isSupabaseLive }: UserProfileDropdownProps) {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user && !profile) return null;

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Syndicate Member';
  const displayEmail = user?.email || 'user@syndicate.com';
  const isGP = profile?.role === 'admin';
  const roleLabel = isGP ? 'General Partner (GP)' : 'Limited Partner (LP)';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#FAF9F5] hover:bg-[#E8E6DC]/60 px-3 py-1.5 rounded-lg border border-[#E8E6DC] text-xs font-semibold text-[#141413] transition-all shadow-sm focus:outline-none"
      >
        <div className="w-5 h-5 rounded-full bg-[#1B365D] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
          {userInitial}
        </div>
        <span className="truncate max-w-[110px] sm:max-w-[140px]">{displayName}</span>
        <span
          className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded shrink-0 ${
            isGP ? 'bg-[#1B365D] text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isGP ? 'GP' : 'LP'}
        </span>
        <ChevronDown
          size={13}
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#FAF9F5] rounded-xl border border-[#E8E6DC] shadow-xl z-50 overflow-hidden divide-y divide-[#E8E6DC]/70 animate-in fade-in duration-150">
          {/* USER INFO HEADER */}
          <div className="p-3.5 bg-white/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1B365D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {userInitial}
              </div>
              <div className="truncate">
                <p className="font-semibold text-xs text-[#141413] truncate">{displayName}</p>
                <p className="text-[10px] text-[#6B6A64] truncate">{displayEmail}</p>
                <span className="inline-block text-[9px] font-bold text-[#1B365D] uppercase mt-0.5">
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS SECTION */}
          <div className="p-1.5 space-y-0.5 text-xs font-sans">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/');
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-[#E8E6DC]/50 flex items-center gap-2 text-[#3D3D3A] transition-colors"
            >
              <DollarSign size={14} className="text-[#1B365D]" />
              <span>Capital Subscription</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/ledger');
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-[#E8E6DC]/50 flex items-center gap-2 text-[#3D3D3A] transition-colors"
            >
              <FileText size={14} className="text-[#1B365D]" />
              <span>Audit Ledger History</span>
            </button>

            {isGP && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/admin');
                }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-[#E8E6DC]/50 flex items-center gap-2 text-[#3D3D3A] transition-colors"
              >
                <Shield size={14} className="text-[#1B365D]" />
                <span>GP Command Center</span>
              </button>
            )}
          </div>

          {/* CONNECTION & STATUS SECTION */}
          <div className="p-3 text-[10px] space-y-1.5 text-[#6B6A64]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Database
                  size={11}
                  className={isSupabaseLive ? 'text-emerald-600' : 'text-amber-600'}
                />
                Database:
              </span>
              <span
                className={`font-semibold ${isSupabaseLive ? 'text-emerald-700' : 'text-amber-700'}`}
              >
                {isSupabaseLive ? 'Supabase Live' : 'Mock Fallback'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <UserCheck size={11} className="text-emerald-600" />
                Session Token:
              </span>
              <span className="font-semibold text-emerald-700">Authenticated</span>
            </div>
          </div>

          {/* LOG OUT BUTTON */}
          <div className="p-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 text-red-700 font-semibold flex items-center gap-2 text-xs transition-colors"
            >
              <LogOut size={14} />
              <span>Sign Out of Portal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
