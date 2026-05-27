"use client";

import { useMemo, useState } from "react";

export default function ShopifyFeeCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [paymentRate, setPaymentRate] = useState("2.9");
  const [fixedFee, setFixedFee] = useState("0.30");
  const [transactionFee, setTransactionFee] = useState("0");
  const [appCost, setAppCost] = useState("1");
  const [returnsAllowance, setReturnsAllowance] = useState("1");
  const [otherFees, setOtherFees] = useState("0");

  const result = useMemo(() => {
    const sale = Number(salePrice) || 0;
    const shipping = Number(shippingCharged) || 0;
    const payment = Number(paymentRate) || 0;
    const fixed = Number(fixedFee) || 0;
    const transaction = Number(transactionFee) || 0;
    const apps = Number(appCost) || 0;
    const returns = Number(returnsAllowance) || 0;
    const other = Number(otherFees) || 0;

    const revenue = sale + shipping;
    const paymentFee = revenue * (payment / 100) + fixed;
    const transactionCost = revenue * (transaction / 100);

    const totalFees = paymentFee + transactionCost + apps + returns + other;
    const feePercent = revenue > 0 ? (totalFees / revenue) * 100 : 0;
    const netAfterFees = revenue - totalFees;

    let status = "Healthy";
    let statusText =
      "Your Shopify fee structure looks manageable based on the order revenue entered.";
    let recommendation =
      "This fee structure leaves reasonable room for product cost, ads, shipping, returns, and profit.";

    if (feePercent < 10) {
      status = "Excellent";
      statusText =
        "Your Shopify fees are low relative to the order revenue.";
      recommendation =
        "Your current Shopify fee structure is efficient and leaves strong margin room for ads, discounts, and returns.";
    } else if (feePercent >= 25) {
      status = "High Cost";
      statusText =
        "Shopify-related fees and per-order costs are consuming a large share of order revenue.";
      recommendation =
        "Review app costs, transaction fees, returns allowance, and payment processing assumptions before scaling.";
    } else if (feePercent >= 15) {
      status = "Moderate";
      statusText =
        "Shopify fees are meaningful and should be watched closely.";
      recommendation =
        "Make sure your product margin can absorb fees, ads, discounts, returns, and shipping costs.";
    }

    const scenarios = [2.4, 2.9, 3.4, 4.0].map((rate) => {
      const scenarioPayment = revenue * (rate / 100) + fixed;
      const scenarioTotal =
        scenarioPayment + transactionCost + apps + returns + other;

      const scenarioPercent =
        revenue > 0 ? (scenarioTotal / revenue) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioPercent < 10) scenarioStatus = "Excellent";
      else if (scenarioPercent >= 25) scenarioStatus = "High Cost";
      else if (scenarioPercent >= 15) scenarioStatus = "Moderate";

      return {
        rate,
        total: scenarioTotal,
        percent: scenarioPercent,
        net: revenue - scenarioTotal,
        status: scenarioStatus,
      };
    });

    return {
      revenue,
      paymentFee,
      transactionCost,
      totalFees,
      feePercent,
      netAfterFees,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    paymentRate,
    fixedFee,
    transactionFee,
    appCost,
    returnsAllowance,
    otherFees,
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
            Shopify Fee Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Shopify payment processing, transaction fees, app costs,
            returns allowance, and total fee impact.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Fee details</h2>

            <div className="space-y-4">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Shipping charged"
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
                value={fixedFee}
                onChange={setFixedFee}
                prefix="$"
              />

              <Input
                label="Additional transaction fee"
                value={transactionFee}
                onChange={setTransactionFee}
                suffix="%"
                helper="Use 0 if you are using Shopify Payments and no extra transaction fee applies."
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
                label="Other fees"
                value={otherFees}
                onChange={setOtherFees}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Shopify fee and order revenue assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Total fees"
                value={money(result.totalFees)}
                variant={
                  result.status === "High Cost"
                    ? "danger"
                    : result.status === "Moderate"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Fee percentage"
                value={percent(result.feePercent)}
                variant={
                  result.status === "High Cost"
                    ? "danger"
                    : result.status === "Moderate"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard label="Payment fee" value={money(result.paymentFee)} />

              <ResultCard
                label="Net after fees"
                value={money(result.netAfterFees)}
                variant={result.netAfterFees > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Transaction fee"
                value={money(result.transactionCost)}
              />

              <ResultCard
                label="Gross revenue"
                value={money(result.revenue)}
                variant="info"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Total estimated Shopify fees are{" "}
                <span className="font-semibold">
                  {money(result.totalFees)}
                </span>
                , consuming{" "}
                <span className="font-semibold">
                  {percent(result.feePercent)}
                </span>{" "}
                of order revenue.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Payment processing alone contributes{" "}
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
                Processing rate comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Rate</th>
                      <th className="px-4 py-3">Total fees</th>
                      <th className="px-4 py-3">Fee %</th>
                      <th className="px-4 py-3">Net</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.rate}
                        className={
                          row.rate === Number(paymentRate)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.rate}%</td>
                        <td className="px-4 py-3">{money(row.total)}</td>
                        <td className="px-4 py-3">{percent(row.percent)}</td>
                        <td className="px-4 py-3">{money(row.net)}</td>
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
    status === "Excellent" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
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
    status === "Excellent" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
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