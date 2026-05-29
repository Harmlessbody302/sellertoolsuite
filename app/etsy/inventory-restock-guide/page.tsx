import Link from "next/link";

const inventoryFactors = [
  {
    title: "Sales velocity",
    description:
      "How quickly a product sells during a normal review period. Faster-selling items usually need more frequent restock planning.",
  },
  {
    title: "Current stock",
    description:
      "The number of units currently available or ready to ship. Low stock can create stockout risk if sales continue.",
  },
  {
    title: "Lead time",
    description:
      "The time required to make, source, prepare, package, or receive more inventory before it can be sold.",
  },
  {
    title: "Safety stock",
    description:
      "Extra inventory kept on hand to reduce the risk of running out during demand spikes, delays, or supply issues.",
  },
  {
    title: "Reorder point",
    description:
      "The stock level where you should begin making, sourcing, or ordering more inventory before selling out.",
  },
  {
    title: "Stockout risk",
    description:
      "The risk of running out of inventory, losing sales, delaying orders, or hurting listing momentum.",
  },
];

const mistakes = [
  "Waiting until inventory reaches zero before restocking.",
  "Ignoring production time, supplier delays, curing time, or prep time.",
  "Restocking based on guesses instead of recent sales pace.",
  "Buying too much inventory for listings that have weak conversion or low profit.",
  "Forgetting seasonal demand, holidays, ad campaigns, or sales events.",
  "Ignoring storage space, cash flow, material shelf life, or slow-moving inventory risk.",
];

const checklist = [
  "Current available inventory.",
  "Average sales per day, week, or month.",
  "Production, sourcing, or supplier lead time.",
  "Safety stock needed for demand spikes or delays.",
  "Reorder point before inventory runs out.",
  "Ideal reorder quantity.",
  "Storage space and material shelf life.",
  "Profit margin, conversion rate, and listing performance before restocking heavily.",
];

const relatedTools = [
  {
    title: "Etsy Inventory Restock Calculator",
    href: "/etsy/inventory-restock-calculator",
  },
  {
    title: "Etsy Sales Goal Calculator",
    href: "/etsy/sales-goal-calculator",
  },
  {
    title: "Etsy Listing ROI Calculator",
    href: "/etsy/listing-roi-calculator",
  },
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
  },
];

const workflow = [
  {
    title: "Measure sales pace",
    description:
      "Review how many units sell during a normal period before deciding when to reorder.",
  },
  {
    title: "Estimate lead time",
    description:
      "Include sourcing, production, prep, drying, curing, packaging, and supplier delays.",
  },
  {
    title: "Set reorder point",
    description:
      "Choose the stock level where you should begin restocking before inventory runs out.",
  },
  {
    title: "Review regularly",
    description:
      "Adjust reorder timing when sales pace, seasonality, ad traffic, or supplier timing changes.",
  },
];

export default function EtsyInventoryRestockGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Inventory Restock Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy inventory restock planning helps sellers decide when to make,
          source, or order more products before running out. Good restock
          planning uses sales pace, current stock, lead time, safety stock,
          storage limits, and listing profitability instead of guessing.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy inventory factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {inventoryFactors.map((item) => (
            <div key={item.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why Etsy restock planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Running out of stock can interrupt sales momentum, delay buyers,
              and prevent a successful listing from continuing to generate
              revenue. Restocking too late can be especially risky for products
              with long production or supplier lead times.
            </p>

            <p>
              Overstocking can also create problems. Too much inventory can tie
              up cash, take storage space, expire, become outdated, or sit in
              listings that are not converting well.
            </p>

            <p>
              The safest approach is to restock based on recent sales pace,
              realistic lead time, safety stock, and whether the listing is
              profitable enough to justify more inventory.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy inventory mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {mistakes.map((mistake) => (
              <li key={mistake} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Etsy inventory calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate restock timing, sales goals, listing
          return, and profit before buying materials or making more inventory.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Simple Etsy inventory restock workflow
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
            What Etsy sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {checklist.map((item) => (
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
            How to make better Etsy restock decisions
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Restock winners first:</strong>{" "}
              Products with healthy profit, steady sales, and manageable labor
              usually deserve restock priority.
            </p>

            <p>
              <strong className="text-gray-950">Avoid overstocking weak listings:</strong>{" "}
              Listings with poor conversion, high refund risk, or thin margin
              may need improvement before more inventory is made or purchased.
            </p>

            <p>
              <strong className="text-gray-950">Account for lead time:</strong>{" "}
              Handmade, customized, seasonal, or supplier-dependent products may
              need earlier restock planning than simple ready-to-ship items.
            </p>

            <p>
              <strong className="text-gray-950">Protect cash flow:</strong>{" "}
              Inventory uses cash before sales happen, so restock quantity
              should match realistic demand instead of optimistic guesses.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy inventory demand, sales pace, supplier timing, production time,
          storage limits, seasonal demand, fees, and marketplace rules can
          change. This guide is for planning purposes. Always review actual shop
          analytics, inventory levels, and current supply costs before making
          restock decisions.
        </p>
      </section>
    </main>
  );
}