import Link from "next/link";

export default function HowEbayFeesWorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          How eBay Fees Work
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          eBay sellers need to account for final value fees, fixed order fees,
          promoted listing fees, store fees, insertion fees, international fees,
          shipping-related costs, refunds, and optional listing upgrades. These
          costs can reduce profit quickly if they are not included before
          pricing or accepting offers.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          The main eBay fees sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Final value fees",
              "A percentage-based fee applied to the order amount. This can include the item price, shipping charged to the buyer, and other order amounts depending on category and seller settings.",
            ],
            [
              "Fixed order fees",
              "A fixed per-order charge that can apply in addition to the percentage-based final value fee.",
            ],
            [
              "Promoted listing fees",
              "Advertising fees that may apply when a buyer clicks or interacts with a promoted listing and then purchases through an attributed sale.",
            ],
            [
              "Insertion fees",
              "Listing fees that may apply when a seller lists beyond free monthly listing allowances or uses certain listing formats.",
            ],
            [
              "Store subscription fees",
              "Monthly eBay Store subscription costs that may provide listing allowances, seller tools, and potential fee benefits depending on the tier.",
            ],
            [
              "International and optional fees",
              "International fee pressure, optional listing upgrades, subtitle fees, category-specific charges, return costs, and other selling costs can affect final profit.",
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
            Why estimating eBay fees matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              An eBay sale can look profitable from the sale price alone, but
              the real margin may be much lower after marketplace fees, promoted
              listing costs, shipping cost, packaging, returns, and sourcing
              cost are included.
            </p>

            <p>
              Fee estimates help sellers decide whether a listing price is high
              enough, whether an accepted offer is safe, whether promoted
              listings are worth using, and whether a product is worth
              restocking.
            </p>

            <p>
              The safest approach is to estimate fees before listing or
              accepting offers, then compare the estimate against actual order
              results after sales begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale revenue as profit before subtracting fees and costs.",
              "Forgetting that buyer-paid shipping may still be included in fee calculations.",
              "Using promoted listings without checking whether the ad fee leaves enough margin.",
              "Ignoring fixed order fees on lower-priced items.",
              "Forgetting store fees, insertion fees, optional listing upgrades, or international fees.",
              "Accepting offers without checking whether the lower sale price still covers eBay fees and shipping.",
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
          Useful eBay fee calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate fees, profit, pricing, store subscription
          value, promoted listing impact, and break-even points before making
          seller decisions.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/fee-calculator", "eBay Fee Calculator"],
            ["/ebay/profit-calculator", "eBay Profit Calculator"],
            ["/ebay/pricing-calculator", "eBay Pricing Calculator"],
            ["/ebay/store-fee-calculator", "eBay Store Fee Calculator"],
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
          Simple eBay fee workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Estimate fees",
              "Start with sale price, buyer-paid shipping, final value fee rate, fixed order fee, and promoted listing rate.",
            ],
            [
              "Subtract costs",
              "Include item cost, shipping label cost, packaging, returns, labor, and other seller expenses.",
            ],
            [
              "Check margin",
              "Make sure the remaining profit margin is high enough to survive offers, refunds, or shipping changes.",
            ],
            [
              "Review after sale",
              "Compare estimated fees against actual eBay order results and adjust pricing or promotion settings.",
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
              "Final value fee rate and fixed order fee.",
              "Promoted listing rate or ad-attributed fee impact.",
              "Item cost, sourcing cost, repair cost, and cleaning supplies.",
              "Actual shipping cost, packaging, labels, and handling materials.",
              "Store fee, insertion fee, optional listing upgrades, refunds, returns, and international fees when applicable.",
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
            How eBay fees affect pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Lower-priced items:</strong>{" "}
              Fixed order fees and shipping costs can take a larger share of
              lower-priced sales, making margin tighter.
            </p>

            <p>
              <strong className="text-gray-950">Promoted listings:</strong> Ad
              fees can help generate sales, but they also reduce profit if the
              listing was already thin-margin.
            </p>

            <p>
              <strong className="text-gray-950">Offers and discounts:</strong>{" "}
              Buyer offers, coupons, markdowns, and seller discounts should be
              tested after fees, not just against the original listing price.
            </p>

            <p>
              <strong className="text-gray-950">Shipping:</strong> Buyer-paid
              shipping does not automatically mean the seller is protected if
              the actual label, packaging, or fee treatment is higher than
              expected.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        eBay fee rates, category rules, promoted listing charges, store
        subscriptions, optional listing fees, international fees, refunds, taxes,
        and marketplace policies can change. This guide is for planning
        purposes. Always confirm current fee details in your eBay account and
        official eBay seller resources.
      </div>
    </main>
  );
}