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
    status === "Efficient"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Aggressive"
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
    status === "Efficient"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Aggressive"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbaySalesGoalCalculatorPage() {
  const [monthlyProfitGoal, setMonthlyProfitGoal] = useState(2000);
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [itemCost, setItemCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedOrderFee, setFixedOrderFee] = useState(0.4);
  const [promotedListingRate, setPromotedListingRate] = useState(2);
  const [returnAllowance, setReturnAllowance] = useState(1);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [activeListings, setActiveListings] = useState(100);

  const result = useMemo(() => {
    const goal = Math.max(0, monthlyProfitGoal);
    const salePrice = Math.max(0, averageSalePrice);
    const buyerShipping = Math.max(0, shippingCharged);
    const item = Math.max(0, itemCost);
    const actualShipping = Math.max(0, shippingCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, finalValueFeeRate));
    const fixedFee = Math.max(0, fixedOrderFee);
    const promotedRate = Math.min(95, Math.max(0, promotedListingRate));
    const returns = Math.max(0, returnAllowance);
    const conversion = Math.max(0.01, conversionRate);
    const listings = Math.max(1, activeListings);

    const revenuePerOrder = salePrice + buyerShipping;
    const finalValueFee = revenuePerOrder * (feeRate / 100) + fixedFee;
    const promotedFee = revenuePerOrder * (promotedRate / 100);
    const totalFees = finalValueFee + promotedFee;
    const totalCostPerOrder =
      item + actualShipping + packaging + returns + totalFees;
    const profitPerOrder = revenuePerOrder - totalCostPerOrder;
    const margin = revenuePerOrder > 0 ? (profitPerOrder / revenuePerOrder) * 100 : 0;
    const roiOnItemCost = item > 0 ? (profitPerOrder / item) * 100 : 0;
    const feeShare = revenuePerOrder > 0 ? (totalFees / revenuePerOrder) * 100 : 0;
    const costShare =
      revenuePerOrder > 0 ? (totalCostPerOrder / revenuePerOrder) * 100 : 0;

    const requiredOrders =
      profitPerOrder > 0 ? Math.ceil(goal / profitPerOrder) : 0;
    const requiredRevenue = requiredOrders * revenuePerOrder;
    const requiredGrossSales = requiredOrders * salePrice;
    const requiredViews = Math.ceil(requiredOrders / (conversion / 100));
    const ordersPerDay = requiredOrders / 30;
    const revenuePerDay = requiredRevenue / 30;
    const viewsPerDay = requiredViews / 30;
    const ordersPerListing = requiredOrders / listings;
    const viewsPerListing = requiredViews / listings;
    const weeklyOrders = requiredOrders / 4.345;
    const weeklyViews = requiredViews / 4.345;

    const breakEvenOrders = profitPerOrder > 0 ? Math.ceil(goal / profitPerOrder) : 0;
    const targetRevenueAtCurrentMargin =
      margin > 0 ? goal / (margin / 100) : 0;

    let status = "Healthy";
    let statusText =
      "This eBay sales goal appears workable under the current profit and conversion assumptions.";
    let recommendation =
      "Review inventory, shipping workflow, listing quality, and sourcing capacity before scaling toward this goal.";

    if (profitPerOrder <= 0) {
      status = "Not Viable";
      statusText =
        "This sales goal cannot be reached because the current order assumptions do not produce profit.";
      recommendation =
        "Raise price, reduce item cost, lower shipping drag, reduce promoted listing rate, or improve fee/cost assumptions before setting a sales goal.";
    } else if (requiredOrders > 300 || ordersPerDay > 10 || requiredViews > 50000) {
      status = "Aggressive";
      statusText =
        "This goal may require aggressive order volume, traffic, inventory, or fulfillment capacity.";
      recommendation =
        "Improve profit per order, conversion rate, listing count, sourcing volume, or average order value to make the goal easier to reach.";
    } else if (margin >= 30 && requiredOrders <= 150) {
      status = "Efficient";
      statusText =
        "This goal looks efficient because each order contributes strong estimated profit.";
      recommendation =
        "This goal may be reasonable if your inventory, fulfillment process, and listing traffic can support the required volume.";
    }

    const goalScenarios = [500, 1000, 2000, 3000, 5000].map((scenarioGoal) => {
      const scenarioOrders =
        profitPerOrder > 0 ? Math.ceil(scenarioGoal / profitPerOrder) : 0;
      const scenarioViews = Math.ceil(scenarioOrders / (conversion / 100));
      const scenarioRevenue = scenarioOrders * revenuePerOrder;
      const scenarioOrdersPerDay = scenarioOrders / 30;

      let scenarioStatus = "Healthy";
      if (profitPerOrder <= 0) scenarioStatus = "Not Viable";
      else if (scenarioOrders > 300 || scenarioViews > 50000) {
        scenarioStatus = "Aggressive";
      } else if (margin >= 30 && scenarioOrders <= 150) {
        scenarioStatus = "Efficient";
      }

      return {
        goal: scenarioGoal,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        views: scenarioViews,
        ordersPerDay: scenarioOrdersPerDay,
        status: scenarioStatus,
      };
    });

    const costBreakdown = [
      ["Item cost", item],
      ["Actual shipping cost", actualShipping],
      ["Packaging cost", packaging],
      ["Final value fee", finalValueFee],
      ["Promoted listing fee", promotedFee],
      ["Return allowance", returns],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalCostPerOrder > 0
          ? (Number(amount) / totalCostPerOrder) * 100
          : 0,
      revenueShare:
        revenuePerOrder > 0 ? (Number(amount) / revenuePerOrder) * 100 : 0,
    }));

    return {
      goal,
      salePrice,
      buyerShipping,
      item,
      actualShipping,
      packaging,
      feeRate,
      fixedFee,
      promotedRate,
      returns,
      conversion,
      listings,
      revenuePerOrder,
      finalValueFee,
      promotedFee,
      totalFees,
      totalCostPerOrder,
      profitPerOrder,
      margin,
      roiOnItemCost,
      feeShare,
      costShare,
      requiredOrders,
      requiredRevenue,
      requiredGrossSales,
      requiredViews,
      ordersPerDay,
      revenuePerDay,
      viewsPerDay,
      ordersPerListing,
      viewsPerListing,
      weeklyOrders,
      weeklyViews,
      breakEvenOrders,
      targetRevenueAtCurrentMargin,
      status,
      statusText,
      recommendation,
      goalScenarios,
      costBreakdown,
    };
  }, [
    monthlyProfitGoal,
    averageSalePrice,
    shippingCharged,
    itemCost,
    shippingCost,
    packagingCost,
    finalValueFeeRate,
    fixedOrderFee,
    promotedListingRate,
    returnAllowance,
    conversionRate,
    activeListings,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profitPerOrder <= 0
      ? "bad"
      : result.margin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Sales Goal Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how many eBay orders, views, listings, and monthly revenue
          are needed to reach a target profit goal after item cost, shipping,
          eBay fees, promoted listing costs, packaging, and returns.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Goal inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your monthly profit goal, average eBay sale assumptions, fee
            rates, conversion rate, and active listing count to estimate the
            sales volume required.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sales goal
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly profit goal"
                  prefix="$"
                  value={monthlyProfitGoal}
                  onChange={setMonthlyProfitGoal}
                />

                <NumberInput
                  label="Average sale price"
                  prefix="$"
                  value={averageSalePrice}
                  onChange={setAverageSalePrice}
                />

                <NumberInput
                  label="Shipping charged to buyer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />

                <NumberInput
                  label="Expected conversion rate"
                  suffix="%"
                  value={conversionRate}
                  onChange={setConversionRate}
                />

                <NumberInput
                  label="Active listings"
                  value={activeListings}
                  onChange={setActiveListings}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Cost assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Actual shipping cost"
                  prefix="$"
                  value={shippingCost}
                  onChange={setShippingCost}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Return allowance"
                  prefix="$"
                  value={returnAllowance}
                  onChange={setReturnAllowance}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                eBay fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Final value fee rate"
                  suffix="%"
                  value={finalValueFeeRate}
                  onChange={setFinalValueFeeRate}
                />

                <NumberInput
                  label="Fixed order fee"
                  prefix="$"
                  value={fixedOrderFee}
                  onChange={setFixedOrderFee}
                />

                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedListingRate}
                  onChange={setPromotedListingRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay fees, promoted listing
            costs, shipping costs, returns, refunds, taxes, conversion rates,
            search visibility, buyer demand, and seller-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay sales volume required.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Required monthly orders"
              value={result.requiredOrders.toLocaleString()}
              helper="Estimated orders needed to reach the profit goal"
              tone={result.requiredOrders <= 150 ? "good" : "warning"}
            />

            <MetricCard
              label="Required monthly views"
              value={result.requiredViews.toLocaleString()}
              helper="Estimated listing visits needed at the entered conversion rate"
              tone={result.requiredViews <= 20000 ? "good" : "warning"}
            />

            <MetricCard
              label="Profit per order"
              value={toMoney(result.profitPerOrder)}
              helper="Revenue per order minus item cost, shipping, fees, packaging, and return allowance"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Profit per order divided by total order revenue"
              tone={profitTone}
            />

            <MetricCard
              label="Required monthly revenue"
              value={toMoney(result.requiredRevenue)}
              helper="Orders needed multiplied by average order revenue"
              tone="blue"
            />

            <MetricCard
              label="Required gross item sales"
              value={toMoney(result.requiredGrossSales)}
              helper="Orders needed multiplied by average item sale price"
              tone="blue"
            />

            <MetricCard
              label="Orders per day"
              value={result.ordersPerDay.toFixed(1)}
              helper="Required monthly orders divided by 30"
              tone={result.ordersPerDay <= 5 ? "good" : "warning"}
            />

            <MetricCard
              label="Views per day"
              value={result.viewsPerDay.toFixed(0)}
              helper="Required monthly views divided by 30"
              tone={result.viewsPerDay <= 750 ? "good" : "warning"}
            />

            <MetricCard
              label="Orders per listing"
              value={result.ordersPerListing.toFixed(2)}
              helper="Monthly orders needed divided by active listings"
              tone={result.ordersPerListing <= 2 ? "good" : "warning"}
            />

            <MetricCard
              label="Views per listing"
              value={result.viewsPerListing.toFixed(0)}
              helper="Monthly views needed divided by active listings"
              tone={result.viewsPerListing <= 200 ? "good" : "warning"}
            />

            <MetricCard
              label="Revenue per order"
              value={toMoney(result.revenuePerOrder)}
              helper="Average sale price plus buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Total cost per order"
              value={toMoney(result.totalCostPerOrder)}
              helper="Item cost, shipping, packaging, fees, promotion, and return allowance"
              tone="warning"
            />

            <MetricCard
              label="Total eBay fees"
              value={toMoney(result.totalFees)}
              helper="Final value fee plus promoted listing fee"
              tone="warning"
            />

            <MetricCard
              label="Fee share"
              value={percent(result.feeShare)}
              helper="eBay fees divided by order revenue"
              tone="warning"
            />

            <MetricCard
              label="ROI on item cost"
              value={percent(result.roiOnItemCost)}
              helper="Profit per order divided by item cost"
              tone={result.roiOnItemCost > 40 ? "good" : "warning"}
            />

            <MetricCard
              label="Cost share"
              value={percent(result.costShare)}
              helper="Total order cost divided by order revenue"
              tone={result.costShare < 75 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                To reach a monthly profit goal of{" "}
                <strong>{toMoney(result.goal)}</strong>, you need about{" "}
                <strong>{result.requiredOrders.toLocaleString()}</strong> orders
                per month at an estimated profit of{" "}
                <strong>{toMoney(result.profitPerOrder)}</strong> per order.
              </p>

              <p>
                At a conversion rate of{" "}
                <strong>{percent(result.conversion)}</strong>, that requires
                about <strong>{result.requiredViews.toLocaleString()}</strong>{" "}
                monthly listing views, or{" "}
                <strong>{result.viewsPerDay.toFixed(0)}</strong> views per day.
              </p>

              <p>
                With <strong>{result.listings.toLocaleString()}</strong> active
                listings, this equals about{" "}
                <strong>{result.ordersPerListing.toFixed(2)}</strong> orders per
                listing per month.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Sales goal comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Profit goal</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3">Orders/day</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.goalScenarios.map((row) => (
                    <tr
                      key={row.goal}
                      className={
                        row.goal === result.goal ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{toMoney(row.goal)}</td>
                      <td className="px-4 py-3">
                        {row.orders.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">
                        {row.views.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {row.ordersPerDay.toFixed(1)}
                      </td>
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
          How to use this eBay Sales Goal Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter profit goal",
              "Start with the monthly profit amount you want your eBay store to generate.",
            ],
            [
              "Estimate order profit",
              "Add average sale price, item cost, shipping, fees, promotion, packaging, and returns.",
            ],
            [
              "Add conversion rate",
              "Use expected listing conversion rate to estimate how many views are needed.",
            ],
            [
              "Check capacity",
              "Compare required orders against inventory, shipping workflow, sourcing, and listing count.",
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
            eBay order cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of each estimated
            eBay order.
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
                  <p>{percent(item.share)} of order costs</p>
                  <p>{percent(item.revenueShare)} of order revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay sales goal mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Setting revenue goals instead of profit goals.",
              "Ignoring eBay fees, promoted listing fees, shipping, returns, and packaging.",
              "Assuming more orders automatically means more profit.",
              "Using unrealistic conversion rates when estimating required traffic.",
              "Scaling inventory before checking whether required order volume is realistic.",
              "Ignoring sourcing, shipping, customer service, and return workload.",
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
            Understanding your eBay sales goal results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Efficient:</strong> Your goal
              appears more efficient because each order contributes strong
              estimated profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Your goal
              appears workable under the current profit and conversion
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Aggressive:</strong> Your goal
              may require a large amount of inventory, traffic, sourcing,
              shipping work, or listing optimization.
            </p>

            <p>
              <strong className="text-red-700">Not Viable:</strong> The entered
              order assumptions do not produce enough profit to support the
              goal.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Monthly profit goal and average sale price.",
              "Average item cost, sourcing cost, cleaning cost, and prep cost.",
              "Shipping charged, actual shipping cost, packaging, and labels.",
              "eBay final value fee, fixed order fee, and promoted listing rate.",
              "Return, refund, cancellation, and damaged item allowance.",
              "Conversion rate, active listings, traffic, inventory, and fulfillment capacity.",
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
          Ways to make eBay sales goals easier
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise profit per order",
              "Improve sourcing, pricing, shipping, and promoted listing decisions to increase contribution per sale.",
            ],
            [
              "Improve conversion",
              "Use better photos, titles, item specifics, pricing, shipping options, and listing quality.",
            ],
            [
              "Increase active listings",
              "Add profitable listings so the required views and orders are spread across more inventory.",
            ],
            [
              "Protect capacity",
              "Make sure sourcing, packing, shipping, returns, and customer service can handle the goal.",
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
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
            ["/ebay/offer-discount-calculator", "Offer Discount Calculator"],
            ["/ebay/promoted-listing-roi-calculator", "Promoted Listing ROI Calculator"],
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