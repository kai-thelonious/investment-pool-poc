# ADR-001: Modular Custom Hooks Architecture

* **Status**: Accepted
* **Date**: 2026-08-27
* **Deciders**: Kai, Antigravity AI

---

##  Context & Problem Statement

The initial application architecture contained a single, monolithic 493-line custom hook (`useFundDashboard.ts`). This hook handled all profile management, NAV valuation calculations, transaction ledger mutations, dividend declarations, risk metrics, and WebSocket listeners.

As the application grew, the single hook created several maintenance challenges:
- Any state update triggered re-renders across all dashboard sections.
- Code readability and debuggability degraded.
- Writing isolated unit tests for specific business logic was difficult.

---

## 💡 Decision Drivers

- **Single Responsibility Principle**: Each custom hook should own a single domain boundary.
- **Maintainability**: Developers can debug user profile logic, transaction workflows, or NAV history independently.
- **Performance**: Selective table subscriptions prevent global re-renders on every database change.

---

## ⚙️ Considered Options

1. **Keep Monolithic Hook (`useFundDashboard.ts`)**: Lowest short-term effort, but unmaintainable long-term.
2. **Redux Toolkit or Zustand Store**: Introduces extra global state dependencies for a single-page application.
3. **Modular Sub-Hooks Orchestration (Chosen)**: Split state into 3 domain hooks (`useAuthProfile`, `useFundData`, `useTransactions`) composed by a lightweight `useFundDashboard` parent.

---

## 📋 Decision Outcome

Chosen Option: **Modular Sub-Hooks Orchestration**.

### Architecture
- `useAuthProfile`: User profile, active account selection, pro-rata equity share calculations.
- `useFundData`: Aggregate NAV pool valuation, fund history, dividends, sector exposure, and risk metrics.
- `useTransactions`: Transaction ledger, deposit requests, approval/rejection handlers, and status tracking.
- `useFundDashboard`: Parent orchestrator composing the sub-hooks and exposing a clean unified interface to `App.tsx`.

---

## 🔬 Consequences

### Positive
- Code readability improved significantly; each hook is under ~200 lines.
- Isolated domain testing became straightforward.
- Easy to add selective refetching per table.

### Negative
- Mild boilerplate increase for prop passing between orchestrator and components.
