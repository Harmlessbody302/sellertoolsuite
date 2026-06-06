"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceListingRoiCalculatorPage() {
  const [salePrice, setSalePrice] = useState(80);
  const [itemCost, setItemCost] = useState(35);
  const [packagingCost, setPackagingCost] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [shippingCost, setShippingCost] = useState(0);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [monthlyListingViews, setMonthlyListingViews] = useState(600);
  const [listingConversionRate, setListingConversionRate] = useState(2.5);
  const [negotiationDiscount, setNegotiationDiscount] = useState(8);
  const [promotionCost, setPromotionCost] = useState(10);
  const [photoListingCost, setPhotoListingCost] = useState(5);
  const [storageCost, setStorageCost] = useState(2);
  const [refundRate, setRefundRate] = useState(3);
  const [targetRoi, setTargetRoi] = useState(150);

  const results = useMemo(() => {
    const effectiveSalePrice = Math.max(0, salePrice - negotiationDiscount);
    const platformFee = effectiveSalePrice * (platformFeeRate / 100);

    const orderCost =
      itemCost + packagingCost + deliveryCost + shippingCost + platformFee;

    const grossProfit = effectiveSalePrice - orderCost;
    const estimatedOrders = Math.round(
      monthlyListingViews * (listingConversionRate / 100)
    );
    const monthlyRevenue = estimatedOrders * effectiveSalePrice;

    const listingInvestment = promotionCost + photoListingCost + storageCost;
    const refundLoss = estimatedOrders * (refundRate / 100) * orderCost;

    const netListingProfit =
      estimatedOrders * grossProfit - listingInvestment - refundLoss;

    const listingRoi =
      listingInvestment > 0
        ? (netListingProfit / listingInvestment) * 100
        : netListingProfit > 0
          ? 999
          : 0;

    const profitPerView =
      monthlyListingViews > 0 ? netListingProfit / monthlyListingViews : 0;

    const revenuePerView =
      monthlyListingViews > 0 ? monthlyRevenue / monthlyListingViews : 0;

    const promotionCostPerOrder =
      estimatedOrders > 0 ? promotionCost / estimatedOrders : 0;

    const breakEvenConversionRate =
      monthlyListingViews > 0 && grossProfit > 0
        ? ((listingInvestment + refundLoss) /
            (monthlyListingViews * grossProfit)) *
          100
        : 0;

    const conversionNeededForTargetRoi =
      monthlyListingViews > 0 && grossProfit > 0
        ? ((listingInvestment * (1 + targetRoi / 100) + refundLoss) /
            (monthlyListingViews * grossProfit)) *
          100
        : 0;

    let status = "Healthy";
    if (netListingProfit < 0) status = "Losing";
    else if (listingRoi < targetRoi * 0.5) status = "Thin";
    else if (listingRoi < targetRoi) status = "Watch";
    else if (listingRoi >= targetRoi * 2) status = "Strong";

    return {
      effectiveSalePrice,
      platformFee,
      orderCost,
      grossProfit,
      estimatedOrders,
      monthlyRevenue,
      listingInvestment,
      refundLoss,
      netListingProfit,
      listingRoi,
      profitPerView,
      revenuePerView,
      promotionCostPerOrder,
      breakEvenConversionRate,
      conversionNeededForTargetRoi,
      status,
    };
  }, [
    salePrice,
    itemCost,
    packagingCost,
    deliveryCost,
    shippingCost,
    platformFeeRate,
    monthlyListingViews,
    listingConversionRate,
    negotiationDiscount,
    promotionCost,
    photoListingCost,
    storageCost,
    refundRate,
    targetRoi,
  ]);

  const statusTone: Tone =
    results.status === "Healthy" || results.status === "Strong"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const scenarioRows = [1, 1.5, 2, 2.5, 3, 4, 5].map((conversion) => {
    const orders = Math.round(monthlyListingViews * (conversion / 100));
    const refundLoss = orders * (refundRate / 100) * results.orderCost;
    const profit =
      orders * results.grossProfit - results.listingInvestment - refundLoss;
    const roi =
      results.listingInvestment > 0
        ? (profit / results.listingInvestment) * 100
        : profit > 0
          ? 999
          : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (roi < targetRoi * 0.5) status = "Thin";
    else if (roi < targetRoi) status = "Watch";
    else if (roi >= targetRoi * 2) status = "Strong";

    return {
      conversion,
      orders,
      revenue: orders * results.effectiveSalePrice,
      profit,
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
          Facebook Marketplace Listing ROI Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether a Facebook Marketplace listing is worth improving,
          renewing, promoting, discounting, bundling, relisting, or removing
          based on views, conversion rate, item cost, delivery cost, shipping
          cost, negotiation discounts, listing investment, and refund risk.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Listing ROI inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item economics, listing traffic, conversion rate, promotion
              spend, listing work, storage cost, and refund risk.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Sale price" value={salePrice} onChange={setSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} onChange={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} onChange={setPackagingCost} />
              <MoneyInput label="Delivery cost" value={deliveryCost} onChange={setDeliveryCost} />
              <MoneyInput label="Shipping cost" value={shippingCost} onChange={setShippingCost} />
              <NumberInput label="Platform fee rate" value={platformFeeRate} onChange={setPlatformFeeRate} suffix="%" />
              <NumberInput label="Monthly listing views" value={monthlyListingViews} onChange={setMonthlyListingViews} />
              <NumberInput label="Listing conversion rate" value={listingConversionRate} onChange={setListingConversionRate} suffix="%" />
              <MoneyInput label="Negotiation discount" value={negotiationDiscount} onChange={setNegotiationDiscount} />
              <MoneyInput label="Promotion cost" value={promotionCost} onChange={setPromotionCost} />
              <MoneyInput label="Photo/listing cost" value={photoListingCost} onChange={setPhotoListingCost} />
              <MoneyInput label="Storage cost" value={storageCost} onChange={setStorageCost} />
              <NumberInput label="Refund rate" value={refundRate} onChange={setRefundRate} suffix="%" />
              <NumberInput label="Target ROI" value={targetRoi} onChange={setTargetRoi} suffix="%" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace
              visibility, buyer demand, local competition, negotiation behavior,
              pickup friction, delivery cost, no-shows, refunds, and
              sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace listing ROI.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Listing ROI"
                value={`${results.listingRoi.toFixed(1)}%`}
                tone={results.listingRoi >= targetRoi ? "green" : "yellow"}
                text="Net listing profit divided by listing investment."
              />
              <ResultCard
                label="Net listing profit"
                value={formatMoney(results.netListingProfit)}
                tone={results.netListingProfit > 0 ? "green" : "red"}
                text="Profit after refund risk, promotion cost, listing work, and storage."
              />
              <ResultCard
                label="Estimated orders"
                value={String(results.estimatedOrders)}
                tone="blue"
                text="Listing views multiplied by conversion rate."
              />
              <ResultCard
                label="Monthly revenue"
                value={formatMoney(results.monthlyRevenue)}
                tone="green"
                text="Estimated orders multiplied by effective sale price."
              />
              <ResultCard
                label="Effective sale price"
                value={formatMoney(results.effectiveSalePrice)}
                tone="blue"
                text="Sale price after expected negotiation discount."
              />
              <ResultCard
                label="Gross profit"
                value={formatMoney(results.grossProfit)}
                tone="blue"
                text="Profit before listing investment and refund impact."
              />
              <ResultCard
                label="Listing investment"
                value={formatMoney(results.listingInvestment)}
                tone="yellow"
                text="Promotion, photo/listing work, and storage cost combined."
              />
              <ResultCard
                label="Refund loss"
                value={formatMoney(results.refundLoss)}
                tone="yellow"
                text="Estimated profit lost from refunded or problem orders."
              />
              <ResultCard
                label="Profit per view"
                value={formatMoney(results.profitPerView)}
                tone={results.profitPerView > 0 ? "green" : "yellow"}
                text="Net listing profit divided by listing views."
              />
              <ResultCard
                label="Revenue per view"
                value={formatMoney(results.revenuePerView)}
                tone="blue"
                text="Monthly revenue divided by listing views."
              />
              <ResultCard
                label="Promotion cost per order"
                value={formatMoney(results.promotionCostPerOrder)}
                tone="yellow"
                text="Promotion cost divided by estimated orders."
              />
              <ResultCard
                label="Break-even conversion rate"
                value={`${results.breakEvenConversionRate.toFixed(1)}%`}
                tone="yellow"
                text="Conversion rate needed to cover listing investment."
              />
              <ResultCard
                label="Conversion needed for target ROI"
                value={`${results.conversionNeededForTargetRoi.toFixed(1)}%`}
                tone="yellow"
                text="Estimated conversion rate needed to reach target ROI."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                This listing is estimated to generate{" "}
                <strong>{results.estimatedOrders}</strong> orders and{" "}
                <strong>{formatMoney(results.monthlyRevenue)}</strong> in
                monthly revenue. After refund risk and listing investment,
                estimated net listing profit is{" "}
                <strong>{formatMoney(results.netListingProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "This listing appears to produce a strong return compared with its investment."
                  : results.status === "Healthy"
                    ? "This listing appears to produce a healthy return under the entered assumptions."
                    : results.status === "Watch"
                      ? "This listing is profitable, but below the target ROI."
                      : results.status === "Thin"
                        ? "This listing has weak ROI and may need better photos, pricing, or buyer targeting."
                        : "This listing appears to lose money under the entered assumptions."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Conversion scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Conversion</th>
                      <th className="border px-3 py-2">Orders</th>
                      <th className="border px-3 py-2">Revenue</th>
                      <th className="border px-3 py-2">Profit</th>
                      <th className="border px-3 py-2">ROI</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.conversion} className="border">
                        <td className="border px-3 py-2">
                          {row.conversion.toFixed(1)}%
                        </td>
                        <td className="border px-3 py-2">{row.orders}</td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.revenue)}
                        </td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.profit)}
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
            How to use this Facebook Marketplace Listing ROI Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter product costs"
              text="Add sale price, item cost, packaging, delivery, shipping, and platform fee."
            />
            <InfoCard
              title="Add listing traffic"
              text="Enter monthly listing views and expected conversion rate."
            />
            <InfoCard
              title="Include investment"
              text="Add promotion cost, photo/listing work, storage cost, and refund risk."
            />
            <InfoCard
              title="Review ROI"
              text="Check whether the listing is worth improving, promoting, relisting, or retiring."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace listing ROI breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind this listing ROI estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value={formatMoney(salePrice)} />
              <Breakdown label="Effective sale price" value={formatMoney(results.effectiveSalePrice)} />
              <Breakdown label="Order cost" value={formatMoney(results.orderCost)} />
              <Breakdown label="Gross profit" value={formatMoney(results.grossProfit)} />
              <Breakdown label="Monthly listing views" value={String(monthlyListingViews)} />
              <Breakdown label="Estimated orders" value={String(results.estimatedOrders)} />
              <Breakdown label="Listing investment" value={formatMoney(results.listingInvestment)} />
              <Breakdown label="Net listing profit" value={formatMoney(results.netListingProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace listing ROI mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Judging a listing by views or messages instead of actual profit.",
                "Promoting listings before checking profit after delivery, shipping, and offers.",
                "Ignoring time spent cleaning, photographing, measuring, writing, messaging, and relisting.",
                "Keeping stale listings active without improving price, photos, title, or description.",
                "Restocking similar items before confirming the listing produces enough return.",
                "Using broad store-wide averages instead of product-level listing ROI.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace listing ROI
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Improve conversion"
              text="Upgrade photos, title, description, measurements, price clarity, and pickup details."
            />
            <InfoCard
              title="Lower promotion cost"
              text="Use promotion carefully and stop spending when it does not improve profit."
            />
            <InfoCard
              title="Raise order value"
              text="Bundle related items or improve presentation to support stronger prices."
            />
            <InfoCard
              title="Cut weak listings"
              text="Relist, bundle, donate, or retire items that cannot produce enough return."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/facebook-marketplace/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
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

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}