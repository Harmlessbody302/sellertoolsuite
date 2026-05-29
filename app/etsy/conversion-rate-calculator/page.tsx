"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border border-gray-400 bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix ? (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 text-gray-950 outline-none"
        />

        {suffix ? (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {suffix}
          </span>
        ) : null}
      </div>

      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Good"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Needs work"
        ? "bg-amber-100 text-amber-700"
        : status === "Low"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Good"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Needs work"
        ? "bg-amber-100 text-amber-700"
        : status === "Low"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsyConversionRateCalculator() {
  const [visits, setVisits] = useState("1000");
  const [orders, setOrders] = useState("25");
  const [averageOrderValue, setAverageOrderValue] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("12");
  const [targetOrders, setTargetOrders] = useState("50");

  const result = useMemo(() => {
    const visitCount = Number(visits) || 0;
    const orderCount = Number(orders) || 0;
    const avgOrderValue = Number(averageOrderValue) || 0;
    const profit = Number(profitPerOrder) || 0;
    const targetOrderCount = Number(targetOrders) || 0;

    const conversionRate =
      visitCount > 0 ? (orderCount / visitCount) * 100 : 0;

    const revenue = orderCount * avgOrderValue;
    const estimatedProfit = orderCount * profit;
    const revenuePerVisit = visitCount > 0 ? revenue / visitCount : 0;
    const profitPerVisit = visitCount > 0 ? estimatedProfit / visitCount : 0;

    const visitsNeededForTarget =
      conversionRate > 0
        ? Math.ceil(targetOrderCount / (conversionRate / 100))
        : 0;

    const additionalVisitsNeeded = Math.max(
      0,
      visitsNeededForTarget - visitCount,
    );

    const extraOrdersNeeded = Math.max(0, targetOrderCount - orderCount);
    const targetRevenue = targetOrderCount * avgOrderValue;
    const targetProfit = targetOrderCount * profit;

    let status = "Strong";
    let statusText =
      "Your conversion rate looks strong. Your listing is turning traffic into orders well.";
    let recommendation =
      "This is a strong base to build on. You can usually focus on getting more qualified traffic while continuing to test photos, titles, pricing, and offers.";

    if (conversionRate <= 0) {
      status = "No sales yet";
      statusText =
        "You do not have any orders yet, so the listing has not proven conversion performance.";
      recommendation =
        "Focus first on improving photos, title clarity, price, offer strength, shipping details, and listing trust before pushing more traffic.";
    } else if (conversionRate < 1) {
      status = "Low";
      statusText =
        "Your conversion rate is low. The listing may be getting traffic without convincing enough shoppers to buy.";
      recommendation =
        "Before increasing ads or promotion, improve the listing photos, title, description, price, reviews, shipping offer, and keyword match.";
    } else if (conversionRate < 2) {
      status = "Needs work";
      statusText =
        "Your conversion rate is usable, but there is still meaningful room to improve before scaling traffic.";
      recommendation =
        "This listing may benefit from better main photos, clearer benefits, stronger pricing, and improved search intent alignment.";
    } else if (conversionRate < 4) {
      status = "Good";
      statusText =
        "Your conversion rate is healthy. More targeted traffic could reasonably turn into more orders.";
      recommendation =
        "This listing is a decent candidate for more traffic, but continue testing photos, pricing, and keywords to improve profitability.";
    }

    const comparisonRates = [1, 2, 3, 4, 5].map((rate) => {
      const estimatedOrders = Math.floor(visitCount * (rate / 100));
      const estimatedRevenue = estimatedOrders * avgOrderValue;
      const estimatedProfitAtRate = estimatedOrders * profit;

      let rowStatus = "Strong";
      if (rate < 1) rowStatus = "Low";
      else if (rate < 2) rowStatus = "Needs work";
      else if (rate < 4) rowStatus = "Good";

      return {
        rate,
        estimatedOrders,
        estimatedRevenue,
        estimatedProfit: estimatedProfitAtRate,
        status: rowStatus,
      };
    });

    return {
      conversionRate,
      revenue,
      estimatedProfit,
      revenuePerVisit,
      profitPerVisit,
      visitsNeededForTarget,
      additionalVisitsNeeded,
      extraOrdersNeeded,
      targetRevenue,
      targetProfit,
      status,
      statusText,
      recommendation,
      comparisonRates,
      visitCount,
      orderCount,
      targetOrderCount,
    };
  }, [visits, orders, averageOrderValue, profitPerOrder, targetOrders]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(2)}%`;

  const conversionTone =
    result.conversionRate <= 0
      ? "bad"
      : result.conversionRate < 1
        ? "bad"
        : result.conversionRate < 2
          ? "warning"
          : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Conversion Rate Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate your Etsy conversion rate, estimate revenue and profit from
          traffic, and see how many visits you may need to reach your order
          goals.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Listing inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Use visits and orders from the same time period. You can use this
            for one listing, a group of listings, or your whole Etsy shop.
          </p>

          <div className="mt-6 space-y-4">
            <Input
              label="Listing visits"
              value={visits}
              onChange={setVisits}
              helper="Use visits from Etsy stats for the period you are reviewing."
            />

            <Input
              label="Orders"
              value={orders}
              onChange={setOrders}
              helper="Use orders from the same period as your visits."
            />

            <Input
              label="Average order value"
              value={averageOrderValue}
              onChange={setAverageOrderValue}
              prefix="$"
              helper="Average revenue per order before subtracting costs."
            />

            <Input
              label="Profit per order"
              value={profitPerOrder}
              onChange={setProfitPerOrder}
              prefix="$"
              helper="Estimated profit after costs, fees, shipping, and ads."
            />

            <Input
              label="Target orders"
              value={targetOrders}
              onChange={setTargetOrders}
              helper="Enter the number of orders you want to reach."
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Etsy stats, attribution, repeat
            customers, refunds, ad traffic, discounts, and listing changes can
            affect your real conversion performance.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Your Etsy conversion performance at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Conversion rate"
              value={percent(result.conversionRate)}
              helper="Orders divided by visits"
              tone={conversionTone}
            />

            <MetricCard
              label="Estimated revenue"
              value={money(result.revenue)}
              helper="Orders × average order value"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={money(result.estimatedProfit)}
              helper="Orders × profit per order"
              tone={result.estimatedProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Revenue per visit"
              value={money(result.revenuePerVisit)}
              helper="Estimated revenue divided by visits"
            />

            <MetricCard
              label="Profit per visit"
              value={money(result.profitPerVisit)}
              helper="Estimated profit divided by visits"
              tone={result.profitPerVisit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Visits needed for target"
              value={result.visitsNeededForTarget.toLocaleString()}
              helper="Estimated visits needed at current conversion rate"
              tone="warning"
            />

            <MetricCard
              label="Additional visits needed"
              value={result.additionalVisitsNeeded.toLocaleString()}
              helper="Extra visits beyond the current traffic level"
              tone={result.additionalVisitsNeeded > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Extra orders needed"
              value={result.extraOrdersNeeded.toLocaleString()}
              helper="Orders still needed to hit your target"
              tone={result.extraOrdersNeeded > 0 ? "blue" : "good"}
            />

            <MetricCard
              label="Target revenue"
              value={money(result.targetRevenue)}
              helper="Target orders × average order value"
              tone="blue"
            />

            <MetricCard
              label="Target profit"
              value={money(result.targetProfit)}
              helper="Target orders × profit per order"
              tone="good"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At your current conversion rate, you would need about{" "}
                <strong>{result.visitsNeededForTarget.toLocaleString()}</strong>{" "}
                visits to reach{" "}
                <strong>{result.targetOrderCount.toLocaleString()}</strong>{" "}
                orders.
              </p>

              <p>
                That is approximately{" "}
                <strong>
                  {result.additionalVisitsNeeded.toLocaleString()} additional
                  visits
                </strong>{" "}
                beyond your current traffic level.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Conversion comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Rate</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.comparisonRates.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        Math.round(result.conversionRate) === row.rate
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">
                        {row.estimatedOrders.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {money(row.estimatedRevenue)}
                      </td>
                      <td className="px-4 py-3">
                        {money(row.estimatedProfit)}
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
          How to use this Etsy Conversion Rate Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter visits",
              "Use the number of visits from Etsy stats for the listing, product group, or shop you are reviewing.",
            ],
            [
              "Enter orders",
              "Use the number of orders from the same period as your visit count.",
            ],
            [
              "Add order value",
              "Enter your average order value so the calculator can estimate revenue from current traffic.",
            ],
            [
              "Add profit and target",
              "Use estimated profit per order and your target order count to estimate traffic needed.",
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
            Common conversion rate mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Comparing visits and orders from different reporting periods.",
              "Sending more traffic to a weak listing before improving photos, price, and offer clarity.",
              "Judging a listing by revenue without checking profit per visit.",
              "Ignoring search intent, keywords, shipping expectations, and product photos.",
              "Assuming more traffic will fix a listing that is not converting.",
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
              <strong className="text-emerald-700">Good / Strong:</strong> Your
              listing is turning traffic into orders at a healthy rate.
            </p>

            <p>
              <strong className="text-amber-700">Needs work:</strong> The
              listing is converting, but you may want to improve it before
              increasing traffic.
            </p>

            <p>
              <strong className="text-red-700">Low / No sales yet:</strong> The
              listing may need stronger photos, pricing, keywords, reviews,
              shipping offer, or product-market fit.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/ad-roi-calculator", "Etsy Ad ROI Calculator"],
            ["/etsy/listing-fee-calculator", "Etsy Listing Fee Calculator"],
            ["/etsy/break-even-calculator", "Etsy Break-Even Calculator"],
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