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
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Thin Margin" || status === "High Price"
        ? "bg-amber-100 text-amber-700"
        : status === "Check Inputs"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${style}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const style =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Thin" || status === "Break-even"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayPricingCalculatorPage() {
  const [itemCost, setItemCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(8);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [shippingCharged, setShippingCharged] = useState(6);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedFee, setFixedFee] = useState(0.4);
  const [promotedListingRate, setPromotedListingRate] = useState(0);
  const [targetProfit, setTargetProfit] = useState(15);
  const [targetMargin, setTargetMargin] = useState(30);

  const result = useMemo(() => {
    const variableFeeRate = Math.min(
      0.95,
      Math.max(0, (finalValueFeeRate + promotedListingRate) / 100),
    );

    const baseCosts = itemCost + shippingCost + packagingCost;
    const shippingSubsidy = Math.max(0, shippingCost - shippingCharged);

    const solvePriceForProfit = (desiredProfit: number) => {
      const numerator =
        baseCosts +
        fixedFee +
        desiredProfit -
        shippingCharged * (1 - variableFeeRate);

      return Math.max(0, numerator / (1 - variableFeeRate));
    };

    const marginDecimal = Math.max(0, targetMargin / 100);

    const priceForTargetProfit = solvePriceForProfit(targetProfit);

    const priceForTargetMargin =
      variableFeeRate + marginDecimal < 1
        ? Math.max(
            0,
            (baseCosts +
              fixedFee -
              shippingCharged * (1 - variableFeeRate)) /
              (1 - variableFeeRate - marginDecimal),
          )
        : 0;

    const breakEvenPrice = solvePriceForProfit(0);

    const recommendedPrice = Math.max(
      priceForTargetProfit,
      priceForTargetMargin,
      breakEvenPrice,
    );

    const evaluate = (price: number) => {
      const totalRevenue = price + shippingCharged;
      const finalValueFee = totalRevenue * (finalValueFeeRate / 100);
      const promotedFee = totalRevenue * (promotedListingRate / 100);
      const totalFees = finalValueFee + promotedFee + fixedFee;
      const totalCosts = baseCosts + totalFees;
      const profit = totalRevenue - totalCosts;
      const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

      return {
        totalRevenue,
        finalValueFee,
        promotedFee,
        totalFees,
        totalCosts,
        profit,
        margin,
      };
    };

    const recommendedEval = evaluate(recommendedPrice);
    const breakEvenEval = evaluate(breakEvenPrice);
    const targetProfitEval = evaluate(priceForTargetProfit);
    const targetMarginEval = evaluate(priceForTargetMargin);

    let status = "Healthy";
    let statusText =
      "The recommended price appears to cover your eBay costs, fees, and target pricing goal.";
    let recommendation =
      "Use this as a pricing estimate, then compare against similar sold listings before publishing.";

    if (recommendedPrice <= 0) {
      status = "Check Inputs";
      statusText =
        "The pricing target cannot be calculated with the current fee or margin assumptions.";
      recommendation =
        "Lower the target margin, check fee percentages, or confirm that the inputs are realistic.";
    } else if (recommendedEval.margin < 10) {
      status = "Thin Margin";
      statusText =
        "The recommended price creates profit, but the estimated margin is thin.";
      recommendation =
        "Consider raising price, lowering sourcing cost, reducing shipping burden, or avoiding promoted listing spend.";
    } else if (recommendedPrice > itemCost * 4 && itemCost > 0) {
      status = "High Price";
      statusText =
        "The recommended price is much higher than the item cost.";
      recommendation =
        "Confirm that recent sold listings can support this price before publishing.";
    } else if (recommendedEval.margin >= 30) {
      status = "Strong";
      statusText =
        "The recommended price leaves a strong estimated margin.";
      recommendation =
        "This price target looks healthy if it remains competitive with comparable eBay listings.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 10) return "Thin";
      if (margin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [
      { label: "Break-even", price: breakEvenPrice, eval: breakEvenEval },
      {
        label: "Target profit",
        price: priceForTargetProfit,
        eval: targetProfitEval,
      },
      {
        label: "Target margin",
        price: priceForTargetMargin,
        eval: targetMarginEval,
      },
      {
        label: "Recommended",
        price: recommendedPrice,
        eval: recommendedEval,
      },
    ].map((scenario) => ({
      label: scenario.label,
      price: scenario.price,
      profit: scenario.eval.profit,
      margin: scenario.eval.margin,
      status: getScenarioStatus(scenario.eval.profit, scenario.eval.margin),
    }));

    return {
      variableFeeRate,
      baseCosts,
      shippingSubsidy,
      priceForTargetProfit,
      priceForTargetMargin,
      breakEvenPrice,
      recommendedPrice,
      totalRevenue: recommendedEval.totalRevenue,
      finalValueFee: recommendedEval.finalValueFee,
      promotedFee: recommendedEval.promotedFee,
      totalFees: recommendedEval.totalFees,
      totalCosts: recommendedEval.totalCosts,
      profit: recommendedEval.profit,
      margin: recommendedEval.margin,
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
    promotedListingRate,
    targetProfit,
    targetMargin,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0
      ? "bad"
      : result.margin < 10
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Find a profitable eBay selling price based on item cost, shipping,
          packaging, fees, promoted listing rate, target profit, and target
          margin.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your item costs, buyer shipping charge, eBay fee assumptions,
            and pricing targets to estimate a profitable listing price.
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
                Fee assumptions
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
                  value={promotedListingRate}
                  onChange={setPromotedListingRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Pricing targets
              </h3>

              <div className="space-y-4">
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
            This calculator is an estimate. Actual eBay fees, shipping costs,
            promoted listing fees, refunds, buyer offers, taxes, and category
            rates may affect real profit.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended eBay pricing at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended sale price"
              value={toMoney(result.recommendedPrice)}
              helper="Highest required price from target profit, margin, and break-even"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Profit after item cost, shipping, packaging, and fees"
              tone={profitTone}
            />

            <MetricCard
              label="Estimated margin"
              value={percent(result.margin)}
              helper="Profit divided by total revenue"
              tone={result.margin >= 20 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even sale price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum item price before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Price for target profit"
              value={toMoney(result.priceForTargetProfit)}
              helper="Price needed to reach target dollar profit"
              tone="good"
            />

            <MetricCard
              label="Price for target margin"
              value={toMoney(result.priceForTargetMargin)}
              helper="Price needed to reach target margin percentage"
              tone="good"
            />

            <MetricCard
              label="Estimated total fees"
              value={toMoney(result.totalFees)}
              helper="Final value fee, promoted fee, and fixed order fee"
              tone="warning"
            />

            <MetricCard
              label="Shipping subsidy"
              value={toMoney(result.shippingSubsidy)}
              helper="Shipping cost not covered by buyer shipping charge"
              tone={result.shippingSubsidy > 0 ? "warning" : "blue"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                The recommended item price is{" "}
                <strong>{toMoney(result.recommendedPrice)}</strong>. At that
                price, estimated profit is{" "}
                <strong>{toMoney(result.profit)}</strong> with a margin of{" "}
                <strong>{percent(result.margin)}</strong>.
              </p>

              <p>
                Estimated final value fees are{" "}
                <strong>{toMoney(result.finalValueFee)}</strong>, and promoted
                listing fees are estimated at{" "}
                <strong>{toMoney(result.promotedFee)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Pricing target comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Target</th>
                    <th className="px-4 py-3">Sale price</th>
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
          How to use this eBay Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product costs",
              "Include item cost, shipping paid by you, packaging, and other fulfillment costs.",
            ],
            [
              "Add eBay fees",
              "Enter final value fee, fixed order fee, and promoted listing rate.",
            ],
            [
              "Set pricing targets",
              "Choose the dollar profit and margin percentage you want from the sale.",
            ],
            [
              "Compare scenarios",
              "Review break-even, target profit, target margin, and recommended price options.",
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
            Common eBay pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without accounting for eBay fees.",
              "Ignoring promoted listing rates when calculating target profit.",
              "Forgetting shipping subsidies, packaging, labels, and handling supplies.",
              "Listing too close to break-even without room for offers or returns.",
              "Ignoring recent sold listings when setting the final asking price.",
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
              <strong className="text-emerald-700">Strong:</strong> Your price
              target leaves a strong estimated profit margin.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> Your price
              appears to cover costs, eBay fees, and profit goals.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              price may work, but offers, returns, or ad spend could reduce
              profit quickly.
            </p>

            <p>
              <strong className="text-amber-700">High Price:</strong> The
              recommended price may be difficult to support unless sold comps are
              strong.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Fee or
              margin assumptions may be too high to calculate a usable price.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve eBay pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower sourcing cost",
              "Buy inventory with enough spread between cost and realistic sold prices.",
            ],
            [
              "Reduce shipping burden",
              "Use better package sizing, buyer-paid shipping, or lighter fulfillment materials.",
            ],
            [
              "Control ad spend",
              "Avoid promoted listing rates that erase your target margin.",
            ],
            [
              "Build offer room",
              "Price with enough margin to accept reasonable buyer offers without losing profit.",
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
            ["/ebay/break-even-calculator", "Break-Even Calculator"],
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