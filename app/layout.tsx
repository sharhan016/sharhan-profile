import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sharhan — Senior Software Engineer",
  description:
    "Senior software engineer building governed AI systems, developer tooling, automation and reliable product software.",
  keywords: ["Sharhan", "Senior Software Engineer", "AI Systems", "Governed RAG", "Agent Workflows", "Product Engineering"],
  authors: [{ name: "Sharhan" }],
  creator: "Sharhan",
  openGraph: {
    title: "Sharhan — Senior Software Engineer",
    description: "Governed AI systems, developer tooling, automation and reliable product software.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sharhan — Senior Software Engineer",
    description: "Governed AI systems, developer tooling, automation and reliable product software.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
