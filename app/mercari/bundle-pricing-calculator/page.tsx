"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariBundlePricingCalculatorPage() {
  const [itemOnePrice, setItemOnePrice] = useState(30);
  const [itemTwoPrice, setItemTwoPrice] = useState(22);
  const [itemThreePrice, setItemThreePrice] = useState(18);
  const [itemOneCost, setItemOneCost] = useState(8);
  const [itemTwoCost, setItemTwoCost] = useState(6);
  const [itemThreeCost, setItemThreeCost] = useState(5);
  const [bundlePrice, setBundlePrice] = useState(58);
  const [shippingCost, setShippingCost] = useState(8.5);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [promotionCost, setPromotionCost] = useState(2);
  const [refundAllowance, setRefundAllowance] = useState(2);
  const [targetProfit, setTargetProfit] = useState(20);

  const results = useMemo(() => {
    const separateItemPriceTotal = itemOnePrice + itemTwoPrice + itemThreePrice;
    const productCostTotal = itemOneCost + itemTwoCost + itemThreeCost;
    const bundleDiscount = Math.max(0, separateItemPriceTotal - bundlePrice);
    const bundleDiscountPercent =
      separateItemPriceTotal > 0
        ? (bundleDiscount / separateItemPriceTotal) * 100
        : 0;

    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const estimatedFees = bundlePrice * feeRate + fixedFee;
    const bundleCost =
      productCostTotal +
      shippingCost +
      packagingCost +
      estimatedFees +
      promotionCost +
      refundAllowance;

    const profit = bundlePrice - bundleCost;
    const margin = bundlePrice > 0 ? (profit / bundlePrice) * 100 : 0;
    const costShare = bundlePrice > 0 ? (bundleCost / bundlePrice) * 100 : 0;

    const breakEvenBeforeFees =
      productCostTotal +
      shippingCost +
      packagingCost +
      fixedFee +
      promotionCost +
      refundAllowance;
    const breakEvenBundlePrice =
      feeRate < 1 ? breakEvenBeforeFees / (1 - feeRate) : 0;

    const targetBeforeFees =
      productCostTotal +
      shippingCost +
      packagingCost +
      fixedFee +
      promotionCost +
      refundAllowance +
      targetProfit;
    const priceForTargetProfit =
      feeRate < 1 ? targetBeforeFees / (1 - feeRate) : 0;

    const extraPriceNeeded = Math.max(0, priceForTargetProfit - bundlePrice);
    const separateSaleFees = separateItemPriceTotal * feeRate + fixedFee * 3;
    const separateSaleCost =
      productCostTotal +
      shippingCost +
      packagingCost * 3 +
      separateSaleFees +
      promotionCost +
      refundAllowance;
    const separateSaleProfit = separateItemPriceTotal - separateSaleCost;
    const bundleVsSeparateProfit = profit - separateSaleProfit;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.6) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return {
      separateItemPriceTotal,
      productCostTotal,
      bundleDiscount,
      bundleDiscountPercent,
      estimatedFees,
      bundleCost,
      profit,
      margin,
      costShare,
      breakEvenBundlePrice,
      priceForTargetProfit,
      extraPriceNeeded,
      separateSaleProfit,
      bundleVsSeparateProfit,
      status,
    };
  }, [
    itemOnePrice,
    itemTwoPrice,
    itemThreePrice,
    itemOneCost,
    itemTwoCost,
    itemThreeCost,
    bundlePrice,
    shippingCost,
    packagingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    promotionCost,
    refundAllowance,
    targetProfit,
  ]);

  const scenarios = [0, 5, 10, 15, 20, 25, 30].map((discountPercent) => {
    const separateTotal = itemOnePrice + itemTwoPrice + itemThreePrice;
    const price = separateTotal * (1 - discountPercent / 100);
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const fees = price * feeRate + fixedFee;
    const productCost = itemOneCost + itemTwoCost + itemThreeCost;
    const totalCost =
      productCost + shippingCost + packagingCost + fees + promotionCost + refundAllowance;
    const profit = price - totalCost;
    const margin = price > 0 ? (profit / price) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.6) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return { discountPercent, price, profit, margin, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Bundle Pricing Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate Mercari bundle price, bundle discount, combined item cost,
          shipping cost, packaging cost, fees, promotion cost, refund allowance,
          target profit, and whether a bundle is worth accepting.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Bundle inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter standalone item prices, item costs, bundle price, shipping,
              packaging, fees, refund allowance, and target profit.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Item 1 regular price" value={itemOnePrice} setValue={setItemOnePrice} prefix="$" />
              <NumberInput label="Item 2 regular price" value={itemTwoPrice} setValue={setItemTwoPrice} prefix="$" />
              <NumberInput label="Item 3 regular price" value={itemThreePrice} setValue={setItemThreePrice} prefix="$" />
              <NumberInput label="Item 1 cost" value={itemOneCost} setValue={setItemOneCost} prefix="$" />
              <NumberInput label="Item 2 cost" value={itemTwoCost} setValue={setItemTwoCost} prefix="$" />
              <NumberInput label="Item 3 cost" value={itemThreeCost} setValue={setItemThreeCost} prefix="$" />
              <NumberInput label="Bundle price" value={bundlePrice} setValue={setBundlePrice} prefix="$" />
              <NumberInput label="Shipping cost" value={shippingCost} setValue={setShippingCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Promotion cost" value={promotionCost} setValue={setPromotionCost} prefix="$" />
              <NumberInput label="Refund allowance" value={refundAllowance} setValue={setRefundAllowance} prefix="$" />
              <NumberInput label="Target profit" value={targetProfit} setValue={setTargetProfit} prefix="$" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari buyer behavior,
              shipping rates, fees, packaging costs, bundle offers, refunds,
              taxes, and marketplace rules may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari bundle profitability.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Profit per bundle" value={money(results.profit)} tone={results.profit >= targetProfit ? "green" : "yellow"} text="Bundle price minus product cost, shipping, packaging, fees, promotion, and refund allowance." />
              <ResultCard title="Bundle margin" value={`${results.margin.toFixed(1)}%`} tone={results.margin >= 30 ? "green" : "yellow"} text="Profit per bundle divided by bundle price." />
              <ResultCard title="Bundle discount" value={money(results.bundleDiscount)} tone="yellow" text="Discount compared with selling the items separately." />
              <ResultCard title="Bundle discount percent" value={`${results.bundleDiscountPercent.toFixed(1)}%`} tone="yellow" text="Discount as a share of separate item prices." />
              <ResultCard title="Separate item price total" value={money(results.separateItemPriceTotal)} tone="blue" text="Combined standalone price of the bundled items." />
              <ResultCard title="Product cost total" value={money(results.productCostTotal)} tone="blue" text="Combined item cost for all bundled items." />
              <ResultCard title="Bundle cost" value={money(results.bundleCost)} tone="yellow" text="Total estimated cost to sell and fulfill the bundle." />
              <ResultCard title="Break-even bundle price" value={money(results.breakEvenBundlePrice)} tone="yellow" text="Minimum bundle price before profit reaches zero." />
              <ResultCard title="Price for target profit" value={money(results.priceForTargetProfit)} tone="green" text="Bundle price needed to reach target profit." />
              <ResultCard title="Extra price needed" value={money(results.extraPriceNeeded)} tone="yellow" text="Additional bundle price needed to reach target profit." />
              <ResultCard title="Separate sale profit" value={money(results.separateSaleProfit)} tone="blue" text="Estimated profit if the items sold separately." />
              <ResultCard title="Bundle vs. separate profit" value={money(results.bundleVsSeparateProfit)} tone={results.bundleVsSeparateProfit >= 0 ? "green" : "yellow"} text="Bundle profit compared with separate-sale profit." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The separate item price total is{" "}
                <strong>{money(results.separateItemPriceTotal)}</strong>. At a
                bundle price of <strong>{money(bundlePrice)}</strong>, the bundle
                discount is <strong>{money(results.bundleDiscount)}</strong>, or{" "}
                <strong>{results.bundleDiscountPercent.toFixed(1)}%</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Estimated bundle profit is{" "}
                <strong>{money(results.profit)}</strong>, with a bundle margin of{" "}
                <strong>{results.margin.toFixed(1)}%</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "The bundle appears to meet or exceed your target profit."
                  : results.status === "Watch"
                    ? "The bundle is profitable, but does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "The bundle has thin profit and may not be worth accepting after shipping or issue risk."
                      : "The bundle appears to lose money under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Bundle discount scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Discount</th>
                      <th className="px-3 py-2">Bundle price</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.discountPercent} className="border-t">
                        <td className="px-3 py-2">{row.discountPercent.toFixed(1)}%</td>
                        <td className="px-3 py-2">{money(row.price)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">{row.margin.toFixed(1)}%</td>
                        <td className="px-3 py-2">
                          <span className={statusClass(row.status)}>
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
            How to use this Mercari Bundle Pricing Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter item prices" text="Add the standalone prices for each item in the bundle." />
            <StepCard title="Add product costs" text="Enter product cost, shipping, packaging, fees, promotion cost, and refund allowance." />
            <StepCard title="Set bundle price" text="Add the proposed bundle price and target profit." />
            <StepCard title="Review profit" text="Check whether the bundle discount still leaves enough margin." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari bundle cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the main costs included in the bundle pricing estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Separate item price total" value={money(results.separateItemPriceTotal)} />
              <Breakdown label="Bundle price" value={money(bundlePrice)} />
              <Breakdown label="Bundle discount" value={money(results.bundleDiscount)} />
              <Breakdown label="Product cost total" value={money(results.productCostTotal)} />
              <Breakdown label="Shipping cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Estimated fees" value={money(results.estimatedFees)} />
              <Breakdown label="Profit per bundle" value={money(results.profit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari bundle pricing mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Discounting the bundle without adding up the cost of every item." />
              <Warning text="Forgetting that heavier bundles can increase shipping and packaging cost." />
              <Warning text="Accepting bundle offers without checking total profit." />
              <Warning text="Using bundles only to increase revenue while reducing profit per order." />
              <Warning text="Combining low-margin items without balancing them with stronger items." />
              <Warning text="Making the bundle price too close to break-even after fees and refund risk." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari bundle profit</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Pair items wisely" text="Combine weaker items with stronger-margin items to protect total profit." />
            <StepCard title="Control shipping" text="Watch package size, weight, and packaging when combining items." />
            <StepCard title="Use clear value" text="Make the bundle useful enough that buyers do not need a deep discount." />
            <StepCard title="Set a floor price" text="Know the lowest acceptable bundle price before accepting offers." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/offer-profit-calculator" label="Offer Profit Calculator" />
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
          Included in the bundle pricing estimate.
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

function statusClass(status: string) {
  if (status === "Healthy") {
    return "rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700";
  }

  if (status === "Watch") {
    return "rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700";
  }

  if (status === "Thin") {
    return "rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700";
  }

  return "rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700";
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}