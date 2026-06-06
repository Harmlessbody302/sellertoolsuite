"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariListingRoiCalculatorPage() {
  const [salePrice, setSalePrice] = useState(35);
  const [itemCost, setItemCost] = useState(10);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [monthlyListingViews, setMonthlyListingViews] = useState(800);
  const [listingConversionRate, setListingConversionRate] = useState(3);
  const [promotionCost, setPromotionCost] = useState(15);
  const [photoListingCost, setPhotoListingCost] = useState(5);
  const [storageCost, setStorageCost] = useState(2);
  const [refundRate, setRefundRate] = useState(4);
  const [targetRoi, setTargetRoi] = useState(150);

  const results = useMemo(() => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const estimatedFees = salePrice * feeRate + fixedFee;
    const profitBeforeListingCosts =
      salePrice - itemCost - shippingCost - packagingCost - estimatedFees;

    const estimatedOrders = monthlyListingViews * (listingConversionRate / 100);
    const monthlyRevenue = estimatedOrders * salePrice;
    const grossProfit = estimatedOrders * profitBeforeListingCosts;

    const refundLoss = estimatedOrders * (refundRate / 100) * (itemCost + shippingCost + packagingCost);
    const listingInvestment = promotionCost + photoListingCost + storageCost;
    const netListingProfit = grossProfit - refundLoss - listingInvestment;
    const roi =
      listingInvestment > 0 ? (netListingProfit / listingInvestment) * 100 : 0;

    const profitPerView =
      monthlyListingViews > 0 ? netListingProfit / monthlyListingViews : 0;
    const revenuePerView =
      monthlyListingViews > 0 ? monthlyRevenue / monthlyListingViews : 0;
    const adCostPerOrder =
      estimatedOrders > 0 ? promotionCost / estimatedOrders : 0;

    const breakEvenConversionRate =
      monthlyListingViews > 0 && profitBeforeListingCosts > 0
        ? ((listingInvestment + refundLoss) /
            profitBeforeListingCosts /
            monthlyListingViews) *
          100
        : 0;

    const conversionNeededForTargetRoi =
      monthlyListingViews > 0 && profitBeforeListingCosts > 0
        ? (((targetRoi / 100) * listingInvestment + listingInvestment + refundLoss) /
            profitBeforeListingCosts /
            monthlyListingViews) *
          100
        : 0;

    let status = "Healthy";
    if (netListingProfit < 0) status = "Losing";
    else if (roi < 50) status = "Thin";
    else if (roi < targetRoi) status = "Watch";

    return {
      estimatedFees,
      profitBeforeListingCosts,
      estimatedOrders,
      monthlyRevenue,
      grossProfit,
      refundLoss,
      listingInvestment,
      netListingProfit,
      roi,
      profitPerView,
      revenuePerView,
      adCostPerOrder,
      breakEvenConversionRate,
      conversionNeededForTargetRoi,
      status,
    };
  }, [
    salePrice,
    itemCost,
    shippingCost,
    packagingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    monthlyListingViews,
    listingConversionRate,
    promotionCost,
    photoListingCost,
    storageCost,
    refundRate,
    targetRoi,
  ]);

  const scenarios = [1, 1.5, 2, 3, 4, 5, 6].map((conversion) => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const fees = salePrice * feeRate + fixedFee;
    const profitBeforeListingCosts =
      salePrice - itemCost - shippingCost - packagingCost - fees;
    const orders = monthlyListingViews * (conversion / 100);
    const revenue = orders * salePrice;
    const refundLoss = orders * (refundRate / 100) * (itemCost + shippingCost + packagingCost);
    const listingInvestment = promotionCost + photoListingCost + storageCost;
    const profit = orders * profitBeforeListingCosts - refundLoss - listingInvestment;
    const roi = listingInvestment > 0 ? (profit / listingInvestment) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (roi < 50) status = "Thin";
    else if (roi < targetRoi) status = "Watch";

    return { conversion, orders, revenue, profit, roi, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Listing ROI Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether a Mercari listing is worth improving, promoting,
          discounting, relisting, bundling, or retiring based on views,
          conversion rate, costs, refund risk, and listing investment.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Listing ROI inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item economics, listing traffic, conversion rate, promotion
              spend, listing work, storage cost, refund rate, and target ROI.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Sale price" value={salePrice} setValue={setSalePrice} prefix="$" />
              <NumberInput label="Item cost" value={itemCost} setValue={setItemCost} prefix="$" />
              <NumberInput label="Shipping cost" value={shippingCost} setValue={setShippingCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Monthly listing views" value={monthlyListingViews} setValue={setMonthlyListingViews} />
              <NumberInput label="Listing conversion rate" value={listingConversionRate} setValue={setListingConversionRate} suffix="%" />
              <NumberInput label="Promotion cost" value={promotionCost} setValue={setPromotionCost} prefix="$" />
              <NumberInput label="Photo/listing cost" value={photoListingCost} setValue={setPhotoListingCost} prefix="$" />
              <NumberInput label="Storage cost" value={storageCost} setValue={setStorageCost} prefix="$" />
              <NumberInput label="Refund rate" value={refundRate} setValue={setRefundRate} suffix="%" />
              <NumberInput label="Target ROI" value={targetRoi} setValue={setTargetRoi} suffix="%" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari visibility, buyer
              demand, offers, promotions, shipping costs, fees, refunds, and
              sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari listing ROI.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Listing ROI" value={`${results.roi.toFixed(1)}%`} tone={results.roi >= targetRoi ? "green" : "yellow"} text="Net listing profit divided by listing investment." />
              <ResultCard title="Net listing profit" value={money(results.netListingProfit)} tone={results.netListingProfit >= 0 ? "green" : "yellow"} text="Profit after refunds, promotion, listing work, and storage." />
              <ResultCard title="Estimated orders" value={number(results.estimatedOrders)} tone="blue" text="Listing views multiplied by conversion rate." />
              <ResultCard title="Monthly revenue" value={money(results.monthlyRevenue)} tone="green" text="Estimated orders multiplied by sale price." />
              <ResultCard title="Listing investment" value={money(results.listingInvestment)} tone="yellow" text="Promotion, photo/listing work, and storage cost combined." />
              <ResultCard title="Gross profit" value={money(results.grossProfit)} tone="blue" text="Profit before listing investment and refund impact." />
              <ResultCard title="Refund loss" value={money(results.refundLoss)} tone="yellow" text="Estimated profit loss from refunded orders." />
              <ResultCard title="Profit per view" value={money(results.profitPerView)} tone="green" text="Net listing profit divided by listing views." />
              <ResultCard title="Revenue per view" value={money(results.revenuePerView)} tone="blue" text="Revenue divided by listing views." />
              <ResultCard title="Promotion cost per order" value={money(results.adCostPerOrder)} tone="yellow" text="Promotion cost divided by estimated orders." />
              <ResultCard title="Break-even conversion rate" value={`${results.breakEvenConversionRate.toFixed(1)}%`} tone="yellow" text="Conversion rate needed to cover listing investment." />
              <ResultCard title="Conversion needed for target ROI" value={`${results.conversionNeededForTargetRoi.toFixed(1)}%`} tone="yellow" text="Estimated conversion rate needed to reach target ROI." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                This listing is estimated to generate{" "}
                <strong>{number(results.estimatedOrders)}</strong> orders and{" "}
                <strong>{money(results.monthlyRevenue)}</strong> in monthly
                revenue. After refund risk and listing investment, estimated net
                listing profit is <strong>{money(results.netListingProfit)}</strong>,
                giving an estimated ROI of <strong>{results.roi.toFixed(1)}%</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "This listing appears to produce a strong return compared with its investment."
                  : results.status === "Watch"
                    ? "This listing appears profitable, but does not fully reach the target ROI."
                    : results.status === "Thin"
                      ? "This listing has thin ROI and may need better conversion, lower costs, or less promotion spend."
                      : "This listing is estimated to lose money under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Conversion scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Conversion</th>
                      <th className="px-3 py-2">Orders</th>
                      <th className="px-3 py-2">Revenue</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.conversion} className="border-t">
                        <td className="px-3 py-2">{row.conversion.toFixed(1)}%</td>
                        <td className="px-3 py-2">{number(row.orders)}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
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
            How to use this Mercari Listing ROI Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter product costs" text="Add sale price, item cost, shipping, packaging, and fee assumptions." />
            <StepCard title="Add listing traffic" text="Enter monthly listing views and expected conversion rate." />
            <StepCard title="Include investment" text="Add promotion cost, photo/listing cost, storage cost, and refund risk." />
            <StepCard title="Review ROI" text="Check whether the listing is worth improving, promoting, relisting, or retiring." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari listing ROI breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind this product page ROI estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value={money(salePrice)} />
              <Breakdown label="Order cost" value={money(itemCost + shippingCost + packagingCost + results.estimatedFees)} />
              <Breakdown label="Profit before listing costs" value={money(results.profitBeforeListingCosts)} />
              <Breakdown label="Monthly listing views" value={number(monthlyListingViews)} />
              <Breakdown label="Estimated orders" value={number(results.estimatedOrders)} />
              <Breakdown label="Listing investment" value={money(results.listingInvestment)} />
              <Breakdown label="Refund loss" value={money(results.refundLoss)} />
              <Breakdown label="Net listing profit" value={money(results.netListingProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari listing ROI mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Judging a listing by views or likes instead of profit." />
              <Warning text="Promoting listings before checking profit after item cost, fees, and shipping." />
              <Warning text="Ignoring refund losses when deciding whether an item is profitable." />
              <Warning text="Keeping stale listings active without improving photos, title, description, or price." />
              <Warning text="Accepting low offers without checking remaining listing ROI." />
              <Warning text="Sourcing similar items before checking whether the first listing performed well." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari listing ROI</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Improve conversion" text="Upgrade photos, titles, descriptions, measurements, and condition details." />
            <StepCard title="Lower promotion cost" text="Use promotions carefully and stop discounts that do not improve profit." />
            <StepCard title="Raise sale value" text="Bundle items, improve presentation, or price with stronger offer room." />
            <StepCard title="Cut weak listings" text="Relist, bundle, donate, or retire items that cannot produce enough return." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/promotion-roi-calculator" label="Promotion ROI Calculator" />
            <Related href="/mercari/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/mercari/sales-goal-calculator" label="Sales Goal Calculator" />
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
          Included in the listing ROI estimate.
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

function number(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}