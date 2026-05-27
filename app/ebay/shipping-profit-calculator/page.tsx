"use client";

import { useMemo, useState } from "react";

export default function EbayShippingProfitCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [shippingCharged, setShippingCharged] = useState("6");
  const [actualShippingCost, setActualShippingCost] = useState("8");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [itemCost, setItemCost] = useState("18");
  const [finalValueFeeRate, setFinalValueFeeRate] = useState("13.25");
  const [fixedFee, setFixedFee] = useState("0.40");
  const [promotedListingRate, setPromotedListingRate] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const charged = Number(shippingCharged) || 0;
    const shippingCost = Number(actualShippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const cost = Number(itemCost) || 0;
    const fvfRate = Number(finalValueFeeRate) || 0;
    const fixed = Number(fixedFee) || 0;
    const promotedRate = Number(promotedListingRate) || 0;

    const totalRevenue = price + charged;
    const finalValueFee = totalRevenue * (fvfRate / 100);
    const promotedFee = totalRevenue * (promotedRate / 100);
    const totalFees = finalValueFee + promotedFee + fixed;
    const totalCosts = cost + shippingCost + packaging + totalFees;
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const shippingDifference = charged - shippingCost;
    const shippingLabel =
      shippingDifference < 0 ? "Shipping loss absorbed" : "Shipping surplus";

    const breakEvenShipping = Math.max(
      0,
      shippingCost + packaging + cost + totalFees - price
    );

    let status = "Healthy";
    let statusText =
      "Your eBay shipping setup appears sustainable and leaves a healthy margin.";
    let recommendation =
      "This shipping structure looks workable. Keep monitoring label costs, packaging costs, and promoted listing fees.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This setup is losing money after shipping, item cost, packaging, and eBay fees.";
      recommendation =
        "Consider raising price, charging more shipping, reducing shipping cost, or avoiding promotion on this item.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This setup is profitable, but shipping and fees are leaving a thin margin.";
      recommendation =
        "Small cost changes could erase profit. Consider raising price or using a more profitable shipping strategy.";
    } else if (shippingDifference < 0 && margin < 25) {
      status = "Shipping Drag";
      statusText =
        "The sale is profitable, but you are absorbing part of the shipping cost.";
      recommendation =
        "Make sure the sale price is high enough to cover the shipping subsidy and still leave acceptable profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "Shipping costs are well covered by your pricing, and profitability remains strong.";
      recommendation =
        "This setup looks strong. You may be able to test free shipping, promoted listings, or higher volume safely.";
    }

    const scenarios = [
      { label: "Free shipping", charge: 0 },
      { label: "$5 flat", charge: 5 },
      { label: "Current", charge: charged },
      { label: "$10 flat", charge: 10 },
    ].map((scenario) => {
      const scenarioRevenue = price + scenario.charge;
      const scenarioFvf = scenarioRevenue * (fvfRate / 100);
      const scenarioPromoted = scenarioRevenue * (promotedRate / 100);
      const scenarioFees = scenarioFvf + scenarioPromoted + fixed;
      const scenarioCosts = cost + shippingCost + packaging + scenarioFees;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Losing Money";
      else if (scenarioMargin < 10) scenarioStatus = "Thin";
      else if (scenarioMargin >= 30) scenarioStatus = "Strong";

      return {
        ...scenario,
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
      shippingDifference,
      shippingLabel,
      breakEvenShipping,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    actualShippingCost,
    packagingCost,
    itemCost,
    finalValueFeeRate,
    fixedFee,
    promotedListingRate,
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
            eBay Shipping Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Compare free shipping, flat-rate shipping, buyer-paid shipping, and
            fulfillment cost impact on eBay profit.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Shipping details</h2>

            <div className="space-y-4">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Shipping charged to buyer"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
                helper="Enter 0 if offering free shipping."
              />

              <Input
                label="Actual shipping cost"
                value={actualShippingCost}
                onChange={setActualShippingCost}
                prefix="$"
                helper="What you actually pay for the shipping label."
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
                helper="Boxes, mailers, tape, labels, inserts, and other packaging costs."
              />

              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
              />

              <Input
                label="Final value fee rate"
                value={finalValueFeeRate}
                onChange={setFinalValueFeeRate}
                suffix="%"
              />

              <Input
                label="Fixed order fee"
                value={fixedFee}
                onChange={setFixedFee}
                prefix="$"
              />

              <Input
                label="Promoted listing rate"
                value={promotedListingRate}
                onChange={setPromotedListingRate}
                suffix="%"
                helper="Enter 0 if not using promoted listings."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your sale price, shipping charge, fulfillment costs,
                  and eBay fee assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Profit"
                value={money(result.profit)}
                variant={result.profit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Margin"
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
                label={result.shippingLabel}
                value={money(Math.abs(result.shippingDifference))}
                variant={result.shippingDifference < 0 ? "danger" : "info"}
              />

              <ResultCard
                label="Break-even shipping"
                value={
                  result.breakEvenShipping === 0
                    ? "Covered"
                    : money(result.breakEvenShipping)
                }
                variant="warning"
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
                label="Final value fee"
                value={money(result.finalValueFee)}
              />

              <ResultCard
                label="Promoted fee"
                value={money(result.promotedFee)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your total revenue is{" "}
                <span className="font-semibold">
                  {money(result.totalRevenue)}
                </span>{" "}
                and your total cost is{" "}
                <span className="font-semibold">
                  {money(result.totalCosts)}
                </span>
                , leaving an estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>.
              </p>

              {result.shippingDifference < 0 ? (
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  You are absorbing{" "}
                  <span className="font-semibold">
                    {money(Math.abs(result.shippingDifference))}
                  </span>{" "}
                  of the shipping cost inside your sale price or margin.
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Your shipping charge covers the label cost with{" "}
                  <span className="font-semibold">
                    {money(result.shippingDifference)}
                  </span>{" "}
                  left over before packaging and other costs.
                </p>
              )}

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Shipping strategy comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Strategy</th>
                      <th className="px-4 py-3">Charge</th>
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
                          row.label === "Current"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3">{money(row.charge)}</td>
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
      : status === "Thin Margin" || status === "Shipping Drag"
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