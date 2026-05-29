import Link from "next/link";

const amazonTools = [
  {
    title: "Amazon FBA Profit Calculator",
    description:
      "Estimate Amazon FBA profit after product cost, referral fees, fulfillment fees, storage, PPC, returns, and prep costs.",
    href: "/amazon/fba-profit-calculator",
    category: "Profitability",
  },
  {
    title: "Amazon Fee Calculator",
    description:
      "Estimate Amazon referral fees, FBA fulfillment costs, storage fees, inbound placement fees, return processing, and total fee impact.",
    href: "/amazon/fee-calculator",
    category: "Fees",
  },
  {
    title: "Amazon Pricing Calculator",
    description:
      "Find a profitable Amazon selling price based on product cost, referral fees, FBA costs, PPC, target profit, and target margin.",
    href: "/amazon/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "Amazon PPC ROI Calculator",
    description:
      "Measure Amazon ad profitability using ACoS, TACoS, conversion rate, break-even CPC, ROI, and ad spend assumptions.",
    href: "/amazon/ppc-roi-calculator",
    category: "Advertising",
  },
  {
    title: "Amazon Break-Even Calculator",
    description:
      "Calculate the minimum Amazon sale price needed to avoid losing money after referral fees, FBA costs, PPC, returns, and prep costs.",
    href: "/amazon/break-even-calculator",
    category: "Pricing",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate FBA profit, margin, ROI, total costs, break-even pricing, and product viability.",
  },
  {
    title: "Fee tools",
    description:
      "Model Amazon referral fees, FBA fulfillment costs, storage, placement fees, returns, and total fee load.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable Amazon prices using product cost, FBA costs, PPC, target profit, and margin goals.",
  },
  {
    title: "Advertising tools",
    description:
      "Review PPC ROI, ACoS, TACoS, break-even CPC, conversion assumptions, and ad spend pressure.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with Amazon fees so you know how much revenue remains after referral, FBA, storage, and placement costs.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract product cost, inbound shipping, prep, storage, PPC, returns, and Amazon fees.",
  },
  {
    title: "Set pricing",
    description:
      "Use pricing and break-even tools to find a sale price that can support profit and competition.",
  },
  {
    title: "Review ads",
    description:
      "Check PPC ROI, ACoS, TACoS, conversion rate, and break-even CPC before scaling campaigns.",
  },
];

export default function AmazonPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Amazon calculators for FBA profit, fees, pricing, PPC ROI, and
          break-even planning. Use these tools to estimate product costs,
          fulfillment fees, advertising performance, and seller margins before
          sourcing or scaling products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Amazon toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          5 active Amazon calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Amazon seller toolkit to estimate referral fees, FBA costs,
          product profitability, PPC performance, break-even prices, and
          recommended pricing for Amazon marketplace products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Amazon seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {amazonTools.map((tool) => (
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
          Recommended Amazon seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to product
          profit, pricing, break-even analysis, and PPC decisions. This helps
          prevent products from looking profitable before FBA costs, ads,
          storage, returns, and product cost are fully included.
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
            What Amazon sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Referral fees, FBA fulfillment fees, storage costs, and placement fees.",
              "Product cost, inbound shipping, prep costs, packaging, and landed cost.",
              "PPC cost per sale, ACoS, TACoS, break-even CPC, and campaign ROI.",
              "Returns allowance, refunds, damaged inventory, and replacement risk.",
              "Break-even price before profit starts.",
              "Profit margin after all Amazon fees and seller costs are included.",
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
            Common Amazon seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating revenue after Amazon fees as profit before product cost and PPC.",
              "Forgetting inbound shipping, prep, storage, placement, and return costs.",
              "Using a generic referral fee rate without checking the product category.",
              "Scaling PPC before checking break-even CPC and product margin.",
              "Pricing products without enough room for coupons, returns, and competition.",
              "Sourcing inventory before calculating realistic FBA profit and break-even price.",
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
          How to use these Amazon calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate referral fees, FBA costs, storage, and other Amazon charges.",
            ],
            [
              "Check profit",
              "Use the FBA profit calculator to subtract product cost, inbound shipping, PPC, returns, and fees.",
            ],
            [
              "Set price",
              "Use the pricing and break-even calculators to find viable prices before sourcing or scaling.",
            ],
            [
              "Review PPC",
              "Use the PPC ROI calculator to compare ACoS, TACoS, break-even CPC, ad ROI, and scaling scenarios.",
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
          Amazon referral fees, FBA fees, placement fees, storage costs, PPC
          performance, returns, taxes, category rates, and marketplace rules may
          vary.
        </p>
      </section>
    </main>
  );
}