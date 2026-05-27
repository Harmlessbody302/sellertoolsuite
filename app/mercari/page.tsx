import Link from "next/link";

const mercariTools = [
  {
    title: "Mercari Profit Calculator",
    description:
      "Estimate Mercari profit after product cost, shipping, packaging, marketplace fees, promotion costs, and returns.",
    href: "/mercari/profit-calculator",
  },
  {
    title: "Mercari Fee Calculator",
    description:
      "Estimate Mercari selling fees, payment processing fees, fixed fees, and total fee impact.",
    href: "/mercari/fee-calculator",
  },
  {
    title: "Mercari Pricing Calculator",
    description:
      "Find a profitable Mercari selling price based on item cost, fees, shipping, promotion costs, and target margin.",
    href: "/mercari/pricing-calculator",
  },
  {
    title: "Mercari Break-Even Calculator",
    description:
      "Calculate the minimum Mercari sale price needed to avoid losing money after costs and fees.",
    href: "/mercari/break-even-calculator",
  },
  {
    title: "Mercari Promotion ROI Calculator",
    description:
      "Estimate whether Mercari promotions or price drops are helping or hurting listing profitability.",
    href: "/mercari/promotion-roi-calculator",
  },
];

export default function MercariPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl border border-green-300 bg-green-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            Mercari Seller Tools
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Mercari calculators
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-green-900">
            Use these Mercari calculators to estimate profit, fees, pricing,
            promotions, and break-even thresholds for resale and marketplace
            listings.
          </p>
        </section>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mercariTools.map((tool) => (
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