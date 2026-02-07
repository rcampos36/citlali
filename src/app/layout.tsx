import type { Metadata } from "next";
import { Host_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurelo",
  description: "Aurelo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${hostGrotesk.variable} min-h-screen bg-white antialiased`}
      >
        <Header />
        <div className="mx-auto w-full max-w-[1320px] px-4 pt-[80px] md:px-0 overflow-x-visible">
          {children}
        </div>
      </body>
    </html>
  );
}
