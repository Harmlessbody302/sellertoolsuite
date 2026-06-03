import Link from "next/link";

const marginFactors = [
  {
    title: "Revenue",
    description:
      "The total order amount before costs are subtracted. This can include item price and any shipping charged to the buyer.",
  },
  {
    title: "Net profit",
    description:
      "The money left after product cost, Amazon referral fees, FBA or FBM fulfillment, PPC, refunds, storage, prep, and other costs.",
  },
  {
    title: "Profit margin",
    description:
      "The percentage of revenue that remains as profit. Higher margin gives sellers more room for PPC, refunds, discounts, and fee changes.",
  },
  {
    title: "Fee pressure",
    description:
      "Referral fees, FBA fees, FBM shipping costs, storage fees, closing fees, and PPC can reduce the amount kept from each sale.",
  },
  {
    title: "Fulfillment impact",
    description:
      "FBA and FBM can produce different margins because fulfillment fees, shipping costs, storage, labor, and delivery expectations differ.",
  },
  {
    title: "Risk allowance",
    description:
      "Refunds, returns, damaged inventory, lost units, case losses, stale inventory, and customer support time can reduce real profit after the sale.",
  },
];

const calculators = [
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/product-cost-calculator", "Amazon Product Cost Calculator"],
  ["/amazon/fba-vs-fbm-calculator", "Amazon FBA vs FBM Calculator"],
  ["/amazon/listing-roi-calculator", "Amazon Listing ROI Calculator"],
];

const workflow = [
  {
    title: "Start with revenue",
    description:
      "Use item price and any buyer-paid shipping as the starting order revenue.",
  },
  {
    title: "Subtract all costs",
    description:
      "Include product cost, referral fees, FBA or FBM fulfillment, PPC, storage, prep, refunds, and other seller expenses.",
  },
  {
    title: "Calculate margin",
    description:
      "Divide estimated profit by total revenue to see what percentage remains after costs.",
  },
  {
    title: "Review decisions",
    description:
      "Use margin to decide whether to raise price, reduce costs, adjust PPC, restock, discount, or avoid the product.",
  },
];

export default function AmazonProfitMarginGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Profit Margin Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon profit margin shows how much money remains after product cost,
          referral fees, FBA or FBM fulfillment costs, storage, PPC, refunds,
          prep, packaging, labor, and other seller expenses. A healthy Amazon
          margin gives sellers room for advertising, returns, fee changes,
          discounts, and unexpected order issues.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon profit margin factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {marginFactors.map((factor) => (
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
            Why Amazon profit margin matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A product can generate sales and still be weak if the margin is
              too thin. After Amazon fees, fulfillment, PPC, storage, refunds,
              prep, packaging, and labor are included, the amount kept by the
              seller may be much smaller than expected.
            </p>

            <p>
              Margin also affects how flexible a seller can be. A higher-margin
              Amazon listing can usually handle PPC testing, coupons, price
              changes, refunds, and restocking decisions better than a low-margin
              listing.
            </p>

            <p>
              The safest approach is to calculate margin before sourcing or
              repricing, then review real order results after sales begin so
              pricing, PPC, fulfillment, and sourcing decisions can improve over
              time.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon margin mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale price as profit before subtracting Amazon fees and product costs.",
              "Ignoring FBA fulfillment fees, FBM shipping costs, storage fees, PPC, and prep costs.",
              "Using PPC or coupons without checking the new profit margin.",
              "Assuming a product is profitable because revenue or order volume is high.",
              "Forgetting refund, return, damaged inventory, and stale inventory allowance.",
              "Restocking more inventory because sales are strong without checking margin and cash flow.",
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
          Useful Amazon margin calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate profit margin, product cost, fulfillment
          method impact, listing ROI, PPC pressure, and real seller profitability
          before scaling Amazon products.
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
          Simple Amazon margin workflow
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
              "Item sale price and shipping charged to the buyer if applicable.",
              "Product sourcing cost, inbound shipping, prep, labeling, inspection, packaging, and supplies.",
              "Referral fees, FBA fulfillment fees, FBM shipping costs, storage fees, and closing fees when applicable.",
              "PPC spend, coupons, deals, discounts, and promotion costs.",
              "Refunds, returns, damaged units, replacement shipments, support time, and case losses.",
              "Target profit, break-even price, inventory cash flow, restock timing, and listing ROI.",
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
            What margin means for Amazon decisions
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Thin margin:</strong> The
              product may still sell, but PPC, refunds, storage, fee changes, or
              shipping increases can erase profit quickly.
            </p>

            <p>
              <strong className="text-gray-950">Healthy margin:</strong> The
              listing has enough room to handle normal Amazon selling costs
              while still leaving useful profit.
            </p>

            <p>
              <strong className="text-gray-950">Strong margin:</strong> The
              listing may be a better candidate for restocking, PPC scaling,
              coupons, bundles, or similar-product sourcing.
            </p>

            <p>
              <strong className="text-gray-950">Negative margin:</strong> The
              product likely needs a higher price, lower cost, cheaper
              fulfillment method, lower PPC spend, or should be avoided.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon margin signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Fee pressure",
              "Referral fees, FBA fees, FBM costs, storage, and closing fees may be taking too much of the sale price.",
            ],
            [
              "PPC pressure",
              "Ad spend may be creating revenue without enough net profit after the order is complete.",
            ],
            [
              "Refund pressure",
              "Returns, damaged units, and replacements may be reducing true margin after the sale.",
            ],
            [
              "Inventory pressure",
              "Slow-moving inventory can tie up cash, create storage cost, and reduce the value of a strong-looking margin.",
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
          Amazon fees, fulfillment costs, storage costs, PPC results, refunds,
          taxes, category demand, buy box behavior, inventory limits, and
          marketplace rules can change. This guide is for planning purposes.
          Always compare estimated margins with actual Amazon order results and
          current seller account data.
        </p>
      </section>
    </main>
  );
}