import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { kamiTheme } from '../constants/theme';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<'investor' | 'admin'>;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  // 1. Show loading indicator while Supabase resolves session token
  if (loading) {
    return (
      <div
        className={`min-h-screen ${kamiTheme.bgPage} flex items-center justify-center font-sans text-xs`}
      >
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="w-4 h-4 border-2 border-[#1B365D] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Authenticating syndicate portal...</span>
        </div>
      </div>
    );
  }

  // 2. Redirect to /login if user is not signed in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Check role authorization if restricted (e.g. /admin)
  const userRole = profile?.role || 'investor';
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <div
        className={`min-h-screen ${kamiTheme.bgPage} flex items-center justify-center p-6 font-serif antialiased`}
      >
        <div
          className={`max-w-md ${kamiTheme.cardBg} p-8 rounded-xl border ${kamiTheme.cardBorder} text-center space-y-4 shadow-lg`}
        >
          <h2 className="text-2xl font-normal text-red-800">Access Restricted</h2>
          <p className="text-xs font-sans text-gray-600">
            Your account role (<strong>{userRole}</strong>) does not have General Partner
            authorization to access this area.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2.5 bg-[#1B365D] hover:bg-[#2D5A8A] text-white text-xs font-sans font-semibold rounded-lg shadow-sm transition-all"
          >
            Return to Investor View
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
