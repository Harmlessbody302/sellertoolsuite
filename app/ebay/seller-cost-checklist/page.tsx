import Link from "next/link";

export default function EbaySellerCostChecklistPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Seller Cost Checklist
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay sellers should include every major selling cost before pricing,
          accepting offers, promoting listings, restocking inventory, or judging
          product profitability. This checklist helps identify the hidden costs
          that can turn a good-looking sale into a thin-margin or losing order.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay seller costs to check before listing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Product cost",
              "The item purchase price, sourcing cost, repair cost, cleaning cost, prep cost, and any supplies needed before the item can be listed.",
            ],
            [
              "eBay fees",
              "Final value fees, fixed order fees, promoted listing fees, store fees, insertion fees, optional listing upgrades, and international fees.",
            ],
            [
              "Shipping costs",
              "Actual label cost, buyer-paid shipping, free shipping subsidies, flat-rate shipping gaps, return shipping, and international shipping pressure.",
            ],
            [
              "Packaging costs",
              "Boxes, mailers, labels, tape, bubble wrap, padding, inserts, thank-you cards, and any supplies needed to ship safely.",
            ],
            [
              "Offer and discount costs",
              "Best Offer discounts, coupons, markdowns, promoted sales, counteroffers, and any price reduction used to close a sale.",
            ],
            [
              "Refund and return costs",
              "Full refunds, partial refunds, return labels, replacement shipments, damaged packages, item loss, and customer service time.",
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
            Why an eBay cost checklist matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              eBay profit can disappear when sellers only subtract the item cost
              from the sale price. Fees, shipping, packaging, promoted listing
              charges, offers, refunds, and labor can all reduce the amount
              actually kept.
            </p>

            <p>
              A checklist helps sellers price more consistently because each
              listing is reviewed against the same cost categories before it is
              published, promoted, discounted, or restocked.
            </p>

            <p>
              The safest approach is to use a cost checklist before listing,
              then compare estimated costs against actual order results after
              the sale is complete.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Only subtracting item cost from the sale price.",
              "Forgetting that buyer-paid shipping may not cover the actual label and packaging cost.",
              "Ignoring promoted listing fees when reviewing net profit.",
              "Accepting offers without checking the new margin.",
              "Forgetting repair, cleaning, prep, testing, photographing, listing, and packing time.",
              "Not building in any allowance for refunds, returns, damaged items, or customer support.",
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
          Useful eBay cost calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate product cost, profit, fees, shipping
          impact, offer room, and refund pressure before making listing
          decisions.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/product-cost-calculator", "eBay Product Cost Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/fee-calculator", "eBay Fee Calculator"],
            ["/ebay/shipping-profit-calculator", "eBay Shipping Profit Calculator"],
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
          Simple eBay cost checklist workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with item cost",
              "Record the product cost, repair cost, prep supplies, and any sourcing expense.",
            ],
            [
              "Add fulfillment",
              "Include shipping label cost, packaging materials, handling supplies, and labor time.",
            ],
            [
              "Add marketplace costs",
              "Estimate final value fees, fixed order fees, promoted listing fees, store fees, and optional listing costs.",
            ],
            [
              "Add risk allowance",
              "Include offer room, refunds, returns, damaged items, international risk, and customer support time.",
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
              "Item purchase price, sourcing cost, repair cost, and prep cost.",
              "Cleaning supplies, testing supplies, labels, boxes, tape, and packing materials.",
              "Actual shipping label cost and shipping charged to the buyer.",
              "Final value fee, fixed order fee, promoted listing fee, store fee, and optional listing fees.",
              "Best Offer discount, markdown, coupon, or counteroffer room.",
              "Refunds, returns, replacements, damaged items, return shipping, and customer service time.",
              "Labor time for sourcing, cleaning, photographing, listing, packing, and handling issues.",
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
            When to use the checklist
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Before listing:</strong> Use the
              checklist to choose a price that covers all expected selling costs.
            </p>

            <p>
              <strong className="text-gray-950">Before accepting offers:</strong>{" "}
              Recheck the cost structure before accepting a lower buyer offer or
              sending a counteroffer.
            </p>

            <p>
              <strong className="text-gray-950">Before promoting:</strong>{" "}
              Confirm that the listing can absorb promoted listing fees without
              becoming too thin.
            </p>

            <p>
              <strong className="text-gray-950">Before restocking:</strong>{" "}
              Review actual profit, refunds, shipping costs, and labor before
              buying more inventory.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay seller cost categories
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Required costs",
              "Item cost, eBay fees, shipping label cost, packaging, and payment/order fees.",
            ],
            [
              "Optional costs",
              "Promoted listings, listing upgrades, store subscriptions, subtitles, and markdown campaigns.",
            ],
            [
              "Risk costs",
              "Returns, refunds, damaged items, lost packages, disputes, stale inventory, and chargebacks.",
            ],
            [
              "Time costs",
              "Sourcing, cleaning, photographing, listing, packing, messaging, returns, and customer service.",
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
        eBay fees, shipping costs, promoted listing charges, store fees,
        insertion fees, return costs, buyer behavior, taxes, and marketplace
        rules can change. This checklist is for planning purposes. Always
        compare estimated costs with actual order results and current eBay fee
        settings.
      </div>
    </main>
  );
}