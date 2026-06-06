export default function PoshmarkSalesGoalPlanningGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Sales Goal Planning Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from a Poshmark revenue or profit goal to estimate
          required sales, active listings, sell-through rate, average sale price,
          offer pressure, shipping discounts, and daily listing pace.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Poshmark sales goals should start with numbers
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              A Poshmark sales goal is more useful when it is connected to item
              economics, not just a revenue target. Sellers should know how many
              items must sell, how much profit each sale creates, how many active
              listings are needed, and whether current sourcing capacity can
              support the goal.
            </p>

            <p>
              The goal is not only to sell more items. The goal is to reach a
              sales level that still leaves enough profit after item cost,
              Poshmark fees, packaging, shipping discounts, buyer offers, refund
              risk, and the work required to list and ship orders.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Poshmark sales goals?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Average sale price"
                text="Average sale price determines how many sales are needed to reach a revenue or profit target. Higher sale price can reduce the number of required orders."
              />
              <InfoCard
                title="Profit per sale"
                text="Revenue goals should be checked against actual profit after item cost, Poshmark fees, packaging, shipping discounts, offers, and refunds."
              />
              <InfoCard
                title="Sell-through rate"
                text="Sell-through rate shows how many active listings are likely to turn into sales each month."
              />
              <InfoCard
                title="Active listings"
                text="The number of active listings affects how much sales volume is possible without sourcing and listing more inventory."
              />
              <InfoCard
                title="Sourcing capacity"
                text="A sales goal is only realistic if the seller can source, clean, photograph, list, store, pack, and ship enough items."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark sales goal mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Setting a sales goal without calculating how many items must sell.",
                "Planning around revenue without checking profit after all costs.",
                "Ignoring seller-paid shipping discounts and buyer offer pressure.",
                "Assuming more listings automatically create more sales.",
                "Forgetting sourcing, cleaning, photographing, listing, and shipping workload.",
                "Using one average sale price when products have very different prices and margins.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan a Poshmark sales goal</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Set profit target"
              text="Choose the monthly profit or revenue number you want your Poshmark closet to reach."
            />
            <StepCard
              title="Calculate sales"
              text="Divide the target by average profit per sale or average sale price."
            />
            <StepCard
              title="Estimate listings"
              text="Use sell-through rate to estimate how many active listings are needed."
            />
            <StepCard
              title="Check workload"
              text="Confirm sourcing, cleaning, listing, packing, and shipping capacity before scaling."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark sales goal calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a monthly profit goal turns into required
              sales and active listings.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target monthly profit" value="$500.00" />
              <Breakdown label="Average sale price" value="$45.00" />
              <Breakdown label="Average profit per sale" value="$14.73" />
              <Breakdown label="Sales needed" value="34" />
              <Breakdown label="Current monthly sales" value="25" />
              <Breakdown label="Extra sales needed" value="9" />
              <Breakdown label="Sell-through rate" value="25.0%" />
              <Breakdown label="Listings needed" value="136" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the seller needs about 34 monthly sales to reach
              a $500 profit goal. At a 25% sell-through rate, that requires about
              136 active listings, assuming pricing and profit per sale stay
              similar.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Poshmark sales goal levers to adjust
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Raise average sale price"
                text="Source higher-value items or improve presentation to support stronger prices."
              />
              <InfoCard
                title="Improve profit per sale"
                text="Lower sourcing cost, reduce shipping discount pressure, limit weak offers, and improve pricing discipline."
              />
              <InfoCard
                title="Improve sell-through"
                text="Use better photos, titles, descriptions, pricing, sharing, and relisting to turn more listings into sales."
              />
              <InfoCard
                title="Increase active listings"
                text="List more profitable inventory only when sourcing and sell-through support the extra volume."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark sales goal checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Target monthly revenue or target monthly profit.",
              "Current monthly sales and current monthly profit.",
              "Average sale price and average profit per sale.",
              "Item cost, packaging cost, Poshmark fees, and shipping discounts.",
              "Current active listings and sell-through rate.",
              "Required sales needed to reach the goal.",
              "Required active listings needed to support the sales target.",
              "Sourcing, cleaning, listing, storage, packing, and shipping capacity.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reach a Poshmark sales goal
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise sale price"
              text="Source higher-value items or improve photos and presentation to support stronger prices."
            />
            <StepCard
              title="Improve sell-through"
              text="Use better photos, titles, pricing, sharing, and descriptions to move items faster."
            />
            <StepCard
              title="List consistently"
              text="Add quality listings regularly instead of relying on a small stale inventory pool."
            />
            <StepCard
              title="Protect profit"
              text="Reject offers and discounts that increase sales while reducing real profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/poshmark/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/poshmark/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
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
          Example Poshmark sales goal planning item.
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