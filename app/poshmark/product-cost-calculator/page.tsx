"use client";

import { useMemo, useState } from "react";

type Status = "Healthy" | "Watch" | "Thin" | "Losing";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function pct(value: number) {
  return `${value.toFixed(1)}%`;
}

function clamp(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export default function PoshmarkProductCostCalculatorPage() {
  const [purchaseCost, setPurchaseCost] = useState(14);
  const [sourcingCost, setSourcingCost] = useState(2);
  const [cleaningCost, setCleaningCost] = useState(1);
  const [prepCost, setPrepCost] = useState(0.75);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [storageCost, setStorageCost] = useState(0.25);
  const [photoListingCost, setPhotoListingCost] = useState(0.5);
  const [expectedSalePrice, setExpectedSalePrice] = useState(45);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [shippingDiscount, setShippingDiscount] = useState(2.02);
  const [targetProfit, setTargetProfit] = useState(12);

  const results = useMemo(() => {
    const productCost =
      purchaseCost +
      sourcingCost +
      cleaningCost +
      prepCost +
      packagingCost +
      storageCost +
      photoListingCost;

    const fee =
      expectedSalePrice < flatFeeThreshold
        ? Math.min(flatFee, expectedSalePrice)
        : expectedSalePrice * (sellerFeeRate / 100);

    const totalCostAtSale = productCost + fee + shippingDiscount;
    const profit = expectedSalePrice - totalCostAtSale;
    const margin = expectedSalePrice > 0 ? (profit / expectedSalePrice) * 100 : 0;
    const costShare =
      expectedSalePrice > 0 ? (totalCostAtSale / expectedSalePrice) * 100 : 0;

    const breakEvenPrice =
      productCost +
      shippingDiscount +
      (expectedSalePrice < flatFeeThreshold ? flatFee : 0);

    const targetSalePrice =
      expectedSalePrice < flatFeeThreshold
        ? productCost + shippingDiscount + flatFee + targetProfit
        : (productCost + shippingDiscount + targetProfit) /
          (1 - sellerFeeRate / 100);

    const extraPriceNeeded = Math.max(0, targetSalePrice - expectedSalePrice);

    let status: Status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.5) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    const scenarios = [20, 25, 30, 35, 40, 45, 50, 60].map((salePrice) => {
      const scenarioFee =
        salePrice < flatFeeThreshold
          ? Math.min(flatFee, salePrice)
          : salePrice * (sellerFeeRate / 100);

      const scenarioTotalCost = productCost + scenarioFee + shippingDiscount;
      const scenarioProfit = salePrice - scenarioTotalCost;
      const scenarioMargin =
        salePrice > 0 ? (scenarioProfit / salePrice) * 100 : 0;

      let scenarioStatus: Status = "Healthy";
      if (scenarioProfit < 0) scenarioStatus = "Losing";
      else if (scenarioProfit < targetProfit * 0.5) scenarioStatus = "Thin";
      else if (scenarioProfit < targetProfit) scenarioStatus = "Watch";

      return {
        salePrice,
        fee: scenarioFee,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      productCost,
      fee,
      totalCostAtSale,
      profit,
      margin,
      costShare,
      breakEvenPrice,
      targetSalePrice,
      extraPriceNeeded,
      status,
      scenarios,
    };
  }, [
    purchaseCost,
    sourcingCost,
    cleaningCost,
    prepCost,
    packagingCost,
    storageCost,
    photoListingCost,
    expectedSalePrice,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    shippingDiscount,
    targetProfit,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Product Cost Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate total Poshmark item cost after purchase price, sourcing cost,
          cleaning, prep, packaging, storage, listing work, Poshmark fees,
          shipping discounts, and target profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Product cost inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item cost, prep costs, packaging, listing costs, fees,
              expected sale price, shipping discount, and target profit.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Purchase cost" value={purchaseCost} setValue={setPurchaseCost} />
              <MoneyInput label="Sourcing cost" value={sourcingCost} setValue={setSourcingCost} />
              <MoneyInput label="Cleaning cost" value={cleaningCost} setValue={setCleaningCost} />
              <MoneyInput label="Prep cost" value={prepCost} setValue={setPrepCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <MoneyInput label="Storage cost" value={storageCost} setValue={setStorageCost} />
              <MoneyInput label="Photo/listing cost" value={photoListingCost} setValue={setPhotoListingCost} />
              <MoneyInput label="Expected sale price" value={expectedSalePrice} setValue={setExpectedSalePrice} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <MoneyInput label="Shipping discount" value={shippingDiscount} setValue={setShippingDiscount} />
              <MoneyInput label="Target profit" value={targetProfit} setValue={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark fees, shipping
              discounts, item condition, sourcing costs, packaging costs, taxes,
              returns, and sale prices may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark product cost and listing profitability.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="yellow"
                title="Total product cost"
                value={money(results.productCost)}
                text="Purchase, sourcing, cleaning, prep, packaging, storage, and listing costs."
              />
              <ResultCard
                tone="green"
                title="Estimated profit"
                value={money(results.profit)}
                text="Expected sale price minus product cost, fees, and shipping discount."
              />
              <ResultCard
                tone="green"
                title="Target sale price"
                value={money(results.targetSalePrice)}
                text="Estimated price needed to reach your target profit."
              />
              <ResultCard
                tone="yellow"
                title="Break-even price"
                value={money(results.breakEvenPrice)}
                text="Approximate price needed to avoid losing money."
              />
              <ResultCard
                tone="blue"
                title="Estimated Poshmark fee"
                value={money(results.fee)}
                text="Estimated commission or flat fee based on sale price."
              />
              <ResultCard
                tone="blue"
                title="Total cost at sale"
                value={money(results.totalCostAtSale)}
                text="Product cost, Poshmark fee, and shipping discount combined."
              />
              <ResultCard
                tone="yellow"
                title="Estimated margin"
                value={pct(results.margin)}
                text="Profit divided by expected sale price."
              />
              <ResultCard
                tone="yellow"
                title="Cost share"
                value={pct(results.costShare)}
                text="Total cost as a share of expected sale price."
              />
              <ResultCard
                tone="yellow"
                title="Extra price needed"
                value={money(results.extraPriceNeeded)}
                text="Additional sale price needed to reach target profit."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your total product cost before Poshmark fees and shipping
                discounts is estimated at{" "}
                <strong>{money(results.productCost)}</strong>. At the entered
                sale price, estimated profit is{" "}
                <strong>{money(results.profit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "This item appears profitable under the entered assumptions."
                  : results.status === "Watch"
                    ? "This item is profitable, but does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "This item has thin profit after costs, fees, and shipping discount."
                      : "This item is estimated to lose money under these assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Sale price scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Sale price</th>
                      <th className="px-3 py-2">Fee</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.salePrice} className="border-t">
                        <td className="px-3 py-2">{money(row.salePrice)}</td>
                        <td className="px-3 py-2">{money(row.fee)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">{pct(row.margin)}</td>
                        <td className="px-3 py-2">
                          <StatusBadge status={row.status} />
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
            How to use this Poshmark Product Cost Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter item cost"
              text="Start with purchase cost, sourcing cost, cleaning, prep, and storage basis."
            />
            <StepCard
              title="Add closet costs"
              text="Include packaging, photo/listing work, supplies, and shipping discount."
            />
            <StepCard
              title="Add sale costs"
              text="Include Poshmark commission or flat fee and expected selling price."
            />
            <StepCard
              title="Review target price"
              text="Check whether the item can sell high enough to meet your profit goal."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark product cost breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the major costs included in the product cost estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Purchase cost" value={money(purchaseCost)} />
              <Breakdown label="Sourcing cost" value={money(sourcingCost)} />
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
              Common Poshmark product cost mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting only the purchase price and forgetting sourcing or cleaning costs.",
                "Ignoring packaging supplies, labels, thank-you cards, tape, and mailers.",
                "Not including time or cost for photos, measurements, and listing work.",
                "Forgetting shipping discounts when estimating final sale profit.",
                "Sourcing items without checking expected sale price and target profit.",
                "Restocking similar items before checking whether the first item was profitable.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark product profitability
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Buy lower"
              text="Lower sourcing cost gives more room for fees, offers, and shipping discounts."
            />
            <StepCard
              title="Reduce prep cost"
              text="Avoid items that need too much cleaning, repair, or handling."
            />
            <StepCard
              title="Price from costs"
              text="Use total cost, not purchase price alone, to set listings."
            />
            <StepCard
              title="Track winners"
              text="Source more items only after confirming actual profit and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/fee-calculator" label="Fee Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <span className="bg-slate-50 px-3 py-2 text-slate-500">$</span>
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
      </div>
    </label>
  );
}

function PercentInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
        <span className="bg-slate-50 px-3 py-2 text-slate-500">%</span>
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
  tone: "green" | "blue" | "yellow";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "blue"
        ? "border-blue-200 bg-blue-50"
        : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const className =
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Watch"
        ? "bg-amber-100 text-amber-700"
        : status === "Thin"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
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
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
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