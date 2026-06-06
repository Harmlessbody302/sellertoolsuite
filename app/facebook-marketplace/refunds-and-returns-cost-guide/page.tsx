export default function FacebookMarketplaceRefundsAndReturnsCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Refunds and Returns Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Facebook Marketplace refunds, cancellations, damaged items,
          no-shows, recovered value, delivery cost, shipping cost, support time,
          and replacement losses that affect seller profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why refunds and returns matter for Facebook Marketplace profit
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Refunds, cancellations, no-shows, damaged items, and buyer disputes
              can quietly erase profit from otherwise healthy Facebook
              Marketplace sales. A problem order may leave the seller with
              packaging cost, delivery cost, shipping cost, wasted time, reduced
              inventory value, or an item that must be relisted at a lower price.
            </p>

            <p>
              Facebook Marketplace sellers should treat refund risk as a real
              cost of doing business. The goal is not to assume every sale will
              go wrong, but to price, describe, photograph, package, and arrange
              pickup or delivery in a way that protects margin when occasional
              issues happen.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Facebook Marketplace refund and issue costs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Refunded revenue"
                text="The most obvious cost is the sale revenue returned to the buyer, but refunded revenue is only one part of the total loss."
              />
              <InfoBlock
                title="Delivery or shipping loss"
                text="If the seller paid for delivery, fuel, shipping, or packaging supplies, those costs may not be recovered after a refund or cancellation."
              />
              <InfoBlock
                title="Damaged or unsellable items"
                text="Some returned or disputed items may lose value if they are damaged, incomplete, worn, opened, or no longer sellable at full price."
              />
              <InfoBlock
                title="No-show and cancellation time"
                text="Messages, scheduling, waiting, loading, unloading, relisting, and support time can create hidden cost even without a formal return."
              />
              <InfoBlock
                title="Repricing and resale risk"
                text="Even if the item can be relisted, it may need a lower price, better photos, repair, cleaning, or additional buyer reassurance before it sells again."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace refund mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting only the refunded sale price and ignoring delivery, shipping, packaging, and time.",
                "Assuming every returned or disputed item can be resold at full value.",
                "Ignoring fragile packaging problems that create damage claims.",
                "Selling high-risk items without building in refund or dispute allowance.",
                "Not describing flaws, measurements, pickup details, or condition clearly enough.",
                "Restocking similar items before checking refund, cancellation, no-show, or dispute risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Facebook Marketplace refund cost
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Find issue rate"
              text="Estimate the percentage of orders that may be refunded, cancelled, disputed, damaged, or no-showed."
            />
            <InfoCard
              title="Add lost costs"
              text="Include packaging, delivery, shipping, support time, damaged value, and relisting cost."
            />
            <InfoCard
              title="Estimate recovery"
              text="Subtract resale value if the item can still be resold, repaired, or bundled."
            />
            <InfoCard
              title="Review margin"
              text="Check whether the product still makes profit after expected issue losses."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace refund cost
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a refund may cost more than the returned
              revenue alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Refunded sale price"
                note="Example Facebook Marketplace refund and return cost item."
                value="$80.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace refund and return cost item."
                value="$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace refund and return cost item."
                value="$1.00"
              />
              <Breakdown
                label="Delivery cost"
                note="Example Facebook Marketplace refund and return cost item."
                value="$5.00"
              />
              <Breakdown
                label="Support and handling cost"
                note="Example Facebook Marketplace refund and return cost item."
                value="$2.00"
              />
              <Breakdown
                label="Lost item value"
                note="Example Facebook Marketplace refund and return cost item."
                value="$8.00"
              />
              <Breakdown
                label="Recovered item value"
                note="Example Facebook Marketplace refund and return cost item."
                value="-$32.00"
              />
              <Breakdown
                label="Estimated refund impact"
                note="Example Facebook Marketplace refund and return cost item."
                value="$99.00"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, some value is recovered, but the refund still
              creates a meaningful loss after delivery, packaging, support time,
              and lost item value are included.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Refunds, cancellations, no-shows, and damaged items
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Refund"
                text="A refund returns money to the buyer, but the seller may still lose packaging, delivery cost, shipping cost, time, and partial product value."
              />
              <InfoBlock
                title="Cancellation"
                text="A cancellation may avoid a full refund issue, but it can still waste messages, scheduling time, loading effort, and buyer interest."
              />
              <InfoBlock
                title="No-show"
                text="A no-show can waste pickup time, hold inventory off the market, and delay a sale to a better buyer."
              />
              <InfoBlock
                title="Damaged item issue"
                text="A damaged item can create refund loss, dispute risk, lower resale value, and inventory value loss."
              />
              <InfoBlock
                title="Replacement or partial recovery"
                text="Some items may still be resold, repaired, bundled, or partially recovered, but the recovered value should be estimated conservatively."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace refund and return checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Refunded revenue and original sale price." />
            <ChecklistItem text="Original delivery cost or seller-paid shipping cost." />
            <ChecklistItem text="Packaging supplies, labels, boxes, tape, and protective materials." />
            <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep cost." />
            <ChecklistItem text="Recovered value if the item can be resold." />
            <ChecklistItem text="Damaged, missing, incomplete, or unsellable product loss." />
            <ChecklistItem text="Customer support, inspection, relisting, pickup, and handling time." />
            <ChecklistItem text="Product page issues causing repeated refunds, no-shows, or disputes." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Facebook Marketplace refund losses
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Describe clearly"
              text="Mention flaws, measurements, condition, pickup details, included items, and what is not included."
            />
            <InfoCard
              title="Use strong photos"
              text="Show all angles, defects, scale, wear, serial numbers when appropriate, and important details."
            />
            <InfoCard
              title="Confirm pickup details"
              text="Reduce no-shows and misunderstandings by confirming time, place, payment, and item expectations."
            />
            <InfoCard
              title="Avoid risky items"
              text="Skip categories or conditions that create too many issues for the expected profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/refund-impact-calculator" label="Refund Impact Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
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