import Link from "next/link";

export default function EtsyResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Seller Resources
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          A curated resource hub for Etsy sellers who want help with pricing,
          profit planning, shipping, bookkeeping, product research, design,
          listing optimization, and shop operations.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <h2 className="text-2xl font-bold text-amber-950">
          Affiliate disclosure
        </h2>

        <p className="mt-3 text-sm leading-7 text-amber-900">
          Some links on SellerToolSuite may be affiliate links. If you click a
          link and make a purchase, SellerToolSuite may receive compensation at
          no extra cost to you. Recommendations should still be reviewed based on
          your own shop needs, budget, and business goals.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Start with SellerToolSuite calculators
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          Before paying for outside tools or services, use these free
          calculators to understand your pricing, fees, margins, sales goals,
          and profitability.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/fee-calculator", "Fee Calculator"],
            ["/etsy/sales-goal-calculator", "Sales Goal Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
            ["/etsy/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/etsy/inventory-restock-calculator", "Inventory Restock Calculator"],
            ["/etsy/listing-roi-calculator", "Listing ROI Calculator"],
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

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Resources in this category should help sellers understand whether
            products are profitable, whether pricing is sustainable, and how
            fees affect margins.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Etsy fee calculators</li>
            <li>• Profit margin guides</li>
            <li>• Product cost tracking spreadsheets</li>
            <li>• Pricing strategy guides</li>
            <li>• Discount planning tools</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Shipping and fulfillment resources
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Shipping costs, packaging, delivery delays, returns, and replacement
            orders can all affect seller profit.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Shipping label tools</li>
            <li>• Packaging suppliers</li>
            <li>• Return policy resources</li>
            <li>• Shipping cost calculators</li>
            <li>• Inventory and restock planning tools</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Design and listing resources
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Strong photos, clear listing copy, useful mockups, and accurate
            product information can improve conversion and reduce refunds.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Product photo tools</li>
            <li>• Mockup generators</li>
            <li>• Design software</li>
            <li>• Listing optimization guides</li>
            <li>• Keyword research resources</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Bookkeeping and operations resources
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Operational tools help sellers track costs, organize records, review
            margins, and understand whether the shop is actually profitable.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Bookkeeping software</li>
            <li>• Expense tracking tools</li>
            <li>• Inventory tracking resources</li>
            <li>• Tax organization tools</li>
            <li>• Business planning templates</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Resource evaluation checklist
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          Before buying or subscribing to any seller tool, compare it against
          your current business needs and expected return.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Cost",
              "Does the monthly or one-time price make sense for your shop size?",
            ],
            [
              "Usefulness",
              "Will it solve a recurring problem or only be used once?",
            ],
            [
              "Profit impact",
              "Can it help increase sales, save time, reduce refunds, or improve margin?",
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
          Helpful Etsy guides
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/how-etsy-fees-work", "How Etsy Fees Work"],
            ["/etsy/how-to-price-etsy-products", "How to Price Etsy Products"],
            ["/etsy/profit-margin-guide", "Profit Margin Guide"],
            ["/etsy/seller-cost-checklist", "Seller Cost Checklist"],
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

        <p className="mt-4 text-sm leading-7 text-gray-600">
          This page can later include specific recommended seller tools,
          shipping resources, bookkeeping tools, design tools, listing research
          resources, and affiliate partnerships as SellerToolSuite grows.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-sm leading-6 text-amber-900">
          Resource recommendations are for general planning purposes only. Always
          compare pricing, features, terms, and suitability before using any
          third-party tool or service.
        </p>
      </section>
    </main>
  );
}