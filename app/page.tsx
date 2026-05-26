export default function EtsyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Etsy Seller Tools
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Free Etsy seller calculators and tools
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Estimate Etsy fees, product pricing, profit margins, break-even
          points, and sales goals with simple tools built for Etsy sellers.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/etsy/profit-calculator"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">Etsy Profit Calculator</h2>
            <p className="mt-2 text-sm text-slate-600">
              Estimate your profit after Etsy fees, product costs, shipping,
              packaging, and ads.
            </p>
          </a>

          <a
            href="/etsy/fee-calculator"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">Etsy Fee Calculator</h2>
            <p className="mt-2 text-sm text-slate-600">
              Estimate how much Etsy may take from a sale.
            </p>
          </a>

          <a
            href="/etsy/pricing-calculator"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">Etsy Pricing Calculator</h2>
            <p className="mt-2 text-sm text-slate-600">
              Work backward from your costs and target profit to find a better
              selling price.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}