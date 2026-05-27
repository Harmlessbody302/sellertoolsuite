"use client";

import { useMemo, useState } from "react";

export default function ShopifyAdROICalculator() {
  const [monthlyAdSpend, setMonthlyAdSpend] = useState("500");
  const [ordersFromAds, setOrdersFromAds] = useState("35");
  const [averageOrderValue, setAverageOrderValue] = useState("45");
  const [profitPerOrderBeforeAds, setProfitPerOrderBeforeAds] = useState("18");
  const [conversionRate, setConversionRate] = useState("2.5");
  const [clickCost, setClickCost] = useState("0.75");

  const result = useMemo(() => {
    const spend = Number(monthlyAdSpend) || 0;
    const orders = Number(ordersFromAds) || 0;
    const aov = Number(averageOrderValue) || 0;
    const profitPerOrder = Number(profitPerOrderBeforeAds) || 0;
    const conversion = Number(conversionRate) || 0;
    const cpc = Number(clickCost) || 0;

    const revenue = orders * aov;
    const grossProfit = orders * profitPerOrder;
    const netProfit = grossProfit - spend;
    const roas = spend > 0 ? revenue / spend : 0;
    const roi = spend > 0 ? (netProfit / spend) * 100 : 0;
    const costPerOrder = orders > 0 ? spend / orders : 0;
    const breakEvenOrders =
      profitPerOrder > 0 ? Math.ceil(spend / profitPerOrder) : 0;
    const breakEvenCpc =
      conversion > 0 ? profitPerOrder * (conversion / 100) : 0;
    const estimatedClicks = cpc > 0 ? spend / cpc : 0;

    let status = "Healthy";
    let statusText =
      "Your Shopify ads appear profitable based on the ad spend and order assumptions entered.";
    let recommendation =
      "This ad campaign looks workable. Keep monitoring cost per order, conversion rate, and profit per order.";

    if (netProfit <= 0) {
      status = "Losing Money";
      statusText =
        "Your Shopify ads appear to be losing money after ad spend.";
      recommendation =
        "Reduce ad spend, improve conversion rate, raise average order value, or increase profit per order before scaling.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText =
        "Your Shopify ads are profitable, but the return is weak.";
      recommendation =
        "Consider testing better creatives, landing pages, offers, or targeting before increasing spend.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "Your Shopify ads appear to be generating strong return after ad spend.";
      recommendation =
        "This campaign may be worth scaling carefully while monitoring whether performance holds at higher spend.";
    }

    const scenarios = [0.75, 1, 1.25, 1.5].map((multiplier) => {
      const scenarioSpend = spend * multiplier;
      const scenarioOrders = orders * multiplier;
      const scenarioRevenue = scenarioOrders * aov;
      const scenarioGrossProfit = scenarioOrders * profitPerOrder;
      const scenarioNetProfit = scenarioGrossProfit - scenarioSpend;
      const scenarioRoi =
        scenarioSpend > 0 ? (scenarioNetProfit / scenarioSpend) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioNetProfit <= 0) scenarioStatus = "Losing Money";
      else if (scenarioRoi < 25) scenarioStatus = "Low ROI";
      else if (scenarioRoi >= 100) scenarioStatus = "Strong";

      return {
        label:
          multiplier === 1
            ? "Current"
            : `${Math.round(multiplier * 100)}% spend`,
        spend: scenarioSpend,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
        status: scenarioStatus,
      };
    });

    return {
      revenue,
      grossProfit,
      netProfit,
      roas,
      roi,
      costPerOrder,
      breakEvenOrders,
      breakEvenCpc,
      estimatedClicks,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlyAdSpend,
    ordersFromAds,
    averageOrderValue,
    profitPerOrderBeforeAds,
    conversionRate,
    clickCost,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const number = (value: number) =>
    value.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Shopify Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shopify Ad ROI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate whether your Shopify ads are generating profitable orders
            after ad spend, cost per order, ROAS, and campaign ROI.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Ad details</h2>

            <div className="space-y-4">
              <Input
                label="Monthly ad spend"
                value={monthlyAdSpend}
                onChange={setMonthlyAdSpend}
                prefix="$"
              />

              <Input
                label="Orders from ads"
                value={ordersFromAds}
                onChange={setOrdersFromAds}
              />

              <Input
                label="Average order value"
                value={averageOrderValue}
                onChange={setAverageOrderValue}
                prefix="$"
              />

              <Input
                label="Profit per order before ads"
                value={profitPerOrderBeforeAds}
                onChange={setProfitPerOrderBeforeAds}
                prefix="$"
              />

              <Input
                label="Conversion rate"
                value={conversionRate}
                onChange={setConversionRate}
                suffix="%"
              />

              <Input
                label="Average click cost"
                value={clickCost}
                onChange={setClickCost}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Shopify ad spend, orders, and profit
                  assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Net ad profit"
                value={money(result.netProfit)}
                variant={result.netProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Ad ROI"
                value={percent(result.roi)}
                variant={
                  result.roi < 0
                    ? "danger"
                    : result.roi < 25
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard label="ROAS" value={`${result.roas.toFixed(2)}x`} />

              <ResultCard
                label="Cost per order"
                value={money(result.costPerOrder)}
                variant="warning"
              />

              <ResultCard
                label="Break-even orders"
                value={`${result.breakEvenOrders} orders`}
                variant="info"
              />

              <ResultCard
                label="Break-even CPC"
                value={money(result.breakEvenCpc)}
                variant="info"
              />

              <ResultCard
                label="Revenue from ads"
                value={money(result.revenue)}
              />

              <ResultCard
                label="Estimated clicks"
                value={number(result.estimatedClicks)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your ads generated an estimated{" "}
                <span className="font-semibold">{money(result.revenue)}</span>{" "}
                in revenue and{" "}
                <span className="font-semibold">
                  {money(result.grossProfit)}
                </span>{" "}
                in gross profit before ad spend.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                After ad spend, estimated campaign profit is{" "}
                <span className="font-semibold">
                  {money(result.netProfit)}
                </span>{" "}
                with an ad ROI of{" "}
                <span className="font-semibold">{percent(result.roi)}</span>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Ad spend comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Scenario</th>
                      <th className="px-4 py-3">Spend</th>
                      <th className="px-4 py-3">Orders</th>
                      <th className="px-4 py-3">Net profit</th>
                      <th className="px-4 py-3">ROI</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.label}
                        className={
                          row.label === "Current"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3">{money(row.spend)}</td>
                        <td className="px-4 py-3">{number(row.orders)}</td>
                        <td className="px-4 py-3">{money(row.netProfit)}</td>
                        <td className="px-4 py-3">{percent(row.roi)}</td>
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
      : status === "Low ROI"
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
      : status === "Low ROI"
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