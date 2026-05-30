import Link from "next/link";

export default function EbayFreeShippingStrategyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Free Shipping Strategy
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free shipping can make eBay listings more appealing, but it is not
          actually free for the seller. A good free shipping strategy builds
          postage, packaging, handling time, eBay fees, promoted listing costs,
          and return risk into the item price before assuming the listing is
          profitable.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay free shipping options sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Build shipping into the item price",
              "Raise the product price enough to cover expected postage, packaging, handling, and fee pressure.",
            ],
            [
              "Use free shipping selectively",
              "Free shipping may work better on lightweight, high-margin, easy-to-pack items than on heavy or bulky products.",
            ],
            [
              "Compare sold comps",
              "Review whether similar sold listings use free shipping, buyer-paid shipping, or lower item prices with separate shipping.",
            ],
            [
              "Watch fee pressure",
              "When shipping is built into the item price, fee calculations may apply to a larger order amount.",
            ],
            [
              "Protect offer room",
              "If you accept Best Offers, coupons, or markdowns, free shipping can make discounts riskier unless the price has enough margin.",
            ],
            [
              "Review return risk",
              "Free shipping can become more expensive if an order is refunded, returned, damaged, or replaced.",
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
            Why free shipping strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Free shipping can help buyers compare listings more easily, but
              the shipping cost still has to be paid. If the item price is not
              adjusted, the seller absorbs the postage, packaging, handling, and
              any related fee pressure.
            </p>

            <p>
              Free shipping is usually safer when the product has enough margin,
              predictable shipping cost, low return risk, and strong buyer
              demand. It can be riskier for heavy, fragile, bulky, low-margin,
              or international orders.
            </p>

            <p>
              The safest approach is to calculate profit both with and without
              free shipping before changing a listing. Then compare actual
              results after sales begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay free shipping mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Offering free shipping without increasing the item price enough.",
              "Using free shipping on heavy, bulky, fragile, or low-margin items without checking cost.",
              "Accepting buyer offers without remembering that shipping is still paid by the seller.",
              "Ignoring packaging materials, labels, tape, padding, and handling time.",
              "Assuming free shipping automatically improves sales enough to offset lower margin.",
              "Offering free shipping internationally without checking destination cost, fees, and return risk.",
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
          Useful eBay free shipping calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to test whether free shipping, pricing changes,
          offer discounts, and shipping cost assumptions still leave enough
          profit.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/shipping-profit-calculator", "eBay Shipping Profit Calculator"],
            ["/ebay/pricing-calculator", "eBay Pricing Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
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
          Simple eBay free shipping workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Estimate shipping cost",
              "Check actual postage, packaging, labels, handling time, and expected shipping zones.",
            ],
            [
              "Raise price if needed",
              "Build the shipping cost into the item price if free shipping would otherwise reduce profit.",
            ],
            [
              "Check offer room",
              "Review whether Best Offer, coupons, or markdowns still leave profit after free shipping.",
            ],
            [
              "Review actual results",
              "Compare conversion, sales price, shipping labels, refunds, and margin after orders begin.",
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
              "Actual postage or shipping label cost.",
              "Packaging materials, labels, boxes, tape, padding, and mailers.",
              "Product cost, repair cost, prep supplies, and labor time.",
              "eBay final value fees, fixed order fees, promoted listing fees, and optional fees.",
              "Expected offer discount, coupon, markdown, or counteroffer room.",
              "Return shipping, damaged packages, replacement shipments, and refund risk.",
              "Whether free shipping applies to all listings or only selected products.",
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
            When free shipping may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Lightweight products:</strong>{" "}
              Small, predictable items are often easier to price with free
              shipping because postage is more consistent.
            </p>

            <p>
              <strong className="text-gray-950">High-margin products:</strong>{" "}
              Free shipping is easier to support when the item already has
              enough profit after fees, shipping, and product cost.
            </p>

            <p>
              <strong className="text-gray-950">Competitive categories:</strong>{" "}
              Free shipping may help in categories where buyers compare total
              delivered price closely.
            </p>

            <p>
              <strong className="text-gray-950">Repeatable inventory:</strong>{" "}
              Free shipping is easier to test when you can compare multiple
              sales of similar items instead of relying on a single order.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay free shipping strategies to compare
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Free shipping on all items",
              "Simple for buyers, but risky if your products have different weights, zones, or margins.",
            ],
            [
              "Free shipping on selected items",
              "Use free shipping only where margin, weight, and demand make the strategy safer.",
            ],
            [
              "Buyer-paid shipping",
              "Keeps the item price lower and makes shipping cost more visible, but may affect buyer appeal.",
            ],
            [
              "Built-in shipping buffer",
              "Raise item price enough to cover postage, packaging, fees, returns, and expected offers.",
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
        eBay shipping costs, carrier rates, packaging costs, buyer behavior,
        promoted listing charges, return policies, taxes, and marketplace rules
        can change. This guide is for planning purposes. Always confirm current
        shipping settings, label prices, order results, and fulfillment costs in
        your eBay account and carrier tools.
      </div>
    </main>
  );
}