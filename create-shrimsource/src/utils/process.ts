import { spawn } from 'child_process';

export function runCommandInteractive(command: string, args: string[], cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            // Needed on Windows particularly for npm commands
            shell: true
        });

        child.on('close', (code: number | null) => {
            if (code === 0) resolve();
            else reject(new Error(`Command ${command} failed with exit code ${code}`));
        });

        child.on('error', (err: Error) => reject(err));
    });
}
