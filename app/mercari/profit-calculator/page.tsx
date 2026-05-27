"use client";

import { useMemo, useState } from "react";

export default function MercariProfitCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [productCost, setProductCost] = useState("18");
  const [shippingCost, setShippingCost] = useState("7");
  const [packagingCost, setPackagingCost] = useState("1.5");
  const [mercariFeeRate, setMercariFeeRate] = useState("10");
  const [paymentProcessingFee, setPaymentProcessingFee] = useState("2.9");
  const [fixedFee, setFixedFee] = useState("0.50");
  const [promotionCost, setPromotionCost] = useState("2");
  const [returnsAllowance, setReturnsAllowance] = useState("1");

  const result = useMemo(() => {
    const sale = Number(salePrice) || 0;
    const product = Number(productCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const mercariFee = (Number(mercariFeeRate) || 0) / 100;
    const processingFee = (Number(paymentProcessingFee) || 0) / 100;
    const fixed = Number(fixedFee) || 0;
    const promo = Number(promotionCost) || 0;
    const returns = Number(returnsAllowance) || 0;

    const marketplaceFees =
      sale * mercariFee +
      sale * processingFee +
      fixed;

    const totalCosts =
      product +
      shipping +
      packaging +
      marketplaceFees +
      promo +
      returns;

    const profit = sale - totalCosts;
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    const roi = product > 0 ? (profit / product) * 100 : 0;
    const breakEven = totalCosts;
    const feePercent = sale > 0 ? (marketplaceFees / sale) * 100 : 0;

    let status = "Healthy";

    if (profit <= 0) status = "Loss";
    else if (margin < 15) status = "Low";
    else if (margin > 30) status = "Strong";

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioSale = sale + change;
      const scenarioFees =
        scenarioSale * mercariFee +
        scenarioSale * processingFee +
        fixed;

      const scenarioProfit =
        scenarioSale -
        (
          product +
          shipping +
          packaging +
          scenarioFees +
          promo +
          returns
        );

      const scenarioMargin =
        scenarioSale > 0
          ? (scenarioProfit / scenarioSale) * 100
          : 0;

      return {
        label:
          change === 0
            ? "Current"
            : `${change > 0 ? "+" : ""}${change}`,
        sale: scenarioSale,
        profit: scenarioProfit,
        margin: scenarioMargin,
      };
    });

    return {
      profit,
      margin,
      roi,
      breakEven,
      feePercent,
      totalCosts,
      marketplaceFees,
      status,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    shippingCost,
    packagingCost,
    mercariFeeRate,
    paymentProcessingFee,
    fixedFee,
    promotionCost,
    returnsAllowance,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) =>
    `${value.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Mercari Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mercari Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Mercari profit after marketplace fees,
            shipping, packaging, promotions, and returns.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Listing details
            </h2>

            <div className="space-y-4">
              <Input label="Sale price" value={salePrice} onChange={setSalePrice} prefix="$" />
              <Input label="Product cost" value={productCost} onChange={setProductCost} prefix="$" />
              <Input label="Shipping cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Mercari selling fee" value={mercariFeeRate} onChange={setMercariFeeRate} suffix="%" />
              <Input label="Payment processing fee" value={paymentProcessingFee} onChange={setPaymentProcessingFee} suffix="%" />
              <Input label="Fixed processing fee" value={fixedFee} onChange={setFixedFee} prefix="$" />
              <Input label="Promotion cost" value={promotionCost} onChange={setPromotionCost} prefix="$" />
              <Input label="Returns allowance" value={returnsAllowance} onChange={setReturnsAllowance} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Mercari profitability estimate.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Estimated profit" value={money(result.profit)} variant="good" />
              <ResultCard label="Profit margin" value={percent(result.margin)} variant="good" />
              <ResultCard label="ROI" value={percent(result.roi)} variant="info" />
              <ResultCard label="Break-even price" value={money(result.breakEven)} variant="warning" />
              <ResultCard label="Mercari fees" value={money(result.marketplaceFees)} />
              <ResultCard label="Fee percentage" value={percent(result.feePercent)} />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your Mercari listing produces estimated profit of{" "}
                <strong>{money(result.profit)}</strong> at a{" "}
                <strong>{percent(result.margin)}</strong> margin.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Total Mercari platform fees are approximately{" "}
                <strong>{money(result.marketplaceFees)}</strong>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Compare your sale price against similar Mercari
                listings before sourcing inventory.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Price comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Change</th>
                      <th className="px-4 py-3">Sale price</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Margin</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3">{money(row.sale)}</td>
                        <td className="px-4 py-3">{money(row.profit)}</td>
                        <td className="px-4 py-3">{percent(row.margin)}</td>
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

function Input({ label, value, onChange, prefix, suffix }: any) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <div className="flex overflow-hidden rounded-xl border bg-white">
        {prefix && <span className="bg-slate-100 px-3 py-2">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 outline-none"
        />
        {suffix && <span className="bg-slate-100 px-3 py-2">{suffix}</span>}
      </div>
    </label>
  );
}

function ResultCard({ label, value, variant = "default" }: any) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    info: "border-blue-300 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: any) {
  const style =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Low"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Loss"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${style}`}>
      {status}
    </span>
  );
}