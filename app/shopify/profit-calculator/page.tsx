"use client";

import { useMemo, useState } from "react";

export default function ShopifyProfitCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [productCost, setProductCost] = useState("18");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [shippingCost, setShippingCost] = useState("7");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [paymentFeeRate, setPaymentFeeRate] = useState("2.9");
  const [fixedPaymentFee, setFixedPaymentFee] = useState("0.30");
  const [adCost, setAdCost] = useState("5");
  const [appCostPerOrder, setAppCostPerOrder] = useState("1");
  const [returnsAllowance, setReturnsAllowance] = useState("1");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const cost = Number(productCost) || 0;
    const shippingIncome = Number(shippingCharged) || 0;
    const actualShipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const feeRate = Number(paymentFeeRate) || 0;
    const fixedFee = Number(fixedPaymentFee) || 0;
    const ads = Number(adCost) || 0;
    const apps = Number(appCostPerOrder) || 0;
    const returns = Number(returnsAllowance) || 0;

    const totalRevenue = price + shippingIncome;
    const paymentFee = totalRevenue * (feeRate / 100) + fixedFee;

    const totalCosts =
      cost + actualShipping + packaging + paymentFee + ads + apps + returns;

    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;

    const breakEvenPrice =
      feeRate < 100
        ? (cost +
            actualShipping +
            packaging +
            fixedFee +
            ads +
            apps +
            returns -
            shippingIncome) /
          (1 - feeRate / 100)
        : 0;

    const profitBeforeAds = profit + ads;
    const shippingDifference = shippingIncome - actualShipping;
    const shippingLabel =
      shippingDifference < 0 ? "Shipping loss absorbed" : "Shipping surplus";

    let status = "Healthy";
    let statusText =
      "This Shopify order appears profitable after product cost, shipping, payment fees, ads, apps, and returns allowance.";
    let recommendation =
      "This product looks workable. Monitor ad cost, shipping cost, and returns so they do not quietly reduce margin.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This Shopify order is losing money or breaking even after estimated costs.";
      recommendation =
        "Raise price, reduce product cost, lower ad spend, adjust shipping, or reduce app/fulfillment costs before scaling.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This order is profitable, but the margin is thin.";
      recommendation =
        "Small increases in ads, shipping, returns, or discounts could erase profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This order has a strong estimated margin after Shopify-related costs.";
      recommendation =
        "This product may be a good candidate for ads, bundles, upsells, or scaling if demand is strong.";
    }

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioPrice = Math.max(0, price + change);
      const scenarioRevenue = scenarioPrice + shippingIncome;
      const scenarioPaymentFee = scenarioRevenue * (feeRate / 100) + fixedFee;
      const scenarioCosts =
        cost +
        actualShipping +
        packaging +
        scenarioPaymentFee +
        ads +
        apps +
        returns;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

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
      totalRevenue,
      paymentFee,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      profitBeforeAds,
      shippingDifference,
      shippingLabel,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    shippingCharged,
    shippingCost,
    packagingCost,
    paymentFeeRate,
    fixedPaymentFee,
    adCost,
    appCostPerOrder,
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
            Shopify Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shopify Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Shopify profit after product cost, shipping, packaging,
            payment processing, ads, app costs, and returns allowance.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Order details</h2>

            <div className="space-y-4">
              <Input label="Sale price" value={salePrice} onChange={setSalePrice} prefix="$" />
              <Input label="Product cost" value={productCost} onChange={setProductCost} prefix="$" />
              <Input label="Shipping charged to customer" value={shippingCharged} onChange={setShippingCharged} prefix="$" />
              <Input label="Actual shipping cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Payment processing rate" value={paymentFeeRate} onChange={setPaymentFeeRate} suffix="%" />
              <Input label="Fixed payment fee" value={fixedPaymentFee} onChange={setFixedPaymentFee} prefix="$" />
              <Input label="Ad cost per order" value={adCost} onChange={setAdCost} prefix="$" />
              <Input label="App cost per order" value={appCostPerOrder} onChange={setAppCostPerOrder} prefix="$" />
              <Input label="Returns allowance" value={returnsAllowance} onChange={setReturnsAllowance} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Shopify order, cost, fee, and advertising assumptions.
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
                label="Total revenue"
                value={money(result.totalRevenue)}
                variant="info"
              />

              <ResultCard
                label="Payment fee"
                value={money(result.paymentFee)}
              />

              <ResultCard
                label={result.shippingLabel}
                value={money(Math.abs(result.shippingDifference))}
                variant={result.shippingDifference < 0 ? "danger" : "info"}
              />

              <ResultCard
                label="Profit before ads"
                value={money(result.profitBeforeAds)}
                variant="info"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This order brings in{" "}
                <span className="font-semibold">{money(result.totalRevenue)}</span>{" "}
                in total revenue and has estimated total costs of{" "}
                <span className="font-semibold">{money(result.totalCosts)}</span>,
                leaving an estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Estimated payment processing fees are{" "}
                <span className="font-semibold">{money(result.paymentFee)}</span>.
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
                        className={row.change === 0 ? "bg-blue-50 font-semibold" : ""}
                      >
                        <td className="px-4 py-3">
                          {row.change === 0
                            ? "Current"
                            : `${row.change > 0 ? "+" : ""}${money(row.change)}`}
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