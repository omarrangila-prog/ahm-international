import type { Metadata } from "next";
import { SourcingPillar, pillarMetadata } from "@/components/pages/SourcingPillar";

/**
 * Keyword-first landing page (brief §38). The old `/sourcing/private-label-manufacturing`
 * path permanently redirects here, so only one URL is canonical.
 */

const SLUG = "private-label-manufacturing";
const PATH = "/private-label-manufacturing";

export const metadata: Metadata = pillarMetadata(SLUG, PATH) as Metadata;

export default function Page() {
  return <SourcingPillar slug={SLUG} basePath={PATH} />;
}
