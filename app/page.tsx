import Link from "next/link";

const platforms = [
  {
    name: "Etsy",
    href: "/etsy",
    status: "Live",
    description:
      "Profit, fee, and pricing calculators for Etsy sellers.",
  },
  {
    name: "eBay",
    href: "/ebay",
    status: "Work in progress",
    description:
      "Future tools for eBay seller fees, profit, shipping, and pricing.",
  },
  {
    name: "Amazon",
    href: "/amazon",
    status: "Work in progress",
    description:
      "Future tools for FBA, referral fees, margins, and seller planning.",
  },
  {
    name: "Shopify",
    href: "/shopify",
    status: "Work in progress",
    description:
      "Future tools for store pricing, margins, ads, and conversion planning.",
  },
  {
    name: "Mercari",
    href: "/mercari",
    status: "Work in progress",
    description:
      "Future tools for marketplace fees, shipping, and resale profit.",
  },
  {
    name: "Poshmark",
    href: "/poshmark",
    status: "Work in progress",
    description:
      "Future tools for closet sellers, fees, offers, and profit estimates.",
  },
  {
    name: "Facebook Marketplace",
    href: "/facebook-marketplace",
    status: "Work in progress",
    description:
      "Future tools for local resale pricing, profit, and inventory planning.",
  },
];

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

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          SellerToolSuite
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight text-gray-950">
          Free calculators and planning tools for online sellers
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Estimate marketplace fees, profit margins, product pricing, and seller
          goals across platforms. Etsy tools are live now, with more marketplace
          tool sections in progress.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/etsy"
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white"
          >
            Use Etsy Tools
          </Link>

          <Link
            href="#platforms"
            className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-gray-950"
          >
            View Platforms
          </Link>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-900">
          Development Notice
        </p>

        <h2 className="mt-2 text-2xl font-bold text-amber-950">
          SellerToolSuite is being built in stages
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-amber-900">
          The Etsy calculators are currently live. Other marketplace sections
          are planned and may appear as work-in-progress pages until their tools
          are fully built, tested, and reviewed.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-950">Live Etsy tools</h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Start with the available Etsy seller calculators below.
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

      <section id="platforms" className="mt-16">
        <h2 className="text-3xl font-bold text-gray-950">
          Marketplace tool sections
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          SellerToolSuite will expand into multiple online selling platforms
          over time. Etsy is live first; the other sections are marked clearly as
          work in progress.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => {
            const isLive = platform.status === "Live";

            return (
              <Link
                key={platform.name}
                href={platform.href}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-950">
                    {platform.name}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      isLive
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {platform.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {platform.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-700">
                  {isLive ? "Open tools →" : "Preview section →"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}