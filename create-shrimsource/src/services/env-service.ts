import { Capability, EnvValues } from '../templates/registry';
import { CAPABILITY_ENV_MAP } from '../providers/capability-map';
import { LLM_PROVIDERS } from '../providers/llm-providers';
import { SEARCH_PROVIDERS } from '../providers/search-providers';
import { EMBED_PROVIDERS } from '../providers/embed-providers';
import { DB_PROVIDERS } from '../providers/db-providers';
import { EMAIL_PROVIDERS } from '../providers/email-providers';
import { STORAGE_PROVIDERS } from '../providers/storage-providers';
import { BROWSER_PROVIDERS } from '../providers/browser-providers';
import { askSelect, askInput } from '../utils/prompt';
import { writeTextFile } from '../utils/fs';
import { FILES } from '../constants/files';
import path from 'path';

export function getRequiredEnvKeys(capabilities: Capability[]): string[] {
    const keys = new Set<string>();
    for (const cap of capabilities) {
        const capsKeys = CAPABILITY_ENV_MAP[cap] || [];
        capsKeys.forEach(k => keys.add(k));
    }
    return Array.from(keys);
}

export async function promptEnvValues(capabilities: Capability[]): Promise<{ values: EnvValues, providers: any }> {
    const values: EnvValues = {};
    const providers: any = {};

    if (capabilities.includes('llm')) {
        const llmProviderId = await askSelect(
            'Select LLM Provider:',
            LLM_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.llm = llmProviderId;
        values['SHRIM_LLM_PROVIDER'] = llmProviderId;

        if (llmProviderId !== 'openrouter') {
            let defaultBaseUrl = '';
            if (llmProviderId === 'openai') defaultBaseUrl = 'https://api.openai.com/v1';

            const baseUrl = await askInput(`Enter Base URL for ${llmProviderId}${defaultBaseUrl ? ` (default: ${defaultBaseUrl})` : ''}:`);
            values['LLM_BASE_URL'] = baseUrl || defaultBaseUrl;
        } else {
            values['LLM_BASE_URL'] = 'https://openrouter.ai/api/v1';
        }

        if (llmProviderId !== 'local') {
            const apiKey = await askInput(`Enter ${llmProviderId} API Key:`);
            values['LLM_API_KEY'] = apiKey;
        } else {
            values['LLM_API_KEY'] = 'not-needed'; // Provide dummy key for local to prevent empty string errors
        }

        const model = await askInput(`Enter default model to use for ${llmProviderId}:`);
        values['LLM_MODEL'] = model;
    }

    if (capabilities.includes('embed')) {
        const embedProviderId = await askSelect(
            'Select Embedding Provider:',
            EMBED_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.embed = embedProviderId;
        values['SHRIM_EMBED_PROVIDER'] = embedProviderId;

        const embedKey = await askInput(`Enter ${embedProviderId} API Key:`);
        values['SHRIM_EMBED_KEY'] = embedKey;
    }

    if (capabilities.includes('search')) {
        const searchProviderId = await askSelect(
            'Select Search Provider:',
            SEARCH_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.search = searchProviderId;
        values['SHRIM_SEARCH_PROVIDER'] = searchProviderId;

        if (searchProviderId !== 'none') {
            const searchKey = await askInput(`Enter ${searchProviderId} API Key:`);
            values['SHRIM_SEARCH_KEY'] = searchKey;
        }
    }

    if (capabilities.includes('db')) {
        const dbProviderId = await askSelect(
            'Select Database Provider:',
            DB_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.db = dbProviderId;

        const dbUrl = await askInput(`Enter ${dbProviderId} Connection URL:`);
        values['SHRIM_DB_URL'] = dbUrl;

        // DB key is often optional or part of the URL, but prompted just in case framework needs it separate
        const dbKey = await askInput(`Enter ${dbProviderId} API Key or Password (Optional):`);
        values['SHRIM_DB_KEY'] = dbKey;
    }

    if (capabilities.includes('email')) {
        const emailProviderId = await askSelect(
            'Select Email Provider:',
            EMAIL_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.email = emailProviderId;
        values['SHRIM_EMAIL_PROVIDER'] = emailProviderId;

        const emailKey = await askInput(`Enter ${emailProviderId} API Key:`);
        values['SHRIM_EMAIL_KEY'] = emailKey;
    }

    if (capabilities.includes('storage')) {
        const storageProviderId = await askSelect(
            'Select Storage Provider:',
            STORAGE_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.storage = storageProviderId;
        values['SHRIM_STORAGE_PROVIDER'] = storageProviderId;

        if (storageProviderId !== 'local') {
            const storageKey = await askInput(`Enter ${storageProviderId} API Key:`);
            values['SHRIM_STORAGE_KEY'] = storageKey;
        } else {
            values['SHRIM_STORAGE_KEY'] = 'not-needed';
        }
    }

    if (capabilities.includes('browser')) {
        const browserProviderId = await askSelect(
            'Select Web Browser Engine:',
            BROWSER_PROVIDERS.map(p => ({ label: p.label, value: p.id }))
        );
        providers.browser = browserProviderId;
        values['SHRIM_BROWSER_PROVIDER'] = browserProviderId;
    }

    return { values, providers };
}

export function serializeEnv(values: EnvValues): string {
    return Object.entries(values)
        .map(([key, val]) => `${key}=${val}`)
        .join('\n') + '\n';
}

export async function writeEnvFile(projectDir: string, values: EnvValues): Promise<void> {
    const envPath = path.join(projectDir, FILES.ENV);
    const content = serializeEnv(values);
    await writeTextFile(envPath, content);
}
