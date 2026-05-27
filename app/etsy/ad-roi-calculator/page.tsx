"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { toMoney, toPercent } from "@/lib/etsyCalculations";

export default function EtsyAdRoiCalculatorPage() {
  const [adSpend, setAdSpend] = useState(50);
  const [adRevenue, setAdRevenue] = useState(200);
  const [productCosts, setProductCosts] = useState(80);
  const [estimatedFees, setEstimatedFees] = useState(22);

  const result = useMemo(() => {
    const profitAfterAds = adRevenue - productCosts - estimatedFees - adSpend;
    const roi = adSpend > 0 ? profitAfterAds / adSpend : 0;
    const roas = adSpend > 0 ? adRevenue / adSpend : 0;

    return {
      profitAfterAds,
      roi,
      roas,
    };
  }, [adSpend, adRevenue, productCosts, estimatedFees]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Ad ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether Etsy ad spend is producing profitable sales after
          product costs and fees.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Ad inputs</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
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

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator estimates ad profitability. Etsy Ads data, fees,
            attribution, refunds, discounts, and taxes may affect real results.
          </div>
        </section>

        <section className="space-y-4">
          <ResultCard
            label="Profit after ads"
            value={toMoney(result.profitAfterAds)}
          />

          <ResultCard label="Profit ROI on ad spend" value={toPercent(result.roi)} />

          <ResultCard
            label="ROAS"
            value={`${result.roas.toFixed(2)}x`}
            helper="Revenue divided by ad spend"
          />
        </section>
      </div>
    </main>
  );
}