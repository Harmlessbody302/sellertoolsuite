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
        : status === "Moderate"
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
        : status === "Moderate"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function AmazonFeeCalculatorPage() {
  const [salePrice, setSalePrice] = useState(35);
  const [referralFeeRate, setReferralFeeRate] = useState(15);
  const [fbaFulfillmentFee, setFbaFulfillmentFee] = useState(5.25);
  const [monthlyStorageCost, setMonthlyStorageCost] = useState(0.4);
  const [inboundPlacementFee, setInboundPlacementFee] = useState(0.5);
  const [closingFee, setClosingFee] = useState(0);
  const [returnProcessingCost, setReturnProcessingCost] = useState(1);
  const [otherFees, setOtherFees] = useState(0);

  const result = useMemo(() => {
    const referralRate = Math.min(95, Math.max(0, referralFeeRate));

    const referralFee = salePrice * (referralRate / 100);

    const fulfillmentAndStorage =
      fbaFulfillmentFee + monthlyStorageCost + inboundPlacementFee;

    const riskAndOtherFees = closingFee + returnProcessingCost + otherFees;

    const totalFees =
      referralFee +
      fbaFulfillmentFee +
      monthlyStorageCost +
      inboundPlacementFee +
      closingFee +
      returnProcessingCost +
      otherFees;

    const feePercentage = salePrice > 0 ? (totalFees / salePrice) * 100 : 0;
    const netAfterFees = salePrice - totalFees;

    let status = "Healthy";
    let statusText =
      "Your Amazon fee load appears manageable based on the sale price entered.";
    let recommendation =
      "Use this fee estimate alongside product cost, PPC, inbound shipping, prep, and return assumptions before deciding whether the product is viable.";

    if (feePercentage >= 45) {
      status = "High";
      statusText =
        "Amazon fees are consuming a large share of the sale price.";
      recommendation =
        "Review FBA size tier, referral fee category, storage exposure, placement fees, and price competitiveness before scaling.";
    } else if (feePercentage >= 30) {
      status = "Moderate";
      statusText =
        "Amazon fees are meaningful and should be watched closely.";
      recommendation =
        "Make sure your gross margin can absorb fees, PPC, returns, storage, and price competition.";
    } else if (feePercentage < 20) {
      status = "Strong";
      statusText =
        "Amazon fees are relatively low compared with the sale price.";
      recommendation =
        "This fee structure may leave more room for product cost, ads, returns, and profit.";
    }

    const getScenarioStatus = (percentage: number) => {
      if (percentage >= 45) return "High";
      if (percentage >= 30) return "Moderate";
      if (percentage < 20) return "Strong";
      return "Healthy";
    };

    const scenarios = [10, 12, 15, 18, 20].map((rate) => {
      const scenarioReferral = salePrice * (rate / 100);

      const scenarioTotal =
        scenarioReferral +
        fbaFulfillmentFee +
        monthlyStorageCost +
        inboundPlacementFee +
        closingFee +
        returnProcessingCost +
        otherFees;

      const scenarioPercent =
        salePrice > 0 ? (scenarioTotal / salePrice) * 100 : 0;

      const scenarioNet = salePrice - scenarioTotal;

      return {
        rate,
        totalFees: scenarioTotal,
        feePercentage: scenarioPercent,
        netAfterFees: scenarioNet,
        referralFee: scenarioReferral,
        status: getScenarioStatus(scenarioPercent),
      };
    });

    return {
      referralFee,
      fulfillmentAndStorage,
      riskAndOtherFees,
      totalFees,
      feePercentage,
      netAfterFees,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    referralFeeRate,
    fbaFulfillmentFee,
    monthlyStorageCost,
    inboundPlacementFee,
    closingFee,
    returnProcessingCost,
    otherFees,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const feeTone =
    result.feePercentage >= 45
      ? "bad"
      : result.feePercentage >= 30
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon referral fees, FBA fulfillment fees, storage costs,
          inbound placement fees, return processing, closing fees, and total fee
          impact before pricing or sourcing a product.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Fee inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your sale price, referral fee rate, FBA fees, storage,
            placement, return processing, and any additional Amazon-related
            fees.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Referral fee rate"
                  suffix="%"
                  value={referralFeeRate}
                  onChange={setReferralFeeRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                FBA fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="FBA fulfillment fee"
                  prefix="$"
                  value={fbaFulfillmentFee}
                  onChange={setFbaFulfillmentFee}
                />

                <NumberInput
                  label="Monthly storage cost per unit"
                  prefix="$"
                  value={monthlyStorageCost}
                  onChange={setMonthlyStorageCost}
                />

                <NumberInput
                  label="Inbound placement fee"
                  prefix="$"
                  value={inboundPlacementFee}
                  onChange={setInboundPlacementFee}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Other Amazon fees
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Closing fee"
                  prefix="$"
                  value={closingFee}
                  onChange={setClosingFee}
                />

                <NumberInput
                  label="Return processing cost"
                  prefix="$"
                  value={returnProcessingCost}
                  onChange={setReturnProcessingCost}
                />

                <NumberInput
                  label="Other Amazon fees"
                  prefix="$"
                  value={otherFees}
                  onChange={setOtherFees}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon referral fees, FBA
            fulfillment fees, storage costs, placement fees, closing fees, return
            processing costs, taxes, and product-specific fees may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon fee breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Total Amazon fees"
              value={toMoney(result.totalFees)}
              helper="All entered Amazon fee assumptions combined"
              tone={feeTone}
            />

            <MetricCard
              label="Fee percentage"
              value={percent(result.feePercentage)}
              helper="Total fees divided by sale price"
              tone={feeTone}
            />

            <MetricCard
              label="Revenue after Amazon fees"
              value={toMoney(result.netAfterFees)}
              helper="Sale price minus estimated Amazon fees"
              tone={result.netAfterFees > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Referral fee"
              value={toMoney(result.referralFee)}
              helper="Sale price multiplied by referral fee rate"
              tone="warning"
            />

            <MetricCard
              label="Fulfillment and storage"
              value={toMoney(result.fulfillmentAndStorage)}
              helper="FBA fulfillment, storage, and inbound placement fees"
              tone="warning"
            />

            <MetricCard
              label="Return / closing / other fees"
              value={toMoney(result.riskAndOtherFees)}
              helper="Return processing, closing fee, and extra fees"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Total estimated Amazon fees are{" "}
                <strong>{toMoney(result.totalFees)}</strong>, which is about{" "}
                <strong>{percent(result.feePercentage)}</strong> of the sale
                price.
              </p>

              <p>
                After estimated Amazon fees, you would have{" "}
                <strong>{toMoney(result.netAfterFees)}</strong> left before
                product cost, PPC, inbound shipping, prep, and other non-Amazon
                costs.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Referral fee comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Referral rate</th>
                    <th className="px-4 py-3">Referral fee</th>
                    <th className="px-4 py-3">Total fees</th>
                    <th className="px-4 py-3">Fee %</th>
                    <th className="px-4 py-3">Revenue after fees</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === referralFeeRate
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">
                        {toMoney(row.referralFee)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.totalFees)}</td>
                      <td className="px-4 py-3">
                        {percent(row.feePercentage)}
                      </td>
                      <td className="px-4 py-3">
                        {toMoney(row.netAfterFees)}
                      </td>
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
          How to use this Amazon Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add the expected Amazon selling price before product cost, PPC, and other seller expenses.",
            ],
            [
              "Add referral fee",
              "Use the referral fee rate for the product category you are estimating.",
            ],
            [
              "Include FBA fees",
              "Add fulfillment, storage, placement, return processing, and closing fees when relevant.",
            ],
            [
              "Review fee load",
              "Compare total fees against sale price before sourcing, pricing, or scaling inventory.",
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
            Common Amazon fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Using a generic referral fee rate without checking the product category.",
              "Forgetting FBA fulfillment, storage, placement, and return processing fees.",
              "Treating revenue after Amazon fees as profit before product cost and PPC.",
              "Ignoring closing fees or category-specific charges when they apply.",
              "Pricing products without enough room for storage, returns, and fee changes.",
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
            Understanding your Amazon fee results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Fees are a
              relatively small share of sale price and may leave more room for
              product cost, PPC, and profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The fee
              load appears manageable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Fees are
              meaningful and should be checked against product margin and PPC
              needs.
            </p>

            <p>
              <strong className="text-red-700">High:</strong> Amazon fees are
              consuming a large share of the sale price.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce Amazon fee pressure
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Check size tier",
              "Review product dimensions and weight because FBA size tier can heavily affect fees.",
            ],
            [
              "Watch storage exposure",
              "Avoid holding slow inventory that increases storage cost and weakens margin.",
            ],
            [
              "Review category fees",
              "Confirm the correct referral fee rate before pricing or sourcing a product.",
            ],
            [
              "Build margin buffer",
              "Leave room for returns, placement fees, PPC, discounts, and future fee changes.",
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
            ["/amazon/pricing-calculator", "Pricing Calculator"],
            ["/amazon/break-even-calculator", "Break-Even Calculator"],
            ["/amazon/ppc-roi-calculator", "PPC ROI Calculator"],
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