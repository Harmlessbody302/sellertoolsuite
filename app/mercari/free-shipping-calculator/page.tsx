"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariFreeShippingCalculatorPage() {
  const [salePrice, setSalePrice] = useState(40);
  const [itemCost, setItemCost] = useState(10);
  const [buyerPaidShippingPrice, setBuyerPaidShippingPrice] = useState(35);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [promotionDiscount, setPromotionDiscount] = useState(0);
  const [refundAllowance, setRefundAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(12);

  const results = useMemo(() => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;

    const freeShippingRevenue = Math.max(0, salePrice - promotionDiscount);
    const freeShippingFees = freeShippingRevenue * feeRate + fixedFee;
    const freeShippingProfit =
      freeShippingRevenue -
      itemCost -
      shippingCost -
      packagingCost -
      freeShippingFees -
      refundAllowance;

    const buyerPaidRevenue = Math.max(0, buyerPaidShippingPrice - promotionDiscount);
    const buyerPaidFees = buyerPaidRevenue * feeRate + fixedFee;
    const buyerPaidProfit =
      buyerPaidRevenue -
      itemCost -
      packagingCost -
      buyerPaidFees -
      refundAllowance;

    const freeShippingMargin =
      freeShippingRevenue > 0 ? (freeShippingProfit / freeShippingRevenue) * 100 : 0;
    const buyerPaidMargin =
      buyerPaidRevenue > 0 ? (buyerPaidProfit / buyerPaidRevenue) * 100 : 0;

    const profitDifference = freeShippingProfit - buyerPaidProfit;
    const priceIncreaseNeeded = buyerPaidProfit - freeShippingProfit;

    const targetBeforeFees =
      itemCost + shippingCost + packagingCost + fixedFee + refundAllowance + targetProfit;
    const priceForTargetProfit = feeRate < 1 ? targetBeforeFees / (1 - feeRate) : 0;

    const breakEvenBeforeFees =
      itemCost + shippingCost + packagingCost + fixedFee + refundAllowance;
    const breakEvenFreeShippingPrice =
      feeRate < 1 ? breakEvenBeforeFees / (1 - feeRate) : 0;

    const shippingShare = salePrice > 0 ? (shippingCost / salePrice) * 100 : 0;
    const costShare =
      salePrice > 0
        ? ((itemCost + shippingCost + packagingCost + freeShippingFees + refundAllowance) /
            salePrice) *
          100
        : 0;

    let status = "Healthy";
    if (freeShippingProfit < 0) status = "Losing";
    else if (freeShippingProfit < targetProfit * 0.6) status = "Thin";
    else if (freeShippingProfit < targetProfit) status = "Watch";

    return {
      freeShippingRevenue,
      freeShippingFees,
      freeShippingProfit,
      freeShippingMargin,
      buyerPaidRevenue,
      buyerPaidFees,
      buyerPaidProfit,
      buyerPaidMargin,
      profitDifference,
      priceIncreaseNeeded,
      priceForTargetProfit,
      breakEvenFreeShippingPrice,
      shippingShare,
      costShare,
      status,
    };
  }, [
    salePrice,
    itemCost,
    buyerPaidShippingPrice,
    shippingCost,
    packagingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    promotionDiscount,
    refundAllowance,
    targetProfit,
  ]);

  const scenarios = [0, 3, 5, 7, 10, 12, 15].map((increase) => {
    const price = buyerPaidShippingPrice + increase;
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const revenue = Math.max(0, price - promotionDiscount);
    const fees = revenue * feeRate + fixedFee;
    const profit =
      revenue - itemCost - shippingCost - packagingCost - fees - refundAllowance;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.6) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return { increase, price, profit, margin, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Free Shipping Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Compare Mercari free shipping, buyer-paid shipping, and price-built
          shipping to estimate profit, margin, break-even price, and whether
          seller-paid shipping is worth offering.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Free shipping inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter free-shipping price, buyer-paid shipping comparison price,
              item cost, shipping cost, fees, and target profit.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Free shipping sale price" value={salePrice} setValue={setSalePrice} prefix="$" />
              <NumberInput label="Buyer-paid shipping price" value={buyerPaidShippingPrice} setValue={setBuyerPaidShippingPrice} prefix="$" />
              <NumberInput label="Item cost" value={itemCost} setValue={setItemCost} prefix="$" />
              <NumberInput label="Shipping label cost" value={shippingCost} setValue={setShippingCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Promotion discount" value={promotionDiscount} setValue={setPromotionDiscount} prefix="$" />
              <NumberInput label="Refund allowance" value={refundAllowance} setValue={setRefundAllowance} prefix="$" />
              <NumberInput label="Target profit" value={targetProfit} setValue={setTargetProfit} prefix="$" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari shipping rates,
              buyer behavior, fees, promotions, refunds, taxes, and marketplace
              rules may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari free shipping profitability.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Free shipping profit" value={money(results.freeShippingProfit)} tone={results.freeShippingProfit >= targetProfit ? "green" : "yellow"} text="Profit when seller pays the shipping label." />
              <ResultCard title="Buyer-paid shipping profit" value={money(results.buyerPaidProfit)} tone="green" text="Profit when buyer pays shipping separately." />
              <ResultCard title="Profit difference" value={money(results.profitDifference)} tone={results.profitDifference >= 0 ? "green" : "yellow"} text="Free shipping profit minus buyer-paid shipping profit." />
              <ResultCard title="Price increase needed" value={money(results.priceIncreaseNeeded)} tone="yellow" text="Approximate extra price needed to match buyer-paid profit." />
              <ResultCard title="Free shipping margin" value={`${results.freeShippingMargin.toFixed(1)}%`} tone={results.freeShippingMargin >= 25 ? "green" : "yellow"} text="Free shipping profit divided by sale price." />
              <ResultCard title="Buyer-paid margin" value={`${results.buyerPaidMargin.toFixed(1)}%`} tone="blue" text="Buyer-paid shipping profit divided by sale price." />
              <ResultCard title="Break-even free shipping price" value={money(results.breakEvenFreeShippingPrice)} tone="yellow" text="Free shipping price needed to avoid losing money." />
              <ResultCard title="Price for target profit" value={money(results.priceForTargetProfit)} tone="green" text="Estimated free shipping price needed for target profit." />
              <ResultCard title="Shipping share" value={`${results.shippingShare.toFixed(1)}%`} tone="yellow" text="Shipping cost as a share of free shipping price." />
              <ResultCard title="Cost share" value={`${results.costShare.toFixed(1)}%`} tone="yellow" text="Total costs as a share of free shipping price." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                At a free-shipping price of <strong>{money(salePrice)}</strong>,
                estimated profit is{" "}
                <strong>{money(results.freeShippingProfit)}</strong>. The
                buyer-paid comparison profit is{" "}
                <strong>{money(results.buyerPaidProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "Free shipping appears to support the entered target profit."
                  : results.status === "Watch"
                    ? "Free shipping is profitable, but it does not fully reach the target profit."
                    : results.status === "Thin"
                      ? "Free shipping leaves thin profit and may be weakened by offers, refunds, or higher shipping."
                      : "Free shipping appears to lose money under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Price increase scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Increase</th>
                      <th className="px-3 py-2">Free ship price</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.increase} className="border-t">
                        <td className="px-3 py-2">{money(row.increase)}</td>
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
            How to use this Mercari Free Shipping Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter prices" text="Add your free-shipping price and buyer-paid shipping comparison price." />
            <StepCard title="Add shipping" text="Include the actual shipping label and packaging cost." />
            <StepCard title="Add fees" text="Enter selling fee, payment processing fee, fixed fee, and refund allowance." />
            <StepCard title="Compare profit" text="Check whether free shipping helps conversion without damaging profit." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari free shipping breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the main costs included in the free shipping estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Free shipping sale price" value={money(salePrice)} />
              <Breakdown label="Buyer-paid comparison price" value={money(buyerPaidShippingPrice)} />
              <Breakdown label="Item cost" value={money(itemCost)} />
              <Breakdown label="Shipping label cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Free shipping fees" value={money(results.freeShippingFees)} />
              <Breakdown label="Refund allowance" value={money(refundAllowance)} />
              <Breakdown label="Free shipping profit" value={money(results.freeShippingProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari free shipping mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Offering free shipping without increasing the item price." />
              <Warning text="Forgetting that seller-paid shipping reduces profit directly." />
              <Warning text="Accepting buyer offers on free-shipping listings without recalculating profit." />
              <Warning text="Using the same shipping estimate for light and heavy items." />
              <Warning text="Ignoring packaging supplies, labels, tape, and protective materials." />
              <Warning text="Assuming free shipping improves sales enough to offset lost margin." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari free shipping profit</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Build shipping into price" text="Raise the sale price enough to cover seller-paid shipping." />
            <StepCard title="Avoid heavy items" text="Use free shipping carefully on items with high label costs." />
            <StepCard title="Set offer limits" text="Use stricter offer floors on listings where you pay shipping." />
            <StepCard title="Test both options" text="Compare buyer-paid and free-shipping listings by actual profit." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/offer-profit-calculator" label="Offer Profit Calculator" />
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
          Included in the free shipping estimate.
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