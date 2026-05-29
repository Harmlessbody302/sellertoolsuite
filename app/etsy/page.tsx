import Link from "next/link";

const calculators = [
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
    description:
      "Estimate profit after Etsy fees, product costs, shipping, packaging, labor, and discounts.",
    category: "Profitability",
  },
  {
    title: "Etsy Fee Calculator",
    href: "/etsy/fee-calculator",
    description:
      "Estimate listing fees, transaction fees, payment processing fees, and optional ad costs.",
    category: "Fees",
  },
  {
    title: "Etsy Pricing Calculator",
    href: "/etsy/pricing-calculator",
    description:
      "Find pricing based on costs, desired profit, or target margin.",
    category: "Pricing",
  },
  {
    title: "Etsy Break-Even Calculator",
    href: "/etsy/break-even-calculator",
    description:
      "Estimate how many sales are needed to cover fixed costs.",
    category: "Pricing",
  },
  {
    title: "Etsy Sales Goal Calculator",
    href: "/etsy/sales-goal-calculator",
    description:
      "Work backward from a monthly income goal to estimate required orders and revenue.",
    category: "Growth",
  },
  {
    title: "Etsy Ad ROI Calculator",
    href: "/etsy/ad-roi-calculator",
    description:
      "Estimate whether Etsy ads are generating profitable sales after ad spend and marketplace fees.",
    category: "Advertising",
  },
  {
    title: "Discount Impact Calculator",
    href: "/etsy/discount-impact-calculator",
    description:
      "See how discounts affect margin, revenue, and overall profit.",
    category: "Pricing",
  },
  {
    title: "Etsy Conversion Rate Calculator",
    href: "/etsy/conversion-rate-calculator",
    description:
      "Estimate conversion rate and traffic requirements for growth.",
    category: "Growth",
  },
  {
    title: "Etsy Listing ROI Calculator",
    href: "/etsy/listing-roi-calculator",
    description:
      "Estimate whether listings are worth keeping, improving, advertising, or retiring.",
    category: "Growth",
  },
  {
    title: "Etsy Shipping Profit Calculator",
    href: "/etsy/shipping-profit-calculator",
    description:
      "Estimate how shipping costs and buyer shipping charges affect profitability.",
    category: "Shipping",
  },
  {
    title: "Etsy Bundle Pricing Calculator",
    href: "/etsy/bundle-pricing-calculator",
    description:
      "Test bundle discounts while protecting margin.",
    category: "Pricing",
  },
  {
    title: "Etsy Inventory Restock Calculator",
    href: "/etsy/inventory-restock-calculator",
    description:
      "Estimate restock timing and ideal reorder quantities.",
    category: "Inventory",
  },
  {
    title: "Etsy Refund Impact Calculator",
    href: "/etsy/refund-impact-calculator",
    description:
      "Estimate how refunds and replacements reduce monthly profit.",
    category: "Profitability",
  },
  {
  title: "Etsy Labor Cost Calculator",
  description:
    "Estimate whether an Etsy product properly pays for production time after materials, fees, shipping, packaging, and overhead.",
  href: "/etsy/labor-cost-calculator",
  category: "Profitability",
},
{
  title: "Etsy Product Cost Calculator",
  description:
    "Estimate true product cost per unit after materials, packaging, supplies, waste, batch costs, labor, shipping, and Etsy fees.",
  href: "/etsy/product-cost-calculator",
  category: "Profitability",
},
];

const guides = [
  {
    title: "How Etsy Fees Work",
    href: "/etsy/how-etsy-fees-work",
    description:
      "Learn the main Etsy fees sellers should understand before pricing products.",
  },
  {
    title: "How to Price Etsy Products",
    href: "/etsy/how-to-price-etsy-products",
    description:
      "Review a practical pricing process for covering costs, fees, labor, and target profit.",
  },
  {
    title: "Etsy Profit Margin Guide",
    href: "/etsy/profit-margin-guide",
    description:
      "Understand profit margin, healthy margin ranges, and what can reduce seller profit.",
  },
  {
    title: "Etsy Seller Cost Checklist",
    href: "/etsy/seller-cost-checklist",
    description:
      "Use a cost checklist to avoid missing expenses that reduce product profitability.",
  },
   {
    title: "Etsy Shipping Cost Guide",
    description:
      "Estimate postage, packaging, shipping subsidies, free shipping, and fulfillment costs before listing.",
    href: "/etsy/shipping-cost-guide",
  },
  {
  title: "Etsy Free Shipping Strategy",
  description:
    "Learn when free shipping can help Etsy sales and how to protect profit by building postage, packaging, and fulfillment costs into pricing.",
  href: "/etsy/free-shipping-strategy",
},
{
  title: "Etsy Offsite Ads Fees Explained",
  description:
    "Understand how Etsy Offsite Ads fees can affect profit, pricing, discounts, and margin on attributed orders.",
  href: "/etsy/offsite-ads-fees",
},
{
  title: "Etsy Discount Strategy Guide",
  description:
    "Learn how to run Etsy sales, coupons, bundles, and discounts without accidentally reducing profit too much.",
  href: "/etsy/discount-strategy-guide",
},
{
  title: "Etsy Refunds and Returns Cost Guide",
  description:
    "Understand how refunds, returns, replacements, damaged orders, and customer service costs can reduce Etsy profit.",
  href: "/etsy/refunds-and-returns-cost-guide",
},
{
  title: "Etsy Listing ROI Guide",
  description:
    "Learn how to decide whether Etsy listings are worth keeping, improving, advertising, restocking, or retiring.",
  href: "/etsy/listing-roi-guide",
},
{
  title: "Etsy Conversion Rate Guide",
  description:
    "Learn how Etsy conversion rate connects listing visits, orders, traffic quality, product presentation, and profitable growth.",
  href: "/etsy/conversion-rate-guide",
},
{
  title: "Etsy Inventory Restock Guide",
  description:
    "Learn how to plan Etsy restocks using sales pace, current inventory, lead time, safety stock, and listing profitability.",
  href: "/etsy/inventory-restock-guide",
},
{
  title: "Etsy Sales Goal Planning Guide",
  description:
    "Learn how to set Etsy sales goals using average order value, profit per order, conversion rate, traffic needs, and shop capacity.",
  href: "/etsy/sales-goal-planning-guide",
},
{
  title: "Etsy Bundle Pricing Guide",
  description:
    "Learn how to price Etsy bundles using item costs, discounts, shared shipping, packaging, fees, and target margin.",
  href: "/etsy/bundle-pricing-guide",
},
  {
    title: "Etsy Seller Resources",
    href: "/etsy/seller-resources",
    description:
      "Browse useful planning resources, seller tools, and future resource recommendations.",
  },
];

const categories = [
  {
    title: "Pricing tools",
    description:
      "Estimate listing prices, discounts, target profit, margins, and break-even points.",
  },
  {
    title: "Profit tools",
    description:
      "Estimate real profit after Etsy fees, refunds, shipping, packaging, labor, and product costs.",
  },
  {
    title: "Growth tools",
    description:
      "Model traffic, conversion, sales goals, ad ROI, listing ROI, and scaling decisions.",
  },
  {
    title: "Inventory tools",
    description:
      "Estimate restock timing, reorder quantities, stockout risk, and inventory coverage.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with Etsy fees so you know how much revenue remains after marketplace charges.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract product cost, shipping, packaging, labor, discounts, refunds, and other expenses.",
  },
  {
    title: "Set pricing",
    description:
      "Use pricing, discount, and break-even tools to find sustainable listing prices.",
  },
  {
    title: "Plan growth",
    description:
      "Review conversion, ads, sales goals, listing ROI, and inventory before scaling.",
  },
];

export default function EtsyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Etsy calculators for profit, fees, pricing, shipping, ads,
          conversion, refunds, inventory, and long-term shop planning. Use these
          tools to estimate seller costs before pricing, promoting, or scaling
          Etsy listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Etsy toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          15 active Etsy calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Etsy seller toolkit to estimate marketplace fees, product
          pricing, profit margins, shipping impact, ad performance, conversion
          goals, refund losses, inventory timing, and listing profitability.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Etsy seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-gray-300 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-gray-950">
                  {tool.title}
                </h3>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {tool.category}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tool.description}
              </p>

              <p className="mt-5 text-sm font-bold text-blue-700">
                Open tool →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-gray-300 bg-white p-5"
          >
            <h2 className="text-lg font-bold text-gray-950">
              {category.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {category.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Recommended Etsy seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to pricing,
          profit, promotion, inventory, and growth decisions. This helps prevent
          listings from looking profitable before all seller costs are included.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {workflow.map((step) => (
            <div key={step.title} className="rounded-xl bg-white p-4">
              <h3 className="font-bold text-gray-950">{step.title}</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy seller education hub
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Learn how Etsy pricing, fees, profit margins, seller costs, and
          fulfillment decisions affect long-term shop profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-blue-500 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-950">
                {guide.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {guide.description}
              </p>

              <p className="mt-4 text-sm font-bold text-blue-700">
                Open guide →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Etsy sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Listing fees, transaction fees, payment processing fees, and ad costs.",
              "Product cost, packaging cost, shipping cost, and labor time.",
              "Profit margin after all seller-paid expenses are included.",
              "Discount impact, refund losses, and replacement costs.",
              "Conversion rate, traffic requirements, and sales goals.",
              "Inventory coverage, reorder timing, and stockout risk.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating revenue as profit before subtracting fees and costs.",
              "Forgetting packaging, labor, ads, refunds, and shipping supplies.",
              "Running discounts without checking margin first.",
              "Scaling ads before checking conversion rate and profit per order.",
              "Restocking inventory without reviewing sales pace.",
              "Pricing based only on competitors instead of actual costs.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use these Etsy calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate marketplace charges and optional ad costs.",
            ],
            [
              "Check profit",
              "Use the profit calculator to subtract product cost, shipping, packaging, labor, and fees.",
            ],
            [
              "Set price",
              "Use pricing, discount, and break-even tools to find safe listing prices.",
            ],
            [
              "Review growth",
              "Use conversion, ad ROI, listing ROI, sales goal, and inventory tools before scaling.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          SellerToolSuite calculators provide planning estimates only. Actual
          Etsy fees, shipping costs, refund rates, ad performance, conversion
          rates, taxes, and marketplace changes may affect real results.
        </p>
      </section>
    </main>
  );
}