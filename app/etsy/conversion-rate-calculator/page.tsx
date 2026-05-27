"use client";

import { useMemo, useState } from "react";

export default function EtsyConversionRateCalculator() {
  const [visits, setVisits] = useState("1000");
  const [orders, setOrders] = useState("25");
  const [averageOrderValue, setAverageOrderValue] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("12");
  const [targetOrders, setTargetOrders] = useState("50");

  const result = useMemo(() => {
    const visitCount = Number(visits) || 0;
    const orderCount = Number(orders) || 0;
    const avgOrderValue = Number(averageOrderValue) || 0;
    const profit = Number(profitPerOrder) || 0;
    const targetOrderCount = Number(targetOrders) || 0;

    const conversionRate =
      visitCount > 0 ? (orderCount / visitCount) * 100 : 0;

    const revenue = orderCount * avgOrderValue;
    const estimatedProfit = orderCount * profit;

    const revenuePerVisit = visitCount > 0 ? revenue / visitCount : 0;
    const profitPerVisit = visitCount > 0 ? estimatedProfit / visitCount : 0;

    const visitsNeededForTarget =
      conversionRate > 0
        ? Math.ceil(targetOrderCount / (conversionRate / 100))
        : 0;

    const additionalVisitsNeeded = Math.max(
      0,
      visitsNeededForTarget - visitCount
    );

    let status = "Strong";
    let statusText =
      "Your conversion rate looks strong. Your listing is turning traffic into orders well.";

    if (conversionRate <= 0) {
      status = "No sales yet";
      statusText =
        "You do not have any orders yet. Focus first on improving your photos, title, price, and offer.";
    } else if (conversionRate < 1) {
      status = "Low";
      statusText =
        "Your conversion rate is low. You may need better photos, clearer listing copy, stronger keywords, or a more competitive price.";
    } else if (conversionRate < 2) {
      status = "Needs work";
      statusText =
        "Your conversion rate is usable, but there is room to improve your listing before pushing more traffic.";
    } else if (conversionRate < 4) {
      status = "Good";
      statusText =
        "Your conversion rate is healthy. More traffic could reasonably turn into more orders.";
    }

    const comparisonRates = [1, 2, 3, 4, 5].map((rate) => {
      const estimatedOrders = Math.floor(visitCount * (rate / 100));
      const estimatedRevenue = estimatedOrders * avgOrderValue;
      const estimatedProfitAtRate = estimatedOrders * profit;

      return {
        rate,
        estimatedOrders,
        estimatedRevenue,
        estimatedProfit: estimatedProfitAtRate,
      };
    });

    return {
      conversionRate,
      revenue,
      estimatedProfit,
      revenuePerVisit,
      profitPerVisit,
      visitsNeededForTarget,
      additionalVisitsNeeded,
      status,
      statusText,
      comparisonRates,
      visitCount,
      orderCount,
      targetOrderCount,
    };
  }, [visits, orders, averageOrderValue, profitPerOrder, targetOrders]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(2)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Etsy Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Etsy Conversion Rate Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Calculate your Etsy conversion rate and estimate how much traffic
            you need to reach your order goals.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Listing details</h2>

            <div className="space-y-4">
              <Input
                label="Listing visits"
                value={visits}
                onChange={setVisits}
                helper="Use visits from Etsy stats for a listing, product group, or whole shop."
              />

              <Input
                label="Orders"
                value={orders}
                onChange={setOrders}
                helper="Use the number of orders from the same time period."
              />

              <Input
                label="Average order value"
                value={averageOrderValue}
                onChange={setAverageOrderValue}
                prefix="$"
              />

              <Input
                label="Profit per order"
                value={profitPerOrder}
                onChange={setProfitPerOrder}
                prefix="$"
                helper="Use your estimated profit after costs, fees, shipping, and ads."
              />

              <Input
                label="Target orders"
                value={targetOrders}
                onChange={setTargetOrders}
                helper="Enter the number of orders you want to reach."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your visits, orders, and average order value.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Conversion rate"
                value={percent(result.conversionRate)}
                variant={
                  result.conversionRate < 1
                    ? "danger"
                    : result.conversionRate < 2
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Estimated revenue"
                value={money(result.revenue)}
              />

              <ResultCard
                label="Estimated profit"
                value={money(result.estimatedProfit)}
                variant={result.estimatedProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Revenue per visit"
                value={money(result.revenuePerVisit)}
              />

              <ResultCard
                label="Profit per visit"
                value={money(result.profitPerVisit)}
              />

              <ResultCard
                label="Visits needed for target"
                value={result.visitsNeededForTarget.toLocaleString()}
                variant="warning"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                At your current conversion rate, you would need about{" "}
                <span className="font-semibold">
                  {result.visitsNeededForTarget.toLocaleString()}
                </span>{" "}
                visits to reach{" "}
                <span className="font-semibold">
                  {result.targetOrderCount.toLocaleString()}
                </span>{" "}
                orders.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                That is approximately{" "}
                <span className="font-semibold">
                  {result.additionalVisitsNeeded.toLocaleString()} additional
                  visits
                </span>{" "}
                beyond your current traffic level.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Conversion comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Rate</th>
                      <th className="px-4 py-3">Orders</th>
                      <th className="px-4 py-3">Revenue</th>
                      <th className="px-4 py-3">Profit</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.comparisonRates.map((row) => (
                      <tr key={row.rate}>
                        <td className="px-4 py-3 font-semibold">
                          {row.rate}%
                        </td>
                        <td className="px-4 py-3">
                          {row.estimatedOrders.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          {money(row.estimatedRevenue)}
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          {money(row.estimatedProfit)}
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
          onChange={(e) => onChange(e.target.value)}
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
  variant?: "default" | "good" | "warning" | "danger";
}) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    danger: "border-red-300 bg-red-50",
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
    status === "Strong" || status === "Good"
      ? "bg-green-100 text-green-700"
      : status === "Needs work"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Low"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}