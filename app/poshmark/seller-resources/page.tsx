export default function PoshmarkSellerResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Seller Resources
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          A curated resource hub for Poshmark sellers who want help with pricing,
          profit planning, fees, shipping discounts, offers, inventory, refunds,
          bundles, sell-through, and closet operations.
        </p>

        <section className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <h2 className="text-xl font-bold">Affiliate disclosure</h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            Some links on SellerToolSuite may be affiliate links. If you click a
            link and make a purchase, SellerToolSuite may receive compensation at
            no extra cost to you. Recommendations should still be reviewed based
            on your own Poshmark seller needs, budget, and business goals.
          </p>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Start with SellerToolSuite calculators
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before paying for outside tools or services, use these free calculators
            to understand your Poshmark pricing, fees, profit, shipping discounts,
            offers, inventory, discounts, and growth planning.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <ResourceLink href="/poshmark/profit-calculator" label="Profit Calculator" />
            <ResourceLink href="/poshmark/fee-calculator" label="Fee Calculator" />
            <ResourceLink href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <ResourceLink href="/poshmark/break-even-calculator" label="Break-Even Calculator" />
            <ResourceLink href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <ResourceLink href="/poshmark/product-cost-calculator" label="Product Cost Calculator" />
            <ResourceLink href="/poshmark/shipping-discount-calculator" label="Shipping Discount Calculator" />
            <ResourceLink href="/poshmark/inventory-restock-calculator" label="Inventory Restock Calculator" />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ResourceCategory
            title="Pricing and profit resources"
            text="Resources in this category should help Poshmark sellers understand whether products are profitable, whether pricing is sustainable, and how fees affect margins."
            items={[
              "Poshmark fee calculators",
              "Profit margin guides",
              "Product cost tracking spreadsheets",
              "Break-even pricing tools",
              "Pricing strategy guides",
              "Offer and discount planning tools",
            ]}
          />

          <ResourceCategory
            title="Shipping and fulfillment resources"
            text="Fulfillment resources should help sellers compare shipping discounts, packaging costs, seller-paid shipping, delivery expectations, and operational workload."
            items={[
              "Shipping discount calculators",
              "Packaging cost tools",
              "Seller-paid shipping guides",
              "Closet Clear Out planning tools",
              "Return and refund planning tools",
              "Handling and fulfillment checklists",
            ]}
          />

          <ResourceCategory
            title="Promotion and growth resources"
            text="Poshmark growth resources should help sellers review offer ROI, closet promotion, Closet Clear Out timing, listing ROI, sell-through, and whether more inventory is worth sourcing."
            items={[
              "Offer ROI calculators",
              "Closet promotion calculators",
              "Sell-through rate tools",
              "Listing ROI calculators",
              "Product photo optimization guides",
              "Sold-comp and pricing research",
            ]}
          />

          <ResourceCategory
            title="Inventory and operations resources"
            text="Operational tools help sellers track refunds, bundles, sales goals, inventory pressure, offer decisions, cash flow, and whether the closet is actually profitable."
            items={[
              "Inventory tracking sheets",
              "Refund and return tracking sheets",
              "Bundle pricing tools",
              "Sales goal planning templates",
              "Offer strategy worksheets",
              "Business planning resources",
            ]}
          />
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resource evaluation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before buying or subscribing to any Poshmark seller tool, compare it
            against your current business needs and expected return.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Cost"
              text="Does the monthly or one-time price make sense for your current Poshmark sales volume?"
            />
            <InfoCard
              title="Usefulness"
              text="Will it solve a recurring problem or only be used once?"
            />
            <InfoCard
              title="Profit impact"
              text="Can it help increase sales, save time, reduce refunds, improve sourcing, or protect margin?"
            />
            <InfoCard
              title="Complexity"
              text="Is it simple enough to use consistently without slowing you down?"
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark guides</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <ResourceLink href="/poshmark/how-poshmark-fees-work" label="How Poshmark Fees Work" />
            <ResourceLink href="/poshmark/how-to-price-poshmark-items" label="How to Price Poshmark Items" />
            <ResourceLink href="/poshmark/profit-margin-guide" label="Profit Margin Guide" />
            <ResourceLink href="/poshmark/seller-cost-checklist" label="Seller Cost Checklist" />
            <ResourceLink href="/poshmark/shipping-discount-guide" label="Shipping Discount Guide" />
            <ResourceLink href="/poshmark/offer-strategy-guide" label="Offer Strategy Guide" />
            <ResourceLink href="/poshmark/refunds-and-returns-cost-guide" label="Refunds and Returns Cost Guide" />
            <ResourceLink href="/poshmark/listing-roi-guide" label="Listing ROI Guide" />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">More Poshmark planning guides</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <ResourceLink href="/poshmark/inventory-restock-guide" label="Inventory Restock Guide" />
            <ResourceLink href="/poshmark/sales-goal-planning-guide" label="Sales Goal Planning Guide" />
            <ResourceLink href="/poshmark/closet-clear-out-guide" label="Closet Clear Out Guide" />
            <ResourceLink href="/poshmark/closet-promotion-strategy-guide" label="Closet Promotion Strategy Guide" />
            <ResourceLink href="/poshmark/bundle-pricing-guide" label="Bundle Pricing Guide" />
            <ResourceLink href="/poshmark/sell-through-rate-guide" label="Sell-Through Rate Guide" />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resources coming soon</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This page can later include specific recommended seller tools,
            repricing tools, sold-comp research tools, shipping tools, bookkeeping
            tools, product research tools, closet management resources, software
            comparisons, and affiliate partnerships as SellerToolSuite grows.
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

function ResourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-100"
    >
      {label}
    </a>
  );
}