export default function FacebookMarketplaceSalesGoalPlanningGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Sales Goal Planning Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from a Facebook Marketplace revenue or profit goal to
          estimate required sales, active listings, sell-through rate, average
          sale price, delivery workload, negotiation room, and daily listing
          pace.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Facebook Marketplace sales goals should start with numbers
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              A Facebook Marketplace sales goal is more useful when it is tied
              to item economics, not just a revenue target. Sellers should know
              how many items must sell, how much profit each sale creates, how
              many active listings are needed, and whether local demand, pickup
              friction, delivery workload, and sourcing capacity can support the
              goal.
            </p>

            <p>
              The goal is not only to sell more items. The goal is to reach a
              sales level that still leaves enough profit after item cost,
              delivery cost, shipping cost, packaging, platform fees when
              applicable, negotiation discounts, refunds, no-shows, repair
              costs, and the work required to list and complete sales.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace sales goals?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Average sale price"
                text="Average sale price determines how many sales are needed to reach a revenue or profit target. Higher sale price can reduce the number of required orders."
              />
              <InfoBlock
                title="Profit per sale"
                text="Revenue goals should be checked against actual profit after item cost, delivery, shipping, packaging, fees, negotiation discounts, and refund risk."
              />
              <InfoBlock
                title="Sell-through rate"
                text="Sell-through rate shows how many active listings are likely to turn into sales each month."
              />
              <InfoBlock
                title="Active listings"
                text="The number of active listings affects how much sales volume is possible without sourcing and listing more inventory."
              />
              <InfoBlock
                title="Sourcing and delivery capacity"
                text="A sales goal is only realistic if the seller can source, clean, repair, photograph, list, message buyers, pack, deliver, ship, or coordinate pickup for enough items."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace sales goal mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Setting a revenue goal without calculating how many items must sell.",
                "Planning around revenue without checking profit after all costs.",
                "Ignoring sell-through rate when estimating required active listings.",
                "Assuming more listings automatically create more sales.",
                "Forgetting sourcing, cleaning, repair, photographing, listing, messaging, pickup, delivery, and shipping workload.",
                "Using one average sale price when products have very different prices and margins.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan a Facebook Marketplace sales goal
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Set profit target"
              text="Choose the monthly profit or revenue number you want your Facebook Marketplace activity to reach."
            />
            <InfoCard
              title="Calculate sales"
              text="Divide the target by average profit per sale or average sale price."
            />
            <InfoCard
              title="Estimate listings"
              text="Use sell-through rate to estimate how many active listings are needed."
            />
            <InfoCard
              title="Check workload"
              text="Confirm sourcing, cleaning, repair, listing, messaging, pickup, delivery, and shipping capacity before scaling."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace sales goal calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a monthly profit goal turns into required
              sales and active listings.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Target monthly profit"
                note="Example Facebook Marketplace sales goal planning item."
                value="$750.00"
              />
              <Breakdown
                label="Average sale price"
                note="Example Facebook Marketplace sales goal planning item."
                value="$80.00"
              />
              <Breakdown
                label="Average profit per sale"
                note="Example Facebook Marketplace sales goal planning item."
                value="$31.00"
              />
              <Breakdown
                label="Sales needed"
                note="Example Facebook Marketplace sales goal planning item."
                value="25"
              />
              <Breakdown
                label="Current monthly sales"
                note="Example Facebook Marketplace sales goal planning item."
                value="25"
              />
              <Breakdown
                label="Extra sales needed"
                note="Example Facebook Marketplace sales goal planning item."
                value="0"
              />
              <Breakdown
                label="Sell-through rate"
                note="Example Facebook Marketplace sales goal planning item."
                value="25.0%"
              />
              <Breakdown
                label="Listings needed"
                note="Example Facebook Marketplace sales goal planning item."
                value="100"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the seller needs about 25 monthly sales to reach a
              $750 profit goal. At a 25% sell-through rate, that requires about
              100 active listings, assuming pricing, local demand, pickup
              reliability, and profit per sale stay similar.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace sales goal levers to adjust
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Raise average sale price"
                text="Source higher-value items, improve presentation, bundle related items, or price stronger listings with more confidence."
              />
              <InfoBlock
                title="Improve profit per sale"
                text="Lower sourcing cost, reduce delivery drag, limit weak negotiation, improve pricing discipline, and avoid low-margin items."
              />
              <InfoBlock
                title="Improve sell-through"
                text="Use better photos, clearer descriptions, fair pricing, pickup clarity, and stronger local demand signals to move items faster."
              />
              <InfoBlock
                title="Increase active listings"
                text="List more profitable inventory only when sourcing, storage, pickup, delivery, and message workload can support the extra volume."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace sales goal checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Target monthly revenue or target monthly profit." />
            <ChecklistItem text="Current monthly sales and current monthly profit." />
            <ChecklistItem text="Average sale price and average profit per sale." />
            <ChecklistItem text="Item cost, delivery cost, shipping cost, packaging cost, and platform fees when applicable." />
            <ChecklistItem text="Current active listings and sell-through rate." />
            <ChecklistItem text="Required sales needed to reach the goal." />
            <ChecklistItem text="Required active listings needed to support the sales target." />
            <ChecklistItem text="Sourcing, cleaning, repair, listing, messaging, pickup, delivery, storage, packing, and shipping capacity." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reach a Facebook Marketplace sales goal
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Raise sale price"
              text="Source higher-value items or improve presentation to support stronger prices."
            />
            <InfoCard
              title="Improve sell-through"
              text="Use better photos, titles, descriptions, pricing, pickup details, and relisting to move items faster."
            />
            <InfoCard
              title="List consistently"
              text="Add quality listings regularly instead of relying on a small stale inventory pool."
            />
            <InfoCard
              title="Protect profit"
              text="Reject offers and delivery requests that increase sales while reducing real profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
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