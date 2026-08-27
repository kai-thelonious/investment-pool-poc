# Supabase Database Schema & Data Layer Documentation

This document describes the PostgreSQL database schema, Row Level Security (RLS) policies, Realtime WebSocket channels, and the `dataService.ts` API layer for **Apex Syndicate Pool**.

---

## 🗄️ PostgreSQL Database Schemas

### 1. `public.profiles`
Stores user profile information, role permissions, and capital contributions.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, References `auth.users(id)` | User UUID matching Supabase Auth |
| `name` | `text` | NOT NULL | User's full display name |
| `role` | `text` | Default `'investor'` | Account role (`'investor'` or `'admin'`) |
| `deposited` | `numeric` | Default `0` | Cleared capital deposited ($) |
| `pending` | `numeric` | Default `0` | Unsettled subscription requests ($) |
| `created_at` | `timestamptz` | Default `now()` | Account creation timestamp |

**RLS Status**: Enabled  
**Policies**:
- `Allow select for authenticated users` (`USING (auth.role() = 'authenticated')`)
- `Allow profile updates for own user or admin`

---

### 2. `public.transactions`
Audit log of all capital subscription requests, top-ups, and tranche clearances.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `text` | Primary Key | Reference transaction ID (e.g. `TX-101`) |
| `user_id` | `uuid` | References `profiles(id)` | Participant user UUID |
| `participant_name` | `text` | NOT NULL | Participant name for display |
| `type` | `text` | NOT NULL | Transaction type (e.g., `Subscription Request`) |
| `amount` | `numeric` | NOT NULL | Capital amount ($) |
| `status` | `text` | Default `'Pending Approval'` | Clearance status (`'Pending Approval'`, `'Completed'`, `'Cancelled'`) |
| `created_at` | `timestamptz` | Default `now()` | Timestamp of transaction |

**RLS Status**: Enabled  
**Policies**:
- `Allow select for authenticated users`
- `Allow insert for own user subscriptions`
- `Allow update for admin role`

---

### 3. `public.fund_history`
Tracks aggregate Net Asset Value (NAV) pool valuations across quarterly benchmarks.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | Primary Key, Auto-increment | Internal record ID |
| `quarter` | `text` | NOT NULL | Quarter identifier (e.g. `Q1 26`) |
| `pool_value` | `numeric` | NOT NULL | Aggregate pool valuation ($) |
| `created_at` | `timestamptz` | Default `now()` | Record creation timestamp |

**RLS Status**: Enabled  

---

### 4. `public.dividends`
Tracks declared quarterly dividend distributions and yield payouts.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | Primary Key, Auto-increment | Dividend distribution ID |
| `quarter` | `text` | NOT NULL | Quarter identifier |
| `total_payout` | `numeric` | NOT NULL | Total dividend payout amount ($) |
| `yield_percent` | `numeric` | NOT NULL | Annualized yield rate (%) |
| `payout_date` | `date` | NOT NULL | Payout settlement date |
| `status` | `text` | Default `'Distributed'` | Distribution status |
| `created_at` | `timestamptz` | Default `now()` | Record timestamp |

**RLS Status**: Enabled  

---

### 5. `public.portfolio`
Breakdown of asset class allocations within the pool.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | Primary Key | Record ID |
| `name` | `text` | NOT NULL | Asset class name (e.g., `US Equities`) |
| `value` | `numeric` | NOT NULL | Valuation ($) |

**RLS Status**: Enabled  
**Policies**:
- `Allow public select on portfolio` (`FOR SELECT USING (true)`)

---

## 📡 Realtime WebSockets Architecture

The frontend subscribes to postgres mutations via `dataService.subscribeToTableChanges(tableName, callback)`.

```typescript
// Selective Subscription Example
const channel = dataService.subscribeToTableChanges('transactions', () => {
  loadTransactions();
});
```

Selective table listening prevents full-dashboard refetches when unrelated tables mutate.

---

## 🔌 Data Service API Contract (`src/services/dataService.ts`)

```typescript
export interface DataFetchResult<T> {
  data: T;
  isLive: boolean;
}

export const dataService = {
  getProfiles(): Promise<DataFetchResult<UserItem[]>>;
  getFundHistory(): Promise<DataFetchResult<{ history: FundHistoryItem[]; total: number }>>;
  getTransactions(): Promise<DataFetchResult<TransactionItem[]>>;
  getSectorsAndPortfolio(currentTotal: number): Promise<DataFetchResult<{ sectors: SectorExposureItem[]; portfolio: PortfolioItem[] }>>;
  getRiskMetrics(): Promise<DataFetchResult<RiskReturnItem[]>>;
  getDividends(): Promise<DataFetchResult<DividendItem[]>>;
  subscribeToTableChanges(tableName: string, onTableChange: () => void): RealtimeChannel;
};
```
