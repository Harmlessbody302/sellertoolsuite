const pricingInputs = [
  {
    title: "Item cost",
    text: "Start with the amount paid for the item, sourcing cost, cleaning cost, prep supplies, and any inbound shipping cost.",
  },
  {
    title: "Shipping and packaging",
    text: "Include shipping labels, boxes, mailers, bubble wrap, tape, labels, protective material, and whether the buyer or seller pays shipping.",
  },
  {
    title: "Mercari fees",
    text: "Account for selling fees, payment processing, fixed transaction fees, and any promotion or price-drop impact.",
  },
  {
    title: "Offer room",
    text: "Mercari buyers often send offers. Price with enough room to accept reasonable offers without dropping below your minimum profit.",
  },
  {
    title: "Refund and damage risk",
    text: "Include a small allowance for refunds, cancellations, damaged items, disputes, and support time.",
  },
];

const mistakes = [
  "Pricing from active listings instead of realistic sold comps.",
  "Accepting buyer offers without recalculating profit.",
  "Forgetting seller-paid shipping, packaging, and fixed transaction fees.",
  "Matching the lowest competitor when your item cost or shipping cost is higher.",
  "Using the same margin target for every category even when sell-through differs.",
  "Dropping prices repeatedly without checking whether the item is still profitable.",
];

const exampleRows = [
  ["Target sale price", "$35.00"],
  ["Item cost", "-$10.00"],
  ["Shipping cost", "-$6.50"],
  ["Packaging cost", "-$1.00"],
  ["Estimated selling fees", "-$3.50"],
  ["Payment processing estimate", "-$1.52"],
  ["Refund allowance", "-$1.00"],
  ["Estimated profit", "$10.48"],
];

const pricingMethods = [
  {
    title: "Cost-plus pricing",
    text: "Add your item cost, shipping, packaging, fees, and desired profit to estimate a minimum viable price.",
  },
  {
    title: "Sold-comp pricing",
    text: "Compare similar sold Mercari listings, not only active listings, to estimate what buyers actually pay.",
  },
  {
    title: "Offer-room pricing",
    text: "Set the list price high enough that a reasonable buyer offer still leaves acceptable profit.",
  },
  {
    title: "Fast-turn pricing",
    text: "Use lower but still profitable prices when the goal is faster sell-through or clearing inventory.",
  },
];

const checklist = [
  "Item cost, sourcing cost, cleaning cost, and prep supplies.",
  "Shipping label cost and whether buyer or seller pays shipping.",
  "Packaging, tape, labels, mailers, boxes, and protective materials.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Expected buyer offer room before accepting discounts.",
  "Refund, cancellation, damaged item, and replacement risk.",
  "Realistic sold comps, not only active listing prices.",
  "Target profit and break-even price before listing.",
];

const improvementCards = [
  {
    title: "Use sold comps",
    text: "Price from completed sales and item condition instead of active listings alone.",
  },
  {
    title: "Build in offer room",
    text: "Leave enough margin to accept reasonable buyer offers without losing profit.",
  },
  {
    title: "Protect shipping",
    text: "Account for seller-paid shipping before lowering price or accepting offers.",
  },
  {
    title: "Review stale items",
    text: "Lower or relist weak items only after checking profit and sell-through.",
  },
];

export default function HowToPriceMercariItemsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          How to Price Mercari Items
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to price Mercari listings around item cost, shipping,
          packaging, selling fees, payment processing, buyer offers, sold comps,
          refund risk, and target profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What should Mercari sellers include in item pricing?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari pricing should start with the full cost of selling the item,
            not just the amount you paid for it. A profitable price needs to cover
            item cost, shipping, packaging, Mercari fees, payment processing,
            possible buyer offers, refund risk, and the amount of profit you want
            left after the sale.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The goal is not always to set the highest possible price. The goal is
            to set a price that can realistically sell while still leaving enough
            margin after offers, shipping, and fees.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari pricing inputs</h2>

            <div className="mt-5 space-y-4">
              {pricingInputs.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari pricing mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Simple Mercari pricing formula</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add costs"
              text="Combine item cost, shipping, packaging, fees, promotion cost, and refund allowance."
            />
            <StepCard
              title="Choose profit"
              text="Pick the minimum profit you want to keep after selling the item."
            />
            <StepCard
              title="Add offer room"
              text="Raise the list price enough to handle realistic buyer offers."
            />
            <StepCard
              title="Check sold comps"
              text="Compare the final price against realistic Mercari sold prices."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari item price calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why Mercari pricing should be based on total
              selling cost, not purchase price alone.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, a $35 Mercari sale leaves an estimated $10.48
              after item cost, shipping, packaging, fees, and refund allowance.
              If a buyer offer lowers the sale price too far, the listing may no
              longer meet the seller’s profit goal.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Pricing methods for Mercari sellers
            </h2>

            <div className="mt-5 space-y-4">
              {pricingMethods.map((method) => (
                <InfoCard key={method.title} title={method.title} text={method.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari item pricing checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari pricing</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {improvementCards.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
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
          Example Mercari pricing calculation item.
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