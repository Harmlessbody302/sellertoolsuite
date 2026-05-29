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
  tone?: "neutral" | "good" | "blue" | "warning" | "bad";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    blue: "border-blue-200 bg-blue-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-gray-600">{helper}</p> : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Easy Pace"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Reachable"
        ? "bg-green-100 text-green-700"
        : status === "Aggressive"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Easy Pace"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Reachable"
        ? "bg-green-100 text-green-700"
        : status === "Aggressive"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsySalesGoalCalculatorPage() {
  const [monthlyProfitGoal, setMonthlyProfitGoal] = useState(1000);
  const [averageOrderValue, setAverageOrderValue] = useState(30);
  const [profitPerOrder, setProfitPerOrder] = useState(10);
  const [currentMonthlyOrders, setCurrentMonthlyOrders] = useState(60);
  const [currentMonthlyVisits, setCurrentMonthlyVisits] = useState(2000);

  const result = useMemo(() => {
    const ordersNeeded =
      profitPerOrder > 0 ? Math.ceil(monthlyProfitGoal / profitPerOrder) : 0;

    const revenueNeeded = ordersNeeded * averageOrderValue;
    const dailyOrdersNeeded = ordersNeeded / 30;
    const weeklyOrdersNeeded = ordersNeeded / 4.345;

    const currentConversionRate =
      currentMonthlyVisits > 0
        ? currentMonthlyOrders / currentMonthlyVisits
        : 0;

    const visitsNeeded =
      currentConversionRate > 0
        ? Math.ceil(ordersNeeded / currentConversionRate)
        : 0;

    const additionalOrdersNeeded = Math.max(
      0,
      ordersNeeded - currentMonthlyOrders,
    );

    const additionalVisitsNeeded = Math.max(
      0,
      visitsNeeded - currentMonthlyVisits,
    );

    const currentEstimatedProfit = currentMonthlyOrders * profitPerOrder;
    const profitGap = Math.max(0, monthlyProfitGoal - currentEstimatedProfit);
    const currentRevenue = currentMonthlyOrders * averageOrderValue;

    const orderGrowthNeeded =
      currentMonthlyOrders > 0
        ? ((ordersNeeded - currentMonthlyOrders) / currentMonthlyOrders) * 100
        : 0;

    let status = "Reachable";
    let statusText =
      "This monthly profit goal looks reachable with a manageable order target.";
    let recommendation =
      "Focus on increasing qualified traffic, protecting profit per order, and improving conversion rate.";

    if (dailyOrdersNeeded <= 2) {
      status = "Easy Pace";
      statusText =
        "This goal requires a relatively low daily order pace based on your inputs.";
      recommendation =
        "This goal may be achievable through consistent listing quality, steady traffic, and basic conversion improvements.";
    } else if (dailyOrdersNeeded > 10) {
      status = "Stretch Goal";
      statusText =
        "This goal requires a high daily order pace and may need major traffic, conversion, or pricing improvements.";
      recommendation =
        "Break this goal into smaller milestones and focus on increasing profit per order, listing conversion, and scalable traffic sources.";
    } else if (dailyOrdersNeeded > 5) {
      status = "Aggressive";
      statusText =
        "This goal is possible, but the required order pace is aggressive.";
      recommendation =
        "Prioritize your highest-converting listings, improve average order value, and avoid scaling low-margin traffic.";
    }

    const scenarios = [
      { label: "Lower goal", profitGoal: monthlyProfitGoal * 0.75 },
      { label: "Target goal", profitGoal: monthlyProfitGoal },
      { label: "Stretch goal", profitGoal: monthlyProfitGoal * 1.25 },
      { label: "Double goal", profitGoal: monthlyProfitGoal * 2 },
    ].map((scenario) => {
      const scenarioOrders =
        profitPerOrder > 0 ? Math.ceil(scenario.profitGoal / profitPerOrder) : 0;
      const scenarioRevenue = scenarioOrders * averageOrderValue;
      const scenarioDailyOrders = scenarioOrders / 30;

      const scenarioStatus =
        scenarioDailyOrders <= 2
          ? "Easy Pace"
          : scenarioDailyOrders <= 5
            ? "Reachable"
            : scenarioDailyOrders <= 10
              ? "Aggressive"
              : "Stretch Goal";

      return {
        ...scenario,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        dailyOrders: scenarioDailyOrders,
        status: scenarioStatus,
      };
    });

    return {
      ordersNeeded,
      revenueNeeded,
      dailyOrdersNeeded,
      weeklyOrdersNeeded,
      currentConversionRate,
      visitsNeeded,
      additionalOrdersNeeded,
      additionalVisitsNeeded,
      currentEstimatedProfit,
      currentRevenue,
      profitGap,
      orderGrowthNeeded,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlyProfitGoal,
    averageOrderValue,
    profitPerOrder,
    currentMonthlyOrders,
    currentMonthlyVisits,
  ]);

  const percent = (value: number) => `${(value * 100).toFixed(2)}%`;
  const percentWhole = (value: number) => `${value.toFixed(1)}%`;

  const resultTone =
    result.status === "Easy Pace" || result.status === "Reachable"
      ? "good"
      : result.status === "Aggressive"
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Sales Goal Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Work backward from a monthly profit goal to estimate the Etsy orders,
          revenue, daily pace, and traffic needed to reach your target.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Goal inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your target profit, average order value, profit per order, and
            current shop activity to estimate the sales pace needed.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Target goal
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly profit goal"
                  prefix="$"
                  value={monthlyProfitGoal}
                  onChange={setMonthlyProfitGoal}
                />

                <NumberInput
                  label="Average order value"
                  prefix="$"
                  value={averageOrderValue}
                  onChange={setAverageOrderValue}
                />

                <NumberInput
                  label="Average profit per order"
                  prefix="$"
                  value={profitPerOrder}
                  onChange={setProfitPerOrder}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Current activity
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Current monthly orders"
                  value={currentMonthlyOrders}
                  onChange={setCurrentMonthlyOrders}
                  step={1}
                />

                <NumberInput
                  label="Current monthly visits"
                  value={currentMonthlyVisits}
                  onChange={setCurrentMonthlyVisits}
                  step={1}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator provides estimates only. Actual sales goals may vary
            based on fees, refunds, discounts, ad spend, conversion rate,
            inventory, seasonality, and marketplace demand.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Sales goal requirements at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Orders needed per month"
              value={result.ordersNeeded.toLocaleString()}
              helper="Monthly orders required to hit profit goal"
              tone={resultTone}
            />

            <MetricCard
              label="Revenue needed per month"
              value={toMoney(result.revenueNeeded)}
              helper="Orders needed × average order value"
              tone="blue"
            />

            <MetricCard
              label="Average orders per day"
              value={result.dailyOrdersNeeded.toFixed(1)}
              helper="Monthly orders divided by 30"
              tone={resultTone}
            />

            <MetricCard
              label="Average orders per week"
              value={result.weeklyOrdersNeeded.toFixed(1)}
              helper="Monthly orders divided by average weeks"
              tone={resultTone}
            />

            <MetricCard
              label="Estimated visits needed"
              value={result.visitsNeeded.toLocaleString()}
              helper="Based on current conversion rate"
              tone="blue"
            />

            <MetricCard
              label="Current conversion rate"
              value={percent(result.currentConversionRate)}
              helper="Current orders divided by visits"
            />

            <MetricCard
              label="Additional orders needed"
              value={result.additionalOrdersNeeded.toLocaleString()}
              helper="Orders beyond current monthly pace"
              tone={result.additionalOrdersNeeded > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Profit gap"
              value={toMoney(result.profitGap)}
              helper="Remaining monthly profit needed"
              tone={result.profitGap > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Current estimated profit"
              value={toMoney(result.currentEstimatedProfit)}
              helper="Current monthly orders × profit per order"
              tone="good"
            />

            <MetricCard
              label="Order growth needed"
              value={percentWhole(result.orderGrowthNeeded)}
              helper="Growth from current monthly orders"
              tone={result.orderGrowthNeeded > 50 ? "warning" : "good"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                To reach your profit goal, you need about{" "}
                <strong>{result.ordersNeeded.toLocaleString()}</strong> orders
                per month, or about{" "}
                <strong>{result.dailyOrdersNeeded.toFixed(1)}</strong> orders
                per day.
              </p>

              <p>
                At your current conversion rate, that would require roughly{" "}
                <strong>{result.visitsNeeded.toLocaleString()}</strong> visits
                per month.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Sales goal scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Profit goal</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Daily pace</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Target goal" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.profitGoal)}</td>
                      <td className="px-4 py-3">
                        {row.orders.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">
                        {row.dailyOrders.toFixed(1)}
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
          How to use this Etsy Sales Goal Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Set profit target",
              "Enter the monthly profit goal you want your Etsy shop or product group to reach.",
            ],
            [
              "Add order economics",
              "Use average order value and profit per order from your actual shop numbers.",
            ],
            [
              "Enter current activity",
              "Add current monthly orders and visits to estimate the gap between now and your target.",
            ],
            [
              "Review required pace",
              "Use orders, revenue, traffic, and daily pace to judge whether the target is realistic.",
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
            Common sales goal mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Setting a revenue goal without checking profit per order.",
              "Ignoring conversion rate when estimating traffic needs.",
              "Assuming every listing can scale at the same pace.",
              "Forgetting refunds, discounts, ad spend, and inventory limits.",
              "Choosing a target without breaking it into daily and weekly sales requirements.",
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

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Understanding your results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-emerald-700">Easy Pace:</strong> The goal
              requires a relatively low daily order pace.
            </p>

            <p>
              <strong className="text-green-700">Reachable:</strong> The target
              appears realistic with steady traffic and conversion improvements.
            </p>

            <p>
              <strong className="text-amber-700">Aggressive:</strong> The goal
              may require stronger listings, better conversion, or more traffic.
            </p>

            <p>
              <strong className="text-red-700">Stretch Goal:</strong> The target
              likely needs major improvements in traffic, conversion, pricing,
              or product mix.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reach Etsy sales goals
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Increase profit per order",
              "Raise pricing, reduce costs, improve bundles, or protect margin from unnecessary discounts.",
            ],
            [
              "Improve conversion rate",
              "Upgrade photos, title clarity, reviews, pricing, shipping offer, and listing trust.",
            ],
            [
              "Increase qualified traffic",
              "Build search visibility, improve keywords, test ads carefully, and promote proven listings.",
            ],
            [
              "Expand winning products",
              "Add variations, bundles, complementary products, or seasonal versions of profitable listings.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/etsy/listing-roi-calculator", "Listing ROI Calculator"],
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