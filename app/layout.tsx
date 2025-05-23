import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { TranslationsProvider } from "@/components/translations-context"
import ReactQueryProvider from "@/components/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome To Mentally",
  description: "Your 24/7 mind coach, ready to guide you",
  authors: [{ name: siteConfig.author, url: siteConfig.links.twitter }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    images: "/opengraph-image.png",
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["AI Blocks", "OpenAI Blocks", "Blocks", "OpenAI Realtime API", "OpenAI Realtime", "OpenAI WebRTC", "Livekit", "OpenAI Realtime WebRTC", "OpenAI Realtime Starter", "Voice AI", "Voice AI components", "web components", "UI components", "UI Library", "shadcn", "aceternity", "AI", "Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript", "Design engineer", "shadcn ai"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          geistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationsProvider>
            <ReactQueryProvider>
              <div className="relative flex min-h-dvh flex-col bg-background items-center">
                {/* <Header /> */}
                {/* <Banner /> */}
                <main className="flex flex-1 justify-center items-start">
                  {children}
                </main>
              </div>
            </ReactQueryProvider>
            <Toaster />
          </TranslationsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
