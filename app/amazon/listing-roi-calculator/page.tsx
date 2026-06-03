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

export default function AmazonListingRoiCalculatorPage() {
  const [monthlySessions, setMonthlySessions] = useState("3000");
  const [monthlyOrders, setMonthlyOrders] = useState("240");
  const [averageSalePrice, setAverageSalePrice] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("8");
  const [ppcSpend, setPpcSpend] = useState("300");
  const [storageCost, setStorageCost] = useState("60");
  const [listingMaintenanceCost, setListingMaintenanceCost] = useState("25");
  const [optimizationCost, setOptimizationCost] = useState("50");
  const [inventoryTiedUp, setInventoryTiedUp] = useState("1200");
  const [monthlyRefundLoss, setMonthlyRefundLoss] = useState("120");
  const [timeHours, setTimeHours] = useState("5");
  const [hourlyValue, setHourlyValue] = useState("20");

  const results = useMemo(() => {
    const sessions = safeNumber(monthlySessions);
    const orders = safeNumber(monthlyOrders);
    const salePrice = safeNumber(averageSalePrice);
    const orderProfit = safeNumber(profitPerOrder);
    const adSpend = safeNumber(ppcSpend);
    const storage = safeNumber(storageCost);
    const maintenance = safeNumber(listingMaintenanceCost);
    const optimization = safeNumber(optimizationCost);
    const inventory = safeNumber(inventoryTiedUp);
    const refunds = safeNumber(monthlyRefundLoss);
    const hours = safeNumber(timeHours);
    const hourly = safeNumber(hourlyValue);

    const monthlyRevenue = orders * salePrice;
    const grossListingProfit = orders * orderProfit;
    const timeCost = hours * hourly;

    const totalInvestment =
      adSpend + storage + maintenance + optimization + refunds + timeCost;

    const netListingProfit = grossListingProfit - totalInvestment;

    const listingRoi =
      totalInvestment > 0 ? (netListingProfit / totalInvestment) * 100 : 0;

    const profitMargin =
      monthlyRevenue > 0 ? (netListingProfit / monthlyRevenue) * 100 : 0;

    const grossMargin =
      monthlyRevenue > 0 ? (grossListingProfit / monthlyRevenue) * 100 : 0;

    const conversionRate = sessions > 0 ? (orders / sessions) * 100 : 0;
    const revenuePerSession = sessions > 0 ? monthlyRevenue / sessions : 0;
    const profitPerSession = sessions > 0 ? netListingProfit / sessions : 0;

    const grossProfitPerSession =
      sessions > 0 ? grossListingProfit / sessions : 0;

    const adCostPerOrder = orders > 0 ? adSpend / orders : 0;
    const breakEvenOrders =
      orderProfit > 0 ? Math.ceil(totalInvestment / orderProfit) : 0;
    const orderGap = orders - breakEvenOrders;

    const inventoryTurnover =
      inventory > 0 ? (monthlyRevenue / inventory) * 100 : 0;

    const inventoryReturn =
      inventory > 0 ? (netListingProfit / inventory) * 100 : 0;

    const costPerSession = sessions > 0 ? totalInvestment / sessions : 0;

    const maintenanceShare =
      totalInvestment > 0 ? (maintenance / totalInvestment) * 100 : 0;

    const adSpendShare =
      totalInvestment > 0 ? (adSpend / totalInvestment) * 100 : 0;

    const refundShare =
      totalInvestment > 0 ? (refunds / totalInvestment) * 100 : 0;

    const status =
      netListingProfit < 0
        ? "Losing Money"
        : listingRoi < 50
          ? "Weak ROI"
          : listingRoi < 150
            ? "Healthy"
            : "Strong";

    const statusTone: Tone =
      netListingProfit < 0 ? "bad" : listingRoi < 50 ? "warn" : "good";

    const scenarios = [0, 150, 300, 500, 750].map((scenarioPpc) => {
      const scenarioInvestment =
        scenarioPpc + storage + maintenance + optimization + refunds + timeCost;
      const scenarioProfit = grossListingProfit - scenarioInvestment;
      const scenarioRoi =
        scenarioInvestment > 0
          ? (scenarioProfit / scenarioInvestment) * 100
          : 0;
      const scenarioMargin =
        monthlyRevenue > 0 ? (scenarioProfit / monthlyRevenue) * 100 : 0;

      return {
        ppc: scenarioPpc,
        investment: scenarioInvestment,
        profit: scenarioProfit,
        roi: scenarioRoi,
        margin: scenarioMargin,
        status:
          scenarioProfit < 0
            ? "Losing"
            : scenarioRoi < 50
              ? "Weak"
              : scenarioRoi < 150
                ? "Healthy"
                : "Strong",
      };
    });

    return {
      sessions,
      orders,
      salePrice,
      orderProfit,
      adSpend,
      storage,
      maintenance,
      optimization,
      inventory,
      refunds,
      hours,
      hourly,
      monthlyRevenue,
      grossListingProfit,
      timeCost,
      totalInvestment,
      netListingProfit,
      listingRoi,
      profitMargin,
      grossMargin,
      conversionRate,
      revenuePerSession,
      profitPerSession,
      grossProfitPerSession,
      adCostPerOrder,
      breakEvenOrders,
      orderGap,
      inventoryTurnover,
      inventoryReturn,
      costPerSession,
      maintenanceShare,
      adSpendShare,
      refundShare,
      status,
      statusTone,
      scenarios,
    };
  }, [
    monthlySessions,
    monthlyOrders,
    averageSalePrice,
    profitPerOrder,
    ppcSpend,
    storageCost,
    listingMaintenanceCost,
    optimizationCost,
    inventoryTiedUp,
    monthlyRefundLoss,
    timeHours,
    hourlyValue,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Listing ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether an Amazon listing is worth keeping, improving,
          advertising, restocking, discounting, or retiring by comparing listing
          profit against PPC spend, storage, refunds, optimization cost,
          inventory, and maintenance time.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">ROI inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter Amazon listing traffic, orders, profit per order, ad spend,
            storage cost, maintenance cost, optimization cost, refund losses,
            and inventory tied up to estimate listing return.
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
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Listing investment and risk
              </p>

              {[
                ["Monthly PPC spend", ppcSpend, setPpcSpend],
                ["Monthly storage cost", storageCost, setStorageCost],
                [
                  "Listing maintenance cost",
                  listingMaintenanceCost,
                  setListingMaintenanceCost,
                ],
                ["Listing optimization cost", optimizationCost, setOptimizationCost],
                ["Inventory tied up", inventoryTiedUp, setInventoryTiedUp],
                ["Monthly refund loss", monthlyRefundLoss, setMonthlyRefundLoss],
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

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Time cost
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly time spent
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={timeHours}
                  onChange={(event) => setTimeHours(event.target.value)}
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
            This calculator is an estimate. Actual Amazon listing performance,
            sessions, conversion, PPC results, storage fees, refunds, inventory
            costs, search rank, buy box status, and seller-specific costs may
            vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon listing return on investment.
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
              title="Net listing profit"
              value={money(results.netListingProfit)}
              note="Gross listing profit minus PPC, storage, maintenance, refunds, optimization, and time cost"
              tone={results.statusTone}
            />

            <ResultCard
              title="Listing ROI"
              value={percent(results.listingRoi)}
              note="Net listing profit divided by total listing investment"
              tone={results.statusTone}
            />

            <ResultCard
              title="Gross listing profit"
              value={money(results.grossListingProfit)}
              note="Monthly orders multiplied by profit per order"
              tone="blue"
            />

            <ResultCard
              title="Total listing investment"
              value={money(results.totalInvestment)}
              note="PPC, storage, maintenance, optimization, refund loss, and time cost"
              tone="warn"
            />

            <ResultCard
              title="Monthly revenue"
              value={money(results.monthlyRevenue)}
              note="Orders multiplied by average sale price"
              tone="blue"
            />

            <ResultCard
              title="Profit margin"
              value={percent(results.profitMargin)}
              note="Net listing profit divided by monthly revenue"
              tone={results.statusTone}
            />

            <ResultCard
              title="Conversion rate"
              value={percent(results.conversionRate)}
              note="Monthly orders divided by monthly sessions"
              tone="good"
            />

            <ResultCard
              title="Profit per session"
              value={money(results.profitPerSession)}
              note="Net listing profit divided by monthly sessions"
              tone={results.profitPerSession > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Revenue per session"
              value={money(results.revenuePerSession)}
              note="Monthly revenue divided by monthly sessions"
              tone="blue"
            />

            <ResultCard
              title="Ad cost per order"
              value={money(results.adCostPerOrder)}
              note="Monthly PPC spend divided by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Break-even orders"
              value={numberFormat(results.breakEvenOrders)}
              note="Orders needed to cover total listing investment"
              tone="warn"
            />

            <ResultCard
              title="Order gap"
              value={numberFormat(results.orderGap)}
              note="Current orders minus break-even orders"
              tone={results.orderGap >= 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Inventory return"
              value={percent(results.inventoryReturn)}
              note="Net listing profit divided by inventory tied up"
              tone={results.inventoryReturn > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Inventory turnover"
              value={percent(results.inventoryTurnover)}
              note="Monthly revenue divided by inventory tied up"
              tone="blue"
            />

            <ResultCard
              title="Time cost"
              value={money(results.timeCost)}
              note="Monthly time spent multiplied by hourly time value"
              tone="warn"
            />

            <ResultCard
              title="Cost per session"
              value={money(results.costPerSession)}
              note="Total listing investment divided by monthly sessions"
              tone="warn"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                This Amazon listing is estimated to produce{" "}
                <strong className="text-gray-950">
                  {money(results.netListingProfit)}
                </strong>{" "}
                in net monthly profit with a listing ROI of{" "}
                <strong className="text-gray-950">
                  {percent(results.listingRoi)}
                </strong>
                .
              </p>

              <p>
                Gross listing profit is{" "}
                <strong className="text-gray-950">
                  {money(results.grossListingProfit)}
                </strong>
                , while total listing investment is{" "}
                <strong className="text-gray-950">
                  {money(results.totalInvestment)}
                </strong>
                .
              </p>

              <p>
                The listing currently has an order gap of{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.orderGap)}
                </strong>{" "}
                compared with break-even order volume. Use this to decide
                whether to keep, improve, advertise, restock, or retire the
                listing.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">PPC spend comparison</h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">PPC spend</th>
                    <th className="px-4 py-3">Investment</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.ppc}
                      className={
                        Math.abs(scenario.ppc - results.adSpend) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">{money(scenario.ppc)}</td>
                      <td className="px-4 py-3">
                        {money(scenario.investment)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.roi)}</td>
                      <td className="px-4 py-3">{percent(scenario.margin)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Losing"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "Weak"
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
          How to use this Amazon Listing ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter performance",
              "Add sessions, orders, average sale price, and profit per order.",
            ],
            [
              "Add investment",
              "Include PPC spend, storage cost, maintenance, optimization, refund loss, and time cost.",
            ],
            [
              "Review ROI",
              "Compare net profit, listing ROI, margin, break-even orders, and inventory return.",
            ],
            [
              "Choose action",
              "Use ROI to decide whether to keep, improve, advertise, restock, discount, or retire the listing.",
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
            Amazon listing ROI breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which listing-level costs and investments are reducing return
            on investment.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["PPC spend", results.adSpend],
              ["Storage cost", results.storage],
              ["Listing maintenance cost", results.maintenance],
              ["Listing optimization cost", results.optimization],
              ["Refund loss", results.refunds],
              ["Time cost", results.timeCost],
              ["Total listing investment", results.totalInvestment],
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
                    results.totalInvestment > 0
                      ? ((value as number) / results.totalInvestment) * 100
                      : 0,
                  )}{" "}
                  of total listing investment
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon listing ROI mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging listings by sales volume instead of net profit after all costs.",
              "Increasing PPC spend without checking whether ROI improves.",
              "Keeping listings active when they repeatedly lose money after storage, PPC, refunds, or time cost.",
              "Ignoring time spent revising listings, answering messages, managing inventory, and handling issues.",
              "Comparing revenue across listings without comparing margin and return on effort.",
              "Retiring listings too quickly without testing photos, title, bullets, price, PPC, and offer quality.",
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
            Understanding your Amazon listing ROI results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The listing
              appears to generate strong return after entered listing-level
              costs.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> The listing
              appears workable under the current profit, cost, and performance
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Weak ROI:</strong> The listing
              is profitable, but the return may be too weak for more PPC,
              restocking, or maintenance time.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              listing may not cover PPC, storage, maintenance, refunds,
              optimization, and time-related costs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Listing revenue, sessions, orders, and conversion rate.",
              "Profit per order after referral fees, fulfillment cost, product cost, PPC, refunds, and storage.",
              "PPC spend, campaign performance, and ad cost per order.",
              "Listing maintenance, optimization, photography, copywriting, testing, and support time.",
              "Inventory tied up, storage cost, refund risk, stale inventory risk, and cash flow.",
              "Actual results after listing changes, pricing changes, PPC adjustments, or restocks.",
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
          Ways to improve Amazon listing ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve conversion",
              "Upgrade images, title, bullets, price, reviews, and offer quality.",
            ],
            [
              "Reduce wasted PPC",
              "Lower spend on search terms, campaigns, or placements that do not generate profitable orders.",
            ],
            [
              "Raise profit per order",
              "Improve sourcing, fulfillment cost, price, bundles, coupons, and refund prevention.",
            ],
            [
              "Retire weak listings",
              "Remove or revise listings that repeatedly lose money, require too much support, or tie up capital.",
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
            ["/amazon/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/amazon/ppc-roi-calculator", "PPC ROI Calculator"],
            ["/amazon/profit-calculator", "Profit Calculator"],
            ["/amazon/sales-goal-calculator", "Sales Goal Calculator"],
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