import Link from "next/link";

const calculators = [
  {
    title: "Shopify Profit Calculator",
    href: "/shopify/profit-calculator",
    tag: "Profit",
    description:
      "Estimate Shopify profit after product cost, payment fees, shipping, ads, discounts, refunds, and other selling costs.",
  },
  {
    title: "Shopify Fee Calculator",
    href: "/shopify/fee-calculator",
    tag: "Fees",
    description:
      "Estimate Shopify payment processing fees, transaction costs, app costs, and order-level selling expenses.",
  },
  {
    title: "Shopify Pricing Calculator",
    href: "/shopify/pricing-calculator",
    tag: "Pricing",
    description:
      "Find a product price that supports target profit after product cost, Shopify fees, shipping, ads, and discounts.",
  },
  {
    title: "Shopify Break-Even Calculator",
    href: "/shopify/break-even-calculator",
    tag: "Pricing",
    description:
      "Calculate the price, orders, revenue, or margin needed to break even on a Shopify product or campaign.",
  },
  {
    title: "Shopify Ad ROI Calculator",
    href: "/shopify/ad-roi-calculator",
    tag: "Advertising",
    description:
      "Estimate Shopify ad return after product cost, payment fees, fulfillment, refunds, and target profit.",
  },
  {
    title: "Shopify Product Cost Calculator",
    href: "/shopify/product-cost-calculator",
    tag: "Costs",
    description:
      "Estimate true product cost after sourcing, inbound shipping, packaging, fulfillment, payment fees, ads, discounts, refunds, and app costs.",
  },
  {
    title: "Shopify Shipping Profit Calculator",
    href: "/shopify/shipping-profit-calculator",
    tag: "Shipping",
    description:
      "Estimate whether shipping charged to the customer covers shipping labels, packaging, fulfillment, and handling costs.",
  },
  {
    title: "Shopify Discount Impact Calculator",
    href: "/shopify/discount-impact-calculator",
    tag: "Discounts",
    description:
      "Estimate how coupons, discounts, sales, and promotions affect Shopify profit, margin, and break-even pricing.",
  },
  {
    title: "Shopify Refund Impact Calculator",
    href: "/shopify/refund-impact-calculator",
    tag: "Refunds",
    description:
      "Estimate how refunds, returns, chargebacks, replacement orders, and support costs affect Shopify monthly profit.",
  },
  {
    title: "Shopify Conversion Rate Calculator",
    href: "/shopify/conversion-rate-calculator",
    tag: "Growth",
    description:
      "Calculate Shopify conversion rate, orders, revenue, profit per session, and traffic needed to reach a sales goal.",
  },
  {
    title: "Shopify Listing ROI Calculator",
    href: "/shopify/listing-roi-calculator",
    tag: "ROI",
    description:
      "Estimate whether a Shopify product page is worth keeping, improving, advertising, restocking, or retiring.",
  },
  {
    title: "Shopify Inventory Restock Calculator",
    href: "/shopify/inventory-restock-calculator",
    tag: "Inventory",
    description:
      "Estimate Shopify restock timing, reorder quantity, inventory cost, sales velocity, lead time, and stockout risk.",
  },
  {
    title: "Shopify Sales Goal Calculator",
    href: "/shopify/sales-goal-calculator",
    tag: "Growth",
    description:
      "Work backward from a monthly profit or revenue goal to estimate required orders, traffic, inventory, and ad spend.",
  },
  {
    title: "Shopify Bundle Pricing Calculator",
    href: "/shopify/bundle-pricing-calculator",
    tag: "Pricing",
    description:
      "Estimate bundle pricing, bundle margin, discount room, product cost, fulfillment cost, and expected profit.",
  },
  {
    title: "Shopify Subscription Profit Calculator",
    href: "/shopify/subscription-profit-calculator",
    tag: "Subscriptions",
    description:
      "Estimate subscription order profit, recurring revenue, churn pressure, fulfillment cost, discounts, and monthly value.",
  },
];

const guideLinks = [
  {
    title: "How Shopify Fees Work",
    href: "/shopify/how-shopify-fees-work",
    description:
      "Understand Shopify payment fees, transaction fees, app costs, fulfillment costs, and selling expenses.",
  },
  {
    title: "How to Price Shopify Products",
    href: "/shopify/how-to-price-shopify-products",
    description:
      "Learn how to price Shopify products around product cost, fees, shipping, ads, discounts, refunds, and target profit.",
  },
  {
    title: "Shopify Profit Margin Guide",
    href: "/shopify/profit-margin-guide",
    description:
      "Review gross margin, net margin, contribution margin, and common Shopify profit margin mistakes.",
  },
  {
    title: "Shopify Seller Cost Checklist",
    href: "/shopify/seller-cost-checklist",
    description:
      "Use a checklist of Shopify costs to avoid underpricing products or underestimating profit pressure.",
  },
  {
    title: "Shopify Shipping Cost Guide",
    href: "/shopify/shipping-cost-guide",
    description:
      "Understand shipping labels, packaging, fulfillment, free shipping, handling cost, and delivery expectations.",
  },
  {
    title: "Shopify Ad Spend Strategy Guide",
    href: "/shopify/ad-spend-strategy-guide",
    description:
      "Learn how ad spend affects profit, break-even ROAS, customer acquisition cost, and scaling decisions.",
  },
  {
    title: "Shopify Discount Strategy Guide",
    href: "/shopify/discount-strategy-guide",
    description:
      "Review coupon, sale, bundle, free shipping, and promotion strategies before discounting products.",
  },
  {
    title: "Shopify Refunds and Returns Cost Guide",
    href: "/shopify/refunds-and-returns-cost-guide",
    description:
      "Understand refund, return, chargeback, replacement, damaged item, and customer support cost impact.",
  },
  {
    title: "Shopify Conversion Rate Guide",
    href: "/shopify/conversion-rate-guide",
    description:
      "Learn how Shopify conversion rate, traffic quality, landing pages, pricing, and trust signals affect sales.",
  },
  {
    title: "Shopify Listing ROI Guide",
    href: "/shopify/listing-roi-guide",
    description:
      "Review when to improve, advertise, restock, discount, bundle, or retire a Shopify product page.",
  },
  {
    title: "Shopify Inventory Restock Guide",
    href: "/shopify/inventory-restock-guide",
    description:
      "Plan Shopify restocks around sales velocity, supplier lead time, stockout risk, inventory cost, and cash flow.",
  },
  {
    title: "Shopify Sales Goal Planning Guide",
    href: "/shopify/sales-goal-planning-guide",
    description:
      "Work backward from revenue or profit goals to estimate required orders, sessions, ad budget, and capacity.",
  },
  {
    title: "Shopify Bundle Pricing Guide",
    href: "/shopify/bundle-pricing-guide",
    description:
      "Understand bundle discounts, margin protection, multi-item cost, fulfillment pressure, and promotional strategy.",
  },
  {
    title: "Shopify Subscription Pricing Guide",
    href: "/shopify/subscription-pricing-guide",
    description:
      "Review recurring pricing, subscriber discounts, churn risk, retention value, fulfillment cost, and profit.",
  },
];

const groupedTools = [
  {
    title: "Profit tools",
    description:
      "Profit, product cost, fees, pricing, break-even, shipping profit, refunds, and margin planning.",
  },
  {
    title: "Marketing tools",
    description:
      "Ad ROI, discount impact, conversion rate, listing ROI, customer acquisition cost, and growth planning.",
  },
  {
    title: "Inventory tools",
    description:
      "Restock timing, inventory cost, lead time, safety stock, sales goals, and cash flow planning.",
  },
  {
    title: "Offer tools",
    description:
      "Bundle pricing, subscription profit, discount strategy, shipping offers, and pricing scenarios.",
  },
];

const workflow = [
  {
    title: "Calculate costs",
    description:
      "Start with product cost, inbound shipping, packaging, fulfillment, payment fees, app costs, ads, discounts, and refunds.",
  },
  {
    title: "Estimate profit",
    description:
      "Use profit, pricing, break-even, product cost, and fee calculators to check whether the product has enough margin.",
  },
  {
    title: "Review growth",
    description:
      "Check ad ROI, conversion rate, listing ROI, sales goals, bundle pricing, and subscription profit before scaling.",
  },
  {
    title: "Plan operations",
    description:
      "Review inventory, restock timing, shipping workflow, refund risk, customer support, and cash flow.",
  },
];

export default function ShopifyHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Shopify calculators for profit, fees, pricing, break-even points,
          ad ROI, product cost, shipping profit, discounts, refunds, conversion,
          listing ROI, inventory, sales goals, bundles, and subscriptions.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-green-300 bg-green-50 p-6">
        <h2 className="text-xl font-bold text-green-950">
          Live Shopify toolkit
        </h2>

        <p className="mt-3 text-sm leading-6 text-green-900">
          This Shopify calculator suite is built to help sellers estimate
          product profitability before pricing, advertising, discounting,
          restocking, bundling, or scaling a Shopify store.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Shopify calculator suite
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Choose a calculator below to estimate the main Shopify costs and
          growth numbers that affect store profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-gray-300 bg-gray-50 p-5 hover:border-blue-400 hover:bg-blue-50"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-gray-950">
                  {calculator.title}
                </h3>

                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                  {calculator.tag}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {calculator.description}
              </p>

              <p className="mt-4 text-sm font-bold text-blue-700">
                Open tool →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        {groupedTools.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-gray-300 bg-white p-5"
          >
            <h2 className="text-lg font-bold text-gray-950">{group.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {group.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Recommended Shopify seller workflow
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use the calculators together to move from cost estimates to final
          pricing, ad planning, discount decisions, inventory timing, and growth
          planning.
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
          Shopify seller education hub
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Learn how Shopify sellers can estimate costs, protect margin, price
          products, manage ads, reduce refunds, plan inventory, and scale with
          better numbers.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {guideLinks.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-blue-300 bg-white p-5 hover:border-blue-500 hover:bg-blue-100"
            >
              <h3 className="font-bold text-gray-950">{guide.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {guide.description}
              </p>
              <p className="mt-4 text-sm font-bold text-blue-700">
                Open guide →
              </p>
            </Link>
          ))}

          <Link
            href="/shopify/seller-resources"
            className="rounded-2xl border border-blue-300 bg-white p-5 hover:border-blue-500 hover:bg-blue-100"
          >
            <h3 className="font-bold text-gray-950">
              Shopify Seller Resources
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Browse useful Shopify seller resources, software categories,
              planning tools, and future recommendations for store owners.
            </p>
            <p className="mt-4 text-sm font-bold text-blue-700">
              Open resources →
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Shopify sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Product cost, inbound shipping, packaging, fulfillment, and supplier costs.",
              "Shopify payment processing fees, transaction fees, app costs, and subscriptions.",
              "Ad spend, customer acquisition cost, discounts, coupons, and free shipping offers.",
              "Refunds, chargebacks, replacement orders, customer support, and return costs.",
              "Conversion rate, traffic, sessions, sales goals, and repeat purchase behavior.",
              "Inventory cost, reorder timing, stockout risk, cash flow, and fulfillment capacity.",
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
            Common Shopify seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating revenue as profit before subtracting product cost, fees, ads, fulfillment, and refunds.",
              "Scaling ads before knowing break-even ROAS and profit after customer acquisition cost.",
              "Pricing products without accounting for discounts, free shipping, app costs, and refund risk.",
              "Ignoring repeat customer value, subscription churn, and bundle margin when planning offers.",
              "Restocking inventory before confirming conversion rate, sales velocity, and cash flow.",
              "Comparing sales volume without comparing net profit, workload, and inventory tied up.",
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
          How to use these Shopify calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with cost",
              "Use product cost, fee, shipping, and profit calculators to estimate true order economics.",
            ],
            [
              "Set pricing",
              "Use pricing, break-even, discount, bundle, and subscription tools to protect margin.",
            ],
            [
              "Review marketing",
              "Use ad ROI, conversion rate, listing ROI, and sales goal tools before increasing ad spend.",
            ],
            [
              "Plan operations",
              "Use inventory, refund, restock, shipping, and resource pages to manage growth risk.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Shopify fees, payment processing rates, transaction fees, app costs,
          fulfillment costs, shipping costs, ad performance, conversion rates,
          refund rates, taxes, and platform rules can change. SellerToolSuite
          calculators provide planning estimates only. Always compare estimates
          with your own Shopify analytics, payment reports, fulfillment data,
          advertising reports, and accounting records.
        </p>
      </section>
    </main>
  );
}