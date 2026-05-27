"use client";

import { useMemo, useState } from "react";

export default function PoshmarkPricingCalculator() {
  const [itemCost, setItemCost] = useState("18");
  const [shippingDiscount, setShippingDiscount] = useState("2");
  const [packagingCost, setPackagingCost] = useState("1");
  const [otherCosts, setOtherCosts] = useState("0");
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState("10");
  const [targetProfit, setTargetProfit] = useState("12");
  const [targetMargin, setTargetMargin] = useState("25");

  const result = useMemo(() => {
    const cost = Number(itemCost) || 0;
    const shipping = Number(shippingDiscount) || 0;
    const packaging = Number(packagingCost) || 0;
    const other = Number(otherCosts) || 0;
    const offerRate = Number(buyerOfferDiscount) || 0;
    const desiredProfit = Number(targetProfit) || 0;
    const desiredMargin = Number(targetMargin) || 0;

    const fixedCosts = cost + shipping + packaging + other;
    const offerMultiplier = 1 - offerRate / 100;

    const targetProfitPrice =
      offerMultiplier > 0
        ? (fixedCosts + desiredProfit) / (0.8 * offerMultiplier)
        : 0;

    const targetMarginPrice =
      offerMultiplier > 0 && desiredMargin < 100
        ? fixedCosts / ((1 - desiredMargin / 100) * 0.8 * offerMultiplier)
        : 0;

    const breakEvenPrice =
      offerMultiplier > 0 ? fixedCosts / (0.8 * offerMultiplier) : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice
    );

    const effectiveSalePrice = recommendedPrice * offerMultiplier;

    const poshmarkFee =
      effectiveSalePrice > 0 && effectiveSalePrice < 15
        ? 2.95
        : effectiveSalePrice * 0.2;

    const estimatedProfit = effectiveSalePrice - poshmarkFee - fixedCosts;

    const margin =
      effectiveSalePrice > 0
        ? (estimatedProfit / effectiveSalePrice) * 100
        : 0;

    let status = "Healthy";
    let statusText =
      "Your recommended Poshmark listing price should support your target goals.";
    let recommendation =
      "This listing price appears workable based on your entered offer discount assumptions.";

    if (recommendedPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The recommended price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your offer discount and target margin are realistic.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This pricing leaves limited room for aggressive offers or additional selling costs.";
      recommendation =
        "Consider raising your listing price or reducing offer discounts.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText = "This pricing gives strong margin flexibility.";
      recommendation =
        "You have room for negotiation, offers, or promotional discounts.";
    }

    const scenarios = [
      {
        label: "Break-even",
        price: breakEvenPrice,
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
      },
      {
        label: "Target margin",
        price: targetMarginPrice,
      },
      {
        label: "Recommended",
        price: recommendedPrice,
      },
    ].map((scenario) => {
      const saleAfterOffer = scenario.price * offerMultiplier;

      const fee =
        saleAfterOffer > 0 && saleAfterOffer < 15
          ? 2.95
          : saleAfterOffer * 0.2;

      const profit = saleAfterOffer - fee - fixedCosts;

      const scenarioMargin =
        saleAfterOffer > 0 ? (profit / saleAfterOffer) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (profit <= 0) scenarioStatus = "Break-even";
      else if (scenarioMargin < 15) scenarioStatus = "Thin";
      else if (scenarioMargin >= 30) scenarioStatus = "Strong";

      return {
        ...scenario,
        saleAfterOffer,
        profit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      recommendedPrice,
      estimatedProfit,
      margin,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      effectiveSalePrice,
      poshmarkFee,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    itemCost,
    shippingDiscount,
    packagingCost,
    otherCosts,
    buyerOfferDiscount,
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
            Poshmark Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Poshmark Pricing Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Calculate profitable Poshmark listing prices based on item cost,
            offer discounts, shipping incentives, and target margin goals.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Pricing details</h2>

            <div className="space-y-3">
              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
              />

              <Input
                label="Shipping discount"
                value={shippingDiscount}
                onChange={setShippingDiscount}
                prefix="$"
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
              />

              <Input
                label="Other selling costs"
                value={otherCosts}
                onChange={setOtherCosts}
                prefix="$"
              />

              <Input
                label="Buyer offer discount"
                value={buyerOfferDiscount}
                onChange={setBuyerOfferDiscount}
                suffix="%"
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
                  Recommended Poshmark pricing estimates.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Recommended price"
                value={money(Math.max(0, result.recommendedPrice))}
                variant="info"
              />

              <ResultCard
                label="Estimated profit"
                value={money(result.estimatedProfit)}
                variant={result.estimatedProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Estimated margin"
                value={percent(result.margin)}
                variant={
                  result.margin < 15
                    ? "warning"
                    : result.margin >= 30
                    ? "good"
                    : "default"
                }
              />

              <ResultCard
                label="Break-even price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />

              <ResultCard
                label="Target profit price"
                value={money(Math.max(0, result.targetProfitPrice))}
              />

              <ResultCard
                label="Target margin price"
                value={money(Math.max(0, result.targetMarginPrice))}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Recommended listing price is{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.recommendedPrice))}
                </span>
                , producing estimated profit of{" "}
                <span className="font-semibold">
                  {money(result.estimatedProfit)}
                </span>{" "}
                at{" "}
                <span className="font-semibold">
                  {percent(result.margin)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                After your estimated offer discount, the sale price would be{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.effectiveSalePrice))}
                </span>
                , with an estimated Poshmark fee of{" "}
                <span className="font-semibold">
                  {money(result.poshmarkFee)}
                </span>
                .
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
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">After offer</th>
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
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.price))}
                        </td>
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.saleAfterOffer))}
                        </td>
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.profit))}
                        </td>
                        <td className="px-4 py-3">
                          {percent(Math.max(0, row.margin))}
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
      : "bg-yellow-100 text-yellow-700";

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