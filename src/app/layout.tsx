import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
        <nav className="mx-auto bg-gray-200 px-4 py-2">
          <ul className="mx-auto flex max-w-7xl gap-2 text-xl">
            <li className="hover:text-blue-500">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link href={"/tasks"}>To do list</Link>
            </li>
          </ul>
        </nav>
        <main className="mx-auto max-w-7xl px-4 py-2">{children}</main>
      </body>
    </html>
  );
}
