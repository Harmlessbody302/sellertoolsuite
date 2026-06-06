export default function PoshmarkListingROIGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Listing ROI Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review when to improve, promote, discount, relist, bundle, or retire a
          Poshmark listing based on views, conversion rate, profit, refund risk,
          listing investment, offer behavior, and sell-through.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">What is Poshmark listing ROI?</h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark listing ROI measures whether a listing is producing enough
              profit compared with the money, time, and effort invested into it.
              A listing can receive likes, shares, or views while still producing
              weak ROI if it does not convert into profitable sales.
            </p>

            <p>
              A good listing ROI should include more than revenue. Sellers should
              account for item cost, Poshmark fees, packaging, shipping discounts,
              offer discounts, promotion cost, refund risk, stale inventory, and
              time spent sourcing, photographing, measuring, listing, sharing,
              and relisting.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Poshmark listing ROI?</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Product margin"
                text="A listing with strong product margin has more room for buyer offers, Poshmark fees, shipping discounts, and relisting work."
              />
              <InfoCard
                title="Traffic quality"
                text="Views, likes, and shares are only useful if they turn into profitable sales. Weak traffic can make a listing look active without producing ROI."
              />
              <InfoCard
                title="Conversion rate"
                text="A listing with low conversion may need better photos, title, measurements, condition notes, price, or shipping discount strategy."
              />
              <InfoCard
                title="Listing investment"
                text="Time spent sourcing, cleaning, photographing, measuring, writing, sharing, relisting, and promoting should be weighed against expected profit."
              />
              <InfoCard
                title="Refund and issue risk"
                text="High-risk items can produce sales while still creating weak ROI if refunds, disputes, damage, or buyer confusion are common."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Poshmark listing ROI mistakes</h2>

            <div className="mt-5 space-y-4">
              {[
                "Judging a listing by likes or views instead of actual profit.",
                "Promoting listings before checking profit after shipping discounts and offers.",
                "Ignoring time spent sourcing, cleaning, photographing, measuring, and listing.",
                "Keeping stale listings active without improving price, title, photos, or description.",
                "Restocking similar items before confirming the listing produces enough return.",
                "Using closet-wide averages instead of product-level listing ROI.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Poshmark listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Estimate profit"
              text="Calculate sale price minus item cost, Poshmark fees, packaging, shipping discounts, offer discounts, and refund risk."
            />
            <StepCard
              title="Add investment"
              text="Include sourcing, cleaning, photo work, measuring, listing, sharing, relisting, and promotion effort."
            />
            <StepCard
              title="Measure traffic"
              text="Review views, likes, conversion rate, orders, revenue, and profit per visitor."
            />
            <StepCard
              title="Decide action"
              text="Use ROI to decide whether to improve, promote, discount, relist, bundle, or retire the listing."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark listing ROI calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a listing can be evaluated by profit instead
              of views or likes alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Monthly listing views" value="800" />
              <Breakdown label="Listing conversion rate" value="3.0%" />
              <Breakdown label="Estimated orders" value="24" />
              <Breakdown label="Monthly revenue" value="$960.00" />
              <Breakdown label="Listing investment" value="-$22.00" />
              <Breakdown label="Refund loss" value="-$24.26" />
              <Breakdown label="Net listing profit" value="$307.26" />
              <Breakdown label="Listing ROI" value="1396.6%" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the listing is profitable and has strong ROI. The
              next decision is whether similar items can be sourced consistently
              without increasing refund risk, storage pressure, or listing time.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What to do with listing ROI results</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Improve"
                text="If traffic exists but conversion is weak, improve photos, title, description, measurements, pricing, or offer room."
              />
              <InfoCard
                title="Promote"
                text="If margin is strong and conversion is healthy, promotion may be worth testing with a clear profit target."
              />
              <InfoCard
                title="Restock"
                text="If ROI is strong and demand is consistent, sourcing more similar items may make sense before inventory runs out."
              />
              <InfoCard
                title="Retire"
                text="If ROI stays weak after testing, the item may not deserve more time, money, storage, or listing effort."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark listing ROI checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Sale price before and after buyer offers.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Poshmark fee estimate and seller-paid shipping discount.",
              "Packaging supplies, labels, mailers, tape, and thank-you cards.",
              "Promotion cost, Closet Clear Out price drop, and sharing time.",
              "Views, likes, conversion rate, and actual orders.",
              "Refund, cancellation, damaged item, and support risk.",
              "Whether the listing should be improved, promoted, restocked, bundled, or retired.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Poshmark listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve conversion"
              text="Upgrade photos, titles, descriptions, measurements, condition notes, and price clarity."
            />
            <StepCard
              title="Lower promotion cost"
              text="Use offers and promotions carefully and stop discounts that do not improve profit."
            />
            <StepCard
              title="Raise order value"
              text="Bundle related items or improve presentation to support stronger prices."
            />
            <StepCard
              title="Cut weak listings"
              text="Relist, bundle, donate, or retire items that cannot produce enough return."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/sell-through-rate-calculator" label="Sell-Through Calculator" />
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
          Example Poshmark listing ROI item.
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