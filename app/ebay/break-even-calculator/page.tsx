"use client";

import { useMemo, useState } from "react";

export default function EbayBreakEvenCalculator() {
  const [itemCost, setItemCost] = useState("18");
  const [shippingCost, setShippingCost] = useState("8");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [shippingCharged, setShippingCharged] = useState("6");
  const [finalValueFeeRate, setFinalValueFeeRate] = useState("13.25");
  const [fixedFee, setFixedFee] = useState("0.40");
  const [promotedRate, setPromotedRate] = useState("0");
  const [targetProfit, setTargetProfit] = useState("10");

  const result = useMemo(() => {
    const item = Number(itemCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const charged = Number(shippingCharged) || 0;
    const feeRate = Number(finalValueFeeRate) || 0;
    const fixed = Number(fixedFee) || 0;
    const promoted = Number(promotedRate) || 0;
    const target = Number(targetProfit) || 0;

    const combinedRate = (feeRate + promoted) / 100;

    const breakEvenPrice =
      (item + shipping + packaging + fixed - charged) / (1 - combinedRate);

    const targetProfitPrice =
      (item + shipping + packaging + fixed + target - charged) /
      (1 - combinedRate);

    const safePrice = targetProfitPrice * 1.15;
    const aggressivePrice = targetProfitPrice * 0.9;

    const totalCost = item + shipping + packaging + fixed;

    const evaluate = (price: number) => {
      const revenue = price + charged;
      const fees = revenue * combinedRate + fixed;
      const profit = revenue - item - shipping - packaging - fees;

      return {
        revenue,
        fees,
        profit,
        margin: revenue > 0 ? (profit / revenue) * 100 : 0,
      };
    };

    const breakEvenEval = evaluate(breakEvenPrice);
    const targetEval = evaluate(targetProfitPrice);
    const safeEval = evaluate(safePrice);
    const aggressiveEval = evaluate(aggressivePrice);

    let status = "Healthy";
    let statusText =
      "Your current assumptions produce a healthy and reachable break-even point.";

    if (breakEvenPrice > 50) {
      status = "High Risk";
      statusText =
        "Your break-even price is high relative to many common eBay listings.";
    } else if (breakEvenPrice > 35) {
      status = "Moderate";
      statusText =
        "Break-even is manageable, but pricing discipline will matter.";
    } else if (breakEvenPrice < 20) {
      status = "Strong";
      statusText =
        "Your cost structure leaves strong pricing flexibility.";
    }

    const scenarios = [
      {
        label: "Break-even",
        price: breakEvenPrice,
        ...breakEvenEval,
        status: "Break-even",
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
        ...targetEval,
        status: "Healthy",
      },
      {
        label: "Aggressive",
        price: aggressivePrice,
        ...aggressiveEval,
        status: aggressiveEval.profit > 0 ? "Healthy" : "Risky",
      },
      {
        label: "Safe buffer",
        price: safePrice,
        ...safeEval,
        status: "Strong",
      },
    ];

    return {
      breakEvenPrice,
      targetProfitPrice,
      safePrice,
      aggressivePrice,
      totalCost,
      status,
      statusText,
      scenarios,
      breakEvenEval,
      targetEval,
    };
  }, [
    itemCost,
    shippingCost,
    packagingCost,
    shippingCharged,
    finalValueFeeRate,
    fixedFee,
    promotedRate,
    targetProfit,
  ]);

  const money = (v: number) =>
    v.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (v: number) => `${v.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            eBay Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            eBay Break-Even Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate the minimum eBay sale price needed to avoid losing money
            after item costs, shipping, fees, and promotion costs.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Break-even details</h2>

            <div className="space-y-4">
              <Input label="Item cost" value={itemCost} onChange={setItemCost} prefix="$" />
              <Input label="Actual shipping cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Shipping charged to buyer" value={shippingCharged} onChange={setShippingCharged} prefix="$" />
              <Input label="Final value fee rate" value={finalValueFeeRate} onChange={setFinalValueFeeRate} suffix="%" />
              <Input label="Fixed order fee" value={fixedFee} onChange={setFixedFee} prefix="$" />
              <Input label="Promoted listing rate" value={promotedRate} onChange={setPromotedRate} suffix="%" />
              <Input label="Target profit" value={targetProfit} onChange={setTargetProfit} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Minimum viable pricing thresholds.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Break-even price"
                value={money(result.breakEvenPrice)}
                variant="warning"
              />

              <ResultCard
                label="Target profit price"
                value={money(result.targetProfitPrice)}
                variant="good"
              />

              <ResultCard
                label="Safe buffer price"
                value={money(result.safePrice)}
                variant="info"
              />

              <ResultCard
                label="Aggressive floor"
                value={money(result.aggressivePrice)}
                variant="danger"
              />

              <ResultCard
                label="Break-even margin"
                value={percent(result.breakEvenEval.margin)}
              />

              <ResultCard
                label="Target margin"
                value={percent(result.targetEval.margin)}
                variant="good"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm text-slate-700 leading-6">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm text-slate-700 leading-6">
                Your estimated break-even sale price is{" "}
                <span className="font-semibold">
                  {money(result.breakEvenPrice)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm text-slate-700 leading-6">
                To generate your target profit, list at approximately{" "}
                <span className="font-semibold">
                  {money(result.targetProfitPrice)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm text-slate-700 leading-6">
                Consider comparing these values against recent sold listings
                before final pricing.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Pricing scenario comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3">Scenario</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Margin</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.label}
                        className={
                          row.label === "Target profit"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3">{money(row.price)}</td>
                        <td className="px-4 py-3">{money(row.profit)}</td>
                        <td className="px-4 py-3">{percent(row.margin)}</td>
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
}: any) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <div className="flex overflow-hidden rounded-xl border bg-white">
        {prefix && (
          <span className="flex items-center bg-slate-100 px-3">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 outline-none"
        />
        {suffix && (
          <span className="flex items-center bg-slate-100 px-3">{suffix}</span>
        )}
      </div>
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

function StatusBadge({ status }: any) {
  const styles =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: any) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Break-even"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}