# Apex Syndicate Pool (Fund POC)

A full-stack investment pool dashboard proof-of-concept built with React 19, TypeScript, Vite, React Router, and Supabase.

## Overview

Apex Syndicate Pool provides real-time portfolio management and transparency for syndicate managers (General Partners) and participants (Investors). The application tracks aggregate Net Asset Value (NAV), individual capital allocations, quarterly dividend yield distributions, and transaction clearances.

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Routing**: React Router (`react-router-dom`)
- **Data Visualization**: Recharts, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Realtime WebSockets, Row-Level Security)

## Features

- **Investor View**: Personal stake metrics, pro-rata pool share percentage, quarterly valuation chart, and distributed yield dividends.
- **General Partner (Admin) View**: Pending capital clearance approvals and pool valuation updates.
- **Transaction Ledger**: Audit trail of subscriptions, initial deposits, and settlement status.
- **Authentication & Role-Based Access Control**: Supabase Auth integration with protected route guards for Investors and General Partners.
- **Realtime Synchronization**: Postgres mutation listeners updating client state via WebSockets.
- **Database Security**: Row-Level Security (RLS) policies enforcing identity and role permissions at the database level.

## Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Start Development Server
```bash
npm run dev
```

## Scripts

- `npm run typecheck` - Run TypeScript compiler checks
- `npm run lint` - Run ESLint checks
- `npm run build` - Create production build
