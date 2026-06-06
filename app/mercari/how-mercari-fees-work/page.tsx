export default function HowMercariFeesWorkPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          How Mercari Fees Work
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand the main Mercari selling costs that affect profit, including
          selling fees, payment processing fees, fixed fees, shipping costs,
          promotions, buyer offers, refunds, and other listing expenses.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">What fees do Mercari sellers pay?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari seller profit depends on more than the sale price. Sellers
            should account for item cost, selling fees, payment processing costs,
            fixed transaction fees, shipping cost, packaging supplies, promoted
            pricing, discounts, buyer offers, refunds, and replacement risk.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A Mercari listing can look profitable at first glance but become thin
            after fees, shipping, item sourcing cost, packaging, and promotion
            pressure are included. Estimating fees before accepting offers or
            lowering prices helps protect margin.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Mercari fee categories</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Selling fees"
                text="Selling fees reduce the amount a seller keeps from each completed order. Sellers should estimate these before pricing or accepting lower offers."
              />
              <InfoBlock
                title="Payment processing fees"
                text="Payment processing costs may include a percentage of the transaction and a fixed fee. These fees reduce profit on every paid order."
              />
              <InfoBlock
                title="Shipping costs"
                text="If the seller pays shipping or offers free shipping, the shipping label cost should be included in the profit estimate."
              />
              <InfoBlock
                title="Promotion costs"
                text="Price drops, smart pricing, promoted listings, and other promotion decisions can increase visibility but reduce margin."
              />
              <InfoBlock
                title="Other order costs"
                text="Packaging, item sourcing cost, cleaning, prep supplies, refunds, damaged items, and replacement issues can all affect profit."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Costs many Mercari sellers forget</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Treating the sale price as profit before subtracting item cost and shipping." />
              <Warning text="Forgetting fixed payment processing fees on smaller listings." />
              <Warning text="Accepting buyer offers without recalculating profit after fees." />
              <Warning text="Using promotions or price drops without checking margin impact." />
              <Warning text="Ignoring packaging supplies, cleaning cost, sourcing cost, and shipping materials." />
              <Warning text="Not planning for returns, refunds, damaged items, cancellations, or replacement risk." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Mercari profit correctly</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with sale price"
              text="Use the expected selling price after offers, price drops, or discounts."
            />
            <StepCard
              title="Subtract item cost"
              text="Include sourcing cost, cleaning, prep supplies, and any cost to acquire the item."
            />
            <StepCard
              title="Subtract fees"
              text="Estimate selling fees, payment processing fees, fixed fees, and promotion impact."
            />
            <StepCard
              title="Review net profit"
              text="Check whether the final profit is worth listing, promoting, shipping, or accepting an offer."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Mercari fee calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why sellers should estimate fees before pricing
              or accepting buyer offers.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Expected sale price" value="$35.00" />
              <Breakdown label="Item cost" value="-$10.00" />
              <Breakdown label="Shipping cost" value="-$6.50" />
              <Breakdown label="Packaging cost" value="-$1.00" />
              <Breakdown label="Estimated selling fees" value="-$3.50" />
              <Breakdown label="Payment processing estimate" value="-$1.32" />
              <Breakdown label="Promotion or offer impact" value="-$2.00" />
              <Breakdown label="Estimated profit" value="$10.68" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the listing remains profitable, but a lower buyer
              offer, higher shipping cost, or larger promotion discount could
              quickly reduce the remaining margin.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Fixed costs vs. variable costs</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Fixed transaction costs"
                text="Fixed fees matter more on low-priced listings because the same small fee takes a larger share of the sale."
              />
              <InfoBlock
                title="Variable percentage costs"
                text="Percentage-based fees increase as the sale price increases and should be included in every pricing estimate."
              />
              <InfoBlock
                title="Shipping and packaging"
                text="Shipping and packaging can vary by item size, weight, fragility, and whether the seller or buyer pays shipping."
              />
              <InfoBlock
                title="Offer room"
                text="Sellers who expect offers should price with enough room to accept a discount without losing money."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari fee checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Expected sale price after buyer offers or price drops." />
            <Check text="Item cost, sourcing cost, cleaning cost, and prep supplies." />
            <Check text="Selling fees, payment processing fees, and fixed fees." />
            <Check text="Shipping label cost and whether buyer or seller pays shipping." />
            <Check text="Packaging, labels, tape, mailers, boxes, and protective materials." />
            <Check text="Promotion impact, smart pricing, price drops, and discount room." />
            <Check text="Return, refund, cancellation, damaged item, and replacement risk." />
            <Check text="Break-even price before listing, promoting, or accepting offers." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Mercari fee pressure</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Price with offer room"
              text="Set prices with enough margin to handle reasonable buyer offers."
            />
            <StepCard
              title="Watch small items"
              text="Low-priced listings can be hurt more by fixed fees, packaging, and shipping."
            />
            <StepCard
              title="Control shipping"
              text="Use accurate weights, right-sized packaging, and realistic shipping assumptions."
            />
            <StepCard
              title="Review promotions"
              text="Compare price drops and discounts against actual profit, not just listing views."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/fee-calculator" label="Fee Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
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
          Example Mercari fee calculation item.
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