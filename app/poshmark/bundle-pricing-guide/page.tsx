export default function PoshmarkBundlePricingGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Bundle Pricing Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Poshmark bundle discounts, combined item cost, shipping
          discount pressure, packaging cost, multi-item pricing, buyer offers,
          closet strategy, and whether bundle deals still leave enough profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Poshmark bundle pricing matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark bundles can raise average order value, help move more
              inventory, and make offers more attractive. But a bundle is only
              useful if the combined item cost, Poshmark fee, shipping discount,
              packaging cost, refund risk, and buyer offer room still leave
              enough profit.
            </p>

            <p>
              A bundle discount should usually be smaller than the extra margin
              created by selling multiple items together. The goal is not just
              to sell more units. The goal is to increase total profit per order
              while giving the buyer a clear reason to purchase more than one
              item.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Poshmark bundle profit?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Combined item cost"
                text="Every item inside the bundle has its own cost. A bundle price should be built from the total cost of all included items."
              />
              <InfoCard
                title="Bundle discount"
                text="The discount should be deep enough to encourage the buyer, but not so deep that it removes the profit created by the additional items."
              />
              <InfoCard
                title="Shipping discount pressure"
                text="Bundles may involve offers, seller-paid shipping incentives, or buyer expectations that reduce final profit."
              />
              <InfoCard
                title="Packaging and handling"
                text="A bundle may need larger mailers, boxes, tissue paper, labels, packing material, or more handling time."
              />
              <InfoCard
                title="Average order value"
                text="A good bundle can raise order value while still protecting margin and helping move inventory."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark bundle pricing mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Discounting the bundle without adding up the cost of every item.",
                "Forgetting that bundle offers may include shipping discount pressure.",
                "Accepting bundle offers without checking total profit.",
                "Using bundles only to increase revenue while reducing profit per order.",
                "Combining low-margin items without balancing them with stronger items.",
                "Making the bundle price too close to break-even after fees, discounts, and refund risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to price a Poshmark bundle</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add item costs"
              text="Start with the product cost for every item included in the bundle."
            />
            <StepCard
              title="Add order costs"
              text="Include Poshmark fees, packaging, shipping discount pressure, refund allowance, and handling."
            />
            <StepCard
              title="Set discount"
              text="Choose a bundle discount that still leaves the target profit."
            />
            <StepCard
              title="Compare separately"
              text="Compare bundle profit against selling the items separately."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark bundle pricing calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a bundle discount affects price, profit,
              and margin.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Separate item price total" value="$85.00" />
              <Breakdown label="Bundle price" value="$68.00" />
              <Breakdown label="Bundle discount" value="-$17.00" />
              <Breakdown label="Product cost total" value="-$26.00" />
              <Breakdown label="Packaging cost" value="-$1.50" />
              <Breakdown label="Estimated Poshmark fee" value="-$13.60" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Estimated profit per bundle" value="$20.88" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the bundle is still profitable after the discount.
              If the buyer sends a lower offer or expects a larger shipping
              incentive, the bundle price may need to be raised or the discount
              reduced.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Poshmark bundle pricing strategies
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Starter bundle"
                text="Pair related items together so the buyer gets a complete outfit, set, or closet-style match."
              />
              <InfoCard
                title="Quantity bundle"
                text="Use quantity bundles when multiple similar items can ship together without destroying margin through weight or size."
              />
              <InfoCard
                title="Clearance bundle"
                text="Use bundles to move stale inventory, but keep the discount controlled so the bundle still protects profit."
              />
              <InfoCard
                title="Cross-sell bundle"
                text="Pair complementary items that make sense together and increase perceived value without requiring a deep discount."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark bundle pricing checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Standard price for each item in the bundle.",
              "Product cost for every bundled item.",
              "Bundle price and discount amount.",
              "Poshmark fee estimate at the bundle price.",
              "Packaging cost, weight, dimensions, and handling time.",
              "Shipping discount or offer-to-liker incentive.",
              "Refund risk, damaged item risk, and return allowance.",
              "Minimum acceptable bundle profit before accepting offers.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark bundle profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Pair margins wisely"
              text="Combine lower-margin items with stronger-margin items to protect total bundle profit."
            />
            <StepCard
              title="Control discounts"
              text="Avoid stacking bundle discounts, buyer offers, and shipping incentives too deeply."
            />
            <StepCard
              title="Use clear value"
              text="Explain why the bundle is useful so buyers see value beyond the discount."
            />
            <StepCard
              title="Set a floor price"
              text="Know the lowest acceptable bundle price before negotiating with buyers."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
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
          Example Poshmark bundle pricing item.
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