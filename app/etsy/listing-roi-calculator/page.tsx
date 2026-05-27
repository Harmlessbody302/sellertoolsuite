"use client";

import { useMemo, useState } from "react";

export default function EtsyListingROICalculator() {
  const [visits, setVisits] = useState("1000");
  const [orders, setOrders] = useState("25");
  const [averageOrderValue, setAverageOrderValue] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("12");
  const [listingFees, setListingFees] = useState("5");
  const [adSpend, setAdSpend] = useState("75");
  const [otherCosts, setOtherCosts] = useState("10");

  const result = useMemo(() => {
    const visitCount = Number(visits) || 0;
    const orderCount = Number(orders) || 0;
    const avgOrder = Number(averageOrderValue) || 0;
    const profit = Number(profitPerOrder) || 0;
    const fees = Number(listingFees) || 0;
    const ads = Number(adSpend) || 0;
    const other = Number(otherCosts) || 0;

    const revenue = orderCount * avgOrder;
    const grossProfit = orderCount * profit;
    const totalListingCosts = fees + ads + other;
    const netProfit = grossProfit - totalListingCosts;
    const conversionRate = visitCount > 0 ? (orderCount / visitCount) * 100 : 0;
    const profitPerVisit = visitCount > 0 ? netProfit / visitCount : 0;
    const roi =
      totalListingCosts > 0 ? (netProfit / totalListingCosts) * 100 : 0;
    const breakEvenOrders =
      profit > 0 ? Math.ceil(totalListingCosts / profit) : 0;

    let status = "Profitable";
    let statusText =
      "This listing appears profitable after listing costs, ads, and other expenses.";

    if (netProfit < 0) {
      status = "Losing Money";
      statusText =
        "This listing is currently losing money after costs. Consider improving conversion, reducing ad spend, raising price, or pausing promotion.";
    } else if (netProfit === 0) {
      status = "Break Even";
      statusText =
        "This listing is roughly breaking even. It may need better pricing, higher conversion, or lower costs to become worthwhile.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText =
        "This listing is profitable, but the return is fairly weak. It may be worth optimizing before spending more on ads.";
    } else if (roi >= 100) {
      status = "Strong ROI";
      statusText =
        "This listing has strong return on investment. It may be a good candidate for more traffic, better photos, or additional variations.";
    }

    const scenarios = [
      { label: "Current", orders: orderCount },
      { label: "+10% orders", orders: Math.round(orderCount * 1.1) },
      { label: "+25% orders", orders: Math.round(orderCount * 1.25) },
      { label: "+50% orders", orders: Math.round(orderCount * 1.5) },
    ].map((scenario) => {
      const scenarioGrossProfit = scenario.orders * profit;
      const scenarioNetProfit = scenarioGrossProfit - totalListingCosts;
      const scenarioRoi =
        totalListingCosts > 0
          ? (scenarioNetProfit / totalListingCosts) * 100
          : 0;

      return {
        ...scenario,
        grossProfit: scenarioGrossProfit,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
      };
    });

    return {
      revenue,
      grossProfit,
      totalListingCosts,
      netProfit,
      conversionRate,
      profitPerVisit,
      roi,
      breakEvenOrders,
      status,
      statusText,
      scenarios,
      visitCount,
      orderCount,
    };
  }, [
    visits,
    orders,
    averageOrderValue,
    profitPerOrder,
    listingFees,
    adSpend,
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
            Etsy Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Etsy Listing ROI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate whether an Etsy listing is worth keeping, improving,
            advertising, or retiring based on traffic, orders, profit, and
            listing costs.
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
                helper="Use Etsy listing visits from the same time period as your orders."
              />

              <Input
                label="Orders from this listing"
                value={orders}
                onChange={setOrders}
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
                helper="Profit after product cost, shipping, packaging, marketplace fees, and payment processing."
              />

              <Input
                label="Listing and renewal fees"
                value={listingFees}
                onChange={setListingFees}
                prefix="$"
              />

              <Input
                label="Ad spend"
                value={adSpend}
                onChange={setAdSpend}
                prefix="$"
              />

              <Input
                label="Other listing costs"
                value={otherCosts}
                onChange={setOtherCosts}
                prefix="$"
                helper="Optional: photography, mockups, samples, promoted pins, or other listing-specific costs."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on this listing’s traffic, orders, costs, and profit.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Net listing profit"
                value={money(result.netProfit)}
                variant={
                  result.netProfit < 0
                    ? "danger"
                    : result.netProfit === 0
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Listing ROI"
                value={percent(result.roi)}
                variant={
                  result.roi < 0
                    ? "danger"
                    : result.roi < 25
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard label="Revenue" value={money(result.revenue)} />

              <ResultCard
                label="Gross profit"
                value={money(result.grossProfit)}
              />

              <ResultCard
                label="Total listing costs"
                value={money(result.totalListingCosts)}
                variant="info"
              />

              <ResultCard
                label="Conversion rate"
                value={percent(result.conversionRate)}
              />

              <ResultCard
                label="Profit per visit"
                value={money(result.profitPerVisit)}
              />

              <ResultCard
                label="Break-even orders"
                value={result.breakEvenOrders.toLocaleString()}
                variant="info"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This listing generated{" "}
                <span className="font-semibold">
                  {result.orderCount.toLocaleString()}
                </span>{" "}
                orders from{" "}
                <span className="font-semibold">
                  {result.visitCount.toLocaleString()}
                </span>{" "}
                visits, with an estimated net profit of{" "}
                <span className="font-semibold">
                  {money(result.netProfit)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                You need about{" "}
                <span className="font-semibold">
                  {result.breakEvenOrders.toLocaleString()}
                </span>{" "}
                orders to cover the listing-specific costs entered above.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Order growth scenarios
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Scenario</th>
                      <th className="px-4 py-3">Orders</th>
                      <th className="px-4 py-3">Gross profit</th>
                      <th className="px-4 py-3">Net profit</th>
                      <th className="px-4 py-3">ROI</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-3 font-semibold">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">
                          {row.orders.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          {money(row.grossProfit)}
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          {money(row.netProfit)}
                        </td>
                        <td className="px-4 py-3">{percent(row.roi)}</td>
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
    status === "Strong ROI" || status === "Profitable"
      ? "bg-green-100 text-green-700"
      : status === "Low ROI" || status === "Break Even"
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