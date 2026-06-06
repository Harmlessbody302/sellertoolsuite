export default function PoshmarkSellerCostChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Seller Cost Checklist
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Use this checklist of Poshmark seller costs to avoid underpricing items
          or accepting weak offers after item cost, Poshmark fees, packaging,
          shipping discounts, promotion costs, returns, and seller time.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            What costs should Poshmark sellers track?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Poshmark sellers should track every cost that affects whether a
              sale actually produces profit. Some costs happen on every order,
              such as item cost, Poshmark fees, packaging, and shipping
              discounts. Other costs happen less often, such as returns,
              damaged items, stale inventory, promotion costs, and relisting
              time.
            </p>

            <p>
              The most common mistake is judging profit from the sale price
              alone. A listing can look healthy until buyer offers, shipping
              discounts, packaging supplies, closet activity, and return risk
              are included.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Order-level Poshmark costs</h2>

            <div className="mt-5 space-y-3">
              {[
                "Item cost, sourcing cost, cleaning cost, prep cost, and repair supplies.",
                "Poshmark flat fee or percentage commission.",
                "Seller-paid shipping discounts and offer-to-liker incentives.",
                "Packaging supplies such as mailers, boxes, labels, tape, tissue paper, and thank-you cards.",
                "Refund allowance, cancellation risk, damaged item risk, and replacement losses.",
                "Offer discount, bundle discount, Closet Clear Out price drop, or promotion discount.",
                "Time spent photographing, measuring, describing, packing, shipping, and relisting items.",
                "Storage cost or cash tied up in stale, slow-moving, or unsold inventory.",
              ].map((text) => (
                <Check key={text} text={text} />
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Closet-level Poshmark costs</h2>

            <div className="mt-5 space-y-3">
              {[
                "Sourcing tools, product research tools, sold-comp research time, and inventory tracking systems.",
                "Storage bins, shelves, label printers, scales, lights, backdrops, and photo equipment.",
                "Shipping supplies bought in bulk before they are used.",
                "Bookkeeping tools, spreadsheets, mileage, and inventory records.",
                "Phone, internet, workspace, and other business overhead if allocated to selling.",
                "Returns, disputes, support time, and damaged inventory write-offs.",
                "Unsold inventory, stale listings, and inventory that must be donated or liquidated.",
                "Taxes, marketplace reporting, and professional help when needed.",
              ].map((text) => (
                <Check key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Poshmark cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="List order costs"
              text="Start with costs that happen each time an item is sold and shipped."
            />
            <StepCard
              title="List closet costs"
              text="Add supplies, storage, tools, software, research time, and business overhead."
            />
            <StepCard
              title="Separate by item"
              text="Check whether each item has different shipping, offer room, refund risk, or prep cost."
            />
            <StepCard
              title="Review regularly"
              text="Update costs when fees, shipping discounts, sourcing costs, or return patterns change."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Poshmark cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how several small costs can quickly reduce
              Poshmark item profit.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value="$45.00" />
              <Breakdown label="Item cost" value="-$14.00" />
              <Breakdown label="Packaging cost" value="-$1.25" />
              <Breakdown label="Estimated Poshmark fee" value="-$9.00" />
              <Breakdown label="Shipping discount" value="-$2.02" />
              <Breakdown label="Refund allowance" value="-$1.00" />
              <Breakdown label="Estimated profit before overhead" value="$17.73" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              This profit still has to help cover sourcing time, storage, stale
              inventory, research tools, bookkeeping, supplies, and other
              closet-level selling costs.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Poshmark cost mistakes</h2>

            <div className="mt-5 space-y-4">
              {[
                "Treating sale price as profit before subtracting item cost and Poshmark fees.",
                "Ignoring seller-paid shipping discounts when accepting buyer offers.",
                "Forgetting packaging supplies because each box, mailer, or label looks small.",
                "Not assigning refund, cancellation, or damaged item risk to product profit.",
                "Counting active listing value as cash before the item actually sells.",
                "Buying more inventory before checking whether similar items produce real profit.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Poshmark cost categories to review</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Product and sourcing"
              text="Item cost, thrift cost, yard sale cost, wholesale cost, cleaning supplies, repairs, and inbound sourcing."
            />
            <InfoCard
              title="Packaging and shipping"
              text="Shipping discounts, boxes, mailers, tape, labels, thank-you cards, tissue paper, and package upgrades."
            />
            <InfoCard
              title="Poshmark selling costs"
              text="Commission, flat fees, offer discounts, shipping incentives, Closet Clear Out price drops, and promotion costs."
            />
            <InfoCard
              title="Inventory and storage"
              text="Slow-moving inventory, stale listings, storage bins, shelves, and cash tied up in unsold products."
            />
            <InfoCard
              title="Customer issue costs"
              text="Returns, cancellations, damaged items, disputes, replacements, customer messages, and support time."
            />
            <InfoCard
              title="Operations and overhead"
              text="Bookkeeping, research tools, photo setup, internet, phone, workspace, supplies, and admin time."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            When to update your Poshmark cost checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Fee changes"
              text="Review the checklist whenever Poshmark fees, flat fees, or commission assumptions change."
            />
            <StepCard
              title="Offer changes"
              text="Update costs when buyers send lower offers or when you change your discount strategy."
            />
            <StepCard
              title="Shipping changes"
              text="Adjust assumptions if shipping discounts, packaging supplies, or package weights change."
            />
            <StepCard
              title="Return changes"
              text="Adjust issue allowance if certain brands, categories, sizes, or conditions create more returns."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/refund-impact-calculator" label="Refund Impact Calculator" />
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
          Example Poshmark seller cost checklist item.
        </p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
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