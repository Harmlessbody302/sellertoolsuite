import Link from "next/link";

const strategyTypes = [
  {
    title: "Build shipping into the item price",
    description:
      "Raise the product price enough to cover expected postage, packaging, and fulfillment costs.",
  },
  {
    title: "Offer free shipping minimums",
    description:
      "Use order-value thresholds to encourage larger carts while protecting margin on small orders.",
  },
  {
    title: "Use buyer-paid shipping",
    description:
      "Charge buyers separately for shipping when free shipping would make the product unprofitable.",
  },
  {
    title: "Test selective free shipping",
    description:
      "Apply free shipping only to products with enough margin, low postage, or strong conversion potential.",
  },
  {
    title: "Bundle products carefully",
    description:
      "Use bundles to spread shipping cost across multiple items and improve average order value.",
  },
  {
    title: "Track real shipping results",
    description:
      "Compare estimated shipping cost against actual labels, packaging, and refund or replacement costs.",
  },
];

const mistakes = [
  "Offering free shipping without increasing the item price enough.",
  "Applying free shipping to every product even when heavy or bulky items have weak margin.",
  "Ignoring packaging, labels, tape, mailers, inserts, and fulfillment supplies.",
  "Using free shipping before checking profit margin after Etsy fees and product cost.",
  "Running discounts on top of free shipping without recalculating profit.",
  "Assuming higher conversion automatically makes up for shipping subsidies.",
];

const checklist = [
  "Actual postage or shipping label cost.",
  "Packaging and shipping supply cost.",
  "Product cost, labor, and Etsy fees.",
  "Current product price and target margin.",
  "Expected conversion lift from free shipping.",
  "Average order value and bundle potential.",
  "Refund, replacement, or damaged shipment allowance.",
  "Whether free shipping should apply to all products or only selected listings.",
];

const relatedTools = [
  {
    title: "Etsy Shipping Profit Calculator",
    href: "/etsy/shipping-profit-calculator",
  },
  {
    title: "Etsy Pricing Calculator",
    href: "/etsy/pricing-calculator",
  },
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
  },
  {
    title: "Discount Impact Calculator",
    href: "/etsy/discount-impact-calculator",
  },
];

const workflow = [
  {
    title: "Estimate shipping cost",
    description:
      "Calculate postage, packaging, supplies, and fulfillment cost before changing your listing price.",
  },
  {
    title: "Check current profit",
    description:
      "Use your product cost, Etsy fees, labor, and current price to understand your existing margin.",
  },
  {
    title: "Raise price if needed",
    description:
      "Build the shipping cost into the product price if free shipping would otherwise reduce profit.",
  },
  {
    title: "Test and review",
    description:
      "Watch conversion, order value, refunds, and real shipping labels to confirm the strategy works.",
  },
];

export default function EtsyFreeShippingStrategyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Free Shipping Strategy
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy free shipping can improve buyer appeal, but it can also reduce
          profit if postage, packaging, Etsy fees, labor, and discounts are not
          built into the price. Use a free shipping strategy that protects
          margin instead of simply absorbing fulfillment costs.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy free shipping options sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {strategyTypes.map((item) => (
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
            Why free shipping strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Free shipping is not actually free for the seller. The cost moves
              from a buyer-paid shipping charge into your product price, margin,
              or seller-paid expense.
            </p>

            <p>
              If the product price is not adjusted, free shipping can quietly
              turn a profitable listing into a weak-margin or losing listing.
              This is especially important for heavier products, low-priced
              products, and listings with frequent discounts.
            </p>

            <p>
              A safer approach is to decide whether shipping should be built
              into the item price, charged separately, limited to larger orders,
              or used only on products with enough margin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy free shipping mistakes
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
          Useful Etsy free shipping calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to test whether free shipping, price increases,
          discounts, and shipping subsidies still leave enough profit.
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
          Simple Etsy free shipping workflow
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
            When free shipping may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">High-margin products:</strong>{" "}
              Free shipping is easier to support when the product already has
              enough margin after fees, labor, and materials.
            </p>

            <p>
              <strong className="text-gray-950">Lightweight products:</strong>{" "}
              Small, lightweight items are often easier to price with shipping
              included because postage is more predictable.
            </p>

            <p>
              <strong className="text-gray-950">Bundles and larger carts:</strong>{" "}
              Free shipping can work better when it encourages buyers to order
              multiple items and spread fulfillment cost across more revenue.
            </p>

            <p>
              <strong className="text-gray-950">Competitive categories:</strong>{" "}
              Free shipping may help in categories where buyers strongly compare
              total delivered price, but margin still needs to be protected.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy shipping costs, postage, carrier rates, packaging, buyer
          behavior, conversion rates, refunds, and seller rules can change. This
          guide is for planning purposes. Always confirm current shipping
          settings, label prices, and fulfillment costs in your Etsy account and
          carrier tools.
        </p>
      </section>
    </main>
  );
}