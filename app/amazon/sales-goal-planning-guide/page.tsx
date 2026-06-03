import Link from "next/link";

const goalFactors = [
  {
    title: "Monthly profit goal",
    description:
      "The amount of profit the seller wants Amazon listings to generate during a month after all seller costs are included.",
  },
  {
    title: "Average order value",
    description:
      "The average amount a buyer spends per order before or after shipping, depending on how the seller measures sales.",
  },
  {
    title: "Profit per order",
    description:
      "The estimated money left from each order after product cost, referral fees, fulfillment, storage, PPC, refunds, and labor.",
  },
  {
    title: "Required orders",
    description:
      "The number of orders needed to reach a monthly revenue or profit goal during the review period.",
  },
  {
    title: "Traffic requirement",
    description:
      "The number of Amazon sessions or listing visits needed to generate the required orders based on the expected conversion rate.",
  },
  {
    title: "Capacity limits",
    description:
      "The practical limit of how many orders a seller can source, prep, pack, ship, support, restock, or finance without hurting quality.",
  },
];

const calculators = [
  ["/amazon/sales-goal-calculator", "Amazon Sales Goal Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/conversion-rate-calculator", "Amazon Conversion Rate Calculator"],
  ["/amazon/inventory-restock-calculator", "Amazon Inventory Restock Calculator"],
];

const workflow = [
  {
    title: "Choose a goal",
    description:
      "Start with a monthly revenue, order, or profit goal that matches the store stage and seller capacity.",
  },
  {
    title: "Estimate profit per order",
    description:
      "Subtract product cost, referral fees, fulfillment, storage, PPC, refunds, and labor from average order value.",
  },
  {
    title: "Calculate required orders",
    description:
      "Divide the goal by average revenue or profit per order to estimate how many orders are needed.",
  },
  {
    title: "Check capacity",
    description:
      "Review inventory, sourcing, prep, shipping, customer support, restocking, and cash flow before scaling.",
  },
];

export default function AmazonSalesGoalPlanningGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Sales Goal Planning Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon sales goal planning helps sellers work backward from a monthly
          revenue, profit, or order target. A realistic Amazon goal should
          include average order value, profit per order, conversion rate,
          required traffic, active listings, inventory, sourcing capacity,
          fulfillment workload, PPC pressure, refunds, and cash flow.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon sales goal factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {goalFactors.map((factor) => (
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
            Why Amazon sales goal planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A sales goal is more useful when it is based on profit, not just
              revenue. A seller can hit a revenue target and still earn less than
              expected if referral fees, fulfillment costs, PPC, storage,
              refunds, product cost, packaging, and labor are not included.
            </p>

            <p>
              Amazon goals also need to match real listing performance and
              fulfillment capacity. More orders can create sourcing pressure,
              restock delays, customer service work, return risk, and inventory
              shortages if the operation is not ready.
            </p>

            <p>
              The safest approach is to work backward from the goal, estimate
              the orders and sessions required, then check whether the account
              has enough inventory, listing quality, conversion, and fulfillment
              capacity to support that volume profitably.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon sales goal mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Setting revenue goals without checking profit per order.",
              "Ignoring referral fees, fulfillment costs, PPC, storage, refunds, product cost, and labor.",
              "Assuming more orders automatically means more profit.",
              "Using unrealistic conversion rates when estimating required traffic.",
              "Scaling ad spend before checking whether required order volume is realistic.",
              "Ignoring inventory, sourcing capacity, prep time, customer support workload, and cash flow.",
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
          Useful Amazon sales goal calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate sales goals, profit per order, conversion
          requirements, listing ROI, inventory needs, and restock planning before
          scaling.
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
          Simple Amazon sales goal workflow
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
              "Target monthly revenue, order, or profit goal.",
              "Average sale price and average order value.",
              "Profit per order after product cost, referral fees, fulfillment, PPC, storage, refunds, and labor.",
              "Expected conversion rate and Amazon sessions required.",
              "Required monthly orders and orders per day.",
              "Inventory, sourcing, prep, shipping, restock timing, customer support, and cash flow capacity.",
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
            How to make better Amazon sales goals
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Use profit goals:</strong>{" "}
              Revenue goals are easier to hit on paper, but profit goals better
              reflect whether the shop is actually growing money.
            </p>

            <p>
              <strong className="text-gray-950">Check conversion:</strong>{" "}
              Required traffic depends on conversion rate. A weak conversion
              rate means the listing may need much more traffic to reach the
              same sales goal.
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
          Amazon sales goal signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Goal is realistic",
              "The required orders, traffic, inventory, and fulfillment workload appear manageable.",
            ],
            [
              "Traffic gap",
              "The seller may need more sessions, better search visibility, stronger conversion, or PPC support.",
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
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Amazon sales goals, conversion rates, sessions, listing performance,
          fees, fulfillment costs, PPC results, refund rates, inventory demand,
          fulfillment capacity, taxes, buyer behavior, and marketplace rules can
          change. This guide is for planning purposes. Always review actual
          order results, inventory levels, and current Amazon seller settings
          before making growth decisions.
        </p>
      </section>
    </main>
  );
}