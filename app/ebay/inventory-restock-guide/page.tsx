import Link from "next/link";

export default function EbayInventoryRestockGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Inventory Restock Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay inventory restock planning helps sellers decide when to buy,
          source, repair, list, or reorder more products before a profitable
          listing runs out. Good restock decisions use sales pace, current stock,
          lead time, safety stock, storage limits, cash flow, and listing profit
          instead of guessing.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay inventory factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Sales pace",
              "How quickly a product sells during a normal review period. Faster-selling items usually need more frequent restock planning.",
            ],
            [
              "Current stock",
              "The number of units currently available, listed, or ready to ship. Low stock can create missed sales if demand continues.",
            ],
            [
              "Lead time",
              "The time required to source, buy, receive, repair, clean, test, photograph, list, pack, or prepare more inventory.",
            ],
            [
              "Safety stock",
              "Extra inventory kept available to reduce the risk of running out during demand spikes, supplier delays, or sourcing problems.",
            ],
            [
              "Reorder point",
              "The stock level where the seller should begin sourcing, preparing, or ordering more inventory before the listing runs out.",
            ],
            [
              "Restock profitability",
              "A restock is only useful if the product still produces enough profit after item cost, fees, shipping, labor, refunds, and storage risk.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why eBay restock planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Running out of stock can interrupt sales momentum, delay buyers,
              reduce listing activity, or cause a profitable listing to lose
              traction. Restocking too late can be especially risky when sourcing
              or prep time is unpredictable.
            </p>

            <p>
              Overstocking can also create problems. Too much inventory can tie
              up cash, take storage space, become stale, require extra handling,
              or sit in listings that are no longer converting well.
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
            Common eBay inventory mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Waiting until inventory reaches zero before sourcing or reordering.",
              "Restocking based on guesses instead of recent sales pace.",
              "Ignoring supplier lead time, repair time, cleaning time, testing time, or listing prep time.",
              "Buying too much inventory for listings with weak conversion or low profit.",
              "Forgetting storage space, cash flow, stale inventory risk, return risk, or seasonal demand.",
              "Restocking slow-moving products before reviewing sold comps and buyer demand.",
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
          Useful eBay inventory calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate restock timing, sales goals, listing ROI,
          product cost, profit, and pricing before buying more inventory.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/inventory-restock-calculator", "eBay Inventory Restock Calculator"],
            ["/ebay/sales-goal-calculator", "eBay Sales Goal Calculator"],
            ["/ebay/listing-roi-calculator", "eBay Listing ROI Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
          ].map(([href, label]) => (
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
          Simple eBay inventory restock workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Measure sales pace",
              "Review how many units sold during a normal review period before deciding whether to reorder.",
            ],
            [
              "Estimate lead time",
              "Include sourcing, shipping, repair, cleaning, testing, photographing, listing, and prep delays.",
            ],
            [
              "Set reorder point",
              "Choose the stock level where you should begin restocking before inventory runs out.",
            ],
            [
              "Review profit",
              "Confirm the listing still has enough profit, conversion, demand, and cash flow to justify more inventory.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Current available stock and ready-to-list inventory.",
              "Units sold during a clear review period.",
              "Average sales per day, week, or month.",
              "Supplier, sourcing, repair, cleaning, testing, and listing lead time.",
              "Safety stock needed for demand spikes, delays, seasonal changes, or sourcing issues.",
              "Unit cost, expected profit per unit, storage cost, stale inventory risk, and cash flow.",
              "Conversion rate, traffic, sold comps, return rate, and listing performance before restocking heavily.",
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
            How to make better eBay restock decisions
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Restock winners first:</strong>{" "}
              Products with healthy profit, steady sales, good conversion, and
              manageable fulfillment work usually deserve restock priority.
            </p>

            <p>
              <strong className="text-gray-950">Avoid overstocking weak listings:</strong>{" "}
              Listings with poor conversion, high refund risk, low margin, or
              frequent support issues should be reviewed before buying more.
            </p>

            <p>
              <strong className="text-gray-950">Account for lead time:</strong>{" "}
              Products that require sourcing, repair, testing, cleaning, photos,
              or listing prep may need earlier reorder points than simple
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
          eBay restock signals to review
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
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        eBay inventory demand, sales pace, supplier timing, sourcing conditions,
        repair time, listing performance, storage limits, seasonal demand, fees,
        refunds, taxes, and marketplace rules can change. This guide is for
        planning purposes. Always review actual sales, inventory levels, order
        results, and current supply costs before making restock decisions.
      </div>
    </main>
  );
}