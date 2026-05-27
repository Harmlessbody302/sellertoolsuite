"use client";

import { useMemo, useState } from "react";

export default function AmazonFeeCalculator() {
  const [salePrice, setSalePrice] = useState("35");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [fbaFulfillmentFee, setFbaFulfillmentFee] = useState("5.25");
  const [monthlyStorageCost, setMonthlyStorageCost] = useState("0.40");
  const [inboundPlacementFee, setInboundPlacementFee] = useState("0.50");
  const [closingFee, setClosingFee] = useState("0");
  const [returnProcessingCost, setReturnProcessingCost] = useState("1");
  const [otherFees, setOtherFees] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const referralRate = Number(referralFeeRate) || 0;
    const fulfillment = Number(fbaFulfillmentFee) || 0;
    const storage = Number(monthlyStorageCost) || 0;
    const inboundPlacement = Number(inboundPlacementFee) || 0;
    const closing = Number(closingFee) || 0;
    const returns = Number(returnProcessingCost) || 0;
    const extra = Number(otherFees) || 0;

    const referralFee = price * (referralRate / 100);
    const totalFees =
      referralFee +
      fulfillment +
      storage +
      inboundPlacement +
      closing +
      returns +
      extra;

    const feePercentage = price > 0 ? (totalFees / price) * 100 : 0;
    const netAfterFees = price - totalFees;

    let status = "Healthy";
    let statusText =
      "Your Amazon fee load appears manageable based on the sale price entered.";
    let recommendation =
      "Use this fee estimate alongside product cost, PPC, and return assumptions before deciding whether the product is viable.";

    if (feePercentage >= 45) {
      status = "High";
      statusText =
        "Amazon fees are consuming a large share of the sale price.";
      recommendation =
        "Review FBA size tier, referral fee category, storage exposure, and price competitiveness before scaling.";
    } else if (feePercentage >= 30) {
      status = "Moderate";
      statusText =
        "Amazon fees are meaningful and should be watched closely.";
      recommendation =
        "Make sure your gross margin can absorb fees, PPC, returns, and price competition.";
    } else if (feePercentage < 20) {
      status = "Strong";
      statusText =
        "Amazon fees are relatively low compared with the sale price.";
      recommendation =
        "This fee structure may leave more room for product cost, ads, returns, and profit.";
    }

    const scenarios = [10, 12, 15, 18, 20].map((rate) => {
      const scenarioReferral = price * (rate / 100);
      const scenarioTotal =
        scenarioReferral +
        fulfillment +
        storage +
        inboundPlacement +
        closing +
        returns +
        extra;
      const scenarioPercent =
        price > 0 ? (scenarioTotal / price) * 100 : 0;
      const scenarioNet = price - scenarioTotal;

      let scenarioStatus = "Healthy";

      if (scenarioPercent >= 45) scenarioStatus = "High";
      else if (scenarioPercent >= 30) scenarioStatus = "Moderate";
      else if (scenarioPercent < 20) scenarioStatus = "Strong";

      return {
        rate,
        totalFees: scenarioTotal,
        feePercentage: scenarioPercent,
        netAfterFees: scenarioNet,
        status: scenarioStatus,
      };
    });

    return {
      referralFee,
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

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Amazon Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Amazon Fee Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Amazon referral fees, FBA fulfillment fees, storage costs,
            return processing, placement fees, and total fee impact.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Fee details</h2>

            <div className="space-y-4">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Referral fee rate"
                value={referralFeeRate}
                onChange={setReferralFeeRate}
                suffix="%"
                helper="Use your estimated Amazon category referral fee."
              />

              <Input
                label="FBA fulfillment fee"
                value={fbaFulfillmentFee}
                onChange={setFbaFulfillmentFee}
                prefix="$"
              />

              <Input
                label="Monthly storage cost per unit"
                value={monthlyStorageCost}
                onChange={setMonthlyStorageCost}
                prefix="$"
              />

              <Input
                label="Inbound placement fee"
                value={inboundPlacementFee}
                onChange={setInboundPlacementFee}
                prefix="$"
                helper="Optional estimated per-unit placement or inbound-related fee."
              />

              <Input
                label="Closing fee"
                value={closingFee}
                onChange={setClosingFee}
                prefix="$"
                helper="Usually applies to certain media categories. Use 0 if not applicable."
              />

              <Input
                label="Return processing cost"
                value={returnProcessingCost}
                onChange={setReturnProcessingCost}
                prefix="$"
              />

              <Input
                label="Other Amazon fees"
                value={otherFees}
                onChange={setOtherFees}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Amazon fee and sale price assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Total Amazon fees"
                value={money(result.totalFees)}
                variant={
                  result.feePercentage >= 45
                    ? "danger"
                    : result.feePercentage >= 30
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Fee percentage"
                value={percent(result.feePercentage)}
                variant={
                  result.feePercentage >= 45
                    ? "danger"
                    : result.feePercentage >= 30
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Referral fee"
                value={money(result.referralFee)}
              />

              <ResultCard
                label="Revenue after Amazon fees"
                value={money(result.netAfterFees)}
                variant={result.netAfterFees > 0 ? "good" : "danger"}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Total estimated Amazon fees are{" "}
                <span className="font-semibold">
                  {money(result.totalFees)}
                </span>
                , which is about{" "}
                <span className="font-semibold">
                  {percent(result.feePercentage)}
                </span>{" "}
                of the sale price.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                After estimated Amazon fees, you would have{" "}
                <span className="font-semibold">
                  {money(result.netAfterFees)}
                </span>{" "}
                left before product cost, PPC, inbound shipping, and other
                non-Amazon costs.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Referral fee comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Referral rate</th>
                      <th className="px-4 py-3">Total fees</th>
                      <th className="px-4 py-3">Fee %</th>
                      <th className="px-4 py-3">Revenue after Amazon fees</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.rate}
                        className={
                          row.rate === Number(referralFeeRate)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.rate}%</td>
                        <td className="px-4 py-3">
                          {money(row.totalFees)}
                        </td>
                        <td className="px-4 py-3">
                          {percent(row.feePercentage)}
                        </td>
                        <td className="px-4 py-3">
                          {money(row.netAfterFees)}
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
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 outline-none"
        />

        {suffix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {suffix}
          </span>
        )}
      </div>

      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </label>
  );
}

function ResultCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "good" | "warning" | "danger" | "info";
}) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    danger: "border-red-300 bg-red-50",
    info: "border-blue-300 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}