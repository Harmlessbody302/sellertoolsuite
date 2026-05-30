import Link from "next/link";

export default function EbaySalesGoalPlanningGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Sales Goal Planning Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay sales goal planning helps sellers work backward from a monthly
          revenue, profit, or order target. A realistic eBay goal should include
          average order value, profit per order, conversion rate, required
          traffic, active listings, inventory, sourcing capacity, shipping time,
          and fulfillment workload.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay sales goal factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Monthly profit goal",
              "The amount of profit the seller wants eBay listings to generate during a month after seller costs are included.",
            ],
            [
              "Average order value",
              "The average amount a buyer spends per order before or after shipping, depending on how the seller measures sales.",
            ],
            [
              "Profit per order",
              "The estimated money left from each order after item cost, shipping, packaging, eBay fees, promoted listing fees, returns, and labor.",
            ],
            [
              "Required orders",
              "The number of orders needed to reach a monthly revenue or profit goal during the review period.",
            ],
            [
              "Traffic requirement",
              "The number of listing views or impressions needed to generate the required orders based on the expected conversion rate.",
            ],
            [
              "Capacity limits",
              "The practical limit of how many orders a seller can source, list, pack, ship, support, and restock without hurting quality or delivery time.",
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
            Why eBay sales goal planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A sales goal is more useful when it is based on profit, not just
              revenue. A seller can hit a revenue target and still earn less
              than expected if fees, shipping, product cost, packaging, refunds,
              promoted listing costs, and labor are not included.
            </p>

            <p>
              Sales goals also need to match real listing performance and
              fulfillment capacity. More orders can create sourcing pressure,
              packing delays, customer service work, return risk, and inventory
              shortages if the operation is not ready.
            </p>

            <p>
              The safest approach is to work backward from the goal, estimate
              the orders and traffic required, then check whether the shop has
              enough inventory, listing quality, conversion, and fulfillment
              capacity to support that volume profitably.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay sales goal mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Setting revenue goals without checking profit per order.",
              "Ignoring eBay fees, promoted listing fees, shipping, returns, packaging, product cost, and labor.",
              "Assuming more orders automatically means more profit.",
              "Using unrealistic conversion rates when estimating required traffic.",
              "Scaling ad spend before checking whether required order volume is realistic.",
              "Ignoring sourcing capacity, packing time, customer service time, and inventory limits.",
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
          Useful eBay sales goal calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate sales goals, profit per order, conversion
          requirements, listing ROI, and inventory planning before scaling.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/sales-goal-calculator", "eBay Sales Goal Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/conversion-rate-calculator", "eBay Conversion Rate Calculator"],
            ["/ebay/inventory-restock-calculator", "eBay Inventory Restock Calculator"],
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
          Simple eBay sales goal workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Choose a goal",
              "Start with a monthly revenue, order, or profit goal that matches the store stage and seller capacity.",
            ],
            [
              "Estimate profit per order",
              "Subtract item cost, shipping, packaging, eBay fees, promoted listing fees, refunds, and labor from average order value.",
            ],
            [
              "Calculate required orders",
              "Divide the goal by average revenue or profit per order to estimate how many orders are needed.",
            ],
            [
              "Check capacity",
              "Review whether inventory, sourcing, listing, packing, shipping, returns, and customer support can handle the order volume.",
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
              "Target monthly revenue, order, or profit goal.",
              "Average sale price and average order value.",
              "Profit per order after item cost, shipping, packaging, fees, ads, refunds, and labor.",
              "Expected conversion rate and listing traffic requirement.",
              "Required monthly orders and orders per day.",
              "Active listing count, listing quality, traffic sources, and promoted listing impact.",
              "Inventory, sourcing, prep, packing, shipping, return, and customer support capacity.",
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
            How to make better eBay sales goals
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Use profit goals:</strong>{" "}
              Revenue goals are easier to hit on paper, but profit goals better
              reflect whether the shop is actually earning money.
            </p>

            <p>
              <strong className="text-gray-950">Check conversion:</strong>{" "}
              Required traffic depends on conversion rate. A weak conversion
              rate means the shop may need much more traffic to reach the same
              sales goal.
            </p>

            <p>
              <strong className="text-gray-950">Protect capacity:</strong> More
              orders can create sourcing pressure, shipping mistakes, support
              workload, refund risk, and quality problems if capacity is ignored.
            </p>

            <p>
              <strong className="text-gray-950">Plan inventory:</strong> Sales
              goals should match material availability, reorder timing, sourcing
              lead time, storage space, and cash flow.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay sales goal signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Goal is realistic",
              "The required orders, traffic, inventory, and fulfillment workload appear manageable.",
            ],
            [
              "Traffic gap",
              "The seller may need more listing views, better search visibility, stronger conversion, or promotion.",
            ],
            [
              "Profit gap",
              "The seller may need higher profit per order, lower costs, better pricing, or fewer weak listings.",
            ],
            [
              "Capacity gap",
              "The seller may need better sourcing, restock planning, packing workflow, or customer support systems before scaling.",
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
        eBay sales goals, conversion rates, traffic sources, listing
        performance, fees, shipping costs, promoted listing costs, refund rates,
        inventory demand, fulfillment capacity, taxes, buyer behavior, and
        marketplace rules can change. This guide is for planning purposes.
        Always review actual order results, inventory levels, and current eBay
        settings before making growth decisions.
      </div>
    </main>
  );
}