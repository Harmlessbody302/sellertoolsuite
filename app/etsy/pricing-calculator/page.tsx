"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateEtsyPrice,
  defaultEtsyFeeSettings,
} from "@/lib/etsyCalculations";

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
  value: number;
  onChange: (value: number) => void;
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
          onChange={(event) => onChange(Number(event.target.value))}
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
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Thin Margin" || status === "Review Price"
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
    status === "Healthy"
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

export default function EtsyPricingCalculatorPage() {
  const [pricingMode, setPricingMode] = useState<"profit" | "margin">("profit");

  const [productCost, setProductCost] = useState(6);
  const [shippingCost, setShippingCost] = useState(4);
  const [packagingCost, setPackagingCost] = useState(1);
  const [laborCost, setLaborCost] = useState(5);
  const [otherCost, setOtherCost] = useState(0);
  const [shippingCharged, setShippingCharged] = useState(5);

  const [desiredProfit, setDesiredProfit] = useState(10);
  const [desiredMarginPercent, setDesiredMarginPercent] = useState(30);

  const [listingFee, setListingFee] = useState(0.2);
  const [transactionFeePercent, setTransactionFeePercent] = useState(6.5);
  const [processingPercent, setProcessingPercent] = useState(3);
  const [processingFixedFee, setProcessingFixedFee] = useState(0.25);
  const [offsiteAdsPercent, setOffsiteAdsPercent] = useState(0);

  const feeSettings = {
    ...defaultEtsyFeeSettings,
    listingFee,
    transactionFeeRate: transactionFeePercent / 100,
    paymentProcessingRate: processingPercent / 100,
    paymentProcessingFixedFee: processingFixedFee,
    offsiteAdsRate: offsiteAdsPercent / 100,
  };

  const result = useMemo(() => {
    const calculated = calculateEtsyPrice({
      productCost,
      shippingCost,
      packagingCost,
      laborCost,
      otherCost,
      desiredProfit,
      desiredMarginRate: desiredMarginPercent / 100,
      pricingMode,
      shippingCharged,
      feeSettings,
    });

    const baseCost =
      productCost + shippingCost + packagingCost + laborCost + otherCost;

    const status =
      calculated.netProfit <= 0
        ? "Underpriced"
        : calculated.profitMargin < 0.15
          ? "Thin Margin"
          : calculated.profitMargin > 0.55
            ? "Review Price"
            : "Healthy";

    const statusText =
      status === "Healthy"
        ? "This recommended price appears to cover your costs, estimated Etsy fees, and target profit with a usable margin."
        : status === "Thin Margin"
          ? "This price covers your costs, but the margin is thin. Small cost increases, refunds, ads, or discounts could reduce profit quickly."
          : status === "Review Price"
            ? "This price creates a high margin. That can be good, but make sure the final price still matches buyer expectations and listing demand."
            : "This price does not leave enough profit after costs and estimated fees. Raise the price, lower costs, or reduce the target requirements.";

    const recommendation =
      status === "Healthy"
        ? "This is a reasonable price to test. Monitor conversion rate, profit per order, and discount impact after publishing."
        : status === "Thin Margin"
          ? "Consider increasing the price, reducing costs, or avoiding discounts until the margin is stronger."
          : status === "Review Price"
            ? "Check competitor positioning, product uniqueness, photos, reviews, and conversion rate before assuming this price will sell consistently."
            : "Do not use this price without adjustment. The product needs a better margin before it is safe to promote or discount.";

    const scenarios = [
      { label: "Lower test", multiplier: 0.9 },
      { label: "Recommended", multiplier: 1 },
      { label: "Premium", multiplier: 1.1 },
      { label: "High margin", multiplier: 1.2 },
    ].map((scenario) => {
      const price = calculated.recommendedPrice * scenario.multiplier;

      const scenarioResult = calculateEtsyPrice({
        productCost,
        shippingCost,
        packagingCost,
        laborCost,
        otherCost,
        desiredProfit: Math.max(0, price - baseCost),
        desiredMarginRate: desiredMarginPercent / 100,
        pricingMode: "profit",
        shippingCharged,
        feeSettings,
      });

      const profit = scenarioResult.netProfit;
      const margin = scenarioResult.profitMargin;

      const rowStatus =
        profit <= 0
          ? "Underpriced"
          : margin < 0.15
            ? "Thin"
            : "Healthy";

      return {
        label: scenario.label,
        price,
        profit,
        margin,
        status: rowStatus,
      };
    });

    return {
      ...calculated,
      baseCost,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    laborCost,
    otherCost,
    desiredProfit,
    desiredMarginPercent,
    pricingMode,
    shippingCharged,
    listingFee,
    transactionFeePercent,
    processingPercent,
    processingFixedFee,
    offsiteAdsPercent,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

  const resultTone =
    result.status === "Healthy"
      ? "good"
      : result.status === "Thin Margin" || result.status === "Review Price"
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate what price to charge based on product costs, shipping,
          packaging, labor, Etsy fees, desired profit, or desired profit margin.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Choose a pricing mode, enter your real costs, and adjust Etsy fee
            assumptions to estimate a safer selling price.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPricingMode("profit")}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${
                pricingMode === "profit"
                  ? "bg-blue-700 text-white"
                  : "border border-gray-300 bg-white text-gray-950"
              }`}
            >
              Desired dollar profit
            </button>

            <button
              type="button"
              onClick={() => setPricingMode("margin")}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${
                pricingMode === "margin"
                  ? "bg-blue-700 text-white"
                  : "border border-gray-300 bg-white text-gray-950"
              }`}
            >
              Desired profit margin
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Cost inputs
              </h3>

              <div className="space-y-4">
                <Input label="Product/material cost" prefix="$" value={productCost} onChange={setProductCost} />
                <Input label="Shipping cost paid by seller" prefix="$" value={shippingCost} onChange={setShippingCost} />
                <Input label="Packaging cost" prefix="$" value={packagingCost} onChange={setPackagingCost} />
                <Input label="Labor cost" prefix="$" value={laborCost} onChange={setLaborCost} />
                <Input label="Other cost" prefix="$" value={otherCost} onChange={setOtherCost} />
                <Input label="Shipping charged to buyer" prefix="$" value={shippingCharged} onChange={setShippingCharged} />

                {pricingMode === "profit" ? (
                  <Input
                    label="Desired profit"
                    prefix="$"
                    value={desiredProfit}
                    onChange={setDesiredProfit}
                    helper="Dollar profit you want after costs and estimated fees."
                  />
                ) : (
                  <Input
                    label="Desired profit margin"
                    suffix="%"
                    value={desiredMarginPercent}
                    onChange={setDesiredMarginPercent}
                    helper="Target profit as a percentage of revenue."
                  />
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Fee assumptions
              </h3>

              <div className="space-y-4">
                <Input label="Listing fee" prefix="$" value={listingFee} onChange={setListingFee} />
                <Input label="Transaction fee" suffix="%" value={transactionFeePercent} onChange={setTransactionFeePercent} />
                <Input label="Payment processing rate" suffix="%" value={processingPercent} onChange={setProcessingPercent} />
                <Input label="Payment processing fixed fee" prefix="$" value={processingFixedFee} onChange={setProcessingFixedFee} />
                <Input label="Offsite ads fee" suffix="%" value={offsiteAdsPercent} onChange={setOffsiteAdsPercent} />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator provides estimates only. Actual Etsy fees, taxes,
            ad charges, refunds, discounts, and payment processing fees may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended pricing at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended item price"
              value={money(result.recommendedPrice)}
              helper="Estimated listing price before buyer shipping"
              tone={resultTone}
            />

            <MetricCard
              label="Estimated net profit"
              value={money(result.netProfit)}
              helper="Profit after costs and estimated fees"
              tone={resultTone}
            />

            <MetricCard
              label="Estimated profit margin"
              value={percent(result.profitMargin)}
              helper="Net profit divided by gross revenue"
              tone={resultTone}
            />

            <MetricCard
              label="Estimated total fees"
              value={money(result.totalFees)}
              helper="Listing, transaction, payment, and ad fees"
              tone="warning"
            />

            <MetricCard
              label="Estimated total costs"
              value={money(result.totalCosts)}
              helper="Costs plus estimated fees"
            />

            <MetricCard
              label="Buyer payment"
              value={money(result.grossRevenue)}
              helper="Recommended price plus buyer shipping"
              tone="blue"
            />

            <MetricCard
              label="Base costs before fees"
              value={money(result.baseCost)}
              helper="Product, shipping, packaging, labor, and other costs"
            />

            <MetricCard
              label="Shipping charged"
              value={money(shippingCharged)}
              helper="Amount buyer pays toward shipping"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At this price, the estimated buyer payment is{" "}
                <strong>{money(result.grossRevenue)}</strong>, with estimated net
                profit of <strong>{money(result.netProfit)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Pricing scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
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
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
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

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Etsy Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            ["Enter real costs", "Include materials, shipping paid by you, packaging, labor, and other expenses."],
            ["Choose a target", "Use dollar profit mode for a simple target or margin mode for percentage-based pricing."],
            ["Adjust fee settings", "Update Etsy fee assumptions if your region, processing rate, or offsite ad rate differs."],
            ["Compare scenarios", "Review lower, recommended, premium, and high-margin price options before publishing."],
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
            Common Etsy pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Copying competitor prices without knowing your own costs.",
              "Forgetting labor, packaging, shipping supplies, or equipment wear.",
              "Ignoring Etsy fees, payment processing, and offsite ad fees.",
              "Setting a price with no room for discounts or refunds.",
              "Using revenue as profit instead of calculating true margin.",
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
              <strong className="text-emerald-700">Healthy:</strong> The
              recommended price covers costs, estimated fees, and target profit.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The price
              may work, but discounts, refunds, or ad costs could weaken profit.
            </p>

            <p>
              <strong className="text-amber-700">Review Price:</strong> The
              margin is high, so check buyer expectations and conversion risk.
            </p>

            <p>
              <strong className="text-red-700">Underpriced:</strong> The price
              does not safely cover costs and estimated fees.
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
            ["/etsy/fee-calculator", "Etsy Fee Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
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