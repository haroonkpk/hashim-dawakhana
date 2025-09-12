import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Nastaliq_Urdu } from "next/font/google"; // 👈 yahan import karo
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👇 Urdu font config
const nastaliq = Noto_Nastaliq_Urdu({
  weight: ["400"], // ya ["400", "700"] agar multiple weights chahiye
  subsets: ["arabic"],
  variable: "--font-nastaliq", // ek CSS variable assign karo
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nastaliq.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
