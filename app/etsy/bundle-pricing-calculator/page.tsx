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

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Moderate" || status === "Thin Margin"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Thin"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsyBundlePricingCalculator() {
  const [itemOnePrice, setItemOnePrice] = useState("18");
  const [itemOneCost, setItemOneCost] = useState("5");
  const [itemTwoPrice, setItemTwoPrice] = useState("15");
  const [itemTwoCost, setItemTwoCost] = useState("4");
  const [itemThreePrice, setItemThreePrice] = useState("12");
  const [itemThreeCost, setItemThreeCost] = useState("3");
  const [bundleDiscount, setBundleDiscount] = useState("15");
  const [fees, setFees] = useState("5");
  const [shippingCost, setShippingCost] = useState("6");
  const [packagingCost, setPackagingCost] = useState("1.50");

  const result = useMemo(() => {
    const p1 = Number(itemOnePrice) || 0;
    const c1 = Number(itemOneCost) || 0;
    const p2 = Number(itemTwoPrice) || 0;
    const c2 = Number(itemTwoCost) || 0;
    const p3 = Number(itemThreePrice) || 0;
    const c3 = Number(itemThreeCost) || 0;
    const discount = Number(bundleDiscount) || 0;
    const feeAmount = Number(fees) || 0;
    const shipping = Number(shippingCost) || 0;
    const packaging = Number(packagingCost) || 0;

    const separatePrice = p1 + p2 + p3;
    const productCosts = c1 + c2 + c3;
    const discountAmount = separatePrice * (discount / 100);
    const bundlePrice = Math.max(0, separatePrice - discountAmount);
    const totalBundleCosts = productCosts + feeAmount + shipping + packaging;
    const bundleProfit = bundlePrice - totalBundleCosts;
    const separateProfit = separatePrice - totalBundleCosts;
    const profitDifference = bundleProfit - separateProfit;
    const margin = bundlePrice > 0 ? bundleProfit / bundlePrice : 0;
    const costShare = bundlePrice > 0 ? totalBundleCosts / bundlePrice : 0;

    const breakEvenBundlePrice = totalBundleCosts;
    const recommendedBundlePrice = totalBundleCosts * 1.3;
    const maxSafeDiscount =
      separatePrice > 0
        ? ((separatePrice - breakEvenBundlePrice) / separatePrice) * 100
        : 0;

    let status = "Healthy";
    let statusText =
      "This bundle remains profitable after the discount, item costs, shipping, packaging, and estimated fees.";
    let recommendation =
      "This bundle discount looks reasonable. It may help increase order value while still preserving profit.";

    if (bundleProfit <= 0) {
      status = "Unprofitable";
      statusText = "This bundle is losing money or breaking even after costs.";
      recommendation =
        "Reduce the discount, raise the bundle price, lower fulfillment costs, or remove one item from the bundle.";
    } else if (margin < 0.1) {
      status = "Thin Margin";
      statusText = "This bundle is profitable, but the margin is very thin.";
      recommendation =
        "Use caution before promoting this bundle. A small fee, shipping, refund, or cost change could make it unprofitable.";
    } else if (margin < 0.2) {
      status = "Moderate";
      statusText =
        "This bundle is profitable, but the discount meaningfully reduces your margin.";
      recommendation =
        "This can work if the bundle increases order volume or helps move inventory, but avoid stacking extra discounts.";
    } else if (margin >= 0.35) {
      status = "Strong";
      statusText =
        "This bundle has a strong profit margin even after the discount.";
      recommendation =
        "This may be a good bundle to feature, advertise, or use as an upsell.";
    }

    const scenarios = [0, 5, 10, discount, 20, 25].map((rate) => {
      const scenarioDiscountAmount = separatePrice * (rate / 100);
      const scenarioPrice = Math.max(0, separatePrice - scenarioDiscountAmount);
      const scenarioProfit = scenarioPrice - totalBundleCosts;
      const scenarioMargin =
        scenarioPrice > 0 ? scenarioProfit / scenarioPrice : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Unprofitable";
      else if (scenarioMargin < 0.1) scenarioStatus = "Thin";
      else if (scenarioMargin >= 0.35) scenarioStatus = "Strong";

      return {
        rate,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    const uniqueScenarios = scenarios.filter(
      (scenario, index, array) =>
        array.findIndex((item) => item.rate === scenario.rate) === index,
    );

    return {
      separatePrice,
      productCosts,
      discountAmount,
      bundlePrice,
      totalBundleCosts,
      bundleProfit,
      separateProfit,
      profitDifference,
      margin,
      costShare,
      breakEvenBundlePrice,
      recommendedBundlePrice,
      maxSafeDiscount,
      status,
      statusText,
      recommendation,
      scenarios: uniqueScenarios,
    };
  }, [
    itemOnePrice,
    itemOneCost,
    itemTwoPrice,
    itemTwoCost,
    itemThreePrice,
    itemThreeCost,
    bundleDiscount,
    fees,
    shippingCost,
    packagingCost,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const percentDecimal = (value: number) => `${(value * 100).toFixed(1)}%`;

  const resultTone =
    result.bundleProfit > 0
      ? "good"
      : result.bundleProfit === 0
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Bundle Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether a discounted Etsy bundle is still profitable after
          item costs, shipping, packaging, and estimated fees.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Bundle inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter the normal selling price and cost for each item in the bundle.
            Then add your bundle discount and fulfillment costs.
          </p>

          <div className="mt-6 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Item 1 price"
                value={itemOnePrice}
                onChange={setItemOnePrice}
                prefix="$"
              />
              <Input
                label="Item 1 cost"
                value={itemOneCost}
                onChange={setItemOneCost}
                prefix="$"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Item 2 price"
                value={itemTwoPrice}
                onChange={setItemTwoPrice}
                prefix="$"
              />
              <Input
                label="Item 2 cost"
                value={itemTwoCost}
                onChange={setItemTwoCost}
                prefix="$"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Item 3 price"
                value={itemThreePrice}
                onChange={setItemThreePrice}
                prefix="$"
              />
              <Input
                label="Item 3 cost"
                value={itemThreeCost}
                onChange={setItemThreeCost}
                prefix="$"
              />
            </div>

            <div>
              <Input
                label="Bundle discount"
                value={bundleDiscount}
                onChange={setBundleDiscount}
                suffix="%"
                helper="Discount compared with selling the items separately."
              />

              <div className="mt-2 flex flex-wrap gap-2">
                {[5, 10, 15, 20, 25].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBundleDiscount(String(preset))}
                    className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                      Number(bundleDiscount) === preset
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Estimated fees"
              value={fees}
              onChange={setFees}
              prefix="$"
              helper="Use estimated Etsy, payment, ad, and transaction-related fees."
            />

            <Input
              label="Shipping cost"
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
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Etsy fees, payment processing,
            refunds, discounts, shipping changes, taxes, and ad costs can affect
            your actual bundle profit.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Your Etsy bundle profitability at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Bundle price"
              value={money(result.bundlePrice)}
              helper="Price after the selected discount"
              tone="blue"
            />

            <MetricCard
              label="Bundle profit"
              value={money(result.bundleProfit)}
              helper="Bundle price minus all entered costs"
              tone={resultTone}
            />

            <MetricCard
              label="Bundle margin"
              value={percentDecimal(result.margin)}
              helper="Profit divided by bundle price"
              tone={
                result.margin < 0.1
                  ? "bad"
                  : result.margin < 0.2
                    ? "warning"
                    : "good"
              }
            />

            <MetricCard
              label="Customer savings"
              value={money(result.discountAmount)}
              helper="Discount compared with buying separately"
              tone="blue"
            />

            <MetricCard
              label="Separate item value"
              value={money(result.separatePrice)}
              helper="Total price before bundle discount"
            />

            <MetricCard
              label="Total bundle costs"
              value={money(result.totalBundleCosts)}
              helper="Product costs, fees, shipping, and packaging"
            />

            <MetricCard
              label="Break-even bundle price"
              value={money(result.breakEvenBundlePrice)}
              helper="Minimum price before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Suggested safer price"
              value={money(result.recommendedBundlePrice)}
              helper="Cost plus a basic 30% markup"
              tone="blue"
            />

            <MetricCard
              label="Cost share of bundle price"
              value={percentDecimal(result.costShare)}
              helper="Total costs divided by bundle price"
            />

            <MetricCard
              label="Maximum break-even discount"
              value={percent(Math.max(0, result.maxSafeDiscount))}
              helper="Discount where profit approaches zero"
              tone={result.maxSafeDiscount > Number(bundleDiscount) ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Selling these items separately would total{" "}
                <strong>{money(result.separatePrice)}</strong>. With the selected
                discount, the bundle price is{" "}
                <strong>{money(result.bundlePrice)}</strong>, leaving estimated
                profit of <strong>{money(result.bundleProfit)}</strong>.
              </p>

              <p>
                Your estimated maximum break-even discount is about{" "}
                <strong>{percent(Math.max(0, result.maxSafeDiscount))}</strong>.
                Discounts above that may make the bundle unprofitable.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Bundle discount comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Bundle price</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === Number(bundleDiscount)
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">{money(row.price)}</td>
                      <td className="px-4 py-3">{money(row.profit)}</td>
                      <td className="px-4 py-3">{percentDecimal(row.margin)}</td>
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

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Etsy Bundle Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item prices",
              "Use the normal selling price for each item before applying a bundle discount.",
            ],
            [
              "Enter item costs",
              "Include materials, production costs, supplies, packaging tied to each item, and other per-item expenses.",
            ],
            [
              "Set a bundle discount",
              "Choose the discount customers receive compared with buying each item separately.",
            ],
            [
              "Add fulfillment costs",
              "Include fees, shipping, packaging, and other costs needed to complete the bundle order.",
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
            Common bundle pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Setting a bundle discount based only on customer savings instead of profit.",
              "Forgetting shipping, packaging, transaction fees, and payment processing fees.",
              "Stacking bundle discounts with coupons or sale pricing without recalculating margin.",
              "Bundling low-margin products together and accidentally removing most of the profit.",
              "Assuming a bundle is successful because revenue is higher, even when profit is lower.",
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
              <strong className="text-emerald-700">Strong / Healthy:</strong>{" "}
              The bundle remains profitable after the discount and entered
              fulfillment costs.
            </p>

            <p>
              <strong className="text-amber-700">Moderate / Thin Margin:</strong>{" "}
              The bundle may still work, but small cost changes, refunds, or
              extra discounts could hurt profit.
            </p>

            <p>
              <strong className="text-red-700">Unprofitable:</strong> The bundle
              price is not high enough to cover the entered costs.
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
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/break-even-calculator", "Etsy Break-Even Calculator"],
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