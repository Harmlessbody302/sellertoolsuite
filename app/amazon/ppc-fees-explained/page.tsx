import Link from "next/link";

const ppcFactors = [
  {
    title: "Ad spend",
    description:
      "Amazon PPC cost is the amount spent on ads during a campaign or review period. It should be treated as a selling cost, not just a marketing experiment.",
  },
  {
    title: "Cost per click",
    description:
      "Cost per click is the average amount paid when shoppers click an ad. Higher CPC can reduce profit quickly if conversion or margin is weak.",
  },
  {
    title: "Conversion rate",
    description:
      "PPC traffic only helps when clicks turn into profitable orders. Weak conversion can create ad spend without enough sales.",
  },
  {
    title: "ACOS and TACOS",
    description:
      "ACOS compares ad spend to ad sales. TACOS compares ad spend to total sales. Both can help sellers understand advertising pressure.",
  },
  {
    title: "Profit after ads",
    description:
      "A campaign can create sales and still reduce profit if product cost, Amazon fees, fulfillment, refunds, storage, and PPC are not included.",
  },
  {
    title: "Keyword and campaign quality",
    description:
      "Broad, weak, or poorly matched keywords can create clicks without profitable orders. Campaigns should be reviewed by profit, not clicks alone.",
  },
];

const calculators = [
  ["/amazon/ppc-roi-calculator", "Amazon PPC ROI Calculator"],
  ["/amazon/profit-calculator", "Amazon Profit Calculator"],
  ["/amazon/listing-roi-calculator", "Amazon Listing ROI Calculator"],
  ["/amazon/conversion-rate-calculator", "Amazon Conversion Rate Calculator"],
];

const workflow = [
  {
    title: "Check profit first",
    description:
      "Estimate normal product profit after Amazon fees, fulfillment, product cost, refunds, and storage.",
  },
  {
    title: "Add PPC spend",
    description:
      "Include campaign spend, average CPC, expected clicks, and expected conversion rate.",
  },
  {
    title: "Review ad profit",
    description:
      "Compare ad-attributed sales, ad spend, profit after ads, ACOS, TACOS, and net margin.",
  },
  {
    title: "Scale carefully",
    description:
      "Increase spend only when orders remain profitable after all Amazon and product costs are included.",
  },
];

export default function AmazonPpcFeesExplainedPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Guide
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon PPC Fees Explained
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Amazon PPC can help products get visibility and sales, but ad spend
          can reduce profit quickly if product cost, referral fees, FBA or FBM
          fulfillment, storage, refunds, conversion rate, and margin are not
          checked first.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon PPC cost basics sellers should understand
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {ppcFactors.map((factor) => (
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
            Why Amazon PPC cost planning matters
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              PPC can help a product get clicks, data, and sales, but a campaign
              can still weaken profit if the ad cost per order is higher than
              the margin available after Amazon fees, fulfillment, product cost,
              storage, and refunds.
            </p>

            <p>
              Sellers should judge campaigns by profit and return, not just
              impressions, clicks, orders, or ad-attributed revenue. More sales
              are only useful when the resulting orders remain profitable.
            </p>

            <p>
              The safest approach is to estimate product profit before launching
              ads, test PPC with controlled spend, then scale only the keywords
              and campaigns that support real net profit.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon PPC mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging PPC by clicks or sales instead of profit after all costs.",
              "Increasing ad spend before checking product margin and conversion rate.",
              "Ignoring referral fees, FBA fees, FBM shipping, storage, refunds, and product cost.",
              "Letting broad keywords spend money without profitable orders.",
              "Using coupons, deals, and PPC together without checking combined margin pressure.",
              "Scaling campaigns before reviewing search terms, ACOS, TACOS, and refund-adjusted profit.",
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
          Useful Amazon PPC calculators
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-700">
          Use these tools to estimate PPC return, listing ROI, conversion rate,
          profit after ads, and whether a product has enough margin to support
          advertising.
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
          Simple Amazon PPC review workflow
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
              "Product sale price, product cost, referral fee, and fulfillment cost.",
              "FBA storage cost or FBM shipping, packaging, handling, and seller labor.",
              "Campaign spend, cost per click, clicks, orders, ad sales, and total sales.",
              "Conversion rate, ACOS, TACOS, cost per order, and profit after ads.",
              "Refunds, returns, damaged inventory, customer issues, and replacement risk.",
              "Keyword quality, search term performance, bid changes, budgets, and placement settings.",
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
            How Amazon PPC affects pricing
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-gray-950">Thin-margin products:</strong>{" "}
              PPC can erase profit quickly if the product does not have enough
              margin after Amazon fees, fulfillment, and product cost.
            </p>

            <p>
              <strong className="text-gray-950">Launch campaigns:</strong> PPC
              may help collect data and early sales, but the cost should still
              be measured against expected long-term profit.
            </p>

            <p>
              <strong className="text-gray-950">Coupons and deals:</strong>{" "}
              Discounts stacked with PPC can create sales while reducing net
              margin faster than expected.
            </p>

            <p>
              <strong className="text-gray-950">Scaling spend:</strong> Higher
              ad spend should be supported by conversion, margin, inventory
              availability, and fulfillment capacity.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Amazon PPC signals to review
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "High clicks, low orders",
              "The listing may have weak conversion, poor keyword match, price issues, or buyer trust problems.",
            ],
            [
              "Sales but weak profit",
              "The campaign may be driving orders, but product margin may not support the ad spend.",
            ],
            [
              "Strong ACOS but weak TACOS",
              "Ad-attributed sales may look good while total business profitability still needs review.",
            ],
            [
              "Profitable campaign",
              "The campaign may be worth scaling when orders remain profitable after all Amazon and product costs.",
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
          Amazon PPC results, bid costs, keyword performance, ad attribution,
          ACOS, TACOS, referral fees, FBA fees, FBM shipping costs, storage
          costs, refunds, taxes, and marketplace policies can change. This guide
          is for planning purposes. Always compare estimated ad impact with
          actual Amazon campaign reports and current seller account data.
        </p>
      </section>
    </main>
  );
}