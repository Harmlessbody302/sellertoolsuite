import Link from "next/link";

const ebayTools = [
  {
    title: "eBay Profit Calculator",
    description:
      "Estimate eBay profit after item cost, shipping, packaging, final value fees, promoted listing fees, and other selling costs.",
    href: "/ebay/profit-calculator",
    category: "Profitability",
  },
  {
    title: "eBay Fee Calculator",
    description:
      "Estimate final value fees, promoted listing costs, international fees, fixed order fees, and total fee impact.",
    href: "/ebay/fee-calculator",
    category: "Fees",
  },
  {
    title: "eBay Pricing Calculator",
    description:
      "Find a profitable eBay selling price based on item cost, shipping, packaging, fees, promoted listing rate, target profit, and target margin.",
    href: "/ebay/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "eBay Shipping Profit Calculator",
    description:
      "Compare free shipping, flat-rate shipping, buyer-paid shipping, and fulfillment cost impact on eBay profit.",
    href: "/ebay/shipping-profit-calculator",
    category: "Shipping",
  },
  {
    title: "eBay Break-Even Calculator",
    description:
      "Estimate the minimum eBay sale price needed to avoid losing money after item cost, shipping, packaging, and eBay fees.",
    href: "/ebay/break-even-calculator",
    category: "Pricing",
  },
  {
    title: "eBay Promoted Listing ROI Calculator",
    description:
      "Estimate whether promoted listings are increasing profit or quietly reducing margins after ad fees.",
    href: "/ebay/promoted-listing-roi-calculator",
    category: "Advertising",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate net profit, margin, ROI, break-even pricing, and total selling cost impact.",
  },
  {
    title: "Fee tools",
    description:
      "Model eBay final value fees, fixed order fees, promoted listing costs, and international fee impact.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable prices using item cost, shipping cost, target profit, and margin goals.",
  },
  {
    title: "Growth tools",
    description:
      "Review promoted listing ROI, shipping strategy, and pricing scenarios before scaling.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with eBay fees so you know how much revenue remains after marketplace charges.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract item cost, shipping, packaging, promoted listing fees, and other expenses.",
  },
  {
    title: "Set pricing",
    description:
      "Use target profit and margin goals to find a listing price that can survive offers and returns.",
  },
  {
    title: "Review promotion",
    description:
      "Check whether promoted listings are creating extra profit or just reducing margin.",
  },
];

export default function EbayPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free eBay calculators for profit, fees, pricing, shipping, break-even
          planning, and promoted listing ROI. Use these tools to estimate
          seller costs before pricing, promoting, or scaling listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live eBay toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          6 active eBay calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this eBay seller toolkit to estimate final value fees, promoted
          listing costs, shipping impact, break-even prices, profit margins, and
          pricing scenarios for marketplace listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect eBay seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ebayTools.map((tool) => (
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
          Recommended eBay seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to final
          pricing decisions. This helps prevent listings from looking profitable
          before shipping, fees, promoted listing costs, and item cost are fully
          included.
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
            What eBay sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Final value fees and fixed order fees.",
              "Promoted listing fees and ad rate impact.",
              "Shipping label cost, packaging cost, and shipping subsidies.",
              "Item sourcing cost and other selling costs.",
              "Break-even price before profit starts.",
              "Profit margin after all entered costs are included.",
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
            Common eBay seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale revenue as profit.",
              "Forgetting that fees may apply to item price plus shipping.",
              "Using promoted listings without checking net profit.",
              "Offering free shipping without raising the item price enough.",
              "Pricing based on active listings instead of realistic sold prices.",
              "Ignoring returns, packaging, supplies, and shipping adjustments.",
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
          How to use these eBay calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate marketplace charges and promoted listing costs.",
            ],
            [
              "Check profit",
              "Use the profit calculator to subtract item cost, shipping, packaging, and fees.",
            ],
            [
              "Set price",
              "Use the pricing and break-even calculators to find safe listing prices.",
            ],
            [
              "Review growth",
              "Use shipping and promoted listing tools before scaling listings or ad spend.",
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
          eBay fees, category rates, promoted listing charges, shipping costs,
          refunds, taxes, and marketplace rules may vary.
        </p>
      </section>
    </main>
  );
}