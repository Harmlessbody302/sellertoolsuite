const calculatorLinks = [
  { label: "Profit Calculator", href: "/mercari/profit-calculator" },
  { label: "Fee Calculator", href: "/mercari/fee-calculator" },
  { label: "Pricing Calculator", href: "/mercari/pricing-calculator" },
  { label: "Break-Even Calculator", href: "/mercari/break-even-calculator" },
  { label: "Promotion ROI Calculator", href: "/mercari/promotion-roi-calculator" },
  { label: "Product Cost Calculator", href: "/mercari/product-cost-calculator" },
  { label: "Shipping Profit Calculator", href: "/mercari/shipping-profit-calculator" },
  { label: "Inventory Restock Calculator", href: "/mercari/inventory-restock-calculator" },
];

const pricingResources = [
  "Mercari fee calculators",
  "Profit margin guides",
  "Product cost tracking spreadsheets",
  "Break-even pricing tools",
  "Pricing strategy guides",
  "Offer and discount planning tools",
];

const shippingResources = [
  "Shipping cost calculators",
  "Packaging cost tools",
  "Seller-paid shipping guides",
  "Free shipping threshold tools",
  "Return and refund planning tools",
  "Handling and fulfillment checklists",
];

const growthResources = [
  "Promotion ROI calculators",
  "Sell-through rate tools",
  "Listing ROI calculators",
  "Product photo optimization guides",
  "Sold-comp and pricing research",
  "Inventory restock planning tools",
];

const operationsResources = [
  "Inventory tracking sheets",
  "Refund and return tracking sheets",
  "Bundle pricing tools",
  "Sales goal planning templates",
  "Offer strategy worksheets",
  "Business planning resources",
];

const evaluationCards = [
  {
    title: "Cost",
    text: "Does the monthly or one-time price make sense for your current Mercari sales volume?",
  },
  {
    title: "Usefulness",
    text: "Will it solve a recurring problem or only be used once?",
  },
  {
    title: "Profit impact",
    text: "Can it help increase sales, save time, reduce refunds, improve sourcing, or protect margin?",
  },
  {
    title: "Complexity",
    text: "Is it simple enough to use consistently without slowing you down?",
  },
];

const helpfulGuides = [
  { label: "How Mercari Fees Work", href: "/mercari/how-mercari-fees-work" },
  { label: "How to Price Mercari Items", href: "/mercari/how-to-price-mercari-items" },
  { label: "Profit Margin Guide", href: "/mercari/profit-margin-guide" },
  { label: "Seller Cost Checklist", href: "/mercari/seller-cost-checklist" },
  { label: "Shipping Cost Guide", href: "/mercari/shipping-cost-guide" },
  { label: "Promotion Strategy Guide", href: "/mercari/promotion-strategy-guide" },
  { label: "Refunds and Returns Cost Guide", href: "/mercari/refunds-and-returns-cost-guide" },
  { label: "Listing ROI Guide", href: "/mercari/listing-roi-guide" },
];

const moreGuides = [
  { label: "Inventory Restock Guide", href: "/mercari/inventory-restock-guide" },
  { label: "Sales Goal Planning Guide", href: "/mercari/sales-goal-planning-guide" },
  { label: "Offer Strategy Guide", href: "/mercari/offer-strategy-guide" },
  { label: "Free Shipping Strategy", href: "/mercari/free-shipping-strategy" },
  { label: "Bundle Pricing Guide", href: "/mercari/bundle-pricing-guide" },
  { label: "Sell-Through Rate Guide", href: "/mercari/sell-through-rate-guide" },
];

export default function MercariSellerResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Seller Resources
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          A curated resource hub for Mercari sellers who want help with pricing,
          profit planning, fees, shipping, offers, inventory, refunds, bundles,
          sell-through, and selling operations.
        </p>

        <section className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <h2 className="text-xl font-bold">Affiliate disclosure</h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            Some links on SellerToolSuite may be affiliate links. If you click a
            link and make a purchase, SellerToolSuite may receive compensation at
            no extra cost to you. Recommendations should still be reviewed based
            on your own Mercari seller needs, budget, and business goals.
          </p>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Start with SellerToolSuite calculators
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before paying for outside tools or services, use these free
            calculators to understand your Mercari pricing, fees, profit,
            shipping, offers, inventory, discounts, and growth planning.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {calculatorLinks.map((link) => (
              <ButtonLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ResourceCategory
            title="Pricing and profit resources"
            text="Resources in this category should help Mercari sellers understand whether products are profitable, whether pricing is sustainable, and how fees affect margins."
            items={pricingResources}
          />

          <ResourceCategory
            title="Shipping and fulfillment resources"
            text="Fulfillment resources should help sellers compare shipping labels, packaging costs, seller-paid shipping, delivery expectations, and operational workload."
            items={shippingResources}
          />

          <ResourceCategory
            title="Promotion and growth resources"
            text="Mercari growth resources should help sellers review promotion ROI, price drops, sell-through, listing quality, and whether more inventory is worth sourcing."
            items={growthResources}
          />

          <ResourceCategory
            title="Inventory and operations resources"
            text="Operational tools help sellers track refunds, bundles, sales goals, inventory pressure, offer decisions, cash flow, and whether the store is actually profitable."
            items={operationsResources}
          />
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resource evaluation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before buying or subscribing to any Mercari seller tool, compare it
            against your current business needs and expected return.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {evaluationCards.map((card) => (
              <InfoCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari guides</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {helpfulGuides.map((guide) => (
              <ButtonLink key={guide.href} href={guide.href} label={guide.label} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">More Mercari planning guides</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {moreGuides.map((guide) => (
              <ButtonLink key={guide.href} href={guide.href} label={guide.label} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resources coming soon</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            This page can later include specific recommended seller tools,
            repricing tools, sold-comp research tools, shipping tools,
            bookkeeping tools, product research tools, fulfillment resources,
            software comparisons, and affiliate partnerships as SellerToolSuite
            grows.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-sm leading-6 text-amber-900">
            Resource recommendations are for general planning purposes only.
            Always compare pricing, features, current terms, seller requirements,
            marketplace policies, and suitability before using any third-party
            tool, software, course, service, or supplier.
          </p>
        </section>
      </section>
    </main>
  );
}

function ResourceCategory({
  title,
  text,
  items,
}: {
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>

      <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ButtonLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-center text-sm font-bold text-slate-950 hover:bg-blue-100"
    >
      {label}
    </a>
  );
}