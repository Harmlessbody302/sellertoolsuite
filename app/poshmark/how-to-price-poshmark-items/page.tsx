export default function HowToPricePoshmarkItemsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          How to Price Poshmark Items
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to price Poshmark listings around item cost, Poshmark fees,
          packaging, shipping discounts, buyer offers, sold comps, closet
          activity, and target profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What should Poshmark sellers include in item pricing?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark pricing should start with the full cost of selling the
              item, not just the amount paid for it. A profitable price needs to
              cover item cost, sourcing cost, packaging, Poshmark fees, shipping
              discounts, buyer offers, refund risk, and the amount of profit the
              seller wants left after the sale.
            </p>

            <p>
              The goal is not always to set the highest possible price. The goal
              is to set a price that can realistically sell while still leaving
              enough margin after offers, shipping discounts, fees, and closet
              activity.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark pricing inputs</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Item cost"
                text="Start with the amount paid for the item, plus sourcing cost, cleaning cost, prep supplies, and any inbound cost."
              />
              <InfoCard
                title="Packaging and supplies"
                text="Include mailers, boxes, labels, tape, thank-you cards, tissue paper, protective material, and any supplies used to prepare the order."
              />
              <InfoCard
                title="Poshmark fees"
                text="Account for the platform fee, whether the sale uses a flat fee or a percentage commission."
              />
              <InfoCard
                title="Offer room"
                text="Many Poshmark buyers send offers. A good listing price leaves enough room to accept reasonable offers without dropping below the minimum profit."
              />
              <InfoCard
                title="Shipping discount risk"
                text="Offers to likers and promotions may include seller-paid shipping discounts, which should be included before accepting a lower price."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Poshmark pricing mistakes</h2>

            <div className="mt-5 space-y-4">
              {[
                "Pricing from active listings instead of realistic sold comps.",
                "Accepting buyer offers without recalculating profit after fees.",
                "Forgetting seller-paid shipping discounts and packaging costs.",
                "Matching the lowest competitor when your item cost or condition is different.",
                "Using the same margin target for every category even when sell-through differs.",
                "Dropping prices repeatedly without checking whether the item is still profitable.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Simple Poshmark pricing formula</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add costs"
              text="Combine item cost, packaging, Poshmark fees, shipping discounts, promotion cost, and refund allowance."
            />
            <StepCard
              title="Choose profit"
              text="Pick the minimum profit you want to keep after selling the item."
            />
            <StepCard
              title="Add offer room"
              text="Raise the list price enough to handle realistic buyer offers or Closet Clear Out drops."
            />
            <StepCard
              title="Check sold comps"
              text="Compare the final price against realistic Poshmark sold prices."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark item price calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why Poshmark pricing should be based on total
              selling cost, not purchase price alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target sale price" value="$45.00" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Estimated Poshmark fee" value="-$9.00" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Refund allowance" value="-$1.00" />
              <Breakdown label="Estimated profit" value="$17.73" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, a $45 Poshmark sale leaves an estimated $17.73
              after item cost, packaging, fees, shipping discount, and refund
              allowance. If a buyer offer lowers the sale price too far, the
              listing may no longer meet the seller’s profit goal.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Pricing methods for Poshmark sellers</h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Cost-plus pricing"
                text="Add item cost, supplies, fees, shipping discount, and target profit to estimate a minimum viable price."
              />
              <InfoCard
                title="Sold-comp pricing"
                text="Compare similar sold Poshmark listings, not only active listings, to estimate what buyers actually paid."
              />
              <InfoCard
                title="Offer-room pricing"
                text="Set the list price high enough that reasonable buyer offers still leave acceptable profit."
              />
              <InfoCard
                title="Fast-turn pricing"
                text="Use lower but still profitable prices when the goal is faster sell-through or clearing inventory."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark item pricing checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Item cost, sourcing cost, cleaning cost, and prep supplies.",
              "Packaging supplies, labels, tape, mailers, and thank-you cards.",
              "Expected buyer offer room before accepting discounts.",
              "Realistic sold comps, not only active listing prices.",
              "Poshmark flat fee or commission estimate.",
              "Seller-paid shipping discount or Closet Clear Out impact.",
              "Refund, cancellation, damaged item, and replacement risk.",
              "Target profit and break-even price before listing.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Poshmark pricing</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Use sold comps"
              text="Price from completed sales and item condition instead of active listings alone."
            />
            <StepCard
              title="Build in offer room"
              text="Leave enough margin to accept reasonable buyer offers without losing profit."
            />
            <StepCard
              title="Protect shipping"
              text="Account for seller-paid shipping discounts before lowering price or accepting offers."
            />
            <StepCard
              title="Review stale items"
              text="Lower or relist weak items only after checking profit and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
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
          Example Poshmark pricing calculation item.
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