"use client";

import { useMemo, useState } from "react";

type Status = "Strong" | "Healthy" | "Watch" | "Slow";

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

export default function PoshmarkSellThroughRateCalculatorPage() {
  const [activeListings, setActiveListings] = useState(120);
  const [monthlySales, setMonthlySales] = useState(30);
  const [newListingsPerMonth, setNewListingsPerMonth] = useState(40);
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [averageProfitPerSale, setAverageProfitPerSale] = useState(14);
  const [inventoryCostPerItem, setInventoryCostPerItem] = useState(12);
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

    const salesGap = Math.max(0, targetMonthlySales - monthlySales);

    const staleListings = Math.round(activeListings * (staleListingPercent / 100));
    const staleInventoryValue = staleListings * inventoryCostPerItem;

    const projectedSalesAfterRelist = Math.round(
      monthlySales * (1 + relistImprovementRate / 100)
    );

    const projectedProfitAfterRelist =
      projectedSalesAfterRelist * averageProfitPerSale;

    const inventoryReplacementGap = Math.max(0, monthlySales - newListingsPerMonth);

    const listingGrowth = newListingsPerMonth - monthlySales;

    let status: Status = "Healthy";
    if (sellThroughRate >= targetSellThroughRate * 1.5) status = "Strong";
    else if (sellThroughRate >= targetSellThroughRate) status = "Healthy";
    else if (sellThroughRate >= targetSellThroughRate * 0.6) status = "Watch";
    else status = "Slow";

    const scenarios = [10, 15, 20, 25, 30, 40, 50].map((rate) => {
      const sales = Math.round(activeListings * (rate / 100));
      const revenue = sales * averageSalePrice;
      const profit = sales * averageProfitPerSale;

      let scenarioStatus: Status = "Healthy";
      if (rate >= targetSellThroughRate * 1.5) scenarioStatus = "Strong";
      else if (rate >= targetSellThroughRate) scenarioStatus = "Healthy";
      else if (rate >= targetSellThroughRate * 0.6) scenarioStatus = "Watch";
      else scenarioStatus = "Slow";

      return {
        rate,
        sales,
        revenue,
        profit,
        status: scenarioStatus,
      };
    });

    return {
      sellThroughRate,
      monthlyRevenue,
      monthlyProfit,
      listingsNeededForTargetSales,
      extraListingsNeeded,
      salesGap,
      staleListings,
      staleInventoryValue,
      projectedSalesAfterRelist,
      projectedProfitAfterRelist,
      inventoryReplacementGap,
      listingGrowth,
      status,
      scenarios,
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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Sell-Through Rate Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Calculate Poshmark sell-through rate, monthly sales velocity, revenue,
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
              <NumberInput
                label="New listings per month"
                value={newListingsPerMonth}
                setValue={setNewListingsPerMonth}
              />
              <MoneyInput
                label="Average sale price"
                value={averageSalePrice}
                setValue={setAverageSalePrice}
              />
              <MoneyInput
                label="Average profit per sale"
                value={averageProfitPerSale}
                setValue={setAverageProfitPerSale}
              />
              <MoneyInput
                label="Inventory cost per item"
                value={inventoryCostPerItem}
                setValue={setInventoryCostPerItem}
              />
              <NumberInput
                label="Target monthly sales"
                value={targetMonthlySales}
                setValue={setTargetMonthlySales}
              />
              <PercentInput
                label="Target sell-through rate"
                value={targetSellThroughRate}
                setValue={setTargetSellThroughRate}
              />
              <PercentInput
                label="Stale listing percent"
                value={staleListingPercent}
                setValue={setStaleListingPercent}
              />
              <PercentInput
                label="Relist improvement rate"
                value={relistImprovementRate}
                setValue={setRelistImprovementRate}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark demand, buyer
              search behavior, closet activity, price quality, seasonality,
              shipping discounts, and sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark sell-through performance.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="green"
                title="Sell-through rate"
                value={pct(results.sellThroughRate)}
                text="Monthly sales divided by active listings."
              />
              <ResultCard
                tone="green"
                title="Monthly profit"
                value={money(results.monthlyProfit)}
                text="Monthly sales multiplied by average profit."
              />
              <ResultCard
                tone="blue"
                title="Monthly revenue"
                value={money(results.monthlyRevenue)}
                text="Monthly sales multiplied by average sale price."
              />
              <ResultCard
                tone="blue"
                title="Listings needed for target sales"
                value={String(results.listingsNeededForTargetSales)}
                text="Active listings needed to reach target sales."
              />
              <ResultCard
                tone="yellow"
                title="Extra listings needed"
                value={String(results.extraListingsNeeded)}
                text="Additional active listings needed for target sales."
              />
              <ResultCard
                tone="yellow"
                title="Sales gap"
                value={String(results.salesGap)}
                text="Additional monthly sales needed to reach target."
              />
              <ResultCard
                tone="yellow"
                title="Stale listings"
                value={String(results.staleListings)}
                text="Estimated listings that may be stale or slow-moving."
              />
              <ResultCard
                tone="yellow"
                title="Stale inventory value"
                value={money(results.staleInventoryValue)}
                text="Inventory cost tied up in stale listings."
              />
              <ResultCard
                tone="green"
                title="Projected sales after relist"
                value={String(results.projectedSalesAfterRelist)}
                text="Estimated sales after relisting or optimization lift."
              />
              <ResultCard
                tone="green"
                title="Projected profit after relist"
                value={money(results.projectedProfitAfterRelist)}
                text="Estimated profit after relisting improvement."
              />
              <ResultCard
                tone="blue"
                title="Inventory replacement gap"
                value={String(results.inventoryReplacementGap)}
                text="Sales not replaced by new listings this month."
              />
              <ResultCard
                tone="green"
                title="Listing growth"
                value={String(results.listingGrowth)}
                text="New listings minus monthly sales."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your entered Poshmark closet has a sell-through rate of{" "}
                <strong>{pct(results.sellThroughRate)}</strong>. At the current
                pace, monthly revenue is about{" "}
                <strong>{money(results.monthlyRevenue)}</strong> and monthly
                profit is about <strong>{money(results.monthlyProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                To reach <strong>{targetMonthlySales}</strong> sales per month
                at a <strong>{pct(targetSellThroughRate)}</strong> sell-through
                rate, you need about{" "}
                <strong>{results.listingsNeededForTargetSales}</strong> active
                listings.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "Sell-through appears strong under the entered assumptions."
                  : results.status === "Healthy"
                    ? "Sell-through appears workable under the entered assumptions."
                    : results.status === "Watch"
                      ? "Sell-through is below target and should be improved before sourcing heavily."
                      : "Sell-through is slow and may require price, photo, title, or category improvements."}
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
                    {results.scenarios.map((row) => (
                      <tr key={row.rate} className="border-t">
                        <td className="px-3 py-2">{pct(row.rate)}</td>
                        <td className="px-3 py-2">{row.sales}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
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
            How to use this Poshmark Sell-Through Rate Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter listings"
              text="Add active listings and monthly sales for the current period."
            />
            <StepCard
              title="Add profit"
              text="Enter average sale price, profit per sale, and inventory cost."
            />
            <StepCard
              title="Set target"
              text="Add target monthly sales and target sell-through rate."
            />
            <StepCard
              title="Review inventory"
              text="Check whether to source more, relist stale items, or improve listings."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark sell-through breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the sell-through rate estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Active listings" value={String(activeListings)} />
              <Breakdown label="Monthly sales" value={String(monthlySales)} />
              <Breakdown label="Sell-through rate" value={pct(results.sellThroughRate)} />
              <Breakdown label="Average sale price" value={money(averageSalePrice)} />
              <Breakdown label="Average profit per sale" value={money(averageProfitPerSale)} />
              <Breakdown label="Monthly revenue" value={money(results.monthlyRevenue)} />
              <Breakdown label="Monthly profit" value={money(results.monthlyProfit)} />
              <Breakdown label="Listings needed for target" value={String(results.listingsNeededForTargetSales)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark sell-through mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting views or likes as success without checking sold items.",
                "Sourcing more inventory before checking sell-through rate.",
                "Leaving stale listings unchanged for months.",
                "Using total inventory instead of active listings when measuring performance.",
                "Assuming all categories sell at the same pace.",
                "Ignoring price, photos, title quality, and shipping discount when sales slow down.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Poshmark sell-through
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve photos"
              text="Use clear, bright images that show condition, flaws, size, and details."
            />
            <StepCard
              title="Adjust pricing"
              text="Compare sold comps and lower stale prices when needed."
            />
            <StepCard
              title="Relist stale items"
              text="Refresh or rebuild listings that are not converting."
            />
            <StepCard
              title="Source proven categories"
              text="Buy more only after confirming demand, profit, and sales pace."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/inventory-restock-calculator" label="Inventory Restock Calculator" />
            <Related href="/poshmark/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
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
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
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
          Included in the sell-through rate estimate.
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