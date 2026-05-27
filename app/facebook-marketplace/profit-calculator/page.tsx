"use client";

import { useMemo, useState } from "react";

export default function FacebookMarketplaceProfitCalculator() {
  const [salePrice, setSalePrice] = useState("80");
  const [itemCost, setItemCost] = useState("35");
  const [shippingCharged, setShippingCharged] = useState("0");
  const [shippingCost, setShippingCost] = useState("0");
  const [deliveryCost, setDeliveryCost] = useState("5");
  const [packagingCost, setPackagingCost] = useState("1");
  const [platformFeeRate, setPlatformFeeRate] = useState("0");
  const [otherCosts, setOtherCosts] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const cost = Number(itemCost) || 0;
    const chargedShipping = Number(shippingCharged) || 0;
    const actualShipping = Number(shippingCost) || 0;
    const delivery = Number(deliveryCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const feeRate = Number(platformFeeRate) || 0;
    const other = Number(otherCosts) || 0;

    const revenue = price + chargedShipping;
    const platformFee = revenue * (feeRate / 100);
    const totalCosts =
      cost + actualShipping + delivery + packaging + platformFee + other;

    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const breakEvenPrice = totalCosts - chargedShipping;
    const fulfillmentCost = actualShipping + delivery + packaging;

    let status = "Healthy";
    let statusText =
      "This Facebook Marketplace sale appears profitable after item cost and fulfillment costs.";
    let recommendation =
      "This listing looks workable. Compare against similar local listings before accepting offers.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This sale may lose money after item cost, delivery, shipping, packaging, and other costs.";
      recommendation =
        "Raise your price, reduce delivery/shipping costs, or avoid accepting offers below your break-even point.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This sale is profitable, but the margin is thin.";
      recommendation =
        "Be careful with buyer negotiations, delivery promises, and discounts because small changes could erase profit.";
    } else if (margin >= 35) {
      status = "Strong";
      statusText =
        "This sale has a strong estimated margin.";
      recommendation =
        "This item may have room for negotiation, local delivery, or price flexibility.";
    }

    const scenarios = [-20, -10, 0, 10, 20].map((change) => {
      const scenarioPrice = Math.max(0, price + change);
      const scenarioRevenue = scenarioPrice + chargedShipping;
      const scenarioFee = scenarioRevenue * (feeRate / 100);
      const scenarioCosts =
        cost + actualShipping + delivery + packaging + scenarioFee + other;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      let scenarioStatus = "Healthy";
      if (scenarioProfit <= 0) scenarioStatus = "Losing";
      else if (scenarioMargin < 15) scenarioStatus = "Thin";
      else if (scenarioMargin >= 35) scenarioStatus = "Strong";

      return {
        change,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      revenue,
      platformFee,
      totalCosts,
      fulfillmentCost,
      profit,
      margin,
      roi,
      breakEvenPrice,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    itemCost,
    shippingCharged,
    shippingCost,
    deliveryCost,
    packagingCost,
    platformFeeRate,
    otherCosts,
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
            Facebook Marketplace Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate profit from local pickup, delivery, or shipped Facebook
            Marketplace sales after item cost, delivery, shipping, packaging,
            and other selling expenses.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Sale details</h2>

            <div className="space-y-3">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
              />

              <Input
                label="Shipping charged to buyer"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
                helper="Use 0 for local pickup or free shipping."
              />

              <Input
                label="Actual shipping cost"
                value={shippingCost}
                onChange={setShippingCost}
                prefix="$"
              />

              <Input
                label="Delivery / fuel cost"
                value={deliveryCost}
                onChange={setDeliveryCost}
                prefix="$"
                helper="Estimated cost for meeting locally or delivering the item."
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
              />

              <Input
                label="Platform fee rate"
                value={platformFeeRate}
                onChange={setPlatformFeeRate}
                suffix="%"
                helper="Use 0 for local cash pickup if no platform fee applies."
              />

              <Input
                label="Other selling costs"
                value={otherCosts}
                onChange={setOtherCosts}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your sale price, item cost, and fulfillment costs.
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
                  result.margin < 15
                    ? "warning"
                    : result.margin >= 35
                    ? "good"
                    : "default"
                }
              />

              <ResultCard
                label="ROI on item cost"
                value={percent(result.roi)}
                variant="info"
              />

              <ResultCard
                label="Break-even sale price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />

              <ResultCard
                label="Total revenue"
                value={money(result.revenue)}
                variant="info"
              />

              <ResultCard
                label="Fulfillment costs"
                value={money(result.fulfillmentCost)}
              />

              <ResultCard
                label="Total costs"
                value={money(result.totalCosts)}
              />

              <ResultCard
                label="Platform fees"
                value={money(result.platformFee)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This sale brings in{" "}
                <span className="font-semibold">{money(result.revenue)}</span>{" "}
                in total revenue and has estimated total costs of{" "}
                <span className="font-semibold">
                  {money(result.totalCosts)}
                </span>
                , leaving estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated break-even sale price is{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.breakEvenPrice))}
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
                      <th className="px-4 py-3">Change</th>
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
      className={`inline-flex min-w-[88px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}