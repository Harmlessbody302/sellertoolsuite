import Link from "next/link";

const shippingCostTypes = [
  {
    title: "Shipping label cost",
    description:
      "The postage or carrier label cost needed to send the order to the buyer.",
  },
  {
    title: "Packaging materials",
    description:
      "Boxes, mailers, tape, labels, inserts, padding, thank-you cards, and protective supplies.",
  },
  {
    title: "Shipping subsidy",
    description:
      "The part of shipping you pay yourself when the buyer shipping charge does not cover the actual shipping cost.",
  },
  {
    title: "Free shipping cost",
    description:
      "The shipping expense you absorb when offering free shipping or building shipping into the product price.",
  },
  {
    title: "Returns and replacements",
    description:
      "Extra postage, replacement shipments, damaged items, and refund-related shipping losses.",
  },
  {
    title: "International shipping risk",
    description:
      "Higher postage, customs complexity, longer delivery windows, and possible replacement or refund pressure.",
  },
];

const mistakes = [
  "Offering free shipping without raising the item price enough.",
  "Forgetting boxes, mailers, labels, tape, padding, and packing supplies.",
  "Using the buyer shipping charge as profit instead of comparing it to actual postage.",
  "Ignoring replacement shipments, returns, damaged packages, or lost mail risk.",
  "Charging the same shipping amount for products with very different weights or package sizes.",
  "Pricing products before checking whether shipping cost leaves enough profit margin.",
];

const checklist = [
  "Actual postage or shipping label cost.",
  "Box, mailer, envelope, tape, label, and padding cost.",
  "Shipping charged to the buyer.",
  "Shipping cost absorbed by the seller.",
  "Free shipping amount built into the product price.",
  "Return, replacement, refund, or damaged shipment allowance.",
  "International shipping or customs-related risk.",
  "Packaging labor, fulfillment time, and handling effort.",
];

const relatedTools = [
  {
    title: "Etsy Shipping Profit Calculator",
    href: "/etsy/shipping-profit-calculator",
  },
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
  },
  {
    title: "Etsy Pricing Calculator",
    href: "/etsy/pricing-calculator",
  },
  {
    title: "Etsy Fee Calculator",
    href: "/etsy/fee-calculator",
  },
];

const workflow = [
  {
    title: "Measure the package",
    description:
      "Estimate packed weight, dimensions, packaging type, and shipping method before setting prices.",
  },
  {
    title: "Compare buyer charge",
    description:
      "Check whether the shipping amount charged to the buyer covers postage and packaging.",
  },
  {
    title: "Protect margin",
    description:
      "Build shipping subsidies, free shipping, and packaging into your price before launching listings.",
  },
  {
    title: "Review results",
    description:
      "After orders ship, compare estimated shipping cost against actual labels and adjust pricing.",
  },
];

export default function EtsyShippingCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Shipping Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy shipping costs can include postage, packaging, shipping
          supplies, seller-paid shipping discounts, free shipping, returns,
          replacements, and fulfillment time. Estimating these costs before
          listing helps protect profit margin and avoid underpricing products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy shipping costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {shippingCostTypes.map((item) => (
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
            Why Etsy shipping cost matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Shipping can make a profitable Etsy product look unprofitable if
              postage, packaging, and seller-paid subsidies are not included.
              A product with strong material margin can still lose money if the
              shipping label or packaging cost is underestimated.
            </p>

            <p>
              Etsy sellers should compare the shipping amount charged to the
              buyer against the actual shipping label, packaging supplies, and
              fulfillment effort required to complete the order.
            </p>

            <p>
              The safest approach is to estimate shipping before publishing a
              listing, then review actual shipping costs after orders begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy shipping mistakes
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
          Useful Etsy shipping calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate shipping impact, profit, pricing, and Etsy
          fee pressure before changing listings or offering free shipping.
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
          Simple Etsy shipping workflow
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
            How shipping affects Etsy pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Buyer-paid shipping:</strong>{" "}
              The buyer covers some or all of the shipping charge, but sellers
              should still compare that amount against the actual postage and
              packaging cost.
            </p>

            <p>
              <strong className="text-gray-950">Free shipping:</strong> Free
              shipping can make listings more appealing, but the seller usually
              needs to build the shipping cost into the product price.
            </p>

            <p>
              <strong className="text-gray-950">Shipping subsidy:</strong> A
              shipping subsidy happens when the seller pays part of the shipping
              cost. This can reduce profit unless the item price has enough
              margin.
            </p>

            <p>
              <strong className="text-gray-950">Packaging cost:</strong>{" "}
              Packaging is easy to overlook, but boxes, mailers, labels, tape,
              padding, and inserts can become meaningful over many orders.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy shipping costs, postage, packaging, carrier rates, delivery
          times, returns, and seller rules can change. This guide is for
          planning purposes. Always confirm current shipping settings, label
          prices, and fulfillment costs in your Etsy account and carrier tools.
        </p>
      </section>
    </main>
  );
}