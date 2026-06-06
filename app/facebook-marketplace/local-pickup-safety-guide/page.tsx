export default function FacebookMarketplaceLocalPickupSafetyGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Guide
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Local Pickup Safety Guide
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Review safe public meetup planning, porch pickup caution, buyer
          screening, payment confirmation, pickup boundaries, no-show prevention,
          local delivery limits, and how safety decisions affect Facebook
          Marketplace profit.
        </p>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why local pickup safety matters for Facebook Marketplace sellers
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <p>
              Facebook Marketplace often involves local buyers, direct messages,
              pickup coordination, and in-person exchange. A sale may look
              profitable on paper, but pickup delays, unsafe meeting locations,
              payment confusion, no-shows, last-minute negotiation, or unclear
              expectations can turn the sale into wasted time or avoidable risk.
            </p>

            <p>
              A good pickup process protects both safety and profit. Sellers
              should decide where they are willing to meet, how payment will be
              handled, what pickup details must be confirmed, and when to cancel
              or move on to another buyer.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              What affects Facebook Marketplace pickup safety?
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Meeting location"
                text="Public, well-lit, familiar locations are usually safer than isolated locations. Some sellers use police station exchange zones or busy public areas when available."
              />
              <InfoBlock
                title="Buyer communication"
                text="Clear messages help confirm item details, pickup time, payment method, and whether the buyer understands the condition and price."
              />
              <InfoBlock
                title="Payment confirmation"
                text="Sellers should know how payment will be handled before meeting and avoid handing over the item before payment is confirmed."
              />
              <InfoBlock
                title="No-show risk"
                text="Late buyers, vague messages, repeated rescheduling, and unclear pickup plans can waste time and reduce real profit."
              />
              <InfoBlock
                title="Item size and handling"
                text="Large, heavy, or fragile items may require extra planning, help loading, porch pickup boundaries, or local delivery rules."
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace pickup safety mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Meeting without confirming the buyer, time, price, and pickup location first.",
                "Holding items too long for buyers who give vague or unreliable responses.",
                "Accepting last-minute lower offers after already spending time preparing the pickup.",
                "Using unsafe, isolated, or inconvenient meeting spots to save a weak sale.",
                "Letting porch pickup details stay unclear for payment, timing, or item condition.",
                "Ignoring no-show patterns, payment confusion, and repeated rescheduling.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to plan safer Facebook Marketplace pickups
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Choose location"
              text="Use a public, familiar, well-lit place or a safer pickup option that fits the item."
            />
            <InfoCard
              title="Confirm details"
              text="Confirm item, price, time, location, condition, and whether help is needed."
            />
            <InfoCard
              title="Set boundaries"
              text="Decide how long you will hold the item and when a buyer loses priority."
            />
            <InfoCard
              title="Protect profit"
              text="Include pickup time, delays, no-shows, and buyer friction when judging the sale."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Example Facebook Marketplace pickup planning checklist
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This example shows how pickup planning can protect a local sale
              before the buyer arrives.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Listing price"
                note="Example Facebook Marketplace local pickup item."
                value="$80.00"
              />
              <Breakdown
                label="Accepted price"
                note="Example Facebook Marketplace local pickup item."
                value="$72.00"
              />
              <Breakdown
                label="Minimum acceptable price"
                note="Example Facebook Marketplace local pickup item."
                value="$59.50"
              />
              <Breakdown
                label="Pickup window"
                note="Example Facebook Marketplace local pickup item."
                value="30 minutes"
              />
              <Breakdown
                label="Hold time"
                note="Example Facebook Marketplace local pickup item."
                value="Same day"
              />
              <Breakdown
                label="Payment method"
                note="Example Facebook Marketplace local pickup item."
                value="Confirmed before meetup"
              />
              <Breakdown
                label="Pickup location"
                note="Example Facebook Marketplace local pickup item."
                value="Public location"
              />
              <Breakdown
                label="Backup action"
                note="Example Facebook Marketplace local pickup item."
                value="Move to next buyer"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              In this example, the seller knows the accepted price, minimum
              price, pickup window, and backup plan before meeting. That helps
              reduce wasted time, unsafe surprises, and last-minute negotiation.
            </p>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Pickup options to compare
            </h2>

            <div className="mt-5 space-y-4">
              <InfoBlock
                title="Public meetup"
                text="A public meetup can be useful for smaller items, but the seller should still account for drive time, waiting time, and no-show risk."
              />
              <InfoBlock
                title="Porch pickup"
                text="Porch pickup can save time, but sellers should be careful with payment confirmation, item exposure, and address privacy."
              />
              <InfoBlock
                title="Buyer pickup"
                text="Buyer pickup can protect seller time when the item is large, but boundaries and timing should be clear."
              />
              <InfoBlock
                title="Local delivery"
                text="Delivery may help close higher-value sales, but mileage, fuel, time, loading, unloading, and safety should be priced into the sale."
              />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Facebook Marketplace local pickup safety checklist
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ChecklistItem text="Buyer name, message history, and pickup intent seem reasonable." />
            <ChecklistItem text="Item price, accepted offer, and minimum acceptable price are clear." />
            <ChecklistItem text="Pickup time, pickup window, location, and backup plan are confirmed." />
            <ChecklistItem text="Payment method is understood before the item is handed over." />
            <ChecklistItem text="Public meeting place, porch pickup, or delivery plan fits the item and safety level." />
            <ChecklistItem text="Large or heavy item loading help is planned before pickup." />
            <ChecklistItem text="No-show, late arrival, rescheduling, and last-minute negotiation rules are set." />
            <ChecklistItem text="Seller is willing to cancel, relist, or move to the next buyer if the exchange feels wrong." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace pickup results
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Confirm before leaving"
              text="Send a short confirmation before driving or preparing a pickup."
            />
            <InfoCard
              title="Use clear windows"
              text="Set a pickup window instead of holding the item indefinitely."
            />
            <InfoCard
              title="Avoid weak holds"
              text="Do not reserve items for vague buyers who will not confirm details."
            />
            <InfoCard
              title="Move on quickly"
              text="Relist or contact the next buyer when pickup plans fall apart."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Helpful Facebook Marketplace calculators
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/local-delivery-cost-calculator" label="Local Delivery Cost Calculator" />
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/offer-roi-calculator" label="Offer ROI Calculator" />
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