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
    status === "Low Impact"
      ? "bg-green-100 text-green-700"
      : status === "Manageable"
        ? "bg-emerald-100 text-emerald-700"
        : status === "High Impact"
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
    status === "Low"
      ? "bg-green-100 text-green-700"
      : status === "Manageable"
        ? "bg-emerald-100 text-emerald-700"
        : status === "High"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayRefundImpactCalculatorPage() {
  const [monthlyOrders, setMonthlyOrders] = useState(100);
  const [averageSalePrice, setAverageSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [profitPerOrder, setProfitPerOrder] = useState(14.5);
  const [refundRate, setRefundRate] = useState(4);
  const [refundAmount, setRefundAmount] = useState(45);
  const [returnShippingCost, setReturnShippingCost] = useState(7);
  const [originalShippingCost, setOriginalShippingCost] = useState(7);
  const [itemCost, setItemCost] = useState(18);
  const [resellRecoveryRate, setResellRecoveryRate] = useState(60);
  const [restockingCost, setRestockingCost] = useState(2);
  const [caseLossRate, setCaseLossRate] = useState(1);

  const result = useMemo(() => {
    const orders = Math.max(0, monthlyOrders);
    const salePrice = Math.max(0, averageSalePrice);
    const buyerShipping = Math.max(0, shippingCharged);
    const profitOrder = Math.max(0, profitPerOrder);
    const refundPercent = Math.min(95, Math.max(0, refundRate));
    const refund = Math.max(0, refundAmount);
    const returnShip = Math.max(0, returnShippingCost);
    const originalShip = Math.max(0, originalShippingCost);
    const item = Math.max(0, itemCost);
    const recoveryRate = Math.min(100, Math.max(0, resellRecoveryRate));
    const restock = Math.max(0, restockingCost);
    const caseRate = Math.min(95, Math.max(0, caseLossRate));

    const revenuePerOrder = salePrice + buyerShipping;
    const monthlyRevenue = orders * revenuePerOrder;
    const monthlyProfitBeforeRefunds = orders * profitOrder;

    const expectedRefunds = orders * (refundPercent / 100);
    const expectedCaseLosses = orders * (caseRate / 100);

    const recoveredItemValue = item * (recoveryRate / 100);
    const lostItemValue = Math.max(0, item - recoveredItemValue);

    const costPerRefund =
      refund + returnShip + originalShip + lostItemValue + restock;

    const expectedRefundLoss = expectedRefunds * costPerRefund;
    const expectedCaseLoss = expectedCaseLosses * revenuePerOrder;
    const totalRefundImpact = expectedRefundLoss + expectedCaseLoss;

    const profitAfterRefunds = monthlyProfitBeforeRefunds - totalRefundImpact;
    const profitReduction =
      monthlyProfitBeforeRefunds > 0
        ? (totalRefundImpact / monthlyProfitBeforeRefunds) * 100
        : 0;
    const refundImpactShare =
      monthlyRevenue > 0 ? (totalRefundImpact / monthlyRevenue) * 100 : 0;
    const refundCostPerOrder = orders > 0 ? totalRefundImpact / orders : 0;
    const adjustedProfitPerOrder = orders > 0 ? profitAfterRefunds / orders : 0;
    const adjustedMargin =
      monthlyRevenue > 0 ? (profitAfterRefunds / monthlyRevenue) * 100 : 0;

    const breakEvenRefundRate =
      orders > 0 && costPerRefund > 0
        ? (monthlyProfitBeforeRefunds / (orders * costPerRefund)) * 100
        : 0;

    const safeRefundRate = breakEvenRefundRate * 0.5;
    const refundGap = breakEvenRefundRate - refundPercent;

    let status = "Manageable";
    let statusText =
      "Your estimated eBay refund and return impact appears manageable under the current assumptions.";
    let recommendation =
      "Monitor return reasons, item condition, shipping damage, buyer messages, and listing accuracy so refund losses do not quietly reduce profit.";

    if (profitAfterRefunds <= 0) {
      status = "Profit Erased";
      statusText =
        "Refunds, returns, and case losses may erase your monthly eBay profit under the current assumptions.";
      recommendation =
        "Reduce refund causes, improve listing accuracy, avoid risky inventory, improve packaging, raise prices, or add a refund allowance before scaling.";
    } else if (profitReduction > 35 || adjustedMargin < 10) {
      status = "High Impact";
      statusText =
        "Refunds and returns are taking a large share of estimated eBay profit.";
      recommendation =
        "Review return reasons, item descriptions, condition notes, photos, packaging, carrier issues, and buyer expectations before adding more volume.";
    } else if (profitReduction < 15 && adjustedMargin >= 20) {
      status = "Low Impact";
      statusText =
        "Refund and return losses appear to have a low impact on estimated eBay profit.";
      recommendation =
        "This refund level looks workable if the return assumptions, item recovery rate, and buyer issue rate are realistic.";
    }

    const getScenarioStatus = (
      scenarioProfit: number,
      scenarioReduction: number,
    ) => {
      if (scenarioProfit <= 0) return "Erased";
      if (scenarioReduction > 35) return "High";
      if (scenarioReduction < 15) return "Low";
      return "Manageable";
    };

    const refundScenarios = [1, 3, 5, 8, 12].map((scenarioRefundRate) => {
      const scenarioRefunds = orders * (scenarioRefundRate / 100);
      const scenarioLoss = scenarioRefunds * costPerRefund + expectedCaseLoss;
      const scenarioProfit = monthlyProfitBeforeRefunds - scenarioLoss;
      const scenarioReduction =
        monthlyProfitBeforeRefunds > 0
          ? (scenarioLoss / monthlyProfitBeforeRefunds) * 100
          : 0;
      const scenarioMargin =
        monthlyRevenue > 0 ? (scenarioProfit / monthlyRevenue) * 100 : 0;

      return {
        refundRate: scenarioRefundRate,
        refunds: scenarioRefunds,
        loss: scenarioLoss,
        profit: scenarioProfit,
        reduction: scenarioReduction,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioReduction),
      };
    });

    const costBreakdown = [
      ["Refund amount", refund],
      ["Return shipping cost", returnShip],
      ["Original shipping loss", originalShip],
      ["Lost item value", lostItemValue],
      ["Restocking cost", restock],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: costPerRefund > 0 ? (Number(amount) / costPerRefund) * 100 : 0,
      orderShare:
        revenuePerOrder > 0 ? (Number(amount) / revenuePerOrder) * 100 : 0,
    }));

    return {
      orders,
      salePrice,
      buyerShipping,
      profitOrder,
      refundPercent,
      refund,
      returnShip,
      originalShip,
      item,
      recoveryRate,
      restock,
      caseRate,
      revenuePerOrder,
      monthlyRevenue,
      monthlyProfitBeforeRefunds,
      expectedRefunds,
      expectedCaseLosses,
      recoveredItemValue,
      lostItemValue,
      costPerRefund,
      expectedRefundLoss,
      expectedCaseLoss,
      totalRefundImpact,
      profitAfterRefunds,
      profitReduction,
      refundImpactShare,
      refundCostPerOrder,
      adjustedProfitPerOrder,
      adjustedMargin,
      breakEvenRefundRate,
      safeRefundRate,
      refundGap,
      status,
      statusText,
      recommendation,
      refundScenarios,
      costBreakdown,
    };
  }, [
    monthlyOrders,
    averageSalePrice,
    shippingCharged,
    profitPerOrder,
    refundRate,
    refundAmount,
    returnShippingCost,
    originalShippingCost,
    itemCost,
    resellRecoveryRate,
    restockingCost,
    caseLossRate,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profitAfterRefunds <= 0
      ? "bad"
      : result.profitReduction > 35
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Refund Impact Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how eBay refunds, returns, case losses, return shipping,
          damaged items, and lost resale value can reduce monthly profit.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Refund inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter monthly orders, expected refund rate, refund amount, return
            shipping, item recovery, and case loss assumptions to estimate the
            real impact of refunds on eBay profit.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Monthly sales
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly orders"
                  value={monthlyOrders}
                  onChange={setMonthlyOrders}
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
                  label="Profit per order before refunds"
                  prefix="$"
                  value={profitPerOrder}
                  onChange={setProfitPerOrder}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Refund and return assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Refund rate"
                  suffix="%"
                  value={refundRate}
                  onChange={setRefundRate}
                />

                <NumberInput
                  label="Average refund amount"
                  prefix="$"
                  value={refundAmount}
                  onChange={setRefundAmount}
                />

                <NumberInput
                  label="Return shipping cost"
                  prefix="$"
                  value={returnShippingCost}
                  onChange={setReturnShippingCost}
                />

                <NumberInput
                  label="Original shipping loss"
                  prefix="$"
                  value={originalShippingCost}
                  onChange={setOriginalShippingCost}
                />

                <NumberInput
                  label="Restocking / support cost"
                  prefix="$"
                  value={restockingCost}
                  onChange={setRestockingCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Item recovery and case risk
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Resell recovery rate"
                  suffix="%"
                  value={resellRecoveryRate}
                  onChange={setResellRecoveryRate}
                />

                <NumberInput
                  label="Case / dispute loss rate"
                  suffix="%"
                  value={caseLossRate}
                  onChange={setCaseLossRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay refund outcomes, return
            shipping, item condition, seller protections, buyer disputes,
            damaged packages, policy decisions, and seller-specific costs may
            vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay refund and return impact.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Profit after refunds"
              value={toMoney(result.profitAfterRefunds)}
              helper="Monthly profit after expected refund and case losses"
              tone={profitTone}
            />

            <MetricCard
              label="Total refund impact"
              value={toMoney(result.totalRefundImpact)}
              helper="Expected refund loss plus case/dispute loss"
              tone={result.totalRefundImpact > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Profit before refunds"
              value={toMoney(result.monthlyProfitBeforeRefunds)}
              helper="Monthly orders multiplied by profit per order"
              tone="blue"
            />

            <MetricCard
              label="Profit reduction"
              value={percent(result.profitReduction)}
              helper="Refund impact divided by profit before refunds"
              tone={result.profitReduction < 25 ? "good" : "warning"}
            />

            <MetricCard
              label="Expected refunds"
              value={result.expectedRefunds.toFixed(1)}
              helper="Monthly orders multiplied by expected refund rate"
              tone="warning"
            />

            <MetricCard
              label="Cost per refund"
              value={toMoney(result.costPerRefund)}
              helper="Refund, shipping, item loss, and restocking cost"
              tone="warning"
            />

            <MetricCard
              label="Adjusted profit per order"
              value={toMoney(result.adjustedProfitPerOrder)}
              helper="Profit after refunds divided by monthly orders"
              tone={result.adjustedProfitPerOrder > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Adjusted margin"
              value={percent(result.adjustedMargin)}
              helper="Profit after refunds divided by monthly revenue"
              tone={result.adjustedMargin >= 15 ? "good" : "warning"}
            />

            <MetricCard
              label="Refund cost per order"
              value={toMoney(result.refundCostPerOrder)}
              helper="Total refund impact divided by monthly orders"
              tone="warning"
            />

            <MetricCard
              label="Refund impact share"
              value={percent(result.refundImpactShare)}
              helper="Refund impact divided by monthly revenue"
              tone={result.refundImpactShare < 10 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even refund rate"
              value={percent(result.breakEvenRefundRate)}
              helper="Estimated refund rate that would erase monthly profit"
              tone="blue"
            />

            <MetricCard
              label="Refund rate cushion"
              value={percent(result.refundGap)}
              helper="Break-even refund rate minus current refund rate"
              tone={result.refundGap > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Lost item value"
              value={toMoney(result.lostItemValue)}
              helper="Item cost not recovered after resale value"
              tone="warning"
            />

            <MetricCard
              label="Recovered item value"
              value={toMoney(result.recoveredItemValue)}
              helper="Estimated resale value recovered from returned item"
              tone="good"
            />

            <MetricCard
              label="Case/dispute loss"
              value={toMoney(result.expectedCaseLoss)}
              helper="Estimated monthly loss from disputes or cases"
              tone={result.expectedCaseLoss > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Monthly revenue"
              value={toMoney(result.monthlyRevenue)}
              helper="Orders multiplied by average order revenue"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At <strong>{result.orders.toLocaleString()}</strong> monthly
                orders and a <strong>{percent(result.refundPercent)}</strong>{" "}
                refund rate, you can expect about{" "}
                <strong>{result.expectedRefunds.toFixed(1)}</strong> refunds
                per month.
              </p>

              <p>
                Estimated refund impact is{" "}
                <strong>{toMoney(result.totalRefundImpact)}</strong>, reducing
                profit by <strong>{percent(result.profitReduction)}</strong>.
                Profit after refunds is{" "}
                <strong>{toMoney(result.profitAfterRefunds)}</strong>.
              </p>

              <p>
                Each refund is estimated to cost{" "}
                <strong>{toMoney(result.costPerRefund)}</strong> after refund
                amount, shipping, item value loss, and restocking/support cost.
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
                    <th className="px-4 py-3">Refunds</th>
                    <th className="px-4 py-3">Impact</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Reduction</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.refundScenarios.map((row) => (
                    <tr
                      key={row.refundRate}
                      className={
                        row.refundRate === result.refundPercent
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">
                        {percent(row.refundRate)}
                      </td>
                      <td className="px-4 py-3">{row.refunds.toFixed(1)}</td>
                      <td className="px-4 py-3">{toMoney(row.loss)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.reduction)}</td>
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
          How to use this eBay Refund Impact Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter order volume",
              "Add monthly orders, average sale price, buyer-paid shipping, and profit before refunds.",
            ],
            [
              "Estimate refund rate",
              "Enter the percentage of orders likely to become refunds, returns, disputes, or issue cases.",
            ],
            [
              "Add return costs",
              "Include refund amount, return shipping, original shipping loss, restocking, and item value loss.",
            ],
            [
              "Review profit impact",
              "Compare profit before and after refunds to decide whether pricing or listing quality needs adjustment.",
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
            eBay refund cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which refund and return costs create the largest expected
            loss per refund.
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
                  <p>{percent(item.share)} of refund cost</p>
                  <p>{percent(item.orderShare)} of order revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay refund mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating refunded revenue as if it still produced profit.",
              "Ignoring return shipping, original shipping loss, and restocking time.",
              "Assuming every returned item can be resold at full value.",
              "Pricing items without a refund or damaged-item allowance.",
              "Ignoring buyer disputes, cases, partial refunds, and customer service time.",
              "Scaling listings with high issue rates before fixing photos, descriptions, condition notes, or packaging.",
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
            Understanding your eBay refund results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Low Impact:</strong> Refunds
              and returns appear to take a small share of estimated profit.
            </p>

            <p>
              <strong className="text-emerald-700">Manageable:</strong> Refund
              impact appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">High Impact:</strong> Refunds,
              returns, shipping losses, or case outcomes are consuming a large
              share of profit.
            </p>

            <p>
              <strong className="text-red-700">Profit Erased:</strong> Refunds
              and returns may erase estimated monthly profit under the current
              assumptions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Monthly order volume and profit before refunds.",
              "Expected refund, return, and case/dispute rate.",
              "Average full or partial refund amount.",
              "Original shipping loss and return shipping cost.",
              "Returned item resale value, damaged item loss, and restocking cost.",
              "Buyer issue patterns, description accuracy, packaging quality, and carrier damage risk.",
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
          Ways to reduce eBay refund impact
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Improve listing accuracy",
              "Use clear photos, exact condition notes, measurements, defects, compatibility, and item specifics.",
            ],
            [
              "Improve packaging",
              "Reduce damage risk with better boxes, padding, labels, and carrier choices.",
            ],
            [
              "Price with allowance",
              "Build realistic refund, return, and damaged-item allowance into pricing before scaling.",
            ],
            [
              "Track return reasons",
              "Review return reason patterns so weak products, bad photos, or unclear descriptions can be fixed.",
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
            ["/ebay/listing-roi-calculator", "Listing ROI Calculator"],
            ["/ebay/offer-discount-calculator", "Offer Discount Calculator"],
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