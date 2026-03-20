#!/usr/bin/env node
import { runCli } from './cli';

async function main() {
    await runCli(process.argv);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
