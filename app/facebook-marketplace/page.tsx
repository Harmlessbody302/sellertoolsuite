import Link from "next/link";

const facebookMarketplaceTools = [
  {
    title: "Facebook Marketplace Profit Calculator",
    description:
      "Estimate profit from local pickup, delivery, or shipped Facebook Marketplace sales after item cost, packaging, fuel, delivery, and other selling expenses.",
    href: "/facebook-marketplace/profit-calculator",
  },
  {
    title: "Facebook Marketplace Pricing Calculator",
    description:
      "Find a profitable listing price based on item cost, target profit, buyer negotiation, delivery costs, and resale margin goals.",
    href: "/facebook-marketplace/pricing-calculator",
  },
  {
    title: "Facebook Marketplace Break-Even Calculator",
    description:
      "Calculate the minimum sale price needed to avoid losing money after item cost, delivery, shipping, discounts, and other expenses.",
    href: "/facebook-marketplace/break-even-calculator",
  },
  {
    title: "Facebook Marketplace Negotiation Calculator",
    description:
      "Estimate how buyer offers, discounts, and negotiation ranges affect profit, margin, and your minimum acceptable price.",
    href: "/facebook-marketplace/negotiation-calculator",
  },
  {
    title: "Facebook Marketplace Shipping Profit Calculator",
    description:
      "Compare local pickup, local delivery, and shipped orders to see how fulfillment choices affect profit.",
    href: "/facebook-marketplace/shipping-profit-calculator",
  },
];

export default function FacebookMarketplacePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl border border-green-300 bg-green-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            Facebook Marketplace Seller Tools
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Facebook Marketplace calculators
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-green-900">
            Use these Facebook Marketplace calculators to estimate resale
            profit, pricing, negotiation room, local delivery impact, shipping
            costs, and break-even thresholds for local and shipped sales.
          </p>
        </section>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {facebookMarketplaceTools.map((tool) => (
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