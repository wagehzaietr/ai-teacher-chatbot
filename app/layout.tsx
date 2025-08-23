import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Homework Helper AI | Your Smart Study Assistant",
  description: "Get instant AI-powered homework help with our interactive chat. Upload images, ask questions, and get detailed explanations for any subject.",
  keywords: ["homework help", "AI tutor", "study assistant", "homework solver", "AI education", "learning assistant"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  creator: "Your Name",
  publisher: "Your Company Name",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://yourwebsite.com'),
  openGraph: {
    title: "Homework Helper AI | Your Smart Study Assistant",
    description: "Get instant AI-powered homework help with our interactive chat. Upload images, ask questions, and get detailed explanations for any subject.",
    url: "https://yourwebsite.com",
    siteName: "Homework Helper AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Homework Helper AI - Your Smart Study Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homework Helper AI | Your Smart Study Assistant",
    description: "Get instant AI-powered homework help with our interactive chat.",
    images: ["/twitter-image.png"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <Header />
          <div className="flex flex-col min-h-screen">
            <main>
              {children}
            </main>
          </div>
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
