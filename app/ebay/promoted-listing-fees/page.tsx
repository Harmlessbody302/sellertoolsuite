import Link from "next/link";

export default function EbayPromotedListingFeesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Promoted Listing Fees Explained
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay promoted listings can help increase visibility, but ad fees can
          reduce profit quickly if the listing price, item cost, shipping,
          packaging, offers, refunds, and margin are not checked first. Sellers
          should estimate promoted listing impact before raising ad rates or
          scaling campaigns.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay promoted listing fee basics sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Promoted listing rate",
              "The ad rate or campaign rate used to promote a listing. A higher rate can increase ad cost if the listing receives attributed sales.",
            ],
            [
              "Attributed sales",
              "A promoted listing fee may apply when an order is credited to the promoted listing campaign under eBay's attribution rules.",
            ],
            [
              "Ad cost",
              "The promoted listing fee reduces profit after the sale. It should be treated as a selling cost, not ignored as a marketing detail.",
            ],
            [
              "Margin pressure",
              "Promoted listings are riskier on low-margin products because the ad fee can quickly erase profit after eBay fees and shipping.",
            ],
            [
              "Offer stacking",
              "Best Offers, coupons, markdowns, and promoted listing fees can stack together and make a listing less profitable than expected.",
            ],
            [
              "ROI review",
              "Promoted listings should be reviewed by actual profit, not just clicks, impressions, views, or gross sales.",
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
            Why promoted listing fees matter
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Promoted listings can help a product get more visibility, but
              extra visibility only helps if the resulting sale still leaves
              enough profit after all costs are included.
            </p>

            <p>
              A listing with healthy profit can sometimes support ad spend, but
              a thin-margin listing may become unprofitable once promoted
              listing fees, eBay fees, shipping, packaging, offers, and refund
              risk are included.
            </p>

            <p>
              The safest approach is to calculate normal profit first, then test
              the promoted listing fee impact before increasing ad rates or
              expanding promotion to more listings.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay promoted listing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Using promoted listings before checking whether the product has enough margin.",
              "Judging campaigns by sales or views instead of profit after ad fees.",
              "Increasing ad rate on listings that already have weak conversion or low profit.",
              "Stacking promoted listing fees with offers, coupons, markdowns, or free shipping.",
              "Promoting products before checking sold comps, pricing, title, photos, and item specifics.",
              "Ignoring refunds, returns, damaged items, or customer service cost when reviewing ad performance.",
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
          Useful eBay promoted listing calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate promoted listing ROI, ad fee pressure,
          profit after fees, pricing room, and listing performance before
          increasing ad spend.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "/ebay/promoted-listing-roi-calculator",
              "eBay Promoted Listing ROI Calculator",
            ],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/listing-roi-calculator", "eBay Listing ROI Calculator"],
            ["/ebay/pricing-calculator", "eBay Pricing Calculator"],
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
          Simple eBay promoted listing workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Check normal profit",
              "Estimate profit before promotion using sale price, item cost, shipping, packaging, and eBay fees.",
            ],
            [
              "Add ad fee",
              "Apply the promoted listing rate to estimate how much extra cost the attributed sale may create.",
            ],
            [
              "Review margin",
              "Compare profit before and after ad fees to see whether the campaign still leaves enough margin.",
            ],
            [
              "Scale carefully",
              "Increase ad spend only on listings with strong profit, conversion, demand, and manageable fulfillment risk.",
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
              "Item sale price and shipping charged to the buyer.",
              "Item cost, sourcing cost, repair cost, cleaning cost, and prep supplies.",
              "Final value fee, fixed order fee, store fee, and optional listing fees.",
              "Promoted listing rate or estimated ad fee per sale.",
              "Actual shipping cost, packaging materials, and handling time.",
              "Best Offer discount, coupons, markdowns, free shipping, and pricing buffer.",
              "Refunds, returns, damaged items, customer support time, and inventory risk.",
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
            When promoted listings may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">High-margin products:</strong>{" "}
              Promoted listings are usually safer when a product has enough
              margin to absorb ad fees after all other costs.
            </p>

            <p>
              <strong className="text-gray-950">Strong conversion:</strong> Ads
              may work better when the listing already has good photos, pricing,
              item specifics, trust signals, and buyer demand.
            </p>

            <p>
              <strong className="text-gray-950">Competitive categories:</strong>{" "}
              Promotion may help where buyers compare many similar listings, but
              the ad rate should still be tested against profit.
            </p>

            <p>
              <strong className="text-gray-950">Repeatable inventory:</strong>{" "}
              Campaign data is easier to judge when the seller has multiple
              similar sales instead of a single one-off item.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How promoted listings affect eBay pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Higher price needed",
              "A promoted listing fee may require a higher listing price to preserve the same target profit.",
            ],
            [
              "Less offer room",
              "If ad fees apply, the listing may have less room for Best Offers, coupons, or markdowns.",
            ],
            [
              "Shipping matters",
              "Shipping cost and fee treatment can combine with ad fees to reduce margin faster than expected.",
            ],
            [
              "ROI matters",
              "A campaign should be judged by net profit and return on ad cost, not just views or gross sales.",
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
        eBay promoted listing products, attribution rules, ad rates, campaign
        settings, fee treatment, category demand, buyer behavior, refunds,
        shipping costs, taxes, and marketplace policies can change. This guide
        is for planning purposes. Always confirm current promoted listing details
        in your eBay account and official eBay seller resources.
      </div>
    </main>
  );
}