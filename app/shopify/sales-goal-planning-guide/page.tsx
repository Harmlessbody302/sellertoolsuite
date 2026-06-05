export default function ShopifySalesGoalPlanningGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Sales Goal Planning Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from revenue or profit goals to estimate required orders,
          sessions, ad budget, conversion rate, inventory needs, and daily sales
          pace for a Shopify store.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Shopify sales goals should start with numbers
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A Shopify sales goal is more useful when it is connected to order
            volume, average order value, conversion rate, traffic, ad spend,
            inventory, and profit margin. A revenue target can sound achievable
            until it is translated into the number of orders and sessions needed
            to reach it.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The goal is not just to sell more. The goal is to reach a sales level
            that still leaves enough profit after product cost, shipping,
            packaging, payment fees, ads, discounts, refunds, apps, and other
            store costs.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Shopify sales goals?</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Average order value"
                text="Average order value determines how many orders are needed to reach a revenue goal. Higher AOV can reduce the number of orders required."
              />
              <InfoBlock
                title="Conversion rate"
                text="Conversion rate determines how much traffic is needed. A low conversion rate makes a sales goal require far more sessions."
              />
              <InfoBlock
                title="Traffic volume"
                text="A store needs enough qualified traffic from ads, organic search, email, social, referrals, or repeat buyers to support the goal."
              />
              <InfoBlock
                title="Profit margin"
                text="Revenue goals should be checked against product costs, shipping, payment fees, ads, refunds, and fixed overhead."
              />
              <InfoBlock
                title="Inventory capacity"
                text="A sales goal is not realistic if the store cannot stock, ship, or fulfill the required number of orders."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify sales goal mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Setting a revenue goal without calculating the orders needed to reach it." />
              <Warning text="Ignoring conversion rate when estimating required traffic." />
              <Warning text="Planning around sales volume without checking profit after costs." />
              <Warning text="Assuming ad spend can scale without higher acquisition cost." />
              <Warning text="Forgetting inventory, fulfillment, and customer support capacity." />
              <Warning text="Using one average order value when products have very different prices and margins." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to plan a Shopify sales goal</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Set revenue target"
              text="Choose the monthly or weekly revenue goal you want the Shopify store to reach."
            />
            <StepCard
              title="Calculate orders"
              text="Divide the revenue goal by average order value to estimate required orders."
            />
            <StepCard
              title="Estimate traffic"
              text="Use conversion rate to estimate the sessions needed to generate those orders."
            />
            <StepCard
              title="Check profit"
              text="Confirm the goal still works after product costs, ads, shipping, refunds, and overhead."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify sales goal calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a revenue goal turns into required orders,
              traffic, and daily pace.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target monthly revenue" value="$7,500.00" />
              <Breakdown label="Average order value" value="$45.00" />
              <Breakdown label="Orders needed" value="167" />
              <Breakdown label="Current monthly orders" value="100" />
              <Breakdown label="Extra orders needed" value="67" />
              <Breakdown label="Conversion rate" value="2.0%" />
              <Breakdown label="Sessions needed" value="8,350" />
              <Breakdown label="Daily orders needed" value="6" />
              <Breakdown label="Daily revenue needed" value="$250.00" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the seller needs more orders and more traffic than
              the current pace. The goal may be realistic if conversion, traffic,
              inventory, and profit margin can support the increase.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Sales goal levers to adjust</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Increase average order value"
                text="Bundles, upsells, cross-sells, quantity breaks, and free shipping thresholds can reduce the number of orders needed."
              />
              <InfoBlock
                title="Improve conversion rate"
                text="Better product pages, clearer offers, reviews, trust signals, and checkout clarity can reduce the traffic required."
              />
              <InfoBlock
                title="Grow qualified traffic"
                text="SEO, ads, email, social content, affiliates, referrals, and repeat customers can increase sessions."
              />
              <InfoBlock
                title="Protect profit margin"
                text="The sales goal should still leave room for product costs, fulfillment, ads, refunds, and monthly overhead."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify sales goal checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Target monthly revenue or target monthly profit." />
            <Check text="Current monthly revenue, orders, and average order value." />
            <Check text="Current sessions and conversion rate by traffic source." />
            <Check text="Required orders to reach the sales goal." />
            <Check text="Required sessions to reach the order target." />
            <Check text="Daily sales pace needed during the planning period." />
            <Check text="Product cost, shipping, packaging, payment fees, and ad costs." />
            <Check text="Inventory needed to support the order target." />
            <Check text="Fulfillment, customer support, and cash-flow capacity." />
            <Check text="Refund rate, discount strategy, and profit after ads." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reach a Shopify sales goal</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise AOV"
              text="Use bundles, upsells, cross-sells, free shipping thresholds, and product add-ons."
            />
            <StepCard
              title="Improve conversion"
              text="Improve product pages, reviews, trust signals, pricing, and checkout clarity."
            />
            <StepCard
              title="Grow traffic"
              text="Use SEO, email, ads, social content, affiliates, referrals, and retargeting."
            />
            <StepCard
              title="Protect margin"
              text="Avoid reaching the revenue goal by using discounts or ads that erase profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/shopify/conversion-rate-calculator" label="Conversion Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/inventory-restock-calculator" label="Restock Calculator" />
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
          Example Shopify sales goal planning item.
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