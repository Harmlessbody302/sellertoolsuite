export default function PoshmarkClosetPromotionStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Closet Promotion Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review Poshmark closet promotion, sharing strategy, listing activity,
          offer pressure, Closet Clear Out timing, promoted listings, sell-through,
          and profit impact before spending time or money on promotion.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Poshmark sellers promote a closet?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark closet promotion should be used to increase profitable
              sales, not just activity. More views, likes, shares, or offers only
              matter if the promoted listings still produce enough profit after
              item cost, Poshmark fees, packaging, shipping discounts, promotion
              cost, and refund risk.
            </p>

            <p>
              A strong promotion strategy starts with good listings, realistic
              prices, clear photos, and known profit floors. Once those are in
              place, sellers can test sharing activity, offers, price drops,
              Closet Clear Out, bundles, and promoted listings without guessing.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Poshmark promotion results?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Listing quality"
                text="Photos, title, brand, size, measurements, condition notes, and description quality affect whether promotion turns into sales."
              />
              <InfoCard
                title="Profit per sale"
                text="Promotion only helps if each additional sale still leaves enough profit after fees, discounts, packaging, and returns."
              />
              <InfoCard
                title="Offer strategy"
                text="Offers can improve conversion, but seller discounts and shipping incentives should be compared against the final profit."
              />
              <InfoCard
                title="Closet activity"
                text="Sharing, relisting, price drops, bundles, and fresh listings can all affect buyer visibility and closet performance."
              />
              <InfoCard
                title="Promotion cost"
                text="Any paid promotion, time investment, or discount strategy should be measured against extra sales and profit lift."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark promotion mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Promoting listings before checking profit after offers and shipping discounts.",
                "Counting likes, shares, or views as success without checking actual sales.",
                "Spending time or money promoting listings with weak photos or unclear descriptions.",
                "Using broad discounts on items that already have thin margins.",
                "Promoting stale inventory instead of improving or relisting it first.",
                "Scaling promotion without tracking before-and-after profit results.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan a Poshmark promotion strategy
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Check profit"
              text="Calculate expected profit after item cost, fees, packaging, discounts, and refund risk."
            />
            <StepCard
              title="Improve listings"
              text="Update photos, title, description, measurements, and condition details before promotion."
            />
            <StepCard
              title="Choose tactic"
              text="Compare sharing, offers, Closet Clear Out, relisting, bundles, or paid promotion."
            />
            <StepCard
              title="Measure lift"
              text="Track extra sales, extra revenue, profit lift, and whether the promotion was worth it."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark promotion calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how extra sales need to cover promotion cost and
              discount pressure.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Average sale price" value="$45.00" />
              <Breakdown label="Offer discount" value="-$5.00" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Profit per sale" value="$14.04" />
              <Breakdown label="Promotion cost" value="-$20.00" />
              <Breakdown label="Expected extra sales" value="6" />
              <Breakdown label="Net promotion lift" value="$64.24" />
              <Breakdown label="Promotion ROI" value="321.2%" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the promotion appears worthwhile because the
              expected extra profit is larger than the promotion cost. If extra
              sales are lower than expected, the same promotion may become weak.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Poshmark promotion methods to compare
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Sharing activity"
                text="Sharing can improve visibility, but the time spent sharing should still be compared against extra profit."
              />
              <InfoCard
                title="Offers to likers"
                text="Offers can create sales, but the offer discount and shipping discount must be included."
              />
              <InfoCard
                title="Closet Clear Out"
                text="Price drops can help stale listings, but the lower price needs to stay above the profit floor."
              />
              <InfoCard
                title="Promoted listings"
                text="Paid promotion should be tested with clear before-and-after sales, profit, and ROI tracking."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark promotion checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Expected sale price after offers or price drops.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Poshmark fees, packaging supplies, and shipping discount impact.",
              "Promotion cost, sharing time, relisting time, or paid campaign cost.",
              "Current views, likes, conversion rate, and monthly sales.",
              "Expected extra sales and extra revenue from the promotion.",
              "Refund allowance, damaged item risk, and support time.",
              "Whether the promotion creates profit lift or only more activity.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark promotion results
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve first"
              text="Update photos, title, measurements, condition notes, and pricing before promoting."
            />
            <StepCard
              title="Target winners"
              text="Promote listings with proven demand, strong profit, and healthy sell-through."
            />
            <StepCard
              title="Limit discounts"
              text="Avoid stacking deep buyer offers, shipping discounts, and price drops."
            />
            <StepCard
              title="Track profit"
              text="Measure sales and profit before and after promotion, not just likes or views."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/closet-promotion-calculator" label="Closet Promotion Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
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
          Example Poshmark closet promotion item.
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