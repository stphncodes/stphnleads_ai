"use client";

import * as React from "react";
import {
  Search,
  Star,
  MapPin,
  Phone,
  ExternalLink,
  Loader2,
  Globe,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { MapProspect } from "@/types";
import { searchProspectsAction, importProspectsAction } from "@/app/(app)/discover/actions";

const ratingOptions = [4, 4.5, 4.7];
const reviewOptions = [
  { value: 0, label: "Any" },
  { value: 10, label: "10+" },
  { value: 25, label: "25+" },
  { value: 50, label: "50+" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-lg px-3.5 text-sm font-medium transition-colors",
        active
          ? "bg-brand-500/15 text-brand-200 ring-1 ring-brand-500/30"
          : "text-muted hover:bg-white/[0.05] hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function DiscoverView() {
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [minRating, setMinRating] = React.useState(4.5);
  const [minReviews, setMinReviews] = React.useState(10);

  const [results, setResults] = React.useState<MapProspect[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [searched, setSearched] = React.useState(false);
  const [error, setError] = React.useState("");
  const [imported, setImported] = React.useState(0);

  const [searching, startSearch] = React.useTransition();
  const [importing, startImport] = React.useTransition();

  function runSearch() {
    if (!location.trim() || !category.trim()) {
      setError("Enter a location and a business type to search.");
      return;
    }
    setError("");
    setImported(0);
    startSearch(async () => {
      const res = await searchProspectsAction({
        location: location.trim(),
        category: category.trim(),
        minRating,
        minReviews,
      });
      setResults(res);
      setSelected(new Set());
      setSearched(true);
    });
  }

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allSelected = results.length > 0 && selected.size === results.length;
  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(results.map((r) => r.id)));
  }

  function importSelected() {
    const chosen = results.filter((r) => selected.has(r.id));
    if (!chosen.length) return;
    startImport(async () => {
      const { imported: n } = await importProspectsAction(chosen);
      setImported(n);
      setResults((rs) => rs.filter((r) => !selected.has(r.id)));
      setSelected(new Set());
    });
  }

  return (
    <div className="space-y-6">
      {/* search form */}
      <div className="rounded-2xl border border-white/[0.07] bg-surface/60 p-5 ring-glow sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="loc">Location</Label>
            <Input
              id="loc"
              placeholder="City or area, e.g. Austin, TX"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cat">Business type</Label>
            <Input
              id="cat"
              placeholder="e.g. dentist, plumber, gym, salon"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-muted">Min rating</span>
            {ratingOptions.map((r) => (
              <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>
                {r.toFixed(1)}+ ★
              </Chip>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-muted">Reviews</span>
            {reviewOptions.map((o) => (
              <Chip
                key={o.value}
                active={minReviews === o.value}
                onClick={() => setMinReviews(o.value)}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={runSearch} disabled={searching}>
            {searching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            Find prospects
          </Button>
          <p className="text-xs text-faint">
            Highly-rated businesses with{" "}
            <span className="text-muted">no website</span> on their Google listing.
          </p>
        </div>
        {error && <p className="mt-3 text-xs text-rose-300">{error}</p>}
      </div>

      {/* imported confirmation */}
      {imported > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          <CheckCircle2 className="size-4" />
          Added {imported} {imported === 1 ? "prospect" : "prospects"} to your Leads
          pipeline.
        </div>
      )}

      {/* results */}
      {searching ? (
        <div className="grid place-items-center py-20 text-muted">
          <Loader2 className="size-6 animate-spin" />
          <p className="mt-3 text-sm">Scanning Google Maps…</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={allSelected}
                indeterminate={selected.size > 0 && !allSelected}
                onChange={toggleAll}
                aria-label="Select all prospects"
              />
              <span className="text-sm text-muted">
                {results.length} {results.length === 1 ? "business" : "businesses"} found
                {selected.size > 0 && ` · ${selected.size} selected`}
              </span>
            </div>
            <Button
              size="sm"
              onClick={importSelected}
              disabled={selected.size === 0 || importing}
            >
              {importing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              Add {selected.size > 0 ? selected.size : ""} to Leads
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 ring-glow">
            {results.map((p) => {
              const isSel = selected.has(p.id);
              return (
                <div
                  key={p.id}
                  className={cn(
                    "flex items-start gap-3 border-b border-white/[0.05] p-4 transition-colors last:border-0",
                    isSel ? "bg-brand-500/[0.06]" : "hover:bg-white/[0.02]",
                  )}
                >
                  <div className="pt-0.5">
                    <Checkbox
                      checked={isSel}
                      onChange={() => toggle(p.id)}
                      aria-label={`Select ${p.name}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{p.name}</p>
                      <Badge tone="warning">
                        <Globe className="size-3" />
                        No website
                      </Badge>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        <Star className="size-3.5 fill-current" />
                        {p.rating.toFixed(1)}
                        <span className="text-faint">({p.reviews})</span>
                      </span>
                      <span className="text-faint">{p.category}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-faint" />
                        {p.address}
                      </span>
                      {p.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="size-3.5 text-faint" />
                          {p.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={p.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  >
                    Maps
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ) : searched ? (
        <div className="grid place-items-center rounded-2xl border border-white/[0.07] bg-surface/40 py-20 text-center">
          <Search className="size-7 text-faint" />
          <p className="mt-3 text-sm font-medium">No matching businesses</p>
          <p className="mt-1 max-w-sm text-xs text-muted">
            Every {category || "business"} near {location || "there"} already has a
            website, or none clear your rating/review filters. Try a broader area or a
            lower threshold.
          </p>
        </div>
      ) : (
        <div className="grid place-items-center rounded-2xl border border-dashed border-white/10 bg-surface/30 py-20 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-500">
            <MapPin className="size-6 text-white" />
          </span>
          <p className="mt-4 text-sm font-medium">Find your next clients on Google Maps</p>
          <p className="mt-1 max-w-md text-xs text-muted">
            Search a location and business type to surface highly-rated owners who have
            no website yet — ideal prospects for a web build or CRM. Select the good
            ones and add them straight to your pipeline.
          </p>
        </div>
      )}
    </div>
  );
}
