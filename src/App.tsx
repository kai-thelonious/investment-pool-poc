import { useFundDashboard } from './hooks/useFundDashboard';
import { kamiTheme } from './constants/theme';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import { Routes, Route, Navigate } from 'react-router-dom';
import InvestorPage from './pages/InvestorPage';
import AdminPage from './pages/AdminPage';
import LedgerPage from './pages/LedgerPage';
import LoginPage from './pages/LoginPage'; // 1. Import LoginPage
import ProtectedRoute from './components/ProtectedRoute'; // 2. Import ProtectedRoute

export default function App() {
  const {
    fundTotal,
    fundHistory,
    users,
    activeUserId,
    setActiveUserId,
    currentUser,
    currentUserSharePercent,
    currentUserCurrentValue,
    totalPendingDeposits,
    transactions,
    portfolio,
    dividends,
    depositInput,
    setDepositInput,
    newValuationInput,
    setNewValuationInput,
    isSupabaseLive,
    handleUserDeposit,
    handleApproveDeposit,
    handleUpdateFundValue,
  } = useFundDashboard();

  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Application Layout */}
      <Route
        path="*"
        element={
          <div className={`min-h-screen ${kamiTheme.bgPage} ${kamiTheme.textPrimary} p-4 sm:p-6 md:p-12 font-serif antialiased`}>
            <Header
              activeUserId={activeUserId}
              setActiveUserId={setActiveUserId}
              users={users}
              isSupabaseLive={isSupabaseLive}
            />

            <main className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
              <MetricCards
                currentUser={currentUser}
                currentUserCurrentValue={currentUserCurrentValue}
                currentUserSharePercent={currentUserSharePercent}
                fundTotal={fundTotal}
                totalPendingDeposits={totalPendingDeposits}
              />

              <Routes>
                {/* Investor Route (Accessible by all logged in users) */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <InvestorPage
                        fundHistory={fundHistory}
                        currentUser={currentUser}
                        currentUserSharePercent={currentUserSharePercent}
                        dividends={dividends}
                        depositInput={depositInput}
                        setDepositInput={setDepositInput}
                        handleUserDeposit={handleUserDeposit}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Route (Restricted to General Partners only) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminPage
                        portfolio={portfolio}
                        totalPendingDeposits={totalPendingDeposits}
                        handleApproveDeposit={handleApproveDeposit}
                        newValuationInput={newValuationInput}
                        setNewValuationInput={setNewValuationInput}
                        handleUpdateFundValue={handleUpdateFundValue}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* Ledger Route */}
                <Route
                  path="/ledger"
                  element={
                    <ProtectedRoute>
                      <LedgerPage transactions={transactions} />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  );
}