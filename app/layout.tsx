import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "stphnLead AI — Turn Prospects Into Clients With AI",
    template: "%s · stphnLead AI",
  },
  description:
    "stphnLead AI finds leads, qualifies prospects, automates outreach, and helps you close more deals — an AI-powered lead generation and CRM platform.",
  keywords: [
    "AI lead generation",
    "CRM",
    "sales automation",
    "outreach",
    "lead scoring",
    "stphnLead AI",
  ],
  authors: [{ name: "stphnLead AI" }],
  openGraph: {
    title: "stphnLead AI — Turn Prospects Into Clients With AI",
    description:
      "AI-powered lead generation and CRM. Discover leads, qualify prospects, automate outreach, and book meetings on autopilot.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg text-foreground">{children}</body>
    </html>
  );
}
