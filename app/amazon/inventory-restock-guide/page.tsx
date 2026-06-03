import Link from "next/link";

const inventoryFactors = [
  {
    title: "Sales velocity",
    description:
      "Sales velocity shows how quickly an Amazon product sells during a review period. Faster-moving products usually need more frequent restock planning.",
  },
  {
    title: "Current stock",
    description:
      "Current stock includes units available, inbound, reserved, listed, or ready to ship. Low stock can create missed sales if demand continues.",
  },
  {
    title: "Lead time",
    description:
      "Lead time is the time required to source, buy, receive, prep, label, ship, check in, list, or restock inventory.",
  },
  {
    title: "Safety stock",
    description:
      "Safety stock is extra inventory kept available to reduce the risk of running out during demand spikes, supplier delays, FBA receiving delays, or sourcing problems.",
  },
  {
    title: "Reorder point",
    description:
      "The reorder point is the stock level where the seller should begin sourcing, preparing, or ordering more inventory before the product runs out.",
  },
  {
    title: "Restock profitability",
    description:
      "A restock is only useful if the product still produces enough profit after product cost, Amazon fees, fulfillment, PPC, refunds, storage, and cash flow risk.",
  },
];

const calculators = [
  ["/amazon/inventory-restock-calculator", "Amazon Inventory Restock Calculator"],
  ["/amazon/sales-goal-calculator", "Amazon Sales Goal Calculator"],
  ["/amazon/listing-roi-calculator", "Amazon Listing ROI Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
];

const workflow = [
  {
    title: "Measure sales pace",
    description:
      "Review how many units sold during a normal review period before deciding whether to reorder.",
  },
  {
    title: "Estimate lead time",
    description:
      "Include sourcing, supplier timing, inbound shipping, prep, labeling, FBA receiving, testing, or listing prep time.",
  },
  {
    title: "Set reorder point",
    description:
      "Choose the stock level where you should begin restocking before inventory runs out.",
  },
  {
    title: "Review profit",
    description:
      "Confirm the listing still has enough profit, conversion, demand, and cash flow to justify more inventory.",
  },
];

export default function AmazonInventoryRestockGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Inventory Restock Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon inventory restock planning helps sellers decide when to buy,
          source, prep, ship, list, or reorder more products before a profitable
          listing runs out. Good restock decisions use sales velocity, current
          stock, lead time, safety stock, storage cost, cash flow, conversion,
          and listing profit instead of guessing.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon inventory factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {inventoryFactors.map((factor) => (
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
            Why Amazon restock planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Running out of stock can interrupt sales momentum, reduce listing
              activity, delay buyers, weaken advertising efficiency, or cause a
              profitable product to lose traction.
            </p>

            <p>
              Overstocking can also create problems. Too much inventory can tie
              up cash, increase storage cost, create stale inventory risk, and
              force discounts if the product slows down or stops converting.
            </p>

            <p>
              The safest approach is to restock based on recent sales pace,
              realistic lead time, safety stock, inventory cost, storage
              pressure, and whether the listing is profitable enough to justify
              more inventory.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon inventory mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Waiting until inventory reaches zero before sourcing or reordering.",
              "Restocking based on guesses instead of recent sales pace.",
              "Ignoring supplier lead time, inbound shipping, prep time, or FBA receiving delays.",
              "Buying too much inventory for products with weak conversion or low profit.",
              "Forgetting storage cost, cash flow, stale inventory risk, refund risk, or seasonal demand.",
              "Restocking slow-moving products before reviewing sales velocity and listing performance.",
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
          Useful Amazon inventory calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate restock timing, sales goals, listing ROI,
          product cost, profit, and pricing before buying more inventory.
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
          Simple Amazon inventory restock workflow
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
              "Current available stock, reserved stock, inbound units, and ready-to-list inventory.",
              "Units sold during a clear review period.",
              "Average sales per day, week, or month.",
              "Supplier timing, inbound shipping, prep, labeling, listing, and FBA receiving time.",
              "Safety stock needed for demand spikes, supplier delays, seasonal changes, or receiving issues.",
              "Unit cost, expected profit per unit, storage cost, stale inventory risk, conversion rate, and cash flow.",
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
            How to make better Amazon restock decisions
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Restock winners first:</strong>{" "}
              Products with healthy profit, steady sales, strong conversion, and
              manageable fulfillment work usually deserve restock priority.
            </p>

            <p>
              <strong className="text-gray-950">Avoid overstocking weak listings:</strong>{" "}
              Listings with poor conversion, high refund risk, low margin, or
              frequent support issues should be reviewed before buying more.
            </p>

            <p>
              <strong className="text-gray-950">Account for lead time:</strong>{" "}
              Products that require sourcing, prep, shipping, receiving, testing,
              or listing work may need earlier reorder points than simple
              ready-to-ship items.
            </p>

            <p>
              <strong className="text-gray-950">Protect cash flow:</strong>{" "}
              Inventory uses cash before sales happen, so restock quantity
              should match realistic demand instead of optimistic guesses.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon restock signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Restock soon",
              "Current stock is near or below the estimated reorder point, so restock may be justified if demand and profit are reliable.",
            ],
            [
              "Healthy coverage",
              "Current inventory appears workable under the entered sales pace and lead time assumptions.",
            ],
            [
              "Watch stock",
              "Inventory is not critically low, but stock may need attention soon if sales velocity continues.",
            ],
            [
              "Slow moving",
              "The item has little or no sales velocity in the review period, so restocking may be risky.",
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
          Amazon inventory demand, sales pace, supplier timing, FBA receiving
          delays, storage limits, seasonal demand, fees, refunds, taxes, and
          marketplace rules can change. This guide is for planning purposes.
          Always review actual sales, inventory levels, order results, and
          current supply costs before making restock decisions.
        </p>
      </section>
    </main>
  );
}