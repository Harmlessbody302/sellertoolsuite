const restockFactors = [
  {
    title: "Sell-through rate",
    text: "Sell-through rate shows how quickly active listings turn into sales. Faster-moving items may deserve more sourcing attention.",
  },
  {
    title: "Sourcing lead time",
    text: "Lead time is how long it takes to find, buy, clean, photograph, list, and prepare replacement inventory.",
  },
  {
    title: "Profit per item",
    text: "A fast-selling item is only worth restocking if the profit after shipping, fees, packaging, and offers is strong enough.",
  },
  {
    title: "Storage pressure",
    text: "Restocking too many similar items can tie up cash and space if sell-through slows down.",
  },
  {
    title: "Seasonality",
    text: "Demand can change by season, trend, size, condition, brand, and buyer behavior.",
  },
];

const mistakes = [
  "Buying more inventory before checking sell-through rate.",
  "Counting active listings as productive inventory when they are stale.",
  "Restocking slow-moving items because they sold once.",
  "Ignoring shipping cost, fees, packaging, and offer pressure.",
  "Running out of best sellers because sourcing lead time was not planned.",
  "Using total store sales instead of product-level sales velocity.",
];

const exampleRows = [
  ["Current unlisted inventory", "80 units"],
  ["Active listings", "120"],
  ["Available inventory", "200"],
  ["Monthly sales", "40"],
  ["Average daily sales", "1.3 units"],
  ["Sourcing lead time", "14 days"],
  ["Target stock window", "45 days"],
  ["Recommended restock", "0 units"],
];

const restockDecisions = [
  {
    title: "Reorder point",
    text: "The inventory level where sourcing should begin before the item runs out.",
  },
  {
    title: "Restock quantity",
    text: "The amount to source so you can cover demand without tying up too much cash.",
  },
  {
    title: "Stockout risk",
    text: "The risk of missing sales because inventory runs out before replacements are listed.",
  },
  {
    title: "Overstock risk",
    text: "The risk of buying too many similar items and slowing cash flow.",
  },
];

const checklist = [
  "Current inventory by product or category.",
  "Active listings and unlisted inventory already sourced.",
  "Average daily or weekly sales velocity.",
  "Sell-through rate for similar listings.",
  "Sourcing lead time, cleaning time, and listing time.",
  "Average profit per sale after shipping, packaging, fees, and offers.",
  "Storage space, cash tied up, and slow-moving inventory risk.",
  "Seasonal demand, trends, size, condition, and category changes.",
];

const improvementCards = [
  {
    title: "Track sell-through",
    text: "Measure sold items against active listing count, not total inventory.",
  },
  {
    title: "Prioritize winners",
    text: "Restock items with proven demand, strong profit, and manageable shipping.",
  },
  {
    title: "Limit dead stock",
    text: "Avoid buying more of items that sit too long or require repeated discounts.",
  },
  {
    title: "Plan before sourcing",
    text: "Estimate how many units you can sell before buying more inventory.",
  },
];

export default function MercariInventoryRestockGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Inventory Restock Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan Mercari sourcing and restock decisions around sell-through rate,
          active listings, unlisted inventory, sourcing lead time, storage
          pressure, item cost, profit per sale, and inventory risk.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Mercari restock planning matters
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari restock planning helps sellers decide when to source more of
            an item, when to slow down buying, and when to stop restocking a weak
            category. A product may sell once and still not deserve more
            inventory if the profit is low, shipping is expensive, or the item
            takes too long to clean, photograph, and list.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A good restock plan balances sales velocity, sourcing lead time,
            available cash, storage space, and sell-through rate. The goal is to
            avoid both stockouts on strong items and overbuying slow inventory
            that sits for months.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Mercari restock timing?
            </h2>

            <div className="mt-5 space-y-4">
              {restockFactors.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari restock mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan Mercari restocks</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track units sold"
              text="Measure how many items sell per week or month for each product type."
            />
            <StepCard
              title="Add lead time"
              text="Include sourcing, cleaning, photographing, listing, and shipping preparation time."
            />
            <StepCard
              title="Check profit"
              text="Confirm the item is profitable after cost, shipping, fees, packaging, and offers."
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
              Example Mercari restock calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how inventory, sales velocity, and lead time
              affect whether more sourcing is needed.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
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
              {restockDecisions.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Mercari inventory restock checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari restock planning
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {improvementCards.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/mercari/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/mercari/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/mercari/sales-goal-calculator" label="Sales Goal Calculator" />
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
          Example Mercari inventory restock item.
        </p>
      </div>
      <p className="font-bold">{value}</p>
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