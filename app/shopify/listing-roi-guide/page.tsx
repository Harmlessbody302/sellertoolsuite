export default function ShopifyListingRoiGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Listing ROI Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review when to improve, advertise, restock, discount, bundle, or retire
          a Shopify product page based on traffic, conversion rate, profit, refund
          rate, and listing investment.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Shopify listing ROI?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify listing ROI measures whether a product page is producing
            enough profit compared with the money and effort invested into it.
            A listing may require product photography, copywriting, SEO, ads,
            app costs, discounts, inventory, and ongoing optimization.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A product page should not be judged by sales alone. A listing can
            generate revenue while still producing weak ROI if ad spend, refunds,
            product cost, fulfillment cost, or conversion problems reduce the
            actual profit left after expenses.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What affects Shopify listing ROI?</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Product margin"
                text="A listing with strong product margin has more room for ads, discounts, refunds, and optimization costs."
              />
              <InfoBlock
                title="Traffic quality"
                text="Search, email, social, influencer, paid ad, and retargeting traffic can produce very different conversion and profit results."
              />
              <InfoBlock
                title="Conversion rate"
                text="A listing with low conversion may waste traffic unless the product page, offer, price, or trust signals are improved."
              />
              <InfoBlock
                title="Listing investment"
                text="Photography, copy, SEO, page design, apps, ads, and creative testing should be included when judging ROI."
              />
              <InfoBlock
                title="Refund and return rate"
                text="High refund rates can make a listing look successful from sales while quietly weakening profit."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify listing ROI mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Judging a listing by revenue without checking profit after costs." />
              <Warning text="Scaling ads to a listing before checking conversion rate and profit per visitor." />
              <Warning text="Ignoring listing setup costs such as photos, copy, creative, and apps." />
              <Warning text="Keeping weak listings active without improving the page, price, offer, or traffic source." />
              <Warning text="Restocking products before checking whether the listing actually produces enough return." />
              <Warning text="Using store-wide averages instead of product-level ROI." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Shopify listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Estimate profit"
              text="Calculate sale price minus product cost, shipping, packaging, payment fees, ads, and refund allowance."
            />
            <StepCard
              title="Add investment"
              text="Include photography, copywriting, SEO, app costs, product samples, and ad testing."
            />
            <StepCard
              title="Measure traffic"
              text="Review sessions, conversion rate, orders, revenue, and profit per visitor."
            />
            <StepCard
              title="Decide action"
              text="Use ROI to decide whether to improve, advertise, restock, discount, bundle, or retire the listing."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify listing ROI calculation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a listing can be evaluated by profit instead
              of revenue alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Monthly listing sessions" value="1,200" />
              <Breakdown label="Listing conversion rate" value="2.5%" />
              <Breakdown label="Estimated orders" value="30" />
              <Breakdown label="Monthly revenue" value="$1,350.00" />
              <Breakdown label="Listing investment" value="$395.00" />
              <Breakdown label="Refund loss" value="-$25.97" />
              <Breakdown label="Net listing profit" value="$228.38" />
              <Breakdown label="Listing ROI" value="57.8%" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, the listing is profitable, but the ROI may still
              be too thin to scale aggressively unless conversion, margin, or
              traffic quality improves.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What to do with listing ROI results</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Improve"
                text="If traffic exists but conversion is weak, improve photos, copy, reviews, FAQs, pricing, or the offer."
              />
              <InfoBlock
                title="Advertise"
                text="If margin and conversion are healthy, the listing may be worth testing with paid traffic."
              />
              <InfoBlock
                title="Restock"
                text="If ROI is strong and demand is consistent, restocking may make sense before inventory runs out."
              />
              <InfoBlock
                title="Retire"
                text="If ROI remains weak after testing, the product may not deserve more ad spend, inventory, or development time."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Shopify listing ROI checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Product sale price and actual discounted sale price." />
            <Check text="Product cost, shipping, packaging, fulfillment, and payment fees." />
            <Check text="Ad spend, creative testing, content cost, and app cost." />
            <Check text="Sessions, conversion rate, orders, and revenue by listing." />
            <Check text="Refund rate, return cost, damaged inventory, and replacement cost." />
            <Check text="Profit per order and profit per visitor." />
            <Check text="Inventory cost, restock cost, and stockout risk." />
            <Check text="SEO performance, traffic source, and customer intent." />
            <Check text="Reviews, product photos, page copy, trust signals, and FAQs." />
            <Check text="Whether the listing should be improved, scaled, bundled, discounted, or retired." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve conversion"
              text="Upgrade product photos, page copy, reviews, FAQs, trust signals, pricing, and offer clarity."
            />
            <StepCard
              title="Lower acquisition cost"
              text="Improve SEO, email traffic, retargeting, ad targeting, and organic traffic sources."
            />
            <StepCard
              title="Raise order value"
              text="Use bundles, upsells, cross-sells, quantity breaks, and free shipping thresholds."
            />
            <StepCard
              title="Cut weak pages"
              text="Retire or rebuild listings that continue to lose money after reasonable testing."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/shopify/conversion-rate-calculator" label="Conversion Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
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
          Example Shopify listing ROI item.
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