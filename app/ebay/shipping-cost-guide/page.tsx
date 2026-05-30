import Link from "next/link";

export default function EbayShippingCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Shipping Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay shipping costs can include postage, packaging, labels, handling
          time, free shipping subsidies, return shipping, international shipping,
          and shipping fee pressure. Sellers should estimate shipping cost before
          listing so buyer-paid shipping, free shipping, and flat-rate shipping
          do not quietly reduce profit.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay shipping costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Actual label cost",
              "The postage or carrier label cost needed to ship the order. This can vary by weight, dimensions, distance, service level, and carrier.",
            ],
            [
              "Packaging materials",
              "Boxes, padded mailers, poly mailers, tape, labels, bubble wrap, void fill, and other shipping supplies should be included.",
            ],
            [
              "Buyer-paid shipping",
              "The shipping amount charged to the buyer may not fully cover the actual label cost, packaging, and fee impact.",
            ],
            [
              "Free shipping cost",
              "Free shipping is paid by the seller unless it is built into the item price. It can improve buyer appeal but reduce profit.",
            ],
            [
              "Return shipping",
              "Return labels, damaged packages, replacement shipments, and buyer issue cases can add extra shipping cost after the sale.",
            ],
            [
              "International shipping risk",
              "International orders can involve higher postage, customs delays, international fees, return complications, and greater margin pressure.",
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
            Why eBay shipping cost matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Shipping can make a profitable eBay listing unprofitable if the
              actual label cost, packaging, handling time, and fee treatment are
              not included before pricing.
            </p>

            <p>
              Buyer-paid shipping does not automatically protect the seller. If
              the buyer pays less than the actual label and packaging cost, the
              difference becomes a shipping subsidy paid by the seller.
            </p>

            <p>
              The safest approach is to estimate shipping before publishing a
              listing, then compare estimated costs with actual label costs after
              orders begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay shipping mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Offering free shipping without raising the item price enough.",
              "Using buyer-paid shipping as profit without comparing it to actual label cost.",
              "Forgetting boxes, mailers, labels, tape, padding, and handling supplies.",
              "Charging the same shipping amount for items with very different weights or package sizes.",
              "Ignoring return shipping, replacement shipments, damaged packages, or lost mail risk.",
              "Offering international shipping without checking label cost, fees, and return complexity.",
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
          Useful eBay shipping calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate shipping profit, international shipping
          impact, item profitability, pricing, and fee pressure before changing
          shipping settings.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/shipping-profit-calculator", "eBay Shipping Profit Calculator"],
            [
              "/ebay/international-shipping-calculator",
              "eBay International Shipping Calculator",
            ],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
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
          Simple eBay shipping workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Measure the package",
              "Estimate packed weight, dimensions, package type, and shipping service before setting a price.",
            ],
            [
              "Compare buyer charge",
              "Check whether the buyer-paid shipping amount covers the label cost, packaging, and fee pressure.",
            ],
            [
              "Protect margin",
              "Build shipping gaps, free shipping, packaging, handling time, and return risk into your pricing.",
            ],
            [
              "Review actual orders",
              "After orders ship, compare actual label costs against estimated shipping cost and adjust future listings.",
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
              "Packed weight, package dimensions, box size, and shipping service.",
              "Boxes, mailers, labels, tape, padding, inserts, and shipping supplies.",
              "Shipping charged to the buyer and any free shipping subsidy.",
              "Packaging labor, handling time, and fulfillment supplies.",
              "Return shipping, replacement shipments, lost packages, damaged packages, and refund risk.",
              "International postage, customs complexity, international fees, and destination-specific risk.",
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
            How shipping affects eBay pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Buyer-paid shipping:</strong>{" "}
              The buyer covers some or all of the shipping charge, but sellers
              should compare that amount against the actual label cost,
              packaging cost, and fee impact.
            </p>

            <p>
              <strong className="text-gray-950">Free shipping:</strong> Free
              shipping can make listings more appealing, but the seller usually
              needs to build the shipping cost into the item price.
            </p>

            <p>
              <strong className="text-gray-950">Flat-rate shipping:</strong>{" "}
              Flat-rate shipping is simple for buyers, but it can undercharge
              heavy, bulky, distant, or international orders.
            </p>

            <p>
              <strong className="text-gray-950">International shipping:</strong>{" "}
              International orders may need extra margin because shipping cost,
              fees, customs delays, and return risk can be higher.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay shipping strategies to compare
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Calculated shipping",
              "Lets shipping cost adjust based on buyer location, package weight, dimensions, and carrier settings.",
            ],
            [
              "Flat-rate shipping",
              "Keeps the buyer charge simple but may overcharge some buyers and undercharge others.",
            ],
            [
              "Free shipping",
              "Can improve buyer appeal, but the cost should usually be included in the item price.",
            ],
            [
              "International shipping",
              "Can expand buyer reach, but should be reviewed carefully for fees, shipping gaps, and return risk.",
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
        eBay shipping costs, carrier rates, packaging prices, delivery times,
        international fees, customs rules, return shipping, refund decisions,
        and marketplace policies can change. This guide is for planning
        purposes. Always confirm actual shipping settings, label prices, and
        fulfillment costs in your eBay account and carrier tools.
      </div>
    </main>
  );
}