import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sellertoolsuite.com"),

  title: {
    default: "SellerToolSuite | Free Tools for Online Sellers",
    template: "%s | SellerToolSuite",
  },

  description:
    "Free calculators and planning tools for online sellers. Estimate marketplace fees, profit margins, product pricing, shipping impact, ROI, and more across Etsy, Shopify, Amazon, eBay, Mercari, Poshmark, and Facebook Marketplace.",

  keywords: [
    "online seller calculator",
    "marketplace seller tools",
    "ecommerce profit calculator",
    "seller fee calculator",
    "pricing calculator",
    "profit margin calculator",
    "marketplace calculator",
    "online selling tools",
  ],

  authors: [{ name: "SellerToolSuite" }],

  openGraph: {
    title: "SellerToolSuite",
    description: "Free marketplace seller calculators and planning tools.",
    url: "https://www.sellertoolsuite.com",
    siteName: "SellerToolSuite",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SellerToolSuite",
    description: "Free marketplace seller calculators and planning tools.",
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "google-adsense-account": "ca-pub-1704349440219922",
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