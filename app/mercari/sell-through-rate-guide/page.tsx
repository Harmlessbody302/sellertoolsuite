const sellThroughFactors = [
  {
    title: "Active listings",
    text: "Sell-through rate should usually be measured against active listings, not every item you own. Unlisted inventory cannot sell until it is listed.",
  },
  {
    title: "Monthly sales",
    text: "Monthly sales show how many active listings are actually converting into buyers during the period being measured.",
  },
  {
    title: "Listing quality",
    text: "Photos, title, description, condition notes, measurements, category, and shipping clarity can all affect whether a listing sells.",
  },
  {
    title: "Pricing and offers",
    text: "High prices, weak offer room, or poor sold-comp alignment can reduce sell-through even when the item has demand.",
  },
  {
    title: "Category demand",
    text: "Some Mercari categories sell faster than others. Demand can change by season, trend, brand, size, condition, and buyer intent.",
  },
];

const mistakes = [
  "Counting total inventory instead of active listings.",
  "Treating views or likes as sales performance without checking conversions.",
  "Buying more inventory before checking sell-through rate.",
  "Leaving stale listings unchanged for months.",
  "Using one store-wide sell-through rate for products with very different demand.",
  "Ignoring price, photos, shipping, and condition when sell-through slows down.",
];

const exampleRows = [
  ["Active listings", "120"],
  ["Monthly sales", "30"],
  ["Sell-through rate", "25.0%"],
  ["Average sale price", "$35.00"],
  ["Average profit per sale", "$12.00"],
  ["Monthly revenue", "$1,050.00"],
  ["Monthly profit", "$360.00"],
  ["Listings needed for 50 sales", "200"],
];

const interpretationCards = [
  {
    title: "Strong sell-through",
    text: "A strong rate may mean the category has demand and can support more sourcing if profit and shipping remain healthy.",
  },
  {
    title: "Healthy sell-through",
    text: "A healthy rate suggests listings are moving, but sellers should still check profit, refund risk, and sourcing consistency.",
  },
  {
    title: "Slow sell-through",
    text: "Slow movement may point to weak pricing, poor photos, unclear descriptions, low demand, or too much stale inventory.",
  },
  {
    title: "Uneven sell-through",
    text: "Some items may sell quickly while others sit. Product-level tracking is better than relying only on store-wide averages.",
  },
];

const checklist = [
  "Active listing count for the period being measured.",
  "Monthly sold item count.",
  "Sell-through rate by product type or category.",
  "Average sale price and profit per sale.",
  "Listing age and stale listing count.",
  "Photos, title, description, measurements, and condition clarity.",
  "Shipping setup, buyer offer room, and sold-comp alignment.",
  "Whether to source more, relist, discount, bundle, or retire items.",
];

const improvementCards = [
  {
    title: "Improve listings",
    text: "Update photos, titles, descriptions, measurements, and condition details on slow items.",
  },
  {
    title: "Use sold comps",
    text: "Compare against completed sales instead of only active listing prices.",
  },
  {
    title: "Relist stale items",
    text: "Refresh or rebuild listings that have stopped getting useful buyer activity.",
  },
  {
    title: "Source proven items",
    text: "Buy more only after confirming profit, demand, shipping cost, and sell-through.",
  },
];

export default function MercariSellThroughRateGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Sell-Through Rate Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Mercari sell-through rate works, how active listings turn
          into sales, how stale inventory affects growth, and when to source
          more, relist, discount, bundle, or retire items.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Mercari sell-through rate?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari sell-through rate measures how many active listings sell
            during a chosen period. For example, if a seller has 120 active
            listings and sells 30 items in a month, the monthly sell-through rate
            is 25%.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Sell-through rate helps sellers decide whether inventory is moving
            quickly enough to justify sourcing more. A high rate can support
            restocking, while a low rate may mean listings need better photos,
            clearer descriptions, improved pricing, or more realistic sourcing.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Mercari sell-through?
            </h2>

            <div className="mt-5 space-y-4">
              {sellThroughFactors.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari sell-through mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to calculate Mercari sell-through rate
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Count active listings"
              text="Use listings that were available for buyers to purchase during the period."
            />
            <StepCard
              title="Count sales"
              text="Count completed sales during the same period, such as one month."
            />
            <StepCard
              title="Divide sales"
              text="Divide sales by active listings to estimate sell-through rate."
            />
            <StepCard
              title="Decide action"
              text="Use the result to decide whether to source, improve, relist, discount, or retire items."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari sell-through calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how active listings and monthly sales become a
              sell-through rate.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, a 25% sell-through rate means one out of every
              four active listings sold during the month. To reach 50 sales at
              the same rate, the seller would need about 200 active listings.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              How to interpret sell-through results
            </h2>

            <div className="mt-5 space-y-4">
              {interpretationCards.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Mercari sell-through checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari sell-through
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
            <Related href="/mercari/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/mercari/inventory-restock-calculator" label="Restock Calculator" />
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
          Example Mercari sell-through rate item.
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