export default function PoshmarkInventoryRestockGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Inventory Restock Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan Poshmark sourcing and restock decisions around sell-through rate,
          active listings, unlisted inventory, sourcing lead time, storage
          pressure, item cost, profit per sale, and inventory risk.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Poshmark restock planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark restock planning helps sellers decide when to source more
              of an item, when to slow down buying, and when to stop restocking a
              weak category. A product may sell once and still not deserve more
              inventory if the profit is low, shipping discount pressure is high,
              or the item takes too long to clean, photograph, list, and ship.
            </p>

            <p>
              A good restock plan balances sales velocity, sourcing lead time,
              available cash, storage space, and sell-through rate. The goal is
              to avoid both stockouts on strong items and overbuying slow
              inventory that sits for months.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Poshmark restock timing?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Sell-through rate"
                text="Sell-through rate shows how quickly active listings turn into sales. Faster-moving items may deserve more sourcing attention."
              />
              <InfoCard
                title="Sourcing lead time"
                text="Lead time is how long it takes to find, buy, clean, photograph, list, and prepare replacement inventory."
              />
              <InfoCard
                title="Profit per item"
                text="A fast-selling item is only worth restocking if the profit after Poshmark fees, packaging, shipping discounts, and offers is strong enough."
              />
              <InfoCard
                title="Storage pressure"
                text="Restocking too many similar items can tie up cash and space if sell-through slows down."
              />
              <InfoCard
                title="Seasonality"
                text="Demand can change by season, trend, brand, size, condition, category, and buyer behavior."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark restock mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Buying more inventory before checking sell-through rate.",
                "Counting active listings as productive inventory when they are stale.",
                "Restocking slow-moving items because they sold once.",
                "Ignoring shipping discounts, Poshmark fees, packaging, and offer pressure.",
                "Running out of best sellers because sourcing lead time was not planned.",
                "Using total closet sales instead of product-level sales velocity.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan Poshmark restocks</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track units sold"
              text="Measure how many similar items sell per week or month for each brand, size, or category."
            />
            <StepCard
              title="Add lead time"
              text="Include sourcing, cleaning, photographing, listing, and shipping preparation time."
            />
            <StepCard
              title="Check profit"
              text="Confirm the item is profitable after item cost, Poshmark fees, shipping discounts, packaging, and offers."
            />
            <StepCard
              title="Calculate need"
              text="Restock only enough to cover demand without overloading cash or storage."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark restock calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how inventory, sales velocity, and lead time
              affect whether more sourcing is needed.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Current unlisted inventory" value="80 units" />
              <Breakdown label="Active listings" value="120" />
              <Breakdown label="Available inventory" value="200" />
              <Breakdown label="Monthly sales" value="40" />
              <Breakdown label="Average daily sales" value="1.3 units" />
              <Breakdown label="Sourcing lead time" value="14 days" />
              <Breakdown label="Target stock window" value="45 days" />
              <Breakdown label="Recommended restock" value="0 units" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, available inventory already covers the target
              stock window, so the seller may not need to source more until sales
              velocity increases or inventory drops.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Restock decisions to review</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Reorder point"
                text="The inventory level where sourcing should begin before the item runs out."
              />
              <InfoCard
                title="Restock quantity"
                text="The amount to source so you can cover demand without tying up too much cash."
              />
              <InfoCard
                title="Stockout risk"
                text="The risk of missing sales because inventory runs out before replacements are listed."
              />
              <InfoCard
                title="Overstock risk"
                text="The risk of buying too many similar items and slowing cash flow."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Poshmark inventory restock checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Current inventory by product, brand, size, or category.",
              "Active listings and unlisted inventory already sourced.",
              "Average daily or weekly sales velocity.",
              "Sell-through rate for similar listings.",
              "Sourcing lead time, cleaning time, and listing time.",
              "Average profit per sale after shipping, packaging, fees, and offers.",
              "Storage space, cash tied up, and slow-moving inventory risk.",
              "Seasonal demand, trends, size, condition, and category changes.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark restock planning
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track sell-through"
              text="Measure sold items against active listings, not total inventory."
            />
            <StepCard
              title="Prioritize winners"
              text="Restock items with proven demand, strong profit, and manageable shipping."
            />
            <StepCard
              title="Limit dead stock"
              text="Avoid buying more of items that sit too long or require repeated discounts."
            />
            <StepCard
              title="Plan before sourcing"
              text="Estimate how many units you can sell before buying more inventory."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/poshmark/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/poshmark/sales-goal-calculator" label="Sales Goal Calculator" />
          </div>
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
          Example Poshmark inventory restock item.
        </p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
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