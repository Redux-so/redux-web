import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redux - AI Agent for Photo Editing",
  description:
    "Organize, edit, and deliver photos in seconds, all from your browser",
  openGraph: {
    title: "Redux - AI Agent for Photo Editing",
    description:
      "Organize, edit, and deliver photos in seconds, all from your browser",
    url: "https://redux.so",
    siteName: "Redux",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redux - AI Agent for Photo Editing",
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
      className="h-full bg-[#111111] text-white antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
