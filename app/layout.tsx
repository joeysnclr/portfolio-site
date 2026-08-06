import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jsinclair.dev"
  ),
  title: {
    default: "Joey Sinclair",
    template: "%s | Joey Sinclair",
  },
  description:
    "Software engineer building tools around sports, markets, search, and music.",
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
      "Software engineer building tools around sports, markets, search, and music.",
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
      "Software engineer building tools around sports, markets, search, and music.",
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
        <main>{children}</main>
      </body>
    </html>
  );
}
