"use client";

import { useMemo, useState } from "react";

type Status = "Easy" | "Realistic" | "Stretch" | "Aggressive";

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

export default function PoshmarkSalesGoalCalculatorPage() {
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState(500);
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [averageItemCost, setAverageItemCost] = useState(14);
  const [packagingCostPerSale, setPackagingCostPerSale] = useState(1.25);
  const [shippingDiscountPerSale, setShippingDiscountPerSale] = useState(2.02);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [currentMonthlySales, setCurrentMonthlySales] = useState(25);
  const [activeListings, setActiveListings] = useState(120);
  const [sellThroughRate, setSellThroughRate] = useState(25);
  const [offerDiscountPerSale, setOfferDiscountPerSale] = useState(5);
  const [planningDays, setPlanningDays] = useState(30);

  const results = useMemo(() => {
    const effectiveSalePrice = Math.max(0, averageSalePrice - offerDiscountPerSale);

    const fee =
      effectiveSalePrice < flatFeeThreshold
        ? Math.min(flatFee, effectiveSalePrice)
        : effectiveSalePrice * (sellerFeeRate / 100);

    const profitPerSale =
      effectiveSalePrice -
      averageItemCost -
      packagingCostPerSale -
      shippingDiscountPerSale -
      fee;

    const salesNeeded =
      profitPerSale > 0 ? Math.ceil(targetMonthlyProfit / profitPerSale) : 0;

    const currentMonthlyProfit = currentMonthlySales * profitPerSale;
    const extraSalesNeeded = Math.max(0, salesNeeded - currentMonthlySales);
    const revenueNeeded = salesNeeded * effectiveSalePrice;
    const revenueGap = Math.max(0, revenueNeeded - currentMonthlySales * effectiveSalePrice);
    const dailySalesNeeded = planningDays > 0 ? salesNeeded / planningDays : 0;
    const dailyRevenueNeeded = planningDays > 0 ? revenueNeeded / planningDays : 0;

    const listingsNeeded =
      sellThroughRate > 0 ? Math.ceil(salesNeeded / (sellThroughRate / 100)) : 0;

    const extraListingsNeeded = Math.max(0, listingsNeeded - activeListings);

    const salesGrowthNeeded =
      currentMonthlySales > 0
        ? ((salesNeeded - currentMonthlySales) / currentMonthlySales) * 100
        : 100;

    const requiredAverageSalePrice =
      salesNeeded > 0
        ? targetMonthlyProfit / salesNeeded +
          averageItemCost +
          packagingCostPerSale +
          shippingDiscountPerSale +
          fee +
          offerDiscountPerSale
        : 0;

    let status: Status = "Realistic";
    if (extraSalesNeeded <= 5) status = "Easy";
    else if (salesGrowthNeeded > 200 || extraListingsNeeded > activeListings * 2)
      status = "Aggressive";
    else if (salesGrowthNeeded > 100 || extraListingsNeeded > activeListings)
      status = "Stretch";

    const scenarios = [250, 500, 750, 1000, 1500, 2000].map((goal) => {
      const sales = profitPerSale > 0 ? Math.ceil(goal / profitPerSale) : 0;
      const revenue = sales * effectiveSalePrice;
      const listings =
        sellThroughRate > 0 ? Math.ceil(sales / (sellThroughRate / 100)) : 0;

      let scenarioStatus: Status = "Realistic";
      const extraSales = Math.max(0, sales - currentMonthlySales);
      const growth =
        currentMonthlySales > 0
          ? ((sales - currentMonthlySales) / currentMonthlySales) * 100
          : 100;

      if (extraSales <= 5) scenarioStatus = "Easy";
      else if (growth > 200) scenarioStatus = "Aggressive";
      else if (growth > 100) scenarioStatus = "Stretch";

      return {
        goal,
        sales,
        revenue,
        listings,
        status: scenarioStatus,
      };
    });

    return {
      effectiveSalePrice,
      fee,
      profitPerSale,
      salesNeeded,
      currentMonthlyProfit,
      extraSalesNeeded,
      revenueNeeded,
      revenueGap,
      dailySalesNeeded,
      dailyRevenueNeeded,
      listingsNeeded,
      extraListingsNeeded,
      salesGrowthNeeded,
      requiredAverageSalePrice,
      status,
      scenarios,
    };
  }, [
    targetMonthlyProfit,
    averageSalePrice,
    averageItemCost,
    packagingCostPerSale,
    shippingDiscountPerSale,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    currentMonthlySales,
    activeListings,
    sellThroughRate,
    offerDiscountPerSale,
    planningDays,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Sales Goal Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from a Poshmark profit goal to estimate required sales,
          revenue, active listings, sell-through rate, daily pace, offer pressure,
          shipping discounts, and sourcing needs.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Sales goal inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your target profit, average item economics, current sales
              pace, active listings, sell-through rate, offer discount, and
              planning period.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Target monthly profit" value={targetMonthlyProfit} setValue={setTargetMonthlyProfit} />
              <MoneyInput label="Average sale price" value={averageSalePrice} setValue={setAverageSalePrice} />
              <MoneyInput label="Average item cost" value={averageItemCost} setValue={setAverageItemCost} />
              <MoneyInput label="Packaging cost per sale" value={packagingCostPerSale} setValue={setPackagingCostPerSale} />
              <MoneyInput label="Shipping discount per sale" value={shippingDiscountPerSale} setValue={setShippingDiscountPerSale} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <NumberInput label="Current monthly sales" value={currentMonthlySales} setValue={setCurrentMonthlySales} />
              <NumberInput label="Active listings" value={activeListings} setValue={setActiveListings} />
              <PercentInput label="Sell-through rate" value={sellThroughRate} setValue={setSellThroughRate} />
              <MoneyInput label="Offer discount per sale" value={offerDiscountPerSale} setValue={setOfferDiscountPerSale} />
              <DaysInput label="Planning days" value={planningDays} setValue={setPlanningDays} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark demand, buyer offers,
              shipping discounts, sell-through rate, sourcing supply, and listing
              performance may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark sales goal plan.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="blue"
                title="Sales needed"
                value={String(results.salesNeeded)}
                text="Sales required to reach the target monthly profit."
              />
              <ResultCard
                tone="yellow"
                title="Extra sales needed"
                value={String(results.extraSalesNeeded)}
                text="Additional monthly sales needed above current pace."
              />
              <ResultCard
                tone="blue"
                title="Revenue needed"
                value={money(results.revenueNeeded)}
                text="Monthly revenue needed at the effective average sale price."
              />
              <ResultCard
                tone="yellow"
                title="Revenue gap"
                value={money(results.revenueGap)}
                text="Difference between current revenue and target revenue."
              />
              <ResultCard
                tone="green"
                title="Profit per sale"
                value={money(results.profitPerSale)}
                text="Estimated profit after item cost, fee, offer discount, packaging, and shipping discount."
              />
              <ResultCard
                tone="green"
                title="Current monthly profit"
                value={money(results.currentMonthlyProfit)}
                text="Current estimated monthly profit before goal increase."
              />
              <ResultCard
                tone="blue"
                title="Daily sales needed"
                value={results.dailySalesNeeded.toFixed(1)}
                text="Required average sales per day during the planning period."
              />
              <ResultCard
                tone="green"
                title="Daily revenue needed"
                value={money(results.dailyRevenueNeeded)}
                text="Required average revenue per day."
              />
              <ResultCard
                tone="blue"
                title="Listings needed"
                value={String(results.listingsNeeded)}
                text="Active listings needed at the entered sell-through rate."
              />
              <ResultCard
                tone="yellow"
                title="Extra listings needed"
                value={String(results.extraListingsNeeded)}
                text="Additional active listings needed for the sales goal."
              />
              <ResultCard
                tone="yellow"
                title="Order growth needed"
                value={pct(results.salesGrowthNeeded)}
                text="Sales increase needed compared with current monthly sales."
              />
              <ResultCard
                tone="yellow"
                title="Required average sale price"
                value={money(results.requiredAverageSalePrice)}
                text="Approximate average sale price needed if sales volume stays the same."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                To reach <strong>{money(targetMonthlyProfit)}</strong> in monthly
                profit, you need about <strong>{results.salesNeeded}</strong>{" "}
                sales and <strong>{money(results.revenueNeeded)}</strong> in
                monthly revenue at the entered assumptions.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                At a <strong>{pct(sellThroughRate)}</strong> sell-through rate,
                this goal requires about{" "}
                <strong>{results.listingsNeeded}</strong> active listings.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Easy"
                  ? "This goal appears close to your current pace."
                  : results.status === "Realistic"
                    ? "This goal may be reachable with moderate improvement in listings, pricing, or sell-through."
                    : results.status === "Stretch"
                      ? "This goal likely requires a major increase in listings, sourcing, or sell-through."
                      : "This goal appears aggressive under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Profit goal scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Profit goal</th>
                      <th className="px-3 py-2">Sales</th>
                      <th className="px-3 py-2">Revenue</th>
                      <th className="px-3 py-2">Listings</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.goal} className="border-t">
                        <td className="px-3 py-2">{money(row.goal)}</td>
                        <td className="px-3 py-2">{row.sales}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{row.listings}</td>
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
            How to use this Poshmark Sales Goal Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter goal"
              text="Add the monthly profit target you want your Poshmark closet to reach."
            />
            <StepCard
              title="Add item economics"
              text="Enter average sale price, item cost, shipping discount, offer discount, and fee assumptions."
            />
            <StepCard
              title="Add current pace"
              text="Include current monthly sales, active listings, and sell-through rate."
            />
            <StepCard
              title="Review gap"
              text="Check how many sales, listings, and daily sales are needed."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark sales goal breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the Poshmark sales goal estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target monthly profit" value={money(targetMonthlyProfit)} />
              <Breakdown label="Average sale price" value={money(averageSalePrice)} />
              <Breakdown label="Effective sale price" value={money(results.effectiveSalePrice)} />
              <Breakdown label="Profit per sale" value={money(results.profitPerSale)} />
              <Breakdown label="Current monthly sales" value={String(currentMonthlySales)} />
              <Breakdown label="Sales needed" value={String(results.salesNeeded)} />
              <Breakdown label="Extra sales needed" value={String(results.extraSalesNeeded)} />
              <Breakdown label="Listings needed" value={String(results.listingsNeeded)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark sales goal mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Setting a revenue goal without checking profit per sale.",
                "Ignoring offer discounts and seller-paid shipping discounts.",
                "Assuming sell-through rate will stay high as listing volume grows.",
                "Trying to reach goals by accepting weak offers that hurt profit.",
                "Forgetting sourcing, cleaning, listing, packing, and shipping workload.",
                "Planning sales goals without enough profitable inventory.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reach a Poshmark sales goal
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Raise sale price"
              text="Source higher-value items or improve presentation to support stronger prices."
            />
            <StepCard
              title="Improve sell-through"
              text="Use better photos, titles, pricing, sharing, and descriptions to move items faster."
            />
            <StepCard
              title="List consistently"
              text="Add quality listings regularly instead of relying on a small stale inventory pool."
            />
            <StepCard
              title="Protect profit"
              text="Reject offers and discounts that increase sales while reducing real profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/poshmark/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
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
    status === "Easy"
      ? "bg-green-100 text-green-700"
      : status === "Realistic"
        ? "bg-blue-100 text-blue-700"
        : status === "Stretch"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

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
          Included in the sales goal estimate.
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