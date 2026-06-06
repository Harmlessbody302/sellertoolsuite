export default function PoshmarkShippingDiscountGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Shipping Discount Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand seller-paid shipping discounts, offers to likers, Closet
          Clear Out incentives, bundle offers, buyer expectations, Poshmark fees,
          packaging costs, and how shipping discounts affect profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why shipping discounts matter for Poshmark sellers
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Shipping discounts can help a Poshmark listing feel more attractive,
              especially when buyers are comparing several similar items. But a
              seller-paid shipping discount is still a real cost. It should be
              included before accepting offers, lowering prices, or sending
              promotions.
            </p>

            <p>
              A listing may look profitable before a discount, but the margin can
              shrink quickly after Poshmark fees, item cost, packaging, offer
              discounts, refund allowance, and seller-paid shipping incentives are
              included.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Poshmark shipping discount costs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Seller-paid shipping discount"
                text="When a seller offers a shipping discount, the discount should be treated like a direct reduction to profit."
              />
              <InfoCard
                title="Offer-to-liker discount"
                text="Offers to likers may combine a lower item price with a shipping discount, so both should be checked before sending the offer."
              />
              <InfoCard
                title="Closet Clear Out timing"
                text="Closet Clear Out can make a price drop more attractive, but the lower sale price still needs to leave enough profit."
              />
              <InfoCard
                title="Packaging supplies"
                text="Boxes, mailers, labels, tape, tissue paper, thank-you cards, and protective materials can reduce the profit left after a shipping discount."
              />
              <InfoCard
                title="Bundle pressure"
                text="Bundles may increase order value, but they can also increase package size, handling time, and buyer expectations."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark shipping discount mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Sending offers to likers without checking the shipping discount cost.",
                "Accepting buyer offers after already adding a seller-paid shipping incentive.",
                "Treating shipping discounts as harmless because Poshmark collects shipping separately.",
                "Using shipping discounts on low-margin items that cannot absorb them.",
                "Forgetting packaging, labels, tape, mailers, and closet supplies.",
                "Running discounts repeatedly without checking whether profit is actually improving.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Poshmark shipping discount impact
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with sale price"
              text="Use the actual expected sale price after buyer offers, bundle discounts, or price drops."
            />
            <StepCard
              title="Subtract fees"
              text="Include Poshmark fees, item cost, packaging cost, and refund allowance."
            />
            <StepCard
              title="Subtract discount"
              text="Treat the seller-paid shipping discount as a direct cost against the sale."
            />
            <StepCard
              title="Review profit"
              text="Check whether the shipping discount improves conversion without destroying margin."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Poshmark shipping discount calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a seller-paid shipping discount changes
              final listing profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value="$45.00" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Estimated Poshmark fee" value="-$9.00" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Refund allowance" value="-$1.00" />
              <Breakdown label="Estimated profit after discount" value="$17.73" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the listing remains profitable after the shipping
              discount. If the buyer also sends a lower offer, the seller should
              recalculate before accepting.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Shipping discount options to compare
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="No shipping discount"
                text="The seller keeps more profit per sale, but the offer may feel less attractive to some buyers."
              />
              <InfoCard
                title="Small shipping discount"
                text="A small discount can improve the offer while limiting the damage to margin."
              />
              <InfoCard
                title="Larger shipping discount"
                text="A larger discount may help move stale inventory, but it should only be used when the remaining profit is still acceptable."
              />
              <InfoCard
                title="Price drop instead"
                text="Sometimes lowering the item price is clearer than offering a shipping discount, but both should be compared by final profit."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Poshmark shipping discount checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Expected sale price after buyer offer or price drop.",
              "Seller-paid shipping discount amount.",
              "Poshmark flat fee or percentage commission.",
              "Item cost, sourcing cost, cleaning cost, and prep supplies.",
              "Packaging supplies, mailers, labels, boxes, tape, and thank-you cards.",
              "Refund allowance, damaged item risk, and replacement risk.",
              "Minimum acceptable profit before sending the offer.",
              "Whether a price drop, bundle, or relist would work better than a shipping discount.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark shipping discount profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise list price"
              text="Build offer and shipping discount room into the original listing price."
            />
            <StepCard
              title="Use on strong items"
              text="Reserve shipping discounts for items with enough margin or strong demand."
            />
            <StepCard
              title="Limit weak offers"
              text="Avoid stacking deep buyer discounts with seller-paid shipping incentives."
            />
            <StepCard
              title="Track results"
              text="Compare profit before and after shipping incentives, not just likes or shares."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/shipping-discount-calculator" label="Shipping Discount Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
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
          Example Poshmark shipping discount item.
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