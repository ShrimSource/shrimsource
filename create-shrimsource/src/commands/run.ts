import path from 'path';
import fs from 'fs/promises';
import { logger } from '../utils/logger';
import { runCommandInteractive } from '../utils/process';
import { askSelect } from '../utils/prompt';
import { exists } from '../utils/fs';

export async function runRunCommand(target?: string): Promise<void> {
    try {
        const cwd = process.cwd();
        let projectDir = '';

        if (target) {
            projectDir = path.resolve(cwd, target);
            if (!(await exists(projectDir))) {
                logger.error(`Project directory not found: ${projectDir}`);
                return;
            }
        } else {
            // Scan current directory for valid projects
            const files = await fs.readdir(cwd, { withFileTypes: true });
            const validProjects: string[] = [];

            for (const file of files) {
                if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
                    const dirPath = path.join(cwd, file.name);
                    const configPath = path.join(dirPath, '.shrimsource', 'config.json');
                    if (await exists(configPath)) {
                        validProjects.push(file.name);
                    }
                }
            }

            if (validProjects.length === 0) {
                logger.error('No valid Shrimsource projects found in the current directory.');
                logger.info('Make sure you are in a directory containing generated agent projects.');
                logger.info('Or specify a directory name: create-shrimsource run <project-name>');
                return;
            }

            if (validProjects.length === 1) {
                projectDir = path.join(cwd, validProjects[0]);
                logger.info(`Found active project: ${validProjects[0]}`);
            } else {
                const options = validProjects.map(p => ({ value: p, label: p }));
                const selected = await askSelect('Which project would you like to run?', options);
                projectDir = path.join(cwd, selected);
            }
        }

        // Verify it has package.json
        const pkgPath = path.join(projectDir, 'package.json');
        if (!(await exists(pkgPath))) {
            logger.error(`Cannot run project: No package.json found in ${projectDir}`);
            return;
        }
        
        logger.info(`Starting agent in ${path.basename(projectDir)}...`);
        await runCommandInteractive('npm', ['run', 'agent'], projectDir);
    } catch (error: any) {
        if (error.name === 'ExitPromptError') {
            process.exit(0);
        }
        logger.error(`Failed to run project: ${error.message}`);
    }
}
