import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl">
      <body className="min-h-screen flex flex-col">

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer global */}
        <Footer />
      </body>
    </html>
  );
}
