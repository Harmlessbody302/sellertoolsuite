import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://sellertoolsuite.com"),

  title: {
    default: "SellerToolSuite | Marketplace Seller Calculators",
    template: "%s | SellerToolSuite",
  },

  description:
    "Free marketplace seller calculators for Etsy, eBay, Amazon, Shopify, Mercari, and more. Estimate profit, fees, pricing, margins, shipping costs, refunds, and growth targets.",

  keywords: [
    "etsy profit calculator",
    "etsy fee calculator",
    "etsy pricing calculator",
    "seller calculator",
    "marketplace seller tools",
    "etsy seller tools",
    "online seller calculator",
    "ecommerce profit calculator",
  ],

  authors: [{ name: "SellerToolSuite" }],

  openGraph: {
    title: "SellerToolSuite",
    description:
      "Free marketplace seller calculators and planning tools.",
    url: "https://sellertoolsuite.com",
    siteName: "SellerToolSuite",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SellerToolSuite",
    description:
      "Free marketplace seller calculators and planning tools.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}