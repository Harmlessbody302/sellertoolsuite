export default function FacebookMarketplaceSellerCostChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Seller Cost Checklist
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Use this checklist of Facebook Marketplace seller costs to avoid
          underpricing items or accepting weak offers after item cost, delivery
          cost, shipping cost, packaging, negotiation discounts, repairs, pickup
          friction, and refund risk.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What costs should Facebook Marketplace sellers track?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace sellers should track every cost that affects
              whether a sale actually produces profit. Some costs happen on
              every order, such as item cost, packaging, delivery, shipping, or
              platform fees when applicable. Other costs happen less often, such
              as repairs, refunds, no-shows, storage pressure, and relisting
              time.
            </p>

            <p>
              The most common mistake is judging profit from the sale price
              alone. A listing can look healthy until buyer negotiation,
              delivery time, fuel, repair supplies, packaging, pickup delays,
              stale inventory, and refund risk are included.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Order-level Facebook Marketplace costs
            </h2>

            <div className="mt-5 space-y-4">
              <ChecklistItem text="Item cost, sourcing cost, cleaning cost, repair cost, and prep supplies." />
              <ChecklistItem text="Packaging supplies such as boxes, mailers, labels, tape, padding, tissue paper, and protective material." />
              <ChecklistItem text="Local delivery mileage, fuel, time, parking, tolls, meeting delays, and failed pickup attempts." />
              <ChecklistItem text="Shipping labels, package weight, package dimensions, carrier cost, and seller-paid shipping when items are shipped." />
              <ChecklistItem text="Platform fees, checkout fees, or payment processing fees when applicable." />
              <ChecklistItem text="Buyer negotiation discounts, bundle discounts, delivery concessions, and counteroffer reductions." />
              <ChecklistItem text="Refund allowance, damaged item risk, cancellation risk, no-show risk, and replacement cost." />
              <ChecklistItem text="Time spent messaging buyers, answering questions, scheduling pickups, packing, and completing the sale." />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Inventory and operations costs
            </h2>

            <div className="mt-5 space-y-4">
              <ChecklistItem text="Storage bins, shelves, garage space, work area, and cash tied up in unsold inventory." />
              <ChecklistItem text="Photo setup, lighting, backdrops, measuring tools, labels, and listing supplies." />
              <ChecklistItem text="Cleaning supplies, repair tools, replacement parts, batteries, hardware, paint, or touch-up materials." />
              <ChecklistItem text="Research time spent checking local sold comps, active listings, buyer demand, and category trends." />
              <ChecklistItem text="Relisting time, stale listing refreshes, price drops, bundling work, and promotion effort." />
              <ChecklistItem text="Bookkeeping tools, spreadsheets, mileage records, inventory tracking, and tax preparation help." />
              <ChecklistItem text="Returns, disputes, damaged item claims, buyer misunderstandings, and support time." />
              <ChecklistItem text="Taxes, local rules, marketplace policies, and professional help when needed." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Facebook Marketplace cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="List order costs"
              text="Start with costs that happen each time an item is sold, packed, delivered, shipped, or picked up."
            />
            <InfoCard
              title="List inventory costs"
              text="Add storage, repair, cleaning, sourcing, photo setup, and inventory holding costs."
            />
            <InfoCard
              title="Separate by item"
              text="Check whether each item has different delivery cost, offer room, repair risk, or refund risk."
            />
            <InfoCard
              title="Review regularly"
              text="Update costs when shipping prices, fuel cost, repair cost, buyer behavior, or platform rules change."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace cost breakdown
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how several small costs can quickly reduce
              Facebook Marketplace item profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Sale price"
                note="Example Facebook Marketplace seller cost checklist item."
                value="$80.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace seller cost checklist item."
                value="-$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace seller cost checklist item."
                value="-$1.00"
              />
              <Breakdown
                label="Delivery cost"
                note="Example Facebook Marketplace seller cost checklist item."
                value="-$5.00"
              />
              <Breakdown
                label="Negotiation discount"
                note="Example Facebook Marketplace seller cost checklist item."
                value="-$8.00"
              />
              <Breakdown
                label="Refund allowance"
                note="Example Facebook Marketplace seller cost checklist item."
                value="-$1.50"
              />
              <Breakdown
                label="Estimated profit before overhead"
                note="Example Facebook Marketplace seller cost checklist item."
                value="$29.50"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              This profit still has to help cover sourcing time, storage, stale
              inventory, research tools, bookkeeping, supplies, and other closet
              or garage selling costs.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace cost mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Treating sale price as profit before subtracting item cost and delivery cost.",
                "Ignoring fuel, mileage, driving time, and pickup delays.",
                "Forgetting packaging supplies because each box, mailer, label, or tape roll looks small.",
                "Not assigning refund, no-show, damaged item, or buyer issue risk to product profit.",
                "Counting active listing value as cash before the item actually sells.",
                "Buying more inventory before checking whether similar items produce real profit.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace cost categories to review
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="Product and sourcing"
              text="Item cost, thrift cost, yard sale cost, wholesale cost, sourcing mileage, cleaning supplies, repairs, and inbound cost."
            />
            <InfoBlock
              title="Packaging and shipping"
              text="Shipping labels, boxes, mailers, tape, padding, package weight, package dimensions, and seller-paid shipping."
            />
            <InfoBlock
              title="Local pickup and delivery"
              text="Fuel, mileage, driving time, parking, meeting delays, failed pickups, and delivery concessions."
            />
            <InfoBlock
              title="Negotiation and offers"
              text="Buyer offers, counteroffers, bundle discounts, price drops, local concessions, and minimum acceptable price."
            />
            <InfoBlock
              title="Customer issue costs"
              text="Refunds, cancellations, damaged items, disputes, no-shows, misunderstandings, support messages, and replacement value."
            />
            <InfoBlock
              title="Operations and overhead"
              text="Bookkeeping, research tools, photo setup, internet, phone, storage bins, workspace supplies, and admin time."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            When to update your Facebook Marketplace cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Fuel changes"
              text="Review delivery cost whenever fuel prices, drive distance, or meetup locations change."
            />
            <InfoCard
              title="Offer changes"
              text="Update costs when buyers send lower offers or when your discount strategy changes."
            />
            <InfoCard
              title="Shipping changes"
              text="Adjust assumptions if shipping labels, packaging supplies, or package weights change."
            />
            <InfoCard
              title="Return changes"
              text="Adjust issue allowance if certain categories, sizes, electronics, or conditions create more problems."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/refund-impact-calculator" label="Refund Impact Calculator" />
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