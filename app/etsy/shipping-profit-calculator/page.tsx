"use client";

import { useMemo, useState } from "react";

export default function EtsyShippingProfitCalculator() {
  const [itemPrice, setItemPrice] = useState("35");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [actualShippingCost, setActualShippingCost] = useState("8");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [productCost, setProductCost] = useState("10");
  const [fees, setFees] = useState("4");

  const result = useMemo(() => {
    const price = Number(itemPrice) || 0;
    const charged = Number(shippingCharged) || 0;
    const shippingCost = Number(actualShippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const cost = Number(productCost) || 0;
    const feeAmount = Number(fees) || 0;

    const totalRevenue = price + charged;
    const totalCosts = shippingCost + packaging + cost + feeAmount;
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const shippingDifference = charged - shippingCost;
    const shippingLabel =
      shippingDifference < 0 ? "Shipping subsidy required" : "Shipping surplus";

    const breakEvenShipping = Math.max(
      0,
      shippingCost + packaging + cost + feeAmount - price
    );

    const freeShippingProfit =
      price - (shippingCost + packaging + cost + feeAmount);

    const flat5Profit = price + 5 - totalCosts;
    const flat10Profit = price + 10 - totalCosts;

    let status = "Healthy";
    let statusText =
      "Your shipping setup appears sustainable and leaves a healthy margin.";
    let recommendation =
      "Your shipping pricing appears competitive while maintaining healthy profit.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This setup is losing money after shipping, packaging, product cost, and fees.";
      recommendation =
        "Consider raising your item price, charging more for shipping, lowering packaging costs, or adjusting the listing before scaling sales.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "You are still profitable, but shipping and fulfillment costs are leaving a thin margin.";
      recommendation =
        "Consider increasing your item price slightly or reducing fulfillment costs before offering larger discounts or ads.";
    } else if (shippingDifference < 0 && margin < 25) {
      status = "Shipping Drag";
      statusText =
        "The listing is profitable, but you are subsidizing shipping.";
      recommendation =
        "Make sure your item price is high enough to absorb the shipping subsidy without weakening your margin.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "Shipping costs are well covered by your pricing, and profitability remains strong.";
      recommendation =
        "This shipping setup looks sustainable. You may be able to test free shipping, bundles, or small promotions while preserving profit.";
    }

    const scenarios = [
      { label: "Free shipping", charge: 0 },
      { label: "$5 flat", charge: 5 },
      { label: "Current", charge: charged },
      { label: "$10 flat", charge: 10 },
    ].map((scenario) => {
      const scenarioRevenue = price + scenario.charge;
      const scenarioProfit = scenarioRevenue - totalCosts;
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
      totalCosts,
      profit,
      margin,
      shippingDifference,
      shippingLabel,
      breakEvenShipping,
      freeShippingProfit,
      flat5Profit,
      flat10Profit,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    itemPrice,
    shippingCharged,
    actualShippingCost,
    packagingCost,
    productCost,
    fees,
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
            Etsy Shipping Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate how shipping charges, packaging, and fulfillment costs
            affect your Etsy listing profitability.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Shipping details</h2>

            <div className="space-y-4">
              <Input
                label="Item price"
                value={itemPrice}
                onChange={setItemPrice}
                prefix="$"
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
                value={actualShippingCost}
                onChange={setActualShippingCost}
                prefix="$"
                helper="What you actually pay to ship the order."
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
                helper="Boxes, mailers, labels, tape, inserts, and other packaging costs."
              />

              <Input
                label="Product cost"
                value={productCost}
                onChange={setProductCost}
                prefix="$"
              />

              <Input
                label="Marketplace fees"
                value={fees}
                onChange={setFees}
                prefix="$"
                helper="Use your estimated Etsy fees, payment fees, and ad-related fees."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your item price, shipping charge, and fulfillment
                  costs.
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
                value={money(result.breakEvenShipping)}
                variant="warning"
              />

              <ResultCard
                label="Total costs"
                value={money(result.totalCosts)}
              />

              <ResultCard
                label="Free shipping profit"
                value={money(result.freeShippingProfit)}
                variant={result.freeShippingProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="$5 flat shipping profit"
                value={money(result.flat5Profit)}
                variant={result.flat5Profit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="$10 flat shipping profit"
                value={money(result.flat10Profit)}
                variant={result.flat10Profit > 0 ? "good" : "danger"}
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
                  You are covering{" "}
                  <span className="font-semibold">
                    {money(Math.abs(result.shippingDifference))}
                  </span>{" "}
                  of the shipping cost inside your item price or profit margin.
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Your shipping charge is covering the shipping cost with an
                  extra{" "}
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
                      <tr key={row.label}>
                        <td className="px-4 py-3 font-semibold">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">{money(row.charge)}</td>
                        <td className="px-4 py-3 font-semibold">
                          {money(row.profit)}
                        </td>
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