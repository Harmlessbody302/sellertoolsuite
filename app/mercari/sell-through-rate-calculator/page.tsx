"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariSellThroughRateCalculatorPage() {
  const [activeListings, setActiveListings] = useState(120);
  const [monthlySales, setMonthlySales] = useState(30);
  const [newListingsPerMonth, setNewListingsPerMonth] = useState(40);
  const [averageSalePrice, setAverageSalePrice] = useState(35);
  const [averageProfitPerSale, setAverageProfitPerSale] = useState(12);
  const [inventoryCostPerItem, setInventoryCostPerItem] = useState(10);
  const [targetMonthlySales, setTargetMonthlySales] = useState(50);
  const [targetSellThroughRate, setTargetSellThroughRate] = useState(25);
  const [staleListingPercent, setStaleListingPercent] = useState(20);
  const [relistImprovementRate, setRelistImprovementRate] = useState(10);

  const results = useMemo(() => {
    const sellThroughRate =
      activeListings > 0 ? (monthlySales / activeListings) * 100 : 0;

    const monthlyRevenue = monthlySales * averageSalePrice;
    const monthlyProfit = monthlySales * averageProfitPerSale;

    const listingsNeededForTargetSales =
      targetSellThroughRate > 0
        ? Math.ceil(targetMonthlySales / (targetSellThroughRate / 100))
        : 0;

    const extraListingsNeeded = Math.max(
      0,
      listingsNeededForTargetSales - activeListings
    );

    const salesAtTargetRate = activeListings * (targetSellThroughRate / 100);
    const salesGap = Math.max(0, targetMonthlySales - monthlySales);

    const staleListings = activeListings * (staleListingPercent / 100);
    const staleInventoryValue = staleListings * inventoryCostPerItem;

    const projectedSalesAfterRelist =
      monthlySales * (1 + relistImprovementRate / 100);
    const projectedRevenueAfterRelist =
      projectedSalesAfterRelist * averageSalePrice;
    const projectedProfitAfterRelist =
      projectedSalesAfterRelist * averageProfitPerSale;

    const monthlyInventoryAddedValue = newListingsPerMonth * inventoryCostPerItem;
    const inventoryReplacementGap = Math.max(0, monthlySales - newListingsPerMonth);
    const listingGrowth = newListingsPerMonth - monthlySales;

    let status = "Healthy";
    if (sellThroughRate < targetSellThroughRate * 0.4) status = "Slow";
    else if (sellThroughRate < targetSellThroughRate * 0.75) status = "Watch";
    else if (sellThroughRate >= targetSellThroughRate * 1.5) status = "Strong";

    return {
      sellThroughRate,
      monthlyRevenue,
      monthlyProfit,
      listingsNeededForTargetSales,
      extraListingsNeeded,
      salesAtTargetRate,
      salesGap,
      staleListings,
      staleInventoryValue,
      projectedSalesAfterRelist,
      projectedRevenueAfterRelist,
      projectedProfitAfterRelist,
      monthlyInventoryAddedValue,
      inventoryReplacementGap,
      listingGrowth,
      status,
    };
  }, [
    activeListings,
    monthlySales,
    newListingsPerMonth,
    averageSalePrice,
    averageProfitPerSale,
    inventoryCostPerItem,
    targetMonthlySales,
    targetSellThroughRate,
    staleListingPercent,
    relistImprovementRate,
  ]);

  const scenarios = [10, 15, 20, 25, 30, 40, 50].map((rate) => {
    const sales = activeListings * (rate / 100);
    const revenue = sales * averageSalePrice;
    const profit = sales * averageProfitPerSale;
    const listingsNeeded =
      rate > 0 ? Math.ceil(targetMonthlySales / (rate / 100)) : 0;

    let status = "Healthy";
    if (rate < targetSellThroughRate * 0.4) status = "Slow";
    else if (rate < targetSellThroughRate * 0.75) status = "Watch";
    else if (rate >= targetSellThroughRate * 1.5) status = "Strong";

    return { rate, sales, revenue, profit, listingsNeeded, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Sell-Through Rate Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Calculate Mercari sell-through rate, monthly sales velocity, revenue,
          profit, listing needs, stale inventory value, and whether sourcing more
          similar items makes sense.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Sell-through inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter active listings, monthly sales, new listings, average sale
              price, profit, item cost, target sales, and target sell-through.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Active listings" value={activeListings} setValue={setActiveListings} />
              <NumberInput label="Monthly sales" value={monthlySales} setValue={setMonthlySales} />
              <NumberInput label="New listings per month" value={newListingsPerMonth} setValue={setNewListingsPerMonth} />
              <NumberInput label="Average sale price" value={averageSalePrice} setValue={setAverageSalePrice} prefix="$" />
              <NumberInput label="Average profit per sale" value={averageProfitPerSale} setValue={setAverageProfitPerSale} prefix="$" />
              <NumberInput label="Inventory cost per item" value={inventoryCostPerItem} setValue={setInventoryCostPerItem} prefix="$" />
              <NumberInput label="Target monthly sales" value={targetMonthlySales} setValue={setTargetMonthlySales} />
              <NumberInput label="Target sell-through rate" value={targetSellThroughRate} setValue={setTargetSellThroughRate} suffix="%" />
              <NumberInput label="Stale listing percent" value={staleListingPercent} setValue={setStaleListingPercent} suffix="%" />
              <NumberInput label="Relist improvement rate" value={relistImprovementRate} setValue={setRelistImprovementRate} suffix="%" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari demand, buyer
              behavior, search visibility, item quality, pricing, seasonality,
              shipping cost, and sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari sell-through performance.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Sell-through rate" value={`${results.sellThroughRate.toFixed(1)}%`} tone={results.sellThroughRate >= targetSellThroughRate ? "green" : "yellow"} text="Monthly sales divided by active listings." />
              <ResultCard title="Monthly profit" value={money(results.monthlyProfit)} tone="green" text="Monthly sales multiplied by average profit." />
              <ResultCard title="Monthly revenue" value={money(results.monthlyRevenue)} tone="blue" text="Monthly sales multiplied by average sale price." />
              <ResultCard title="Listings needed for target sales" value={number(results.listingsNeededForTargetSales)} tone="blue" text="Active listings needed to reach target sales." />
              <ResultCard title="Extra listings needed" value={number(results.extraListingsNeeded)} tone={results.extraListingsNeeded === 0 ? "green" : "yellow"} text="Additional active listings needed for target sales." />
              <ResultCard title="Sales gap" value={number(results.salesGap)} tone="yellow" text="Additional monthly sales needed to reach target." />
              <ResultCard title="Stale listings" value={number(results.staleListings)} tone="yellow" text="Estimated listings that may be stale or slow-moving." />
              <ResultCard title="Stale inventory value" value={money(results.staleInventoryValue)} tone="yellow" text="Inventory cost tied up in stale listings." />
              <ResultCard title="Projected sales after relist" value={number(results.projectedSalesAfterRelist)} tone="green" text="Estimated sales after relisting or optimization lift." />
              <ResultCard title="Projected profit after relist" value={money(results.projectedProfitAfterRelist)} tone="green" text="Estimated profit after relisting improvement." />
              <ResultCard title="Inventory replacement gap" value={number(results.inventoryReplacementGap)} tone={results.inventoryReplacementGap === 0 ? "green" : "yellow"} text="Sales not replaced by new listings this month." />
              <ResultCard title="Listing growth" value={number(results.listingGrowth)} tone={results.listingGrowth >= 0 ? "green" : "yellow"} text="New listings minus monthly sales." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your entered Mercari store has a sell-through rate of{" "}
                <strong>{results.sellThroughRate.toFixed(1)}%</strong>. At the
                current pace, monthly revenue is about{" "}
                <strong>{money(results.monthlyRevenue)}</strong> and monthly
                profit is about <strong>{money(results.monthlyProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                To reach <strong>{number(targetMonthlySales)}</strong> sales per
                month at a <strong>{targetSellThroughRate.toFixed(1)}%</strong>{" "}
                sell-through rate, you need about{" "}
                <strong>{number(results.listingsNeededForTargetSales)}</strong>{" "}
                active listings.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "Sell-through is strong and may support sourcing more similar profitable items."
                  : results.status === "Healthy"
                    ? "Sell-through appears workable under the entered assumptions."
                    : results.status === "Watch"
                      ? "Sell-through is below target and may need better pricing, photos, or sourcing."
                      : "Sell-through appears slow and may indicate stale inventory or weak demand."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Sell-through scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Sell-through</th>
                      <th className="px-3 py-2">Sales</th>
                      <th className="px-3 py-2">Revenue</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.rate} className="border-t">
                        <td className="px-3 py-2">{row.rate.toFixed(1)}%</td>
                        <td className="px-3 py-2">{number(row.sales)}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">
                          <span className={statusClass(row.status)}>
                            {row.status}
                          </span>
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
            How to use this Mercari Sell-Through Rate Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter listings" text="Add active listings and monthly sales for the current period." />
            <StepCard title="Add profit" text="Enter average sale price, profit per sale, and inventory cost." />
            <StepCard title="Set target" text="Add target monthly sales and target sell-through rate." />
            <StepCard title="Review inventory" text="Check whether to source more, relist stale items, or improve listings." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari sell-through breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the Mercari sell-through estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Active listings" value={number(activeListings)} />
              <Breakdown label="Monthly sales" value={number(monthlySales)} />
              <Breakdown label="Sell-through rate" value={`${results.sellThroughRate.toFixed(1)}%`} />
              <Breakdown label="Average sale price" value={money(averageSalePrice)} />
              <Breakdown label="Average profit per sale" value={money(averageProfitPerSale)} />
              <Breakdown label="Monthly revenue" value={money(results.monthlyRevenue)} />
              <Breakdown label="Monthly profit" value={money(results.monthlyProfit)} />
              <Breakdown label="Listings needed for target" value={number(results.listingsNeededForTargetSales)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari sell-through mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Counting views or likes as success without checking sold items." />
              <Warning text="Sourcing more inventory before checking sell-through rate." />
              <Warning text="Leaving stale listings unchanged for months." />
              <Warning text="Using total inventory instead of active listings when measuring performance." />
              <Warning text="Assuming all categories sell at the same pace." />
              <Warning text="Ignoring price, photos, title quality, and shipping cost when sales slow down." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari sell-through</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Improve photos" text="Use clear, bright images that show condition, flaws, size, and details." />
            <StepCard title="Adjust pricing" text="Compare sold comps and lower stale prices when needed." />
            <StepCard title="Relist stale items" text="Refresh or rebuild listings that are not converting." />
            <StepCard title="Source proven categories" text="Buy more only after confirming demand, profit, and sales pace." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/inventory-restock-calculator" label="Inventory Restock Calculator" />
            <Related href="/mercari/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/mercari/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function NumberInput({
  label,
  value,
  setValue,
  prefix,
  suffix,
}: NumberInputProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        {prefix ? (
          <span className="flex items-center border-r bg-slate-50 px-3 text-sm text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          value={value}
          onChange={(event) => setValue(Number(event.target.value) || 0)}
          type="number"
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
  title,
  value,
  text,
  tone,
}: {
  title: string;
  value: string;
  text: string;
  tone: "green" | "yellow" | "blue";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "yellow"
        ? "border-amber-200 bg-amber-50"
        : "border-blue-200 bg-blue-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-xs font-bold">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
    </div>
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
          Included in the sell-through rate estimate.
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

function statusClass(status: string) {
  if (status === "Strong") {
    return "rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700";
  }

  if (status === "Healthy") {
    return "rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700";
  }

  if (status === "Watch") {
    return "rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700";
  }

  return "rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700";
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function number(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}