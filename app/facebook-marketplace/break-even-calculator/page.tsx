"use client";

import { useMemo, useState } from "react";

export default function FacebookMarketplaceBreakEvenCalculator() {
  const [itemCost, setItemCost] = useState("35");
  const [shippingCost, setShippingCost] = useState("0");
  const [deliveryCost, setDeliveryCost] = useState("5");
  const [packagingCost, setPackagingCost] = useState("1");
  const [platformFeeRate, setPlatformFeeRate] = useState("0");
  const [negotiationDiscount, setNegotiationDiscount] = useState("10");
  const [targetProfit, setTargetProfit] = useState("35");

  const result = useMemo(() => {
    const item = Number(itemCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const delivery = Number(deliveryCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const feeRate = Number(platformFeeRate) || 0;
    const negotiationRate = Number(negotiationDiscount) || 0;
    const target = Number(targetProfit) || 0;

    const fixedCosts = item + shipping + delivery + packaging;
    const feeMultiplier = 1 - feeRate / 100;
    const negotiationMultiplier = 1 - negotiationRate / 100;
    const totalMultiplier = feeMultiplier * negotiationMultiplier;

    const breakEvenPrice = totalMultiplier > 0 ? fixedCosts / totalMultiplier : 0;
    const targetProfitPrice =
      totalMultiplier > 0 ? (fixedCosts + target) / totalMultiplier : 0;
    const aggressiveFloor = targetProfitPrice * 0.9;
    const safeBuffer = targetProfitPrice * 1.15;

    const evaluate = (listingPrice: number) => {
      const acceptedPrice = listingPrice * negotiationMultiplier;
      const platformFee = acceptedPrice * (feeRate / 100);
      const profit = acceptedPrice - platformFee - fixedCosts;
      const margin = acceptedPrice > 0 ? (profit / acceptedPrice) * 100 : 0;

      return {
        acceptedPrice,
        platformFee,
        profit,
        margin,
      };
    };

    const targetEval = evaluate(targetProfitPrice);

    let status = "Healthy";
    let statusText =
      "Your Facebook Marketplace cost structure produces a workable break-even listing price.";
    let recommendation =
      "Compare this range against similar local listings before accepting buyer offers.";

    if (breakEvenPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The break-even price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your platform fee and negotiation discount assumptions are realistic.";
    } else if (targetEval.margin < 15) {
      status = "Tight";
      statusText =
        "Your target-profit price leaves limited room for negotiation or extra fulfillment costs.";
      recommendation =
        "Consider raising your listing price, reducing delivery costs, or accepting fewer low offers.";
    } else if (targetEval.margin >= 40) {
      status = "Strong";
      statusText =
        "Your target-profit price leaves strong room for negotiation and local selling variation.";
      recommendation =
        "This item may have enough margin for buyer negotiation, local delivery, or small price drops.";
    }

    const scenarios = [
      { label: "Break-even", price: breakEvenPrice },
      { label: "Aggressive", price: aggressiveFloor },
      { label: "Target profit", price: targetProfitPrice },
      { label: "Safe buffer", price: safeBuffer },
    ].map((scenario) => {
      const evaluation = evaluate(scenario.price);

      let scenarioStatus = "Healthy";
      if (evaluation.profit <= 0) scenarioStatus = "Break-even";
      else if (evaluation.margin < 15) scenarioStatus = "Tight";
      else if (evaluation.margin >= 40) scenarioStatus = "Strong";

      return {
        ...scenario,
        ...evaluation,
        status: scenarioStatus,
      };
    });

    return {
      fixedCosts,
      breakEvenPrice,
      targetProfitPrice,
      aggressiveFloor,
      safeBuffer,
      targetEval,
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
            Facebook Marketplace Break-Even Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Calculate the minimum Facebook Marketplace listing price needed to
            avoid losing money after item cost, shipping, delivery, packaging,
            fees, and expected buyer negotiation.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Break-even details</h2>

            <div className="space-y-3">
              <Input label="Item cost" value={itemCost} onChange={setItemCost} prefix="$" />
              <Input label="Shipping cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
              <Input label="Delivery / fuel cost" value={deliveryCost} onChange={setDeliveryCost} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Platform fee rate" value={platformFeeRate} onChange={setPlatformFeeRate} suffix="%" />
              <Input label="Expected negotiation discount" value={negotiationDiscount} onChange={setNegotiationDiscount} suffix="%" />
              <Input label="Target profit" value={targetProfit} onChange={setTargetProfit} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Minimum viable Facebook Marketplace pricing thresholds.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Break-even listing price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />

              <ResultCard
                label="Target profit price"
                value={money(Math.max(0, result.targetProfitPrice))}
                variant="good"
              />

              <ResultCard
                label="Safe buffer price"
                value={money(Math.max(0, result.safeBuffer))}
                variant="info"
              />

              <ResultCard
                label="Aggressive floor"
                value={money(Math.max(0, result.aggressiveFloor))}
                variant="danger"
              />

              <ResultCard
                label="Target margin"
                value={percent(result.targetEval.margin)}
                variant={
                  result.targetEval.margin >= 40
                    ? "good"
                    : result.targetEval.margin >= 15
                    ? "warning"
                    : "danger"
                }
              />

              <ResultCard
                label="Fixed costs"
                value={money(result.fixedCosts)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated break-even listing price is{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.breakEvenPrice))}
                </span>
                . Pricing below this may make the sale unprofitable after
                negotiation and fulfillment costs.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                To earn your target profit, list at approximately{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.targetProfitPrice))}
                </span>
                , which may become about{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.targetEval.acceptedPrice))}
                </span>{" "}
                after buyer negotiation.
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
                          row.label === "Target profit"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.price))}
                        </td>
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.acceptedPrice))}
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
      : status === "Tight"
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
      : status === "Break-even" || status === "Tight"
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