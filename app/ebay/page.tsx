import Link from "next/link";

const ebayTools = [
  {
    title: "eBay Profit Calculator",
    description:
      "Estimate eBay profit after item cost, shipping, packaging, final value fees, promoted listing fees, and other costs.",
    href: "/ebay/profit-calculator",
  },
  {
    title: "eBay Fee Calculator",
    description:
      "Estimate final value fees, promoted listing costs, international fees, and total fee impact.",
    href: "/ebay/fee-calculator",
  },
  {
    title: "eBay Pricing Calculator",
    description:
      "Find a profitable eBay selling price based on item cost, fees, shipping, promoted listing rate, target profit, and target margin.",
    href: "/ebay/pricing-calculator",
  },
  {
    title: "eBay Shipping Profit Calculator",
    description:
      "Compare free shipping, flat-rate shipping, buyer-paid shipping, and fulfillment cost impact on eBay profit.",
    href: "/ebay/shipping-profit-calculator",
  },
  {
    title: "eBay Break-Even Calculator",
    description:
      "Estimate the minimum eBay sale price needed to avoid losing money after costs and fees.",
    href: "/ebay/break-even-calculator",
  },
  {
    title: "eBay Promoted Listing ROI Calculator",
    description:
      "Estimate whether promoted listings are improving profit or quietly reducing margins.",
    href: "/ebay/promoted-listing-roi-calculator",
  },
];

export default function EbayPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl border border-green-300 bg-green-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            eBay tools are live
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Available eBay calculators
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-green-900">
            Use these eBay calculators to estimate profit, fees, shipping
            impact, break-even pricing, promoted listing ROI, and profitable
            sale prices.
          </p>
        </section>

        <section>
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              eBay Seller Tools
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              eBay calculators
            </h2>

            <p className="mt-2 text-slate-600">
              Choose a calculator below to estimate your eBay selling numbers.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ebayTools.map((tool) => (
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