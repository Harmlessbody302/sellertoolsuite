import Link from "next/link";

const offsiteAdBasics = [
  {
    title: "Attributed ad orders",
    description:
      "An Offsite Ads fee can apply when a buyer clicks an Etsy offsite ad and then places an attributed order from your shop.",
  },
  {
    title: "15% fee tier",
    description:
      "Etsy lists a 15% Offsite Ads fee for shops below the required sales threshold in the relevant lookback period.",
  },
  {
    title: "12% discounted tier",
    description:
      "Etsy lists a discounted 12% Offsite Ads fee for shops that meet the sales threshold for required participation.",
  },
  {
    title: "Fee cap per order",
    description:
      "Etsy states that the Offsite Ads fee will not exceed $100 for a single order.",
  },
  {
    title: "Not every order has this fee",
    description:
      "Offsite Ads fees only apply to orders attributed to Etsy’s offsite advertising, not every Etsy order.",
  },
  {
    title: "Margin planning matters",
    description:
      "Because Offsite Ads fees can be meaningful, sellers should price with enough margin for attributed orders.",
  },
];

const mistakes = [
  "Pricing products without leaving room for possible Offsite Ads fees.",
  "Assuming every Etsy order has an Offsite Ads fee.",
  "Assuming no Etsy order will have an Offsite Ads fee.",
  "Running discounts on products that already have thin margins after ad fees.",
  "Treating Offsite Ads revenue as profit before subtracting product cost, shipping, packaging, and labor.",
  "Ignoring whether a product can still be profitable if an attributed order has a 12% or 15% ad fee.",
];

const checklist = [
  "Item sale price.",
  "Shipping charged to the buyer.",
  "Etsy transaction fee and listing fee.",
  "Payment processing fee.",
  "Possible Offsite Ads fee.",
  "Product cost, materials, and labor.",
  "Shipping label and packaging cost.",
  "Discounts, refunds, replacements, or return allowance.",
];

const relatedTools = [
  {
    title: "Etsy Ad ROI Calculator",
    href: "/etsy/ad-roi-calculator",
  },
  {
    title: "Etsy Fee Calculator",
    href: "/etsy/fee-calculator",
  },
  {
    title: "Etsy Profit Calculator",
    href: "/etsy/profit-calculator",
  },
  {
    title: "Etsy Pricing Calculator",
    href: "/etsy/pricing-calculator",
  },
];

const workflow = [
  {
    title: "Estimate normal fees",
    description:
      "Start with listing fees, transaction fees, and payment processing before adding ad-related costs.",
  },
  {
    title: "Add ad fee risk",
    description:
      "Test whether the order still works if an Offsite Ads fee applies to the sale.",
  },
  {
    title: "Check margin",
    description:
      "Compare profit margin before and after ad fees, discounts, shipping, labor, and product cost.",
  },
  {
    title: "Adjust pricing",
    description:
      "Raise price, reduce costs, limit discounts, or avoid promoting products with weak ad-attributed margin.",
  },
];

export default function EtsyOffsiteAdsFeesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Offsite Ads Fees Explained
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy Offsite Ads can bring extra traffic from external advertising,
          but attributed orders may include an additional ad fee. Sellers should
          understand how this fee affects profit, pricing, discounts, and margin
          before relying on ad-attributed sales.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Etsy Offsite Ads fee basics sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {offsiteAdBasics.map((item) => (
            <div key={item.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why Offsite Ads fees matter
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Offsite Ads fees can reduce profit on attributed orders. A product
              that looks profitable after standard Etsy fees may become
              low-margin if an additional ad fee applies.
            </p>

            <p>
              Etsy states that Offsite Ads fees can be 15% for some shops or
              12% for shops that qualify for the discounted required tier, with
              a $100 maximum fee per order. Actual eligibility and fee treatment
              should be confirmed in your Etsy account and Etsy’s current help
              documentation.
            </p>

            <p>
              A safer approach is to test pricing both with and without Offsite
              Ads fees so you know whether attributed orders still support your
              product margin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy Offsite Ads mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {mistakes.map((mistake) => (
              <li key={mistake} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Etsy Offsite Ads calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate ad ROI, Etsy fees, profit, and pricing
          before assuming an ad-attributed order is profitable.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Simple Etsy Offsite Ads workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {workflow.map((step) => (
            <div key={step.title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{step.title}</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Etsy sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            How Offsite Ads affect Etsy pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Higher fee pressure:</strong>{" "}
              An attributed order can have more fee pressure than a normal Etsy
              sale, so thin-margin products need extra caution.
            </p>

            <p>
              <strong className="text-gray-950">Discount stacking:</strong>{" "}
              Discounts, free shipping, and Offsite Ads fees can stack together
              and reduce profit faster than expected.
            </p>

            <p>
              <strong className="text-gray-950">Product selection:</strong>{" "}
              Products with stronger margins, higher order values, or efficient
              shipping are usually easier to support if ad fees apply.
            </p>

            <p>
              <strong className="text-gray-950">Pricing buffer:</strong>{" "}
              Sellers may need extra margin in pricing so attributed orders can
              remain profitable after ad fees and other costs.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Etsy Offsite Ads policies, fee rates, attribution rules, seller
          eligibility, and marketplace charges can change. This guide is for
          planning purposes. Always confirm current Offsite Ads details in your
          Etsy account and official Etsy seller resources.
        </p>
      </section>
    </main>
  );
}