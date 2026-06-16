"use client";

import * as React from "react";
import {
  Clock,
  MapPin,
  Video,
  Users,
  Sparkles,
  ArrowLeft,
  CalendarCheck,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { meetingTypeConfig } from "@/data/meetings";
import { formatDay, formatTime, formatTimeRange, cn } from "@/lib/utils";
import type { Meeting } from "@/types";

const tabs = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export function MeetingsView({ meetings }: { meetings: Meeting[] }) {
  const [tab, setTab] = React.useState("upcoming");
  const list = React.useMemo(
    () =>
      meetings
        .filter((m) =>
          tab === "upcoming" ? m.status === "upcoming" : m.status !== "upcoming",
        )
        .sort((a, b) => a.start.localeCompare(b.start)),
    [meetings, tab],
  );

  const [activeId, setActiveId] = React.useState<string | null>(
    meetings.find((m) => m.status === "upcoming")?.id ?? null,
  );
  const [showDetailMobile, setShowDetailMobile] = React.useState(false);

  React.useEffect(() => {
    if (!list.some((m) => m.id === activeId)) {
      setActiveId(list[0]?.id ?? null);
    }
  }, [list, activeId]);

  const active = meetings.find((m) => m.id === activeId) ?? null;

  // group by day
  const groups = React.useMemo(() => {
    const map = new Map<string, Meeting[]>();
    list.forEach((m) => {
      const key = formatDay(m.start);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return [...map.entries()];
  }, [list]);

  const upcomingCount = meetings.filter((m) => m.status === "upcoming").length;

  return (
    <div className="space-y-5">
      {/* stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Upcoming", value: upcomingCount, sub: "scheduled" },
          { label: "Completed", value: meetings.filter((m) => m.status === "completed").length, sub: "this month" },
          { label: "Show rate", value: "94%", sub: "last 30 days" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/[0.07] bg-surface/50 p-4 ring-glow"
          >
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {s.value}
            </p>
            <p className="text-[11px] text-faint">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/40 ring-glow">
        <div className="px-4">
          <Tabs items={tabs} value={tab} onValueChange={setTab} />
        </div>

        <div className="flex min-h-[28rem]">
          {/* agenda list */}
          <div
            className={cn(
              "w-full divide-y divide-white/[0.04] overflow-y-auto border-r border-white/[0.06] lg:w-[22rem] lg:shrink-0",
              showDetailMobile && "hidden lg:block",
            )}
          >
            {groups.map(([day, dayMeetings]) => (
              <div key={day}>
                <div className="sticky top-0 bg-surface/90 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-faint backdrop-blur">
                  {day}
                </div>
                {dayMeetings.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveId(m.id);
                      setShowDetailMobile(true);
                    }}
                    className={cn(
                      "flex w-full gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.025]",
                      m.id === activeId && "bg-brand-500/[0.07]",
                    )}
                  >
                    <div className="w-14 shrink-0">
                      <p className="text-sm font-semibold text-foreground">
                        {formatTime(m.start)}
                      </p>
                      <p className="text-[11px] text-faint">{m.durationMins}m</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {m.leadName}
                      </p>
                      <p className="truncate text-xs text-faint">{m.company}</p>
                      <Badge
                        tone={meetingTypeConfig[m.type].tone}
                        className="mt-1.5 px-1.5 py-0 text-[10px]"
                      >
                        {meetingTypeConfig[m.type].label}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            ))}
            {list.length === 0 && (
              <p className="p-10 text-center text-sm text-faint">
                No {tab} meetings.
              </p>
            )}
          </div>

          {/* detail */}
          <div
            className={cn(
              "min-w-0 flex-1",
              showDetailMobile ? "block" : "hidden lg:block",
            )}
          >
            {active ? (
              <MeetingDetail
                meeting={active}
                onBack={() => setShowDetailMobile(false)}
              />
            ) : (
              <div className="grid h-full place-items-center p-10">
                <p className="text-sm text-faint">Select a meeting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingDetail({
  meeting,
  onBack,
}: {
  meeting: Meeting;
  onBack: () => void;
}) {
  const isUpcoming = meeting.status === "upcoming";
  return (
    <div className="p-5 sm:p-6">
      <button
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground lg:hidden"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone={meetingTypeConfig[meeting.type].tone}>
            {meetingTypeConfig[meeting.type].label}
          </Badge>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">
            {meeting.title}
          </h2>
          <p className="text-sm text-muted">
            {meeting.leadName} · {meeting.company}
          </p>
        </div>
        {!isUpcoming && (
          <Badge tone="neutral" dot>
            Completed
          </Badge>
        )}
      </div>

      {/* facts */}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {[
          { icon: Clock, value: `${formatDay(meeting.start)} · ${formatTimeRange(meeting.start, meeting.durationMins)}` },
          { icon: Video, value: meeting.location },
          { icon: Users, value: `${meeting.attendees.length} attendees` },
          { icon: MapPin, value: meeting.location === "In person" ? "On-site" : "Remote" },
        ].map((row) => (
          <div
            key={row.value}
            className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-muted"
          >
            <row.icon className="size-4 shrink-0 text-faint" />
            <span className="truncate">{row.value}</span>
          </div>
        ))}
      </div>

      {/* attendees */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold">Attendees</p>
        <div className="flex flex-wrap gap-2">
          {meeting.attendees.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] py-1 pl-1 pr-3"
            >
              <Avatar name={a} size="xs" />
              <span className="text-xs text-muted">{a}</span>
            </span>
          ))}
        </div>
      </div>

      {/* AI prep notes */}
      {meeting.prepNotes && meeting.prepNotes.length > 0 && (
        <div className="mt-5 rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-brand-300" />
            AI prep notes
          </div>
          <ul className="mt-3 space-y-2">
            {meeting.prepNotes.map((note) => (
              <li key={note} className="flex gap-2.5 text-sm text-muted">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* actions */}
      <div className="mt-6 flex items-center gap-2">
        {isUpcoming ? (
          <>
            <Button className="flex-1">
              <Video className="size-4" />
              Join {meeting.location}
            </Button>
            <Button variant="outline" className="flex-1">
              <CalendarCheck className="size-4" />
              Reschedule
            </Button>
          </>
        ) : (
          <Button variant="outline" className="flex-1">
            View summary
          </Button>
        )}
      </div>
    </div>
  );
}
