import Link from "next/link";

const discountStrategyTypes = [
  {
    title: "Percentage discounts",
    description:
      "A percent-off sale reduces the product price by a chosen percentage. Sellers should check whether the remaining price still covers Etsy fees, product cost, shipping, packaging, and labor.",
  },
  {
    title: "Fixed-dollar discounts",
    description:
      "A fixed-dollar discount removes a set amount from the order. This can be riskier on low-priced products because the discount may take a larger share of the sale.",
  },
  {
    title: "Free shipping discounts",
    description:
      "Free shipping can improve buyer appeal, but the seller still pays the shipping cost unless it has been built into the product price.",
  },
  {
    title: "Coupon codes",
    description:
      "Coupon codes can be useful for repeat buyers, abandoned carts, or email campaigns, but sellers should avoid stacking discounts without checking margin.",
  },
  {
    title: "Bundle discounts",
    description:
      "Bundle discounts can increase average order value when multiple items share shipping, packaging, or fulfillment effort.",
  },
  {
    title: "Clearance discounts",
    description:
      "Clearance discounts can help move slow inventory, but sellers should know whether they are still earning profit or simply recovering cost.",
  },
];

const mistakes = [
  "Running discounts without checking profit margin first.",
  "Stacking a sale, coupon, free shipping, and Offsite Ads fee on the same order.",
  "Using the same discount on every product even when margins vary by item.",
  "Assuming a higher conversion rate automatically makes a discount profitable.",
  "Discounting low-priced products where fixed fees already take a large share.",
  "Ignoring refunds, replacements, packaging, labor, and shipping supplies when calculating sale profit.",
];

const checklist = [
  "Original product price.",
  "Discount percentage or fixed discount amount.",
  "Etsy fees after the discounted sale price.",
  "Product cost, materials, and labor.",
  "Shipping label cost and packaging supplies.",
  "Free shipping or seller-paid shipping subsidy.",
  "Possible Offsite Ads fee on attributed orders.",
  "Target profit, target margin, and minimum acceptable sale price.",
];

const relatedTools = [
  {
    title: "Discount Impact Calculator",
    href: "/etsy/discount-impact-calculator",
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
    title: "Etsy Bundle Pricing Calculator",
    href: "/etsy/bundle-pricing-calculator",
  },
];

const workflow = [
  {
    title: "Check normal profit",
    description:
      "Start with your regular price, Etsy fees, product cost, shipping, packaging, and labor.",
  },
  {
    title: "Apply the discount",
    description:
      "Subtract the sale, coupon, or offer amount and estimate the new sale price.",
  },
  {
    title: "Recalculate margin",
    description:
      "Compare profit after the discount against your target margin and minimum acceptable profit.",
  },
  {
    title: "Review performance",
    description:
      "Track whether the discount increases profitable orders or only creates lower-margin sales.",
  },
];

export default function EtsyDiscountStrategyGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Discount Strategy Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy discounts can help increase sales, clear inventory, encourage
          bundles, or bring buyers back, but they can also reduce profit quickly
          if fees, shipping, product cost, packaging, labor, and ad costs are
          not included. A good discount strategy protects margin before chasing
          more orders.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy discount types sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {discountStrategyTypes.map((item) => (
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
            Why Etsy discount strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A discount reduces revenue immediately, but most seller costs do
              not fall at the same time. Etsy fees, payment processing,
              packaging, shipping supplies, labor, and product cost still need
              to be covered after the sale price is lowered.
            </p>

            <p>
              Discounts can work well when they increase profitable order volume
              or help sell inventory that still has margin. They become risky
              when they are used on products that already have weak profit after
              fees and fulfillment costs.
            </p>

            <p>
              The safest approach is to calculate the discounted profit before
              launching a sale, then compare real order results after the
              promotion ends.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy discount mistakes
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
          Useful Etsy discount calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate discount impact, profit after discounts,
          pricing room, and bundle pricing before running a sale.
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
          Simple Etsy discount workflow
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
            When Etsy discounts may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">High-margin products:</strong>{" "}
              Discounts are easier to support when the product has enough margin
              after Etsy fees, product cost, shipping, packaging, and labor.
            </p>

            <p>
              <strong className="text-gray-950">Bundles and larger carts:</strong>{" "}
              Discounts can work better when they increase average order value
              and spread shipping or packaging cost across multiple items.
            </p>

            <p>
              <strong className="text-gray-950">Slow inventory:</strong>{" "}
              Discounts can help recover cash from slow-moving products, but
              sellers should know whether the sale still earns profit.
            </p>

            <p>
              <strong className="text-gray-950">Repeat buyers:</strong>{" "}
              Coupons may help encourage repeat purchases when the discount is
              targeted and the order still protects margin.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy discounts, coupon behavior, sale settings, fee rates, ad costs,
          buyer behavior, and marketplace rules can change. This guide is for
          planning purposes. Always confirm current discount settings, fees, and
          shop results in your Etsy account.
        </p>
      </section>
    </main>
  );
}