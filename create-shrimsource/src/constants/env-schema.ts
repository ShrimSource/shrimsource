export const ENV_SCHEMA = {
    SHRIM_LLM_PROVIDER: { requiredFor: ["llm"] }, // Keeping the provider variable to know which one was picked
    LLM_API_KEY: { requiredFor: ["llm"] },
    LLM_MODEL: { requiredFor: ["llm"] },
    LLM_BASE_URL: { requiredFor: ["llm"] },
    SHRIM_SEARCH_PROVIDER: { requiredFor: ["search"] },
    SHRIM_SEARCH_KEY: { requiredFor: ["search"] },

    SHRIM_EMBED_PROVIDER: { requiredFor: ["embed"] },
    SHRIM_EMBED_KEY: { requiredFor: ["embed"] },

    SHRIM_DB_URL: { requiredFor: ["db"] },
    SHRIM_DB_KEY: { requiredFor: ["db"] },

    SHRIM_EMAIL_PROVIDER: { requiredFor: ["email"] },
    SHRIM_EMAIL_KEY: { requiredFor: ["email"] },

    SHRIM_STORAGE_PROVIDER: { requiredFor: ["storage"] },
    SHRIM_STORAGE_KEY: { requiredFor: ["storage"] },

    SHRIM_BROWSER_PROVIDER: { requiredFor: ["browser"] }
};
