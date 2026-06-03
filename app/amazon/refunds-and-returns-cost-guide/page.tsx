import Link from "next/link";

const refundFactors = [
  {
    title: "Full refunds",
    description:
      "A full refund can remove the order revenue while the seller may still have product cost, Amazon fees, shipping, prep, packaging, or PPC already spent.",
  },
  {
    title: "Partial refunds",
    description:
      "A partial refund reduces order revenue and may be used to resolve condition issues, delivery problems, damaged packaging, or customer complaints.",
  },
  {
    title: "Return shipping",
    description:
      "Return labels, return handling, carrier issues, and replacement shipments can add cost after the original Amazon order.",
  },
  {
    title: "Damaged or unsellable inventory",
    description:
      "Returned items may not be resellable at the original price if they are opened, damaged, missing parts, or no longer in new condition.",
  },
  {
    title: "Replacement shipments",
    description:
      "A replacement order may require another unit, another package, another shipping label, and additional handling time.",
  },
  {
    title: "Cases and disputes",
    description:
      "Customer claims, account issues, reimbursements, chargebacks, case losses, and support time can reduce profit after the sale.",
  },
];

const calculators = [
  ["/amazon/refund-impact-calculator", "Amazon Refund Impact Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/product-cost-calculator", "Amazon Product Cost Calculator"],
  ["/amazon/listing-roi-calculator", "Amazon Listing ROI Calculator"],
];

const workflow = [
  {
    title: "Start with order profit",
    description:
      "Estimate normal profit after product cost, referral fees, fulfillment, PPC, storage, and other costs.",
  },
  {
    title: "Apply refund cost",
    description:
      "Subtract full refunds, partial refunds, return shipping, replacement cost, item loss, and case losses.",
  },
  {
    title: "Check remaining margin",
    description:
      "Review whether the order or listing still remains profitable after refund-related costs.",
  },
  {
    title: "Update pricing",
    description:
      "Build realistic refund, return, damage, and support allowance into future pricing if issues are common.",
  },
];

export default function AmazonRefundsAndReturnsCostGuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Refunds and Returns Cost Guide
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon refunds, returns, partial refunds, damaged inventory,
          replacement shipments, return shipping, cases, and customer support
          can reduce profit even when the original order looked healthy. Sellers
          should estimate refund and return costs before pricing, advertising,
          restocking, or scaling products.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon refund and return costs sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {refundFactors.map((factor) => (
            <div key={factor.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{factor.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why Amazon refund and return costs matter
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A refund does not always erase only the original sale. The seller
              may have already paid product cost, Amazon fees, fulfillment
              costs, prep, packaging, storage, PPC, labor, or shipping before
              the buyer receives the money back.
            </p>

            <p>
              Returns can be especially expensive when the item cannot be resold
              at the same price, arrives damaged, requires testing or cleaning,
              creates customer support work, or causes additional shipping and
              replacement cost.
            </p>

            <p>
              The safest approach is to build a realistic refund and return
              allowance into pricing, then review actual Amazon return reasons
              so weak products, unclear listings, poor packaging, or risky
              fulfillment choices can be fixed.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon refund mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating refunded revenue as if it still produced profit.",
              "Forgetting shipping label cost, packaging, prep, PPC, and support time already spent.",
              "Assuming every returned item can be resold at the original sale price.",
              "Ignoring return shipping, replacement shipments, damaged inventory, or case losses.",
              "Restocking products with repeated return issues before fixing product quality or listing accuracy.",
              "Pricing products without a refund, return, damaged-item, or customer support allowance.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Amazon refund calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate refund impact, profit after seller costs,
          product cost, pricing room, and listing-level return risk before
          scaling or promoting products.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Simple Amazon refund cost workflow
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
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Original order revenue and profit before refunds.",
              "Full refund amount, partial refund amount, and case/dispute losses.",
              "Product cost, Amazon fees, fulfillment cost, storage, PPC, prep, and packaging already spent.",
              "Return shipping, replacement shipment, support time, and restocking or inspection cost.",
              "Returned item resale value, damaged item loss, missing parts, and unsellable inventory.",
              "Return reason patterns, listing accuracy, product quality, packaging quality, and buyer expectations.",
            ].map((item) => (
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
            How refunds affect Amazon pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Low-margin products:</strong>{" "}
              Refunds are harder to absorb when a product already has limited
              profit after Amazon fees, fulfillment, PPC, and product cost.
            </p>

            <p>
              <strong className="text-gray-950">Fragile products:</strong>{" "}
              Fragile, heavy, oversized, or delicate items may need stronger
              packaging, more margin, insurance, or more selective shipping
              settings.
            </p>

            <p>
              <strong className="text-gray-950">Used or condition-sensitive products:</strong>{" "}
              Items with condition expectations may need clearer photos, testing
              notes, condition details, and return expectations.
            </p>

            <p>
              <strong className="text-gray-950">Repeat issues:</strong> If one
              product causes repeated refunds or returns, the listing may need
              new photos, clearer copy, better packaging, product fixes, or a
              higher price.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce Amazon refund and return costs
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve listing accuracy",
              "Use clear titles, exact condition notes, measurements, compatibility details, defect notes, and item specifics.",
            ],
            [
              "Improve photos",
              "Show real item condition, flaws, scale, labels, serial/model details, and important buyer expectations.",
            ],
            [
              "Improve packaging",
              "Use stronger boxes, padding, waterproofing, and safer handling for fragile or valuable items.",
            ],
            [
              "Track return reasons",
              "Review return patterns so weak products, unclear listings, bad packaging, or shipping issues can be fixed.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm leading-6 text-amber-900">
          Amazon refund policies, return rules, seller protections, buyer
          disputes, reimbursements, return shipping costs, damaged package
          claims, taxes, and marketplace rules can change. This guide is for
          planning purposes. Always confirm current refund and return details in
          your Amazon seller account and official Amazon seller resources.
        </p>
      </section>
    </main>
  );
}