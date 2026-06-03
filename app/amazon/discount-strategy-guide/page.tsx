import Link from "next/link";

const discountTypes = [
  {
    title: "Coupons",
    description:
      "Amazon coupons can encourage clicks and purchases, but the discount reduces the amount kept by the seller and may also stack with PPC or other costs.",
  },
  {
    title: "Deals",
    description:
      "Deals can create visibility and urgency, but sellers should compare the deal price against product cost, Amazon fees, fulfillment, PPC, and refund risk.",
  },
  {
    title: "Price reductions",
    description:
      "Lowering the listing price can improve competitiveness, but it also reduces margin on every order unless costs are also reduced.",
  },
  {
    title: "Launch discounts",
    description:
      "Introductory discounts may help collect early sales data, but they should be planned as a cost instead of treated as normal profit.",
  },
  {
    title: "Inventory clearance",
    description:
      "Discounts can help move slow inventory, reduce storage pressure, and free cash, but sellers should know the minimum acceptable profit.",
  },
  {
    title: "PPC overlap",
    description:
      "Discounts can stack with ad spend, referral fees, FBA or FBM costs, and refunds, making the final profit lower than revenue suggests.",
  },
];

const calculators = [
  ["/amazon/pricing-calculator", "Amazon Pricing Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/ppc-roi-calculator", "Amazon PPC ROI Calculator"],
  ["/amazon/listing-roi-calculator", "Amazon Listing ROI Calculator"],
];

const workflow = [
  {
    title: "Check normal profit",
    description:
      "Start with regular listing profit after product cost, Amazon fees, fulfillment, PPC, storage, refunds, and other costs.",
  },
  {
    title: "Apply the discount",
    description:
      "Subtract the coupon, deal, markdown, or price reduction from expected order revenue.",
  },
  {
    title: "Recalculate margin",
    description:
      "Compare discounted profit against the minimum acceptable profit and target margin.",
  },
  {
    title: "Review results",
    description:
      "Track whether the discount creates profitable growth or only generates lower-margin orders.",
  },
];

export default function AmazonDiscountStrategyGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Discount Strategy Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon discounts can help sellers improve conversion, move inventory,
          test pricing, support product launches, or compete for buyer attention.
          But coupons, deals, price reductions, PPC, referral fees,
          fulfillment costs, storage, refunds, and product cost should be
          included before assuming a discount is profitable.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon discount types sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {discountTypes.map((discount) => (
            <div key={discount.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{discount.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {discount.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why Amazon discount strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A discount reduces revenue immediately. If a seller only watches
              sales volume, a campaign can look successful while actual profit
              gets weaker after Amazon fees, fulfillment, PPC, refunds, storage,
              prep, packaging, and product cost are included.
            </p>

            <p>
              Discounts can be useful when they help move stale inventory,
              improve conversion, support a launch, test demand, or compete with
              similar offers. They are risky when the product already has weak
              margin after normal selling costs.
            </p>

            <p>
              The safest approach is to calculate normal profit first, then
              compare discounted profit before running a coupon, deal, or price
              reduction.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon discount mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Discounting before checking profit after Amazon fees and fulfillment.",
              "Stacking coupons, deals, PPC, and price reductions without checking total margin pressure.",
              "Assuming more orders automatically means more profit.",
              "Using the same discount on every product even when margins are different.",
              "Discounting slow inventory without checking storage cost, refund risk, and cash recovery.",
              "Running promotions without tracking whether they create repeatable profitable sales.",
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
          Useful Amazon discount calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to test pricing, profit, PPC impact, listing ROI, and
          whether a coupon, deal, or discount still leaves enough margin.
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
          Simple Amazon discount workflow
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
              "Original listing price and expected discounted sale price.",
              "Coupon amount, deal discount, markdown, price reduction, or promotional cost.",
              "Product cost, inbound shipping, prep, labeling, packaging, inspection, and supplies.",
              "Amazon referral fees, FBA fulfillment fees, FBM shipping costs, storage fees, and other selling costs.",
              "PPC spend, conversion changes, refund risk, returns, damaged inventory, and customer support.",
              "Minimum acceptable profit, target margin, inventory clearance goal, and cash flow impact.",
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
            When Amazon discounts may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Slow inventory:</strong>{" "}
              Discounts can help recover cash from inventory that is sitting too
              long, but the sale should still be compared against storage and
              refund risk.
            </p>

            <p>
              <strong className="text-gray-950">Launch testing:</strong>{" "}
              Temporary discounts may help test demand, conversion, and
              competitiveness, but they should be treated as a planned cost.
            </p>

            <p>
              <strong className="text-gray-950">High-margin products:</strong>{" "}
              Discounts are easier to support when the product already has
              enough margin after fees, fulfillment, storage, PPC, and refunds.
            </p>

            <p>
              <strong className="text-gray-950">Competitive categories:</strong>{" "}
              Discounts may help in categories where buyers compare price
              closely, but they should not replace a weak product or weak
              listing.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon discount strategies to compare
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Coupon",
              "Can increase buyer attention, but the coupon amount should be included as a direct selling cost.",
            ],
            [
              "Deal",
              "Can create urgency or visibility, but sellers should check whether the deal price still supports margin.",
            ],
            [
              "Lower list price",
              "May improve competitiveness, but reduces margin on every order unless costs are reduced.",
            ],
            [
              "Inventory clearance",
              "Can free cash and reduce storage pressure, but should be compared with break-even and minimum profit.",
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
          Amazon coupons, deals, pricing tools, PPC results, referral fees, FBA
          fees, FBM shipping costs, storage costs, refunds, taxes, category
          demand, buy box behavior, and marketplace policies can change. This
          guide is for planning purposes. Always compare discount decisions
          against actual order costs and current Amazon seller settings.
        </p>
      </section>
    </main>
  );
}