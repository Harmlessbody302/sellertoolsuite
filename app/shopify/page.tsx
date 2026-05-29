import Link from "next/link";

const shopifyTools = [
  {
    title: "Shopify Profit Calculator",
    description:
      "Estimate Shopify profit after product cost, shipping, payment processing, ads, app costs, returns, and other selling costs.",
    href: "/shopify/profit-calculator",
    category: "Profitability",
  },
  {
    title: "Shopify Fee Calculator",
    description:
      "Estimate Shopify payment processing fees, transaction fees, app costs, return allowance, and total fee impact.",
    href: "/shopify/fee-calculator",
    category: "Fees",
  },
  {
    title: "Shopify Pricing Calculator",
    description:
      "Find a profitable Shopify selling price based on product cost, shipping, payment fees, ads, app costs, target profit, and margin goals.",
    href: "/shopify/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "Shopify Ad ROI Calculator",
    description:
      "Estimate whether your Shopify ads are producing profitable orders after ad spend, cost per order, ROAS, and campaign ROI.",
    href: "/shopify/ad-roi-calculator",
    category: "Advertising",
  },
  {
    title: "Shopify Break-Even Calculator",
    description:
      "Calculate the minimum Shopify sale price needed to avoid losing money after product costs, shipping, payment fees, ads, apps, and returns.",
    href: "/shopify/break-even-calculator",
    category: "Pricing",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate Shopify profit, margin, ROI, total costs, break-even pricing, and product viability.",
  },
  {
    title: "Fee tools",
    description:
      "Model payment processing fees, transaction fees, app costs, return allowance, and total fee load.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable Shopify prices using product cost, shipping, payment fees, ads, target profit, and margin goals.",
  },
  {
    title: "Advertising tools",
    description:
      "Review ad ROI, ROAS, cost per order, break-even CPC, conversion assumptions, and ad spend pressure.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with Shopify fees so you understand payment processing, transaction fees, app costs, and return allowance.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract product cost, shipping, packaging, payment fees, ads, apps, returns, and other selling costs.",
  },
  {
    title: "Set pricing",
    description:
      "Use pricing and break-even tools to find a sale price that can support profit, ads, discounts, and returns.",
  },
  {
    title: "Review ads",
    description:
      "Check ad ROI, ROAS, cost per order, conversion rate, and break-even CPC before scaling campaigns.",
  },
];

export default function ShopifyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Shopify calculators for profit, fees, pricing, advertising ROI,
          and break-even planning. Use these tools to estimate product costs,
          payment fees, shipping impact, ad performance, and seller margins
          before pricing or scaling online store products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Shopify toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          5 active Shopify calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Shopify seller toolkit to estimate payment fees, product
          profitability, ad performance, break-even prices, and recommended
          pricing for online store products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Shopify calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Shopify store profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shopifyTools.map((tool) => (
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
          Recommended Shopify seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to product
          profit, pricing, break-even analysis, and ad decisions. This helps
          prevent products from looking profitable before shipping, payment
          processing, apps, returns, ads, and product cost are fully included.
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
            What Shopify sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Payment processing fees, transaction fees, app costs, and per-order charges.",
              "Product cost, shipping cost, packaging cost, and fulfillment expenses.",
              "Ad spend, cost per order, ROAS, ad ROI, and conversion assumptions.",
              "Returns allowance, refunds, chargebacks, damaged orders, and replacement risk.",
              "Break-even price before profit starts.",
              "Profit margin after all Shopify fees and seller costs are included.",
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
            Common Shopify seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating revenue after payment fees as profit before product cost and shipping.",
              "Forgetting app costs, return allowance, chargebacks, and packaging costs.",
              "Scaling ads before checking cost per order and profit per order.",
              "Offering discounts without checking break-even price and margin impact.",
              "Pricing products without enough room for refunds, ads, and fulfillment changes.",
              "Judging ad performance by ROAS alone instead of contribution profit.",
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
          How to use these Shopify calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate payment processing, transaction fees, app costs, and returns.",
            ],
            [
              "Check profit",
              "Use the profit calculator to subtract product cost, shipping, ads, apps, returns, and fees.",
            ],
            [
              "Set price",
              "Use the pricing and break-even calculators to find viable product prices before scaling.",
            ],
            [
              "Review ads",
              "Use the ad ROI calculator to compare ROAS, cost per order, break-even CPC, and scaling scenarios.",
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
          Shopify fees, payment processing costs, third-party transaction fees,
          app costs, ad performance, returns, chargebacks, shipping rates,
          discounts, taxes, and store-specific settings may vary.
        </p>
      </section>
    </main>
  );
}