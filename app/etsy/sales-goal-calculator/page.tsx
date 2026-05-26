"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { toMoney } from "@/lib/etsyCalculations";

export default function EtsySalesGoalCalculatorPage() {
  const [monthlyProfitGoal, setMonthlyProfitGoal] = useState(1000);
  const [averageOrderValue, setAverageOrderValue] = useState(30);
  const [profitPerOrder, setProfitPerOrder] = useState(10);

  const result = useMemo(() => {
    const ordersNeeded =
      profitPerOrder > 0 ? Math.ceil(monthlyProfitGoal / profitPerOrder) : 0;

    const revenueNeeded = ordersNeeded * averageOrderValue;
    const dailyOrdersNeeded = ordersNeeded / 30;

    return {
      ordersNeeded,
      revenueNeeded,
      dailyOrdersNeeded,
    };
  }, [monthlyProfitGoal, averageOrderValue, profitPerOrder]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Sales Goal Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Work backward from a monthly profit goal to estimate how many Etsy
          orders and how much revenue you may need.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Goal inputs</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Monthly profit goal"
              prefix="$"
              value={monthlyProfitGoal}
              onChange={setMonthlyProfitGoal}
            />

            <NumberInput
              label="Average order value"
              prefix="$"
              value={averageOrderValue}
              onChange={setAverageOrderValue}
            />

            <NumberInput
              label="Average profit per order"
              prefix="$"
              value={profitPerOrder}
              onChange={setProfitPerOrder}
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator provides estimates only. Actual sales goals may vary
            based on fees, refunds, discounts, ad spend, conversion rate, and
            seasonality.
          </div>
        </section>

        <section className="space-y-4">
          <ResultCard
            label="Orders needed per month"
            value={result.ordersNeeded.toString()}
          />

          <ResultCard
            label="Estimated revenue needed"
            value={toMoney(result.revenueNeeded)}
          />

          <ResultCard
            label="Average orders needed per day"
            value={result.dailyOrdersNeeded.toFixed(1)}
          />
        </section>
      </div>
    </main>
  );
}