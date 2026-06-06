const calculatorCards = [
  {
    title: "Facebook Marketplace Profit Calculator",
    href: "/facebook-marketplace/profit-calculator",
    tag: "Profit",
    text: "Estimate profit after item cost, packaging, shipping, local delivery, meet-up costs, discounts, and seller expenses.",
  },
  {
    title: "Facebook Marketplace Pricing Calculator",
    href: "/facebook-marketplace/pricing-calculator",
    tag: "Pricing",
    text: "Find a profitable listing price based on item cost, target profit, negotiation room, delivery costs, and local sold comps.",
  },
  {
    title: "Facebook Marketplace Break-Even Calculator",
    href: "/facebook-marketplace/break-even-calculator",
    tag: "Break-even",
    text: "Calculate the minimum price needed to avoid losing money after costs, discounts, delivery, packaging, and time value.",
  },
  {
    title: "Facebook Marketplace Shipping Profit Calculator",
    href: "/facebook-marketplace/shipping-profit-calculator",
    tag: "Shipping",
    text: "Estimate profit on shipped Facebook Marketplace orders after item cost, postage, packaging, and selling expenses.",
  },
  {
    title: "Facebook Marketplace Negotiation Calculator",
    href: "/facebook-marketplace/negotiation-calculator",
    tag: "Offers",
    text: "Compare buyer offers, counteroffers, lowest acceptable price, negotiation room, and final profit before accepting.",
  },
  {
    title: "Facebook Marketplace Product Cost Calculator",
    href: "/facebook-marketplace/product-cost-calculator",
    tag: "Costs",
    text: "Estimate total product cost after purchase cost, sourcing, cleaning, repair, packaging, storage, and listing preparation.",
  },
  {
    title: "Facebook Marketplace Local Delivery Cost Calculator",
    href: "/facebook-marketplace/local-delivery-cost-calculator",
    tag: "Delivery",
    text: "Estimate local delivery cost using mileage, fuel, time, delivery fee, item profit, and whether delivery is worth offering.",
  },
  {
    title: "Facebook Marketplace Bundle Pricing Calculator",
    href: "/facebook-marketplace/bundle-pricing-calculator",
    tag: "Bundles",
    text: "Calculate bundle price, bundle discount, combined item cost, pickup or delivery cost, and final bundle profit.",
  },
  {
    title: "Facebook Marketplace Offer ROI Calculator",
    href: "/facebook-marketplace/offer-roi-calculator",
    tag: "Offers",
    text: "Estimate whether accepting lower offers or running discounts creates enough extra sales to protect total profit.",
  },
  {
    title: "Facebook Marketplace Refund Impact Calculator",
    href: "/facebook-marketplace/refund-impact-calculator",
    tag: "Refunds",
    text: "Estimate how refunds, returns, damaged items, no-shows, disputes, and recovered value affect Facebook Marketplace profit.",
  },
  {
    title: "Facebook Marketplace Listing ROI Calculator",
    href: "/facebook-marketplace/listing-roi-calculator",
    tag: "ROI",
    text: "Estimate whether a listing is worth improving, renewing, discounting, bundling, boosting, or removing.",
  },
  {
    title: "Facebook Marketplace Inventory Restock Calculator",
    href: "/facebook-marketplace/inventory-restock-calculator",
    tag: "Inventory",
    text: "Plan sourcing and restock decisions around active listings, monthly sales, sell-through rate, item cost, and storage pressure.",
  },
  {
    title: "Facebook Marketplace Sales Goal Calculator",
    href: "/facebook-marketplace/sales-goal-calculator",
    tag: "Goals",
    text: "Work backward from a monthly profit goal to estimate required sales, listings, average sale price, and sourcing needs.",
  },
  {
    title: "Facebook Marketplace Sell-Through Rate Calculator",
    href: "/facebook-marketplace/sell-through-rate-calculator",
    tag: "Velocity",
    text: "Calculate sell-through rate, monthly sales velocity, stale inventory value, listing needs, and sourcing pace.",
  },
  {
    title: "Facebook Marketplace Promotion ROI Calculator",
    href: "/facebook-marketplace/promotion-roi-calculator",
    tag: "Growth",
    text: "Estimate whether boosting, reposting, discounting, or increasing listing activity creates enough extra sales to justify the effort.",
  },
];

const toolCategories = [
  {
    title: "Profit tools",
    text: "Estimate Facebook Marketplace profit, break-even price, total item cost, refund risk, and listing ROI.",
  },
  {
    title: "Pricing tools",
    text: "Set prices with room for buyer negotiation, bundle discounts, delivery costs, and realistic local buyer demand.",
  },
  {
    title: "Local selling tools",
    text: "Review pickup, delivery, shipping, meet-up time, no-shows, buyer messages, and local fulfillment costs.",
  },
  {
    title: "Growth tools",
    text: "Measure sell-through, restocks, sales goals, promotion ROI, listing performance, and whether more inventory is worth sourcing.",
  },
];

const workflow = [
  {
    title: "Calculate costs",
    text: "Start with item cost, sourcing cost, cleaning, repair, packaging, shipping, delivery, and time-related expenses.",
  },
  {
    title: "Set price",
    text: "Use pricing and break-even tools to set a listing price that supports negotiation without dropping below profit goals.",
  },
  {
    title: "Review offers",
    text: "Compare buyer offers, counteroffers, delivery requests, pickup delays, and bundle discounts before accepting.",
  },
  {
    title: "Track velocity",
    text: "Use sell-through, listing ROI, restock, and sales goal tools to decide whether to source more or clear stale inventory.",
  },
];

const educationCards = [
  {
    title: "How Facebook Marketplace Fees Work",
    href: "/facebook-marketplace/how-facebook-marketplace-fees-work",
    text: "Understand Facebook Marketplace fees, local sale costs, shipping costs, payment issues, delivery expenses, and hidden seller costs.",
  },
  {
    title: "How to Price Facebook Marketplace Items",
    href: "/facebook-marketplace/how-to-price-facebook-marketplace-items",
    text: "Learn how to price local and shipped items around item cost, negotiation room, sold comps, delivery, shipping, and target profit.",
  },
  {
    title: "Facebook Marketplace Profit Margin Guide",
    href: "/facebook-marketplace/profit-margin-guide",
    text: "Review gross profit, net profit, margin, offer-adjusted margin, delivery-adjusted margin, and local selling costs.",
  },
  {
    title: "Facebook Marketplace Seller Cost Checklist",
    href: "/facebook-marketplace/seller-cost-checklist",
    text: "Use a checklist of item costs, packaging, shipping, delivery, repair, storage, no-show, refund, and selling costs.",
  },
  {
    title: "Facebook Marketplace Shipping Cost Guide",
    href: "/facebook-marketplace/shipping-cost-guide",
    text: "Understand postage, packaging, shipping materials, shipped order profit, and when shipping is worth offering.",
  },
  {
    title: "Facebook Marketplace Local Delivery Guide",
    href: "/facebook-marketplace/local-delivery-guide",
    text: "Review mileage, fuel, time, delivery fee, buyer distance, safe drop-off planning, and whether local delivery protects profit.",
  },
  {
    title: "Facebook Marketplace Negotiation Strategy Guide",
    href: "/facebook-marketplace/negotiation-strategy-guide",
    text: "Plan buyer offers, counteroffers, lowest acceptable price, bundle negotiation, pickup timing, and profit floors.",
  },
  {
    title: "Facebook Marketplace Refunds and Returns Cost Guide",
    href: "/facebook-marketplace/refunds-and-returns-cost-guide",
    text: "Understand refunds, returns, damaged items, disputes, no-shows, recovered value, and customer issue costs.",
  },
  {
    title: "Facebook Marketplace Listing ROI Guide",
    href: "/facebook-marketplace/listing-roi-guide",
    text: "Review when to improve, renew, repost, promote, discount, bundle, or remove a Facebook Marketplace listing.",
  },
  {
    title: "Facebook Marketplace Inventory Restock Guide",
    href: "/facebook-marketplace/inventory-restock-guide",
    text: "Plan sourcing and restocks around sell-through rate, active listings, stale inventory, storage, and local buyer demand.",
  },
  {
    title: "Facebook Marketplace Sales Goal Planning Guide",
    href: "/facebook-marketplace/sales-goal-planning-guide",
    text: "Work backward from revenue or profit goals to estimate required sales, listings, average sale price, and sourcing pace.",
  },
  {
    title: "Facebook Marketplace Bundle Pricing Guide",
    href: "/facebook-marketplace/bundle-pricing-guide",
    text: "Understand bundle discounts, combined item cost, local pickup value, delivery pressure, and bundle profit.",
  },
  {
    title: "Facebook Marketplace Sell-Through Rate Guide",
    href: "/facebook-marketplace/sell-through-rate-guide",
    text: "Learn how sell-through rate affects sourcing, stale listings, pricing, reposting, and inventory decisions.",
  },
  {
    title: "Facebook Marketplace Local Pickup Safety Guide",
    href: "/facebook-marketplace/local-pickup-safety-guide",
    text: "Review safe public meetups, cash handling, pickup scheduling, porch pickup caution, buyer screening, and local selling boundaries.",
  },
  {
    title: "Facebook Marketplace Seller Resources",
    href: "/facebook-marketplace/seller-resources",
    text: "Browse Facebook Marketplace calculators, guides, planning tools, seller resources, and future software recommendations.",
  },
];

const estimateList = [
  "Item cost, sourcing cost, cleaning cost, repair cost, and preparation cost.",
  "Packaging supplies, shipping supplies, local delivery cost, mileage, and fuel.",
  "Buyer negotiation room, lowest acceptable price, counteroffers, and bundle discounts.",
  "No-show risk, pickup delays, message time, delivery time, and transaction friction.",
  "Refund, return, damaged item, dispute, and recovered value assumptions.",
  "Break-even price and minimum sale price before accepting local offers.",
];

const mistakeList = [
  "Treating the listing price as profit before subtracting item cost and delivery costs.",
  "Accepting local offers without checking the lowest acceptable price.",
  "Offering delivery without charging enough for mileage, fuel, time, and inconvenience.",
  "Pricing from active listings instead of realistic local sold comps and demand.",
  "Letting slow-moving items take up space without relisting, bundling, or discounting.",
  "Ignoring buyer no-shows, message time, pickup delays, and local transaction friction.",
];

const useSteps = [
  {
    title: "Start with item cost",
    text: "Use product cost tools to estimate purchase cost, repairs, cleaning, prep, storage, and packaging.",
  },
  {
    title: "Set price floor",
    text: "Use pricing and break-even tools to find your minimum acceptable sale price.",
  },
  {
    title: "Review negotiation",
    text: "Use offer and negotiation calculators before accepting buyer offers or bundle requests.",
  },
  {
    title: "Track performance",
    text: "Use sell-through, sales goal, listing ROI, and restock tools to decide what to list next.",
  },
];

export default function FacebookMarketplaceHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Seller Calculators
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Free Facebook Marketplace calculators for profit, pricing, break-even
          planning, shipping profit, negotiation, local delivery, product cost,
          refunds, listing ROI, inventory, bundles, sell-through, promotions,
          and sales goals. Use these tools to estimate costs, profit, buyer offer
          room, delivery pressure, and local selling performance before listing
          or accepting offers.
        </p>

        <section className="mt-8 rounded-xl border border-green-300 bg-green-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-green-800">
            Live Facebook Marketplace Toolkit
          </p>
          <h2 className="mt-2 text-xl font-bold">
            15 Facebook Marketplace calculators
          </h2>
          <p className="mt-2 text-sm leading-6 text-green-900">
            Use this seller toolkit to estimate profit, local delivery cost,
            shipping profit, negotiation room, bundle pricing, refund impact,
            restock needs, promotion ROI, sell-through rate, and sales goals for
            Facebook Marketplace sellers.
          </p>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace calculator suite
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose a calculator below to estimate the major financial and
            operational variables that affect Facebook Marketplace seller profit.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {calculatorCards.map((card) => (
              <ToolCard key={card.href} {...card} />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {toolCategories.map((card) => (
            <MiniCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Recommended Facebook Marketplace seller workflow
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Use the calculators together to move from cost estimates to real
            local sale profit, pricing decisions, negotiation decisions, and
            inventory planning. This helps prevent listings from looking
            profitable before item cost, delivery time, shipping supplies, pickup
            friction, and buyer offers are included.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {workflow.map((step) => (
              <MiniCard key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Facebook Marketplace seller education hub
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Learn how Facebook Marketplace costs, pricing, negotiation, shipping,
            local delivery, refunds, listing ROI, restocks, bundles,
            sell-through, safety, and sales goals affect seller profit.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {educationCards.map((card) => (
              <GuideCard key={card.href} {...card} />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What Facebook Marketplace sellers should estimate
            </h2>

            <div className="mt-5 space-y-3">
              {estimateList.map((item) => (
                <Check key={item} text={item} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace seller mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {mistakeList.map((item) => (
                <XItem key={item} text={item} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use these Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {useSteps.map((step) => (
              <MiniCard key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-sm leading-6 text-amber-900">
            SellerToolSuite calculators provide planning estimates only. Actual
            Facebook Marketplace fees, shipping costs, local delivery costs,
            buyer behavior, payment terms, refunds, item condition, taxes,
            marketplace policies, and local selling risk may vary.
          </p>
        </section>
      </section>
    </main>
  );
}

function ToolCard({
  title,
  href,
  tag,
  text,
}: {
  title: string;
  href: string;
  tag: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="rounded-xl border bg-white p-5 shadow-sm hover:border-blue-300 hover:bg-blue-50"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold">{title}</h3>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
          {tag}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      <p className="mt-4 text-sm font-bold text-blue-700">Open tool →</p>
    </a>
  );
}

function GuideCard({
  title,
  href,
  text,
}: {
  title: string;
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="rounded-xl border bg-white p-4 shadow-sm hover:border-blue-300 hover:bg-blue-50"
    >
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
      <p className="mt-3 text-sm font-bold text-blue-700">Open guide →</p>
    </a>
  );
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
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

function XItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
        ×
      </span>
      <p>{text}</p>
    </div>
  );
}