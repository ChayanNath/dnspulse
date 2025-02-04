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
  title: "DNS Propagation Checker",
  description:
    "Check the DNS propagation status for any domain. View results from multiple resolvers globally with interactive maps and detailed DNS record information.",
  keywords:
    "DNS checker, DNS propagation, domain lookup, DNS query, DNS resolver",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-gray-100 `}
      >
        {children}
      </body>
    </html>
  );
}
