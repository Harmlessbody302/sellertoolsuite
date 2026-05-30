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
        : status === "Low Conversion"
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
        : status === "Low"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayConversionRateCalculatorPage() {
  const [listingViews, setListingViews] = useState(2500);
  const [orders, setOrders] = useState(65);
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [profitPerOrder, setProfitPerOrder] = useState(14.5);
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState(2000);
  const [activeListings, setActiveListings] = useState(100);
  const [promotedListingRate, setPromotedListingRate] = useState(2);
  const [returnRate, setReturnRate] = useState(3);

  const result = useMemo(() => {
    const views = Math.max(0, listingViews);
    const orderCount = Math.max(0, orders);
    const salePrice = Math.max(0, averageSalePrice);
    const buyerShipping = Math.max(0, shippingCharged);
    const profit = Math.max(0, profitPerOrder);
    const targetProfit = Math.max(0, targetMonthlyProfit);
    const listings = Math.max(1, activeListings);
    const promotedRate = Math.min(95, Math.max(0, promotedListingRate));
    const returns = Math.min(95, Math.max(0, returnRate));

    const conversionRate = views > 0 ? (orderCount / views) * 100 : 0;
    const revenuePerOrder = salePrice + buyerShipping;
    const monthlyRevenue = orderCount * revenuePerOrder;
    const monthlyGrossItemSales = orderCount * salePrice;
    const monthlyProfit = orderCount * profit;
    const ordersPerListing = orderCount / listings;
    const viewsPerListing = views / listings;
    const revenuePerView = views > 0 ? monthlyRevenue / views : 0;
    const profitPerView = views > 0 ? monthlyProfit / views : 0;
    const promotedCostEstimate = monthlyRevenue * (promotedRate / 100);
    const estimatedReturns = orderCount * (returns / 100);
    const profitAfterReturnAllowance =
      monthlyProfit - estimatedReturns * profit;

    const ordersNeededForGoal =
      profit > 0 ? Math.ceil(targetProfit / profit) : 0;
    const viewsNeededForGoal =
      conversionRate > 0
        ? Math.ceil(ordersNeededForGoal / (conversionRate / 100))
        : 0;
    const extraOrdersNeeded = Math.max(0, ordersNeededForGoal - orderCount);
    const extraViewsNeeded = Math.max(0, viewsNeededForGoal - views);
    const targetRevenue = ordersNeededForGoal * revenuePerOrder;

    const requiredConversionAtCurrentViews =
      views > 0 ? (ordersNeededForGoal / views) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "This eBay conversion rate appears workable under the current assumptions.";
    let recommendation =
      "Compare conversion rate against listing quality, price competitiveness, shipping options, traffic source, and sold comps.";

    if (views <= 0 || conversionRate <= 0) {
      status = "No Sales";
      statusText =
        "This listing traffic is not converting into orders under the current inputs.";
      recommendation =
        "Review price, photos, title, item specifics, shipping, sold comps, trust signals, and traffic quality before increasing promotion.";
    } else if (conversionRate < 1.5) {
      status = "Low Conversion";
      statusText =
        "This eBay conversion rate is low and may require listing or pricing improvements.";
      recommendation =
        "Improve photos, title, item specifics, price, shipping terms, promoted listing targeting, or buyer trust before scaling traffic.";
    } else if (conversionRate >= 4) {
      status = "Strong";
      statusText =
        "This eBay conversion rate is strong under the current inputs.";
      recommendation =
        "This listing or group of listings may be worth restocking, promoting carefully, or expanding if profit and fulfillment capacity support it.";
    }

    const getScenarioStatus = (scenarioConversion: number) => {
      if (scenarioConversion <= 0) return "No Sales";
      if (scenarioConversion < 1.5) return "Low";
      if (scenarioConversion >= 4) return "Strong";
      return "Healthy";
    };

    const conversionScenarios = [1, 1.5, 2.5, 4, 6].map((scenarioRate) => {
      const scenarioOrders = Math.floor(views * (scenarioRate / 100));
      const scenarioRevenue = scenarioOrders * revenuePerOrder;
      const scenarioProfit = scenarioOrders * profit;
      const scenarioViewsNeeded =
        scenarioRate > 0
          ? Math.ceil(ordersNeededForGoal / (scenarioRate / 100))
          : 0;

      return {
        conversionRate: scenarioRate,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        viewsNeeded: scenarioViewsNeeded,
        status: getScenarioStatus(scenarioRate),
      };
    });

    const trafficScenarios = [500, 1000, 2500, 5000, 10000].map(
      (scenarioViews) => {
        const scenarioOrders = Math.floor(
          scenarioViews * (conversionRate / 100),
        );
        const scenarioRevenue = scenarioOrders * revenuePerOrder;
        const scenarioProfit = scenarioOrders * profit;

        return {
          views: scenarioViews,
          orders: scenarioOrders,
          revenue: scenarioRevenue,
          profit: scenarioProfit,
          status: getScenarioStatus(conversionRate),
        };
      },
    );

    const performanceBreakdown = [
      ["Listing views", views],
      ["Orders", orderCount],
      ["Active listings", listings],
      ["Estimated returns", estimatedReturns],
      ["Promoted cost estimate", promotedCostEstimate],
    ];

    return {
      views,
      orderCount,
      salePrice,
      buyerShipping,
      profit,
      targetProfit,
      listings,
      promotedRate,
      returns,
      conversionRate,
      revenuePerOrder,
      monthlyRevenue,
      monthlyGrossItemSales,
      monthlyProfit,
      ordersPerListing,
      viewsPerListing,
      revenuePerView,
      profitPerView,
      promotedCostEstimate,
      estimatedReturns,
      profitAfterReturnAllowance,
      ordersNeededForGoal,
      viewsNeededForGoal,
      extraOrdersNeeded,
      extraViewsNeeded,
      targetRevenue,
      requiredConversionAtCurrentViews,
      status,
      statusText,
      recommendation,
      conversionScenarios,
      trafficScenarios,
      performanceBreakdown,
    };
  }, [
    listingViews,
    orders,
    averageSalePrice,
    shippingCharged,
    profitPerOrder,
    targetMonthlyProfit,
    activeListings,
    promotedListingRate,
    returnRate,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const conversionTone =
    result.conversionRate <= 0
      ? "bad"
      : result.conversionRate < 1.5
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Conversion Rate Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate eBay listing conversion rate, order volume, revenue, profit
          per view, and the traffic needed to reach a target monthly profit goal.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Conversion inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter listing views, orders, average sale value, profit per order,
            target profit, active listing count, and promotion assumptions to
            estimate conversion performance.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Listing performance
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly listing views"
                  value={listingViews}
                  onChange={setListingViews}
                />

                <NumberInput
                  label="Monthly orders"
                  value={orders}
                  onChange={setOrders}
                />

                <NumberInput
                  label="Active listings"
                  value={activeListings}
                  onChange={setActiveListings}
                />

                <NumberInput
                  label="Target monthly profit"
                  prefix="$"
                  value={targetMonthlyProfit}
                  onChange={setTargetMonthlyProfit}
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
                Risk and promotion assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedListingRate}
                  onChange={setPromotedListingRate}
                />

                <NumberInput
                  label="Return rate"
                  suffix="%"
                  value={returnRate}
                  onChange={setReturnRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay conversion rates,
            traffic quality, search visibility, buyer demand, promoted listing
            impact, returns, fees, and seller-specific results may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay conversion performance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Conversion rate"
              value={percent(result.conversionRate)}
              helper="Orders divided by listing views"
              tone={conversionTone}
            />

            <MetricCard
              label="Monthly orders"
              value={result.orderCount.toLocaleString()}
              helper="Entered order count for the review period"
              tone={result.orderCount > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Monthly revenue"
              value={toMoney(result.monthlyRevenue)}
              helper="Orders multiplied by average order revenue"
              tone="blue"
            />

            <MetricCard
              label="Monthly profit"
              value={toMoney(result.monthlyProfit)}
              helper="Orders multiplied by estimated profit per order"
              tone={result.monthlyProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Profit per view"
              value={toMoney(result.profitPerView)}
              helper="Monthly profit divided by listing views"
              tone={result.profitPerView > 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Revenue per view"
              value={toMoney(result.revenuePerView)}
              helper="Monthly revenue divided by listing views"
              tone="blue"
            />

            <MetricCard
              label="Orders per listing"
              value={result.ordersPerListing.toFixed(2)}
              helper="Monthly orders divided by active listings"
              tone={result.ordersPerListing > 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Views per listing"
              value={result.viewsPerListing.toFixed(0)}
              helper="Monthly views divided by active listings"
              tone="blue"
            />

            <MetricCard
              label="Orders needed for goal"
              value={result.ordersNeededForGoal.toLocaleString()}
              helper="Orders needed to reach target monthly profit"
              tone={result.ordersNeededForGoal <= result.orderCount ? "good" : "warning"}
            />

            <MetricCard
              label="Views needed for goal"
              value={result.viewsNeededForGoal.toLocaleString()}
              helper="Estimated views needed at current conversion rate"
              tone={result.viewsNeededForGoal <= result.views ? "good" : "warning"}
            />

            <MetricCard
              label="Extra orders needed"
              value={result.extraOrdersNeeded.toLocaleString()}
              helper="Additional monthly orders needed to reach target profit"
              tone={result.extraOrdersNeeded === 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Extra views needed"
              value={result.extraViewsNeeded.toLocaleString()}
              helper="Additional monthly views needed to reach target profit"
              tone={result.extraViewsNeeded === 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Required conversion"
              value={percent(result.requiredConversionAtCurrentViews)}
              helper="Conversion needed to hit goal with current views"
              tone={
                result.requiredConversionAtCurrentViews <= result.conversionRate
                  ? "good"
                  : "warning"
              }
            />

            <MetricCard
              label="Profit after return allowance"
              value={toMoney(result.profitAfterReturnAllowance)}
              helper="Monthly profit minus estimated returned-order profit loss"
              tone={result.profitAfterReturnAllowance > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Promoted cost estimate"
              value={toMoney(result.promotedCostEstimate)}
              helper="Estimated promoted listing cost based on monthly revenue"
              tone="warning"
            />

            <MetricCard
              label="Estimated returns"
              value={result.estimatedReturns.toFixed(1)}
              helper="Estimated returned orders based on entered return rate"
              tone={result.estimatedReturns < result.orderCount * 0.1 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your entered listings received{" "}
                <strong>{result.views.toLocaleString()}</strong> views and{" "}
                <strong>{result.orderCount.toLocaleString()}</strong> orders,
                producing an estimated conversion rate of{" "}
                <strong>{percent(result.conversionRate)}</strong>.
              </p>

              <p>
                At <strong>{toMoney(result.profit)}</strong> profit per order,
                estimated monthly profit is{" "}
                <strong>{toMoney(result.monthlyProfit)}</strong>. To reach{" "}
                <strong>{toMoney(result.targetProfit)}</strong>, you would need
                about{" "}
                <strong>{result.ordersNeededForGoal.toLocaleString()}</strong>{" "}
                orders and{" "}
                <strong>{result.viewsNeededForGoal.toLocaleString()}</strong>{" "}
                views at the current conversion rate.
              </p>

              <p>
                With <strong>{result.listings.toLocaleString()}</strong> active
                listings, this equals about{" "}
                <strong>{result.viewsPerListing.toFixed(0)}</strong> views and{" "}
                <strong>{result.ordersPerListing.toFixed(2)}</strong> orders per
                listing per month.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Conversion scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Conversion</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Goal views</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.conversionScenarios.map((row) => (
                    <tr
                      key={row.conversionRate}
                      className={
                        row.conversionRate.toFixed(1) ===
                        result.conversionRate.toFixed(1)
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">
                        {percent(row.conversionRate)}
                      </td>
                      <td className="px-4 py-3">
                        {row.orders.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">
                        {row.viewsNeeded.toLocaleString()}
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
          How to use this eBay Conversion Rate Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter views",
              "Add monthly listing views or impressions from your eBay performance data.",
            ],
            [
              "Enter orders",
              "Add the number of orders generated by the listing or group of listings.",
            ],
            [
              "Add profit",
              "Use estimated profit per order so conversion results connect to actual earnings.",
            ],
            [
              "Review goal gap",
              "Compare current views and orders against the traffic needed to reach your monthly profit goal.",
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
            eBay conversion performance breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how views, orders, listings, returns, and promoted costs
            affect conversion performance.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Listing views", result.views.toLocaleString()],
              ["Orders", result.orderCount.toLocaleString()],
              ["Conversion rate", percent(result.conversionRate)],
              ["Revenue per view", toMoney(result.revenuePerView)],
              ["Profit per view", toMoney(result.profitPerView)],
              ["Views per listing", result.viewsPerListing.toFixed(0)],
              ["Orders per listing", result.ordersPerListing.toFixed(2)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="text-sm font-bold text-gray-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay conversion mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging listings by views alone without checking orders or profit.",
              "Increasing promoted listing rate before improving photos, price, title, and item specifics.",
              "Assuming more traffic will fix listings with weak buyer demand or poor pricing.",
              "Ignoring shipping cost, return risk, and seller trust factors that reduce conversion.",
              "Comparing conversion rates across unrelated categories or price ranges.",
              "Changing too many listing elements at once without tracking what improved performance.",
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
            Understanding your eBay conversion results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Your listings
              appear to turn traffic into orders efficiently under the current
              inputs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Your
              conversion rate appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Low Conversion:</strong> Your
              listings may need better photos, title, item specifics, pricing,
              shipping, or buyer trust signals.
            </p>

            <p>
              <strong className="text-red-700">No Sales:</strong> The entered
              traffic is not producing orders under the current inputs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Listing views or impressions during a clear review period.",
              "Orders generated during the same period.",
              "Average sale price, shipping charged, and profit per order.",
              "Active listing count and views per listing.",
              "Promoted listing rate, traffic source, and ad pressure.",
              "Return rate, category demand, price competitiveness, and sold comps.",
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
          Ways to improve eBay conversion
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve photos",
              "Use clear main photos, accurate condition details, measurements, and useful secondary images.",
            ],
            [
              "Improve item specifics",
              "Complete relevant item specifics so buyers and eBay search understand the listing better.",
            ],
            [
              "Review pricing",
              "Compare against realistic sold comps instead of only active listing prices.",
            ],
            [
              "Improve shipping offer",
              "Use competitive handling time, shipping price, delivery speed, and return expectations.",
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
            ["/ebay/sales-goal-calculator", "Sales Goal Calculator"],
            ["/ebay/listing-roi-calculator", "Listing ROI Calculator"],
            ["/ebay/promoted-listing-roi-calculator", "Promoted Listing ROI Calculator"],
            ["/ebay/profit-calculator", "Profit Calculator"],
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