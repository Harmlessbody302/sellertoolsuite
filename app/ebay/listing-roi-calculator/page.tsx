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
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Weak ROI"
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
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Weak"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayListingRoiCalculatorPage() {
  const [monthlyViews, setMonthlyViews] = useState(2500);
  const [monthlyOrders, setMonthlyOrders] = useState(65);
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [profitPerOrder, setProfitPerOrder] = useState(14.5);
  const [monthlyPromotedCost, setMonthlyPromotedCost] = useState(65);
  const [monthlyListingCost, setMonthlyListingCost] = useState(10);
  const [maintenanceHours, setMaintenanceHours] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [refundLoss, setRefundLoss] = useState(30);
  const [activeListings, setActiveListings] = useState(100);

  const result = useMemo(() => {
    const views = Math.max(0, monthlyViews);
    const orders = Math.max(0, monthlyOrders);
    const salePrice = Math.max(0, averageSalePrice);
    const buyerShipping = Math.max(0, shippingCharged);
    const profitOrder = Math.max(0, profitPerOrder);
    const promotedCost = Math.max(0, monthlyPromotedCost);
    const listingCost = Math.max(0, monthlyListingCost);
    const hours = Math.max(0, maintenanceHours);
    const rate = Math.max(0, hourlyRate);
    const refunds = Math.max(0, refundLoss);
    const listings = Math.max(1, activeListings);

    const revenuePerOrder = salePrice + buyerShipping;
    const grossRevenue = orders * revenuePerOrder;
    const grossItemSales = orders * salePrice;
    const grossProfit = orders * profitOrder;
    const maintenanceCost = hours * rate;
    const totalInvestment =
      promotedCost + listingCost + maintenanceCost + refunds;
    const netListingProfit = grossProfit - totalInvestment;

    const roi =
      totalInvestment > 0 ? (netListingProfit / totalInvestment) * 100 : 0;
    const grossRoi =
      totalInvestment > 0 ? (grossProfit / totalInvestment) * 100 : 0;
    const profitMargin =
      grossRevenue > 0 ? (netListingProfit / grossRevenue) * 100 : 0;
    const conversionRate = views > 0 ? (orders / views) * 100 : 0;
    const revenuePerView = views > 0 ? grossRevenue / views : 0;
    const profitPerView = views > 0 ? netListingProfit / views : 0;
    const ordersPerListing = orders / listings;
    const viewsPerListing = views / listings;
    const profitPerListing = netListingProfit / listings;
    const breakEvenOrders =
      profitOrder > 0 ? Math.ceil(totalInvestment / profitOrder) : 0;
    const orderGap = orders - breakEvenOrders;
    const breakEvenViews =
      conversionRate > 0
        ? Math.ceil(breakEvenOrders / (conversionRate / 100))
        : 0;
    const promotedCostShare =
      grossRevenue > 0 ? (promotedCost / grossRevenue) * 100 : 0;
    const maintenanceCostShare =
      grossRevenue > 0 ? (maintenanceCost / grossRevenue) * 100 : 0;
    const refundLossShare =
      grossRevenue > 0 ? (refunds / grossRevenue) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "This eBay listing or listing group appears to generate workable return after entered costs.";
    let recommendation =
      "Review conversion, sold comps, ad spend, fulfillment time, and returns before deciding whether to scale, revise, or retire the listings.";

    if (netListingProfit <= 0) {
      status = "Losing Money";
      statusText =
        "This eBay listing or listing group may not cover promotion, listing, maintenance, and refund-related costs.";
      recommendation =
        "Reduce promotion cost, improve conversion, raise profit per order, lower refund losses, or retire weak listings.";
    } else if (roi < 50 || profitMargin < 10) {
      status = "Weak ROI";
      statusText =
        "This listing is profitable, but the return may be weak after entered costs.";
      recommendation =
        "Improve price, photos, item specifics, shipping, listing quality, or promoted listing efficiency before adding more spend.";
    } else if (roi >= 150 && profitMargin >= 20) {
      status = "Strong";
      statusText =
        "This listing or listing group appears to produce strong return after entered costs.";
      recommendation =
        "This may be a strong candidate for restocking, optimizing, promoting carefully, or expanding into similar products.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioRoi: number) => {
      if (scenarioProfit <= 0) return "Losing";
      if (scenarioRoi < 50) return "Weak";
      if (scenarioRoi >= 150) return "Strong";
      return "Healthy";
    };

    const adScenarios = [0, 25, 50, 100, 150].map((scenarioAdCost) => {
      const scenarioInvestment =
        scenarioAdCost + listingCost + maintenanceCost + refunds;
      const scenarioProfit = grossProfit - scenarioInvestment;
      const scenarioRoi =
        scenarioInvestment > 0
          ? (scenarioProfit / scenarioInvestment) * 100
          : 0;
      const scenarioMargin =
        grossRevenue > 0 ? (scenarioProfit / grossRevenue) * 100 : 0;

      return {
        adCost: scenarioAdCost,
        totalInvestment: scenarioInvestment,
        profit: scenarioProfit,
        roi: scenarioRoi,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioRoi),
      };
    });

    const orderScenarios = [25, 50, 75, 100, 150].map((scenarioOrders) => {
      const scenarioRevenue = scenarioOrders * revenuePerOrder;
      const scenarioGrossProfit = scenarioOrders * profitOrder;
      const scenarioProfit = scenarioGrossProfit - totalInvestment;
      const scenarioRoi =
        totalInvestment > 0 ? (scenarioProfit / totalInvestment) * 100 : 0;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        roi: scenarioRoi,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioRoi),
      };
    });

    const costBreakdown = [
      ["Promoted listing cost", promotedCost],
      ["Listing/store cost", listingCost],
      ["Maintenance time cost", maintenanceCost],
      ["Refund/return loss", refunds],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalInvestment > 0
          ? (Number(amount) / totalInvestment) * 100
          : 0,
      revenueShare:
        grossRevenue > 0 ? (Number(amount) / grossRevenue) * 100 : 0,
    }));

    return {
      views,
      orders,
      salePrice,
      buyerShipping,
      profitOrder,
      promotedCost,
      listingCost,
      hours,
      rate,
      refunds,
      listings,
      revenuePerOrder,
      grossRevenue,
      grossItemSales,
      grossProfit,
      maintenanceCost,
      totalInvestment,
      netListingProfit,
      roi,
      grossRoi,
      profitMargin,
      conversionRate,
      revenuePerView,
      profitPerView,
      ordersPerListing,
      viewsPerListing,
      profitPerListing,
      breakEvenOrders,
      orderGap,
      breakEvenViews,
      promotedCostShare,
      maintenanceCostShare,
      refundLossShare,
      status,
      statusText,
      recommendation,
      adScenarios,
      orderScenarios,
      costBreakdown,
    };
  }, [
    monthlyViews,
    monthlyOrders,
    averageSalePrice,
    shippingCharged,
    profitPerOrder,
    monthlyPromotedCost,
    monthlyListingCost,
    maintenanceHours,
    hourlyRate,
    refundLoss,
    activeListings,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const roiTone =
    result.netListingProfit <= 0
      ? "bad"
      : result.roi < 50
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Listing ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether an eBay listing or group of listings is worth
          keeping, promoting, restocking, improving, or retiring after profit,
          ad spend, listing costs, maintenance time, and refund losses.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">ROI inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter views, orders, profit per order, ad cost, listing cost,
            maintenance time, and refund loss to estimate return on listing
            investment.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Listing performance
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly listing views"
                  value={monthlyViews}
                  onChange={setMonthlyViews}
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
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Order value and profit
              </h3>

              <div className="space-y-4">
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
                  label="Profit per order"
                  prefix="$"
                  value={profitPerOrder}
                  onChange={setProfitPerOrder}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Investment and risk costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly promoted listing cost"
                  prefix="$"
                  value={monthlyPromotedCost}
                  onChange={setMonthlyPromotedCost}
                />

                <NumberInput
                  label="Monthly listing / store cost"
                  prefix="$"
                  value={monthlyListingCost}
                  onChange={setMonthlyListingCost}
                />

                <NumberInput
                  label="Maintenance time"
                  suffix="hr"
                  value={maintenanceHours}
                  onChange={setMaintenanceHours}
                />

                <NumberInput
                  label="Hourly time value"
                  prefix="$"
                  value={hourlyRate}
                  onChange={setHourlyRate}
                />

                <NumberInput
                  label="Refund / return loss"
                  prefix="$"
                  value={refundLoss}
                  onChange={setRefundLoss}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay listing performance,
            ad costs, promoted listing results, final value fees, refunds,
            returns, search visibility, buyer demand, and seller-specific costs
            may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay listing return on investment.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net listing profit"
              value={toMoney(result.netListingProfit)}
              helper="Gross listing profit minus promotion, listing, maintenance, and refund costs"
              tone={roiTone}
            />

            <MetricCard
              label="Listing ROI"
              value={percent(result.roi)}
              helper="Net listing profit divided by entered listing investment"
              tone={roiTone}
            />

            <MetricCard
              label="Gross listing profit"
              value={toMoney(result.grossProfit)}
              helper="Orders multiplied by profit per order before listing-level costs"
              tone="good"
            />

            <MetricCard
              label="Total investment"
              value={toMoney(result.totalInvestment)}
              helper="Promotion, listing, maintenance time, and refund loss"
              tone="warning"
            />

            <MetricCard
              label="Monthly revenue"
              value={toMoney(result.grossRevenue)}
              helper="Orders multiplied by average order revenue"
              tone="blue"
            />

            <MetricCard
              label="Gross item sales"
              value={toMoney(result.grossItemSales)}
              helper="Orders multiplied by average sale price before buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.profitMargin)}
              helper="Net listing profit divided by monthly revenue"
              tone={roiTone}
            />

            <MetricCard
              label="Conversion rate"
              value={percent(result.conversionRate)}
              helper="Orders divided by listing views"
              tone={result.conversionRate >= 2 ? "good" : "warning"}
            />

            <MetricCard
              label="Profit per view"
              value={toMoney(result.profitPerView)}
              helper="Net listing profit divided by listing views"
              tone={result.profitPerView > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Revenue per view"
              value={toMoney(result.revenuePerView)}
              helper="Monthly revenue divided by listing views"
              tone="blue"
            />

            <MetricCard
              label="Break-even orders"
              value={result.breakEvenOrders.toLocaleString()}
              helper="Orders needed to cover listing-level investment"
              tone="warning"
            />

            <MetricCard
              label="Order gap"
              value={result.orderGap.toFixed(0)}
              helper="Current orders minus break-even orders"
              tone={result.orderGap >= 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Views per listing"
              value={result.viewsPerListing.toFixed(0)}
              helper="Monthly views divided by active listings"
              tone="blue"
            />

            <MetricCard
              label="Orders per listing"
              value={result.ordersPerListing.toFixed(2)}
              helper="Monthly orders divided by active listings"
              tone={result.ordersPerListing > 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Profit per listing"
              value={toMoney(result.profitPerListing)}
              helper="Net listing profit divided by active listings"
              tone={result.profitPerListing > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Maintenance cost"
              value={toMoney(result.maintenanceCost)}
              helper="Maintenance hours multiplied by hourly time value"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your listings generated{" "}
                <strong>{toMoney(result.grossProfit)}</strong> in gross profit
                before listing-level costs. After promotion, listing,
                maintenance, and refund costs, estimated net listing profit is{" "}
                <strong>{toMoney(result.netListingProfit)}</strong>.
              </p>

              <p>
                Your estimated listing ROI is{" "}
                <strong>{percent(result.roi)}</strong>, with a profit margin of{" "}
                <strong>{percent(result.profitMargin)}</strong>.
              </p>

              <p>
                You need about{" "}
                <strong>{result.breakEvenOrders.toLocaleString()}</strong>{" "}
                orders to break even on the entered listing-level investment.
                Your current order gap is{" "}
                <strong>{result.orderGap.toFixed(0)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Promotion cost comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Promo cost</th>
                    <th className="px-4 py-3">Investment</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.adScenarios.map((row) => (
                    <tr
                      key={row.adCost}
                      className={
                        row.adCost === result.promotedCost
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{toMoney(row.adCost)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.totalInvestment)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
                      <td className="px-4 py-3">{percent(row.margin)}</td>
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
          How to use this eBay Listing ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter performance",
              "Add listing views, monthly orders, active listings, and average order value.",
            ],
            [
              "Add order profit",
              "Use profit per order after eBay fees, item cost, shipping, packaging, and other costs.",
            ],
            [
              "Include investment",
              "Add promoted listing cost, listing or store cost, maintenance time, and refund losses.",
            ],
            [
              "Choose action",
              "Use ROI to decide whether to keep, improve, promote, restock, or retire the listing.",
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
            eBay listing ROI breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which listing-level costs are reducing return on investment.
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
                  <p>{percent(item.share)} of investment</p>
                  <p>{percent(item.revenueShare)} of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay listing ROI mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging listings by sales volume instead of net profit after costs.",
              "Increasing promoted listing spend before checking whether ROI improves.",
              "Keeping listings active when they repeatedly lose money after returns or ad costs.",
              "Ignoring time spent revising listings, answering messages, or handling issues.",
              "Comparing revenue across listings without comparing margin and return on effort.",
              "Retiring listings too quickly without testing photos, title, item specifics, pricing, and shipping.",
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
            Understanding your eBay listing ROI results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The listing
              appears to generate strong return after entered listing-level
              costs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The listing
              appears workable under the current profit, cost, and performance
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Weak ROI:</strong> The listing
              is profitable, but the return may be too weak for more ad spend,
              inventory, or maintenance time.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              listing may not cover promotion, listing, maintenance, and
              refund-related costs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Listing revenue over the review period.",
              "Profit per order after eBay fees, item cost, shipping, and packaging.",
              "Promoted listing cost, listing fees, and store-related cost.",
              "Refunds, returns, cancellations, and damaged item losses.",
              "Time spent revising, supporting, restocking, or managing the listing.",
              "Views, orders, conversion rate, active listings, and sold comp pressure.",
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
          Ways to improve eBay listing ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve conversion",
              "Upgrade photos, title, item specifics, description, condition notes, and buyer trust signals.",
            ],
            [
              "Reduce ad waste",
              "Lower promoted listing cost on weak listings or focus spend on proven profitable listings.",
            ],
            [
              "Raise profit per order",
              "Improve sourcing, pricing, shipping, packaging, and offer strategy to increase contribution.",
            ],
            [
              "Retire weak listings",
              "Remove or revise listings that repeatedly lose money, require too much support, or tie up capital.",
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
            ["/ebay/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/ebay/promoted-listing-roi-calculator", "Promoted Listing ROI Calculator"],
            ["/ebay/profit-calculator", "Profit Calculator"],
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