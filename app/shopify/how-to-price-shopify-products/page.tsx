export default function HowToPriceShopifyProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          How to Price Shopify Products
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how to price Shopify products around product cost, shipping,
          packaging, payment fees, ad cost, discounts, refunds, target profit
          margin, and customer expectations.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What should Shopify sellers include in product pricing?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify product pricing should start with the true cost of selling
            the product. That includes the product cost, inbound shipping,
            packaging, payment processing, fulfillment, advertising, refunds,
            discounts, and any recurring store costs that must be covered by
            profit.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A price that looks profitable before ads, refunds, or shipping may
            become thin once real selling costs are included. The goal is not
            just to set a price that customers will accept. The goal is to set a
            price that leaves enough margin to operate, market, restock, and grow.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify pricing inputs</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Product cost"
                text="Start with the cost of the item itself, including supplier cost, production cost, or landed cost if inbound shipping is part of your inventory expense."
              />
              <InfoBlock
                title="Shipping and packaging"
                text="Include shipping labels, boxes, mailers, inserts, tape, labels, packing material, and any fulfillment handling cost."
              />
              <InfoBlock
                title="Payment fees"
                text="Payment processing usually includes a percentage of the sale and a fixed fee. These fees reduce profit on every order."
              />
              <InfoBlock
                title="Ad and acquisition cost"
                text="If paid traffic is used, price should leave room for ad spend or customer acquisition cost without destroying margin."
              />
              <InfoBlock
                title="Refund and replacement allowance"
                text="Even a small refund rate can reduce profit. Pricing should account for returns, refunds, replacements, and support time."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify pricing mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Pricing from product cost only and forgetting shipping, payment fees, packaging, and ads." />
              <Warning text="Matching competitors without knowing whether their costs or margins are similar." />
              <Warning text="Offering discounts before checking the break-even price." />
              <Warning text="Using the same margin target for every product even when fulfillment costs differ." />
              <Warning text="Ignoring refund rate, return shipping, damaged products, and replacement orders." />
              <Warning text="Setting prices too low to leave room for ads, affiliates, bundles, or free shipping offers." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Simple Shopify pricing formula</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Add costs"
              text="Combine product cost, shipping, packaging, fulfillment, payment fees, and expected refund cost."
            />
            <StepCard
              title="Choose margin"
              text="Pick a target margin that leaves enough profit after all selling costs."
            />
            <StepCard
              title="Set price"
              text="Use your target margin to estimate the product price needed to protect profit."
            />
            <StepCard
              title="Test demand"
              text="Compare conversion, sales volume, and profit after changing price."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify product price</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why price should be based on total selling cost,
              not product cost alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Product cost" value="$14.00" />
              <Breakdown label="Shipping cost" value="$6.50" />
              <Breakdown label="Packaging cost" value="$1.25" />
              <Breakdown label="Payment processing estimate" value="$1.61" />
              <Breakdown label="Ad cost per order" value="$5.00" />
              <Breakdown label="Refund allowance" value="$1.50" />
              <Breakdown label="Estimated total cost" value="$29.86" />
              <Breakdown label="Example price" value="$45.00" />
              <Breakdown label="Estimated profit" value="$15.14" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, a $45 price leaves estimated profit after the
              major order costs. If ad cost, shipping, or refund rate increases,
              the price may need to change.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Pricing methods for Shopify products</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Cost-plus pricing"
                text="Add up your costs, then apply a target markup or margin. This is simple and helps prevent obvious underpricing."
              />
              <InfoBlock
                title="Value-based pricing"
                text="Price based on the value the customer sees, not only the cost of the product. This works better for differentiated products."
              />
              <InfoBlock
                title="Competitor-aware pricing"
                text="Use competitor prices as context, but do not copy them blindly. Your costs, positioning, and offer may be different."
              />
              <InfoBlock
                title="Bundle pricing"
                text="Combine products to raise average order value while protecting margin with carefully controlled discounts."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify product pricing checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Product cost or landed inventory cost." />
            <Check text="Shipping, packaging, and fulfillment costs." />
            <Check text="Payment processing percentage and fixed fee." />
            <Check text="Ad cost, affiliate cost, or customer acquisition cost." />
            <Check text="Refunds, returns, replacements, and support costs." />
            <Check text="Discounts, coupons, free shipping, bundles, and subscriptions." />
            <Check text="Target profit margin and minimum break-even price." />
            <Check text="Customer expectations, competitor range, and perceived value." />
            <Check text="Monthly fixed costs such as Shopify plan and app subscriptions." />
            <Check text="Inventory cash flow, reorder cost, and restock timing." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify pricing</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise perceived value"
              text="Improve photos, product copy, reviews, packaging, guarantees, and offer clarity."
            />
            <StepCard
              title="Protect margin"
              text="Check every discount, bundle, and free shipping offer against your break-even price."
            />
            <StepCard
              title="Increase AOV"
              text="Use bundles, upsells, quantity breaks, cross-sells, and free shipping thresholds."
            />
            <StepCard
              title="Review regularly"
              text="Recheck pricing when product cost, shipping cost, ad cost, or refund rate changes."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/shopify/discount-impact-calculator" label="Discount Calculator" />
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
          Example Shopify product pricing item.
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