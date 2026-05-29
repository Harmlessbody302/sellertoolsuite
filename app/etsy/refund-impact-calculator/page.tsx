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
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Moderate"
        ? "bg-amber-100 text-amber-700"
        : status === "Warning"
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
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Moderate"
        ? "bg-amber-100 text-amber-700"
        : status === "Warning"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsyRefundImpactCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState("120");
  const [averageOrderValue, setAverageOrderValue] = useState("35");
  const [profitPerOrder, setProfitPerOrder] = useState("12");
  const [refundRate, setRefundRate] = useState("4");
  const [replacementCost, setReplacementCost] = useState("8");
  const [processingLoss, setProcessingLoss] = useState("3");
  const [shippingLoss, setShippingLoss] = useState("5");

  const result = useMemo(() => {
    const orders = Number(monthlyOrders) || 0;
    const orderValue = Number(averageOrderValue) || 0;
    const profit = Number(profitPerOrder) || 0;
    const rate = Number(refundRate) || 0;
    const replacement = Number(replacementCost) || 0;
    const processing = Number(processingLoss) || 0;
    const shipping = Number(shippingLoss) || 0;

    const refundedOrders = orders * (rate / 100);
    const grossRevenue = orders * orderValue;
    const grossProfit = orders * profit;
    const refundLossPerOrder = profit + replacement + processing + shipping;
    const totalRefundLoss = refundedOrders * refundLossPerOrder;
    const netProfit = grossProfit - totalRefundLoss;
    const profitReduction =
      grossProfit > 0 ? (totalRefundLoss / grossProfit) * 100 : 0;

    const breakEvenRefundRate =
      orders > 0 && refundLossPerOrder > 0
        ? (grossProfit / (orders * refundLossPerOrder)) * 100
        : 0;

    const recoveredProfitIfReducedTwoPercent =
      Math.min(rate, 2) > 0
        ? orders * (Math.min(rate, 2) / 100) * refundLossPerOrder
        : 0;

    const getStatus = (reduction: number) => {
      if (reduction > 35) return "Critical";
      if (reduction > 20) return "Warning";
      if (reduction > 10) return "Moderate";
      return "Healthy";
    };

    const status = getStatus(profitReduction);

    const statusText =
      status === "Healthy"
        ? "Your current refund assumptions have a manageable impact on monthly profitability."
        : status === "Moderate"
          ? "Refunds are noticeable but still manageable. Look for recurring causes and optimize weak points."
          : status === "Warning"
            ? "Refunds are materially reducing profit. Review listings, packaging, and fulfillment workflows."
            : "Refund-related losses are heavily impacting profitability. Investigate product quality, shipping damage, listing accuracy, or expectation mismatches immediately.";

    const recommendation =
      status === "Healthy"
        ? "Continue monitoring customer feedback, listing accuracy, and fulfillment quality to keep refund rates low."
        : status === "Moderate"
          ? "Look for patterns in refund reasons and fix the easiest recurring causes first."
          : status === "Warning"
            ? "Audit product descriptions, packaging, shipping methods, and quality control before scaling this product."
            : "Pause aggressive promotion until the refund causes are identified and reduced.";

    const scenarios = [1, 2, 4, 6, 8, 10].map((scenarioRate) => {
      const scenarioRefunds = orders * (scenarioRate / 100);
      const scenarioLoss = scenarioRefunds * refundLossPerOrder;
      const scenarioNet = grossProfit - scenarioLoss;
      const scenarioReduction =
        grossProfit > 0 ? (scenarioLoss / grossProfit) * 100 : 0;

      return {
        rate: scenarioRate,
        refundedOrders: scenarioRefunds,
        loss: scenarioLoss,
        net: scenarioNet,
        reduction: scenarioReduction,
        status: getStatus(scenarioReduction),
      };
    });

    return {
      grossRevenue,
      refundedOrders,
      grossProfit,
      totalRefundLoss,
      netProfit,
      profitReduction,
      breakEvenRefundRate,
      refundLossPerOrder,
      recoveredProfitIfReducedTwoPercent,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlyOrders,
    averageOrderValue,
    profitPerOrder,
    refundRate,
    replacementCost,
    processingLoss,
    shippingLoss,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const number = (value: number) => value.toLocaleString("en-US");

  const resultTone =
    result.status === "Healthy"
      ? "good"
      : result.status === "Moderate"
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Refund Impact Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how refunds, replacements, cancellations, processing losses,
          and shipping losses affect Etsy shop profitability.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Refund inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter order volume, profit per order, refund rate, and estimated
            losses tied to refunds, replacements, fees, and return shipping.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Order data
              </h3>

              <div className="space-y-4">
                <Input
                  label="Monthly orders"
                  value={monthlyOrders}
                  onChange={setMonthlyOrders}
                  helper="Use recent monthly order volume for a product, category, or shop."
                />

                <Input
                  label="Average order value"
                  value={averageOrderValue}
                  onChange={setAverageOrderValue}
                  prefix="$"
                  helper="Average revenue per order before refunds."
                />

                <Input
                  label="Profit per order"
                  value={profitPerOrder}
                  onChange={setProfitPerOrder}
                  prefix="$"
                  helper="Estimated profit before refund-related losses."
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Refund assumptions
              </h3>

              <div className="space-y-4">
                <Input
                  label="Refund rate"
                  value={refundRate}
                  onChange={setRefundRate}
                  suffix="%"
                  helper="Estimated percentage of orders refunded, replaced, or cancelled."
                />

                <Input
                  label="Replacement cost"
                  value={replacementCost}
                  onChange={setReplacementCost}
                  prefix="$"
                  helper="Product or replacement cost lost per refunded order."
                />

                <Input
                  label="Processing / fee loss"
                  value={processingLoss}
                  onChange={setProcessingLoss}
                  prefix="$"
                  helper="Estimated non-recovered fees, processing costs, or admin loss."
                />

                <Input
                  label="Shipping / return loss"
                  value={shippingLoss}
                  onChange={setShippingLoss}
                  prefix="$"
                  helper="Shipping, return label, packaging, or reshipment cost per refund."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Actual refund impact can vary based
            on Etsy policies, payment processing, return shipping, replacement
            decisions, product condition, and customer service outcomes.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Refund impact at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Refunded orders"
              value={result.refundedOrders.toFixed(1)}
              helper="Estimated refunded orders per month"
              tone="warning"
            />

            <MetricCard
              label="Refund loss per refunded order"
              value={money(result.refundLossPerOrder)}
              helper="Profit, replacement, fee, and shipping loss"
              tone="bad"
            />

            <MetricCard
              label="Total monthly refund loss"
              value={money(result.totalRefundLoss)}
              helper="Estimated monthly profit lost to refunds"
              tone={resultTone}
            />

            <MetricCard
              label="Net monthly profit"
              value={money(result.netProfit)}
              helper="Gross profit after refund losses"
              tone={result.netProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Profit reduction"
              value={`${result.profitReduction.toFixed(1)}%`}
              helper="Refund loss divided by gross profit"
              tone={resultTone}
            />

            <MetricCard
              label="Break-even refund rate"
              value={`${result.breakEvenRefundRate.toFixed(1)}%`}
              helper="Approximate refund rate where profit reaches zero"
              tone="blue"
            />

            <MetricCard
              label="Gross monthly revenue"
              value={money(result.grossRevenue)}
              helper="Monthly orders × average order value"
              tone="blue"
            />

            <MetricCard
              label="Recovered if refunds drop 2%"
              value={money(result.recoveredProfitIfReducedTwoPercent)}
              helper="Estimated monthly profit recovered"
              tone="good"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Refund losses are reducing estimated gross profit by{" "}
                <strong>{result.profitReduction.toFixed(1)}%</strong>, or about{" "}
                <strong>{money(result.totalRefundLoss)}</strong> per month.
              </p>

              <p>
                Reducing refunds by up to 2 percentage points could recover
                approximately{" "}
                <strong>{money(result.recoveredProfitIfReducedTwoPercent)}</strong>{" "}
                in monthly profit.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Refund rate comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Refund rate</th>
                    <th className="px-4 py-3">Refunded orders</th>
                    <th className="px-4 py-3">Loss</th>
                    <th className="px-4 py-3">Net profit</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === Number(refundRate)
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">
                        {number(Number(row.refundedOrders.toFixed(1)))}
                      </td>
                      <td className="px-4 py-3">{money(row.loss)}</td>
                      <td className="px-4 py-3">{money(row.net)}</td>
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
          How to use this Etsy Refund Impact Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter order volume",
              "Use recent monthly order volume for the item, product line, or shop you are reviewing.",
            ],
            [
              "Add profit per order",
              "Use estimated profit before refunds so the calculator can estimate lost profit.",
            ],
            [
              "Estimate refund losses",
              "Include replacement cost, non-recovered fees, shipping loss, and reshipment costs.",
            ],
            [
              "Compare refund rates",
              "Review different refund-rate scenarios to see how small changes affect monthly profit.",
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
            Common refund mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Tracking refund count but not refund-related profit loss.",
              "Ignoring replacement cost, return shipping, and non-recovered fees.",
              "Treating refunds as random instead of looking for patterns.",
              "Scaling ad spend before fixing recurring product or expectation issues.",
              "Not updating listing photos, descriptions, sizing, or shipping expectations after repeated complaints.",
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
            Understanding refund impact
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-emerald-700">Healthy:</strong> Refund
              losses are relatively small compared with gross profit.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Refunds are
              noticeable and worth monitoring for recurring causes.
            </p>

            <p>
              <strong className="text-orange-700">Warning:</strong> Refunds are
              materially reducing profit and should be addressed before scaling.
            </p>

            <p>
              <strong className="text-red-700">Critical:</strong> Refund losses
              are severely damaging profitability and need immediate attention.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce Etsy refunds
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve listing accuracy",
              "Clarify size, materials, color, customization limits, shipping times, and what buyers should expect.",
            ],
            [
              "Strengthen packaging",
              "Reduce shipping damage by improving packaging, labels, inserts, and carrier selection.",
            ],
            [
              "Review product quality",
              "Track recurring defects, production issues, or variation problems before they become costly.",
            ],
            [
              "Set buyer expectations",
              "Use photos, descriptions, FAQs, and policies to reduce preventable misunderstandings.",
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
            ["/etsy/listing-roi-calculator", "Listing ROI Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
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