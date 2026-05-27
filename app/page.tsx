import Link from "next/link";

const platforms = [
  {
    name: "Etsy",
    status: "Live",
    description:
      "Profit, fee, pricing, shipping, ads, conversion, and listing planning calculators for Etsy sellers.",
    href: "/etsy",
    button: "Explore tools",
  },
  {
    name: "eBay",
    status: "Live",
    description:
      "Tools for eBay seller fees, profit, shipping, offers, and pricing.",
    href: "/ebay",
    button: "Explore Tools",
  },
  {
    name: "Amazon",
    status: "Live",
    description:
      "Tools for FBA fees, referral fees, margins, inventory, and seller planning.",
    href: "/amazon",
    button: "Explore Tools",
  },
  {
    name: "Shopify",
    status: "Live",
    description:
      "Tools for store pricing, margins, ads, conversion, and profit planning.",
    href: "/shopify",
    button: "Explore Tools",
  },
  {
    name: "Mercari",
    status: "Live",
    description:
      "Tools for marketplace fees, shipping, offers, resale profit, and pricing.",
    href: "/mercari",
    button: "Explore Tools",
  },
  {
    name: "Poshmark",
    status: "Live",
    description:
      "Tools for closet sellers, fees, offers, bundles, shipping, and profit estimates.",
    href: "/poshmark",
    button: "Explore Tools",
  },
  {
    name: "Facebook Marketplace",
    status: "Live",
    description:
      "Tools for local resale pricing, profit, inventory planning, and negotiation.",
    href: "/facebook-marketplace",
    button: "Explore Tools",
  },
];

const popularTools = [
  {
    title: "Etsy Profit Calculator",
    description:
      "Estimate profit after Etsy fees, product costs, shipping, packaging, labor, and discounts.",
    href: "/etsy/profit-calculator",
  },
  {
    title: "Etsy Fee Calculator",
    description:
      "Estimate listing fees, transaction fees, payment processing fees, and optional ad fees.",
    href: "/etsy/fee-calculator",
  },
  {
    title: "Etsy Pricing Calculator",
    description:
      "Find a selling price based on your costs, desired profit, or target margin.",
    href: "/etsy/pricing-calculator",
  },
  {
    title: "Etsy Ad ROI Calculator",
    description:
      "Estimate whether Etsy ads are helping or hurting your profit after ad spend.",
    href: "/etsy/ad-roi-calculator",
  },
  {
    title: "Etsy Conversion Rate Calculator",
    description:
      "Calculate your Etsy conversion rate and estimate the traffic needed to hit order goals.",
    href: "/etsy/conversion-rate-calculator",
  },
  {
    title: "Etsy Shipping Profit Calculator",
    description:
      "Analyze free shipping, flat-rate shipping, and fulfillment cost impact on Etsy profit.",
    href: "/etsy/shipping-profit-calculator",
  },
];

const benefits = [
  {
    title: "Free seller calculators",
    description:
      "Use practical calculators for pricing, fees, profit, ads, shipping, and planning.",
  },
  {
    title: "Marketplace-specific tools",
    description:
      "Each platform section is designed around the way that marketplace actually works.",
  },
  {
    title: "Built for fast decisions",
    description:
      "Get clear numbers, plain-English explanations, and practical seller recommendations.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            SellerToolSuite
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Free calculators and planning tools for online sellers
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate marketplace fees, profit margins, product pricing,
            shipping impact, ad performance, and seller goals across major
            online selling platforms.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/etsy"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Etsy Tools
            </Link>

            <a
              href="#platforms"
              className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              View Platforms
            </a>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-yellow-800">
            Development notice
          </p>

          <h2 className="text-2xl font-bold">
            SellerToolSuite is expanding by platform
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-yellow-900">
            Etsy tools are live now. Additional marketplace sections are being
            built in stages and may appear as work-in-progress pages until their
            calculator collections are complete.
          </p>
        </section>

        <section id="platforms" className="mt-14">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Marketplace tool sections</h2>
            <p className="mt-2 text-slate-600">
              Choose a platform to view calculators and planning tools designed
              for that marketplace.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.href}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{platform.name}</h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      platform.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {platform.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {platform.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  {platform.button} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Popular seller tools</h2>
              <p className="mt-2 text-slate-600">
                Start with a few of the most useful live calculators.
              </p>
            </div>

            <Link
              href="/etsy"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all Etsy tools →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{tool.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Open tool →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Why use SellerToolSuite?</h2>
            <p className="mt-2 text-slate-600">
              Simple calculators built for sellers who need fast estimates and
              practical planning help.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{benefit.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}