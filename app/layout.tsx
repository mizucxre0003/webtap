import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://webtap.kz"),
  title: "WebTap — дизайн и разработка сайтов для бизнеса",
  description:
    "WebTap проектирует и разрабатывает современные сайты для компаний: стратегия, UX/UI-дизайн, адаптивная разработка и запуск.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WebTap — дизайн и разработка сайтов для бизнеса",
    description:
      "Стратегия, UX/UI-дизайн, адаптивная разработка и запуск сайтов для компаний.",
    url: "/",
    siteName: "WebTap",
    locale: "ru_KZ",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favicon.webp?v=2",
        type: "image/webp",
      },
    ],
    shortcut: "/favicon.webp?v=2",
    apple: "/favicon.webp?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
