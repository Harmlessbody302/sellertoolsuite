export default function RefundsAndReturnsCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Refunds and Returns Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand refund, return, chargeback, replacement, damaged item, and
          customer support cost impact for Shopify stores.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why refunds and returns matter for Shopify profit
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Refunds and returns can quietly erase profit even when sales volume
            looks healthy. A refunded order may still leave the seller with
            shipping cost, packaging cost, payment fees, ad spend, support time,
            damaged inventory, and return shipping cost.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Shopify sellers should treat refunds and returns as a real cost of
            doing business. The goal is not to avoid every refund. The goal is to
            know the expected cost, price products correctly, and fix products or
            policies that create avoidable losses.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Shopify refund and return costs
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Refunded revenue"
                text="The most obvious cost is the revenue returned to the customer, but refunded revenue is only one part of the total loss."
              />
              <InfoBlock
                title="Original shipping and packaging"
                text="The seller may not recover the original shipping label, packaging, fulfillment, and handling costs."
              />
              <InfoBlock
                title="Return shipping"
                text="If the store pays for return labels, the cost of the return shipment should be included in refund planning."
              />
              <InfoBlock
                title="Damaged or unsellable inventory"
                text="Some returned items cannot be resold at full price. Damaged, opened, incomplete, or used products may lose most of their value."
              />
              <InfoBlock
                title="Support and processing time"
                text="Customer emails, return inspections, refunds, replacements, and restocking all create support or labor cost."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify refund mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Counting only the refunded sale price and ignoring shipping, ads, packaging, and support time." />
              <Warning text="Assuming every returned item can be resold at full price." />
              <Warning text="Offering free returns without calculating return shipping cost." />
              <Warning text="Ignoring chargebacks, dispute fees, replacement orders, and damaged inventory." />
              <Warning text="Using one store-wide refund rate when certain products have much higher return risk." />
              <Warning text="Scaling ads for products with high refund rates before checking net profit after returns." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">How to estimate Shopify refund cost</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find refund rate"
              text="Calculate the percentage of orders that are refunded, returned, replaced, or disputed."
            />
            <StepCard
              title="Add lost costs"
              text="Include shipping, packaging, payment fees, ad cost, return shipping, and support time."
            />
            <StepCard
              title="Estimate recovery"
              text="Subtract any value recovered from resale, restocking fees, or partial refunds."
            />
            <StepCard
              title="Review margin"
              text="Check whether the product still makes profit after expected refund and return losses."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Shopify refund cost</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a refund may cost more than the returned
              revenue alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Refunded sale price" value="$45.00" />
              <Breakdown label="Original shipping cost" value="$6.50" />
              <Breakdown label="Packaging cost" value="$1.25" />
              <Breakdown label="Payment fee estimate" value="$1.61" />
              <Breakdown label="Ad cost per order" value="$5.00" />
              <Breakdown label="Support cost" value="$1.50" />
              <Breakdown label="Recovered inventory value" value="-$4.20" />
              <Breakdown label="Estimated refund impact" value="$56.66" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              In this example, some inventory value is recovered, but the refund
              still creates a meaningful loss after shipping, ads, fees, packaging,
              and support are included.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Refunds, returns, and chargebacks</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <InfoBlock
                title="Refund"
                text="A refund returns money to the customer. It may happen with or without a physical product return."
              />
              <InfoBlock
                title="Return"
                text="A return involves the product coming back to the seller. The item may be resold, discounted, repaired, discarded, or replaced."
              />
              <InfoBlock
                title="Replacement"
                text="A replacement order sends another product to the customer, often creating additional product, shipping, and fulfillment cost."
              />
              <InfoBlock
                title="Chargeback"
                text="A chargeback or payment dispute can create revenue loss, fees, support time, and additional risk beyond a normal refund."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Shopify refund and return checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Check text="Refund rate by product, collection, campaign, or traffic source." />
            <Check text="Refunded revenue and partial refund amount." />
            <Check text="Original shipping, packaging, fulfillment, and payment fees." />
            <Check text="Return shipping label cost if paid by the store." />
            <Check text="Inventory recovery value for returned products." />
            <Check text="Damaged, opened, missing, or unsellable product loss." />
            <Check text="Replacement order cost and reshipment cost." />
            <Check text="Chargeback fee, dispute risk, and lost revenue." />
            <Check text="Customer support, inspection, restocking, and admin time." />
            <Check text="Product page issues, sizing problems, shipping damage, or quality problems causing returns." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Shopify refund losses</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve product pages"
              text="Use clearer photos, sizing, specs, descriptions, FAQs, and expectation-setting."
            />
            <StepCard
              title="Track return reasons"
              text="Separate fit issues, quality issues, shipping damage, buyer remorse, and wrong-item problems."
            />
            <StepCard
              title="Fix weak products"
              text="Improve packaging, change suppliers, raise prices, or stop promoting high-refund products."
            />
            <StepCard
              title="Protect policy"
              text="Use a clear return policy that balances customer trust with margin protection."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Shopify calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/refund-impact-calculator" label="Refund Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/discount-impact-calculator" label="Discount Calculator" />
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
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
          Example Shopify refund and return cost item.
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