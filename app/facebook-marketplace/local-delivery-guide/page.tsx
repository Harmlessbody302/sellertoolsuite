export default function FacebookMarketplaceLocalDeliveryGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Local Delivery Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review Facebook Marketplace local delivery costs, delivery fees,
          mileage, fuel, driving time, buyer distance, safe drop-off planning,
          pickup alternatives, and whether local delivery protects profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Should Facebook Marketplace sellers offer local delivery?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Local delivery can make a Facebook Marketplace listing more
              attractive, especially for larger items, buyers without
              transportation, or items that are difficult to move. But delivery
              is only useful if the delivery fee and final sale price cover fuel,
              mileage, driving time, packaging, loading effort, failed meetups,
              and any extra buyer coordination.
            </p>

            <p>
              Sellers should compare delivery against pickup before agreeing to
              drive. A sale that looks profitable at the list price can become
              weak if the seller spends too much time driving, waiting, loading,
              unloading, or rescheduling with the buyer.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Main Facebook Marketplace delivery costs
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Fuel and mileage"
                text="Round-trip mileage should be counted, not just the distance to the buyer. Fuel, wear, and travel distance all reduce profit."
              />
              <InfoBlock
                title="Driving time"
                text="Delivery time includes loading, driving, waiting, unloading, and returning home. Time has value even when fuel cost is low."
              />
              <InfoBlock
                title="Delivery fee charged"
                text="The delivery fee should cover fuel, time, inconvenience, and failed meetup risk. A low delivery fee can quietly erase profit."
              />
              <InfoBlock
                title="Loading and handling"
                text="Large or fragile items may require extra packing, lifting, helper time, straps, blankets, or careful handling."
              />
              <InfoBlock
                title="Failed delivery risk"
                text="No-shows, wrong addresses, late buyers, rescheduled pickups, and payment confusion can turn delivery into a loss."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace delivery mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Offering free delivery without checking fuel, mileage, and time cost.",
                "Counting only one-way mileage instead of round-trip mileage.",
                "Driving too far for low-margin items.",
                "Letting buyers change delivery details without adjusting the fee.",
                "Forgetting traffic, parking, loading time, waiting time, and no-show risk.",
                "Using delivery to save weak listings that should be repriced, bundled, or skipped.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to price Facebook Marketplace local delivery
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Estimate distance"
              text="Use round-trip mileage and consider whether traffic or location makes the trip slower."
            />
            <InfoCard
              title="Value your time"
              text="Add driving, waiting, loading, unloading, and coordination time."
            />
            <InfoCard
              title="Set a fee"
              text="Charge enough to cover fuel, time, inconvenience, and delivery risk."
            />
            <InfoCard
              title="Compare pickup"
              text="Check whether pickup would preserve more profit with less buyer friction."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace local delivery calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how a delivery fee can still leave a delivery
              loss if fuel and time are not fully covered.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Sale price"
                note="Example Facebook Marketplace local delivery item."
                value="$80.00"
              />
              <Breakdown
                label="Delivery fee charged"
                note="Example Facebook Marketplace local delivery item."
                value="$10.00"
              />
              <Breakdown
                label="Item cost"
                note="Example Facebook Marketplace local delivery item."
                value="-$35.00"
              />
              <Breakdown
                label="Packaging cost"
                note="Example Facebook Marketplace local delivery item."
                value="-$1.00"
              />
              <Breakdown
                label="Fuel cost"
                note="Example Facebook Marketplace local delivery item."
                value="-$4.50"
              />
              <Breakdown
                label="Time cost"
                note="Example Facebook Marketplace local delivery item."
                value="-$11.25"
              />
              <Breakdown
                label="Total delivery cost"
                note="Example Facebook Marketplace local delivery item."
                value="-$15.75"
              />
              <Breakdown
                label="Estimated profit with delivery"
                note="Example Facebook Marketplace local delivery item."
                value="$37.25"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the delivery fee helps, but it does not fully
              cover the combined fuel and time cost. The item can still be
              profitable, but pickup may create a better return if the buyer is
              willing to collect the item.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Pickup vs. local delivery decisions
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Use pickup for low-margin items"
                text="If the item has thin profit, pickup usually protects margin better than delivery."
              />
              <InfoBlock
                title="Use delivery for higher-value items"
                text="Delivery can make sense when the sale price and profit are high enough to justify the trip."
              />
              <InfoBlock
                title="Charge for distance"
                text="Longer drives should usually require higher delivery fees or a stronger sale price."
              />
              <InfoBlock
                title="Confirm details first"
                text="Before driving, confirm address, timing, payment method, item expectations, and whether help is needed unloading."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace local delivery checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Round-trip mileage, not one-way distance." />
            <ChecklistItem text="Fuel cost, vehicle wear, parking, tolls, and traffic." />
            <ChecklistItem text="Driving time, loading time, unloading time, and waiting time." />
            <ChecklistItem text="Delivery fee charged to the buyer." />
            <ChecklistItem text="Whether the buyer has confirmed address, timing, payment, and item details." />
            <ChecklistItem text="Whether the item needs straps, blankets, padding, or help loading." />
            <ChecklistItem text="No-show, late buyer, wrong address, and rescheduling risk." />
            <ChecklistItem text="Whether pickup, meet-up, shipping, or delivery creates the best profit." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace delivery profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Set a minimum fee"
              text="Do not offer delivery unless the fee covers fuel, time, and inconvenience."
            />
            <InfoCard
              title="Limit distance"
              text="Keep delivery radius small unless the sale price and profit justify the trip."
            />
            <InfoCard
              title="Bundle deliveries"
              text="Deliver only when multiple items or higher-value orders make the trip worthwhile."
            />
            <InfoCard
              title="Prefer pickup"
              text="Use pickup for low-margin items where delivery would erase profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/local-delivery-cost-calculator" label="Local Delivery Cost Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
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

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Breakdown({
  label,
  note,
  value,
}: {
  label: string;
  note: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="font-bold">{label}</p>
        <p className="mt-1 text-xs text-slate-600">{note}</p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
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
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
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