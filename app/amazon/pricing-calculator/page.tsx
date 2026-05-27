"use client";

import { useMemo, useState } from "react";

export default function AmazonPricingCalculator() {
  const [productCost, setProductCost] = useState("10");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [fbaFee, setFbaFee] = useState("5.25");
  const [storageCost, setStorageCost] = useState("0.40");
  const [inboundShipping, setInboundShipping] = useState("1.25");
  const [prepCost, setPrepCost] = useState("0.75");
  const [ppcCost, setPpcCost] = useState("3");
  const [returnsAllowance, setReturnsAllowance] = useState("1");
  const [targetProfit, setTargetProfit] = useState("8");
  const [targetMargin, setTargetMargin] = useState("25");

  const result = useMemo(() => {
    const cost = Number(productCost) || 0;
    const referralRate = Number(referralFeeRate) || 0;
    const fulfillment = Number(fbaFee) || 0;
    const storage = Number(storageCost) || 0;
    const inbound = Number(inboundShipping) || 0;
    const prep = Number(prepCost) || 0;
    const ads = Number(ppcCost) || 0;
    const returns = Number(returnsAllowance) || 0;
    const targetProfitValue = Number(targetProfit) || 0;
    const targetMarginValue = Number(targetMargin) || 0;

    const fixedCosts =
      cost + fulfillment + storage + inbound + prep + ads + returns;

    const breakEvenPrice =
      fixedCosts / (1 - referralRate / 100);

    const targetProfitPrice =
      (fixedCosts + targetProfitValue) /
      (1 - referralRate / 100);

    const targetMarginPrice =
      fixedCosts /
      (1 - referralRate / 100 - targetMarginValue / 100);

    const recommendedPrice = Math.max(
      targetProfitPrice,
      targetMarginPrice
    );

    const referralFee =
      recommendedPrice * (referralRate / 100);

    const totalFees =
      referralFee + fulfillment + storage;

    const profit = recommendedPrice - fixedCosts - referralFee;

    const margin =
      recommendedPrice > 0
        ? (profit / recommendedPrice) * 100
        : 0;

    let status = "Healthy";
    let message =
      "This pricing recommendation appears workable based on your Amazon FBA assumptions.";

    if (margin >= 25) {
      status = "Strong";
      message =
        "This pricing recommendation produces a strong projected margin.";
    } else if (margin < 12) {
      status = "Thin Margin";
      message =
        "This pricing recommendation leaves limited room for unexpected costs or competition.";
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
      const fee = scenario.price * (referralRate / 100);
      const scenarioProfit =
        scenario.price - fixedCosts - fee;

      const scenarioMargin =
        scenario.price > 0
          ? (scenarioProfit / scenario.price) * 100
          : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Break-even";
      else if (scenarioMargin >= 25) scenarioStatus = "Strong";
      else if (scenarioMargin < 12)
        scenarioStatus = "Thin";

      return {
        ...scenario,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      totalFees,
      profit,
      margin,
      status,
      message,
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
    targetMargin,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) =>
    `${value.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Amazon Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Amazon Pricing Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Find a profitable Amazon selling price based on product cost,
            referral fees, FBA costs, PPC assumptions, target profit, and
            target margin.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Pricing details
            </h2>

            <div className="space-y-4">
              <Input label="Product cost" value={productCost} onChange={setProductCost} prefix="$" />
              <Input label="Referral fee rate" value={referralFeeRate} onChange={setReferralFeeRate} suffix="%" />
              <Input label="FBA fulfillment fee" value={fbaFee} onChange={setFbaFee} prefix="$" />
              <Input label="Storage cost" value={storageCost} onChange={setStorageCost} prefix="$" />
              <Input label="Inbound shipping" value={inboundShipping} onChange={setInboundShipping} prefix="$" />
              <Input label="Prep / packaging cost" value={prepCost} onChange={setPrepCost} prefix="$" />
              <Input label="PPC cost per sale" value={ppcCost} onChange={setPpcCost} prefix="$" />
              <Input label="Returns allowance" value={returnsAllowance} onChange={setReturnsAllowance} prefix="$" />
              <Input label="Target profit" value={targetProfit} onChange={setTargetProfit} prefix="$" />
              <Input label="Target margin" value={targetMargin} onChange={setTargetMargin} suffix="%" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Amazon pricing targets.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Recommended price"
                value={money(result.recommendedPrice)}
                variant="info"
              />

              <ResultCard
                label="Estimated profit"
                value={money(result.profit)}
                variant="good"
              />

              <ResultCard
                label="Estimated margin"
                value={percent(result.margin)}
                variant="good"
              />

              <ResultCard
                label="Break-even price"
                value={money(result.breakEvenPrice)}
                variant="warning"
              />

              <ResultCard
                label="Target profit price"
                value={money(result.targetProfitPrice)}
              />

              <ResultCard
                label="Target margin price"
                value={money(result.targetMarginPrice)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">
                What this means
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.message}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Recommended pricing is{" "}
                <span className="font-semibold">
                  {money(result.recommendedPrice)}
                </span>
                , producing estimated profit of{" "}
                <span className="font-semibold">
                  {money(result.profit)}
                </span>{" "}
                at{" "}
                <span className="font-semibold">
                  {percent(result.margin)}
                </span>{" "}
                margin.
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
                          row.label === "Recommended"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">
                          {money(row.price)}
                        </td>
                        <td className="px-4 py-3">
                          {money(row.profit)}
                        </td>
                        <td className="px-4 py-3">
                          {percent(row.margin)}
                        </td>
                        <td className="px-4 py-3">
                          <SmallStatusBadge
                            status={row.status}
                          />
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

function Input({ label, value, onChange, prefix, suffix }: any) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border bg-white">
        {prefix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

function ResultCard({ label, value, variant = "default" }: any) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
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
      : status === "Thin Margin"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: any) {
  const styles =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Thin"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Break-even"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}