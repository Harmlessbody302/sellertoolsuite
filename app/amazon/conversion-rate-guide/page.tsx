import Link from "next/link";

const conversionFactors = [
  {
    title: "Sessions",
    description:
      "Amazon sessions show how many visits a listing receives during a review period. More sessions create more chances for orders, but traffic alone does not guarantee profit.",
  },
  {
    title: "Orders",
    description:
      "Orders show how many purchases the listing generated from that traffic. A listing with many sessions but few orders may have weak conversion.",
  },
  {
    title: "Conversion rate",
    description:
      "Conversion rate is the percentage of sessions that turn into orders. A stronger conversion rate can help the same traffic produce more sales.",
  },
  {
    title: "Traffic quality",
    description:
      "Amazon search traffic, PPC traffic, external traffic, and casual browsing traffic may convert differently depending on buyer intent.",
  },
  {
    title: "Listing quality",
    description:
      "Photos, title, bullets, reviews, price, offer quality, shipping promise, product details, and buyer trust signals can affect conversion.",
  },
  {
    title: "Profit per order",
    description:
      "Conversion only helps when the resulting orders are profitable after product cost, Amazon fees, fulfillment, PPC, refunds, and storage.",
  },
];

const calculators = [
  ["/amazon/conversion-rate-calculator", "Amazon Conversion Rate Calculator"],
  ["/amazon/sales-goal-calculator", "Amazon Sales Goal Calculator"],
  ["/amazon/listing-roi-calculator", "Amazon Listing ROI Calculator"],
  ["/amazon/ppc-roi-calculator", "Amazon PPC ROI Calculator"],
];

const workflow = [
  {
    title: "Measure traffic",
    description:
      "Start with listing sessions during a clear review period.",
  },
  {
    title: "Count orders",
    description:
      "Compare orders generated during the same review period.",
  },
  {
    title: "Calculate conversion",
    description:
      "Divide orders by sessions to estimate how efficiently traffic turns into sales.",
  },
  {
    title: "Improve carefully",
    description:
      "Test photos, title, bullets, price, reviews, offer quality, and PPC traffic one change at a time.",
  },
];

export default function AmazonConversionRateGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Conversion Rate Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon conversion rate helps sellers understand how listing sessions
          turn into orders. A listing can receive traffic without producing
          profitable sales if pricing, photos, reviews, title, bullets, offer
          quality, PPC targeting, fulfillment promise, or buyer trust signals are
          holding it back.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon conversion factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {conversionFactors.map((factor) => (
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
            Why Amazon conversion rate matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Traffic is useful only if it turns into profitable orders. A
              listing with many sessions but few sales may need better photos,
              clearer title and bullets, stronger reviews, improved pricing,
              better offer quality, or more relevant PPC traffic.
            </p>

            <p>
              Conversion rate also helps sellers decide whether to improve a
              listing before spending more on Amazon PPC. More traffic can
              amplify a strong listing, but it can also waste money if the
              listing does not convert well.
            </p>

            <p>
              The safest approach is to compare sessions, orders, conversion
              rate, profit per order, traffic source, PPC cost, and refund risk
              before changing price, increasing ads, or restocking inventory.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon conversion mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging a listing by sessions alone without checking orders or profit.",
              "Increasing PPC spend before improving images, price, reviews, title, and offer quality.",
              "Assuming more traffic will fix a listing with weak buyer trust signals.",
              "Ignoring whether converted orders are profitable after Amazon fees, fulfillment, PPC, refunds, and storage.",
              "Comparing conversion rates across unrelated categories, price ranges, or product types.",
              "Changing too many listing elements at once without knowing what helped or hurt performance.",
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
          Useful Amazon conversion calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate conversion rate, sales goals, listing ROI,
          PPC impact, and profit before increasing traffic or changing listings.
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
          Simple Amazon conversion workflow
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
              "Listing sessions during the review period.",
              "Orders generated during the same review period.",
              "Conversion rate for the listing, product group, or store segment.",
              "Traffic source, such as Amazon search, PPC, external traffic, or repeat buyers.",
              "Product price, shipping promise, reviews, title, bullets, photos, offer quality, and buy box competitiveness.",
              "Profit per order after product cost, Amazon fees, fulfillment, PPC, refunds, storage, and labor.",
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
            How to improve Amazon conversion
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Improve photos:</strong> Clear,
              bright, accurate photos help buyers understand the product,
              condition, size, included items, and use case.
            </p>

            <p>
              <strong className="text-gray-950">Clarify product details:</strong>{" "}
              Strong titles, bullets, compatibility notes, measurements, model
              numbers, and condition details can help shoppers decide faster.
            </p>

            <p>
              <strong className="text-gray-950">Review pricing:</strong> A price
              may need to cover costs and profit, but it also needs to fit sold
              comps, competitor offers, buyer demand, and perceived value.
            </p>

            <p>
              <strong className="text-gray-950">Check traffic quality:</strong>{" "}
              PPC, keywords, external traffic, and search placement should match
              what the product actually offers.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon conversion signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Low sessions",
              "The listing may need better search visibility, keywords, PPC support, title, or category placement.",
            ],
            [
              "High sessions, low orders",
              "The listing may have weak photos, pricing, reviews, offer quality, product fit, or buyer trust.",
            ],
            [
              "Orders but weak profit",
              "The listing may convert, but pricing, fees, fulfillment, PPC, or refunds may reduce real return.",
            ],
            [
              "Strong conversion",
              "The listing may be a candidate for restocking, PPC scaling, similar-product sourcing, or inventory expansion.",
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
          Amazon conversion rates, search visibility, PPC traffic, buy box
          behavior, reviews, pricing, fulfillment promises, refunds, taxes,
          category demand, and marketplace rules can change. This guide is for
          planning purposes. Always review actual listing analytics, order
          results, and current Amazon seller settings before making growth
          decisions.
        </p>
      </section>
    </main>
  );
}