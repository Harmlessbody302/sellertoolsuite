"use client";

import { useMemo, useState } from "react";

export default function EtsyInventoryRestockCalculator() {
  const [currentInventory, setCurrentInventory] = useState("45");
  const [monthlySales, setMonthlySales] = useState("60");
  const [leadTimeDays, setLeadTimeDays] = useState("14");
  const [safetyStockDays, setSafetyStockDays] = useState("7");
  const [seasonalMultiplier, setSeasonalMultiplier] = useState("100");
  const [costPerUnit, setCostPerUnit] = useState("6");
  const [plannedRestockQty, setPlannedRestockQty] = useState("75");
  const [holdingCostPerUnit, setHoldingCostPerUnit] = useState("0.25");

  const result = useMemo(() => {
    const inventory = Number(currentInventory) || 0;
    const monthly = Number(monthlySales) || 0;
    const leadTime = Number(leadTimeDays) || 0;
    const safetyDays = Number(safetyStockDays) || 0;
    const multiplier = Number(seasonalMultiplier) || 0;
    const unitCost = Number(costPerUnit) || 0;
    const restockQty = Number(plannedRestockQty) || 0;
    const holdingCost = Number(holdingCostPerUnit) || 0;

    const adjustedMonthlySales = monthly * (multiplier / 100);
    const dailySales = adjustedMonthlySales / 30;
    const daysUntilStockout =
      dailySales > 0 ? Math.floor(inventory / dailySales) : 0;

    const reorderPoint = Math.ceil(dailySales * (leadTime + safetyDays));
    const reorderNeeded = inventory <= reorderPoint;

    const recommendedRestockQty = Math.max(
      0,
      Math.ceil(adjustedMonthlySales + reorderPoint - inventory)
    );

    const plannedInventoryAfterRestock = inventory + restockQty;
    const plannedCoverageDays =
      dailySales > 0
        ? Math.floor(plannedInventoryAfterRestock / dailySales)
        : 0;

    const recommendedInvestment = recommendedRestockQty * unitCost;
    const plannedInvestment = restockQty * unitCost;
    const monthlyHoldingCost = plannedInventoryAfterRestock * holdingCost;

    const inventoryTurnover =
      inventory > 0 ? adjustedMonthlySales / inventory : 0;

    let status = "Healthy";
    let statusText =
      "Your current inventory looks reasonably balanced for the sales pace and lead time entered.";
    let recommendation =
      "Monitor sales velocity and restock before inventory falls below your reorder point.";

    if (dailySales <= 0) {
      status = "No Sales Data";
      statusText =
        "Enter your average monthly sales to estimate stockout timing and restock needs.";
      recommendation =
        "Use recent Etsy order history for the same item or variation to get a more useful estimate.";
    } else if (inventory <= 0) {
      status = "Out of Stock";
      statusText =
        "This item appears to be out of stock based on the inventory entered.";
      recommendation =
        "Restock as soon as possible if this listing is profitable and still receiving demand.";
    } else if (reorderNeeded) {
      status = "Restock Soon";
      statusText =
        "Your inventory is at or below the recommended reorder point.";
      recommendation =
        "Place a restock order soon to reduce the risk of running out before the next batch arrives.";
    } else if (daysUntilStockout < leadTime) {
      status = "Stockout Risk";
      statusText =
        "Your inventory may run out before a new restock arrives.";
      recommendation =
        "Increase your restock quantity or reduce lead time if possible.";
    } else if (plannedCoverageDays > 120) {
      status = "Overstock Risk";
      statusText =
        "Your planned restock may create more inventory than you need for the near term.";
      recommendation =
        "Consider a smaller restock quantity unless this item has strong seasonal demand or bulk production savings.";
    }

    const scenarios = [
      {
        label: "Conservative",
        quantity: Math.ceil(adjustedMonthlySales * 0.75),
      },
      {
        label: "Balanced",
        quantity: recommendedRestockQty,
      },
      {
        label: "Aggressive",
        quantity: Math.ceil(adjustedMonthlySales * 1.5),
      },
      {
        label: "Current plan",
        quantity: restockQty,
      },
    ].map((scenario) => {
      const totalInventory = inventory + scenario.quantity;
      const coverageDays =
        dailySales > 0 ? Math.floor(totalInventory / dailySales) : 0;
      const investment = scenario.quantity * unitCost;

      let scenarioStatus = "Healthy";

      if (scenario.quantity <= 0) scenarioStatus = "No restock";
      else if (coverageDays < leadTime + safetyDays)
        scenarioStatus = "Risky";
      else if (coverageDays > 120) scenarioStatus = "High stock";
      else if (scenario.label === "Balanced") scenarioStatus = "Recommended";

      return {
        ...scenario,
        totalInventory,
        coverageDays,
        investment,
        status: scenarioStatus,
      };
    });

    return {
      adjustedMonthlySales,
      dailySales,
      daysUntilStockout,
      reorderPoint,
      reorderNeeded,
      recommendedRestockQty,
      plannedInventoryAfterRestock,
      plannedCoverageDays,
      recommendedInvestment,
      plannedInvestment,
      monthlyHoldingCost,
      inventoryTurnover,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    currentInventory,
    monthlySales,
    leadTimeDays,
    safetyStockDays,
    seasonalMultiplier,
    costPerUnit,
    plannedRestockQty,
    holdingCostPerUnit,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const number = (value: number) => value.toLocaleString("en-US");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Etsy Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Etsy Inventory Restock Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate when to restock, how many units to order, and how long your
            Etsy inventory will last based on sales pace, lead time, and safety
            stock.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Inventory details</h2>

            <div className="space-y-4">
              <Input
                label="Current inventory"
                value={currentInventory}
                onChange={setCurrentInventory}
                helper="Units currently available or ready to sell."
              />

              <Input
                label="Average monthly sales"
                value={monthlySales}
                onChange={setMonthlySales}
                helper="Use recent Etsy sales for this item, variation, or product type."
              />

              <Input
                label="Supplier or production lead time"
                value={leadTimeDays}
                onChange={setLeadTimeDays}
                suffix="days"
                helper="How many days it takes to make, receive, or prepare new inventory."
              />

              <Input
                label="Safety stock target"
                value={safetyStockDays}
                onChange={setSafetyStockDays}
                suffix="days"
                helper="Extra days of inventory you want as a buffer."
              />

              <Input
                label="Seasonal demand multiplier"
                value={seasonalMultiplier}
                onChange={setSeasonalMultiplier}
                suffix="%"
                helper="Use 100% for normal demand, 150% for a seasonal increase, or 75% for slower demand."
              />

              <Input
                label="Cost per unit"
                value={costPerUnit}
                onChange={setCostPerUnit}
                prefix="$"
              />

              <Input
                label="Planned restock quantity"
                value={plannedRestockQty}
                onChange={setPlannedRestockQty}
                helper="The number of units you are considering producing or ordering."
              />

              <Input
                label="Monthly holding cost per unit"
                value={holdingCostPerUnit}
                onChange={setHoldingCostPerUnit}
                prefix="$"
                helper="Optional estimate for storage, aging inventory, or cash tied up per unit."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on current inventory, demand, lead time, and restock
                  assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Days until stockout"
                value={`${number(result.daysUntilStockout)} days`}
                variant={
                  result.status === "Stockout Risk" ||
                  result.status === "Out of Stock"
                    ? "danger"
                    : result.status === "Restock Soon"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Recommended reorder point"
                value={`${number(result.reorderPoint)} units`}
                variant="info"
              />

              <ResultCard
                label="Recommended restock"
                value={`${number(result.recommendedRestockQty)} units`}
                variant={result.recommendedRestockQty > 0 ? "warning" : "good"}
              />

              <ResultCard
                label="Restock investment"
                value={money(result.recommendedInvestment)}
                variant="info"
              />

              <ResultCard
                label="Planned coverage"
                value={`${number(result.plannedCoverageDays)} days`}
                variant={
                  result.plannedCoverageDays > 120
                    ? "warning"
                    : result.plannedCoverageDays < 30
                    ? "danger"
                    : "good"
                }
              />

              <ResultCard
                label="Inventory after plan"
                value={`${number(result.plannedInventoryAfterRestock)} units`}
              />

              <ResultCard
                label="Adjusted monthly demand"
                value={`${number(Math.round(result.adjustedMonthlySales))} units`}
              />

              <ResultCard
                label="Monthly holding cost"
                value={money(result.monthlyHoldingCost)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                At your adjusted sales pace, you are selling about{" "}
                <span className="font-semibold">
                  {number(Number(result.dailySales.toFixed(2)))}
                </span>{" "}
                units per day. Your current inventory is estimated to last about{" "}
                <span className="font-semibold">
                  {number(result.daysUntilStockout)} days
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your suggested reorder point is{" "}
                <span className="font-semibold">
                  {number(result.reorderPoint)} units
                </span>
                . When inventory reaches this level, it may be time to produce
                or order more stock.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Restock scenario comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Scenario</th>
                      <th className="px-4 py-3">Restock</th>
                      <th className="px-4 py-3">Coverage</th>
                      <th className="px-4 py-3">Investment</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.label}
                        className={
                          row.label === "Current plan"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3">
                          {number(row.quantity)} units
                        </td>
                        <td className="px-4 py-3">
                          {number(row.coverageDays)} days
                        </td>
                        <td className="px-4 py-3">
                          {money(row.investment)}
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
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 outline-none"
        />

        {suffix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {suffix}
          </span>
        )}
      </div>

      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </label>
  );
}

function ResultCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "good" | "warning" | "danger" | "info";
}) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    danger: "border-red-300 bg-red-50",
    info: "border-blue-300 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Restock Soon" || status === "Overstock Risk"
      ? "bg-yellow-100 text-yellow-700"
      : status === "No Sales Data"
      ? "bg-blue-100 text-blue-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Healthy" || status === "Recommended"
      ? "bg-green-100 text-green-700"
      : status === "High stock" || status === "No restock"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}