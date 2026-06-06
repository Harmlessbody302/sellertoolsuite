export default function HowToPriceFacebookMarketplaceItemsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          How to Price Facebook Marketplace Items
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to price local and shipped Facebook Marketplace items around
          item cost, delivery cost, shipping cost, packaging, buyer negotiation,
          sold comps, pickup friction, and target profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What should Facebook Marketplace sellers include in item pricing?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace pricing should start with the full cost of
              selling the item, not just the purchase price. A profitable price
              needs to cover item cost, sourcing cost, cleaning or repair cost,
              packaging, local delivery, shipping if offered, platform fees when
              applicable, negotiation discounts, refund risk, and the seller’s
              target profit.
            </p>

            <p>
              The goal is not always to set the highest possible price. The goal
              is to set a price that can realistically sell in the local market
              while still leaving enough profit after buyer offers, pickup
              delays, delivery requests, shipping costs, and other selling
              friction.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace pricing inputs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Item cost"
                text="Start with the amount paid for the item, plus sourcing cost, cleaning cost, repair cost, prep supplies, and any inbound cost."
              />
              <InfoBlock
                title="Packaging and supplies"
                text="Include boxes, mailers, bubble wrap, labels, tape, protective material, and any supplies used to prepare the item."
              />
              <InfoBlock
                title="Delivery or shipping"
                text="If you offer delivery or shipping, include fuel, mileage, time, package weight, shipping labels, and seller-paid shipping cost."
              />
              <InfoBlock
                title="Negotiation room"
                text="Many Facebook Marketplace buyers expect to negotiate. A good list price leaves room for reasonable offers without dropping below minimum profit."
              />
              <InfoBlock
                title="Local demand"
                text="The same item can sell differently depending on location, season, condition, pickup convenience, and buyer interest."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace pricing mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Pricing from active listings instead of realistic sold comps and local demand.",
                "Accepting buyer offers without recalculating profit after delivery or shipping.",
                "Forgetting packaging supplies, fuel, time, repair cost, and pickup friction.",
                "Matching the lowest competitor when condition, distance, or convenience is different.",
                "Using the same margin target for every category even when sell-through differs.",
                "Dropping prices repeatedly without checking whether the item is still profitable.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Simple Facebook Marketplace pricing formula
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Add costs"
              text="Combine item cost, packaging, delivery, shipping, platform fees, prep cost, and refund allowance."
            />
            <InfoCard
              title="Choose profit"
              text="Pick the minimum profit you want to keep after selling the item."
            />
            <InfoCard
              title="Add offer room"
              text="Raise the list price enough to handle realistic buyer offers or delivery requests."
            />
            <InfoCard
              title="Check local comps"
              text="Compare the final price against realistic local sold prices and demand."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace item price calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why pricing should be based on total selling
              cost, not purchase price alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Target sale price"
                note="Example Facebook Marketplace pricing calculation item."
                value="$80.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace pricing calculation item."
                value="-$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace pricing calculation item."
                value="-$1.00"
              />
              <Breakdown
                label="Delivery cost"
                note="Example Facebook Marketplace pricing calculation item."
                value="-$5.00"
              />
              <Breakdown
                label="Platform fee estimate"
                note="Example Facebook Marketplace pricing calculation item."
                value="-$0.00"
              />
              <Breakdown
                label="Negotiation allowance"
                note="Example Facebook Marketplace pricing calculation item."
                value="-$8.00"
              />
              <Breakdown
                label="Refund allowance"
                note="Example Facebook Marketplace pricing calculation item."
                value="-$1.50"
              />
              <Breakdown
                label="Estimated profit"
                note="Example Facebook Marketplace pricing calculation item."
                value="$29.50"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, an $80 Facebook Marketplace sale leaves an
              estimated $29.50 after item cost, delivery, packaging, negotiation
              room, and refund allowance. If the buyer offer is much lower or
              delivery takes longer than expected, the margin may shrink quickly.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Pricing methods for Facebook Marketplace sellers
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Cost-plus pricing"
                text="Add item cost, delivery cost, packaging, fees, refund allowance, and target profit to estimate a minimum viable price."
              />
              <InfoBlock
                title="Sold-comp pricing"
                text="Compare similar sold or recently moving local listings, not only active listings that may be overpriced or stale."
              />
              <InfoBlock
                title="Offer-room pricing"
                text="Set the list price high enough that reasonable buyer negotiation still leaves acceptable profit."
              />
              <InfoBlock
                title="Fast-turn pricing"
                text="Use lower but still profitable prices when the goal is faster sell-through, stale inventory reduction, or quick cash flow."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace item pricing checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep supplies." />
            <ChecklistItem text="Packaging supplies, labels, boxes, tape, mailers, and protective material." />
            <ChecklistItem text="Expected buyer offer room before accepting discounts." />
            <ChecklistItem text="Realistic local sold comps, not only active listing prices." />
            <ChecklistItem text="Delivery cost, fuel, mileage, driving time, and pickup friction." />
            <ChecklistItem text="Shipping cost, package weight, package dimensions, and seller-paid shipping if applicable." />
            <ChecklistItem text="Refund allowance, damaged item risk, cancellation risk, and buyer issue risk." />
            <ChecklistItem text="Target profit and break-even price before listing." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace pricing
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Use sold comps"
              text="Price from completed or realistic local sales instead of active listings alone."
            />
            <InfoCard
              title="Build in offer room"
              text="Leave enough margin to accept reasonable buyer offers without losing profit."
            />
            <InfoCard
              title="Protect delivery"
              text="Account for delivery cost before lowering price or accepting delivery requests."
            />
            <InfoCard
              title="Review stale items"
              text="Lower or relist weak items only after checking profit and local demand."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
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