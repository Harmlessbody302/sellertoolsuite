"use client";

import { useMemo, useState } from "react";

export default function DiscountImpactCalculator() {
  const [price, setPrice] = useState("25");
  const [cost, setCost] = useState("8");
  const [fees, setFees] = useState("3");
  const [discount, setDiscount] = useState("20");
  const [monthlySales, setMonthlySales] = useState("100");

  const result = useMemo(() => {
    const originalPrice = Number(price) || 0;
    const itemCost = Number(cost) || 0;
    const feeAmount = Number(fees) || 0;
    const discountPercent = Number(discount) || 0;
    const sales = Number(monthlySales) || 0;

    const discountAmount = originalPrice * (discountPercent / 100);
    const salePrice = Math.max(0, originalPrice - discountAmount);

    const profitBefore = originalPrice - itemCost - feeAmount;
    const profitAfter = salePrice - itemCost - feeAmount;

    const marginBefore =
      originalPrice > 0 ? (profitBefore / originalPrice) * 100 : 0;

    const marginAfter = salePrice > 0 ? (profitAfter / salePrice) * 100 : 0;

    const profitLostPerSale = profitBefore - profitAfter;
    const monthlyProfitBefore = profitBefore * sales;
    const monthlyProfitAfter = profitAfter * sales;
    const monthlyProfitLost = monthlyProfitBefore - monthlyProfitAfter;

    const extraUnitsNeeded =
      profitAfter > 0 && monthlyProfitLost > 0
        ? Math.ceil(monthlyProfitLost / profitAfter)
        : 0;

    const breakEvenPrice = itemCost + feeAmount;
    const maxSafeDiscount =
      originalPrice > 0
        ? ((originalPrice - breakEvenPrice) / originalPrice) * 100
        : 0;

    let status = "Safe";
    let statusText = "This discount still leaves you with healthy profit.";

    if (profitAfter <= 0) {
      status = "Unprofitable";
      statusText =
        "This discount causes you to lose money or break even on each sale.";
    } else if (marginAfter < 10) {
      status = "Risky";
      statusText =
        "This discount leaves a very thin margin. It may only make sense for clearance, liquidation, or customer acquisition.";
    } else if (marginAfter < 20) {
      status = "Moderate";
      statusText =
        "This discount still makes profit, but it meaningfully reduces your margin.";
    }

    const lossSeverity =
      monthlyProfitLost <= 0
        ? "good"
        : monthlyProfitLost < monthlyProfitBefore * 0.15
        ? "good"
        : monthlyProfitLost < monthlyProfitBefore * 0.35
        ? "warning"
        : "danger";

    const comparisonDiscounts = [10, 15, 20, 25, 30].map((rate) => {
      const comparisonSalePrice = originalPrice - originalPrice * (rate / 100);
      const comparisonProfit = comparisonSalePrice - itemCost - feeAmount;
      const comparisonMargin =
        comparisonSalePrice > 0
          ? (comparisonProfit / comparisonSalePrice) * 100
          : 0;

      let comparisonStatus = "Safe";

      if (comparisonProfit <= 0) comparisonStatus = "Unprofitable";
      else if (comparisonMargin < 10) comparisonStatus = "Risky";
      else if (comparisonMargin < 20) comparisonStatus = "Moderate";

      return {
        rate,
        salePrice: comparisonSalePrice,
        profit: comparisonProfit,
        margin: comparisonMargin,
        status: comparisonStatus,
      };
    });

    return {
      salePrice,
      discountAmount,
      profitBefore,
      profitAfter,
      marginBefore,
      marginAfter,
      profitLostPerSale,
      monthlyProfitBefore,
      monthlyProfitAfter,
      monthlyProfitLost,
      extraUnitsNeeded,
      maxSafeDiscount,
      status,
      statusText,
      lossSeverity,
      comparisonDiscounts,
      sales,
    };
  }, [price, cost, fees, discount, monthlySales]);

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
            Discount Impact Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            See how a sale or coupon affects your profit, margin, and monthly
            earnings before running a discount.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Discount details</h2>

            <div className="space-y-4">
              <Input
                label="Original item price"
                value={price}
                onChange={setPrice}
                prefix="$"
              />

              <Input
                label="Item cost"
                value={cost}
                onChange={setCost}
                prefix="$"
                helper="Materials, production, packaging, or product cost."
              />

              <Input
                label="Estimated fees"
                value={fees}
                onChange={setFees}
                prefix="$"
                helper="Marketplace fees, payment processing, shipping subsidy, ads, etc."
              />

              <div>
                <Input
                  label="Discount percentage"
                  value={discount}
                  onChange={setDiscount}
                  suffix="%"
                />

                <div className="mt-2 flex flex-wrap gap-2">
                  {[10, 15, 20, 25, 30].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDiscount(String(preset))}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        Number(discount) === preset
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
                label="Expected sales volume"
                value={monthlySales}
                onChange={setMonthlySales}
                helper="Use your estimated number of discounted orders."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on the discount and cost details entered.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Sale price" value={money(result.salePrice)} />
              <ResultCard
                label="Discount amount"
                value={money(result.discountAmount)}
              />
              <ResultCard
                label="Profit before discount"
                value={money(result.profitBefore)}
              />
              <ResultCard
                label="Profit after discount"
                value={money(result.profitAfter)}
                variant={
                  result.profitAfter <= 0
                    ? "danger"
                    : result.marginAfter < 20
                    ? "warning"
                    : "good"
                }
              />
              <ResultCard
                label="Margin before discount"
                value={percent(result.marginBefore)}
              />
              <ResultCard
                label="Margin after discount"
                value={percent(result.marginAfter)}
                variant={
                  result.marginAfter < 10
                    ? "danger"
                    : result.marginAfter < 20
                    ? "warning"
                    : "good"
                }
              />
              <ResultCard
                label="Profit lost per sale"
                value={money(result.profitLostPerSale)}
                variant={result.profitLostPerSale > 0 ? "warning" : "good"}
              />
              <ResultCard
                label="Monthly profit lost"
                value={money(result.monthlyProfitLost)}
                variant={result.lossSeverity}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                To offset the{" "}
                <span className="font-semibold">
                  {money(result.monthlyProfitLost)}
                </span>{" "}
                profit reduction from discounting{" "}
                <span className="font-semibold">
                  {result.sales.toLocaleString()}
                </span>{" "}
                orders, you would need about{" "}
                <span className="font-semibold">
                  {result.extraUnitsNeeded.toLocaleString()} additional
                  discounted sales
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated break-even discount is around{" "}
                <span className="font-semibold">
                  {percent(Math.max(0, result.maxSafeDiscount))}
                </span>
                . Discounts above that may make the item unprofitable.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Discount comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Sale price</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Margin</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.comparisonDiscounts.map((row) => (
                      <tr key={row.rate}>
                        <td className="px-4 py-3 font-semibold">
                          {row.rate}%
                        </td>
                        <td className="px-4 py-3">{money(row.salePrice)}</td>
                        <td className="px-4 py-3 font-semibold">
                          {money(row.profit)}
                        </td>
                        <td className="px-4 py-3">{percent(row.margin)}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.status} small />
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

function StatusBadge({
  status,
  small = false,
}: {
  status: string;
  small?: boolean;
}) {
  const styles =
    status === "Safe"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Risky"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full font-semibold ${styles} ${
        small ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      {status}
    </span>
  );
}