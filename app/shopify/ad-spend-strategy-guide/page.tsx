export default function ShopifyAdSpendStrategyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Ad Spend Strategy Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Shopify sellers can plan ad spend, break-even ROAS, customer
          acquisition cost, conversion rate, average order value, margin, and
          profitable scaling decisions.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How much should Shopify sellers spend on ads?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify ad spend should be based on profit, not just revenue. A
            campaign can create sales while still losing money if product cost,
            shipping, payment fees, packaging, discounts, refunds, and customer
            acquisition cost are too high.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The safest way to plan ad spend is to know your break-even point first.
            Once you know how much profit each order can support, you can decide
            how much you can afford to spend to acquire a customer.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Shopify ad spend metrics</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Customer acquisition cost"
                text="Customer acquisition cost is the amount spent to get one customer or order. It should be compared against profit per order, not only revenue."
              />
              <InfoBlock
                title="ROAS"
                text="Return on ad spend compares revenue against ad spend. It is useful, but it does not automatically prove the campaign is profitable."
              />
              <InfoBlock
                title="Break-even ROAS"
                text="Break-even ROAS is the ROAS needed before ads stop losing money. Higher product margins usually allow a lower break-even ROAS."
              />
              <InfoBlock
                title="Conversion rate"
                text="Conversion rate affects how many orders you get from paid traffic. Low conversion makes ads harder to scale profitably."
              />
              <InfoBlock
                title="Average order value"
                text="Higher average order value can give more room for ad spend if product margin stays healthy."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify ad spend mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Judging ads by revenue without checking profit after product costs and shipping." />
              <Warning text="Scaling campaigns before knowing the break-even ROAS." />
              <Warning text="Ignoring refunds, discounts, chargebacks, and replacement orders in ad calculations." />
              <Warning text="Using the same ad budget for products with very different margins." />
              <Warning text="Spending more to acquire customers than the first order can realistically support." />
              <Warning text="Increasing ad spend while conversion rate, AOV, or profit per order is weak." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan Shopify ad spend</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find profit per order"
              text="Calculate sale price minus product cost, shipping, packaging, payment fees, and refund allowance."
            />
            <StepCard
              title="Set max CAC"
              text="Decide the most you can spend to acquire an order while keeping profit."
            />
            <StepCard
              title="Check ROAS"
              text="Compare actual ad return with the break-even ROAS needed for the product."
            />
            <StepCard
              title="Scale slowly"
              text="Increase ad spend only when profit, conversion rate, and fulfillment capacity can support it."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify ad spend calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why ad spend should be planned around profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Product sale price" value="$45.00" />
              <Breakdown label="Product cost" value="-$14.00" />
              <Breakdown label="Shipping cost" value="-$6.50" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Payment fee estimate" value="-$1.61" />
              <Breakdown label="Refund allowance" value="-$1.50" />
              <Breakdown label="Profit before ads" value="$20.14" />
              <Breakdown label="Example ad cost per order" value="-$8.00" />
              <Breakdown label="Profit after ads" value="$12.14" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the seller could spend up to the pre-ad profit
              before reaching break-even, but spending the full amount would leave
              no profit to cover overhead or growth.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Ad spend targets to watch</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Break-even ad cost"
                text="The maximum ad cost per order before the order stops producing profit."
              />
              <InfoBlock
                title="Target ad cost"
                text="The ad cost per order that still leaves enough margin after all other costs."
              />
              <InfoBlock
                title="New customer value"
                text="The first order may not tell the full story if customers commonly reorder, subscribe, or buy higher-value products later."
              />
              <InfoBlock
                title="Scaling pressure"
                text="Ad costs often rise when campaigns scale, so small profitable tests do not always stay profitable at larger budgets."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify ad spend checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Sale price and average order value." />
            <Check text="Product cost, shipping, packaging, and fulfillment cost." />
            <Check text="Payment fees, refund allowance, and chargeback risk." />
            <Check text="Profit per order before ads." />
            <Check text="Maximum customer acquisition cost." />
            <Check text="Break-even ROAS and target ROAS." />
            <Check text="Conversion rate by traffic source and product page." />
            <Check text="Ad spend by campaign, product, audience, and offer." />
            <Check text="Repeat purchase rate, subscription potential, or customer lifetime value." />
            <Check text="Inventory, cash flow, and fulfillment capacity before scaling ads." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify ad performance</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve conversion"
              text="Strengthen product pages, reviews, trust signals, speed, checkout clarity, and offers."
            />
            <StepCard
              title="Raise AOV"
              text="Use bundles, upsells, quantity breaks, free shipping thresholds, and post-purchase offers."
            />
            <StepCard
              title="Protect margin"
              text="Limit discounts, track refund losses, and avoid promoting products with weak margins."
            />
            <StepCard
              title="Track profit"
              text="Judge campaigns by profit after ads instead of revenue or ROAS alone."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/conversion-rate-calculator" label="Conversion Calculator" />
            <Related href="/shopify/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Example Shopify ad spend item.
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