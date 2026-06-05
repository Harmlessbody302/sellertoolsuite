export default function ShopifyInventoryRestockGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Inventory Restock Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan Shopify restocks around sales velocity, supplier lead time, product
          risk, cash flow, reorder points, safety stock, and inventory cost.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Shopify restock planning matters
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify inventory planning affects sales, cash flow, customer
            experience, and advertising. If a product runs out of stock, the store
            can lose sales, interrupt ads, disappoint customers, and weaken repeat
            purchase momentum. If too much inventory is ordered, cash can get tied
            up in slow-moving stock.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A good restock plan balances sales velocity, supplier lead time,
            safety stock, demand spikes, storage limits, and the amount of money
            available for inventory. The goal is to reorder before stockouts
            happen without overbuying inventory that may take too long to sell.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Shopify restock timing?</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Sales velocity"
                text="Sales velocity is how many units sell per day, week, or month. Faster-moving products usually need earlier reorder planning."
              />
              <InfoBlock
                title="Supplier lead time"
                text="Lead time is how long it takes to produce, ship, receive, and prepare inventory for sale."
              />
              <InfoBlock
                title="Safety stock"
                text="Safety stock is extra inventory held to protect against supplier delays, shipping delays, demand spikes, or forecasting errors."
              />
              <InfoBlock
                title="Cash flow"
                text="Restocking too aggressively can tie up money that may be needed for ads, fulfillment, apps, or other products."
              />
              <InfoBlock
                title="Seasonality"
                text="Holiday demand, events, weather, trends, and ad campaigns can change how quickly inventory sells."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify restock mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Waiting until inventory is almost gone before placing a reorder." />
              <Warning text="Ignoring supplier lead time, shipping delays, and receiving time." />
              <Warning text="Using total store sales instead of product-level sales velocity." />
              <Warning text="Restocking slow-moving products before checking cash flow and sell-through." />
              <Warning text="Scaling ads without confirming enough inventory is available." />
              <Warning text="Forgetting safety stock for seasonal spikes, delays, and demand changes." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan Shopify restocks</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track units sold"
              text="Measure how many units sell per day or week for each product."
            />
            <StepCard
              title="Add lead time"
              text="Include supplier production, shipping, receiving, and fulfillment prep time."
            />
            <StepCard
              title="Set safety stock"
              text="Add extra units for delays, ad spikes, seasonality, or unexpected demand."
            />
            <StepCard
              title="Calculate reorder point"
              text="Reorder before inventory falls below expected lead-time demand plus safety stock."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify restock calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how sales velocity and lead time determine when
              to reorder.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Current inventory" value="180 units" />
              <Breakdown label="Incoming inventory" value="40 units" />
              <Breakdown label="Available inventory" value="220 units" />
              <Breakdown label="Average daily sales" value="8 units" />
              <Breakdown label="Adjusted daily sales" value="10 units" />
              <Breakdown label="Supplier lead time" value="14 days" />
              <Breakdown label="Safety stock" value="7 days" />
              <Breakdown label="Estimated reorder point" value="213 units" />
              <Breakdown label="Recommended restock" value="236 units" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, inventory is close to the reorder point. The seller
              should plan the next restock soon so supplier lead time does not
              create a stockout.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Restock decisions to review</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Reorder point"
                text="The inventory level where a reorder should be placed to avoid running out before the next shipment arrives."
              />
              <InfoBlock
                title="Restock quantity"
                text="The number of units needed to reach the target stock window without tying up too much cash."
              />
              <InfoBlock
                title="Stockout risk"
                text="The risk of losing sales because inventory runs out before new stock arrives."
              />
              <InfoBlock
                title="Overstock risk"
                text="The risk of buying too much inventory and slowing cash flow with products that take too long to sell."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify inventory restock checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Current inventory by product or variant." />
            <Check text="Incoming inventory already ordered." />
            <Check text="Average daily or weekly sales velocity." />
            <Check text="Supplier production, shipping, receiving, and prep lead time." />
            <Check text="Safety stock for supplier delays and demand spikes." />
            <Check text="Target stock window based on cash flow and sales speed." />
            <Check text="Inventory cost, restock cost, and cash tied up in stock." />
            <Check text="Seasonal demand, ad campaigns, promotions, and launch timing." />
            <Check text="Storage limits, fulfillment limits, and slow-moving inventory risk." />
            <Check text="Whether the product is profitable enough to deserve restocking." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify restock planning</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track product velocity"
              text="Monitor units sold by product instead of only watching total store revenue."
            />
            <StepCard
              title="Protect best sellers"
              text="Prioritize restocks for profitable products with consistent demand and strong ROI."
            />
            <StepCard
              title="Limit dead stock"
              text="Avoid over-ordering products with weak conversion, poor margins, or slow sell-through."
            />
            <StepCard
              title="Plan before ads"
              text="Confirm inventory is ready before increasing ad spend or running promotions."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/shopify/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/listing-roi-calculator" label="Listing ROI Calculator" />
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

function Breakdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="font-bold">{label}</p>
        <p className="mt-1 text-xs text-slate-600">
          Example Shopify inventory restock item.
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

function Check({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
        ✓
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