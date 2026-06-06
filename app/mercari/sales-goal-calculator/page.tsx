"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariSalesGoalCalculatorPage() {
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState(500);
  const [averageSalePrice, setAverageSalePrice] = useState(35);
  const [averageItemCost, setAverageItemCost] = useState(10);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [currentMonthlySales, setCurrentMonthlySales] = useState(25);
  const [activeListings, setActiveListings] = useState(120);
  const [sellThroughRate, setSellThroughRate] = useState(25);
  const [promotionBudget, setPromotionBudget] = useState(50);
  const [planningDays, setPlanningDays] = useState(30);

  const results = useMemo(() => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const estimatedFees = averageSalePrice * feeRate + fixedFee;
    const profitPerSale =
      averageSalePrice -
      averageItemCost -
      shippingCost -
      packagingCost -
      estimatedFees;

    const profitAfterPromotionBudget = targetMonthlyProfit + promotionBudget;
    const salesNeeded =
      profitPerSale > 0 ? Math.ceil(profitAfterPromotionBudget / profitPerSale) : 0;

    const currentProfit = currentMonthlySales * profitPerSale - promotionBudget;
    const extraSalesNeeded = Math.max(0, salesNeeded - currentMonthlySales);
    const revenueNeeded = salesNeeded * averageSalePrice;
    const currentRevenue = currentMonthlySales * averageSalePrice;
    const revenueGap = Math.max(0, revenueNeeded - currentRevenue);
    const dailySalesNeeded = planningDays > 0 ? salesNeeded / planningDays : 0;
    const dailyRevenueNeeded = planningDays > 0 ? revenueNeeded / planningDays : 0;

    const listingsNeeded =
      sellThroughRate > 0 ? Math.ceil(salesNeeded / (sellThroughRate / 100)) : 0;
    const extraListingsNeeded = Math.max(0, listingsNeeded - activeListings);

    const requiredAverageSalePrice =
      salesNeeded > 0
        ? (targetMonthlyProfit +
            promotionBudget +
            salesNeeded *
              (averageItemCost + shippingCost + packagingCost + fixedFee)) /
          (salesNeeded * (1 - feeRate))
        : 0;

    const requiredProfitPerSale =
      salesNeeded > 0 ? profitAfterPromotionBudget / salesNeeded : 0;

    const orderGrowthNeeded =
      currentMonthlySales > 0
        ? ((salesNeeded - currentMonthlySales) / currentMonthlySales) * 100
        : 0;

    let status = "Easy";
    if (extraSalesNeeded > currentMonthlySales * 2) status = "Aggressive";
    else if (extraSalesNeeded > currentMonthlySales) status = "Stretch";
    else if (extraSalesNeeded > currentMonthlySales * 0.25) status = "Realistic";

    return {
      estimatedFees,
      profitPerSale,
      salesNeeded,
      currentProfit,
      extraSalesNeeded,
      revenueNeeded,
      currentRevenue,
      revenueGap,
      dailySalesNeeded,
      dailyRevenueNeeded,
      listingsNeeded,
      extraListingsNeeded,
      requiredAverageSalePrice,
      requiredProfitPerSale,
      orderGrowthNeeded,
      status,
    };
  }, [
    targetMonthlyProfit,
    averageSalePrice,
    averageItemCost,
    shippingCost,
    packagingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    currentMonthlySales,
    activeListings,
    sellThroughRate,
    promotionBudget,
    planningDays,
  ]);

  const scenarios = [250, 500, 750, 1000, 1500, 2000].map((profitGoal) => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const fees = averageSalePrice * feeRate + fixedFee;
    const profitPerSale =
      averageSalePrice - averageItemCost - shippingCost - packagingCost - fees;
    const sales =
      profitPerSale > 0 ? Math.ceil((profitGoal + promotionBudget) / profitPerSale) : 0;
    const revenue = sales * averageSalePrice;
    const listings =
      sellThroughRate > 0 ? Math.ceil(sales / (sellThroughRate / 100)) : 0;
    const extraListings = Math.max(0, listings - activeListings);

    let status = "Easy";
    if (sales - currentMonthlySales > currentMonthlySales * 2) status = "Aggressive";
    else if (sales - currentMonthlySales > currentMonthlySales) status = "Stretch";
    else if (sales - currentMonthlySales > currentMonthlySales * 0.25) status = "Realistic";

    return { profitGoal, sales, revenue, listings, extraListings, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Sales Goal Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from a Mercari profit goal to estimate required sales,
          revenue, active listings, sell-through rate, daily pace, promotion
          budget, and listing volume.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Sales goal inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your target profit, average item economics, current sales
              pace, active listings, sell-through rate, and planning period.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Target monthly profit" value={targetMonthlyProfit} setValue={setTargetMonthlyProfit} prefix="$" />
              <NumberInput label="Average sale price" value={averageSalePrice} setValue={setAverageSalePrice} prefix="$" />
              <NumberInput label="Average item cost" value={averageItemCost} setValue={setAverageItemCost} prefix="$" />
              <NumberInput label="Shipping cost per sale" value={shippingCost} setValue={setShippingCost} prefix="$" />
              <NumberInput label="Packaging cost per sale" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Current monthly sales" value={currentMonthlySales} setValue={setCurrentMonthlySales} />
              <NumberInput label="Active listings" value={activeListings} setValue={setActiveListings} />
              <NumberInput label="Sell-through rate" value={sellThroughRate} setValue={setSellThroughRate} suffix="%" />
              <NumberInput label="Promotion budget" value={promotionBudget} setValue={setPromotionBudget} prefix="$" />
              <NumberInput label="Planning days" value={planningDays} setValue={setPlanningDays} suffix="days" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari demand, buyer
              offers, sell-through rate, shipping costs, fees, sourcing supply,
              and listing performance may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari sales goal plan.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Sales needed" value={number(results.salesNeeded)} tone="blue" text="Sales required to reach the target monthly profit." />
              <ResultCard title="Extra sales needed" value={number(results.extraSalesNeeded)} tone="yellow" text="Additional monthly sales needed above current pace." />
              <ResultCard title="Revenue needed" value={money(results.revenueNeeded)} tone="blue" text="Monthly revenue needed at the entered average sale price." />
              <ResultCard title="Revenue gap" value={money(results.revenueGap)} tone="yellow" text="Difference between current revenue and target revenue." />
              <ResultCard title="Profit per sale" value={money(results.profitPerSale)} tone="green" text="Estimated profit after item cost, shipping, packaging, and fees." />
              <ResultCard title="Current monthly profit" value={money(results.currentProfit)} tone={results.currentProfit >= 0 ? "green" : "yellow"} text="Current estimated profit after promotion budget." />
              <ResultCard title="Daily sales needed" value={results.dailySalesNeeded.toFixed(1)} tone="blue" text="Required average sales per day during the planning period." />
              <ResultCard title="Daily revenue needed" value={money(results.dailyRevenueNeeded)} tone="green" text="Required average revenue per day." />
              <ResultCard title="Listings needed" value={number(results.listingsNeeded)} tone="blue" text="Active listings needed at the entered sell-through rate." />
              <ResultCard title="Extra listings needed" value={number(results.extraListingsNeeded)} tone={results.extraListingsNeeded === 0 ? "green" : "yellow"} text="Additional active listings needed for the sales goal." />
              <ResultCard title="Order growth needed" value={`${results.orderGrowthNeeded.toFixed(1)}%`} tone="yellow" text="Sales increase needed compared with current monthly sales." />
              <ResultCard title="Required average sale price" value={money(results.requiredAverageSalePrice)} tone="yellow" text="Average sale price needed if sales volume stays the same." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                To reach <strong>{money(targetMonthlyProfit)}</strong> in
                monthly profit, you need about{" "}
                <strong>{number(results.salesNeeded)}</strong> sales and{" "}
                <strong>{money(results.revenueNeeded)}</strong> in monthly
                revenue at the entered assumptions.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                At a <strong>{sellThroughRate.toFixed(1)}%</strong> sell-through
                rate, this goal requires about{" "}
                <strong>{number(results.listingsNeeded)}</strong> active
                listings.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Easy"
                  ? "This goal appears close to your current selling pace."
                  : results.status === "Realistic"
                    ? "This goal may be reachable with moderate improvements in listings, sourcing, or sell-through."
                    : results.status === "Stretch"
                      ? "This goal requires meaningful growth in sales volume, listing count, or profit per sale."
                      : "This goal is aggressive and may require major sourcing, listing, pricing, or demand improvements."}
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
                    {scenarios.map((row) => (
                      <tr key={row.profitGoal} className="border-t">
                        <td className="px-3 py-2">{money(row.profitGoal)}</td>
                        <td className="px-3 py-2">{number(row.sales)}</td>
                        <td className="px-3 py-2">{money(row.revenue)}</td>
                        <td className="px-3 py-2">{number(row.listings)}</td>
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
            How to use this Mercari Sales Goal Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter goal" text="Add the monthly profit target you want your Mercari store to reach." />
            <StepCard title="Add item economics" text="Enter average sale price, item cost, shipping, packaging, and fees." />
            <StepCard title="Add current pace" text="Include current monthly sales, active listings, and sell-through rate." />
            <StepCard title="Review gap" text="Check how many sales, listings, and daily sales are needed." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari sales goal breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the Mercari sales goal estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target monthly profit" value={money(targetMonthlyProfit)} />
              <Breakdown label="Average sale price" value={money(averageSalePrice)} />
              <Breakdown label="Profit per sale" value={money(results.profitPerSale)} />
              <Breakdown label="Current monthly sales" value={number(currentMonthlySales)} />
              <Breakdown label="Sales needed" value={number(results.salesNeeded)} />
              <Breakdown label="Extra sales needed" value={number(results.extraSalesNeeded)} />
              <Breakdown label="Listings needed" value={number(results.listingsNeeded)} />
              <Breakdown label="Daily sales needed" value={results.dailySalesNeeded.toFixed(1)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari sales goal mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Setting revenue goals without checking profit per sale." />
              <Warning text="Ignoring how many listings are needed to support the goal." />
              <Warning text="Assuming sell-through rate will stay high as listing volume grows." />
              <Warning text="Trying to reach goals by accepting weak offers that hurt profit." />
              <Warning text="Forgetting sourcing, cleaning, listing, packing, and shipping workload." />
              <Warning text="Planning sales goals without enough profitable inventory." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reach a Mercari sales goal</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Raise sale price" text="Source higher-value items or improve presentation to support stronger prices." />
            <StepCard title="Improve sell-through" text="Use better photos, titles, pricing, and descriptions to move items faster." />
            <StepCard title="List consistently" text="Add quality listings regularly instead of relying on a small stale inventory pool." />
            <StepCard title="Protect profit" text="Reject offers and promotions that help revenue but fail to support profit." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/listing-roi-calculator" label="Listing ROI Calculator" />
            <Related href="/mercari/inventory-restock-calculator" label="Inventory Restock Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
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
          Included in the sales goal estimate.
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
  if (status === "Easy") {
    return "rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700";
  }

  if (status === "Realistic") {
    return "rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700";
  }

  if (status === "Stretch") {
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