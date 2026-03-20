import { input, select, confirm } from '@inquirer/prompts';

export async function askInput(message: string): Promise<string> {
    return await input({ message });
}

export async function askSelect(message: string, options: { label: string; value: string }[]): Promise<string> {
    const choices = options.map(opt => ({
        name: opt.label,
        value: opt.value
    }));

    return await select({
        message,
        choices
    });
}

export async function askConfirm(message: string): Promise<boolean> {
    return await confirm({
        message,
        default: true
    });
}
