export default function FacebookMarketplaceSellThroughRateGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Sell-Through Rate Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Facebook Marketplace sell-through rate works, how active
          listings turn into sales, how stale inventory affects growth, and when
          to source more, relist, discount, bundle, or retire items.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Facebook Marketplace sell-through rate?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace sell-through rate measures how many active
              listings sell during a chosen period. For example, if a seller has
              80 active listings and sells 25 items in a month, the monthly
              sell-through rate is about 31.3%.
            </p>

            <p>
              Sell-through rate helps sellers decide whether inventory is moving
              quickly enough to justify sourcing more. A high rate can support
              restocking, while a low rate may mean listings need better photos,
              clearer descriptions, improved pricing, pickup details, relisting,
              bundling, or more realistic local demand expectations.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace sell-through?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Active listings"
                text="Sell-through rate should usually be measured against active listings, not every item you own. Unlisted inventory cannot sell until it is listed."
              />
              <InfoBlock
                title="Monthly sales"
                text="Monthly sales show how many active listings are actually converting into buyers during the period being measured."
              />
              <InfoBlock
                title="Listing quality"
                text="Photos, title, description, measurements, condition notes, category, pickup details, and price clarity can all affect whether a listing sells."
              />
              <InfoBlock
                title="Pricing and negotiation"
                text="High prices, weak offer room, poor local sold-comp alignment, or delivery cost pressure can reduce sell-through even when the item has demand."
              />
              <InfoBlock
                title="Local demand"
                text="Facebook Marketplace demand can change by location, season, trend, brand, size, condition, buyer urgency, and pickup convenience."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace sell-through mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting total inventory instead of active listings.",
                "Treating views, saves, or messages as sales performance without checking conversions.",
                "Buying more inventory before checking sell-through rate.",
                "Leaving stale listings unchanged for months.",
                "Using one category-wide sell-through rate for products with very different demand.",
                "Ignoring price, photos, pickup friction, and condition when sell-through slows down.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to calculate Facebook Marketplace sell-through rate
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Count active listings"
              text="Use listings that were available for buyers to purchase during the period."
            />
            <InfoCard
              title="Count sales"
              text="Count completed sales during the same period, such as one month."
            />
            <InfoCard
              title="Divide sales"
              text="Divide sales by active listings to estimate sell-through rate."
            />
            <InfoCard
              title="Decide action"
              text="Use the result to decide whether to source, relist, discount, bundle, retire, or improve items."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace sell-through calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how active listings and monthly sales become a
              sell-through rate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Active listings"
                note="Example Facebook Marketplace sell-through rate item."
                value="80"
              />
              <Breakdown
                label="Monthly sales"
                note="Example Facebook Marketplace sell-through rate item."
                value="25"
              />
              <Breakdown
                label="Sell-through rate"
                note="Example Facebook Marketplace sell-through rate item."
                value="31.3%"
              />
              <Breakdown
                label="Average sale price"
                note="Example Facebook Marketplace sell-through rate item."
                value="$80.00"
              />
              <Breakdown
                label="Average profit per sale"
                note="Example Facebook Marketplace sell-through rate item."
                value="$31.00"
              />
              <Breakdown
                label="Monthly revenue"
                note="Example Facebook Marketplace sell-through rate item."
                value="$2,000.00"
              />
              <Breakdown
                label="Monthly profit"
                note="Example Facebook Marketplace sell-through rate item."
                value="$775.00"
              />
              <Breakdown
                label="Listings needed for 40 sales"
                note="Example Facebook Marketplace sell-through rate item."
                value="128"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, a 31.3% sell-through rate means roughly one out
              of every three active listings sold during the month. To reach 40
              sales at the same rate, the seller would need about 128 active
              listings.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              How to interpret sell-through results
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Strong sell-through"
                text="A strong rate may mean the category has demand and can support more sourcing if profit, pickup reliability, and delivery pressure stay healthy."
              />
              <InfoBlock
                title="Healthy sell-through"
                text="A healthy rate suggests listings are moving, but sellers should still check profit, refund risk, sourcing time, and storage pressure."
              />
              <InfoBlock
                title="Slow sell-through"
                text="Slow movement may point to weak pricing, poor photos, unclear descriptions, low demand, bad pickup terms, or too much stale inventory."
              />
              <InfoBlock
                title="Uneven sell-through"
                text="Some items may sell quickly while others sit. Product-level tracking is better than relying only on store-wide averages."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace sell-through checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Active listing count for the period being measured." />
            <ChecklistItem text="Monthly sold item count." />
            <ChecklistItem text="Sell-through rate by product type or category." />
            <ChecklistItem text="Average sale price and profit per sale." />
            <ChecklistItem text="Listing age and stale listing count." />
            <ChecklistItem text="Photos, title, description, measurements, condition notes, and pickup clarity." />
            <ChecklistItem text="Shipping setup, delivery requests, buyer offer room, and local sold-comp alignment." />
            <ChecklistItem text="Whether to source more, relist, discount, bundle, or retire items." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace sell-through
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Improve listings"
              text="Update photos, titles, descriptions, measurements, condition notes, and pickup details on slow items."
            />
            <InfoCard
              title="Use sold comps"
              text="Compare against completed local sales instead of only active listing prices."
            />
            <InfoCard
              title="Relist stale items"
              text="Refresh or rebuild listings that have stopped getting useful buyer activity."
            />
            <InfoCard
              title="Source proven items"
              text="Buy more only after confirming demand, profit, pickup ease, and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/inventory-restock-calculator" label="Restock Calculator" />
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