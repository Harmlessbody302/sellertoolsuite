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
        : status === "Low Margin"
          ? "bg-amber-100 text-amber-700"
          : "bg-blue-100 text-blue-700";

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
          : status === "Break-even"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function MercariPricingCalculatorPage() {
  const [productCost, setProductCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [mercariFee, setMercariFee] = useState(10);
  const [processingFee, setProcessingFee] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [promotionCost, setPromotionCost] = useState(2);
  const [returnsAllowance, setReturnsAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(12);
  const [targetMargin, setTargetMargin] = useState(25);

  const result = useMemo(() => {
    const mercariRate = Math.min(95, Math.max(0, mercariFee));
    const processingRate = Math.min(95, Math.max(0, processingFee));
    const desiredMargin = Math.min(90, Math.max(0, targetMargin));

    const variableRate = (mercariRate + processingRate) / 100;
    const marginRate = desiredMargin / 100;

    const baseCosts =
      productCost + shippingCost + packagingCost + promotionCost + returnsAllowance;

    const fixedCosts = baseCosts + fixedFee;

    const breakEvenPrice =
      variableRate < 1 ? fixedCosts / (1 - variableRate) : 0;

    const targetProfitPrice =
      variableRate < 1 ? (fixedCosts + targetProfit) / (1 - variableRate) : 0;

    const targetMarginPrice =
      variableRate + marginRate < 1
        ? fixedCosts / (1 - variableRate - marginRate)
        : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
    );

    const evaluatePrice = (price: number) => {
      const totalFees = price * variableRate + fixedFee;
      const totalCosts = baseCosts + totalFees;
      const profit = price - totalCosts;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      const roi = productCost > 0 ? (profit / productCost) * 100 : 0;

      return {
        totalFees,
        totalCosts,
        profit,
        margin,
        roi,
      };
    };

    const recommendedEval = evaluatePrice(recommendedPrice);
    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetProfitEval = evaluatePrice(targetProfitPrice);
    const targetMarginEval = evaluatePrice(targetMarginPrice);

    const fulfillmentCosts = shippingCost + packagingCost;
    const combinedFeeRate = mercariRate + processingRate;

    let status = "Healthy";
    let statusText =
      "The recommended Mercari price appears workable based on your costs, fees, and pricing targets.";
    let recommendation =
      "Compare this price against similar Mercari listings before sourcing inventory, promoting the item, or accepting buyer offers.";

    if (recommendedPrice <= 0 || variableRate + marginRate >= 1) {
      status = "Check Inputs";
      statusText =
        "The recommended price could not be calculated with the current fee and margin assumptions.";
      recommendation =
        "Check that your fee rates and target margin are realistic. A very high target margin can make pricing impossible.";
    } else if (recommendedEval.margin < 15) {
      status = "Low Margin";
      statusText =
        "The recommended Mercari price creates profit, but the margin is thin.";
      recommendation =
        "Consider increasing price, lowering product cost, reducing shipping cost, limiting promotions, or lowering your target margin.";
    } else if (recommendedEval.margin >= 25) {
      status = "Strong";
      statusText =
        "The recommended Mercari price leaves a strong estimated margin.";
      recommendation =
        "This listing may leave enough room for offers, promotions, shipping variation, and normal marketplace pressure if demand supports the price.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 15) return "Low";
      if (margin >= 25) return "Strong";
      return "Healthy";
    };

    const scenarios = [
      {
        label: "Break-even",
        price: breakEvenPrice,
        ...breakEvenEval,
        status: "Break-even",
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
        ...targetProfitEval,
        status: getScenarioStatus(
          targetProfitEval.profit,
          targetProfitEval.margin,
        ),
      },
      {
        label: "Target margin",
        price: targetMarginPrice,
        ...targetMarginEval,
        status: getScenarioStatus(
          targetMarginEval.profit,
          targetMarginEval.margin,
        ),
      },
      {
        label: "Recommended",
        price: recommendedPrice,
        ...recommendedEval,
        status: getScenarioStatus(
          recommendedEval.profit,
          recommendedEval.margin,
        ),
      },
    ];

    const costBreakdown = [
      ["Product cost", productCost],
      ["Shipping cost", shippingCost],
      ["Packaging cost", packagingCost],
      ["Promotion cost", promotionCost],
      ["Returns allowance", returnsAllowance],
      ["Platform fees at price", recommendedEval.totalFees],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        recommendedEval.totalCosts > 0
          ? (Number(amount) / recommendedEval.totalCosts) * 100
          : 0,
    }));

    return {
      variableRate,
      combinedFeeRate,
      baseCosts,
      fixedCosts,
      fulfillmentCosts,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      totalFees: recommendedEval.totalFees,
      totalCosts: recommendedEval.totalCosts,
      profit: recommendedEval.profit,
      margin: recommendedEval.margin,
      roi: recommendedEval.roi,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
      canCalculateMargin: variableRate + marginRate < 1,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    mercariFee,
    processingFee,
    fixedFee,
    promotionCost,
    returnsAllowance,
    targetProfit,
    targetMargin,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0
      ? "bad"
      : result.margin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Mercari Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate profitable Mercari pricing based on item cost, shipping,
          packaging, selling fees, payment processing, promotion costs, returns
          allowance, target profit, and target margin.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter item costs, Mercari fees, promotion costs, return allowance,
            target profit, and target margin to estimate a recommended listing
            price.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Product and fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Product cost"
                  prefix="$"
                  value={productCost}
                  onChange={setProductCost}
                />

                <NumberInput
                  label="Shipping cost"
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
                  value={mercariFee}
                  onChange={setMercariFee}
                />

                <NumberInput
                  label="Payment processing fee"
                  suffix="%"
                  value={processingFee}
                  onChange={setProcessingFee}
                />

                <NumberInput
                  label="Fixed processing fee"
                  prefix="$"
                  value={fixedFee}
                  onChange={setFixedFee}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Pricing targets
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Promotion cost"
                  prefix="$"
                  value={promotionCost}
                  onChange={setPromotionCost}
                />

                <NumberInput
                  label="Returns allowance"
                  prefix="$"
                  value={returnsAllowance}
                  onChange={setReturnsAllowance}
                />

                <NumberInput
                  label="Target profit"
                  prefix="$"
                  value={targetProfit}
                  onChange={setTargetProfit}
                />

                <NumberInput
                  label="Target margin"
                  suffix="%"
                  value={targetMargin}
                  onChange={setTargetMargin}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Mercari fees, payment
            processing costs, promotions, returns, discounts, shipping costs,
            taxes, and category-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended Mercari pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended price"
              value={toMoney(result.recommendedPrice)}
              helper="Highest required price from target profit, target margin, and break-even"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Profit after item cost, shipping, fees, promotions, and returns"
              tone={profitTone}
            />

            <MetricCard
              label="Estimated margin"
              value={percent(result.margin)}
              helper="Profit divided by recommended price"
              tone={profitTone}
            />

            <MetricCard
              label="ROI on product cost"
              value={percent(result.roi)}
              helper="Profit divided by product cost"
              tone={result.roi > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum sale price before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Price needed to reach target dollar profit"
              tone="good"
            />

            <MetricCard
              label="Target margin price"
              value={toMoney(result.targetMarginPrice)}
              helper="Price needed to reach target margin percentage"
              tone={result.canCalculateMargin ? "good" : "bad"}
            />

            <MetricCard
              label="Fees at price"
              value={toMoney(result.totalFees)}
              helper="Mercari fee, payment processing, and fixed fee"
              tone="warning"
            />

            <MetricCard
              label="Total costs at price"
              value={toMoney(result.totalCosts)}
              helper="All seller costs plus platform fees"
            />

            <MetricCard
              label="Combined fee rate"
              value={percent(result.combinedFeeRate)}
              helper="Mercari selling fee plus processing percentage"
              tone="warning"
            />

            <MetricCard
              label="Fixed costs"
              value={toMoney(result.fixedCosts)}
              helper="Base seller costs plus fixed processing fee"
            />

            <MetricCard
              label="Fulfillment costs"
              value={toMoney(result.fulfillmentCosts)}
              helper="Shipping plus packaging cost"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Recommended pricing is{" "}
                <strong>{toMoney(result.recommendedPrice)}</strong>, producing
                estimated profit of <strong>{toMoney(result.profit)}</strong>{" "}
                at <strong>{percent(result.margin)}</strong> margin.
              </p>

              <p>
                Your estimated break-even price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing below
                this may make the listing unprofitable.
              </p>

              <p>
                Estimated fees at the recommended price are{" "}
                <strong>{toMoney(result.totalFees)}</strong>, and total costs
                are <strong>{toMoney(result.totalCosts)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Pricing scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Fees</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Recommended" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.margin)}</td>
                      <td className="px-4 py-3">{toMoney(row.totalFees)}</td>
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
          How to use this Mercari Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Add product cost, shipping, packaging, and any fulfillment supplies.",
            ],
            [
              "Add Mercari fees",
              "Enter selling fee, payment processing rate, and fixed processing fee.",
            ],
            [
              "Set targets",
              "Choose target profit, target margin, promotion cost, and returns allowance.",
            ],
            [
              "Compare scenarios",
              "Review break-even, target profit, target margin, and recommended prices.",
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
            Mercari cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the recommended
            price estimate.
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

                <p className="mt-2 text-sm text-gray-600">
                  {percent(item.share)} of estimated total costs
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Mercari pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without including shipping, packaging, and fees.",
              "Forgetting promotion costs or price-drop costs when setting target profit.",
              "Accepting buyer offers without recalculating margin after fees.",
              "Choosing a target margin that is too high for the fee and cost structure.",
              "Comparing only active listing prices instead of realistic sold prices.",
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
            Understanding your Mercari pricing results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Recommended
              pricing leaves a strong estimated margin for offers, promotions,
              and normal marketplace pressure.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              recommended price appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Low Margin:</strong> The price
              may work, but offers, promotions, or shipping changes could reduce
              profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Fee or
              target margin assumptions may be preventing a realistic
              calculation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Mercari sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, prep cost, and cleaning supplies.",
              "Shipping cost, packaging cost, labels, tape, and mailers.",
              "Mercari selling fee, payment processing fee, and fixed fee.",
              "Promotion cost, price-drop strategy, discounts, and offer room.",
              "Returns allowance, damaged item risk, and refund exposure.",
              "Target profit and minimum acceptable offer price.",
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
          Ways to improve Mercari pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower item cost",
              "Source inventory with enough spread between item cost and realistic sold price.",
            ],
            [
              "Reduce shipping drag",
              "Use accurate weights, right-sized packaging, and the most efficient shipping setup.",
            ],
            [
              "Limit promotions",
              "Avoid price drops or promotions that erase target profit on low-margin listings.",
            ],
            [
              "Build offer room",
              "Set prices with enough margin to accept reasonable buyer offers without losing profit.",
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
            ["/mercari/fee-calculator", "Fee Calculator"],
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