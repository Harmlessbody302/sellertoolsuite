const marginTypes = [
  {
    title: "Gross profit",
    text: "Gross profit is the sale price minus item cost. It is useful, but it does not include shipping, packaging, fees, or offer discounts.",
  },
  {
    title: "Net profit",
    text: "Net profit is what remains after item cost, shipping, packaging, Mercari fees, payment processing, refunds, and promotions.",
  },
  {
    title: "Profit margin",
    text: "Profit margin compares profit to sale price. It shows how much of each Mercari sale remains as profit.",
  },
  {
    title: "Offer-adjusted margin",
    text: "Offer-adjusted margin shows whether a buyer offer still leaves enough profit after all costs are included.",
  },
  {
    title: "Shipping-adjusted margin",
    text: "Shipping-adjusted margin is especially important when the seller pays shipping or builds shipping into the item price.",
  },
];

const mistakes = [
  "Calling an item profitable before subtracting shipping, packaging, and fees.",
  "Using gross profit as if it were final net profit.",
  "Accepting buyer offers without checking how much margin remains.",
  "Ignoring seller-paid shipping when comparing listings.",
  "Treating every category as if it should have the same margin.",
  "Sourcing more similar items before checking actual profit after sale.",
];

const exampleRows = [
  ["Sale price", "$35.00"],
  ["Item cost", "-$10.00"],
  ["Shipping cost", "-$6.50"],
  ["Packaging cost", "-$1.00"],
  ["Estimated selling fees", "-$3.50"],
  ["Payment processing estimate", "-$1.52"],
  ["Refund allowance", "-$1.00"],
  ["Estimated profit", "$10.48"],
  ["Estimated margin", "29.9%"],
];

const marginComparison = [
  {
    title: "Margin vs. markup",
    text: "Margin compares profit to sale price. Markup compares profit to cost. A $10 profit on a $35 sale is a 28.6% markup on a $35 price only if calculated incorrectly; margin should be based on the sale price.",
  },
  {
    title: "High margin is not always high profit",
    text: "A small item can have a high percentage margin but still produce too little dollar profit to justify sourcing, listing, packing, and shipping time.",
  },
  {
    title: "Low margin may still work",
    text: "A lower-margin item can still be worthwhile if it sells quickly, has low issue risk, and requires little handling.",
  },
  {
    title: "Shipping changes margin quickly",
    text: "When shipping costs rise or a seller switches to free shipping, margin can shrink even if the sale price stays the same.",
  },
];

const checklist = [
  "Sale price before and after buyer offers.",
  "Item cost, sourcing cost, cleaning cost, and prep cost.",
  "Shipping label cost and whether buyer or seller pays shipping.",
  "Packaging supplies, labels, tape, boxes, and mailers.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Promotion, price drop, or discount impact.",
  "Refund, cancellation, damaged item, and replacement allowance.",
  "Minimum acceptable profit before sourcing or accepting offers.",
];

const improvementCards = [
  {
    title: "Raise price carefully",
    text: "Test higher prices on items with strong demand, better photos, or better condition.",
  },
  {
    title: "Lower shipping cost",
    text: "Use accurate weights, right-sized packaging, and buyer-paid shipping when appropriate.",
  },
  {
    title: "Improve sourcing",
    text: "Buy lower-cost items only when sold comps support enough final margin.",
  },
  {
    title: "Limit weak offers",
    text: "Set a minimum acceptable price so buyer offers do not erase profit.",
  },
];

export default function MercariProfitMarginGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Profit Margin Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Mercari profit margin works after item cost, shipping,
          packaging, selling fees, payment processing, buyer offers, refunds,
          promotions, and seller-paid shipping.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is a good Mercari profit margin?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A good Mercari profit margin depends on the item category, purchase
            cost, shipping cost, packaging needs, buyer offer behavior, and how
            quickly the item sells. A listing can look profitable from sale price
            alone while still producing weak net profit once fees, shipping, and
            issue risk are included.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari sellers should review both dollar profit and percentage
            margin. A high-margin item with very low dollar profit may not be
            worth the time, while a lower-margin item with fast sell-through can
            still be useful.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Mercari margin types</h2>

            <div className="mt-5 space-y-4">
              {marginTypes.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari margin mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to calculate Mercari profit margin
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with sale price"
              text="Use the actual expected sale price after buyer offers or price drops."
            />
            <StepCard
              title="Subtract item cost"
              text="Include product cost, sourcing cost, cleaning, and prep supplies."
            />
            <StepCard
              title="Subtract sale costs"
              text="Include shipping, packaging, Mercari fees, payment processing, and refunds."
            />
            <StepCard
              title="Divide by price"
              text="Compare remaining profit with sale price to estimate margin percentage."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari margin calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how margin changes once real Mercari selling
              costs are included.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the item sells for $35.00 and leaves an estimated
              $10.48 after major costs, creating an estimated margin of 29.9%.
              A lower buyer offer or higher shipping cost would reduce that
              margin quickly.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari margin notes</h2>

            <div className="mt-5 space-y-4">
              {marginComparison.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari margin checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari profit margin
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
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/mercari/offer-profit-calculator" label="Offer Profit Calculator" />
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
          Example Mercari margin calculation item.
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