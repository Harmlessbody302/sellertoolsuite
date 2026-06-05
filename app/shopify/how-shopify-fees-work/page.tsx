export default function HowShopifyFeesWorkPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          How Shopify Fees Work
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand the main Shopify costs that affect profit, including monthly
          subscription fees, payment processing, transaction fees, app costs,
          shipping costs, fulfillment expenses, advertising, refunds, and taxes.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">What fees do Shopify sellers pay?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify sellers usually deal with more than one type of cost. The most
            obvious fee is the monthly Shopify plan, but the bigger profit impact
            often comes from payment processing, product cost, shipping,
            packaging, apps, advertising, discounts, refunds, and fulfillment.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A Shopify store can look profitable from revenue alone while still
            losing money after all order-level and store-level costs are included.
            That is why sellers should estimate both fixed monthly costs and
            variable costs per order.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Shopify fee categories</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Shopify plan cost"
                text="This is the monthly platform cost for using Shopify. It is a fixed cost that must be covered by store profit."
              />
              <InfoBlock
                title="Payment processing fees"
                text="Most sellers pay a percentage of the sale plus a fixed fee per transaction. This reduces profit on every paid order."
              />
              <InfoBlock
                title="Transaction fees"
                text="Depending on the payment setup, some stores may also have extra transaction fees. These should be included when estimating margin."
              />
              <InfoBlock
                title="App costs"
                text="Subscription apps, review apps, upsell apps, shipping apps, and subscription tools can add meaningful monthly cost."
              />
              <InfoBlock
                title="Shipping and fulfillment"
                text="Shipping labels, packing materials, pick-pack fees, warehouse charges, and carrier surcharges can all affect profit."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Costs many sellers forget</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Refunds and returns that erase profit from otherwise successful orders." />
              <Warning text="Ad spend that increases sales but lowers net profit per order." />
              <Warning text="Discounts, coupons, bundles, and free shipping offers that reduce margin." />
              <Warning text="Chargebacks, replacement orders, damaged inventory, and customer support time." />
              <Warning text="Taxes, duties, marketplace integrations, and bookkeeping software." />
              <Warning text="Slow-moving inventory that ties up cash before it produces revenue." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Shopify profit correctly</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with revenue"
              text="Use product price, average order value, and expected monthly orders."
            />
            <StepCard
              title="Subtract order costs"
              text="Include product cost, shipping, packaging, payment fees, and fulfillment."
            />
            <StepCard
              title="Subtract growth costs"
              text="Include ads, discounts, email tools, apps, and promotional costs."
            />
            <StepCard
              title="Check net profit"
              text="Compare revenue, gross profit, fixed costs, and true monthly profit."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify fee calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A simple example can show why revenue alone is not enough.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Product sale price" value="$45.00" />
              <Breakdown label="Product cost" value="-$14.00" />
              <Breakdown label="Shipping cost" value="-$6.50" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Payment processing estimate" value="-$1.61" />
              <Breakdown label="Ad cost per order" value="-$5.00" />
              <Breakdown label="Estimated profit before fixed costs" value="$16.64" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the order produces profit, but that profit still
              has to help cover monthly Shopify plan costs, app costs, refunds,
              returns, taxes, and other overhead.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Fixed costs vs. order costs</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Fixed costs"
                text="Fixed costs are expenses that exist even if you make no sales, such as your Shopify plan, app subscriptions, software, and some professional services."
              />
              <InfoBlock
                title="Variable costs"
                text="Variable costs happen because an order was placed. These include product cost, shipping, packaging, payment fees, fulfillment, and refund allowances."
              />
              <InfoBlock
                title="Why both matter"
                text="A product can have a healthy per-order margin but still fail if the store does not make enough total profit to cover fixed monthly costs."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify fee checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Monthly Shopify plan cost." />
            <Check text="Payment processing percentage and fixed fee." />
            <Check text="Any extra transaction fee from your payment setup." />
            <Check text="Product cost, supplier cost, or landed inventory cost." />
            <Check text="Shipping labels, packaging, and fulfillment costs." />
            <Check text="Apps, subscriptions, themes, plugins, and integrations." />
            <Check text="Ad spend, influencer cost, affiliate cost, and promotional expenses." />
            <Check text="Refunds, returns, chargebacks, replacement orders, and support costs." />
            <Check text="Discounts, free shipping offers, bundles, and subscription incentives." />
            <Check text="Taxes, bookkeeping, professional services, and other overhead." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Shopify fee pressure</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve margin"
              text="Raise prices, reduce product costs, improve bundles, or adjust discounts."
            />
            <StepCard
              title="Control apps"
              text="Audit monthly app costs and remove tools that do not clearly improve profit."
            />
            <StepCard
              title="Lower fulfillment cost"
              text="Compare packaging, shipping services, fulfillment partners, and carrier rates."
            />
            <StepCard
              title="Track profit"
              text="Measure product-level profit instead of relying only on total revenue."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/fee-calculator" label="Fee Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/product-cost-calculator" label="Product Cost Calculator" />
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
          Example Shopify fee calculation item.
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