import { downloadTemplate } from 'giget';
import { TemplateMeta, findTemplateByName, getAllTemplates } from '../templates/registry';
import { resolveTemplateSource } from './template-resolver';
import path from 'path';
import fs from 'fs/promises';
import { exists } from '../utils/fs';

export async function getTemplateMeta(name: string): Promise<TemplateMeta | undefined> {
    return await findTemplateByName(name);
}

export async function listTemplates(): Promise<TemplateMeta[]> {
    return await getAllTemplates();
}

export async function copyTemplateToProject(template: TemplateMeta, targetDir: string): Promise<void> {
    const source = resolveTemplateSource(template);

    await downloadTemplate(source, {
        dir: targetDir,
        force: true // Forced copy since we already verified the path is new
    });

    await postProcessTemplate(targetDir);
}

async function postProcessTemplate(targetDir: string) {
    // Clean up any metadata files that come from the monorepo templates base structure
    // but shouldn't be in the instantiated project.
    const filesToDelete = ['.gitignore', 'README.md', '.github'];

    for (const file of filesToDelete) {
        const filePath = path.join(targetDir, file);
        if (await exists(filePath)) {
            // For recursive deletion if needed (e.g. .github folder)
            await fs.rm(filePath, { recursive: true, force: true });
        }
    }
}
