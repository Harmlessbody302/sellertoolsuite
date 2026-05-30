"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { toMoney } from "@/lib/etsyCalculations";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "warning" | "bad" | "blue";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? (
        <p className="mt-2 text-sm leading-5 text-gray-600">{helper}</p>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Restock Soon"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Watch Stock"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${style}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const style =
    status === "Efficient"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Watch"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayInventoryRestockCalculatorPage() {
  const [currentStock, setCurrentStock] = useState(24);
  const [unitsSold, setUnitsSold] = useState(36);
  const [reviewDays, setReviewDays] = useState(30);
  const [leadTimeDays, setLeadTimeDays] = useState(14);
  const [safetyStockDays, setSafetyStockDays] = useState(7);
  const [targetStockDays, setTargetStockDays] = useState(45);
  const [unitCost, setUnitCost] = useState(18);
  const [profitPerUnit, setProfitPerUnit] = useState(14.5);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [monthlyViews, setMonthlyViews] = useState(2500);
  const [storageCostPerUnit, setStorageCostPerUnit] = useState(0.25);
  const [defectOrUnsoldRate, setDefectOrUnsoldRate] = useState(5);

  const result = useMemo(() => {
    const stock = Math.max(0, currentStock);
    const sold = Math.max(0, unitsSold);
    const days = Math.max(1, reviewDays);
    const leadTime = Math.max(0, leadTimeDays);
    const safetyDays = Math.max(0, safetyStockDays);
    const targetDays = Math.max(1, targetStockDays);
    const cost = Math.max(0, unitCost);
    const profit = Math.max(0, profitPerUnit);
    const conversion = Math.max(0.01, conversionRate);
    const views = Math.max(0, monthlyViews);
    const storage = Math.max(0, storageCostPerUnit);
    const defectRate = Math.min(95, Math.max(0, defectOrUnsoldRate));

    const dailySales = sold / days;
    const monthlySalesPace = dailySales * 30;
    const estimatedOrdersFromTraffic = views * (conversion / 100);
    const daysOfStock = dailySales > 0 ? stock / dailySales : 999;
    const leadTimeDemand = dailySales * leadTime;
    const safetyStockUnits = dailySales * safetyDays;
    const reorderPoint = Math.ceil(leadTimeDemand + safetyStockUnits);
    const targetStockUnits = Math.ceil(dailySales * targetDays);
    const recommendedRestockQty = Math.max(0, targetStockUnits - stock);
    const stockoutGap = Math.max(0, reorderPoint - stock);
    const stockoutRiskDays = Math.max(0, leadTime + safetyDays - daysOfStock);

    const restockCost = recommendedRestockQty * cost;
    const expectedProfitFromRestock = recommendedRestockQty * profit;
    const estimatedDefectUnits = recommendedRestockQty * (defectRate / 100);
    const defectCost = estimatedDefectUnits * cost;
    const storageCost = recommendedRestockQty * storage;
    const netRestockProfit =
      expectedProfitFromRestock - defectCost - storageCost;
    const restockRoi =
      restockCost > 0 ? (netRestockProfit / restockCost) * 100 : 0;
    const cashTiedUp = stock * cost;
    const currentStockProfitPotential = stock * profit;
    const monthlyProfitPace = monthlySalesPace * profit;
    const sellThroughRate = stock > 0 ? (sold / stock) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your current eBay inventory appears workable under the entered sales pace and lead time assumptions.";
    let recommendation =
      "Review recent sales pace, sold comps, supplier reliability, conversion rate, and cash flow before ordering more inventory.";

    if (dailySales <= 0) {
      status = "Slow Moving";
      statusText =
        "This item has no entered sales during the review period, so restocking may be risky.";
      recommendation =
        "Avoid restocking until the listing has stronger demand, better conversion, clearer sold comps, or a lower sourcing cost.";
    } else if (stock <= reorderPoint) {
      status = "Restock Soon";
      statusText =
        "Current stock is at or below the estimated reorder point based on sales pace, lead time, and safety stock.";
      recommendation =
        "Consider restocking soon if profit, demand, supplier timing, and cash flow support the purchase.";
    } else if (daysOfStock < leadTime + safetyDays + 7) {
      status = "Watch Stock";
      statusText =
        "Inventory is not critically low, but it may need attention soon if the sales pace continues.";
      recommendation =
        "Monitor sales velocity and supplier timing so the listing does not run out before replacement stock arrives.";
    }

    const getScenarioStatus = (qty: number, roi: number) => {
      if (qty <= 0) return "Watch";
      if (roi >= 80) return "Efficient";
      if (roi >= 30) return "Healthy";
      return "Watch";
    };

    const restockScenarios = [10, 25, 50, 100, 200].map((qty) => {
      const scenarioCost = qty * cost;
      const scenarioGrossProfit = qty * profit;
      const scenarioDefectCost = qty * (defectRate / 100) * cost;
      const scenarioStorageCost = qty * storage;
      const scenarioNetProfit =
        scenarioGrossProfit - scenarioDefectCost - scenarioStorageCost;
      const scenarioRoi =
        scenarioCost > 0 ? (scenarioNetProfit / scenarioCost) * 100 : 0;
      const scenarioDaysCovered = dailySales > 0 ? qty / dailySales : 0;

      return {
        qty,
        cost: scenarioCost,
        profit: scenarioNetProfit,
        roi: scenarioRoi,
        daysCovered: scenarioDaysCovered,
        status: getScenarioStatus(qty, scenarioRoi),
      };
    });

    const inventoryBreakdown = [
      ["Current stock value", cashTiedUp],
      ["Recommended restock cost", restockCost],
      ["Expected restock profit", expectedProfitFromRestock],
      ["Estimated defect/unsold cost", defectCost],
      ["Estimated storage cost", storageCost],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        restockCost > 0 ? (Math.abs(Number(amount)) / restockCost) * 100 : 0,
    }));

    return {
      stock,
      sold,
      days,
      leadTime,
      safetyDays,
      targetDays,
      cost,
      profit,
      conversion,
      views,
      storage,
      defectRate,
      dailySales,
      monthlySalesPace,
      estimatedOrdersFromTraffic,
      daysOfStock,
      leadTimeDemand,
      safetyStockUnits,
      reorderPoint,
      targetStockUnits,
      recommendedRestockQty,
      stockoutGap,
      stockoutRiskDays,
      restockCost,
      expectedProfitFromRestock,
      estimatedDefectUnits,
      defectCost,
      storageCost,
      netRestockProfit,
      restockRoi,
      cashTiedUp,
      currentStockProfitPotential,
      monthlyProfitPace,
      sellThroughRate,
      status,
      statusText,
      recommendation,
      restockScenarios,
      inventoryBreakdown,
    };
  }, [
    currentStock,
    unitsSold,
    reviewDays,
    leadTimeDays,
    safetyStockDays,
    targetStockDays,
    unitCost,
    profitPerUnit,
    conversionRate,
    monthlyViews,
    storageCostPerUnit,
    defectOrUnsoldRate,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const restockTone =
    result.recommendedRestockQty > 0 && result.netRestockProfit > 0
      ? "good"
      : result.dailySales <= 0
        ? "bad"
        : "warning";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Inventory Restock Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate when to reorder eBay inventory based on current stock, recent
          sales pace, supplier lead time, safety stock, item cost, profit per
          unit, conversion rate, and restock risk.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Restock inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter stock, recent sales, review period, supplier lead time, safety
            stock, target coverage, and per-unit economics to estimate reorder
            timing and quantity.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Inventory and sales pace
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Current stock"
                  value={currentStock}
                  onChange={setCurrentStock}
                />

                <NumberInput
                  label="Units sold in review period"
                  value={unitsSold}
                  onChange={setUnitsSold}
                />

                <NumberInput
                  label="Review period"
                  suffix="days"
                  value={reviewDays}
                  onChange={setReviewDays}
                />

                <NumberInput
                  label="Monthly listing views"
                  value={monthlyViews}
                  onChange={setMonthlyViews}
                />

                <NumberInput
                  label="Conversion rate"
                  suffix="%"
                  value={conversionRate}
                  onChange={setConversionRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Restock timing
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Supplier lead time"
                  suffix="days"
                  value={leadTimeDays}
                  onChange={setLeadTimeDays}
                />

                <NumberInput
                  label="Safety stock coverage"
                  suffix="days"
                  value={safetyStockDays}
                  onChange={setSafetyStockDays}
                />

                <NumberInput
                  label="Target stock coverage"
                  suffix="days"
                  value={targetStockDays}
                  onChange={setTargetStockDays}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Unit economics
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Unit cost"
                  prefix="$"
                  value={unitCost}
                  onChange={setUnitCost}
                />

                <NumberInput
                  label="Profit per unit"
                  prefix="$"
                  value={profitPerUnit}
                  onChange={setProfitPerUnit}
                />

                <NumberInput
                  label="Storage cost per unit"
                  prefix="$"
                  value={storageCostPerUnit}
                  onChange={setStorageCostPerUnit}
                />

                <NumberInput
                  label="Defect / unsold risk"
                  suffix="%"
                  value={defectOrUnsoldRate}
                  onChange={setDefectOrUnsoldRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay demand, sales velocity,
            stockouts, supplier delays, storage limits, item condition, return
            rates, seasonal demand, and seller-specific inventory costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay restock timing and quantity.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended restock"
              value={`${result.recommendedRestockQty.toLocaleString()} units`}
              helper="Target stock units minus current stock"
              tone={restockTone}
            />

            <MetricCard
              label="Reorder point"
              value={`${result.reorderPoint.toLocaleString()} units`}
              helper="Lead time demand plus safety stock"
              tone="warning"
            />

            <MetricCard
              label="Days of stock left"
              value={
                result.daysOfStock >= 999
                  ? "No sales"
                  : `${result.daysOfStock.toFixed(1)} days`
              }
              helper="Current stock divided by daily sales pace"
              tone={
                result.daysOfStock >= result.leadTime + result.safetyDays
                  ? "good"
                  : "warning"
              }
            />

            <MetricCard
              label="Stockout gap"
              value={`${result.stockoutGap.toLocaleString()} units`}
              helper="Units below the estimated reorder point"
              tone={result.stockoutGap === 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Daily sales pace"
              value={result.dailySales.toFixed(2)}
              helper="Units sold divided by review period days"
              tone={result.dailySales > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Monthly sales pace"
              value={result.monthlySalesPace.toFixed(1)}
              helper="Estimated units sold every 30 days"
              tone="blue"
            />

            <MetricCard
              label="Lead time demand"
              value={`${Math.ceil(result.leadTimeDemand).toLocaleString()} units`}
              helper="Estimated units sold during supplier lead time"
              tone="blue"
            />

            <MetricCard
              label="Safety stock"
              value={`${Math.ceil(result.safetyStockUnits).toLocaleString()} units`}
              helper="Extra inventory coverage based on safety stock days"
              tone="blue"
            />

            <MetricCard
              label="Target stock level"
              value={`${result.targetStockUnits.toLocaleString()} units`}
              helper="Estimated units needed for target stock coverage"
              tone="good"
            />

            <MetricCard
              label="Restock cost"
              value={toMoney(result.restockCost)}
              helper="Recommended restock quantity multiplied by unit cost"
              tone="warning"
            />

            <MetricCard
              label="Expected restock profit"
              value={toMoney(result.netRestockProfit)}
              helper="Profit from restock after defect and storage allowance"
              tone={result.netRestockProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Restock ROI"
              value={percent(result.restockRoi)}
              helper="Expected restock profit divided by restock cost"
              tone={result.restockRoi >= 50 ? "good" : "warning"}
            />

            <MetricCard
              label="Cash tied in stock"
              value={toMoney(result.cashTiedUp)}
              helper="Current stock multiplied by unit cost"
              tone="warning"
            />

            <MetricCard
              label="Current stock profit potential"
              value={toMoney(result.currentStockProfitPotential)}
              helper="Current stock multiplied by profit per unit"
              tone="good"
            />

            <MetricCard
              label="Estimated traffic orders"
              value={result.estimatedOrdersFromTraffic.toFixed(1)}
              helper="Monthly views multiplied by conversion rate"
              tone="blue"
            />

            <MetricCard
              label="Sell-through pressure"
              value={percent(result.sellThroughRate)}
              helper="Units sold divided by current stock"
              tone={result.sellThroughRate > 50 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                You sold <strong>{result.sold.toLocaleString()}</strong> units
                over <strong>{result.days.toLocaleString()}</strong> days,
                creating a daily sales pace of{" "}
                <strong>{result.dailySales.toFixed(2)}</strong> units.
              </p>

              <p>
                With <strong>{result.stock.toLocaleString()}</strong> units in
                stock, you have about{" "}
                <strong>
                  {result.daysOfStock >= 999
                    ? "no measurable sales pace"
                    : `${result.daysOfStock.toFixed(1)} days`}
                </strong>{" "}
                of coverage remaining. Your estimated reorder point is{" "}
                <strong>{result.reorderPoint.toLocaleString()}</strong> units.
              </p>

              <p>
                To reach about{" "}
                <strong>{result.targetDays.toLocaleString()}</strong> days of
                target coverage, the calculator recommends restocking{" "}
                <strong>
                  {result.recommendedRestockQty.toLocaleString()} units
                </strong>
                , costing about <strong>{toMoney(result.restockCost)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Restock quantity comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Cost</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">Days covered</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.restockScenarios.map((row) => (
                    <tr
                      key={row.qty}
                      className={
                        row.qty === result.recommendedRestockQty
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.qty}</td>
                      <td className="px-4 py-3">{toMoney(row.cost)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
                      <td className="px-4 py-3">
                        {row.daysCovered.toFixed(1)}
                      </td>
                      <td className="px-4 py-3">
                        <SmallStatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this eBay Inventory Restock Calculator
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
              "Add unit cost, profit per unit, storage cost, and defect or unsold risk.",
            ],
            [
              "Review restock need",
              "Compare current stock against reorder point, target stock level, cash cost, and profit potential.",
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
            eBay inventory restock breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how current stock, restock cost, storage, and risk affect
            inventory decisions.
          </p>

          <div className="mt-5 space-y-3">
            {result.inventoryBreakdown.map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{item.label}</p>
                  <p className="text-sm font-bold text-gray-700">
                    {toMoney(item.amount)}
                  </p>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  {result.restockCost > 0 ? (
                    <p>{percent(item.share)} compared with restock cost</p>
                  ) : (
                    <p>No restock cost entered</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay inventory mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Waiting until stock reaches zero before reordering.",
              "Restocking based on guesses instead of recent sales pace.",
              "Ignoring supplier lead time, shipping delays, prep time, or listing relaunch time.",
              "Buying too much inventory for listings with weak conversion or low profit.",
              "Forgetting storage space, cash flow, defects, returns, or stale inventory risk.",
              "Restocking slow-moving listings before reviewing sold comps and buyer demand.",
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
            Understanding your eBay restock results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Restock Soon:</strong> Current
              stock is at or below the estimated reorder point, so a restock may
              be justified if demand and profit are reliable.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Current
              inventory appears workable under the entered sales pace and lead
              time assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Watch Stock:</strong> Inventory
              is not critically low, but stock may need attention soon if sales
              velocity continues.
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
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Current available stock or ready-to-list inventory.",
              "Units sold during a clear review period.",
              "Supplier lead time, shipping time, prep time, and relisting time.",
              "Safety stock needed for demand spikes, delays, or supplier issues.",
              "Unit cost, expected profit per unit, storage cost, and cash flow.",
              "Conversion rate, traffic, sold comps, seasonal demand, and stale inventory risk.",
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
          Ways to improve eBay restock planning
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
              "Improve photos, price, item specifics, and shipping before buying more weak inventory.",
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
          Related eBay seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/sales-goal-calculator", "Sales Goal Calculator"],
            ["/ebay/listing-roi-calculator", "Listing ROI Calculator"],
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
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