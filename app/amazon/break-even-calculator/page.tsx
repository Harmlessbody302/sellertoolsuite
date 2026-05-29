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

export default function AmazonBreakEvenCalculatorPage() {
  const [productCost, setProductCost] = useState(10);
  const [referralFeeRate, setReferralFeeRate] = useState(15);
  const [fbaFee, setFbaFee] = useState(5.25);
  const [storageCost, setStorageCost] = useState(0.4);
  const [inboundShipping, setInboundShipping] = useState(1.25);
  const [prepCost, setPrepCost] = useState(0.75);
  const [ppcCost, setPpcCost] = useState(3);
  const [returnsAllowance, setReturnsAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(8);

  const result = useMemo(() => {
    const variableRate = Math.min(0.95, Math.max(0, referralFeeRate / 100));

    const fixedCosts =
      productCost +
      fbaFee +
      storageCost +
      inboundShipping +
      prepCost +
      ppcCost +
      returnsAllowance;

    const breakEvenPrice =
      variableRate < 1 ? fixedCosts / (1 - variableRate) : 0;

    const targetProfitPrice =
      variableRate < 1 ? (fixedCosts + targetProfit) / (1 - variableRate) : 0;

    const safeBufferPrice = targetProfitPrice * 1.15;
    const aggressiveFloorPrice = targetProfitPrice * 0.9;

    const evaluatePrice = (price: number) => {
      const referralFee = price * variableRate;
      const profit = price - fixedCosts - referralFee;
      const margin = price > 0 ? (profit / price) * 100 : 0;

      return {
        referralFee,
        profit,
        margin,
      };
    };

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetEval = evaluatePrice(targetProfitPrice);
    const safeEval = evaluatePrice(safeBufferPrice);
    const aggressiveEval = evaluatePrice(aggressiveFloorPrice);

    let status = "Healthy";
    let statusText =
      "Your cost structure produces a workable Amazon break-even price.";
    let recommendation =
      "Compare this price against competing listings before sourcing or scaling the product.";

    if (breakEvenPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The break-even price could not be calculated with the current fee assumptions.";
      recommendation =
        "Check that the referral fee rate is below 100% and that your cost assumptions are realistic.";
    } else if (breakEvenPrice > targetProfitPrice * 0.9) {
      status = "Tight";
      statusText =
        "Your break-even price is close to your target-profit price.";
      recommendation =
        "There may not be much room for price competition, coupons, extra PPC, returns, or higher fulfillment costs.";
    } else if (targetEval.margin >= 25) {
      status = "Strong";
      statusText =
        "Your target-profit price leaves a strong estimated Amazon margin.";
      recommendation =
        "This product may have enough pricing room if demand and competition also look favorable.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 10) return "Risky";
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
        ...targetEval,
        status: getScenarioStatus(targetEval.profit, targetEval.margin),
      },
      {
        label: "Aggressive",
        price: aggressiveFloorPrice,
        ...aggressiveEval,
        status: getScenarioStatus(aggressiveEval.profit, aggressiveEval.margin),
      },
      {
        label: "Safe buffer",
        price: safeBufferPrice,
        ...safeEval,
        status: getScenarioStatus(safeEval.profit, safeEval.margin),
      },
    ];

    const amazonFeesAtTarget = targetEval.referralFee + fbaFee + storageCost;
    const totalOperationalCosts =
      productCost + inboundShipping + prepCost + ppcCost + returnsAllowance;

    return {
      variableRate,
      fixedCosts,
      totalOperationalCosts,
      amazonFeesAtTarget,
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
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const targetTone =
    result.targetEval.profit <= 0
      ? "bad"
      : result.targetEval.margin < 10
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate the minimum Amazon sale price needed to avoid losing money
          after referral fees, FBA costs, PPC, storage, returns, inbound
          shipping, and prep costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter product cost, Amazon fees, fulfillment costs, PPC allowance,
            returns allowance, and target profit to estimate viable pricing.
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
                Risk and profit assumptions
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
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon referral fees, FBA
            fees, storage fees, returns, PPC costs, placement fees, prep fees,
            taxes, and category-specific charges may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Minimum viable Amazon pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum price before profit starts"
              tone="blue"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Estimated price needed for your target profit"
              tone={targetTone}
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
              tone={targetTone}
            />

            <MetricCard
              label="Target margin"
              value={percent(result.targetEval.margin)}
              helper="Profit divided by sale price"
              tone={result.targetEval.margin >= 25 ? "good" : "warning"}
            />

            <MetricCard
              label="Total fixed costs"
              value={toMoney(result.fixedCosts)}
              helper="Product, FBA, storage, inbound, prep, PPC, and returns"
              tone="warning"
            />

            <MetricCard
              label="Referral fee at target"
              value={toMoney(result.targetEval.referralFee)}
              helper="Estimated referral fee at target-profit price"
              tone="warning"
            />

            <MetricCard
              label="Amazon fees at target"
              value={toMoney(result.amazonFeesAtTarget)}
              helper="Referral fee plus FBA and storage cost"
              tone="warning"
            />

            <MetricCard
              label="Operational costs"
              value={toMoney(result.totalOperationalCosts)}
              helper="Product, inbound, prep, PPC, and returns allowance"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your estimated break-even sale price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. At that
                price, profit is approximately{" "}
                <strong>{toMoney(Math.max(0, result.breakEvenEval.profit))}</strong>.
              </p>

              <p>
                To generate your target profit, list at approximately{" "}
                <strong>{toMoney(result.targetProfitPrice)}</strong>, which
                produces an estimated margin of{" "}
                <strong>{percent(result.targetEval.margin)}</strong>.
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
                        row.label === "Target profit"
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">
                        {toMoney(Math.max(0, row.profit))}
                      </td>
                      <td className="px-4 py-3">
                        {percent(Math.max(0, row.margin))}
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
          How to use this Amazon Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product cost",
              "Add product cost, inbound shipping, and prep or packaging cost.",
            ],
            [
              "Add Amazon fees",
              "Include referral fee rate, FBA fulfillment fee, and storage cost.",
            ],
            [
              "Include risk costs",
              "Add PPC cost per sale and returns allowance to avoid underestimating cost.",
            ],
            [
              "Compare prices",
              "Review break-even, target profit, aggressive, and safe-buffer pricing scenarios.",
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
            Common Amazon break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Ignoring PPC cost per sale when estimating break-even price.",
              "Forgetting inbound shipping, prep, packaging, and storage costs.",
              "Using a generic referral fee rate without checking the product category.",
              "Leaving out returns allowance or replacement risk.",
              "Sourcing products with too little room between break-even and target-profit price.",
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
            Understanding your Amazon results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Target-profit
              pricing leaves a strong estimated Amazon margin.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              break-even price appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Tight:</strong> Break-even is
              close to target-profit price, leaving less room for PPC, coupons,
              returns, or competition.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> The
              break-even price could not be calculated with the current fee
              assumptions.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve Amazon break-even pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower product cost",
              "Improve supplier pricing or reduce landed cost before scaling inventory.",
            ],
            [
              "Reduce fulfillment drag",
              "Review packaging, product size tier, FBA fee, storage cost, and inbound shipping.",
            ],
            [
              "Control PPC cost",
              "Avoid pricing products as profitable before including realistic ad cost per sale.",
            ],
            [
              "Build margin buffer",
              "Leave room for coupons, returns, price competition, and Amazon fee changes.",
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
            ["/amazon/pricing-calculator", "Pricing Calculator"],
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