import Link from "next/link";

const poshmarkTools = [
  {
    title: "Poshmark Fee Calculator",
    description:
      "Estimate Poshmark seller fees, buyer offer discounts, shipping discounts, packaging costs, seller-paid costs, and net revenue before item cost.",
    href: "/poshmark/fee-calculator",
    category: "Fees",
  },
  {
    title: "Poshmark Profit Calculator",
    description:
      "Estimate Poshmark profit after item cost, seller fees, buyer offer discounts, shipping discounts, packaging, and other selling costs.",
    href: "/poshmark/profit-calculator",
    category: "Profitability",
  },
  {
    title: "Poshmark Pricing Calculator",
    description:
      "Find a profitable Poshmark listing price based on item cost, Poshmark fees, buyer offer discounts, shipping incentives, and margin goals.",
    href: "/poshmark/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "Poshmark Break-Even Calculator",
    description:
      "Calculate the minimum Poshmark listing price needed to avoid losing money after fees, item cost, offers, shipping discounts, and selling costs.",
    href: "/poshmark/break-even-calculator",
    category: "Pricing",
  },
  {
    title: "Poshmark Offer ROI Calculator",
    description:
      "Estimate whether Poshmark offers, seller discounts, offers to likers, and shipping incentives are improving profit or reducing margins.",
    href: "/poshmark/offer-roi-calculator",
    category: "Growth",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate Poshmark profit, margin, ROI, total costs, offer impact, and listing viability.",
  },
  {
    title: "Fee tools",
    description:
      "Model Poshmark fees, seller-paid shipping discounts, buyer offers, packaging costs, and total fee pressure.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable Poshmark listing prices using item cost, offers, fees, target profit, and margin goals.",
  },
  {
    title: "Growth tools",
    description:
      "Review offer ROI, discount drag, offers to likers, extra sales, and promotion pressure.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with Poshmark fees so you know how much revenue remains after commission, buyer offers, shipping discounts, and seller-paid costs.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract item cost, Poshmark fees, shipping discounts, packaging, and other closet expenses.",
  },
  {
    title: "Set pricing",
    description:
      "Use pricing and break-even tools to find a listing price that supports profit, offers, closet discounts, and realistic sold comps.",
  },
  {
    title: "Review offers",
    description:
      "Check whether offers to likers, seller discounts, and shipping incentives are creating extra profit or reducing margin.",
  },
];

export default function PoshmarkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Poshmark Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Poshmark calculators for fees, profit, pricing, offer ROI, and
          break-even planning. Use these tools to estimate item costs, Poshmark
          fees, buyer offer room, shipping discounts, closet promotion impact,
          and seller margins before listing, pricing, or accepting offers.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Poshmark toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          5 active Poshmark calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Poshmark seller toolkit to estimate seller fees, closet
          profitability, listing prices, break-even thresholds, offer impact,
          shipping discounts, and buyer negotiation room.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Poshmark calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Poshmark seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {poshmarkTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-gray-300 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-gray-950">
                  {tool.title}
                </h3>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {tool.category}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tool.description}
              </p>

              <p className="mt-5 text-sm font-bold text-blue-700">
                Open tool →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-gray-300 bg-white p-5"
          >
            <h2 className="text-lg font-bold text-gray-950">
              {category.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {category.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Recommended Poshmark seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to real closet
          profit, pricing decisions, break-even analysis, and offer review. This
          helps prevent listings from looking profitable before item cost,
          Poshmark fees, shipping discounts, packaging, buyer offers, and seller
          expenses are fully included.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {workflow.map((step) => (
            <div key={step.title} className="rounded-xl bg-white p-4">
              <h3 className="font-bold text-gray-950">{step.title}</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Poshmark sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Poshmark seller fees, flat fees, commission, and seller-paid shipping discounts.",
              "Item cost, sourcing cost, prep cost, cleaning supplies, and packaging materials.",
              "Buyer offer discounts, offers to likers, closet discounts, and minimum acceptable offers.",
              "Shipping discounts, Closet Clear Out behavior, labels, mailers, tape, and supplies.",
              "Profit margin after all seller costs, Poshmark fees, and offer discounts are included.",
              "Break-even listing price and minimum sale price before accepting offers.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Poshmark seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating listing price as profit before subtracting offers and Poshmark fees.",
              "Forgetting shipping discounts when sending offers to likers.",
              "Accepting buyer offers without recalculating net profit after fees.",
              "Using active listing prices instead of realistic sold comps.",
              "Ignoring packaging, labels, thank-you cards, supplies, and other closet expenses.",
              "Sending broad offers without checking whether the lower sale price still protects margin.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use these Poshmark calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate Poshmark commission, offer discounts, shipping incentives, and seller-paid costs.",
            ],
            [
              "Check profit",
              "Use the profit calculator to subtract item cost, Poshmark fees, shipping discounts, packaging, and other expenses.",
            ],
            [
              "Set price",
              "Use the pricing and break-even calculators to find viable listing prices before accepting buyer offers.",
            ],
            [
              "Review offers",
              "Use the offer ROI calculator to compare discount sizes, extra sales assumptions, and offer profitability.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          SellerToolSuite calculators provide planning estimates only. Actual
          Poshmark fees, buyer offers, shipping discounts, Closet Clear Out
          behavior, packaging costs, taxes, returns, discounts, and
          seller-specific marketplace rules may vary.
        </p>
      </section>
    </main>
  );
}