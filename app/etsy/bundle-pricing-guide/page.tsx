import Link from "next/link";

const bundlePricingFactors = [
  {
    title: "Bundle price",
    description:
      "The combined price a buyer pays for multiple items sold together as one offer or order.",
  },
  {
    title: "Individual item prices",
    description:
      "The normal standalone prices of each item before applying any bundle discount.",
  },
  {
    title: "Bundle discount",
    description:
      "The amount removed from the combined item price to encourage buyers to purchase more than one product.",
  },
  {
    title: "Shared shipping cost",
    description:
      "The shipping cost that may be spread across multiple items in the bundle instead of one product carrying the full cost alone.",
  },
  {
    title: "Packaging and fulfillment",
    description:
      "The boxes, mailers, labels, inserts, labor, and packing time needed to ship the bundled order.",
  },
  {
    title: "Profit per bundle",
    description:
      "The money left after Etsy fees, product costs, shipping, packaging, labor, discounts, and other seller costs are included.",
  },
];

const mistakes = [
  "Offering bundle discounts without checking whether profit margin still works.",
  "Adding items together without including the product cost of every item.",
  "Assuming bundle sales are profitable just because average order value is higher.",
  "Forgetting that larger bundles may increase packaging, weight, and shipping cost.",
  "Stacking bundle discounts with coupons, free shipping, or Offsite Ads fees without recalculating profit.",
  "Creating bundles from weak-margin products that do not have enough room for a discount.",
];

const checklist = [
  "Normal price of each item in the bundle.",
  "Product cost, materials, and labor for every bundled item.",
  "Bundle discount amount or percentage.",
  "Etsy fees and payment processing fees.",
  "Shipping label cost and packaging supplies.",
  "Free shipping or seller-paid shipping subsidy.",
  "Possible Offsite Ads fee or promotion cost.",
  "Target profit, target margin, and minimum acceptable bundle price.",
];

const relatedTools = [
  {
    title: "Etsy Bundle Pricing Calculator",
    href: "/etsy/bundle-pricing-calculator",
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
    title: "Add item prices",
    description:
      "Start with the normal standalone price of each item included in the bundle.",
  },
  {
    title: "Subtract all costs",
    description:
      "Include product costs, Etsy fees, shipping, packaging, labor, ads, discounts, and refunds.",
  },
  {
    title: "Test the discount",
    description:
      "Apply the bundle discount and check whether the order still reaches your target profit and margin.",
  },
  {
    title: "Compare scenarios",
    description:
      "Review whether a smaller discount, larger bundle, or different product mix protects profit better.",
  },
];

export default function EtsyBundlePricingGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Bundle Pricing Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy bundle pricing helps sellers combine multiple products into one
          offer while protecting profit. A good bundle price should account for
          individual item prices, product costs, Etsy fees, shipping, packaging,
          labor, discounts, and target margin.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy bundle pricing factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {bundlePricingFactors.map((item) => (
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
            Why Etsy bundle pricing matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Bundles can increase average order value and encourage buyers to
              purchase more than one item, but a higher order total does not
              automatically mean higher profit.
            </p>

            <p>
              Every item in a bundle still has product cost, materials, labor,
              and fulfillment requirements. The order may also need different
              packaging or a more expensive shipping label because of weight or
              size.
            </p>

            <p>
              The safest approach is to compare the full-price bundle, discounted
              bundle, and minimum acceptable bundle price before creating a
              listing, coupon, or bundle offer.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy bundle pricing mistakes
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
          Useful Etsy bundle pricing calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate bundle price, profit, discount impact, and
          margin before creating a bundle listing or sale.
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
          Simple Etsy bundle pricing workflow
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
            When Etsy bundles may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Complementary products:</strong>{" "}
              Bundles work well when the items naturally belong together and
              make the buyer’s purchase decision easier.
            </p>

            <p>
              <strong className="text-gray-950">Shared shipping efficiency:</strong>{" "}
              A bundle can be stronger when multiple items ship together without
              greatly increasing postage, packaging, or fulfillment work.
            </p>

            <p>
              <strong className="text-gray-950">Higher average order value:</strong>{" "}
              Bundles can help increase order value if the discount encourages
              buyers to purchase more without erasing margin.
            </p>

            <p>
              <strong className="text-gray-950">Slow-moving inventory:</strong>{" "}
              Bundles can help move slower products when paired with stronger
              sellers, but the combined price should still protect profit.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy bundle pricing, discounts, fees, shipping costs, packaging costs,
          buyer behavior, conversion rates, inventory demand, and marketplace
          rules can change. This guide is for planning purposes. Always review
          actual product costs, order results, and current Etsy settings before
          creating bundle offers.
        </p>
      </section>
    </main>
  );
}