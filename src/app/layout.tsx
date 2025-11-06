import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hashim Dawakhana",
  description:
    "Hashim Dawakhana – Herbal medicines, natural remedies, and trusted healthcare solutions. Find authentic products and expert guidance for your health.",
  icons: {
    icon: "/topLogo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="icon" href="/topLogo.jpg" sizes="any" />
      </head>

      <body className="min-h-screen flex flex-col">
        <Navbar />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
