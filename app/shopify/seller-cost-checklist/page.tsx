export default function ShopifySellerCostChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Seller Cost Checklist
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Use this checklist of Shopify costs to avoid underpricing products or
          underestimating profit pressure from product costs, shipping,
          fulfillment, apps, payment fees, advertising, refunds, and overhead.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What costs should Shopify sellers track?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify sellers should track both order-level costs and store-level
            costs. Order-level costs happen each time a customer buys something.
            Store-level costs exist even before an order is placed, such as the
            Shopify plan, apps, software, bookkeeping, subscriptions, and other
            overhead.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The most common mistake is judging profit from revenue alone. A store
            can grow sales while margin gets worse if shipping, ads, discounts,
            refunds, or app costs rise faster than profit.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Order-level Shopify costs</h2>

            <div className="mt-5 space-y-3">
              <ChecklistItem text="Product cost, supplier cost, production cost, or landed inventory cost." />
              <ChecklistItem text="Inbound freight, duties, tariffs, or shipping paid to receive inventory." />
              <ChecklistItem text="Shipping labels, carrier surcharges, insurance, and delivery upgrades." />
              <ChecklistItem text="Packaging, boxes, mailers, tape, labels, inserts, and protective material." />
              <ChecklistItem text="Payment processing percentage and fixed transaction fee." />
              <ChecklistItem text="Fulfillment, pick-pack, warehouse, or handling cost." />
              <ChecklistItem text="Ad cost, affiliate commission, influencer cost, or acquisition cost per order." />
              <ChecklistItem text="Refund allowance, replacement cost, return shipping, and chargeback risk." />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Store-level Shopify costs</h2>

            <div className="mt-5 space-y-3">
              <ChecklistItem text="Monthly Shopify plan cost." />
              <ChecklistItem text="Paid apps, subscriptions, upsell tools, review tools, and subscription apps." />
              <ChecklistItem text="Themes, page builders, design tools, and creative software." />
              <ChecklistItem text="Email marketing, SMS, CRM, analytics, heatmaps, and automation tools." />
              <ChecklistItem text="Bookkeeping, tax software, professional services, and accounting support." />
              <ChecklistItem text="Contractors, customer support, virtual assistants, designers, or developers." />
              <ChecklistItem text="Domain, email, hosting-adjacent tools, and brand assets." />
              <ChecklistItem text="Inventory storage, warehouse minimums, and slow-moving stock costs." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to use this Shopify cost checklist</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="List order costs"
              text="Start with the costs that happen each time a product is sold and shipped."
            />
            <StepCard
              title="List monthly costs"
              text="Add Shopify plan fees, app subscriptions, software, labor, and overhead."
            />
            <StepCard
              title="Separate by product"
              text="Check whether each product has different shipping, refund, ad, or fulfillment costs."
            />
            <StepCard
              title="Review monthly"
              text="Update costs when supplier pricing, shipping, ads, refunds, or apps change."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how several small costs can quickly reduce
              product profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value="$45.00" />
              <Breakdown label="Product cost" value="-$14.00" />
              <Breakdown label="Shipping cost" value="-$6.50" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Payment fee estimate" value="-$1.61" />
              <Breakdown label="Ad cost per order" value="-$5.00" />
              <Breakdown label="Refund allowance" value="-$1.50" />
              <Breakdown label="Estimated profit before fixed costs" value="$15.14" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              This profit still needs to help cover fixed store costs such as
              Shopify plan fees, apps, software, bookkeeping, and other monthly
              overhead.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify cost mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Pricing products from supplier cost only instead of total selling cost." />
              <Warning text="Forgetting payment fees, packaging, shipping surcharges, and fulfillment labor." />
              <Warning text="Ignoring app costs because each app looks small on its own." />
              <Warning text="Treating ad spend as optional even when sales depend on paid traffic." />
              <Warning text="Not assigning refunds, returns, chargebacks, and replacements to product profit." />
              <Warning text="Using store-wide averages when different products have very different margins." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify cost categories to review</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="Product and inventory"
              text="Supplier cost, production cost, landed cost, minimum order quantities, storage, dead stock, and restock cash needs."
            />
            <InfoBlock
              title="Shipping and fulfillment"
              text="Shipping labels, packaging, fulfillment services, warehouse fees, handling labor, and delivery adjustments."
            />
            <InfoBlock
              title="Marketing and acquisition"
              text="Ad spend, affiliate commissions, influencer fees, discounts, coupons, giveaways, and promotional costs."
            />
            <InfoBlock
              title="Platform and apps"
              text="Shopify plan, app subscriptions, themes, page builders, email tools, review tools, analytics, and automation software."
            />
            <InfoBlock
              title="Customer issue costs"
              text="Refunds, returns, chargebacks, replacement orders, damaged shipments, support time, and goodwill discounts."
            />
            <InfoBlock
              title="Business overhead"
              text="Bookkeeping, taxes, accounting tools, professional help, contractors, design tools, domains, and admin software."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">When to update your Shopify cost checklist</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Supplier changes"
              text="Update costs when product price, minimum order quantity, or inbound shipping changes."
            />
            <StepCard
              title="Shipping changes"
              text="Recheck pricing when carrier rates, packaging size, or fulfillment partners change."
            />
            <StepCard
              title="Ad changes"
              text="Review margin when cost per click, conversion rate, or acquisition cost changes."
            />
            <StepCard
              title="Refund changes"
              text="Adjust profit assumptions when refunds, returns, or replacements become more common."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/refund-impact-calculator" label="Refund Impact Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
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

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
        ✓
      </span>
      <p>{text}</p>
    </div>
  );
}

function Breakdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="font-bold">{label}</p>
        <p className="mt-1 text-xs text-slate-600">
          Example Shopify cost checklist item.
        </p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
        !
      </span>
      <p>{text}</p>
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