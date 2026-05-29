import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sellertoolsuite.com";

  const routes = [
    "",

    

    "/etsy",
    "/etsy/profit-calculator",
    "/etsy/fee-calculator",
    "/etsy/pricing-calculator",
    "/etsy/break-even-calculator",
    "/etsy/sales-goal-calculator",
    "/etsy/ad-roi-calculator",
    "/etsy/discount-impact-calculator",
    "/etsy/conversion-rate-calculator",
    "/etsy/listing-roi-calculator",
    "/etsy/shipping-profit-calculator",
    "/etsy/bundle-pricing-calculator",
    "/etsy/inventory-restock-calculator",
    "/etsy/refund-impact-calculator",
    "/etsy/labor-cost-calculator",
    "/etsy/product-cost-calculator",
    "/etsy/about",
    "/etsy/privacy-policy",
    "/etsy/terms",

    "/etsy/how-etsy-fees-work",
    "/etsy/how-to-price-etsy-products",
    "/etsy/profit-margin-guide",
    "/etsy/seller-cost-checklist",
    "/etsy/shipping-cost-guide",
    "/etsy/free-shipping-strategy",
    "/etsy/offsite-ads-fees",
    "/etsy/discount-strategy-guide",
    "/etsy/refunds-and-returns-cost-guide",
    "/etsy/listing-roi-guide",
    "/etsy/conversion-rate-guide",
    "/etsy/inventory-restock-guide",
    "/etsy/sales-goal-planning-guide",
    "/etsy/bundle-pricing-guide",
    "/etsy/seller-resources",

    "/ebay",
    "/ebay/profit-calculator",
    "/ebay/fee-calculator",
    "/ebay/pricing-calculator",
    "/ebay/shipping-profit-calculator",
    "/ebay/break-even-calculator",
    "/ebay/promoted-listing-roi-calculator",

    "/amazon",
    "/amazon/fba-profit-calculator",
    "/amazon/fee-calculator",
    "/amazon/pricing-calculator",
    "/amazon/ppc-roi-calculator",
    "/amazon/break-even-calculator",

    "/shopify",
    "/shopify/profit-calculator",
    "/shopify/fee-calculator",
    "/shopify/pricing-calculator",
    "/shopify/ad-roi-calculator",
    "/shopify/break-even-calculator",

    "/mercari",
    "/mercari/profit-calculator",
    "/mercari/fee-calculator",
    "/mercari/pricing-calculator",
    "/mercari/break-even-calculator",
    "/mercari/promotion-roi-calculator",

    "/poshmark",
    "/poshmark/fee-calculator",
    "/poshmark/profit-calculator",
    "/poshmark/pricing-calculator",
    "/poshmark/break-even-calculator",
    "/poshmark/offer-roi-calculator",

    "/facebook-marketplace",
    "/facebook-marketplace/profit-calculator",
    "/facebook-marketplace/pricing-calculator",
    "/facebook-marketplace/break-even-calculator",
    "/facebook-marketplace/negotiation-calculator",
    "/facebook-marketplace/shipping-profit-calculator",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/etsy" ? 0.9 : 0.7,
  }));
}