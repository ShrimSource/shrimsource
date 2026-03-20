import { ProviderOption } from '../templates/registry';

export const BROWSER_PROVIDERS: ProviderOption[] = [
    { id: 'simpleFetch', label: 'Simple Fetch (No Javascript)' },
    { id: 'puppeteer', label: 'Puppeteer (Headless Chrome)' },
    { id: 'playwright', label: 'Playwright (Multibrowser)' }
];
