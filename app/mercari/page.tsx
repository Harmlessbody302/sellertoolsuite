import Link from "next/link";

const mercariTools = [
  {
    title: "Mercari Profit Calculator",
    description:
      "Estimate Mercari profit after item cost, shipping, packaging, selling fees, payment processing, promotion costs, returns, and other listing costs.",
    href: "/mercari/profit-calculator",
    category: "Profitability",
  },
  {
    title: "Mercari Fee Calculator",
    description:
      "Estimate Mercari selling fees, payment processing fees, fixed fees, promotion costs, other seller charges, and total fee impact.",
    href: "/mercari/fee-calculator",
    category: "Fees",
  },
  {
    title: "Mercari Pricing Calculator",
    description:
      "Find a profitable Mercari selling price based on item cost, shipping, packaging, fees, promotions, target profit, and target margin.",
    href: "/mercari/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "Mercari Break-Even Calculator",
    description:
      "Calculate the minimum Mercari sale price needed to avoid losing money after item cost, shipping, packaging, fees, promotions, and returns.",
    href: "/mercari/break-even-calculator",
    category: "Pricing",
  },
  {
    title: "Mercari Promotion ROI Calculator",
    description:
      "Estimate whether Mercari promotions, price drops, seller-funded discounts, and offer strategies are helping or hurting listing profitability.",
    href: "/mercari/promotion-roi-calculator",
    category: "Growth",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate Mercari profit, margin, ROI, total costs, break-even pricing, and listing viability.",
  },
  {
    title: "Fee tools",
    description:
      "Model selling fees, payment processing fees, fixed fees, promotion costs, and total fee load.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable Mercari prices using item cost, shipping, packaging, fees, target profit, and margin goals.",
  },
  {
    title: "Growth tools",
    description:
      "Review promotion ROI, price-drop impact, discount drag, extra sales, and offer-room pressure.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with Mercari fees so you know how much revenue remains after selling fees, processing fees, fixed fees, and promotion costs.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract item cost, shipping, packaging, Mercari fees, promotion cost, returns allowance, and other listing costs.",
  },
  {
    title: "Set pricing",
    description:
      "Use pricing and break-even tools to find a sale price that supports profit, buyer offers, promotions, and realistic sold comps.",
  },
  {
    title: "Review promotions",
    description:
      "Check whether price drops, discounts, and promoted listings are creating extra profit or just reducing margin.",
  },
];

export default function MercariPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Mercari Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Mercari calculators for profit, fees, pricing, promotion ROI, and
          break-even planning. Use these tools to estimate item costs, shipping
          impact, marketplace fees, buyer offer room, and listing profitability
          before sourcing, pricing, promoting, or accepting offers.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Mercari toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          5 active Mercari calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Mercari seller toolkit to estimate listing fees, product
          profitability, pricing targets, break-even prices, promotion impact,
          and buyer offer room for marketplace listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Mercari calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Mercari seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mercariTools.map((tool) => (
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
          Recommended Mercari seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to real
          listing profit, pricing decisions, break-even analysis, and promotion
          review. This helps prevent listings from looking profitable before
          shipping, packaging, Mercari fees, returns, promotions, and buyer
          offers are fully included.
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
            What Mercari sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Mercari selling fees, payment processing fees, fixed fees, and promotion costs.",
              "Item cost, sourcing cost, cleaning cost, prep cost, and packaging supplies.",
              "Shipping cost, labels, packaging, shipping subsidies, and fulfillment materials.",
              "Buyer offer room before accepting lower sale prices.",
              "Returns allowance, refunds, damaged items, cancellation risk, and replacement exposure.",
              "Break-even price and minimum acceptable profit before listing or promoting.",
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
            Common Mercari seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale price as profit before subtracting item cost and shipping.",
              "Forgetting fixed processing fees when estimating smaller listings.",
              "Accepting buyer offers without recalculating profit after fees.",
              "Using price drops or promotions without checking margin impact.",
              "Comparing only active listing prices instead of realistic sold prices.",
              "Ignoring returns, damaged items, packaging supplies, and shipping changes.",
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
          How to use these Mercari calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate selling fees, payment processing, fixed fees, and promotion costs.",
            ],
            [
              "Check profit",
              "Use the profit calculator to subtract item cost, shipping, packaging, fees, promotions, and returns.",
            ],
            [
              "Set price",
              "Use the pricing and break-even calculators to find viable listing prices before accepting offers.",
            ],
            [
              "Review promotions",
              "Use the promotion ROI calculator to compare price drops, discount sizes, and extra sales assumptions.",
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
          Mercari fees, payment processing costs, shipping costs, promotions,
          discounts, buyer offers, taxes, returns, refunds, and category-specific
          marketplace rules may vary.
        </p>
      </section>
    </main>
  );
}