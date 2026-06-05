export default function ShopifyDiscountStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Discount Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review coupons, sale prices, free shipping, bundle discounts,
          subscription incentives, and promotion strategies before discounting
          Shopify products.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How should Shopify sellers use discounts?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify discounts can increase conversion, encourage larger orders,
            move inventory, and bring back hesitant customers. But discounts also
            reduce margin, change customer expectations, and can make paid ads or
            free shipping harder to run profitably.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The best discount strategy starts with knowing the product&apos;s
            break-even price. A promotion should have a clear purpose, such as
            raising average order value, clearing slow inventory, increasing
            repeat purchases, or testing a new offer.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify discount types</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Percentage discounts"
                text="A percentage discount is easy for customers to understand, but it can quickly reduce margin on higher-priced products."
              />
              <InfoBlock
                title="Dollar-off coupons"
                text="A fixed dollar discount gives more control over the exact discount amount and may protect margin better than a large percentage discount."
              />
              <InfoBlock
                title="Free shipping"
                text="Free shipping can improve checkout conversion, but the seller still pays the shipping cost unless it is built into the price."
              />
              <InfoBlock
                title="Bundle discounts"
                text="Bundles can raise average order value when the discount is smaller than the extra profit created by the added items."
              />
              <InfoBlock
                title="Subscription discounts"
                text="Subscription discounts can improve recurring revenue, but repeat shipments still need enough margin after fulfillment and churn."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify discount mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Discounting before checking product cost, shipping, payment fees, ads, and refund allowance." />
              <Warning text="Combining discounts with free shipping without checking the combined margin impact." />
              <Warning text="Training customers to wait for discounts instead of buying at regular price." />
              <Warning text="Using one discount rate across products with very different margins." />
              <Warning text="Running coupons without knowing the order lift needed to break even." />
              <Warning text="Discounting low-margin products that were already close to break-even." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan a Shopify discount</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Know break-even"
              text="Calculate the minimum price needed to cover product cost, shipping, fees, ads, and refunds."
            />
            <StepCard
              title="Set a purpose"
              text="Decide whether the promotion is meant to raise conversion, AOV, repeat purchases, or inventory movement."
            />
            <StepCard
              title="Estimate order lift"
              text="Check how many extra orders are needed to offset the lower profit per order."
            />
            <StepCard
              title="Review profit"
              text="Measure total profit after the promotion, not just sales volume or revenue."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify discount calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a discount can reduce profit even when the
              product still sells above cost.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Regular product price" value="$45.00" />
              <Breakdown label="Example discount" value="15%" />
              <Breakdown label="Discount amount" value="-$6.75" />
              <Breakdown label="Discounted price" value="$38.25" />
              <Breakdown label="Product cost" value="-$14.00" />
              <Breakdown label="Shipping cost" value="-$6.50" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Ad cost per order" value="-$5.00" />
              <Breakdown label="Estimated discounted profit" value="$7.34" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              A discount can still be profitable, but the lower profit per order
              usually requires more orders to produce the same monthly profit.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">When discounts can make sense</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Clearing slow inventory"
                text="Discounts can help recover cash from products that are tying up inventory space or restock budget."
              />
              <InfoBlock
                title="Increasing average order value"
                text="A discount threshold can encourage customers to add more items before checkout."
              />
              <InfoBlock
                title="Testing new offers"
                text="Small, controlled discounts can help test buyer response before changing the main product price."
              />
              <InfoBlock
                title="Recovering abandoned carts"
                text="A targeted discount may bring back customers who were already close to purchasing."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify discount checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Regular product price and discounted price." />
            <Check text="Product cost, shipping, packaging, payment fees, and fulfillment cost." />
            <Check text="Ad cost per order or campaign acquisition cost." />
            <Check text="Refund allowance, replacement cost, and support cost." />
            <Check text="Break-even price before running the promotion." />
            <Check text="Expected order lift from the discount." />
            <Check text="Whether free shipping is also being offered." />
            <Check text="Whether the discount applies to one product, a bundle, or the whole cart." />
            <Check text="Whether the promotion helps inventory, repeat purchases, or customer acquisition." />
            <Check text="Monthly profit after the discount compared with regular-price profit." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify discount profitability</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Use thresholds"
              text="Set free shipping or coupon thresholds high enough to raise average order value."
            />
            <StepCard
              title="Protect best sellers"
              text="Avoid discounting products that already sell well at regular price unless there is a clear reason."
            />
            <StepCard
              title="Bundle carefully"
              text="Use bundles to increase total order profit instead of simply lowering the price."
            />
            <StepCard
              title="Limit duration"
              text="Run discounts for a specific purpose and time window instead of making them permanent."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/discount-impact-calculator" label="Discount Calculator" />
            <Related href="/shopify/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
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
          Example Shopify discount strategy item.
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