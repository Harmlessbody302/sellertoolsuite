export default function PoshmarkProfitMarginGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Profit Margin Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Poshmark profit margin works after item cost, Poshmark fees,
          packaging, shipping discounts, buyer offers, returns, promotion costs,
          and seller-paid expenses.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is a good Poshmark profit margin?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              A good Poshmark profit margin depends on the item category,
              purchase cost, shipping discount, packaging needs, buyer offer
              behavior, and how quickly the item sells. A listing can look
              profitable from sale price alone while still producing weak net
              profit after all seller costs are included.
            </p>

            <p>
              Poshmark sellers should review both dollar profit and percentage
              margin. A high-margin item with very low dollar profit may not be
              worth the time, while a lower-margin item with fast sell-through
              can still be useful.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Poshmark margin types</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Gross profit"
                text="Gross profit is the sale price minus item cost. It is useful, but it does not include Poshmark fees, packaging, shipping discounts, or offer discounts."
              />
              <InfoCard
                title="Net profit"
                text="Net profit is what remains after item cost, packaging, Poshmark fees, shipping discounts, buyer offers, refunds, and promotion costs."
              />
              <InfoCard
                title="Profit margin"
                text="Profit margin compares profit to sale price. It shows how much of each Poshmark sale remains as profit."
              />
              <InfoCard
                title="Offer-adjusted margin"
                text="Offer-adjusted margin shows whether a buyer offer still leaves enough profit after all costs are included."
              />
              <InfoCard
                title="Shipping-adjusted margin"
                text="Shipping-adjusted margin is especially important when the seller sends offers with shipping discounts."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Poshmark margin mistakes</h2>

            <div className="mt-5 space-y-4">
              {[
                "Calling an item profitable before subtracting Poshmark fees, packaging, and shipping discounts.",
                "Using gross profit as if it were final net profit.",
                "Accepting buyer offers without checking how much margin remains.",
                "Ignoring seller-paid shipping discounts when comparing listings.",
                "Treating every category as if it should have the same margin.",
                "Sourcing more similar items before checking actual profit after sale.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to calculate Poshmark profit margin
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with sale price"
              text="Use the actual expected sale price after buyer offers, Closet Clear Out drops, or bundle discounts."
            />
            <StepCard
              title="Subtract item cost"
              text="Include product cost, sourcing cost, cleaning cost, and prep supplies."
            />
            <StepCard
              title="Subtract sale costs"
              text="Include Poshmark fees, packaging, shipping discounts, promotion cost, and refund allowance."
            />
            <StepCard
              title="Divide by price"
              text="Compare remaining profit with sale price to estimate margin percentage."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Poshmark margin calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how margin changes once real Poshmark selling
              costs are included.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value="$45.00" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Estimated Poshmark fee" value="-$9.00" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Refund allowance" value="-$1.00" />
              <Breakdown label="Estimated profit" value="$17.73" />
              <Breakdown label="Estimated margin" value="39.4%" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the item sells for $45.00 and leaves an estimated
              $17.73 after major costs, creating an estimated margin of 39.4%.
              A lower buyer offer or larger shipping discount would reduce that
              margin quickly.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark margin notes</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Margin vs. markup"
                text="Margin compares profit to sale price. Markup compares profit to cost. A $10 profit on a $45 sale is a 22.2% margin, not a 100% margin."
              />
              <InfoCard
                title="High margin is not always high profit"
                text="A small item can have a high percentage margin but still produce too little dollar profit to justify sourcing, listing, packing, and shipping time."
              />
              <InfoCard
                title="Low margin may still work"
                text="A lower-margin item can still be worthwhile if it sells quickly, has low issue risk, and requires little handling."
              />
              <InfoCard
                title="Shipping changes margin quickly"
                text="When shipping discounts are added to offers, margin can shrink even if the sale price looks strong."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark margin checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Sale price before and after buyer offers.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Poshmark flat fee or percentage commission.",
              "Packaging supplies, mailers, labels, tape, and thank-you cards.",
              "Seller-paid shipping discount or Closet Clear Out impact.",
              "Promotion, relisting, sharing, and closet activity cost.",
              "Refund, cancellation, damaged item, and replacement allowance.",
              "Minimum acceptable profit before accepting offers.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Poshmark profit margin</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise price carefully"
              text="Test higher prices on items with strong demand, better photos, or better condition."
            />
            <StepCard
              title="Lower shipping cost"
              text="Use shipping discounts carefully and avoid unnecessary shipping incentives."
            />
            <StepCard
              title="Improve sourcing"
              text="Buy lower-cost items only when sold comps support enough final margin."
            />
            <StepCard
              title="Limit weak offers"
              text="Set a minimum acceptable price so buyer offers do not erase profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/break-even-calculator" label="Break-Even Calculator" />
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
          Example Poshmark margin calculation item.
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