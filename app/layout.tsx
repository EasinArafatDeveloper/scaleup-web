import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-button";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteConfig } from "@/data/site";
import { founderData } from "@/data/team";
import { FOUNDER_PATH, siteGraph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Websites, AI Automation & Growth Systems`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "web development company Dhaka",
    "website development Bangladesh",
    "Next.js developer Bangladesh",
    "SaaS development Bangladesh",
    "e-commerce website Bangladesh",
    "AI chatbot Bangladesh",
    "WhatsApp automation Bangladesh",
    "SEO service Bangladesh",
    "GEO generative engine optimization",
    "Meta Pixel CAPI setup",
    "Easin Arafat"
  ],
  authors: [{ name: founderData.name, url: `${siteConfig.url}${FOUNDER_PATH}` }],
  creator: founderData.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${siteConfig.name} — Websites, AI Automation & Growth Systems`,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Websites, AI Automation & Growth Systems`,
    description: siteConfig.description
  },
  // Set these in the server's .env after adding the site to Google Search Console / Bing Webmaster Tools.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} ${instrumentSerif.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-ink text-fg">
        <JsonLd data={siteGraph()} />
        <div aria-hidden className="grain" />
        <ThemeProvider>
          <LenisProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloatingButton />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
