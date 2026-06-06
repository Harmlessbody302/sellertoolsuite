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

export default function PoshmarkListingROICalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [itemCost, setItemCost] = useState(14);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [monthlyListingViews, setMonthlyListingViews] = useState(800);
  const [listingConversionRate, setListingConversionRate] = useState(3);
  const [offerDiscount, setOfferDiscount] = useState(5);
  const [shippingDiscount, setShippingDiscount] = useState(2.02);
  const [promotionCost, setPromotionCost] = useState(15);
  const [photoListingCost, setPhotoListingCost] = useState(5);
  const [storageCost, setStorageCost] = useState(2);
  const [returnRate, setReturnRate] = useState(4);
  const [targetROI, setTargetROI] = useState(150);

  const results = useMemo(() => {
    const effectiveSalePrice = Math.max(0, salePrice - offerDiscount);

    const fee =
      effectiveSalePrice < flatFeeThreshold
        ? Math.min(flatFee, effectiveSalePrice)
        : effectiveSalePrice * (sellerFeeRate / 100);

    const orderCost = itemCost + packagingCost + fee + shippingDiscount;
    const grossProfit = effectiveSalePrice - orderCost;

    const estimatedOrders = Math.round(
      monthlyListingViews * (listingConversionRate / 100)
    );

    const monthlyRevenue = estimatedOrders * effectiveSalePrice;
    const refundLoss = estimatedOrders * (returnRate / 100) * orderCost;
    const listingInvestment = promotionCost + photoListingCost + storageCost;
    const netListingProfit =
      estimatedOrders * grossProfit - refundLoss - listingInvestment;

    const listingROI =
      listingInvestment > 0 ? (netListingProfit / listingInvestment) * 100 : 0;

    const profitPerView =
      monthlyListingViews > 0 ? netListingProfit / monthlyListingViews : 0;

    const revenuePerView =
      monthlyListingViews > 0 ? monthlyRevenue / monthlyListingViews : 0;

    const promotionCostPerOrder =
      estimatedOrders > 0 ? promotionCost / estimatedOrders : 0;

    const breakEvenConversionRate =
      monthlyListingViews > 0 && grossProfit > 0
        ? ((listingInvestment + refundLoss) / grossProfit / monthlyListingViews) *
          100
        : 0;

    const conversionNeededForTargetROI =
      monthlyListingViews > 0 && grossProfit > 0
        ? ((listingInvestment * (1 + targetROI / 100) + refundLoss) /
            grossProfit /
            monthlyListingViews) *
          100
        : 0;

    let status: Status = "Healthy";
    if (netListingProfit < 0) status = "Losing";
    else if (listingROI < 50) status = "Thin";
    else if (listingROI < targetROI) status = "Watch";
    else if (listingROI >= targetROI * 1.5) status = "Strong";

    const scenarios = [1, 1.5, 2, 3, 4, 5, 6].map((conversion) => {
      const orders = Math.round(monthlyListingViews * (conversion / 100));
      const revenue = orders * effectiveSalePrice;
      const returns = orders * (returnRate / 100) * orderCost;
      const profit = orders * grossProfit - returns - listingInvestment;
      const roi =
        listingInvestment > 0 ? (profit / listingInvestment) * 100 : 0;

      let scenarioStatus: Status = "Healthy";
      if (profit < 0) scenarioStatus = "Losing";
      else if (roi < 50) scenarioStatus = "Thin";
      else if (roi < targetROI) scenarioStatus = "Watch";
      else if (roi >= targetROI * 1.5) scenarioStatus = "Strong";

      return {
        conversion,
        orders,
        revenue,
        profit,
        roi,
        status: scenarioStatus,
      };
    });

    return {
      effectiveSalePrice,
      fee,
      orderCost,
      grossProfit,
      estimatedOrders,
      monthlyRevenue,
      refundLoss,
      listingInvestment,
      netListingProfit,
      listingROI,
      profitPerView,
      revenuePerView,
      promotionCostPerOrder,
      breakEvenConversionRate,
      conversionNeededForTargetROI,
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
    monthlyListingViews,
    listingConversionRate,
    offerDiscount,
    shippingDiscount,
    promotionCost,
    photoListingCost,
    storageCost,
    returnRate,
    targetROI,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Listing ROI Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether a Poshmark listing is worth improving, promoting,
          discounting, relisting, bundling, or restocking based on views,
          conversion rate, sale price, offers, fees, shipping discounts, listing
          investment, and return risk.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Listing ROI inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item economics, listing traffic, conversion rate, offers,
              promotion spend, listing work, storage cost, and return risk.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Sale price" value={salePrice} setValue={setSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} setValue={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <NumberInput label="Monthly listing views" value={monthlyListingViews} setValue={setMonthlyListingViews} />
              <PercentInput label="Listing conversion rate" value={listingConversionRate} setValue={setListingConversionRate} />
              <MoneyInput label="Offer discount" value={offerDiscount} setValue={setOfferDiscount} />
              <MoneyInput label="Shipping discount" value={shippingDiscount} setValue={setShippingDiscount} />
              <MoneyInput label="Promotion cost" value={promotionCost} setValue={setPromotionCost} />
              <MoneyInput label="Photo/listing cost" value={photoListingCost} setValue={setPhotoListingCost} />
              <MoneyInput label="Storage cost" value={storageCost} setValue={setStorageCost} />
              <PercentInput label="Return rate" value={returnRate} setValue={setReturnRate} />
              <PercentInput label="Target ROI" value={targetROI} setValue={setTargetROI} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark visibility,
              buyer demand, offers, returns, promoted activity, sharing effort,
              and sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark listing ROI.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="green"
                title="Listing ROI"
                value={pct(results.listingROI)}
                text="Net listing profit divided by listing investment."
              />
              <ResultCard
                tone="green"
                title="Net listing profit"
                value={money(results.netListingProfit)}
                text="Profit after return risk, promotion cost, listing work, and storage."
              />
              <ResultCard
                tone="blue"
                title="Estimated orders"
                value={String(results.estimatedOrders)}
                text="Listing views multiplied by conversion rate."
              />
              <ResultCard
                tone="green"
                title="Monthly revenue"
                value={money(results.monthlyRevenue)}
                text="Estimated orders multiplied by effective sale price."
              />
              <ResultCard
                tone="yellow"
                title="Listing investment"
                value={money(results.listingInvestment)}
                text="Promotion, photo/listing work, and storage cost combined."
              />
              <ResultCard
                tone="blue"
                title="Gross profit"
                value={money(results.grossProfit)}
                text="Profit before listing investment and return impact."
              />
              <ResultCard
                tone="yellow"
                title="Refund loss"
                value={money(results.refundLoss)}
                text="Estimated profit loss from returned orders."
              />
              <ResultCard
                tone="green"
                title="Profit per view"
                value={money(results.profitPerView)}
                text="Net listing profit divided by listing views."
              />
              <ResultCard
                tone="blue"
                title="Revenue per view"
                value={money(results.revenuePerView)}
                text="Monthly revenue divided by listing views."
              />
              <ResultCard
                tone="yellow"
                title="Promotion cost per order"
                value={money(results.promotionCostPerOrder)}
                text="Promotion cost divided by estimated orders."
              />
              <ResultCard
                tone="yellow"
                title="Break-even conversion rate"
                value={pct(results.breakEvenConversionRate)}
                text="Conversion rate needed to cover listing investment."
              />
              <ResultCard
                tone="yellow"
                title="Conversion needed for target ROI"
                value={pct(results.conversionNeededForTargetROI)}
                text="Estimated conversion rate needed to reach target ROI."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                This listing is estimated to generate{" "}
                <strong>{results.estimatedOrders}</strong> orders and{" "}
                <strong>{money(results.monthlyRevenue)}</strong> in monthly
                revenue. After return risk and listing investment, estimated net
                listing profit is{" "}
                <strong>{money(results.netListingProfit)}</strong> and estimated
                ROI is <strong>{pct(results.listingROI)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "This listing appears to produce a strong return compared with its investment."
                  : results.status === "Healthy"
                    ? "This listing appears profitable under the entered assumptions."
                    : results.status === "Watch"
                      ? "This listing may be profitable, but ROI is below the target."
                      : results.status === "Thin"
                        ? "This listing has thin ROI after promotion, returns, and listing work."
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
                    {results.scenarios.map((row) => (
                      <tr key={row.conversion} className="border-t">
                        <td className="px-3 py-2">{pct(row.conversion)}</td>
                        <td className="px-3 py-2">{row.orders}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
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
            How to use this Poshmark Listing ROI Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter product costs"
              text="Add sale price, item cost, packaging, fees, shipping discount, and offer assumptions."
            />
            <StepCard
              title="Add listing traffic"
              text="Enter monthly listing views and expected conversion rate."
            />
            <StepCard
              title="Include investment"
              text="Add promotion cost, photo/listing work, storage cost, and return risk."
            />
            <StepCard
              title="Review ROI"
              text="Check whether the listing is worth improving, promoting, relisting, or retiring."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark listing ROI breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind this listing ROI estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value={money(salePrice)} />
              <Breakdown label="Effective sale price" value={money(results.effectiveSalePrice)} />
              <Breakdown label="Order cost" value={money(results.orderCost)} />
              <Breakdown label="Gross profit" value={money(results.grossProfit)} />
              <Breakdown label="Monthly listing views" value={String(monthlyListingViews)} />
              <Breakdown label="Estimated orders" value={String(results.estimatedOrders)} />
              <Breakdown label="Listing investment" value={money(results.listingInvestment)} />
              <Breakdown label="Net listing profit" value={money(results.netListingProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark listing ROI mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Judging a listing by likes or views instead of actual profit.",
                "Promoting listings before checking profit after shipping discounts and offers.",
                "Ignoring time spent cleaning, photographing, measuring, and listing.",
                "Keeping stale listings active without improving price, title, photos, or description.",
                "Restocking similar items before confirming the listing produces enough return.",
                "Using closet-wide averages instead of product-level listing ROI.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark listing ROI
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve conversion"
              text="Upgrade photos, titles, descriptions, measurements, condition notes, and price clarity."
            />
            <StepCard
              title="Lower promotion cost"
              text="Use offers and promotions carefully and stop discounts that do not improve profit."
            />
            <StepCard
              title="Raise order value"
              text="Bundle related items or improve presentation to support stronger prices."
            />
            <StepCard
              title="Cut weak listings"
              text="Relist, bundle, donate, or retire items that cannot produce enough return."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/poshmark/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
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
          Included in the listing ROI estimate.
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