"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tone = "good" | "warn" | "bad" | "neutral" | "blue";

function money(value: number) {
  if (!Number.isFinite(value)) return "$0.00";

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function numberFormat(value: number) {
  if (!Number.isFinite(value)) return "0";

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });
}

function percent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

function safeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function ResultCard({
  title,
  value,
  note,
  tone = "neutral",
}: {
  title: string;
  value: string;
  note: string;
  tone?: Tone;
}) {
  const toneClass =
    tone === "good"
      ? "border-green-200 bg-green-50"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50"
        : tone === "bad"
          ? "border-red-200 bg-red-50"
          : tone === "blue"
            ? "border-blue-200 bg-blue-50"
            : "border-gray-200 bg-gray-50";

  return (
    <div className={`rounded-xl border p-5 ${toneClass}`}>
      <p className="text-sm font-bold text-gray-700">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      <p className="mt-2 text-sm leading-5 text-gray-600">{note}</p>
    </div>
  );
}

export default function AmazonRefundImpactCalculatorPage() {
  const [monthlyOrders, setMonthlyOrders] = useState("240");
  const [salePrice, setSalePrice] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("8");
  const [refundRate, setRefundRate] = useState("4");
  const [refundAmount, setRefundAmount] = useState("35");
  const [returnShippingCost, setReturnShippingCost] = useState("4");
  const [replacementCost, setReplacementCost] = useState("3");
  const [unsellableRate, setUnsellableRate] = useState("25");
  const [productCost, setProductCost] = useState("12");
  const [caseLosses, setCaseLosses] = useState("30");
  const [supportHours, setSupportHours] = useState("3");
  const [hourlyValue, setHourlyValue] = useState("20");

  const results = useMemo(() => {
    const orders = safeNumber(monthlyOrders);
    const price = safeNumber(salePrice);
    const orderProfit = safeNumber(profitPerOrder);
    const refunds = safeNumber(refundRate) / 100;
    const refund = safeNumber(refundAmount);
    const returnShipping = safeNumber(returnShippingCost);
    const replacement = safeNumber(replacementCost);
    const unsellable = safeNumber(unsellableRate) / 100;
    const itemCost = safeNumber(productCost);
    const cases = safeNumber(caseLosses);
    const hours = safeNumber(supportHours);
    const hourly = safeNumber(hourlyValue);

    const monthlyRevenue = orders * price;
    const baselineProfit = orders * orderProfit;
    const expectedRefunds = orders * refunds;

    const refundRevenueLoss = expectedRefunds * refund;
    const returnShippingLoss = expectedRefunds * returnShipping;
    const replacementLoss = expectedRefunds * replacement;
    const unsellableInventoryLoss = expectedRefunds * unsellable * itemCost;
    const supportTimeCost = hours * hourly;

    const totalRefundImpact =
      refundRevenueLoss +
      returnShippingLoss +
      replacementLoss +
      unsellableInventoryLoss +
      cases +
      supportTimeCost;

    const adjustedProfit = baselineProfit - totalRefundImpact;
    const adjustedMargin =
      monthlyRevenue > 0 ? (adjustedProfit / monthlyRevenue) * 100 : 0;

    const baselineMargin =
      monthlyRevenue > 0 ? (baselineProfit / monthlyRevenue) * 100 : 0;

    const profitLostShare =
      baselineProfit > 0 ? (totalRefundImpact / baselineProfit) * 100 : 0;

    const refundCostPerOrder = orders > 0 ? totalRefundImpact / orders : 0;
    const refundCostPerRefund =
      expectedRefunds > 0 ? totalRefundImpact / expectedRefunds : 0;

    const adjustedProfitPerOrder = orders > 0 ? adjustedProfit / orders : 0;

    const breakEvenRefundRate =
      orders > 0 && refundCostPerRefund > 0
        ? (baselineProfit / (orders * refundCostPerRefund)) * 100
        : 0;

    const profitGap = adjustedProfit - baselineProfit;

    const status =
      adjustedProfit < 0
        ? "Losing Money"
        : adjustedMargin < 10
          ? "High Risk"
          : adjustedMargin < 20
            ? "Manageable"
            : "Healthy";

    const statusTone: Tone =
      adjustedProfit < 0 ? "bad" : adjustedMargin < 10 ? "warn" : "good";

    const scenarios = [1, 3, 5, 8, 10, 15].map((scenarioRefundRate) => {
      const scenarioRefunds = orders * (scenarioRefundRate / 100);
      const scenarioRefundRevenueLoss = scenarioRefunds * refund;
      const scenarioReturnShippingLoss = scenarioRefunds * returnShipping;
      const scenarioReplacementLoss = scenarioRefunds * replacement;
      const scenarioUnsellableLoss = scenarioRefunds * unsellable * itemCost;
      const scenarioTotalImpact =
        scenarioRefundRevenueLoss +
        scenarioReturnShippingLoss +
        scenarioReplacementLoss +
        scenarioUnsellableLoss +
        cases +
        supportTimeCost;
      const scenarioProfit = baselineProfit - scenarioTotalImpact;
      const scenarioMargin =
        monthlyRevenue > 0 ? (scenarioProfit / monthlyRevenue) * 100 : 0;

      return {
        refundRate: scenarioRefundRate,
        refunds: scenarioRefunds,
        impact: scenarioTotalImpact,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status:
          scenarioProfit < 0
            ? "Losing"
            : scenarioMargin < 10
              ? "High Risk"
              : scenarioMargin < 20
                ? "Manageable"
                : "Healthy",
      };
    });

    return {
      orders,
      price,
      orderProfit,
      refunds,
      refund,
      returnShipping,
      replacement,
      unsellable,
      itemCost,
      cases,
      hours,
      hourly,
      monthlyRevenue,
      baselineProfit,
      expectedRefunds,
      refundRevenueLoss,
      returnShippingLoss,
      replacementLoss,
      unsellableInventoryLoss,
      supportTimeCost,
      totalRefundImpact,
      adjustedProfit,
      adjustedMargin,
      baselineMargin,
      profitLostShare,
      refundCostPerOrder,
      refundCostPerRefund,
      adjustedProfitPerOrder,
      breakEvenRefundRate,
      profitGap,
      status,
      statusTone,
      scenarios,
    };
  }, [
    monthlyOrders,
    salePrice,
    profitPerOrder,
    refundRate,
    refundAmount,
    returnShippingCost,
    replacementCost,
    unsellableRate,
    productCost,
    caseLosses,
    supportHours,
    hourlyValue,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Refund Impact Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how Amazon refunds, returns, replacement costs, unsellable
          inventory, case losses, and customer support time affect monthly
          seller profit.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Refund inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter order volume, profit per order, expected refund rate, refund
            amount, return costs, unsellable inventory assumptions, and support
            time.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Monthly performance
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly orders
              </label>
              <input
                value={monthlyOrders}
                onChange={(event) => setMonthlyOrders(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Average sale price
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={salePrice}
                  onChange={(event) => setSalePrice(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Profit per order before refunds
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={profitPerOrder}
                  onChange={(event) => setProfitPerOrder(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Refund assumptions
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Refund / return rate
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={refundRate}
                  onChange={(event) => setRefundRate(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>

              {[
                ["Refund amount per return", refundAmount, setRefundAmount],
                ["Return shipping cost", returnShippingCost, setReturnShippingCost],
                ["Replacement cost", replacementCost, setReplacementCost],
                ["Product cost", productCost, setProductCost],
                ["Monthly case losses", caseLosses, setCaseLosses],
              ].map(([label, value, setter]) => (
                <div key={label as string}>
                  <label className="mt-3 block text-sm font-medium text-gray-700">
                    {label as string}
                  </label>
                  <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      value={value as string}
                      onChange={(event) =>
                        (setter as (value: string) => void)(event.target.value)
                      }
                      className="w-full rounded-r-lg px-3 py-2 outline-none"
                      inputMode="decimal"
                    />
                  </div>
                </div>
              ))}

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Unsellable return rate
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={unsellableRate}
                  onChange={(event) => setUnsellableRate(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Support time
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly support hours
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={supportHours}
                  onChange={(event) => setSupportHours(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">hr</span>
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Hourly time value
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={hourlyValue}
                  onChange={(event) => setHourlyValue(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon refund costs, return
            reasons, reimbursements, shipping costs, replacement costs, case
            outcomes, and seller-specific losses may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon refund and return impact.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                results.statusTone === "good"
                  ? "bg-green-100 text-green-700"
                  : results.statusTone === "warn"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {results.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ResultCard
              title="Adjusted monthly profit"
              value={money(results.adjustedProfit)}
              note="Monthly profit after expected refund and case losses"
              tone={results.statusTone}
            />

            <ResultCard
              title="Total refund impact"
              value={money(results.totalRefundImpact)}
              note="Refund revenue loss, return shipping, replacements, unsellable inventory, cases, and support time"
              tone="warn"
            />

            <ResultCard
              title="Baseline monthly profit"
              value={money(results.baselineProfit)}
              note="Profit before refund and return impact"
              tone="blue"
            />

            <ResultCard
              title="Adjusted margin"
              value={percent(results.adjustedMargin)}
              note="Adjusted profit divided by monthly revenue"
              tone={results.statusTone}
            />

            <ResultCard
              title="Expected refunds"
              value={numberFormat(results.expectedRefunds)}
              note="Monthly orders multiplied by refund rate"
              tone="warn"
            />

            <ResultCard
              title="Refund revenue loss"
              value={money(results.refundRevenueLoss)}
              note="Expected refunds multiplied by refund amount"
              tone="warn"
            />

            <ResultCard
              title="Return shipping loss"
              value={money(results.returnShippingLoss)}
              note="Expected refunds multiplied by return shipping cost"
              tone="warn"
            />

            <ResultCard
              title="Replacement loss"
              value={money(results.replacementLoss)}
              note="Expected refunds multiplied by replacement cost"
              tone="warn"
            />

            <ResultCard
              title="Unsellable inventory loss"
              value={money(results.unsellableInventoryLoss)}
              note="Expected refunds multiplied by unsellable rate and product cost"
              tone="warn"
            />

            <ResultCard
              title="Support time cost"
              value={money(results.supportTimeCost)}
              note="Monthly support hours multiplied by hourly value"
              tone="warn"
            />

            <ResultCard
              title="Profit lost to refunds"
              value={percent(results.profitLostShare)}
              note="Total refund impact divided by baseline profit"
              tone={results.profitLostShare > 25 ? "warn" : "good"}
            />

            <ResultCard
              title="Refund cost per order"
              value={money(results.refundCostPerOrder)}
              note="Total refund impact divided by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Refund cost per refund"
              value={money(results.refundCostPerRefund)}
              note="Total refund impact divided by expected refunds"
              tone="warn"
            />

            <ResultCard
              title="Adjusted profit/order"
              value={money(results.adjustedProfitPerOrder)}
              note="Adjusted monthly profit divided by monthly orders"
              tone={results.adjustedProfitPerOrder > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Break-even refund rate"
              value={percent(results.breakEvenRefundRate)}
              note="Approximate refund rate where baseline profit is erased"
              tone="warn"
            />

            <ResultCard
              title="Monthly revenue"
              value={money(results.monthlyRevenue)}
              note="Monthly orders multiplied by sale price"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                Expected refund and return costs reduce monthly profit by{" "}
                <strong className="text-gray-950">
                  {money(results.totalRefundImpact)}
                </strong>
                .
              </p>

              <p>
                Baseline monthly profit is{" "}
                <strong className="text-gray-950">
                  {money(results.baselineProfit)}
                </strong>
                , while adjusted monthly profit is{" "}
                <strong className="text-gray-950">
                  {money(results.adjustedProfit)}
                </strong>
                .
              </p>

              <p>
                Expected refunds are{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.expectedRefunds)}
                </strong>{" "}
                per month under the entered refund rate.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Refund rate scenario comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Refund rate</th>
                    <th className="px-4 py-3">Refunds</th>
                    <th className="px-4 py-3">Impact</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.refundRate}
                      className={
                        Math.abs(scenario.refundRate / 100 - results.refunds) <
                        0.001
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">
                        {percent(scenario.refundRate)}
                      </td>
                      <td className="px-4 py-3">
                        {numberFormat(scenario.refunds)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.impact)}</td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.margin)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Losing"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "High Risk"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {scenario.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Amazon Refund Impact Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter baseline profit",
              "Add monthly orders, sale price, and profit per order before refund impact.",
            ],
            [
              "Add refund rate",
              "Enter your expected refund or return rate for the product or store.",
            ],
            [
              "Add return costs",
              "Include refund amount, return shipping, replacement cost, unsellable inventory, and cases.",
            ],
            [
              "Review adjusted profit",
              "Compare baseline profit against adjusted profit after refund-related losses.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Refund impact breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which refund-related costs are reducing monthly profit.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Refund revenue loss", results.refundRevenueLoss],
              ["Return shipping loss", results.returnShippingLoss],
              ["Replacement loss", results.replacementLoss],
              ["Unsellable inventory loss", results.unsellableInventoryLoss],
              ["Case losses", results.cases],
              ["Support time cost", results.supportTimeCost],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {money(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {percent(
                    results.totalRefundImpact > 0
                      ? ((value as number) / results.totalRefundImpact) * 100
                      : 0,
                  )}{" "}
                  of total refund impact
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon refund mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating refunded revenue as if it still produced profit.",
              "Ignoring return shipping, replacement shipments, and damaged inventory.",
              "Assuming every returned item can be resold at full price.",
              "Forgetting customer support time and case losses.",
              "Pricing products without refund and return allowance.",
              "Restocking products with repeated return issues before fixing the listing or packaging.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-red-100 px-2 text-xs font-bold text-red-600">
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Understanding your refund impact result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Healthy:</strong> Refunds and
              returns appear manageable under the entered assumptions.
            </p>

            <p>
              <strong className="text-green-700">Manageable:</strong> Refunds
              are reducing profit, but the product may still work if margins
              remain useful.
            </p>

            <p>
              <strong className="text-amber-700">High Risk:</strong> Refunds,
              returns, cases, or support time may be taking too much profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Refund
              impact may erase the product’s monthly profit under these
              assumptions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Monthly orders, sale price, and profit per order before refunds.",
              "Expected refund rate and number of monthly refunds.",
              "Refund amount, return shipping, replacement costs, and case losses.",
              "Unsellable inventory rate and product cost per returned unit.",
              "Customer support time, inspection time, repacking time, and issue handling.",
              "Return reasons, product quality, packaging, listing accuracy, and buyer expectations.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce Amazon refund impact
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve listing accuracy",
              "Use clearer photos, dimensions, compatibility notes, condition details, and product expectations.",
            ],
            [
              "Improve packaging",
              "Use stronger packaging to reduce damage, missing parts, and avoidable return claims.",
            ],
            [
              "Track return reasons",
              "Review repeated refund causes so weak products or unclear listings can be fixed.",
            ],
            [
              "Build in allowance",
              "Include a realistic refund and return allowance when setting product prices.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Amazon seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/amazon/profit-calculator", "Profit Calculator"],
            ["/amazon/listing-roi-calculator", "Listing ROI Calculator"],
            ["/amazon/product-cost-calculator", "Product Cost Calculator"],
            ["/amazon/pricing-calculator", "Pricing Calculator"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}