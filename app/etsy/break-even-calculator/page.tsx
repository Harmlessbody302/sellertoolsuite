"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { toMoney } from "@/lib/etsyCalculations";

export default function EtsyBreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState(100);
  const [pricePerSale, setPricePerSale] = useState(25);
  const [costPerSale, setCostPerSale] = useState(12);
  const [feesPerSale, setFeesPerSale] = useState(3);

  const result = useMemo(() => {
    const profitPerSale = pricePerSale - costPerSale - feesPerSale;
    const breakEvenSales =
      profitPerSale > 0 ? Math.ceil(fixedCosts / profitPerSale) : 0;
    const revenueNeeded = breakEvenSales * pricePerSale;

    return {
      profitPerSale,
      breakEvenSales,
      revenueNeeded,
    };
  }, [fixedCosts, pricePerSale, costPerSale, feesPerSale]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how many sales you need to cover fixed costs like software,
          supplies, equipment, ads, or shop expenses.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Break-even inputs</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Fixed costs"
              prefix="$"
              value={fixedCosts}
              onChange={setFixedCosts}
            />

            <NumberInput
              label="Average selling price"
              prefix="$"
              value={pricePerSale}
              onChange={setPricePerSale}
            />

            <NumberInput
              label="Average cost per sale"
              prefix="$"
              value={costPerSale}
              onChange={setCostPerSale}
            />

            <NumberInput
              label="Estimated fees per sale"
              prefix="$"
              value={feesPerSale}
              onChange={setFeesPerSale}
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual break-even points may change
            based on fees, refunds, discounts, ads, shipping, and taxes.
          </div>
        </section>

        <section className="space-y-4">
          <ResultCard
            label="Profit per sale before fixed costs"
            value={toMoney(result.profitPerSale)}
          />

          <ResultCard
            label="Sales needed to break even"
            value={result.breakEvenSales.toString()}
          />

          <ResultCard
            label="Total revenue needed to break even"
            value={toMoney(result.revenueNeeded)}
          />
        </section>
      </div>

      <section className="mt-12 max-w-3xl leading-7 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-950">
          How this Etsy break-even calculator works
        </h2>

        <p className="mt-4">
          The calculator subtracts your average cost per sale and estimated fees
          from your average selling price. It then divides your fixed costs by
          the estimated profit per sale to estimate how many sales are needed to
          break even.
        </p>
      </section>
    </main>
  );
}