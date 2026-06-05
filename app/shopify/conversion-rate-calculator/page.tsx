"use client";

import { useMemo, useState } from "react";

type Status = "Strong" | "Healthy" | "Watch" | "Weak";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

function numberFormat(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ShopifyConversionRateCalculatorPage() {
  const [monthlySessions, setMonthlySessions] = useState(5000);
  const [monthlyOrders, setMonthlyOrders] = useState(100);
  const [averageOrderValue, setAverageOrderValue] = useState(45);
  const [productCost, setProductCost] = useState(14);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [adSpend, setAdSpend] = useState(750);
  const [targetConversionRate, setTargetConversionRate] = useState(3);
  const [targetMonthlyRevenue, setTargetMonthlyRevenue] = useState(7500);
  const [repeatPurchaseRate, setRepeatPurchaseRate] = useState(10);

  const results = useMemo(() => {
    const safeSessions = Math.max(0, monthlySessions);
    const safeOrders = Math.max(0, monthlyOrders);
    const safeAov = Math.max(0, averageOrderValue);
    const safeProductCost = Math.max(0, productCost);
    const safeShippingCost = Math.max(0, shippingCost);
    const safePackagingCost = Math.max(0, packagingCost);
    const safeAdSpend = Math.max(0, adSpend);
    const safeTargetConversionRate = clamp(targetConversionRate, 0, 100);
    const safeTargetMonthlyRevenue = Math.max(0, targetMonthlyRevenue);
    const safeRepeatPurchaseRate = clamp(repeatPurchaseRate, 0, 100);

    const conversionRate =
      safeSessions > 0 ? (safeOrders / safeSessions) * 100 : 0;

    const monthlyRevenue = safeOrders * safeAov;

    const costPerOrder =
      safeProductCost + safeShippingCost + safePackagingCost;

    const grossProfitPerOrder = safeAov - costPerOrder;
    const grossMonthlyProfit = grossProfitPerOrder * safeOrders;

    const profitAfterAds = grossMonthlyProfit - safeAdSpend;

    const profitPerSession =
      safeSessions > 0 ? profitAfterAds / safeSessions : 0;

    const revenuePerSession =
      safeSessions > 0 ? monthlyRevenue / safeSessions : 0;

    const adCostPerOrder = safeOrders > 0 ? safeAdSpend / safeOrders : 0;

    const profitPerOrderAfterAds =
      safeOrders > 0 ? profitAfterAds / safeOrders : 0;

    const breakEvenOrders =
      grossProfitPerOrder > 0 ? safeAdSpend / grossProfitPerOrder : 0;

    const breakEvenConversionRate =
      safeSessions > 0 ? (breakEvenOrders / safeSessions) * 100 : 0;

    const targetOrdersFromConversion =
      safeSessions * (safeTargetConversionRate / 100);

    const targetRevenueFromConversion =
      targetOrdersFromConversion * safeAov;

    const targetProfitFromConversion =
      targetOrdersFromConversion * grossProfitPerOrder - safeAdSpend;

    const ordersNeededForRevenue =
      safeAov > 0 ? safeTargetMonthlyRevenue / safeAov : 0;

    const sessionsNeededForRevenue =
      safeTargetConversionRate > 0
        ? ordersNeededForRevenue / (safeTargetConversionRate / 100)
        : 0;

    const extraOrdersNeeded =
      Math.max(0, ordersNeededForRevenue - safeOrders);

    const extraSessionsNeeded =
      Math.max(0, sessionsNeededForRevenue - safeSessions);

    const repeatOrders = safeOrders * (safeRepeatPurchaseRate / 100);
    const newCustomerOrders = Math.max(0, safeOrders - repeatOrders);

    const newCustomerConversionRate =
      safeSessions > 0 ? (newCustomerOrders / safeSessions) * 100 : 0;

    const status: Status =
      conversionRate >= 4
        ? "Strong"
        : conversionRate >= 2
          ? "Healthy"
          : conversionRate >= 1
            ? "Watch"
            : "Weak";

    const statusText =
      status === "Strong"
        ? "Your entered conversion rate is strong for this Shopify scenario."
        : status === "Healthy"
          ? "Your entered conversion rate appears workable under the current assumptions."
          : status === "Watch"
            ? "Your entered conversion rate may need improvement before scaling traffic or ads."
            : "Your entered conversion rate is weak and may make paid traffic difficult to profit from.";

    const scenarios = [0.5, 1, 1.5, 2, 3, 4, 5].map((rate) => {
      const scenarioOrders = safeSessions * (rate / 100);
      const scenarioRevenue = scenarioOrders * safeAov;
      const scenarioProfit =
        scenarioOrders * grossProfitPerOrder - safeAdSpend;
      const scenarioProfitPerSession =
        safeSessions > 0 ? scenarioProfit / safeSessions : 0;

      const scenarioStatus: Status =
        rate >= 4 ? "Strong" : rate >= 2 ? "Healthy" : rate >= 1 ? "Watch" : "Weak";

      return {
        rate,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        profitPerSession: scenarioProfitPerSession,
        status: scenarioStatus,
      };
    });

    return {
      conversionRate,
      monthlyRevenue,
      costPerOrder,
      grossProfitPerOrder,
      grossMonthlyProfit,
      profitAfterAds,
      profitPerSession,
      revenuePerSession,
      adCostPerOrder,
      profitPerOrderAfterAds,
      breakEvenOrders,
      breakEvenConversionRate,
      targetOrdersFromConversion,
      targetRevenueFromConversion,
      targetProfitFromConversion,
      ordersNeededForRevenue,
      sessionsNeededForRevenue,
      extraOrdersNeeded,
      extraSessionsNeeded,
      repeatOrders,
      newCustomerOrders,
      newCustomerConversionRate,
      status,
      statusText,
      scenarios,
    };
  }, [
    monthlySessions,
    monthlyOrders,
    averageOrderValue,
    productCost,
    shippingCost,
    packagingCost,
    adSpend,
    targetConversionRate,
    targetMonthlyRevenue,
    repeatPurchaseRate,
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
          Shopify Conversion Rate Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Calculate Shopify conversion rate, orders, revenue, profit per session,
          return on traffic, break-even conversion rate, and traffic needed to
          reach a sales goal.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Conversion inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your store traffic, orders, average order value, product costs,
              and ad spend to estimate conversion performance.
            </p>

            <div className="mt-5 space-y-4">
              <Input
                label="Monthly sessions"
                value={monthlySessions}
                onChange={setMonthlySessions}
              />
              <Input
                label="Monthly orders"
                value={monthlyOrders}
                onChange={setMonthlyOrders}
              />
              <Input
                label="Average order value"
                value={averageOrderValue}
                prefix="$"
                onChange={setAverageOrderValue}
              />
              <Input
                label="Product cost per order"
                value={productCost}
                prefix="$"
                onChange={setProductCost}
              />
              <Input
                label="Shipping cost per order"
                value={shippingCost}
                prefix="$"
                onChange={setShippingCost}
              />
              <Input
                label="Packaging cost per order"
                value={packagingCost}
                prefix="$"
                onChange={setPackagingCost}
              />
              <Input
                label="Monthly ad spend"
                value={adSpend}
                prefix="$"
                onChange={setAdSpend}
              />
              <Input
                label="Target conversion rate"
                value={targetConversionRate}
                suffix="%"
                onChange={setTargetConversionRate}
              />
              <Input
                label="Target monthly revenue"
                value={targetMonthlyRevenue}
                prefix="$"
                onChange={setTargetMonthlyRevenue}
              />
              <Input
                label="Repeat purchase rate"
                value={repeatPurchaseRate}
                suffix="%"
                onChange={setRepeatPurchaseRate}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Shopify conversion rates can
              vary by traffic source, product, price, offer, page speed, checkout
              flow, trust signals, seasonality, and customer intent.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify conversion performance.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Conversion rate"
                value={percent(results.conversionRate)}
                note="Orders divided by monthly sessions."
                tone="blue"
              />
              <ResultCard
                label="Monthly revenue"
                value={money(results.monthlyRevenue)}
                note="Orders multiplied by average order value."
                tone="green"
              />
              <ResultCard
                label="Profit after ads"
                value={money(results.profitAfterAds)}
                note="Gross profit minus monthly ad spend."
                tone={results.profitAfterAds >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Profit per session"
                value={money(results.profitPerSession)}
                note="Profit after ads divided by sessions."
                tone={results.profitPerSession >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Revenue per session"
                value={money(results.revenuePerSession)}
                note="Monthly revenue divided by sessions."
                tone="blue"
              />
              <ResultCard
                label="Profit per order after ads"
                value={money(results.profitPerOrderAfterAds)}
                note="Average order profit after ad spend."
                tone={results.profitPerOrderAfterAds >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Ad cost per order"
                value={money(results.adCostPerOrder)}
                note="Monthly ad spend divided by orders."
                tone="yellow"
              />
              <ResultCard
                label="Break-even conversion rate"
                value={percent(results.breakEvenConversionRate)}
                note="Conversion rate needed to cover ad spend."
                tone="yellow"
              />
              <ResultCard
                label="Target orders"
                value={numberFormat(results.targetOrdersFromConversion)}
                note="Orders expected at your target conversion rate."
                tone="blue"
              />
              <ResultCard
                label="Target revenue"
                value={money(results.targetRevenueFromConversion)}
                note="Revenue expected at your target conversion rate."
                tone="green"
              />
              <ResultCard
                label="Sessions needed for revenue goal"
                value={numberFormat(results.sessionsNeededForRevenue)}
                note="Traffic needed to reach your revenue goal."
                tone="yellow"
              />
              <ResultCard
                label="Extra orders needed"
                value={numberFormat(results.extraOrdersNeeded)}
                note="Additional orders needed for your revenue target."
                tone="yellow"
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your entered Shopify conversion rate is{" "}
                <strong>{percent(results.conversionRate)}</strong>, producing an
                estimated <strong>{money(results.monthlyRevenue)}</strong> in
                monthly revenue.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                After product costs, shipping, packaging, and ad spend, estimated
                monthly profit is <strong>{money(results.profitAfterAds)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Conversion rate scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Conversion rate</th>
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
            How to use this Shopify Conversion Rate Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter traffic"
              text="Add monthly sessions and monthly orders from your Shopify analytics."
            />
            <StepCard
              title="Add order value"
              text="Enter your average order value and core fulfillment costs."
            />
            <StepCard
              title="Include ad spend"
              text="Add monthly ad spend to estimate profit after traffic costs."
            />
            <StepCard
              title="Review targets"
              text="Check the conversion rate and traffic needed to reach your revenue goal."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify conversion breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind your Shopify conversion result.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Monthly sessions" value={numberFormat(monthlySessions)} />
              <Breakdown label="Monthly orders" value={numberFormat(monthlyOrders)} />
              <Breakdown label="Conversion rate" value={percent(results.conversionRate)} />
              <Breakdown label="Average order value" value={money(averageOrderValue)} />
              <Breakdown label="Cost per order" value={money(results.costPerOrder)} />
              <Breakdown label="Gross profit per order" value={money(results.grossProfitPerOrder)} />
              <Breakdown label="Monthly ad spend" value={money(adSpend)} />
              <Breakdown label="Profit after ads" value={money(results.profitAfterAds)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify conversion mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Looking only at traffic instead of traffic quality and purchase intent." />
              <Warning text="Scaling ad spend before checking profit per session." />
              <Warning text="Using store-wide conversion rate when product pages perform very differently." />
              <Warning text="Ignoring mobile speed, checkout friction, trust signals, and shipping clarity." />
              <Warning text="Comparing conversion rate without considering average order value and margin." />
              <Warning text="Treating repeat customer orders the same as new customer acquisition." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Understanding your Shopify conversion result</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-emerald-700">Strong:</strong> Your entered
                conversion rate is high enough that traffic improvements may scale
                profit well.
              </p>
              <p>
                <strong className="text-blue-700">Healthy:</strong> Your conversion
                rate appears workable, especially if margins and traffic quality are solid.
              </p>
              <p>
                <strong className="text-yellow-700">Watch:</strong> Conversion may
                need improvement before increasing ad spend or traffic volume.
              </p>
              <p>
                <strong className="text-red-700">Weak:</strong> Conversion is low
                and may make paid traffic difficult unless order value or margins improve.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Monthly sessions from Shopify analytics." />
              <Check text="Monthly orders and average order value." />
              <Check text="Product cost, shipping cost, and packaging cost." />
              <Check text="Monthly ad spend or traffic acquisition cost." />
              <Check text="Target conversion rate for planning scenarios." />
              <Check text="Revenue goal and repeat purchase assumptions." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify conversion rate</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve product pages"
              text="Use clearer photos, stronger benefits, better descriptions, and stronger trust signals."
            />
            <StepCard
              title="Reduce checkout friction"
              text="Make shipping, returns, payment options, and checkout steps easier to understand."
            />
            <StepCard
              title="Match traffic intent"
              text="Send ads and search traffic to pages that match the buyer's exact intent."
            />
            <StepCard
              title="Test offers"
              text="Compare bundles, discounts, free shipping thresholds, guarantees, and urgency."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Included in the conversion estimate.
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