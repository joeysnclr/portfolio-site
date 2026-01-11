import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://joeysinclair.com"
  ),
  title: {
    default: "Joey Sinclair",
    template: "%s | Joey Sinclair",
  },
  description:
    "Software engineer building tools for prediction markets, sports analytics, and automation. Berkeley DS '25.",
  keywords: [
    "software engineer",
    "data science",
    "prediction markets",
    "sports analytics",
    "Go",
    "Python",
    "TypeScript",
  ],
  authors: [{ name: "Joey Sinclair" }],
  creator: "Joey Sinclair",
  openGraph: {
    title: "Joey Sinclair",
    description:
      "Software engineer building tools for prediction markets, sports analytics, and automation.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Joey Sinclair",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joey Sinclair - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joey Sinclair",
    description:
      "Software engineer building tools for prediction markets, sports analytics, and automation.",
    creator: "@jitcommit",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexMono.variable} font-mono antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
