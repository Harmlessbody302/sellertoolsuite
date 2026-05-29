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
        : status === "Tight"
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
        : status === "Break-even"
          ? "bg-blue-100 text-blue-700"
          : status === "Risky"
            ? "bg-red-100 text-red-700"
            : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function MercariBreakEvenCalculatorPage() {
  const [productCost, setProductCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [mercariFeeRate, setMercariFeeRate] = useState(10);
  const [paymentProcessingRate, setPaymentProcessingRate] = useState(2.9);
  const [fixedProcessingFee, setFixedProcessingFee] = useState(0.5);
  const [promotionCost, setPromotionCost] = useState(2);
  const [returnsAllowance, setReturnsAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(12);

  const result = useMemo(() => {
    const mercariRate = Math.min(95, Math.max(0, mercariFeeRate));
    const processingRate = Math.min(95, Math.max(0, paymentProcessingRate));
    const variableRate = (mercariRate + processingRate) / 100;

    const fixedCosts =
      productCost +
      shippingCost +
      packagingCost +
      fixedProcessingFee +
      promotionCost +
      returnsAllowance;

    const breakEvenPrice =
      variableRate < 1 ? fixedCosts / (1 - variableRate) : 0;

    const targetProfitPrice =
      variableRate < 1 ? (fixedCosts + targetProfit) / (1 - variableRate) : 0;

    const aggressiveFloorPrice = targetProfitPrice * 0.9;
    const safeBufferPrice = targetProfitPrice * 1.15;

    const evaluatePrice = (price: number) => {
      const platformFees = price * variableRate + fixedProcessingFee;
      const totalCosts =
        productCost +
        shippingCost +
        packagingCost +
        promotionCost +
        returnsAllowance +
        platformFees;

      const profit = price - totalCosts;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      const roi = productCost > 0 ? (profit / productCost) * 100 : 0;

      return {
        platformFees,
        totalCosts,
        profit,
        margin,
        roi,
      };
    };

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetEval = evaluatePrice(targetProfitPrice);
    const safeEval = evaluatePrice(safeBufferPrice);
    const aggressiveEval = evaluatePrice(aggressiveFloorPrice);

    const baseCosts =
      productCost + shippingCost + packagingCost + promotionCost + returnsAllowance;

    const fulfillmentCosts = shippingCost + packagingCost;
    const combinedFeeRate = mercariRate + processingRate;

    let status = "Healthy";
    let statusText =
      "Your Mercari cost structure produces a workable break-even price.";
    let recommendation =
      "Compare this pricing range against similar Mercari listings before sourcing inventory or accepting offers.";

    if (breakEvenPrice <= 0 || variableRate >= 1) {
      status = "Check Inputs";
      statusText =
        "The break-even price could not be calculated with the current fee assumptions.";
      recommendation =
        "Check that your fee rates are below 100% and that your cost assumptions are realistic.";
    } else if (targetEval.margin < 15) {
      status = "Tight";
      statusText =
        "Your target-profit price leaves a fairly tight Mercari margin.";
      recommendation =
        "Consider increasing price, reducing item cost, lowering shipping cost, or avoiding promotions on this item.";
    } else if (targetEval.margin >= 25) {
      status = "Strong";
      statusText =
        "Your target-profit price leaves a strong estimated Mercari margin.";
      recommendation =
        "This listing may have enough pricing room for offers, promotions, and normal marketplace variation.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin >= 25) return "Strong";
      if (margin < 15) return "Tight";
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
        label: "Aggressive",
        price: aggressiveFloorPrice,
        ...aggressiveEval,
        status:
          aggressiveEval.profit <= 0
            ? "Risky"
            : getScenarioStatus(aggressiveEval.profit, aggressiveEval.margin),
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
        ...targetEval,
        status: getScenarioStatus(targetEval.profit, targetEval.margin),
      },
      {
        label: "Safe buffer",
        price: safeBufferPrice,
        ...safeEval,
        status: getScenarioStatus(safeEval.profit, safeEval.margin),
      },
    ];

    const costBreakdown = [
      ["Product cost", productCost],
      ["Shipping cost", shippingCost],
      ["Packaging cost", packagingCost],
      ["Promotion cost", promotionCost],
      ["Returns allowance", returnsAllowance],
      ["Platform fees at target", targetEval.platformFees],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        targetEval.totalCosts > 0 ? (Number(amount) / targetEval.totalCosts) * 100 : 0,
    }));

    return {
      variableRate,
      combinedFeeRate,
      fixedCosts,
      baseCosts,
      fulfillmentCosts,
      breakEvenPrice,
      targetProfitPrice,
      safeBufferPrice,
      aggressiveFloorPrice,
      breakEvenEval,
      targetEval,
      safeEval,
      aggressiveEval,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    mercariFeeRate,
    paymentProcessingRate,
    fixedProcessingFee,
    promotionCost,
    returnsAllowance,
    targetProfit,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Mercari Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate the minimum Mercari sale price needed to avoid losing money
          after item cost, shipping, packaging, seller fees, payment processing,
          promotions, returns, and target profit.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter product cost, shipping, packaging, Mercari fee assumptions,
            promotion cost, returns allowance, and target profit to estimate
            viable listing prices.
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
                Risk and profit assumptions
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
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Mercari fees, payment
            processing costs, shipping rates, promotions, returns, discounts,
            taxes, and category-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Minimum viable Mercari pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum sale price before profit starts"
              tone="blue"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Estimated price needed to hit target profit"
              tone="good"
            />

            <MetricCard
              label="Safe buffer price"
              value={toMoney(result.safeBufferPrice)}
              helper="Target profit price plus 15% cushion"
              tone="good"
            />

            <MetricCard
              label="Aggressive floor"
              value={toMoney(result.aggressiveFloorPrice)}
              helper="Lower pricing test near target-profit price"
              tone="warning"
            />

            <MetricCard
              label="Target profit"
              value={toMoney(result.targetEval.profit)}
              helper="Estimated profit at target-profit price"
              tone={result.targetEval.profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Target margin"
              value={percent(result.targetEval.margin)}
              helper="Profit divided by target-profit price"
              tone={result.targetEval.margin >= 25 ? "good" : "warning"}
            />

            <MetricCard
              label="Platform fees at target"
              value={toMoney(result.targetEval.platformFees)}
              helper="Mercari fee, payment processing, and fixed fee"
              tone="warning"
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
              helper="Product, shipping, packaging, fixed fee, promotions, and returns"
            />

            <MetricCard
              label="Base seller costs"
              value={toMoney(result.baseCosts)}
              helper="Product, shipping, packaging, promotion, and returns"
              tone="warning"
            />

            <MetricCard
              label="Fulfillment costs"
              value={toMoney(result.fulfillmentCosts)}
              helper="Shipping plus packaging cost"
              tone="warning"
            />

            <MetricCard
              label="Total costs at target"
              value={toMoney(result.targetEval.totalCosts)}
              helper="All seller costs plus platform fees at target price"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your estimated Mercari break-even sale price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing below
                this may make the listing unprofitable.
              </p>

              <p>
                To earn your target profit, list at approximately{" "}
                <strong>{toMoney(result.targetProfitPrice)}</strong>, producing
                estimated profit of{" "}
                <strong>{toMoney(result.targetEval.profit)}</strong> and a
                margin of <strong>{percent(result.targetEval.margin)}</strong>.
              </p>

              <p>
                Estimated platform fees at the target-profit price are{" "}
                <strong>{toMoney(result.targetEval.platformFees)}</strong>.
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
                        row.label === "Target profit"
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.margin)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.platformFees)}
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
          How to use this Mercari Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Add product cost, shipping, packaging, and any required supplies.",
            ],
            [
              "Add Mercari fees",
              "Enter selling fee, payment processing fee, and fixed processing fee.",
            ],
            [
              "Include risk costs",
              "Add promotion cost, returns allowance, and target profit.",
            ],
            [
              "Compare prices",
              "Review break-even, aggressive, target-profit, and safe-buffer pricing.",
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
            Review which costs are taking the largest share of the target-profit
            listing estimate.
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
                  {percent(item.share)} of estimated target-price costs
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Mercari break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without including shipping, packaging, and fees.",
              "Forgetting fixed processing fees when estimating break-even price.",
              "Accepting offers without checking whether the lower price still covers costs.",
              "Using promotions without accounting for how they reduce profit.",
              "Ignoring returns, damaged orders, or replacement risk in the listing price.",
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
            Understanding your Mercari break-even results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Target-profit
              pricing leaves a strong estimated margin for offers and normal
              marketplace variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              break-even and target-profit prices appear workable under the
              current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Tight:</strong> The listing may
              be profitable, but offers, promotions, or shipping changes could
              reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Fee or
              cost assumptions may be preventing a realistic calculation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Mercari sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, and any cleaning or prep cost.",
              "Shipping cost, packaging cost, labels, tape, and supplies.",
              "Mercari selling fee, payment processing fee, and fixed fee.",
              "Promotion cost, price-drop strategy, and offer room.",
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
          Ways to lower your Mercari break-even price
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower item cost",
              "Source inventory with enough spread between purchase cost and realistic sold price.",
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
              "List with enough margin to accept reasonable buyer offers without losing profit.",
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
            ["/mercari/pricing-calculator", "Pricing Calculator"],
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