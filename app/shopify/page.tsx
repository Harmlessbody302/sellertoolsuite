import Link from "next/link";

const shopifyTools = [
  {
    title: "Shopify Profit Calculator",
    description:
      "Estimate Shopify profit after product cost, shipping, payment processing, ads, app costs, and returns.",
    href: "/shopify/profit-calculator",
  },
  {
    title: "Shopify Fee Calculator",
    description:
      "Estimate Shopify payment processing fees, transaction fees, app costs, and total fee impact.",
    href: "/shopify/fee-calculator",
  },
  {
    title: "Shopify Pricing Calculator",
    description:
      "Find a profitable Shopify selling price based on product cost, fees, ads, shipping, and margin goals.",
    href: "/shopify/pricing-calculator",
  },
  {
    title: "Shopify Ad ROI Calculator",
    description:
      "Estimate whether your Shopify ads are producing profitable orders after ad spend.",
    href: "/shopify/ad-roi-calculator",
  },
  {
    title: "Shopify Break-Even Calculator",
    description:
      "Calculate the minimum Shopify sale price needed to avoid losing money after costs and fees.",
    href: "/shopify/break-even-calculator",
  },
];

export default function ShopifyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl border border-green-300 bg-green-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            Shopify Seller Tools
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Shopify calculators
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-green-900">
            Use these Shopify calculators to estimate profit, fees, pricing,
            advertising performance, and break-even thresholds for online store
            products.
          </p>
        </section>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shopifyTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{tool.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Open tool →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}