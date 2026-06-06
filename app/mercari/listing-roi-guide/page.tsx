const roiFactors = [
  {
    title: "Product margin",
    text: "A listing with strong product margin has more room for offers, shipping, promotions, refunds, and relisting work.",
  },
  {
    title: "Traffic quality",
    text: "Views, likes, and messages are only useful if they turn into profitable sales. Weak traffic can make a listing look active without producing ROI.",
  },
  {
    title: "Conversion rate",
    text: "A listing with low conversion may need better photos, title, price, shipping setup, description, or category targeting.",
  },
  {
    title: "Listing investment",
    text: "Time spent sourcing, cleaning, measuring, photographing, writing, relisting, and promoting should be weighed against expected profit.",
  },
  {
    title: "Refund and issue risk",
    text: "High-risk items can produce sales while still creating weak ROI if refunds, disputes, damage, or buyer confusion are common.",
  },
];

const mistakes = [
  "Judging a listing by views or likes instead of profit.",
  "Promoting listings before checking profit after shipping, fees, and offers.",
  "Ignoring time spent sourcing, cleaning, photographing, measuring, and listing.",
  "Keeping stale listings active without improving price, photos, title, or description.",
  "Restocking similar items before confirming the listing produces enough return.",
  "Using store-wide averages instead of product-level listing ROI.",
];

const exampleRows = [
  ["Monthly listing views", "800"],
  ["Listing conversion rate", "3.0%"],
  ["Estimated orders", "24"],
  ["Monthly revenue", "$840.00"],
  ["Listing investment", "-$22.00"],
  ["Refund loss", "-$16.80"],
  ["Net listing profit", "$260.84"],
  ["Listing ROI", "1185.6%"],
];

const roiActions = [
  {
    title: "Improve",
    text: "If traffic exists but conversion is weak, improve photos, title, description, pricing, shipping, or offer room.",
  },
  {
    title: "Promote",
    text: "If margin is strong and conversion is healthy, promotion may be worth testing with a clear profit target.",
  },
  {
    title: "Restock",
    text: "If ROI is strong and demand is consistent, sourcing more similar items may make sense before inventory runs out.",
  },
  {
    title: "Retire",
    text: "If ROI stays weak after testing, the item type may not deserve more time, money, storage, or listing effort.",
  },
];

const checklist = [
  "Sale price before and after buyer offers.",
  "Item cost, sourcing cost, cleaning cost, and prep cost.",
  "Shipping cost, packaging cost, and whether seller pays shipping.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Promotion cost, price drop, or relisting time.",
  "Views, likes, conversion rate, and actual orders.",
  "Refund, cancellation, damaged item, and support risk.",
  "Whether the listing should be improved, promoted, restocked, bundled, or retired.",
];

const improvementCards = [
  {
    title: "Improve conversion",
    text: "Upgrade photos, title, description, condition notes, measurements, pricing, and shipping clarity.",
  },
  {
    title: "Lower promotion cost",
    text: "Use promotions carefully and stop discounts that do not improve profit.",
  },
  {
    title: "Raise order value",
    text: "Bundle related items or improve presentation to support stronger prices.",
  },
  {
    title: "Cut weak listings",
    text: "Relist, bundle, donate, or retire items that cannot produce enough return.",
  },
];

export default function MercariListingROIGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Listing ROI Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review when to improve, promote, discount, bundle, restock, or retire a
          Mercari listing based on traffic, conversion rate, profit, refund risk,
          listing investment, and sell-through.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">What is Mercari listing ROI?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari listing ROI measures whether a listing is producing enough
            profit compared with the money, time, and effort invested into it.
            A listing can receive views, likes, or messages while still producing
            weak ROI if it does not convert into profitable sales.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A good listing ROI should include more than revenue. Sellers should
            account for item cost, shipping, packaging, fees, promotion cost,
            refunds, stale inventory, and time spent sourcing or maintaining the
            listing.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Mercari listing ROI?</h2>

            <div className="mt-5 space-y-4">
              {roiFactors.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari listing ROI mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Mercari listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Estimate profit"
              text="Calculate sale price minus item cost, shipping, packaging, fees, refunds, and promotion cost."
            />
            <StepCard
              title="Add investment"
              text="Include sourcing, cleaning, photos, copywriting, relisting, price drops, and promotion work."
            />
            <StepCard
              title="Measure traffic"
              text="Review views, likes, conversion rate, orders, revenue, and profit per visitor."
            />
            <StepCard
              title="Decide action"
              text="Use ROI to decide whether to improve, promote, bundle, restock, or retire the listing."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari listing ROI calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a listing can be evaluated by profit instead
              of revenue alone.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the listing is profitable and has strong ROI. The
              next decision is whether similar items can be sourced consistently
              without increasing refund risk, storage pressure, or listing time.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What to do with listing ROI results
            </h2>

            <div className="mt-5 space-y-4">
              {roiActions.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari listing ROI checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {improvementCards.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/mercari/promotion-roi-calculator" label="Promotion ROI Calculator" />
            <Related href="/mercari/sell-through-rate-calculator" label="Sell-Through Calculator" />
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
          Example Mercari listing ROI item.
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