import Link from "next/link";

export default function EbaySellerResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Seller Resources
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          A curated resource hub for eBay sellers who want help with pricing,
          profit planning, fees, shipping, promoted listings, inventory,
          product research, listing optimization, and selling operations.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <h2 className="text-2xl font-bold text-amber-950">
          Affiliate disclosure
        </h2>

        <p className="mt-4 text-sm leading-6 text-amber-900">
          Some links on SellerToolSuite may be affiliate links. If you click a
          link and make a purchase, SellerToolSuite may receive compensation at
          no extra cost to you. Recommendations should still be reviewed based
          on your own eBay store needs, budget, and business goals.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Start with SellerToolSuite calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Before paying for outside tools or services, use these free
          calculators to understand your eBay pricing, fees, profit, shipping,
          offers, inventory, ads, and listing performance.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/fee-calculator", "Fee Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
            ["/ebay/shipping-profit-calculator", "Shipping Profit Calculator"],
            ["/ebay/offer-discount-calculator", "Offer Discount Calculator"],
            ["/ebay/promoted-listing-roi-calculator", "Promoted Listing ROI Calculator"],
            ["/ebay/product-cost-calculator", "Product Cost Calculator"],
            ["/ebay/inventory-restock-calculator", "Inventory Restock Calculator"],
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

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Pricing and profit resources
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Resources in this category should help sellers understand whether
            eBay products are profitable, whether pricing is sustainable, and
            how fees affect margins.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• eBay fee calculators</li>
            <li>• Profit margin guides</li>
            <li>• Product cost tracking spreadsheets</li>
            <li>• Sold comp research tools</li>
            <li>• Pricing strategy guides</li>
            <li>• Discount and offer planning tools</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Shipping and fulfillment resources
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Shipping cost, packaging, delivery speed, return labels, and
            international orders can all affect eBay seller profit.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Shipping label tools</li>
            <li>• Packaging suppliers</li>
            <li>• Package size and weight guides</li>
            <li>• Return policy resources</li>
            <li>• Shipping cost calculators</li>
            <li>• International shipping planning tools</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Listing and research resources
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Strong eBay listings need accurate photos, clear titles, complete
            item specifics, competitive pricing, and realistic sold-comp
            research.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Sold listing research tools</li>
            <li>• Product photo tools</li>
            <li>• Listing title optimization guides</li>
            <li>• Item specifics checklists</li>
            <li>• Condition note templates</li>
            <li>• Keyword and category research resources</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Bookkeeping and operations resources
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Operational tools help sellers track costs, organize records, review
            margins, manage inventory, and understand whether the store is
            actually profitable.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Bookkeeping software</li>
            <li>• Expense tracking tools</li>
            <li>• Inventory tracking resources</li>
            <li>• Tax organization tools</li>
            <li>• Refund and return tracking sheets</li>
            <li>• Business planning templates</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Resource evaluation checklist
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Before buying or subscribing to any eBay seller tool, compare it
          against your current business needs and expected return.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Cost",
              "Does the monthly or one-time price make sense for your current eBay sales volume?",
            ],
            [
              "Usefulness",
              "Will it solve a recurring problem or only be used once?",
            ],
            [
              "Profit impact",
              "Can it help increase sales, save time, reduce refunds, improve sourcing, or protect margin?",
            ],
            [
              "Complexity",
              "Is it simple enough to use consistently without slowing you down?",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Helpful eBay guides
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/how-ebay-fees-work", "How eBay Fees Work"],
            ["/ebay/how-to-price-ebay-products", "How to Price eBay Products"],
            ["/ebay/profit-margin-guide", "Profit Margin Guide"],
            ["/ebay/seller-cost-checklist", "Seller Cost Checklist"],
            ["/ebay/shipping-cost-guide", "Shipping Cost Guide"],
            ["/ebay/free-shipping-strategy", "Free Shipping Strategy"],
            ["/ebay/promoted-listing-fees", "Promoted Listing Fees"],
            ["/ebay/discount-strategy-guide", "Discount Strategy Guide"],
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

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          More eBay planning guides
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/refunds-and-returns-cost-guide", "Refunds and Returns Cost Guide"],
            ["/ebay/listing-roi-guide", "Listing ROI Guide"],
            ["/ebay/conversion-rate-guide", "Conversion Rate Guide"],
            ["/ebay/inventory-restock-guide", "Inventory Restock Guide"],
            ["/ebay/sales-goal-planning-guide", "Sales Goal Planning Guide"],
            ["/ebay/store-fee-guide", "Store Fee Guide"],
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
          Resources coming soon
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          This page can later include specific recommended seller tools,
          shipping resources, bookkeeping tools, research tools, photo tools,
          sourcing tools, listing optimization resources, and affiliate
          partnerships as SellerToolSuite grows.
        </p>
      </section>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        Resource recommendations are for general planning purposes only. Always
        compare pricing, features, current terms, seller requirements, and
        suitability before using any third-party tool or service.
      </div>
    </main>
  );
}