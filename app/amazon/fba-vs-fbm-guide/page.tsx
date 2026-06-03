import Link from "next/link";

const fulfillmentFactors = [
  {
    title: "FBA fulfillment",
    description:
      "Fulfillment by Amazon can handle storage, picking, packing, shipping, customer delivery expectations, and some fulfillment workload, but sellers still need to include FBA fees, inbound shipping, prep, storage, and returns.",
  },
  {
    title: "FBM fulfillment",
    description:
      "Fulfillment by Merchant lets sellers handle their own shipping, packaging, carrier choices, and order handling, but the seller must account for label cost, materials, labor, delivery promises, and customer support.",
  },
  {
    title: "Fulfillment cost",
    description:
      "FBA and FBM can have very different cost structures. Sellers should compare per-order costs, monthly costs, storage, shipping gaps, prep, and labor before choosing.",
  },
  {
    title: "Buyer expectations",
    description:
      "Delivery speed, tracking, shipping reliability, returns, and customer trust can affect conversion and sales performance under either fulfillment method.",
  },
  {
    title: "Inventory control",
    description:
      "FBA can simplify scaling but may create storage and aged inventory risk. FBM can provide more control but may require more seller time and workflow management.",
  },
  {
    title: "Profit after all costs",
    description:
      "The better method is not always the one with the lowest visible fee. Sellers should compare final profit after referral fees, fulfillment, product cost, PPC, refunds, storage, labor, and cash flow risk.",
  },
];

const calculators = [
  ["/amazon/fba-vs-fbm-calculator", "Amazon FBA vs FBM Calculator"],
  ["/amazon/fba-profit-calculator", "Amazon FBA Profit Calculator"],
  ["/amazon/fbm-profit-calculator", "Amazon FBM Profit Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
];

const workflow = [
  {
    title: "Compare order costs",
    description:
      "Estimate FBA fees, FBM shipping, packaging, handling, referral fees, product cost, PPC, refunds, and other seller costs.",
  },
  {
    title: "Review workload",
    description:
      "Consider how much time is required for packing, shipping, customer messages, inventory prep, storage, returns, and issue handling.",
  },
  {
    title: "Check buyer impact",
    description:
      "Compare delivery expectations, conversion, shipping speed, buy box pressure, return handling, and customer trust.",
  },
  {
    title: "Choose by profit",
    description:
      "Use final profit, margin, ROI, inventory risk, and seller capacity to decide whether FBA, FBM, or both make sense.",
  },
];

export default function AmazonFbaVsFbmGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon FBA vs FBM Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon sellers can fulfill orders through FBA or FBM. FBA may reduce
          seller workload and support faster fulfillment, while FBM can give more
          control over shipping, packaging, and inventory. The better choice
          depends on product size, fees, shipping cost, storage risk, labor,
          delivery expectations, returns, and profit after all costs.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon FBA vs FBM factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {fulfillmentFactors.map((factor) => (
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
            Why comparing FBA and FBM matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              FBA can make fulfillment easier, but it can also add fulfillment
              fees, storage fees, inbound shipping, prep costs, aged inventory
              pressure, and return complexity. A product may sell well through
              FBA while still producing weak profit if those costs are not
              included.
            </p>

            <p>
              FBM can give sellers more control over packaging, carrier choice,
              shipping speed, and inventory, but it can also add labor,
              packaging cost, shipping label risk, handling time, customer
              messages, returns, and workflow pressure.
            </p>

            <p>
              The safest approach is to compare FBA and FBM using actual product
              size, weight, order volume, shipping cost, storage risk, refund
              risk, seller capacity, and final profit instead of assuming one
              method is always better.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon FBA vs FBM mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Choosing FBA because it seems easier without checking storage, inbound shipping, prep, and fulfillment fees.",
              "Choosing FBM because it avoids FBA fees without including shipping, packaging, labor, and support time.",
              "Comparing fulfillment methods without including product cost, referral fees, PPC, refunds, and returns.",
              "Ignoring delivery expectations, buy box pressure, conversion rate, and customer trust.",
              "Using one fulfillment method for every product instead of comparing product-by-product.",
              "Restocking inventory before checking whether FBA or FBM produces better real profit.",
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
          Useful Amazon FBA vs FBM calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to compare FBA profit, FBM profit, fulfillment method
          impact, Amazon fees, and final seller profitability before choosing a
          fulfillment strategy.
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
          Simple Amazon FBA vs FBM workflow
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
              "Product cost, referral fee, sale price, order volume, and target profit.",
              "FBA fulfillment fees, inbound shipping, prep, labeling, storage, returns, and aged inventory risk.",
              "FBM shipping labels, packaging materials, handling time, drop-off time, customer support, and return handling.",
              "PPC spend, coupons, discounts, refund allowance, damaged inventory, and case losses.",
              "Product size, product weight, delivery expectations, buyer trust, and conversion rate.",
              "Inventory cash flow, storage limits, seller workload, restock timing, and operational capacity.",
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
            When FBA or FBM may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">FBA may fit:</strong> Products
              with steady demand, manageable size and weight, strong margin, and
              enough sales velocity to avoid storage drag.
            </p>

            <p>
              <strong className="text-gray-950">FBM may fit:</strong> Products
              that are slow-moving, fragile, oversized, unusual, expensive to
              store, or cheaper for the seller to ship directly.
            </p>

            <p>
              <strong className="text-gray-950">Both may fit:</strong> Some
              sellers use both methods for different products, seasonal
              inventory, backup fulfillment, or testing.
            </p>

            <p>
              <strong className="text-gray-950">Neither is automatic:</strong>{" "}
              The best fulfillment method should be chosen by profit, workload,
              delivery expectations, inventory risk, and actual seller capacity.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon FBA vs FBM signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "FBA favored",
              "FBA may produce stronger profit or reduce workload enough to justify fulfillment and storage costs.",
            ],
            [
              "FBM favored",
              "FBM may produce stronger profit when the seller can ship cheaply, avoid storage drag, and manage fulfillment well.",
            ],
            [
              "Borderline",
              "The difference may be small, so sellers should compare actual orders, return rates, and workload before switching.",
            ],
            [
              "Test both",
              "Some products may need real order data before the better fulfillment method becomes clear.",
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
          Amazon FBA fees, FBM shipping costs, referral fees, storage fees,
          inbound shipping, prep rules, delivery expectations, buy box behavior,
          refunds, taxes, and marketplace policies can change. This guide is for
          planning purposes. Always compare FBA and FBM decisions against actual
          seller costs, current Amazon settings, and official Amazon seller
          resources.
        </p>
      </section>
    </main>
  );
}