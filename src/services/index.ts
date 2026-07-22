// Service registry: the single source of truth for which service pages
// exist. Order here is the display order on /services and the homepage grid.
import type { ServiceContent } from './types';
import customSoftware from './content/custom-software';
import integrations from './content/integrations';
import aiAutomation from './content/ai-automation';
import legacyModernization from './content/legacy-modernization';
import vibeCodeRescue from './content/vibe-code-rescue';
import fractionalEngineeringTeam from './content/fractional-engineering-team';

export type { ServiceContent, ServiceFaq, ServiceItem, ServiceStep } from './types';

export const SERVICES: readonly ServiceContent[] = [
  customSoftware,
  integrations,
  aiAutomation,
  legacyModernization,
  vibeCodeRescue,
  fractionalEngineeringTeam,
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}
