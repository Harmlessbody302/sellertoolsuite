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

export default function EbayPromotedListingROICalculatorPage() {
  const [monthlySales, setMonthlySales] = useState(40);
  const [salePrice, setSalePrice] = useState(45);
  const [profitPerOrder, setProfitPerOrder] = useState(16);
  const [promotedRate, setPromotedRate] = useState(5);
  const [promotedSalesShare, setPromotedSalesShare] = useState(50);
  const [extraOrdersFromPromotion, setExtraOrdersFromPromotion] = useState(8);

  const result = useMemo(() => {
    const promotedOrders = monthlySales * (promotedSalesShare / 100);
    const promotedFeePerOrder = salePrice * (promotedRate / 100);
    const monthlyPromotedFees = promotedOrders * promotedFeePerOrder;

    const extraGrossProfit = extraOrdersFromPromotion * profitPerOrder;
    const netPromotionProfit = extraGrossProfit - monthlyPromotedFees;

    const roi =
      monthlyPromotedFees > 0
        ? (netPromotionProfit / monthlyPromotedFees) * 100
        : 0;

    const breakEvenExtraOrders =
      profitPerOrder > 0
        ? Math.ceil(monthlyPromotedFees / profitPerOrder)
        : 0;

    const adjustedProfitPerPromotedOrder =
      profitPerOrder - promotedFeePerOrder;

    const totalPromotedRevenue = promotedOrders * salePrice;
    const promotedFeeShareOfRevenue =
      totalPromotedRevenue > 0
        ? (monthlyPromotedFees / totalPromotedRevenue) * 100
        : 0;

    const extraOrdersNeededBeyondCurrent = Math.max(
      0,
      breakEvenExtraOrders - extraOrdersFromPromotion,
    );

    let status = "Healthy";
    let statusText =
      "Your promoted listing assumptions appear profitable after ad fees.";
    let recommendation =
      "This promoted listing rate may be workable if the extra orders are truly coming from promotion.";

    if (netPromotionProfit <= 0) {
      status = "Losing Money";
      statusText =
        "Promoted listing fees may be costing more than the extra profit they generate.";
      recommendation =
        "Lower the promoted listing rate, improve listing conversion, or pause promotion until the listing is more profitable.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText = "Promotion is profitable, but the return is weak.";
      recommendation =
        "Consider testing a lower promoted rate or only promoting listings with stronger margins.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "Promotion appears to be generating strong return based on your assumptions.";
      recommendation =
        "This listing may be a good candidate for continued promotion, but monitor performance regularly.";
    }

    const getScenarioStatus = (net: number, scenarioRoi: number) => {
      if (net <= 0) return "Losing Money";
      if (scenarioRoi < 25) return "Low ROI";
      if (scenarioRoi >= 100) return "Strong";
      return "Healthy";
    };

    const scenarios = [2, 5, 8, 10, 12].map((scenarioRate) => {
      const feePerOrder = salePrice * (scenarioRate / 100);
      const fees = promotedOrders * feePerOrder;
      const net = extraGrossProfit - fees;
      const scenarioRoi = fees > 0 ? (net / fees) * 100 : 0;

      return {
        rate: scenarioRate,
        fees,
        net,
        roi: scenarioRoi,
        profitPerPromotedOrder: profitPerOrder - feePerOrder,
        status: getScenarioStatus(net, scenarioRoi),
      };
    });

    return {
      promotedOrders,
      promotedFeePerOrder,
      monthlyPromotedFees,
      totalPromotedRevenue,
      promotedFeeShareOfRevenue,
      extraGrossProfit,
      netPromotionProfit,
      roi,
      breakEvenExtraOrders,
      extraOrdersNeededBeyondCurrent,
      adjustedProfitPerPromotedOrder,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlySales,
    salePrice,
    profitPerOrder,
    promotedRate,
    promotedSalesShare,
    extraOrdersFromPromotion,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;
  const number = (value: number) => value.toLocaleString("en-US");

  const roiTone =
    result.netPromotionProfit <= 0
      ? "bad"
      : result.roi < 25
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Promoted Listing ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether eBay promoted listings are increasing profit or
          quietly reducing your margins after promoted listing fees.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Promotion inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your monthly order volume, listing profit, promoted listing
            rate, attributed order share, and estimated extra orders caused by
            promotion.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Listing performance
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly orders"
                  value={monthlySales}
                  onChange={setMonthlySales}
                />

                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Profit per order before promotion"
                  prefix="$"
                  value={profitPerOrder}
                  onChange={setProfitPerOrder}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Promotion assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedRate}
                  onChange={setPromotedRate}
                />

                <NumberInput
                  label="Orders affected by promotion"
                  suffix="%"
                  value={promotedSalesShare}
                  onChange={setPromotedSalesShare}
                />

                <NumberInput
                  label="Extra orders from promotion"
                  value={extraOrdersFromPromotion}
                  onChange={setExtraOrdersFromPromotion}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. eBay attribution, promoted listing
            rates, buyer behavior, organic ranking, fees, returns, and listing
            conversion can affect actual promotion results.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated promoted listing profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net promotion profit"
              value={toMoney(result.netPromotionProfit)}
              helper="Extra gross profit minus promoted listing fees"
              tone={roiTone}
            />

            <MetricCard
              label="Promotion ROI"
              value={percent(result.roi)}
              helper="Net promotion profit divided by ad fees"
              tone={roiTone}
            />

            <MetricCard
              label="Monthly promoted fees"
              value={toMoney(result.monthlyPromotedFees)}
              helper="Estimated promoted listing fees for attributed orders"
              tone="warning"
            />

            <MetricCard
              label="Extra gross profit"
              value={toMoney(result.extraGrossProfit)}
              helper="Extra orders multiplied by profit per order"
              tone="blue"
            />

            <MetricCard
              label="Break-even extra orders"
              value={`${number(result.breakEvenExtraOrders)} orders`}
              helper="Extra orders needed to cover promoted listing fees"
              tone="warning"
            />

            <MetricCard
              label="Extra orders still needed"
              value={`${number(result.extraOrdersNeededBeyondCurrent)} orders`}
              helper="Additional extra orders needed beyond current estimate"
              tone={
                result.extraOrdersNeededBeyondCurrent > 0 ? "warning" : "good"
              }
            />

            <MetricCard
              label="Fee per promoted order"
              value={toMoney(result.promotedFeePerOrder)}
              helper="Sale price multiplied by promoted listing rate"
              tone="warning"
            />

            <MetricCard
              label="Profit after promo fee"
              value={toMoney(result.adjustedProfitPerPromotedOrder)}
              helper="Profit per order after promoted fee"
              tone={
                result.adjustedProfitPerPromotedOrder > 0 ? "good" : "bad"
              }
            />

            <MetricCard
              label="Promoted orders"
              value={`${number(Number(result.promotedOrders.toFixed(1)))} orders`}
              helper="Orders estimated to be affected by promotion"
            />

            <MetricCard
              label="Promoted fee share"
              value={percent(result.promotedFeeShareOfRevenue)}
              helper="Promoted fees divided by promoted revenue"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Estimated promoted listing fees are{" "}
                <strong>{toMoney(result.monthlyPromotedFees)}</strong>. The
                extra orders from promotion generate about{" "}
                <strong>{toMoney(result.extraGrossProfit)}</strong> in gross
                profit, leaving{" "}
                <strong>{toMoney(result.netPromotionProfit)}</strong> after
                promoted listing fees.
              </p>

              <p>
                You need about{" "}
                <strong>{number(result.breakEvenExtraOrders)}</strong> extra
                orders from promotion to break even on the promoted listing fees
                entered.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Promoted rate comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Promo rate</th>
                    <th className="px-4 py-3">Fees</th>
                    <th className="px-4 py-3">Net profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">Profit/order</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === promotedRate ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">{toMoney(row.fees)}</td>
                      <td className="px-4 py-3">{toMoney(row.net)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.profitPerPromotedOrder)}
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
          How to use this eBay Promoted Listing ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing volume",
              "Add monthly orders for the listing, product type, or group of similar listings.",
            ],
            [
              "Add profit per order",
              "Use profit before promoted listing fees so the calculator can estimate ad drag.",
            ],
            [
              "Estimate promotion impact",
              "Enter promoted order share and the extra orders you believe promotion caused.",
            ],
            [
              "Compare rates",
              "Review multiple promoted listing rates before increasing ad percentage.",
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
            Common promoted listing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Counting all promoted sales as extra sales instead of estimating incremental orders.",
              "Using a high promoted listing rate on listings with thin margins.",
              "Ignoring whether promotion is replacing organic sales rather than adding new sales.",
              "Increasing ad rate before improving photos, title, pricing, and conversion.",
              "Not comparing promoted listing fees against profit per order.",
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
            Understanding promoted listing ROI
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Promotion
              appears to generate a strong return after ad fees.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Promotion
              appears profitable, but should still be monitored against organic
              sales.
            </p>

            <p>
              <strong className="text-amber-700">Low ROI:</strong> Promotion is
              profitable, but the return may be too weak for scaling.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Promoted
              listing fees may exceed the additional profit created by extra
              orders.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve promoted listing ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower ad rate",
              "Test smaller promoted listing rates before raising spend aggressively.",
            ],
            [
              "Improve conversion",
              "Upgrade photos, titles, pricing, and item specifics so traffic converts better.",
            ],
            [
              "Promote winners",
              "Focus promotion on listings with strong margins, proven demand, and good conversion.",
            ],
            [
              "Track incrementality",
              "Compare promoted performance against organic sales to avoid overcounting ad impact.",
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
            ["/ebay/break-even-calculator", "Break-Even Calculator"],
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