import { listTemplates } from '../services/template-service';
import { runInitCommand } from './init';
import { select } from '@inquirer/prompts';

export async function runListCommand(): Promise<void> {
    const templates = await listTemplates();

    const choices = templates.map(t => {
        let sourceStr = '';
        if (t.source.type === 'github') {
            sourceStr = `[GitHub] ${t.source.repo}${t.source.subdir ? `/${t.source.subdir}` : ''}`;
        } else if (t.source.type === 'file') {
            sourceStr = `[Local] ${t.source.dir}`;
        } else {
            sourceStr = `[Unknown]`;
        }

        return {
            name: `${t.name} (${t.capabilities.join(', ')})`,
            value: t.name,
            description: `${t.description}\nSource: ${sourceStr}`
        };
    });

    try {
        const selectedTemplateName = await select({
            message: 'Select a template to initialize:',
            choices: choices,
            pageSize: 10
        });

        console.log(`\nStarting initialization for ${selectedTemplateName}...`);
        await runInitCommand(selectedTemplateName);
    } catch (e: any) {
        if (e.name === 'ExitPromptError') {
            process.exit(0);
        } else {
            throw e;
        }
    }
}
