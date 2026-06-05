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

export default function ShopifySubscriptionProfitCalculatorPage() {
  const [subscriptionPrice, setSubscriptionPrice] = useState(35);
  const [productCost, setProductCost] = useState(11);
  const [shippingCost, setShippingCost] = useState(5.5);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [fulfillmentCost, setFulfillmentCost] = useState(1.5);
  const [paymentPercent, setPaymentPercent] = useState(2.9);
  const [paymentFixed, setPaymentFixed] = useState(0.3);
  const [subscriptionAppCost, setSubscriptionAppCost] = useState(1);
  const [supportCost, setSupportCost] = useState(0.75);
  const [refundAllowance, setRefundAllowance] = useState(1.5);

  const [activeSubscribers, setActiveSubscribers] = useState(120);
  const [monthlyChurnRate, setMonthlyChurnRate] = useState(8);
  const [newSubscribersPerMonth, setNewSubscribersPerMonth] = useState(25);
  const [acquisitionCost, setAcquisitionCost] = useState(12);
  const [averageMonthsRetained, setAverageMonthsRetained] = useState(6);
  const [targetMargin, setTargetMargin] = useState(25);

  const results = useMemo(() => {
    const safeSubscriptionPrice = Math.max(0, subscriptionPrice);
    const safeProductCost = Math.max(0, productCost);
    const safeShippingCost = Math.max(0, shippingCost);
    const safePackagingCost = Math.max(0, packagingCost);
    const safeFulfillmentCost = Math.max(0, fulfillmentCost);
    const safePaymentPercent = clamp(paymentPercent, 0, 100);
    const safePaymentFixed = Math.max(0, paymentFixed);
    const safeSubscriptionAppCost = Math.max(0, subscriptionAppCost);
    const safeSupportCost = Math.max(0, supportCost);
    const safeRefundAllowance = Math.max(0, refundAllowance);

    const safeActiveSubscribers = Math.max(0, activeSubscribers);
    const safeMonthlyChurnRate = clamp(monthlyChurnRate, 0, 100);
    const safeNewSubscribersPerMonth = Math.max(0, newSubscribersPerMonth);
    const safeAcquisitionCost = Math.max(0, acquisitionCost);
    const safeAverageMonthsRetained = Math.max(1, averageMonthsRetained);
    const safeTargetMargin = clamp(targetMargin, 0, 95);

    const paymentFee =
      safeSubscriptionPrice * (safePaymentPercent / 100) + safePaymentFixed;

    const costPerShipment =
      safeProductCost +
      safeShippingCost +
      safePackagingCost +
      safeFulfillmentCost +
      paymentFee +
      safeSubscriptionAppCost +
      safeSupportCost +
      safeRefundAllowance;

    const profitPerShipment = safeSubscriptionPrice - costPerShipment;

    const margin =
      safeSubscriptionPrice > 0
        ? (profitPerShipment / safeSubscriptionPrice) * 100
        : 0;

    const monthlyRevenue = safeActiveSubscribers * safeSubscriptionPrice;

    const monthlyFulfillmentCost = safeActiveSubscribers * costPerShipment;

    const monthlyGrossProfit = safeActiveSubscribers * profitPerShipment;

    const expectedCancellations =
      safeActiveSubscribers * (safeMonthlyChurnRate / 100);

    const endingSubscribers =
      safeActiveSubscribers - expectedCancellations + safeNewSubscribersPerMonth;

    const netSubscriberChange = endingSubscribers - safeActiveSubscribers;

    const acquisitionSpend =
      safeNewSubscribersPerMonth * safeAcquisitionCost;

    const monthlyProfitAfterAcquisition =
      monthlyGrossProfit - acquisitionSpend;

    const lifetimeRevenue =
      safeSubscriptionPrice * safeAverageMonthsRetained;

    const lifetimeFulfillmentCost =
      costPerShipment * safeAverageMonthsRetained;

    const lifetimeGrossProfit =
      profitPerShipment * safeAverageMonthsRetained;

    const customerLtvAfterAcquisition =
      lifetimeGrossProfit - safeAcquisitionCost;

    const ltvToCac =
      safeAcquisitionCost > 0
        ? lifetimeGrossProfit / safeAcquisitionCost
        : 0;

    const breakEvenMonths =
      profitPerShipment > 0
        ? safeAcquisitionCost / profitPerShipment
        : 0;

    const priceForTargetMargin =
      safeTargetMargin < 100
        ? costPerShipment / (1 - safeTargetMargin / 100)
        : costPerShipment;

    const extraPriceNeeded = Math.max(
      0,
      priceForTargetMargin - safeSubscriptionPrice
    );

    const churnRevenueLost =
      expectedCancellations * safeSubscriptionPrice;

    const churnProfitLost =
      expectedCancellations * profitPerShipment;

    const monthlyRecurringRevenueAfterChurn =
      endingSubscribers * safeSubscriptionPrice;

    const status: Status =
      monthlyProfitAfterAcquisition <= 0 || profitPerShipment <= 0
        ? "Losing"
        : ltvToCac >= 3 && margin >= safeTargetMargin
          ? "Strong"
          : ltvToCac >= 2 && margin >= 15
            ? "Healthy"
            : "Watch";

    const statusText =
      status === "Strong"
        ? "This subscription appears strong under the entered margin, churn, and acquisition assumptions."
        : status === "Healthy"
          ? "This subscription appears profitable, but churn and acquisition cost should be monitored."
          : status === "Watch"
            ? "This subscription is profitable but may have thin margin, weak LTV, or high acquisition pressure."
            : "This subscription is estimated to lose money under the entered assumptions.";

    const scenarios = [0, 5, 8, 10, 15, 20, 25].map((churn) => {
      const scenarioCancellations = safeActiveSubscribers * (churn / 100);
      const scenarioEndingSubscribers =
        safeActiveSubscribers -
        scenarioCancellations +
        safeNewSubscribersPerMonth;

      const scenarioRevenue =
        scenarioEndingSubscribers * safeSubscriptionPrice;

      const scenarioGrossProfit =
        scenarioEndingSubscribers * profitPerShipment;

      const scenarioProfit =
        scenarioGrossProfit - acquisitionSpend;

      const scenarioStatus: Status =
        scenarioProfit <= 0 || profitPerShipment <= 0
          ? "Losing"
          : ltvToCac >= 3 && margin >= safeTargetMargin
            ? "Strong"
            : ltvToCac >= 2 && margin >= 15
              ? "Healthy"
              : "Watch";

      return {
        churn,
        cancellations: scenarioCancellations,
        endingSubscribers: scenarioEndingSubscribers,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        status: scenarioStatus,
      };
    });

    return {
      paymentFee,
      costPerShipment,
      profitPerShipment,
      margin,
      monthlyRevenue,
      monthlyFulfillmentCost,
      monthlyGrossProfit,
      expectedCancellations,
      endingSubscribers,
      netSubscriberChange,
      acquisitionSpend,
      monthlyProfitAfterAcquisition,
      lifetimeRevenue,
      lifetimeFulfillmentCost,
      lifetimeGrossProfit,
      customerLtvAfterAcquisition,
      ltvToCac,
      breakEvenMonths,
      priceForTargetMargin,
      extraPriceNeeded,
      churnRevenueLost,
      churnProfitLost,
      monthlyRecurringRevenueAfterChurn,
      status,
      statusText,
      scenarios,
    };
  }, [
    subscriptionPrice,
    productCost,
    shippingCost,
    packagingCost,
    fulfillmentCost,
    paymentPercent,
    paymentFixed,
    subscriptionAppCost,
    supportCost,
    refundAllowance,
    activeSubscribers,
    monthlyChurnRate,
    newSubscribersPerMonth,
    acquisitionCost,
    averageMonthsRetained,
    targetMargin,
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
          Shopify Subscription Profit Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate subscription order profit, recurring revenue, churn pressure,
          acquisition cost, lifetime value, fulfillment cost, discounts, and
          monthly subscription profitability.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Subscription inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your subscription price, shipment costs, payment fees,
              subscriber count, churn rate, acquisition cost, and retention assumptions.
            </p>

            <div className="mt-5 space-y-4">
              <Input label="Subscription price" value={subscriptionPrice} prefix="$" onChange={setSubscriptionPrice} />
              <Input label="Product cost" value={productCost} prefix="$" onChange={setProductCost} />
              <Input label="Shipping cost" value={shippingCost} prefix="$" onChange={setShippingCost} />
              <Input label="Packaging cost" value={packagingCost} prefix="$" onChange={setPackagingCost} />
              <Input label="Fulfillment cost" value={fulfillmentCost} prefix="$" onChange={setFulfillmentCost} />
              <Input label="Payment fee rate" value={paymentPercent} suffix="%" onChange={setPaymentPercent} />
              <Input label="Payment fixed fee" value={paymentFixed} prefix="$" onChange={setPaymentFixed} />
              <Input label="Subscription app cost" value={subscriptionAppCost} prefix="$" onChange={setSubscriptionAppCost} />
              <Input label="Support cost per shipment" value={supportCost} prefix="$" onChange={setSupportCost} />
              <Input label="Refund allowance" value={refundAllowance} prefix="$" onChange={setRefundAllowance} />
              <Input label="Active subscribers" value={activeSubscribers} onChange={setActiveSubscribers} />
              <Input label="Monthly churn rate" value={monthlyChurnRate} suffix="%" onChange={setMonthlyChurnRate} />
              <Input label="New subscribers per month" value={newSubscribersPerMonth} onChange={setNewSubscribersPerMonth} />
              <Input label="Acquisition cost per subscriber" value={acquisitionCost} prefix="$" onChange={setAcquisitionCost} />
              <Input label="Average months retained" value={averageMonthsRetained} onChange={setAverageMonthsRetained} />
              <Input label="Target margin" value={targetMargin} suffix="%" onChange={setTargetMargin} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Shopify subscription profit
              can vary by churn, retention, discounts, fulfillment costs, shipping
              zones, payment fees, refunds, customer support, and acquisition costs.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify subscription profitability.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Profit per shipment"
                value={money(results.profitPerShipment)}
                note="Subscription price minus fulfillment, fees, support, and refund allowance."
                tone={results.profitPerShipment >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Subscription margin"
                value={percent(results.margin)}
                note="Profit per shipment divided by subscription price."
                tone={results.margin >= targetMargin ? "green" : "yellow"}
              />
              <ResultCard
                label="Monthly recurring revenue"
                value={money(results.monthlyRevenue)}
                note="Active subscribers multiplied by subscription price."
                tone="green"
              />
              <ResultCard
                label="Monthly gross profit"
                value={money(results.monthlyGrossProfit)}
                note="Profit per shipment multiplied by active subscribers."
                tone="blue"
              />
              <ResultCard
                label="Acquisition spend"
                value={money(results.acquisitionSpend)}
                note="New subscribers multiplied by acquisition cost."
                tone="yellow"
              />
              <ResultCard
                label="Profit after acquisition"
                value={money(results.monthlyProfitAfterAcquisition)}
                note="Monthly gross profit minus subscriber acquisition spend."
                tone={results.monthlyProfitAfterAcquisition >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Expected cancellations"
                value={numberFormat(results.expectedCancellations)}
                note="Estimated monthly cancellations based on churn rate."
                tone="yellow"
              />
              <ResultCard
                label="Ending subscribers"
                value={numberFormat(results.endingSubscribers)}
                note="Active subscribers after churn and new subscriber growth."
                tone="blue"
              />
              <ResultCard
                label="Net subscriber change"
                value={numberFormat(results.netSubscriberChange)}
                note="Subscriber growth after expected cancellations."
                tone={results.netSubscriberChange >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Customer LTV"
                value={money(results.lifetimeGrossProfit)}
                note="Estimated gross profit across average months retained."
                tone="green"
              />
              <ResultCard
                label="LTV to CAC"
                value={`${results.ltvToCac.toFixed(2)}x`}
                note="Lifetime gross profit divided by acquisition cost."
                tone={results.ltvToCac >= 2 ? "green" : "yellow"}
              />
              <ResultCard
                label="Break-even months"
                value={numberFormat(results.breakEvenMonths)}
                note="Months needed to recover acquisition cost."
                tone="yellow"
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Each subscription shipment is estimated to produce{" "}
                <strong>{money(results.profitPerShipment)}</strong> in profit at a
                margin of <strong>{percent(results.margin)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                With <strong>{numberFormat(activeSubscribers)}</strong> active
                subscribers, estimated monthly recurring revenue is{" "}
                <strong>{money(results.monthlyRevenue)}</strong>, and profit after
                acquisition spend is{" "}
                <strong>{money(results.monthlyProfitAfterAcquisition)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Churn scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Churn</th>
                      <th className="px-3 py-2">Cancellations</th>
                      <th className="px-3 py-2">Ending subs</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario) => (
                      <tr key={scenario.churn} className="border-t bg-white">
                        <td className="px-3 py-2 font-medium">
                          {percent(scenario.churn)}
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.cancellations)}
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.endingSubscribers)}
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
            How to use this Shopify Subscription Profit Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter price"
              text="Add the recurring subscription price charged per shipment."
            />
            <StepCard
              title="Add costs"
              text="Include product cost, shipping, packaging, fulfillment, fees, app cost, and support."
            />
            <StepCard
              title="Add retention"
              text="Enter active subscribers, churn rate, new subscribers, and months retained."
            />
            <StepCard
              title="Review LTV"
              text="Check margin, recurring profit, LTV, CAC, churn pressure, and break-even months."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify subscription cost breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the main costs included in each subscription shipment.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Subscription price" value={money(subscriptionPrice)} />
              <Breakdown label="Product cost" value={money(productCost)} />
              <Breakdown label="Shipping cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Fulfillment cost" value={money(fulfillmentCost)} />
              <Breakdown label="Payment fee" value={money(results.paymentFee)} />
              <Breakdown label="Subscription app cost" value={money(subscriptionAppCost)} />
              <Breakdown label="Support cost" value={money(supportCost)} />
              <Breakdown label="Refund allowance" value={money(refundAllowance)} />
              <Breakdown label="Profit per shipment" value={money(results.profitPerShipment)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify subscription mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Only checking first-month profit and ignoring churn." />
              <Warning text="Ignoring subscription app fees, support time, and replacement costs." />
              <Warning text="Spending too much to acquire subscribers without checking LTV to CAC." />
              <Warning text="Offering subscription discounts that make repeat shipments unprofitable." />
              <Warning text="Not tracking cancellation reasons, skipped shipments, and failed payments." />
              <Warning text="Assuming all subscribers stay for the same number of months." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Understanding your Shopify subscription result
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-emerald-700">Strong:</strong> The
                subscription appears to have strong margin, LTV, and acquisition
                economics.
              </p>
              <p>
                <strong className="text-blue-700">Healthy:</strong> The
                subscription appears profitable, but churn and CAC should be
                monitored.
              </p>
              <p>
                <strong className="text-yellow-700">Watch:</strong> Profit may be
                sensitive to churn, acquisition cost, shipping, discounts, or support
                burden.
              </p>
              <p>
                <strong className="text-red-700">Losing:</strong> The subscription
                is estimated to lose money under the entered assumptions.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Subscription price and shipment frequency." />
              <Check text="Product cost, shipping, packaging, fulfillment, and payment fees." />
              <Check text="Subscription app cost, support cost, and refund allowance." />
              <Check text="Active subscribers, churn rate, and new subscriber growth." />
              <Check text="Customer acquisition cost and average months retained." />
              <Check text="Lifetime value and break-even months before scaling ads." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify subscription profit</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Reduce churn"
              text="Improve product quality, delivery consistency, onboarding, reminders, and cancellation saves."
            />
            <StepCard
              title="Raise LTV"
              text="Use longer retention, better bundles, loyalty perks, and upsells to increase lifetime profit."
            />
            <StepCard
              title="Lower CAC"
              text="Improve organic traffic, email capture, referral offers, and ad targeting before scaling."
            />
            <StepCard
              title="Protect margin"
              text="Watch shipping costs, discounts, support tickets, refunds, app fees, and failed payments."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
            <Related href="/shopify/ad-roi-calculator" label="Ad ROI Calculator" />
            <Related href="/shopify/refund-impact-calculator" label="Refund Impact Calculator" />
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
          Included in the subscription profit estimate.
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