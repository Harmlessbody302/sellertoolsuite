"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceSellThroughRateCalculatorPage() {
  const [activeListings, setActiveListings] = useState(80);
  const [monthlySales, setMonthlySales] = useState(25);
  const [newListingsPerMonth, setNewListingsPerMonth] = useState(30);
  const [averageSalePrice, setAverageSalePrice] = useState(80);
  const [averageProfitPerSale, setAverageProfitPerSale] = useState(31);
  const [inventoryCostPerItem, setInventoryCostPerItem] = useState(25);
  const [targetMonthlySales, setTargetMonthlySales] = useState(40);
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

    const listingsNeededAtCurrentRate =
      sellThroughRate > 0
        ? Math.ceil(targetMonthlySales / (sellThroughRate / 100))
        : 0;

    const revenueGap = salesGap * averageSalePrice;
    const profitGap = salesGap * averageProfitPerSale;

    let status = "Healthy";
    if (sellThroughRate < targetSellThroughRate * 0.5) status = "Slow";
    else if (sellThroughRate < targetSellThroughRate) status = "Watch";
    else if (sellThroughRate >= targetSellThroughRate * 1.5) status = "Strong";

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
      listingsNeededAtCurrentRate,
      revenueGap,
      profitGap,
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

  const statusTone: Tone =
    results.status === "Healthy" || results.status === "Strong"
      ? "green"
      : results.status === "Slow"
        ? "red"
        : "yellow";

  const scenarioRows = [10, 15, 20, 25, 30, 40, 50].map((rate) => {
    const sales = Math.round(activeListings * (rate / 100));
    const revenue = sales * averageSalePrice;
    const profit = sales * averageProfitPerSale;

    let status = "Healthy";
    if (rate < targetSellThroughRate * 0.5) status = "Slow";
    else if (rate < targetSellThroughRate) status = "Watch";
    else if (rate >= targetSellThroughRate * 1.5) status = "Strong";

    return {
      rate,
      sales,
      revenue,
      profit,
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
          Facebook Marketplace Sell-Through Rate Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Calculate Facebook Marketplace sell-through rate, monthly sales
          velocity, revenue, profit, listing needs, stale inventory value, and
          whether sourcing more similar items makes sense.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Sell-through inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter active listings, monthly sales, new listings, average sale
              price, profit, inventory cost, target sales, and target
              sell-through rate.
            </p>

            <div className="mt-5 space-y-4">
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
              <NumberInput
                label="New listings per month"
                value={newListingsPerMonth}
                onChange={setNewListingsPerMonth}
              />
              <MoneyInput
                label="Average sale price"
                value={averageSalePrice}
                onChange={setAverageSalePrice}
              />
              <MoneyInput
                label="Average profit per sale"
                value={averageProfitPerSale}
                onChange={setAverageProfitPerSale}
              />
              <MoneyInput
                label="Inventory cost per item"
                value={inventoryCostPerItem}
                onChange={setInventoryCostPerItem}
              />
              <NumberInput
                label="Target monthly sales"
                value={targetMonthlySales}
                onChange={setTargetMonthlySales}
              />
              <NumberInput
                label="Target sell-through rate"
                value={targetSellThroughRate}
                onChange={setTargetSellThroughRate}
                suffix="%"
              />
              <NumberInput
                label="Stale listing percent"
                value={staleListingPercent}
                onChange={setStaleListingPercent}
                suffix="%"
              />
              <NumberInput
                label="Relist improvement rate"
                value={relistImprovementRate}
                onChange={setRelistImprovementRate}
                suffix="%"
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace demand,
              local competition, buyer interest, listing quality, price,
              category, seasonality, pickup friction, and sell-through may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace sell-through performance.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Sell-through rate"
                value={`${results.sellThroughRate.toFixed(1)}%`}
                tone={results.sellThroughRate >= targetSellThroughRate ? "green" : "yellow"}
                text="Monthly sales divided by active listings."
              />
              <ResultCard
                label="Monthly profit"
                value={formatMoney(results.monthlyProfit)}
                tone="green"
                text="Monthly sales multiplied by average profit."
              />
              <ResultCard
                label="Monthly revenue"
                value={formatMoney(results.monthlyRevenue)}
                tone="blue"
                text="Monthly sales multiplied by average sale price."
              />
              <ResultCard
                label="Listings needed for target sales"
                value={String(results.listingsNeededForTargetSales)}
                tone="blue"
                text="Active listings needed to reach target monthly sales."
              />
              <ResultCard
                label="Extra listings needed"
                value={String(results.extraListingsNeeded)}
                tone={results.extraListingsNeeded === 0 ? "green" : "yellow"}
                text="Additional active listings needed for target sales."
              />
              <ResultCard
                label="Sales gap"
                value={String(results.salesGap)}
                tone={results.salesGap === 0 ? "green" : "yellow"}
                text="Additional monthly sales needed to reach target."
              />
              <ResultCard
                label="Stale listings"
                value={String(results.staleListings)}
                tone="yellow"
                text="Estimated listings that may be stale or slow-moving."
              />
              <ResultCard
                label="Stale inventory value"
                value={formatMoney(results.staleInventoryValue)}
                tone="yellow"
                text="Inventory cost tied up in stale listings."
              />
              <ResultCard
                label="Projected sales after relist"
                value={String(results.projectedSalesAfterRelist)}
                tone="green"
                text="Estimated sales after relisting or optimization lift."
              />
              <ResultCard
                label="Projected profit after relist"
                value={formatMoney(results.projectedProfitAfterRelist)}
                tone="green"
                text="Estimated profit after relisting improvement."
              />
              <ResultCard
                label="Inventory replacement gap"
                value={String(results.inventoryReplacementGap)}
                tone={results.inventoryReplacementGap === 0 ? "green" : "yellow"}
                text="Sales not replaced by new listings this month."
              />
              <ResultCard
                label="Listing growth"
                value={String(results.listingGrowth)}
                tone={results.listingGrowth >= 0 ? "green" : "yellow"}
                text="New listings minus monthly sales."
              />
              <ResultCard
                label="Revenue gap"
                value={formatMoney(results.revenueGap)}
                tone={results.revenueGap === 0 ? "green" : "yellow"}
                text="Revenue needed to close the sales gap."
              />
              <ResultCard
                label="Profit gap"
                value={formatMoney(results.profitGap)}
                tone={results.profitGap === 0 ? "green" : "yellow"}
                text="Profit needed to close the sales gap."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your entered Facebook Marketplace inventory has a sell-through
                rate of <strong>{results.sellThroughRate.toFixed(1)}%</strong>.
                At the current pace, monthly revenue is about{" "}
                <strong>{formatMoney(results.monthlyRevenue)}</strong> and
                monthly profit is about{" "}
                <strong>{formatMoney(results.monthlyProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                To reach <strong>{targetMonthlySales}</strong> sales per month
                at a <strong>{targetSellThroughRate.toFixed(1)}%</strong>{" "}
                sell-through rate, you need about{" "}
                <strong>{results.listingsNeededForTargetSales}</strong> active
                listings.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Strong"
                  ? "Sell-through appears strong enough to support sourcing more similar items."
                  : results.status === "Healthy"
                    ? "Sell-through appears workable under the entered assumptions."
                    : results.status === "Watch"
                      ? "Sell-through is below target, so improve price, photos, descriptions, or sourcing before scaling."
                      : "Sell-through is slow and may point to weak demand, stale listings, poor pricing, or too much similar inventory."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Sell-through scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Sell-through</th>
                      <th className="border px-3 py-2">Sales</th>
                      <th className="border px-3 py-2">Revenue</th>
                      <th className="border px-3 py-2">Profit</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.rate} className="border">
                        <td className="border px-3 py-2">
                          {row.rate.toFixed(1)}%
                        </td>
                        <td className="border px-3 py-2">{row.sales}</td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.revenue)}
                        </td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.profit)}
                        </td>
                        <td className="border px-3 py-2">
                          <StatusBadge
                            tone={
                              row.status === "Healthy" || row.status === "Strong"
                                ? "green"
                                : row.status === "Slow"
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
            How to use this Facebook Marketplace Sell-Through Rate Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter listings"
              text="Add active listings and monthly sales for the current period."
            />
            <InfoCard
              title="Add profit"
              text="Enter average sale price, profit per sale, and inventory cost."
            />
            <InfoCard
              title="Set target"
              text="Add target monthly sales and target sell-through rate."
            />
            <InfoCard
              title="Review inventory"
              text="Check whether to source more, relist stale items, or improve listings."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace sell-through breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the sell-through rate estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Active listings" value={String(activeListings)} />
              <Breakdown label="Monthly sales" value={String(monthlySales)} />
              <Breakdown
                label="Sell-through rate"
                value={`${results.sellThroughRate.toFixed(1)}%`}
              />
              <Breakdown
                label="Average sale price"
                value={formatMoney(averageSalePrice)}
              />
              <Breakdown
                label="Average profit per sale"
                value={formatMoney(averageProfitPerSale)}
              />
              <Breakdown
                label="Monthly revenue"
                value={formatMoney(results.monthlyRevenue)}
              />
              <Breakdown
                label="Monthly profit"
                value={formatMoney(results.monthlyProfit)}
              />
              <Breakdown
                label="Listings needed for target"
                value={String(results.listingsNeededForTargetSales)}
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace sell-through mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting total inventory instead of active listings.",
                "Treating views or messages as sales performance without checking conversions.",
                "Buying more inventory before checking sell-through rate.",
                "Leaving stale listings unchanged for months.",
                "Using one category-wide sell-through rate for products with very different demand.",
                "Ignoring price, photos, pickup friction, and condition when sell-through slows down.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace sell-through
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Improve listings"
              text="Update photos, title, description, measurements, condition notes, and pickup details on slow items."
            />
            <InfoCard
              title="Use sold comps"
              text="Compare against completed local sales instead of only active listing prices."
            />
            <InfoCard
              title="Relist stale items"
              text="Refresh or rebuild listings that have stopped getting useful buyer activity."
            />
            <InfoCard
              title="Source proven items"
              text="Buy more only after confirming demand, profit, pickup ease, and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/inventory-restock-calculator" label="Inventory Restock Calculator" />
            <Related href="/facebook-marketplace/sales-goal-calculator" label="Sales Goal Calculator" />
            <Related href="/facebook-marketplace/listing-roi-calculator" label="Listing ROI Calculator" />
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

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}