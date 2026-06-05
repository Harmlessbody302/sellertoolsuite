export default function ShopifyShippingCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Shipping Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand Shopify shipping labels, packaging, fulfillment, free
          shipping offers, handling costs, shipping zones, and how delivery costs
          affect product profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why shipping costs matter for Shopify sellers
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shipping can be one of the biggest profit leaks in a Shopify store.
            A product may look profitable before shipping, but the margin can
            shrink quickly once carrier rates, packaging, fulfillment labor,
            shipping zones, delivery upgrades, and free shipping offers are
            included.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify sellers should estimate shipping at the product level instead
            of relying only on store-wide averages. Heavy, fragile, oversized, or
            low-priced products can have very different shipping economics from
            small lightweight products.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Shopify shipping costs</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Carrier label cost"
                text="The shipping label is the base delivery cost paid to the carrier. It can vary by package weight, dimensions, service level, destination, and shipping zone."
              />
              <InfoBlock
                title="Packaging materials"
                text="Boxes, mailers, tape, labels, protective material, inserts, and branded packaging all reduce profit if they are not included in pricing."
              />
              <InfoBlock
                title="Fulfillment labor"
                text="Even if you ship orders yourself, picking, packing, labeling, and handling orders has a time cost that should be considered."
              />
              <InfoBlock
                title="Free shipping offers"
                text="Free shipping can improve conversion, but the shipping cost still has to be paid by the seller or built into the product price."
              />
              <InfoBlock
                title="Return shipping"
                text="If your store pays for return labels, return shipping can turn a profitable order into a loss."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify shipping mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Offering free shipping without raising price or checking margin." />
              <Warning text="Using one average shipping cost for products with very different weights and sizes." />
              <Warning text="Forgetting packaging materials, inserts, labels, tape, and handling time." />
              <Warning text="Ignoring shipping zones when some customers cost much more to ship to." />
              <Warning text="Not checking whether discounted bundles or subscriptions increase shipping cost." />
              <Warning text="Paying for return shipping without including refund and return losses in pricing." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Shopify shipping profit</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Measure package"
              text="Use the actual packed weight and dimensions, not only the product weight."
            />
            <StepCard
              title="Estimate zones"
              text="Check nearby, average, and far shipping destinations to avoid underestimating cost."
            />
            <StepCard
              title="Add packaging"
              text="Include boxes, mailers, labels, tape, inserts, and protective material."
            />
            <StepCard
              title="Compare profit"
              text="Review profit with paid shipping, free shipping, and discounted shipping scenarios."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify shipping calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how shipping and packaging reduce order profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Product sale price" value="$45.00" />
              <Breakdown label="Product cost" value="-$14.00" />
              <Breakdown label="Shipping label cost" value="-$6.50" />
              <Breakdown label="Packaging materials" value="-$1.25" />
              <Breakdown label="Fulfillment handling" value="-$2.00" />
              <Breakdown label="Payment processing estimate" value="-$1.61" />
              <Breakdown label="Estimated profit after shipping" value="$19.64" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If free shipping is offered, the seller still pays the shipping
              cost. That cost should be covered by the product price, higher
              average order value, or better conversion rate.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Free shipping vs. paid shipping</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Free shipping"
                text="Free shipping may improve conversion, but it should be built into pricing or protected with a minimum order threshold."
              />
              <InfoBlock
                title="Paid shipping"
                text="Paid shipping protects margin more directly, but customers may compare the full checkout cost against competitors."
              />
              <InfoBlock
                title="Free shipping threshold"
                text="A threshold can raise average order value by encouraging customers to add more items before checkout."
              />
              <InfoBlock
                title="Flat-rate shipping"
                text="Flat-rate shipping is simple for customers, but it can overcharge nearby buyers or undercharge far-away buyers."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify shipping cost checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Product weight and packed package weight." />
            <Check text="Package dimensions after boxing or mailing." />
            <Check text="Carrier label cost by destination and service level." />
            <Check text="Boxes, mailers, labels, tape, inserts, and protective packaging." />
            <Check text="Fulfillment labor, pick-pack fees, warehouse fees, or handling time." />
            <Check text="Residential delivery, fuel surcharge, insurance, or special service fees." />
            <Check text="Free shipping offers, flat-rate shipping, or shipping thresholds." />
            <Check text="Return shipping cost and replacement shipment cost." />
            <Check text="Bundle, subscription, or multi-item order shipping changes." />
            <Check text="International shipping, duties, taxes, and delivery restrictions if applicable." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Shopify shipping cost</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Right-size packaging"
              text="Use the smallest safe package to reduce dimensional weight and carrier cost."
            />
            <StepCard
              title="Compare carriers"
              text="Check multiple services and delivery speeds instead of defaulting to one carrier."
            />
            <StepCard
              title="Use thresholds"
              text="Set free shipping thresholds that raise average order value enough to protect margin."
            />
            <StepCard
              title="Review heavy items"
              text="Price heavy, fragile, or oversized products separately so they do not drain profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/break-even-calculator" label="Break-Even Calculator" />
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
          Example Shopify shipping cost item.
        </p>
      </div>
      <p className="font-bold">{value}</p>
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