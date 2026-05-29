import Link from "next/link";

const refundCostTypes = [
  {
    title: "Full refunds",
    description:
      "A full refund returns the buyer’s payment and can erase the revenue from an order while some seller costs remain.",
  },
  {
    title: "Partial refunds",
    description:
      "A partial refund reduces order revenue but may still leave the seller responsible for fees, labor, materials, or shipping costs.",
  },
  {
    title: "Replacement orders",
    description:
      "A replacement can require another product, extra packaging, another shipping label, and additional fulfillment time.",
  },
  {
    title: "Return shipping",
    description:
      "Return shipping may be paid by the buyer or seller depending on shop policy, item issue, and customer service decision.",
  },
  {
    title: "Damaged or lost packages",
    description:
      "Damaged, delayed, or lost packages can create refund, replacement, support, and shipping cost pressure.",
  },
  {
    title: "Customer service time",
    description:
      "Messages, dispute resolution, remake decisions, and refund handling take time that should be considered part of operating cost.",
  },
];

const mistakes = [
  "Treating refunded revenue as if it was still profit.",
  "Forgetting product cost, labor, packaging, and shipping already spent on refunded orders.",
  "Sending replacements without calculating the extra item cost and shipping cost.",
  "Ignoring return shipping or reshipment costs when estimating real profit.",
  "Running discounts while also absorbing refund and replacement costs.",
  "Not building a small refund or replacement allowance into pricing for products with higher issue rates.",
];

const checklist = [
  "Original order revenue.",
  "Refund amount or partial refund amount.",
  "Product cost, materials, and labor already used.",
  "Original shipping label and packaging cost.",
  "Return shipping cost, if seller-paid.",
  "Replacement product cost, if applicable.",
  "Replacement shipping and packaging cost.",
  "Estimated refund, remake, or customer service allowance.",
];

const relatedTools = [
  {
    title: "Etsy Refund Impact Calculator",
    href: "/etsy/refund-impact-calculator",
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
    title: "Discount Impact Calculator",
    href: "/etsy/discount-impact-calculator",
  },
];

const workflow = [
  {
    title: "Start with order profit",
    description:
      "Estimate normal order profit after Etsy fees, product cost, shipping, packaging, and labor.",
  },
  {
    title: "Apply the refund",
    description:
      "Subtract the full refund, partial refund, replacement cost, or return shipping cost from the order.",
  },
  {
    title: "Check remaining margin",
    description:
      "Review whether the order still has profit after the refund, remake, or reshipment is included.",
  },
  {
    title: "Update pricing",
    description:
      "Build a realistic refund or replacement allowance into pricing if issues happen regularly.",
  },
];

export default function EtsyRefundsAndReturnsCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Refunds and Returns Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy refunds, returns, replacements, damaged orders, lost packages,
          and customer service issues can reduce profit even when the original
          sale looked profitable. Sellers should understand how refund-related
          costs affect pricing, margin, and long-term shop profitability.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy refund and return costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {refundCostTypes.map((item) => (
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
            Why refund and return costs matter
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A refund does not always undo the seller’s costs. Materials,
              labor, packaging, shipping labels, and customer service time may
              already be spent before the buyer receives money back.
            </p>

            <p>
              Replacements can be even more expensive because the seller may
              need to make or source another product, pack another order, and
              pay for another shipment.
            </p>

            <p>
              The safest approach is to estimate refund and replacement impact
              before pricing products, especially for fragile, custom, seasonal,
              or high-support items.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy refund mistakes
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
          Useful Etsy refund calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate refund impact, profit after costs, pricing
          room, and discount pressure before deciding how much margin you need.
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
          Simple Etsy refund cost workflow
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
            How refunds affect Etsy pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Low-margin products:</strong>{" "}
              Refunds are harder to absorb when a product already has limited
              profit after Etsy fees, shipping, packaging, and labor.
            </p>

            <p>
              <strong className="text-gray-950">Fragile products:</strong>{" "}
              Fragile items may need stronger packaging, shipping insurance, or
              extra margin for damage and replacement risk.
            </p>

            <p>
              <strong className="text-gray-950">Custom orders:</strong> Custom
              or personalized products may require clearer policies because they
              can be harder to resell after a return.
            </p>

            <p>
              <strong className="text-gray-950">Replacement allowance:</strong>{" "}
              Sellers may need to price with a small allowance for refunds,
              remakes, reships, damaged orders, or support-heavy products.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy refund policies, return rules, seller protections, shipping
          carrier claims, fee treatment, buyer behavior, and marketplace rules
          can change. This guide is for planning purposes. Always confirm
          current refund and return settings in your Etsy account and official
          Etsy seller resources.
        </p>
      </section>
    </main>
  );
}