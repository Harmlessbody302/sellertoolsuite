import Link from "next/link";

const etsyTools = [
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
    description:
      "Estimate profit after Etsy fees, product costs, shipping, packaging, labor, and discounts.",
  },
  {
    title: "Etsy Fee Calculator",
    href: "/etsy/fee-calculator",
    description:
      "Estimate listing fees, transaction fees, payment processing fees, and optional ad fees.",
  },
  {
    title: "Etsy Pricing Calculator",
    href: "/etsy/pricing-calculator",
    description:
      "Find a selling price based on your costs, desired profit, or target margin.",
  },
  {
  title: "Etsy Break-Even Calculator",
  href: "/etsy/break-even-calculator",
  description:
    "Estimate how many sales you need to cover fixed shop costs and start turning a profit.",
},
{
  title: "Etsy Sales Goal Calculator",
  href: "/etsy/sales-goal-calculator",
  description:
    "Work backward from a monthly income goal to estimate sales, revenue, and order targets.",
},
{
  title: "Etsy Ad ROI Calculator",
  href: "/etsy/ad-roi-calculator",
  description:
    "Estimate whether Etsy ads are helping or hurting your profit after ad spend.",
},
];

export default function EtsyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Live Platform
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight text-gray-950">
          Etsy Seller Tools
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Use free Etsy seller calculators to estimate profit, fees, pricing,
          margins, and product costs before listing or scaling products.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-green-200 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Etsy tools are live
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          Available Etsy calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          These Etsy calculators are active and usable now. More Etsy seller
          tools and guides can be added over time.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-950">
          Etsy calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate your Etsy selling numbers.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {etsyTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-950">{tool.title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {tool.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-blue-700">
                Open tool →
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-16">
  <h2 className="text-3xl font-bold text-gray-950">
    Etsy Seller Guides
  </h2>

  <p className="mt-3 max-w-3xl leading-7 text-gray-600">
    Learn how Etsy fees, pricing, margins, and seller costs affect your shop.
  </p>

  <div className="mt-6 grid gap-5 md:grid-cols-2">
    <Link
      href="/etsy/how-etsy-fees-work"
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-bold text-gray-950">
        How Etsy Fees Work
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Learn the common Etsy fees that can affect seller profit.
      </p>
    </Link>

    <Link
      href="/etsy/how-to-price-etsy-products"
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-bold text-gray-950">
        How to Price Etsy Products
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Understand how costs, fees, labor, and profit goals affect product pricing.
      </p>
    </Link>

    <Link
      href="/etsy/profit-margin-guide"
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-bold text-gray-950">
        Etsy Profit Margin Guide
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Learn how profit margin works and why revenue is not the same as profit.
      </p>
    </Link>

    <Link
      href="/etsy/seller-cost-checklist"
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-bold text-gray-950">
        Etsy Seller Cost Checklist
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Review common seller costs before pricing or scaling an Etsy product.
      </p>
    </Link>

    <Link
      href="/etsy/seller-resources"
      className="rounded-2xl border bg-blue-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:col-span-2"
    >
      <h3 className="text-lg font-bold text-gray-950">
        Etsy Seller Resources
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Future recommended tools, services, and affiliate resources for Etsy sellers.
      </p>
    </Link>
  </div>
</section>
    </main>
  );
}