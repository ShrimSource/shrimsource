import OpenAI from 'openai'
import { getLLMConfig } from './config.js'

/**
 * Creates an OpenAI-compatible client configured from environment variables.
 * Works with OpenRouter, OpenAI, or any OpenAI-compatible API (local or cloud).
 *
 * Reads:
 *   LLM_API_KEY  — your API key
 *   LLM_BASE_URL — base URL (default: https://openrouter.ai/api/v1)
 */
export function createLLMClient(): OpenAI {
    const { baseUrl, apiKey } = getLLMConfig()
    return new OpenAI({
        apiKey: apiKey || '',
        baseURL: baseUrl || 'https://openrouter.ai/api/v1',
    })
}

/**
 * Convenience helper: send a single user prompt and get the text response.
 * Model is read from LLM_MODEL env var (default: openai/gpt-4o-mini).
 */
export async function chat(prompt: string): Promise<string> {
    const { model } = getLLMConfig()
    const client = createLLMClient()
    const res = await client.chat.completions.create({
        model: model || 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
    })
    return res.choices[0].message.content ?? ''
}
