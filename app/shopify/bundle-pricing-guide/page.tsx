export default function ShopifyBundlePricingGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Bundle Pricing Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand bundle discounts, margin protection, multi-item cost,
          fulfillment pressure, ad economics, and promotional strategy for
          Shopify product bundles.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Shopify bundle pricing matters
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify bundles can raise average order value, move more inventory,
            and make offers more attractive. But a bundle is only useful if the
            combined product cost, shipping cost, packaging cost, fulfillment
            cost, payment fees, ad cost, and refund risk still leave enough profit.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A bundle discount should be smaller than the extra margin created by
            the additional products. The goal is not just to sell more units. The
            goal is to increase total profit per order while giving the customer
            a reason to buy more at once.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Shopify bundle profit?</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Combined product cost"
                text="Every product inside the bundle adds cost. A bundle should be priced from the total cost of all included items."
              />
              <InfoBlock
                title="Bundle discount"
                text="The discount should be deep enough to encourage purchase but not so deep that it removes the profit created by the bundle."
              />
              <InfoBlock
                title="Shipping and packaging"
                text="Bundles may require larger boxes, heavier shipping, more packaging, or different fulfillment handling."
              />
              <InfoBlock
                title="Average order value"
                text="A good bundle can raise AOV while still protecting margin and cash flow."
              />
              <InfoBlock
                title="Refund and return risk"
                text="Bundles can create more complicated refunds, exchanges, partial returns, or replacement costs."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify bundle pricing mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Discounting the bundle without adding up the cost of every included item." />
              <Warning text="Ignoring higher shipping, packaging, or fulfillment costs for multi-item orders." />
              <Warning text="Using bundles only to increase revenue while accidentally lowering profit per order." />
              <Warning text="Combining bundle discounts with free shipping without checking total margin." />
              <Warning text="Adding low-margin products to bundles without balancing them with higher-margin items." />
              <Warning text="Making the bundle price too close to break-even before ads, refunds, or support costs." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to price a Shopify bundle</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add item costs"
              text="Start with the product cost for every item included in the bundle."
            />
            <StepCard
              title="Add order costs"
              text="Include shipping, packaging, fulfillment, payment fees, ads, and refund allowance."
            />
            <StepCard
              title="Set discount"
              text="Choose a bundle discount that still leaves the target margin."
            />
            <StepCard
              title="Review profit"
              text="Compare bundle profit against selling the items separately."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify bundle pricing calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a bundle discount affects price, profit, and
              margin.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Separate item price total" value="$70.00" />
              <Breakdown label="Bundle price" value="$59.00" />
              <Breakdown label="Bundle discount" value="$11.00" />
              <Breakdown label="Product cost total" value="-$21.00" />
              <Breakdown label="Shipping cost" value="-$7.50" />
              <Breakdown label="Packaging cost" value="-$1.75" />
              <Breakdown label="Fulfillment cost" value="-$2.00" />
              <Breakdown label="Payment fee estimate" value="-$2.01" />
              <Breakdown label="Ad cost per bundle" value="-$6.00" />
              <Breakdown label="Estimated profit per bundle" value="$16.74" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the bundle is still profitable after the discount.
              If shipping, ads, or refund costs increase, the bundle price may
              need to be raised or the discount reduced.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Bundle pricing strategies</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Starter bundle"
                text="A starter bundle combines related products to help new customers buy everything they need in one order."
              />
              <InfoBlock
                title="Quantity bundle"
                text="A quantity bundle gives a better price for buying multiple units of the same product."
              />
              <InfoBlock
                title="Cross-sell bundle"
                text="A cross-sell bundle pairs complementary products to raise average order value."
              />
              <InfoBlock
                title="Clearance bundle"
                text="A clearance bundle can help move slow inventory, but the discount should still protect cash recovery."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify bundle pricing checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Standalone price for each bundled product." />
            <Check text="Product cost for each item in the bundle." />
            <Check text="Shipping, packaging, and fulfillment cost for the bundle." />
            <Check text="Payment processing fees based on the bundle price." />
            <Check text="Ad cost, affiliate cost, or acquisition cost per bundle." />
            <Check text="Refund allowance, partial return risk, and replacement cost." />
            <Check text="Target margin and minimum break-even bundle price." />
            <Check text="Expected increase in average order value." />
            <Check text="Whether the bundle helps move inventory or improve customer value." />
            <Check text="Monthly bundle orders, revenue, and profit compared with selling items separately." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify bundle profit</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Pair margins wisely"
              text="Combine lower-margin items with higher-margin products to protect total bundle profit."
            />
            <StepCard
              title="Control shipping"
              text="Watch package size, weight, fulfillment handling, and carrier cost."
            />
            <StepCard
              title="Use clear value"
              text="Explain why the bundle is useful so customers see more than just the discount."
            />
            <StepCard
              title="Test discount depth"
              text="Compare small, medium, and deeper discounts against conversion and profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
            <Related href="/shopify/discount-impact-calculator" label="Discount Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
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
          Example Shopify bundle pricing item.
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