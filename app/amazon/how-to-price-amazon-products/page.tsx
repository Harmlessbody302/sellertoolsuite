import Link from "next/link";

const pricingFactors = [
  {
    title: "Sold prices",
    description:
      "Completed sales, current Amazon offers, buy box pricing, and realistic competitor prices are more useful than guessing from desired profit alone.",
  },
  {
    title: "Product cost",
    description:
      "Sourcing cost, inbound shipping, prep, labeling, inspection, packaging, and waste allowance should be included before setting price.",
  },
  {
    title: "Amazon fees",
    description:
      "Referral fees, FBA fulfillment fees, FBM shipping costs, storage fees, closing fees, and other Amazon costs can reduce the amount kept from each sale.",
  },
  {
    title: "Fulfillment method",
    description:
      "FBA and FBM can require different prices because fulfillment fees, storage, shipping control, labor, and buyer expectations are different.",
  },
  {
    title: "PPC and promotion room",
    description:
      "If the product will use Amazon PPC, coupons, deals, discounts, or price testing, the listing price should leave enough margin to absorb those costs.",
  },
  {
    title: "Refund and return risk",
    description:
      "Returns, damaged units, replacements, customer support time, and unsellable inventory can make a low-margin Amazon product less profitable than it appears.",
  },
];

const calculators = [
  ["/amazon/pricing-calculator", "Amazon Pricing Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/break-even-calculator", "Amazon Break-Even Calculator"],
  ["/amazon/fba-vs-fbm-calculator", "Amazon FBA vs FBM Calculator"],
];

const workflow = [
  {
    title: "Check market price",
    description:
      "Review realistic competitor prices, buy box pressure, product condition, shipping promise, and customer expectations.",
  },
  {
    title: "Add all costs",
    description:
      "Include product cost, Amazon fees, fulfillment, storage, PPC, refunds, prep, packaging, and labor.",
  },
  {
    title: "Set margin target",
    description:
      "Choose a price that leaves enough room for profit after fees, promotions, returns, and fulfillment costs.",
  },
  {
    title: "Review after sales",
    description:
      "Compare estimated profit against actual Amazon reports, PPC results, refunds, storage fees, and fulfillment costs.",
  },
];

export default function HowToPriceAmazonProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          How to Price Amazon Products
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon pricing should cover product cost, referral fees, FBA or FBM
          fulfillment costs, storage fees, PPC, refunds, returns, prep,
          packaging, labor, and target profit. A good Amazon price is not just
          based on competitor listings. It should be based on realistic demand
          and the full cost of completing the sale.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon pricing factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {pricingFactors.map((factor) => (
            <div key={factor.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{factor.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why Amazon pricing strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A product can sell quickly and still be a poor Amazon listing if
              the price does not cover product cost, referral fees, fulfillment,
              storage, PPC, refunds, prep, packaging, and labor.
            </p>

            <p>
              Amazon sellers often have to price with flexibility because buy
              box pressure, competing offers, PPC costs, coupons, and inventory
              timing can change the actual profit kept from each order.
            </p>

            <p>
              The safest approach is to start with the full cost structure,
              compare realistic market prices, then choose a price that supports
              both buyer demand and seller profit.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from competitor listings without checking full product cost.",
              "Using the same margin target for FBA and FBM products.",
              "Forgetting referral fees, fulfillment fees, storage fees, PPC, and refund risk.",
              "Running coupons or deals without knowing the minimum profitable price.",
              "Pricing too low to win sales while creating thin or negative profit.",
              "Restocking inventory before confirming the current price still supports enough margin.",
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

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Amazon pricing calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate listing price, profit, break-even point,
          fulfillment method impact, and pricing room before publishing or
          revising Amazon listings.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Simple Amazon pricing workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {workflow.map((step) => (
            <div key={step.title} className="rounded-xl bg-gray-50 p-4">
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
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Realistic market price, competing offers, buy box pressure, and shipping promise.",
              "Product sourcing cost, inbound shipping, prep, labeling, packaging, inspection, and supplies.",
              "Referral fee rate, FBA fees, FBM shipping costs, storage fees, and other Amazon fees.",
              "PPC spend, coupon cost, deal cost, discount room, and promotion strategy.",
              "Refund rate, return cost, damaged inventory, customer support time, and replacement risk.",
              "Target profit, break-even price, margin, inventory cash flow, and restock plans.",
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
            How to choose an Amazon listing price
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Start with the floor:</strong>{" "}
              Calculate the minimum price needed to avoid losing money after
              product cost, Amazon fees, fulfillment, PPC, storage, and refund
              risk.
            </p>

            <p>
              <strong className="text-gray-950">Add target profit:</strong>{" "}
              Decide how much profit the product needs to justify sourcing,
              listing, shipping, storage, advertising, and support.
            </p>

            <p>
              <strong className="text-gray-950">Compare realistic demand:</strong>{" "}
              Check whether buyers are actually paying enough to support that
              price in the current market.
            </p>

            <p>
              <strong className="text-gray-950">Leave operating room:</strong>{" "}
              If you use PPC, coupons, deals, or price testing, avoid pricing so
              low that normal seller activity removes your profit.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon pricing strategies to compare
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Profit-first pricing",
              "Start from required profit and work backward into the minimum acceptable price.",
            ],
            [
              "Market-match pricing",
              "Use realistic competing offers while confirming the product still covers all costs.",
            ],
            [
              "PPC-supported pricing",
              "Price with enough margin to support ad spend without turning revenue into weak profit.",
            ],
            [
              "Fulfillment-aware pricing",
              "Compare FBA and FBM pricing because storage, shipping, labor, and buyer expectations differ.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Amazon prices, buy box behavior, referral fees, FBA fees, FBM shipping
          costs, PPC results, storage costs, refunds, taxes, category demand,
          and marketplace rules can change. This guide is for planning purposes.
          Always compare estimated pricing against actual order results and
          current Amazon seller settings.
        </p>
      </section>
    </main>
  );
}