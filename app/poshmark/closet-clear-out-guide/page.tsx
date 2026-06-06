export default function PoshmarkClosetClearOutGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Closet Clear Out Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Poshmark Closet Clear Out price drops, shipping incentives,
          offer timing, stale inventory, profit floors, and buyer interest affect
          seller profit and closet performance.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Poshmark sellers use Closet Clear Out?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Closet Clear Out can help sellers create urgency around stale or
              liked listings, but the price drop still needs to protect profit.
              A lower price may help an item sell, but it can also erase margin
              if the seller has not included item cost, Poshmark fees, packaging,
              shipping discount pressure, and refund risk.
            </p>

            <p>
              The best use of Closet Clear Out is usually selective. Sellers
              should use it on listings where a price drop may create a sale
              without dropping below the minimum acceptable profit.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Closet Clear Out profit?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Original list price"
                text="The original list price should leave enough room for a price drop without falling below the seller’s profit floor."
              />
              <InfoCard
                title="Dropped price"
                text="The dropped price needs to cover item cost, Poshmark fees, packaging, shipping discount pressure, and refund allowance."
              />
              <InfoCard
                title="Buyer interest"
                text="Closet Clear Out works best when a listing already has buyer interest, likes, views, or demand."
              />
              <InfoCard
                title="Item age"
                text="Older or stale listings may be better candidates for price drops than newly listed items with strong demand."
              />
              <InfoCard
                title="Profit floor"
                text="The seller should know the minimum acceptable profit before dropping the price."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Closet Clear Out mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Dropping prices without checking profit after item cost and Poshmark fees.",
                "Using Closet Clear Out on new listings before testing buyer demand.",
                "Assuming every price drop creates enough extra sales to offset lower margin.",
                "Dropping prices below the minimum acceptable profit floor.",
                "Ignoring packaging, refund allowance, and relisting alternatives.",
                "Using price drops as the only strategy instead of improving listing quality.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan a Closet Clear Out price drop
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find current profit"
              text="Calculate profit at the current listing price before any price drop."
            />
            <StepCard
              title="Set price floor"
              text="Choose the lowest dropped price that still leaves acceptable profit."
            />
            <StepCard
              title="Review demand"
              text="Check whether the listing has likes, views, saves, or buyer interest."
            />
            <StepCard
              title="Compare options"
              text="Decide whether to drop price, send an offer, relist, bundle, or wait."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Closet Clear Out calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a price drop can reduce profit per sale but
              still be useful if it creates enough extra sales.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Original price" value="$50.00" />
              <Breakdown label="Dropped price" value="$42.00" />
              <Breakdown label="Price drop amount" value="-$8.00" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Estimated Poshmark fee" value="-$8.40" />
              <Breakdown label="Estimated profit after drop" value="$17.35" />
              <Breakdown label="Extra sales needed" value="2" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the dropped price still leaves profit. The key
              question is whether the price drop is likely to create enough extra
              sales to justify the reduced margin.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              When Closet Clear Out can make sense
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Stale listings"
                text="A price drop may help older listings that have not converted after enough exposure."
              />
              <InfoCard
                title="Liked items"
                text="Closet Clear Out may work better when the listing already has likes or buyer interest."
              />
              <InfoCard
                title="Seasonal timing"
                text="A price drop can help move seasonal items before demand fades."
              />
              <InfoCard
                title="Cash-flow need"
                text="Clearing inventory can make sense when the seller needs cash or storage space for stronger items."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Closet Clear Out checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Original list price and proposed dropped price.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Poshmark fee estimate at the dropped price.",
              "Packaging supplies, labels, mailers, tape, and thank-you cards.",
              "Refund allowance, cancellation risk, and damaged item risk.",
              "Listing age, likes, views, buyer interest, and category demand.",
              "Minimum acceptable profit before using a price drop.",
              "Whether relisting, improving photos, bundling, or waiting would work better.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Closet Clear Out results
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve first"
              text="Update photos, title, description, measurements, and condition notes before dropping price."
            />
            <StepCard
              title="Use profit floors"
              text="Know the lowest acceptable price before using a price drop."
            />
            <StepCard
              title="Target stale items"
              text="Use Closet Clear Out on older listings instead of cutting strong listings too early."
            />
            <StepCard
              title="Track outcomes"
              text="Compare actual sales and profit after price drops, not just likes or views."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/closet-clear-out-calculator" label="Closet Clear Out Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Example Poshmark Closet Clear Out item.
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