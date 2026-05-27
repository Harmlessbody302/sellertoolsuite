"use client";

import { useMemo, useState } from "react";

export default function AmazonFBAProfitCalculator() {
  const [salePrice, setSalePrice] = useState("35");
  const [productCost, setProductCost] = useState("10");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [fbaFee, setFbaFee] = useState("5.25");
  const [inboundShipping, setInboundShipping] = useState("1.25");
  const [prepPackagingCost, setPrepPackagingCost] = useState("0.75");
  const [storageCost, setStorageCost] = useState("0.40");
  const [ppcCost, setPpcCost] = useState("3");
  const [returnsAllowance, setReturnsAllowance] = useState("1");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const cost = Number(productCost) || 0;
    const referralRate = Number(referralFeeRate) || 0;
    const fulfillment = Number(fbaFee) || 0;
    const inbound = Number(inboundShipping) || 0;
    const prep = Number(prepPackagingCost) || 0;
    const storage = Number(storageCost) || 0;
    const ads = Number(ppcCost) || 0;
    const returns = Number(returnsAllowance) || 0;

    const referralFee = price * (referralRate / 100);
    const totalAmazonFees = referralFee + fulfillment + storage;
    const totalCosts =
      cost + totalAmazonFees + inbound + prep + ads + returns;

    const profit = price - totalCosts;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;

    const breakEvenPrice =
      referralRate < 100
        ? (cost + fulfillment + storage + inbound + prep + ads + returns) /
          (1 - referralRate / 100)
        : 0;

    const profitBeforeAds = price - (totalCosts - ads);
    const acos = price > 0 ? (ads / price) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "This Amazon FBA product appears profitable after referral fees, FBA fees, ads, storage, and other costs.";
    let recommendation =
      "This product looks workable. Compare the margin against your category, competition, and expected return rate before scaling.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This product is losing money or breaking even after estimated FBA costs.";
      recommendation =
        "Raise the sale price, reduce product cost, lower ad spend, or review FBA and storage costs before scaling.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This product is profitable, but the margin is thin.";
      recommendation =
        "Be careful with PPC, returns, storage, and price competition. Small changes could erase profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This product has a strong estimated margin after Amazon FBA costs.";
      recommendation =
        "This may be a strong product candidate if demand, reviews, competition, and inventory risk are also favorable.";
    }

    const scenarios = [-5, 0, 5, 10, 15].map((change) => {
      const scenarioPrice = Math.max(0, price + change);
      const scenarioReferral = scenarioPrice * (referralRate / 100);
      const scenarioCosts =
        cost +
        scenarioReferral +
        fulfillment +
        storage +
        inbound +
        prep +
        ads +
        returns;
      const scenarioProfit = scenarioPrice - scenarioCosts;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

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
      referralFee,
      totalAmazonFees,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      profitBeforeAds,
      acos,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    referralFeeRate,
    fbaFee,
    inboundShipping,
    prepPackagingCost,
    storageCost,
    ppcCost,
    returnsAllowance,
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
            Amazon FBA Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Amazon FBA profit after product cost, referral fees, FBA
            fulfillment fees, inbound shipping, storage, PPC, returns, and prep
            costs.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Product details</h2>

            <div className="space-y-4">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Product cost"
                value={productCost}
                onChange={setProductCost}
                prefix="$"
                helper="Your landed product cost or supplier cost per unit."
              />

              <Input
                label="Referral fee rate"
                value={referralFeeRate}
                onChange={setReferralFeeRate}
                suffix="%"
                helper="Use your estimated Amazon category referral fee."
              />

              <Input
                label="FBA fulfillment fee"
                value={fbaFee}
                onChange={setFbaFee}
                prefix="$"
              />

              <Input
                label="Inbound shipping per unit"
                value={inboundShipping}
                onChange={setInboundShipping}
                prefix="$"
                helper="Estimated cost to ship inventory to Amazon per unit."
              />

              <Input
                label="Prep / packaging cost"
                value={prepPackagingCost}
                onChange={setPrepPackagingCost}
                prefix="$"
              />

              <Input
                label="Storage cost per unit"
                value={storageCost}
                onChange={setStorageCost}
                prefix="$"
              />

              <Input
                label="PPC / ad cost per sale"
                value={ppcCost}
                onChange={setPpcCost}
                prefix="$"
              />

              <Input
                label="Returns allowance"
                value={returnsAllowance}
                onChange={setReturnsAllowance}
                prefix="$"
                helper="Optional estimated cost per sale for returns, refunds, or replacements."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Amazon FBA fee, cost, and advertising
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
                label="ROI on product cost"
                value={percent(result.roi)}
                variant={result.roi > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Break-even price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />

              <ResultCard
                label="Total Amazon fees"
                value={money(result.totalAmazonFees)}
              />

              <ResultCard
                label="Referral fee"
                value={money(result.referralFee)}
              />

              <ResultCard
                label="Profit before advertising"
                value={money(result.profitBeforeAds)}
                variant="info"
              />

              <ResultCard
                label="Ad cost of sale"
                value={percent(result.acos)}
                variant="warning"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This product has estimated total costs of{" "}
                <span className="font-semibold">
                  {money(result.totalCosts)}
                </span>
                , leaving an estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>{" "}
                per sale.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Amazon fees are estimated at{" "}
                <span className="font-semibold">
                  {money(result.totalAmazonFees)}
                </span>
                , including a referral fee of{" "}
                <span className="font-semibold">
                  {money(result.referralFee)}
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