"use client";

import { useMemo, useState } from "react";

export default function EbayPricingCalculator() {
  const [itemCost, setItemCost] = useState("18");
  const [shippingCost, setShippingCost] = useState("8");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [shippingCharged, setShippingCharged] = useState("6");
  const [finalValueFeeRate, setFinalValueFeeRate] = useState("13.25");
  const [fixedFee, setFixedFee] = useState("0.40");
  const [promotedListingRate, setPromotedListingRate] = useState("0");
  const [targetProfit, setTargetProfit] = useState("15");
  const [targetMargin, setTargetMargin] = useState("30");

  const result = useMemo(() => {
    const cost = Number(itemCost) || 0;
    const actualShipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const shippingIncome = Number(shippingCharged) || 0;
    const fvfRate = Number(finalValueFeeRate) || 0;
    const fixed = Number(fixedFee) || 0;
    const promotedRate = Number(promotedListingRate) || 0;
    const desiredProfit = Number(targetProfit) || 0;
    const desiredMargin = Number(targetMargin) || 0;

    const variableFeeRate = (fvfRate + promotedRate) / 100;
    const baseCosts = cost + actualShipping + packaging + fixed;
    const shippingSubsidy = actualShipping - shippingIncome;

    const priceForTargetProfit =
      variableFeeRate < 1
        ? (baseCosts + desiredProfit - shippingIncome) /
          (1 - variableFeeRate)
        : 0;

    const marginDecimal = desiredMargin / 100;
    const priceForTargetMargin =
      variableFeeRate + marginDecimal < 1
        ? (baseCosts - shippingIncome) /
          (1 - variableFeeRate - marginDecimal)
        : 0;

    const breakEvenPrice =
      variableFeeRate < 1
        ? (baseCosts - shippingIncome) / (1 - variableFeeRate)
        : 0;

    const recommendedPrice = Math.max(
      priceForTargetProfit,
      priceForTargetMargin,
      breakEvenPrice
    );

    const totalRevenue = recommendedPrice + shippingIncome;
    const finalValueFee = totalRevenue * (fvfRate / 100);
    const promotedFee = totalRevenue * (promotedRate / 100);
    const totalFees = finalValueFee + promotedFee + fixed;
    const totalCosts = cost + actualShipping + packaging + totalFees;
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "The recommended price meets your target profit or margin based on the assumptions entered.";
    let recommendation =
      "Use this as a pricing estimate, then compare against similar sold listings before publishing.";

    if (recommendedPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The pricing target cannot be calculated with the current fee or margin assumptions.";
      recommendation =
        "Lower the target margin, check the fee percentages, or confirm that the inputs are realistic.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "The recommended price creates profit, but the margin is thin.";
      recommendation =
        "Consider raising price, lowering sourcing cost, or avoiding promoted listing spend for this item.";
    } else if (recommendedPrice > cost * 4 && cost > 0) {
      status = "High Price";
      statusText =
        "The recommended price is much higher than the item cost.";
      recommendation =
        "Confirm the market can support this price by checking comparable sold listings.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "The recommended price leaves a strong estimated margin.";
      recommendation =
        "This price target looks healthy if it remains competitive with comparable eBay listings.";
    }

    const scenarios = [
      { label: "Break-even", price: breakEvenPrice },
      { label: "Target profit", price: priceForTargetProfit },
      { label: "Target margin", price: priceForTargetMargin },
      { label: "Recommended", price: recommendedPrice },
    ].map((scenario) => {
      const scenarioRevenue = scenario.price + shippingIncome;
      const scenarioFvf = scenarioRevenue * (fvfRate / 100);
      const scenarioPromoted = scenarioRevenue * (promotedRate / 100);
      const scenarioFees = scenarioFvf + scenarioPromoted + fixed;
      const scenarioCosts = cost + actualShipping + packaging + scenarioFees;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Break-even";
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
      variableFeeRate,
      baseCosts,
      shippingSubsidy,
      priceForTargetProfit,
      priceForTargetMargin,
      breakEvenPrice,
      recommendedPrice,
      totalRevenue,
      finalValueFee,
      promotedFee,
      totalFees,
      profit,
      margin,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    itemCost,
    shippingCost,
    packagingCost,
    shippingCharged,
    finalValueFeeRate,
    fixedFee,
    promotedListingRate,
    targetProfit,
    targetMargin,
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
            eBay Pricing Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Find a profitable eBay selling price based on item cost, shipping,
            packaging, fees, promoted listing rate, target profit, and target
            margin.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Pricing details</h2>

            <div className="space-y-4">
              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
                helper="What you paid for the item, including sourcing cost."
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
                label="Shipping charged to buyer"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
                helper="Enter 0 if you want to price around free shipping."
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

              <Input
                label="Target profit"
                value={targetProfit}
                onChange={setTargetProfit}
                prefix="$"
              />

              <Input
                label="Target margin"
                value={targetMargin}
                onChange={setTargetMargin}
                suffix="%"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your costs, fee assumptions, and pricing targets.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Recommended sale price"
                value={money(result.recommendedPrice)}
                variant="info"
              />

              <ResultCard
                label="Estimated profit"
                value={money(result.profit)}
                variant={result.profit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Estimated margin"
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
                label="Break-even sale price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />

              <ResultCard
                label="Price for target profit"
                value={money(Math.max(0, result.priceForTargetProfit))}
              />

              <ResultCard
                label="Price for target margin"
                value={money(Math.max(0, result.priceForTargetMargin))}
              />

              <ResultCard
                label="Estimated total fees"
                value={money(result.totalFees)}
              />

              <ResultCard
                label="Shipping subsidy"
                value={money(Math.max(0, result.shippingSubsidy))}
                variant={result.shippingSubsidy > 0 ? "warning" : "info"}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                The recommended sale price is{" "}
                <span className="font-semibold">
                  {money(result.recommendedPrice)}
                </span>
                . At that price, estimated profit is{" "}
                <span className="font-semibold">{money(result.profit)}</span>{" "}
                with a margin of{" "}
                <span className="font-semibold">
                  {percent(result.margin)}
                </span>
                .
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
                Pricing target comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Target</th>
                      <th className="px-4 py-3">Sale price</th>
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
                          row.label === "Recommended"
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
      : status === "Thin Margin" || status === "High Price"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Check Inputs"
      ? "bg-blue-100 text-blue-700"
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
      : status === "Thin" || status === "Break-even"
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