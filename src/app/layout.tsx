import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "./EmotionRegistry";
import ThemeRegistry from "./ThemeRegistry";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sbk nextjs",
  description: "ระบบรายงานข้อมูล",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={kanit.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <EmotionRegistry>
          <ThemeRegistry>{children}</ThemeRegistry>
        </EmotionRegistry>
      </body>
    </html>
  );
}
