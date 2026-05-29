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
        : status === "Thin Margin" || status === "Shipping Drag"
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
        : status === "Thin"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayShippingProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(6);
  const [actualShippingCost, setActualShippingCost] = useState(8);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [itemCost, setItemCost] = useState(18);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedFee, setFixedFee] = useState(0.4);
  const [promotedListingRate, setPromotedListingRate] = useState(0);

  const result = useMemo(() => {
    const totalRevenue = salePrice + shippingCharged;
    const finalValueFee = totalRevenue * (finalValueFeeRate / 100);
    const promotedFee = totalRevenue * (promotedListingRate / 100);
    const totalFees = finalValueFee + promotedFee + fixedFee;

    const totalCosts =
      itemCost + actualShippingCost + packagingCost + totalFees;

    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const shippingDifference = shippingCharged - actualShippingCost;
    const shippingLabel =
      shippingDifference < 0 ? "Shipping loss absorbed" : "Shipping surplus";

    const fulfillmentCosts = actualShippingCost + packagingCost;
    const shippingAndPackagingGap = shippingCharged - fulfillmentCosts;

    const breakEvenShipping = Math.max(
      0,
      actualShippingCost + packagingCost + itemCost + totalFees - salePrice,
    );

    const freeShippingRevenue = salePrice;
    const freeShippingFees =
      freeShippingRevenue * ((finalValueFeeRate + promotedListingRate) / 100) +
      fixedFee;
    const freeShippingProfit =
      freeShippingRevenue -
      itemCost -
      actualShippingCost -
      packagingCost -
      freeShippingFees;

    let status = "Healthy";
    let statusText =
      "Your eBay shipping setup appears sustainable and leaves a workable margin.";
    let recommendation =
      "This shipping structure looks workable. Keep monitoring label costs, packaging costs, and promoted listing fees.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This setup is losing money after shipping, item cost, packaging, and eBay fees.";
      recommendation =
        "Consider raising price, charging more shipping, reducing shipping cost, or avoiding promotion on this item.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This setup is profitable, but shipping and fees are leaving a thin margin.";
      recommendation =
        "Small cost changes could erase profit. Consider raising price or using a more profitable shipping strategy.";
    } else if (shippingDifference < 0 && margin < 25) {
      status = "Shipping Drag";
      statusText =
        "The sale is profitable, but you are absorbing part of the shipping cost.";
      recommendation =
        "Make sure the sale price is high enough to cover the shipping subsidy and still leave acceptable profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "Shipping costs are well covered by your pricing, and profitability remains strong.";
      recommendation =
        "This setup looks strong. You may be able to test free shipping, promoted listings, or higher volume safely.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioMargin < 10) return "Thin";
      if (scenarioMargin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [
      { label: "Free shipping", charge: 0 },
      { label: "$5 flat", charge: 5 },
      { label: "Current", charge: shippingCharged },
      { label: "$10 flat", charge: 10 },
    ].map((scenario) => {
      const scenarioRevenue = salePrice + scenario.charge;
      const scenarioFinalValueFee =
        scenarioRevenue * (finalValueFeeRate / 100);
      const scenarioPromotedFee =
        scenarioRevenue * (promotedListingRate / 100);
      const scenarioFees =
        scenarioFinalValueFee + scenarioPromotedFee + fixedFee;
      const scenarioCosts =
        itemCost + actualShippingCost + packagingCost + scenarioFees;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;
      const scenarioShippingGap = scenario.charge - actualShippingCost;

      return {
        ...scenario,
        profit: scenarioProfit,
        margin: scenarioMargin,
        shippingGap: scenarioShippingGap,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    return {
      totalRevenue,
      finalValueFee,
      promotedFee,
      totalFees,
      totalCosts,
      profit,
      margin,
      shippingDifference,
      shippingLabel,
      shippingAndPackagingGap,
      fulfillmentCosts,
      breakEvenShipping,
      freeShippingProfit,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    actualShippingCost,
    packagingCost,
    itemCost,
    finalValueFeeRate,
    fixedFee,
    promotedListingRate,
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
          eBay Shipping Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Compare free shipping, flat-rate shipping, buyer-paid shipping, and
          fulfillment cost impact on eBay profit.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Shipping inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your listing price, buyer shipping charge, actual shipping
            cost, packaging cost, item cost, and eBay fee assumptions.
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
                Fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Actual shipping cost"
                  prefix="$"
                  value={actualShippingCost}
                  onChange={setActualShippingCost}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
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
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator estimates eBay shipping profitability. Actual
            shipping costs may vary due to carrier rate changes, package weight,
            dimensional pricing, insurance, refunds, replacements, returns, and
            account-specific fees.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated shipping-adjusted profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Revenue minus shipping, item cost, packaging, and fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Profit divided by total revenue"
              tone={profitTone}
            />

            <MetricCard
              label={result.shippingLabel}
              value={toMoney(Math.abs(result.shippingDifference))}
              helper={
                result.shippingDifference < 0
                  ? "Shipping cost not covered by buyer charge"
                  : "Buyer shipping charge above actual label cost"
              }
              tone={result.shippingDifference < 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Break-even shipping charge"
              value={
                result.breakEvenShipping === 0
                  ? "$0.00"
                  : toMoney(result.breakEvenShipping)
              }
              helper="Shipping charge needed to avoid losing money"
              tone="blue"
            />

            <MetricCard
              label="Free shipping profit"
              value={toMoney(result.freeShippingProfit)}
              helper="Estimated profit if buyer shipping charge is $0"
              tone={result.freeShippingProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Fulfillment costs"
              value={toMoney(result.fulfillmentCosts)}
              helper="Actual shipping plus packaging cost"
              tone="warning"
            />

            <MetricCard
              label="Total fees"
              value={toMoney(result.totalFees)}
              helper="Final value, promoted listing, and fixed fees"
              tone="warning"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Item, shipping, packaging, and fees"
            />

            <MetricCard
              label="Shipping + packaging gap"
              value={toMoney(result.shippingAndPackagingGap)}
              helper="Buyer shipping charge minus shipping and packaging cost"
              tone={result.shippingAndPackagingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Promoted fee"
              value={toMoney(result.promotedFee)}
              helper="Estimated promoted listing fee"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your total revenue is{" "}
                <strong>{toMoney(result.totalRevenue)}</strong> and your total
                cost is <strong>{toMoney(result.totalCosts)}</strong>, leaving
                estimated profit of <strong>{toMoney(result.profit)}</strong>.
              </p>

              {result.shippingDifference < 0 ? (
                <p>
                  You are absorbing{" "}
                  <strong>
                    {toMoney(Math.abs(result.shippingDifference))}
                  </strong>{" "}
                  of the shipping label cost inside your sale price or margin.
                </p>
              ) : (
                <p>
                  Your buyer shipping charge covers the label cost with{" "}
                  <strong>{toMoney(result.shippingDifference)}</strong> left
                  over before packaging and other selling costs.
                </p>
              )}

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Shipping strategy comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Strategy</th>
                    <th className="px-4 py-3">Charge</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Ship gap</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Current" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.charge)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.margin)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.shippingGap)}
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
          How to use this eBay Shipping Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing price",
              "Add the item price before any separate buyer-paid shipping charge.",
            ],
            [
              "Add shipping costs",
              "Enter actual postage, label, packaging, and fulfillment costs.",
            ],
            [
              "Include eBay fees",
              "Add final value fee, fixed order fee, and promoted listing rate if used.",
            ],
            [
              "Compare strategies",
              "Review free shipping, flat-rate shipping, and current shipping charge scenarios.",
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
            Common eBay shipping profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Offering free shipping without raising the item price enough.",
              "Ignoring packaging, labels, tape, inserts, and shipping supplies.",
              "Using old carrier rates after postage increases.",
              "Forgetting dimensional weight or oversized package charges.",
              "Scaling ads on listings with weak shipping-adjusted profit.",
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
            Understanding your shipping results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Shipping and
              fulfillment costs are well covered with healthy profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The setup
              appears profitable, but costs should still be monitored.
            </p>

            <p>
              <strong className="text-amber-700">Shipping Drag:</strong> You are
              subsidizing shipping and may need a higher item price.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              listing is profitable, but shipping costs leave little room for
              discounts, refunds, or ads.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The setup
              does not cover item cost, shipping, packaging, and fees.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve eBay shipping profitability
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise item price",
              "Build shipping subsidies into the item price when offering free or reduced shipping.",
            ],
            [
              "Reduce package weight",
              "Use lighter packaging, better box sizes, and lower-cost fulfillment methods where possible.",
            ],
            [
              "Review carrier rates",
              "Compare current postage costs and update pricing when shipping rates change.",
            ],
            [
              "Bundle carefully",
              "Use bundles to spread shipping cost across a larger order value and improve margin.",
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