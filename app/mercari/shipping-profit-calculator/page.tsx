"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariShippingProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(35);
  const [itemCost, setItemCost] = useState(10);
  const [shippingCharged, setShippingCharged] = useState(0);
  const [shippingLabelCost, setShippingLabelCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [handlingCost, setHandlingCost] = useState(1);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [promotionDiscount, setPromotionDiscount] = useState(0);
  const [returnAllowance, setReturnAllowance] = useState(1);

  const results = useMemo(() => {
    const grossCollected = Math.max(0, salePrice + shippingCharged - promotionDiscount);
    const sellingFee = grossCollected * (sellingFeeRate / 100);
    const processingFee = grossCollected * (processingFeeRate / 100) + fixedFee;
    const totalFees = sellingFee + processingFee;
    const totalShippingCost = shippingLabelCost + packagingCost + handlingCost;
    const shippingProfit = shippingCharged - totalShippingCost;
    const totalCosts =
      itemCost + totalShippingCost + totalFees + returnAllowance;
    const netProfit = grossCollected - totalCosts;
    const margin = grossCollected > 0 ? (netProfit / grossCollected) * 100 : 0;
    const breakEvenSalePrice =
      itemCost +
      totalShippingCost +
      returnAllowance +
      fixedFee -
      shippingCharged;
    const feeRateCombined = (sellingFeeRate + processingFeeRate) / 100;
    const adjustedBreakEven =
      feeRateCombined < 1 ? Math.max(0, breakEvenSalePrice / (1 - feeRateCombined)) : 0;

    let status = "Healthy";
    if (netProfit < 0) status = "Losing";
    else if (margin < 15) status = "Thin";
    else if (margin < 25) status = "Watch";

    return {
      grossCollected,
      sellingFee,
      processingFee,
      totalFees,
      totalShippingCost,
      shippingProfit,
      totalCosts,
      netProfit,
      margin,
      adjustedBreakEven,
      status,
    };
  }, [
    salePrice,
    itemCost,
    shippingCharged,
    shippingLabelCost,
    packagingCost,
    handlingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    promotionDiscount,
    returnAllowance,
  ]);

  const scenarios = [0, 3.99, 6.99, 9.99, 12.99].map((charged) => {
    const gross = Math.max(0, salePrice + charged - promotionDiscount);
    const fees = gross * ((sellingFeeRate + processingFeeRate) / 100) + fixedFee;
    const shipCost = shippingLabelCost + packagingCost + handlingCost;
    const profit = gross - itemCost - shipCost - fees - returnAllowance;
    const margin = gross > 0 ? (profit / gross) * 100 : 0;

    return {
      charged,
      shippingNet: charged - shipCost,
      profit,
      margin,
      status:
        profit < 0 ? "Losing" : margin < 15 ? "Thin" : margin < 25 ? "Watch" : "Healthy",
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Shipping Profit Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether Mercari shipping charged to buyers covers shipping
          labels, packaging, handling, seller-paid shipping pressure, fees, and
          final listing profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Shipping inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter sale price, item cost, shipping charged, actual shipping
              cost, packaging, fees, and return allowance.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Sale price" value={salePrice} setValue={setSalePrice} prefix="$" />
              <NumberInput label="Item cost" value={itemCost} setValue={setItemCost} prefix="$" />
              <NumberInput label="Shipping charged to buyer" value={shippingCharged} setValue={setShippingCharged} prefix="$" />
              <NumberInput label="Shipping label cost" value={shippingLabelCost} setValue={setShippingLabelCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Handling cost" value={handlingCost} setValue={setHandlingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Promotion discount" value={promotionDiscount} setValue={setPromotionDiscount} prefix="$" />
              <NumberInput label="Return allowance" value={returnAllowance} setValue={setReturnAllowance} prefix="$" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari fees, payment
              processing costs, shipping rates, promotions, refunds, and taxes
              may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari shipping and listing profitability.
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  results.status === "Healthy"
                    ? "bg-green-100 text-green-700"
                    : results.status === "Watch"
                    ? "bg-yellow-100 text-yellow-700"
                    : results.status === "Thin"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Shipping profit" value={money(results.shippingProfit)} tone={results.shippingProfit >= 0 ? "green" : "yellow"} text="Shipping charged minus label, packaging, and handling." />
              <ResultCard title="Net listing profit" value={money(results.netProfit)} tone={results.netProfit >= 0 ? "green" : "yellow"} text="Profit after shipping, item cost, fees, and return allowance." />
              <ResultCard title="Total shipping cost" value={money(results.totalShippingCost)} tone="yellow" text="Shipping label, packaging, and handling combined." />
              <ResultCard title="Total fees" value={money(results.totalFees)} tone="blue" text="Estimated selling and payment processing fees." />
              <ResultCard title="Gross collected" value={money(results.grossCollected)} tone="blue" text="Sale price plus shipping charged, minus promotion discount." />
              <ResultCard title="Estimated margin" value={`${results.margin.toFixed(1)}%`} tone={results.margin >= 25 ? "green" : "yellow"} text="Net profit divided by gross collected." />
              <ResultCard title="Break-even sale price" value={money(results.adjustedBreakEven)} tone="yellow" text="Approximate sale price needed to avoid losing money." />
              <ResultCard title="Total costs" value={money(results.totalCosts)} tone="blue" text="Item cost, shipping cost, fees, and return allowance." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Shipping charged to the buyer is estimated to create{" "}
                <strong>{money(results.shippingProfit)}</strong> in shipping
                profit after label, packaging, and handling. Final listing profit
                is estimated at <strong>{money(results.netProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "The listing appears to have workable shipping and profit assumptions."
                  : results.status === "Watch"
                  ? "Profit is positive, but shipping or fees should be watched carefully."
                  : results.status === "Thin"
                  ? "Profit is thin and could disappear with a lower offer, refund, or shipping change."
                  : "The listing appears to lose money under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Shipping charge scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Shipping charged</th>
                      <th className="px-3 py-2">Shipping net</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.charged} className="border-t">
                        <td className="px-3 py-2">{money(row.charged)}</td>
                        <td className="px-3 py-2">{money(row.shippingNet)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">{row.margin.toFixed(1)}%</td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-bold ${
                              row.status === "Healthy"
                                ? "bg-green-100 text-green-700"
                                : row.status === "Watch"
                                ? "bg-yellow-100 text-yellow-700"
                                : row.status === "Thin"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Mercari Shipping Profit Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter price" text="Add the expected Mercari sale price after offers or promotions." />
            <StepCard title="Add shipping" text="Enter the amount charged to the buyer and your actual label cost." />
            <StepCard title="Add costs" text="Include item cost, packaging, handling, fees, and return allowance." />
            <StepCard title="Review profit" text="Check whether shipping helps protect profit or creates a loss." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari shipping cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the major shipping and order costs in the estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Shipping charged to buyer" value={money(shippingCharged)} />
              <Breakdown label="Shipping label cost" value={money(shippingLabelCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Handling cost" value={money(handlingCost)} />
              <Breakdown label="Total shipping cost" value={money(results.totalShippingCost)} />
              <Breakdown label="Shipping profit" value={money(results.shippingProfit)} />
              <Breakdown label="Total fees" value={money(results.totalFees)} />
              <Breakdown label="Net listing profit" value={money(results.netProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari shipping mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Guessing item weight before packaging the item." />
              <Warning text="Offering free shipping without raising the sale price." />
              <Warning text="Forgetting packaging supplies, labels, tape, and protective material." />
              <Warning text="Accepting buyer offers without checking seller-paid shipping impact." />
              <Warning text="Using one shipping estimate for items with very different weights." />
              <Warning text="Ignoring fragile items that need heavier or more protective packaging." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari shipping profit</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Weigh packed items" text="Estimate shipping from packed weight, not bare item weight." />
            <StepCard title="Right-size packaging" text="Use packaging that protects the item without adding unnecessary size." />
            <StepCard title="Build in shipping" text="If offering free shipping, raise price enough to cover the label." />
            <StepCard title="Check offers" text="Recalculate profit before accepting offers on seller-paid shipping listings." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/mercari/free-shipping-calculator" label="Free Shipping Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function NumberInput({
  label,
  value,
  setValue,
  prefix,
  suffix,
}: NumberInputProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        {prefix ? (
          <span className="flex items-center border-r bg-slate-50 px-3 text-sm text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          value={value}
          onChange={(event) => setValue(Number(event.target.value) || 0)}
          type="number"
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {suffix ? (
          <span className="flex items-center border-l bg-slate-50 px-3 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function ResultCard({
  title,
  value,
  text,
  tone,
}: {
  title: string;
  value: string;
  text: string;
  tone: "green" | "yellow" | "blue";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "yellow"
      ? "border-amber-200 bg-amber-50"
      : "border-blue-200 bg-blue-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-xs font-bold">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StepCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Breakdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="font-bold">{label}</p>
        <p className="mt-1 text-xs text-slate-600">
          Included in the shipping profit estimate.
        </p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
        !
      </span>
      <p>{text}</p>
    </div>
  );
}

function Related({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-100"
    >
      {label}
    </a>
  );
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}