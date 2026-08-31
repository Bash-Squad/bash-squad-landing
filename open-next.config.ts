import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Every route is prerendered at build time and nothing revalidates, so the
// incremental cache is read-only: serve the build-time prerenders straight
// from the deployed static assets. No R2/KV bucket to provision — if the site
// ever adds ISR/revalidation, switch to the R2 incremental cache.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
