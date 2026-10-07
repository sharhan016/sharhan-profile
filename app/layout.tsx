import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sharhan.dev"),
  title: "Sharhan — Senior Software Engineer",
  description:
    "Senior software engineer building governed AI systems, developer tooling, automation and reliable product software.",
  keywords: ["Sharhan", "Senior Software Engineer", "AI Systems", "Governed RAG", "Agent Workflows", "Product Engineering"],
  authors: [{ name: "Sharhan" }],
  creator: "Sharhan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharhan — Senior Software Engineer",
    description: "Governed AI systems, developer tooling, automation and reliable product software.",
    type: "website",
    url: "/",
    siteName: "Sharhan",
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
