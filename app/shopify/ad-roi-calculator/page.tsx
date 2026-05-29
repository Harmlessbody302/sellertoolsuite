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
        : status === "Low ROI"
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
        : status === "Low ROI"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function ShopifyAdROICalculatorPage() {
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(500);
  const [ordersFromAds, setOrdersFromAds] = useState(35);
  const [averageOrderValue, setAverageOrderValue] = useState(45);
  const [profitPerOrderBeforeAds, setProfitPerOrderBeforeAds] = useState(18);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [clickCost, setClickCost] = useState(0.75);

  const result = useMemo(() => {
    const revenue = ordersFromAds * averageOrderValue;
    const grossProfit = ordersFromAds * profitPerOrderBeforeAds;
    const netProfit = grossProfit - monthlyAdSpend;

    const roas = monthlyAdSpend > 0 ? revenue / monthlyAdSpend : 0;
    const roi =
      monthlyAdSpend > 0 ? (netProfit / monthlyAdSpend) * 100 : 0;

    const costPerOrder =
      ordersFromAds > 0 ? monthlyAdSpend / ordersFromAds : 0;

    const breakEvenOrders =
      profitPerOrderBeforeAds > 0
        ? Math.ceil(monthlyAdSpend / profitPerOrderBeforeAds)
        : 0;

    const breakEvenCpc =
      conversionRate > 0
        ? profitPerOrderBeforeAds * (conversionRate / 100)
        : 0;

    const estimatedClicks =
      clickCost > 0 ? monthlyAdSpend / clickCost : 0;

    const estimatedOrdersFromClicks =
      estimatedClicks * (conversionRate / 100);

    const orderGap = ordersFromAds - breakEvenOrders;

    const maxBreakEvenAdSpend = Math.max(0, grossProfit);

    const cpcGap = breakEvenCpc - clickCost;

    let status = "Healthy";
    let statusText =
      "Your Shopify ads appear profitable based on the ad spend and order assumptions entered.";
    let recommendation =
      "This ad campaign looks workable. Keep monitoring cost per order, conversion rate, and profit per order.";

    if (netProfit <= 0) {
      status = "Losing Money";
      statusText = "Your Shopify ads appear to be losing money after ad spend.";
      recommendation =
        "Reduce ad spend, improve conversion rate, raise average order value, or increase profit per order before scaling.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText = "Your Shopify ads are profitable, but the return is weak.";
      recommendation =
        "Consider testing better creatives, landing pages, offers, or targeting before increasing spend.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "Your Shopify ads appear to be generating strong return after ad spend.";
      recommendation =
        "This campaign may be worth scaling carefully while monitoring whether performance holds at higher spend.";
    }

    const getScenarioStatus = (scenarioNetProfit: number, scenarioRoi: number) => {
      if (scenarioNetProfit <= 0) return "Losing Money";
      if (scenarioRoi < 25) return "Low ROI";
      if (scenarioRoi >= 100) return "Strong";
      return "Healthy";
    };

    const scenarios = [0.75, 1, 1.25, 1.5].map((multiplier) => {
      const scenarioSpend = monthlyAdSpend * multiplier;
      const scenarioOrders = ordersFromAds * multiplier;
      const scenarioRevenue = scenarioOrders * averageOrderValue;
      const scenarioGrossProfit =
        scenarioOrders * profitPerOrderBeforeAds;
      const scenarioNetProfit = scenarioGrossProfit - scenarioSpend;
      const scenarioRoi =
        scenarioSpend > 0 ? (scenarioNetProfit / scenarioSpend) * 100 : 0;
      const scenarioRoas =
        scenarioSpend > 0 ? scenarioRevenue / scenarioSpend : 0;
      const scenarioCostPerOrder =
        scenarioOrders > 0 ? scenarioSpend / scenarioOrders : 0;

      return {
        label:
          multiplier === 1
            ? "Current"
            : `${Math.round(multiplier * 100)}% spend`,
        spend: scenarioSpend,
        orders: scenarioOrders,
        revenue: scenarioRevenue,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
        roas: scenarioRoas,
        costPerOrder: scenarioCostPerOrder,
        status: getScenarioStatus(scenarioNetProfit, scenarioRoi),
      };
    });

    return {
      revenue,
      grossProfit,
      netProfit,
      roas,
      roi,
      costPerOrder,
      breakEvenOrders,
      breakEvenCpc,
      estimatedClicks,
      estimatedOrdersFromClicks,
      orderGap,
      maxBreakEvenAdSpend,
      cpcGap,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlyAdSpend,
    ordersFromAds,
    averageOrderValue,
    profitPerOrderBeforeAds,
    conversionRate,
    clickCost,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;
  const number = (value: number) =>
    value.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });

  const roiTone =
    result.netProfit <= 0
      ? "bad"
      : result.roi < 25
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Ad ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether your Shopify ads are generating profitable orders
          after ad spend, cost per order, ROAS, campaign ROI, conversion rate,
          and average click cost.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Ad inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter monthly ad spend, orders from ads, average order value, profit
            per order, conversion rate, and average click cost to estimate ad
            profitability.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Campaign performance
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly ad spend"
                  prefix="$"
                  value={monthlyAdSpend}
                  onChange={setMonthlyAdSpend}
                />

                <NumberInput
                  label="Orders from ads"
                  value={ordersFromAds}
                  onChange={setOrdersFromAds}
                />

                <NumberInput
                  label="Average order value"
                  prefix="$"
                  value={averageOrderValue}
                  onChange={setAverageOrderValue}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Profit and traffic assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Profit per order before ads"
                  prefix="$"
                  value={profitPerOrderBeforeAds}
                  onChange={setProfitPerOrderBeforeAds}
                />

                <NumberInput
                  label="Conversion rate"
                  suffix="%"
                  value={conversionRate}
                  onChange={setConversionRate}
                />

                <NumberInput
                  label="Average click cost"
                  prefix="$"
                  value={clickCost}
                  onChange={setClickCost}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify ad results can vary
            based on attribution, creative quality, traffic source, landing page
            conversion, refunds, payment fees, shipping cost, and customer
            acquisition behavior.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Shopify ad profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net ad profit"
              value={toMoney(result.netProfit)}
              helper="Gross profit from ad orders minus ad spend"
              tone={roiTone}
            />

            <MetricCard
              label="Ad ROI"
              value={percent(result.roi)}
              helper="Net ad profit divided by ad spend"
              tone={roiTone}
            />

            <MetricCard
              label="ROAS"
              value={`${result.roas.toFixed(2)}x`}
              helper="Revenue from ads divided by ad spend"
              tone="blue"
            />

            <MetricCard
              label="Cost per order"
              value={toMoney(result.costPerOrder)}
              helper="Ad spend divided by orders from ads"
              tone="warning"
            />

            <MetricCard
              label="Revenue from ads"
              value={toMoney(result.revenue)}
              helper="Orders from ads multiplied by average order value"
              tone="blue"
            />

            <MetricCard
              label="Gross profit before ads"
              value={toMoney(result.grossProfit)}
              helper="Orders multiplied by profit per order before ads"
              tone="good"
            />

            <MetricCard
              label="Break-even orders"
              value={`${result.breakEvenOrders} orders`}
              helper="Orders needed to cover ad spend"
              tone="warning"
            />

            <MetricCard
              label="Order gap"
              value={`${number(result.orderGap)} orders`}
              helper="Current ad orders minus break-even orders"
              tone={result.orderGap >= 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Break-even CPC"
              value={toMoney(result.breakEvenCpc)}
              helper="Maximum CPC based on profit per order and conversion rate"
              tone={result.cpcGap >= 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Estimated clicks"
              value={`${number(result.estimatedClicks)} clicks`}
              helper="Ad spend divided by average click cost"
            />

            <MetricCard
              label="Estimated orders from clicks"
              value={`${number(result.estimatedOrdersFromClicks)} orders`}
              helper="Estimated clicks multiplied by conversion rate"
            />

            <MetricCard
              label="Max break-even ad spend"
              value={toMoney(result.maxBreakEvenAdSpend)}
              helper="Ad spend level where campaign profit reaches zero"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your ads generated an estimated{" "}
                <strong>{toMoney(result.revenue)}</strong> in revenue and{" "}
                <strong>{toMoney(result.grossProfit)}</strong> in gross profit
                before ad spend.
              </p>

              <p>
                After ad spend, estimated campaign profit is{" "}
                <strong>{toMoney(result.netProfit)}</strong> with an ad ROI of{" "}
                <strong>{percent(result.roi)}</strong> and ROAS of{" "}
                <strong>{result.roas.toFixed(2)}x</strong>.
              </p>

              <p>
                Break-even CPC is approximately{" "}
                <strong>{toMoney(result.breakEvenCpc)}</strong>. Your current
                average click cost is{" "}
                <strong>
                  {result.cpcGap >= 0 ? "below" : "above"}
                </strong>{" "}
                that break-even level by{" "}
                <strong>{toMoney(Math.abs(result.cpcGap))}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Ad spend comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Spend</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Net profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">ROAS</th>
                    <th className="px-4 py-3">Status</th>
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
                      <td className="px-4 py-3">{toMoney(row.spend)}</td>
                      <td className="px-4 py-3">{number(row.orders)}</td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">{toMoney(row.netProfit)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
                      <td className="px-4 py-3">{row.roas.toFixed(2)}x</td>
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
          How to use this Shopify Ad ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter ad spend",
              "Add the amount spent on ads for the period you are reviewing.",
            ],
            [
              "Add ad orders",
              "Enter orders attributed to ads and your average order value.",
            ],
            [
              "Include profit",
              "Use profit per order before ads so ROI is based on actual contribution.",
            ],
            [
              "Compare scaling",
              "Review spend scenarios before increasing budgets or campaign volume.",
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
            Common Shopify ad ROI mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Judging ads by revenue instead of profit after ad spend.",
              "Ignoring product cost, shipping, refunds, payment fees, and fulfillment costs.",
              "Scaling spend before checking cost per order and profit per order.",
              "Assuming every attributed ad order is fully incremental.",
              "Increasing budgets before improving landing page conversion or offer quality.",
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
            Understanding your ad results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Ads appear to
              generate strong return after ad spend.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Ads appear
              profitable, but cost per order and conversion should still be
              watched.
            </p>

            <p>
              <strong className="text-amber-700">Low ROI:</strong> Ads are
              profitable, but the return may be too weak for aggressive scaling.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Ad spend
              is greater than the gross profit created by attributed orders.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve Shopify ad ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve conversion",
              "Upgrade product pages, offers, checkout flow, trust signals, and creative message match.",
            ],
            [
              "Raise AOV",
              "Use bundles, upsells, free-shipping thresholds, and cross-sells to increase order value.",
            ],
            [
              "Protect margin",
              "Track contribution profit instead of only ROAS or revenue from ads.",
            ],
            [
              "Refine targeting",
              "Pause weak audiences, creatives, keywords, placements, or campaigns that do not convert profitably.",
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
          Related Shopify seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/shopify/profit-calculator", "Profit Calculator"],
            ["/shopify/fee-calculator", "Fee Calculator"],
            ["/shopify/pricing-calculator", "Pricing Calculator"],
            ["/shopify/break-even-calculator", "Break-Even Calculator"],
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