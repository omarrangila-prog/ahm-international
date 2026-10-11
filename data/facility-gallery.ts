import { hasCanonicalAsset, resolveAsset, type AssetKey } from "./assets";

/**
 * The facility gallery on /manufacturing-network.
 *
 * Two galleries, one under each heading, so a photograph's attribution is the
 * section it sits in as well as its label: AHM's own manufacturing, and partner
 * facilities. Attribution comes from the slot's path (`facility/own/`,
 * `facility/partner/`), set when the file is placed, not from a caption that
 * could be edited apart from it.
 *
 * A slot appears only when its own file exists. A generated file never
 * appears, labelled or not: an image of the facility has to be a photograph
 * of the facility (CLAUDE.md, "Generated scenes are not photographs").
 * Until a photograph is supplied there is no gallery, and the page says that
 * facility photographs are not yet published. The empty slots are listed in
 * assets-needed.md as the shot list.
 */

export type Facility = "own" | "partner";

export const FACILITY_LABEL: Record<Facility, string> = {
  own: "AHM-owned manufacturing",
  partner: "Partner facility",
};

type Slot = { asset: AssetKey; facility: Facility; caption: string };

export const facilitySlots: Slot[] = [
  { asset: "facility.own.cutting", facility: "own", caption: "Cutting" },
  { asset: "facility.own.sewing", facility: "own", caption: "Stitching" },
  { asset: "facility.own.reinforcement", facility: "own", caption: "Reinforcement stitching" },
  { asset: "facility.own.inspection", facility: "own", caption: "Inspection against the approved sample" },
  { asset: "facility.own.sampling", facility: "own", caption: "Sample development" },
  { asset: "facility.own.packing", facility: "own", caption: "Packing to buyer instruction" },
  { asset: "facility.partner.floor", facility: "partner", caption: "Production floor" },
  { asset: "facility.partner.process", facility: "partner", caption: "Specialist process" },
  { asset: "facility.partner.inspection", facility: "partner", caption: "Inspection" },
];

export type FacilityPhoto = Slot & { label: string };

/** The photographs that exist for one kind of facility, in shot-list order. */
export function facilityPhotos(facility: Facility): FacilityPhoto[] {
  return facilitySlots
    .filter((s) => s.facility === facility && hasCanonicalAsset(s.asset) && !resolveAsset(s.asset).generated)
    .map((s) => ({ ...s, label: FACILITY_LABEL[s.facility] }));
}
