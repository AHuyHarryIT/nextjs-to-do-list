import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SessionProvider from "@components/SessionProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import "./globals.css";
import Wrapper from "@/components/layout/Wrapper";

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
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased `}
      >
        <SessionProvider>
          <SidebarProvider defaultOpen={defaultOpen} >
            <AppSidebar />
            <Wrapper>
              <div className="relative flex min-h-screen w-full flex-col bg-background">
                <Header />
                <div className="container mx-auto min-h-screen flex-1 px-4 py-2">
                  {children}
                </div>
                <Footer />
              </div>
            </Wrapper>
          </SidebarProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
