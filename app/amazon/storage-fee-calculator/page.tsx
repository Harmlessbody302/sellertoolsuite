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

export default function AmazonStorageFeeCalculatorPage() {
  const [unitsStored, setUnitsStored] = useState("300");
  const [unitVolume, setUnitVolume] = useState("0.15");
  const [monthlyStorageRate, setMonthlyStorageRate] = useState("0.87");
  const [monthsStored, setMonthsStored] = useState("3");
  const [agedInventoryFee, setAgedInventoryFee] = useState("0.25");
  const [removalCostPerUnit, setRemovalCostPerUnit] = useState("0.5");
  const [unitsRemoved, setUnitsRemoved] = useState("25");
  const [salePrice, setSalePrice] = useState("35");
  const [profitPerUnitBeforeStorage, setProfitPerUnitBeforeStorage] =
    useState("8");
  const [monthlyUnitsSold, setMonthlyUnitsSold] = useState("100");
  const [productCostPerUnit, setProductCostPerUnit] = useState("12");
  const [extraMonthlyCosts, setExtraMonthlyCosts] = useState("20");

  const results = useMemo(() => {
    const units = safeNumber(unitsStored);
    const cubicFeet = safeNumber(unitVolume);
    const storageRate = safeNumber(monthlyStorageRate);
    const months = safeNumber(monthsStored);
    const agedFee = safeNumber(agedInventoryFee);
    const removalCost = safeNumber(removalCostPerUnit);
    const removedUnits = safeNumber(unitsRemoved);
    const price = safeNumber(salePrice);
    const profitBeforeStorage = safeNumber(profitPerUnitBeforeStorage);
    const unitsSold = safeNumber(monthlyUnitsSold);
    const productCost = safeNumber(productCostPerUnit);
    const extraCosts = safeNumber(extraMonthlyCosts);

    const totalCubicFeet = units * cubicFeet;
    const monthlyStorageCost = totalCubicFeet * storageRate;
    const storageCostAcrossMonths = monthlyStorageCost * months;
    const agedInventoryCost = units * agedFee;
    const removalCostTotal = removedUnits * removalCost;

    const totalStorageCost =
      storageCostAcrossMonths + agedInventoryCost + removalCostTotal + extraCosts;

    const storageCostPerUnit = units > 0 ? totalStorageCost / units : 0;
    const monthlyStorageCostPerUnit = units > 0 ? monthlyStorageCost / units : 0;

    const grossProfitBeforeStorage = unitsSold * profitBeforeStorage;
    const adjustedMonthlyProfit =
      grossProfitBeforeStorage - monthlyStorageCost - agedInventoryCost - extraCosts;

    const adjustedProfitPerSoldUnit =
      unitsSold > 0 ? adjustedMonthlyProfit / unitsSold : 0;

    const storageShareOfProfit =
      grossProfitBeforeStorage > 0
        ? ((monthlyStorageCost + agedInventoryCost + extraCosts) /
            grossProfitBeforeStorage) *
          100
        : 0;

    const storageShareOfRevenue =
      unitsSold * price > 0
        ? ((monthlyStorageCost + agedInventoryCost + extraCosts) /
            (unitsSold * price)) *
          100
        : 0;

    const inventoryValue = units * productCost;
    const monthsOfCoverage = unitsSold > 0 ? units / unitsSold : 0;
    const sellThroughRate = units > 0 ? (unitsSold / units) * 100 : 0;

    const breakEvenUnitsSold =
      profitBeforeStorage > 0
        ? Math.ceil((monthlyStorageCost + agedInventoryCost + extraCosts) / profitBeforeStorage)
        : 0;

    const unitsAboveBreakEven = Math.max(0, unitsSold - breakEvenUnitsSold);

    const storageCostPerCubicFoot =
      totalCubicFeet > 0 ? totalStorageCost / totalCubicFeet : 0;

    const status =
      adjustedMonthlyProfit < 0
        ? "Losing Money"
        : storageShareOfProfit > 35
          ? "High Storage Risk"
          : storageShareOfProfit > 15
            ? "Watch Storage"
            : "Healthy";

    const statusTone: Tone =
      adjustedMonthlyProfit < 0
        ? "bad"
        : storageShareOfProfit > 35
          ? "bad"
          : storageShareOfProfit > 15
            ? "warn"
            : "good";

    const scenarios = [1, 2, 3, 6, 9, 12].map((scenarioMonths) => {
      const scenarioStorage = monthlyStorageCost * scenarioMonths;
      const scenarioTotal =
        scenarioStorage + agedInventoryCost + removalCostTotal + extraCosts;
      const scenarioPerUnit = units > 0 ? scenarioTotal / units : 0;
      const scenarioAdjustedProfit =
        grossProfitBeforeStorage - scenarioStorage - agedInventoryCost - extraCosts;

      return {
        months: scenarioMonths,
        totalStorage: scenarioTotal,
        costPerUnit: scenarioPerUnit,
        adjustedProfit: scenarioAdjustedProfit,
        status:
          scenarioAdjustedProfit < 0
            ? "Losing"
            : scenarioPerUnit > profitBeforeStorage * 0.35
              ? "High Risk"
              : scenarioPerUnit > profitBeforeStorage * 0.15
                ? "Watch"
                : "Healthy",
      };
    });

    return {
      units,
      cubicFeet,
      storageRate,
      months,
      agedFee,
      removalCost,
      removedUnits,
      price,
      profitBeforeStorage,
      unitsSold,
      productCost,
      extraCosts,
      totalCubicFeet,
      monthlyStorageCost,
      storageCostAcrossMonths,
      agedInventoryCost,
      removalCostTotal,
      totalStorageCost,
      storageCostPerUnit,
      monthlyStorageCostPerUnit,
      grossProfitBeforeStorage,
      adjustedMonthlyProfit,
      adjustedProfitPerSoldUnit,
      storageShareOfProfit,
      storageShareOfRevenue,
      inventoryValue,
      monthsOfCoverage,
      sellThroughRate,
      breakEvenUnitsSold,
      unitsAboveBreakEven,
      storageCostPerCubicFoot,
      status,
      statusTone,
      scenarios,
    };
  }, [
    unitsStored,
    unitVolume,
    monthlyStorageRate,
    monthsStored,
    agedInventoryFee,
    removalCostPerUnit,
    unitsRemoved,
    salePrice,
    profitPerUnitBeforeStorage,
    monthlyUnitsSold,
    productCostPerUnit,
    extraMonthlyCosts,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Storage Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon storage fees, aged inventory cost, removal cost,
          storage cost per unit, inventory value, months of coverage, and how
          storage pressure affects monthly profit.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Storage fee inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter inventory quantity, unit volume, monthly storage rate, months
            stored, aged inventory assumptions, removal cost, monthly sales, and
            profit before storage.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Inventory size
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Units stored
              </label>
              <input
                value={unitsStored}
                onChange={(event) => setUnitsStored(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Cubic feet per unit
              </label>
              <input
                value={unitVolume}
                onChange={(event) => setUnitVolume(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Months stored
              </label>
              <input
                value={monthsStored}
                onChange={(event) => setMonthsStored(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Storage costs
              </p>

              {[
                ["Monthly storage rate per cubic foot", monthlyStorageRate, setMonthlyStorageRate],
                ["Aged inventory fee per unit", agedInventoryFee, setAgedInventoryFee],
                ["Removal cost per unit", removalCostPerUnit, setRemovalCostPerUnit],
                ["Extra monthly storage-related costs", extraMonthlyCosts, setExtraMonthlyCosts],
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

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Units removed
              </label>
              <input
                value={unitsRemoved}
                onChange={(event) => setUnitsRemoved(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Profit and sales
              </p>

              {[
                ["Average sale price", salePrice, setSalePrice],
                [
                  "Profit per unit before storage",
                  profitPerUnitBeforeStorage,
                  setProfitPerUnitBeforeStorage,
                ],
                ["Product cost per unit", productCostPerUnit, setProductCostPerUnit],
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

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly units sold
              </label>
              <input
                value={monthlyUnitsSold}
                onChange={(event) => setMonthlyUnitsSold(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon storage fees, aged
            inventory rules, product dimensions, storage rates, removal costs,
            sales velocity, and seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon storage fee impact.
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
              title="Total storage cost"
              value={money(results.totalStorageCost)}
              note="Monthly storage cost across entered months plus extra storage-related costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Monthly storage cost"
              value={money(results.monthlyStorageCost)}
              note="Total cubic feet multiplied by monthly storage rate"
              tone="warn"
            />

            <ResultCard
              title="Storage cost per unit"
              value={money(results.storageCostPerUnit)}
              note="Total storage cost divided by units stored"
              tone={results.statusTone}
            />

            <ResultCard
              title="Monthly storage per unit"
              value={money(results.monthlyStorageCostPerUnit)}
              note="Monthly storage cost divided by units stored"
              tone="warn"
            />

            <ResultCard
              title="Adjusted monthly profit"
              value={money(results.adjustedMonthlyProfit)}
              note="Monthly profit after storage, aged inventory, and extra costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Adjusted profit per sold unit"
              value={money(results.adjustedProfitPerSoldUnit)}
              note="Adjusted monthly profit divided by monthly units sold"
              tone={results.adjustedProfitPerSoldUnit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Storage share of profit"
              value={percent(results.storageShareOfProfit)}
              note="Storage-related monthly costs divided by gross profit before storage"
              tone={results.storageShareOfProfit > 35 ? "bad" : results.storageShareOfProfit > 15 ? "warn" : "good"}
            />

            <ResultCard
              title="Storage share of revenue"
              value={percent(results.storageShareOfRevenue)}
              note="Storage-related monthly costs divided by monthly revenue"
              tone="warn"
            />

            <ResultCard
              title="Total cubic feet"
              value={numberFormat(results.totalCubicFeet)}
              note="Units stored multiplied by cubic feet per unit"
              tone="blue"
            />

            <ResultCard
              title="Aged inventory cost"
              value={money(results.agedInventoryCost)}
              note="Units stored multiplied by aged inventory fee per unit"
              tone="warn"
            />

            <ResultCard
              title="Removal cost"
              value={money(results.removalCostTotal)}
              note="Units removed multiplied by removal cost per unit"
              tone="warn"
            />

            <ResultCard
              title="Inventory value"
              value={money(results.inventoryValue)}
              note="Units stored multiplied by product cost per unit"
              tone="blue"
            />

            <ResultCard
              title="Months of coverage"
              value={numberFormat(results.monthsOfCoverage)}
              note="Units stored divided by monthly units sold"
              tone={results.monthsOfCoverage > 6 ? "warn" : "good"}
            />

            <ResultCard
              title="Sell-through rate"
              value={percent(results.sellThroughRate)}
              note="Monthly units sold divided by units stored"
              tone={results.sellThroughRate > 20 ? "good" : "warn"}
            />

            <ResultCard
              title="Break-even units sold"
              value={numberFormat(results.breakEvenUnitsSold)}
              note="Units needed to cover monthly storage-related costs"
              tone="warn"
            />

            <ResultCard
              title="Units above break-even"
              value={numberFormat(results.unitsAboveBreakEven)}
              note="Monthly units sold minus break-even units sold"
              tone={results.unitsAboveBreakEven > 0 ? "good" : "bad"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                Estimated total storage-related cost is{" "}
                <strong className="text-gray-950">
                  {money(results.totalStorageCost)}
                </strong>
                , with monthly storage cost of{" "}
                <strong className="text-gray-950">
                  {money(results.monthlyStorageCost)}
                </strong>
                .
              </p>

              <p>
                Storage-related monthly costs are estimated to take{" "}
                <strong className="text-gray-950">
                  {percent(results.storageShareOfProfit)}
                </strong>{" "}
                of gross profit before storage.
              </p>

              <p>
                Current inventory equals about{" "}
                <strong className="text-gray-950">
                  {numberFormat(results.monthsOfCoverage)}
                </strong>{" "}
                months of coverage at the entered sales pace.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Storage duration scenario comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Months</th>
                    <th className="px-4 py-3">Total storage</th>
                    <th className="px-4 py-3">Cost/unit</th>
                    <th className="px-4 py-3">Adjusted profit</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.months}
                      className={
                        Math.abs(scenario.months - results.months) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">
                        {numberFormat(scenario.months)}
                      </td>
                      <td className="px-4 py-3">
                        {money(scenario.totalStorage)}
                      </td>
                      <td className="px-4 py-3">
                        {money(scenario.costPerUnit)}
                      </td>
                      <td className="px-4 py-3">
                        {money(scenario.adjustedProfit)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Losing"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "High Risk" ||
                                  scenario.status === "Watch"
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
          How to use this Amazon Storage Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter inventory",
              "Add units stored, cubic feet per unit, and expected months stored.",
            ],
            [
              "Add storage rates",
              "Include monthly storage rate, aged inventory fees, removal costs, and extra monthly costs.",
            ],
            [
              "Add sales pace",
              "Enter monthly units sold and profit per unit before storage.",
            ],
            [
              "Review storage pressure",
              "Compare storage cost, months of coverage, sell-through rate, and adjusted monthly profit.",
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
            Storage cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review the main storage-related costs affecting inventory profit.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Monthly storage cost", results.monthlyStorageCost],
              ["Storage cost across entered months", results.storageCostAcrossMonths],
              ["Aged inventory cost", results.agedInventoryCost],
              ["Removal cost", results.removalCostTotal],
              ["Extra monthly costs", results.extraCosts],
              ["Total storage cost", results.totalStorageCost],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {money(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Used to estimate storage pressure and inventory profitability.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon storage fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Only checking product profit before storage fees are included.",
              "Ignoring unit dimensions and cubic feet when estimating FBA storage.",
              "Restocking slow-moving inventory before checking sell-through rate.",
              "Forgetting aged inventory costs, removal costs, and extra storage-related fees.",
              "Keeping too many months of inventory when demand is uncertain.",
              "Discounting too late after storage costs have already reduced profit.",
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
            Understanding your storage fee result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Healthy:</strong> Storage cost
              appears manageable compared with monthly profit and sales pace.
            </p>

            <p>
              <strong className="text-amber-700">Watch Storage:</strong> Storage
              is taking a noticeable share of profit and should be monitored.
            </p>

            <p>
              <strong className="text-red-700">High Storage Risk:</strong>{" "}
              Storage may be taking too much profit or inventory may be moving
              too slowly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Storage
              costs may be pushing monthly profit below zero.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Units stored, unit volume, and total cubic feet.",
              "Monthly storage rate and number of months stored.",
              "Aged inventory fees, removal costs, and extra storage-related costs.",
              "Monthly units sold, sell-through rate, and months of coverage.",
              "Product cost, inventory value, and cash tied up in stock.",
              "Profit per unit before storage and adjusted profit after storage.",
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
          Ways to reduce Amazon storage pressure
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve sell-through",
              "Improve pricing, listing quality, PPC, coupons, and inventory planning.",
            ],
            [
              "Send less inventory",
              "Use smaller replenishment batches when demand is uncertain or sales are slow.",
            ],
            [
              "Clear slow stock",
              "Use discounts, bundles, removals, or liquidation before storage drag grows.",
            ],
            [
              "Review dimensions",
              "Large products may need tighter restock planning because storage costs can rise quickly.",
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
            ["/amazon/fba-profit-calculator", "FBA Profit Calculator"],
            ["/amazon/inventory-restock-calculator", "Inventory Restock Calculator"],
            ["/amazon/product-cost-calculator", "Product Cost Calculator"],
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