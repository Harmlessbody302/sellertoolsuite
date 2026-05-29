import Link from "next/link";

export default function HowEtsyFeesWorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          How Etsy Fees Work
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Etsy sellers need to account for listing fees, transaction fees,
          payment processing fees, shipping-related costs, advertising costs,
          discounts, refunds, and optional offsite ad fees. These costs can
          reduce profit quickly if they are not included in your pricing.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          The main Etsy fees sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [
              "Listing fees",
              "A fee charged when you create or renew a listing. This is usually small, but it adds up across many products.",
            ],
            [
              "Transaction fees",
              "A percentage-based fee applied to the sale amount. This can include the item price and amounts charged to the buyer.",
            ],
            [
              "Payment processing fees",
              "Fees connected to processing the buyer’s payment. These often include both a percentage and a fixed amount.",
            ],
            [
              "Offsite ad fees",
              "Optional or account-dependent advertising fees that may apply when a sale comes from Etsy’s external advertising.",
            ],
            [
              "Shipping costs",
              "The actual cost of labels, postage, shipping supplies, and any shipping subsidy you provide to the buyer.",
            ],
            [
              "Discounts and refunds",
              "Coupons, sales, partial refunds, and returns can reduce your real profit even if the original sale looked profitable.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Why estimating Etsy fees matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A product can look profitable from the sale price alone, but the
              actual margin may be much lower after fees, shipping, packaging,
              materials, ads, and discounts are included.
            </p>

            <p>
              Fee estimates help you decide whether your price is high enough,
              whether a discount is safe, and whether a product is worth
              promoting.
            </p>

            <p>
              The safest approach is to calculate fees before launching a
              product, then review actual results after sales begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing products based only on material cost.",
              "Forgetting payment processing fixed fees.",
              "Ignoring shipping supplies and postage costs.",
              "Running discounts without checking margin first.",
              "Treating revenue as profit.",
              "Not accounting for ad spend or offsite ad fees.",
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

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Useful Etsy fee calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Use these tools to estimate fees, profit, pricing, ad impact, and
          break-even points before making seller decisions.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/fee-calculator", "Etsy Fee Calculator"],
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
          ].map(([href, label]) => (
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
          Simple Etsy fee workflow
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Estimate fees",
              "Start with your listing price, shipping charged, and expected fee settings.",
            ],
            [
              "Subtract costs",
              "Include product costs, packaging, shipping paid by you, labor, and supplies.",
            ],
            [
              "Check margin",
              "Make sure the remaining profit margin is high enough to support your business.",
            ],
            [
              "Test scenarios",
              "Compare discounts, ads, and different prices before changing your listing.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        Etsy fees, payment processing, ad costs, and seller rules can change.
        This guide is for planning purposes. Always confirm current fee details
        in your Etsy account and official Etsy seller resources.
      </section>
    </main>
  );
}