import { ProviderOption } from '../templates/registry';

export const STORAGE_PROVIDERS: ProviderOption[] = [
    { id: 's3', label: 'AWS S3 (or compatible like R2, Supabase Storage)' },
    { id: 'local', label: 'Local Filesystem' }
];
