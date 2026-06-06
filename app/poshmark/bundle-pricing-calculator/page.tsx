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

export default function PoshmarkBundlePricingCalculatorPage() {
  const [item1RegularPrice, setItem1RegularPrice] = useState(35);
  const [item2RegularPrice, setItem2RegularPrice] = useState(28);
  const [item3RegularPrice, setItem3RegularPrice] = useState(22);
  const [item1Cost, setItem1Cost] = useState(12);
  const [item2Cost, setItem2Cost] = useState(8);
  const [item3Cost, setItem3Cost] = useState(6);
  const [bundlePrice, setBundlePrice] = useState(68);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [shippingDiscount, setShippingDiscount] = useState(2.02);
  const [promotionCost, setPromotionCost] = useState(2);
  const [refundAllowance, setRefundAllowance] = useState(2);
  const [targetProfit, setTargetProfit] = useState(20);

  const results = useMemo(() => {
    const separateItemPriceTotal =
      item1RegularPrice + item2RegularPrice + item3RegularPrice;

    const productCostTotal = item1Cost + item2Cost + item3Cost;

    const bundleDiscount = Math.max(0, separateItemPriceTotal - bundlePrice);

    const bundleDiscountPercent =
      separateItemPriceTotal > 0
        ? (bundleDiscount / separateItemPriceTotal) * 100
        : 0;

    const fee =
      bundlePrice < flatFeeThreshold
        ? Math.min(flatFee, bundlePrice)
        : bundlePrice * (sellerFeeRate / 100);

    const bundleCost =
      productCostTotal +
      packagingCost +
      fee +
      shippingDiscount +
      promotionCost +
      refundAllowance;

    const bundleProfit = bundlePrice - bundleCost;
    const bundleMargin = bundlePrice > 0 ? (bundleProfit / bundlePrice) * 100 : 0;

    const separateSaleFee =
      separateItemPriceTotal < flatFeeThreshold
        ? Math.min(flatFee, separateItemPriceTotal)
        : separateItemPriceTotal * (sellerFeeRate / 100);

    const separateSaleProfit =
      separateItemPriceTotal -
      productCostTotal -
      packagingCost -
      separateSaleFee -
      refundAllowance;

    const bundleVsSeparateProfit = bundleProfit - separateSaleProfit;

    const breakEvenBundlePrice =
      productCostTotal +
      packagingCost +
      shippingDiscount +
      promotionCost +
      refundAllowance +
      (bundlePrice < flatFeeThreshold ? flatFee : 0);

    const priceForTargetProfit =
      bundlePrice < flatFeeThreshold
        ? productCostTotal +
          packagingCost +
          shippingDiscount +
          promotionCost +
          refundAllowance +
          flatFee +
          targetProfit
        : (productCostTotal +
            packagingCost +
            shippingDiscount +
            promotionCost +
            refundAllowance +
            targetProfit) /
          (1 - sellerFeeRate / 100);

    const extraPriceNeeded = Math.max(0, priceForTargetProfit - bundlePrice);

    let status: Status = "Healthy";
    if (bundleProfit < 0) status = "Losing";
    else if (bundleProfit < targetProfit * 0.5) status = "Thin";
    else if (bundleProfit < targetProfit) status = "Watch";

    const scenarios = [0, 5, 10, 15, 20, 25, 30].map((discountPercent) => {
      const scenarioPrice =
        separateItemPriceTotal * (1 - discountPercent / 100);

      const scenarioFee =
        scenarioPrice < flatFeeThreshold
          ? Math.min(flatFee, scenarioPrice)
          : scenarioPrice * (sellerFeeRate / 100);

      const scenarioCost =
        productCostTotal +
        packagingCost +
        scenarioFee +
        shippingDiscount +
        promotionCost +
        refundAllowance;

      const scenarioProfit = scenarioPrice - scenarioCost;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

      let scenarioStatus: Status = "Healthy";
      if (scenarioProfit < 0) scenarioStatus = "Losing";
      else if (scenarioProfit < targetProfit * 0.5) scenarioStatus = "Thin";
      else if (scenarioProfit < targetProfit) scenarioStatus = "Watch";

      return {
        discountPercent,
        scenarioPrice,
        scenarioProfit,
        scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      separateItemPriceTotal,
      productCostTotal,
      bundleDiscount,
      bundleDiscountPercent,
      fee,
      bundleCost,
      bundleProfit,
      bundleMargin,
      separateSaleProfit,
      bundleVsSeparateProfit,
      breakEvenBundlePrice,
      priceForTargetProfit,
      extraPriceNeeded,
      status,
      scenarios,
    };
  }, [
    item1RegularPrice,
    item2RegularPrice,
    item3RegularPrice,
    item1Cost,
    item2Cost,
    item3Cost,
    bundlePrice,
    packagingCost,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    shippingDiscount,
    promotionCost,
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
          Poshmark Bundle Pricing Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate Poshmark bundle price, bundle discount, combined item cost,
          shipping discount, packaging cost, Poshmark fees, promotion cost,
          refund allowance, target profit, and whether a bundle is worth accepting.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Bundle inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter standalone item prices, item costs, bundle price, shipping
              discount, packaging, fees, refund allowance, and target profit.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Item 1 regular price" value={item1RegularPrice} setValue={setItem1RegularPrice} />
              <MoneyInput label="Item 2 regular price" value={item2RegularPrice} setValue={setItem2RegularPrice} />
              <MoneyInput label="Item 3 regular price" value={item3RegularPrice} setValue={setItem3RegularPrice} />
              <MoneyInput label="Item 1 cost" value={item1Cost} setValue={setItem1Cost} />
              <MoneyInput label="Item 2 cost" value={item2Cost} setValue={setItem2Cost} />
              <MoneyInput label="Item 3 cost" value={item3Cost} setValue={setItem3Cost} />
              <MoneyInput label="Bundle price" value={bundlePrice} setValue={setBundlePrice} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <MoneyInput label="Shipping discount" value={shippingDiscount} setValue={setShippingDiscount} />
              <MoneyInput label="Promotion cost" value={promotionCost} setValue={setPromotionCost} />
              <MoneyInput label="Refund allowance" value={refundAllowance} setValue={setRefundAllowance} />
              <MoneyInput label="Target profit" value={targetProfit} setValue={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark bundle behavior,
              shipping discounts, buyer offers, packaging needs, fees, return
              risk, and sale outcomes may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark bundle profitability.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="green"
                title="Profit per bundle"
                value={money(results.bundleProfit)}
                text="Bundle price minus product cost, shipping discount, packaging, fees, promotion, and refund allowance."
              />
              <ResultCard
                tone="yellow"
                title="Bundle margin"
                value={pct(results.bundleMargin)}
                text="Profit per bundle divided by bundle price."
              />
              <ResultCard
                tone="yellow"
                title="Bundle discount"
                value={money(results.bundleDiscount)}
                text="Discount compared with selling the items separately."
              />
              <ResultCard
                tone="yellow"
                title="Bundle discount percent"
                value={pct(results.bundleDiscountPercent)}
                text="Discount as a share of separate item prices."
              />
              <ResultCard
                tone="blue"
                title="Separate item price total"
                value={money(results.separateItemPriceTotal)}
                text="Combined standalone price of the bundled items."
              />
              <ResultCard
                tone="blue"
                title="Product cost total"
                value={money(results.productCostTotal)}
                text="Combined item cost for all bundled items."
              />
              <ResultCard
                tone="yellow"
                title="Bundle cost"
                value={money(results.bundleCost)}
                text="Total estimated cost to sell and fulfill the bundle."
              />
              <ResultCard
                tone="yellow"
                title="Break-even bundle price"
                value={money(results.breakEvenBundlePrice)}
                text="Minimum bundle price before profit reaches zero."
              />
              <ResultCard
                tone="green"
                title="Price for target profit"
                value={money(results.priceForTargetProfit)}
                text="Bundle price needed to reach target profit."
              />
              <ResultCard
                tone="yellow"
                title="Extra price needed"
                value={money(results.extraPriceNeeded)}
                text="Additional bundle price needed to reach target profit."
              />
              <ResultCard
                tone="blue"
                title="Separate sale profit"
                value={money(results.separateSaleProfit)}
                text="Estimated profit if the items sold separately."
              />
              <ResultCard
                tone="yellow"
                title="Bundle vs. separate profit"
                value={money(results.bundleVsSeparateProfit)}
                text="Bundle profit compared with separate-sale profit."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The separate item price total is{" "}
                <strong>{money(results.separateItemPriceTotal)}</strong>. At a
                bundle price of <strong>{money(bundlePrice)}</strong>, the
                bundle discount is{" "}
                <strong>{money(results.bundleDiscount)}</strong>, or{" "}
                <strong>{pct(results.bundleDiscountPercent)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Estimated bundle profit is{" "}
                <strong>{money(results.bundleProfit)}</strong>, with a bundle
                margin of <strong>{pct(results.bundleMargin)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "The bundle appears profitable under the entered assumptions."
                  : results.status === "Watch"
                    ? "The bundle is profitable, but does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "The bundle has thin profit after discount, fees, and shipping pressure."
                      : "The bundle is estimated to lose money under these assumptions."}
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
                    {results.scenarios.map((row) => (
                      <tr key={row.discountPercent} className="border-t">
                        <td className="px-3 py-2">{pct(row.discountPercent)}</td>
                        <td className="px-3 py-2">{money(row.scenarioPrice)}</td>
                        <td className="px-3 py-2">{money(row.scenarioProfit)}</td>
                        <td className="px-3 py-2">{pct(row.scenarioMargin)}</td>
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
            How to use this Poshmark Bundle Pricing Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter item prices"
              text="Add the standalone price for each item in the bundle."
            />
            <StepCard
              title="Add product costs"
              text="Enter item cost, packaging cost, shipping discount, promotion cost, and refund allowance."
            />
            <StepCard
              title="Set bundle price"
              text="Add the proposed bundle price and target profit."
            />
            <StepCard
              title="Review profit"
              text="Check whether the bundle discount still leaves enough margin."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark bundle cost breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the main costs included in the bundle pricing estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Separate item price total" value={money(results.separateItemPriceTotal)} />
              <Breakdown label="Bundle price" value={money(bundlePrice)} />
              <Breakdown label="Bundle discount" value={money(results.bundleDiscount)} />
              <Breakdown label="Product cost total" value={money(results.productCostTotal)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Estimated Poshmark fee" value={money(results.fee)} />
              <Breakdown label="Shipping discount" value={money(shippingDiscount)} />
              <Breakdown label="Profit per bundle" value={money(results.bundleProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark bundle pricing mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Discounting the bundle without adding up the cost of every item.",
                "Forgetting that bundle orders can increase packaging and shipping pressure.",
                "Accepting bundle offers without checking total profit.",
                "Using bundles only to increase revenue while reducing profit per order.",
                "Combining low-margin items without balancing them with stronger items.",
                "Making the bundle price too close to break-even after fees, shipping discounts, and refund risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark bundle profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Pair margins wisely"
              text="Combine lower-margin items with stronger-margin items to protect total bundle profit."
            />
            <StepCard
              title="Control shipping"
              text="Watch package size, weight, packaging cost, and shipping discount pressure."
            />
            <StepCard
              title="Use clear value"
              text="Explain why the bundle is useful so buyers see value beyond the discount."
            />
            <StepCard
              title="Set a floor price"
              text="Know the lowest acceptable bundle price before negotiating offers."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/shipping-discount-calculator" label="Shipping Discount Calculator" />
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
          Included in the bundle pricing estimate.
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