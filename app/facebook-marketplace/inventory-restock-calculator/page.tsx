"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceInventoryRestockCalculatorPage() {
  const [currentUnlistedInventory, setCurrentUnlistedInventory] = useState(60);
  const [activeListings, setActiveListings] = useState(80);
  const [monthlySales, setMonthlySales] = useState(25);
  const [averageProfitPerSale, setAverageProfitPerSale] = useState(18);
  const [averageItemCost, setAverageItemCost] = useState(25);
  const [sourcingLeadTime, setSourcingLeadTime] = useState(10);
  const [targetStockWindow, setTargetStockWindow] = useState(45);
  const [safetyStockDays, setSafetyStockDays] = useState(7);
  const [storageCostPerItem, setStorageCostPerItem] = useState(0.2);
  const [targetSellThroughRate, setTargetSellThroughRate] = useState(25);
  const [slowInventoryPercent, setSlowInventoryPercent] = useState(20);

  const results = useMemo(() => {
    const availableInventory = currentUnlistedInventory + activeListings;
    const dailySales = monthlySales / 30;
    const daysOfStock = dailySales > 0 ? availableInventory / dailySales : 0;
    const leadTimeDemand = dailySales * sourcingLeadTime;
    const safetyStockUnits = dailySales * safetyStockDays;
    const targetInventory = dailySales * targetStockWindow + safetyStockUnits;
    const recommendedRestock = Math.max(
      0,
      Math.ceil(targetInventory - availableInventory)
    );
    const restockCost = recommendedRestock * averageItemCost;
    const sellThroughRate =
      activeListings > 0 ? (monthlySales / activeListings) * 100 : 0;
    const inventoryValue = availableInventory * averageItemCost;
    const monthlyStorageCost = availableInventory * storageCostPerItem;
    const slowInventoryUnits = Math.round(
      availableInventory * (slowInventoryPercent / 100)
    );
    const slowInventoryValue = slowInventoryUnits * averageItemCost;
    const expectedRestockProfit = recommendedRestock * averageProfitPerSale;
    const listingsNeededForTarget =
      targetSellThroughRate > 0
        ? Math.ceil(monthlySales / (targetSellThroughRate / 100))
        : 0;
    const listingGap = Math.max(0, listingsNeededForTarget - activeListings);
    const inventoryReplacementGap = Math.max(0, monthlySales - currentUnlistedInventory);

    let status = "Healthy";
    if (daysOfStock > targetStockWindow * 2) status = "Overstocked";
    else if (daysOfStock < sourcingLeadTime + safetyStockDays) status = "Restock";
    else if (sellThroughRate < targetSellThroughRate * 0.7) status = "Watch";

    return {
      availableInventory,
      dailySales,
      daysOfStock,
      leadTimeDemand,
      safetyStockUnits,
      targetInventory,
      recommendedRestock,
      restockCost,
      sellThroughRate,
      inventoryValue,
      monthlyStorageCost,
      slowInventoryUnits,
      slowInventoryValue,
      expectedRestockProfit,
      listingsNeededForTarget,
      listingGap,
      inventoryReplacementGap,
      status,
    };
  }, [
    currentUnlistedInventory,
    activeListings,
    monthlySales,
    averageProfitPerSale,
    averageItemCost,
    sourcingLeadTime,
    targetStockWindow,
    safetyStockDays,
    storageCostPerItem,
    targetSellThroughRate,
    slowInventoryPercent,
  ]);

  const statusTone: Tone =
    results.status === "Healthy"
      ? "green"
      : results.status === "Restock"
        ? "blue"
        : "yellow";

  const targetRows = [10, 15, 20, 25, 30, 40, 50].map((target) => {
    const listingsNeeded = target > 0 ? Math.ceil(monthlySales / (target / 100)) : 0;
    const listingGap = Math.max(0, listingsNeeded - activeListings);
    const inventoryValue = listingsNeeded * averageItemCost;

    let status = "Healthy";
    if (listingGap > activeListings) status = "Stretch";
    else if (listingGap > 0) status = "Watch";
    else if (results.daysOfStock > targetStockWindow * 2) status = "Overstocked";

    return {
      target,
      listingsNeeded,
      listingGap,
      inventoryValue,
      status,
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Inventory Restock Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Plan Facebook Marketplace sourcing and restock decisions around active
          listings, unlisted inventory, monthly sales, sell-through rate,
          sourcing lead time, storage pressure, item cost, and profit per sale.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Inventory inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter current inventory, active listings, sales velocity, sourcing
              lead time, item cost, profit per sale, storage cost, and target
              sell-through goals.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput
                label="Current unlisted inventory"
                value={currentUnlistedInventory}
                onChange={setCurrentUnlistedInventory}
              />
              <NumberInput
                label="Active listings"
                value={activeListings}
                onChange={setActiveListings}
              />
              <NumberInput
                label="Monthly sales"
                value={monthlySales}
                onChange={setMonthlySales}
              />
              <MoneyInput
                label="Average profit per sale"
                value={averageProfitPerSale}
                onChange={setAverageProfitPerSale}
              />
              <MoneyInput
                label="Average item cost"
                value={averageItemCost}
                onChange={setAverageItemCost}
              />
              <NumberInput
                label="Sourcing lead time"
                value={sourcingLeadTime}
                onChange={setSourcingLeadTime}
                suffix="days"
              />
              <NumberInput
                label="Target stock window"
                value={targetStockWindow}
                onChange={setTargetStockWindow}
                suffix="days"
              />
              <NumberInput
                label="Safety stock"
                value={safetyStockDays}
                onChange={setSafetyStockDays}
                suffix="days"
              />
              <MoneyInput
                label="Storage cost per item"
                value={storageCostPerItem}
                onChange={setStorageCostPerItem}
              />
              <NumberInput
                label="Target sell-through rate"
                value={targetSellThroughRate}
                onChange={setTargetSellThroughRate}
                suffix="%"
              />
              <NumberInput
                label="Slow inventory percent"
                value={slowInventoryPercent}
                onChange={setSlowInventoryPercent}
                suffix="%"
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace demand,
              buyer behavior, local competition, listing quality, pickup
              friction, sourcing availability, storage pressure, and
              sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace inventory and restock plan.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Recommended restock"
                value={String(results.recommendedRestock)}
                tone={results.recommendedRestock > 0 ? "blue" : "yellow"}
                text="Units needed to reach the target inventory window."
              />
              <ResultCard
                label="Estimated restock cost"
                value={formatMoney(results.restockCost)}
                tone="yellow"
                text="Recommended restock units multiplied by average item cost."
              />
              <ResultCard
                label="Available inventory"
                value={String(results.availableInventory)}
                tone="blue"
                text="Current unlisted inventory plus active listings."
              />
              <ResultCard
                label="Days of stock"
                value={`${results.daysOfStock.toFixed(1)} days`}
                tone={
                  results.daysOfStock >= sourcingLeadTime + safetyStockDays &&
                  results.daysOfStock <= targetStockWindow * 2
                    ? "green"
                    : "yellow"
                }
                text="Available inventory divided by daily sales."
              />
              <ResultCard
                label="Sell-through rate"
                value={`${results.sellThroughRate.toFixed(1)}%`}
                tone={
                  results.sellThroughRate >= targetSellThroughRate
                    ? "green"
                    : "yellow"
                }
                text="Monthly sales divided by active listings."
              />
              <ResultCard
                label="Target inventory"
                value={String(Math.ceil(results.targetInventory))}
                tone="blue"
                text="Units needed for the target stock window plus safety stock."
              />
              <ResultCard
                label="Inventory value"
                value={formatMoney(results.inventoryValue)}
                tone="yellow"
                text="Cash currently tied up in available inventory."
              />
              <ResultCard
                label="Monthly storage cost"
                value={formatMoney(results.monthlyStorageCost)}
                tone="yellow"
                text="Estimated monthly storage pressure."
              />
              <ResultCard
                label="Expected restock profit"
                value={formatMoney(results.expectedRestockProfit)}
                tone={results.expectedRestockProfit > 0 ? "green" : "yellow"}
                text="Estimated profit from the recommended restock quantity."
              />
              <ResultCard
                label="Slow inventory value"
                value={formatMoney(results.slowInventoryValue)}
                tone="yellow"
                text="Estimated cost tied up in slow-moving inventory."
              />
              <ResultCard
                label="Listings needed for target"
                value={String(results.listingsNeededForTarget)}
                tone="blue"
                text="Active listings needed for the target sell-through rate."
              />
              <ResultCard
                label="Listing gap"
                value={String(results.listingGap)}
                tone={results.listingGap === 0 ? "green" : "yellow"}
                text="Additional active listings needed for the target."
              />
              <ResultCard
                label="Inventory replacement gap"
                value={String(results.inventoryReplacementGap)}
                tone={results.inventoryReplacementGap === 0 ? "green" : "yellow"}
                text="Sales not covered by current unlisted inventory."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                You currently have about{" "}
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
                  ? "Inventory appears balanced under the entered assumptions."
                  : results.status === "Restock"
                    ? "Inventory may run short before replacement items are sourced and listed."
                    : results.status === "Overstocked"
                      ? "Inventory may be too high relative to current sales pace."
                      : "Inventory may need closer review before sourcing more."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">
                Sell-through target scenario comparison
              </h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Target</th>
                      <th className="border px-3 py-2">Listings needed</th>
                      <th className="border px-3 py-2">Listing gap</th>
                      <th className="border px-3 py-2">Inventory value</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetRows.map((row) => (
                      <tr key={row.target} className="border">
                        <td className="border px-3 py-2">
                          {row.target.toFixed(1)}%
                        </td>
                        <td className="border px-3 py-2">
                          {row.listingsNeeded}
                        </td>
                        <td className="border px-3 py-2">{row.listingGap}</td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.inventoryValue)}
                        </td>
                        <td className="border px-3 py-2">
                          <StatusBadge
                            tone={
                              row.status === "Healthy"
                                ? "green"
                                : row.status === "Stretch"
                                  ? "red"
                                  : "yellow"
                            }
                            label={row.status}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Facebook Marketplace Inventory Restock Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter inventory"
              text="Add unlisted inventory and active listing count."
            />
            <InfoCard
              title="Add sales pace"
              text="Enter monthly sales, profit per sale, item cost, and storage cost."
            />
            <InfoCard
              title="Set sourcing rules"
              text="Add lead time, safety stock, target stock window, and sell-through target."
            />
            <InfoCard
              title="Review restock"
              text="Check whether to source more, list faster, or slow down buying."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace inventory breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the Facebook Marketplace restock estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Current unlisted inventory" value={String(currentUnlistedInventory)} />
              <Breakdown label="Active listings" value={String(activeListings)} />
              <Breakdown label="Available inventory" value={String(results.availableInventory)} />
              <Breakdown label="Daily sales" value={results.dailySales.toFixed(1)} />
              <Breakdown label="Lead-time demand" value={results.leadTimeDemand.toFixed(0)} />
              <Breakdown label="Safety stock units" value={results.safetyStockUnits.toFixed(0)} />
              <Breakdown label="Target inventory" value={String(Math.ceil(results.targetInventory))} />
              <Breakdown label="Recommended restock" value={String(results.recommendedRestock)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace restock mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Sourcing more inventory before checking sell-through rate.",
                "Counting unlisted inventory as productive inventory before it is listed.",
                "Buying too many similar items before checking local demand.",
                "Ignoring how long items take to clean, photograph, describe, and list.",
                "Planning sales goals without enough sourcing or listing capacity.",
                "Letting slow-moving inventory take up cash and space without action.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace restock planning
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Track sell-through"
              text="Measure sold items against active listing count, not total inventory."
            />
            <InfoCard
              title="List inventory faster"
              text="Unlisted inventory cannot sell until it becomes an active listing."
            />
            <InfoCard
              title="Protect cash flow"
              text="Avoid tying up too much money in slow-moving items."
            />
            <InfoCard
              title="Source proven items"
              text="Buy more only after confirming profit, demand, and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/facebook-marketplace/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {suffix ? (
          <span className="border-l bg-slate-50 px-3 py-2 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        <span className="border-r bg-slate-50 px-3 py-2 text-sm text-slate-500">
          $
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full px-3 py-2 text-sm outline-none"
        />
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  tone,
  text,
}: {
  label: string;
  value: string;
  tone: Tone;
  text: string;
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "red"
        ? "border-red-200 bg-red-50"
        : tone === "blue"
          ? "border-blue-200 bg-blue-50"
          : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-sm font-bold">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ tone, label }: { tone: Tone; label: string }) {
  const toneClass =
    tone === "green"
      ? "bg-green-100 text-green-700"
      : tone === "red"
        ? "bg-red-100 text-red-700"
        : tone === "blue"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${toneClass}`}>
      {label}
    </span>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
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

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}