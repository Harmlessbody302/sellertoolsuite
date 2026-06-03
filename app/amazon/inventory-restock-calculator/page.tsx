"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
  tone?: "good" | "warn" | "bad" | "neutral" | "blue";
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

export default function AmazonInventoryRestockCalculatorPage() {
  const [currentStock, setCurrentStock] = useState("120");
  const [unitsSold, setUnitsSold] = useState("90");
  const [reviewPeriod, setReviewPeriod] = useState("30");
  const [leadTime, setLeadTime] = useState("21");
  const [safetyStockDays, setSafetyStockDays] = useState("10");
  const [targetCoverageDays, setTargetCoverageDays] = useState("45");
  const [unitCost, setUnitCost] = useState("12");
  const [profitPerUnit, setProfitPerUnit] = useState("8");
  const [storageCostPerUnit, setStorageCostPerUnit] = useState("0.25");
  const [defectRisk, setDefectRisk] = useState("3");
  const [inboundPrepCost, setInboundPrepCost] = useState("1.25");
  const [conversionRate, setConversionRate] = useState("8");
  const [monthlySessions, setMonthlySessions] = useState("2500");

  const results = useMemo(() => {
    const stock = safeNumber(currentStock);
    const sold = safeNumber(unitsSold);
    const period = safeNumber(reviewPeriod);
    const lead = safeNumber(leadTime);
    const safetyDays = safeNumber(safetyStockDays);
    const targetDays = safeNumber(targetCoverageDays);
    const cost = safeNumber(unitCost);
    const profit = safeNumber(profitPerUnit);
    const storage = safeNumber(storageCostPerUnit);
    const defectRate = safeNumber(defectRisk) / 100;
    const prep = safeNumber(inboundPrepCost);
    const conversion = safeNumber(conversionRate) / 100;
    const sessions = safeNumber(monthlySessions);

    const dailySalesPace = period > 0 ? sold / period : 0;
    const monthlySalesPace = dailySalesPace * 30;
    const daysOfStock = dailySalesPace > 0 ? stock / dailySalesPace : 0;
    const leadTimeDemand = dailySalesPace * lead;
    const safetyStock = dailySalesPace * safetyDays;
    const reorderPoint = leadTimeDemand + safetyStock;
    const stockoutGap = Math.max(0, reorderPoint - stock);
    const targetStockLevel = dailySalesPace * targetDays;
    const recommendedRestock = Math.max(0, targetStockLevel - stock);
    const roundedRestock = Math.ceil(recommendedRestock);
    const restockUnitCost = cost + prep;
    const restockCost = roundedRestock * restockUnitCost;
    const defectCost = restockCost * defectRate;
    const totalRestockCost = restockCost + defectCost;
    const expectedRestockProfit = roundedRestock * profit - defectCost;
    const restockRoi =
      totalRestockCost > 0 ? (expectedRestockProfit / totalRestockCost) * 100 : 0;
    const currentInventoryValue = stock * cost;
    const currentStockProfitPotential = stock * profit;
    const storageDrag = stock * storage;
    const expectedMonthlyOrders = sessions * conversion;
    const trafficSalesGap = monthlySalesPace - expectedMonthlyOrders;
    const sellThroughPressure = stock > 0 ? (monthlySalesPace / stock) * 100 : 0;
    const daysUntilReorder =
      dailySalesPace > 0 ? Math.max(0, (stock - reorderPoint) / dailySalesPace) : 0;

    const status =
      stock <= reorderPoint
        ? "Restock Soon"
        : daysOfStock < targetDays
          ? "Watch Stock"
          : monthlySalesPace <= 0
            ? "Slow Moving"
            : "Healthy";

    const statusTone =
      stock <= reorderPoint
        ? "warn"
        : monthlySalesPace <= 0
          ? "bad"
          : "good";

    const scenarios = [25, 50, 100, 150, 250].map((quantity) => {
      const scenarioCost = quantity * restockUnitCost;
      const scenarioDefectCost = scenarioCost * defectRate;
      const scenarioTotalCost = scenarioCost + scenarioDefectCost;
      const scenarioProfit = quantity * profit - scenarioDefectCost;
      const scenarioRoi =
        scenarioTotalCost > 0 ? (scenarioProfit / scenarioTotalCost) * 100 : 0;
      const totalUnits = stock + quantity;
      const scenarioDaysCovered =
        dailySalesPace > 0 ? totalUnits / dailySalesPace : 0;

      return {
        quantity,
        cost: scenarioTotalCost,
        profit: scenarioProfit,
        roi: scenarioRoi,
        daysCovered: scenarioDaysCovered,
        status:
          scenarioDaysCovered < lead + safetyDays
            ? "Low"
            : scenarioDaysCovered > targetDays * 2
              ? "Heavy"
              : "Healthy",
      };
    });

    return {
      stock,
      sold,
      period,
      lead,
      safetyDays,
      targetDays,
      cost,
      profit,
      storage,
      defectRate,
      prep,
      conversion,
      sessions,
      dailySalesPace,
      monthlySalesPace,
      daysOfStock,
      leadTimeDemand,
      safetyStock,
      reorderPoint,
      stockoutGap,
      targetStockLevel,
      recommendedRestock,
      roundedRestock,
      restockUnitCost,
      restockCost,
      defectCost,
      totalRestockCost,
      expectedRestockProfit,
      restockRoi,
      currentInventoryValue,
      currentStockProfitPotential,
      storageDrag,
      expectedMonthlyOrders,
      trafficSalesGap,
      sellThroughPressure,
      daysUntilReorder,
      status,
      statusTone,
      scenarios,
    };
  }, [
    currentStock,
    unitsSold,
    reviewPeriod,
    leadTime,
    safetyStockDays,
    targetCoverageDays,
    unitCost,
    profitPerUnit,
    storageCostPerUnit,
    defectRisk,
    inboundPrepCost,
    conversionRate,
    monthlySessions,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Inventory Restock Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon restock timing and reorder quantity using current
          stock, sales velocity, supplier lead time, safety stock, target
          coverage, storage cost, unit economics, and inventory risk.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Restock inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter current stock, recent sales, review period, lead time, safety
            stock, target coverage, unit economics, and traffic assumptions to
            estimate Amazon reorder timing and restock quantity.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Inventory and sales pace
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Current stock
              </label>
              <input
                value={currentStock}
                onChange={(event) => setCurrentStock(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Units sold in review period
              </label>
              <input
                value={unitsSold}
                onChange={(event) => setUnitsSold(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Review period
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={reviewPeriod}
                  onChange={(event) => setReviewPeriod(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">days</span>
              </div>

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
                Conversion rate
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
                Restock timing
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Supplier lead time
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={leadTime}
                  onChange={(event) => setLeadTime(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">days</span>
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Safety stock coverage
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={safetyStockDays}
                  onChange={(event) => setSafetyStockDays(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">days</span>
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Target stock coverage
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={targetCoverageDays}
                  onChange={(event) => setTargetCoverageDays(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">days</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Unit economics and risk
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Unit cost
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={unitCost}
                  onChange={(event) => setUnitCost(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Inbound / prep cost per unit
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={inboundPrepCost}
                  onChange={(event) => setInboundPrepCost(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Profit per unit
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={profitPerUnit}
                  onChange={(event) => setProfitPerUnit(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Storage cost per unit
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={storageCostPerUnit}
                  onChange={(event) => setStorageCostPerUnit(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Defect / unsellable risk
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={defectRisk}
                  onChange={(event) => setDefectRisk(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon demand, sales velocity,
            supplier delays, FBA restock limits, storage fees, inbound shipping,
            defects, returns, and inventory costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon restock timing and quantity.
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
              title="Recommended restock"
              value={`${numberFormat(results.roundedRestock)} units`}
              note="Target stock level minus current stock"
              tone={results.roundedRestock > 0 ? "good" : "blue"}
            />

            <ResultCard
              title="Reorder point"
              value={`${numberFormat(results.reorderPoint)} units`}
              note="Lead time demand plus safety stock"
              tone="warn"
            />

            <ResultCard
              title="Days of stock left"
              value={`${numberFormat(results.daysOfStock)} days`}
              note="Current stock divided by daily sales pace"
              tone={results.daysOfStock <= results.lead + results.safetyDays ? "warn" : "good"}
            />

            <ResultCard
              title="Days until reorder"
              value={`${numberFormat(results.daysUntilReorder)} days`}
              note="Estimated time before stock reaches reorder point"
              tone={results.daysUntilReorder <= 7 ? "warn" : "good"}
            />

            <ResultCard
              title="Daily sales pace"
              value={numberFormat(results.dailySalesPace)}
              note="Units sold divided by review period days"
              tone="good"
            />

            <ResultCard
              title="Monthly sales pace"
              value={numberFormat(results.monthlySalesPace)}
              note="Estimated units sold every 30 days"
              tone="blue"
            />

            <ResultCard
              title="Lead time demand"
              value={`${numberFormat(results.leadTimeDemand)} units`}
              note="Estimated units sold during supplier lead time"
              tone="blue"
            />

            <ResultCard
              title="Safety stock"
              value={`${numberFormat(results.safetyStock)} units`}
              note="Extra inventory coverage based on safety stock days"
              tone="blue"
            />

            <ResultCard
              title="Estimated restock cost"
              value={money(results.totalRestockCost)}
              note="Recommended restock quantity multiplied by unit cost, prep, and defect risk"
              tone="warn"
            />

            <ResultCard
              title="Expected restock profit"
              value={money(results.expectedRestockProfit)}
              note="Profit from recommended restock after defect allowance"
              tone={results.expectedRestockProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Restock ROI"
              value={percent(results.restockRoi)}
              note="Expected restock profit divided by estimated restock cost"
              tone={results.restockRoi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Current inventory value"
              value={money(results.currentInventoryValue)}
              note="Current stock multiplied by unit cost"
              tone="blue"
            />

            <ResultCard
              title="Current stock profit potential"
              value={money(results.currentStockProfitPotential)}
              note="Current stock multiplied by profit per unit"
              tone="good"
            />

            <ResultCard
              title="Storage drag"
              value={money(results.storageDrag)}
              note="Current stock multiplied by entered storage cost per unit"
              tone="warn"
            />

            <ResultCard
              title="Estimated traffic orders"
              value={numberFormat(results.expectedMonthlyOrders)}
              note="Monthly sessions multiplied by conversion rate"
              tone="blue"
            />

            <ResultCard
              title="Sell-through pressure"
              value={percent(results.sellThroughPressure)}
              note="Monthly sales pace divided by current stock"
              tone={results.sellThroughPressure > 100 ? "warn" : "good"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                Current stock is estimated to last{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.daysOfStock)} days
                </strong>{" "}
                at the current sales pace.
              </p>

              <p>
                The reorder point is{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.reorderPoint)} units
                </strong>
                . To reach{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.targetDays)} days
                </strong>{" "}
                of target coverage, the calculator recommends restocking{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.roundedRestock)} units
                </strong>
                .
              </p>

              <p>
                Estimated restock cost is{" "}
                <strong className="text-gray-950">
                  {money(results.totalRestockCost)}
                </strong>{" "}
                with expected restock profit of{" "}
                <strong className="text-gray-950">
                  {money(results.expectedRestockProfit)}
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Restock quantity comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Cost</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">Days covered</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr key={scenario.quantity} className="border-t">
                      <td className="px-4 py-3">{scenario.quantity}</td>
                      <td className="px-4 py-3">{money(scenario.cost)}</td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.roi)}</td>
                      <td className="px-4 py-3">
                        {numberFormat(scenario.daysCovered)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Low"
                              ? "bg-amber-100 text-amber-700"
                              : scenario.status === "Heavy"
                                ? "bg-red-100 text-red-700"
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
          How to use this Amazon Inventory Restock Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter stock",
              "Add current stock, units sold, and review period to estimate sales velocity.",
            ],
            [
              "Add lead time",
              "Include supplier lead time and safety stock coverage so reorder timing reflects delays.",
            ],
            [
              "Estimate economics",
              "Add unit cost, prep cost, profit per unit, storage cost, and defect risk.",
            ],
            [
              "Review restock need",
              "Compare current stock against reorder point, target coverage, restock cost, and profit potential.",
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
            Amazon inventory restock breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how current stock, sales pace, restock cost, storage, and
            risk affect inventory decisions.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Current inventory value", results.currentInventoryValue],
              ["Estimated restock cost", results.totalRestockCost],
              ["Expected restock profit", results.expectedRestockProfit],
              ["Defect / unsellable cost", results.defectCost],
              ["Storage drag", results.storageDrag],
              ["Current stock profit potential", results.currentStockProfitPotential],
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
                    results.totalRestockCost > 0
                      ? ((value as number) / results.totalRestockCost) * 100
                      : 0,
                  )}{" "}
                  compared with restock cost
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon inventory mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Waiting until stock reaches zero before reordering.",
              "Restocking based on guesses instead of recent sales pace.",
              "Ignoring supplier lead time, inbound shipping, prep time, or FBA receiving delays.",
              "Buying too much inventory for products with weak conversion or low profit.",
              "Forgetting storage cost, cash flow, defects, refunds, stale inventory risk, or seasonal demand.",
              "Restocking slow-moving products before reviewing sales velocity and listing performance.",
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
            Understanding your Amazon restock results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Healthy:</strong> Current
              stock appears workable under the entered sales pace and lead time
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Restock Soon:</strong> Current
              stock is at or below the estimated reorder point, so restock may
              be justified if demand and profit are reliable.
            </p>

            <p>
              <strong className="text-amber-700">Watch Stock:</strong>{" "}
              Inventory is not critically low, but stock may need attention soon
              if sales velocity continues.
            </p>

            <p>
              <strong className="text-red-700">Slow Moving:</strong> The item
              has little or no sales velocity in the entered review period, so
              restocking may be risky.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Current available stock and ready-to-sell inventory.",
              "Units sold during a clear review period.",
              "Supplier lead time, inbound shipping time, prep time, and FBA receiving time.",
              "Safety stock needed for demand spikes, delays, or restock limits.",
              "Unit cost, expected profit per unit, storage cost, defect risk, and cash flow.",
              "Conversion rate, sessions, listing performance, refund risk, and seasonal demand.",
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
          Ways to improve Amazon restock planning
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Restock winners first",
              "Prioritize listings with steady sales, strong profit, and manageable returns.",
            ],
            [
              "Use reorder points",
              "Set reorder points based on sales pace, lead time, and safety stock instead of guessing.",
            ],
            [
              "Protect cash flow",
              "Avoid tying up too much cash in slow-moving inventory or risky seasonal products.",
            ],
            [
              "Improve sell-through",
              "Improve photos, price, listing content, PPC, and reviews before buying more weak inventory.",
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
            ["/amazon/product-cost-calculator", "Product Cost Calculator"],
            ["/amazon/storage-fee-calculator", "Storage Fee Calculator"],
            ["/amazon/listing-roi-calculator", "Listing ROI Calculator"],
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