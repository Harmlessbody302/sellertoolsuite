export default function FacebookMarketplaceBundlePricingGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Bundle Pricing Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Facebook Marketplace bundle discounts, combined item cost,
          delivery pressure, pickup convenience, negotiation room, packaging
          cost, refund risk, and whether bundle offers still leave enough profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Facebook Marketplace bundle pricing matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace bundles can increase order value, move more
              inventory, and make pickup or delivery more worthwhile. But a
              bundle is only useful if the combined product cost, delivery cost,
              packaging cost, negotiation discount, and refund risk still leave
              enough profit.
            </p>

            <p>
              A bundle discount should usually be smaller than the extra margin
              created by selling multiple items together. The goal is not just
              to sell more units. The goal is to increase total profit per buyer
              while reducing stale inventory, pickup friction, and repeated
              message time.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace bundle profit?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Combined item cost"
                text="Every product included in the bundle has its own cost. A bundle price should be built from the total cost of all included items."
              />
              <InfoBlock
                title="Bundle discount"
                text="The discount should be deep enough to encourage the buyer, but not so deep that it removes the profit created by the additional items."
              />
              <InfoBlock
                title="Pickup convenience"
                text="Bundles can make one pickup more valuable by moving several items at once, especially when buyer coordination is time-consuming."
              />
              <InfoBlock
                title="Delivery and shipping pressure"
                text="Bundles may increase package size, delivery effort, loading time, shipping cost, or handling work."
              />
              <InfoBlock
                title="Refund and buyer issue risk"
                text="A bundle can create more complicated buyer expectations, partial concerns, damaged-item issues, or refund risk."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace bundle pricing mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Discounting the bundle without adding up the cost of every item.",
                "Forgetting delivery, shipping, packaging, loading, and refund pressure.",
                "Accepting bundle offers without checking total profit.",
                "Using bundles only to increase revenue while reducing profit per order.",
                "Combining weak items without balancing them with stronger-margin items.",
                "Making the bundle price too close to break-even after buyer negotiation.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to price a Facebook Marketplace bundle
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Add item costs"
              text="Start with the product cost for every item included in the bundle."
            />
            <InfoCard
              title="Add order costs"
              text="Include delivery, shipping, packaging, repair, refund allowance, and handling time."
            />
            <InfoCard
              title="Set discount"
              text="Choose a bundle discount that still leaves the target profit."
            />
            <InfoCard
              title="Compare separately"
              text="Compare bundle profit against selling the items separately."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace bundle pricing calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a bundle discount affects price, profit,
              and margin.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Separate item price total"
                note="Example Facebook Marketplace bundle pricing item."
                value="$95.00"
              />
              <Breakdown
                label="Bundle price"
                note="Example Facebook Marketplace bundle pricing item."
                value="$80.00"
              />
              <Breakdown
                label="Bundle discount"
                note="Example Facebook Marketplace bundle pricing item."
                value="-$15.00"
              />
              <Breakdown
                label="Product cost total"
                note="Example Facebook Marketplace bundle pricing item."
                value="-$38.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace bundle pricing item."
                value="-$2.00"
              />
              <Breakdown
                label="Delivery cost"
                note="Example Facebook Marketplace bundle pricing item."
                value="-$0.00"
              />
              <Breakdown
                label="Negotiation allowance"
                note="Example Facebook Marketplace bundle pricing item."
                value="-$5.00"
              />
              <Breakdown
                label="Estimated profit per bundle"
                note="Example Facebook Marketplace bundle pricing item."
                value="$35.00"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the bundle is still profitable after the discount.
              If the buyer asks for delivery or a lower counteroffer, the bundle
              price may need to be raised or the discount reduced.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace bundle pricing strategies
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Starter bundle"
                text="Pair related items together so the buyer gets a complete set and the seller moves more inventory in one pickup."
              />
              <InfoBlock
                title="Quantity bundle"
                text="Use quantity bundles when multiple similar items can ship, deliver, or be picked up together without creating too much extra work."
              />
              <InfoBlock
                title="Clearance bundle"
                text="Use bundles to move stale inventory, but keep the discount controlled so the bundle still protects profit."
              />
              <InfoBlock
                title="Cross-sell bundle"
                text="Pair complementary items that make sense together and increase perceived value without requiring a deep discount."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace bundle pricing checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Standalone price for each item in the bundle." />
            <ChecklistItem text="Product cost for every bundled item." />
            <ChecklistItem text="Bundle price and discount amount." />
            <ChecklistItem text="Packaging cost, loading effort, delivery cost, and shipping cost." />
            <ChecklistItem text="Negotiation room if the buyer sends a lower bundle offer." />
            <ChecklistItem text="Refund risk, damaged item risk, no-show risk, and replacement allowance." />
            <ChecklistItem text="Profit from bundle compared with selling items separately." />
            <ChecklistItem text="Minimum acceptable bundle price before accepting offers." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace bundle profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Pair margins wisely"
              text="Combine lower-margin items with stronger-margin items to protect total bundle profit."
            />
            <InfoCard
              title="Control discounts"
              text="Avoid stacking bundle discounts, delivery concessions, and buyer negotiation too deeply."
            />
            <InfoCard
              title="Use pickup value"
              text="Explain why the bundle is useful so buyers see value beyond the discount."
            />
            <InfoCard
              title="Set a floor price"
              text="Know the lowest acceptable bundle price before negotiating with buyers."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
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