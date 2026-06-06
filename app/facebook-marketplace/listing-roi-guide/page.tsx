export default function FacebookMarketplaceListingRoiGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Listing ROI Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review when to improve, renew, repost, promote, discount, bundle, or
          remove a Facebook Marketplace listing based on views, messages,
          conversion rate, item cost, delivery cost, profit, listing investment,
          and refund risk.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Facebook Marketplace listing ROI?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace listing ROI measures whether a listing is
              producing enough profit compared with the money, time, and effort
              invested into it. A listing can receive views, saves, or buyer
              messages while still producing weak ROI if it does not convert into
              profitable sales.
            </p>

            <p>
              A good listing ROI should include more than revenue. Sellers should
              account for item cost, packaging, delivery cost, shipping cost,
              negotiation discounts, refund risk, no-shows, stale inventory, and
              the time spent sourcing, cleaning, photographing, measuring,
              writing, renewing, reposting, and messaging buyers.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace listing ROI?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Product margin"
                text="A listing with strong product margin has more room for buyer negotiation, delivery requests, shipping, relisting effort, and refund risk."
              />
              <InfoBlock
                title="Traffic quality"
                text="Views, saves, and messages are only useful if they turn into profitable sales. Weak traffic can make a listing look active without producing ROI."
              />
              <InfoBlock
                title="Conversion rate"
                text="A listing with low conversion may need better photos, title, description, pickup details, price, or category targeting."
              />
              <InfoBlock
                title="Listing investment"
                text="Time spent sourcing, cleaning, photographing, measuring, writing, reposting, promoting, and messaging should be weighed against expected profit."
              />
              <InfoBlock
                title="Pickup and issue risk"
                text="High-risk listings can produce weak ROI if no-shows, delivery requests, buyer confusion, disputes, or damaged items are common."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace listing ROI mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Judging a listing by views or messages instead of actual profit.",
                "Promoting listings before checking profit after delivery, shipping, and offers.",
                "Ignoring time spent sourcing, cleaning, photographing, measuring, writing, reposting, and messaging.",
                "Keeping stale listings active without improving price, title, photos, or description.",
                "Restocking similar items before confirming the listing produces enough return.",
                "Using broad store-wide averages instead of product-level listing ROI.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Facebook Marketplace listing ROI
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Estimate profit"
              text="Calculate sale price minus item cost, packaging, delivery, shipping, fees, negotiation discounts, and refund risk."
            />
            <InfoCard
              title="Add investment"
              text="Include sourcing, cleaning, photos, copywriting, reposting, promotion cost, and buyer message time."
            />
            <InfoCard
              title="Measure traffic"
              text="Review views, saves, messages, conversion rate, orders, revenue, and profit per visitor."
            />
            <InfoCard
              title="Decide action"
              text="Use ROI to decide whether to improve, promote, repost, discount, bundle, restock, or remove the listing."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace listing ROI calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a listing can be evaluated by profit
              instead of views or messages alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Monthly listing views"
                note="Example Facebook Marketplace listing ROI item."
                value="600"
              />
              <Breakdown
                label="Listing conversion rate"
                note="Example Facebook Marketplace listing ROI item."
                value="2.5%"
              />
              <Breakdown
                label="Estimated orders"
                note="Example Facebook Marketplace listing ROI item."
                value="15"
              />
              <Breakdown
                label="Monthly revenue"
                note="Example Facebook Marketplace listing ROI item."
                value="$1,080.00"
              />
              <Breakdown
                label="Listing investment"
                note="Example Facebook Marketplace listing ROI item."
                value="-$17.00"
              />
              <Breakdown
                label="Refund loss"
                note="Example Facebook Marketplace listing ROI item."
                value="-$18.45"
              />
              <Breakdown
                label="Net listing profit"
                note="Example Facebook Marketplace listing ROI item."
                value="$429.55"
              />
              <Breakdown
                label="Listing ROI"
                note="Example Facebook Marketplace listing ROI item."
                value="2526.8%"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the listing is profitable and has strong ROI. The
              next decision is whether similar items can be sourced consistently
              without increasing refund risk, delivery cost, storage pressure,
              or buyer message time.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What to do with listing ROI results
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Improve"
                text="If traffic exists but conversion is weak, improve photos, title, description, pickup details, price, and category fit."
              />
              <InfoBlock
                title="Promote"
                text="If margin is strong and conversion is healthy, promotion or extra sharing may be worth testing with a clear profit target."
              />
              <InfoBlock
                title="Restock"
                text="If ROI is strong and demand is consistent, sourcing more similar items may make sense before inventory runs out."
              />
              <InfoBlock
                title="Retire"
                text="If ROI stays weak after testing, the item may not deserve more time, storage, price drops, delivery effort, or listing work."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace listing ROI checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Sale price before and after buyer negotiation." />
            <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep cost." />
            <ChecklistItem text="Packaging supplies, labels, boxes, tape, and protective material." />
            <ChecklistItem text="Delivery mileage, fuel, driving time, shipping cost, and pickup friction." />
            <ChecklistItem text="Promotion cost, reposting time, listing work, and buyer message time." />
            <ChecklistItem text="Views, saves, messages, conversion rate, and actual sales." />
            <ChecklistItem text="Refund, cancellation, no-show, damaged item, and support risk." />
            <ChecklistItem text="Whether the listing should be improved, promoted, bundled, restocked, discounted, or removed." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace listing ROI
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Improve conversion"
              text="Upgrade photos, title, description, measurements, condition notes, pickup details, and price clarity."
            />
            <InfoCard
              title="Lower promotion cost"
              text="Use promotions carefully and stop spending when they do not improve profit."
            />
            <InfoCard
              title="Raise order value"
              text="Bundle related items or improve presentation to support stronger prices."
            />
            <InfoCard
              title="Cut weak listings"
              text="Relist, bundle, donate, or retire items that cannot produce enough return."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/facebook-marketplace/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
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