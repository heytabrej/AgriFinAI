import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AgriFinAI",
  description: "Empowering Indian agriculture with AI-powered financial and crop advisory solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Link href="/" className="text-2xl font-bold text-green-700 flex items-center gap-2">
          AgriFinAI Advisor
        </Link>
        {children}
      </body>
    </html>
  );
}
