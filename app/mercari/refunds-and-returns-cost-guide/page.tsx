const refundCosts = [
  {
    title: "Refunded revenue",
    text: "The most obvious cost is the sale revenue returned to the buyer, but refunded revenue is only one part of the total loss.",
  },
  {
    title: "Original shipping and packaging",
    text: "If the seller paid shipping or used packaging supplies, those costs may not be recovered after a refund or cancellation.",
  },
  {
    title: "Damaged or unsellable items",
    text: "Some returned or disputed items may lose value if they are damaged, incomplete, opened, or no longer sellable at full price.",
  },
  {
    title: "Cancellation and support time",
    text: "Messages, disputes, inspection, relisting, repacking, and customer service time all create hidden cost.",
  },
  {
    title: "Repricing and resale risk",
    text: "Even if the item can be relisted, it may need a lower price, better photos, new packaging, or additional handling before it sells again.",
  },
];

const mistakes = [
  "Counting only the refunded sale price and ignoring shipping, packaging, and fees.",
  "Assuming every returned or disputed item can be resold at full value.",
  "Ignoring fragile packaging problems that create damage claims.",
  "Selling high-risk categories without building in refund allowance.",
  "Not describing flaws, measurements, or condition clearly enough.",
  "Scaling similar items before checking refund, cancellation, or dispute risk.",
];

const exampleRows = [
  ["Refunded sale price", "$35.00"],
  ["Original shipping cost", "$6.50"],
  ["Packaging cost", "$1.00"],
  ["Support and handling cost", "$1.50"],
  ["Lost item value", "$3.50"],
  ["Recovered item value", "-$5.00"],
  ["Estimated refund impact", "$42.50"],
];

const refundTypes = [
  {
    title: "Refund",
    text: "A refund returns money to the buyer. The seller may still lose shipping, packaging, time, and partial product value.",
  },
  {
    title: "Cancellation",
    text: "A cancellation may avoid shipping cost if caught early, but it can still waste listing time and delay cash flow.",
  },
  {
    title: "Damaged item issue",
    text: "A damaged item can create refund loss, dispute risk, buyer dissatisfaction, and inventory value loss.",
  },
  {
    title: "Replacement or partial recovery",
    text: "Some items may still be resold, repaired, bundled, or partially recovered, but the recovered value should be estimated conservatively.",
  },
];

const checklist = [
  "Refunded revenue and original sale price.",
  "Original shipping label cost if paid by the seller.",
  "Packaging supplies, labels, boxes, tape, and protective materials.",
  "Item cost, sourcing cost, cleaning cost, and prep cost.",
  "Recovered value if the item can be resold.",
  "Damaged, missing, incomplete, or unsellable product loss.",
  "Customer support, inspection, relisting, and handling time.",
  "Product page issues causing repeated refunds or disputes.",
];

const improvementCards = [
  {
    title: "Describe clearly",
    text: "Mention flaws, measurements, sizing, condition, missing parts, and included items.",
  },
  {
    title: "Use strong photos",
    text: "Show all angles, tags, defects, scale, wear, and important details.",
  },
  {
    title: "Pack safely",
    text: "Protect fragile or high-risk items to reduce damage and dispute risk.",
  },
  {
    title: "Avoid risky items",
    text: "Skip categories or conditions that create too many issues for the expected profit.",
  },
];

export default function MercariRefundsAndReturnsCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Refunds and Returns Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand how Mercari refunds, cancellations, disputes, damaged items,
          recovered value, shipping loss, packaging cost, and support time affect
          seller profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why refunds and returns matter for Mercari profit
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Refunds, cancellations, and damaged item issues can quietly erase
            profit from otherwise healthy Mercari sales. A refunded order may
            still leave the seller with shipping cost, packaging cost, lost time,
            reduced inventory value, or a product that must be relisted at a lower
            price.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari sellers should treat refund risk as a real cost of doing
            business. The goal is not to assume every sale will go wrong, but to
            price, describe, package, and source products in a way that protects
            margin when occasional issues happen.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Mercari refund and issue costs
            </h2>

            <div className="mt-5 space-y-4">
              {refundCosts.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari refund mistakes
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
            How to estimate Mercari refund cost
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find refund rate"
              text="Estimate the percentage of orders that may be refunded, cancelled, disputed, or damaged."
            />
            <StepCard
              title="Add lost costs"
              text="Include shipping, packaging, support time, damaged value, and relisting cost."
            />
            <StepCard
              title="Estimate recovery"
              text="Subtract resale value if the item can still be resold, repaired, or bundled."
            />
            <StepCard
              title="Review margin"
              text="Check whether the product still makes profit after expected issue losses."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Mercari refund cost</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a refund may cost more than the returned
              revenue alone.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, some value is recovered, but the refund still
              creates a meaningful loss after shipping, packaging, handling, and
              lost item value are included.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Refunds, cancellations, and damaged items
            </h2>

            <div className="mt-5 space-y-4">
              {refundTypes.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Mercari refund and return checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Mercari refund losses</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {improvementCards.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/refund-impact-calculator" label="Refund Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/product-cost-calculator" label="Product Cost Calculator" />
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
          Example Mercari refund and return cost item.
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