import Link from "next/link";

export default function HowToPriceEbayProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          How to Price eBay Products
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay pricing should cover item cost, shipping, packaging, eBay fees,
          promoted listing costs, offers, refunds, labor, and target profit. A
          good eBay price is not just based on active listings. It should be
          based on realistic sold prices and the full cost of completing the
          sale.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay pricing factors sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Sold prices",
              "Completed and sold eBay listings are usually more useful than active listings because they show what buyers actually paid.",
            ],
            [
              "Item cost",
              "The product sourcing cost, repair cost, cleaning cost, prep cost, and supplies should be included before choosing a listing price.",
            ],
            [
              "eBay fees",
              "Final value fees, fixed order fees, promoted listing fees, store fees, insertion fees, and international fees can reduce the amount kept from the sale.",
            ],
            [
              "Shipping strategy",
              "Buyer-paid shipping, free shipping, flat-rate shipping, and actual label cost can change the real price needed to protect margin.",
            ],
            [
              "Offer room",
              "If Best Offer, coupons, markdowns, or buyer negotiation are part of the strategy, the listing price should leave enough room for discounts.",
            ],
            [
              "Return and refund risk",
              "Returns, partial refunds, damaged items, customer service time, and return shipping can make a product less profitable than the sale price suggests.",
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
            Why eBay pricing strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A product can sell quickly and still be a poor listing if the
              price does not cover item cost, shipping, packaging, eBay fees,
              promoted listing cost, labor, and refunds.
            </p>

            <p>
              eBay sellers often have to price with some flexibility because
              buyers may send offers, compare sold listings, expect competitive
              shipping, or choose similar products with better photos and
              stronger trust signals.
            </p>

            <p>
              The safest approach is to start with the full cost structure,
              compare realistic sold comps, then choose a price that supports
              both buyer demand and seller profit.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from active listings instead of realistic sold comps.",
              "Treating buyer-paid shipping as profit before checking actual label cost.",
              "Forgetting final value fees, fixed order fees, and promoted listing costs.",
              "Accepting offers without knowing the minimum profitable price.",
              "Offering free shipping without building the cost into the item price.",
              "Ignoring returns, partial refunds, damaged items, packaging, labor, and prep time.",
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
          Useful eBay pricing calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate listing price, profit, break-even point,
          offer room, fees, and product cost before publishing or revising eBay
          listings.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/pricing-calculator", "eBay Pricing Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/break-even-calculator", "eBay Break-Even Calculator"],
            ["/ebay/offer-discount-calculator", "eBay Offer Discount Calculator"],
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
          Simple eBay pricing workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Check sold comps",
              "Review realistic sold listings for similar condition, brand, model, size, shipping setup, and demand.",
            ],
            [
              "Add all costs",
              "Include item cost, repair, cleaning, packaging, shipping, fees, labor, and refund allowance.",
            ],
            [
              "Set offer room",
              "Choose a listing price that leaves room for Best Offer, coupons, markdowns, or buyer negotiation.",
            ],
            [
              "Review results",
              "After sales begin, compare actual fees, shipping costs, offers, and refunds against your original estimate.",
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
              "Realistic sold price range for similar products.",
              "Item sourcing cost, repair cost, cleaning cost, and prep supplies.",
              "Actual shipping label cost and shipping charged to the buyer.",
              "Packaging materials, boxes, labels, tape, inserts, and handling supplies.",
              "Final value fee, fixed order fee, promoted listing rate, and optional listing fees.",
              "Offer discount, refund risk, return shipping, labor time, and target profit.",
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
            How to choose an eBay listing price
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Start with the floor:</strong>{" "}
              Calculate the minimum price needed to avoid losing money after
              fees, item cost, shipping, packaging, and labor.
            </p>

            <p>
              <strong className="text-gray-950">Add target profit:</strong>{" "}
              Decide how much profit the item needs to justify sourcing,
              listing, storage, shipping, and customer service.
            </p>

            <p>
              <strong className="text-gray-950">Compare sold comps:</strong>{" "}
              Check whether buyers are actually paying enough to support that
              price.
            </p>

            <p>
              <strong className="text-gray-950">Leave negotiation room:</strong>{" "}
              If you use offers or markdowns, avoid pricing so low that a
              normal buyer offer removes your profit.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        eBay sold prices, buyer demand, category fees, shipping costs, promoted
        listing charges, return rates, taxes, and marketplace rules can change.
        This guide is for planning purposes. Always confirm current pricing,
        order costs, and fee details in your eBay account and official eBay
        seller resources.
      </div>
    </main>
  );
}