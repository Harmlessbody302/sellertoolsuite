const shippingCosts = [
  {
    title: "Shipping label cost",
    text: "The shipping label cost depends on package weight, dimensions, carrier, service level, shipping distance, and whether the buyer or seller pays shipping.",
  },
  {
    title: "Packaging materials",
    text: "Boxes, mailers, bubble wrap, tape, labels, inserts, and protective material all reduce profit if they are not included in the price.",
  },
  {
    title: "Seller-paid shipping",
    text: "Free shipping can help conversion, but the seller still pays the label cost. The item price must be high enough to protect profit.",
  },
  {
    title: "Dimensional weight",
    text: "Large but lightweight items can cost more to ship if package dimensions push the order into a higher rate.",
  },
  {
    title: "Returns and damage",
    text: "Poor packaging can create damaged-item disputes, refunds, and replacement losses that make a profitable sale turn negative.",
  },
];

const mistakes = [
  "Offering free shipping without raising the item price.",
  "Guessing package weight before the item is packed.",
  "Using one shipping estimate for items with different weights and dimensions.",
  "Forgetting boxes, mailers, tape, labels, and protective material.",
  "Accepting buyer offers on seller-paid shipping listings without recalculating profit.",
  "Ignoring fragile items that need heavier packaging or extra protection.",
];

const exampleRows = [
  ["Product sale price", "$35.00"],
  ["Item cost", "-$10.00"],
  ["Shipping label cost", "-$6.50"],
  ["Packaging materials", "-$1.00"],
  ["Mercari fee estimate", "-$3.50"],
  ["Payment processing estimate", "-$1.52"],
  ["Estimated profit after shipping", "$12.48"],
];

const shippingMethods = [
  {
    title: "Buyer-paid shipping",
    text: "Buyer-paid shipping keeps the label cost separate from item profit, but buyers may compare the total checkout price.",
  },
  {
    title: "Seller-paid shipping",
    text: "Seller-paid shipping may improve listing appeal, but the item price must cover the label and packaging cost.",
  },
  {
    title: "Built-in shipping",
    text: "Built-in shipping raises the item price enough to cover the expected label cost while showing a simpler buyer price.",
  },
  {
    title: "Local or lightweight focus",
    text: "Some sellers avoid heavy, oversized, or fragile items because shipping pressure can overwhelm the profit margin.",
  },
];

const checklist = [
  "Actual packed weight, not bare item weight.",
  "Package dimensions after boxing or mailing.",
  "Shipping label cost by carrier, service, and destination if relevant.",
  "Boxes, mailers, tape, labels, inserts, and protective material.",
  "Whether buyer or seller pays shipping.",
  "Expected buyer offer room on seller-paid shipping listings.",
  "Damage risk, fragile packaging, and replacement loss.",
  "Free shipping impact on profit and conversion.",
];

const improvementCards = [
  {
    title: "Weigh packed items",
    text: "Estimate shipping from packed weight and dimensions, not bare item weight.",
  },
  {
    title: "Right-size packaging",
    text: "Use packaging that protects the item without adding unnecessary size or weight.",
  },
  {
    title: "Build in shipping",
    text: "If offering free shipping, raise price enough to cover the label.",
  },
  {
    title: "Check offers",
    text: "Recalculate profit before accepting offers on seller-paid shipping listings.",
  },
];

export default function MercariShippingCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Shipping Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Mercari shipping costs, buyer-paid shipping, seller-paid
          shipping, free shipping, packaging supplies, dimensional weight,
          fragile items, and shipping profit impact.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why shipping costs matter for Mercari sellers
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shipping can be one of the biggest profit leaks in a Mercari sale.
            A product may look profitable before shipping, but the margin can
            shrink quickly once label cost, packaging materials, seller-paid
            shipping, buyer offers, and damage risk are included.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari sellers should estimate shipping before listing the item,
            especially for heavier, fragile, oversized, or low-priced products.
            The right shipping setup can protect profit while still keeping the
            buyer’s total price reasonable.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Mercari shipping costs</h2>

            <div className="mt-5 space-y-4">
              {shippingCosts.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari shipping mistakes
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
            How to estimate Mercari shipping profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Measure package"
              text="Use the packed weight and dimensions, not only the product weight."
            />
            <StepCard
              title="Add packaging"
              text="Include boxes, mailers, labels, tape, inserts, and protective materials."
            />
            <StepCard
              title="Compare setup"
              text="Review buyer-paid shipping, seller-paid shipping, and built-in shipping."
            />
            <StepCard
              title="Check profit"
              text="Compare final profit after shipping, packaging, fees, and offers."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Mercari shipping calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how shipping and packaging reduce order profit.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              If the seller pays shipping, the label cost directly reduces
              profit. If the buyer pays shipping, the seller still needs to
              consider packaging materials, damage risk, and the buyer’s total
              checkout price.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Mercari shipping options to compare
            </h2>

            <div className="mt-5 space-y-4">
              {shippingMethods.map((method) => (
                <InfoCard key={method.title} title={method.title} text={method.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Mercari shipping cost checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Mercari shipping cost
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
            <Related href="/mercari/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/mercari/free-shipping-calculator" label="Free Shipping Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
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
          Example Mercari shipping cost item.
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