"use client";

import { useMemo, useState } from "react";

type Status = "Strong" | "Healthy" | "Watch" | "Losing";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function percent(value: number) {
  return `${value.toFixed(1)}%`;
}

function numberFormat(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ShopifyListingRoiCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [productCost, setProductCost] = useState(14);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [paymentPercent, setPaymentPercent] = useState(2.9);
  const [paymentFixed, setPaymentFixed] = useState(0.3);

  const [monthlySessions, setMonthlySessions] = useState(1200);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(250);
  const [contentCost, setContentCost] = useState(75);
  const [photoCost, setPhotoCost] = useState(50);
  const [appCost, setAppCost] = useState(20);
  const [refundRate, setRefundRate] = useState(4);
  const [targetRoi, setTargetRoi] = useState(200);

  const results = useMemo(() => {
    const safeSalePrice = Math.max(0, salePrice);
    const safeProductCost = Math.max(0, productCost);
    const safeShippingCost = Math.max(0, shippingCost);
    const safePackagingCost = Math.max(0, packagingCost);
    const safePaymentPercent = clamp(paymentPercent, 0, 100);
    const safePaymentFixed = Math.max(0, paymentFixed);

    const safeMonthlySessions = Math.max(0, monthlySessions);
    const safeConversionRate = clamp(conversionRate, 0, 100);
    const safeMonthlyAdSpend = Math.max(0, monthlyAdSpend);
    const safeContentCost = Math.max(0, contentCost);
    const safePhotoCost = Math.max(0, photoCost);
    const safeAppCost = Math.max(0, appCost);
    const safeRefundRate = clamp(refundRate, 0, 100);
    const safeTargetRoi = Math.max(0, targetRoi);

    const paymentFee =
      safeSalePrice * (safePaymentPercent / 100) + safePaymentFixed;

    const orderCost =
      safeProductCost + safeShippingCost + safePackagingCost + paymentFee;

    const profitBeforeMarketing = safeSalePrice - orderCost;

    const estimatedOrders =
      safeMonthlySessions * (safeConversionRate / 100);

    const monthlyRevenue = estimatedOrders * safeSalePrice;

    const estimatedRefunds = estimatedOrders * (safeRefundRate / 100);

    const refundLoss = estimatedRefunds * profitBeforeMarketing;

    const listingInvestment =
      safeMonthlyAdSpend + safeContentCost + safePhotoCost + safeAppCost;

    const grossProfit = estimatedOrders * profitBeforeMarketing;

    const netProfit = grossProfit - refundLoss - listingInvestment;

    const roi =
      listingInvestment > 0 ? (netProfit / listingInvestment) * 100 : 0;

    const profitPerVisitor =
      safeMonthlySessions > 0 ? netProfit / safeMonthlySessions : 0;

    const revenuePerVisitor =
      safeMonthlySessions > 0 ? monthlyRevenue / safeMonthlySessions : 0;

    const adCostPerOrder =
      estimatedOrders > 0 ? safeMonthlyAdSpend / estimatedOrders : 0;

    const totalCostPerOrder =
      estimatedOrders > 0
        ? (orderCost * estimatedOrders + listingInvestment + refundLoss) /
          estimatedOrders
        : 0;

    const profitPerOrderAfterCosts =
      estimatedOrders > 0 ? netProfit / estimatedOrders : 0;

    const breakEvenOrders =
      profitBeforeMarketing > 0
        ? listingInvestment / profitBeforeMarketing
        : 0;

    const breakEvenConversionRate =
      safeMonthlySessions > 0
        ? (breakEvenOrders / safeMonthlySessions) * 100
        : 0;

    const targetProfit = listingInvestment * (safeTargetRoi / 100);

    const ordersNeededForTargetRoi =
      profitBeforeMarketing > 0
        ? (listingInvestment + targetProfit) / profitBeforeMarketing
        : 0;

    const conversionNeededForTargetRoi =
      safeMonthlySessions > 0
        ? (ordersNeededForTargetRoi / safeMonthlySessions) * 100
        : 0;

    const status: Status =
      netProfit <= 0
        ? "Losing"
        : roi >= 200
          ? "Strong"
          : roi >= 75
            ? "Healthy"
            : "Watch";

    const statusText =
      status === "Strong"
        ? "This listing appears to produce strong ROI under the entered assumptions."
        : status === "Healthy"
          ? "This listing appears profitable, but ROI should still be monitored."
          : status === "Watch"
            ? "This listing may be profitable but has a thin return compared with its investment."
            : "This listing is estimated to lose money under the entered assumptions.";

    const scenarios = [1, 1.5, 2, 2.5, 3, 4, 5].map((rate) => {
      const scenarioOrders = safeMonthlySessions * (rate / 100);
      const scenarioRevenue = scenarioOrders * safeSalePrice;
      const scenarioRefunds = scenarioOrders * (safeRefundRate / 100);
      const scenarioRefundLoss = scenarioRefunds * profitBeforeMarketing;
      const scenarioProfit =
        scenarioOrders * profitBeforeMarketing -
        scenarioRefundLoss -
        listingInvestment;
      const scenarioRoi =
        listingInvestment > 0
          ? (scenarioProfit / listingInvestment) * 100
          : 0;

      const scenarioStatus: Status =
        scenarioProfit <= 0
          ? "Losing"
          : scenarioRoi >= 200
            ? "Strong"
            : scenarioRoi >= 75
              ? "Healthy"
              : "Watch";

      return {
        rate,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        roi: scenarioRoi,
        status: scenarioStatus,
      };
    });

    return {
      paymentFee,
      orderCost,
      profitBeforeMarketing,
      estimatedOrders,
      monthlyRevenue,
      estimatedRefunds,
      refundLoss,
      listingInvestment,
      grossProfit,
      netProfit,
      roi,
      profitPerVisitor,
      revenuePerVisitor,
      adCostPerOrder,
      totalCostPerOrder,
      profitPerOrderAfterCosts,
      breakEvenOrders,
      breakEvenConversionRate,
      ordersNeededForTargetRoi,
      conversionNeededForTargetRoi,
      status,
      statusText,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    shippingCost,
    packagingCost,
    paymentPercent,
    paymentFixed,
    monthlySessions,
    conversionRate,
    monthlyAdSpend,
    contentCost,
    photoCost,
    appCost,
    refundRate,
    targetRoi,
  ]);

  const statusClass =
    results.status === "Strong"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : results.status === "Healthy"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : results.status === "Watch"
          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
          : "bg-red-50 text-red-700 border-red-200";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Listing ROI Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether a Shopify product page is worth keeping, improving,
          advertising, restocking, or retiring based on traffic, conversion rate,
          product costs, content costs, app costs, and refund impact.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Listing ROI inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your product economics, listing traffic, conversion rate,
              marketing spend, and setup costs to estimate product page ROI.
            </p>

            <div className="mt-5 space-y-4">
              <Input label="Sale price" value={salePrice} prefix="$" onChange={setSalePrice} />
              <Input label="Product cost" value={productCost} prefix="$" onChange={setProductCost} />
              <Input label="Shipping cost" value={shippingCost} prefix="$" onChange={setShippingCost} />
              <Input label="Packaging cost" value={packagingCost} prefix="$" onChange={setPackagingCost} />
              <Input label="Payment fee rate" value={paymentPercent} suffix="%" onChange={setPaymentPercent} />
              <Input label="Payment fixed fee" value={paymentFixed} prefix="$" onChange={setPaymentFixed} />
              <Input label="Monthly listing sessions" value={monthlySessions} onChange={setMonthlySessions} />
              <Input label="Listing conversion rate" value={conversionRate} suffix="%" onChange={setConversionRate} />
              <Input label="Monthly ad spend" value={monthlyAdSpend} prefix="$" onChange={setMonthlyAdSpend} />
              <Input label="Content cost" value={contentCost} prefix="$" onChange={setContentCost} />
              <Input label="Photo or creative cost" value={photoCost} prefix="$" onChange={setPhotoCost} />
              <Input label="App or tool cost" value={appCost} prefix="$" onChange={setAppCost} />
              <Input label="Refund rate" value={refundRate} suffix="%" onChange={setRefundRate} />
              <Input label="Target ROI" value={targetRoi} suffix="%" onChange={setTargetRoi} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Shopify listing ROI can vary
              by traffic source, checkout behavior, product margin, refund rate,
              creative quality, ad performance, seasonality, and customer intent.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify listing ROI.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Listing ROI"
                value={percent(results.roi)}
                note="Net profit divided by listing investment."
                tone={results.netProfit >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Net listing profit"
                value={money(results.netProfit)}
                note="Profit after refunds, ads, content, creative, and app costs."
                tone={results.netProfit >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Estimated orders"
                value={numberFormat(results.estimatedOrders)}
                note="Listing sessions multiplied by conversion rate."
                tone="blue"
              />
              <ResultCard
                label="Monthly revenue"
                value={money(results.monthlyRevenue)}
                note="Estimated orders multiplied by sale price."
                tone="green"
              />
              <ResultCard
                label="Listing investment"
                value={money(results.listingInvestment)}
                note="Ads, content, creative, and app costs combined."
                tone="yellow"
              />
              <ResultCard
                label="Gross profit"
                value={money(results.grossProfit)}
                note="Profit before listing investment and refund impact."
                tone="blue"
              />
              <ResultCard
                label="Refund loss"
                value={money(results.refundLoss)}
                note="Estimated profit lost to refunded orders."
                tone="yellow"
              />
              <ResultCard
                label="Profit per visitor"
                value={money(results.profitPerVisitor)}
                note="Net listing profit divided by sessions."
                tone={results.profitPerVisitor >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Revenue per visitor"
                value={money(results.revenuePerVisitor)}
                note="Revenue divided by listing sessions."
                tone="blue"
              />
              <ResultCard
                label="Ad cost per order"
                value={money(results.adCostPerOrder)}
                note="Monthly ad spend divided by estimated orders."
                tone="yellow"
              />
              <ResultCard
                label="Break-even conversion rate"
                value={percent(results.breakEvenConversionRate)}
                note="Conversion rate needed to cover listing investment."
                tone="yellow"
              />
              <ResultCard
                label="Conversion needed for target ROI"
                value={percent(results.conversionNeededForTargetRoi)}
                note="Estimated conversion rate needed to reach your target ROI."
                tone="yellow"
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                This listing is estimated to generate{" "}
                <strong>{numberFormat(results.estimatedOrders)}</strong> orders and{" "}
                <strong>{money(results.monthlyRevenue)}</strong> in monthly revenue.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                After refunds and listing investment, estimated net profit is{" "}
                <strong>{money(results.netProfit)}</strong>, giving an estimated ROI of{" "}
                <strong>{percent(results.roi)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Conversion scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Conversion</th>
                      <th className="px-3 py-2">Orders</th>
                      <th className="px-3 py-2">Revenue</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario) => (
                      <tr key={scenario.rate} className="border-t bg-white">
                        <td className="px-3 py-2 font-medium">{percent(scenario.rate)}</td>
                        <td className="px-3 py-2">{numberFormat(scenario.orders)}</td>
                        <td className="px-3 py-2">{money(scenario.revenue)}</td>
                        <td className="px-3 py-2">{money(scenario.profit)}</td>
                        <td className="px-3 py-2">
                          <StatusPill status={scenario.status} />
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
            How to use this Shopify Listing ROI Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter product costs"
              text="Add sale price, product cost, shipping, packaging, and payment fees."
            />
            <StepCard
              title="Add listing traffic"
              text="Enter sessions and conversion rate for the Shopify product page."
            />
            <StepCard
              title="Include investment"
              text="Add ad spend, content cost, creative cost, and app or tool costs."
            />
            <StepCard
              title="Review ROI"
              text="Check whether the listing is worth scaling, improving, or retiring."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify listing ROI breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind this product page ROI estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value={money(salePrice)} />
              <Breakdown label="Order cost" value={money(results.orderCost)} />
              <Breakdown label="Profit before marketing" value={money(results.profitBeforeMarketing)} />
              <Breakdown label="Monthly listing sessions" value={numberFormat(monthlySessions)} />
              <Breakdown label="Estimated orders" value={numberFormat(results.estimatedOrders)} />
              <Breakdown label="Listing investment" value={money(results.listingInvestment)} />
              <Breakdown label="Refund loss" value={money(results.refundLoss)} />
              <Breakdown label="Net listing profit" value={money(results.netProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify listing ROI mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Only looking at sales and ignoring the cost to create or promote the listing." />
              <Warning text="Treating all product page traffic as equal even when some sources convert poorly." />
              <Warning text="Ignoring refund losses when measuring whether a product page is profitable." />
              <Warning text="Keeping low-converting listings active without improving photos, copy, price, or offer." />
              <Warning text="Scaling ads before calculating profit per visitor and break-even conversion rate." />
              <Warning text="Not separating product-level ROI from overall store profit." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Understanding your Shopify listing ROI</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-emerald-700">Strong:</strong> The listing
                appears to produce a high return compared with its investment.
              </p>
              <p>
                <strong className="text-blue-700">Healthy:</strong> The listing
                appears profitable, but performance should still be monitored.
              </p>
              <p>
                <strong className="text-yellow-700">Watch:</strong> The listing may
                be profitable but has limited room for ads, refunds, or weaker conversion.
              </p>
              <p>
                <strong className="text-red-700">Losing:</strong> The listing is
                estimated to lose money under the entered assumptions.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Sale price, product cost, shipping, packaging, and payment fees." />
              <Check text="Product page sessions and conversion rate." />
              <Check text="Ad spend used to drive traffic to the listing." />
              <Check text="Content, photography, creative, and app costs." />
              <Check text="Refund rate and expected refund impact." />
              <Check text="Target ROI for deciding whether the listing is worth scaling." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify listing ROI</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve conversion"
              text="Update photos, copy, reviews, FAQs, trust signals, bundles, and product page clarity."
            />
            <StepCard
              title="Lower traffic cost"
              text="Improve ad targeting, SEO, email traffic, and organic traffic sources."
            />
            <StepCard
              title="Raise order value"
              text="Use bundles, upsells, quantity breaks, free shipping thresholds, and cross-sells."
            />
            <StepCard
              title="Cut weak listings"
              text="Retire, merge, or rebuild listings that cannot produce profit after testing."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/conversion-rate-calculator" label="Conversion Rate Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/sales-goal-calculator" label="Sales Goal Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        {prefix ? (
          <span className="flex items-center border-r bg-slate-50 px-3 text-sm text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
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
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "blue" | "green" | "yellow" | "red";
}) {
  const toneClass =
    tone === "blue"
      ? "border-blue-200 bg-blue-50"
      : tone === "green"
        ? "border-emerald-200 bg-emerald-50"
        : tone === "red"
          ? "border-red-200 bg-red-50"
          : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-xs font-bold text-slate-700">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{note}</p>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const className =
    status === "Strong"
      ? "rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700"
      : status === "Healthy"
        ? "rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700"
        : status === "Watch"
          ? "rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700"
          : "rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700";

  return <span className={className}>{status}</span>;
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

function Check({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
        ✓
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