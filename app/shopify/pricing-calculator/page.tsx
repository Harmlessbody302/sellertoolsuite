"use client";

import { useMemo, useState } from "react";

export default function ShopifyPricingCalculator() {
  const [productCost, setProductCost] = useState("18");
  const [shippingCost, setShippingCost] = useState("7");
  const [packagingCost, setPackagingCost] = useState("1.50");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [paymentRate, setPaymentRate] = useState("2.9");
  const [fixedPaymentFee, setFixedPaymentFee] = useState("0.30");
  const [adCost, setAdCost] = useState("5");
  const [appCost, setAppCost] = useState("1");
  const [returnsAllowance, setReturnsAllowance] = useState("1");
  const [targetProfit, setTargetProfit] = useState("15");
  const [targetMargin, setTargetMargin] = useState("30");

  const result = useMemo(() => {
    const cost = Number(productCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const shippingIncome = Number(shippingCharged) || 0;
    const rate = Number(paymentRate) || 0;
    const fixed = Number(fixedPaymentFee) || 0;
    const ads = Number(adCost) || 0;
    const apps = Number(appCost) || 0;
    const returns = Number(returnsAllowance) || 0;
    const desiredProfit = Number(targetProfit) || 0;
    const desiredMargin = Number(targetMargin) || 0;

    const variableRate = rate / 100;

    const fixedCosts =
      cost + shipping + packaging + fixed + ads + apps + returns;

    const breakEvenPrice =
      variableRate < 1
        ? (fixedCosts - shippingIncome) / (1 - variableRate)
        : 0;

    const targetProfitPrice =
      variableRate < 1
        ? (fixedCosts + desiredProfit - shippingIncome) / (1 - variableRate)
        : 0;

    const targetMarginPrice =
      variableRate + desiredMargin / 100 < 1
        ? (fixedCosts - shippingIncome) /
          (1 - variableRate - desiredMargin / 100)
        : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice
    );

    const totalRevenue = recommendedPrice + shippingIncome;
    const paymentFee = totalRevenue * variableRate + fixed;
    const totalCosts =
      cost + shipping + packaging + paymentFee + ads + apps + returns;

    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "The recommended Shopify price appears workable based on your costs, fees, and pricing targets.";
    let recommendation =
      "Use this as a pricing estimate, then compare against your market, conversion rate, and customer willingness to pay.";

    if (recommendedPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The pricing target could not be calculated with the current assumptions.";
      recommendation =
        "Check that your fee rate and target margin are realistic.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "The recommended price creates profit, but the margin is thin.";
      recommendation =
        "Consider raising your price, lowering fulfillment costs, reducing ad cost, or improving average order value.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "The recommended Shopify price leaves a strong estimated margin.";
      recommendation =
        "This price may leave enough room for ads, discounts, returns, and profit if the market supports it.";
    }

    const scenarios = [
      { label: "Break-even", price: breakEvenPrice },
      { label: "Target profit", price: targetProfitPrice },
      { label: "Target margin", price: targetMarginPrice },
      { label: "Recommended", price: recommendedPrice },
    ].map((scenario) => {
      const scenarioRevenue = scenario.price + shippingIncome;
      const scenarioPaymentFee = scenarioRevenue * variableRate + fixed;
      const scenarioCosts =
        cost +
        shipping +
        packaging +
        scenarioPaymentFee +
        ads +
        apps +
        returns;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Break-even";
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
      fixedCosts,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      totalRevenue,
      paymentFee,
      totalCosts,
      profit,
      margin,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    shippingCharged,
    paymentRate,
    fixedPaymentFee,
    adCost,
    appCost,
    returnsAllowance,
    targetProfit,
    targetMargin,
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
            Shopify Pricing Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Find a profitable Shopify selling price based on product cost,
            shipping, payment fees, ads, app costs, target profit, and target
            margin.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Pricing details</h2>

            <div className="space-y-4">
              <Input
                label="Product cost"
                value={productCost}
                onChange={setProductCost}
                prefix="$"
              />

              <Input
                label="Actual shipping cost"
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

              <Input
                label="Shipping charged to customer"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
              />

              <Input
                label="Payment processing rate"
                value={paymentRate}
                onChange={setPaymentRate}
                suffix="%"
              />

              <Input
                label="Fixed payment fee"
                value={fixedPaymentFee}
                onChange={setFixedPaymentFee}
                prefix="$"
              />

              <Input
                label="Ad cost per order"
                value={adCost}
                onChange={setAdCost}
                prefix="$"
              />

              <Input
                label="App cost per order"
                value={appCost}
                onChange={setAppCost}
                prefix="$"
              />

              <Input
                label="Returns allowance"
                value={returnsAllowance}
                onChange={setReturnsAllowance}
                prefix="$"
              />

              <Input
                label="Target profit"
                value={targetProfit}
                onChange={setTargetProfit}
                prefix="$"
              />

              <Input
                label="Target margin"
                value={targetMargin}
                onChange={setTargetMargin}
                suffix="%"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Shopify costs, fees, and pricing targets.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Recommended price"
                value={money(Math.max(0, result.recommendedPrice))}
                variant="info"
              />

              <ResultCard
                label="Estimated profit"
                value={money(result.profit)}
                variant={result.profit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Estimated margin"
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
                label="Break-even price"
                value={money(Math.max(0, result.breakEvenPrice))}
                variant="warning"
              />

              <ResultCard
                label="Target profit price"
                value={money(Math.max(0, result.targetProfitPrice))}
              />

              <ResultCard
                label="Target margin price"
                value={money(Math.max(0, result.targetMarginPrice))}
              />

              <ResultCard
                label="Payment fee at price"
                value={money(result.paymentFee)}
              />

              <ResultCard
                label="Total costs at price"
                value={money(result.totalCosts)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Recommended pricing is{" "}
                <span className="font-semibold">
                  {money(Math.max(0, result.recommendedPrice))}
                </span>
                , producing estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>{" "}
                at{" "}
                <span className="font-semibold">
                  {percent(result.margin)}
                </span>{" "}
                margin.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Estimated payment fees at this price are{" "}
                <span className="font-semibold">
                  {money(result.paymentFee)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
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
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.price))}
                        </td>
                        <td className="px-4 py-3">
                          {money(Math.max(0, row.profit))}
                        </td>
                        <td className="px-4 py-3">
                          {percent(Math.max(0, row.margin))}
                        </td>
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
      : status === "Check Inputs"
      ? "bg-blue-100 text-blue-700"
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
      : status === "Thin" || status === "Break-even"
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