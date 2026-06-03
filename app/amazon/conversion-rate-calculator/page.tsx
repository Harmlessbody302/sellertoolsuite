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

export default function AmazonConversionRateCalculatorPage() {
  const [monthlySessions, setMonthlySessions] = useState("3000");
  const [monthlyOrders, setMonthlyOrders] = useState("240");
  const [activeListings, setActiveListings] = useState("20");
  const [averageSalePrice, setAverageSalePrice] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("8");
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState("2000");
  const [ppcSpend, setPpcSpend] = useState("300");
  const [refundRate, setRefundRate] = useState("4");
  const [returnCostPerRefund, setReturnCostPerRefund] = useState("6");

  const results = useMemo(() => {
    const sessions = safeNumber(monthlySessions);
    const orders = safeNumber(monthlyOrders);
    const listings = safeNumber(activeListings);
    const salePrice = safeNumber(averageSalePrice);
    const orderProfit = safeNumber(profitPerOrder);
    const profitGoal = safeNumber(targetMonthlyProfit);
    const adSpend = safeNumber(ppcSpend);
    const refunds = safeNumber(refundRate) / 100;
    const refundCost = safeNumber(returnCostPerRefund);

    const conversionRate = sessions > 0 ? (orders / sessions) * 100 : 0;
    const monthlyRevenue = orders * salePrice;
    const grossMonthlyProfit = orders * orderProfit;
    const estimatedRefunds = orders * refunds;
    const refundLoss = estimatedRefunds * refundCost;
    const netMonthlyProfit = grossMonthlyProfit - adSpend - refundLoss;
    const profitPerSession = sessions > 0 ? netMonthlyProfit / sessions : 0;
    const revenuePerSession = sessions > 0 ? monthlyRevenue / sessions : 0;
    const ordersPerListing = listings > 0 ? orders / listings : 0;
    const sessionsPerListing = listings > 0 ? sessions / listings : 0;

    const sessionsNeededForGoal =
      profitPerSession > 0 ? Math.ceil(profitGoal / profitPerSession) : 0;

    const ordersNeededForGoal =
      orderProfit > 0
        ? Math.ceil((profitGoal + adSpend + refundLoss) / orderProfit)
        : 0;

    const extraOrdersNeeded = Math.max(0, ordersNeededForGoal - orders);
    const extraSessionsNeeded = Math.max(0, sessionsNeededForGoal - sessions);

    const requiredConversionForGoal =
      sessions > 0 ? (ordersNeededForGoal / sessions) * 100 : 0;

    const ppcCostPerOrder = orders > 0 ? adSpend / orders : 0;
    const ppcCostPerSession = sessions > 0 ? adSpend / sessions : 0;
    const refundAdjustedProfit = orders > 0 ? netMonthlyProfit / orders : 0;

    const status =
      conversionRate < 3
        ? "Low"
        : conversionRate < 8
          ? "Healthy"
          : "Strong";

    const statusTone: Tone = conversionRate < 3 ? "warn" : "good";

    const scenarios = [2, 4, 6, 8, 10, 12].map((rate) => {
      const scenarioOrders = Math.round(sessions * (rate / 100));
      const scenarioRevenue = scenarioOrders * salePrice;
      const scenarioGrossProfit = scenarioOrders * orderProfit;
      const scenarioRefunds = scenarioOrders * refunds;
      const scenarioRefundLoss = scenarioRefunds * refundCost;
      const scenarioProfit =
        scenarioGrossProfit - adSpend - scenarioRefundLoss;
      const scenarioProfitPerSession =
        sessions > 0 ? scenarioProfit / sessions : 0;

      return {
        rate,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        profitPerSession: scenarioProfitPerSession,
        status:
          scenarioProfit <= 0
            ? "Weak"
            : rate < 3
              ? "Low"
              : rate < 8
                ? "Healthy"
                : "Strong",
      };
    });

    return {
      sessions,
      orders,
      listings,
      salePrice,
      orderProfit,
      profitGoal,
      adSpend,
      refunds,
      refundCost,
      conversionRate,
      monthlyRevenue,
      grossMonthlyProfit,
      estimatedRefunds,
      refundLoss,
      netMonthlyProfit,
      profitPerSession,
      revenuePerSession,
      ordersPerListing,
      sessionsPerListing,
      sessionsNeededForGoal,
      ordersNeededForGoal,
      extraOrdersNeeded,
      extraSessionsNeeded,
      requiredConversionForGoal,
      ppcCostPerOrder,
      ppcCostPerSession,
      refundAdjustedProfit,
      status,
      statusTone,
      scenarios,
    };
  }, [
    monthlySessions,
    monthlyOrders,
    activeListings,
    averageSalePrice,
    profitPerOrder,
    targetMonthlyProfit,
    ppcSpend,
    refundRate,
    returnCostPerRefund,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Conversion Rate Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon listing conversion rate, monthly orders, revenue,
          profit per session, PPC pressure, refund-adjusted profit, and the
          traffic needed to reach a target monthly profit goal.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Conversion inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter Amazon sessions, orders, listing count, average sale price,
            profit per order, PPC spend, and refund assumptions to estimate
            conversion performance.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Listing performance
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly sessions
              </label>
              <input
                value={monthlySessions}
                onChange={(event) => setMonthlySessions(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

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
                Active listings
              </label>
              <input
                value={activeListings}
                onChange={(event) => setActiveListings(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Order value and profit
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Average sale price
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={averageSalePrice}
                  onChange={(event) => setAverageSalePrice(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Profit per order
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

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Target monthly profit
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={targetMonthlyProfit}
                  onChange={(event) => setTargetMonthlyProfit(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                PPC and return assumptions
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly PPC spend
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={ppcSpend}
                  onChange={(event) => setPpcSpend(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

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

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Return cost per refund
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={returnCostPerRefund}
                  onChange={(event) =>
                    setReturnCostPerRefund(event.target.value)
                  }
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon sessions, conversion
            rate, search rank, buy box status, PPC performance, refund rate,
            reviews, pricing, and seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon conversion performance.
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
              title="Conversion rate"
              value={percent(results.conversionRate)}
              note="Monthly orders divided by monthly sessions"
              tone={results.statusTone}
            />

            <ResultCard
              title="Monthly orders"
              value={numberFormat(results.orders)}
              note="Orders entered for the review period"
              tone="good"
            />

            <ResultCard
              title="Monthly revenue"
              value={money(results.monthlyRevenue)}
              note="Monthly orders multiplied by average sale price"
              tone="blue"
            />

            <ResultCard
              title="Net monthly profit"
              value={money(results.netMonthlyProfit)}
              note="Gross profit minus PPC spend and refund loss"
              tone={results.netMonthlyProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Profit per session"
              value={money(results.profitPerSession)}
              note="Net monthly profit divided by sessions"
              tone={results.profitPerSession > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Revenue per session"
              value={money(results.revenuePerSession)}
              note="Monthly revenue divided by sessions"
              tone="blue"
            />

            <ResultCard
              title="Orders per listing"
              value={numberFormat(results.ordersPerListing)}
              note="Monthly orders divided by active listings"
              tone="good"
            />

            <ResultCard
              title="Sessions per listing"
              value={numberFormat(results.sessionsPerListing)}
              note="Monthly sessions divided by active listings"
              tone="blue"
            />

            <ResultCard
              title="Sessions needed for goal"
              value={numberFormat(results.sessionsNeededForGoal)}
              note="Estimated sessions needed to reach target monthly profit"
              tone="warn"
            />

            <ResultCard
              title="Orders needed for goal"
              value={numberFormat(results.ordersNeededForGoal)}
              note="Estimated orders needed to reach target monthly profit"
              tone="warn"
            />

            <ResultCard
              title="Extra sessions needed"
              value={numberFormat(results.extraSessionsNeeded)}
              note="Additional monthly sessions needed to reach profit goal"
              tone={results.extraSessionsNeeded > 0 ? "warn" : "good"}
            />

            <ResultCard
              title="Extra orders needed"
              value={numberFormat(results.extraOrdersNeeded)}
              note="Additional monthly orders needed to reach profit goal"
              tone={results.extraOrdersNeeded > 0 ? "warn" : "good"}
            />

            <ResultCard
              title="Required conversion for goal"
              value={percent(results.requiredConversionForGoal)}
              note="Conversion rate needed with current sessions to reach goal"
              tone={
                results.requiredConversionForGoal > results.conversionRate
                  ? "warn"
                  : "good"
              }
            />

            <ResultCard
              title="PPC cost per order"
              value={money(results.ppcCostPerOrder)}
              note="Monthly PPC spend divided by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Estimated refunds"
              value={numberFormat(results.estimatedRefunds)}
              note="Monthly orders multiplied by refund rate"
              tone="warn"
            />

            <ResultCard
              title="Refund-adjusted profit/order"
              value={money(results.refundAdjustedProfit)}
              note="Net monthly profit divided by monthly orders"
              tone={results.refundAdjustedProfit > 0 ? "good" : "bad"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                Your Amazon listing conversion rate is estimated at{" "}
                <strong className="text-gray-950">
                  {percent(results.conversionRate)}
                </strong>
                , based on{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.sessions)}
                </strong>{" "}
                sessions and{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.orders)}
                </strong>{" "}
                orders.
              </p>

              <p>
                Estimated monthly revenue is{" "}
                <strong className="text-gray-950">
                  {money(results.monthlyRevenue)}
                </strong>
                , and net monthly profit after PPC and refund loss is{" "}
                <strong className="text-gray-950">
                  {money(results.netMonthlyProfit)}
                </strong>
                .
              </p>

              <p>
                To reach a target profit of{" "}
                <strong className="text-gray-950">
                  {money(results.profitGoal)}
                </strong>
                , this estimate needs about{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.sessionsNeededForGoal)} sessions
                </strong>{" "}
                or{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.ordersNeededForGoal)} orders
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Conversion scenario comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Conversion</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Profit/session</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.rate}
                      className={
                        Math.abs(scenario.rate - results.conversionRate) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">{percent(scenario.rate)}</td>
                      <td className="px-4 py-3">
                        {numberFormat(scenario.orders)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.revenue)}</td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">
                        {money(scenario.profitPerSession)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Weak"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "Low"
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
          How to use this Amazon Conversion Rate Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sessions",
              "Add monthly Amazon sessions or listing visits for the review period.",
            ],
            [
              "Enter orders",
              "Add monthly orders generated from those sessions.",
            ],
            [
              "Add profit",
              "Enter average sale price, profit per order, PPC spend, and refund assumptions.",
            ],
            [
              "Review goal gap",
              "Compare current conversion, sessions, orders, and profit against your target goal.",
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
            Amazon conversion performance breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how sessions, orders, PPC, refunds, and profit affect
            conversion performance.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Monthly sessions", results.sessions],
              ["Monthly orders", results.orders],
              ["Conversion rate", results.conversionRate],
              ["Revenue per session", results.revenuePerSession],
              ["Profit per session", results.profitPerSession],
              ["PPC cost per order", results.ppcCostPerOrder],
              ["Estimated refunds", results.estimatedRefunds],
              ["Refund loss", results.refundLoss],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {label === "Conversion rate"
                      ? percent(value as number)
                      : label === "Revenue per session" ||
                          label === "Profit per session" ||
                          label === "PPC cost per order" ||
                          label === "Refund loss"
                        ? money(value as number)
                        : numberFormat(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Used to estimate Amazon traffic efficiency and sales goal
                  progress.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon conversion mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging a listing by sessions alone without checking orders or profit.",
              "Increasing PPC spend before improving images, price, reviews, title, and offer quality.",
              "Assuming more sessions will fix a listing with weak conversion or poor profit per order.",
              "Ignoring whether converted orders remain profitable after referral fees, fulfillment, PPC, and refunds.",
              "Comparing conversion rates across unrelated products, price ranges, or categories.",
              "Changing too many listing elements at once without knowing what improved performance.",
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
            Understanding your Amazon conversion results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The listing
              appears to turn sessions into orders efficiently under the entered
              assumptions.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> Conversion
              appears workable, but profit, PPC, refunds, and listing quality
              should still be reviewed.
            </p>

            <p>
              <strong className="text-amber-700">Low:</strong> The listing may
              need better images, reviews, price, offer quality, keyword match,
              or product-market fit.
            </p>

            <p>
              <strong className="text-red-700">Weak:</strong> The entered
              traffic may not be producing enough profitable orders.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Amazon sessions or listing visits during the review period.",
              "Orders generated during the same review period.",
              "Average sale price and profit per order after fees and fulfillment costs.",
              "PPC spend, refund rate, return cost, and customer issue risk.",
              "Active listing count and sessions per listing.",
              "Listing images, reviews, title, price, offer quality, stock status, and buy box competitiveness.",
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
          Ways to improve Amazon conversion
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve images",
              "Use clear main images, lifestyle images, infographics, and accurate product details.",
            ],
            [
              "Improve offer quality",
              "Review price, shipping promise, stock status, reviews, and buy box competitiveness.",
            ],
            [
              "Improve keywords",
              "Match title, bullets, backend terms, and PPC traffic to the product buyers actually want.",
            ],
            [
              "Review PPC",
              "Use PPC to bring qualified traffic, but reduce spend if sessions do not produce profitable orders.",
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
            ["/amazon/sales-goal-calculator", "Sales Goal Calculator"],
            ["/amazon/listing-roi-calculator", "Listing ROI Calculator"],
            ["/amazon/ppc-roi-calculator", "PPC ROI Calculator"],
            ["/amazon/profit-calculator", "Profit Calculator"],
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