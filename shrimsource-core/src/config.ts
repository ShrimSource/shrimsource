import { env } from "./config/env";

export type LLMConfig = {
    model?: string
    baseUrl?: string
    apiKey?: string
}

export function getLLMConfig(): LLMConfig {
    return {
        model: env.llmModel,
        baseUrl: env.llmBaseUrl,
        apiKey: env.llmKey
    }
}
