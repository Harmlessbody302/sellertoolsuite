"use client";

import { useMemo, useState } from "react";

export default function AmazonBreakEvenCalculator() {
  const [productCost, setProductCost] = useState("10");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [fbaFee, setFbaFee] = useState("5.25");
  const [storageCost, setStorageCost] = useState("0.40");
  const [inboundShipping, setInboundShipping] = useState("1.25");
  const [prepCost, setPrepCost] = useState("0.75");
  const [ppcCost, setPpcCost] = useState("3");
  const [returnsAllowance, setReturnsAllowance] = useState("1");
  const [targetProfit, setTargetProfit] = useState("8");

  const result = useMemo(() => {
    const cost = Number(productCost) || 0;
    const referralRate = Number(referralFeeRate) || 0;
    const fulfillment = Number(fbaFee) || 0;
    const storage = Number(storageCost) || 0;
    const inbound = Number(inboundShipping) || 0;
    const prep = Number(prepCost) || 0;
    const ads = Number(ppcCost) || 0;
    const returns = Number(returnsAllowance) || 0;
    const target = Number(targetProfit) || 0;

    const variableRate = referralRate / 100;

    const fixedCosts =
      cost + fulfillment + storage + inbound + prep + ads + returns;

    const breakEvenPrice =
      variableRate < 1 ? fixedCosts / (1 - variableRate) : 0;

    const targetProfitPrice =
      variableRate < 1 ? (fixedCosts + target) / (1 - variableRate) : 0;

    const safeBufferPrice = targetProfitPrice * 1.15;
    const aggressiveFloorPrice = targetProfitPrice * 0.9;

    const evaluatePrice = (price: number) => {
      const referralFee = price * variableRate;
      const profit = price - fixedCosts - referralFee;
      const margin = price > 0 ? (profit / price) * 100 : 0;

      return {
        referralFee,
        profit,
        margin,
      };
    };

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetEval = evaluatePrice(targetProfitPrice);
    const safeEval = evaluatePrice(safeBufferPrice);
    const aggressiveEval = evaluatePrice(aggressiveFloorPrice);

    let status = "Healthy";
    let statusText =
      "Your cost structure produces a workable Amazon break-even price.";
    let recommendation =
      "Compare this price against competing listings before sourcing or scaling the product.";

    if (breakEvenPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The break-even price could not be calculated with the current fee assumptions.";
      recommendation =
        "Check that referral fee rate is below 100% and that your cost assumptions are realistic.";
    } else if (breakEvenPrice > targetProfitPrice * 0.9) {
      status = "Tight";
      statusText =
        "Your break-even price is close to your target-profit price.";
      recommendation =
        "There may not be much room for price competition, coupons, extra PPC, or higher return costs.";
    } else if (targetEval.margin >= 25) {
      status = "Strong";
      statusText =
        "Your target-profit price leaves a strong estimated Amazon margin.";
      recommendation =
        "This product may have enough pricing room if demand and competition also look favorable.";
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
        status: targetEval.margin >= 25 ? "Strong" : "Healthy",
      },
      {
        label: "Aggressive",
        price: aggressiveFloorPrice,
        ...aggressiveEval,
        status: aggressiveEval.profit > 0 ? "Healthy" : "Risky",
      },
      {
        label: "Safe buffer",
        price: safeBufferPrice,
        ...safeEval,
        status: safeEval.margin >= 25 ? "Strong" : "Healthy",
      },
    ];

    return {
      fixedCosts,
      breakEvenPrice,
      targetProfitPrice,
      safeBufferPrice,
      aggressiveFloorPrice,
      breakEvenEval,
      targetEval,
      safeEval,
      aggressiveEval,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    productCost,
    referralFeeRate,
    fbaFee,
    storageCost,
    inboundShipping,
    prepCost,
    ppcCost,
    returnsAllowance,
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
            Amazon Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Amazon Break-Even Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate the minimum Amazon sale price needed to avoid losing money
            after referral fees, FBA costs, PPC, storage, returns, and prep
            costs.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Break-even details</h2>

            <div className="space-y-4">
              <Input
                label="Product cost"
                value={productCost}
                onChange={setProductCost}
                prefix="$"
              />

              <Input
                label="Referral fee rate"
                value={referralFeeRate}
                onChange={setReferralFeeRate}
                suffix="%"
              />

              <Input
                label="FBA fulfillment fee"
                value={fbaFee}
                onChange={setFbaFee}
                prefix="$"
              />

              <Input
                label="Storage cost"
                value={storageCost}
                onChange={setStorageCost}
                prefix="$"
              />

              <Input
                label="Inbound shipping"
                value={inboundShipping}
                onChange={setInboundShipping}
                prefix="$"
              />

              <Input
                label="Prep / packaging cost"
                value={prepCost}
                onChange={setPrepCost}
                prefix="$"
              />

              <Input
                label="PPC cost per sale"
                value={ppcCost}
                onChange={setPpcCost}
                prefix="$"
              />

              <Input
                label="Returns allowance"
                value={returnsAllowance}
                onChange={setReturnsAllowance}
                prefix="$"
              />

              <Input
                label="Target profit"
                value={targetProfit}
                onChange={setTargetProfit}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Minimum viable Amazon pricing thresholds.
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
                value={money(result.safeBufferPrice)}
                variant="info"
              />

              <ResultCard
                label="Aggressive floor"
                value={money(result.aggressiveFloorPrice)}
                variant="danger"
              />

              <ResultCard
                label="Target margin"
                value={percent(result.targetEval.margin)}
                variant={
                  result.targetEval.margin >= 25
                    ? "good"
                    : result.targetEval.margin >= 10
                    ? "warning"
                    : "danger"
                }
              />

              <ResultCard
                label="Total fixed costs"
                value={money(result.fixedCosts)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated break-even sale price is{" "}
                <span className="font-semibold">
                  {money(result.breakEvenPrice)}
                </span>
                . At that price, profit is approximately{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.breakEvenEval.profit))}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                To generate your target profit, list at approximately{" "}
                <span className="font-semibold">
                  {money(result.targetProfitPrice)}
                </span>
                , which produces an estimated margin of{" "}
                <span className="font-semibold">
                  {percent(result.targetEval.margin)}
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
      : status === "Break-even"
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