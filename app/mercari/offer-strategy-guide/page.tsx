const offerFactors = [
  {
    title: "List price",
    text: "The list price should leave room for buyer offers without making the final accepted price fall below your profit target.",
  },
  {
    title: "Minimum acceptable price",
    text: "Your minimum acceptable price should cover item cost, shipping, packaging, Mercari fees, payment processing, refund risk, and required profit.",
  },
  {
    title: "Buyer offer behavior",
    text: "Mercari buyers often expect negotiation. A good offer strategy gives room to accept realistic offers while rejecting weak ones.",
  },
  {
    title: "Seller-paid shipping",
    text: "Offers are riskier when you pay shipping because the label cost stays fixed while the sale price drops.",
  },
  {
    title: "Item demand",
    text: "Strong-demand items may not need deep offer acceptance, while stale items may justify a lower but still profitable price.",
  },
];

const mistakes = [
  "Accepting buyer offers before checking item cost, shipping, packaging, and fees.",
  "Using the list price as the profit reference instead of break-even price.",
  "Leaving no offer room on items where buyers are likely to negotiate.",
  "Countering randomly instead of using a minimum acceptable profit.",
  "Accepting low offers on seller-paid shipping listings without recalculating profit.",
  "Dropping prices on strong items too quickly before testing demand.",
];

const exampleRows = [
  ["List price", "$40.00"],
  ["Buyer offer", "$32.00"],
  ["Counteroffer", "$35.00"],
  ["Minimum acceptable price", "$33.30"],
  ["Item cost", "-$10.00"],
  ["Shipping cost", "-$6.50"],
  ["Packaging cost", "-$1.00"],
  ["Estimated profit at buyer offer", "$8.87"],
  ["Estimated profit at counteroffer", "$11.49"],
];

const offerPlanning = [
  {
    title: "Find break-even",
    text: "Calculate the lowest price that covers item cost, shipping, packaging, fees, and refund allowance.",
  },
  {
    title: "Set profit floor",
    text: "Choose the minimum profit needed to make the sale worth accepting.",
  },
  {
    title: "Build offer room",
    text: "List high enough that reasonable offers still leave acceptable profit.",
  },
  {
    title: "Counter with numbers",
    text: "Use your break-even and target profit to decide whether to accept, counter, or reject.",
  },
];

const offerDecisions = [
  {
    title: "Accept",
    text: "Accept when the offer clears your minimum profit and helps move inventory at a worthwhile return.",
  },
  {
    title: "Counter",
    text: "Counter when the buyer offer is close but still below your target profit or offer floor.",
  },
  {
    title: "Reject",
    text: "Reject when the offer falls below break-even, ignores seller-paid shipping, or creates too little profit.",
  },
  {
    title: "Wait",
    text: "Wait when the item is newly listed, has strong demand, or already has enough buyer interest.",
  },
];

const checklist = [
  "Original list price and buyer offer amount.",
  "Counteroffer price and minimum acceptable price.",
  "Item cost, sourcing cost, cleaning cost, and prep cost.",
  "Shipping label cost and whether seller pays shipping.",
  "Packaging supplies, tape, labels, boxes, and protective material.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Refund, cancellation, damaged item, and replacement risk.",
  "Target profit before accepting or countering an offer.",
];

const improvementCards = [
  {
    title: "Know your floor",
    text: "Calculate the lowest acceptable price before offers arrive.",
  },
  {
    title: "Build offer room",
    text: "List with enough margin to accept reasonable buyer offers.",
  },
  {
    title: "Protect shipping",
    text: "Be stricter when the listing includes seller-paid shipping.",
  },
  {
    title: "Use sold comps",
    text: "Counter based on realistic sold prices, not only active listing prices.",
  },
];

export default function MercariOfferStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Offer Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to handle Mercari buyer offers, counteroffers, minimum
          acceptable price, offer room, seller-paid shipping, break-even price,
          and profit floors before accepting lower prices.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Mercari sellers handle buyer offers?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari offers can help turn interest into sales, but an offer should
            not be accepted just because it creates activity. The accepted price
            still needs to cover item cost, shipping, packaging, Mercari fees,
            payment processing, refund risk, and the seller’s minimum profit.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A strong offer strategy starts before the buyer sends an offer.
            Sellers should know their break-even price, target profit, and
            counteroffer range so they can respond without guessing.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Mercari offer decisions?
            </h2>

            <div className="mt-5 space-y-4">
              {offerFactors.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari offer mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan a Mercari offer strategy</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {offerPlanning.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari offer calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a counteroffer may protect more profit than
              accepting the first buyer offer.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the buyer offer is profitable, but it is below the
              seller’s target. A counteroffer may recover more profit while still
              giving the buyer a discount from the list price.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What to do with Mercari offers
            </h2>

            <div className="mt-5 space-y-4">
              {offerDecisions.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari offer checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari offer strategy
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
            <Related href="/mercari/offer-profit-calculator" label="Offer Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
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
          Example Mercari offer strategy item.
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