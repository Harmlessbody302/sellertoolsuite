"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariProductCostCalculatorPage() {
  const [purchaseCost, setPurchaseCost] = useState(10);
  const [shippingToYou, setShippingToYou] = useState(2);
  const [cleaningCost, setCleaningCost] = useState(1);
  const [prepCost, setPrepCost] = useState(0.75);
  const [packagingCost, setPackagingCost] = useState(1);
  const [storageCost, setStorageCost] = useState(0.25);
  const [photoListingCost, setPhotoListingCost] = useState(0.5);
  const [expectedSalePrice, setExpectedSalePrice] = useState(35);
  const [shippingLabelCost, setShippingLabelCost] = useState(6.5);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [targetProfit, setTargetProfit] = useState(12);

  const results = useMemo(() => {
    const productCost =
      purchaseCost +
      shippingToYou +
      cleaningCost +
      prepCost +
      packagingCost +
      storageCost +
      photoListingCost;

    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const estimatedFees = expectedSalePrice * feeRate + fixedFee;
    const totalCost = productCost + shippingLabelCost + estimatedFees;
    const profit = expectedSalePrice - totalCost;
    const margin = expectedSalePrice > 0 ? (profit / expectedSalePrice) * 100 : 0;
    const costShare =
      expectedSalePrice > 0 ? (totalCost / expectedSalePrice) * 100 : 0;

    const breakEvenBeforeFees = productCost + shippingLabelCost + fixedFee;
    const breakEvenPrice =
      feeRate < 1 ? breakEvenBeforeFees / (1 - feeRate) : 0;

    const targetBeforeFees =
      productCost + shippingLabelCost + fixedFee + targetProfit;
    const targetPrice = feeRate < 1 ? targetBeforeFees / (1 - feeRate) : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.6) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return {
      productCost,
      estimatedFees,
      totalCost,
      profit,
      margin,
      costShare,
      breakEvenPrice,
      targetPrice,
      status,
    };
  }, [
    purchaseCost,
    shippingToYou,
    cleaningCost,
    prepCost,
    packagingCost,
    storageCost,
    photoListingCost,
    expectedSalePrice,
    shippingLabelCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    targetProfit,
  ]);

  const scenarios = [20, 25, 30, 35, 40, 45, 50].map((price) => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const fees = price * feeRate + fixedFee;
    const totalCost = results.productCost + shippingLabelCost + fees;
    const profit = price - totalCost;
    const margin = price > 0 ? (profit / price) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.6) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return { price, fees, profit, margin, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Product Cost Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate total Mercari item cost after purchase price, sourcing cost,
          inbound shipping, cleaning, prep, packaging, storage, listing work,
          shipping label cost, fees, and target profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Product cost inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item cost, prep costs, packaging, shipping, fees, and target
              profit to estimate whether a Mercari item is worth listing.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Purchase cost" value={purchaseCost} setValue={setPurchaseCost} prefix="$" />
              <NumberInput label="Shipping to you" value={shippingToYou} setValue={setShippingToYou} prefix="$" />
              <NumberInput label="Cleaning cost" value={cleaningCost} setValue={setCleaningCost} prefix="$" />
              <NumberInput label="Prep cost" value={prepCost} setValue={setPrepCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Storage cost" value={storageCost} setValue={setStorageCost} prefix="$" />
              <NumberInput label="Photo/listing cost" value={photoListingCost} setValue={setPhotoListingCost} prefix="$" />
              <NumberInput label="Expected sale price" value={expectedSalePrice} setValue={setExpectedSalePrice} prefix="$" />
              <NumberInput label="Shipping label cost" value={shippingLabelCost} setValue={setShippingLabelCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Target profit" value={targetProfit} setValue={setTargetProfit} prefix="$" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari fees, shipping
              rates, packaging costs, promotion costs, refunds, taxes, and
              selling rules may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari product cost and listing profitability.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                title="Total product cost"
                value={money(results.productCost)}
                tone="yellow"
                text="Purchase, inbound shipping, prep, packaging, storage, and listing costs."
              />
              <ResultCard
                title="Estimated profit"
                value={money(results.profit)}
                tone={results.profit >= targetProfit ? "green" : "yellow"}
                text="Expected sale price minus item cost, shipping, and fees."
              />
              <ResultCard
                title="Target sale price"
                value={money(results.targetPrice)}
                tone="green"
                text="Estimated price needed to reach your target profit."
              />
              <ResultCard
                title="Break-even price"
                value={money(results.breakEvenPrice)}
                tone="yellow"
                text="Approximate price needed to avoid losing money."
              />
              <ResultCard
                title="Estimated fees"
                value={money(results.estimatedFees)}
                tone="blue"
                text="Estimated selling and payment processing fees."
              />
              <ResultCard
                title="Total cost at sale"
                value={money(results.totalCost)}
                tone="blue"
                text="Product cost, shipping label, and fees combined."
              />
              <ResultCard
                title="Estimated margin"
                value={`${results.margin.toFixed(1)}%`}
                tone={results.margin >= 30 ? "green" : "yellow"}
                text="Estimated profit divided by expected sale price."
              />
              <ResultCard
                title="Cost share"
                value={`${results.costShare.toFixed(1)}%`}
                tone="yellow"
                text="Total cost as a share of expected sale price."
              />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your total product cost before Mercari fees and outbound shipping
                is estimated at <strong>{money(results.productCost)}</strong>. At
                the entered sale price, estimated profit is{" "}
                <strong>{money(results.profit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "This item appears to meet or exceed your target profit."
                  : results.status === "Watch"
                    ? "This item is profitable, but does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "This item has thin profit and may not be worth sourcing or listing."
                      : "This item appears to lose money under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Sale price scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Sale price</th>
                      <th className="px-3 py-2">Fees</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.price} className="border-t">
                        <td className="px-3 py-2">{money(row.price)}</td>
                        <td className="px-3 py-2">{money(row.fees)}</td>
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
            How to use this Mercari Product Cost Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter item cost" text="Start with purchase cost, sourcing cost, or cost basis." />
            <StepCard title="Add prep costs" text="Include cleaning, repairs, packaging, storage, and listing work." />
            <StepCard title="Add sale costs" text="Include expected shipping label cost, selling fees, and processing fees." />
            <StepCard title="Review target price" text="Check whether the item can sell high enough to meet your profit goal." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari product cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the major costs included in the product cost estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Purchase cost" value={money(purchaseCost)} />
              <Breakdown label="Shipping to you" value={money(shippingToYou)} />
              <Breakdown label="Cleaning cost" value={money(cleaningCost)} />
              <Breakdown label="Prep cost" value={money(prepCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Storage cost" value={money(storageCost)} />
              <Breakdown label="Photo/listing cost" value={money(photoListingCost)} />
              <Breakdown label="Total product cost" value={money(results.productCost)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Mercari product cost mistakes
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Counting only the purchase price and forgetting prep or cleaning costs." />
              <Warning text="Ignoring inbound shipping or sourcing costs." />
              <Warning text="Forgetting packaging, tape, labels, mailers, and protective supplies." />
              <Warning text="Not including time or cost for photos, measurements, and listing work." />
              <Warning text="Sourcing items without checking expected sale price and target profit." />
              <Warning text="Restocking similar items before checking whether the first item was profitable." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Mercari product profitability
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Buy lower" text="Lower sourcing cost gives more room for fees, offers, and shipping." />
            <StepCard title="Reduce prep cost" text="Avoid items that need too much cleaning, repair, or handling." />
            <StepCard title="Price from costs" text="Use total cost, not purchase price alone, to set listings." />
            <StepCard title="Track winners" text="Source more items only after confirming actual profit and sell-through." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/fee-calculator" label="Fee Calculator" />
            <Related href="/mercari/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Included in the product cost estimate.
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