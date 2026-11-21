import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/theme-provider";
import { LanguageProvider } from "../components/language-provider";
import { BookingFunnel } from "@/components/BookingFunnel";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alphatriotech.com"),

  title: {
    default: "AlphaTrioTech | Software Development & AI Solutions",
    template: "%s | AlphaTrioTech",
  },

  description:
    "AlphaTrioTech provides professional software development, artificial intelligence, IT automation, web applications, and innovative digital solutions for businesses.",

  applicationName: "AlphaTrioTech",
  generator: "AlphaTrioTech",

  keywords: [
    "AlphaTrioTech",
    "Alpha Trio Tech",
    "alphatriotech.com",
    "Software Development",
    "Artificial Intelligence",
    "AI Solutions",
    "IT Automation",
    "Web Development",
    "Digital Solutions",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "AlphaTrioTech | Software Development & AI Solutions",
    description:
      "Explore AlphaTrioTech's software development, artificial intelligence, IT automation, and digital solutions.",
    url: "https://www.alphatriotech.com/",
    siteName: "AlphaTrioTech",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "AlphaTrioTech | Software Development & AI Solutions",
    description:
      "Software development, AI solutions, and IT automation by AlphaTrioTech.",
  },

  icons: {
    icon: "/images/alphatrio.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-200">
        <ThemeProvider attribute="class">
          <LanguageProvider>
            {children}
            <BookingFunnel />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}