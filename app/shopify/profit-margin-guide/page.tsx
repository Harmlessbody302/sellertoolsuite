export default function ShopifyProfitMarginGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Profit Margin Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Shopify profit margin works, including gross margin, net
          margin, contribution margin, product margin, ad-adjusted margin, refund
          impact, and common Shopify profit mistakes.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is a good Shopify profit margin?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A good Shopify profit margin depends on the product, niche, ad cost,
            fulfillment setup, shipping cost, refund rate, and how much fixed
            overhead the store carries. A product can have a strong gross margin
            but still produce weak net profit after advertising, apps, refunds,
            and fulfillment costs are included.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify sellers should not rely on one margin number alone. It is
            better to review several margin layers: product margin, contribution
            margin, margin after ads, and final net margin after store overhead.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Main Shopify margin types</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Gross margin"
                text="Gross margin usually compares revenue against product cost and direct cost of goods sold. It is useful, but it does not show the full Shopify profit picture."
              />
              <InfoBlock
                title="Contribution margin"
                text="Contribution margin includes variable selling costs such as shipping, packaging, payment fees, fulfillment, and refund allowance."
              />
              <InfoBlock
                title="Ad-adjusted margin"
                text="Ad-adjusted margin shows what remains after customer acquisition cost or ad spend is included."
              />
              <InfoBlock
                title="Net margin"
                text="Net margin includes fixed store costs such as Shopify plan fees, apps, software, contractors, bookkeeping, and other overhead."
              />
              <InfoBlock
                title="Product-level margin"
                text="Product-level margin helps identify which products are worth scaling and which products are quietly draining profit."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify margin mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Calling a product profitable before subtracting shipping, packaging, payment fees, and ad cost." />
              <Warning text="Using gross margin as if it were final net profit." />
              <Warning text="Ignoring refund rate, return shipping, chargebacks, and replacement orders." />
              <Warning text="Scaling ads because revenue is rising while margin is shrinking." />
              <Warning text="Treating every product as equally profitable when product costs and fulfillment costs differ." />
              <Warning text="Forgetting monthly Shopify plan fees, app costs, and other fixed overhead." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to calculate Shopify profit margin</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Start with price"
              text="Use the actual sale price after discounts, coupons, and promotions."
            />
            <StepCard
              title="Subtract direct costs"
              text="Include product cost, shipping, packaging, fulfillment, and payment fees."
            />
            <StepCard
              title="Subtract growth costs"
              text="Include ad cost, affiliate cost, influencer cost, and promotion cost."
            />
            <StepCard
              title="Divide by revenue"
              text="Compare remaining profit with revenue to estimate margin percentage."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify margin calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how margin changes as more real Shopify costs
              are included.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value="$45.00" />
              <Breakdown label="Product cost" value="-$14.00" />
              <Breakdown label="Shipping cost" value="-$6.50" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Payment processing estimate" value="-$1.61" />
              <Breakdown label="Ad cost per order" value="-$5.00" />
              <Breakdown label="Refund allowance" value="-$1.50" />
              <Breakdown label="Estimated profit" value="$15.14" />
              <Breakdown label="Estimated margin" value="33.6%" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If the same product sells with a discount, higher ad cost, higher
              shipping cost, or more refunds, the margin may fall quickly even if
              revenue looks healthy.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Margin vs. markup</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Profit margin"
                text="Profit margin compares profit to the selling price. If a product sells for $100 and earns $30 profit, the margin is 30%."
              />
              <InfoBlock
                title="Markup"
                text="Markup compares profit to cost. If an item costs $50 and sells for $100, the markup is 100%, but the margin is 50%."
              />
              <InfoBlock
                title="Why it matters"
                text="Confusing markup and margin can cause sellers to overestimate profit and price products too low."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify margin checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Sale price after discounts and coupons." />
            <Check text="Product cost, supplier cost, or landed inventory cost." />
            <Check text="Shipping label, packaging, fulfillment, and handling costs." />
            <Check text="Payment processing percentage and fixed transaction fee." />
            <Check text="Ad spend, affiliate cost, influencer cost, or customer acquisition cost." />
            <Check text="Refund allowance, return shipping, chargebacks, and replacements." />
            <Check text="Shopify plan cost, app subscriptions, and software overhead." />
            <Check text="Product-level margin instead of only store-wide average margin." />
            <Check text="Break-even price before running discounts or bundles." />
            <Check text="Margin after free shipping, subscriptions, or repeat-purchase offers." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify profit margin</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise prices carefully"
              text="Test price increases while watching conversion rate, order volume, and total profit."
            />
            <StepCard
              title="Reduce fulfillment cost"
              text="Compare packaging, shipping services, fulfillment partners, and order handling costs."
            />
            <StepCard
              title="Improve ad efficiency"
              text="Track profit after ads instead of judging campaigns by revenue alone."
            />
            <StepCard
              title="Limit weak discounts"
              text="Avoid discounts, bundles, and free shipping offers that push products near break-even."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
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
          Example Shopify margin calculation item.
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