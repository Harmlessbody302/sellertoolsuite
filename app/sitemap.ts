import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sellertoolsuite.com";

  const routes = [
    "",
    "/etsy",
    "/etsy/profit-calculator",
    "/etsy/fee-calculator",
    "/etsy/pricing-calculator",
    "/etsy/break-even-calculator",
    "/etsy/sales-goal-calculator",
    "/etsy/ad-roi-calculator",
    "/etsy/how-etsy-fees-work",
    "/etsy/how-to-price-etsy-products",
    "/etsy/profit-margin-guide",
    "/etsy/seller-cost-checklist",
    "/etsy/seller-resources",
    "/etsy/about",
    "/etsy/privacy-policy",
    "/etsy/terms",
    "/amazon",
    "/ebay",
    "/shopify",
    "/mercari",
    "/poshmark",
    "/facebook-marketplace",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}