"use client";

import * as React from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Trash2,
  Tag,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScorePill } from "./score-pill";
import { LeadDrawer } from "./lead-drawer";
import { leads as allLeads } from "@/data/leads";
import {
  leadStatusConfig,
  leadStatusOrder,
} from "@/lib/lead-status";
import { formatClock, cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

type SortKey = "name" | "company" | "score" | "status" | "lastContact";
const PAGE_SIZE = 8;

const statusFilters: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...leadStatusOrder.map((s) => ({
    value: s,
    label: leadStatusConfig[s].label,
  })),
];

export function LeadsTable() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<LeadStatus | "all">("all");
  const [sort, setSort] = React.useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "score",
    dir: "desc",
  });
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [activeLead, setActiveLead] = React.useState<Lead | null>(null);

  // filter + sort
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = allLeads.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q)
      );
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      let cmp = 0;
      if (sort.key === "score") cmp = a.score - b.score;
      else if (sort.key === "lastContact")
        cmp = a.lastContact.localeCompare(b.lastContact);
      else if (sort.key === "status")
        cmp =
          leadStatusOrder.indexOf(a.status) - leadStatusOrder.indexOf(b.status);
      else cmp = a[sort.key].localeCompare(b[sort.key]);
      return cmp * dir;
    });
  }, [query, status, sort]);

  // reset to first page when filters change
  React.useEffect(() => setPage(0), [query, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const pageIds = pageRows.map((r) => r.id);
  const allOnPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const someOnPageSelected = pageIds.some((id) => selected.has(id));

  function toggleAllOnPage() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function sortBy(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "name" || key === "company" ? "asc" : "desc" },
    );
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sort.key !== col)
      return <ChevronsUpDown className="size-3.5 text-faint/60" />;
    return sort.dir === "asc" ? (
      <ChevronUp className="size-3.5 text-brand-300" />
    ) : (
      <ChevronDown className="size-3.5 text-brand-300" />
    );
  }

  const headerCell = (label: string, key: SortKey, className?: string) => (
    <th className={cn("px-3 py-3 text-left font-medium", className)}>
      <button
        onClick={() => sortBy(key)}
        className="inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
      >
        {label}
        <SortIcon col={key} />
      </button>
    </th>
  );

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads…"
            className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:border-brand-500/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-brand-500/15"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={cn(
                "h-8 whitespace-nowrap rounded-lg px-3 text-[13px] font-medium transition-colors",
                status === f.value
                  ? "bg-brand-500/15 text-brand-200 ring-1 ring-brand-500/30"
                  : "text-muted hover:bg-white/[0.05] hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
          <Button variant="outline" size="sm" className="shrink-0">
            <SlidersHorizontal className="size-3.5" />
            Filters
          </Button>
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/40 ring-glow">
        {/* bulk action bar */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 border-b border-white/[0.07] bg-brand-500/[0.06] px-4 py-2.5">
            <Checkbox
              checked={allOnPageSelected}
              indeterminate={!allOnPageSelected && someOnPageSelected}
              onChange={toggleAllOnPage}
              aria-label="Select all on page"
            />
            <span className="text-sm font-medium text-foreground">
              {selected.size} selected
            </span>
            <div className="ml-2 flex items-center gap-1.5">
              <Button variant="subtle" size="sm">
                <Mail className="size-3.5" />
                Email
              </Button>
              <Button variant="subtle" size="sm">
                <Tag className="size-3.5" />
                Tag
              </Button>
              <Button variant="subtle" size="sm">
                <Trash2 className="size-3.5" />
                Delete
              </Button>
            </div>
            <button
              onClick={() => setSelected(new Set())}
              className="ml-auto inline-flex items-center gap-1 text-xs text-muted hover:text-foreground"
            >
              <X className="size-3.5" />
              Clear
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] text-xs">
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allOnPageSelected}
                    indeterminate={!allOnPageSelected && someOnPageSelected}
                    onChange={toggleAllOnPage}
                    aria-label="Select all"
                  />
                </th>
                {headerCell("Name", "name")}
                {headerCell("Company", "company")}
                <th className="px-3 py-3 text-left font-medium text-muted">
                  Industry
                </th>
                <th className="px-3 py-3 text-left font-medium text-muted">
                  Email
                </th>
                {headerCell("Score", "score")}
                {headerCell("Status", "status")}
                {headerCell("Last Contact", "lastContact")}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setActiveLead(lead)}
                  className={cn(
                    "cursor-pointer border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.025]",
                    selected.has(lead.id) && "bg-brand-500/[0.05]",
                  )}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.has(lead.id)}
                      onChange={() => toggleOne(lead.id)}
                      aria-label={`Select ${lead.name}`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={lead.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {lead.name}
                        </p>
                        <p className="truncate text-xs text-faint">
                          {lead.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted">{lead.company}</td>
                  <td className="px-3 py-3 text-muted">{lead.industry}</td>
                  <td className="px-3 py-3 text-muted">
                    <span className="truncate">{lead.email}</span>
                  </td>
                  <td className="px-3 py-3">
                    <ScorePill score={lead.score} />
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={leadStatusConfig[lead.status].tone} dot>
                      {leadStatusConfig[lead.status].label}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-faint">
                    {formatClock(lead.lastContact)}
                  </td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <p className="text-sm text-muted">No leads match your filters.</p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setStatus("all");
                      }}
                      className="mt-2 text-xs text-brand-300 hover:text-brand-200"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 text-sm">
          <p className="text-muted">
            {filtered.length === 0
              ? "0 results"
              : `${safePage * PAGE_SIZE + 1}–${Math.min(
                  (safePage + 1) * PAGE_SIZE,
                  filtered.length,
                )} of ${filtered.length}`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  "grid size-8 place-items-center rounded-lg text-[13px] font-medium transition-colors",
                  i === safePage
                    ? "bg-brand-500/15 text-brand-200"
                    : "text-muted hover:bg-white/[0.06] hover:text-foreground",
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage >= pageCount - 1}
              className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <LeadDrawer lead={activeLead} onClose={() => setActiveLead(null)} />
    </div>
  );
}
