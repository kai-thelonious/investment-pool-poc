# ADR-002: Data Service Layer & Mock Fallback Pattern

* **Status**: Accepted
* **Date**: 2026-08-27
* **Deciders**: Kai, Antigravity AI

---

## 🎯 Context & Problem Statement

The application must function both in a live production environment (connected to Supabase PostgreSQL & Realtime WebSockets) and in an offline / fallback mode when network connectivity or environment variables are unavailable during executive demos.

Previously, components imported directly from `mockData.ts` or made inline Supabase calls, leading to duplicate data formatting logic (`Number()` casts, string conversions) spread throughout the codebase.

---

## 💡 Decision Drivers

- **Reliability**: Demonstrations must never break if Supabase connection drops.
- **DRY (Don't Repeat Yourself)**: Centralize data formatting and type assertions.
- **Decoupling**: Decouple React components from direct Supabase query details.

---

## 📋 Decision Outcome

Chosen Option: **Data Access Service Layer (`src/services/dataService.ts`)**.

### Implementation Pattern
Every data fetcher function returns a standardized `DataFetchResult<T>` structure:

```typescript
export interface DataFetchResult<T> {
  data: T;
  isLive: boolean; // Indicates if live Supabase data was returned
}
```

The service attempts to fetch data from Supabase first. If the table is empty, unavailable, or throws an exception, it seamlessly falls back to pre-formatted mock data in `mockData.ts` and sets `isLive = false`.

---

## 🔬 Consequences

### Positive
- Components and hooks remain clean and decoupled from raw SQL/Supabase clients.
- Automatic fallback guarantees the pitch demo functions smoothly in any environment.
- Header connection badge (`Supabase Live` vs `Mock Fallback`) accurately reflects real connection status.

### Negative
- Require maintaining `mockData.ts` alongside database schema updates.
