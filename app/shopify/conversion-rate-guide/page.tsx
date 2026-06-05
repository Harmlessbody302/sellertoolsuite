export default function ShopifyConversionRateGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Conversion Rate Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Learn how Shopify conversion rate, traffic quality, landing pages,
          pricing, trust signals, checkout flow, average order value, and profit
          affect store performance.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Shopify conversion rate?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify conversion rate is the percentage of store visitors or
            sessions that turn into orders. If 100 people visit your store and 2
            place an order, the conversion rate is 2%. Conversion rate helps show
            whether your traffic, product pages, offer, pricing, trust signals,
            and checkout experience are working together.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A higher conversion rate can make traffic more valuable, but it should
            still be reviewed alongside profit. A store can convert well and still
            struggle if margins are thin, refunds are high, ad costs are too high,
            or average order value is too low.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Shopify conversion rate?</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Traffic quality"
                text="Visitors from high-intent search, email, or retargeting often convert differently than cold social or broad ad traffic."
              />
              <InfoBlock
                title="Product page clarity"
                text="Clear photos, product benefits, sizing, specs, shipping details, return policy, and FAQs can reduce hesitation."
              />
              <InfoBlock
                title="Price and offer"
                text="The product price, bundle, discount, free shipping threshold, and perceived value all affect whether visitors buy."
              />
              <InfoBlock
                title="Trust signals"
                text="Reviews, guarantees, secure checkout, clear policies, contact information, and professional design can improve buyer confidence."
              />
              <InfoBlock
                title="Checkout friction"
                text="Unexpected shipping costs, slow checkout, limited payment options, or confusing policies can reduce conversion."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify conversion mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Judging conversion rate without separating traffic sources." />
              <Warning text="Sending ad traffic to weak product pages with unclear offers." />
              <Warning text="Ignoring mobile page speed, checkout friction, and confusing shipping costs." />
              <Warning text="Lowering prices to improve conversion without checking profit margin." />
              <Warning text="Using store-wide conversion rate when individual products perform very differently." />
              <Warning text="Scaling traffic before fixing trust signals, product copy, photos, and checkout clarity." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to calculate Shopify conversion rate</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Count sessions"
              text="Start with the number of visits or sessions to your Shopify store or product page."
            />
            <StepCard
              title="Count orders"
              text="Use the number of completed orders from the same period and traffic source."
            />
            <StepCard
              title="Divide orders"
              text="Divide orders by sessions to estimate the conversion rate."
            />
            <StepCard
              title="Compare profit"
              text="Check whether the conversion rate produces enough revenue and profit after costs."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify conversion calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how conversion rate connects traffic, orders,
              revenue, and profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Monthly sessions" value="5,000" />
              <Breakdown label="Monthly orders" value="100" />
              <Breakdown label="Conversion rate" value="2.0%" />
              <Breakdown label="Average order value" value="$45.00" />
              <Breakdown label="Monthly revenue" value="$4,500.00" />
              <Breakdown label="Estimated profit after ads" value="$1,575.00" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              Improving conversion rate can increase orders without increasing
              traffic, but the extra orders still need healthy product margin,
              manageable refunds, and enough inventory to fulfill demand.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Conversion rate vs. profit</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="High conversion is not always high profit"
                text="A product may convert well because it is heavily discounted, but the discount may leave too little profit."
              />
              <InfoBlock
                title="Low conversion is not always bad"
                text="Some premium products convert at a lower rate but still produce strong profit per order."
              />
              <InfoBlock
                title="Profit per session matters"
                text="Profit per session combines conversion rate, average order value, margin, and ad cost into a more useful performance signal."
              />
              <InfoBlock
                title="Traffic source matters"
                text="Email, organic search, retargeting, influencer traffic, paid ads, and social traffic can all convert differently."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify conversion rate checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Sessions, orders, and conversion rate by traffic source." />
            <Check text="Product page photos, copy, benefits, specs, and FAQs." />
            <Check text="Product price, discount, bundle, and free shipping threshold." />
            <Check text="Reviews, trust badges, guarantees, and clear return policy." />
            <Check text="Mobile page speed and checkout experience." />
            <Check text="Shipping cost clarity before checkout." />
            <Check text="Average order value and profit per order." />
            <Check text="Refund rate, replacement rate, and customer support issues." />
            <Check text="Ad cost per order and profit after ads." />
            <Check text="Inventory availability and fulfillment capacity before scaling traffic." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify conversion rate</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve product pages"
              text="Use clearer photos, stronger copy, better benefits, FAQs, reviews, and trust signals."
            />
            <StepCard
              title="Clarify shipping"
              text="Show shipping costs, delivery expectations, return policy, and free shipping thresholds clearly."
            />
            <StepCard
              title="Test offers"
              text="Compare bundles, discounts, guarantees, quantity breaks, and checkout incentives."
            />
            <StepCard
              title="Match traffic intent"
              text="Send visitors to pages that match the ad, keyword, email, or social promise that brought them in."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/conversion-rate-calculator" label="Conversion Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Example Shopify conversion rate item.
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