"use client";

import { useMemo, useState } from "react";

export default function EtsyRefundImpactCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState("120");
  const [averageOrderValue, setAverageOrderValue] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("12");
  const [refundRate, setRefundRate] = useState("4");
  const [replacementCost, setReplacementCost] = useState("8");
  const [processingLoss, setProcessingLoss] = useState("3");
  const [shippingLoss, setShippingLoss] = useState("5");

  const result = useMemo(() => {
    const orders = Number(monthlyOrders) || 0;
    const orderValue = Number(averageOrderValue) || 0;
    const profit = Number(profitPerOrder) || 0;
    const rate = Number(refundRate) || 0;
    const replacement = Number(replacementCost) || 0;
    const processing = Number(processingLoss) || 0;
    const shipping = Number(shippingLoss) || 0;

    const refundedOrders = orders * (rate / 100);
    const grossProfit = orders * profit;

    const refundLossPerOrder =
      profit + replacement + processing + shipping;

    const totalRefundLoss = refundedOrders * refundLossPerOrder;
    const netProfit = grossProfit - totalRefundLoss;

    const profitReduction =
      grossProfit > 0 ? (totalRefundLoss / grossProfit) * 100 : 0;

    const breakEvenRefundRate =
      refundLossPerOrder > 0
        ? (grossProfit / (orders * refundLossPerOrder)) * 100
        : 0;

    let status = "Healthy";
    let message =
      "Your current refund assumptions have a manageable impact on monthly profitability.";
    let recommendation =
      "Continue monitoring customer feedback and order quality to keep refund rates low.";

    if (profitReduction > 35) {
      status = "Critical";
      message =
        "Refund-related losses are heavily impacting profitability.";
      recommendation =
        "Investigate product quality, shipping damage, listing accuracy, or customer expectation mismatches immediately.";
    } else if (profitReduction > 20) {
      status = "Warning";
      message =
        "Refunds are materially reducing profit.";
      recommendation =
        "Audit listings, packaging, and fulfillment workflows to reduce avoidable losses.";
    } else if (profitReduction > 10) {
      status = "Moderate";
      message =
        "Refunds are noticeable but still manageable.";
      recommendation =
        "Look for recurring causes and optimize weak points.";
    }

    const scenarios = [1, 2, 4, 6, 8, 10].map((scenarioRate) => {
      const scenarioRefunds = orders * (scenarioRate / 100);
      const scenarioLoss = scenarioRefunds * refundLossPerOrder;
      const scenarioNet = grossProfit - scenarioLoss;

      return {
        rate: scenarioRate,
        loss: scenarioLoss,
        net: scenarioNet,
      };
    });

    return {
      refundedOrders,
      grossProfit,
      totalRefundLoss,
      netProfit,
      profitReduction,
      breakEvenRefundRate,
      refundLossPerOrder,
      status,
      message,
      recommendation,
      scenarios,
    };
  }, [
    monthlyOrders,
    averageOrderValue,
    profitPerOrder,
    refundRate,
    replacementCost,
    processingLoss,
    shippingLoss,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Etsy Seller Tool
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Etsy Refund Impact Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate how refunds, replacements, cancellations, and shipping
            losses affect Etsy profitability.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Refund assumptions</h2>

            <div className="space-y-4">
              <Input label="Monthly orders" value={monthlyOrders} onChange={setMonthlyOrders} />
              <Input label="Average order value" value={averageOrderValue} onChange={setAverageOrderValue} prefix="$" />
              <Input label="Profit per order" value={profitPerOrder} onChange={setProfitPerOrder} prefix="$" />
              <Input label="Refund rate" value={refundRate} onChange={setRefundRate} suffix="%" />
              <Input label="Replacement cost" value={replacementCost} onChange={setReplacementCost} prefix="$" />
              <Input label="Processing / fee loss" value={processingLoss} onChange={setProcessingLoss} prefix="$" />
              <Input label="Shipping / return loss" value={shippingLoss} onChange={setShippingLoss} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your estimated refund and replacement assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Refunded orders" value={result.refundedOrders.toFixed(1)} variant="warning" />
              <ResultCard label="Refund loss / order" value={money(result.refundLossPerOrder)} variant="danger" />
              <ResultCard label="Total refund loss" value={money(result.totalRefundLoss)} variant="danger" />
              <ResultCard label="Net monthly profit" value={money(result.netProfit)} variant="good" />
              <ResultCard label="Profit reduction" value={`${result.profitReduction.toFixed(1)}%`} variant="warning" />
              <ResultCard label="Break-even refund rate" value={`${result.breakEvenRefundRate.toFixed(1)}%`} variant="info" />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm text-slate-700">{result.message}</p>
              <p className="mt-3 text-sm text-slate-700">{result.recommendation}</p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Refund rate comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3">Refund rate</th>
                      <th className="px-4 py-3">Loss</th>
                      <th className="px-4 py-3">Net profit</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr key={row.rate}>
                        <td className="px-4 py-3">{row.rate}%</td>
                        <td className="px-4 py-3">{money(row.loss)}</td>
                        <td className="px-4 py-3">{money(row.net)}</td>
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
        {prefix && <span className="px-3 py-2 bg-slate-100">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 outline-none"
        />
        {suffix && <span className="px-3 py-2 bg-slate-100">{suffix}</span>}
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
    status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate" || status === "Warning"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${styles}`}>
      {status}
    </span>
  );
}