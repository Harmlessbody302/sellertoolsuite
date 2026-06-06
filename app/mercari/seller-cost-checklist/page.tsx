const orderCosts = [
  "Item cost, sourcing cost, cleaning cost, prep cost, and repair supplies.",
  "Shipping label cost when the seller pays shipping.",
  "Packaging supplies such as boxes, mailers, tape, labels, bubble wrap, and protective material.",
  "Mercari selling fees, payment processing fees, and fixed transaction fees.",
  "Promotion costs, price drops, smart pricing discounts, and offer discounts.",
  "Refund allowance, cancellation risk, damaged item risk, and replacement losses.",
  "Storage cost or cash tied up in slow-moving inventory.",
  "Time spent photographing, measuring, describing, packing, and handling orders.",
];

const storeCosts = [
  "Sourcing tools, product research tools, and sold-comp research time.",
  "Storage bins, shelves, label printers, scales, lights, and photo equipment.",
  "Shipping supplies bought in bulk before they are used.",
  "Bookkeeping, spreadsheet, mileage, and inventory tracking systems.",
  "Phone, internet, workspace, and other business overhead if allocated to selling.",
  "Returns, disputes, customer support time, and damaged inventory write-offs.",
  "Unsold inventory, stale listings, and inventory that must be donated or liquidated.",
  "Taxes, marketplace reporting, and professional help when needed.",
];

const mistakes = [
  "Treating the sale price as profit before subtracting item cost and shipping.",
  "Ignoring seller-paid shipping when accepting lower buyer offers.",
  "Forgetting packaging supplies because each box or mailer looks small.",
  "Not assigning refund, cancellation, or damaged item risk to product profit.",
  "Counting active listing value as cash before the item actually sells.",
  "Buying more inventory before checking whether similar items produce real profit.",
];

const exampleRows = [
  ["Sale price", "$35.00"],
  ["Item cost", "-$10.00"],
  ["Shipping cost", "-$6.50"],
  ["Packaging cost", "-$1.00"],
  ["Estimated selling fees", "-$3.50"],
  ["Payment processing estimate", "-$1.52"],
  ["Refund allowance", "-$1.00"],
  ["Estimated profit before overhead", "$10.48"],
];

const costCategories = [
  {
    title: "Product and sourcing",
    text: "Item cost, thrift cost, yard sale cost, wholesale cost, cleaning supplies, repairs, and inbound shipping.",
  },
  {
    title: "Shipping and packaging",
    text: "Shipping labels, boxes, mailers, tape, scales, labels, inserts, protective material, and package upgrades.",
  },
  {
    title: "Mercari selling costs",
    text: "Selling fees, payment processing, fixed fees, promotions, price drops, and offer discounts.",
  },
  {
    title: "Inventory and storage",
    text: "Slow-moving inventory, stale listings, storage bins, shelves, and cash tied up in unsold products.",
  },
  {
    title: "Customer issue costs",
    text: "Refunds, cancellations, damaged items, disputes, replacements, return shipping, and support time.",
  },
  {
    title: "Operations and overhead",
    text: "Bookkeeping, research tools, photo setup, internet, phone, workspace, supplies, and admin time.",
  },
];

const updateTriggers = [
  {
    title: "Shipping changes",
    text: "Update costs when package weight, dimensions, carrier rates, or seller-paid shipping assumptions change.",
  },
  {
    title: "Fee changes",
    text: "Review the checklist when Mercari fees, payment processing, or fixed transaction costs change.",
  },
  {
    title: "Offer changes",
    text: "Recheck profit when buyers send lower offers or when you use price drops and promotions.",
  },
  {
    title: "Refund changes",
    text: "Adjust assumptions if certain categories create more cancellations, damaged items, or disputes.",
  },
];

export default function MercariSellerCostChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Seller Cost Checklist
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Use this checklist of Mercari seller costs to avoid underpricing items
          or accepting weak offers after item cost, shipping, packaging, fees,
          promotions, refunds, inventory, and overhead.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What costs should Mercari sellers track?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Mercari sellers should track every cost that affects whether a sale
            actually produces profit. Some costs happen on every order, such as
            item cost, shipping, packaging, and selling fees. Other costs happen
            less often, such as refunds, damaged items, stale inventory, and
            storage pressure.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The most common mistake is judging profit from the sale price alone.
            A listing can look healthy until buyer offers, seller-paid shipping,
            promotion discounts, packaging supplies, and refunds are included.
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Order-level Mercari costs</h2>

            <div className="mt-5 space-y-3">
              {orderCosts.map((item) => (
                <Check key={item} text={item} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Store-level Mercari costs</h2>

            <div className="mt-5 space-y-3">
              {storeCosts.map((item) => (
                <Check key={item} text={item} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Mercari cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="List order costs"
              text="Start with the costs that happen each time an item is sold and shipped."
            />
            <StepCard
              title="List monthly costs"
              text="Add supplies, storage, tools, software, research time, and business overhead."
            />
            <StepCard
              title="Separate by item"
              text="Check whether each item has different shipping, offer room, refund risk, or prep cost."
            />
            <StepCard
              title="Review regularly"
              text="Update costs when shipping, fees, pricing, sourcing, or return patterns change."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Mercari cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how several small costs can quickly reduce
              Mercari item profit.
            </p>

            <div className="mt-5 space-y-3">
              {exampleRows.map(([label, value]) => (
                <Breakdown key={label} label={label} value={value} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              This profit still has to help cover sourcing time, storage,
              stale inventory, research tools, bookkeeping, and other monthly
              selling costs.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari cost mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              {mistakes.map((mistake) => (
                <Warning key={mistake} text={mistake} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Mercari cost categories to review
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {costCategories.map((category) => (
              <InfoCard
                key={category.title}
                title={category.title}
                text={category.text}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            When to update your Mercari cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {updateTriggers.map((card) => (
              <StepCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Mercari calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/refund-impact-calculator" label="Refund Impact Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
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
          Example Mercari seller cost checklist item.
        </p>
      </div>
      <p className="font-bold">{value}</p>
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