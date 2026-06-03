import Link from "next/link";

const feeTypes = [
  {
    title: "Referral fees",
    description:
      "Amazon usually charges a percentage-based referral fee on the order amount. The rate can vary by product category, sale price, and marketplace rules.",
  },
  {
    title: "FBA fulfillment fees",
    description:
      "If Amazon fulfills the order, FBA fees can cover picking, packing, shipping, handling, and fulfillment-related service costs.",
  },
  {
    title: "FBM shipping costs",
    description:
      "If the seller fulfills the order, the seller should include shipping label cost, packaging, handling time, carrier issues, and any shipping gap.",
  },
  {
    title: "Storage fees",
    description:
      "FBA inventory can create monthly storage cost, aged inventory pressure, and cash flow risk if products sit too long before selling.",
  },
  {
    title: "Advertising costs",
    description:
      "Amazon PPC spend can help listings get visibility, but ad cost can reduce or erase profit if conversion and margin are weak.",
  },
  {
    title: "Refund and return costs",
    description:
      "Refunds, returns, damaged units, replacements, claims, and restocking problems can reduce seller profit after the original sale.",
  },
];

const calculators = [
  ["/amazon/fee-calculator", "Amazon Fee Calculator"],
  ["/amazon/referral-fee-calculator", "Amazon Referral Fee Calculator"],
  ["/amazon/fba-profit-calculator", "Amazon FBA Profit Calculator"],
  ["/amazon/fbm-profit-calculator", "Amazon FBM Profit Calculator"],
];

const workflow = [
  {
    title: "Estimate referral fee",
    description:
      "Start with the product category, sale price, shipping charged, and estimated referral fee rate.",
  },
  {
    title: "Add fulfillment costs",
    description:
      "Include FBA fulfillment fees or FBM shipping, packaging, handling, and seller labor.",
  },
  {
    title: "Add operating costs",
    description:
      "Include storage, PPC, refunds, prep, labeling, inbound shipping, and other product-specific expenses.",
  },
  {
    title: "Check profit",
    description:
      "Compare final profit, margin, break-even price, and pricing room before sourcing or advertising more inventory.",
  },
];

export default function HowAmazonFeesWorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          How Amazon Fees Work
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon sellers need to account for referral fees, FBA fulfillment
          fees, FBM shipping costs, storage fees, PPC costs, refunds, returns,
          prep costs, and other seller expenses before pricing or scaling a
          product.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          The main Amazon fees sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {feeTypes.map((fee) => (
            <div key={fee.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{fee.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {fee.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why estimating Amazon fees matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              An Amazon product can look profitable from the sale price alone,
              but the real margin may be much lower after referral fees,
              fulfillment fees, shipping, storage, PPC, refunds, prep, and
              product cost are included.
            </p>

            <p>
              Fee estimates help sellers decide whether a product is worth
              sourcing, whether the price is high enough, whether FBA or FBM is
              better, and whether PPC spend can be supported by the margin.
            </p>

            <p>
              The safest approach is to estimate fees before buying inventory,
              then compare estimated profit against actual seller reports after
              orders begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale revenue as profit before subtracting Amazon fees and costs.",
              "Using one referral fee rate for every Amazon category.",
              "Ignoring FBA storage, inbound shipping, prep, labels, and aged inventory risk.",
              "Comparing FBA and FBM without including seller time and shipping control.",
              "Running PPC without checking whether the product has enough margin.",
              "Restocking products before checking refunds, conversion, sales velocity, and storage cost.",
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
          Useful Amazon fee calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate Amazon referral fees, FBA fees, FBM costs,
          profit, pricing room, and fulfillment method impact before making
          seller decisions.
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
          Simple Amazon fee workflow
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
              "Referral fee rate, category fee assumptions, and minimum referral fees.",
              "FBA fulfillment fees or FBM shipping label, packaging, and handling costs.",
              "Product cost, inbound shipping, prep, labeling, inspection, and supplies.",
              "Storage fees, aged inventory risk, PPC cost, coupons, discounts, refunds, and return losses.",
              "Target profit, break-even price, margin, and cash flow before buying more inventory.",
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
            How Amazon fees affect pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Lower-priced items:</strong>{" "}
              Referral fees, minimum fees, shipping, and fulfillment costs can
              take a larger share of lower-priced sales.
            </p>

            <p>
              <strong className="text-gray-950">FBA products:</strong> FBA can
              simplify fulfillment, but sellers should include fulfillment fees,
              inbound shipping, storage, prep, and return risk.
            </p>

            <p>
              <strong className="text-gray-950">FBM products:</strong> FBM can
              give more control, but sellers must include shipping labels,
              packaging, handling, support time, and delivery expectations.
            </p>

            <p>
              <strong className="text-gray-950">Advertising:</strong> PPC can
              increase sales volume, but it should be tested against net profit,
              not just impressions, clicks, or revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon fee categories to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Marketplace fees",
              "Referral fees, closing fees, category-specific fees, and seller account costs.",
            ],
            [
              "Fulfillment fees",
              "FBA fulfillment, FBM shipping, packaging, handling, inbound shipping, and prep costs.",
            ],
            [
              "Growth costs",
              "PPC, coupons, deals, discounts, listing optimization, photography, and testing.",
            ],
            [
              "Risk costs",
              "Refunds, returns, damaged units, lost inventory, stale inventory, storage, and claims.",
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
          Amazon fee rates, category rules, FBA fees, referral fees, storage
          fees, PPC results, refund outcomes, taxes, and marketplace policies
          can change. This guide is for planning purposes. Always confirm
          current fee details in your Amazon seller account and official Amazon
          seller resources.
        </p>
      </section>
    </main>
  );
}