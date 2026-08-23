# Apex Syndicate Pool (Fund POC)

A modern, full-stack investment pool dashboard proof-of-concept built with **React 19**, **TypeScript**, **Vite**, **React Router**, and **Supabase**.

---

## 🌟 Overview

The **Apex Syndicate Pool** provides real-time transparency for syndicate fund managers (General Partners) and syndicate participants (Investors). It tracks aggregate Net Asset Value (NAV), individual capital allocations, quarterly dividend yield distributions, and capital clearances.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Routing**: React Router (`react-router-dom`)
- **Data Visualization**: Recharts & Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Realtime WebSockets, RLS)

---

## ✨ Key Features

- **📊 Investor View**: Track personal stake, pro-rata pool share percentage, quarterly valuation curve, and distributed yield dividends.
- **🛡️ General Partner (Admin) View**: Approve incoming investor capital clearances and post new fund valuation marks.
- **📜 Transaction Ledger**: Full real-time audit trail of capital requests, initial deposits, and settlement statuses.
- **🔐 Auth & Role-Based Access Control (RBAC)**: Secure authentication via Supabase Auth with protected routes for Investors and General Partners.
- **⚡ Realtime WebSocket Sync**: Live Postgres mutation listener that automatically re-syncs state across all connected clients.
- **🔒 Database Security**: Row-Level Security (RLS) policies enforcing identity and permission checks at the database level.

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Development Server
```bash
npm run dev
```

---

## 🧪 Build & Verification Commands

- **Type Check**: `npm run typecheck`
- **Linter**: `npm run lint`
- **Production Build**: `npm run build`
