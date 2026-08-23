# Generated with Antigravity CLI

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

