import Link from "next/link";

const poshmarkTools = [
  {
    title: "Poshmark Fee Calculator",
    description:
      "Estimate Poshmark seller fees, shipping discounts, and total selling costs using Poshmark’s flat-fee and commission structure.",
    href: "/poshmark/fee-calculator",
  },
  {
    title: "Poshmark Profit Calculator",
    description:
      "Estimate Poshmark profit after item cost, seller fees, shipping discounts, packaging, and offer costs.",
    href: "/poshmark/profit-calculator",
  },
  {
    title: "Poshmark Pricing Calculator",
    description:
      "Find a profitable Poshmark listing price based on fees, item cost, shipping discounts, offers, and margin goals.",
    href: "/poshmark/pricing-calculator",
  },
  {
    title: "Poshmark Break-Even Calculator",
    description:
      "Calculate the minimum Poshmark sale price needed to avoid losing money after fees, costs, and discounts.",
    href: "/poshmark/break-even-calculator",
  },
  {
    title: "Poshmark Offer ROI Calculator",
    description:
      "Estimate whether Poshmark offers, seller discounts, and shipping incentives are improving profit or reducing margins.",
    href: "/poshmark/offer-roi-calculator",
  },
];

export default function PoshmarkPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-2xl border border-green-300 bg-green-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            Poshmark Seller Tools
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Poshmark calculators
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-green-900">
            Use these Poshmark calculators to estimate fees, profit, pricing,
            offers, shipping discounts, and break-even thresholds for closet
            sellers and resellers.
          </p>
        </section>

        <section>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {poshmarkTools.map((tool) => (
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