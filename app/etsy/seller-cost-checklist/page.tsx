import Link from "next/link";

export default function EtsySellerCostChecklistPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Seller Cost Checklist
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Use this Etsy seller cost checklist to identify every expense that may
          affect pricing, profit margin, and long-term profitability before
          listing products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Why seller cost tracking matters
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          Many Etsy sellers underestimate total business costs by focusing only
          on materials and shipping.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          Small overlooked expenses can compound across dozens or hundreds of
          orders, significantly reducing real profit.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          Reviewing this checklist regularly helps sellers price more accurately
          and avoid underestimating operational costs.
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Product production costs
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            {[
              "Raw materials",
              "Component parts",
              "Packaging inserts",
              "Protective wrapping",
              "Product testing waste",
              "Production defects or scrap",
              "Equipment wear",
              "Tool replacement costs",
            ].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Fulfillment and shipping costs
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            {[
              "Shipping labels",
              "Postage",
              "Boxes and mailers",
              "Tape and packing supplies",
              "Shipping insurance",
              "Lost package replacement costs",
              "Return shipping",
              "Packaging labor",
            ].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-blue-300 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Etsy platform fees
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            {[
              "Listing fees",
              "Transaction fees",
              "Payment processing fees",
              "Offsite ad fees",
              "Etsy Ads spend",
              "Currency conversion costs",
              "Pattern or optional platform fees",
            ].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Sales-related reductions
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            {[
              "Coupons and discounts",
              "Free shipping offers",
              "Refunds",
              "Replacements",
              "Damaged order losses",
              "Customer service corrections",
              "Promotional markdowns",
            ].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Business overhead costs
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            [
              "Software",
              "Design tools, accounting software, listing tools, and automation subscriptions.",
            ],
            [
              "Workspace",
              "Storage, electricity, utilities, internet, and production space costs.",
            ],
            [
              "Administrative",
              "Bookkeeping, taxes, banking, business registration, and compliance costs.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Common overlooked Etsy costs
        </h2>

        <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
          {[
            "Labor time undervaluation",
            "Packaging waste",
            "Return-related losses",
            "Ad spend on low-converting listings",
            "Inventory spoilage or unsold stock",
            "Replacement orders for customer satisfaction",
            "Rising supplier costs over time",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                ×
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this checklist
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Review all costs",
              "Walk through every expense category before pricing products.",
            ],
            [
              "Calculate real profit",
              "Include all seller-paid expenses in your calculations.",
            ],
            [
              "Recheck regularly",
              "Review costs when fees, suppliers, or shipping rates change.",
            ],
            [
              "Adjust pricing",
              "Update pricing when costs rise to protect margins.",
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
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/profit-margin-guide", "Profit Margin Guide"],
            ["/etsy/fee-calculator", "Fee Calculator"],
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

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-sm leading-6 text-amber-900">
          Etsy seller profitability depends on accurate cost tracking. Even
          small overlooked expenses can compound over time and significantly
          reduce actual profit margin.
        </p>
      </section>
    </main>
  );
}