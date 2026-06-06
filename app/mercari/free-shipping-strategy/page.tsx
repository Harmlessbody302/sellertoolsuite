const freeShippingFactors = [
  {
    title: "Shipping label cost",
    text: "Free shipping is not free for the seller. The label cost must be covered by the item price, margin, or higher conversion rate.",
  },
  {
    title: "Item price",
    text: "A free-shipping listing usually needs a higher sale price than a buyer-paid shipping listing to produce the same profit.",
  },
  {
    title: "Buyer comparison",
    text: "Buyers may compare total checkout cost, so sellers should compare item price plus shipping against similar sold listings.",
  },
  {
    title: "Package weight",
    text: "Free shipping is safer on small, lightweight items and riskier on heavy, fragile, or oversized items.",
  },
  {
    title: "Offer room",
    text: "Buyer offers can erase margin quickly when the seller is already paying shipping.",
  },
];

const mistakes = [
  "Offering free shipping without increasing the item price.",
  "Forgetting that seller-paid shipping reduces profit directly.",
  "Accepting buyer offers on free-shipping listings without recalculating profit.",
  "Using the same shipping estimate for light and heavy items.",
  "Ignoring packaging supplies, labels, tape, and protective material.",
  "Assuming free shipping improves sales enough to offset lost margin.",
];

const exampleRows = [
  ["Buyer-paid shipping price", "$35.00"],
  ["Free-shipping sale price", "$40.00"],
  ["Item cost", "-$10.00"],
  ["Shipping label cost", "-$6.50"],
  ["Packaging cost", "-$1.00"],
  ["Estimated Mercari fees", "-$5.66"],
  ["Refund allowance", "-$1.00"],
  ["Estimated free-shipping profit", "$15.84"],
];

const comparisonNotes = [
  {
    title: "Buyer-paid shipping",
    text: "Buyer-paid shipping keeps the label cost separate from seller profit, but the total checkout price may look higher to buyers.",
  },
  {
    title: "Free shipping",
    text: "Free shipping can simplify the offer, but only works when the item price is high enough to absorb the label cost.",
  },
  {
    title: "Built-in shipping",
    text: "Built-in shipping means raising the item price to cover the expected label while presenting the listing as free shipping.",
  },
  {
    title: "Category differences",
    text: "Lightweight, high-margin items may support free shipping better than bulky, fragile, or low-margin items.",
  },
];

const checklist = [
  "Buyer-paid shipping price and free-shipping price.",
  "Actual packed weight and package dimensions.",
  "Shipping label cost by carrier and service level.",
  "Packaging supplies, boxes, mailers, tape, labels, and protective material.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Buyer offer room after seller-paid shipping is included.",
  "Break-even price for the free-shipping listing.",
  "Profit difference between buyer-paid shipping and free shipping.",
];

const improvementCards = [
  {
    title: "Build shipping into price",
    text: "Raise the item price enough to cover seller-paid shipping instead of absorbing it blindly.",
  },
  {
    title: "Use lightweight items",
    text: "Free shipping usually works better when package cost is predictable and low.",
  },
  {
    title: "Set offer limits",
    text: "Be stricter with buyer offers on listings where you pay shipping.",
  },
  {
    title: "Compare both options",
    text: "Test buyer-paid and free-shipping pricing against actual profit, not just views.",
  },
];

export default function MercariFreeShippingStrategyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Free Shipping Strategy
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Compare Mercari free shipping, buyer-paid shipping, seller-paid
          shipping, built-in shipping, offer room, shipping labels, packaging
          costs, and profit impact before choosing a listing strategy.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Should Mercari sellers offer free shipping?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Free shipping can make a Mercari listing look simpler and more
            attractive, but the seller still pays the shipping label. That means
            the item price must be high enough to cover item cost, packaging,
            Mercari fees, payment processing, refund risk, and the shipping label
            while still leaving profit.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Free shipping is usually safer on lightweight, predictable, profitable
            items. It is more risky on heavy, fragile, oversized, or low-margin
            listings because one buyer offer or shipping estimate error can wipe
            out the remaining profit.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Mercari free shipping profit?
            </h2>

            <div className="mt-5 space-y-4">
              {freeShippingFactors.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari free shipping mistakes
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
            How to plan Mercari free shipping
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find label cost"
              text="Estimate shipping from packed weight, dimensions, carrier, and service."
            />
            <StepCard
              title="Build into price"
              text="Raise the item price enough to cover seller-paid shipping and packaging."
            />
            <StepCard
              title="Check offer room"
              text="Make sure buyer offers do not drop the sale below your profit floor."
            />
            <StepCard
              title="Compare options"
              text="Compare free shipping profit against buyer-paid shipping profit."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari free shipping calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how seller-paid shipping should be included in
              the listing price.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the seller raises the item price to help cover the
              shipping label. The free-shipping price is only useful if the final
              profit remains acceptable after fees, packaging, refunds, and buyer
              offers.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Free shipping vs. buyer-paid shipping
            </h2>

            <div className="mt-5 space-y-4">
              {comparisonNotes.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Mercari free shipping checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari free shipping profit
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
            <Related href="/mercari/free-shipping-calculator" label="Free Shipping Calculator" />
            <Related href="/mercari/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
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
          Example Mercari free shipping strategy item.
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