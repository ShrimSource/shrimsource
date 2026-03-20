import { ProviderOption } from '../templates/registry';

export const DB_PROVIDERS: ProviderOption[] = [
    { id: 'postgres', label: 'PostgreSQL (Supabase/Neon)' },
    { id: 'mysql', label: 'MySQL / PlanetScale' },
    { id: 'sqlite', label: 'SQLite (Local)' }
];
