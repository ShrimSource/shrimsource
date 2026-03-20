export async function withTimeout<T>(
    promise: Promise<T>,
    timeoutMs?: number
): Promise<T> {
    if (!timeoutMs || timeoutMs <= 0) {
        return promise
    }

    let timer: ReturnType<typeof setTimeout> | undefined

    const timeoutPromise = new Promise<T>((_, reject) => {
        timer = setTimeout(() => {
            reject(new Error(`Execution timed out after ${timeoutMs}ms`))
        }, timeoutMs)
    })

    try {
        return await Promise.race([promise, timeoutPromise])
    } finally {
        if (timer) clearTimeout(timer)
    }
}

export async function retry<T>(
    fn: () => Promise<T>,
    retryCount: number
): Promise<T> {
    let lastError: unknown

    for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error
        }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError))
}