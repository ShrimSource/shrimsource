import fetch from 'cross-fetch';

export type Capability = "llm" | "search" | "embed" | "db" | "email" | "storage" | "browser";

export type TemplateSourceGitHub = {
    type: "github";
    repo: string;
    subdir?: string;
    branch?: string;
};

export type TemplateSourceLocal = {
    type: "file";
    dir: string;
};

export type TemplateSource = TemplateSourceGitHub | TemplateSourceLocal;

export type TemplateMeta = {
    name: string;
    description: string;
    source: TemplateSource;
    capabilities: Capability[];
};

export type ProviderOption = {
    id: string;
    label: string;
};

export type ProjectConfig = {
    template: string;
    capabilities: Capability[];
    providers: {
        llm?: string;
        search?: string;
        embed?: string;
        db?: string;
        email?: string;
        storage?: string;
        browser?: string;
    };
};

export type EnvValues = Record<string, string>;

const REGISTRY_URL = 'https://raw.githubusercontent.com/ShrimSource/shrimsource/main/shrimsource-templates/registry.json';

// Caching the registry in memory after first fetch during a CLI run
let registryCache: TemplateMeta[] | null = null;

export async function getAllTemplates(): Promise<TemplateMeta[]> {
    if (registryCache) {
        return registryCache;
    }

    // 🕵️‍♂️ Local Debug Mode
    if (process.env.SHRIM_LOCAL_REGISTRY) {
        try {
            // It expects the path to a json file in the environment variable
            const fs = await import('fs/promises');
            const data = await fs.readFile(process.env.SHRIM_LOCAL_REGISTRY, 'utf-8');
            registryCache = JSON.parse(data) as TemplateMeta[];
            return registryCache;
        } catch (error: any) {
            throw new Error(`Failed to load local registry from ${process.env.SHRIM_LOCAL_REGISTRY}: ${error.message}`);
        }
    }

    try {
        // dynamic import of node-fetch isn't strictly necessary in Node 18+ since `fetch` is native,
        // but we rely on the native `fetch` available in modern Node.js versions.
        const response = await fetch(REGISTRY_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch registry: ${response.statusText}`);
        }
        const data = await response.json();
        registryCache = data as TemplateMeta[];
        return registryCache;
    } catch (error: any) {
        throw new Error(`Could not load template registry from GitHub: ${error.message}`);
    }
}

export async function findTemplateByName(name: string): Promise<TemplateMeta | undefined> {
    const registry = await getAllTemplates();
    return registry.find(t => t.name === name);
}
