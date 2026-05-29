import Link from "next/link";

const facebookMarketplaceTools = [
  {
    title: "Facebook Marketplace Profit Calculator",
    description:
      "Estimate profit from local pickup, delivery, or shipped Facebook Marketplace sales after item cost, packaging, fuel, delivery, fees, and other selling expenses.",
    href: "/facebook-marketplace/profit-calculator",
    category: "Profitability",
  },
  {
    title: "Facebook Marketplace Pricing Calculator",
    description:
      "Find a profitable listing price based on item cost, target profit, buyer negotiation, delivery costs, platform fees, and resale margin goals.",
    href: "/facebook-marketplace/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "Facebook Marketplace Break-Even Calculator",
    description:
      "Calculate the minimum listing price needed to avoid losing money after item cost, delivery, shipping, packaging, negotiation, fees, and other expenses.",
    href: "/facebook-marketplace/break-even-calculator",
    category: "Pricing",
  },
  {
    title: "Facebook Marketplace Negotiation Calculator",
    description:
      "Estimate how buyer offers, negotiation discounts, counteroffers, and accepted prices affect profit, margin, and your minimum acceptable price.",
    href: "/facebook-marketplace/negotiation-calculator",
    category: "Negotiation",
  },
  {
    title: "Facebook Marketplace Shipping Profit Calculator",
    description:
      "Compare local pickup, local delivery, and shipped orders to see how fulfillment choices affect profit, margin, shipping coverage, and seller time.",
    href: "/facebook-marketplace/shipping-profit-calculator",
    category: "Fulfillment",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate Facebook Marketplace profit, margin, ROI, total costs, local sale viability, and fulfillment impact.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable listing prices using item cost, delivery cost, shipping, buyer negotiation, target profit, and margin goals.",
  },
  {
    title: "Negotiation tools",
    description:
      "Review buyer offer room, accepted prices, counteroffers, discount pressure, and minimum profitable sale prices.",
  },
  {
    title: "Fulfillment tools",
    description:
      "Compare local pickup, local delivery, shipped orders, packaging, fuel cost, shipping charges, and seller time.",
  },
];

const workflow = [
  {
    title: "Calculate costs",
    description:
      "Start with item cost, shipping, packaging, delivery, fuel, platform fees, and other expenses so your sale price is grounded.",
  },
  {
    title: "Estimate profit",
    description:
      "Use the profit calculator to see how much money remains after item cost, fulfillment costs, fees, and selling expenses.",
  },
  {
    title: "Set pricing",
    description:
      "Use pricing and break-even tools to find a listing price that supports profit, buyer negotiation, and realistic local demand.",
  },
  {
    title: "Review fulfillment",
    description:
      "Compare pickup, delivery, and shipped-order scenarios before offering delivery, charging shipping, or accepting buyer offers.",
  },
];

export default function FacebookMarketplacePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Facebook Marketplace Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Facebook Marketplace calculators for profit, pricing,
          negotiation, shipping, local delivery, and break-even planning. Use
          these tools to estimate item costs, buyer offers, delivery impact,
          shipping charges, fulfillment costs, and seller margins before
          listing, pricing, shipping, or accepting offers.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Facebook Marketplace toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          5 active Facebook Marketplace calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Facebook Marketplace seller toolkit to estimate resale
          profit, listing prices, break-even thresholds, buyer negotiation room,
          shipping profitability, local delivery cost, and fulfillment impact
          for local and shipped sales.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Facebook Marketplace calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Facebook Marketplace seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {facebookMarketplaceTools.map((tool) => (
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
          Recommended Facebook Marketplace seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from cost estimates to real
          resale profit, pricing decisions, negotiation limits, break-even
          analysis, and fulfillment choices. This helps prevent listings from
          looking profitable before item cost, delivery, fuel, shipping,
          packaging, fees, buyer offers, and seller time are fully included.
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
            What Facebook Marketplace sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, repair cost, cleaning cost, prep cost, and supplies.",
              "Shipping cost, delivery cost, fuel cost, packaging, pickup effort, and seller time.",
              "Buyer negotiation discount, counteroffer room, and minimum acceptable offer.",
              "Marketplace fee, checkout fee, shipping fee, or payment processing cost when applicable.",
              "Break-even sale price before accepting low offers or offering delivery.",
              "Profit margin after all local sale, shipping, fulfillment, and seller costs are included.",
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
            Common Facebook Marketplace seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating listing price as profit before subtracting item cost and fulfillment costs.",
              "Forgetting that buyers often negotiate below the listed price.",
              "Offering delivery without pricing fuel, distance, time, or pickup effort.",
              "Charging less for shipping than the actual label, postage, packaging, and handling cost.",
              "Ignoring checkout, shipping, marketplace, or payment processing fees when they apply.",
              "Comparing only active listings instead of realistic local sold prices and buyer demand.",
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
          How to use these Facebook Marketplace calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with costs",
              "Use the profit calculator to estimate item cost, fulfillment cost, delivery cost, fees, and total resale profit.",
            ],
            [
              "Set price",
              "Use the pricing and break-even calculators to find listing prices that leave room for buyer negotiation.",
            ],
            [
              "Review offers",
              "Use the negotiation calculator to compare accepted prices, counteroffers, discount room, and minimum profitable offers.",
            ],
            [
              "Compare fulfillment",
              "Use the shipping profit calculator to compare local pickup, local delivery, and shipped-order profit.",
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
          Facebook Marketplace fees, buyer negotiation, shipping costs, local
          delivery costs, fuel costs, packaging costs, payment processing,
          cancellations, returns, taxes, pickup reliability, and item-specific
          marketplace rules may vary.
        </p>
      </section>
    </main>
  );
}