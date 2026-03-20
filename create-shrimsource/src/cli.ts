import { runInitCommand } from './commands/init';
import { runEnvSetupCommand } from './commands/env-setup';
import { runListCommand } from './commands/list';
import { runRunCommand } from './commands/run';
import { logger } from './utils/logger';

export async function runCli(argv: string[]): Promise<void> {
    const args = argv.slice(2);
    const command = args[0];

    if (command === 'env' && args[1] === 'setup') {
        await runEnvSetupCommand();
    } else if (command === 'list') {
        await runListCommand();
    } else if (command === 'run') {
        await runRunCommand(args[1]);
    } else if (command === 'help' || command === '--help' || command === '-h') {
        logger.info('Usage:');
        logger.info('  create-shrimsource [template-name]    Initialize a new project');
        logger.info('  create-shrimsource run [project-name] Run an existing generated project');
        logger.info('  create-shrimsource list               List available templates');
        logger.info('  create-shrimsource env setup          Reconfigure environment variables');
    } else {
        // Treat the first argument as template name if not recognized
        const templateName = command; // undefined if no args
        await runInitCommand(templateName);
    }
}
