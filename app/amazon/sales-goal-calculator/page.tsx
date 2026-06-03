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

export default function AmazonSalesGoalCalculatorPage() {
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState("2000");
  const [averageSalePrice, setAverageSalePrice] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("8");
  const [conversionRate, setConversionRate] = useState("8");
  const [activeListings, setActiveListings] = useState("20");
  const [currentMonthlyOrders, setCurrentMonthlyOrders] = useState("160");
  const [currentMonthlySessions, setCurrentMonthlySessions] = useState("2500");
  const [ppcBudget, setPpcBudget] = useState("300");
  const [refundAllowance, setRefundAllowance] = useState("100");
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState("150");
  const [inventoryCostPerOrder, setInventoryCostPerOrder] = useState("12");

  const results = useMemo(() => {
    const goal = safeNumber(targetMonthlyProfit);
    const salePrice = safeNumber(averageSalePrice);
    const orderProfit = safeNumber(profitPerOrder);
    const conversion = safeNumber(conversionRate) / 100;
    const listings = safeNumber(activeListings);
    const currentOrders = safeNumber(currentMonthlyOrders);
    const currentSessions = safeNumber(currentMonthlySessions);
    const ppc = safeNumber(ppcBudget);
    const refunds = safeNumber(refundAllowance);
    const fixedCosts = safeNumber(monthlyFixedCosts);
    const inventoryCost = safeNumber(inventoryCostPerOrder);

    const overhead = ppc + refunds + fixedCosts;
    const adjustedGoal = goal + overhead;

    const requiredOrders =
      orderProfit > 0 ? Math.ceil(adjustedGoal / orderProfit) : 0;

    const requiredRevenue = requiredOrders * salePrice;

    const requiredSessions =
      conversion > 0 ? Math.ceil(requiredOrders / conversion) : 0;

    const requiredOrdersPerDay = requiredOrders / 30;
    const requiredRevenuePerDay = requiredRevenue / 30;
    const requiredSessionsPerDay = requiredSessions / 30;

    const requiredOrdersPerListing =
      listings > 0 ? requiredOrders / listings : 0;

    const requiredSessionsPerListing =
      listings > 0 ? requiredSessions / listings : 0;

    const currentGrossProfit = currentOrders * orderProfit;
    const currentNetProfit = currentGrossProfit - overhead;
    const currentRevenue = currentOrders * salePrice;

    const currentConversion =
      currentSessions > 0 ? (currentOrders / currentSessions) * 100 : 0;

    const orderGap = Math.max(0, requiredOrders - currentOrders);
    const sessionGap = Math.max(0, requiredSessions - currentSessions);
    const revenueGap = Math.max(0, requiredRevenue - currentRevenue);
    const profitGap = Math.max(0, goal - currentNetProfit);

    const inventoryNeeded = requiredOrders * inventoryCost;
    const extraInventoryNeeded = orderGap * inventoryCost;

    const goalProgress = goal > 0 ? (currentNetProfit / goal) * 100 : 0;
    const orderProgress =
      requiredOrders > 0 ? (currentOrders / requiredOrders) * 100 : 0;
    const trafficProgress =
      requiredSessions > 0 ? (currentSessions / requiredSessions) * 100 : 0;

    const ppcCostPerRequiredOrder =
      requiredOrders > 0 ? ppc / requiredOrders : 0;

    const profitPerSession =
      currentSessions > 0 ? currentNetProfit / currentSessions : 0;

    const revenuePerSession =
      currentSessions > 0 ? currentRevenue / currentSessions : 0;

    const status =
      goalProgress >= 100
        ? "Goal Reached"
        : goalProgress >= 75
          ? "Close"
          : goalProgress >= 40
            ? "Needs Growth"
            : "Large Gap";

    const statusTone: Tone =
      goalProgress >= 100
        ? "good"
        : goalProgress >= 75
          ? "good"
          : goalProgress >= 40
            ? "warn"
            : "bad";

    const scenarios = [500, 1000, 2000, 3000, 5000].map((scenarioGoal) => {
      const scenarioAdjustedGoal = scenarioGoal + overhead;
      const scenarioOrders =
        orderProfit > 0 ? Math.ceil(scenarioAdjustedGoal / orderProfit) : 0;
      const scenarioRevenue = scenarioOrders * salePrice;
      const scenarioSessions =
        conversion > 0 ? Math.ceil(scenarioOrders / conversion) : 0;
      const scenarioInventory = scenarioOrders * inventoryCost;

      return {
        goal: scenarioGoal,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        sessions: scenarioSessions,
        inventory: scenarioInventory,
        ordersPerDay: scenarioOrders / 30,
      };
    });

    return {
      goal,
      salePrice,
      orderProfit,
      conversion,
      listings,
      currentOrders,
      currentSessions,
      ppc,
      refunds,
      fixedCosts,
      inventoryCost,
      overhead,
      adjustedGoal,
      requiredOrders,
      requiredRevenue,
      requiredSessions,
      requiredOrdersPerDay,
      requiredRevenuePerDay,
      requiredSessionsPerDay,
      requiredOrdersPerListing,
      requiredSessionsPerListing,
      currentGrossProfit,
      currentNetProfit,
      currentRevenue,
      currentConversion,
      orderGap,
      sessionGap,
      revenueGap,
      profitGap,
      inventoryNeeded,
      extraInventoryNeeded,
      goalProgress,
      orderProgress,
      trafficProgress,
      ppcCostPerRequiredOrder,
      profitPerSession,
      revenuePerSession,
      status,
      statusTone,
      scenarios,
    };
  }, [
    targetMonthlyProfit,
    averageSalePrice,
    profitPerOrder,
    conversionRate,
    activeListings,
    currentMonthlyOrders,
    currentMonthlySessions,
    ppcBudget,
    refundAllowance,
    monthlyFixedCosts,
    inventoryCostPerOrder,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Sales Goal Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how many Amazon orders, sessions, listings, and inventory
          dollars are needed to reach a monthly revenue or profit goal after
          PPC, refunds, fixed costs, and selling expenses.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Sales goal inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your monthly profit goal, average order value, profit per
            order, conversion rate, current performance, PPC, refunds, fixed
            costs, and inventory cost.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Goal and order economics
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Target monthly profit
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={targetMonthlyProfit}
                  onChange={(event) =>
                    setTargetMonthlyProfit(event.target.value)
                  }
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

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
                Expected conversion rate
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={conversionRate}
                  onChange={(event) => setConversionRate(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Current performance
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Active listings
              </label>
              <input
                value={activeListings}
                onChange={(event) => setActiveListings(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Current monthly orders
              </label>
              <input
                value={currentMonthlyOrders}
                onChange={(event) =>
                  setCurrentMonthlyOrders(event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Current monthly sessions
              </label>
              <input
                value={currentMonthlySessions}
                onChange={(event) =>
                  setCurrentMonthlySessions(event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Goal costs and inventory
              </p>

              {[
                ["Monthly PPC budget", ppcBudget, setPpcBudget],
                ["Refund allowance", refundAllowance, setRefundAllowance],
                ["Monthly fixed costs", monthlyFixedCosts, setMonthlyFixedCosts],
                [
                  "Inventory cost per order",
                  inventoryCostPerOrder,
                  setInventoryCostPerOrder,
                ],
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
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon conversion rates,
            order volume, PPC results, refunds, inventory cost, search rank,
            buy box behavior, and seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated sales volume needed to reach your Amazon goal.
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
              title="Required orders"
              value={numberFormat(results.requiredOrders)}
              note="Estimated orders needed to reach the monthly profit goal"
              tone={results.statusTone}
            />

            <ResultCard
              title="Required revenue"
              value={money(results.requiredRevenue)}
              note="Required orders multiplied by average sale price"
              tone="blue"
            />

            <ResultCard
              title="Required sessions"
              value={numberFormat(results.requiredSessions)}
              note="Estimated sessions needed at the entered conversion rate"
              tone="warn"
            />

            <ResultCard
              title="Goal progress"
              value={percent(results.goalProgress)}
              note="Current net profit divided by target monthly profit"
              tone={results.statusTone}
            />

            <ResultCard
              title="Current net profit"
              value={money(results.currentNetProfit)}
              note="Current gross profit minus PPC, refunds, and fixed costs"
              tone={results.currentNetProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Profit gap"
              value={money(results.profitGap)}
              note="Remaining profit needed to reach the monthly goal"
              tone={results.profitGap > 0 ? "warn" : "good"}
            />

            <ResultCard
              title="Order gap"
              value={numberFormat(results.orderGap)}
              note="Additional monthly orders needed to reach the goal"
              tone={results.orderGap > 0 ? "warn" : "good"}
            />

            <ResultCard
              title="Session gap"
              value={numberFormat(results.sessionGap)}
              note="Additional monthly sessions needed at the entered conversion rate"
              tone={results.sessionGap > 0 ? "warn" : "good"}
            />

            <ResultCard
              title="Orders per day"
              value={numberFormat(results.requiredOrdersPerDay)}
              note="Required monthly orders divided by 30 days"
              tone="blue"
            />

            <ResultCard
              title="Revenue per day"
              value={money(results.requiredRevenuePerDay)}
              note="Required monthly revenue divided by 30 days"
              tone="blue"
            />

            <ResultCard
              title="Sessions per day"
              value={numberFormat(results.requiredSessionsPerDay)}
              note="Required monthly sessions divided by 30 days"
              tone="warn"
            />

            <ResultCard
              title="Orders per listing"
              value={numberFormat(results.requiredOrdersPerListing)}
              note="Required monthly orders divided by active listings"
              tone="blue"
            />

            <ResultCard
              title="Sessions per listing"
              value={numberFormat(results.requiredSessionsPerListing)}
              note="Required sessions divided by active listings"
              tone="blue"
            />

            <ResultCard
              title="Inventory needed"
              value={money(results.inventoryNeeded)}
              note="Required orders multiplied by inventory cost per order"
              tone="warn"
            />

            <ResultCard
              title="Extra inventory needed"
              value={money(results.extraInventoryNeeded)}
              note="Order gap multiplied by inventory cost per order"
              tone={results.extraInventoryNeeded > 0 ? "warn" : "good"}
            />

            <ResultCard
              title="Current conversion"
              value={percent(results.currentConversion)}
              note="Current orders divided by current sessions"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                To reach{" "}
                <strong className="text-gray-950">
                  {money(results.goal)}
                </strong>{" "}
                in monthly profit, this estimate needs about{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.requiredOrders)}
                </strong>{" "}
                orders and{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.requiredSessions)}
                </strong>{" "}
                sessions.
              </p>

              <p>
                Current estimated net profit is{" "}
                <strong className="text-gray-950">
                  {money(results.currentNetProfit)}
                </strong>
                , leaving a profit gap of{" "}
                <strong className="text-gray-950">
                  {money(results.profitGap)}
                </strong>
                .
              </p>

              <p>
                At the entered inventory cost, the required order volume may
                require about{" "}
                <strong className="text-gray-950">
                  {money(results.inventoryNeeded)}
                </strong>{" "}
                in inventory.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Profit goal scenario comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Goal</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Sessions</th>
                    <th className="px-4 py-3">Inventory</th>
                    <th className="px-4 py-3">Orders/day</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.goal}
                      className={
                        Math.abs(scenario.goal - results.goal) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">{money(scenario.goal)}</td>
                      <td className="px-4 py-3">
                        {numberFormat(scenario.orders)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.revenue)}</td>
                      <td className="px-4 py-3">
                        {numberFormat(scenario.sessions)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.inventory)}</td>
                      <td className="px-4 py-3">
                        {numberFormat(scenario.ordersPerDay)}
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
          How to use this Amazon Sales Goal Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Set profit goal",
              "Enter the monthly profit target you want the Amazon account to reach.",
            ],
            [
              "Add order economics",
              "Enter average sale price, profit per order, conversion rate, and inventory cost.",
            ],
            [
              "Add current results",
              "Include current monthly orders, sessions, active listings, PPC, refunds, and fixed costs.",
            ],
            [
              "Review gaps",
              "Compare required orders, sessions, inventory, revenue, and current progress.",
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
            Sales goal breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review the main numbers driving your Amazon sales goal.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Target monthly profit", results.goal],
              ["PPC budget", results.ppc],
              ["Refund allowance", results.refunds],
              ["Monthly fixed costs", results.fixedCosts],
              ["Total overhead", results.overhead],
              ["Adjusted profit requirement", results.adjustedGoal],
              ["Current revenue", results.currentRevenue],
              ["Current gross profit", results.currentGrossProfit],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {money(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Used to estimate your required monthly order volume and growth
                  gap.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon sales goal mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Setting revenue goals without checking profit per order.",
              "Ignoring PPC, refunds, fixed costs, product costs, and fulfillment costs.",
              "Assuming more orders automatically means more profit.",
              "Using unrealistic conversion rates when estimating required traffic.",
              "Scaling ads before confirming that inventory and fulfillment can support the goal.",
              "Ignoring cash tied up in inventory when planning a larger monthly target.",
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
            Understanding your Amazon sales goal result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Goal Reached:</strong> Current
              estimated net profit meets or exceeds the entered monthly goal.
            </p>

            <p>
              <strong className="text-green-700">Close:</strong> Current
              results are near the target, but more orders, better margin, or
              more traffic may still be needed.
            </p>

            <p>
              <strong className="text-amber-700">Needs Growth:</strong> The
              account likely needs more sessions, stronger conversion, higher
              profit per order, or more active listings.
            </p>

            <p>
              <strong className="text-red-700">Large Gap:</strong> The entered
              goal may require major improvements in traffic, conversion,
              inventory, pricing, or profit per order.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Target monthly profit, revenue, or order goal.",
              "Average sale price and profit per order after Amazon fees and fulfillment costs.",
              "Expected conversion rate and required sessions.",
              "PPC budget, refund allowance, fixed costs, and other monthly overhead.",
              "Current monthly orders, sessions, conversion rate, and net profit.",
              "Inventory cost, restock timing, fulfillment capacity, and cash flow.",
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
          Ways to reach an Amazon sales goal
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Increase traffic",
              "Improve search visibility, PPC targeting, external traffic, and listing reach.",
            ],
            [
              "Improve conversion",
              "Upgrade photos, title, bullets, reviews, price, offer quality, and buyer trust.",
            ],
            [
              "Raise profit per order",
              "Improve sourcing, pricing, fulfillment costs, bundles, and refund prevention.",
            ],
            [
              "Protect capacity",
              "Make sure inventory, restock timing, shipping, and customer support can handle the target volume.",
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
            ["/amazon/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/amazon/inventory-restock-calculator", "Inventory Restock Calculator"],
            ["/amazon/listing-roi-calculator", "Listing ROI Calculator"],
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