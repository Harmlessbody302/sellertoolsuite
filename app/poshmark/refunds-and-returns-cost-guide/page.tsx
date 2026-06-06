export default function PoshmarkRefundsAndReturnsCostGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Refunds and Returns Cost Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Understand how Poshmark returns, cancellations, damaged items, buyer
          disputes, recovered value, packaging cost, shipping discounts, support
          time, and replacement losses can affect seller profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why refunds and returns matter for Poshmark profit
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Refunds, returns, damaged items, cancellations, and buyer disputes
              can quietly erase profit from otherwise healthy Poshmark sales. A
              returned order may still leave the seller with packaging cost,
              shipping discount cost, lost time, reduced inventory value, or an
              item that must be relisted at a lower price.
            </p>

            <p>
              Poshmark sellers should treat refund risk as a real cost of doing
              business. The goal is not to assume every sale will go wrong, but
              to price, describe, photograph, package, and source products in a
              way that protects margin when occasional issues happen.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Poshmark refund and issue costs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Refunded revenue"
                text="The most obvious cost is the sale revenue returned to the buyer, but refunded revenue is only one part of the total loss."
              />
              <InfoCard
                title="Original packaging and supplies"
                text="Mailers, boxes, labels, tape, tissue paper, thank-you cards, and protective materials may not be recovered after a return or cancellation."
              />
              <InfoCard
                title="Shipping discount loss"
                text="Seller-paid shipping incentives can reduce profit even more if a sale later creates an issue or dispute."
              />
              <InfoCard
                title="Damaged or unsellable items"
                text="Some returned or disputed items may lose value if they are damaged, incomplete, worn, opened, or no longer sellable at full price."
              />
              <InfoCard
                title="Support and relisting time"
                text="Messages, inspection, photographing, relisting, repacking, and customer service time can create hidden costs."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Poshmark refund mistakes</h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting only the refunded sale price and ignoring packaging, shipping discounts, and fees.",
                "Assuming every returned or disputed item can be resold at full value.",
                "Ignoring fragile packaging problems that create damage claims.",
                "Selling high-risk items without building in refund allowance.",
                "Not describing flaws, measurements, fabric, size, or condition clearly enough.",
                "Scaling similar items before checking refund, cancellation, or dispute risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to estimate Poshmark refund cost
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Find issue rate"
              text="Estimate the percentage of orders that may be returned, canceled, disputed, or damaged."
            />
            <StepCard
              title="Add lost costs"
              text="Include packaging, seller-paid discounts, support time, damaged value, and relisting cost."
            />
            <StepCard
              title="Estimate recovery"
              text="Subtract resale value if the item can still be resold, repaired, or bundled."
            />
            <StepCard
              title="Review margin"
              text="Check whether the product still makes profit after expected issue losses."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Example Poshmark refund cost</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows why a refund may cost more than the returned
              revenue alone.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Refunded sale price" value="$45.00" />
              <Breakdown label="Original packaging cost" value="$1.25" />
              <Breakdown label="Shipping discount cost" value="$2.02" />
              <Breakdown label="Support and handling cost" value="$1.50" />
              <Breakdown label="Lost item value" value="$5.00" />
              <Breakdown label="Recovered item value" value="-$6.00" />
              <Breakdown label="Estimated refund impact" value="$48.77" />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, some value is recovered, but the refund still
              creates a meaningful loss after packaging, shipping discount,
              support time, and lost item value are included.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Returns, cancellations, and damaged items
            </h2>

            <div className="mt-5 space-y-4">
              <InfoCard
                title="Return"
                text="A return may send the item back, but the seller may still lose packaging, shipping discount value, time, and some product value."
              />
              <InfoCard
                title="Cancellation"
                text="A cancellation may avoid shipping cost if caught early, but it can still waste listing time, offer activity, and buyer interest."
              />
              <InfoCard
                title="Damaged item issue"
                text="A damaged item can create refund loss, dispute risk, lower resale value, and inventory value loss."
              />
              <InfoCard
                title="Replacement or partial recovery"
                text="Some items may be resold, repaired, bundled, or partially recovered, but recovered value should be estimated conservatively."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Poshmark refund and return checklist
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Refunded revenue and original sale price.",
              "Original packaging cost and seller-paid shipping discount.",
              "Packaging supplies, labels, boxes, tape, and protective materials.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Recovered value if the item can be resold.",
              "Damaged, missing, incomplete, or unsellable product loss.",
              "Customer support, inspection, relisting, and handling time.",
              "Product page issues causing repeated refunds or disputes.",
            ].map((text) => (
              <Check key={text} text={text} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Poshmark refund losses
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Describe clearly"
              text="Mention flaws, measurements, fabric, size, condition, signs of wear, and included items."
            />
            <StepCard
              title="Use strong photos"
              text="Show all angles, tags, scale, fabric texture, defects, and important details."
            />
            <StepCard
              title="Pack safely"
              text="Protect fragile or high-risk items to reduce damage and dispute risk."
            />
            <StepCard
              title="Avoid risky items"
              text="Skip categories or conditions that create too many issues for the expected profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Helpful Poshmark calculators</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/refund-impact-calculator" label="Refund Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
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
          Example Poshmark refund and return cost item.
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