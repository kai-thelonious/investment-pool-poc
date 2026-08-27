/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

interface UserProfile {
  id: string;
  name: string;
  role: 'investor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the user's profile role from the profiles table
  const fetchProfile = useCallback(async (userId: string, email?: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (!error && data) {
        setProfile({
          id: data.id,
          name: data.name,
          role: (data.role as 'investor' | 'admin') || 'investor',
        });
        return;
      }
    } catch (err) {
      console.warn('Profile fetch notice:', err);
    }

    // Heuristic Fallback: If no DB profile exists yet, check email
    const isGP = email
      ? email.includes('gp') || email.includes('admin') || email.includes('manager')
      : false;
    const defaultRole: 'investor' | 'admin' = isGP ? 'admin' : 'investor';
    const defaultName = isGP ? 'General Partner' : email?.split('@')[0] || 'Syndicate Member';

    setProfile({
      id: userId,
      name: defaultName,
      role: defaultRole,
    });

    try {
      await supabase.from('profiles').upsert({
        id: userId,
        name: defaultName,
        role: defaultRole,
        deposited: 0,
        pending: 0,
      });
    } catch (upsertErr) {
      console.warn('Auto profile creation notice:', upsertErr);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
