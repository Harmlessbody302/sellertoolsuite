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
        : status === "Moderate"
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
        : status === "Moderate"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function MercariFeeCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [mercariFeeRate, setMercariFeeRate] = useState(10);
  const [paymentProcessingRate, setPaymentProcessingRate] = useState(2.9);
  const [fixedProcessingFee, setFixedProcessingFee] = useState(0.5);
  const [promotionCost, setPromotionCost] = useState(2);
  const [otherFees, setOtherFees] = useState(0);

  const result = useMemo(() => {
    const sale = Math.max(0, salePrice);
    const mercariRate = Math.min(95, Math.max(0, mercariFeeRate));
    const processingRate = Math.min(95, Math.max(0, paymentProcessingRate));

    const mercariSellingFee = sale * (mercariRate / 100);
    const paymentProcessingFee =
      sale * (processingRate / 100) + fixedProcessingFee;

    const totalFees =
      mercariSellingFee + paymentProcessingFee + promotionCost + otherFees;

    const feePercentage = sale > 0 ? (totalFees / sale) * 100 : 0;
    const netAfterFees = sale - totalFees;
    const combinedRate = mercariRate + processingRate;
    const revenueKeptPercent =
      sale > 0 ? (netAfterFees / sale) * 100 : 0;
    const promotionShare =
      sale > 0 ? (promotionCost / sale) * 100 : 0;
    const fixedFeeShare =
      sale > 0 ? (fixedProcessingFee / sale) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your Mercari fee load looks manageable based on the sale price entered.";
    let recommendation =
      "Use this fee estimate alongside shipping, product cost, and packaging before deciding whether the listing is worth selling.";

    if (feePercentage >= 25) {
      status = "High Cost";
      statusText =
        "Fees and promotion costs are consuming a large share of the Mercari sale price.";
      recommendation =
        "Review the sale price, promotion cost, and fee assumptions before listing or scaling similar items.";
    } else if (feePercentage >= 18) {
      status = "Moderate";
      statusText =
        "Mercari fees are meaningful and should be watched closely.";
      recommendation =
        "Make sure your margin can absorb shipping, packaging, sourcing cost, and potential discounts.";
    } else if (feePercentage < 15) {
      status = "Efficient";
      statusText =
        "Your Mercari fees are relatively low compared with the sale price.";
      recommendation =
        "This fee structure leaves more room for product cost, shipping, packaging, and profit.";
    }

    const getScenarioStatus = (scenarioPercent: number) => {
      if (scenarioPercent >= 25) return "High Cost";
      if (scenarioPercent >= 18) return "Moderate";
      if (scenarioPercent < 15) return "Efficient";
      return "Healthy";
    };

    const scenarios = [8, 10, 12, 15, 18].map((rate) => {
      const scenarioSellingFee = sale * (rate / 100);
      const scenarioPaymentFee =
        sale * (processingRate / 100) + fixedProcessingFee;
      const scenarioTotal =
        scenarioSellingFee + scenarioPaymentFee + promotionCost + otherFees;

      const scenarioPercent =
        sale > 0 ? (scenarioTotal / sale) * 100 : 0;

      return {
        rate,
        sellingFee: scenarioSellingFee,
        paymentFee: scenarioPaymentFee,
        totalFees: scenarioTotal,
        feePercentage: scenarioPercent,
        netAfterFees: sale - scenarioTotal,
        status: getScenarioStatus(scenarioPercent),
      };
    });

    const feeBreakdown = [
      ["Mercari selling fee", mercariSellingFee],
      ["Payment processing", paymentProcessingFee],
      ["Promotion cost", promotionCost],
      ["Other fees", otherFees],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: totalFees > 0 ? (Number(amount) / totalFees) * 100 : 0,
    }));

    return {
      sale,
      mercariSellingFee,
      paymentProcessingFee,
      totalFees,
      feePercentage,
      netAfterFees,
      combinedRate,
      revenueKeptPercent,
      promotionShare,
      fixedFeeShare,
      status,
      statusText,
      recommendation,
      scenarios,
      feeBreakdown,
    };
  }, [
    salePrice,
    mercariFeeRate,
    paymentProcessingRate,
    fixedProcessingFee,
    promotionCost,
    otherFees,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const feeTone =
    result.status === "High Cost"
      ? "bad"
      : result.status === "Moderate"
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Mercari Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Mercari selling fees, payment processing fees, fixed fees,
          promotion costs, other seller charges, total fee percentage, and net
          revenue after marketplace fees.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Fee inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, Mercari selling fee, payment processing fee, fixed
            processing fee, promotion cost, and any other fees to estimate your
            total fee load.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Mercari fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Mercari selling fee"
                  suffix="%"
                  value={mercariFeeRate}
                  onChange={setMercariFeeRate}
                />

                <NumberInput
                  label="Payment processing fee"
                  suffix="%"
                  value={paymentProcessingRate}
                  onChange={setPaymentProcessingRate}
                />

                <NumberInput
                  label="Fixed processing fee"
                  prefix="$"
                  value={fixedProcessingFee}
                  onChange={setFixedProcessingFee}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Promotion and other fees
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Promotion cost"
                  prefix="$"
                  value={promotionCost}
                  onChange={setPromotionCost}
                />

                <NumberInput
                  label="Other fees"
                  prefix="$"
                  value={otherFees}
                  onChange={setOtherFees}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Mercari fees, payment
            processing costs, promotions, discounts, taxes, shipping costs,
            refunds, returns, and category-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Mercari fee breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Total Mercari fees"
              value={toMoney(result.totalFees)}
              helper="Selling fee, processing fee, fixed fee, promotion, and other fees"
              tone={feeTone}
            />

            <MetricCard
              label="Fee percentage"
              value={percent(result.feePercentage)}
              helper="Total fees divided by sale price"
              tone={feeTone}
            />

            <MetricCard
              label="Net after fees"
              value={toMoney(result.netAfterFees)}
              helper="Sale price minus entered fees"
              tone={result.netAfterFees > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Revenue kept after fees"
              value={percent(result.revenueKeptPercent)}
              helper="Net after fees divided by sale price"
              tone={result.netAfterFees > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Mercari selling fee"
              value={toMoney(result.mercariSellingFee)}
              helper="Sale price multiplied by Mercari selling fee rate"
              tone="warning"
            />

            <MetricCard
              label="Payment processing"
              value={toMoney(result.paymentProcessingFee)}
              helper="Processing percentage plus fixed processing fee"
              tone="warning"
            />

            <MetricCard
              label="Promotion cost"
              value={toMoney(promotionCost)}
              helper="Entered promotion, price-drop, or discount cost"
              tone={promotionCost > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Other fees"
              value={toMoney(otherFees)}
              helper="Any additional seller fees entered"
              tone={otherFees > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Combined fee rate"
              value={percent(result.combinedRate)}
              helper="Selling fee plus processing percentage"
              tone="warning"
            />

            <MetricCard
              label="Fixed fee share"
              value={percent(result.fixedFeeShare)}
              helper="Fixed processing fee divided by sale price"
            />

            <MetricCard
              label="Promotion share"
              value={percent(result.promotionShare)}
              helper="Promotion cost divided by sale price"
              tone={promotionCost > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Sale price"
              value={toMoney(result.sale)}
              helper="Entered Mercari sale price"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Total estimated Mercari fees are{" "}
                <strong>{toMoney(result.totalFees)}</strong>, which is about{" "}
                <strong>{percent(result.feePercentage)}</strong> of the sale
                price.
              </p>

              <p>
                After fees and promotion costs, you would have{" "}
                <strong>{toMoney(result.netAfterFees)}</strong> left before
                product cost, shipping, packaging, and other non-platform costs.
              </p>

              <p>
                Mercari selling fee is{" "}
                <strong>{toMoney(result.mercariSellingFee)}</strong>, while
                payment processing is{" "}
                <strong>{toMoney(result.paymentProcessingFee)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Selling fee comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Selling fee</th>
                    <th className="px-4 py-3">Selling fee cost</th>
                    <th className="px-4 py-3">Total fees</th>
                    <th className="px-4 py-3">Fee %</th>
                    <th className="px-4 py-3">Net after fees</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === mercariFeeRate ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">{toMoney(row.sellingFee)}</td>
                      <td className="px-4 py-3">{toMoney(row.totalFees)}</td>
                      <td className="px-4 py-3">
                        {percent(row.feePercentage)}
                      </td>
                      <td className="px-4 py-3">
                        {toMoney(row.netAfterFees)}
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
          How to use this Mercari Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add the expected Mercari sale price before product cost or shipping cost.",
            ],
            [
              "Add Mercari fees",
              "Enter the selling fee, payment processing rate, and fixed processing fee.",
            ],
            [
              "Include promotions",
              "Add promotion cost, price-drop cost, discounts, or other seller-funded fees.",
            ],
            [
              "Review fee load",
              "Compare total fees against sale price before accepting offers or promoting listings.",
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
            Mercari fee breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which fees make up the largest share of the total estimated
            fee load.
          </p>

          <div className="mt-5 space-y-3">
            {result.feeBreakdown.map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{item.label}</p>
                  <p className="text-sm font-bold text-gray-700">
                    {toMoney(item.amount)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {percent(item.share)} of total estimated fees
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Mercari fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating net after fees as profit before subtracting item cost and shipping.",
              "Forgetting fixed processing fees when estimating smaller sales.",
              "Ignoring promotion costs, price drops, or seller-funded discounts.",
              "Accepting buyer offers without recalculating total fee percentage.",
              "Comparing listings by sale price only instead of net after fees.",
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
            Understanding your Mercari fee results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Efficient:</strong> Fees are
              relatively low compared with sale price and may leave more room
              for product cost, shipping, and profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Fees look
              manageable under the current sale price and fee assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Fees are
              meaningful and should be checked against sourcing, shipping, and
              packaging costs.
            </p>

            <p>
              <strong className="text-red-700">High Cost:</strong> Fees,
              promotions, or discounts are consuming a large share of sale
              revenue.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Mercari sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Mercari selling fee and payment processing fee.",
              "Fixed processing fee, especially for lower-priced listings.",
              "Promotion cost, price-drop cost, and seller-funded discounts.",
              "Product cost, sourcing cost, shipping, packaging, and prep cost.",
              "Offer room before accepting lower buyer offers.",
              "Refund, return, damaged item, and cancellation exposure.",
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
          Ways to reduce Mercari fee pressure
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise sale price",
              "Build enough room for fees, shipping, packaging, buyer offers, and target profit.",
            ],
            [
              "Limit promotions",
              "Avoid price drops or promotions that create visibility but erase net profit.",
            ],
            [
              "Bundle carefully",
              "Bundle related items when it improves order value without increasing shipping too much.",
            ],
            [
              "Review offers",
              "Calculate net after fees before accepting buyer offers or lowering the listing price.",
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
          Related Mercari seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/mercari/profit-calculator", "Profit Calculator"],
            ["/mercari/pricing-calculator", "Pricing Calculator"],
            ["/mercari/break-even-calculator", "Break-Even Calculator"],
            ["/mercari/promotion-roi-calculator", "Promotion ROI Calculator"],
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