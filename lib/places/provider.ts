import type { MapProspect, ProspectSearchParams } from "@/types";

/**
 * Google Maps prospect provider — the single seam between the app and the
 * place-data source.
 *
 * v1 returns a DETERMINISTIC mock so the feature is fully clickable with no API
 * key or cost. To go live, swap the body of `searchPlaces` for a call to the
 * Google Places API (New) `places:searchText` endpoint and map the response
 * into `MapProspect[]` — nothing else in the app changes. Sketch:
 *
 *   const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
 *     method: "POST",
 *     headers: {
 *       "Content-Type": "application/json",
 *       "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
 *       "X-Goog-FieldMask":
 *         "places.id,places.displayName,places.formattedAddress,places.rating," +
 *         "places.userRatingCount,places.nationalPhoneNumber,places.websiteUri," +
 *         "places.primaryTypeDisplayName,places.googleMapsUri",
 *     },
 *     body: JSON.stringify({ textQuery: `${params.category} in ${params.location}` }),
 *   });
 *   const { places = [] } = await res.json();
 *   return places.map(toProspect).filter(matchesFilters(params)).sort(byRatingThenReviews);
 *
 * The Places API has no server-side rating filter, so "high rating + no website"
 * is applied client-side here exactly as the mock does below.
 */

const prefixes = ["Bright", "Summit", "Oak Street", "Riverside", "Golden Gate",
  "Evergreen", "Downtown", "Maple", "Lincoln", "Harbor", "Sunset", "Highland",
  "Pioneer", "Liberty", "Crystal", "Heritage", "Cedar", "Lakeside"];
const owners = ["Martinez", "Nguyen", "Patel", "Johnson", "Kowalski", "Rossi",
  "Okafor", "Hansen", "Cohen", "Delgado", "Murphy", "Yamamoto", "Andersson", "Reyes"];
const suffixes = ["Co.", "& Sons", "Studio", "Group", "Services", "Center", "Shop", "Works"];
const streets = ["Main St", "Oak Ave", "2nd St", "Park Blvd", "Cedar Ln", "Elm St",
  "Market St", "Washington Ave", "Sunset Blvd", "Highland Dr", "Pine St", "Commerce Way"];

/** Stable FNV-1a hash so results are deterministic per query (no Math.random). */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
const pick = <T>(arr: T[], n: number): T => arr[n % arr.length];

function titleCase(s: string): string {
  return s.trim().replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

function makeProspect(params: ProspectSearchParams, i: number): MapProspect {
  const cat = titleCase(params.category || "Local Business");
  const city = (params.location || "").split(",")[0].trim() || "Town";
  const h = hash(`${params.location}|${params.category}|${i}`);

  const name =
    h % 3 === 0
      ? `${pick(prefixes, h >> 1)} ${cat}`
      : h % 3 === 1
        ? `${pick(owners, h >> 3)} ${cat} ${pick(suffixes, h >> 6)}`
        : `${cat} of ${city}`;

  const rating = Math.round((3.8 + ((h % 13) / 10)) * 10) / 10; // 3.8 – 5.0
  const reviews = 6 + ((h >> 4) % 880);
  const hasWebsite = (h >> 9) % 10 >= 6; // ~60% have NO website
  const area = 200 + ((h >> 2) % 700);
  const pre = 100 + ((h >> 5) % 900);
  const line = 1000 + ((h >> 7) % 9000);

  return {
    id: `gmb-${i}-${(h >> 1).toString(36)}`,
    name,
    category: cat,
    rating,
    reviews,
    address: `${100 + (h % 900)} ${pick(streets, h >> 2)}, ${params.location || city}`,
    phone: `(${area}) ${pre}-${line}`,
    website: hasWebsite ? `https://${name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com` : null,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${name} ${params.location || city}`,
    )}`,
  };
}

/** Lead heat: high rating + many reviews + no website (opportunity) = hotter. */
export function prospectScore(p: MapProspect): number {
  const ratingPts = Math.round(((p.rating - 3.5) / 1.5) * 45); // ~0–45
  const reviewPts = Math.min(35, Math.round(Math.log10(p.reviews + 1) * 18)); // ~0–35
  return Math.max(0, Math.min(99, 20 + ratingPts + reviewPts));
}

/** Rough first-project estimate for a web/CRM build, for the lead's value. */
export function estimateValue(p: MapProspect): number {
  return 1500 + Math.min(40, p.reviews) * 50 + Math.round((p.rating - 4) * 1000);
}

/**
 * Find highly-rated businesses that have NO website on their Google listing.
 * (v1 filter is "no website only"; rating/review thresholds come from params.)
 */
export async function searchPlaces(params: ProspectSearchParams): Promise<MapProspect[]> {
  const candidates = Array.from({ length: 48 }, (_, i) => makeProspect(params, i));
  return candidates
    .filter(
      (p) =>
        p.website === null &&
        p.rating >= params.minRating &&
        p.reviews >= params.minReviews,
    )
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, 30);
}
