export default function HowPoshmarkFeesWorkPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          How Poshmark Fees Work
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand the main Poshmark selling costs that affect profit,
          including commission fees, flat fees, shipping discounts, buyer offers,
          packaging costs, refunds, and closet promotion pressure.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What fees do Poshmark sellers pay?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark seller profit depends on more than the listed sale price.
              Sellers should account for Poshmark fees, item cost, packaging
              cost, shipping discounts, buyer offers, returns, promotion costs,
              and the time needed to source, photograph, list, package, and ship
              each item.
            </p>

            <p>
              A Poshmark listing can look profitable at first glance but produce
              weak profit if the seller accepts a lower offer, sends a shipping
              discount, buys expensive packaging, or restocks inventory before
              checking the real margin.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Poshmark fee categories</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Selling fees"
                text="Poshmark fees reduce the amount the seller keeps from each completed sale. Sellers should estimate fees before pricing, discounting, or accepting offers."
              />
              <InfoCard
                title="Flat fee on smaller sales"
                text="Lower-priced sales may be affected heavily by a fixed fee because the same flat fee takes a larger share of a small order."
              />
              <InfoCard
                title="Commission on higher sales"
                text="Higher-priced Poshmark sales are commonly modeled with a percentage commission. This should be included in every pricing estimate."
              />
              <InfoCard
                title="Shipping discounts"
                text="When the seller offers a shipping discount, that discount can reduce profit even when Poshmark collects shipping separately from the buyer."
              />
              <InfoCard
                title="Other order costs"
                text="Packaging supplies, thank-you cards, labels, tape, returns, damaged items, cleaning supplies, and sourcing costs can all affect true profit."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Costs many Poshmark sellers forget</h2>

            <div className="mt-5 space-y-4">
              {[
                "Treating the sale price as profit before subtracting item cost and Poshmark fees.",
                "Forgetting seller-paid shipping discounts when sending offers to likers.",
                "Accepting buyer offers without recalculating profit after fees.",
                "Ignoring packaging supplies, labels, mailers, tape, and closet supplies.",
                "Running Closet Clear Out or promotions without checking margin impact.",
                "Not planning for returns, damaged items, cancellations, or stale inventory.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Poshmark profit correctly
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with sale price"
              text="Use the expected sale price after offers, bundle discounts, or Closet Clear Out price drops."
            />
            <StepCard
              title="Subtract item cost"
              text="Include purchase cost, sourcing cost, cleaning cost, prep cost, and any cost to acquire the item."
            />
            <StepCard
              title="Subtract fees"
              text="Estimate Poshmark fees, shipping discounts, packaging cost, promotion cost, and refund allowance."
            />
            <StepCard
              title="Review net profit"
              text="Check whether the final profit is worth listing, sharing, promoting, shipping, or accepting an offer."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Poshmark fee calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why sellers should estimate fees before pricing
              or accepting buyer offers.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Expected sale price" value="$45.00" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Estimated Poshmark fee" value="-$9.00" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Refund allowance" value="-$1.00" />
              <Breakdown label="Estimated profit" value="$17.73" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the listing remains profitable, but a larger
              buyer offer discount, shipping discount, or return issue could
              quickly reduce the remaining margin.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Flat fees vs. percentage fees</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Flat fees"
                text="Flat fees matter more on low-priced listings because the same fee takes a larger share of the sale."
              />
              <InfoCard
                title="Percentage fees"
                text="Percentage-based fees increase as the sale price increases and should be included in every pricing estimate."
              />
              <InfoCard
                title="Shipping discounts"
                text="Seller-paid shipping discounts should be treated like a real cost because they reduce seller profit."
              />
              <InfoCard
                title="Offer room"
                text="Sellers who expect buyer offers should price with enough room to accept a discount without losing money."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark fee checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Expected sale price after buyer offers or Closet Clear Out price drops.",
              "Poshmark commission, flat fee, or percentage fee estimate.",
              "Item cost, sourcing cost, cleaning cost, and prep supplies.",
              "Packaging supplies, labels, tape, mailers, boxes, and thank-you cards.",
              "Shipping discount or seller-paid shipping incentive.",
              "Refund allowance, damaged item risk, cancellation risk, and replacement risk.",
              "Promotion cost, sharing time, listing time, and relisting effort.",
              "Break-even price before listing, promoting, or accepting offers.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Poshmark fee pressure</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Price with offer room"
              text="Set prices with enough margin to handle reasonable buyer offers."
            />
            <StepCard
              title="Watch small items"
              text="Low-priced listings can be hurt more by flat fees, packaging, and shipping discounts."
            />
            <StepCard
              title="Control discounts"
              text="Compare offers, Closet Clear Out drops, and shipping incentives against actual profit."
            />
            <StepCard
              title="Review bundles"
              text="Bundles can raise order value, but every item cost still needs to be included."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/fee-calculator" label="Fee Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/break-even-calculator" label="Break-Even Calculator" />
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
          Example Poshmark fee calculation item.
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