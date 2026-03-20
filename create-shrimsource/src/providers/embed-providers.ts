import { ProviderOption } from '../templates/registry';

export const EMBED_PROVIDERS: ProviderOption[] = [
    { id: 'openai', label: 'OpenAI (text-embedding-3-small/large)' },
    { id: 'local', label: 'Local (Ollama/Transformers)' }
];
