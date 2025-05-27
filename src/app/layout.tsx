import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayavi",
  description: "Mayavi is a lightweight proof-of-work challenge system to protect against AI crawlers and bots. Built with TypeScript and Next.js.",
  keywords: ["proof-of-work", "bot-protection", "anti-crawler", "typescript", "nextjs"],
  authors: [{ name: "Mayavi" }],
  openGraph: {
    title: "Mayavi",
    description: "A lightweight proof-of-work challenge system to protect against AI crawlers and bots.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
