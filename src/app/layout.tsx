import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DocuWise | Turn Document Chaos Into Organized Intelligence",
  description: "DocuWise automatically classifies, organizes, searches, and deduplicates hundreds of PDFs locally using AI. Offline-first intelligent document manager.",
  keywords: "document manager, PDF organizer, local AI, Gemini, OCR scanned PDF, duplicate detection, smart search, offline-first",
  authors: [{ name: "DocuWise Team" }],
  openGraph: {
    title: "DocuWise | Turn Document Chaos Into Organized Intelligence",
    description: "DocuWise automatically classifies, organizes, searches, and deduplicates hundreds of PDFs locally using AI.",
    url: "https://docuwise.in",
    siteName: "DocuWise",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocuWise | Turn Document Chaos Into Organized Intelligence",
    description: "DocuWise automatically classifies, organizes, searches, and deduplicates hundreds of PDFs locally using AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#0F172A] text-white font-sans flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

