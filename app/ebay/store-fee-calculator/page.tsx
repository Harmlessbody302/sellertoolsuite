"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { toMoney } from "@/lib/etsyCalculations";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "warning" | "bad" | "blue";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? (
        <p className="mt-2 text-sm leading-5 text-gray-600">{helper}</p>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Worth It"
      ? "bg-green-100 text-green-700"
      : status === "Likely Worth It"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Borderline"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${style}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const style =
    status === "Best"
      ? "bg-green-100 text-green-700"
      : status === "Good"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Watch"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayStoreFeeCalculatorPage() {
  const [monthlySales, setMonthlySales] = useState(3000);
  const [monthlyOrders, setMonthlyOrders] = useState(75);
  const [activeListings, setActiveListings] = useState(250);
  const [paidInsertionFees, setPaidInsertionFees] = useState(25);
  const [optionalListingUpgradeFees, setOptionalListingUpgradeFees] = useState(10);
  const [currentStoreFee, setCurrentStoreFee] = useState(21.95);
  const [expectedFeeSavingsRate, setExpectedFeeSavingsRate] = useState(1);
  const [freeInsertionValue, setFreeInsertionValue] = useState(0.35);
  const [includedFreeListings, setIncludedFreeListings] = useState(250);
  const [currentMonthlyProfit, setCurrentMonthlyProfit] = useState(900);

  const result = useMemo(() => {
    const sales = Math.max(0, monthlySales);
    const orders = Math.max(0, monthlyOrders);
    const listings = Math.max(0, activeListings);
    const insertionFees = Math.max(0, paidInsertionFees);
    const upgradeFees = Math.max(0, optionalListingUpgradeFees);
    const storeFee = Math.max(0, currentStoreFee);
    const feeSavingsRate = Math.min(50, Math.max(0, expectedFeeSavingsRate));
    const insertionValue = Math.max(0, freeInsertionValue);
    const freeListings = Math.max(0, includedFreeListings);
    const profit = Math.max(0, currentMonthlyProfit);

    const listingOverage = Math.max(0, listings - freeListings);
    const estimatedInsertionFeesAfterStore = listingOverage * insertionValue;
    const estimatedInsertionSavings = Math.max(
      0,
      insertionFees - estimatedInsertionFeesAfterStore,
    );

    const finalValueFeeSavings = sales * (feeSavingsRate / 100);
    const totalEstimatedSavings =
      estimatedInsertionSavings + finalValueFeeSavings;
    const totalStoreCost = storeFee + estimatedInsertionFeesAfterStore + upgradeFees;
    const netStoreValue = totalEstimatedSavings - storeFee;
    const currentListingCost = insertionFees + upgradeFees;
    const projectedListingCost =
      storeFee + estimatedInsertionFeesAfterStore + upgradeFees;
    const monthlyCostDifference = currentListingCost - projectedListingCost;

    const breakEvenSavingsNeeded = storeFee;
    const breakEvenSalesVolume =
      feeSavingsRate > 0 ? storeFee / (feeSavingsRate / 100) : 0;
    const breakEvenListingsNeeded =
      insertionValue > 0 ? Math.ceil(storeFee / insertionValue) : 0;

    const storeCostShareOfSales = sales > 0 ? (storeFee / sales) * 100 : 0;
    const storeCostShareOfProfit = profit > 0 ? (storeFee / profit) * 100 : 0;
    const savingsShareOfProfit =
      profit > 0 ? (totalEstimatedSavings / profit) * 100 : 0;
    const costPerOrder = orders > 0 ? storeFee / orders : 0;
    const costPerListing = listings > 0 ? storeFee / listings : 0;
    const monthlyNetProfitAfterStore = profit + netStoreValue;

    let status = "Likely Worth It";
    let statusText =
      "The entered eBay store fee appears likely to be worth it under the current assumptions.";
    let recommendation =
      "Compare the subscription cost against real insertion fee savings, final value fee savings, listing volume, and store features before upgrading.";

    if (netStoreValue <= 0 && monthlyCostDifference < 0) {
      status = "Not Worth It";
      statusText =
        "The entered eBay store fee may cost more than it saves under the current assumptions.";
      recommendation =
        "Wait to upgrade, increase listing volume, reduce optional listing fees, or choose a lower store tier until the subscription has a clearer payoff.";
    } else if (netStoreValue < storeFee * 0.5) {
      status = "Borderline";
      statusText =
        "The eBay store fee may be close to break-even, but the savings are not very strong.";
      recommendation =
        "Review your actual paid insertion fees, selling category fee discounts, listing count, and monthly sales before committing to a higher tier.";
    } else if (netStoreValue >= storeFee) {
      status = "Worth It";
      statusText =
        "The entered eBay store fee appears to provide strong estimated value compared with the monthly subscription cost.";
      recommendation =
        "This store tier may be worth keeping if the savings are based on real listing volume, category fees, and selling activity.";
    }

    const getScenarioStatus = (netValue: number) => {
      if (netValue >= storeFee) return "Best";
      if (netValue > 0) return "Good";
      if (netValue > -storeFee * 0.5) return "Watch";
      return "Poor";
    };

    const tierScenarios = [
      ["Starter", 7.95, 250],
      ["Basic", 21.95, 1000],
      ["Premium", 59.95, 10000],
      ["Anchor", 299.95, 25000],
      ["Enterprise", 2999.95, 100000],
    ].map(([tier, fee, included]) => {
      const tierFee = Number(fee);
      const tierIncluded = Number(included);
      const tierOverage = Math.max(0, listings - tierIncluded);
      const tierInsertionAfter = tierOverage * insertionValue;
      const tierInsertionSavings = Math.max(0, insertionFees - tierInsertionAfter);
      const tierSavings = tierInsertionSavings + finalValueFeeSavings;
      const tierNetValue = tierSavings - tierFee;
      const tierTotalCost = tierFee + tierInsertionAfter + upgradeFees;
      const tierCostPerListing = listings > 0 ? tierFee / listings : 0;

      return {
        tier: String(tier),
        fee: tierFee,
        included: tierIncluded,
        insertionAfter: tierInsertionAfter,
        savings: tierSavings,
        totalCost: tierTotalCost,
        netValue: tierNetValue,
        costPerListing: tierCostPerListing,
        status: getScenarioStatus(tierNetValue),
      };
    });

    const costBreakdown = [
      ["Store subscription fee", storeFee],
      ["Estimated paid insertion fees after store", estimatedInsertionFeesAfterStore],
      ["Optional listing upgrades", upgradeFees],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        projectedListingCost > 0
          ? (Number(amount) / projectedListingCost) * 100
          : 0,
      salesShare: sales > 0 ? (Number(amount) / sales) * 100 : 0,
    }));

    return {
      sales,
      orders,
      listings,
      insertionFees,
      upgradeFees,
      storeFee,
      feeSavingsRate,
      insertionValue,
      freeListings,
      profit,
      listingOverage,
      estimatedInsertionFeesAfterStore,
      estimatedInsertionSavings,
      finalValueFeeSavings,
      totalEstimatedSavings,
      totalStoreCost,
      netStoreValue,
      currentListingCost,
      projectedListingCost,
      monthlyCostDifference,
      breakEvenSavingsNeeded,
      breakEvenSalesVolume,
      breakEvenListingsNeeded,
      storeCostShareOfSales,
      storeCostShareOfProfit,
      savingsShareOfProfit,
      costPerOrder,
      costPerListing,
      monthlyNetProfitAfterStore,
      status,
      statusText,
      recommendation,
      tierScenarios,
      costBreakdown,
    };
  }, [
    monthlySales,
    monthlyOrders,
    activeListings,
    paidInsertionFees,
    optionalListingUpgradeFees,
    currentStoreFee,
    expectedFeeSavingsRate,
    freeInsertionValue,
    includedFreeListings,
    currentMonthlyProfit,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const valueTone =
    result.netStoreValue <= 0
      ? "bad"
      : result.netStoreValue < result.storeFee
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Store Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether an eBay Store subscription is worth it based on
          monthly sales, active listings, insertion fees, store cost, optional
          listing upgrades, and expected seller fee savings.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Store inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your eBay sales, listing volume, current insertion fees, store
            subscription cost, included listings, and expected fee savings to
            estimate whether the store tier pays for itself.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Store activity
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly sales"
                  prefix="$"
                  value={monthlySales}
                  onChange={setMonthlySales}
                />

                <NumberInput
                  label="Monthly orders"
                  value={monthlyOrders}
                  onChange={setMonthlyOrders}
                />

                <NumberInput
                  label="Active listings"
                  value={activeListings}
                  onChange={setActiveListings}
                />

                <NumberInput
                  label="Current monthly profit"
                  prefix="$"
                  value={currentMonthlyProfit}
                  onChange={setCurrentMonthlyProfit}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Current listing costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Current paid insertion fees"
                  prefix="$"
                  value={paidInsertionFees}
                  onChange={setPaidInsertionFees}
                />

                <NumberInput
                  label="Optional listing upgrade fees"
                  prefix="$"
                  value={optionalListingUpgradeFees}
                  onChange={setOptionalListingUpgradeFees}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Store tier assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly store fee"
                  prefix="$"
                  value={currentStoreFee}
                  onChange={setCurrentStoreFee}
                />

                <NumberInput
                  label="Included free listings"
                  value={includedFreeListings}
                  onChange={setIncludedFreeListings}
                />

                <NumberInput
                  label="Insertion fee value"
                  prefix="$"
                  value={freeInsertionValue}
                  onChange={setFreeInsertionValue}
                />

                <NumberInput
                  label="Expected fee savings rate"
                  suffix="%"
                  value={expectedFeeSavingsRate}
                  onChange={setExpectedFeeSavingsRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay Store subscription
            prices, included listings, insertion fees, final value fee discounts,
            category rules, optional upgrade fees, and seller-specific savings
            may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay Store subscription value.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net store value"
              value={toMoney(result.netStoreValue)}
              helper="Estimated savings minus monthly store fee"
              tone={valueTone}
            />

            <MetricCard
              label="Estimated monthly savings"
              value={toMoney(result.totalEstimatedSavings)}
              helper="Insertion fee savings plus estimated final value fee savings"
              tone={result.totalEstimatedSavings > 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Monthly store fee"
              value={toMoney(result.storeFee)}
              helper="Entered eBay Store subscription fee"
              tone="warning"
            />

            <MetricCard
              label="Projected listing cost"
              value={toMoney(result.projectedListingCost)}
              helper="Store fee plus remaining insertion fees and optional upgrades"
              tone="blue"
            />

            <MetricCard
              label="Current listing cost"
              value={toMoney(result.currentListingCost)}
              helper="Current paid insertion fees plus optional listing upgrades"
              tone="blue"
            />

            <MetricCard
              label="Monthly cost difference"
              value={toMoney(result.monthlyCostDifference)}
              helper="Current listing cost minus projected listing cost"
              tone={result.monthlyCostDifference >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Insertion fee savings"
              value={toMoney(result.estimatedInsertionSavings)}
              helper="Estimated reduction in paid insertion fees"
              tone={result.estimatedInsertionSavings > 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Final value fee savings"
              value={toMoney(result.finalValueFeeSavings)}
              helper="Monthly sales multiplied by expected savings rate"
              tone={result.finalValueFeeSavings > 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Listings over included limit"
              value={result.listingOverage.toLocaleString()}
              helper="Active listings minus included free listings"
              tone={result.listingOverage === 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Remaining insertion fees"
              value={toMoney(result.estimatedInsertionFeesAfterStore)}
              helper="Listings above included limit multiplied by insertion fee value"
              tone={result.estimatedInsertionFeesAfterStore === 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even sales volume"
              value={toMoney(result.breakEvenSalesVolume)}
              helper="Sales volume needed for fee savings to cover store fee"
              tone="warning"
            />

            <MetricCard
              label="Break-even listings"
              value={result.breakEvenListingsNeeded.toLocaleString()}
              helper="Insertion-fee listings needed to cover store fee"
              tone="warning"
            />

            <MetricCard
              label="Store cost per order"
              value={toMoney(result.costPerOrder)}
              helper="Monthly store fee divided by monthly orders"
              tone="blue"
            />

            <MetricCard
              label="Store cost per listing"
              value={toMoney(result.costPerListing)}
              helper="Monthly store fee divided by active listings"
              tone="blue"
            />

            <MetricCard
              label="Store cost share of profit"
              value={percent(result.storeCostShareOfProfit)}
              helper="Store fee divided by current monthly profit"
              tone={result.storeCostShareOfProfit < 5 ? "good" : "warning"}
            />

            <MetricCard
              label="Profit after store value"
              value={toMoney(result.monthlyNetProfitAfterStore)}
              helper="Current profit plus estimated net store value"
              tone={result.monthlyNetProfitAfterStore > result.profit ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your entered store fee is{" "}
                <strong>{toMoney(result.storeFee)}</strong>. Estimated monthly
                savings are{" "}
                <strong>{toMoney(result.totalEstimatedSavings)}</strong>,
                producing net store value of{" "}
                <strong>{toMoney(result.netStoreValue)}</strong>.
              </p>

              <p>
                With <strong>{result.listings.toLocaleString()}</strong> active
                listings and{" "}
                <strong>{result.freeListings.toLocaleString()}</strong> included
                listings, estimated listings over the included limit are{" "}
                <strong>{result.listingOverage.toLocaleString()}</strong>.
              </p>

              <p>
                Store cost equals about{" "}
                <strong>{toMoney(result.costPerOrder)}</strong> per order and{" "}
                <strong>{percent(result.storeCostShareOfProfit)}</strong> of
                current monthly profit.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Store tier comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Tier</th>
                    <th className="px-4 py-3">Fee</th>
                    <th className="px-4 py-3">Included</th>
                    <th className="px-4 py-3">Savings</th>
                    <th className="px-4 py-3">Net value</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.tierScenarios.map((row) => (
                    <tr
                      key={row.tier}
                      className={
                        row.fee === result.storeFee ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.tier}</td>
                      <td className="px-4 py-3">{toMoney(row.fee)}</td>
                      <td className="px-4 py-3">
                        {row.included.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.savings)}</td>
                      <td className="px-4 py-3">{toMoney(row.netValue)}</td>
                      <td className="px-4 py-3">
                        <SmallStatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this eBay Store Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sales volume",
              "Add monthly sales, orders, active listings, and current monthly profit.",
            ],
            [
              "Add current costs",
              "Enter paid insertion fees and optional listing upgrade costs before a store subscription.",
            ],
            [
              "Compare store tier",
              "Enter monthly store fee, included listings, insertion fee value, and expected fee savings.",
            ],
            [
              "Review payoff",
              "Compare savings, store cost, cost per listing, and net value before upgrading.",
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
            eBay Store cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which store-related costs affect the estimated monthly value.
          </p>

          <div className="mt-5 space-y-3">
            {result.costBreakdown.map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{item.label}</p>
                  <p className="text-sm font-bold text-gray-700">
                    {toMoney(item.amount)}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4 text-sm text-gray-600">
                  <p>{percent(item.share)} of projected listing cost</p>
                  <p>{percent(item.salesShare)} of monthly sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay Store fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Upgrading to a store tier before listing volume justifies the monthly fee.",
              "Ignoring optional listing upgrade fees when reviewing total listing cost.",
              "Assuming every included listing has value if your inventory count is low.",
              "Comparing tiers without checking category-specific fee discounts.",
              "Forgetting that store cost still matters even when sales are slow.",
              "Choosing a high tier for features without confirming that the store improves profit.",
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
            Understanding your eBay Store fee results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Worth It:</strong> Estimated
              savings appear strong compared with the entered monthly store fee.
            </p>

            <p>
              <strong className="text-emerald-700">Likely Worth It:</strong> The
              store fee appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Borderline:</strong> Savings may
              be close to break-even, so the store tier should be reviewed
              carefully.
            </p>

            <p>
              <strong className="text-red-700">Not Worth It:</strong> The store
              fee may cost more than it saves under the entered assumptions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Monthly sales, orders, active listings, and current monthly profit.",
              "Current insertion fees and optional listing upgrade fees.",
              "Monthly store subscription cost and included free listings.",
              "Expected category fee savings or final value fee discount impact.",
              "Listing count growth plans and whether included listings will actually be used.",
              "Store features, promotional tools, seller goals, and actual fee reports.",
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
          Ways to improve eBay Store value
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Use included listings",
              "Choose a tier where you can actually use the included listing allowance.",
            ],
            [
              "Review fee reports",
              "Compare real insertion fees and category fee savings before changing tiers.",
            ],
            [
              "Avoid overbuying tier",
              "Do not choose a high subscription tier just because it has more included listings.",
            ],
            [
              "Scale profitably",
              "Increase profitable listing count, conversion, and order volume before upgrading again.",
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
          Related eBay seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/fee-calculator", "Fee Calculator"],
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/listing-roi-calculator", "Listing ROI Calculator"],
            ["/ebay/sales-goal-calculator", "Sales Goal Calculator"],
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