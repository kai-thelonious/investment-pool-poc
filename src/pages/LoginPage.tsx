import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { kamiTheme } from '../constants/theme';
import { Shield, Lock, Mail, User as UserIcon, LogIn } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [role, setRole] = useState<'investor' | 'admin'>('investor');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const demoAccounts = [
    { name: 'Alice Smith', email: 'alice.smith@syndicate.com', role: 'LP Investor ($45k Stake)' },
    { name: 'Bob Jones', email: 'bob.jones@syndicate.com', role: 'LP Investor ($25k Stake)' },
    { name: 'Charlie Day', email: 'charlie.day@syndicate.com', role: 'LP Investor ($12.5k Stake)' },
    { name: 'General Partner', email: 'gp.manager@syndicate.com', role: 'GP Manager (Admin Controls)' },
  ];

  const handleDemoSignIn = async (demoEmail: string) => {
    setErrorMsg('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: 'Password123!',
      });
      if (error) throw error;
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Demo sign-in failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        // 1. Register with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // 2. Insert Profile matching auth.user.id
          const { error: profileErr } = await supabase.from('profiles').insert({
            id: data.user.id,
            name: fullName || 'New Investor',
            role: role,
            deposited: 0,
            pending: 0,
          });

          if (profileErr) console.warn('Profile creation notice:', profileErr);
        }

        navigate('/');
      } else {
        // Log in existing user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        navigate('/');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Authentication failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${kamiTheme.bgPage} flex flex-col items-center justify-center p-4 sm:p-6 font-serif antialiased space-y-6`}>
      <div className={`w-full max-w-md ${kamiTheme.cardBg} p-6 sm:p-8 rounded-xl border ${kamiTheme.cardBorder} shadow-lg space-y-6`}>
        <div className="text-center">
          <div className="inline-flex p-3 bg-[#E4ECF5] text-[#1B365D] rounded-full mb-3">
            <Shield size={24} />
          </div>
          <h1 className="text-2xl font-normal text-[#141413]">Apex Syndicate Portal</h1>
          <p className={`text-xs font-sans ${kamiTheme.textSub} mt-1`}>
            {isSignUp ? 'Create your syndicate account' : 'Sign in to access your investment dashboard'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-sans">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          {isSignUp && (
            <div>
              <label className={`block font-semibold uppercase tracking-wider ${kamiTheme.textMuted} mb-1.5`}>
                Full Name
              </label>
              <div className="relative">
                <UserIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alice Smith"
                  className={`w-full pl-9 ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-md py-2.5 px-3 focus:outline-none focus:border-[#1B365D]`}
                />
              </div>
            </div>
          )}

          <div>
            <label className={`block font-semibold uppercase tracking-wider ${kamiTheme.textMuted} mb-1.5`}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@syndicate.com"
                className={`w-full pl-9 ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-md py-2.5 px-3 focus:outline-none focus:border-[#1B365D]`}
              />
            </div>
          </div>

          <div>
            <label className={`block font-semibold uppercase tracking-wider ${kamiTheme.textMuted} mb-1.5`}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-9 ${kamiTheme.inputBg} border ${kamiTheme.inputBorder} rounded-md py-2.5 px-3 focus:outline-none focus:border-[#1B365D]`}
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className={`block font-semibold uppercase tracking-wider ${kamiTheme.textMuted} mb-1.5`}>
                Select Account Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('investor')}
                  className={`py-2 rounded text-xs font-semibold border ${
                    role === 'investor'
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  Investor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 rounded text-xs font-semibold border ${
                    role === 'admin'
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  General Partner
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${kamiTheme.accentInk} ${kamiTheme.accentInkHover} text-white font-semibold uppercase tracking-wider py-3 rounded-md transition-all shadow-sm mt-2`}
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Syndicate Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-1 font-sans text-xs">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-[#1B365D] hover:underline font-semibold"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Register here"}
          </button>
        </div>
      </div>

      {/* QUICK DEMO ACCOUNT LOGINS */}
      <div className={`w-full max-w-md ${kamiTheme.cardBg} p-5 rounded-xl border ${kamiTheme.cardBorder} shadow-sm font-sans space-y-3`}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141413]">
          <LogIn size={15} className="text-[#1B365D]" /> 1-Click Quick Demo Sign-In
        </div>
        <p className="text-[11px] text-[#6B6A64]">Simulate acting as each investor or general partner:</p>

        <div className="grid grid-cols-1 gap-2 text-xs">
          {demoAccounts.map((acc) => (
            <button
              key={acc.email}
              onClick={() => handleDemoSignIn(acc.email)}
              disabled={loading}
              className="p-2.5 bg-[#FAF9F5] hover:bg-[#E8E6DC]/50 border border-[#E8E6DC] rounded-lg text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <span className="font-semibold text-[#141413] block group-hover:text-[#1B365D]">{acc.name}</span>
                <span className="text-[10px] text-[#6B6A64]">{acc.role}</span>
              </div>
              <span className="text-[10px] font-semibold text-[#1B365D] bg-[#E4ECF5] px-2 py-0.5 rounded">Sign In</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}