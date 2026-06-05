export default function ShopifySellerResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Seller Resources
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          A curated resource hub for Shopify sellers who want help with pricing,
          profit planning, fees, shipping, ads, conversion, inventory, refunds,
          bundles, subscriptions, and selling operations.
        </p>

        <section className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 shadow-sm">
          <h2 className="text-xl font-bold">Affiliate disclosure</h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            Some links on SellerToolSuite may be affiliate links. If you click a
            link and make a purchase, SellerToolSuite may receive compensation at
            no extra cost to you. Recommendations should still be reviewed based
            on your own Shopify seller needs, budget, and business goals.
          </p>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Start with SellerToolSuite calculators</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before paying for outside tools or services, use these free calculators
            to understand your Shopify pricing, fees, profit, ads, shipping,
            inventory, refunds, and growth planning.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/fee-calculator" label="Fee Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/shopify/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/shopify/inventory-restock-calculator" label="Inventory Restock Calculator" />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Pricing and profit resources</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Resources in this category should help Shopify sellers understand
              whether products are profitable, whether pricing is sustainable,
              and how fees affect margins.
            </p>

            <ul className="mt-5 list-inside list-disc space-y-3 text-sm leading-6 text-slate-700">
              <li>Shopify fee calculators</li>
              <li>Profit margin guides</li>
              <li>Product cost tracking spreadsheets</li>
              <li>Break-even pricing tools</li>
              <li>Pricing strategy guides</li>
              <li>Discount and coupon planning tools</li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shipping and fulfillment resources</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fulfillment resources should help sellers compare shipping labels,
              packaging costs, handling time, fulfillment services, delivery
              expectations, and operational workload.
            </p>

            <ul className="mt-5 list-inside list-disc space-y-3 text-sm leading-6 text-slate-700">
              <li>Shipping cost calculators</li>
              <li>Packaging cost tools</li>
              <li>Fulfillment comparison guides</li>
              <li>Free shipping threshold tools</li>
              <li>Return shipping planning tools</li>
              <li>Handling and fulfillment checklists</li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Marketing and conversion resources</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Shopify marketing resources should help sellers understand ad
              performance, conversion rate, customer acquisition cost, product
              page quality, and revenue per visitor.
            </p>

            <ul className="mt-5 list-inside list-disc space-y-3 text-sm leading-6 text-slate-700">
              <li>Ad ROI calculators</li>
              <li>Conversion rate tools</li>
              <li>Product page optimization guides</li>
              <li>Customer acquisition cost calculators</li>
              <li>Landing page and checkout checklists</li>
              <li>Email, retargeting, and repeat buyer resources</li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Inventory and operations resources</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Operational tools help sellers track restocks, refunds, returns,
              subscriptions, bundles, customer support, cash flow, and whether
              the store is actually profitable.
            </p>

            <ul className="mt-5 list-inside list-disc space-y-3 text-sm leading-6 text-slate-700">
              <li>Inventory restock calculators</li>
              <li>Refund and return tracking sheets</li>
              <li>Bundle pricing tools</li>
              <li>Subscription profit calculators</li>
              <li>Sales goal planning templates</li>
              <li>Business planning resources</li>
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resource evaluation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before buying or subscribing to any Shopify seller tool, compare it
            against your current business needs and expected return.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Cost"
              text="Does the monthly or one-time price make sense for your current Shopify sales volume?"
            />
            <StepCard
              title="Usefulness"
              text="Will it solve a recurring problem or only be used once?"
            />
            <StepCard
              title="Profit impact"
              text="Can it help increase sales, save time, reduce refunds, improve sourcing, or protect margin?"
            />
            <StepCard
              title="Complexity"
              text="Is it simple enough to use consistently without slowing you down?"
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify guides</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/how-shopify-fees-work" label="How Shopify Fees Work" />
            <Related href="/shopify/how-to-price-shopify-products" label="How to Price Shopify Products" />
            <Related href="/shopify/profit-margin-guide" label="Profit Margin Guide" />
            <Related href="/shopify/seller-cost-checklist" label="Seller Cost Checklist" />
            <Related href="/shopify/shipping-cost-guide" label="Shipping Cost Guide" />
            <Related href="/shopify/ad-spend-strategy-guide" label="Ad Spend Strategy Guide" />
            <Related href="/shopify/discount-strategy-guide" label="Discount Strategy Guide" />
            <Related href="/shopify/refunds-and-returns-cost-guide" label="Refunds and Returns Cost Guide" />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">More Shopify planning guides</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/conversion-rate-guide" label="Conversion Rate Guide" />
            <Related href="/shopify/listing-roi-guide" label="Listing ROI Guide" />
            <Related href="/shopify/inventory-restock-guide" label="Inventory Restock Guide" />
            <Related href="/shopify/sales-goal-planning-guide" label="Sales Goal Planning Guide" />
            <Related href="/shopify/bundle-pricing-guide" label="Bundle Pricing Guide" />
            <Related href="/shopify/subscription-pricing-guide" label="Subscription Pricing Guide" />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resources coming soon</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            This page can later include specific recommended seller tools,
            repricing tools, product research tools, ad tools, bookkeeping tools,
            fulfillment resources, software comparisons, and affiliate
            partnerships as SellerToolSuite grows.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-sm leading-6 text-amber-900">
            Resource recommendations are for general planning purposes only.
            Always compare pricing, features, current terms, seller requirements,
            platform policies, and suitability before using any third-party tool,
            software, course, service, or supplier.
          </p>
        </section>
      </section>
    </main>
  );
}

function StepCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Related({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-100"
    >
      {label}
    </a>
  );
}