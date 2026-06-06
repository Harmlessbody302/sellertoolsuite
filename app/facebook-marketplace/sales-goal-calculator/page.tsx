"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceSalesGoalCalculatorPage() {
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState(750);
  const [averageSalePrice, setAverageSalePrice] = useState(80);
  const [averageItemCost, setAverageItemCost] = useState(35);
  const [packagingCostPerSale, setPackagingCostPerSale] = useState(1);
  const [deliveryCostPerSale, setDeliveryCostPerSale] = useState(5);
  const [shippingCostPerSale, setShippingCostPerSale] = useState(0);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [negotiationDiscountPerSale, setNegotiationDiscountPerSale] = useState(8);
  const [currentMonthlySales, setCurrentMonthlySales] = useState(25);
  const [activeListings, setActiveListings] = useState(80);
  const [sellThroughRate, setSellThroughRate] = useState(25);
  const [planningDays, setPlanningDays] = useState(30);

  const results = useMemo(() => {
    const effectiveSalePrice = Math.max(
      0,
      averageSalePrice - negotiationDiscountPerSale
    );

    const platformFee = effectiveSalePrice * (platformFeeRate / 100);

    const costPerSale =
      averageItemCost +
      packagingCostPerSale +
      deliveryCostPerSale +
      shippingCostPerSale +
      platformFee;

    const profitPerSale = effectiveSalePrice - costPerSale;

    const salesNeeded =
      profitPerSale > 0 ? Math.ceil(targetMonthlyProfit / profitPerSale) : 0;

    const revenueNeeded = salesNeeded * effectiveSalePrice;
    const currentMonthlyProfit = currentMonthlySales * profitPerSale;
    const extraSalesNeeded = Math.max(0, salesNeeded - currentMonthlySales);
    const revenueGap = Math.max(0, revenueNeeded - currentMonthlySales * effectiveSalePrice);

    const dailySalesNeeded =
      planningDays > 0 ? salesNeeded / planningDays : salesNeeded;

    const dailyRevenueNeeded =
      planningDays > 0 ? revenueNeeded / planningDays : revenueNeeded;

    const listingsNeeded =
      sellThroughRate > 0 ? Math.ceil(salesNeeded / (sellThroughRate / 100)) : 0;

    const extraListingsNeeded = Math.max(0, listingsNeeded - activeListings);

    const orderGrowthNeeded =
      currentMonthlySales > 0
        ? ((salesNeeded - currentMonthlySales) / currentMonthlySales) * 100
        : salesNeeded > 0
          ? 100
          : 0;

    const requiredAverageSalePrice =
      salesNeeded > 0
        ? targetMonthlyProfit / salesNeeded +
          averageItemCost +
          packagingCostPerSale +
          deliveryCostPerSale +
          shippingCostPerSale +
          platformFee
        : averageSalePrice;

    let status = "Realistic";
    if (profitPerSale <= 0) status = "Losing";
    else if (orderGrowthNeeded <= 25) status = "Easy";
    else if (orderGrowthNeeded <= 75) status = "Realistic";
    else if (orderGrowthNeeded <= 150) status = "Stretch";
    else status = "Aggressive";

    return {
      effectiveSalePrice,
      platformFee,
      costPerSale,
      profitPerSale,
      salesNeeded,
      revenueNeeded,
      currentMonthlyProfit,
      extraSalesNeeded,
      revenueGap,
      dailySalesNeeded,
      dailyRevenueNeeded,
      listingsNeeded,
      extraListingsNeeded,
      orderGrowthNeeded,
      requiredAverageSalePrice,
      status,
    };
  }, [
    targetMonthlyProfit,
    averageSalePrice,
    averageItemCost,
    packagingCostPerSale,
    deliveryCostPerSale,
    shippingCostPerSale,
    platformFeeRate,
    negotiationDiscountPerSale,
    currentMonthlySales,
    activeListings,
    sellThroughRate,
    planningDays,
  ]);

  const statusTone: Tone =
    results.status === "Easy" || results.status === "Realistic"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const scenarioRows = [250, 500, 750, 1000, 1500, 2000, 3000].map((goal) => {
    const sales =
      results.profitPerSale > 0 ? Math.ceil(goal / results.profitPerSale) : 0;
    const revenue = sales * results.effectiveSalePrice;
    const listings =
      sellThroughRate > 0 ? Math.ceil(sales / (sellThroughRate / 100)) : 0;
    const growth =
      currentMonthlySales > 0
        ? ((sales - currentMonthlySales) / currentMonthlySales) * 100
        : sales > 0
          ? 100
          : 0;

    let status = "Realistic";
    if (results.profitPerSale <= 0) status = "Losing";
    else if (growth <= 25) status = "Easy";
    else if (growth <= 75) status = "Realistic";
    else if (growth <= 150) status = "Stretch";
    else status = "Aggressive";

    return {
      goal,
      sales,
      revenue,
      listings,
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
          Facebook Marketplace Sales Goal Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Work backward from a Facebook Marketplace monthly profit goal to
          estimate required sales, revenue, active listings, sell-through rate,
          daily pace, offer discount pressure, delivery cost, and sourcing needs.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Sales goal inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your target profit, average item economics, current sales
              pace, active listings, sell-through rate, and planning period.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput
                label="Target monthly profit"
                value={targetMonthlyProfit}
                onChange={setTargetMonthlyProfit}
              />
              <MoneyInput
                label="Average sale price"
                value={averageSalePrice}
                onChange={setAverageSalePrice}
              />
              <MoneyInput
                label="Average item cost"
                value={averageItemCost}
                onChange={setAverageItemCost}
              />
              <MoneyInput
                label="Packaging cost per sale"
                value={packagingCostPerSale}
                onChange={setPackagingCostPerSale}
              />
              <MoneyInput
                label="Delivery cost per sale"
                value={deliveryCostPerSale}
                onChange={setDeliveryCostPerSale}
              />
              <MoneyInput
                label="Shipping cost per sale"
                value={shippingCostPerSale}
                onChange={setShippingCostPerSale}
              />
              <NumberInput
                label="Platform fee rate"
                value={platformFeeRate}
                onChange={setPlatformFeeRate}
                suffix="%"
              />
              <MoneyInput
                label="Negotiation discount per sale"
                value={negotiationDiscountPerSale}
                onChange={setNegotiationDiscountPerSale}
              />
              <NumberInput
                label="Current monthly sales"
                value={currentMonthlySales}
                onChange={setCurrentMonthlySales}
              />
              <NumberInput
                label="Active listings"
                value={activeListings}
                onChange={setActiveListings}
              />
              <NumberInput
                label="Sell-through rate"
                value={sellThroughRate}
                onChange={setSellThroughRate}
                suffix="%"
              />
              <NumberInput
                label="Planning days"
                value={planningDays}
                onChange={setPlanningDays}
                suffix="days"
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace demand,
              buyer messages, local competition, negotiation behavior, pickup
              reliability, delivery cost, sourcing availability, and listing
              performance may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace sales goal plan.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Sales needed"
                value={String(results.salesNeeded)}
                tone="blue"
                text="Sales required to reach the target monthly profit."
              />
              <ResultCard
                label="Extra sales needed"
                value={String(results.extraSalesNeeded)}
                tone={results.extraSalesNeeded === 0 ? "green" : "yellow"}
                text="Additional monthly sales needed above current pace."
              />
              <ResultCard
                label="Revenue needed"
                value={formatMoney(results.revenueNeeded)}
                tone="blue"
                text="Monthly revenue needed at the effective average sale price."
              />
              <ResultCard
                label="Revenue gap"
                value={formatMoney(results.revenueGap)}
                tone={results.revenueGap === 0 ? "green" : "yellow"}
                text="Difference between current revenue and target revenue."
              />
              <ResultCard
                label="Profit per sale"
                value={formatMoney(results.profitPerSale)}
                tone={results.profitPerSale > 0 ? "green" : "red"}
                text="Estimated profit after item cost, delivery, shipping, fees, and negotiation."
              />
              <ResultCard
                label="Current monthly profit"
                value={formatMoney(results.currentMonthlyProfit)}
                tone="green"
                text="Estimated current monthly profit before goal increase."
              />
              <ResultCard
                label="Daily sales needed"
                value={results.dailySalesNeeded.toFixed(1)}
                tone="blue"
                text="Required average sales per day during the planning period."
              />
              <ResultCard
                label="Daily revenue needed"
                value={formatMoney(results.dailyRevenueNeeded)}
                tone="green"
                text="Required average revenue per day."
              />
              <ResultCard
                label="Listings needed"
                value={String(results.listingsNeeded)}
                tone="blue"
                text="Active listings needed at the entered sell-through rate."
              />
              <ResultCard
                label="Extra listings needed"
                value={String(results.extraListingsNeeded)}
                tone={results.extraListingsNeeded === 0 ? "green" : "yellow"}
                text="Additional active listings needed for the sales goal."
              />
              <ResultCard
                label="Order growth needed"
                value={`${results.orderGrowthNeeded.toFixed(1)}%`}
                tone={
                  results.orderGrowthNeeded <= 75
                    ? "green"
                    : results.orderGrowthNeeded <= 150
                      ? "yellow"
                      : "red"
                }
                text="Sales increase needed compared with current monthly sales."
              />
              <ResultCard
                label="Required average sale price"
                value={formatMoney(results.requiredAverageSalePrice)}
                tone="yellow"
                text="Approximate average sale price needed if sales volume stays the same."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                To reach <strong>{formatMoney(targetMonthlyProfit)}</strong> in
                monthly profit, you need about{" "}
                <strong>{results.salesNeeded}</strong> sales and{" "}
                <strong>{formatMoney(results.revenueNeeded)}</strong> in monthly
                revenue at the entered assumptions.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                At a <strong>{sellThroughRate.toFixed(1)}%</strong>{" "}
                sell-through rate, this goal requires about{" "}
                <strong>{results.listingsNeeded}</strong> active listings.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Easy"
                  ? "This goal may be reachable with a modest increase in listings, pricing, or sell-through."
                  : results.status === "Realistic"
                    ? "This goal may be reachable with moderate improvement in listings, pricing, sourcing, or sell-through."
                    : results.status === "Stretch"
                      ? "This goal likely requires a major increase in listings, sell-through, or average profit per sale."
                      : results.status === "Aggressive"
                        ? "This goal may be aggressive unless sourcing, listing volume, and buyer demand increase significantly."
                        : "The current item economics appear to lose money, so the goal is not realistic until profit per sale improves."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Profit goal scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Profit goal</th>
                      <th className="border px-3 py-2">Sales</th>
                      <th className="border px-3 py-2">Revenue</th>
                      <th className="border px-3 py-2">Listings</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.goal} className="border">
                        <td className="border px-3 py-2">
                          {formatMoney(row.goal)}
                        </td>
                        <td className="border px-3 py-2">{row.sales}</td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.revenue)}
                        </td>
                        <td className="border px-3 py-2">{row.listings}</td>
                        <td className="border px-3 py-2">
                          <StatusBadge
                            tone={
                              row.status === "Easy" || row.status === "Realistic"
                                ? "green"
                                : row.status === "Losing"
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
            How to use this Facebook Marketplace Sales Goal Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter goal"
              text="Add the monthly profit target you want your Facebook Marketplace listings to reach."
            />
            <InfoCard
              title="Add item economics"
              text="Include average sale price, item cost, delivery cost, shipping cost, negotiation discount, and fees."
            />
            <InfoCard
              title="Add current pace"
              text="Include current monthly sales, active listings, and sell-through rate."
            />
            <InfoCard
              title="Review gap"
              text="Check how many sales, listings, and daily sales are needed."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace sales goal breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the Facebook Marketplace sales goal
              estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Target monthly profit" value={formatMoney(targetMonthlyProfit)} />
              <Breakdown label="Average sale price" value={formatMoney(averageSalePrice)} />
              <Breakdown label="Effective sale price" value={formatMoney(results.effectiveSalePrice)} />
              <Breakdown label="Profit per sale" value={formatMoney(results.profitPerSale)} />
              <Breakdown label="Current monthly sales" value={String(currentMonthlySales)} />
              <Breakdown label="Sales needed" value={String(results.salesNeeded)} />
              <Breakdown label="Extra sales needed" value={String(results.extraSalesNeeded)} />
              <Breakdown label="Listings needed" value={String(results.listingsNeeded)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace sales goal mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Setting a revenue goal without checking profit per sale.",
                "Ignoring delivery cost, shipping cost, negotiation discounts, and pickup friction.",
                "Assuming sell-through rate will stay high as listing volume grows.",
                "Trying to reach goals by accepting weak offers that hurt profit.",
                "Forgetting sourcing, cleaning, photographing, listing, and delivery workload.",
                "Planning sales goals without enough profitable inventory.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reach a Facebook Marketplace sales goal
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Raise sale price"
              text="Source higher-value items or improve presentation to support stronger prices."
            />
            <InfoCard
              title="Improve sell-through"
              text="Use better photos, titles, pricing, pickup details, and descriptions to move items faster."
            />
            <InfoCard
              title="List consistently"
              text="Add quality listings regularly instead of relying on a small stale inventory pool."
            />
            <InfoCard
              title="Protect profit"
              text="Reject offers and delivery requests that increase sales while reducing real profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/sell-through-rate-calculator" label="Sell-Through Calculator" />
            <Related href="/facebook-marketplace/inventory-restock-calculator" label="Restock Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
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

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}