"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { toMoney, toPercent } from "@/lib/etsyCalculations";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
  badge,
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "warning" | "blue";
  badge?: string;
}) {
  const toneClasses = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    warning: "border-amber-200 bg-amber-50",
    blue: "border-blue-200 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {badge ? (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>

      {helper ? (
        <p className="mt-2 text-sm leading-6 text-gray-600">{helper}</p>
      ) : null}
    </div>
  );
}

export default function EtsyAdRoiCalculatorPage() {
  const [adSpend, setAdSpend] = useState(50);
  const [adRevenue, setAdRevenue] = useState(200);
  const [productCosts, setProductCosts] = useState(80);
  const [estimatedFees, setEstimatedFees] = useState(22);

  const result = useMemo(() => {
    const profitBeforeAds = adRevenue - productCosts - estimatedFees;
    const profitAfterAds = profitBeforeAds - adSpend;
    const roi = adSpend > 0 ? profitAfterAds / adSpend : 0;
    const roas = adSpend > 0 ? adRevenue / adSpend : 0;
    const marginAfterAds = adRevenue > 0 ? profitAfterAds / adRevenue : 0;
    const grossProfitRate = adRevenue > 0 ? profitBeforeAds / adRevenue : 0;
    const breakEvenRevenue = grossProfitRate > 0 ? adSpend / grossProfitRate : 0;
    const adSpendShare = adRevenue > 0 ? adSpend / adRevenue : 0;

    const status =
      profitAfterAds > 0
        ? "Profitable"
        : profitAfterAds === 0
          ? "Break-even"
          : "Losing money";

    const strength =
      profitAfterAds > 0 && marginAfterAds >= 0.2
        ? "Strong"
        : profitAfterAds > 0
          ? "Healthy"
          : profitAfterAds === 0
            ? "Break-even"
            : "Weak";

    const recommendation =
      profitAfterAds > 0
        ? "Your Etsy Ads appear profitable with these numbers. Consider monitoring this across several weeks before increasing spend."
        : profitAfterAds === 0
          ? "Your Etsy Ads are roughly breaking even. Small fee changes, refunds, discounts, or shipping adjustments could push this into a loss."
          : "Your Etsy Ads are losing money with these numbers. Review pricing, costs, targeting, listing quality, or ad spend.";

    return {
      profitBeforeAds,
      profitAfterAds,
      roi,
      roas,
      marginAfterAds,
      breakEvenRevenue,
      adSpendShare,
      status,
      strength,
      recommendation,
    };
  }, [adSpend, adRevenue, productCosts, estimatedFees]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tool
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Ad ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether your Etsy Ads are actually profitable after ad spend,
          product costs, shipping costs, and Etsy/payment fees.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Ad inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter the ad spend and revenue from the same reporting period. A
            full week or month usually gives a better picture than a single day.
          </p>

          <div className="mt-6 grid gap-4">
            <NumberInput
              label="Ad spend"
              prefix="$"
              value={adSpend}
              onChange={setAdSpend}
            />

            <NumberInput
              label="Revenue from ads"
              prefix="$"
              value={adRevenue}
              onChange={setAdRevenue}
            />

            <NumberInput
              label="Product and shipping costs"
              prefix="$"
              value={productCosts}
              onChange={setProductCosts}
            />

            <NumberInput
              label="Estimated Etsy/payment fees"
              prefix="$"
              value={estimatedFees}
              onChange={setEstimatedFees}
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator estimates ad profitability. Etsy attribution,
            refunds, discounts, taxes, offsite ads, payment processing fees, and
            shipping adjustments can change your real results.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Your Etsy ad performance at a glance.
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
              {result.strength}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Profit after ads"
              value={toMoney(result.profitAfterAds)}
              helper={result.status}
              tone={result.profitAfterAds >= 0 ? "good" : "warning"}
              badge={result.profitAfterAds > 0 ? "Profitable" : undefined}
            />

            <MetricCard
              label="Profit ROI on ad spend"
              value={toPercent(result.roi)}
              helper="Profit after ads divided by ad spend"
              tone="blue"
            />

            <MetricCard
              label="ROAS"
              value={`${result.roas.toFixed(2)}x`}
              helper="Revenue divided by ad spend"
              tone="good"
            />

            <MetricCard
              label="Margin after ads"
              value={toPercent(result.marginAfterAds)}
              helper="Profit after ads divided by ad revenue"
              tone="good"
            />

            <MetricCard
              label="Profit before ads"
              value={toMoney(result.profitBeforeAds)}
              helper="Before subtracting advertising"
            />

            <MetricCard
              label="Break-even ad revenue"
              value={toMoney(result.breakEvenRevenue)}
              helper="Revenue needed to cover ad spend"
            />

            <MetricCard
              label="Ad spend share of revenue"
              value={toPercent(result.adSpendShare)}
              helper="Ad spend divided by revenue"
            />

            <MetricCard
              label="Status"
              value={result.status}
              helper="Based on profit after ads"
              tone={result.profitAfterAds >= 0 ? "warning" : "neutral"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.recommendation}</p>

              <p>
                Your ad spend is{" "}
                <strong>{toPercent(result.adSpendShare)}</strong> of ad-attributed
                revenue.
              </p>

              <p>
                Your estimated profit before ads is{" "}
                <strong>{toMoney(result.profitBeforeAds)}</strong>, leaving{" "}
                <strong>{toMoney(result.profitAfterAds)}</strong> after ad spend.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Etsy Ad ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            ["Use ad spend", "Enter the total amount spent on Etsy Ads during the reporting period."],
            ["Use revenue from ads", "Enter the sales Etsy attributes to your ads for the same reporting period."],
            ["Use product & shipping costs", "Include cost of goods, packaging, labels, supplies, and shipping you paid."],
            ["Use Etsy/payment fees", "Include transaction fees, listing fees, payment processing fees, and other selling fees."],
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
            Common Etsy ad mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging ads by revenue instead of profit after all costs.",
              "Ignoring product costs, shipping supplies, and payment fees.",
              "Increasing ad spend before confirming consistent profitability.",
              "Using too short of a testing window.",
              "Promoting listings with weak photos, pricing, or conversion rates.",
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
              <strong className="text-emerald-700">Profitable:</strong> Your ads
              are generating profit after ad spend, costs, and estimated fees.
            </p>

            <p>
              <strong className="text-amber-700">Break-even:</strong> Your ads
              are close to neutral. Small changes could swing the result.
            </p>

            <p>
              <strong className="text-red-700">Losing money:</strong> Your ads
              are not profitable with the current inputs.
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
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
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