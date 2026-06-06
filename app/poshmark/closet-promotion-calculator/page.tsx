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

export default function PoshmarkClosetPromotionCalculatorPage() {
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [itemCost, setItemCost] = useState(14);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [offerDiscount, setOfferDiscount] = useState(5);
  const [shippingDiscount, setShippingDiscount] = useState(2.02);
  const [promotionCost, setPromotionCost] = useState(20);
  const [currentMonthlySales, setCurrentMonthlySales] = useState(25);
  const [expectedExtraSales, setExpectedExtraSales] = useState(6);
  const [returnRate, setReturnRate] = useState(4);
  const [targetProfitLift, setTargetProfitLift] = useState(50);

  const results = useMemo(() => {
    const effectiveSalePrice = Math.max(0, averageSalePrice - offerDiscount);

    const fee =
      effectiveSalePrice < flatFeeThreshold
        ? Math.min(flatFee, effectiveSalePrice)
        : effectiveSalePrice * (sellerFeeRate / 100);

    const profitPerSale =
      effectiveSalePrice -
      itemCost -
      packagingCost -
      shippingDiscount -
      fee;

    const refundLossPerSale =
      (returnRate / 100) * (itemCost + packagingCost + shippingDiscount);

    const adjustedProfitPerSale = profitPerSale - refundLossPerSale;

    const currentMonthlyProfit = currentMonthlySales * adjustedProfitPerSale;

    const promotedMonthlySales = currentMonthlySales + expectedExtraSales;

    const promotedMonthlyProfit =
      promotedMonthlySales * adjustedProfitPerSale - promotionCost;

    const extraGrossProfit = expectedExtraSales * adjustedProfitPerSale;

    const netPromotionLift = promotedMonthlyProfit - currentMonthlyProfit;

    const promotionROI =
      promotionCost > 0 ? (netPromotionLift / promotionCost) * 100 : 0;

    const promotionCostPerExtraSale =
      expectedExtraSales > 0 ? promotionCost / expectedExtraSales : 0;

    const extraSalesNeeded =
      adjustedProfitPerSale > 0
        ? Math.ceil((promotionCost + targetProfitLift) / adjustedProfitPerSale)
        : 0;

    const breakEvenExtraSales =
      adjustedProfitPerSale > 0
        ? Math.ceil(promotionCost / adjustedProfitPerSale)
        : 0;

    const revenueLift = expectedExtraSales * effectiveSalePrice;

    const profitAfterPromotionPerExtraSale =
      expectedExtraSales > 0 ? netPromotionLift / expectedExtraSales : 0;

    let status: Status = "Healthy";
    if (netPromotionLift < 0) status = "Losing";
    else if (promotionROI < 25) status = "Thin";
    else if (promotionROI < 100) status = "Watch";
    else if (promotionROI >= 200) status = "Strong";

    const scenarios = [0, 2, 4, 6, 8, 10, 15].map((extraSales) => {
      const gross = extraSales * adjustedProfitPerSale;
      const lift = gross - promotionCost;
      const roi = promotionCost > 0 ? (lift / promotionCost) * 100 : 0;

      let scenarioStatus: Status = "Healthy";
      if (lift < 0) scenarioStatus = "Losing";
      else if (roi < 25) scenarioStatus = "Thin";
      else if (roi < 100) scenarioStatus = "Watch";
      else if (roi >= 200) scenarioStatus = "Strong";

      return {
        extraSales,
        revenue: extraSales * effectiveSalePrice,
        lift,
        roi,
        status: scenarioStatus,
      };
    });

    return {
      effectiveSalePrice,
      fee,
      profitPerSale,
      refundLossPerSale,
      adjustedProfitPerSale,
      currentMonthlyProfit,
      promotedMonthlySales,
      promotedMonthlyProfit,
      extraGrossProfit,
      netPromotionLift,
      promotionROI,
      promotionCostPerExtraSale,
      extraSalesNeeded,
      breakEvenExtraSales,
      revenueLift,
      profitAfterPromotionPerExtraSale,
      status,
      scenarios,
    };
  }, [
    averageSalePrice,
    itemCost,
    packagingCost,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    offerDiscount,
    shippingDiscount,
    promotionCost,
    currentMonthlySales,
    expectedExtraSales,
    returnRate,
    targetProfitLift,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Closet Promotion Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether Poshmark closet promotion, sharing activity, listing
          activity, offer pressure, and extra sales can create enough profit lift
          to justify the promotion cost.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Promotion inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter average sale price, item costs, Poshmark fees, offer
              discount, shipping discount, promotion cost, current sales, and
              expected extra sales.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Average sale price" value={averageSalePrice} setValue={setAverageSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} setValue={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <MoneyInput label="Offer discount" value={offerDiscount} setValue={setOfferDiscount} />
              <MoneyInput label="Shipping discount" value={shippingDiscount} setValue={setShippingDiscount} />
              <MoneyInput label="Promotion cost" value={promotionCost} setValue={setPromotionCost} />
              <NumberInput label="Current monthly sales" value={currentMonthlySales} setValue={setCurrentMonthlySales} />
              <NumberInput label="Expected extra sales" value={expectedExtraSales} setValue={setExpectedExtraSales} />
              <PercentInput label="Return rate" value={returnRate} setValue={setReturnRate} />
              <MoneyInput label="Target profit lift" value={targetProfitLift} setValue={setTargetProfitLift} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark promotion results,
              buyer activity, sharing impact, offer behavior, fees, returns, and
              sale volume may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark closet promotion profitability.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="green"
                title="Net promotion lift"
                value={money(results.netPromotionLift)}
                text="Extra profit after subtracting promotion cost."
              />
              <ResultCard
                tone="green"
                title="Promotion ROI"
                value={pct(results.promotionROI)}
                text="Net promotion lift divided by promotion cost."
              />
              <ResultCard
                tone="blue"
                title="Profit per sale"
                value={money(results.adjustedProfitPerSale)}
                text="Profit after offer discount, shipping discount, fees, costs, and return risk."
              />
              <ResultCard
                tone="blue"
                title="Revenue lift"
                value={money(results.revenueLift)}
                text="Expected extra sales multiplied by effective sale price."
              />
              <ResultCard
                tone="yellow"
                title="Promotion cost per extra sale"
                value={money(results.promotionCostPerExtraSale)}
                text="Promotion cost divided by expected extra sales."
              />
              <ResultCard
                tone="yellow"
                title="Break-even extra sales"
                value={String(results.breakEvenExtraSales)}
                text="Extra sales needed to cover promotion cost."
              />
              <ResultCard
                tone="green"
                title="Promoted monthly profit"
                value={money(results.promotedMonthlyProfit)}
                text="Monthly profit after promotion cost and expected extra sales."
              />
              <ResultCard
                tone="blue"
                title="Current monthly profit"
                value={money(results.currentMonthlyProfit)}
                text="Estimated profit before promotion."
              />
              <ResultCard
                tone="yellow"
                title="Extra sales needed for target"
                value={String(results.extraSalesNeeded)}
                text="Extra sales needed to reach your target profit lift."
              />
              <ResultCard
                tone="green"
                title="Profit per extra sale after promotion"
                value={money(results.profitAfterPromotionPerExtraSale)}
                text="Net promotion lift divided by expected extra sales."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The promotion is expected to create{" "}
                <strong>{expectedExtraSales}</strong> extra sales and{" "}
                <strong>{money(results.revenueLift)}</strong> in extra revenue.
                After promotion cost, estimated net profit lift is{" "}
                <strong>{money(results.netPromotionLift)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "This promotion appears to produce a strong return."
                  : results.status === "Healthy"
                    ? "This promotion appears profitable under the entered assumptions."
                    : results.status === "Watch"
                      ? "This promotion may work, but the return is not especially strong."
                      : results.status === "Thin"
                        ? "This promotion has thin return after costs."
                        : "This promotion is estimated to lose money under these assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Extra sales scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Extra sales</th>
                      <th className="px-3 py-2">Revenue</th>
                      <th className="px-3 py-2">Profit lift</th>
                      <th className="px-3 py-2">ROI</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.extraSales} className="border-t">
                        <td className="px-3 py-2">{row.extraSales}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{money(row.lift)}</td>
                        <td className="px-3 py-2">{pct(row.roi)}</td>
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
            How to use this Poshmark Closet Promotion Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter profit"
              text="Add average sale price, item cost, fees, offer discount, and shipping discount."
            />
            <StepCard
              title="Add promotion"
              text="Enter the promotion cost or estimated time value for promotion activity."
            />
            <StepCard
              title="Estimate sales lift"
              text="Add current sales and expected extra sales from the promotion."
            />
            <StepCard
              title="Review ROI"
              text="Check whether the extra sales produce enough profit lift."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark promotion breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the closet promotion estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Effective sale price" value={money(results.effectiveSalePrice)} />
              <Breakdown label="Estimated Poshmark fee" value={money(results.fee)} />
              <Breakdown label="Profit per sale" value={money(results.adjustedProfitPerSale)} />
              <Breakdown label="Promotion cost" value={money(promotionCost)} />
              <Breakdown label="Current monthly profit" value={money(results.currentMonthlyProfit)} />
              <Breakdown label="Promoted monthly profit" value={money(results.promotedMonthlyProfit)} />
              <Breakdown label="Net promotion lift" value={money(results.netPromotionLift)} />
              <Breakdown label="Promotion ROI" value={pct(results.promotionROI)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark promotion mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Promoting the closet before checking profit after offers and fees.",
                "Counting extra revenue as success without checking profit lift.",
                "Using broad promotions on weak listings with poor photos or stale prices.",
                "Ignoring return risk and shipping discount pressure.",
                "Spending more on promotion than extra sales can realistically recover.",
                "Promoting without tracking before-and-after sales results.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark promotion ROI
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve listings first"
              text="Update photos, titles, descriptions, measurements, and prices before promoting."
            />
            <StepCard
              title="Target proven items"
              text="Promote listings with known demand, likes, or strong sell-through."
            />
            <StepCard
              title="Limit weak discounts"
              text="Avoid stacking promotion cost with deep offers and shipping discounts."
            />
            <StepCard
              title="Track lift"
              text="Compare sales and profit before and after the promotion period."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
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

function NumberInput({
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
      <input
        className="mt-1 w-full rounded border px-3 py-2 outline-none"
        type="number"
        value={value}
        onChange={(event) => setValue(clamp(Number(event.target.value)))}
      />
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
          Included in the closet promotion estimate.
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