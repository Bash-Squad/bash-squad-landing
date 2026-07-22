import { SERVICES, servicePath } from '../../services';

// llms.txt: the emerging convention for giving AI assistants a compact,
// plain-markdown map of the site (llmstxt.org). Generated from the service
// registry so it never drifts from the real pages. Statically rendered.
export const dynamic = 'force-static';

const SITE_URL = 'https://bashsquad.com';

export function GET(): Response {
  const services = SERVICES.map(
    (s) => `- [${s.name}](${SITE_URL}${servicePath(s.slug)}): ${s.schemaDescription}`,
  ).join('\n');

  const body = `# Bash Squad

> A small crew of senior software engineers who build with AI. Custom software, integrations, AI systems, legacy modernization, and vibe-code rescue for businesses. Clients own the code, the infrastructure, and the knowledge.

Contact: hello@bashsquad.com
GitHub: https://github.com/Bash-Squad

## Services

${services}

## Pages

- [Home](${SITE_URL}/): what we do, our work, who we help
- [Services](${SITE_URL}/services): all services in one place
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
