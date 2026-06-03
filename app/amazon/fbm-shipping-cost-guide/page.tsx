import Link from "next/link";

const fbmShippingFactors = [
  {
    title: "Actual shipping label cost",
    description:
      "FBM sellers should include the real carrier label cost based on package weight, dimensions, destination, service level, and shipping zone.",
  },
  {
    title: "Buyer-paid shipping",
    description:
      "Shipping charged to the buyer may not fully cover the actual label cost, packaging cost, marketplace fee impact, or handling time.",
  },
  {
    title: "Packaging materials",
    description:
      "Boxes, padded mailers, tape, labels, void fill, bubble wrap, poly bags, inserts, and shipping supplies should be included.",
  },
  {
    title: "Handling and labor",
    description:
      "Picking, packing, printing labels, dropping off packages, customer messages, and carrier issue time can reduce real FBM profit.",
  },
  {
    title: "Returns and replacements",
    description:
      "Return labels, damaged packages, replacement shipments, buyer issues, and claims can add shipping cost after the original sale.",
  },
  {
    title: "Delivery expectations",
    description:
      "FBM sellers need to account for handling time, promised delivery speed, late shipment risk, tracking, and customer expectations.",
  },
];

const calculators = [
  ["/amazon/fbm-profit-calculator", "Amazon FBM Profit Calculator"],
  ["/amazon/fba-vs-fbm-calculator", "Amazon FBA vs FBM Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/pricing-calculator", "Amazon Pricing Calculator"],
];

const workflow = [
  {
    title: "Measure the package",
    description:
      "Estimate packed weight, dimensions, packaging type, and shipping service before setting a price.",
  },
  {
    title: "Compare buyer charge",
    description:
      "Check whether buyer-paid shipping actually covers the label, packaging, handling, and fee impact.",
  },
  {
    title: "Protect margin",
    description:
      "Build shipping gaps, packaging, handling time, returns, and replacement risk into pricing.",
  },
  {
    title: "Review actual orders",
    description:
      "After orders ship, compare real label costs and buyer charges against your estimate.",
  },
];

export default function AmazonFbmShippingCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon FBM Shipping Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon FBM shipping costs can include carrier labels, packaging,
          handling time, buyer-paid shipping gaps, returns, replacement
          shipments, and customer support. Sellers should estimate the full cost
          of merchant-fulfilled orders before pricing, shipping, or choosing FBM
          over FBA.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon FBM shipping costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {fbmShippingFactors.map((factor) => (
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
            Why Amazon FBM shipping cost matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              FBM can give sellers more control over fulfillment, but shipping
              cost can quickly reduce profit if the actual label cost,
              packaging, handling time, and customer support are not included
              before pricing.
            </p>

            <p>
              Buyer-paid shipping does not automatically protect the seller. If
              the buyer pays less than the actual shipping and packaging cost,
              the difference becomes a seller subsidy that lowers margin.
            </p>

            <p>
              The safest approach is to calculate FBM profit with real package
              assumptions, then compare actual shipped orders against the
              original estimate.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon FBM shipping mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating buyer-paid shipping as profit without comparing it to actual label cost.",
              "Forgetting boxes, mailers, labels, tape, padding, inserts, and other shipping supplies.",
              "Ignoring handling time, customer messages, drop-off time, and carrier issues.",
              "Using the same shipping estimate for products with different weights, sizes, or destinations.",
              "Offering fast delivery without checking whether the handling workflow can support it.",
              "Ignoring returns, replacement shipments, damaged packages, lost mail, and claims.",
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
          Useful Amazon FBM shipping calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate FBM profit, shipping gaps, fulfillment
          method impact, pricing, and whether FBA or FBM makes more sense for a
          product.
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
          Simple Amazon FBM shipping workflow
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
            What Amazon FBM sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Actual postage or carrier label cost.",
              "Packed weight, package dimensions, box size, and shipping zone.",
              "Packaging materials, labels, tape, padding, mailers, inserts, and fulfillment supplies.",
              "Shipping charged to the buyer and whether it covers the actual cost.",
              "Handling time, printing labels, packing work, drop-off time, and customer support.",
              "Return shipping, replacement shipments, lost packages, damaged packages, claims, and refund risk.",
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
            How FBM shipping affects Amazon pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Buyer-paid shipping:</strong>{" "}
              The buyer may cover some or all of the shipping charge, but sellers
              should compare that amount against actual label, packaging, and
              handling cost.
            </p>

            <p>
              <strong className="text-gray-950">Free shipping:</strong> Free
              shipping can improve buyer appeal, but the shipping cost usually
              needs to be built into the item price.
            </p>

            <p>
              <strong className="text-gray-950">Shipping gaps:</strong> If the
              buyer-paid shipping amount is lower than actual shipping cost, the
              difference reduces product margin.
            </p>

            <p>
              <strong className="text-gray-950">Returns and claims:</strong>{" "}
              Returned items, damaged packages, lost mail, and buyer issues can
              add extra fulfillment cost after the original order.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon FBM shipping strategies to compare
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Calculated shipping",
              "Lets shipping cost adjust based on buyer location, package weight, dimensions, and carrier settings.",
            ],
            [
              "Flat-rate shipping",
              "Keeps the buyer charge simple but may overcharge some buyers and undercharge others.",
            ],
            [
              "Free shipping",
              "Can improve buyer appeal, but the cost should usually be included in the item price.",
            ],
            [
              "FBA comparison",
              "FBM may be better for some products, but sellers should compare against FBA fulfillment and storage cost.",
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
          Amazon FBM shipping settings, carrier rates, delivery expectations,
          handling time rules, return policies, packaging prices, label costs,
          taxes, and marketplace policies can change. This guide is for planning
          purposes. Always compare estimated shipping costs with actual shipped
          orders and current Amazon seller settings.
        </p>
      </section>
    </main>
  );
}