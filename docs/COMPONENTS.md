# Component Reference & Architecture Guide

This document provides a comprehensive overview of the React components and custom hooks in **Apex Syndicate Pool**.

---

## 🏛️ Application Architecture & Component Hierarchy

```
src/
├── main.tsx                   # App Entry: ErrorBoundary -> BrowserRouter -> AuthProvider -> Toaster -> App
├── App.tsx                    # Top-Level Layout & Router definition
├── components/
│   ├── Header.tsx             # Main Navigation Header & Data Source Status
│   ├── UserProfileDropdown.tsx # Auth Profile Selector & Session Management
│   ├── ErrorBoundary.tsx      # Global Error Boundary Fallback UI
│   ├── MetricCards.tsx        # Role-gated Summary KPI Cards
│   ├── PEMetricsBar.tsx       # Institutional PE Metrics (TVPI, DPI, MOIC, Net IRR)
│   ├── ProtectedRoute.tsx     # Role-based Route Guard Component
│   ├── TransactionLedger.tsx  # Audit Ledger Table with Pagination & Filtering
│   ├── admin/
│   │   ├── AdminView.tsx
│   │   ├── AdminControls.tsx
│   │   ├── AssetBreakdownChart.tsx
│   │   └── LPCapitalDistributionChart.tsx
│   ├── analytics/
│   │   ├── SectorExposureChart.tsx
│   │   └── RiskReturnScatterChart.tsx
│   └── investor/
│       ├── InvestorView.tsx
│       ├── ValuationChart.tsx
│       ├── DividendsTab.tsx
│       └── DepositForm.tsx
├── hooks/
│   ├── useFundDashboard.ts    # Main Orchestrator Hook
│   ├── useAuthProfile.ts      # Profile, Role, & Share Calculation
│   ├── useFundData.ts         # NAV Valuation, Dividends, & Metrics
│   └── useTransactions.ts     # Ledger & Subscription Workflows
└── services/
    └── dataService.ts         # Supabase & Mock Data Access Layer
```

---

## 🧩 Core Shared Components

### 1. `Header.tsx`
* **Path**: `src/components/Header.tsx`
* **Purpose**: Displays the editorial top header, database connection status badge (`Supabase Live` vs `Mock Fallback`), navigation tab group (`Investor`, `Partner`, `Ledger`), and `UserProfileDropdown`.
* **Props**:
  * `isSupabaseLive?: boolean`: Flag indicating active WebSockets/Database status.

### 2. `UserProfileDropdown.tsx`
* **Path**: `src/components/UserProfileDropdown.tsx`
* **Purpose**: Interactive profile avatar dropdown allowing users to view current session role (GP vs LP), jump to quick actions, check database connectivity, and sign out.

### 3. `ErrorBoundary.tsx`
* **Path**: `src/components/ErrorBoundary.tsx`
* **Purpose**: React Class Error Boundary catching unhandled runtime exceptions and rendering an elegant Kami-themed error recovery screen with a reload button.

### 4. `MetricCards.tsx`
* **Path**: `src/components/MetricCards.tsx`
* **Purpose**: Displays high-level summary cards.
* **Role Visibility**: Automatically restricted to General Partners (`admin` role). Returns `null` when logged in as an investor.

### 5. `PEMetricsBar.tsx`
* **Path**: `src/components/PEMetricsBar.tsx`
* **Purpose**: Renders Private Equity & Venture Capital performance metrics:
  * **TVPI** (Total Value to Paid-In)
  * **DPI** (Distributed to Paid-In)
  * **MOIC** (Multiple on Invested Capital / RVPI)
  * **Est. Net IRR** (Annualized Return Rate)
* **Features**: Interactive hover tooltips providing definitions for finance pitch audiences.

### 6. `ProtectedRoute.tsx`
* **Path**: `src/components/ProtectedRoute.tsx`
* **Purpose**: Enforces route authentication and role authorization.
* **Props**:
  * `allowedRoles?: Array<'investor' | 'admin'>`: List of permitted user roles for the route.

---

## 📈 Feature Views & Analytics Components

### 7. `InvestorView.tsx`
* **Path**: `src/components/investor/InvestorView.tsx`
* **Purpose**: Investor dashboard featuring sub-tab switching between **Fund Valuation** (`ValuationChart.tsx`), **Dividends & Yields** (`DividendsTab.tsx`), and **Sector & Risk Analytics** (`SectorExposureChart.tsx`, `RiskReturnScatterChart.tsx`), alongside the subscription request form (`DepositForm.tsx`).

### 8. `AdminView.tsx`
* **Path**: `src/components/admin/AdminView.tsx`
* **Purpose**: General Partner Command Center rendering the `PEMetricsBar`, asset breakdown charts, LP capital distribution charts, and GP transaction approval controls (`AdminControls.tsx`).

### 9. `TransactionLedger.tsx`
* **Path**: `src/components/TransactionLedger.tsx`
* **Purpose**: Interactive audit ledger supporting scope filtering (*My Activity* vs *All Pool Activity*), text search, status filters (*Pending*, *Completed*, *Cancelled*), configurable rows per page, and custom empty states.

---

## 🪝 Custom Hooks

### 10. `useFundDashboard`
* **Path**: `src/hooks/useFundDashboard.ts`
* **Purpose**: Top-level orchestrator composing `useAuthProfile`, `useFundData`, and `useTransactions` into a unified state interface for `App.tsx`.

### 11. `useAuthProfile`
* **Path**: `src/hooks/useAuthProfile.ts`
* **Purpose**: Manages active user profile, user list state, role checks, and pro-rata ownership share calculations (`currentUserSharePercent`, `currentUserCurrentValue`).

### 12. `useFundData`
* **Path**: `src/hooks/useFundData.ts`
* **Purpose**: Manages fund NAV valuation history, dividend declarations, sector exposure allocations, and risk data.

### 13. `useTransactions`
* **Path**: `src/hooks/useTransactions.ts`
* **Purpose**: Manages subscription requests, pending deposit approvals, single transaction approvals/rejections, and toast notifications.
