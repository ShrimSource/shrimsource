import { ProjectConfig } from '../templates/registry';
import { FILES } from '../constants/files';
import { writeJsonFile, readJsonFile, exists } from '../utils/fs';
import path from 'path';

export async function writeProjectConfig(projectDir: string, config: ProjectConfig): Promise<void> {
    const configPath = path.join(projectDir, FILES.CONFIG);
    await writeJsonFile(configPath, config);
}

export async function readProjectConfig(projectDir: string): Promise<ProjectConfig> {
    const configPath = path.join(projectDir, FILES.CONFIG);
    return readJsonFile<ProjectConfig>(configPath);
}

export async function hasProjectConfig(projectDir: string): Promise<boolean> {
    const configPath = path.join(projectDir, FILES.CONFIG);
    return exists(configPath);
}
