"use client";

import { useMemo, useState } from "react";

export default function ShopifyBreakEvenCalculator() {
  const [productCost, setProductCost] = useState("18");
  const [shippingCost, setShippingCost] = useState("7");
  const [packagingCost, setPackagingCost] = useState("1.5");
  const [paymentRate, setPaymentRate] = useState("2.9");
  const [fixedFee, setFixedFee] = useState("0.30");
  const [adCost, setAdCost] = useState("5");
  const [appCost, setAppCost] = useState("1");
  const [returnsAllowance, setReturnsAllowance] = useState("1");
  const [shippingCharged, setShippingCharged] = useState("5");

  const result = useMemo(() => {
    const product = Number(productCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const rate = (Number(paymentRate) || 0) / 100;
    const fixed = Number(fixedFee) || 0;
    const ads = Number(adCost) || 0;
    const app = Number(appCost) || 0;
    const returns = Number(returnsAllowance) || 0;
    const charged = Number(shippingCharged) || 0;

    const fixedCosts =
      product +
      shipping +
      packaging +
      ads +
      app +
      returns -
      charged;

    const breakEven =
      (fixedCosts + fixed) / (1 - rate);

    const safePrice = breakEven * 1.2;
    const aggressivePrice = breakEven * 1.08;
    const targetProfitPrice = breakEven + 15;

    const marginAtTarget =
      ((targetProfitPrice -
        (targetProfitPrice * rate + fixed + fixedCosts)) /
        targetProfitPrice) *
      100;

    let status = "Healthy";

    if (breakEven > 60) status = "High";
    else if (breakEven > 45) status = "Watch";

    const scenarios = [
      {
        label: "Break-even",
        price: breakEven,
      },
      {
        label: "Aggressive",
        price: aggressivePrice,
      },
      {
        label: "Target",
        price: targetProfitPrice,
      },
      {
        label: "Safe buffer",
        price: safePrice,
      },
    ].map((scenario) => {
      const fees = scenario.price * rate + fixed;
      const profit = scenario.price - fees - fixedCosts;
      const margin =
        scenario.price > 0
          ? (profit / scenario.price) * 100
          : 0;

      let rowStatus = "Healthy";

      if (profit <= 0) rowStatus = "Break-even";
      else if (margin > 25) rowStatus = "Strong";

      return {
        ...scenario,
        profit,
        margin,
        status: rowStatus,
      };
    });

    return {
      fixedCosts,
      breakEven,
      safePrice,
      aggressivePrice,
      targetProfitPrice,
      marginAtTarget,
      status,
      scenarios,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    paymentRate,
    fixedFee,
    adCost,
    appCost,
    returnsAllowance,
    shippingCharged,
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
            Shopify Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shopify Break-Even Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Calculate the minimum Shopify sale price required to
            avoid losing money after product costs, shipping,
            payment fees, ads, apps, and returns.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Break-even details
            </h2>

            <div className="space-y-4">
              <Input label="Product cost" value={productCost} onChange={setProductCost} prefix="$" />
              <Input label="Actual shipping cost" value={shippingCost} onChange={setShippingCost} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Shipping charged to customer" value={shippingCharged} onChange={setShippingCharged} prefix="$" />
              <Input label="Payment processing rate" value={paymentRate} onChange={setPaymentRate} suffix="%" />
              <Input label="Fixed payment fee" value={fixedFee} onChange={setFixedFee} prefix="$" />
              <Input label="Ad cost per order" value={adCost} onChange={setAdCost} prefix="$" />
              <Input label="App cost per order" value={appCost} onChange={setAppCost} prefix="$" />
              <Input label="Returns allowance" value={returnsAllowance} onChange={setReturnsAllowance} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Minimum viable Shopify pricing thresholds.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Break-even price" value={money(result.breakEven)} variant="warning" />
              <ResultCard label="Target profit price" value={money(result.targetProfitPrice)} variant="good" />
              <ResultCard label="Safe buffer price" value={money(result.safePrice)} variant="info" />
              <ResultCard label="Aggressive floor" value={money(result.aggressivePrice)} variant="danger" />
              <ResultCard label="Target margin" value={percent(result.marginAtTarget)} />
              <ResultCard label="Fixed costs" value={money(result.fixedCosts)} />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated Shopify break-even sale price is{" "}
                <strong>{money(result.breakEven)}</strong>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Pricing near this point leaves no meaningful profit.
                A safer operating range begins around{" "}
                <strong>{money(result.safePrice)}</strong>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                To generate stronger margins, consider pricing closer
                to <strong>{money(result.targetProfitPrice)}</strong>.
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
                      <tr key={row.label}>
                        <td className="px-4 py-3">{row.label}</td>
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

function StatusBadge({ status }: any) {
  const style =
    status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Watch"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${style}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: any) {
  const style =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Break-even"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}