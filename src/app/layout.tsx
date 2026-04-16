import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AnasTech Solutions — Digital Agency Bangladesh",
    template: "%s | AnasTech Solutions",
  },
  description:
    "AnasTech Solutions delivers enterprise-grade websites, software, mobile apps, bulk SMS, and call center solutions for businesses across Bangladesh and beyond.",
  keywords: [
    "web development Bangladesh",
    "software development",
    "mobile app development",
    "bulk SMS Bangladesh",
    "IT company Bangladesh",
    "AnasTech Solutions",
  ],
  authors: [{ name: "AnasTech Solutions" }],
  creator: "AnasTech Solutions",
  metadataBase: new URL("https://anastechsolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anastechsolutions.com",
    siteName: "AnasTech Solutions",
    title: "AnasTech Solutions — Digital Agency Bangladesh",
    description:
      "Enterprise websites, software, mobile apps, bulk SMS & call center solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnasTech Solutions",
    description:
      "Enterprise websites, software, mobile apps, bulk SMS & call center solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body antialiased bg-paper text-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Noise overlay for premium texture */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
