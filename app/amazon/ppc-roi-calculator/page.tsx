"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { toMoney } from "@/lib/etsyCalculations";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "warning" | "bad" | "blue";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? (
        <p className="mt-2 text-sm leading-5 text-gray-600">{helper}</p>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Weak"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${style}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const style =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Weak"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function AmazonPpcRoiCalculatorPage() {
  const [salePrice, setSalePrice] = useState(35);
  const [productCost, setProductCost] = useState(10);
  const [amazonFees, setAmazonFees] = useState(10.9);
  const [adSpendPerSale, setAdSpendPerSale] = useState(4);
  const [conversionRate, setConversionRate] = useState(12);
  const [clickCost, setClickCost] = useState(0.48);
  const [organicSalesLift, setOrganicSalesLift] = useState(20);

  const result = useMemo(() => {
    const conversion = Math.max(0.01, conversionRate);
    const lift = Math.max(0, organicSalesLift);

    const profitBeforeAds = salePrice - productCost - amazonFees;
    const netProfit = profitBeforeAds - adSpendPerSale;

    const acos = salePrice > 0 ? (adSpendPerSale / salePrice) * 100 : 0;

    const tacos =
      salePrice > 0
        ? ((adSpendPerSale * (100 / (100 + lift))) / salePrice) * 100
        : 0;

    const roi =
      adSpendPerSale > 0 ? (netProfit / adSpendPerSale) * 100 : 0;

    const clicksPerSale = 100 / conversion;

    const breakEvenCpc =
      clicksPerSale > 0 ? profitBeforeAds / clicksPerSale : 0;

    const estimatedClicks = adSpendPerSale > 0 && clickCost > 0
      ? adSpendPerSale / clickCost
      : 0;

    const estimatedOrdersFromClicks =
      estimatedClicks * (conversion / 100);

    const maxBreakEvenAdSpend = Math.max(0, profitBeforeAds);

    const currentCpcGap = breakEvenCpc - clickCost;

    let status = "Healthy";
    let statusText =
      "Your Amazon PPC assumptions appear profitable after ad spend.";
    let recommendation =
      "This campaign may be workable if conversion rate, CPC, and product margin remain stable.";

    if (netProfit <= 0) {
      status = "Losing Money";
      statusText =
        "The current PPC assumptions may be causing the product to lose money after ads.";
      recommendation =
        "Lower CPC, reduce ad spend, improve conversion rate, raise price, or improve product margin before scaling.";
    } else if (roi < 25) {
      status = "Weak";
      statusText =
        "The campaign appears profitable, but the return is weak.";
      recommendation =
        "Review search terms, bids, conversion rate, listing quality, and organic lift before increasing spend.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "The campaign appears to generate strong return after Amazon fees and product cost.";
      recommendation =
        "This may be a strong campaign candidate if TACoS, organic rank, and inventory position also look healthy.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioRoi: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioRoi < 25) return "Weak";
      if (scenarioRoi >= 100) return "Strong";
      return "Healthy";
    };

    const scenarios = [
      { label: "-20% ad spend", spend: adSpendPerSale * 0.8 },
      { label: "Current", spend: adSpendPerSale },
      { label: "+20% ad spend", spend: adSpendPerSale * 1.2 },
      { label: "+40% ad spend", spend: adSpendPerSale * 1.4 },
      { label: "+60% ad spend", spend: adSpendPerSale * 1.6 },
    ].map((scenario) => {
      const profit = profitBeforeAds - scenario.spend;
      const scenarioRoi =
        scenario.spend > 0 ? (profit / scenario.spend) * 100 : 0;
      const scenarioAcos =
        salePrice > 0 ? (scenario.spend / salePrice) * 100 : 0;
      const scenarioTacos =
        salePrice > 0
          ? ((scenario.spend * (100 / (100 + lift))) / salePrice) * 100
          : 0;

      return {
        ...scenario,
        profit,
        roi: scenarioRoi,
        acos: scenarioAcos,
        tacos: scenarioTacos,
        status: getScenarioStatus(profit, scenarioRoi),
      };
    });

    return {
      profitBeforeAds,
      netProfit,
      acos,
      tacos,
      roi,
      clicksPerSale,
      breakEvenCpc,
      estimatedClicks,
      estimatedOrdersFromClicks,
      maxBreakEvenAdSpend,
      currentCpcGap,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    amazonFees,
    adSpendPerSale,
    conversionRate,
    clickCost,
    organicSalesLift,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;
  const number = (value: number) => value.toFixed(1);

  const roiTone =
    result.netProfit <= 0
      ? "bad"
      : result.roi < 25
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon PPC ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Measure Amazon ad profitability using ACoS, TACoS, ROI, break-even
          CPC, conversion rate, ad spend per sale, and pricing scenarios.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">PPC inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale economics, Amazon fees, ad cost per sale, conversion
            rate, click cost, and organic lift to estimate campaign
            profitability.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Product economics
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Product cost"
                  prefix="$"
                  value={productCost}
                  onChange={setProductCost}
                />

                <NumberInput
                  label="Amazon fees"
                  prefix="$"
                  value={amazonFees}
                  onChange={setAmazonFees}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Advertising assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Ad spend per sale"
                  prefix="$"
                  value={adSpendPerSale}
                  onChange={setAdSpendPerSale}
                />

                <NumberInput
                  label="Conversion rate"
                  suffix="%"
                  value={conversionRate}
                  onChange={setConversionRate}
                />

                <NumberInput
                  label="Average click cost"
                  prefix="$"
                  value={clickCost}
                  onChange={setClickCost}
                />

                <NumberInput
                  label="Organic sales lift"
                  suffix="%"
                  value={organicSalesLift}
                  onChange={setOrganicSalesLift}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon PPC performance can
            vary based on CPC, conversion rate, placement, search terms,
            organic rank, competition, reviews, product margin, and attribution.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon PPC profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net profit after ads"
              value={toMoney(result.netProfit)}
              helper="Profit after product cost, Amazon fees, and ad spend"
              tone={roiTone}
            />

            <MetricCard
              label="Ad ROI"
              value={percent(result.roi)}
              helper="Net profit divided by ad spend"
              tone={roiTone}
            />

            <MetricCard
              label="ACoS"
              value={percent(result.acos)}
              helper="Ad spend divided by attributed sales"
              tone="warning"
            />

            <MetricCard
              label="TACoS estimate"
              value={percent(result.tacos)}
              helper="Ad spend adjusted for estimated organic lift"
              tone="blue"
            />

            <MetricCard
              label="Break-even CPC"
              value={toMoney(result.breakEvenCpc)}
              helper="Estimated maximum CPC before ad profit reaches zero"
              tone={result.currentCpcGap >= 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Current CPC gap"
              value={toMoney(result.currentCpcGap)}
              helper="Break-even CPC minus current average click cost"
              tone={result.currentCpcGap >= 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Profit before ads"
              value={toMoney(result.profitBeforeAds)}
              helper="Sale price minus product cost and Amazon fees"
              tone="blue"
            />

            <MetricCard
              label="Max break-even ad spend"
              value={toMoney(result.maxBreakEvenAdSpend)}
              helper="Ad spend per sale that would reduce profit to zero"
              tone="warning"
            />

            <MetricCard
              label="Clicks per sale"
              value={`${number(result.clicksPerSale)} clicks`}
              helper="Estimated clicks needed to generate one order"
            />

            <MetricCard
              label="Estimated clicks"
              value={`${number(result.estimatedClicks)} clicks`}
              helper="Ad spend per sale divided by average click cost"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Current ad ROI is <strong>{percent(result.roi)}</strong>. Net
                profit after ads is{" "}
                <strong>{toMoney(result.netProfit)}</strong>, compared with{" "}
                <strong>{toMoney(result.profitBeforeAds)}</strong> before ad
                spend.
              </p>

              <p>
                ACoS is <strong>{percent(result.acos)}</strong>, while the
                TACoS estimate is <strong>{percent(result.tacos)}</strong> after
                accounting for the organic lift assumption.
              </p>

              <p>
                Your estimated break-even CPC is{" "}
                <strong>{toMoney(result.breakEvenCpc)}</strong>. Current average
                CPC is{" "}
                <strong>
                  {result.currentCpcGap >= 0 ? "below" : "above"}
                </strong>{" "}
                that break-even level by{" "}
                <strong>{toMoney(Math.abs(result.currentCpcGap))}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Ad spend comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Ad spend</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">ACoS</th>
                    <th className="px-4 py-3">TACoS</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Current" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.spend)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
                      <td className="px-4 py-3">{percent(row.acos)}</td>
                      <td className="px-4 py-3">{percent(row.tacos)}</td>
                      <td className="px-4 py-3">
                        <SmallStatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Amazon PPC ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product margin",
              "Add sale price, product cost, and Amazon fees to estimate profit before ads.",
            ],
            [
              "Add ad spend",
              "Enter ad spend per sale, average click cost, and conversion rate.",
            ],
            [
              "Review ACoS",
              "Compare ACoS, TACoS, net profit, break-even CPC, and ad ROI.",
            ],
            [
              "Compare scaling",
              "Use ad spend scenarios before increasing bids, budgets, or campaign coverage.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon PPC mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging ads by sales revenue instead of profit after ad spend.",
              "Ignoring product cost, Amazon fees, returns, and fulfillment costs when reviewing ACoS.",
              "Increasing bids before improving conversion rate, listing quality, and review strength.",
              "Treating all attributed ad sales as incremental sales without checking organic lift.",
              "Scaling campaigns with weak break-even CPC or thin product margin.",
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

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Understanding your PPC results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> PPC appears
              to generate strong profit relative to ad spend.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> PPC appears
              profitable, but conversion rate, CPC, and organic lift should
              still be monitored.
            </p>

            <p>
              <strong className="text-amber-700">Weak:</strong> PPC is
              profitable or close to profitable, but the return may be too low
              for aggressive scaling.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Ad spend
              may be exceeding the profit available before ads.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve Amazon PPC ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower CPC",
              "Reduce bids on weak keywords, placements, or campaigns that do not convert profitably.",
            ],
            [
              "Improve conversion",
              "Upgrade images, title, offer quality, reviews, pricing, and product detail content.",
            ],
            [
              "Protect margin",
              "Avoid pushing ad spend beyond the profit available before advertising.",
            ],
            [
              "Track TACoS",
              "Watch total advertising cost against organic lift and overall account sales.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Amazon seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/amazon/fba-profit-calculator", "FBA Profit Calculator"],
            ["/amazon/fee-calculator", "Fee Calculator"],
            ["/amazon/pricing-calculator", "Pricing Calculator"],
            ["/amazon/break-even-calculator", "Break-Even Calculator"],
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
    </main>
  );
}