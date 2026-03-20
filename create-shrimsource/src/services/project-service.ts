import { ensureDir, exists } from '../utils/fs';
import { FILES } from '../constants/files';
import path from 'path';

export function resolveProjectDir(templateName: string): string {
    // MVP: just use template name as dir name in current cwd
    return path.resolve(process.cwd(), templateName);
}

export async function ensureProjectDir(projectDir: string): Promise<void> {
    const dirExists = await exists(projectDir);
    if (dirExists) {
        throw new Error(`Directory ${path.basename(projectDir)} already exists.`);
    }
    await ensureDir(projectDir);
}

export async function ensureShrimsourceMetaDir(projectDir: string): Promise<void> {
    const metaDir = path.join(projectDir, FILES.META_DIR);
    await ensureDir(metaDir);
}
