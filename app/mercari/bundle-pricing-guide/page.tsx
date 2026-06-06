const bundleFactors = [
  {
    title: "Combined item cost",
    text: "Every product inside the bundle has its own cost. A bundle price should be built from the total cost of all included items.",
  },
  {
    title: "Bundle discount",
    text: "The discount should be deep enough to encourage the buyer, but not so deep that it removes the profit created by the additional items.",
  },
  {
    title: "Shipping and packaging",
    text: "Bundles may require larger boxes, heavier shipping, more packaging, or extra handling compared with a single item.",
  },
  {
    title: "Average order value",
    text: "A good bundle can raise order value while still protecting margin and helping move more inventory.",
  },
  {
    title: "Offer and refund risk",
    text: "Bundles can create more complicated buyer offers, partial concerns, damaged-item issues, or refund risk.",
  },
];

const mistakes = [
  "Discounting the bundle without adding up the cost of every included item.",
  "Ignoring higher shipping, packaging, or handling cost for multi-item orders.",
  "Using bundles only to increase revenue while lowering profit per order.",
  "Combining low-margin items without balancing them with stronger items.",
  "Making the bundle price too close to break-even after fees, shipping, and refund risk.",
  "Accepting bundle offers without comparing profit against selling the items separately.",
];

const exampleRows = [
  ["Separate item price total", "$70.00"],
  ["Bundle price", "$58.00"],
  ["Bundle discount", "-$12.00"],
  ["Product cost total", "-$19.00"],
  ["Shipping cost", "-$8.50"],
  ["Packaging cost", "-$1.50"],
  ["Estimated Mercari fees", "-$7.98"],
  ["Promotion and refund allowance", "-$4.00"],
  ["Estimated profit per bundle", "$17.02"],
];

const bundleStrategies = [
  {
    title: "Starter bundle",
    text: "Pair related lower-cost items together so the buyer gets a complete set and the seller raises order value.",
  },
  {
    title: "Quantity bundle",
    text: "Use quantity bundles when multiple units can ship together without destroying margin through weight or size.",
  },
  {
    title: "Clearance bundle",
    text: "Use bundles to move stale inventory, but keep the discount controlled so the bundle still produces profit.",
  },
  {
    title: "Cross-sell bundle",
    text: "Pair complementary items that make sense together and increase perceived value without requiring a deep discount.",
  },
];

const checklist = [
  "Standalone price for each item in the bundle.",
  "Product cost for every bundled item.",
  "Bundle price and discount amount.",
  "Shipping cost, package weight, dimensions, and packaging materials.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Promotion cost, refund allowance, and buyer offer room.",
  "Profit from bundle compared with separate item sales.",
  "Minimum acceptable bundle price before accepting offers.",
];

const improvementCards = [
  {
    title: "Pair margins wisely",
    text: "Combine lower-margin items with stronger-margin products to protect total bundle profit.",
  },
  {
    title: "Control shipping",
    text: "Watch package size, weight, and packaging cost before combining items.",
  },
  {
    title: "Use clear value",
    text: "Explain why the bundle is useful so buyers see value beyond the discount.",
  },
  {
    title: "Set a floor price",
    text: "Know the lowest profitable bundle offer before negotiating with buyers.",
  },
];

export default function MercariBundlePricingGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Bundle Pricing Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Mercari bundle discounts, combined item cost, shipping
          pressure, packaging cost, multi-item pricing, offer strategy, and
          whether bundle offers still leave enough profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Mercari bundle pricing matters
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari bundles can raise average order value, move more inventory,
            and make offers more attractive. But a bundle is only useful if the
            combined product cost, shipping cost, packaging cost, Mercari fees,
            payment processing, refund allowance, and buyer offer room still
            leave enough profit.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A bundle discount should be smaller than the extra margin created by
            the added items. The goal is not just to sell more units. The goal is
            to increase total profit per order while giving the buyer a clear
            reason to purchase more than one item.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Mercari bundle profit?
            </h2>

            <div className="mt-5 space-y-4">
              {bundleFactors.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari bundle pricing mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to price a Mercari bundle</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add item costs"
              text="Start with the product cost for every item included in the bundle."
            />
            <StepCard
              title="Add order costs"
              text="Include shipping, packaging, fees, promotion cost, and refund allowance."
            />
            <StepCard
              title="Set discount"
              text="Choose a bundle discount that still leaves the target profit."
            />
            <StepCard
              title="Compare separate sales"
              text="Compare bundle profit against selling the items separately."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari bundle pricing calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a bundle discount affects price, profit, and
              margin.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the bundle still produces estimated profit after
              the discount. If shipping, packaging, refund risk, or buyer offers
              increase, the bundle price may need to be raised or the discount
              reduced.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Mercari bundle pricing strategies
            </h2>

            <div className="mt-5 space-y-4">
              {bundleStrategies.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari bundle pricing checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari bundle profit
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
            <Related href="/mercari/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
            <Related href="/mercari/offer-profit-calculator" label="Offer Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
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
          Example Mercari bundle pricing item.
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