import Link from "next/link";

export default function EbayDiscountStrategyGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Discount Strategy Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay discounts can help sellers close sales, move slow inventory,
          encourage buyers to accept offers, and improve listing activity. But
          buyer offers, coupons, markdowns, free shipping, and promoted listing
          fees can reduce profit quickly if item cost, shipping, packaging,
          eBay fees, labor, and return risk are not included first.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay discount types sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Best Offer",
              "Buyer offers and seller counteroffers can help close sales, but the accepted offer should still cover product cost, shipping, eBay fees, and target profit.",
            ],
            [
              "Coupons",
              "Coupons can encourage purchases, repeat buyers, or larger carts, but they reduce the final amount kept by the seller.",
            ],
            [
              "Markdowns",
              "Markdown sales can help move older inventory, but sellers should compare the discounted price against all selling costs.",
            ],
            [
              "Volume discounts",
              "Multi-item or quantity discounts can increase order value, but shipping, packaging, and item cost still need to be included.",
            ],
            [
              "Free shipping discounts",
              "Free shipping can behave like a discount if the seller pays postage without raising the item price enough.",
            ],
            [
              "Promoted listing overlap",
              "Discounts can stack with promoted listing fees, making a sale less profitable than it appears from revenue alone.",
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
            Why eBay discount strategy matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A discount reduces revenue immediately, but most seller costs do
              not fall at the same rate. Item cost, shipping, packaging, eBay
              fees, promoted listing fees, labor, and refund risk may still
              apply after the sale price is lowered.
            </p>

            <p>
              Discounts can be useful when they help sell slow inventory, win a
              buyer offer, increase order volume, or clear products that are
              tying up cash. They are riskier when used on listings that already
              have weak profit after fees and fulfillment costs.
            </p>

            <p>
              The safest approach is to calculate the discounted profit before
              accepting an offer, running a coupon, or starting a markdown sale.
              Then compare actual order results after the promotion ends.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay discount mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Accepting offers without checking profit after eBay fees and shipping.",
              "Stacking discounts with promoted listing fees, coupons, markdowns, or free shipping.",
              "Using the same discount on every product even when margins are different.",
              "Discounting low-priced items where fixed fees already take a large share.",
              "Assuming more sales automatically means more profit.",
              "Ignoring refunds, returns, damaged items, packaging, labor, and customer support time.",
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
          Useful eBay discount calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to test buyer offers, markdowns, coupons, free
          shipping, promoted listing fees, and pricing room before reducing the
          sale price.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/offer-discount-calculator", "eBay Offer Discount Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/pricing-calculator", "eBay Pricing Calculator"],
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
          Simple eBay discount workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Check normal profit",
              "Start with the regular listing price and estimate profit after item cost, shipping, packaging, eBay fees, labor, and risk.",
            ],
            [
              "Apply the discount",
              "Subtract the buyer offer, coupon, markdown, or free shipping cost from the expected sale outcome.",
            ],
            [
              "Recalculate margin",
              "Compare discounted profit against your minimum acceptable profit and target margin.",
            ],
            [
              "Review performance",
              "Track whether the discount increases profitable sales or only creates lower-margin orders.",
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
              "Original listing price and accepted offer or discounted sale price.",
              "Discount percentage, coupon amount, markdown amount, or counteroffer gap.",
              "Item cost, repair cost, prep cost, cleaning supplies, and sourcing cost.",
              "Actual shipping label cost, buyer-paid shipping, free shipping subsidy, and packaging.",
              "Final value fees, fixed order fees, promoted listing fees, and optional listing fees.",
              "Refund risk, return shipping, damaged items, labor time, and customer support cost.",
              "Minimum acceptable profit, target margin, and inventory clearance goal.",
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
            When eBay discounts may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Slow inventory:</strong>{" "}
              Discounts can help recover cash from listings that have been
              sitting too long, but the sale should still protect profit or
              reduce a larger holding cost.
            </p>

            <p>
              <strong className="text-gray-950">Buyer offers:</strong> Best
              Offer can be useful when a seller knows the minimum acceptable
              price before negotiating.
            </p>

            <p>
              <strong className="text-gray-950">High-margin products:</strong>{" "}
              Discounts are easier to support when the product already has
              enough margin after fees, shipping, packaging, and labor.
            </p>

            <p>
              <strong className="text-gray-950">Repeat buyers:</strong> Coupons
              may help encourage repeat purchases when the discount is targeted
              and the order still protects margin.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay discount strategies to compare
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Best Offer",
              "Useful for negotiation, but each accepted offer should be tested against minimum profit.",
            ],
            [
              "Coupons",
              "Can help repeat buyers or targeted promotions, but should not be stacked blindly.",
            ],
            [
              "Markdown sale",
              "Useful for aging inventory, but should be compared against product cost and storage pressure.",
            ],
            [
              "Lower starting price",
              "May improve competitiveness, but reduces room for offers, ads, shipping gaps, and refunds.",
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
        eBay offer behavior, coupons, markdowns, promoted listing fees, category
        demand, shipping costs, refund rates, buyer behavior, taxes, and
        marketplace rules can change. This guide is for planning purposes.
        Always compare discount decisions against actual order costs and current
        eBay seller settings.
      </div>
    </main>
  );
}