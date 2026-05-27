"use client";

import { useMemo, useState } from "react";

export default function EbayProfitCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [itemCost, setItemCost] = useState("18");
  const [shippingCharged, setShippingCharged] = useState("6");
  const [shippingCost, setShippingCost] = useState("8");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [finalValueFeeRate, setFinalValueFeeRate] = useState("13.25");
  const [fixedFee, setFixedFee] = useState("0.40");
  const [promotedListingRate, setPromotedListingRate] = useState("0");
  const [otherCosts, setOtherCosts] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const cost = Number(itemCost) || 0;
    const shippingIncome = Number(shippingCharged) || 0;
    const actualShipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const fvfRate = Number(finalValueFeeRate) || 0;
    const fixed = Number(fixedFee) || 0;
    const promotedRate = Number(promotedListingRate) || 0;
    const extraCosts = Number(otherCosts) || 0;

    const totalRevenue = price + shippingIncome;
    const finalValueFee = totalRevenue * (fvfRate / 100);
    const promotedFee = totalRevenue * (promotedRate / 100);
    const totalFees = finalValueFee + fixed + promotedFee;

    const totalCosts =
      cost + actualShipping + packaging + totalFees + extraCosts;

    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;

    const breakEvenPrice =
      price > 0
        ? totalCosts - shippingIncome
        : cost + actualShipping + packaging + totalFees + extraCosts;

    const shippingDifference = shippingIncome - actualShipping;
    const shippingLabel =
      shippingDifference < 0 ? "Shipping loss absorbed" : "Shipping surplus";

    let status = "Healthy";
    let statusText =
      "This sale appears profitable after estimated eBay fees, shipping, packaging, and item cost.";
    let recommendation =
      "This listing looks workable. Keep watching shipping costs and promoted listing fees so they do not quietly reduce margin.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This sale is losing money or breaking even after estimated costs.";
      recommendation =
        "Raise the sale price, reduce item cost, adjust shipping, or lower promoted listing spend before scaling this listing.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This sale is profitable, but the margin is thin.";
      recommendation =
        "Small changes in shipping, returns, or fees could erase profit. Consider raising price or reducing costs.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This sale has a strong estimated margin after costs and fees.";
      recommendation =
        "This item may be a good candidate to source again, promote carefully, or use as a model for similar listings.";
    }

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioPrice = Math.max(0, price + change);
      const scenarioRevenue = scenarioPrice + shippingIncome;
      const scenarioFvf = scenarioRevenue * (fvfRate / 100);
      const scenarioPromoted = scenarioRevenue * (promotedRate / 100);
      const scenarioFees = scenarioFvf + fixed + scenarioPromoted;
      const scenarioCosts =
        cost + actualShipping + packaging + scenarioFees + extraCosts;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      let scenarioStatus = "Healthy";
      if (scenarioProfit <= 0) scenarioStatus = "Losing Money";
      else if (scenarioMargin < 10) scenarioStatus = "Thin";
      else if (scenarioMargin >= 30) scenarioStatus = "Strong";

      return {
        change,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      totalRevenue,
      finalValueFee,
      promotedFee,
      totalFees,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      shippingDifference,
      shippingLabel,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    itemCost,
    shippingCharged,
    shippingCost,
    packagingCost,
    finalValueFeeRate,
    fixedFee,
    promotedListingRate,
    otherCosts,
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
            eBay Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            eBay Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate eBay profit after item cost, shipping, packaging, final
            value fees, fixed fees, promoted listing fees, and other selling
            costs.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Sale details</h2>

            <div className="space-y-4">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
                helper="What you paid for the item, including sourcing cost."
              />

              <Input
                label="Shipping charged to buyer"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
                helper="Enter 0 if you offer free shipping."
              />

              <Input
                label="Actual shipping cost"
                value={shippingCost}
                onChange={setShippingCost}
                prefix="$"
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
              />

              <Input
                label="Final value fee rate"
                value={finalValueFeeRate}
                onChange={setFinalValueFeeRate}
                suffix="%"
                helper="Use your estimated eBay final value fee percentage."
              />

              <Input
                label="Fixed order fee"
                value={fixedFee}
                onChange={setFixedFee}
                prefix="$"
                helper="Commonly a small fixed fee per order."
              />

              <Input
                label="Promoted listing rate"
                value={promotedListingRate}
                onChange={setPromotedListingRate}
                suffix="%"
                helper="Enter 0 if not using promoted listings."
              />

              <Input
                label="Other costs"
                value={otherCosts}
                onChange={setOtherCosts}
                prefix="$"
                helper="Optional: returns allowance, supplies, payment-related costs, or other listing expenses."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your sale price, fees, shipping, and cost
                  assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Estimated profit"
                value={money(result.profit)}
                variant={result.profit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Profit margin"
                value={percent(result.margin)}
                variant={
                  result.margin < 10
                    ? "danger"
                    : result.margin < 20
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="ROI on item cost"
                value={percent(result.roi)}
                variant={result.roi > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Total revenue"
                value={money(result.totalRevenue)}
                variant="info"
              />

              <ResultCard
                label="Total fees"
                value={money(result.totalFees)}
              />

              <ResultCard
                label="Total costs"
                value={money(result.totalCosts)}
              />

              <ResultCard
                label={result.shippingLabel}
                value={money(Math.abs(result.shippingDifference))}
                variant={result.shippingDifference < 0 ? "danger" : "info"}
              />

              <ResultCard
                label="Break-even sale price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This sale brings in{" "}
                <span className="font-semibold">
                  {money(result.totalRevenue)}
                </span>{" "}
                in total revenue and has estimated total costs of{" "}
                <span className="font-semibold">
                  {money(result.totalCosts)}
                </span>
                , leaving an estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Estimated eBay final value fees are{" "}
                <span className="font-semibold">
                  {money(result.finalValueFee)}
                </span>
                , and promoted listing fees are estimated at{" "}
                <span className="font-semibold">
                  {money(result.promotedFee)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Price scenario comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Price change</th>
                      <th className="px-4 py-3">Sale price</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Margin</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.change}
                        className={
                          row.change === 0 ? "bg-blue-50 font-semibold" : ""
                        }
                      >
                        <td className="px-4 py-3">
                          {row.change === 0
                            ? "Current"
                            : `${row.change > 0 ? "+" : ""}${money(
                                row.change
                              )}`}
                        </td>
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
      : status === "Thin Margin"
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
      : status === "Thin"
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