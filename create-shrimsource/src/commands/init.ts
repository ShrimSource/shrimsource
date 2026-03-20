import { getTemplateMeta, copyTemplateToProject, listTemplates } from '../services/template-service';
import { resolveProjectDir, ensureProjectDir, ensureShrimsourceMetaDir } from '../services/project-service';
import { promptEnvValues, writeEnvFile } from '../services/env-service';
import { writeProjectConfig } from '../services/config-service';
import { logger } from '../utils/logger';
import { askSelect, askConfirm } from '../utils/prompt';
import path from 'path';
import { runCommandInteractive } from '../utils/process';

export async function runInitCommand(templateName?: string): Promise<void> {
    try {
        // 2. Figure out which template to use
        let selectedTemplateName = templateName;
        if (!selectedTemplateName) {
            const templates = await listTemplates();
            const options = templates.map(t => ({
                value: t.name,
                label: `${t.name} (${t.description})`
            }));
            selectedTemplateName = await askSelect('Which template would you like to use?', options);
        }

        const template = await getTemplateMeta(selectedTemplateName);
        if (!template) {
            logger.error(`Template '${selectedTemplateName}' not found in registry.`);
            return;
        }

        // 1. Resolve and create directory
        const projectDir = resolveProjectDir(template.name);
        logger.info(`Creating project in ${projectDir}...`);
        await ensureProjectDir(projectDir);

        // 2. Copy template
        logger.info(`Copying template '${template.name}'...`);
        await copyTemplateToProject(template, projectDir);

        // 3. Ensure .shrimsource exists
        await ensureShrimsourceMetaDir(projectDir);

        // 4. Prompt ENV based on capabilities
        logger.info(`Configuring environment for capabilities: ${template.capabilities.join(', ')}`);
        const { values, providers } = await promptEnvValues(template.capabilities);

        // 5. Write .env
        await writeEnvFile(projectDir, values);
        logger.success('.env generated');

        // 6. Write config
        await writeProjectConfig(projectDir, {
            template: template.name,
            capabilities: template.capabilities,
            providers
        });
        logger.success('.shrimsource/config.json written');

        // 7. Success output
        logger.success(`\n✔ Shrimsource project created\n`);

        // 8. Auto-install and Run
        const wantInstall = await askConfirm('Would you like to run `npm install` automatically?');
        if (wantInstall) {
            logger.info('Installing dependencies...');
            await runCommandInteractive('npm', ['install'], projectDir);
            logger.success('Dependencies installed.\n');

            const wantRun = await askConfirm('Would you like to start the agent now (`npm run agent`)?');
            if (wantRun) {
                logger.info('Starting agent...');
                await runCommandInteractive('npm', ['run', 'agent'], projectDir);
                return; // Process finishes after running
            }
        }

        logger.info(`Next steps:\n`);
        logger.info(`  cd ${path.basename(projectDir)}`);
        if (!wantInstall) logger.info(`  npm install`);
        logger.info(`  npm run agent`);
    } catch (error: any) {
        logger.error(`Initialization failed: ${error.message}`);
    }
}
