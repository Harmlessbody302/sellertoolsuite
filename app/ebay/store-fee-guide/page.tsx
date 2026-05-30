import Link from "next/link";

export default function EbayStoreFeeGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Store Fee Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay Store subscriptions can provide selling tools, included listings,
          possible fee savings, and storefront features, but the monthly cost
          only makes sense when the savings and benefits are greater than the
          subscription fee. Sellers should compare store cost, listing volume,
          insertion fees, category savings, and actual profit before upgrading.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay Store fee factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Monthly subscription fee",
              "The recurring cost of the selected eBay Store tier. This cost should be compared against actual listing volume and expected savings.",
            ],
            [
              "Included listings",
              "Store tiers may include a certain number of listings. The value depends on whether the seller actually uses those included listings.",
            ],
            [
              "Insertion fee savings",
              "If a seller would otherwise pay insertion fees, a store subscription may reduce or offset some listing costs.",
            ],
            [
              "Optional listing upgrades",
              "Subtitles, bold text, promoted options, and other upgrades may still cost extra and should not be confused with standard included listings.",
            ],
            [
              "Category and fee differences",
              "Store benefits and fee structures may vary by category, item type, listing format, seller status, and eBay policy changes.",
            ],
            [
              "Net store value",
              "The estimated savings or benefits minus the monthly store subscription fee. A store is only financially useful if the net value is positive.",
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
            Why eBay Store fee planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              An eBay Store subscription can be useful when a seller has enough
              listing volume, insertion fee savings, category benefits, or
              operational value to justify the monthly cost.
            </p>

            <p>
              A store subscription can also be wasteful if the seller does not
              list enough items, does not use the included listing allowance, or
              upgrades to a tier with benefits that do not improve real profit.
            </p>

            <p>
              The safest approach is to compare current listing costs against
              projected store costs before upgrading, then review actual fee
              reports and order results after the store tier is active.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay Store fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Upgrading to a store tier before listing volume justifies the monthly fee.",
              "Ignoring optional listing upgrade fees when reviewing total listing cost.",
              "Assuming every included listing has value even if the seller does not use it.",
              "Comparing store tiers without checking category-specific fee differences.",
              "Forgetting that store cost still matters even when sales are slow.",
              "Choosing a higher tier for features without confirming that the store improves profit.",
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
          Useful eBay Store fee calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate store subscription value, eBay fees,
          product profit, listing ROI, and sales goals before choosing or
          changing an eBay Store tier.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/store-fee-calculator", "eBay Store Fee Calculator"],
            ["/ebay/fee-calculator", "eBay Fee Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/listing-roi-calculator", "eBay Listing ROI Calculator"],
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
          Simple eBay Store fee workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Review listing volume",
              "Start with how many active listings and monthly listings you actually use.",
            ],
            [
              "Estimate current costs",
              "Add current insertion fees, optional listing upgrades, and other listing-related costs.",
            ],
            [
              "Compare store tiers",
              "Compare monthly store fees, included listings, possible savings, and seller tools.",
            ],
            [
              "Check net value",
              "Subtract the store fee from expected savings to see whether the subscription is worth keeping.",
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
              "Monthly sales, active listings, and monthly listing volume.",
              "Current insertion fees and optional listing upgrade fees.",
              "Monthly store subscription cost and included listing allowance.",
              "Expected insertion fee savings or final value fee savings if applicable.",
              "Whether included listings will actually be used.",
              "Category rules, listing format, seller level, and store feature value.",
              "Profit after store cost, listing fees, shipping, promoted listings, and refunds.",
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
            When an eBay Store may be worth it
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">High listing volume:</strong>{" "}
              A store may make sense when the seller lists enough items for
              included listings or fee savings to offset the monthly cost.
            </p>

            <p>
              <strong className="text-gray-950">Repeatable inventory:</strong>{" "}
              Store tools and listing allowances may be more useful when a
              seller manages consistent inventory instead of a few one-off items.
            </p>

            <p>
              <strong className="text-gray-950">Positive net savings:</strong>{" "}
              The store fee is easier to justify when expected savings are
              clearly higher than the subscription cost.
            </p>

            <p>
              <strong className="text-gray-950">Operational value:</strong>{" "}
              Some sellers may value store features, branding, organization, or
              seller tools, but those benefits should still support real profit.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay Store tier signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Worth it",
              "Estimated savings or operational value appear clearly higher than the monthly store fee.",
            ],
            [
              "Likely worth it",
              "The store appears workable, but sellers should confirm actual fee reports and listing usage.",
            ],
            [
              "Borderline",
              "Savings may be close to break-even, so the tier should be reviewed carefully.",
            ],
            [
              "Not worth it",
              "The store may cost more than it saves under the current listing volume and cost assumptions.",
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
        eBay Store subscription prices, included listings, insertion fees,
        final value fee discounts, optional listing fees, category rules,
        seller status, taxes, and marketplace policies can change. This guide is
        for planning purposes. Always confirm current store tier details,
        subscription terms, and fee reports in your eBay account and official
        eBay seller resources.
      </div>
    </main>
  );
}