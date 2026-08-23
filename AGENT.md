# Antigravity Agent Guidelines

You have full access to this investment platform repository and its linked Supabase database.

## Database & Supabase Workflow
- **Remote Project Ref**: `sveybvicredxkedmbagq`
- **Tables**: `profiles`, `transactions`, `fund_history`
- **Schema Management**:
  - Whenever you modify or add database schema changes, write a migration script in `supabase/migrations/` or run `npx supabase db push`.
  - After any database schema change, execute `npm run db:types` to regenerate strict TypeScript types into `src/types/database.types.ts`.
- **Client Access**:
  - Use `@supabase/supabase-js` via `src/utils/supabase.ts`.
  - Ensure all database queries match the types defined in `src/types/database.types.ts`.

## Styling & Theme Rules
- Adhere strictly to the Kami editorial palette defined in `src/constants/theme.ts`.
- Do not introduce arbitrary CSS files; use Tailwind utility classes referencing the Kami color variables.