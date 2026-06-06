"use client";

import { useMemo, useState } from "react";

type Status = "Healthy" | "Watch" | "Overstocked";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function pct(value: number) {
  return `${value.toFixed(1)}%`;
}

function clamp(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export default function PoshmarkInventoryRestockCalculatorPage() {
  const [currentUnlistedInventory, setCurrentUnlistedInventory] = useState(80);
  const [activeListings, setActiveListings] = useState(120);
  const [monthlySales, setMonthlySales] = useState(40);
  const [averageProfitPerSale, setAverageProfitPerSale] = useState(14);
  const [averageItemCost, setAverageItemCost] = useState(12);
  const [sourcingLeadTime, setSourcingLeadTime] = useState(14);
  const [targetStockWindow, setTargetStockWindow] = useState(45);
  const [safetyStock, setSafetyStock] = useState(10);
  const [storageCostPerItem, setStorageCostPerItem] = useState(0.15);
  const [targetSellThroughRate, setTargetSellThroughRate] = useState(25);
  const [slowInventoryPercent, setSlowInventoryPercent] = useState(20);

  const results = useMemo(() => {
    const availableInventory = currentUnlistedInventory + activeListings;
    const dailySales = monthlySales / 30;
    const leadTimeDemand = dailySales * sourcingLeadTime;
    const targetInventory = dailySales * targetStockWindow + safetyStock;
    const recommendedRestock = Math.max(
      0,
      Math.ceil(targetInventory + leadTimeDemand - availableInventory)
    );

    const estimatedRestockCost = recommendedRestock * averageItemCost;
    const daysOfStock = dailySales > 0 ? availableInventory / dailySales : 0;
    const sellThroughRate =
      activeListings > 0 ? (monthlySales / activeListings) * 100 : 0;
    const inventoryValue = availableInventory * averageItemCost;
    const monthlyStorageCost = availableInventory * storageCostPerItem;
    const expectedRestockProfit = recommendedRestock * averageProfitPerSale;

    const listingsNeededForTarget =
      targetSellThroughRate > 0
        ? Math.ceil(monthlySales / (targetSellThroughRate / 100))
        : 0;

    const listingGap = Math.max(0, listingsNeededForTarget - activeListings);
    const slowInventoryValue =
      availableInventory * (slowInventoryPercent / 100) * averageItemCost;

    let status: Status = "Healthy";
    if (daysOfStock > targetStockWindow * 2) status = "Overstocked";
    else if (daysOfStock < sourcingLeadTime + safetyStock) status = "Watch";

    const scenarios = [10, 15, 20, 25, 30, 40, 50].map((target) => {
      const listingsNeeded =
        target > 0 ? Math.ceil(monthlySales / (target / 100)) : 0;
      const gap = Math.max(0, listingsNeeded - activeListings);
      const inventoryNeeded = listingsNeeded + currentUnlistedInventory;
      const value = inventoryNeeded * averageItemCost;

      let scenarioStatus: Status = "Healthy";
      if (gap > activeListings * 0.5) scenarioStatus = "Watch";
      if (inventoryNeeded > availableInventory * 1.75)
        scenarioStatus = "Overstocked";

      return {
        target,
        listingsNeeded,
        gap,
        value,
        status: scenarioStatus,
      };
    });

    return {
      availableInventory,
      dailySales,
      leadTimeDemand,
      targetInventory,
      recommendedRestock,
      estimatedRestockCost,
      daysOfStock,
      sellThroughRate,
      inventoryValue,
      monthlyStorageCost,
      expectedRestockProfit,
      listingsNeededForTarget,
      listingGap,
      slowInventoryValue,
      status,
      scenarios,
    };
  }, [
    currentUnlistedInventory,
    activeListings,
    monthlySales,
    averageProfitPerSale,
    averageItemCost,
    sourcingLeadTime,
    targetStockWindow,
    safetyStock,
    storageCostPerItem,
    targetSellThroughRate,
    slowInventoryPercent,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Inventory Restock Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan Poshmark sourcing and restock decisions around active listings,
          unlisted inventory, monthly sales, sell-through rate, sourcing lead
          time, storage pressure, item cost, and profit per sale.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Inventory inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter current inventory, active closet listings, sales velocity,
              sourcing lead time, item cost, profit, storage cost, and target
              sell-through goals.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput
                label="Current unlisted inventory"
                value={currentUnlistedInventory}
                setValue={setCurrentUnlistedInventory}
              />
              <NumberInput
                label="Active listings"
                value={activeListings}
                setValue={setActiveListings}
              />
              <NumberInput
                label="Monthly sales"
                value={monthlySales}
                setValue={setMonthlySales}
              />
              <MoneyInput
                label="Average profit per sale"
                value={averageProfitPerSale}
                setValue={setAverageProfitPerSale}
              />
              <MoneyInput
                label="Average item cost"
                value={averageItemCost}
                setValue={setAverageItemCost}
              />
              <DaysInput
                label="Sourcing lead time"
                value={sourcingLeadTime}
                setValue={setSourcingLeadTime}
              />
              <DaysInput
                label="Target stock window"
                value={targetStockWindow}
                setValue={setTargetStockWindow}
              />
              <DaysInput
                label="Safety stock"
                value={safetyStock}
                setValue={setSafetyStock}
              />
              <MoneyInput
                label="Storage cost per item"
                value={storageCostPerItem}
                setValue={setStorageCostPerItem}
              />
              <PercentInput
                label="Target sell-through rate"
                value={targetSellThroughRate}
                setValue={setTargetSellThroughRate}
              />
              <PercentInput
                label="Slow inventory percent"
                value={slowInventoryPercent}
                setValue={setSlowInventoryPercent}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark demand, sourcing
              availability, buyer behavior, listing quality, shipping discounts,
              storage pressure, and sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark inventory and restock plan.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="yellow"
                title="Recommended restock"
                value={String(results.recommendedRestock)}
                text="Units needed to reach the target inventory window."
              />
              <ResultCard
                tone="yellow"
                title="Estimated restock cost"
                value={money(results.estimatedRestockCost)}
                text="Recommended restock units multiplied by average item cost."
              />
              <ResultCard
                tone="blue"
                title="Available inventory"
                value={String(results.availableInventory)}
                text="Current unlisted inventory plus active listings."
              />
              <ResultCard
                tone="yellow"
                title="Days of stock"
                value={`${results.daysOfStock.toFixed(1)} days`}
                text="Available inventory divided by daily sales."
              />
              <ResultCard
                tone="green"
                title="Sell-through rate"
                value={pct(results.sellThroughRate)}
                text="Monthly sales divided by active listings."
              />
              <ResultCard
                tone="blue"
                title="Target inventory"
                value={String(Math.ceil(results.targetInventory))}
                text="Units needed for the target stock window."
              />
              <ResultCard
                tone="yellow"
                title="Inventory value"
                value={money(results.inventoryValue)}
                text="Cash currently tied up in available inventory."
              />
              <ResultCard
                tone="yellow"
                title="Monthly storage cost"
                value={money(results.monthlyStorageCost)}
                text="Estimated monthly storage pressure."
              />
              <ResultCard
                tone="green"
                title="Expected restock profit"
                value={money(results.expectedRestockProfit)}
                text="Estimated profit from the recommended restock quantity."
              />
              <ResultCard
                tone="yellow"
                title="Slow inventory value"
                value={money(results.slowInventoryValue)}
                text="Estimated cost tied up in slow-moving inventory."
              />
              <ResultCard
                tone="blue"
                title="Listings needed for target"
                value={String(results.listingsNeededForTarget)}
                text="Active listings needed for the target sell-through rate."
              />
              <ResultCard
                tone="yellow"
                title="Listing gap"
                value={String(results.listingGap)}
                text="Additional active listings needed for the target."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                You currently have{" "}
                <strong>{results.availableInventory}</strong> available units,
                equal to about{" "}
                <strong>{results.daysOfStock.toFixed(1)} days</strong> of stock
                at the entered sales pace. The calculator recommends sourcing or
                preparing <strong>{results.recommendedRestock}</strong>{" "}
                additional units.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "Inventory appears balanced for the entered sales velocity and sourcing assumptions."
                  : results.status === "Watch"
                    ? "Inventory may run low before new items are sourced, prepared, and listed."
                    : "Inventory may be too high relative to current sales pace."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Sell-through target scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Target</th>
                      <th className="px-3 py-2">Listings needed</th>
                      <th className="px-3 py-2">Listing gap</th>
                      <th className="px-3 py-2">Inventory value</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.target} className="border-t">
                        <td className="px-3 py-2">{pct(row.target)}</td>
                        <td className="px-3 py-2">{row.listingsNeeded}</td>
                        <td className="px-3 py-2">{row.gap}</td>
                        <td className="px-3 py-2">{money(row.value)}</td>
                        <td className="px-3 py-2">
                          <StatusBadge status={row.status} />
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
            How to use this Poshmark Inventory Restock Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter inventory"
              text="Add unlisted inventory and active closet listing count."
            />
            <StepCard
              title="Add sales pace"
              text="Enter monthly sales, profit per sale, item cost, and storage cost."
            />
            <StepCard
              title="Set sourcing rules"
              text="Add lead time, safety stock, target stock window, and sell-through target."
            />
            <StepCard
              title="Review restock"
              text="Check whether to source more, list faster, or slow down buying."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark inventory breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the Poshmark restock estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Current unlisted inventory" value={String(currentUnlistedInventory)} />
              <Breakdown label="Active listings" value={String(activeListings)} />
              <Breakdown label="Available inventory" value={String(results.availableInventory)} />
              <Breakdown label="Daily sales" value={results.dailySales.toFixed(1)} />
              <Breakdown label="Lead-time demand" value={String(Math.ceil(results.leadTimeDemand))} />
              <Breakdown label="Safety stock units" value={String(safetyStock)} />
              <Breakdown label="Target inventory" value={String(Math.ceil(results.targetInventory))} />
              <Breakdown label="Recommended restock" value={String(results.recommendedRestock)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark restock mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Sourcing more inventory before checking sell-through rate.",
                "Counting unlisted inventory as productive inventory.",
                "Letting slow-moving items tie up cash and storage space.",
                "Buying more of an item type before checking actual profit.",
                "Ignoring how long it takes to clean, photograph, and list items.",
                "Planning sales goals without enough sourcing capacity.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark restock planning
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Track sell-through"
              text="Measure sales against active listing count, not total inventory."
            />
            <StepCard
              title="List inventory faster"
              text="Unlisted inventory cannot sell until it becomes an active listing."
            />
            <StepCard
              title="Protect cash flow"
              text="Avoid tying up too much money in slow-moving items."
            />
            <StepCard
              title="Source proven items"
              text="Buy more only after confirming profit, demand, and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/poshmark/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <span className="bg-slate-50 px-3 py-2 text-slate-500">$</span>
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
      </div>
    </label>
  );
}

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <input
        className="mt-1 w-full rounded border px-3 py-2 outline-none"
        type="number"
        value={value}
        onChange={(event) => setValue(clamp(Number(event.target.value)))}
      />
    </label>
  );
}

function DaysInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
        <span className="bg-slate-50 px-3 py-2 text-slate-500">days</span>
      </div>
    </label>
  );
}

function PercentInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
        <span className="bg-slate-50 px-3 py-2 text-slate-500">%</span>
      </div>
    </label>
  );
}

function ResultCard({
  title,
  value,
  text,
  tone,
}: {
  title: string;
  value: string;
  text: string;
  tone: "green" | "blue" | "yellow";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "blue"
        ? "border-blue-200 bg-blue-50"
        : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const className =
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Watch"
        ? "bg-amber-100 text-amber-700"
        : "bg-orange-100 text-orange-700";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
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
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
        !
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