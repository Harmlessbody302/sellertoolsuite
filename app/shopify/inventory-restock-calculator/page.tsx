"use client";

import { useMemo, useState } from "react";

type Status = "Urgent" | "Soon" | "Healthy" | "Overstocked";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function numberFormat(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function days(value: number) {
  return `${value.toFixed(1)} days`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ShopifyInventoryRestockCalculatorPage() {
  const [currentInventory, setCurrentInventory] = useState(180);
  const [averageDailySales, setAverageDailySales] = useState(8);
  const [leadTimeDays, setLeadTimeDays] = useState(14);
  const [safetyStockDays, setSafetyStockDays] = useState(7);
  const [targetStockDays, setTargetStockDays] = useState(45);
  const [incomingInventory, setIncomingInventory] = useState(40);
  const [unitCost, setUnitCost] = useState(14);
  const [salePrice, setSalePrice] = useState(45);
  const [storageCostPerUnit, setStorageCostPerUnit] = useState(0.1);
  const [salesGrowthPercent, setSalesGrowthPercent] = useState(10);
  const [seasonalBufferPercent, setSeasonalBufferPercent] = useState(15);

  const results = useMemo(() => {
    const safeCurrentInventory = Math.max(0, currentInventory);
    const safeAverageDailySales = Math.max(0, averageDailySales);
    const safeLeadTimeDays = Math.max(0, leadTimeDays);
    const safeSafetyStockDays = Math.max(0, safetyStockDays);
    const safeTargetStockDays = Math.max(0, targetStockDays);
    const safeIncomingInventory = Math.max(0, incomingInventory);
    const safeUnitCost = Math.max(0, unitCost);
    const safeSalePrice = Math.max(0, salePrice);
    const safeStorageCostPerUnit = Math.max(0, storageCostPerUnit);
    const safeSalesGrowthPercent = clamp(salesGrowthPercent, -100, 500);
    const safeSeasonalBufferPercent = clamp(seasonalBufferPercent, 0, 500);

    const adjustedDailySales =
      safeAverageDailySales *
      (1 + safeSalesGrowthPercent / 100) *
      (1 + safeSeasonalBufferPercent / 100);

    const availableInventory = safeCurrentInventory + safeIncomingInventory;

    const daysOfStock =
      adjustedDailySales > 0 ? availableInventory / adjustedDailySales : 0;

    const reorderPoint =
      adjustedDailySales * (safeLeadTimeDays + safeSafetyStockDays);

    const targetInventory = adjustedDailySales * safeTargetStockDays;

    const recommendedRestockUnits = Math.max(
      0,
      Math.ceil(targetInventory - availableInventory)
    );

    const restockCost = recommendedRestockUnits * safeUnitCost;

    const inventoryValue = availableInventory * safeUnitCost;

    const potentialRevenue = availableInventory * safeSalePrice;

    const potentialGrossProfit =
      availableInventory * Math.max(0, safeSalePrice - safeUnitCost);

    const daysUntilReorder =
      adjustedDailySales > 0
        ? Math.max(0, (availableInventory - reorderPoint) / adjustedDailySales)
        : 0;

    const estimatedStockoutDate =
      adjustedDailySales > 0 ? daysOfStock : 0;

    const unitsSoldDuringLeadTime = adjustedDailySales * safeLeadTimeDays;

    const safetyStockUnits = adjustedDailySales * safeSafetyStockDays;

    const monthlyStorageCost = availableInventory * safeStorageCostPerUnit;

    const overstockUnits = Math.max(0, availableInventory - targetInventory);

    const missedSalesDuringStockout =
      adjustedDailySales > 0 && availableInventory < reorderPoint
        ? reorderPoint - availableInventory
        : 0;

    const missedRevenueRisk = missedSalesDuringStockout * safeSalePrice;

    const status: Status =
      availableInventory <= reorderPoint
        ? "Urgent"
        : daysUntilReorder <= 7
          ? "Soon"
          : availableInventory > targetInventory * 1.35
            ? "Overstocked"
            : "Healthy";

    const statusText =
      status === "Urgent"
        ? "Inventory is at or below the reorder point. Restocking should be treated as urgent."
        : status === "Soon"
          ? "Inventory is still above the reorder point, but restocking should be planned soon."
          : status === "Overstocked"
            ? "Inventory appears high compared with your target stock window."
            : "Inventory appears healthy under the entered sales and lead-time assumptions.";

    const scenarios = [0, 5, 10, 15, 20, 30, 50].map((growth) => {
      const scenarioDailySales =
        safeAverageDailySales *
        (1 + growth / 100) *
        (1 + safeSeasonalBufferPercent / 100);

      const scenarioDaysOfStock =
        scenarioDailySales > 0 ? availableInventory / scenarioDailySales : 0;

      const scenarioReorderPoint =
        scenarioDailySales * (safeLeadTimeDays + safeSafetyStockDays);

      const scenarioTargetInventory =
        scenarioDailySales * safeTargetStockDays;

      const scenarioRestockUnits = Math.max(
        0,
        Math.ceil(scenarioTargetInventory - availableInventory)
      );

      const scenarioStatus: Status =
        availableInventory <= scenarioReorderPoint
          ? "Urgent"
          : scenarioDailySales > 0 &&
              (availableInventory - scenarioReorderPoint) / scenarioDailySales <= 7
            ? "Soon"
            : availableInventory > scenarioTargetInventory * 1.35
              ? "Overstocked"
              : "Healthy";

      return {
        growth,
        dailySales: scenarioDailySales,
        daysOfStock: scenarioDaysOfStock,
        reorderPoint: scenarioReorderPoint,
        restockUnits: scenarioRestockUnits,
        status: scenarioStatus,
      };
    });

    return {
      adjustedDailySales,
      availableInventory,
      daysOfStock,
      reorderPoint,
      targetInventory,
      recommendedRestockUnits,
      restockCost,
      inventoryValue,
      potentialRevenue,
      potentialGrossProfit,
      daysUntilReorder,
      estimatedStockoutDate,
      unitsSoldDuringLeadTime,
      safetyStockUnits,
      monthlyStorageCost,
      overstockUnits,
      missedRevenueRisk,
      status,
      statusText,
      scenarios,
    };
  }, [
    currentInventory,
    averageDailySales,
    leadTimeDays,
    safetyStockDays,
    targetStockDays,
    incomingInventory,
    unitCost,
    salePrice,
    storageCostPerUnit,
    salesGrowthPercent,
    seasonalBufferPercent,
  ]);

  const statusClass =
    results.status === "Urgent"
      ? "bg-red-50 text-red-700 border-red-200"
      : results.status === "Soon"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : results.status === "Overstocked"
          ? "bg-orange-50 text-orange-700 border-orange-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Inventory Restock Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate Shopify restock timing, reorder quantity, inventory cost,
          sales velocity, lead time, safety stock, stockout risk, and cash tied
          up in inventory.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Inventory inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your current stock, sales velocity, supplier lead time,
              safety stock, incoming inventory, and unit economics.
            </p>

            <div className="mt-5 space-y-4">
              <Input
                label="Current inventory"
                value={currentInventory}
                onChange={setCurrentInventory}
              />
              <Input
                label="Average daily sales"
                value={averageDailySales}
                onChange={setAverageDailySales}
              />
              <Input
                label="Supplier lead time"
                value={leadTimeDays}
                suffix="days"
                onChange={setLeadTimeDays}
              />
              <Input
                label="Safety stock"
                value={safetyStockDays}
                suffix="days"
                onChange={setSafetyStockDays}
              />
              <Input
                label="Target stock window"
                value={targetStockDays}
                suffix="days"
                onChange={setTargetStockDays}
              />
              <Input
                label="Incoming inventory"
                value={incomingInventory}
                onChange={setIncomingInventory}
              />
              <Input
                label="Unit cost"
                value={unitCost}
                prefix="$"
                onChange={setUnitCost}
              />
              <Input
                label="Sale price"
                value={salePrice}
                prefix="$"
                onChange={setSalePrice}
              />
              <Input
                label="Monthly storage cost per unit"
                value={storageCostPerUnit}
                prefix="$"
                onChange={setStorageCostPerUnit}
              />
              <Input
                label="Expected sales growth"
                value={salesGrowthPercent}
                suffix="%"
                onChange={setSalesGrowthPercent}
              />
              <Input
                label="Seasonal buffer"
                value={seasonalBufferPercent}
                suffix="%"
                onChange={setSeasonalBufferPercent}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Shopify restock needs can
              vary by supplier reliability, sales spikes, seasonality, ad spend,
              stockouts, returns, cash flow, and fulfillment capacity.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify inventory restock plan.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Recommended restock"
                value={numberFormat(results.recommendedRestockUnits)}
                note="Units needed to reach the target stock window."
                tone={results.recommendedRestockUnits > 0 ? "yellow" : "green"}
              />
              <ResultCard
                label="Estimated restock cost"
                value={money(results.restockCost)}
                note="Recommended restock units multiplied by unit cost."
                tone="yellow"
              />
              <ResultCard
                label="Available inventory"
                value={numberFormat(results.availableInventory)}
                note="Current inventory plus incoming inventory."
                tone="blue"
              />
              <ResultCard
                label="Days of stock"
                value={days(results.daysOfStock)}
                note="Available inventory divided by adjusted daily sales."
                tone="blue"
              />
              <ResultCard
                label="Reorder point"
                value={numberFormat(results.reorderPoint)}
                note="Units needed to cover lead time and safety stock."
                tone="yellow"
              />
              <ResultCard
                label="Days until reorder"
                value={days(results.daysUntilReorder)}
                note="Estimated days before inventory reaches reorder point."
                tone={results.status === "Urgent" ? "red" : "green"}
              />
              <ResultCard
                label="Adjusted daily sales"
                value={numberFormat(results.adjustedDailySales)}
                note="Daily sales after growth and seasonal buffer."
                tone="blue"
              />
              <ResultCard
                label="Target inventory"
                value={numberFormat(results.targetInventory)}
                note="Units needed for the target stock window."
                tone="blue"
              />
              <ResultCard
                label="Inventory value"
                value={money(results.inventoryValue)}
                note="Cash currently tied up in available inventory."
                tone="yellow"
              />
              <ResultCard
                label="Monthly storage cost"
                value={money(results.monthlyStorageCost)}
                note="Estimated monthly cost to hold available inventory."
                tone="yellow"
              />
              <ResultCard
                label="Potential revenue"
                value={money(results.potentialRevenue)}
                note="Revenue if available inventory sells at the entered price."
                tone="green"
              />
              <ResultCard
                label="Stockout revenue risk"
                value={money(results.missedRevenueRisk)}
                note="Estimated sales at risk if inventory is below reorder needs."
                tone={results.missedRevenueRisk > 0 ? "red" : "green"}
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                You currently have an estimated{" "}
                <strong>{numberFormat(results.availableInventory)}</strong> units
                available, equal to about{" "}
                <strong>{days(results.daysOfStock)}</strong> of stock after growth
                and seasonal buffer assumptions.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your reorder point is estimated at{" "}
                <strong>{numberFormat(results.reorderPoint)}</strong> units. To
                reach your target stock window, this calculator recommends
                restocking{" "}
                <strong>{numberFormat(results.recommendedRestockUnits)}</strong>{" "}
                units at an estimated cost of{" "}
                <strong>{money(results.restockCost)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Sales growth scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Growth</th>
                      <th className="px-3 py-2">Daily sales</th>
                      <th className="px-3 py-2">Days stock</th>
                      <th className="px-3 py-2">Restock units</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario) => (
                      <tr key={scenario.growth} className="border-t bg-white">
                        <td className="px-3 py-2 font-medium">
                          {scenario.growth.toFixed(0)}%
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.dailySales)}
                        </td>
                        <td className="px-3 py-2">
                          {days(scenario.daysOfStock)}
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.restockUnits)}
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
            How to use this Shopify Inventory Restock Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter inventory"
              text="Add current units on hand and any incoming inventory already ordered."
            />
            <StepCard
              title="Add sales velocity"
              text="Enter average daily sales, growth expectations, and seasonal buffer."
            />
            <StepCard
              title="Set restock rules"
              text="Add supplier lead time, safety stock, and the target stock window."
            />
            <StepCard
              title="Review restock plan"
              text="Check reorder point, restock quantity, stockout risk, and inventory cost."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify inventory breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the restock estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Current inventory" value={numberFormat(currentInventory)} />
              <Breakdown label="Incoming inventory" value={numberFormat(incomingInventory)} />
              <Breakdown label="Available inventory" value={numberFormat(results.availableInventory)} />
              <Breakdown label="Adjusted daily sales" value={numberFormat(results.adjustedDailySales)} />
              <Breakdown label="Lead-time demand" value={numberFormat(results.unitsSoldDuringLeadTime)} />
              <Breakdown label="Safety stock units" value={numberFormat(results.safetyStockUnits)} />
              <Breakdown label="Target inventory" value={numberFormat(results.targetInventory)} />
              <Breakdown label="Recommended restock" value={numberFormat(results.recommendedRestockUnits)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify restock mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Restocking only after inventory is already nearly sold out." />
              <Warning text="Ignoring supplier lead time when calculating reorder timing." />
              <Warning text="Using average sales without a seasonal or growth buffer." />
              <Warning text="Ordering too much inventory without checking cash tied up in stock." />
              <Warning text="Not separating fast-moving products from slow-moving products." />
              <Warning text="Forgetting incoming inventory that is already on order." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Understanding your Shopify restock result
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-red-700">Urgent:</strong> Inventory is at
                or below the reorder point and may need immediate restocking.
              </p>
              <p>
                <strong className="text-yellow-700">Soon:</strong> Inventory is
                above the reorder point, but restocking should be planned soon.
              </p>
              <p>
                <strong className="text-emerald-700">Healthy:</strong> Inventory
                appears balanced for your sales velocity and target stock window.
              </p>
              <p>
                <strong className="text-orange-700">Overstocked:</strong> Inventory
                may be higher than needed and could tie up cash or storage capacity.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Current inventory and incoming inventory already ordered." />
              <Check text="Average daily sales or recent sales velocity." />
              <Check text="Supplier production, shipping, and receiving lead time." />
              <Check text="Safety stock for delays, demand spikes, or seasonality." />
              <Check text="Target stock window based on cash flow and reorder schedule." />
              <Check text="Unit cost, sale price, and storage cost per unit." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify restock planning</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track sales velocity"
              text="Monitor units sold per day by product instead of relying only on total store sales."
            />
            <StepCard
              title="Add safety stock"
              text="Use extra inventory for supplier delays, seasonal demand, ads, or sudden sales spikes."
            />
            <StepCard
              title="Protect cash flow"
              text="Avoid tying too much money in slow-moving inventory that takes months to sell."
            />
            <StepCard
              title="Plan ahead"
              text="Place reorder decisions before inventory falls below the lead-time demand window."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/shopify/bundle-pricing-calculator" label="Bundle Pricing Calculator" />
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
    status === "Urgent"
      ? "rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700"
      : status === "Soon"
        ? "rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700"
        : status === "Overstocked"
          ? "rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700"
          : "rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700";

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
          Included in the inventory restock estimate.
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