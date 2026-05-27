"use client";

import { useMemo, useState } from "react";

export default function EtsyBundlePricingCalculator() {
  const [itemOnePrice, setItemOnePrice] = useState("18");
  const [itemOneCost, setItemOneCost] = useState("5");
  const [itemTwoPrice, setItemTwoPrice] = useState("15");
  const [itemTwoCost, setItemTwoCost] = useState("4");
  const [itemThreePrice, setItemThreePrice] = useState("12");
  const [itemThreeCost, setItemThreeCost] = useState("3");
  const [bundleDiscount, setBundleDiscount] = useState("15");
  const [fees, setFees] = useState("5");
  const [shippingCost, setShippingCost] = useState("6");
  const [packagingCost, setPackagingCost] = useState("1.50");

  const result = useMemo(() => {
    const p1 = Number(itemOnePrice) || 0;
    const c1 = Number(itemOneCost) || 0;
    const p2 = Number(itemTwoPrice) || 0;
    const c2 = Number(itemTwoCost) || 0;
    const p3 = Number(itemThreePrice) || 0;
    const c3 = Number(itemThreeCost) || 0;
    const discount = Number(bundleDiscount) || 0;
    const feeAmount = Number(fees) || 0;
    const shipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;

    const separatePrice = p1 + p2 + p3;
    const productCosts = c1 + c2 + c3;
    const discountAmount = separatePrice * (discount / 100);
    const bundlePrice = Math.max(0, separatePrice - discountAmount);
    const totalBundleCosts = productCosts + feeAmount + shipping + packaging;
    const bundleProfit = bundlePrice - totalBundleCosts;
    const separateProfit = separatePrice - totalBundleCosts;
    const profitDifference = bundleProfit - separateProfit;
    const margin = bundlePrice > 0 ? (bundleProfit / bundlePrice) * 100 : 0;

    const breakEvenBundlePrice = totalBundleCosts;
    const recommendedBundlePrice = totalBundleCosts * 1.3;
    const maxSafeDiscount =
      separatePrice > 0
        ? ((separatePrice - breakEvenBundlePrice) / separatePrice) * 100
        : 0;

    let status = "Healthy";
    let statusText =
      "This bundle remains profitable after the discount, costs, shipping, packaging, and estimated fees.";
    let recommendation =
      "This bundle discount looks reasonable. It may help increase order value while still preserving profit.";

    if (bundleProfit <= 0) {
      status = "Unprofitable";
      statusText =
        "This bundle is losing money or breaking even after costs.";
      recommendation =
        "Reduce the discount, raise the bundle price, lower fulfillment costs, or remove one item from the bundle.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This bundle is profitable, but the margin is very thin.";
      recommendation =
        "Use caution before promoting this bundle. A small fee, shipping, or cost change could make it unprofitable.";
    } else if (margin < 20) {
      status = "Moderate";
      statusText =
        "This bundle is profitable, but the discount meaningfully reduces your margin.";
      recommendation =
        "This can work if the bundle increases order volume or helps move inventory, but avoid stacking extra discounts.";
    } else if (margin >= 35) {
      status = "Strong";
      statusText =
        "This bundle has a strong profit margin even after the discount.";
      recommendation =
        "This may be a good bundle to feature, advertise, or use as an upsell.";
    }

    const scenarios = [0, 5, 10, discount, 20, 25].map((rate) => {
      const scenarioDiscountAmount = separatePrice * (rate / 100);
      const scenarioPrice = Math.max(0, separatePrice - scenarioDiscountAmount);
      const scenarioProfit = scenarioPrice - totalBundleCosts;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Unprofitable";
      else if (scenarioMargin < 10) scenarioStatus = "Thin";
      else if (scenarioMargin >= 35) scenarioStatus = "Strong";

      return {
        rate,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    const uniqueScenarios = scenarios.filter(
      (scenario, index, array) =>
        array.findIndex((item) => item.rate === scenario.rate) === index
    );

    return {
      separatePrice,
      productCosts,
      discountAmount,
      bundlePrice,
      totalBundleCosts,
      bundleProfit,
      separateProfit,
      profitDifference,
      margin,
      breakEvenBundlePrice,
      recommendedBundlePrice,
      maxSafeDiscount,
      status,
      statusText,
      recommendation,
      scenarios: uniqueScenarios,
    };
  }, [
    itemOnePrice,
    itemOneCost,
    itemTwoPrice,
    itemTwoCost,
    itemThreePrice,
    itemThreeCost,
    bundleDiscount,
    fees,
    shippingCost,
    packagingCost,
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
            Etsy Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Etsy Bundle Pricing Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate whether a discounted Etsy bundle is still profitable after
            item costs, shipping, packaging, and estimated fees.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Bundle details</h2>

            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Item 1 price"
                  value={itemOnePrice}
                  onChange={setItemOnePrice}
                  prefix="$"
                />
                <Input
                  label="Item 1 cost"
                  value={itemOneCost}
                  onChange={setItemOneCost}
                  prefix="$"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Item 2 price"
                  value={itemTwoPrice}
                  onChange={setItemTwoPrice}
                  prefix="$"
                />
                <Input
                  label="Item 2 cost"
                  value={itemTwoCost}
                  onChange={setItemTwoCost}
                  prefix="$"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Item 3 price"
                  value={itemThreePrice}
                  onChange={setItemThreePrice}
                  prefix="$"
                />
                <Input
                  label="Item 3 cost"
                  value={itemThreeCost}
                  onChange={setItemThreeCost}
                  prefix="$"
                />
              </div>

              <div>
                <Input
                  label="Bundle discount"
                  value={bundleDiscount}
                  onChange={setBundleDiscount}
                  suffix="%"
                  helper="Enter the discount compared with selling the items separately."
                />

                <div className="mt-2 flex flex-wrap gap-2">
                  {[5, 10, 15, 20, 25].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setBundleDiscount(String(preset))}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        Number(bundleDiscount) === preset
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Estimated fees"
                value={fees}
                onChange={setFees}
                prefix="$"
                helper="Use estimated Etsy, payment, ad, and transaction-related fees."
              />

              <Input
                label="Shipping cost"
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
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your bundle discount, item costs, fees, and
                  fulfillment costs.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Bundle price"
                value={money(result.bundlePrice)}
                variant="info"
              />

              <ResultCard
                label="Bundle profit"
                value={money(result.bundleProfit)}
                variant={result.bundleProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Bundle margin"
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
                label="Customer savings"
                value={money(result.discountAmount)}
                variant="info"
              />

              <ResultCard
                label="Separate item value"
                value={money(result.separatePrice)}
              />

              <ResultCard
                label="Total bundle costs"
                value={money(result.totalBundleCosts)}
              />

              <ResultCard
                label="Break-even bundle price"
                value={money(result.breakEvenBundlePrice)}
                variant="warning"
              />

              <ResultCard
                label="Suggested safe price"
                value={money(result.recommendedBundlePrice)}
                variant="info"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Selling these items separately would total{" "}
                <span className="font-semibold">
                  {money(result.separatePrice)}
                </span>
                . With the selected discount, the bundle price is{" "}
                <span className="font-semibold">
                  {money(result.bundlePrice)}
                </span>
                , leaving an estimated profit of{" "}
                <span className="font-semibold">
                  {money(result.bundleProfit)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated maximum break-even discount is about{" "}
                <span className="font-semibold">
                  {percent(Math.max(0, result.maxSafeDiscount))}
                </span>
                . Discounts above that may make the bundle unprofitable.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Bundle discount comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Bundle price</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Margin</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.rate}
                        className={
                          row.rate === Number(bundleDiscount)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.rate}%</td>
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
      : status === "Moderate" || status === "Thin Margin"
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