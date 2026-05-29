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
        : status === "Thin Margin"
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
        : status === "Thin"
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

export default function AmazonPricingCalculatorPage() {
  const [productCost, setProductCost] = useState(10);
  const [referralFeeRate, setReferralFeeRate] = useState(15);
  const [fbaFee, setFbaFee] = useState(5.25);
  const [storageCost, setStorageCost] = useState(0.4);
  const [inboundShipping, setInboundShipping] = useState(1.25);
  const [prepCost, setPrepCost] = useState(0.75);
  const [ppcCost, setPpcCost] = useState(3);
  const [returnsAllowance, setReturnsAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(8);
  const [targetMargin, setTargetMargin] = useState(25);

  const result = useMemo(() => {
    const referralRate = Math.min(95, Math.max(0, referralFeeRate));
    const marginTarget = Math.min(90, Math.max(0, targetMargin));

    const fixedCosts =
      productCost +
      fbaFee +
      storageCost +
      inboundShipping +
      prepCost +
      ppcCost +
      returnsAllowance;

    const denominator = 1 - referralRate / 100;

    const breakEvenPrice = denominator > 0 ? fixedCosts / denominator : 0;

    const targetProfitPrice =
      denominator > 0 ? (fixedCosts + targetProfit) / denominator : 0;

    const targetMarginDenominator =
      1 - referralRate / 100 - marginTarget / 100;

    const targetMarginPrice =
      targetMarginDenominator > 0
        ? fixedCosts / targetMarginDenominator
        : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
    );

    const evaluatePrice = (price: number) => {
      const referralFee = price * (referralRate / 100);
      const totalAmazonFees = referralFee + fbaFee + storageCost;
      const profit = price - fixedCosts - referralFee;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      const roi = productCost > 0 ? (profit / productCost) * 100 : 0;

      return {
        referralFee,
        totalAmazonFees,
        profit,
        margin,
        roi,
      };
    };

    const recommendedEval = evaluatePrice(recommendedPrice);
    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetProfitEval = evaluatePrice(targetProfitPrice);
    const targetMarginEval = evaluatePrice(targetMarginPrice);

    const operationalCosts =
      productCost + inboundShipping + prepCost + ppcCost + returnsAllowance;

    let status = "Healthy";
    let statusText =
      "This pricing recommendation appears workable based on your Amazon FBA assumptions.";
    let recommendation =
      "Compare this recommended price against competing listings, expected demand, PPC needs, and category margin before sourcing or scaling.";

    if (recommendedPrice <= 0 || targetMarginDenominator <= 0) {
      status = "Check Inputs";
      statusText =
        "The pricing target cannot be calculated with the current referral fee and target margin assumptions.";
      recommendation =
        "Lower the target margin, check referral fee rate, or review the cost assumptions before using this price.";
    } else if (recommendedEval.margin >= 25) {
      status = "Strong";
      statusText =
        "This pricing recommendation produces a strong projected Amazon margin.";
      recommendation =
        "This price may leave enough room for PPC, returns, coupons, storage, and competition if the market can support it.";
    } else if (recommendedEval.margin < 12) {
      status = "Thin Margin";
      statusText =
        "This pricing recommendation leaves limited room for unexpected costs or competition.";
      recommendation =
        "Consider lowering product cost, reducing FBA drag, raising price, or lowering PPC assumptions before scaling.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin >= 25) return "Strong";
      if (margin < 12) return "Thin";
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

    return {
      fixedCosts,
      operationalCosts,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      referralFee: recommendedEval.referralFee,
      totalAmazonFees: recommendedEval.totalAmazonFees,
      profit: recommendedEval.profit,
      margin: recommendedEval.margin,
      roi: recommendedEval.roi,
      status,
      statusText,
      recommendation,
      scenarios,
      targetMarginDenominator,
    };
  }, [
    productCost,
    referralFeeRate,
    fbaFee,
    storageCost,
    inboundShipping,
    prepCost,
    ppcCost,
    returnsAllowance,
    targetProfit,
    targetMargin,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0
      ? "bad"
      : result.margin < 12
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Find a profitable Amazon selling price based on product cost, referral
          fees, FBA costs, inbound shipping, storage, PPC assumptions, target
          profit, and target margin.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter product costs, Amazon fee assumptions, risk costs, and pricing
            targets to estimate a recommended Amazon selling price.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Product costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Product cost"
                  prefix="$"
                  value={productCost}
                  onChange={setProductCost}
                />

                <NumberInput
                  label="Inbound shipping"
                  prefix="$"
                  value={inboundShipping}
                  onChange={setInboundShipping}
                />

                <NumberInput
                  label="Prep / packaging cost"
                  prefix="$"
                  value={prepCost}
                  onChange={setPrepCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Amazon fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Referral fee rate"
                  suffix="%"
                  value={referralFeeRate}
                  onChange={setReferralFeeRate}
                />

                <NumberInput
                  label="FBA fulfillment fee"
                  prefix="$"
                  value={fbaFee}
                  onChange={setFbaFee}
                />

                <NumberInput
                  label="Storage cost"
                  prefix="$"
                  value={storageCost}
                  onChange={setStorageCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Risk and pricing targets
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="PPC cost per sale"
                  prefix="$"
                  value={ppcCost}
                  onChange={setPpcCost}
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
            This calculator is an estimate. Actual Amazon referral fees, FBA
            fees, storage costs, PPC results, prep costs, returns, coupons,
            placement fees, taxes, and product-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended Amazon pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended price"
              value={toMoney(result.recommendedPrice)}
              helper="Highest required price from target profit, margin, and break-even"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Profit after costs, Amazon fees, PPC, and returns"
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
              tone={result.targetMarginDenominator > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Total Amazon fees"
              value={toMoney(result.totalAmazonFees)}
              helper="Referral fee plus FBA and storage costs"
              tone="warning"
            />

            <MetricCard
              label="Referral fee"
              value={toMoney(result.referralFee)}
              helper="Estimated referral fee at recommended price"
              tone="warning"
            />

            <MetricCard
              label="Total fixed costs"
              value={toMoney(result.fixedCosts)}
              helper="Product, FBA, storage, inbound, prep, PPC, and returns"
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
                At this price, estimated Amazon fees are{" "}
                <strong>{toMoney(result.totalAmazonFees)}</strong>, including a
                referral fee of <strong>{toMoney(result.referralFee)}</strong>.
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
          How to use this Amazon Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product costs",
              "Add product cost, inbound shipping, prep, packaging, PPC, and returns allowance.",
            ],
            [
              "Add Amazon fees",
              "Include referral fee rate, FBA fulfillment fee, and storage cost.",
            ],
            [
              "Set targets",
              "Choose your target dollar profit and target margin percentage.",
            ],
            [
              "Compare prices",
              "Review break-even, target profit, target margin, and recommended price scenarios.",
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
            Common Amazon pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from product cost alone without including Amazon fees.",
              "Ignoring PPC cost per sale when setting target margin.",
              "Forgetting inbound shipping, prep, storage, returns, and packaging costs.",
              "Using a target margin that is mathematically impossible with the referral fee rate.",
              "Choosing a price without checking competing offers and expected conversion.",
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
            Understanding your pricing results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Recommended
              pricing leaves a strong estimated margin after costs and Amazon
              fees.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              recommended price appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              price may work, but PPC, returns, coupons, or competition could
              reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> The
              target margin may be too high relative to referral fee and cost
              assumptions.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve Amazon pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower landed cost",
              "Reduce product cost, inbound shipping, prep, or packaging costs before scaling.",
            ],
            [
              "Reduce FBA drag",
              "Review size tier, fulfillment fee, storage exposure, and placement cost assumptions.",
            ],
            [
              "Control PPC",
              "Avoid setting prices that only work if ad cost per sale stays unrealistically low.",
            ],
            [
              "Build buffer",
              "Leave room for coupons, returns, price competition, fee changes, and stock risk.",
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
          Related Amazon seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/amazon/fba-profit-calculator", "FBA Profit Calculator"],
            ["/amazon/fee-calculator", "Fee Calculator"],
            ["/amazon/break-even-calculator", "Break-Even Calculator"],
            ["/amazon/ppc-roi-calculator", "PPC ROI Calculator"],
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