import Link from "next/link";

const salesGoalFactors = [
  {
    title: "Monthly income goal",
    description:
      "The amount of profit or revenue you want your Etsy shop to generate during a month.",
  },
  {
    title: "Average order value",
    description:
      "The average amount a buyer spends per order before subtracting Etsy fees, product cost, shipping, packaging, labor, and ads.",
  },
  {
    title: "Profit per order",
    description:
      "The estimated money left from each order after seller costs are included. Profit goals should usually use profit per order, not revenue alone.",
  },
  {
    title: "Required orders",
    description:
      "The number of orders needed to reach a sales, revenue, or profit goal during the review period.",
  },
  {
    title: "Traffic requirement",
    description:
      "The number of visits needed to generate the required orders based on your expected conversion rate.",
  },
  {
    title: "Capacity limits",
    description:
      "The practical limit of how many orders you can make, pack, ship, support, and fulfill without hurting quality or delivery time.",
  },
];

const mistakes = [
  "Setting revenue goals without checking profit per order.",
  "Forgetting Etsy fees, payment processing, product cost, shipping, packaging, labor, ads, and refunds.",
  "Assuming more orders automatically means more profit.",
  "Ignoring production capacity, processing time, and customer service workload.",
  "Using unrealistic conversion rates when estimating required traffic.",
  "Scaling ads or inventory before checking whether the sales goal is operationally possible.",
];

const checklist = [
  "Target monthly revenue or profit goal.",
  "Average sale price or average order value.",
  "Profit per order after fees and seller costs.",
  "Expected conversion rate.",
  "Required monthly orders.",
  "Required visits or traffic volume.",
  "Production, packaging, shipping, and support capacity.",
  "Inventory, materials, and cash flow needed to support the goal.",
];

const relatedTools = [
  {
    title: "Etsy Sales Goal Calculator",
    href: "/etsy/sales-goal-calculator",
  },
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
  },
  {
    title: "Etsy Conversion Rate Calculator",
    href: "/etsy/conversion-rate-calculator",
  },
  {
    title: "Etsy Inventory Restock Calculator",
    href: "/etsy/inventory-restock-calculator",
  },
];

const workflow = [
  {
    title: "Choose a goal",
    description:
      "Start with a monthly revenue or profit target that matches your shop stage and capacity.",
  },
  {
    title: "Estimate profit per order",
    description:
      "Subtract Etsy fees, product cost, shipping, packaging, labor, ads, and refunds from average order value.",
  },
  {
    title: "Calculate required orders",
    description:
      "Divide the goal by average revenue or profit per order to estimate how many orders are needed.",
  },
  {
    title: "Check capacity",
    description:
      "Review whether your inventory, production time, shipping workflow, and customer support can handle the order volume.",
  },
];

export default function EtsySalesGoalPlanningGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Sales Goal Planning Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy sales goal planning helps sellers work backward from a monthly
          income, revenue, or profit target. A realistic sales goal should
          include average order value, profit per order, conversion rate,
          required traffic, inventory, production capacity, and fulfillment time.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy sales goal factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {salesGoalFactors.map((item) => (
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
            Why Etsy sales goal planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A sales goal is more useful when it is based on profit, not just
              revenue. A shop can hit a revenue target and still earn less than
              expected if fees, materials, shipping, packaging, labor, ads, and
              refunds are not included.
            </p>

            <p>
              Sales goals also need to match your real production and
              fulfillment capacity. A handmade shop may not be able to scale
              orders without changing inventory, batching, processing time, or
              support workflow.
            </p>

            <p>
              The safest approach is to work backward from the goal, estimate
              the orders and traffic required, then check whether the shop can
              handle that volume profitably.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy sales goal mistakes
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
          Useful Etsy sales goal calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate sales goals, profit per order, conversion
          requirements, traffic needs, and inventory planning before scaling.
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
          Simple Etsy sales goal workflow
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
            How to make better Etsy sales goals
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
              <strong className="text-gray-950">Protect capacity:</strong>{" "}
              More orders can create production delays, customer service
              pressure, shipping mistakes, and quality problems if capacity is
              ignored.
            </p>

            <p>
              <strong className="text-gray-950">Plan inventory:</strong>{" "}
              Sales goals should match material availability, reorder timing,
              production lead time, storage space, and cash flow.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy sales goals, conversion rates, traffic sources, ad results,
          inventory demand, fees, fulfillment capacity, buyer behavior, and
          marketplace rules can change. This guide is for planning purposes.
          Always review actual shop analytics, order costs, inventory levels,
          and current Etsy settings before making growth decisions.
        </p>
      </section>
    </main>
  );
}