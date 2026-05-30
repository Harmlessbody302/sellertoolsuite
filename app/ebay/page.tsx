import Link from "next/link";

const ebayTools = [
  {
    title: "eBay Profit Calculator",
    description:
      "Estimate eBay profit after item cost, shipping, packaging, final value fees, promoted listing fees, and other selling costs.",
    href: "/ebay/profit-calculator",
    category: "Profitability",
  },
  {
    title: "eBay Fee Calculator",
    description:
      "Estimate final value fees, promoted listing costs, international fees, fixed order fees, and total fee impact.",
    href: "/ebay/fee-calculator",
    category: "Fees",
  },
  {
    title: "eBay Store Fee Calculator",
    description:
      "Estimate whether an eBay Store subscription is worth it based on listing volume, insertion fees, store cost, and expected fee savings.",
    href: "/ebay/store-fee-calculator",
    category: "Fees",
  },
  {
    title: "eBay Pricing Calculator",
    description:
      "Find a profitable eBay selling price based on item cost, shipping, packaging, fees, promoted listing rate, target profit, and target margin.",
    href: "/ebay/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "eBay Offer Discount Calculator",
    description:
      "Estimate whether accepted offers, coupons, markdowns, or discounts still leave profit after eBay fees and seller costs.",
    href: "/ebay/offer-discount-calculator",
    category: "Pricing",
  },
  {
    title: "eBay Sales Goal Calculator",
    description:
      "Work backward from a monthly eBay profit goal to estimate required orders, revenue, views, conversion rate, and listing volume.",
    href: "/ebay/sales-goal-calculator",
    category: "Growth",
  },
  {
    title: "eBay Conversion Rate Calculator",
    description:
      "Estimate listing conversion rate, monthly orders, revenue, profit per view, and traffic needed to reach a target profit goal.",
    href: "/ebay/conversion-rate-calculator",
    category: "Growth",
  },
  {
    title: "eBay Listing ROI Calculator",
    description:
      "Estimate whether eBay listings are worth keeping, improving, promoting, restocking, or retiring.",
    href: "/ebay/listing-roi-calculator",
    category: "Growth",
  },
  {
    title: "eBay Refund Impact Calculator",
    description:
      "Estimate how refunds, returns, case losses, return shipping, and damaged items reduce monthly eBay profit.",
    href: "/ebay/refund-impact-calculator",
    category: "Profitability",
  },
  {
    title: "eBay Inventory Restock Calculator",
    description:
      "Estimate reorder timing and restock quantity using current stock, sales pace, lead time, safety stock, item cost, and profit per unit.",
    href: "/ebay/inventory-restock-calculator",
    category: "Inventory",
  },
  {
    title: "eBay Product Cost Calculator",
    description:
      "Estimate true eBay product cost per item after sourcing, repair, prep, supplies, labor, packaging, shipping, and fees.",
    href: "/ebay/product-cost-calculator",
    category: "Profitability",
  },
  {
    title: "eBay Shipping Profit Calculator",
    description:
      "Compare free shipping, flat-rate shipping, buyer-paid shipping, and fulfillment cost impact on eBay profit.",
    href: "/ebay/shipping-profit-calculator",
    category: "Shipping",
  },
  {
    title: "eBay International Shipping Calculator",
    description:
      "Compare domestic and international eBay order profit after shipping charges, label cost, international fees, handling, and return risk.",
    href: "/ebay/international-shipping-calculator",
    category: "Shipping",
  },
  {
    title: "eBay Break-Even Calculator",
    description:
      "Estimate the minimum eBay sale price needed to avoid losing money after item cost, shipping, packaging, and eBay fees.",
    href: "/ebay/break-even-calculator",
    category: "Pricing",
  },
  {
    title: "eBay Promoted Listing ROI Calculator",
    description:
      "Estimate whether promoted listings are increasing profit or quietly reducing margins after ad fees.",
    href: "/ebay/promoted-listing-roi-calculator",
    category: "Advertising",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate net profit, margin, ROI, break-even pricing, refund impact, product cost, and total selling cost pressure.",
  },
  {
    title: "Fee tools",
    description:
      "Model eBay final value fees, fixed order fees, store fees, promoted listing costs, and international fee impact.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable prices using item cost, shipping cost, target profit, buyer offers, discounts, and margin goals.",
  },
  {
    title: "Growth tools",
    description:
      "Review conversion, sales goals, listing ROI, inventory restock timing, promoted listing ROI, and scaling decisions.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with eBay fees so you know how much revenue remains after marketplace charges.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract item cost, shipping, packaging, promoted listing fees, refunds, labor, and other expenses.",
  },
  {
    title: "Set pricing",
    description:
      "Use target profit and margin goals to find a listing price that can survive offers, discounts, returns, and shipping changes.",
  },
  {
    title: "Review growth",
    description:
      "Check conversion, sales goals, listing ROI, inventory restock timing, and promoted listing results before scaling.",
  },
];

const ebayGuides = [
  {
    title: "How eBay Fees Work",
    description:
      "Learn the main eBay fees sellers should understand before pricing products, promoting listings, or accepting offers.",
    href: "/ebay/how-ebay-fees-work",
  },
  {
  title: "How to Price eBay Products",
  description:
    "Review a practical eBay pricing process for covering item cost, fees, shipping, offers, promoted listings, returns, and target profit.",
  href: "/ebay/how-to-price-ebay-products",
},
{
  title: "eBay Profit Margin Guide",
  description:
    "Understand eBay profit margin, healthy margin ranges, and what can reduce seller profit after fees, shipping, offers, and returns.",
  href: "/ebay/profit-margin-guide",
},
{
  title: "eBay Seller Cost Checklist",
  description:
    "Use a practical checklist to avoid missing eBay seller costs that reduce product profitability.",
  href: "/ebay/seller-cost-checklist",
},
{
  title: "eBay Shipping Cost Guide",
  description:
    "Estimate eBay shipping costs, buyer-paid shipping, free shipping, packaging, return shipping, and international shipping risk.",
  href: "/ebay/shipping-cost-guide",
},
{
  title: "eBay Free Shipping Strategy",
  description:
    "Learn when free shipping may help eBay sales and how to protect profit by building postage, packaging, and fees into pricing.",
  href: "/ebay/free-shipping-strategy",
},
{
  title: "eBay Promoted Listing Fees Explained",
  description:
    "Understand how promoted listing fees can affect eBay profit, pricing, ad spend, and seller margin.",
  href: "/ebay/promoted-listing-fees",
},
{
  title: "eBay Discount Strategy Guide",
  description:
    "Learn how buyer offers, coupons, markdowns, and eBay discounts affect profit after fees, shipping, product cost, and ad spend.",
  href: "/ebay/discount-strategy-guide",
},
{
  title: "eBay Refunds and Returns Cost Guide",
  description:
    "Understand how eBay refunds, returns, replacement shipments, damaged orders, and case losses can reduce seller profit.",
  href: "/ebay/refunds-and-returns-cost-guide",
},
{
  title: "eBay Listing ROI Guide",
  description:
    "Learn how to decide whether eBay listings are worth keeping, improving, promoting, restocking, or retiring.",
  href: "/ebay/listing-roi-guide",
},
{
  title: "eBay Conversion Rate Guide",
  description:
    "Learn how eBay listing views, orders, conversion rate, traffic quality, pricing, photos, and item specifics affect profitable growth.",
  href: "/ebay/conversion-rate-guide",
},
{
  title: "eBay Inventory Restock Guide",
  description:
    "Learn how to plan eBay restocks using sales pace, current stock, lead time, reorder point, safety stock, and listing profitability.",
  href: "/ebay/inventory-restock-guide",
},
{
  title: "eBay Sales Goal Planning Guide",
  description:
    "Learn how to plan eBay sales goals using average order value, profit per order, conversion rate, traffic needs, and fulfillment capacity.",
  href: "/ebay/sales-goal-planning-guide",
},
{
  title: "eBay Store Fee Guide",
  description:
    "Learn when an eBay Store subscription may be worth it based on listing volume, insertion fees, store cost, and expected savings.",
  href: "/ebay/store-fee-guide",
},
{
  title: "eBay Seller Resources",
  description:
    "Browse useful planning resources, seller tools, and future recommendations for eBay pricing, shipping, fees, listing optimization, and shop operations.",
  href: "/ebay/seller-resources",
},
];

export default function EbayPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free eBay calculators for profit, fees, pricing, shipping,
          break-even planning, promoted listing ROI, offers, refunds,
          inventory, conversion, store fees, and product cost. Use these tools
          to estimate seller costs before pricing, promoting, or scaling
          listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live eBay toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          15 active eBay calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this eBay seller toolkit to estimate final value fees, promoted
          listing costs, shipping impact, break-even prices, profit margins,
          buyer offer impact, refund losses, inventory timing, product cost,
          and pricing scenarios for marketplace listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          eBay calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect eBay seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ebayTools.map((tool) => (
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
          Recommended eBay seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to final
          pricing decisions. This helps prevent listings from looking profitable
          before shipping, fees, promoted listing costs, item cost, refunds,
          labor, and inventory risk are fully included.
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
          eBay seller education hub
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Learn how eBay fees, pricing, profit margins, shipping, offers,
          refunds, inventory, store subscriptions, promoted listings, and
          product costs affect long-term seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {ebayGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-blue-300 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-950">
                {guide.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {guide.description}
              </p>

              <p className="mt-5 text-sm font-bold text-blue-700">
                Open guide →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Final value fees and fixed order fees.",
              "Promoted listing fees and ad rate impact.",
              "Shipping label cost, packaging cost, and shipping subsidies.",
              "Item sourcing cost, product cost, labor, prep, and other selling costs.",
              "Break-even price before profit starts.",
              "Profit margin after all entered costs, offers, refunds, and shipping changes are included.",
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
            Common eBay seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale revenue as profit.",
              "Forgetting that fees may apply to item price plus shipping.",
              "Using promoted listings without checking net profit.",
              "Offering free shipping without raising the item price enough.",
              "Pricing based on active listings instead of realistic sold prices.",
              "Ignoring returns, packaging, supplies, labor, inventory risk, and shipping adjustments.",
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
          How to use these eBay calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate marketplace charges, promoted listing costs, and international fee impact.",
            ],
            [
              "Check profit",
              "Use the profit calculator to subtract item cost, shipping, packaging, labor, refunds, and fees.",
            ],
            [
              "Set price",
              "Use the pricing, offer, and break-even calculators to find safe listing prices and minimum acceptable offers.",
            ],
            [
              "Review growth",
              "Use conversion, sales goal, listing ROI, inventory, shipping, and promoted listing tools before scaling.",
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
          eBay fees, category rates, promoted listing charges, shipping costs,
          refunds, taxes, store subscription terms, international fees, and
          marketplace rules may vary.
        </p>
      </section>
    </main>
  );
}