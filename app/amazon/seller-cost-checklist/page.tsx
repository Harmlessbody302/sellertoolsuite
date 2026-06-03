import Link from "next/link";

const costCategories = [
  {
    title: "Product cost",
    description:
      "The item purchase price, sourcing cost, supplier fees, inbound shipping, prep, labeling, inspection, and supplies needed before the product can be sold.",
  },
  {
    title: "Amazon fees",
    description:
      "Referral fees, FBA fulfillment fees, FBM shipping costs, closing fees, storage fees, account costs, and category-specific fees.",
  },
  {
    title: "Fulfillment costs",
    description:
      "FBA fulfillment, inbound shipping, prep, labeling, storage, or FBM shipping labels, packaging, handling, and seller labor.",
  },
  {
    title: "Advertising costs",
    description:
      "Amazon PPC, coupons, deals, discounts, promotion costs, testing costs, and any campaign spend used to drive sales.",
  },
  {
    title: "Refund and return costs",
    description:
      "Refunds, return shipping, damaged units, replacements, restocking, inspection, case losses, and customer support time.",
  },
  {
    title: "Inventory costs",
    description:
      "Storage fees, stale inventory risk, aged inventory pressure, cash tied up in stock, restock delays, and unsellable inventory.",
  },
];

const calculators = [
  ["/amazon/product-cost-calculator", "Amazon Product Cost Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/fee-calculator", "Amazon Fee Calculator"],
  ["/amazon/storage-fee-calculator", "Amazon Storage Fee Calculator"],
];

const workflow = [
  {
    title: "Start with item cost",
    description:
      "Record the product cost, supplier cost, inbound shipping, prep, labeling, inspection, and supply expenses.",
  },
  {
    title: "Add fulfillment",
    description:
      "Include FBA fees, storage, prep, inbound costs, or FBM shipping labels, packaging, handling, and seller labor.",
  },
  {
    title: "Add selling costs",
    description:
      "Estimate referral fees, PPC, coupons, discounts, refunds, returns, and other Amazon selling expenses.",
  },
  {
    title: "Add risk allowance",
    description:
      "Include damaged units, stale inventory, returns, replacements, customer support time, and cash flow risk.",
  },
];

export default function AmazonSellerCostChecklistPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Seller Cost Checklist
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon sellers should include every major selling cost before pricing,
          buying inventory, running PPC, choosing FBA or FBM, accepting thin
          margins, or restocking products. This checklist helps identify the
          hidden costs that can turn a strong-looking Amazon sale into a weak or
          losing order.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon seller costs to check before listing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {costCategories.map((cost) => (
            <div key={cost.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{cost.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {cost.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why an Amazon cost checklist matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Amazon profit can disappear when sellers only subtract product
              cost from the sale price. Referral fees, fulfillment costs,
              storage, PPC, packaging, prep, refunds, returns, and labor can all
              reduce the amount actually kept.
            </p>

            <p>
              A checklist helps sellers price more consistently because each
              product is reviewed against the same cost categories before it is
              sourced, listed, advertised, discounted, or restocked.
            </p>

            <p>
              The safest approach is to use a cost checklist before buying
              inventory, then compare estimated costs against actual Amazon
              seller reports after orders begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Only subtracting item cost from the sale price.",
              "Forgetting FBA fulfillment fees, FBM shipping labels, storage, prep, or inbound shipping.",
              "Ignoring PPC spend when reviewing net profit.",
              "Restocking products without checking storage drag, refund risk, and cash flow.",
              "Forgetting inspection, labeling, packaging, damaged units, and unsellable inventory.",
              "Not building in any allowance for returns, case losses, stale inventory, or customer support.",
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
          Useful Amazon cost calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate product cost, profit, fees, storage
          pressure, fulfillment costs, and selling expenses before making
          Amazon listing decisions.
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
          Simple Amazon cost checklist workflow
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
              "Product purchase price, supplier cost, inbound shipping, prep, labeling, inspection, and packaging.",
              "Amazon referral fee, FBA fulfillment fee, FBM shipping cost, storage fees, and closing fees if applicable.",
              "PPC spend, coupons, promotions, deal fees, discounts, and testing costs.",
              "Refunds, return shipping, damaged units, replacements, customer support, and case losses.",
              "Storage drag, stale inventory risk, restock timing, cash flow, and unsellable inventory allowance.",
              "Time spent sourcing, listing, photographing, optimizing, packing, shipping, and managing issues.",
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
            When to use the checklist
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Before sourcing:</strong> Use
              the checklist to decide whether the product can support enough
              profit after all Amazon selling costs.
            </p>

            <p>
              <strong className="text-gray-950">Before listing:</strong> Review
              product cost, fee pressure, fulfillment costs, PPC room, and
              refund risk before choosing a price.
            </p>

            <p>
              <strong className="text-gray-950">Before advertising:</strong>{" "}
              Confirm that the listing has enough margin to absorb PPC spend
              without turning sales into weak profit.
            </p>

            <p>
              <strong className="text-gray-950">Before restocking:</strong>{" "}
              Review actual profit, sales velocity, storage cost, refunds, and
              cash tied up before buying more inventory.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon seller cost categories
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Required costs",
              "Product cost, referral fees, fulfillment fees, shipping labels, packaging, prep, and payment/order costs.",
            ],
            [
              "Optional costs",
              "PPC, coupons, deals, listing upgrades, photography, software, and optimization work.",
            ],
            [
              "Risk costs",
              "Refunds, returns, damaged units, lost inventory, stale inventory, case losses, and chargebacks.",
            ],
            [
              "Time costs",
              "Sourcing, listing, photography, packing, shipping, messages, customer support, and issue handling.",
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
          Amazon fees, FBA fees, FBM shipping costs, storage costs, PPC results,
          return rates, taxes, inventory limits, seller account rules, and
          marketplace policies can change. This checklist is for planning
          purposes. Always compare estimated costs with actual order results and
          current Amazon seller reports.
        </p>
      </section>
    </main>
  );
}