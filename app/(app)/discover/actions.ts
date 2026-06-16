"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { searchPlaces, prospectScore, estimateValue } from "@/lib/places/provider";
import type { MapProspect, ProspectSearchParams } from "@/types";

/**
 * Server Functions are reachable via direct POST, so every one verifies the
 * caller is authenticated. Writes go through the user-scoped Supabase client,
 * so RLS also enforces that rows can only land under the signed-in user.
 */
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, user };
}

export async function searchProspectsAction(
  params: ProspectSearchParams,
): Promise<MapProspect[]> {
  await requireUser();
  return searchPlaces(params);
}

/** Import selected Google Maps prospects into the user's Leads pipeline. */
export async function importProspectsAction(
  prospects: MapProspect[],
): Promise<{ imported: number }> {
  const { supabase, user } = await requireUser();
  if (!prospects.length) return { imported: 0 };

  const rows = prospects.map((p) => ({
    user_id: user.id,
    name: p.name,
    title: "Owner",
    company: p.name,
    industry: p.category,
    email: "",
    phone: p.phone ?? null,
    location: p.address,
    score: prospectScore(p),
    status: "new",
    intent: p.rating >= 4.6 ? "high" : "medium",
    source: "Google Maps",
    value: estimateValue(p),
    tags: [p.category, "No website"],
    insights: [
      `★ ${p.rating.toFixed(1)} from ${p.reviews} Google reviews`,
      "No website on their Google listing — strong web/CRM prospect",
      p.mapsUrl,
    ],
  }));

  const { data, error } = await supabase.from("leads").insert(rows).select("id");
  if (error) throw new Error(error.message);

  revalidatePath("/leads");
  return { imported: data?.length ?? rows.length };
}
