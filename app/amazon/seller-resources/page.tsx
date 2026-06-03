import Link from "next/link";

const calculatorLinks = [
  ["/amazon/profit-calculator", "Profit Calculator"],
  ["/amazon/fee-calculator", "Fee Calculator"],
  ["/amazon/pricing-calculator", "Pricing Calculator"],
  ["/amazon/fba-profit-calculator", "FBA Profit Calculator"],
  ["/amazon/fbm-profit-calculator", "FBM Profit Calculator"],
  ["/amazon/fba-vs-fbm-calculator", "FBA vs FBM Calculator"],
  ["/amazon/product-cost-calculator", "Product Cost Calculator"],
  ["/amazon/inventory-restock-calculator", "Inventory Restock Calculator"],
];

const firstGuides = [
  ["/amazon/how-amazon-fees-work", "How Amazon Fees Work"],
  ["/amazon/how-to-price-amazon-products", "How to Price Amazon Products"],
  ["/amazon/profit-margin-guide", "Profit Margin Guide"],
  ["/amazon/seller-cost-checklist", "Seller Cost Checklist"],
  ["/amazon/fba-cost-guide", "FBA Cost Guide"],
  ["/amazon/fbm-shipping-cost-guide", "FBM Shipping Cost Guide"],
  ["/amazon/ppc-fees-explained", "PPC Fees Explained"],
  ["/amazon/discount-strategy-guide", "Discount Strategy Guide"],
];

const moreGuides = [
  ["/amazon/refunds-and-returns-cost-guide", "Refunds and Returns Cost Guide"],
  ["/amazon/listing-roi-guide", "Listing ROI Guide"],
  ["/amazon/conversion-rate-guide", "Conversion Rate Guide"],
  ["/amazon/inventory-restock-guide", "Inventory Restock Guide"],
  ["/amazon/sales-goal-planning-guide", "Sales Goal Planning Guide"],
  ["/amazon/fba-vs-fbm-guide", "FBA vs FBM Guide"],
];

const resourceCategories = [
  {
    title: "Pricing and profit resources",
    description:
      "Resources in this category should help sellers understand whether Amazon products are profitable, whether pricing is sustainable, and how fees affect margins.",
    items: [
      "Amazon fee calculators",
      "Profit margin guides",
      "Product cost tracking spreadsheets",
      "Break-even pricing tools",
      "Pricing strategy guides",
      "Discount and coupon planning tools",
    ],
  },
  {
    title: "FBA and FBM fulfillment resources",
    description:
      "Fulfillment resources should help sellers compare FBA, FBM, shipping costs, storage pressure, delivery expectations, and operational workload.",
    items: [
      "FBA fee and profit calculators",
      "FBM shipping cost tools",
      "FBA vs FBM comparison guides",
      "Package size and weight guides",
      "Storage cost calculators",
      "Return and replacement planning tools",
    ],
  },
  {
    title: "Listing and research resources",
    description:
      "Strong Amazon listings need accurate photos, clear titles, useful bullets, competitive pricing, keyword research, and realistic demand checks.",
    items: [
      "Keyword research tools",
      "Listing optimization guides",
      "Product photo tools",
      "Competitor research resources",
      "Buy box and offer tracking tools",
      "Product research checklists",
    ],
  },
  {
    title: "Bookkeeping and operations resources",
    description:
      "Operational tools help sellers track costs, organize records, review margins, manage inventory, and understand whether the store is actually profitable.",
    items: [
      "Bookkeeping software",
      "Expense tracking tools",
      "Inventory tracking resources",
      "PPC tracking spreadsheets",
      "Refund and return tracking sheets",
      "Business planning templates",
    ],
  },
];

const checklist = [
  {
    title: "Cost",
    description:
      "Does the monthly or one-time price make sense for your current Amazon sales volume?",
  },
  {
    title: "Usefulness",
    description:
      "Will it solve a recurring problem or only be used once?",
  },
  {
    title: "Profit impact",
    description:
      "Can it help increase sales, save time, reduce refunds, improve sourcing, or protect margin?",
  },
  {
    title: "Complexity",
    description:
      "Is it simple enough to use consistently without slowing you down?",
  },
];

export default function AmazonSellerResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Seller Resources
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          A curated resource hub for Amazon sellers who want help with pricing,
          profit planning, fees, FBA, FBM, PPC, inventory, product research,
          listing optimization, refunds, storage, and selling operations.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <h2 className="text-2xl font-bold text-amber-950">
          Affiliate disclosure
        </h2>

        <p className="mt-3 text-sm leading-6 text-amber-900">
          Some links on SellerToolSuite may be affiliate links. If you click a
          link and make a purchase, SellerToolSuite may receive compensation at
          no extra cost to you. Recommendations should still be reviewed based
          on your own Amazon seller needs, budget, and business goals.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Start with SellerToolSuite calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Before paying for outside tools or services, use these free
          calculators to understand your Amazon pricing, fees, profit,
          fulfillment method, PPC, inventory, refunds, and listing performance.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {calculatorLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        {resourceCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-gray-300 bg-white p-6"
          >
            <h2 className="text-2xl font-bold text-gray-950">
              {category.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {category.description}
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
              {category.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Resource evaluation checklist
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Before buying or subscribing to any Amazon seller tool, compare it
          against your current business needs and expected return.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {checklist.map((item) => (
            <div key={item.title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Helpful Amazon guides
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {firstGuides.map(([href, label]) => (
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

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          More Amazon planning guides
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moreGuides.map(([href, label]) => (
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

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Resources coming soon
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          This page can later include specific recommended seller tools,
          repricing tools, keyword research tools, PPC tools, bookkeeping tools,
          product research tools, fulfillment resources, software comparisons,
          and affiliate partnerships as SellerToolSuite grows.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Resource recommendations are for general planning purposes only.
          Always compare pricing, features, current terms, seller requirements,
          marketplace policies, and suitability before using any third-party
          tool, software, course, service, or supplier.
        </p>
      </section>
    </main>
  );
}