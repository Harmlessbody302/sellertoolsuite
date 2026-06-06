export default function FacebookMarketplaceNegotiationStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Negotiation Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan buyer offers, counteroffers, lowest acceptable price, bundle
          negotiation, pickup timing, delivery requests, no-show risk, and profit
          floors before accepting Facebook Marketplace offers.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Facebook Marketplace sellers handle negotiation?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace buyers often expect negotiation. A lower
              offer is not automatically bad, but the accepted price still needs
              to cover item cost, packaging, delivery cost, shipping cost,
              repairs, platform fees when applicable, refund risk, and target
              profit.
            </p>

            <p>
              A strong negotiation strategy starts before the buyer sends a
              message. Sellers should know the break-even price, minimum
              acceptable price, target profit, delivery policy, pickup
              expectations, and counteroffer range before replying.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace negotiation?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="List price"
                text="The list price should leave enough room for normal buyer negotiation without making the final accepted price fall below your profit floor."
              />
              <InfoBlock
                title="Minimum acceptable price"
                text="Your minimum acceptable price should cover item cost, delivery, shipping, packaging, repair cost, refund allowance, and required profit."
              />
              <InfoBlock
                title="Buyer urgency"
                text="Some buyers are ready to purchase quickly. Others send low offers, delay pickup, ask extra questions, or never follow through."
              />
              <InfoBlock
                title="Pickup reliability"
                text="A slightly lower offer from a reliable buyer may be better than a higher offer from someone who delays, reschedules, or creates no-show risk."
              />
              <InfoBlock
                title="Delivery requests"
                text="If the buyer wants delivery, the offer should be judged after fuel, mileage, time, loading effort, and delivery fee are included."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace negotiation mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Accepting buyer offers before checking item cost, delivery cost, shipping cost, and profit.",
                "Using the list price as the profit reference instead of the break-even price.",
                "Leaving no negotiation room on items where buyers are likely to send offers.",
                "Countering randomly instead of using a minimum acceptable profit.",
                "Accepting low offers just to move inventory while losing margin.",
                "Ignoring no-shows, pickup delays, delivery requests, and buyer reliability.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan a Facebook Marketplace negotiation strategy
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Find break-even"
              text="Calculate the lowest price that covers item cost, delivery, shipping, packaging, repair cost, and refund risk."
            />
            <InfoCard
              title="Set profit floor"
              text="Choose the minimum profit needed to make the sale worth accepting."
            />
            <InfoCard
              title="Build offer room"
              text="List high enough that reasonable buyer offers still leave acceptable profit."
            />
            <InfoCard
              title="Counter with numbers"
              text="Use your break-even and target profit to decide whether to accept, counter, or reject."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace negotiation calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a counteroffer may protect more profit than
              accepting the first buyer offer.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="List price"
                note="Example Facebook Marketplace negotiation item."
                value="$80.00"
              />
              <Breakdown
                label="Buyer offer"
                note="Example Facebook Marketplace negotiation item."
                value="$65.00"
              />
              <Breakdown
                label="Counteroffer"
                note="Example Facebook Marketplace negotiation item."
                value="$72.00"
              />
              <Breakdown
                label="Minimum acceptable price"
                note="Example Facebook Marketplace negotiation item."
                value="$59.50"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace negotiation item."
                value="-$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace negotiation item."
                value="-$1.00"
              />
              <Breakdown
                label="Delivery allowance"
                note="Example Facebook Marketplace negotiation item."
                value="-$5.00"
              />
              <Breakdown
                label="Estimated profit at buyer offer"
                note="Example Facebook Marketplace negotiation item."
                value="$23.50"
              />
              <Breakdown
                label="Estimated profit at counteroffer"
                note="Example Facebook Marketplace negotiation item."
                value="$30.50"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the buyer offer is still profitable, but the
              counteroffer keeps more margin. If the buyer also asks for
              delivery or creates pickup delays, the seller should recalculate
              before accepting.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What to do with Facebook Marketplace offers
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Accept"
                text="Accept when the offer clears your minimum profit and the buyer seems reliable enough to complete pickup, shipping, or delivery."
              />
              <InfoBlock
                title="Counter"
                text="Counter when the buyer offer is close but still below your target profit or does not cover delivery and pickup friction."
              />
              <InfoBlock
                title="Reject"
                text="Reject when the offer falls below break-even, requires unpaid delivery, or creates too much risk for too little profit."
              />
              <InfoBlock
                title="Wait"
                text="Wait when the item is newly listed, has strong demand, or already has enough buyer interest."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace negotiation checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Original list price and buyer offer amount." />
            <ChecklistItem text="Counteroffer price and minimum acceptable price." />
            <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep cost." />
            <ChecklistItem text="Packaging supplies, labels, boxes, tape, and protective material." />
            <ChecklistItem text="Delivery cost, fuel, mileage, driving time, and pickup friction." />
            <ChecklistItem text="Shipping cost and seller-paid shipping if the item is shipped." />
            <ChecklistItem text="Refund, cancellation, no-show, damaged item, and replacement risk." />
            <ChecklistItem text="Target profit before accepting, countering, or rejecting an offer." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace negotiation
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Know your floor"
              text="Calculate the lowest acceptable price before buyer messages arrive."
            />
            <InfoCard
              title="Build offer room"
              text="List with enough margin to accept reasonable local buyer offers."
            />
            <InfoCard
              title="Confirm pickup"
              text="Ask clear questions about pickup time, location, and payment before holding an item."
            />
            <InfoCard
              title="Use sold comps"
              text="Counter based on realistic local prices, not only active listing prices."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
            <Related href="/facebook-marketplace/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/break-even-calculator" label="Break-Even Calculator" />
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