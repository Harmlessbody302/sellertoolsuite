import Link from "next/link";

const fbaCostFactors = [
  {
    title: "FBA fulfillment fees",
    description:
      "Amazon fulfillment fees can cover picking, packing, shipping, handling, and fulfillment service costs. The amount can vary by product size, weight, category, and current Amazon fee rules.",
  },
  {
    title: "Inbound shipping",
    description:
      "Before inventory can sell through FBA, sellers often pay to ship products to Amazon or to a prep/receiving location.",
  },
  {
    title: "Prep and labeling",
    description:
      "Bagging, bubble wrap, labels, carton prep, inspection, bundling, and compliance prep can add cost before the product is available for sale.",
  },
  {
    title: "Storage fees",
    description:
      "FBA inventory can create monthly storage cost, seasonal storage pressure, aged inventory cost, and cash flow risk when units sit too long.",
  },
  {
    title: "Refund and return costs",
    description:
      "Returns, damaged units, customer claims, replacements, lost inventory, and unsellable inventory can reduce FBA profit after the sale.",
  },
  {
    title: "Advertising and pricing pressure",
    description:
      "Amazon PPC, coupons, discounts, deals, competitive pricing, and buy box pressure can reduce the margin left after FBA costs.",
  },
];

const calculators = [
  ["/amazon/fba-profit-calculator", "Amazon FBA Profit Calculator"],
  ["/amazon/fee-calculator", "Amazon Fee Calculator"],
  ["/amazon/storage-fee-calculator", "Amazon Storage Fee Calculator"],
  ["/amazon/fba-vs-fbm-calculator", "Amazon FBA vs FBM Calculator"],
];

const workflow = [
  {
    title: "Start with product cost",
    description:
      "Record sourcing cost, supplier cost, inspection, prep, packaging, and any cost required before sending inventory to Amazon.",
  },
  {
    title: "Add inbound costs",
    description:
      "Include inbound shipping, placement-related costs, prep center costs, labeling, cartons, and handling.",
  },
  {
    title: "Add FBA fees",
    description:
      "Estimate fulfillment fees, referral fees, storage cost, return risk, refunds, and other Amazon selling costs.",
  },
  {
    title: "Check final profit",
    description:
      "Compare sale price, full cost, profit margin, storage pressure, and break-even price before restocking or advertising.",
  },
];

export default function AmazonFbaCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon FBA Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon FBA costs can include fulfillment fees, referral fees, inbound
          shipping, prep, labeling, storage, returns, damaged inventory, PPC,
          and other seller expenses. Sellers should estimate the full FBA cost
          structure before pricing, sourcing, advertising, or restocking
          inventory.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon FBA costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {fbaCostFactors.map((factor) => (
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
            Why Amazon FBA cost planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              FBA can simplify fulfillment, but it does not remove the need to
              calculate profit carefully. A product may sell well and still
              produce weak margin if fulfillment fees, referral fees, inbound
              shipping, storage, prep, and refunds are not included.
            </p>

            <p>
              FBA cost planning is especially important before buying inventory.
              Once units are in Amazon storage, slow sales can create storage
              drag, aged inventory pressure, cash flow strain, or discounting
              pressure.
            </p>

            <p>
              The safest approach is to estimate FBA profit before sourcing,
              compare actual Amazon reports after sales begin, and restock only
              when the product supports enough margin after all costs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon FBA cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Only checking the FBA fulfillment fee while ignoring referral fees and product cost.",
              "Forgetting inbound shipping, prep, labeling, inspection, cartons, and handling.",
              "Ignoring monthly storage fees, aged inventory pressure, and slow-moving inventory.",
              "Running PPC before checking whether the product can absorb ad spend.",
              "Assuming FBA returns and damaged units will not affect margin.",
              "Restocking inventory before reviewing actual profit, storage drag, refund risk, and sales velocity.",
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
          Useful Amazon FBA calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate FBA profit, Amazon fees, storage pressure,
          and whether FBA or FBM makes more sense for a product.
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
          Simple Amazon FBA cost workflow
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
            What Amazon FBA sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Product sourcing cost, supplier fees, samples, inspection, and landed cost.",
              "Inbound shipping, carton costs, prep center fees, labeling, bagging, bubble wrap, and handling.",
              "Amazon referral fees, FBA fulfillment fees, storage fees, and applicable category costs.",
              "PPC spend, coupons, deals, discounts, launch costs, and listing optimization expenses.",
              "Refunds, returns, damaged inventory, replacement units, lost inventory, and reimbursements.",
              "Storage duration, sales velocity, restock timing, cash flow, and aged inventory risk.",
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
            How FBA costs affect Amazon pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Fulfillment fees:</strong> FBA
              fulfillment fees can take a meaningful share of the sale price,
              especially on lower-priced or bulky products.
            </p>

            <p>
              <strong className="text-gray-950">Inbound costs:</strong> Inbound
              shipping, prep, and labeling should be included before deciding
              whether a product is profitable.
            </p>

            <p>
              <strong className="text-gray-950">Storage pressure:</strong>{" "}
              Slow-moving inventory can reduce profit even if the first sale
              calculation looks healthy.
            </p>

            <p>
              <strong className="text-gray-950">PPC and returns:</strong> FBA
              does not remove advertising cost, refund risk, damaged inventory,
              or the need to review real net profit.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon FBA cost categories to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Product costs",
              "Sourcing cost, supplier fees, inspection, samples, landed cost, and product defects.",
            ],
            [
              "Prep costs",
              "Labels, bagging, bubble wrap, cartons, prep center fees, inspection, and handling.",
            ],
            [
              "Amazon costs",
              "Referral fees, FBA fulfillment fees, storage fees, category fees, and seller account costs.",
            ],
            [
              "Risk costs",
              "Refunds, returns, damaged units, lost inventory, stale inventory, claims, and cash flow.",
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
          Amazon FBA fulfillment fees, referral fees, storage fees, inbound
          shipping costs, prep requirements, aged inventory rules, PPC results,
          refunds, taxes, and marketplace policies can change. This guide is for
          planning purposes. Always confirm current FBA fee details in your
          Amazon seller account and official Amazon seller resources.
        </p>
      </section>
    </main>
  );
}