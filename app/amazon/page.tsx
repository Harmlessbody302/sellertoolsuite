import Link from "next/link";

const amazonTools = [
  {
    title: "Amazon FBA Profit Calculator",
    description:
      "Estimate Amazon FBA profit after product cost, referral fees, fulfillment fees, storage, PPC, returns, and prep costs.",
    href: "/amazon/fba-profit-calculator",
  },
  {
    title: "Amazon Fee Calculator",
    description:
      "Estimate Amazon referral fees, fulfillment costs, storage fees, and total fee impact.",
    href: "/amazon/fee-calculator",
  },
  {
    title: "Amazon Pricing Calculator",
    description:
      "Find a profitable Amazon selling price based on cost, fees, ads, target profit, and target margin.",
    href: "/amazon/pricing-calculator",
  },
  {
    title: "Amazon PPC ROI Calculator",
    description:
      "Measure Amazon ad profitability using ACoS, conversion assumptions, and ad spend.",
    href: "/amazon/ppc-roi-calculator",
  },
  {
    title: "Amazon Break-Even Calculator",
    description:
      "Calculate the minimum Amazon sale price needed to avoid losing money after fees and FBA costs.",
    href: "/amazon/break-even-calculator",
  },
];

export default function AmazonPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl border border-green-300 bg-green-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            Amazon Seller Tools
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Amazon calculators
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-green-900">
            Use these Amazon seller calculators to estimate profit, fees,
            pricing, ad performance, and break-even thresholds for FBA
            products.
          </p>
        </section>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {amazonTools.map((tool) => (
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