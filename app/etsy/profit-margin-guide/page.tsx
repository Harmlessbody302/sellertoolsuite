import Link from "next/link";

export default function EtsyProfitMarginGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Profit Margin Guide
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Learn how Etsy profit margin works, what affects it, what healthy
          margins look like, and how to improve profitability across your shop.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          What profit margin means
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          Profit margin shows how much of each Etsy sale remains as profit after
          accounting for product costs, Etsy fees, payment processing, shipping,
          packaging, labor, discounts, and other seller-paid expenses.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          It is one of the most important metrics Etsy sellers can track because
          strong revenue with weak margins can still produce poor business
          results.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Basic profit margin formula
        </h2>

        <div className="mt-6 rounded-xl bg-white p-6 text-center">
          <p className="text-xl font-bold text-gray-950">
            Profit Margin = Net Profit ÷ Revenue × 100
          </p>
        </div>

        <p className="mt-6 leading-8 text-gray-700">
          Example: If a product sells for $30 and generates $9 in estimated net
          profit, the estimated margin is 30%.
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Healthy Etsy profit margins
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7">
            <p>
              <strong className="text-red-700">Under 10%</strong> — High risk
            </p>

            <p>
              <strong className="text-amber-700">10–20%</strong> — Thin margin
            </p>

            <p>
              <strong className="text-green-700">20–35%</strong> — Healthy
            </p>

            <p>
              <strong className="text-emerald-700">35%+</strong> — Strong
              profit
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why margins change
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>• Rising material costs</li>
            <li>• Etsy fee changes</li>
            <li>• Free shipping offers</li>
            <li>• Discount promotions</li>
            <li>• Advertising costs</li>
            <li>• Refunds and replacements</li>
            <li>• Labor time increases</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Common profit margin mistakes
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Ignoring labor costs",
            "Forgetting packaging expenses",
            "Using revenue as profit",
            "Running discounts without recalculating",
            "Ignoring Etsy processing fees",
            "Not reviewing margins regularly",
          ].map((mistake) => (
            <div
              key={mistake}
              className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700"
            >
              {mistake}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          How to improve Etsy profit margin
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            [
              "Raise pricing carefully",
              "Test higher pricing without harming conversion.",
            ],
            [
              "Reduce production cost",
              "Optimize suppliers and materials.",
            ],
            [
              "Improve efficiency",
              "Reduce labor time per order.",
            ],
            [
              "Limit unnecessary discounts",
              "Protect long-term margin health.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Etsy profit tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
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
          Etsy profit margins should be reviewed regularly. Fee updates,
          supplier cost changes, shipping rate increases, and ad costs can all
          affect product profitability over time.
        </p>
      </section>
    </main>
  );
}