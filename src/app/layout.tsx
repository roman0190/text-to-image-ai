import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FuturisticHeader from "./components/Header";
import Footer from "./components/Footer";
import MouseDots from "./components/MouseDots";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PromtIt - AI Image Generator",
  description: "Powered by Pollinations.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FuturisticHeader />
        <MouseDots />
        {children}
        <Footer />
      </body>
    </html>
  );
}
