import Link from "next/link";

const platforms = [
  {
    name: "Etsy",
    status: "Full Toolkit",
    count: "15 Tools",
    description:
      "Complete Etsy seller calculator suite for profit, pricing, shipping, ads, refunds, conversion, and inventory planning.",
    href: "/etsy",
  },
  {
    name: "eBay",
    status: "Full Toolkit",
    count: "15 Tools",
    description:
      "Live calculators for eBay fees, pricing, shipping, offers, and seller profitability.",
    href: "/ebay",
  },
  {
    name: "Amazon",
    status: "Full Toolkit",
    count: "15 Tools",
    description:
      "Live tools for Amazon seller fees, margins, fulfillment planning, and product profitability.",
    href: "/amazon",
  },
  {
    name: "Shopify",
    status: "Full Toolkit",
    count: "15 Tools",
    description:
      "Live tools for Shopify store pricing, fees, ad performance, conversion planning, and overall store profitability.",
    href: "/shopify",
  },
  {
    name: "Mercari",
    status: "Growing",
    count: "5 Tools",
    description:
      "Live resale calculators for Mercari pricing, fees, shipping, and seller profit planning.",
    href: "/mercari",
  },
  {
    name: "Poshmark",
    status: "Growing",
    count: "5 Tools",
    description:
      "Live seller tools for closet pricing, bundles, offers, shipping, and resale margin planning.",
    href: "/poshmark",
  },
  {
    name: "Facebook Marketplace",
    status: "Growing",
    count: "5 Tools",
    description:
      "Live local resale calculators for pricing, negotiation, shipping, and inventory planning.",
    href: "/facebook-marketplace",
  },
];

const popularTools = [
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
    description:
      "Estimate real Etsy profit after fees, shipping, packaging, labor, and product costs.",
  },
  {
    title: "Etsy Pricing Calculator",
    href: "/etsy/pricing-calculator",
    description:
      "Find sustainable listing prices based on margin and profit goals.",
  },
  {
    title: "Etsy Ad ROI Calculator",
    href: "/etsy/ad-roi-calculator",
    description:
      "Estimate whether Etsy ads are generating profitable sales.",
  },
  {
    title: "eBay Profit Calculator",
    href: "/ebay/profit-calculator",
    description:
      "Estimate eBay seller profit after marketplace fees and shipping costs.",
  },
  {
    title: "Amazon Fee Calculator",
    href: "/amazon/fee-calculator",
    description:
      "Estimate referral and fulfillment costs for Amazon listings.",
  },
  {
    title: "Mercari Profit Calculator",
    href: "/mercari/profit-calculator",
    description:
      "Estimate resale profitability after Mercari fees and shipping.",
  },
];

const benefits = [
  {
    title: "105+ live seller tools",
    description:
      "Practical calculators spanning pricing, profit, shipping, fees, ads, inventory, and planning.",
  },
  {
    title: "Marketplace-specific systems",
    description:
      "Each platform toolkit is built around the fee structures and workflows sellers actually use.",
  },
  {
    title: "Fast decision support",
    description:
      "Get clear estimates and actionable insights before making pricing or scaling decisions.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          SellerToolSuite
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight text-gray-950">
          Free calculators and planning tools for marketplace sellers
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Access live seller calculators across Etsy, eBay, Amazon, Mercari,
          Poshmark, and Facebook Marketplace to estimate fees, pricing,
          profitability, shipping costs, ad performance, and seller growth.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/etsy"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Explore Etsy Tools
          </Link>

          <a
            href="#platforms"
            className="rounded-xl border border-gray-400 bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100"
          >
            View Platforms
          </a>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live multi-platform toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          105+ live marketplace seller calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          SellerToolSuite is now live across multiple selling platforms, with
          Etsy as the deepest toolkit and additional marketplace systems
          expanding continuously.
        </p>
      </section>

      <section id="platforms" className="mt-14">
        <h2 className="text-3xl font-bold text-gray-950">
          Marketplace tool sections
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a marketplace to access live calculators designed specifically
          for that selling platform.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <Link
              key={platform.name}
              href={platform.href}
              className="rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-950">
                  {platform.name}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    platform.status === "Full Toolkit"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {platform.status}
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-500">
                {platform.count}
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {platform.description}
              </p>

              <p className="mt-5 text-sm font-bold text-blue-700">
                Explore tools →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border bg-white p-8">
        <h2 className="text-3xl font-bold text-gray-950">
          Popular live tools
        </h2>

        <p className="mt-3 text-gray-600">
          Start with some of the most-used calculators across SellerToolSuite.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-950">
                {tool.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {tool.description}
              </p>

              <p className="mt-4 text-sm font-bold text-blue-700">
                Open tool →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-gray-950">
          Why use SellerToolSuite?
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border bg-white p-6"
            >
              <h3 className="text-lg font-bold text-gray-950">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-blue-300 bg-blue-50 p-8">
        <h2 className="text-3xl font-bold text-gray-950">
          Built for serious marketplace sellers
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-gray-700">
          SellerToolSuite helps online sellers estimate profitability before
          pricing products, adjusting shipping, offering discounts, running ads,
          and scaling inventory across multiple selling platforms.
        </p>
      </section>
    </main>
  );
}