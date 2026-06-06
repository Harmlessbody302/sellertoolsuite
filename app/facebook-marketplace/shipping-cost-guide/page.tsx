export default function FacebookMarketplaceShippingCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Shipping Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Facebook Marketplace shipping costs, packaging cost,
          buyer-paid shipping, seller-paid shipping, shipped order profit,
          package weight, package dimensions, refund risk, and when shipping an
          item makes sense.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why shipping costs matter for Facebook Marketplace sellers
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Shipping can help Facebook Marketplace sellers reach buyers beyond
              their local area, but it can also reduce profit quickly if the
              label cost, packaging supplies, item cost, platform fee, refund
              risk, and buyer negotiation are not included before listing.
            </p>

            <p>
              Some items are better for local pickup, while others can be
              profitable shipped. The best shipping setup depends on item size,
              item weight, package dimensions, fragility, sale price, buyer
              expectations, and how much margin remains after all order costs.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Facebook Marketplace shipping costs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Shipping label cost"
                text="The label cost depends on package weight, dimensions, carrier, service level, shipping distance, and whether the buyer or seller pays shipping."
              />
              <InfoBlock
                title="Packaging supplies"
                text="Boxes, mailers, bubble wrap, labels, tape, padding, and protective material should be included in the shipped order cost."
              />
              <InfoBlock
                title="Seller-paid shipping"
                text="If the seller pays shipping, the label cost directly reduces profit and should be built into the item price."
              />
              <InfoBlock
                title="Dimensional weight"
                text="Large but lightweight items may cost more to ship if package dimensions push the order into a higher rate."
              />
              <InfoBlock
                title="Damage and refund risk"
                text="Fragile, heavy, or poorly packed items can create damage claims, refunds, support time, and replacement losses."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace shipping mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Offering seller-paid shipping without raising the item price enough.",
                "Guessing package weight before the item is packed.",
                "Ignoring box size, dimensional weight, padding, labels, tape, and mailers.",
                "Accepting lower buyer offers on shipped items without recalculating profit.",
                "Shipping fragile or heavy items without enough protection or margin.",
                "Comparing shipped listings against local pickup prices without adjusting for shipping cost.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Facebook Marketplace shipping profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Measure package"
              text="Use the packed weight and package dimensions, not only the product weight."
            />
            <InfoCard
              title="Add packaging"
              text="Include boxes, mailers, labels, tape, padding, and protective materials."
            />
            <InfoCard
              title="Compare setup"
              text="Review buyer-paid shipping, seller-paid shipping, and local pickup options."
            />
            <InfoCard
              title="Check profit"
              text="Compare final profit after item cost, shipping, packaging, fees, offers, and refunds."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace shipping calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how shipping and packaging reduce order profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Product sale price"
                note="Example Facebook Marketplace shipping cost item."
                value="$80.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace shipping cost item."
                value="-$35.00"
              />
              <Breakdown
                label="Shipping label cost"
                note="Example Facebook Marketplace shipping cost item."
                value="-$9.50"
              />
              <Breakdown
                label="Packaging materials"
                note="Example Facebook Marketplace shipping cost item."
                value="-$1.50"
              />
              <Breakdown
                label="Platform fee estimate"
                note="Example Facebook Marketplace shipping cost item."
                value="-$0.00"
              />
              <Breakdown
                label="Negotiation discount"
                note="Example Facebook Marketplace shipping cost item."
                value="-$8.00"
              />
              <Breakdown
                label="Refund allowance"
                note="Example Facebook Marketplace shipping cost item."
                value="-$2.00"
              />
              <Breakdown
                label="Estimated profit after shipping"
                note="Example Facebook Marketplace shipping cost item."
                value="$24.00"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the shipped order still produces profit, but the
              margin is much lower than the sale price suggests. A lower buyer
              offer, larger package, or damaged item issue could reduce profit
              quickly.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace shipping options to compare
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Buyer-paid shipping"
                text="Buyer-paid shipping keeps the label cost separate from seller profit, but the total checkout cost may feel higher to buyers."
              />
              <InfoBlock
                title="Seller-paid shipping"
                text="Seller-paid shipping can make the offer look simpler, but the item price must cover the label and packaging cost."
              />
              <InfoBlock
                title="Local pickup instead"
                text="Pickup can avoid label cost and packaging risk, but it may involve scheduling, buyer messages, no-shows, and pickup friction."
              />
              <InfoBlock
                title="Local delivery instead"
                text="Delivery can be useful for larger items, but fuel, time, distance, and meeting delays should be priced into the sale."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace shipping cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Actual packed weight, not bare item weight." />
            <ChecklistItem text="Package dimensions after boxing or mailing." />
            <ChecklistItem text="Shipping label cost by carrier, service, and destination if relevant." />
            <ChecklistItem text="Boxes, mailers, tape, labels, inserts, padding, and protective material." />
            <ChecklistItem text="Whether buyer or seller pays shipping." />
            <ChecklistItem text="Expected buyer offer room on shipped listings." />
            <ChecklistItem text="Damage risk, fragile packaging, refund allowance, and replacement loss." />
            <ChecklistItem text="Whether local pickup or delivery would protect more profit than shipping." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Facebook Marketplace shipping cost
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Weigh packed items"
              text="Estimate shipping from packed weight and dimensions, not bare item weight."
            />
            <InfoCard
              title="Right-size packaging"
              text="Use packaging that protects the item without adding unnecessary size or weight."
            />
            <InfoCard
              title="Build in shipping"
              text="If offering seller-paid shipping, raise price enough to cover the label."
            />
            <InfoCard
              title="Use pickup strategically"
              text="Keep bulky, fragile, or low-margin items local when shipping would erase profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/product-cost-calculator" label="Product Cost Calculator" />
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