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

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Healthy"
        ? "bg-green-100 text-green-700"
        : status === "Moderate"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Healthy"
        ? "bg-green-100 text-green-700"
        : status === "Break-even"
          ? "bg-blue-100 text-blue-700"
          : status === "Thin"
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EbayBreakEvenCalculatorPage() {
  const [itemCost, setItemCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(8);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [shippingCharged, setShippingCharged] = useState(6);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedFee, setFixedFee] = useState(0.4);
  const [promotedRate, setPromotedRate] = useState(0);
  const [targetProfit, setTargetProfit] = useState(10);

  const result = useMemo(() => {
    const combinedRate = Math.min(
      0.95,
      Math.max(0, (finalValueFeeRate + promotedRate) / 100),
    );

    const baseCosts = itemCost + shippingCost + packagingCost;

    const solvePriceForProfit = (desiredProfit: number) => {
      const numerator =
        baseCosts + fixedFee + desiredProfit - shippingCharged * (1 - combinedRate);

      return Math.max(0, numerator / (1 - combinedRate));
    };

    const evaluate = (price: number) => {
      const revenue = price + shippingCharged;
      const fees = revenue * combinedRate + fixedFee;
      const profit = revenue - baseCosts - fees;

      return {
        revenue,
        fees,
        profit,
        margin: revenue > 0 ? (profit / revenue) * 100 : 0,
      };
    };

    const breakEvenPrice = solvePriceForProfit(0);
    const targetProfitPrice = solvePriceForProfit(targetProfit);
    const safePrice = targetProfitPrice * 1.15;
    const aggressivePrice = targetProfitPrice * 0.9;

    const breakEvenEval = evaluate(breakEvenPrice);
    const targetEval = evaluate(targetProfitPrice);
    const safeEval = evaluate(safePrice);
    const aggressiveEval = evaluate(aggressivePrice);

    let status = "Healthy";
    let statusText =
      "Your break-even price appears manageable under the current cost and fee assumptions.";
    let recommendation =
      "Compare this price against recent sold listings before deciding whether to list, source more inventory, or promote the item.";

    if (breakEvenPrice > 50) {
      status = "High Risk";
      statusText =
        "Your break-even price is high. The item may need stronger demand, lower costs, or a higher resale value to be worth selling.";
      recommendation =
        "Review item cost, shipping cost, promoted listing rate, and recent sold comps before listing.";
    } else if (breakEvenPrice > 35) {
      status = "Moderate";
      statusText =
        "Your break-even price is workable, but pricing discipline matters. Discounts, returns, or shipping surprises could weaken profit.";
      recommendation =
        "Use the target profit price instead of listing near break-even unless sold comps are weak.";
    } else if (breakEvenPrice < 20) {
      status = "Strong";
      statusText =
        "Your cost structure leaves good pricing flexibility and a lower break-even threshold.";
      recommendation =
        "This item may have room for competitive pricing, promoted listing tests, or a safer profit buffer.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 10) return "Thin";
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
        price: aggressivePrice,
        ...aggressiveEval,
        status: getScenarioStatus(aggressiveEval.profit, aggressiveEval.margin),
      },
      {
        label: "Safe buffer",
        price: safePrice,
        ...safeEval,
        status: getScenarioStatus(safeEval.profit, safeEval.margin),
      },
    ];

    return {
      baseCosts,
      combinedRate,
      breakEvenPrice,
      targetProfitPrice,
      safePrice,
      aggressivePrice,
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
    itemCost,
    shippingCost,
    packagingCost,
    shippingCharged,
    finalValueFeeRate,
    fixedFee,
    promotedRate,
    targetProfit,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const resultTone =
    result.status === "Strong" || result.status === "Healthy"
      ? "good"
      : result.status === "Moderate"
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate the minimum eBay sale price needed to cover item cost,
          shipping, packaging, marketplace fees, promoted listings, and target
          profit.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your item costs, shipping assumptions, eBay fee rate, promoted
            listing rate, and target profit to estimate viable pricing.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Cost details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Actual shipping cost"
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

                <NumberInput
                  label="Shipping charged to buyer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Fee and profit assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Final value fee rate"
                  suffix="%"
                  value={finalValueFeeRate}
                  onChange={setFinalValueFeeRate}
                />

                <NumberInput
                  label="Fixed order fee"
                  prefix="$"
                  value={fixedFee}
                  onChange={setFixedFee}
                />

                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedRate}
                  onChange={setPromotedRate}
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
            This calculator is an estimate. Actual eBay fees, promoted listing
            costs, shipping costs, international fees, refunds, and taxes may
            affect real results.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Minimum viable pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum item price before profit starts"
              tone="blue"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Estimated price needed for your profit target"
              tone={resultTone}
            />

            <MetricCard
              label="Safe buffer price"
              value={toMoney(result.safePrice)}
              helper="Target price plus 15% pricing cushion"
              tone="good"
            />

            <MetricCard
              label="Aggressive floor"
              value={toMoney(result.aggressivePrice)}
              helper="Lower test price near the target-profit price"
              tone="warning"
            />

            <MetricCard
              label="Total base costs"
              value={toMoney(result.baseCosts)}
              helper="Item, shipping, and packaging costs"
            />

            <MetricCard
              label="Combined fee rate"
              value={percent(result.combinedRate * 100)}
              helper="Final value fee plus promoted listing rate"
              tone="warning"
            />

            <MetricCard
              label="Target margin"
              value={percent(result.targetEval.margin)}
              helper="Profit margin at target profit price"
              tone={result.targetEval.margin >= 20 ? "good" : "warning"}
            />

            <MetricCard
              label="Estimated fees at target"
              value={toMoney(result.targetEval.fees)}
              helper="eBay percentage fee plus fixed order fee"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your estimated break-even item price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. To reach your
                target profit, the estimated item price is{" "}
                <strong>{toMoney(result.targetProfitPrice)}</strong>.
              </p>

              <p>
                At the target price, estimated profit is{" "}
                <strong>{toMoney(result.targetEval.profit)}</strong> with a
                margin of <strong>{percent(result.targetEval.margin)}</strong>.
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
          How to use this eBay Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Include product cost, shipping paid by you, packaging, and other required fulfillment costs.",
            ],
            [
              "Add eBay fees",
              "Enter the final value fee, fixed order fee, and any promoted listing percentage.",
            ],
            [
              "Set target profit",
              "Choose the profit you want to earn after fees, shipping, packaging, and item cost.",
            ],
            [
              "Compare pricing",
              "Review break-even, target, aggressive, and safe-buffer price scenarios before listing.",
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
            Common eBay break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Using sale price instead of profit after fees and shipping.",
              "Ignoring promoted listing rates when calculating minimum price.",
              "Forgetting packaging, labels, tape, and handling supplies.",
              "Pricing near break-even without room for returns or buyer offers.",
              "Comparing against active listings instead of recent sold comps.",
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
              <strong className="text-emerald-700">Strong:</strong> Your
              break-even point is low enough to leave flexible pricing room.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> Your
              break-even price appears manageable for typical listing decisions.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Your
              break-even price is workable, but fees, shipping, or offers could
              reduce profit quickly.
            </p>

            <p>
              <strong className="text-red-700">High Risk:</strong> Your
              break-even price may be too high unless sold comps support the
              target price.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to lower your eBay break-even price
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower sourcing cost",
              "Reduce item cost so the listing has more room for profit and buyer offers.",
            ],
            [
              "Improve shipping setup",
              "Use better package sizing, carrier options, or buyer-paid shipping where appropriate.",
            ],
            [
              "Limit promotion costs",
              "Avoid high promoted listing rates unless the added visibility produces profitable sales.",
            ],
            [
              "Build price buffer",
              "List above break-even so returns, fees, discounts, and offers do not erase profit.",
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
          Related eBay seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/fee-calculator", "Fee Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
            ["/ebay/shipping-profit-calculator", "Shipping Profit Calculator"],
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