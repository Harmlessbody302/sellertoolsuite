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
        : status === "Watch Shipping"
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
        : status === "Watch"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayInternationalShippingCalculatorPage() {
  const [salePrice, setSalePrice] = useState(65);
  const [itemCost, setItemCost] = useState(25);
  const [domesticShippingCharged, setDomesticShippingCharged] = useState(6);
  const [domesticShippingCost, setDomesticShippingCost] = useState(7);
  const [internationalShippingCharged, setInternationalShippingCharged] = useState(28);
  const [internationalShippingCost, setInternationalShippingCost] = useState(34);
  const [packagingCost, setPackagingCost] = useState(2);
  const [handlingCost, setHandlingCost] = useState(3);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedOrderFee, setFixedOrderFee] = useState(0.4);
  const [internationalFeeRate, setInternationalFeeRate] = useState(1.65);
  const [promotedListingRate, setPromotedListingRate] = useState(2);
  const [returnRiskAllowance, setReturnRiskAllowance] = useState(4);

  const result = useMemo(() => {
    const price = Math.max(0, salePrice);
    const cost = Math.max(0, itemCost);
    const domesticCharged = Math.max(0, domesticShippingCharged);
    const domesticCost = Math.max(0, domesticShippingCost);
    const intlCharged = Math.max(0, internationalShippingCharged);
    const intlCost = Math.max(0, internationalShippingCost);
    const packaging = Math.max(0, packagingCost);
    const handling = Math.max(0, handlingCost);
    const feeRate = Math.min(95, Math.max(0, finalValueFeeRate));
    const fixedFee = Math.max(0, fixedOrderFee);
    const intlRate = Math.min(95, Math.max(0, internationalFeeRate));
    const promoRate = Math.min(95, Math.max(0, promotedListingRate));
    const returnRisk = Math.max(0, returnRiskAllowance);

    const domesticRevenue = price + domesticCharged;
    const intlRevenue = price + intlCharged;

    const domesticFees =
      domesticRevenue * (feeRate / 100) +
      fixedFee +
      domesticRevenue * (promoRate / 100);

    const intlFees =
      intlRevenue * (feeRate / 100) +
      fixedFee +
      intlRevenue * (intlRate / 100) +
      intlRevenue * (promoRate / 100);

    const domesticCosts = cost + domesticCost + packaging + domesticFees;
    const intlCosts =
      cost + intlCost + packaging + handling + returnRisk + intlFees;

    const domesticProfit = domesticRevenue - domesticCosts;
    const intlProfit = intlRevenue - intlCosts;

    const profitDifference = intlProfit - domesticProfit;
    const internationalDrag = domesticProfit - intlProfit;
    const domesticMargin =
      domesticRevenue > 0 ? (domesticProfit / domesticRevenue) * 100 : 0;
    const intlMargin = intlRevenue > 0 ? (intlProfit / intlRevenue) * 100 : 0;
    const intlFeeShare = intlRevenue > 0 ? (intlFees / intlRevenue) * 100 : 0;
    const intlCostShare = intlRevenue > 0 ? (intlCosts / intlRevenue) * 100 : 0;
    const shippingGap = intlCharged - intlCost;
    const domesticShippingGap = domesticCharged - domesticCost;
    const extraIntlShippingCost = intlCost - domesticCost;
    const extraIntlFeeCost = intlFees - domesticFees;
    const totalInternationalExtraCost =
      extraIntlShippingCost + handling + returnRisk + extraIntlFeeCost;
    const requiredIntlShippingCharge =
      intlCost + handling + returnRisk + extraIntlFeeCost;
    const breakEvenInternationalShipping =
      intlCost +
      handling +
      returnRisk +
      intlFees +
      cost +
      packaging -
      price;

    const safeInternationalPrice =
      (cost + intlCost + packaging + handling + returnRisk + fixedFee) /
      Math.max(0.01, 1 - feeRate / 100 - intlRate / 100 - promoRate / 100 - 0.25);

    const roiOnItemCost = cost > 0 ? (intlProfit / cost) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "This international eBay order appears workable under the current assumptions.";
    let recommendation =
      "Compare international shipping charge, return risk, buyer location, package value, and item margin before offering international delivery.";

    if (intlProfit <= 0) {
      status = "Losing Money";
      statusText =
        "This international eBay order may not cover item cost, shipping, eBay fees, international fees, packaging, handling, and return risk.";
      recommendation =
        "Raise the shipping charge, use a safer fulfillment option, increase item price, exclude high-risk locations, or avoid international shipping for this item.";
    } else if (intlMargin < 15 || shippingGap < -5) {
      status = "Watch Shipping";
      statusText =
        "This international order is profitable, but shipping drag or fee pressure may be high.";
      recommendation =
        "Check actual label cost, package weight, dimensions, international fee treatment, and return risk before accepting thin-margin international orders.";
    } else if (intlMargin >= 30 && shippingGap >= -2) {
      status = "Strong";
      statusText =
        "This international eBay order appears to leave strong estimated profit after entered costs.";
      recommendation =
        "International shipping may be worth offering on similar items if actual carrier rates, buyer expectations, and return risk stay manageable.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0) return "Losing";
      if (margin < 15) return "Watch";
      if (margin >= 30) return "Strong";
      return "Healthy";
    };

    const shippingScenarios = [20, 25, 30, 35, 40].map((charge) => {
      const revenue = price + charge;
      const fees =
        revenue * (feeRate / 100) +
        fixedFee +
        revenue * (intlRate / 100) +
        revenue * (promoRate / 100);
      const costs = cost + intlCost + packaging + handling + returnRisk + fees;
      const profit = revenue - costs;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      const gap = charge - intlCost;

      return {
        charge,
        revenue,
        fees,
        gap,
        profit,
        margin,
        status: getScenarioStatus(profit, margin),
      };
    });

    const costBreakdown = [
      ["Item cost", cost],
      ["International shipping cost", intlCost],
      ["Packaging cost", packaging],
      ["Handling / prep cost", handling],
      ["eBay + international fees", intlFees],
      ["Return risk allowance", returnRisk],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: intlCosts > 0 ? (Number(amount) / intlCosts) * 100 : 0,
      revenueShare: intlRevenue > 0 ? (Number(amount) / intlRevenue) * 100 : 0,
    }));

    return {
      price,
      cost,
      domesticCharged,
      domesticCost,
      intlCharged,
      intlCost,
      packaging,
      handling,
      feeRate,
      fixedFee,
      intlRate,
      promoRate,
      returnRisk,
      domesticRevenue,
      intlRevenue,
      domesticFees,
      intlFees,
      domesticCosts,
      intlCosts,
      domesticProfit,
      intlProfit,
      profitDifference,
      internationalDrag,
      domesticMargin,
      intlMargin,
      intlFeeShare,
      intlCostShare,
      shippingGap,
      domesticShippingGap,
      extraIntlShippingCost,
      extraIntlFeeCost,
      totalInternationalExtraCost,
      requiredIntlShippingCharge,
      breakEvenInternationalShipping,
      safeInternationalPrice,
      roiOnItemCost,
      status,
      statusText,
      recommendation,
      shippingScenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    itemCost,
    domesticShippingCharged,
    domesticShippingCost,
    internationalShippingCharged,
    internationalShippingCost,
    packagingCost,
    handlingCost,
    finalValueFeeRate,
    fixedOrderFee,
    internationalFeeRate,
    promotedListingRate,
    returnRiskAllowance,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.intlProfit <= 0
      ? "bad"
      : result.intlMargin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay International Shipping Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Compare domestic and international eBay order profitability after
          shipping charges, actual label cost, international fees, handling,
          packaging, return risk, promoted listing costs, and seller expenses.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            International shipping inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, item cost, domestic and international shipping
            amounts, eBay fee assumptions, handling cost, and return risk to
            compare order profitability.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale and item details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Handling / prep cost"
                  prefix="$"
                  value={handlingCost}
                  onChange={setHandlingCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Domestic shipping
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Domestic shipping charged"
                  prefix="$"
                  value={domesticShippingCharged}
                  onChange={setDomesticShippingCharged}
                />

                <NumberInput
                  label="Domestic shipping cost"
                  prefix="$"
                  value={domesticShippingCost}
                  onChange={setDomesticShippingCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                International shipping
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="International shipping charged"
                  prefix="$"
                  value={internationalShippingCharged}
                  onChange={setInternationalShippingCharged}
                />

                <NumberInput
                  label="International shipping cost"
                  prefix="$"
                  value={internationalShippingCost}
                  onChange={setInternationalShippingCost}
                />

                <NumberInput
                  label="Return risk allowance"
                  prefix="$"
                  value={returnRiskAllowance}
                  onChange={setReturnRiskAllowance}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                eBay fee assumptions
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
                  value={fixedOrderFee}
                  onChange={setFixedOrderFee}
                />

                <NumberInput
                  label="International fee rate"
                  suffix="%"
                  value={internationalFeeRate}
                  onChange={setInternationalFeeRate}
                />

                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedListingRate}
                  onChange={setPromotedListingRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay international fees,
            shipping programs, carrier prices, customs, duties, taxes, return
            rules, buyer location, exchange rates, and seller-specific costs may
            vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay international shipping profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="International profit"
              value={toMoney(result.intlProfit)}
              helper="International revenue minus item cost, shipping, fees, handling, and risk"
              tone={profitTone}
            />

            <MetricCard
              label="International margin"
              value={percent(result.intlMargin)}
              helper="International profit divided by international order revenue"
              tone={profitTone}
            />

            <MetricCard
              label="Domestic profit"
              value={toMoney(result.domesticProfit)}
              helper="Estimated profit on comparable domestic order"
              tone={result.domesticProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="International profit difference"
              value={toMoney(result.profitDifference)}
              helper="International profit minus domestic profit"
              tone={result.profitDifference >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="International shipping charged minus actual international shipping cost"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Domestic shipping gap"
              value={toMoney(result.domesticShippingGap)}
              helper="Domestic shipping charged minus domestic shipping cost"
              tone={result.domesticShippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="International revenue"
              value={toMoney(result.intlRevenue)}
              helper="Sale price plus international shipping charged"
              tone="blue"
            />

            <MetricCard
              label="International total costs"
              value={toMoney(result.intlCosts)}
              helper="Item, shipping, fees, packaging, handling, and risk"
              tone="warning"
            />

            <MetricCard
              label="International eBay fees"
              value={toMoney(result.intlFees)}
              helper="Final value, fixed, international, and promoted fees"
              tone="warning"
            />

            <MetricCard
              label="International fee share"
              value={percent(result.intlFeeShare)}
              helper="International fees divided by order revenue"
              tone="warning"
            />

            <MetricCard
              label="Extra international shipping cost"
              value={toMoney(result.extraIntlShippingCost)}
              helper="International label cost minus domestic label cost"
              tone="warning"
            />

            <MetricCard
              label="Extra international fee cost"
              value={toMoney(result.extraIntlFeeCost)}
              helper="International fees minus domestic fees"
              tone="warning"
            />

            <MetricCard
              label="Required shipping charge"
              value={toMoney(result.requiredIntlShippingCharge)}
              helper="Approximate shipping charge needed to cover international extras"
              tone="blue"
            />

            <MetricCard
              label="Break-even shipping charge"
              value={toMoney(result.breakEvenInternationalShipping)}
              helper="Approximate international shipping charge needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Safe international item price"
              value={toMoney(result.safeInternationalPrice)}
              helper="Approximate item price needed for 25% international margin"
              tone="good"
            />

            <MetricCard
              label="ROI on item cost"
              value={percent(result.roiOnItemCost)}
              helper="International profit divided by item cost"
              tone={result.roiOnItemCost > 40 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your domestic order estimate produces{" "}
                <strong>{toMoney(result.domesticProfit)}</strong> in profit.
                The international order estimate produces{" "}
                <strong>{toMoney(result.intlProfit)}</strong>, a difference of{" "}
                <strong>{toMoney(result.profitDifference)}</strong>.
              </p>

              <p>
                You charged <strong>{toMoney(result.intlCharged)}</strong> for
                international shipping, while estimated international shipping
                cost is <strong>{toMoney(result.intlCost)}</strong>. That creates
                a shipping gap of{" "}
                <strong>{toMoney(result.shippingGap)}</strong>.
              </p>

              <p>
                International eBay fees are estimated at{" "}
                <strong>{toMoney(result.intlFees)}</strong>, or{" "}
                <strong>{percent(result.intlFeeShare)}</strong> of international
                order revenue.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              International shipping charge comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Charge</th>
                    <th className="px-4 py-3">Gap</th>
                    <th className="px-4 py-3">Fees</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.shippingScenarios.map((row) => (
                    <tr
                      key={row.charge}
                      className={
                        row.charge === result.intlCharged
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{toMoney(row.charge)}</td>
                      <td className="px-4 py-3">{toMoney(row.gap)}</td>
                      <td className="px-4 py-3">{toMoney(row.fees)}</td>
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
          How to use this eBay International Shipping Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale details",
              "Add item price, item cost, packaging, and handling or prep cost.",
            ],
            [
              "Compare shipping",
              "Enter domestic and international shipping charged and actual label costs.",
            ],
            [
              "Include eBay fees",
              "Add final value fee, fixed fee, international fee, and promoted listing rate.",
            ],
            [
              "Review margin",
              "Compare domestic and international profit before offering international shipping.",
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
            eBay international shipping cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the estimated
            international order.
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
                  <p>{percent(item.share)} of international costs</p>
                  <p>{percent(item.revenueShare)} of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay international shipping mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Offering international shipping without checking actual label cost by destination.",
              "Ignoring international fees, promoted listing fees, or currency-related costs.",
              "Charging domestic-style shipping on heavy or bulky international packages.",
              "Forgetting return risk, buyer expectations, customs delays, or damaged item risk.",
              "Comparing international orders to domestic profit without including extra costs.",
              "Offering international shipping on low-margin items that cannot absorb shipping gaps.",
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
            Understanding your international shipping results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The
              international order appears to leave strong estimated profit after
              entered costs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              international order appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Watch Shipping:</strong>{" "}
              International profit may be sensitive to shipping gaps, fees,
              handling cost, or return risk.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              international order may not cover shipping, fees, item cost,
              packaging, handling, and risk.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item sale price, item cost, packaging, and handling cost.",
              "Domestic shipping charged and actual domestic shipping cost.",
              "International shipping charged and actual international label cost.",
              "eBay final value fee, fixed fee, international fee, and promoted listing rate.",
              "Return risk, customs complexity, buyer location, and delivery reliability.",
              "Domestic profit comparison so international orders are not judged in isolation.",
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
          Ways to improve eBay international shipping profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Charge enough shipping",
              "Compare actual carrier rates by weight, dimensions, destination, and service level.",
            ],
            [
              "Choose safer items",
              "Offer international shipping on higher-margin, durable, easy-to-pack items first.",
            ],
            [
              "Protect margin",
              "Build handling, packaging, return risk, and fee pressure into pricing before listing.",
            ],
            [
              "Review destinations",
              "Limit or adjust international shipping for locations with high delivery cost or issue risk.",
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
            ["/ebay/shipping-profit-calculator", "Shipping Profit Calculator"],
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/fee-calculator", "Fee Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
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