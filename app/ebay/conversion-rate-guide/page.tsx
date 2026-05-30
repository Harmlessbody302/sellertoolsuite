import Link from "next/link";

export default function EbayConversionRateGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Conversion Rate Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay conversion rate helps sellers understand how well listing views
          turn into orders. A listing can receive traffic without producing
          profitable sales if pricing, photos, item specifics, shipping, title,
          condition notes, return expectations, or buyer trust signals are
          holding it back.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay conversion factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Listing views",
              "The number of shoppers who view an eBay listing. More views create more chances for orders, but traffic does not guarantee profit.",
            ],
            [
              "Orders",
              "The number of purchases generated from listing traffic during a review period.",
            ],
            [
              "Conversion rate",
              "The percentage of listing views that turn into orders. A stronger listing can create more sales from the same amount of traffic.",
            ],
            [
              "Traffic quality",
              "Search traffic, promoted listing traffic, external traffic, and casual browsing traffic may convert differently.",
            ],
            [
              "Listing quality",
              "Photos, title, item specifics, condition notes, price, shipping, return policy, and description can affect whether shoppers buy.",
            ],
            [
              "Profit per order",
              "Conversion rate matters most when the resulting orders are profitable after item cost, shipping, packaging, eBay fees, ads, and refunds.",
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
            Why eBay conversion rate matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Traffic is useful only if it turns into profitable orders. A
              listing with many views but few sales may need better photos,
              clearer title and item specifics, stronger pricing, improved
              shipping settings, or a more accurate description.
            </p>

            <p>
              Conversion rate also helps sellers decide whether to improve a
              listing before spending more on promoted listings. More traffic
              can amplify a strong listing, but it can also waste money if the
              listing does not convert well.
            </p>

            <p>
              The safest approach is to compare views, orders, conversion rate,
              profit per order, traffic source, and return risk before changing
              price, increasing ads, or restocking inventory.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay conversion mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging a listing by views alone without checking orders or profit.",
              "Increasing promoted listing spend before improving photos, price, shipping, title, or item specifics.",
              "Assuming more traffic will fix a listing that has weak buyer trust signals.",
              "Ignoring whether converted orders are profitable after eBay fees, shipping, refunds, and ads.",
              "Comparing conversion rates across unrelated categories, price ranges, or item conditions.",
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
          Useful eBay conversion calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate conversion rate, sales goals, listing ROI,
          promoted listing performance, and profit before increasing traffic or
          changing listings.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/conversion-rate-calculator", "eBay Conversion Rate Calculator"],
            ["/ebay/sales-goal-calculator", "eBay Sales Goal Calculator"],
            ["/ebay/listing-roi-calculator", "eBay Listing ROI Calculator"],
            [
              "/ebay/promoted-listing-roi-calculator",
              "eBay Promoted Listing ROI Calculator",
            ],
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
          Simple eBay conversion workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Measure traffic",
              "Start with listing views or impressions during a clear review period.",
            ],
            [
              "Count orders",
              "Compare the number of orders generated by those views during the same review period.",
            ],
            [
              "Calculate conversion",
              "Divide orders by views to estimate how efficiently traffic turns into sales.",
            ],
            [
              "Improve carefully",
              "Test photos, title, item specifics, price, shipping, and trust signals one area at a time.",
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
              "Listing views or impressions during the review period.",
              "Orders generated during the same review period.",
              "Conversion rate for the listing, product group, or store segment.",
              "Traffic source, such as eBay search, promoted listings, external traffic, or repeat buyers.",
              "Product price, shipping cost, discounts, offers, and buyer-paid shipping setup.",
              "Photo quality, title quality, item specifics, condition notes, description, and trust signals.",
              "Profit per order after fees, shipping, packaging, labor, ads, refunds, and product cost.",
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
            How to improve eBay conversion
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Improve photos:</strong> Clear,
              bright, accurate photos help buyers understand condition, scale,
              defects, labels, measurements, and what is included.
            </p>

            <p>
              <strong className="text-gray-950">Clarify item specifics:</strong>{" "}
              Strong item specifics, model numbers, compatibility details,
              brand, size, color, and condition details can help shoppers decide
              faster.
            </p>

            <p>
              <strong className="text-gray-950">Review pricing:</strong> A price
              may need to cover costs and profit, but it also needs to fit sold
              comps, competition, buyer demand, and perceived value.
            </p>

            <p>
              <strong className="text-gray-950">Check shipping offer:</strong>{" "}
              Shipping cost, delivery speed, returns, packaging, and total
              delivered price can affect whether buyers choose the listing.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay conversion signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Low views",
              "The listing may need better search visibility, title keywords, item specifics, price, or promotion.",
            ],
            [
              "High views, low orders",
              "The listing may have weak photos, pricing, condition notes, shipping offer, or buyer trust.",
            ],
            [
              "Orders but weak profit",
              "The listing may convert, but pricing, fees, shipping, offers, or refunds may reduce real return.",
            ],
            [
              "Strong conversion",
              "The listing may be a candidate for restocking, careful promotion, similar sourcing, or scaling.",
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
        eBay conversion rates, traffic sources, promoted listing results, search
        visibility, buyer behavior, pricing, shipping expectations, return
        rates, taxes, and marketplace rules can change. This guide is for
        planning purposes. Always review actual listing analytics, order results,
        and current eBay seller settings before making growth decisions.
      </div>
    </main>
  );
}