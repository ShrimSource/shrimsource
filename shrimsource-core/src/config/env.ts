export const env = {
    get searchProvider() { return process.env.SHRIM_SEARCH_PROVIDER || 'tavily'; },
    get searchKey() { return process.env.SHRIM_SEARCH_KEY; },

    get embedProvider() { return process.env.SHRIM_EMBED_PROVIDER || 'openai'; },
    get embedKey() { return process.env.SHRIM_EMBED_KEY; },

    get dbUrl() { return process.env.SHRIM_DB_URL; },
    get dbKey() { return process.env.SHRIM_DB_KEY; },

    get emailProvider() { return process.env.SHRIM_EMAIL_PROVIDER || 'resend'; },
    get emailKey() { return process.env.SHRIM_EMAIL_KEY; },

    get storageProvider() { return process.env.SHRIM_STORAGE_PROVIDER || 's3'; },
    get storageKey() { return process.env.SHRIM_STORAGE_KEY; },

    get browserProvider() { return process.env.SHRIM_BROWSER_PROVIDER || 'simpleFetch'; },

    // LLM Config
    get llmModel() { return process.env.SHRIM_LLM_MODEL || process.env.LLM_MODEL; },
    get llmBaseUrl() { return process.env.SHRIM_LLM_BASE_URL || process.env.LLM_BASE_URL; },
    get llmKey() { return process.env.SHRIM_LLM_KEY || process.env.LLM_API_KEY; },
};
