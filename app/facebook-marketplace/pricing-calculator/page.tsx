"use client";

import { useMemo, useState } from "react";

export default function FacebookMarketplacePricingCalculator() {
  const [itemCost, setItemCost] = useState("35");
  const [shippingCost, setShippingCost] = useState("0");
  const [deliveryCost, setDeliveryCost] = useState("5");
  const [packagingCost, setPackagingCost] = useState("1");
  const [platformFeeRate, setPlatformFeeRate] = useState("0");
  const [negotiationDiscount, setNegotiationDiscount] = useState("10");
  const [targetProfit, setTargetProfit] = useState("35");
  const [targetMargin, setTargetMargin] = useState("35");

  const result = useMemo(() => {
    const item = Number(itemCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const delivery = Number(deliveryCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const feeRate = Number(platformFeeRate) || 0;
    const discountRate = Number(negotiationDiscount) || 0;
    const desiredProfit = Number(targetProfit) || 0;
    const desiredMargin = Number(targetMargin) || 0;

    const fixedCosts = item + shipping + delivery + packaging;
    const feeMultiplier = 1 - feeRate / 100;
    const negotiationMultiplier = 1 - discountRate / 100;

    const targetProfitPrice =
      feeMultiplier > 0 && negotiationMultiplier > 0
        ? (fixedCosts + desiredProfit) /
          (feeMultiplier * negotiationMultiplier)
        : 0;

    const targetMarginPrice =
      feeMultiplier > 0 &&
      negotiationMultiplier > 0 &&
      desiredMargin < 100
        ? fixedCosts /
          ((1 - desiredMargin / 100) *
            feeMultiplier *
            negotiationMultiplier)
        : 0;

    const breakEvenPrice =
      feeMultiplier > 0 && negotiationMultiplier > 0
        ? fixedCosts / (feeMultiplier * negotiationMultiplier)
        : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice
    );

    const expectedAcceptedPrice = recommendedPrice * negotiationMultiplier;
    const platformFee = expectedAcceptedPrice * (feeRate / 100);
    const totalCosts = fixedCosts + platformFee;
    const profit = expectedAcceptedPrice - totalCosts;
    const margin =
      expectedAcceptedPrice > 0 ? (profit / expectedAcceptedPrice) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your recommended Facebook Marketplace listing price should support your target goals.";
    let recommendation =
      "This price gives you room for normal buyer negotiation while protecting profit.";

    if (recommendedPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The recommended price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your platform fee, negotiation discount, and margin assumptions are realistic.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This price leaves limited room for buyer negotiation or extra fulfillment costs.";
      recommendation =
        "Consider increasing your listing price, reducing delivery costs, or accepting fewer low offers.";
    } else if (margin >= 40) {
      status = "Strong";
      statusText =
        "This price leaves strong room for negotiation and local selling variation.";
      recommendation =
        "This listing may have enough margin for delivery, negotiation, or minor price drops.";
    }

    const scenarios = [
      { label: "Break-even", price: breakEvenPrice },
      { label: "Target profit", price: targetProfitPrice },
      { label: "Target margin", price: targetMarginPrice },
      { label: "Recommended", price: recommendedPrice },
    ].map((scenario) => {
      const acceptedPrice = scenario.price * negotiationMultiplier;
      const fee = acceptedPrice * (feeRate / 100);
      const scenarioCosts = fixedCosts + fee;
      const scenarioProfit = acceptedPrice - scenarioCosts;
      const scenarioMargin =
        acceptedPrice > 0 ? (scenarioProfit / acceptedPrice) * 100 : 0;

      let scenarioStatus = "Healthy";
      if (scenarioProfit <= 0) scenarioStatus = "Break-even";
      else if (scenarioMargin < 15) scenarioStatus = "Thin";
      else if (scenarioMargin >= 40) scenarioStatus = "Strong";

      return {
        ...scenario,
        acceptedPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      fixedCosts,
      recommendedPrice,
      expectedAcceptedPrice,
      platformFee,
      totalCosts,
      profit,
      margin,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    itemCost,
    shippingCost,
    deliveryCost,
    packagingCost,
    platformFeeRate,
    negotiationDiscount,
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
            Facebook Marketplace Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Facebook Marketplace Pricing Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Find a profitable Facebook Marketplace listing price based on item
            cost, delivery costs, shipping, expected negotiation, target profit,
            and target margin.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Pricing details</h2>

            <div className="space-y-3">
              <Input label="Item cost" value={itemCost} onChange={setItemCost} prefix="$" />
              <Input label="Shipping cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
              <Input label="Delivery / fuel cost" value={deliveryCost} onChange={setDeliveryCost} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Platform fee rate" value={platformFeeRate} onChange={setPlatformFeeRate} suffix="%" />
              <Input label="Expected negotiation discount" value={negotiationDiscount} onChange={setNegotiationDiscount} suffix="%" />
              <Input label="Target profit" value={targetProfit} onChange={setTargetProfit} prefix="$" />
              <Input label="Target margin" value={targetMargin} onChange={setTargetMargin} suffix="%" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Recommended local resale pricing estimates.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Recommended listing price" value={money(result.recommendedPrice)} variant="info" />
              <ResultCard label="Expected accepted price" value={money(result.expectedAcceptedPrice)} variant="info" />
              <ResultCard label="Estimated profit" value={money(result.profit)} variant={result.profit > 0 ? "good" : "danger"} />
              <ResultCard label="Estimated margin" value={percent(result.margin)} variant={result.margin >= 40 ? "good" : result.margin < 15 ? "warning" : "default"} />
              <ResultCard label="Break-even price" value={money(result.breakEvenPrice)} variant="warning" />
              <ResultCard label="Target profit price" value={money(result.targetProfitPrice)} />
              <ResultCard label="Target margin price" value={money(result.targetMarginPrice)} />
              <ResultCard label="Total costs at price" value={money(result.totalCosts)} />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Recommended listing price is{" "}
                <span className="font-semibold">
                  {money(result.recommendedPrice)}
                </span>
                . After expected negotiation, the accepted price would be about{" "}
                <span className="font-semibold">
                  {money(result.expectedAcceptedPrice)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                At that price, estimated profit is{" "}
                <span className="font-semibold">{money(result.profit)}</span>{" "}
                at a{" "}
                <span className="font-semibold">
                  {percent(result.margin)}
                </span>{" "}
                margin.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Pricing scenario comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Scenario</th>
                      <th className="px-4 py-3">Listing</th>
                      <th className="px-4 py-3">Accepted</th>
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
                        <td className="whitespace-nowrap px-4 py-3">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">{money(row.price)}</td>
                        <td className="px-4 py-3">
                          {money(row.acceptedPrice)}
                        </td>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
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
      className={`inline-flex min-w-[88px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}