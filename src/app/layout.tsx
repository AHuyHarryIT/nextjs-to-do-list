import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SessionProvider from "@components/SessionProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "To do list",
  description: "A simple to do list app built with Next.js and TypeScript.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <SessionProvider >
          <Header />
          <main className="container mx-auto min-h-screen px-4 py-2">
            {children}
          </main>
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
