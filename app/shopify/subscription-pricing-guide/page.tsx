export default function ShopifySubscriptionPricingGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Subscription Pricing Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review recurring pricing, subscriber discounts, churn risk, retention
          value, fulfillment cost, customer acquisition cost, and subscription
          profit for Shopify stores.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Shopify subscription pricing matters
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify subscriptions can create recurring revenue, repeat purchases,
            and more predictable demand. But a subscription price still needs to
            cover product cost, shipping, packaging, fulfillment, payment fees,
            subscription app fees, support cost, discounts, refunds, and customer
            acquisition cost.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A subscription discount should be priced around long-term profit, not
            just first-month revenue. If churn is high, acquisition cost is high,
            or repeat shipments have thin margins, the subscription may look good
            on revenue while producing weak lifetime value.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Shopify subscription profit?
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Subscription price"
                text="The recurring price should cover the full cost of each shipment while leaving enough margin after fees, support, and refunds."
              />
              <InfoBlock
                title="Subscriber discount"
                text="Many subscriptions use a discount to encourage repeat purchases, but the discount should not make future shipments unprofitable."
              />
              <InfoBlock
                title="Churn rate"
                text="Churn is the rate at which subscribers cancel. High churn can reduce lifetime value and make acquisition costs harder to recover."
              />
              <InfoBlock
                title="Customer acquisition cost"
                text="If paid ads or promotions are used to acquire subscribers, the subscription must generate enough lifetime profit to recover that cost."
              />
              <InfoBlock
                title="Fulfillment and support"
                text="Recurring shipments may create repeated shipping, packaging, fulfillment, support, failed payment, and replacement costs."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Shopify subscription pricing mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Offering a subscription discount before checking repeat shipment margin." />
              <Warning text="Judging subscriptions by monthly revenue without checking churn and lifetime value." />
              <Warning text="Ignoring subscription app fees, failed payments, support time, and replacement costs." />
              <Warning text="Spending too much to acquire subscribers without checking LTV to CAC." />
              <Warning text="Assuming subscribers stay for the same number of months." />
              <Warning text="Using one subscription margin target across products with different shipping and product costs." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to price a Shopify subscription
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add shipment costs"
              text="Include product cost, shipping, packaging, fulfillment, payment fees, app fees, and support."
            />
            <StepCard
              title="Set recurring price"
              text="Choose a subscription price that protects margin after any subscriber discount."
            />
            <StepCard
              title="Estimate retention"
              text="Use churn rate or average months retained to estimate lifetime profit."
            />
            <StepCard
              title="Compare CAC"
              text="Check whether lifetime profit is high enough to recover customer acquisition cost."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Shopify subscription pricing calculation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how recurring revenue can be reduced by shipment
              costs, acquisition cost, and churn.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Subscription price" value="$35.00" />
              <Breakdown label="Product cost" value="-$11.00" />
              <Breakdown label="Shipping cost" value="-$5.50" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Fulfillment cost" value="-$1.50" />
              <Breakdown label="Payment fee estimate" value="-$1.32" />
              <Breakdown label="Subscription app cost" value="-$1.00" />
              <Breakdown label="Support and refund allowance" value="-$2.25" />
              <Breakdown label="Estimated profit per shipment" value="$11.18" />
              <Breakdown label="Example customer LTV" value="$67.11" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the subscription is profitable per shipment. The
              next question is whether subscribers stay long enough to justify
              the acquisition cost and support burden.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Subscription metrics to review</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Monthly recurring revenue"
                text="MRR estimates recurring subscription revenue before costs, churn, refunds, or failed payments."
              />
              <InfoBlock
                title="Profit per shipment"
                text="Profit per shipment shows whether each recurring order is actually profitable."
              />
              <InfoBlock
                title="Lifetime value"
                text="LTV estimates how much gross profit a subscriber may produce before canceling."
              />
              <InfoBlock
                title="LTV to CAC"
                text="LTV to CAC compares lifetime profit against the cost of acquiring a subscriber."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Shopify subscription pricing checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Subscription price and regular one-time purchase price." />
            <Check text="Subscriber discount and any first-order discount." />
            <Check text="Product cost, shipping, packaging, fulfillment, and payment fees." />
            <Check text="Subscription app cost, support cost, and failed payment cost." />
            <Check text="Refund allowance, replacement cost, and return risk." />
            <Check text="Active subscribers, new subscribers, and monthly churn rate." />
            <Check text="Average months retained and estimated customer lifetime value." />
            <Check text="Customer acquisition cost and LTV to CAC ratio." />
            <Check text="Inventory and fulfillment capacity for recurring shipments." />
            <Check text="Whether subscription profit is stronger than one-time order profit." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Shopify subscription profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Reduce churn"
              text="Improve product consistency, delivery reliability, onboarding, reminders, and cancellation saves."
            />
            <StepCard
              title="Raise LTV"
              text="Use better bundles, loyalty perks, upsells, and longer retention to increase lifetime profit."
            />
            <StepCard
              title="Lower CAC"
              text="Use email capture, referrals, organic traffic, and retargeting before scaling paid acquisition."
            />
            <StepCard
              title="Protect margin"
              text="Watch discounts, shipping, app fees, support tickets, refunds, and failed payments."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/subscription-profit-calculator" label="Subscription Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
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
          Example Shopify subscription pricing item.
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