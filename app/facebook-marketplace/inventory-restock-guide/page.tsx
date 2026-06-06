export default function FacebookMarketplaceInventoryRestockGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Inventory Restock Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan Facebook Marketplace sourcing and restock decisions around
          sell-through rate, active listings, unlisted inventory, local demand,
          sourcing lead time, storage pressure, item cost, and profit per sale.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Facebook Marketplace restock planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace restock planning helps sellers decide when to
              source more of an item, when to slow down buying, and when to stop
              restocking a weak category. A product may sell once and still not
              deserve more inventory if the profit is low, pickup friction is
              high, delivery is inconvenient, or the item takes too long to
              clean, photograph, list, and store.
            </p>

            <p>
              A good restock plan balances sales velocity, local buyer demand,
              available cash, storage space, sell-through rate, and sourcing
              time. The goal is to avoid both stockouts on strong items and
              overbuying slow inventory that sits for months.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace restock timing?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Sell-through rate"
                text="Sell-through rate shows how quickly active listings turn into sales. Faster-moving items may deserve more sourcing attention."
              />
              <InfoBlock
                title="Local demand"
                text="Facebook Marketplace demand depends heavily on location, buyer population, category, season, price, condition, and pickup convenience."
              />
              <InfoBlock
                title="Sourcing lead time"
                text="Lead time is how long it takes to find, buy, transport, clean, repair, photograph, write, and list replacement inventory."
              />
              <InfoBlock
                title="Profit per item"
                text="A fast-selling item is only worth restocking if the profit after item cost, packaging, delivery, shipping, offers, and issue risk is strong enough."
              />
              <InfoBlock
                title="Storage pressure"
                text="Restocking too many similar items can tie up cash and space if sell-through slows down or local demand shifts."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace restock mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Buying more inventory before checking sell-through rate.",
                "Counting unlisted inventory as productive inventory before it is active.",
                "Restocking slow-moving items because they sold once.",
                "Ignoring pickup friction, delivery cost, repair time, and buyer message workload.",
                "Running out of best sellers because sourcing lead time was not planned.",
                "Using total closet or garage inventory instead of product-level sales velocity.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan Facebook Marketplace restocks
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Track units sold"
              text="Measure how many similar items sell per week or month for each product type."
            />
            <InfoCard
              title="Add lead time"
              text="Include sourcing, transport, cleaning, repair, photographing, writing, and listing preparation time."
            />
            <InfoCard
              title="Check profit"
              text="Confirm the item is profitable after item cost, delivery, shipping, packaging, offers, and issue risk."
            />
            <InfoCard
              title="Calculate need"
              text="Restock only enough to cover demand without overloading cash, space, or listing workload."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace restock calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how inventory, sales velocity, and lead time
              affect whether more sourcing is needed.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Current unlisted inventory"
                note="Example Facebook Marketplace inventory restock item."
                value="60 units"
              />
              <Breakdown
                label="Active listings"
                note="Example Facebook Marketplace inventory restock item."
                value="80"
              />
              <Breakdown
                label="Available inventory"
                note="Example Facebook Marketplace inventory restock item."
                value="140"
              />
              <Breakdown
                label="Monthly sales"
                note="Example Facebook Marketplace inventory restock item."
                value="25"
              />
              <Breakdown
                label="Average daily sales"
                note="Example Facebook Marketplace inventory restock item."
                value="0.8 units"
              />
              <Breakdown
                label="Sourcing lead time"
                note="Example Facebook Marketplace inventory restock item."
                value="10 days"
              />
              <Breakdown
                label="Target stock window"
                note="Example Facebook Marketplace inventory restock item."
                value="45 days"
              />
              <Breakdown
                label="Recommended restock"
                note="Example Facebook Marketplace inventory restock item."
                value="0 units"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, available inventory already covers the target
              stock window, so the seller may not need to source more until sales
              velocity increases or inventory drops.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Restock decisions to review
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Reorder point"
                text="The inventory level where sourcing should begin before the item runs out."
              />
              <InfoBlock
                title="Restock quantity"
                text="The amount to source so you can cover demand without tying up too much cash."
              />
              <InfoBlock
                title="Stockout risk"
                text="The risk of missing sales because inventory runs out before replacements are listed."
              />
              <InfoBlock
                title="Overstock risk"
                text="The risk of buying too many similar items and slowing cash flow."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace inventory restock checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Current inventory by product, brand, size, condition, or category." />
            <ChecklistItem text="Active listings and unlisted inventory already sourced." />
            <ChecklistItem text="Average daily or weekly sales velocity." />
            <ChecklistItem text="Sell-through rate for similar listings." />
            <ChecklistItem text="Sourcing lead time, cleaning time, repair time, and listing time." />
            <ChecklistItem text="Average profit per sale after item cost, delivery, shipping, offers, and issue risk." />
            <ChecklistItem text="Storage space, cash tied up, and slow-moving inventory risk." />
            <ChecklistItem text="Seasonal demand, trends, condition, pickup convenience, and category changes." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace restock planning
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Track sell-through"
              text="Measure sold items against active listing count, not total inventory."
            />
            <InfoCard
              title="Prioritize winners"
              text="Restock items with proven demand, strong profit, and manageable pickup or delivery needs."
            />
            <InfoCard
              title="Limit dead stock"
              text="Avoid buying more of items that sit too long or require repeated discounts."
            />
            <InfoCard
              title="Plan before sourcing"
              text="Estimate how many units you can sell before buying more inventory."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/facebook-marketplace/sales-goal-calculator" label="Sales Goal Calculator" />
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

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Breakdown({
  label,
  note,
  value,
}: {
  label: string;
  note: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="font-bold">{label}</p>
        <p className="mt-1 text-xs text-slate-600">{note}</p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
        ✓
      </span>
      <p>{text}</p>
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