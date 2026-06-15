import type { Deal, DealStage, Priority } from "@/types";

const seeds: [string, string, string, DealStage, number, Priority, number][] = [
  // title-lead, company, email, stage, value, priority, probability
  ["Northwind — Pro rollout", "Northwind", "marcus@northwind.com", "negotiation", 48000, "high", 75],
  ["Quanta Labs — Team plan", "Quanta Labs", "priya@quantalabs.com", "proposal", 32000, "high", 60],
  ["Helio Co. — Annual", "Helio Co.", "diego@helioco.com", "won", 26000, "medium", 100],
  ["Apex Labs — Agency tier", "Apex Labs", "sara@apexlabs.com", "qualified", 41000, "high", 45],
  ["Lumen — Starter", "Lumen", "liam@lumen.com", "new", 12000, "low", 20],
  ["Vertex — Security add-on", "Vertex", "amara@vertex.com", "proposal", 38000, "medium", 55],
  ["Cobalt — Scale", "Cobalt", "noah@cobalt.com", "negotiation", 54000, "high", 70],
  ["Nimbus — Cloud bundle", "Nimbus", "elena@nimbus.com", "qualified", 29000, "medium", 40],
  ["Orbit — Growth", "Orbit", "caleb@orbit.com", "new", 16000, "low", 15],
  ["Forge — Enterprise", "Forge", "yuki@forge.com", "won", 72000, "high", 100],
  ["Pulse — Pro", "Pulse", "hannah@pulse.com", "proposal", 22000, "medium", 50],
  ["Atlas — Logistics suite", "Atlas", "omar@atlas.com", "negotiation", 61000, "high", 65],
  ["Lumen — Analytics upsell", "Lumen", "sophia@lumen.com", "qualified", 18000, "low", 35],
  ["Orbit — Enterprise", "Orbit", "ethan@orbit.com", "lost", 34000, "medium", 0],
  ["Nimbus — Add seats", "Nimbus", "maya@nimbus.com", "new", 9000, "low", 18],
  ["Vertex — Renewal", "Vertex", "lucas@vertex.com", "won", 45000, "high", 100],
  ["Cobalt — Pilot", "Cobalt", "isabella@cobalt.com", "qualified", 14000, "medium", 38],
  ["Apex Labs — Expansion", "Apex Labs", "adrian@apexlabs.com", "lost", 27000, "low", 0],
];

const owners = ["Alex Stone", "Jordan Lee", "Sam Rivera"];
const aiSuggestions = [
  "No activity in 6 days — schedule a check-in before it cools.",
  "Champion identified. Loop in their VP to accelerate.",
  "Send the ROI calculator; they're price-sensitive.",
  "High intent — push for a same-week demo.",
  "Competitor renewal is in 30 days. Move fast.",
];

export const deals: Deal[] = seeds.map((s, i) => {
  const [title, company, contactEmail, stage, value, priority, probability] = s;
  return {
    id: `deal-${i + 1}`,
    title,
    leadName: title.split(" — ")[0],
    company,
    contactEmail,
    value,
    stage,
    priority,
    probability,
    owner: owners[i % owners.length],
    closeDate: `2026-0${(i % 3) + 6}-${String((i % 27) + 1).padStart(2, "0")}`,
    aiSuggestion:
      stage === "won" || stage === "lost"
        ? undefined
        : aiSuggestions[i % aiSuggestions.length],
  };
});
