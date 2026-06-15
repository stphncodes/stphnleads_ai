import type { Feature, Testimonial } from "@/types";

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "CRM", href: "#crm" },
  { label: "Demo", href: "#demo" },
  { label: "Contact", href: "#contact" },
];

/** Placeholder "trusted by" company wordmarks for the MVP. */
export const trustedLogos = [
  "Northwind",
  "Lumen",
  "Apex Labs",
  "Quanta",
  "Vertex",
  "Helio",
  "Cobalt",
];

export const features: Feature[] = [
  {
    icon: "Radar",
    title: "AI Lead Discovery",
    description:
      "Describe your ideal customer and stphnAgent surfaces matching companies and decision-makers in seconds — enriched and ready to contact.",
    accent: "brand",
  },
  {
    icon: "Gauge",
    title: "Smart Lead Scoring",
    description:
      "Every lead is scored 0–100 on fit and buying intent using firmographic, behavioral, and engagement signals — so you work the hottest first.",
    accent: "accent",
  },
  {
    icon: "Columns3",
    title: "CRM Pipeline",
    description:
      "A drag-and-drop pipeline that updates itself. Deals move, forecasts recalculate, and AI flags risk before it costs you the quarter.",
    accent: "info",
  },
  {
    icon: "Send",
    title: "AI Outreach",
    description:
      "Personalized multi-channel sequences across email and LinkedIn, written in your voice and timed for the moment a prospect is most likely to reply.",
    accent: "brand",
  },
  {
    icon: "ChartSpline",
    title: "Analytics",
    description:
      "Pipeline, conversion, and revenue analytics in real time. Know exactly which sources, campaigns, and messages drive booked meetings.",
    accent: "accent",
  },
  {
    icon: "CalendarCheck",
    title: "Meeting Booking",
    description:
      "When a lead is ready, the agent books the meeting, preps your notes, and adds it to your calendar — no back-and-forth required.",
    accent: "info",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced three tools and a part-time SDR with stphnLead AI. Booked meetings are up 3.2x and our reps finally spend their day selling.",
    name: "Marcus Bennett",
    role: "VP of Sales",
    company: "Northwind",
    rating: 5,
  },
  {
    quote:
      "The lead scoring is uncanny. It consistently surfaces the accounts that actually convert — we close 40% faster than we did last year.",
    name: "Priya Nair",
    role: "Founder",
    company: "Quanta",
    rating: 5,
  },
  {
    quote:
      "As a solo founder, this is the closest thing I have to a full sales team. The AI outreach alone pays for itself ten times over.",
    name: "Diego Alvarez",
    role: "Founder & CEO",
    company: "Helio",
    rating: 5,
  },
  {
    quote:
      "Our agency runs outbound for 14 clients inside one dashboard now. Reply rates jumped from 4% to 11% in the first month.",
    name: "Sara Whitfield",
    role: "Managing Director",
    company: "Apex Labs",
    rating: 5,
  },
];

export const heroStats = [
  { label: "Leads sourced", value: "2.4M+" },
  { label: "Avg. reply rate", value: "11.3%" },
  { label: "Meetings booked", value: "180k+" },
  { label: "Pipeline created", value: "$4.1B" },
];

export const footerNav = {
  Product: ["Features", "AI Agent", "CRM", "Campaigns", "Analytics"],
  Company: ["About", "Careers", "Blog", "Customers", "Contact"],
  Resources: ["Documentation", "Guides", "API", "Changelog", "Status"],
  Legal: ["Privacy", "Terms", "Security", "DPA", "Cookies"],
};
