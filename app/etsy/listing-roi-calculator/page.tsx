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
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
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
      </div>

      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong ROI" || status === "Profitable"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Low ROI" || status === "Break Even"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsyListingROICalculator() {
  const [visits, setVisits] = useState("1000");
  const [orders, setOrders] = useState("25");
  const [averageOrderValue, setAverageOrderValue] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("12");
  const [listingFees, setListingFees] = useState("5");
  const [adSpend, setAdSpend] = useState("75");
  const [otherCosts, setOtherCosts] = useState("10");

  const result = useMemo(() => {
    const visitCount = Number(visits) || 0;
    const orderCount = Number(orders) || 0;
    const avgOrder = Number(averageOrderValue) || 0;
    const profit = Number(profitPerOrder) || 0;
    const fees = Number(listingFees) || 0;
    const ads = Number(adSpend) || 0;
    const other = Number(otherCosts) || 0;

    const revenue = orderCount * avgOrder;
    const grossProfit = orderCount * profit;
    const totalListingCosts = fees + ads + other;
    const netProfit = grossProfit - totalListingCosts;
    const conversionRate =
      visitCount > 0 ? (orderCount / visitCount) * 100 : 0;
    const profitPerVisit = visitCount > 0 ? netProfit / visitCount : 0;
    const roi =
      totalListingCosts > 0 ? (netProfit / totalListingCosts) * 100 : 0;
    const breakEvenOrders =
      profit > 0 ? Math.ceil(totalListingCosts / profit) : 0;

    let status = "Profitable";
    let statusText =
      "This listing appears profitable after listing costs, ad spend, and other listing-specific expenses.";
    let recommendation =
      "This listing may be worth keeping active and improving. Continue testing photos, keywords, pricing, and traffic sources.";

    if (netProfit < 0) {
      status = "Losing Money";
      statusText =
        "This listing is losing money after the entered costs.";
      recommendation =
        "Consider reducing ad spend, improving conversion, raising price, lowering costs, or retiring the listing if it does not improve.";
    } else if (netProfit === 0) {
      status = "Break Even";
      statusText =
        "This listing is roughly breaking even.";
      recommendation =
        "Improve pricing, conversion rate, or profit per order before investing more time or ad spend into this listing.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText =
        "This listing is profitable, but the return is relatively weak.";
      recommendation =
        "Optimize the listing before scaling traffic. Review photos, title, price, keywords, and ad targeting.";
    } else if (roi >= 100) {
      status = "Strong ROI";
      statusText =
        "This listing has a strong return on the entered listing costs.";
      recommendation =
        "This may be a good candidate for more traffic, additional variations, better photos, or expanded promotion.";
    }

    const scenarios = [
      { label: "Current", orders: orderCount },
      { label: "+10% orders", orders: Math.round(orderCount * 1.1) },
      { label: "+25% orders", orders: Math.round(orderCount * 1.25) },
      { label: "+50% orders", orders: Math.round(orderCount * 1.5) },
    ].map((scenario) => {
      const scenarioGrossProfit = scenario.orders * profit;
      const scenarioNetProfit = scenarioGrossProfit - totalListingCosts;
      const scenarioRoi =
        totalListingCosts > 0
          ? (scenarioNetProfit / totalListingCosts) * 100
          : 0;

      return {
        ...scenario,
        grossProfit: scenarioGrossProfit,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
      };
    });

    return {
      revenue,
      grossProfit,
      totalListingCosts,
      netProfit,
      conversionRate,
      profitPerVisit,
      roi,
      breakEvenOrders,
      status,
      statusText,
      recommendation,
      scenarios,
      visitCount,
      orderCount,
    };
  }, [
    visits,
    orders,
    averageOrderValue,
    profitPerOrder,
    listingFees,
    adSpend,
    otherCosts,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const resultTone =
    result.netProfit < 0
      ? "bad"
      : result.netProfit === 0 || result.roi < 25
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Listing ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether an Etsy listing is worth scaling, optimizing, or
          retiring based on traffic, orders, profit, and listing-specific costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Listing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Use traffic, orders, profit, and costs from the same time period so
            the ROI estimate stays consistent.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Traffic performance
              </h3>

              <div className="space-y-4">
                <Input
                  label="Listing visits"
                  value={visits}
                  onChange={setVisits}
                  helper="Use Etsy listing visits from the same period as your orders."
                />

                <Input
                  label="Orders from this listing"
                  value={orders}
                  onChange={setOrders}
                />

                <Input
                  label="Average order value"
                  value={averageOrderValue}
                  onChange={setAverageOrderValue}
                  prefix="$"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Profitability
              </h3>

              <div className="space-y-4">
                <Input
                  label="Profit per order"
                  value={profitPerOrder}
                  onChange={setProfitPerOrder}
                  prefix="$"
                  helper="Profit after product cost, shipping, packaging, marketplace fees, and payment processing."
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Listing costs
              </h3>

              <div className="space-y-4">
                <Input
                  label="Listing and renewal fees"
                  value={listingFees}
                  onChange={setListingFees}
                  prefix="$"
                />

                <Input
                  label="Ad spend"
                  value={adSpend}
                  onChange={setAdSpend}
                  prefix="$"
                />

                <Input
                  label="Other listing costs"
                  value={otherCosts}
                  onChange={setOtherCosts}
                  prefix="$"
                  helper="Photography, mockups, samples, promoted pins, or other listing-specific costs."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Etsy stats, ad attribution,
            refunds, discounts, repeat buyers, and listing changes can affect
            real listing performance.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Listing return on investment at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net listing profit"
              value={money(result.netProfit)}
              helper="Gross profit minus listing-specific costs"
              tone={resultTone}
            />

            <MetricCard
              label="Listing ROI"
              value={percent(result.roi)}
              helper="Net profit divided by listing costs"
              tone={resultTone}
            />

            <MetricCard
              label="Revenue"
              value={money(result.revenue)}
              helper="Orders × average order value"
              tone="blue"
            />

            <MetricCard
              label="Gross profit"
              value={money(result.grossProfit)}
              helper="Orders × profit per order"
              tone="good"
            />

            <MetricCard
              label="Total listing costs"
              value={money(result.totalListingCosts)}
              helper="Listing fees, ads, and other costs"
              tone="warning"
            />

            <MetricCard
              label="Conversion rate"
              value={percent(result.conversionRate)}
              helper="Orders divided by visits"
            />

            <MetricCard
              label="Profit per visit"
              value={money(result.profitPerVisit)}
              helper="Net listing profit divided by visits"
              tone={result.profitPerVisit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Break-even orders"
              value={result.breakEvenOrders.toLocaleString()}
              helper="Orders needed to cover listing costs"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This listing generated{" "}
                <strong>{result.orderCount.toLocaleString()}</strong> orders
                from <strong>{result.visitCount.toLocaleString()}</strong>{" "}
                visits, with estimated net profit of{" "}
                <strong>{money(result.netProfit)}</strong>.
              </p>

              <p>
                You need about{" "}
                <strong>{result.breakEvenOrders.toLocaleString()}</strong>{" "}
                orders to cover the listing-specific costs entered above.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Listing growth scenarios
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Gross profit</th>
                    <th className="px-4 py-3">Net profit</th>
                    <th className="px-4 py-3">ROI</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Current" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">
                        {row.orders.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {money(row.grossProfit)}
                      </td>
                      <td className="px-4 py-3">{money(row.netProfit)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
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
          How to use this Etsy Listing ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing traffic",
              "Use visits and orders from the same Etsy reporting period.",
            ],
            [
              "Add profit per order",
              "Use your estimated profit after product costs, shipping, packaging, and fees.",
            ],
            [
              "Enter listing costs",
              "Include listing fees, ad spend, samples, photography, mockups, and other listing-specific costs.",
            ],
            [
              "Review ROI",
              "Use net profit, ROI, and break-even orders to decide whether to scale or improve the listing.",
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
            Common listing ROI mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging a listing by revenue instead of net profit.",
              "Increasing ad spend before checking conversion rate and profit per visit.",
              "Ignoring photography, mockup, sample, or renewal costs.",
              "Keeping weak listings active without improving price, photos, or keywords.",
              "Comparing listings without using the same reporting period.",
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
              <strong className="text-emerald-700">Strong ROI:</strong> The
              listing may be worth scaling with more traffic or stronger
              optimization.
            </p>

            <p>
              <strong className="text-emerald-700">Profitable:</strong> The
              listing is making money, but may still benefit from improvements.
            </p>

            <p>
              <strong className="text-amber-700">Low ROI:</strong> The listing
              is profitable, but the return may be too weak to scale.
            </p>

            <p>
              <strong className="text-amber-700">Break Even:</strong> The
              listing is not losing money, but is not generating useful profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              listing needs improvement, lower costs, better pricing, or may need
              to be retired.
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
            ["/etsy/conversion-rate-calculator", "Conversion Rate Calculator"],
            ["/etsy/ad-roi-calculator", "Etsy Ad ROI Calculator"],
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
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