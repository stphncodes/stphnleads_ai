import type { InboxThread, InboxChannel } from "@/types";

export const inboxChannels: { value: InboxChannel; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "messages", label: "Messages" },
];

type LabelTone =
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "neutral"
  | "danger";

export const labelTones: Record<string, LabelTone> = {
  Hot: "danger",
  Lead: "brand",
  Customer: "success",
  Demo: "accent",
  Proposal: "warning",
  Support: "info",
  "Follow-up": "neutral",
};

export const inboxThreads: InboxThread[] = [
  {
    id: "t1",
    channel: "email",
    contactName: "Marcus Bennett",
    company: "Northwind",
    subject: "Re: Booking more meetings with AI",
    preview: "This looks great — can we talk Thursday?",
    unread: true,
    starred: true,
    labels: ["Hot", "Lead"],
    at: "2026-06-15T13:10:00Z",
    messages: [
      {
        id: "m1",
        channel: "email",
        direction: "out",
        body: "Hi Marcus — thought stphnLead AI could help your team book more meetings without adding headcount. Open to a quick look?",
        at: "2026-06-14T09:00:00Z",
      },
      {
        id: "m2",
        channel: "email",
        direction: "in",
        body: "This looks great — can we talk Thursday? We're trying to fix our outbound before Q3.",
        at: "2026-06-15T13:10:00Z",
      },
    ],
    aiReplies: [
      "Thursday works! Does 2:00 PM your time suit you? I'll send a calendar invite with a Meet link.",
      "Happy to — would Thursday 2pm or 4pm be better? I'll tailor the demo to your Q3 outbound goals.",
      "Great to hear, Marcus. Let's lock Thursday — what's the best email for the invite?",
    ],
  },
  {
    id: "t2",
    channel: "linkedin",
    contactName: "Priya Nair",
    company: "Quanta Labs",
    subject: "Connection + question on lead scoring",
    preview: "How does the AI scoring actually work?",
    unread: true,
    starred: false,
    labels: ["Lead", "Demo"],
    at: "2026-06-15T11:42:00Z",
    messages: [
      {
        id: "m1",
        channel: "linkedin",
        direction: "in",
        body: "Thanks for connecting! How does the AI scoring actually work? We get a lot of low-quality leads today.",
        at: "2026-06-15T11:42:00Z",
      },
    ],
    aiReplies: [
      "Great question! It scores fit + intent from firmographic and engagement signals, so your reps always work the hottest leads first. Want me to show you live?",
      "It blends ICP fit with real buying signals (site visits, opens, replies) into a 0–100 score. Happy to walk you through it — 15 mins this week?",
    ],
  },
  {
    id: "t3",
    channel: "email",
    contactName: "Sara Whitfield",
    company: "Apex Labs",
    subject: "Agency pricing for 14 clients",
    preview: "Can you share agency-tier pricing?",
    unread: false,
    starred: true,
    labels: ["Proposal"],
    at: "2026-06-15T09:20:00Z",
    messages: [
      {
        id: "m1",
        channel: "email",
        direction: "in",
        body: "We run outbound for 14 clients. Can you share agency-tier pricing and whether we can manage them all from one dashboard?",
        at: "2026-06-15T09:20:00Z",
      },
      {
        id: "m2",
        channel: "email",
        direction: "out",
        body: "Absolutely — one dashboard, unlimited client workspaces. Sending the agency tier breakdown now.",
        at: "2026-06-15T09:35:00Z",
      },
    ],
    aiReplies: [
      "Sharing the agency tier now — it includes unlimited client workspaces and consolidated reporting. Want a quick walkthrough of multi-client setup?",
      "Here's the agency pricing. Since you're at 14 clients, you'd land in our best per-seat bracket — happy to put together a custom quote.",
    ],
  },
  {
    id: "t4",
    channel: "messages",
    contactName: "Diego Alvarez",
    company: "Helio Co.",
    subject: "Onboarding kickoff",
    preview: "We're in! When can we start onboarding?",
    unread: false,
    starred: false,
    labels: ["Customer"],
    at: "2026-06-14T16:05:00Z",
    messages: [
      {
        id: "m1",
        channel: "message",
        direction: "in",
        body: "We're in! Signed the annual plan. When can we start onboarding?",
        at: "2026-06-14T16:05:00Z",
      },
    ],
    aiReplies: [
      "Welcome aboard, Diego! 🎉 I can kick off onboarding tomorrow — does 10am work? I'll send a checklist beforehand.",
      "So glad to have Helio on board! Let's schedule your kickoff this week — what day suits your team?",
    ],
  },
  {
    id: "t5",
    channel: "linkedin",
    contactName: "Noah Kim",
    company: "Cobalt",
    subject: "Partnership idea",
    preview: "Could be a fit for a co-marketing play…",
    unread: true,
    starred: false,
    labels: ["Follow-up"],
    at: "2026-06-14T12:30:00Z",
    messages: [
      {
        id: "m1",
        channel: "linkedin",
        direction: "in",
        body: "Following our chat — could be a fit for a co-marketing play with our dev-tools audience. Worth exploring?",
        at: "2026-06-14T12:30:00Z",
      },
    ],
    aiReplies: [
      "Definitely worth exploring, Noah. Your dev-tools audience overlaps nicely with our ICP — want to set up a 20-min partnership chat?",
      "Love the idea. Let's scope a co-marketing pilot — I'll bring a couple of formats that have worked well for us.",
    ],
  },
  {
    id: "t6",
    channel: "email",
    contactName: "Elena Rossi",
    company: "Nimbus",
    subject: "Quick question on integrations",
    preview: "Do you integrate with our CRM?",
    unread: false,
    starred: false,
    labels: ["Support"],
    at: "2026-06-13T15:48:00Z",
    messages: [
      {
        id: "m1",
        channel: "email",
        direction: "in",
        body: "Do you integrate with our existing CRM and calendar? That's a dealbreaker for us.",
        at: "2026-06-13T15:48:00Z",
      },
    ],
    aiReplies: [
      "Yes — native two-way sync with major CRMs plus Google/Outlook calendars. Which CRM are you on? I'll confirm the exact fields we map.",
      "We do! Bi-directional CRM sync and calendar booking are built in. Happy to demo the integration on a quick call.",
    ],
  },
];
