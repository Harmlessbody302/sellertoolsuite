"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "blue" | "warning" | "bad";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    blue: "border-blue-200 bg-blue-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-gray-600">{helper}</p> : null}
    </div>
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
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border border-gray-400 bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix ? (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 text-gray-950 outline-none"
        />

        {suffix ? (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {suffix}
          </span>
        ) : null}
      </div>

      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </label>
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
      ? "bg-emerald-100 text-emerald-700"
      : status === "Moderate"
        ? "bg-amber-100 text-amber-700"
        : status === "Risky"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";

  return (
    <span
      className={`rounded-full font-bold ${styles} ${
        small ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      {status}
    </span>
  );
}

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

    const marginBefore = originalPrice > 0 ? profitBefore / originalPrice : 0;
    const marginAfter = salePrice > 0 ? profitAfter / salePrice : 0;

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
    let recommendation =
      "This discount appears sustainable. It may help increase sales volume without significantly hurting margin.";

    if (profitAfter <= 0) {
      status = "Unprofitable";
      statusText =
        "This discount causes you to lose money or break even on each sale.";
      recommendation =
        "Reduce the discount, increase pricing, lower costs, or avoid discounting this item.";
    } else if (marginAfter < 0.1) {
      status = "Risky";
      statusText = "This discount leaves a very thin margin.";
      recommendation =
        "Only consider this for clearance, liquidation, or short-term customer acquisition.";
    } else if (marginAfter < 0.2) {
      status = "Moderate";
      statusText =
        "This discount still makes profit, but meaningfully reduces your margin.";
      recommendation =
        "Monitor carefully and avoid stacking additional promotions.";
    }

    const comparisonDiscounts = [10, 15, 20, 25, 30].map((rate) => {
      const comparisonSalePrice = originalPrice - originalPrice * (rate / 100);
      const comparisonProfit = comparisonSalePrice - itemCost - feeAmount;
      const comparisonMargin =
        comparisonSalePrice > 0 ? comparisonProfit / comparisonSalePrice : 0;

      let comparisonStatus = "Safe";

      if (comparisonProfit <= 0) comparisonStatus = "Unprofitable";
      else if (comparisonMargin < 0.1) comparisonStatus = "Risky";
      else if (comparisonMargin < 0.2) comparisonStatus = "Moderate";

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
      monthlyProfitLost,
      extraUnitsNeeded,
      maxSafeDiscount,
      status,
      statusText,
      recommendation,
      comparisonDiscounts,
    };
  }, [price, cost, fees, discount, monthlySales]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

  const resultTone =
    result.profitAfter <= 0
      ? "bad"
      : result.marginAfter < 0.1
        ? "bad"
        : result.marginAfter < 0.2
          ? "warning"
          : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Discount Impact Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          See how Etsy discounts and coupons affect your profit, margin, and
          monthly earnings before launching a sale.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Discount inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your regular price, costs, fees, discount amount, and expected
            discounted sales volume.
          </p>

          <div className="mt-6 space-y-4">
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
              helper="Marketplace fees, ads, payment processing, and shipping subsidy."
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
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      Number(discount) === preset
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-700"
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
              helper="Estimated discounted monthly sales."
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Actual results may vary due to Etsy
            fees, refunds, repeat customers, ad traffic, and listing changes.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Discount profitability at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard label="Sale price" value={money(result.salePrice)} tone="blue" />
            <MetricCard label="Discount amount" value={money(result.discountAmount)} tone="blue" />
            <MetricCard label="Profit before discount" value={money(result.profitBefore)} />
            <MetricCard label="Profit after discount" value={money(result.profitAfter)} tone={resultTone} />
            <MetricCard label="Margin before discount" value={percent(result.marginBefore)} />
            <MetricCard label="Margin after discount" value={percent(result.marginAfter)} tone={resultTone} />
            <MetricCard label="Profit lost per sale" value={money(result.profitLostPerSale)} tone="warning" />
            <MetricCard label="Monthly profit lost" value={money(result.monthlyProfitLost)} tone={result.monthlyProfitLost > 0 ? "warning" : "good"} />
            <MetricCard label="Extra sales needed" value={result.extraUnitsNeeded.toLocaleString()} helper="Extra discounted sales needed to offset lost profit" tone="warning" />
            <MetricCard label="Maximum safe discount" value={`${result.maxSafeDiscount.toFixed(1)}%`} helper="Approximate break-even discount" tone="good" />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>
              <p>
                To offset your lost monthly profit of{" "}
                <strong>{money(result.monthlyProfitLost)}</strong>, you would
                need about{" "}
                <strong>{result.extraUnitsNeeded.toLocaleString()}</strong>{" "}
                extra discounted sales.
              </p>
              <p>
                Your estimated break-even discount is about{" "}
                <strong>{result.maxSafeDiscount.toFixed(1)}%</strong>.
              </p>
              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Discount comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Sale price</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {result.comparisonDiscounts.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === Number(discount)
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">{money(row.salePrice)}</td>
                      <td className="px-4 py-3">{money(row.profit)}</td>
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

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Discount Impact Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter original price",
              "Use the normal listing price before any sale, coupon, or promotional discount.",
            ],
            [
              "Add product costs",
              "Include materials, production, packaging, shipping subsidy, and other costs tied to the sale.",
            ],
            [
              "Test discount scenarios",
              "Use preset buttons or enter your own discount to see how profit and margin change.",
            ],
            [
              "Estimate sales volume",
              "Enter the number of discounted orders you expect so monthly profit impact is realistic.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common discount mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Discounting based on competitor pricing instead of your actual profit margin.",
              "Ignoring Etsy fees, payment processing, shipping subsidies, and ad costs during promotions.",
              "Assuming a discount will increase volume enough to replace lost profit.",
              "Running discounts too often and training buyers to wait for sales.",
              "Stacking coupons, sales, free shipping, and ads without recalculating total profit.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Understanding your results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-emerald-700">Safe:</strong> The discount
              still leaves a healthy estimated profit margin.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> The item is
              still profitable, but the discount meaningfully reduces your
              flexibility.
            </p>

            <p>
              <strong className="text-orange-700">Risky:</strong> A small cost
              increase, refund, ad cost, or extra promotion could erase most of
              your profit.
            </p>

            <p>
              <strong className="text-red-700">Unprofitable:</strong> The sale
              price is too low to cover your entered costs and fees.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
            ["/etsy/ad-roi-calculator", "Ad ROI Calculator"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}