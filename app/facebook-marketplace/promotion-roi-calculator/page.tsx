"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplacePromotionRoiCalculatorPage() {
  const [averageSalePrice, setAverageSalePrice] = useState(80);
  const [itemCost, setItemCost] = useState(35);
  const [packagingCost, setPackagingCost] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [shippingCost, setShippingCost] = useState(0);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [negotiationDiscount, setNegotiationDiscount] = useState(8);
  const [promotionCost, setPromotionCost] = useState(20);
  const [currentMonthlySales, setCurrentMonthlySales] = useState(25);
  const [expectedExtraSales, setExpectedExtraSales] = useState(4);
  const [returnRate, setReturnRate] = useState(3);
  const [targetProfitLift, setTargetProfitLift] = useState(50);

  const results = useMemo(() => {
    const effectiveSalePrice = Math.max(0, averageSalePrice - negotiationDiscount);
    const platformFee = effectiveSalePrice * (platformFeeRate / 100);

    const costPerSale =
      itemCost + packagingCost + deliveryCost + shippingCost + platformFee;

    const profitPerSale = effectiveSalePrice - costPerSale;
    const currentMonthlyProfit = currentMonthlySales * profitPerSale;

    const revenueLift = expectedExtraSales * effectiveSalePrice;
    const refundLoss =
      expectedExtraSales * (returnRate / 100) * costPerSale;

    const grossPromotionProfit = expectedExtraSales * profitPerSale;
    const netPromotionLift =
      grossPromotionProfit - promotionCost - refundLoss;

    const promotedMonthlyProfit = currentMonthlyProfit + netPromotionLift;

    const promotionRoi =
      promotionCost > 0 ? (netPromotionLift / promotionCost) * 100 : 0;

    const promotionCostPerExtraSale =
      expectedExtraSales > 0 ? promotionCost / expectedExtraSales : 0;

    const breakEvenExtraSales =
      profitPerSale > 0
        ? Math.ceil((promotionCost + refundLoss) / profitPerSale)
        : 0;

    const extraSalesNeededForTarget =
      profitPerSale > 0
        ? Math.ceil((promotionCost + targetProfitLift + refundLoss) / profitPerSale)
        : 0;

    const revenueNeededForTarget =
      extraSalesNeededForTarget * effectiveSalePrice;

    const profitPerExtraSaleAfterPromotion =
      expectedExtraSales > 0 ? netPromotionLift / expectedExtraSales : 0;

    const promotionCostShare =
      revenueLift > 0 ? (promotionCost / revenueLift) * 100 : 0;

    let status = "Healthy";
    if (netPromotionLift < 0) status = "Losing";
    else if (netPromotionLift < targetProfitLift * 0.5) status = "Thin";
    else if (netPromotionLift < targetProfitLift) status = "Watch";
    else if (promotionRoi >= 200) status = "Strong";

    return {
      effectiveSalePrice,
      platformFee,
      costPerSale,
      profitPerSale,
      currentMonthlyProfit,
      revenueLift,
      refundLoss,
      grossPromotionProfit,
      netPromotionLift,
      promotedMonthlyProfit,
      promotionRoi,
      promotionCostPerExtraSale,
      breakEvenExtraSales,
      extraSalesNeededForTarget,
      revenueNeededForTarget,
      profitPerExtraSaleAfterPromotion,
      promotionCostShare,
      status,
    };
  }, [
    averageSalePrice,
    itemCost,
    packagingCost,
    deliveryCost,
    shippingCost,
    platformFeeRate,
    negotiationDiscount,
    promotionCost,
    currentMonthlySales,
    expectedExtraSales,
    returnRate,
    targetProfitLift,
  ]);

  const statusTone: Tone =
    results.status === "Healthy" || results.status === "Strong"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const scenarioRows = [0, 1, 2, 3, 4, 6, 8, 10].map((extraSales) => {
    const revenue = extraSales * results.effectiveSalePrice;
    const refundLoss = extraSales * (returnRate / 100) * results.costPerSale;
    const profitLift = extraSales * results.profitPerSale - promotionCost - refundLoss;
    const roi = promotionCost > 0 ? (profitLift / promotionCost) * 100 : 0;

    let status = "Healthy";
    if (profitLift < 0) status = "Losing";
    else if (profitLift < targetProfitLift * 0.5) status = "Thin";
    else if (profitLift < targetProfitLift) status = "Watch";
    else if (roi >= 200) status = "Strong";

    return {
      extraSales,
      revenue,
      profitLift,
      roi,
      status,
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Promotion ROI Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether boosting listings, improving listing activity,
          reposting, discounting, or spending time on Facebook Marketplace
          promotion creates enough extra sales to justify the cost.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Promotion inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter average sale price, item cost, delivery cost, shipping cost,
              negotiation discount, promotion cost, current sales, and expected
              extra sales.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput
                label="Average sale price"
                value={averageSalePrice}
                onChange={setAverageSalePrice}
              />
              <MoneyInput
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
              />
              <MoneyInput
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
              />
              <MoneyInput
                label="Delivery cost"
                value={deliveryCost}
                onChange={setDeliveryCost}
              />
              <MoneyInput
                label="Shipping cost"
                value={shippingCost}
                onChange={setShippingCost}
              />
              <NumberInput
                label="Platform fee rate"
                value={platformFeeRate}
                onChange={setPlatformFeeRate}
                suffix="%"
              />
              <MoneyInput
                label="Negotiation discount"
                value={negotiationDiscount}
                onChange={setNegotiationDiscount}
              />
              <MoneyInput
                label="Promotion cost"
                value={promotionCost}
                onChange={setPromotionCost}
              />
              <NumberInput
                label="Current monthly sales"
                value={currentMonthlySales}
                onChange={setCurrentMonthlySales}
              />
              <NumberInput
                label="Expected extra sales"
                value={expectedExtraSales}
                onChange={setExpectedExtraSales}
              />
              <NumberInput
                label="Return or issue rate"
                value={returnRate}
                onChange={setReturnRate}
                suffix="%"
              />
              <MoneyInput
                label="Target profit lift"
                value={targetProfitLift}
                onChange={setTargetProfitLift}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace
              promotion results, buyer messages, local demand, pickup reliability,
              delivery costs, negotiation behavior, no-shows, refunds, and
              selling outcomes may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace promotion profitability.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Net promotion lift"
                value={formatMoney(results.netPromotionLift)}
                tone={results.netPromotionLift >= targetProfitLift ? "green" : "yellow"}
                text="Extra profit after subtracting promotion cost and issue risk."
              />
              <ResultCard
                label="Promotion ROI"
                value={`${results.promotionRoi.toFixed(1)}%`}
                tone={results.promotionRoi >= 100 ? "green" : "yellow"}
                text="Net promotion lift divided by promotion cost."
              />
              <ResultCard
                label="Profit per sale"
                value={formatMoney(results.profitPerSale)}
                tone={results.profitPerSale > 0 ? "green" : "red"}
                text="Profit after item cost, delivery, shipping, fees, and negotiation."
              />
              <ResultCard
                label="Revenue lift"
                value={formatMoney(results.revenueLift)}
                tone="blue"
                text="Expected extra sales multiplied by effective sale price."
              />
              <ResultCard
                label="Promotion cost per extra sale"
                value={formatMoney(results.promotionCostPerExtraSale)}
                tone="yellow"
                text="Promotion cost divided by expected extra sales."
              />
              <ResultCard
                label="Break-even extra sales"
                value={String(results.breakEvenExtraSales)}
                tone="yellow"
                text="Extra sales needed to cover the promotion cost."
              />
              <ResultCard
                label="Current monthly profit"
                value={formatMoney(results.currentMonthlyProfit)}
                tone="blue"
                text="Estimated profit before promotion."
              />
              <ResultCard
                label="Promoted monthly profit"
                value={formatMoney(results.promotedMonthlyProfit)}
                tone="green"
                text="Monthly profit after promotion cost and expected extra sales."
              />
              <ResultCard
                label="Refund or issue loss"
                value={formatMoney(results.refundLoss)}
                tone="yellow"
                text="Estimated loss from problem orders created by extra sales."
              />
              <ResultCard
                label="Extra sales needed for target"
                value={String(results.extraSalesNeededForTarget)}
                tone="yellow"
                text="Extra sales needed to reach the target profit lift."
              />
              <ResultCard
                label="Revenue needed for target"
                value={formatMoney(results.revenueNeededForTarget)}
                tone="blue"
                text="Estimated extra revenue needed to reach target lift."
              />
              <ResultCard
                label="Profit per extra sale after promotion"
                value={formatMoney(results.profitPerExtraSaleAfterPromotion)}
                tone={results.profitPerExtraSaleAfterPromotion > 0 ? "green" : "yellow"}
                text="Net promotion lift divided by expected extra sales."
              />
              <ResultCard
                label="Promotion cost share"
                value={`${results.promotionCostShare.toFixed(1)}%`}
                tone="yellow"
                text="Promotion cost as a share of extra revenue."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The promotion is expected to create{" "}
                <strong>{expectedExtraSales}</strong> extra sales and{" "}
                <strong>{formatMoney(results.revenueLift)}</strong> in extra
                revenue. After promotion cost and issue risk, estimated net
                promotion lift is{" "}
                <strong>{formatMoney(results.netPromotionLift)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "This promotion appears to produce a strong return."
                  : results.status === "Healthy"
                    ? "This promotion appears profitable under the entered assumptions."
                    : results.status === "Watch"
                      ? "This promotion is profitable, but below your target lift."
                      : results.status === "Thin"
                        ? "This promotion leaves weak profit after cost and issue risk."
                        : "This promotion appears to lose money under the entered assumptions."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Extra sales scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Extra sales</th>
                      <th className="border px-3 py-2">Revenue</th>
                      <th className="border px-3 py-2">Profit lift</th>
                      <th className="border px-3 py-2">ROI</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.extraSales} className="border">
                        <td className="border px-3 py-2">{row.extraSales}</td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.revenue)}
                        </td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.profitLift)}
                        </td>
                        <td className="border px-3 py-2">
                          {row.roi.toFixed(1)}%
                        </td>
                        <td className="border px-3 py-2">
                          <StatusBadge
                            tone={
                              row.status === "Healthy" || row.status === "Strong"
                                ? "green"
                                : row.status === "Losing"
                                  ? "red"
                                  : "yellow"
                            }
                            label={row.status}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Facebook Marketplace Promotion ROI Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter profit"
              text="Add average sale price, item cost, delivery cost, shipping cost, fees, and negotiation discount."
            />
            <InfoCard
              title="Add promotion"
              text="Enter the promotion cost or estimated time value for extra listing activity."
            />
            <InfoCard
              title="Estimate sales lift"
              text="Add expected extra sales from the promotion."
            />
            <InfoCard
              title="Review ROI"
              text="Check whether the extra sales produce enough real profit lift."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace promotion breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the Facebook Marketplace promotion
              estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown
                label="Effective sale price"
                value={formatMoney(results.effectiveSalePrice)}
              />
              <Breakdown
                label="Cost per sale"
                value={formatMoney(results.costPerSale)}
              />
              <Breakdown
                label="Profit per sale"
                value={formatMoney(results.profitPerSale)}
              />
              <Breakdown
                label="Promotion cost"
                value={formatMoney(promotionCost)}
              />
              <Breakdown
                label="Expected extra sales"
                value={String(expectedExtraSales)}
              />
              <Breakdown
                label="Revenue lift"
                value={formatMoney(results.revenueLift)}
              />
              <Breakdown
                label="Net promotion lift"
                value={formatMoney(results.netPromotionLift)}
              />
              <Breakdown
                label="Promotion ROI"
                value={`${results.promotionRoi.toFixed(1)}%`}
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace promotion mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Promoting listings before checking profit after offers and delivery costs.",
                "Counting extra messages or views as success without checking actual sales.",
                "Using promotion on weak listings with poor photos or unclear pickup details.",
                "Ignoring return risk, no-shows, negotiation pressure, and delivery workload.",
                "Spending more on promotion than extra sales can realistically recover.",
                "Promoting stale inventory instead of improving, relisting, bundling, or repricing it first.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace promotion ROI
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Improve first"
              text="Update photos, titles, descriptions, price, pickup details, and condition notes before promoting."
            />
            <InfoCard
              title="Target proven items"
              text="Promote listings with known demand, strong profit, and healthy sell-through."
            />
            <InfoCard
              title="Limit weak discounts"
              text="Avoid stacking promotion cost with deep buyer negotiation and delivery concessions."
            />
            <InfoCard
              title="Track profit"
              text="Compare sales and profit before and after promotion, not just views or messages."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/facebook-marketplace/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {suffix ? (
          <span className="border-l bg-slate-50 px-3 py-2 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        <span className="border-r bg-slate-50 px-3 py-2 text-sm text-slate-500">
          $
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full px-3 py-2 text-sm outline-none"
        />
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  tone,
  text,
}: {
  label: string;
  value: string;
  tone: Tone;
  text: string;
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "red"
        ? "border-red-200 bg-red-50"
        : tone === "blue"
          ? "border-blue-200 bg-blue-50"
          : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-sm font-bold">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ tone, label }: { tone: Tone; label: string }) {
  const toneClass =
    tone === "green"
      ? "bg-green-100 text-green-700"
      : tone === "red"
        ? "bg-red-100 text-red-700"
        : tone === "blue"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${toneClass}`}>
      {label}
    </span>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
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
          Included in the promotion ROI estimate.
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

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}