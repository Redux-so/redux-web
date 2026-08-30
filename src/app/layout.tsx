import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Redux - AI for Photo Editing",
  description:
    "Organize, edit, and deliver photos in seconds, all from your browser",
  openGraph: {
    title: "Redux - AI for Photo Editing",
    description:
      "Organize, edit, and deliver photos in seconds, all from your browser",
    url: "https://redux.so",
    siteName: "Redux",
    images: [{ url: "/og-image.png", width: 1024, height: 598 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redux - AI for Photo Editing",
    description:
      "Organize, edit, and deliver photos in seconds, all from your browser",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-light-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-dark-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-touch-icon.png",
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
      className={cn(
        inter.variable,
        "h-full bg-[#0E0E0E] text-white antialiased",
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
