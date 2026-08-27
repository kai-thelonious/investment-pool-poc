# ADR-003: Institutional PE/VC Performance Metrics Suite

* **Status**: Accepted
* **Date**: 2026-08-27
* **Deciders**: Kai, Antigravity AI

---

## 🎯 Context & Problem Statement

To showcase the application to financial executives and syndicate fund managers, simple aggregate NAV totals were insufficient. Institutional private equity (PE) and venture capital (VC) managers rely on standardized fund performance benchmarks: **TVPI**, **DPI**, **MOIC**, and **Net IRR**.

---

## 💡 Decision Drivers

- **Domain Relevance**: Elevate the proof-of-concept for institutional finance audiences.
- **Dynamic Cash Flow Computation**: Compute ratios dynamically from live database cash flows rather than static hardcoded numbers.
- **Pro-Rata Customization**: Allow Limited Partners (LPs) to view performance metrics adjusted to their personal ownership percentage.

---

## 📋 Decision Outcome

Chosen Option: **Dynamic Financial Math Utility (`src/utils/finance.ts`) & Performance Bar (`PEMetricsBar.tsx`)**.

### Standardized Mathematical Formulas

1. **TVPI (Total Value to Paid-In)**:
   $$\text{TVPI} = \frac{\text{Current NAV} + \text{Total Distributions}}{\text{Total Paid-In Capital}}$$

2. **DPI (Distributed to Paid-In)**:
   $$\text{DPI} = \frac{\text{Total Distributions}}{\text{Total Paid-In Capital}}$$

3. **MOIC / RVPI (Residual Value to Paid-In)**:
   $$\text{MOIC} = \frac{\text{Current NAV}}{\text{Total Paid-In Capital}}$$

4. **Est. Net IRR (Internal Rate of Return)**:
   $$\text{Net IRR} = \left(\text{TVPI}\right)^{\frac{1}{\text{Years}}} - 1$$

---

## 🔬 Consequences

### Positive
- Instantly elevates the app's credibility for financial pitch presentations.
- Interactive hover tooltips educate non-technical viewers on institutional definitions.
- Dynamic recalculation updates live as new subscription transactions are approved or NAV valuations change.

### Negative
- IRR calculation uses an annualized approximation formula; complex irregular cash flow streams may require XIRR Newton-Raphson solvers in future iterations.
