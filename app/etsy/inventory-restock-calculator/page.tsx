"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "blue" | "warning" | "bad";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    blue: "border-blue-200 bg-blue-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-gray-600">{helper}</p> : null}
    </div>
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
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border border-gray-400 bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix ? (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 text-gray-950 outline-none"
        />

        {suffix ? (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {suffix}
          </span>
        ) : null}
      </div>

      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Restock Soon" || status === "Overstock Risk"
        ? "bg-amber-100 text-amber-700"
        : status === "No Sales Data"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Healthy" || status === "Recommended"
      ? "bg-emerald-100 text-emerald-700"
      : status === "High stock" || status === "No restock"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

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
      Math.ceil(adjustedMonthlySales + reorderPoint - inventory),
    );

    const plannedInventoryAfterRestock = inventory + restockQty;
    const plannedCoverageDays =
      dailySales > 0 ? Math.floor(plannedInventoryAfterRestock / dailySales) : 0;

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
        "Enter average monthly sales to estimate stockout timing and restock needs.";
      recommendation =
        "Use recent Etsy order history for the same item, variation, or product type.";
    } else if (inventory <= 0) {
      status = "Out of Stock";
      statusText =
        "This item appears to be out of stock based on the inventory entered.";
      recommendation =
        "Restock as soon as possible if this listing is profitable and still receiving demand.";
    } else if (daysUntilStockout < leadTime) {
      status = "Stockout Risk";
      statusText = "Your inventory may run out before a new restock arrives.";
      recommendation =
        "Increase your restock quantity, shorten production lead time, or pause promotion until stock is safer.";
    } else if (reorderNeeded) {
      status = "Restock Soon";
      statusText =
        "Your inventory is at or below the recommended reorder point.";
      recommendation =
        "Place a restock order soon to reduce the risk of running out before the next batch arrives.";
    } else if (plannedCoverageDays > 120) {
      status = "Overstock Risk";
      statusText =
        "Your planned restock may create more inventory than you need for the near term.";
      recommendation =
        "Consider a smaller restock unless this item has strong seasonal demand or bulk production savings.";
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
      else if (coverageDays < leadTime + safetyDays) {
        scenarioStatus = "Risky";
      } else if (coverageDays > 120) {
        scenarioStatus = "High stock";
      } else if (scenario.label === "Balanced") {
        scenarioStatus = "Recommended";
      }

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

  const statusTone =
    result.status === "Healthy"
      ? "good"
      : result.status === "Restock Soon" ||
          result.status === "Overstock Risk" ||
          result.status === "No Sales Data"
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Inventory Restock Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate when to restock, how many units to order, and how long your
          Etsy inventory will last based on sales pace, lead time, safety stock,
          and seasonal demand.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Inventory inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Use recent sales data for one listing, variation, or product type.
            Adjust the seasonal multiplier if demand is expected to rise or
            fall.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Current demand
              </h3>

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
                  label="Seasonal demand multiplier"
                  value={seasonalMultiplier}
                  onChange={setSeasonalMultiplier}
                  suffix="%"
                  helper="Use 100% for normal demand, 150% for higher seasonal demand, or 75% for slower demand."
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Restock timing
              </h3>

              <div className="space-y-4">
                <Input
                  label="Supplier or production lead time"
                  value={leadTimeDays}
                  onChange={setLeadTimeDays}
                  suffix="days"
                  helper="Days needed to make, receive, or prepare new inventory."
                />

                <Input
                  label="Safety stock target"
                  value={safetyStockDays}
                  onChange={setSafetyStockDays}
                  suffix="days"
                  helper="Extra days of inventory you want as a buffer."
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Restock cost planning
              </h3>

              <div className="space-y-4">
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
                  helper="Units you are considering producing or ordering."
                />

                <Input
                  label="Monthly holding cost per unit"
                  value={holdingCostPerUnit}
                  onChange={setHoldingCostPerUnit}
                  prefix="$"
                  helper="Optional estimate for storage, aging inventory, or cash tied up per unit."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Actual demand can change because of
            seasonality, ads, ranking changes, supplier delays, bulk orders,
            cancellations, and product variation differences.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Inventory restock guidance at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Days until stockout"
              value={`${number(result.daysUntilStockout)} days`}
              helper="Estimated days current inventory will last"
              tone={statusTone}
            />

            <MetricCard
              label="Recommended reorder point"
              value={`${number(result.reorderPoint)} units`}
              helper="Lead time demand plus safety stock"
              tone="blue"
            />

            <MetricCard
              label="Recommended restock"
              value={`${number(result.recommendedRestockQty)} units`}
              helper="Suggested units to produce or order"
              tone={result.recommendedRestockQty > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Recommended investment"
              value={money(result.recommendedInvestment)}
              helper="Recommended restock × unit cost"
              tone="blue"
            />

            <MetricCard
              label="Planned coverage"
              value={`${number(result.plannedCoverageDays)} days`}
              helper="Estimated coverage after planned restock"
              tone={
                result.plannedCoverageDays > 120
                  ? "warning"
                  : result.plannedCoverageDays < 30
                    ? "bad"
                    : "good"
              }
            />

            <MetricCard
              label="Inventory after plan"
              value={`${number(result.plannedInventoryAfterRestock)} units`}
              helper="Current inventory plus planned restock"
            />

            <MetricCard
              label="Adjusted monthly demand"
              value={`${number(Math.round(result.adjustedMonthlySales))} units`}
              helper="Monthly sales after seasonal adjustment"
            />

            <MetricCard
              label="Monthly holding cost"
              value={money(result.monthlyHoldingCost)}
              helper="Estimated carrying cost after planned restock"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At your adjusted sales pace, you are selling about{" "}
                <strong>{number(Number(result.dailySales.toFixed(2)))}</strong>{" "}
                units per day. Your current inventory is estimated to last about{" "}
                <strong>{number(result.daysUntilStockout)} days</strong>.
              </p>

              <p>
                Your suggested reorder point is{" "}
                <strong>{number(result.reorderPoint)} units</strong>. When
                inventory reaches this level, it may be time to produce or order
                more stock.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Restock scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
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
                          ? "bg-blue-50 font-bold"
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
                      <td className="px-4 py-3">{money(row.investment)}</td>
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
          How to use this Etsy Inventory Restock Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter inventory",
              "Use the number of units currently ready to sell for a listing, variation, or product group.",
            ],
            [
              "Add sales pace",
              "Enter average monthly sales and adjust for seasonal demand if needed.",
            ],
            [
              "Set lead time",
              "Include the time needed to make, receive, prepare, or package a new batch.",
            ],
            [
              "Compare restocks",
              "Review conservative, balanced, aggressive, and current-plan restock scenarios.",
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
            Common inventory mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Waiting until inventory is nearly gone before starting a restock.",
              "Ignoring supplier, production, or packaging lead time.",
              "Underestimating seasonal spikes from holidays, ads, or marketplace trends.",
              "Overstocking slow-moving products and tying up too much cash.",
              "Using total shop sales instead of item-level or variation-level demand.",
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

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Understanding your results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-emerald-700">Healthy:</strong> Current
              inventory appears balanced against demand and lead time.
            </p>

            <p>
              <strong className="text-amber-700">Restock Soon:</strong>{" "}
              Inventory is near or below the suggested reorder point.
            </p>

            <p>
              <strong className="text-red-700">Stockout Risk:</strong> Inventory
              may run out before a new batch arrives.
            </p>

            <p>
              <strong className="text-amber-700">Overstock Risk:</strong> Your
              planned restock may create more inventory than needed soon.
            </p>

            <p>
              <strong className="text-blue-700">No Sales Data:</strong> Add
              monthly sales to estimate stockout timing and restock needs.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
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