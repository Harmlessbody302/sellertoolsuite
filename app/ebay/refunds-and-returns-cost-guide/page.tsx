import Link from "next/link";

export default function EbayRefundsAndReturnsCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Refunds and Returns Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay refunds, returns, partial refunds, damaged packages, replacement
          shipments, buyer disputes, and case losses can reduce profit even when
          the original sale looked healthy. Sellers should estimate refund and
          return costs before pricing, accepting offers, promoting listings, or
          restocking inventory.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay refund and return costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Full refunds",
              "A full refund can remove the order revenue while the seller may still have spent money on shipping, packaging, fees, labor, or item prep.",
            ],
            [
              "Partial refunds",
              "A partial refund reduces order revenue and can be used to resolve condition issues, buyer complaints, shipping delays, or minor item problems.",
            ],
            [
              "Return shipping",
              "Return labels may be paid by the buyer or seller depending on the reason, policy, platform decision, and seller handling choice.",
            ],
            [
              "Replacement shipments",
              "A replacement order may require another item, another package, another shipping label, and additional handling time.",
            ],
            [
              "Damaged or lost packages",
              "Carrier issues, packaging failures, item damage, and lost mail can create refund pressure even if the original listing was priced correctly.",
            ],
            [
              "Case and dispute losses",
              "Buyer cases, payment disputes, forced refunds, customer service time, and poor issue handling can reduce seller profit and account performance.",
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
            Why refund and return costs matter
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A refund does not always undo the seller&apos;s cost. The product
              may have been sourced, cleaned, repaired, photographed, packaged,
              shipped, and promoted before the buyer receives money back.
            </p>

            <p>
              Returns can be especially expensive when the returned item cannot
              be resold at the same price, arrives damaged, requires testing or
              cleaning, or creates extra customer service work.
            </p>

            <p>
              The safest approach is to build a realistic refund and return
              allowance into pricing, then review actual order issues so weak
              products, unclear listings, poor packaging, or risky shipping
              choices can be fixed.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay refund mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating refunded revenue as if it still produced profit.",
              "Forgetting shipping label cost, packaging, and handling time already spent on the order.",
              "Ignoring return shipping cost when estimating the true cost of a return.",
              "Assuming every returned item can be resold at the original sale price.",
              "Sending replacements without calculating the extra item cost and shipping cost.",
              "Restocking or promoting products with repeated issue rates before fixing the root cause.",
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
          Useful eBay refund calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate refund impact, profit after seller costs,
          product cost, pricing room, and listing-level return risk before
          scaling or promoting listings.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/refund-impact-calculator", "eBay Refund Impact Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/product-cost-calculator", "eBay Product Cost Calculator"],
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
          Simple eBay refund cost workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with order profit",
              "Estimate normal profit after item cost, shipping, packaging, eBay fees, ads, labor, and other costs.",
            ],
            [
              "Apply refund cost",
              "Subtract the full refund, partial refund, return shipping, item loss, replacement cost, or case loss.",
            ],
            [
              "Check remaining margin",
              "Review whether the order or listing still remains profitable after refund-related costs.",
            ],
            [
              "Update pricing",
              "Build a realistic refund, return, damage, and support allowance into future pricing if issues are common.",
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
              "Original order revenue and buyer-paid shipping.",
              "Refund amount, partial refund amount, or case/dispute loss.",
              "Original shipping label cost and packaging already used.",
              "Return shipping cost if paid by the seller.",
              "Replacement product cost and replacement shipping cost if applicable.",
              "Returned item resale value, damaged item loss, testing, cleaning, and restocking time.",
              "Customer service time, message handling, buyer issue patterns, and future return risk.",
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
            How refunds affect eBay pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Low-margin products:</strong>{" "}
              Refunds are harder to absorb when a product already has limited
              profit after eBay fees, shipping, packaging, labor, and ad costs.
            </p>

            <p>
              <strong className="text-gray-950">Fragile products:</strong>{" "}
              Fragile, heavy, or delicate items may need stronger packaging,
              higher prices, insurance, or more selective shipping settings.
            </p>

            <p>
              <strong className="text-gray-950">Used products:</strong> Used,
              vintage, refurbished, and open-box items may need clearer
              condition notes, photos, testing, and return expectations.
            </p>

            <p>
              <strong className="text-gray-950">Repeat issues:</strong> If one
              product causes repeated refunds or returns, the listing may need
              new photos, a clearer description, better packaging, or a higher
              price.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce eBay refund and return costs
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve item accuracy",
              "Use clear titles, exact condition notes, measurements, defects, compatibility details, and item specifics.",
            ],
            [
              "Improve photos",
              "Show real item condition, flaws, scale, labels, serial/model details, and important buyer expectations.",
            ],
            [
              "Improve packaging",
              "Use stronger boxes, padding, waterproofing, and safer handling for fragile or valuable items.",
            ],
            [
              "Track return reasons",
              "Review return patterns so weak products, unclear listings, bad packaging, or shipping issues can be fixed.",
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
        eBay refund policies, return rules, seller protections, buyer disputes,
        payment disputes, return shipping costs, damaged package claims, fee
        treatment, taxes, and marketplace rules can change. This guide is for
        planning purposes. Always confirm current refund and return details in
        your eBay account and official eBay seller resources.
      </div>
    </main>
  );
}