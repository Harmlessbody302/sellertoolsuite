import Link from "next/link";

const conversionFactors = [
  {
    title: "Listing visits",
    description:
      "The number of shoppers who view a listing. More visits create more chances for orders, but traffic alone does not guarantee profit.",
  },
  {
    title: "Orders",
    description:
      "The number of purchases generated from listing traffic during a review period.",
  },
  {
    title: "Conversion rate",
    description:
      "The percentage of visits that turn into orders. A listing with stronger conversion can do more with the same traffic.",
  },
  {
    title: "Traffic source",
    description:
      "Visits from Etsy search, ads, social media, email, or external links may convert differently.",
  },
  {
    title: "Listing quality",
    description:
      "Photos, title, tags, description, price, shipping, reviews, and presentation can affect whether shoppers buy.",
  },
  {
    title: "Profit per order",
    description:
      "Conversion rate matters most when orders are profitable after fees, product cost, shipping, packaging, labor, and ads.",
  },
];

const mistakes = [
  "Judging a listing by views alone without checking orders or profit.",
  "Increasing ad spend before improving photos, price, shipping, title, or description.",
  "Assuming more traffic will fix a listing that has weak conversion.",
  "Ignoring whether converted orders are actually profitable after Etsy fees and costs.",
  "Comparing conversion rates across products with very different prices, demand, or buyer intent.",
  "Changing too many listing elements at once without knowing what improved or hurt results.",
];

const checklist = [
  "Listing visits during a clear review period.",
  "Orders generated during the same period.",
  "Conversion rate for the listing or shop.",
  "Traffic source, such as Etsy search, ads, social, or external traffic.",
  "Product price, shipping cost, discounts, and offer strength.",
  "Photo quality, title, tags, description, and listing presentation.",
  "Reviews, processing time, return policy, and buyer trust factors.",
  "Profit per order after fees, shipping, packaging, labor, ads, and product cost.",
];

const relatedTools = [
  {
    title: "Etsy Conversion Rate Calculator",
    href: "/etsy/conversion-rate-calculator",
  },
  {
    title: "Etsy Sales Goal Calculator",
    href: "/etsy/sales-goal-calculator",
  },
  {
    title: "Etsy Listing ROI Calculator",
    href: "/etsy/listing-roi-calculator",
  },
  {
    title: "Etsy Ad ROI Calculator",
    href: "/etsy/ad-roi-calculator",
  },
];

const workflow = [
  {
    title: "Measure traffic",
    description:
      "Start with listing visits or shop visits over a clear review period.",
  },
  {
    title: "Count orders",
    description:
      "Compare the number of orders generated from that traffic during the same period.",
  },
  {
    title: "Calculate conversion",
    description:
      "Divide orders by visits to estimate how efficiently traffic turns into sales.",
  },
  {
    title: "Improve carefully",
    description:
      "Test photos, pricing, title, tags, shipping, description, and trust signals one area at a time.",
  },
];

export default function EtsyConversionRateGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Conversion Rate Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy conversion rate helps sellers understand how well listing traffic
          turns into orders. A listing can receive views without producing
          enough profitable sales if photos, pricing, shipping, title, tags,
          description, reviews, or buyer trust signals are holding it back.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy conversion factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {conversionFactors.map((item) => (
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
            Why Etsy conversion rate matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Traffic is useful only if it turns into orders that support profit.
              A listing with many views but few sales may need better photos,
              clearer title and tags, stronger pricing, improved shipping
              settings, or a more persuasive description.
            </p>

            <p>
              Conversion rate also helps sellers decide whether to improve a
              listing before spending more on ads. More traffic can amplify a
              strong listing, but it can also waste money if the listing does not
              convert well.
            </p>

            <p>
              The safest approach is to compare visits, orders, conversion rate,
              profit per order, and traffic source before changing prices,
              increasing ads, or retiring a listing.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy conversion mistakes
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
          Useful Etsy conversion calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate conversion rate, sales goals, listing ROI,
          and ad performance before increasing traffic or changing listings.
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
          Simple Etsy conversion workflow
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
            How to improve Etsy conversion
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Improve photos:</strong> Clear,
              bright product photos can help buyers understand size, use case,
              color, quality, and style faster.
            </p>

            <p>
              <strong className="text-gray-950">Clarify the offer:</strong> A
              listing should make the product, price, shipping, processing time,
              personalization, and buyer expectations easy to understand.
            </p>

            <p>
              <strong className="text-gray-950">Review pricing:</strong> A
              price may need to cover costs and profit, but it also needs to fit
              buyer expectations, competition, and perceived value.
            </p>

            <p>
              <strong className="text-gray-950">Check traffic quality:</strong>{" "}
              Etsy search, ads, social traffic, and external traffic may behave
              differently. Low conversion may come from weak traffic fit, not
              just the listing itself.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy conversion rates, traffic sources, search visibility, ad results,
          buyer behavior, listing performance, fees, and marketplace rules can
          change. This guide is for planning purposes. Always review actual shop
          analytics, order results, and current Etsy settings before making
          listing decisions.
        </p>
      </section>
    </main>
  );
}