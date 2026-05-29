import Link from "next/link";

export default function HowToPriceEtsyProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          How to Price Etsy Products
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy pricing should cover product costs, shipping, packaging, labor,
          Etsy marketplace fees, payment processing, advertising costs, and your
          target profit margin. Good pricing protects both sales volume and
          long-term profitability.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          The 4-step Etsy pricing process
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Calculate costs",
              "Add materials, packaging, shipping supplies, labor, and all direct product costs.",
            ],
            [
              "Estimate Etsy fees",
              "Include listing fees, transaction fees, payment processing, and optional ad fees.",
            ],
            [
              "Set target profit",
              "Decide how much profit or margin each sale should generate.",
            ],
            [
              "Test final price",
              "Check whether your final price is competitive while still protecting margin.",
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
            Start with real costs
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Many Etsy sellers underprice products because they only count
              material costs.
            </p>

            <p>
              Real product pricing should include:
            </p>

            <ul className="space-y-2">
              <li>• Raw materials</li>
              <li>• Packaging supplies</li>
              <li>• Shipping supplies</li>
              <li>• Labor time</li>
              <li>• Equipment wear</li>
              <li>• Etsy fees</li>
              <li>• Ad spend</li>
              <li>• Refund and discount buffer</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Work backward from profit
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Avoid copying competitor prices blindly.
            </p>

            <p>
              Instead, determine:
            </p>

            <ul className="space-y-2">
              <li>• Your minimum acceptable profit</li>
              <li>• Your target margin percentage</li>
              <li>• Your ideal pricing range</li>
              <li>• How discounts affect final profit</li>
            </ul>

            <p>
              Your price should be based on your business needs, not just what
              similar listings charge.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Common Etsy pricing mistakes
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            "Pricing based only on competitor listings.",
            "Ignoring labor value.",
            "Forgetting shipping supply costs.",
            "Not accounting for Etsy fees.",
            "Running discounts without recalculating margin.",
            "Using too little profit buffer.",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600"
            >
              <span className="rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                ×
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Signs your Etsy pricing is too low
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>• High sales but weak profit</li>
            <li>• Discounts quickly erase margin</li>
            <li>• Ad traffic becomes unprofitable</li>
            <li>• Fee increases hurt viability</li>
            <li>• Small refunds significantly impact earnings</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Signs your Etsy pricing may be too high
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>• Strong traffic but poor conversion rate</li>
            <li>• Frequent cart abandonment</li>
            <li>• Weak repeat purchase behavior</li>
            <li>• Competitors consistently outperform similar listings</li>
            <li>• Discounts dramatically improve conversion</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Etsy pricing calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to build profitable Etsy pricing decisions.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/fee-calculator", "Etsy Fee Calculator"],
            ["/etsy/profit-calculator", "Profit Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
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

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        Pricing should be reviewed regularly. Etsy fee changes, shipping cost
        increases, supplier pricing shifts, and advertising costs can all affect
        your ideal listing price over time.
      </section>
    </main>
  );
}