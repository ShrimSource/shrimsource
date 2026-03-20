import { TemplateMeta } from '../templates/registry';

export function resolveTemplateSource(template: TemplateMeta): string {
    if (template.source.type === 'github') {
        const { repo, branch = 'main', subdir } = template.source;

        let source = `github:${repo}`;

        if (subdir) {
            source += `/${subdir}`;
        }

        source += `#${branch}`;

        return source;
    }

    if (template.source.type === 'file') {
        // file: protocol tells giget to treat it as a local filesystem directory
        // Alternatively, giget just accepts an absolute or relative path string without protocol
        return template.source.dir;
    }

    throw new Error(`Unsupported template source type: ${(template.source as any).type}`);
}
