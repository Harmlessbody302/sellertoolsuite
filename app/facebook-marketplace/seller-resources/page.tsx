export default function FacebookMarketplaceSellerResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Seller Resources
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Seller Resources
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          A curated resource hub for Facebook Marketplace sellers who want help
          with profit planning, pricing, fees, shipping, local delivery,
          negotiation, refunds, bundles, sell-through, pickup safety, and local
          selling operations.
        </p>

        <section className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <h2 className="text-xl font-bold">Affiliate disclosure</h2>
          <p className="mt-3 text-sm leading-6 text-yellow-900">
            Some links on SellerToolSuite may be affiliate links. If you click a
            link and make a purchase, SellerToolSuite may receive compensation
            at no extra cost to you. Recommendations should still be reviewed
            based on your own Facebook Marketplace seller needs, budget, and
            business goals.
          </p>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Start with SellerToolSuite calculators
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before paying for outside tools or services, use these free
            calculators to understand your Facebook Marketplace pricing, profit,
            shipping, local delivery, negotiation, inventory, refunds, and growth
            planning.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <ResourceButton
              href="/facebook-marketplace/profit-calculator"
              label="Profit Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/pricing-calculator"
              label="Pricing Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/break-even-calculator"
              label="Break-Even Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/shipping-profit-calculator"
              label="Shipping Profit Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/negotiation-calculator"
              label="Negotiation Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/product-cost-calculator"
              label="Product Cost Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/local-delivery-cost-calculator"
              label="Local Delivery Cost Calculator"
            />
            <ResourceButton
              href="/facebook-marketplace/bundle-pricing-calculator"
              label="Bundle Pricing Calculator"
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Pricing and profit resources
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Resources in this category should help Facebook Marketplace
              sellers understand whether products are profitable, whether
              pricing is sustainable, and how local selling costs affect margin.
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
              <li>Facebook Marketplace profit calculators</li>
              <li>Pricing and break-even tools</li>
              <li>Product cost tracking spreadsheets</li>
              <li>Profit margin guides</li>
              <li>Offer and negotiation planning tools</li>
              <li>Bundle pricing resources</li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Shipping and delivery resources
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Shipping and delivery resources should help sellers compare
              shipped orders, buyer pickup, local delivery, packaging cost,
              delivery time, and operational workload.
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
              <li>Shipping profit calculators</li>
              <li>Packaging cost tools</li>
              <li>Local delivery calculators</li>
              <li>Pickup and delivery planning guides</li>
              <li>Safe meetup and pickup resources</li>
              <li>Handling and fulfillment checklists</li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Negotiation and offer resources
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Facebook Marketplace sellers often deal with buyer offers,
              counteroffers, bundle requests, pickup delays, delivery requests,
              and last-minute price changes.
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
              <li>Negotiation calculators</li>
              <li>Offer ROI calculators</li>
              <li>Minimum acceptable price tools</li>
              <li>Counteroffer planning guides</li>
              <li>Bundle negotiation resources</li>
              <li>Buyer message and pickup boundary checklists</li>
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Inventory and growth resources
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Growth resources should help sellers track sell-through, restocks,
              refunds, stale listings, local demand, sourcing quality, and
              whether more inventory is worth buying.
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
              <li>Inventory restock calculators</li>
              <li>Sell-through rate tools</li>
              <li>Listing ROI calculators</li>
              <li>Sales goal planning templates</li>
              <li>Refund and return tracking sheets</li>
              <li>Business planning resources</li>
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resource evaluation checklist</h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Before buying or subscribing to any Facebook Marketplace seller
            tool, compare it against your current selling needs and expected
            return.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Cost"
              text="Does the monthly or one-time price make sense for your current Facebook Marketplace sales volume?"
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
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace guides
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <ResourceButton
              href="/facebook-marketplace/how-facebook-marketplace-fees-work"
              label="How Facebook Marketplace Fees Work"
            />
            <ResourceButton
              href="/facebook-marketplace/how-to-price-facebook-marketplace-items"
              label="How to Price Facebook Marketplace Items"
            />
            <ResourceButton
              href="/facebook-marketplace/profit-margin-guide"
              label="Profit Margin Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/seller-cost-checklist"
              label="Seller Cost Checklist"
            />
            <ResourceButton
              href="/facebook-marketplace/shipping-cost-guide"
              label="Shipping Cost Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/local-delivery-guide"
              label="Local Delivery Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/negotiation-strategy-guide"
              label="Negotiation Strategy Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/refunds-and-returns-cost-guide"
              label="Refunds and Returns Cost Guide"
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            More Facebook Marketplace planning guides
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <ResourceButton
              href="/facebook-marketplace/listing-roi-guide"
              label="Listing ROI Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/inventory-restock-guide"
              label="Inventory Restock Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/sales-goal-planning-guide"
              label="Sales Goal Planning Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/bundle-pricing-guide"
              label="Bundle Pricing Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/sell-through-rate-guide"
              label="Sell-Through Rate Guide"
            />
            <ResourceButton
              href="/facebook-marketplace/local-pickup-safety-guide"
              label="Local Pickup Safety Guide"
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resources coming soon</h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            This page can later include specific recommended seller tools,
            repricing tools, local comp research tools, pickup safety resources,
            bookkeeping tools, product research tools, delivery planning
            resources, software comparisons, and affiliate partnerships as
            SellerToolSuite grows.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <p className="text-sm leading-6 text-yellow-900">
            Resource recommendations are for general planning purposes only.
            Always compare pricing, features, current terms, seller
            requirements, marketplace policies, local rules, safety needs, and
            suitability before using any third-party tool, software, course,
            service, or supplier.
          </p>
        </section>
      </section>
    </main>
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

function ResourceButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-100"
    >
      {label}
    </a>
  );
}