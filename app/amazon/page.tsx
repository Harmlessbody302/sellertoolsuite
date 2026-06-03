import Link from "next/link";

const amazonTools = [
  {
    title: "Amazon FBA Profit Calculator",
    description:
      "Estimate Amazon FBA profit after referral fees, fulfillment fees, product cost, shipping to Amazon, storage, and other seller costs.",
    href: "/amazon/fba-profit-calculator",
    category: "Profitability",
  },
  {
    title: "Amazon FBM Profit Calculator",
    description:
      "Estimate Amazon FBM profit after referral fees, item cost, packaging, shipping, handling, refunds, and seller expenses.",
    href: "/amazon/fbm-profit-calculator",
    category: "Profitability",
  },
  {
    title: "Amazon Fee Calculator",
    description:
      "Estimate Amazon referral fees, fulfillment fees, closing fees, storage fees, and other marketplace selling costs.",
    href: "/amazon/fee-calculator",
    category: "Fees",
  },
  {
    title: "Amazon Referral Fee Calculator",
    description:
      "Estimate Amazon referral fee impact by sale price, category rate, minimum fee, and product revenue.",
    href: "/amazon/referral-fee-calculator",
    category: "Fees",
  },
  {
    title: "Amazon Storage Fee Calculator",
    description:
      "Estimate monthly storage cost, long-term storage pressure, inventory value, and storage impact on product margin.",
    href: "/amazon/storage-fee-calculator",
    category: "Inventory",
  },
  {
    title: "Amazon Pricing Calculator",
    description:
      "Find a profitable Amazon selling price based on product cost, Amazon fees, shipping, target profit, and target margin.",
    href: "/amazon/pricing-calculator",
    category: "Pricing",
  },
  {
    title: "Amazon Break-Even Calculator",
    description:
      "Estimate the minimum Amazon sale price needed to avoid losing money after product cost, fees, shipping, and fulfillment costs.",
    href: "/amazon/break-even-calculator",
    category: "Pricing",
  },
  {
    title: "Amazon PPC ROI Calculator",
    description:
      "Estimate whether Amazon PPC ads are increasing profit after ad spend, product cost, Amazon fees, and conversion performance.",
    href: "/amazon/ppc-roi-calculator",
    category: "Advertising",
  },
  {
    title: "Amazon Product Cost Calculator",
    description:
      "Estimate true Amazon product cost after sourcing, prep, packaging, shipping, labeling, inspection, waste, and labor costs.",
    href: "/amazon/product-cost-calculator",
    category: "Profitability",
  },
  {
    title: "Amazon Inventory Restock Calculator",
    description:
      "Estimate Amazon restock timing and reorder quantity using sales pace, current stock, lead time, safety stock, and profit per unit.",
    href: "/amazon/inventory-restock-calculator",
    category: "Inventory",
  },
  {
    title: "Amazon Sales Goal Calculator",
    description:
      "Work backward from a monthly Amazon profit goal to estimate required orders, revenue, conversion, and traffic needs.",
    href: "/amazon/sales-goal-calculator",
    category: "Growth",
  },
  {
    title: "Amazon Conversion Rate Calculator",
    description:
      "Estimate Amazon listing conversion rate, order volume, revenue, profit per session, and traffic needed to reach a sales goal.",
    href: "/amazon/conversion-rate-calculator",
    category: "Growth",
  },
  {
    title: "Amazon Refund Impact Calculator",
    description:
      "Estimate how Amazon refunds, returns, replacements, damaged products, and return-related costs reduce seller profit.",
    href: "/amazon/refund-impact-calculator",
    category: "Profitability",
  },
  {
    title: "Amazon Listing ROI Calculator",
    description:
      "Estimate whether Amazon listings are worth keeping, improving, advertising, restocking, discounting, or retiring.",
    href: "/amazon/listing-roi-calculator",
    category: "Growth",
  },
  {
    title: "Amazon FBA vs FBM Calculator",
    description:
      "Compare Amazon FBA and FBM profit after fulfillment fees, shipping cost, labor, storage, referral fees, and seller workload.",
    href: "/amazon/fba-vs-fbm-calculator",
    category: "Fulfillment",
  },
];

const categories = [
  {
    title: "Profit tools",
    description:
      "Estimate FBA profit, FBM profit, product cost, refund impact, listing ROI, break-even pricing, and total seller margin.",
  },
  {
    title: "Fee tools",
    description:
      "Model Amazon referral fees, FBA fees, fulfillment costs, storage fees, closing fees, and total marketplace fee pressure.",
  },
  {
    title: "Pricing tools",
    description:
      "Set sustainable Amazon prices using product cost, fees, shipping, fulfillment method, target profit, and target margin.",
  },
  {
    title: "Growth tools",
    description:
      "Review PPC ROI, conversion rate, sales goals, listing ROI, inventory restock timing, and scaling decisions.",
  },
];

const workflow = [
  {
    title: "Calculate fees",
    description:
      "Start with referral fees, FBA or FBM fulfillment costs, storage fees, and other Amazon seller charges.",
  },
  {
    title: "Estimate profit",
    description:
      "Subtract product cost, shipping, packaging, prep, PPC, refunds, labor, storage, and other expenses.",
  },
  {
    title: "Set pricing",
    description:
      "Use target profit and margin goals to choose a price that can survive fees, ads, returns, and fulfillment costs.",
  },
  {
    title: "Review growth",
    description:
      "Check conversion, PPC ROI, sales goals, listing ROI, and restock timing before scaling inventory or ad spend.",
  },
];

const amazonGuides = [
  {
    title: "How Amazon Fees Work",
    description:
      "Learn the main Amazon fees sellers should understand before pricing products, using FBA, running PPC, or scaling inventory.",
    href: "/amazon/how-amazon-fees-work",
  },
  {
    title: "How to Price Amazon Products",
    description:
      "Review a practical Amazon pricing process for covering product cost, referral fees, fulfillment costs, PPC, returns, and target profit.",
    href: "/amazon/how-to-price-amazon-products",
  },
  {
    title: "Amazon Profit Margin Guide",
    description:
      "Understand Amazon profit margin, healthy margin ranges, and what can reduce seller profit after fees, fulfillment, PPC, and returns.",
    href: "/amazon/profit-margin-guide",
  },
  {
    title: "Amazon Seller Cost Checklist",
    description:
      "Use a practical checklist to avoid missing Amazon seller costs that reduce product profitability.",
    href: "/amazon/seller-cost-checklist",
  },
  {
    title: "Amazon FBA Cost Guide",
    description:
      "Learn how FBA fees, inbound shipping, storage, prep, returns, and fulfillment costs affect Amazon seller profit.",
    href: "/amazon/fba-cost-guide",
  },
  {
    title: "Amazon FBM Shipping Cost Guide",
    description:
      "Estimate FBM shipping costs, packaging, handling time, return shipping, delivery expectations, and margin impact.",
    href: "/amazon/fbm-shipping-cost-guide",
  },
  {
    title: "Amazon PPC Fees Explained",
    description:
      "Understand how Amazon PPC ad spend can affect profit, pricing, conversion, ACOS, TACOS, and seller margin.",
    href: "/amazon/ppc-fees-explained",
  },
  {
    title: "Amazon Discount Strategy Guide",
    description:
      "Learn how coupons, deals, promotions, price cuts, and Amazon discounts affect profit after fees, fulfillment, product cost, and ads.",
    href: "/amazon/discount-strategy-guide",
  },
  {
    title: "Amazon Refunds and Returns Cost Guide",
    description:
      "Understand how Amazon refunds, returns, replacements, damaged products, and return-related costs can reduce seller profit.",
    href: "/amazon/refunds-and-returns-cost-guide",
  },
  {
    title: "Amazon Listing ROI Guide",
    description:
      "Learn how to decide whether Amazon listings are worth keeping, improving, advertising, restocking, discounting, or retiring.",
    href: "/amazon/listing-roi-guide",
  },
  {
    title: "Amazon Conversion Rate Guide",
    description:
      "Learn how Amazon sessions, orders, conversion rate, traffic quality, pricing, reviews, images, and listing quality affect profitable growth.",
    href: "/amazon/conversion-rate-guide",
  },
  {
    title: "Amazon Inventory Restock Guide",
    description:
      "Learn how to plan Amazon restocks using sales pace, current stock, lead time, reorder point, safety stock, and listing profitability.",
    href: "/amazon/inventory-restock-guide",
  },
  {
    title: "Amazon Sales Goal Planning Guide",
    description:
      "Learn how to plan Amazon sales goals using average order value, profit per order, conversion rate, traffic needs, and fulfillment capacity.",
    href: "/amazon/sales-goal-planning-guide",
  },
  {
    title: "Amazon FBA vs FBM Guide",
    description:
      "Compare FBA and FBM using fulfillment costs, shipping control, storage fees, labor, customer expectations, and profit margin.",
    href: "/amazon/fba-vs-fbm-guide",
  },
  {
    title: "Amazon Seller Resources",
    description:
      "Browse useful planning resources, seller tools, and future recommendations for Amazon pricing, fees, fulfillment, PPC, inventory, and operations.",
    href: "/amazon/seller-resources",
  },
];

export default function AmazonPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Seller Calculators
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Free Amazon calculators for FBA profit, FBM profit, fees, pricing,
          PPC ROI, inventory, conversion, refunds, product cost, and sales goal
          planning. Use these tools to estimate seller costs before pricing,
          advertising, restocking, or scaling Amazon products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-green-300 bg-green-50 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-800">
          Live Amazon toolkit
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          15 active Amazon calculators
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-green-900">
          Use this Amazon seller toolkit to estimate referral fees, FBA fees,
          FBM shipping, PPC impact, break-even prices, profit margins, product
          cost, refund losses, inventory timing, and pricing scenarios for
          marketplace listings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon calculator suite
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          Choose a calculator below to estimate the major financial variables
          that affect Amazon seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {amazonTools.map((tool) => (
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
          Recommended Amazon seller workflow
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Use the calculators together to move from fee estimates to final
          pricing and growth decisions. This helps prevent products from looking
          profitable before fulfillment fees, referral fees, PPC, product cost,
          shipping, storage, refunds, and inventory risk are fully included.
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
          Amazon seller education hub
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-700">
          Learn how Amazon fees, pricing, profit margins, FBA, FBM, PPC,
          refunds, inventory, conversion, and product cost decisions affect
          long-term seller profitability.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {amazonGuides.map((guide) => (
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
            What Amazon sellers should estimate
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Referral fees, fulfillment fees, storage fees, closing fees, and other Amazon charges.",
              "FBA vs FBM fulfillment cost, shipping cost, packaging cost, prep cost, and labor.",
              "Product sourcing cost, inbound shipping, labeling, inspection, waste, and supplies.",
              "PPC cost, ACOS, conversion rate, listing traffic, and ad-driven profit impact.",
              "Refunds, returns, damaged units, replacements, and customer issue costs.",
              "Profit margin after all entered costs, ads, inventory risk, and fulfillment costs are included.",
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
            Common Amazon seller mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale revenue as profit before Amazon fees and fulfillment costs.",
              "Ignoring FBA storage fees, inbound shipping, prep, packaging, and product cost.",
              "Running PPC before checking whether the product has enough margin.",
              "Pricing from competitor listings without checking referral fees, FBA fees, and refund risk.",
              "Restocking products before reviewing conversion, margin, refunds, and sales velocity.",
              "Comparing FBA and FBM without accounting for labor, shipping control, storage, and customer expectations.",
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
          How to use these Amazon calculators
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Start with fees",
              "Use the fee calculator to estimate referral fees, FBA fees, FBM costs, storage, and other Amazon charges.",
            ],
            [
              "Check profit",
              "Use profit calculators to subtract product cost, shipping, packaging, fulfillment, PPC, refunds, and labor.",
            ],
            [
              "Set price",
              "Use pricing and break-even calculators to find safe sale prices and minimum acceptable margins.",
            ],
            [
              "Review growth",
              "Use PPC ROI, conversion, sales goal, listing ROI, inventory, and FBA vs FBM tools before scaling.",
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
          Amazon fees, FBA fees, referral rates, storage costs, PPC results,
          fulfillment costs, shipping costs, refunds, taxes, and marketplace
          rules may vary.
        </p>
      </section>
    </main>
  );
}