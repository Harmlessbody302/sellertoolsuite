export default function PoshmarkOfferStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Offer Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to handle Poshmark buyer offers, offers to likers, seller
          discounts, counteroffers, minimum acceptable price, shipping discounts,
          break-even price, and profit floors before accepting lower prices.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Poshmark sellers handle buyer offers?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark offers can help turn likes and interest into sales, but an
              offer should not be accepted just because it creates activity. The
              accepted price still needs to cover item cost, Poshmark fees,
              packaging, seller-paid shipping discounts, refund risk, and the
              seller’s minimum profit.
            </p>

            <p>
              A strong offer strategy starts before the buyer sends an offer.
              Sellers should know their break-even price, target profit, offer
              room, and counteroffer range so they can respond without guessing.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Poshmark offer decisions?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="List price"
                text="The list price should leave room for buyer offers without making the final accepted price fall below your profit target."
              />
              <InfoCard
                title="Minimum acceptable price"
                text="Your minimum acceptable price should cover item cost, Poshmark fees, packaging, shipping discounts, refund risk, and required profit."
              />
              <InfoCard
                title="Buyer offer behavior"
                text="Many Poshmark buyers expect negotiation. A good offer strategy gives room to accept realistic offers while rejecting weak ones."
              />
              <InfoCard
                title="Seller-paid shipping"
                text="Offers become riskier when you also add a shipping discount because both the lower price and the discount reduce profit."
              />
              <InfoCard
                title="Item demand"
                text="Strong-demand items may not need deep offer acceptance, while stale items may justify a lower but still profitable price."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Poshmark offer mistakes</h2>

            <div className="mt-5 space-y-4">
              {[
                "Accepting buyer offers before checking item cost, packaging, shipping discounts, and fees.",
                "Using the list price as the profit reference instead of break-even price.",
                "Leaving no offer room on items where buyers are likely to negotiate.",
                "Countering randomly instead of using a minimum acceptable profit.",
                "Accepting low offers with seller-paid shipping without recalculating profit.",
                "Dropping prices on strong items too quickly before testing demand.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan a Poshmark offer strategy
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find break-even"
              text="Calculate the lowest price that covers item cost, shipping, packaging, fees, and refund allowance."
            />
            <StepCard
              title="Set profit floor"
              text="Choose the minimum profit needed to make the sale worth accepting."
            />
            <StepCard
              title="Build offer room"
              text="List high enough that reasonable offers still leave acceptable profit."
            />
            <StepCard
              title="Counter with numbers"
              text="Use your break-even and target profit to decide whether to accept, counter, or reject."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Poshmark offer calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a counteroffer may protect more profit than
              accepting the first buyer offer.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="List price" value="$45.00" />
              <Breakdown label="Buyer offer" value="$36.00" />
              <Breakdown label="Counteroffer" value="$40.00" />
              <Breakdown label="Minimum acceptable price" value="$35.31" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Estimated profit at buyer offer" value="$12.53" />
              <Breakdown label="Estimated profit at counteroffer" value="$15.73" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the buyer offer is still profitable, but the
              counteroffer protects more margin. If the item has strong demand,
              countering may be better than accepting immediately.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What to do with Poshmark offers
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Accept"
                text="Accept when the offer clears your minimum profit and helps move inventory at a worthwhile return."
              />
              <InfoCard
                title="Counter"
                text="Counter when the buyer offer is close but still below your target profit or offer floor."
              />
              <InfoCard
                title="Reject"
                text="Reject when the offer falls below break-even, ignores seller-paid shipping, or creates too little profit."
              />
              <InfoCard
                title="Wait"
                text="Wait when the item is newly listed, has strong demand, or already has enough buyer interest."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark offer checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Original list price and buyer offer amount.",
              "Counteroffer price and minimum acceptable price.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Packaging supplies, labels, mailers, tape, and thank-you cards.",
              "Poshmark commission, flat fee, or percentage fee estimate.",
              "Seller-paid shipping discount or offer-to-liker incentive.",
              "Refund, cancellation, damaged item, and replacement risk.",
              "Target profit before accepting or countering an offer.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark offer strategy
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Know your floor"
              text="Calculate the lowest acceptable price before offers arrive."
            />
            <StepCard
              title="Build offer room"
              text="List with enough margin to accept reasonable buyer offers."
            />
            <StepCard
              title="Protect shipping"
              text="Be stricter when the listing includes seller-paid shipping discounts."
            />
            <StepCard
              title="Use sold comps"
              text="Counter based on realistic sold prices, not only active listing prices."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
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
          Example Poshmark offer strategy item.
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