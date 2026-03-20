import { readProjectConfig, hasProjectConfig } from '../services/config-service';
import { promptEnvValues, writeEnvFile } from '../services/env-service';
import { logger } from '../utils/logger';

export async function runEnvSetupCommand(): Promise<void> {
    const currentDir = process.cwd();

    try {
        const hasConfig = await hasProjectConfig(currentDir);
        if (!hasConfig) {
            logger.error('No .shrimsource/config.json found. Are you in a Shrimsource project directory?');
            return;
        }

        const config = await readProjectConfig(currentDir);
        logger.info(`Found project configured with template '${config.template}'.`);
        logger.info(`Required capabilities: ${config.capabilities.join(', ')}`);

        const { values } = await promptEnvValues(config.capabilities);

        await writeEnvFile(currentDir, values);

        // Config updates could be written back here if providers changed
        // For MVP, just updating the .env is the primary goal

        logger.success('.env updated successfully.');
    } catch (error: any) {
        logger.error(`Env setup failed: ${error.message}`);
    }
}
