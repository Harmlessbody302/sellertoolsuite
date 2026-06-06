const promotionTypes = [
  {
    title: "Price drops",
    text: "Price drops can help stale listings get attention again, but the new price still needs to cover item cost, shipping, packaging, fees, and refund risk.",
  },
  {
    title: "Smart pricing",
    text: "Automated price reductions can save time, but sellers should set a profit floor so the listing does not keep dropping below a safe margin.",
  },
  {
    title: "Buyer offers",
    text: "Offers can turn interest into sales, but every accepted offer should be compared against break-even price and minimum acceptable profit.",
  },
  {
    title: "Listing refreshes",
    text: "Updating photos, titles, descriptions, and pricing can improve performance without immediately cutting the price.",
  },
  {
    title: "Bundle incentives",
    text: "Bundle offers can increase order value when combined shipping and item margins still leave enough total profit.",
  },
];

const mistakes = [
  "Promoting or discounting before checking break-even price.",
  "Dropping prices on weak listings instead of fixing photos, title, or description first.",
  "Using promotions to chase views while ignoring actual profit after sale.",
  "Accepting offers on seller-paid shipping listings without recalculating profit.",
  "Letting automated price drops continue below the minimum acceptable price.",
  "Promoting items that already have weak demand, poor comps, or too little margin.",
];

const exampleRows = [
  ["Original list price", "$40.00"],
  ["Promoted or reduced price", "$34.00"],
  ["Promotion discount", "-$6.00"],
  ["Item cost", "-$10.00"],
  ["Shipping cost", "-$6.50"],
  ["Packaging cost", "-$1.00"],
  ["Estimated Mercari fees", "-$4.39"],
  ["Refund allowance", "-$1.00"],
  ["Estimated profit after promotion", "$11.11"],
];

const promotionPlanning = [
  {
    title: "Find break-even",
    text: "Know the minimum price needed to cover costs before lowering a listing.",
  },
  {
    title: "Set a profit floor",
    text: "Choose the lowest acceptable price before using offers or automatic price drops.",
  },
  {
    title: "Review listing quality",
    text: "Fix weak photos, titles, descriptions, and pricing before relying on discounts.",
  },
  {
    title: "Measure profit",
    text: "Judge promotions by profit and sell-through, not only views, likes, or messages.",
  },
];

const promotionUseCases = [
  {
    title: "Move stale inventory",
    text: "A controlled price drop can be useful when an item has been sitting too long and still has enough margin.",
  },
  {
    title: "Test buyer demand",
    text: "Small price changes can show whether the issue is price, photos, category, condition, or demand.",
  },
  {
    title: "Protect cash flow",
    text: "Promotions can help convert old inventory back into cash if the final sale remains profitable.",
  },
  {
    title: "Improve sell-through",
    text: "A promotion may be worthwhile when faster sales help support a larger sourcing or listing goal.",
  },
];

const checklist = [
  "Original list price and promoted sale price.",
  "Item cost, sourcing cost, cleaning cost, and prep cost.",
  "Shipping label cost and whether seller pays shipping.",
  "Packaging supplies, tape, labels, boxes, and protective material.",
  "Mercari selling fees, payment processing, and fixed fees.",
  "Promotion amount, price drop, smart pricing limit, or offer discount.",
  "Refund, cancellation, damaged item, and replacement risk.",
  "Minimum acceptable profit before lowering the listing.",
];

const improvementCards = [
  {
    title: "Improve first",
    text: "Update photos, title, description, and condition details before cutting price deeply.",
  },
  {
    title: "Use small tests",
    text: "Try smaller price drops before making aggressive discounts permanent.",
  },
  {
    title: "Protect floor price",
    text: "Set a hard minimum price that still leaves enough profit after fees and shipping.",
  },
  {
    title: "Track winners",
    text: "Promote more of the item types that actually convert profitably, not just listings with views.",
  },
];

export default function MercariPromotionStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Promotion Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to use Mercari promotions, price drops, smart pricing,
          buyer offers, listing refreshes, bundle incentives, and profit floors
          without discounting away your margin.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Mercari sellers use promotions?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari promotions should be used to improve profitable sell-through,
            not just to create views or move inventory at any price. A promotion
            can help a listing sell faster, but the final price still needs to
            cover item cost, shipping, packaging, Mercari fees, payment
            processing, refund risk, and the seller’s minimum profit goal.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The best promotion strategy starts with the item’s break-even price.
            Once that floor is known, sellers can decide whether a price drop,
            offer, bundle incentive, or listing refresh makes the most sense.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari promotion types
            </h2>

            <div className="mt-5 space-y-4">
              {promotionTypes.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari promotion mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan a Mercari promotion</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {promotionPlanning.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari promotion calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why sellers should check profit before lowering
              a Mercari listing.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the promoted price still leaves an estimated
              profit. If seller-paid shipping, refunds, or buyer offers reduce
              the price further, the listing may no longer be worth promoting.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              When Mercari promotions can make sense
            </h2>

            <div className="mt-5 space-y-4">
              {promotionUseCases.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari promotion checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari promotion results
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
            <Related href="/mercari/promotion-roi-calculator" label="Promotion ROI Calculator" />
            <Related href="/mercari/offer-profit-calculator" label="Offer Profit Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/mercari/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Example Mercari promotion strategy item.
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