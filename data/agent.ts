export interface PromptSuggestion {
  icon: string;
  label: string;
  prompt: string;
}

export const capabilities = [
  { icon: "Radar", label: "Find leads" },
  { icon: "Columns3", label: "Analyze CRM" },
  { icon: "Send", label: "Suggest outreach" },
  { icon: "ChartSpline", label: "Summarize pipeline" },
];

export const promptSuggestions: PromptSuggestion[] = [
  {
    icon: "Radar",
    label: "Find SaaS leads",
    prompt: "Find high-intent SaaS leads in my target niche.",
  },
  {
    icon: "ChartSpline",
    label: "Summarize my pipeline",
    prompt: "Summarize the current state of my pipeline.",
  },
  {
    icon: "Send",
    label: "Draft a follow-up",
    prompt: "Draft a follow-up email to a warm lead who went quiet.",
  },
  {
    icon: "Columns3",
    label: "Which deals are at risk?",
    prompt: "Which deals in my CRM are at risk of slipping?",
  },
];

/** Keyword-matched canned responses (mock agent). */
export function generateAgentReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("find") || q.includes("lead") || q.includes("saas")) {
    return "I found 34 high-quality SaaS leads in your target niche. 12 have high buying intent — they've visited pricing pages or engaged with competitors recently.\n\nTop matches:\n• Northwind — VP of Sales · score 92\n• Quanta Labs — Founder · score 88\n• Cobalt — Head of Partnerships · score 85\n\nWant me to draft personalized outreach for the top 12?";
  }

  if (q.includes("pipeline") || q.includes("summar")) {
    return "Here's your pipeline at a glance:\n\n• Open pipeline: $1.28M across 14 active deals\n• Weighted forecast: $612k (probability-adjusted)\n• Win rate: 67% (last 30 days)\n• Avg. deal size: $34k\n\nMomentum is strong, but $109k sits in Negotiation with no activity in 6+ days. I'd prioritize Acme Inc. and Atlas this week.";
  }

  if (q.includes("risk") || q.includes("slip") || q.includes("at risk")) {
    return "3 deals look at risk:\n\n• Acme Inc. ($48k) — no reply in 6 days, champion went quiet\n• Atlas ($61k) — competitor renewal in 30 days\n• Cobalt ($54k) — single-threaded, no exec sponsor\n\nRecommended next step: book a check-in with Acme today and loop an exec into Cobalt. Want me to schedule these?";
  }

  if (q.includes("draft") || q.includes("email") || q.includes("follow")) {
    return "Here's a follow-up you can send right now:\n\nSubject: Quick thought, {{first_name}}\n\nHi {{first_name}} — circling back on this. Since we last spoke, a few teams like yours started using stphnLead AI to book ~3x more meetings without adding headcount.\n\nWorth a quick 15 minutes this week to see if it fits? Happy to work around your calendar.\n\nWant me to personalize this for a specific lead?";
  }

  return "Got it. I can find and score new leads, analyze your CRM, draft and time outreach, and summarize your pipeline. Tell me what you'd like to focus on — for example, “find fintech leads with high intent” or “which deals should I prioritize today?”";
}
