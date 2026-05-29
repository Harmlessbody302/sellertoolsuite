import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          About SellerToolSuite
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          About SellerToolSuite
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          SellerToolSuite creates free calculators, guides, and planning tools
          designed to help online marketplace sellers make smarter business
          decisions.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          What SellerToolSuite does
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          Selling online often requires constant pricing decisions, fee
          calculations, inventory planning, margin analysis, and profitability
          forecasting.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite simplifies that process by providing calculators and
          educational resources that help sellers estimate outcomes before making
          operational decisions.
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-950">
            Calculator tools
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Interactive tools for pricing, fees, profitability, break-even
            analysis, ROI planning, conversion tracking, and inventory
            forecasting.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-950">
            Educational guides
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Practical guides designed to help sellers better understand margins,
            pricing strategy, fees, and long-term marketplace planning.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-950">
            Planning support
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Decision-support resources built to reduce guesswork and improve
            seller confidence.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Why SellerToolSuite exists
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          Many sellers rely on rough estimates, incomplete spreadsheets, or
          trial-and-error pricing.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite exists to make seller math easier to understand by
          turning complicated calculations into simple, practical tools that
          provide immediate planning estimates.
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Current platform coverage
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>• Etsy seller tools</li>
            <li>• Marketplace pricing calculators</li>
            <li>• Profitability planning tools</li>
            <li>• Inventory forecasting resources</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Future expansion
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            <li>• eBay seller tools</li>
            <li>• Amazon planning calculators</li>
            <li>• Shopify growth tools</li>
            <li>• Additional marketplace support</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Independence and transparency
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite is an independent educational resource.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite is not affiliated with, endorsed by, or sponsored by
          Etsy, eBay, Amazon, Shopify, Meta, or any other marketplace platform.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Explore SellerToolSuite
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy", "Etsy Tools"],
            ["/privacy-policy", "Privacy Policy"],
            ["/terms", "Terms & Disclaimer"],
            ["/etsy/profit-calculator", "Profit Calculator"],
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
          SellerToolSuite calculators provide planning estimates only and should
          be used alongside current marketplace fee schedules, business records,
          and seller-specific operational data.
        </p>
      </section>
    </main>
  );
}