import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { geistSans } from "@/lib/fonts";
import {
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_PATH,
} from "@/lib/social-preview";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://redux.so"),
  title: "Redux - AI for Photo Editing",
  description:
    "Organize, edit, and deliver photos in seconds, all from your browser",
  openGraph: {
    title: "Redux - AI for Photo Editing",
    description:
      "Organize, edit, and deliver photos in seconds, all from your browser",
    url: "https://redux.so",
    siteName: "Redux",
    images: [SOCIAL_PREVIEW_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redux - AI for Photo Editing",
    description:
      "Organize, edit, and deliver photos in seconds, all from your browser",
    images: [SOCIAL_PREVIEW_IMAGE_PATH],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
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
        geistSans.variable,
        "h-full overflow-x-clip bg-brand-bg text-white antialiased",
      )}
    >
      <body
        className={cn(
          geistSans.className,
          "flex min-h-full flex-col overflow-x-clip",
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
