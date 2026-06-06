"use client";

import { useMemo, useState } from "react";

type Status = "Strong" | "Healthy" | "Watch" | "Thin" | "Losing";

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

export default function PoshmarkShippingDiscountCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [itemCost, setItemCost] = useState(14);
  const [packagingCost, setPackagingCost] = useState(1);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [shippingDiscount, setShippingDiscount] = useState(2.02);
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState(5);
  const [closetClearOutDiscount, setClosetClearOutDiscount] = useState(0);
  const [extraSuppliesCost, setExtraSuppliesCost] = useState(0.5);
  const [refundAllowance, setRefundAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(12);

  const results = useMemo(() => {
    const effectivePrice = Math.max(
      0,
      salePrice - buyerOfferDiscount - closetClearOutDiscount
    );

    const fee =
      effectivePrice < flatFeeThreshold
        ? Math.min(flatFee, effectivePrice)
        : effectivePrice * (sellerFeeRate / 100);

    const totalCost =
      itemCost +
      packagingCost +
      extraSuppliesCost +
      fee +
      shippingDiscount +
      refundAllowance;

    const profit = effectivePrice - totalCost;
    const noDiscountProfit =
      effectivePrice -
      (itemCost + packagingCost + extraSuppliesCost + fee + refundAllowance);

    const discountImpact = noDiscountProfit - profit;
    const margin = effectivePrice > 0 ? (profit / effectivePrice) * 100 : 0;
    const discountShare =
      effectivePrice > 0 ? (shippingDiscount / effectivePrice) * 100 : 0;

    const breakEvenPrice =
      itemCost +
      packagingCost +
      extraSuppliesCost +
      shippingDiscount +
      refundAllowance +
      (effectivePrice < flatFeeThreshold ? flatFee : 0);

    const priceForTarget =
      effectivePrice < flatFeeThreshold
        ? itemCost +
          packagingCost +
          extraSuppliesCost +
          shippingDiscount +
          refundAllowance +
          flatFee +
          targetProfit
        : (itemCost +
            packagingCost +
            extraSuppliesCost +
            shippingDiscount +
            refundAllowance +
            targetProfit) /
          (1 - sellerFeeRate / 100);

    const extraPriceNeeded = Math.max(0, priceForTarget - effectivePrice);

    let status: Status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.5) status = "Thin";
    else if (profit < targetProfit) status = "Watch";
    else if (margin >= 35) status = "Strong";

    const scenarios = [0, 1.5, 2.02, 3.99, 5.95, 7.67].map((discount) => {
      const scenarioCost =
        itemCost +
        packagingCost +
        extraSuppliesCost +
        fee +
        discount +
        refundAllowance;
      const scenarioProfit = effectivePrice - scenarioCost;
      const scenarioMargin =
        effectivePrice > 0 ? (scenarioProfit / effectivePrice) * 100 : 0;

      let scenarioStatus: Status = "Healthy";
      if (scenarioProfit < 0) scenarioStatus = "Losing";
      else if (scenarioProfit < targetProfit * 0.5) scenarioStatus = "Thin";
      else if (scenarioProfit < targetProfit) scenarioStatus = "Watch";
      else if (scenarioMargin >= 35) scenarioStatus = "Strong";

      return {
        discount,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      effectivePrice,
      fee,
      totalCost,
      profit,
      noDiscountProfit,
      discountImpact,
      margin,
      discountShare,
      breakEvenPrice,
      priceForTarget,
      extraPriceNeeded,
      status,
      scenarios,
    };
  }, [
    salePrice,
    itemCost,
    packagingCost,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    shippingDiscount,
    buyerOfferDiscount,
    closetClearOutDiscount,
    extraSuppliesCost,
    refundAllowance,
    targetProfit,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Shipping Discount Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate how seller-paid shipping discounts, offers to likers, Closet
          Clear Out incentives, buyer offer discounts, Poshmark fees, packaging
          costs, and refund allowance affect final closet profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Shipping discount inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter listing price, offer discount, shipping incentive, item cost,
              fees, packaging, and profit target.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Listing price" value={salePrice} setValue={setSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} setValue={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <MoneyInput label="Shipping discount" value={shippingDiscount} setValue={setShippingDiscount} />
              <MoneyInput label="Buyer offer discount" value={buyerOfferDiscount} setValue={setBuyerOfferDiscount} />
              <MoneyInput label="Closet Clear Out discount" value={closetClearOutDiscount} setValue={setClosetClearOutDiscount} />
              <MoneyInput label="Extra supplies cost" value={extraSuppliesCost} setValue={setExtraSuppliesCost} />
              <MoneyInput label="Refund allowance" value={refundAllowance} setValue={setRefundAllowance} />
              <MoneyInput label="Target profit" value={targetProfit} setValue={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark fees, shipping
              discounts, Closet Clear Out behavior, buyer offers, taxes, returns,
              and seller-specific rules may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark shipping discount profitability.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="green"
                title="Profit after shipping discount"
                value={money(results.profit)}
                text="Profit after offer discount, shipping discount, fees, costs, and refund allowance."
              />
              <ResultCard
                tone="blue"
                title="Effective sale price"
                value={money(results.effectivePrice)}
                text="Listing price minus buyer offer and Closet Clear Out discount."
              />
              <ResultCard
                tone="yellow"
                title="Shipping discount impact"
                value={money(results.discountImpact)}
                text="Profit reduction caused by the seller-paid shipping discount."
              />
              <ResultCard
                tone="green"
                title="Profit without shipping discount"
                value={money(results.noDiscountProfit)}
                text="Estimated profit if no seller-paid shipping discount is offered."
              />
              <ResultCard
                tone="blue"
                title="Estimated Poshmark fee"
                value={money(results.fee)}
                text="Estimated commission or flat fee based on the effective sale price."
              />
              <ResultCard
                tone="yellow"
                title="Total cost"
                value={money(results.totalCost)}
                text="Item cost, packaging, fee, shipping discount, supplies, and refund allowance."
              />
              <ResultCard
                tone="green"
                title="Estimated margin"
                value={pct(results.margin)}
                text="Profit divided by effective sale price."
              />
              <ResultCard
                tone="yellow"
                title="Shipping discount share"
                value={pct(results.discountShare)}
                text="Seller-paid shipping discount as a share of effective sale price."
              />
              <ResultCard
                tone="blue"
                title="Break-even price"
                value={money(results.breakEvenPrice)}
                text="Approximate minimum price needed to avoid losing money."
              />
              <ResultCard
                tone="yellow"
                title="Extra price needed"
                value={money(results.extraPriceNeeded)}
                text="Additional effective price needed to reach your target profit."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                At an effective sale price of{" "}
                <strong>{money(results.effectivePrice)}</strong>, the shipping
                discount creates an estimated profit impact of{" "}
                <strong>{money(results.discountImpact)}</strong>. Final estimated
                profit is <strong>{money(results.profit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "The listing appears to have strong room for shipping incentives."
                  : results.status === "Healthy"
                    ? "The listing appears profitable under the entered assumptions."
                    : results.status === "Watch"
                      ? "The listing is profitable but may not fully reach the target profit."
                      : results.status === "Thin"
                        ? "The listing has thin margin after discount pressure."
                        : "The listing is estimated to lose money under these assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Shipping discount scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Discount</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.discount} className="border-t">
                        <td className="px-3 py-2">{money(row.discount)}</td>
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
            How to use this Poshmark Shipping Discount Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter price"
              text="Add your listing price and any buyer offer or Closet Clear Out discount."
            />
            <StepCard
              title="Add shipping"
              text="Enter the seller-paid shipping discount or offer-to-likers shipping incentive."
            />
            <StepCard
              title="Include costs"
              text="Add item cost, packaging, supplies, fees, and refund allowance."
            />
            <StepCard
              title="Review profit"
              text="Check whether the shipping discount improves conversion without destroying margin."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Poshmark shipping discount breakdown
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the major values behind the shipping discount estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Listing price" value={money(salePrice)} />
              <Breakdown label="Effective sale price" value={money(results.effectivePrice)} />
              <Breakdown label="Shipping discount" value={money(shippingDiscount)} />
              <Breakdown label="Estimated Poshmark fee" value={money(results.fee)} />
              <Breakdown label="Total cost" value={money(results.totalCost)} />
              <Breakdown label="Profit after discount" value={money(results.profit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark shipping discount mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Sending offers to likers without checking the shipping discount cost.",
                "Accepting buyer offers after already adding a seller-paid shipping incentive.",
                "Treating the listing price as profit before Poshmark fees and item cost.",
                "Using shipping discounts on low-margin items that cannot absorb them.",
                "Forgetting packaging, labels, mailers, tape, and closet supplies.",
                "Running Closet Clear Out drops without checking the final profit floor.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark shipping discount profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise list price"
              text="Build offer and shipping discount room into the original listing price."
            />
            <StepCard
              title="Limit weak offers"
              text="Avoid stacking deep buyer discounts with seller-paid shipping incentives."
            />
            <StepCard
              title="Use on strong items"
              text="Reserve shipping discounts for items with enough margin or strong demand."
            />
            <StepCard
              title="Track results"
              text="Compare profit before and after shipping incentives, not just likes or shares."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/closet-clear-out-calculator" label="Closet Clear Out Calculator" />
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
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
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
          Included in the shipping discount estimate.
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