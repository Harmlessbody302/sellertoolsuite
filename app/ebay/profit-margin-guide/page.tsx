import Link from "next/link";

export default function EbayProfitMarginGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Profit Margin Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay profit margin shows how much money remains after item cost,
          shipping, packaging, eBay fees, promoted listing costs, offers,
          refunds, returns, labor, and other seller expenses. A healthy eBay
          margin gives sellers room for buyer offers, shipping changes, ad
          costs, and unexpected order issues.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay profit margin factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Revenue",
              "The total order amount before costs are subtracted. This can include item price and shipping charged to the buyer.",
            ],
            [
              "Net profit",
              "The money left after subtracting item cost, shipping, packaging, fees, ads, refunds, labor, and other seller costs.",
            ],
            [
              "Profit margin",
              "The percentage of revenue that remains as profit. Higher margin gives more room for offers, returns, and shipping changes.",
            ],
            [
              "Fee pressure",
              "Final value fees, fixed order fees, promoted listing rates, store costs, and optional listing fees can reduce margin.",
            ],
            [
              "Shipping impact",
              "Actual label cost, packaging, buyer-paid shipping, free shipping, and international shipping can change the final margin.",
            ],
            [
              "Risk allowance",
              "Returns, partial refunds, damaged items, customer service time, and stale inventory can reduce real profit after the sale.",
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
            Why eBay profit margin matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A listing can produce sales and still be weak if the margin is
              too thin. After eBay fees, shipping, packaging, promoted listing
              costs, refunds, and labor are included, the actual amount kept by
              the seller may be much smaller than expected.
            </p>

            <p>
              Margin also affects how flexible a seller can be. A higher-margin
              listing can usually handle buyer offers, markdowns, coupons,
              shipping adjustments, or small refund issues better than a
              low-margin listing.
            </p>

            <p>
              The safest approach is to calculate margin before listing, then
              review real order results after sales begin so pricing,
              promotion, shipping, and sourcing decisions can improve over time.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay margin mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale price as profit before subtracting costs.",
              "Ignoring shipping label cost, packaging, and handling supplies.",
              "Using promoted listings without checking the new profit margin.",
              "Accepting offers without knowing the minimum profitable price.",
              "Forgetting refund, return, defect, or damaged-item allowance.",
              "Buying more inventory because sales are strong without checking margin.",
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
          Useful eBay margin calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate profit margin, product cost, offer impact,
          promoted listing pressure, and listing ROI before scaling eBay sales.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/product-cost-calculator", "eBay Product Cost Calculator"],
            ["/ebay/offer-discount-calculator", "eBay Offer Discount Calculator"],
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
          Simple eBay margin workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with revenue",
              "Use item price plus shipping charged to the buyer as the starting order revenue.",
            ],
            [
              "Subtract all costs",
              "Include item cost, shipping, packaging, fees, promoted listing cost, labor, and risk allowance.",
            ],
            [
              "Calculate margin",
              "Divide estimated profit by total revenue to see what percentage remains after costs.",
            ],
            [
              "Review decisions",
              "Use margin to decide whether to raise price, reduce cost, accept offers, promote, restock, or retire the listing.",
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
              "Item sale price and buyer-paid shipping.",
              "Product sourcing cost, repair cost, cleaning cost, and prep supplies.",
              "Shipping label cost, packaging materials, labels, boxes, and handling supplies.",
              "Final value fee, fixed order fee, promoted listing fee, and optional listing fees.",
              "Offer discounts, markdowns, coupons, and negotiated prices.",
              "Refunds, returns, damaged items, labor time, storage, and inventory risk.",
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
            What margin means for eBay decisions
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Thin margin:</strong> The
              listing may still be profitable, but offers, refunds, shipping
              increases, or ad costs can erase profit quickly.
            </p>

            <p>
              <strong className="text-gray-950">Healthy margin:</strong> The
              listing has enough room to handle normal selling costs while still
              leaving useful profit.
            </p>

            <p>
              <strong className="text-gray-950">Strong margin:</strong> The
              listing may be a better candidate for restocking, promotion,
              bundles, or similar-product sourcing.
            </p>

            <p>
              <strong className="text-gray-950">Negative margin:</strong> The
              product likely needs a higher price, lower cost, cheaper shipping,
              less ad spend, or should be avoided.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        eBay fees, shipping costs, promoted listing charges, buyer offers,
        refund rates, return costs, taxes, category demand, and marketplace
        rules can change. This guide is for planning purposes. Always compare
        estimated margins with actual order results and current eBay fee
        settings.
      </div>
    </main>
  );
}