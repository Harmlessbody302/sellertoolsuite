export default function HowFacebookMarketplaceFeesWorkPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          How Facebook Marketplace Fees Work
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand the main Facebook Marketplace selling costs that affect
          profit, including platform fees, local delivery cost, shipping cost,
          packaging, negotiation discounts, refunds, no-shows, pickup friction,
          and other local selling expenses.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What fees do Facebook Marketplace sellers pay?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace seller profit depends on more than the listed
              sale price. Sellers should account for item cost, packaging,
              delivery cost, shipping cost, platform fees when applicable, buyer
              negotiation, refund risk, pickup delays, and the time required to
              message buyers and complete the sale.
            </p>

            <p>
              A Facebook Marketplace listing can look profitable at first, but
              weak buyer offers, local delivery, no-shows, repair cost,
              packaging supplies, or refund problems can reduce the real margin.
              The safest approach is to estimate every cost before listing,
              discounting, delivering, or accepting an offer.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Facebook Marketplace fee categories
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Platform fees"
                text="Some Facebook Marketplace sales may involve selling or processing fees depending on the checkout method, payment setup, shipping setup, and current platform rules."
              />
              <InfoBlock
                title="Local delivery cost"
                text="If the seller offers delivery, mileage, fuel, driving time, parking, meeting delays, and failed pickup attempts should be treated as real selling costs."
              />
              <InfoBlock
                title="Shipping cost"
                text="When an item is shipped, the seller should account for labels, boxes, mailers, padding, tape, package weight, package dimensions, and any seller-paid shipping."
              />
              <InfoBlock
                title="Negotiation discounts"
                text="Buyer offers and counteroffers reduce the effective sale price. Sellers should compare the final accepted price against item cost and all selling costs."
              />
              <InfoBlock
                title="Other selling costs"
                text="Cleaning supplies, repair parts, packaging, storage, relisting time, no-shows, refunds, and customer support can all affect final profit."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Costs many Facebook Marketplace sellers forget
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Treating the sale price as profit before subtracting item cost and delivery cost.",
                "Forgetting that local delivery uses fuel, time, and sometimes extra coordination.",
                "Accepting buyer offers without recalculating profit after the lower sale price.",
                "Ignoring no-shows, delayed pickup, payment friction, and buyer message time.",
                "Using shipped-item pricing without including boxes, labels, packaging, and shipping cost.",
                "Not planning for refunds, damaged items, cancellations, stale listings, or repair cost.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Facebook Marketplace profit correctly
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
              title="Review net profit"
              text="Check whether the final profit is worth the work, pickup risk, delivery time, and buyer friction."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace fee calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why sellers should estimate costs before
              pricing, delivering, or accepting buyer offers.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Expected sale price"
                note="Example Facebook Marketplace fee calculation item."
                value="$80.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace fee calculation item."
                value="-$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace fee calculation item."
                value="-$1.00"
              />
              <Breakdown
                label="Delivery cost"
                note="Example Facebook Marketplace fee calculation item."
                value="-$5.00"
              />
              <Breakdown
                label="Platform fee estimate"
                note="Example Facebook Marketplace fee calculation item."
                value="-$0.00"
              />
              <Breakdown
                label="Negotiation discount"
                note="Example Facebook Marketplace fee calculation item."
                value="-$8.00"
              />
              <Breakdown
                label="Refund allowance"
                note="Example Facebook Marketplace fee calculation item."
                value="-$1.50"
              />
              <Breakdown
                label="Estimated profit"
                note="Example Facebook Marketplace fee calculation item."
                value="$29.50"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the listing still produces profit, but a lower
              buyer offer, longer delivery drive, or extra repair cost could
              quickly reduce the remaining margin.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Local pickup vs. shipped order costs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Local pickup"
                text="Local pickup can avoid shipping labels and mailers, but it may involve buyer messages, no-shows, scheduling delays, and meetup friction."
              />
              <InfoBlock
                title="Local delivery"
                text="Delivery can increase buyer interest, but it should be priced high enough to cover fuel, mileage, time, and failed delivery risk."
              />
              <InfoBlock
                title="Shipped orders"
                text="Shipped orders can reach more buyers, but sellers need to include packaging, shipping labels, package weight, dimensions, and damage risk."
              />
              <InfoBlock
                title="Negotiated sales"
                text="Facebook Marketplace buyers often negotiate. A profitable list price can become weak if the accepted offer is too close to break-even."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace fee checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Expected sale price after buyer offers or negotiation." />
            <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep supplies." />
            <ChecklistItem text="Packaging supplies, labels, boxes, tape, mailers, and protective material." />
            <ChecklistItem text="Delivery mileage, fuel, driving time, parking, and failed pickup risk." />
            <ChecklistItem text="Shipping label cost, package dimensions, and seller-paid shipping if applicable." />
            <ChecklistItem text="Platform fees, checkout fees, or payment processing costs when applicable." />
            <ChecklistItem text="Refund allowance, damaged item risk, cancellation risk, and support time." />
            <ChecklistItem text="Break-even price before listing, delivering, discounting, or accepting offers." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Facebook Marketplace fee pressure
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Price with offer room"
              text="Set prices with enough margin to handle reasonable local buyer offers."
            />
            <InfoCard
              title="Limit delivery drag"
              text="Charge for delivery or keep delivery distance short enough to protect profit."
            />
            <InfoCard
              title="Use pickup when needed"
              text="Prefer pickup for low-margin items where delivery or shipping would erase profit."
            />
            <InfoCard
              title="Check every offer"
              text="Recalculate final profit before accepting lower offers or delivery requests."
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
            <Related href="/facebook-marketplace/local-delivery-calculator" label="Local Delivery Calculator" />
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