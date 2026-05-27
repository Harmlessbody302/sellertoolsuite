"use client";

import { useMemo, useState } from "react";

export default function MercariFeeCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [mercariFeeRate, setMercariFeeRate] = useState("10");
  const [paymentProcessingRate, setPaymentProcessingRate] = useState("2.9");
  const [fixedProcessingFee, setFixedProcessingFee] = useState("0.50");
  const [promotionCost, setPromotionCost] = useState("2");
  const [otherFees, setOtherFees] = useState("0");

  const result = useMemo(() => {
    const sale = Number(salePrice) || 0;
    const mercariRate = Number(mercariFeeRate) || 0;
    const processingRate = Number(paymentProcessingRate) || 0;
    const fixed = Number(fixedProcessingFee) || 0;
    const promotion = Number(promotionCost) || 0;
    const other = Number(otherFees) || 0;

    const mercariSellingFee = sale * (mercariRate / 100);
    const paymentProcessingFee = sale * (processingRate / 100) + fixed;

    const totalFees =
      mercariSellingFee + paymentProcessingFee + promotion + other;

    const feePercentage = sale > 0 ? (totalFees / sale) * 100 : 0;
    const netAfterFees = sale - totalFees;

    let status = "Healthy";
    let statusText =
      "Your Mercari fee load looks manageable based on the sale price entered.";
    let recommendation =
      "Use this fee estimate alongside shipping, product cost, and packaging before deciding whether the listing is worth selling.";

    if (feePercentage >= 25) {
      status = "High Cost";
      statusText =
        "Fees and promotion costs are consuming a large share of the Mercari sale price.";
      recommendation =
        "Review the sale price, promotion cost, and fee assumptions before listing or scaling similar items.";
    } else if (feePercentage >= 18) {
      status = "Moderate";
      statusText =
        "Mercari fees are meaningful and should be watched closely.";
      recommendation =
        "Make sure your margin can absorb shipping, packaging, sourcing cost, and potential discounts.";
    } else if (feePercentage < 15) {
      status = "Efficient";
      statusText =
        "Your Mercari fees are relatively low compared with the sale price.";
      recommendation =
        "This fee structure leaves more room for product cost, shipping, packaging, and profit.";
    }

    const scenarios = [8, 10, 12, 15, 18].map((rate) => {
      const scenarioSellingFee = sale * (rate / 100);
      const scenarioPaymentFee = sale * (processingRate / 100) + fixed;
      const scenarioTotal =
        scenarioSellingFee + scenarioPaymentFee + promotion + other;

      const scenarioPercent =
        sale > 0 ? (scenarioTotal / sale) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioPercent >= 25) scenarioStatus = "High Cost";
      else if (scenarioPercent >= 18) scenarioStatus = "Moderate";
      else if (scenarioPercent < 15) scenarioStatus = "Efficient";

      return {
        rate,
        sellingFee: scenarioSellingFee,
        totalFees: scenarioTotal,
        feePercentage: scenarioPercent,
        netAfterFees: sale - scenarioTotal,
        status: scenarioStatus,
      };
    });

    return {
      mercariSellingFee,
      paymentProcessingFee,
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
    mercariFeeRate,
    paymentProcessingRate,
    fixedProcessingFee,
    promotionCost,
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
            Mercari Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mercari Fee Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Mercari selling fees, payment processing fees, fixed fees,
            promotion costs, and total fee impact.
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
                label="Mercari selling fee"
                value={mercariFeeRate}
                onChange={setMercariFeeRate}
                suffix="%"
              />

              <Input
                label="Payment processing fee"
                value={paymentProcessingRate}
                onChange={setPaymentProcessingRate}
                suffix="%"
              />

              <Input
                label="Fixed processing fee"
                value={fixedProcessingFee}
                onChange={setFixedProcessingFee}
                prefix="$"
              />

              <Input
                label="Promotion cost"
                value={promotionCost}
                onChange={setPromotionCost}
                prefix="$"
                helper="Optional cost from promoted listings, price drops, or seller-funded discounts."
              />

              <Input
                label="Other fees"
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
                  Based on your Mercari sale price and fee assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Total Mercari fees"
                value={money(result.totalFees)}
                variant={
                  result.status === "High Cost"
                    ? "danger"
                    : result.status === "Moderate"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Fee percentage"
                value={percent(result.feePercentage)}
                variant={
                  result.status === "High Cost"
                    ? "danger"
                    : result.status === "Moderate"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Selling fee"
                value={money(result.mercariSellingFee)}
              />

              <ResultCard
                label="Payment processing"
                value={money(result.paymentProcessingFee)}
              />

              <ResultCard
                label="Net after fees"
                value={money(result.netAfterFees)}
                variant={result.netAfterFees > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Promotion cost"
                value={money(Number(promotionCost) || 0)}
                variant="info"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Total estimated Mercari fees are{" "}
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
                After fees and promotion costs, you would have{" "}
                <span className="font-semibold">
                  {money(result.netAfterFees)}
                </span>{" "}
                left before product cost, shipping, packaging, and other
                non-platform costs.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Selling fee comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Selling fee</th>
                      <th className="px-4 py-3">Total fees</th>
                      <th className="px-4 py-3">Fee %</th>
                      <th className="px-4 py-3">Net after fees</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.rate}
                        className={
                          row.rate === Number(mercariFeeRate)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.rate}%</td>
                        <td className="px-4 py-3">{money(row.totalFees)}</td>
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
    status === "Efficient" || status === "Healthy"
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
    status === "Efficient" || status === "Healthy"
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