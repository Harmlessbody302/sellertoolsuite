"use client";

import { useMemo, useState } from "react";

type Status = "Easy" | "Realistic" | "Stretch" | "Aggressive";

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

export default function ShopifySalesGoalCalculatorPage() {
  const [targetMonthlyRevenue, setTargetMonthlyRevenue] = useState(7500);
  const [averageOrderValue, setAverageOrderValue] = useState(45);
  const [currentMonthlyOrders, setCurrentMonthlyOrders] = useState(100);
  const [currentMonthlySessions, setCurrentMonthlySessions] = useState(5000);
  const [conversionRate, setConversionRate] = useState(2);
  const [productCost, setProductCost] = useState(14);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [paymentPercent, setPaymentPercent] = useState(2.9);
  const [paymentFixed, setPaymentFixed] = useState(0.3);
  const [monthlyAdBudget, setMonthlyAdBudget] = useState(750);
  const [targetProfitMargin, setTargetProfitMargin] = useState(20);
  const [planningDays, setPlanningDays] = useState(30);

  const results = useMemo(() => {
    const safeTargetMonthlyRevenue = Math.max(0, targetMonthlyRevenue);
    const safeAverageOrderValue = Math.max(0, averageOrderValue);
    const safeCurrentMonthlyOrders = Math.max(0, currentMonthlyOrders);
    const safeCurrentMonthlySessions = Math.max(0, currentMonthlySessions);
    const safeConversionRate = clamp(conversionRate, 0, 100);
    const safeProductCost = Math.max(0, productCost);
    const safeShippingCost = Math.max(0, shippingCost);
    const safePackagingCost = Math.max(0, packagingCost);
    const safePaymentPercent = clamp(paymentPercent, 0, 100);
    const safePaymentFixed = Math.max(0, paymentFixed);
    const safeMonthlyAdBudget = Math.max(0, monthlyAdBudget);
    const safeTargetProfitMargin = clamp(targetProfitMargin, 0, 100);
    const safePlanningDays = Math.max(1, planningDays);

    const paymentFee =
      safeAverageOrderValue * (safePaymentPercent / 100) + safePaymentFixed;

    const orderCost =
      safeProductCost + safeShippingCost + safePackagingCost + paymentFee;

    const profitPerOrderBeforeAds = safeAverageOrderValue - orderCost;

    const currentRevenue = safeCurrentMonthlyOrders * safeAverageOrderValue;

    const currentGrossProfit =
      safeCurrentMonthlyOrders * profitPerOrderBeforeAds;

    const currentProfitAfterAds = currentGrossProfit - safeMonthlyAdBudget;

    const ordersNeeded =
      safeAverageOrderValue > 0
        ? Math.ceil(safeTargetMonthlyRevenue / safeAverageOrderValue)
        : 0;

    const extraOrdersNeeded = Math.max(
      0,
      ordersNeeded - safeCurrentMonthlyOrders
    );

    const dailyOrdersNeeded = ordersNeeded / safePlanningDays;

    const dailyRevenueNeeded =
      safeTargetMonthlyRevenue / safePlanningDays;

    const sessionsNeeded =
      safeConversionRate > 0
        ? ordersNeeded / (safeConversionRate / 100)
        : 0;

    const extraSessionsNeeded = Math.max(
      0,
      sessionsNeeded - safeCurrentMonthlySessions
    );

    const dailySessionsNeeded = sessionsNeeded / safePlanningDays;

    const targetGrossProfit = ordersNeeded * profitPerOrderBeforeAds;

    const targetProfitAfterAds = targetGrossProfit - safeMonthlyAdBudget;

    const targetProfitMarginActual =
      safeTargetMonthlyRevenue > 0
        ? (targetProfitAfterAds / safeTargetMonthlyRevenue) * 100
        : 0;

    const requiredProfit =
      safeTargetMonthlyRevenue * (safeTargetProfitMargin / 100);

    const maxAdSpendForTargetMargin =
      Math.max(0, targetGrossProfit - requiredProfit);

    const adBudgetGap =
      maxAdSpendForTargetMargin - safeMonthlyAdBudget;

    const requiredAovAtCurrentOrders =
      safeCurrentMonthlyOrders > 0
        ? safeTargetMonthlyRevenue / safeCurrentMonthlyOrders
        : 0;

    const requiredConversionAtCurrentTraffic =
      safeCurrentMonthlySessions > 0
        ? (ordersNeeded / safeCurrentMonthlySessions) * 100
        : 0;

    const revenueGap = Math.max(
      0,
      safeTargetMonthlyRevenue - currentRevenue
    );

    const orderGrowthNeeded =
      safeCurrentMonthlyOrders > 0
        ? ((ordersNeeded - safeCurrentMonthlyOrders) /
            safeCurrentMonthlyOrders) *
          100
        : 0;

    const trafficGrowthNeeded =
      safeCurrentMonthlySessions > 0
        ? ((sessionsNeeded - safeCurrentMonthlySessions) /
            safeCurrentMonthlySessions) *
          100
        : 0;

    const status: Status =
      orderGrowthNeeded <= 10
        ? "Easy"
        : orderGrowthNeeded <= 50
          ? "Realistic"
          : orderGrowthNeeded <= 100
            ? "Stretch"
            : "Aggressive";

    const statusText =
      status === "Easy"
        ? "This goal appears close to current performance under the entered assumptions."
        : status === "Realistic"
          ? "This goal appears reachable with moderate improvement in orders, traffic, or conversion."
          : status === "Stretch"
            ? "This goal may require a meaningful increase in traffic, conversion, order value, or ad performance."
            : "This goal is aggressive compared with current orders and may require major growth across multiple areas.";

    const scenarios = [2500, 5000, 7500, 10000, 15000, 20000, 30000].map(
      (goal) => {
        const scenarioOrders =
          safeAverageOrderValue > 0
            ? Math.ceil(goal / safeAverageOrderValue)
            : 0;

        const scenarioSessions =
          safeConversionRate > 0
            ? scenarioOrders / (safeConversionRate / 100)
            : 0;

        const scenarioProfit =
          scenarioOrders * profitPerOrderBeforeAds - safeMonthlyAdBudget;

        const scenarioMargin =
          goal > 0 ? (scenarioProfit / goal) * 100 : 0;

        const scenarioGrowth =
          safeCurrentMonthlyOrders > 0
            ? ((scenarioOrders - safeCurrentMonthlyOrders) /
                safeCurrentMonthlyOrders) *
              100
            : 0;

        const scenarioStatus: Status =
          scenarioGrowth <= 10
            ? "Easy"
            : scenarioGrowth <= 50
              ? "Realistic"
              : scenarioGrowth <= 100
                ? "Stretch"
                : "Aggressive";

        return {
          goal,
          orders: scenarioOrders,
          sessions: scenarioSessions,
          profit: scenarioProfit,
          margin: scenarioMargin,
          status: scenarioStatus,
        };
      }
    );

    return {
      paymentFee,
      orderCost,
      profitPerOrderBeforeAds,
      currentRevenue,
      currentGrossProfit,
      currentProfitAfterAds,
      ordersNeeded,
      extraOrdersNeeded,
      dailyOrdersNeeded,
      dailyRevenueNeeded,
      sessionsNeeded,
      extraSessionsNeeded,
      dailySessionsNeeded,
      targetGrossProfit,
      targetProfitAfterAds,
      targetProfitMarginActual,
      maxAdSpendForTargetMargin,
      adBudgetGap,
      requiredAovAtCurrentOrders,
      requiredConversionAtCurrentTraffic,
      revenueGap,
      orderGrowthNeeded,
      trafficGrowthNeeded,
      status,
      statusText,
      scenarios,
    };
  }, [
    targetMonthlyRevenue,
    averageOrderValue,
    currentMonthlyOrders,
    currentMonthlySessions,
    conversionRate,
    productCost,
    shippingCost,
    packagingCost,
    paymentPercent,
    paymentFixed,
    monthlyAdBudget,
    targetProfitMargin,
    planningDays,
  ]);

  const statusClass =
    results.status === "Easy"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : results.status === "Realistic"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : results.status === "Stretch"
          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
          : "bg-red-50 text-red-700 border-red-200";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Sales Goal Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from a monthly profit or revenue goal to estimate required
          orders, traffic, conversion rate, ad budget, inventory, and daily sales pace.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Sales goal inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your revenue goal, current sales pace, traffic, conversion
              rate, order value, costs, and target margin.
            </p>

            <div className="mt-5 space-y-4">
              <Input
                label="Target monthly revenue"
                value={targetMonthlyRevenue}
                prefix="$"
                onChange={setTargetMonthlyRevenue}
              />
              <Input
                label="Average order value"
                value={averageOrderValue}
                prefix="$"
                onChange={setAverageOrderValue}
              />
              <Input
                label="Current monthly orders"
                value={currentMonthlyOrders}
                onChange={setCurrentMonthlyOrders}
              />
              <Input
                label="Current monthly sessions"
                value={currentMonthlySessions}
                onChange={setCurrentMonthlySessions}
              />
              <Input
                label="Conversion rate"
                value={conversionRate}
                suffix="%"
                onChange={setConversionRate}
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
                label="Payment fee rate"
                value={paymentPercent}
                suffix="%"
                onChange={setPaymentPercent}
              />
              <Input
                label="Payment fixed fee"
                value={paymentFixed}
                prefix="$"
                onChange={setPaymentFixed}
              />
              <Input
                label="Monthly ad budget"
                value={monthlyAdBudget}
                prefix="$"
                onChange={setMonthlyAdBudget}
              />
              <Input
                label="Target profit margin"
                value={targetProfitMargin}
                suffix="%"
                onChange={setTargetProfitMargin}
              />
              <Input
                label="Planning days"
                value={planningDays}
                suffix="days"
                onChange={setPlanningDays}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Shopify sales goals can vary
              by traffic source, conversion rate, ad performance, product margin,
              seasonality, inventory, repeat purchases, refunds, and fulfillment capacity.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify sales goal plan.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Orders needed"
                value={numberFormat(results.ordersNeeded)}
                note="Orders required to reach the monthly revenue goal."
                tone="blue"
              />
              <ResultCard
                label="Extra orders needed"
                value={numberFormat(results.extraOrdersNeeded)}
                note="Additional orders needed above current monthly orders."
                tone="yellow"
              />
              <ResultCard
                label="Sessions needed"
                value={numberFormat(results.sessionsNeeded)}
                note="Estimated traffic needed at the entered conversion rate."
                tone="blue"
              />
              <ResultCard
                label="Extra sessions needed"
                value={numberFormat(results.extraSessionsNeeded)}
                note="Additional monthly sessions needed above current traffic."
                tone="yellow"
              />
              <ResultCard
                label="Daily orders needed"
                value={numberFormat(results.dailyOrdersNeeded)}
                note="Required average orders per day during the planning period."
                tone="blue"
              />
              <ResultCard
                label="Daily revenue needed"
                value={money(results.dailyRevenueNeeded)}
                note="Required average revenue per day."
                tone="green"
              />
              <ResultCard
                label="Target profit after ads"
                value={money(results.targetProfitAfterAds)}
                note="Estimated profit at the revenue goal after ad budget."
                tone={results.targetProfitAfterAds >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Target profit margin"
                value={percent(results.targetProfitMarginActual)}
                note="Estimated margin at the revenue goal."
                tone="blue"
              />
              <ResultCard
                label="Revenue gap"
                value={money(results.revenueGap)}
                note="Difference between current revenue and target revenue."
                tone="yellow"
              />
              <ResultCard
                label="Order growth needed"
                value={percent(results.orderGrowthNeeded)}
                note="Order increase needed compared with current orders."
                tone="yellow"
              />
              <ResultCard
                label="Required AOV at current orders"
                value={money(results.requiredAovAtCurrentOrders)}
                note="Average order value needed if order count stays the same."
                tone="yellow"
              />
              <ResultCard
                label="Required conversion at current traffic"
                value={percent(results.requiredConversionAtCurrentTraffic)}
                note="Conversion rate needed if traffic stays the same."
                tone="yellow"
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                To reach <strong>{money(targetMonthlyRevenue)}</strong> in monthly
                revenue at an average order value of{" "}
                <strong>{money(averageOrderValue)}</strong>, you need about{" "}
                <strong>{numberFormat(results.ordersNeeded)}</strong> orders.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                At a <strong>{percent(conversionRate)}</strong> conversion rate,
                that requires about{" "}
                <strong>{numberFormat(results.sessionsNeeded)}</strong> monthly
                sessions, or{" "}
                <strong>{numberFormat(results.dailySessionsNeeded)}</strong>{" "}
                sessions per day.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Sales goal scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Revenue goal</th>
                      <th className="px-3 py-2">Orders</th>
                      <th className="px-3 py-2">Sessions</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario) => (
                      <tr key={scenario.goal} className="border-t bg-white">
                        <td className="px-3 py-2 font-medium">
                          {money(scenario.goal)}
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.orders)}
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.sessions)}
                        </td>
                        <td className="px-3 py-2">
                          {money(scenario.profit)}
                        </td>
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
            How to use this Shopify Sales Goal Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter goal"
              text="Add the monthly revenue target you want your Shopify store to reach."
            />
            <StepCard
              title="Add current pace"
              text="Enter current monthly orders, sessions, average order value, and conversion rate."
            />
            <StepCard
              title="Include costs"
              text="Add product, shipping, packaging, payment fees, and monthly ad budget."
            />
            <StepCard
              title="Review gap"
              text="Check the orders, traffic, conversion, and daily pace needed to reach the goal."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify sales goal breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the Shopify sales goal estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target monthly revenue" value={money(targetMonthlyRevenue)} />
              <Breakdown label="Current estimated revenue" value={money(results.currentRevenue)} />
              <Breakdown label="Revenue gap" value={money(results.revenueGap)} />
              <Breakdown label="Orders needed" value={numberFormat(results.ordersNeeded)} />
              <Breakdown label="Sessions needed" value={numberFormat(results.sessionsNeeded)} />
              <Breakdown label="Profit per order before ads" value={money(results.profitPerOrderBeforeAds)} />
              <Breakdown label="Target profit after ads" value={money(results.targetProfitAfterAds)} />
              <Breakdown label="Max ad spend for target margin" value={money(results.maxAdSpendForTargetMargin)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify sales goal mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Setting a revenue goal without checking how many orders it requires." />
              <Warning text="Ignoring conversion rate when estimating traffic needed." />
              <Warning text="Planning around revenue without checking profit after product costs and ads." />
              <Warning text="Assuming ad spend can scale without higher cost per order." />
              <Warning text="Forgetting inventory capacity when setting aggressive sales targets." />
              <Warning text="Using one store-wide average order value when products have very different margins." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Understanding your Shopify sales goal result
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-emerald-700">Easy:</strong> The goal is
                close to current sales performance and may only require small gains.
              </p>
              <p>
                <strong className="text-blue-700">Realistic:</strong> The goal may
                be reachable with moderate improvements in traffic, conversion, or AOV.
              </p>
              <p>
                <strong className="text-yellow-700">Stretch:</strong> The goal
                requires meaningful growth and should be supported by a clear plan.
              </p>
              <p>
                <strong className="text-red-700">Aggressive:</strong> The goal is
                far above current pace and may require major traffic, conversion,
                product, ad, or inventory improvements.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Target monthly revenue or profit goal." />
              <Check text="Current monthly orders, sessions, and conversion rate." />
              <Check text="Average order value and product-level costs." />
              <Check text="Shipping, packaging, payment fees, and ad budget." />
              <Check text="Target profit margin for the goal." />
              <Check text="Inventory and fulfillment capacity to handle the required order volume." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reach a Shopify sales goal</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Increase conversion"
              text="Improve product pages, offers, reviews, trust signals, page speed, and checkout clarity."
            />
            <StepCard
              title="Raise order value"
              text="Use bundles, upsells, quantity breaks, free shipping thresholds, and cross-sells."
            />
            <StepCard
              title="Grow traffic"
              text="Use SEO, email, ads, affiliates, social content, and retargeting to increase sessions."
            />
            <StepCard
              title="Protect margin"
              text="Watch product costs, shipping costs, ad costs, refunds, discounts, and inventory cash flow."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/conversion-rate-calculator" label="Conversion Rate Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/inventory-restock-calculator" label="Inventory Restock Calculator" />
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
    status === "Easy"
      ? "rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700"
      : status === "Realistic"
        ? "rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700"
        : status === "Stretch"
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
          Included in the sales goal estimate.
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