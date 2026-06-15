import type {
  Lead,
  LeadStatus,
  LeadSource,
  ConversationMessage,
  Note,
  NextAction,
} from "@/types";

/* Deterministic generator (no randomness) so SSR and client agree. */

const people: [string, string, string][] = [
  ["Marcus", "Bennett", "VP of Sales"],
  ["Priya", "Nair", "Founder & CEO"],
  ["Diego", "Alvarez", "Head of Growth"],
  ["Sara", "Whitfield", "Managing Director"],
  ["Liam", "O'Connor", "Director of Revenue"],
  ["Amara", "Okafor", "Chief Marketing Officer"],
  ["Noah", "Kim", "Head of Partnerships"],
  ["Elena", "Rossi", "VP of Marketing"],
  ["Caleb", "Stewart", "Sales Manager"],
  ["Yuki", "Tanaka", "Founder"],
  ["Hannah", "Berg", "COO"],
  ["Omar", "Haddad", "Head of Sales"],
  ["Sophia", "Lindqvist", "Growth Lead"],
  ["Ethan", "Walsh", "Account Executive"],
  ["Maya", "Patel", "VP of Operations"],
  ["Lucas", "Moreau", "CEO"],
  ["Isabella", "Costa", "Head of Demand Gen"],
  ["Adrian", "Novak", "Director of Sales"],
  ["Chloe", "Dubois", "Marketing Director"],
  ["Ryan", "Fitzgerald", "RevOps Lead"],
  ["Aisha", "Rahman", "Founder & CTO"],
  ["Daniel", "Schmidt", "VP of Business Dev"],
  ["Nadia", "Petrova", "Head of Marketing"],
  ["Gabriel", "Santos", "Sales Director"],
  ["Freya", "Andersen", "CEO & Co-founder"],
  ["Victor", "Ibrahim", "Head of Revenue"],
  ["Leah", "Goldberg", "VP Customer Success"],
  ["Tomas", "Novotny", "Growth Manager"],
  ["Riya", "Kapoor", "Founder"],
  ["Oscar", "Lindgren", "Head of GTM"],
  ["Jade", "Nguyen", "Marketing Lead"],
  ["Felix", "Bauer", "Director of Partnerships"],
  ["Zara", "Malik", "VP of Sales"],
  ["Henrik", "Larsen", "COO"],
  ["Camila", "Reyes", "Head of Growth"],
  ["Arjun", "Mehta", "Founder & CEO"],
];

const companies: [string, string][] = [
  ["Northwind", "SaaS"],
  ["Quanta Labs", "AI / ML"],
  ["Helio Co.", "Fintech"],
  ["Apex Labs", "Marketing"],
  ["Lumen", "Analytics"],
  ["Vertex", "Cybersecurity"],
  ["Cobalt", "DevTools"],
  ["Nimbus", "Cloud Infra"],
  ["Orbit", "E-commerce"],
  ["Forge", "Manufacturing"],
  ["Pulse", "HealthTech"],
  ["Atlas", "Logistics"],
];

const locations = [
  "San Francisco, US",
  "London, UK",
  "Berlin, DE",
  "Toronto, CA",
  "Austin, US",
  "Singapore, SG",
  "Amsterdam, NL",
  "Sydney, AU",
  "Stockholm, SE",
  "New York, US",
  "Dublin, IE",
  "Bangalore, IN",
];

const sources: LeadSource[] = [
  "AI Discovery",
  "LinkedIn",
  "Cold Email",
  "Referral",
  "Website",
  "Inbound",
];
const statuses: LeadStatus[] = [
  "new",
  "contacted",
  "interested",
  "qualified",
  "closed",
];
const intents: Lead["intent"][] = ["low", "medium", "high"];

const tagPool = [
  "Enterprise",
  "SMB",
  "Champion",
  "Decision Maker",
  "Warm",
  "High Intent",
  "Demo Requested",
  "Budget Confirmed",
  "Re-engage",
  "Competitor User",
];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

function insightsFor(lead: Omit<Lead, "insights" | "notes" | "conversation" | "nextActions">): string[] {
  return [
    `${lead.intent === "high" ? "Strong" : "Moderate"} buying intent — ${lead.score}/100 fit score for your ICP.`,
    `${lead.company} is in ${lead.industry}; similar accounts convert ${lead.score > 70 ? "2.3x" : "1.4x"} above average.`,
    `Best next touch: ${lead.status === "new" ? "personalized intro email" : lead.status === "qualified" ? "book a demo" : "value-led follow-up"}.`,
  ];
}

function conversationFor(lead: { name: string; status: LeadStatus }): ConversationMessage[] {
  if (lead.status === "new") return [];
  const base: ConversationMessage[] = [
    {
      id: "c1",
      channel: "email",
      direction: "out",
      body: `Hi ${lead.name.split(" ")[0]}, noticed your team is scaling outbound — thought stphnLead AI could help you book more meetings with less manual work. Open to a quick look?`,
      at: "2026-06-10T09:12:00Z",
    },
  ];
  if (lead.status !== "contacted") {
    base.push({
      id: "c2",
      channel: "email",
      direction: "in",
      body: "This is interesting — how does the AI scoring actually work? We get a lot of low-quality leads today.",
      at: "2026-06-11T14:03:00Z",
    });
    base.push({
      id: "c3",
      channel: "email",
      direction: "out",
      body: "Great question — it scores fit + intent from firmographic and engagement signals so your reps work the hottest first. Happy to show you live. Does Thursday 2pm work?",
      at: "2026-06-11T15:20:00Z",
    });
  }
  return base;
}

function notesFor(lead: { status: LeadStatus }): Note[] {
  if (lead.status === "new") return [];
  return [
    {
      id: "n1",
      author: "Alex Stone",
      body:
        lead.status === "qualified"
          ? "Budget confirmed, evaluating against one competitor. Send case study + ROI calc."
          : "Engaged on the last email. Worth a personalized follow-up this week.",
      createdAt: "2026-06-12T10:00:00Z",
    },
  ];
}

function actionsFor(lead: { status: LeadStatus }): NextAction[] {
  const map: Record<LeadStatus, NextAction[]> = {
    new: [
      { id: "x1", label: "Send intro email", due: "Today", done: false, type: "email" },
    ],
    contacted: [
      { id: "x1", label: "Follow up on opener", due: "Tomorrow", done: false, type: "email" },
      { id: "x2", label: "Connect on LinkedIn", due: "This week", done: true, type: "task" },
    ],
    interested: [
      { id: "x1", label: "Share case study", due: "Today", done: false, type: "email" },
      { id: "x2", label: "Propose demo times", due: "Tomorrow", done: false, type: "meeting" },
    ],
    qualified: [
      { id: "x1", label: "Run product demo", due: "Thu 2:00 PM", done: false, type: "meeting" },
      { id: "x2", label: "Send pricing + ROI calc", due: "Fri", done: false, type: "email" },
    ],
    closed: [
      { id: "x1", label: "Send onboarding kickoff", due: "Done", done: true, type: "task" },
    ],
  };
  return map[lead.status];
}

function makeLead(i: number): Lead {
  const [first, last, title] = people[i % people.length];
  const [company, industry] = companies[i % companies.length];
  const name = `${first} ${last}`;
  const status = statuses[i % statuses.length];
  const source = sources[i % sources.length];
  const intent = intents[(i + 1) % intents.length];
  // deterministic score 38-98
  const score = 38 + ((i * 17 + 11) % 61);
  const value = 8000 + ((i * 4300) % 56000);
  const tags = [tagPool[i % tagPool.length], tagPool[(i + 4) % tagPool.length]];
  const dayOffset = (i % 9) + 1;

  const base = {
    id: `lead-${i + 1}`,
    name,
    title,
    company,
    industry,
    email: `${slug(first)}.${slug(last)}@${slug(company)}.com`,
    phone: `+1 (415) 55${(i % 9) + 1}-0${100 + i}`,
    location: locations[i % locations.length],
    score,
    status,
    intent,
    source,
    lastContact: `2026-06-${String(15 - (dayOffset % 14)).padStart(2, "0")}T12:00:00Z`,
    createdAt: `2026-05-${String((i % 27) + 1).padStart(2, "0")}T09:00:00Z`,
    value,
    tags,
  };

  return {
    ...base,
    insights: insightsFor(base),
    conversation: conversationFor({ name, status }),
    notes: notesFor({ status }),
    nextActions: actionsFor({ status }),
  };
}

export const leads: Lead[] = Array.from({ length: 36 }, (_, i) => makeLead(i));

export const leadCounts = leads.reduce(
  (acc, lead) => {
    acc[lead.status] = (acc[lead.status] ?? 0) + 1;
    return acc;
  },
  {} as Record<LeadStatus, number>,
);
