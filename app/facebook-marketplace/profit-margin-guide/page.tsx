export default function FacebookMarketplaceProfitMarginGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Profit Margin Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review how Facebook Marketplace profit margin works after item cost,
          delivery cost, shipping cost, packaging, negotiation discounts, buyer
          offers, refunds, repair cost, pickup friction, and local selling time.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is a good Facebook Marketplace profit margin?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              A good Facebook Marketplace profit margin depends on the item
              category, purchase cost, local demand, delivery distance,
              negotiation pressure, repair needs, and how quickly the item
              sells. A listing can look profitable from sale price alone while
              still producing weak net profit after all selling costs are
              included.
            </p>

            <p>
              Sellers should review both dollar profit and percentage margin. A
              high-margin item with very low dollar profit may not be worth the
              time, while a lower-margin item with fast sell-through and minimal
              pickup friction can still be useful.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Facebook Marketplace margin types
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Gross profit"
                text="Gross profit is the sale price minus item cost. It is useful, but it does not include delivery, shipping, packaging, negotiation, repairs, or refund risk."
              />
              <InfoBlock
                title="Net profit"
                text="Net profit is what remains after item cost, packaging, delivery, shipping, platform fees if applicable, negotiation discounts, repairs, and other selling costs."
              />
              <InfoBlock
                title="Profit margin"
                text="Profit margin compares net profit to sale price. It shows how much of each Facebook Marketplace sale remains as profit."
              />
              <InfoBlock
                title="Offer-adjusted margin"
                text="Offer-adjusted margin shows whether a buyer offer or counteroffer still leaves enough profit after all costs are included."
              />
              <InfoBlock
                title="Delivery-adjusted margin"
                text="Delivery-adjusted margin is especially important when the seller offers local delivery or drives to meet the buyer."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace margin mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Calling an item profitable before subtracting item cost, delivery cost, packaging, and repairs.",
                "Using gross profit as if it were final net profit.",
                "Accepting buyer offers without checking how much margin remains.",
                "Ignoring fuel, mileage, driving time, pickup delays, and no-shows.",
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
            How to calculate Facebook Marketplace profit margin
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Start with sale price"
              text="Use the actual expected sale price after buyer offers, negotiation, bundles, or local discounts."
            />
            <InfoCard
              title="Subtract item cost"
              text="Include purchase cost, sourcing cost, cleaning cost, repair cost, and prep supplies."
            />
            <InfoCard
              title="Subtract sale costs"
              text="Include delivery, shipping, packaging, platform fees, refund allowance, and selling time."
            />
            <InfoCard
              title="Divide by price"
              text="Compare remaining profit with sale price to estimate margin percentage."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace margin calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how margin changes once real Facebook
              Marketplace selling costs are included.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Sale price"
                note="Example Facebook Marketplace margin calculation item."
                value="$80.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace margin calculation item."
                value="-$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace margin calculation item."
                value="-$1.00"
              />
              <Breakdown
                label="Delivery cost"
                note="Example Facebook Marketplace margin calculation item."
                value="-$5.00"
              />
              <Breakdown
                label="Platform fee estimate"
                note="Example Facebook Marketplace margin calculation item."
                value="-$0.00"
              />
              <Breakdown
                label="Negotiation allowance"
                note="Example Facebook Marketplace margin calculation item."
                value="-$8.00"
              />
              <Breakdown
                label="Refund allowance"
                note="Example Facebook Marketplace margin calculation item."
                value="-$1.50"
              />
              <Breakdown
                label="Estimated profit"
                note="Example Facebook Marketplace margin calculation item."
                value="$29.50"
              />
              <Breakdown
                label="Estimated margin"
                note="Example Facebook Marketplace margin calculation item."
                value="36.9%"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the item sells for $80.00 and leaves an estimated
              $29.50 after major costs, creating an estimated margin of 36.9%.
              A lower buyer offer, longer delivery trip, repair issue, or refund
              problem would reduce that margin quickly.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace margin notes
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Margin vs. markup"
                text="Margin compares profit to sale price. Markup compares profit to cost. A $29.50 profit on an $80 sale is a 36.9% margin, not an 84.3% margin."
              />
              <InfoBlock
                title="High margin is not always high profit"
                text="A small item can have a high percentage margin but still produce too little dollar profit to justify sourcing, cleaning, messaging, or delivery time."
              />
              <InfoBlock
                title="Low margin may still work"
                text="A lower-margin item can still be worthwhile if it sells quickly, has low pickup friction, needs little repair, and does not tie up much space."
              />
              <InfoBlock
                title="Delivery changes margin quickly"
                text="When fuel, time, pickup delays, and failed meetups are added, delivery can shrink margin even if the sale price looks strong."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace margin checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Sale price before and after buyer offers." />
            <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep supplies." />
            <ChecklistItem text="Packaging supplies, labels, boxes, tape, mailers, and protective material." />
            <ChecklistItem text="Delivery mileage, fuel, driving time, parking, and pickup friction." />
            <ChecklistItem text="Shipping cost and seller-paid shipping if the item is shipped." />
            <ChecklistItem text="Platform fee or payment processing fee when applicable." />
            <ChecklistItem text="Refund, cancellation, damaged item, no-show, and replacement allowance." />
            <ChecklistItem text="Minimum acceptable profit before accepting buyer offers." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace profit margin
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Raise price carefully"
              text="Test higher prices on items with strong demand, better photos, or better condition."
            />
            <InfoCard
              title="Lower delivery cost"
              text="Use pickup, delivery limits, or delivery fees to avoid unnecessary fuel and time cost."
            />
            <InfoCard
              title="Improve sourcing"
              text="Buy lower-cost items only when sold comps support enough final margin."
            />
            <InfoCard
              title="Limit weak offers"
              text="Set a minimum acceptable price so buyer offers do not erase profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/facebook-marketplace/offer-roi-calculator" label="Offer ROI Calculator" />
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