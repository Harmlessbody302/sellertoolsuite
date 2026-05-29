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

export default function EbayProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [itemCost, setItemCost] = useState(18);
  const [shippingCharged, setShippingCharged] = useState(6);
  const [shippingCost, setShippingCost] = useState(8);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedFee, setFixedFee] = useState(0.4);
  const [promotedListingRate, setPromotedListingRate] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);

  const result = useMemo(() => {
    const totalRevenue = salePrice + shippingCharged;

    const finalValueFee = totalRevenue * (finalValueFeeRate / 100);
    const promotedFee = totalRevenue * (promotedListingRate / 100);
    const totalFees = finalValueFee + fixedFee + promotedFee;

    const totalCosts =
      itemCost + shippingCost + packagingCost + totalFees + otherCosts;

    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = itemCost > 0 ? (profit / itemCost) * 100 : 0;

    const breakEvenPrice = totalCosts - shippingCharged;
    const shippingDifference = shippingCharged - shippingCost;

    let status = "Healthy";
    let statusText =
      "This sale appears profitable after estimated eBay fees, shipping, packaging, and item cost.";
    let recommendation =
      "This listing looks workable. Keep watching shipping costs and promoted listing fees so they do not quietly reduce margin.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This sale is losing money or breaking even after estimated costs.";
      recommendation =
        "Raise the sale price, reduce item cost, adjust shipping, or lower promoted listing spend before scaling this listing.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText = "This sale is profitable, but the margin is thin.";
      recommendation =
        "Small changes in shipping, returns, or fees could erase profit. Consider raising price or reducing costs.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This sale has a strong estimated margin after costs and fees.";
      recommendation =
        "This item may be a good candidate to source again, promote carefully, or use as a model for similar listings.";
    }

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioPrice = Math.max(0, salePrice + change);
      const scenarioRevenue = scenarioPrice + shippingCharged;
      const scenarioFinalValueFee =
        scenarioRevenue * (finalValueFeeRate / 100);
      const scenarioPromotedFee =
        scenarioRevenue * (promotedListingRate / 100);
      const scenarioFees =
        scenarioFinalValueFee + fixedFee + scenarioPromotedFee;
      const scenarioCosts =
        itemCost +
        shippingCost +
        packagingCost +
        scenarioFees +
        otherCosts;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      let scenarioStatus = "Healthy";
      if (scenarioProfit <= 0) scenarioStatus = "Losing";
      else if (scenarioMargin < 10) scenarioStatus = "Thin";
      else if (scenarioMargin >= 30) scenarioStatus = "Strong";

      return {
        change,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
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
      roi,
      breakEvenPrice,
      shippingDifference,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    itemCost,
    shippingCharged,
    shippingCost,
    packagingCost,
    finalValueFeeRate,
    fixedFee,
    promotedListingRate,
    otherCosts,
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
          eBay Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate eBay profit after item cost, shipping, packaging, final value
          fees, fixed fees, promoted listing fees, and other selling costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your sale price, item cost, shipping, packaging, fees, and
            optional promoted listing costs to estimate real eBay profit.
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
                  label="Other costs"
                  prefix="$"
                  value={otherCosts}
                  onChange={setOtherCosts}
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
            This calculator is an estimate. Actual eBay costs may vary due to
            category fees, promoted listings, shipping adjustments, refunds,
            returns, taxes, and account-specific charges.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay profit breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Revenue minus costs and estimated fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Profit divided by total revenue"
              tone={profitTone}
            />

            <MetricCard
              label="ROI on item cost"
              value={percent(result.roi)}
              helper="Profit divided by item cost"
              tone={result.roi > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Total revenue"
              value={toMoney(result.totalRevenue)}
              helper="Sale price plus buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Total fees"
              value={toMoney(result.totalFees)}
              helper="Final value, fixed, and promoted listing fees"
              tone="warning"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Item, shipping, packaging, fees, and other costs"
            />

            <MetricCard
              label={
                result.shippingDifference < 0
                  ? "Shipping loss absorbed"
                  : "Shipping surplus"
              }
              value={toMoney(Math.abs(result.shippingDifference))}
              helper={
                result.shippingDifference < 0
                  ? "Shipping cost not covered by buyer charge"
                  : "Buyer shipping charge above actual shipping cost"
              }
              tone={result.shippingDifference < 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Break-even sale price"
              value={toMoney(Math.max(0, result.breakEvenPrice))}
              helper="Approximate price needed before profit starts"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This sale brings in{" "}
                <strong>{toMoney(result.totalRevenue)}</strong> in total
                revenue and has estimated total costs of{" "}
                <strong>{toMoney(result.totalCosts)}</strong>, leaving estimated
                profit of <strong>{toMoney(result.profit)}</strong>.
              </p>

              <p>
                Estimated eBay final value fees are{" "}
                <strong>{toMoney(result.finalValueFee)}</strong>, and promoted
                listing fees are{" "}
                <strong>{toMoney(result.promotedFee)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Price scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Price change</th>
                    <th className="px-4 py-3">Sale price</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.change}
                      className={
                        row.change === 0 ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">
                        {row.change === 0
                          ? "Current"
                          : `${row.change > 0 ? "+" : ""}${toMoney(row.change)}`}
                      </td>
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
          How to use this eBay Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale revenue",
              "Add your sale price and any shipping amount charged to the buyer.",
            ],
            [
              "Add item costs",
              "Include sourcing cost, shipping paid by you, packaging, and extra selling costs.",
            ],
            [
              "Include eBay fees",
              "Enter final value fee, fixed order fee, and promoted listing rate.",
            ],
            [
              "Review scenarios",
              "Compare profit at lower and higher sale prices before listing.",
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
            Common eBay profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale revenue as profit before subtracting costs and fees.",
              "Forgetting promoted listing fees when estimating margin.",
              "Ignoring shipping losses when buyer-paid shipping is too low.",
              "Leaving out packaging, labels, supplies, returns, or other selling costs.",
              "Scaling listings with thin margins before checking price sensitivity.",
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
            Understanding your profit results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Profit margin
              is healthy enough to support repeat sourcing or careful promotion.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The sale
              appears profitable after estimated costs and eBay fees.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The sale
              is profitable, but returns, offers, or shipping changes could erase
              profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The sale
              does not cover all entered costs and fees.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve eBay profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise sale price",
              "Use recent sold comps to test whether a higher price is realistic.",
            ],
            [
              "Lower sourcing cost",
              "Buy inventory with enough spread between purchase cost and sale price.",
            ],
            [
              "Control shipping",
              "Reduce package weight, improve box sizing, or adjust buyer shipping charges.",
            ],
            [
              "Limit ad drag",
              "Avoid promoted listing rates that increase sales but weaken net profit.",
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
            ["/ebay/fee-calculator", "Fee Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
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