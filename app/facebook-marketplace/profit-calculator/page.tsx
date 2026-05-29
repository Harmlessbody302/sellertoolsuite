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

export default function FacebookMarketplaceProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(80);
  const [itemCost, setItemCost] = useState(35);
  const [shippingCharged, setShippingCharged] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);

  const result = useMemo(() => {
    const price = Math.max(0, salePrice);
    const cost = Math.max(0, itemCost);
    const chargedShipping = Math.max(0, shippingCharged);
    const actualShipping = Math.max(0, shippingCost);
    const delivery = Math.max(0, deliveryCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, platformFeeRate));
    const other = Math.max(0, otherCosts);

    const revenue = price + chargedShipping;
    const platformFee = revenue * (feeRate / 100);
    const fulfillmentCost = actualShipping + delivery + packaging;
    const totalCosts = cost + fulfillmentCost + platformFee + other;

    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const breakEvenSalePrice = Math.max(0, totalCosts - chargedShipping);

    const feeShare = revenue > 0 ? (platformFee / revenue) * 100 : 0;
    const costShare = revenue > 0 ? (totalCosts / revenue) * 100 : 0;
    const fulfillmentShare =
      revenue > 0 ? (fulfillmentCost / revenue) * 100 : 0;
    const shippingGap = chargedShipping - actualShipping;
    const revenueKeptAfterFulfillmentAndFees =
      revenue > 0
        ? ((revenue - platformFee - fulfillmentCost - other) / revenue) * 100
        : 0;
    const profitBeforeDelivery = profit + delivery;
    const profitBeforeShippingCost = profit + actualShipping;
    const profitBeforePlatformFee = profit + platformFee;

    let status = "Healthy";
    let statusText =
      "This Facebook Marketplace sale appears profitable after item cost and fulfillment costs.";
    let recommendation =
      "This listing looks workable. Compare against similar local listings before accepting offers.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This sale may lose money after item cost, delivery, shipping, packaging, and other costs.";
      recommendation =
        "Raise your price, reduce delivery or shipping costs, charge more for fulfillment, or avoid accepting offers below your break-even point.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This sale is profitable, but the margin is thin.";
      recommendation =
        "Be careful with buyer negotiation, delivery promises, extra driving, and discounts because small changes could erase profit.";
    } else if (margin >= 35) {
      status = "Strong";
      statusText =
        "This sale has a strong estimated margin.";
      recommendation =
        "This item may have room for negotiation, local delivery, or price flexibility if local demand supports the sale price.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing";
      if (scenarioMargin < 15) return "Thin";
      if (scenarioMargin >= 35) return "Strong";
      return "Healthy";
    };

    const scenarios = [-20, -10, 0, 10, 20].map((change) => {
      const scenarioPrice = Math.max(0, price + change);
      const scenarioRevenue = scenarioPrice + chargedShipping;
      const scenarioFee = scenarioRevenue * (feeRate / 100);
      const scenarioCosts =
        cost + actualShipping + delivery + packaging + scenarioFee + other;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        change,
        price: scenarioPrice,
        revenue: scenarioRevenue,
        platformFee: scenarioFee,
        totalCosts: scenarioCosts,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Item cost", cost],
      ["Actual shipping cost", actualShipping],
      ["Delivery / fuel cost", delivery],
      ["Packaging cost", packaging],
      ["Platform fee", platformFee],
      ["Other selling costs", other],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: totalCosts > 0 ? (Number(amount) / totalCosts) * 100 : 0,
      revenueShare: revenue > 0 ? (Number(amount) / revenue) * 100 : 0,
    }));

    return {
      price,
      cost,
      chargedShipping,
      actualShipping,
      delivery,
      packaging,
      feeRate,
      other,
      revenue,
      platformFee,
      fulfillmentCost,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenSalePrice,
      feeShare,
      costShare,
      fulfillmentShare,
      shippingGap,
      revenueKeptAfterFulfillmentAndFees,
      profitBeforeDelivery,
      profitBeforeShippingCost,
      profitBeforePlatformFee,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    itemCost,
    shippingCharged,
    shippingCost,
    deliveryCost,
    packagingCost,
    platformFeeRate,
    otherCosts,
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
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Facebook Marketplace Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Facebook Marketplace profit from local pickup, delivery, or
          shipped sales after item cost, shipping, delivery, fuel, packaging,
          platform fees, and other selling expenses.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, item cost, buyer-paid shipping, actual shipping,
            delivery, packaging, marketplace fee rate, and other costs to
            estimate real Facebook Marketplace profit.
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

                <NumberInput
                  label="Platform fee rate"
                  suffix="%"
                  value={platformFeeRate}
                  onChange={setPlatformFeeRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Item and fulfillment costs
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
                  label="Delivery / fuel cost"
                  prefix="$"
                  value={deliveryCost}
                  onChange={setDeliveryCost}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Other selling costs"
                  prefix="$"
                  value={otherCosts}
                  onChange={setOtherCosts}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Facebook Marketplace fees,
            buyer negotiation, shipping costs, local delivery costs, fuel costs,
            payment processing, cancellations, returns, taxes, and item-specific
            costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Facebook Marketplace profit breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Revenue minus item cost, fulfillment, fees, and other costs"
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
              label="Break-even sale price"
              value={toMoney(result.breakEvenSalePrice)}
              helper="Approximate sale price needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Total revenue"
              value={toMoney(result.revenue)}
              helper="Sale price plus buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Sale price"
              value={toMoney(result.price)}
              helper="Entered Facebook Marketplace sale price"
              tone="blue"
            />

            <MetricCard
              label="Shipping charged"
              value={toMoney(result.chargedShipping)}
              helper="Shipping amount paid by buyer"
              tone="blue"
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="Buyer shipping charge minus actual shipping cost"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Fulfillment costs"
              value={toMoney(result.fulfillmentCost)}
              helper="Actual shipping, delivery, fuel, and packaging"
              tone="warning"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Item cost, fulfillment, platform fee, and other costs"
            />

            <MetricCard
              label="Platform fee"
              value={toMoney(result.platformFee)}
              helper="Estimated fee based on total revenue"
              tone={result.platformFee > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Platform fee share"
              value={percent(result.feeShare)}
              helper="Platform fee divided by total revenue"
              tone={result.feeShare > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Cost share"
              value={percent(result.costShare)}
              helper="Total costs divided by total revenue"
              tone={result.costShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Fulfillment share"
              value={percent(result.fulfillmentShare)}
              helper="Shipping, delivery, fuel, and packaging divided by revenue"
              tone={result.fulfillmentShare < 20 ? "good" : "warning"}
            />

            <MetricCard
              label="Profit before delivery"
              value={toMoney(result.profitBeforeDelivery)}
              helper="Estimated profit if delivery or fuel cost were not included"
              tone="blue"
            />

            <MetricCard
              label="Revenue kept after fees"
              value={percent(result.revenueKeptAfterFulfillmentAndFees)}
              helper="Revenue after fulfillment, fees, and other non-item costs"
              tone={
                result.revenueKeptAfterFulfillmentAndFees >= 70
                  ? "good"
                  : "warning"
              }
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This sale brings in{" "}
                <strong>{toMoney(result.revenue)}</strong> in total revenue and
                has estimated total costs of{" "}
                <strong>{toMoney(result.totalCosts)}</strong>, leaving estimated
                profit of <strong>{toMoney(result.profit)}</strong>.
              </p>

              <p>
                Your estimated break-even sale price is{" "}
                <strong>{toMoney(result.breakEvenSalePrice)}</strong>. Offers
                below this point may not cover item cost, delivery, shipping,
                packaging, and fees.
              </p>

              <p>
                Fulfillment costs are estimated at{" "}
                <strong>{toMoney(result.fulfillmentCost)}</strong>. Delivery and
                shipping choices can meaningfully change local sale profit.
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
                    <th className="px-4 py-3">Change</th>
                    <th className="px-4 py-3">Sale price</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Fee</th>
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
                          : `${row.change > 0 ? "+" : ""}${toMoney(
                              row.change,
                            )}`}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.platformFee)}
                      </td>
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
          How to use this Facebook Marketplace Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add the expected Facebook Marketplace sale price before buyer negotiation or item cost.",
            ],
            [
              "Add fulfillment costs",
              "Include shipping, delivery, fuel, packaging, and any other cost needed to complete the sale.",
            ],
            [
              "Include fees",
              "Add platform, checkout, shipping, or payment processing fees when they apply.",
            ],
            [
              "Review scenarios",
              "Compare lower and higher sale prices to see how offers or price changes affect profit.",
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
            Facebook Marketplace cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the estimated
            Facebook Marketplace sale.
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
                  <p>{percent(item.share)} of total costs</p>
                  <p>{percent(item.revenueShare)} of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Facebook Marketplace profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale price as profit before subtracting item cost.",
              "Forgetting delivery, fuel, parking, tolls, or pickup effort.",
              "Ignoring shipping, checkout, or payment processing fees when applicable.",
              "Offering free delivery without checking whether the sale still works.",
              "Accepting low buyer offers without recalculating profit after costs.",
              "Comparing only active listings instead of realistic local sold prices.",
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
            Understanding your Facebook Marketplace profit results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Profit margin
              is strong enough to support negotiation, delivery costs, and
              normal local marketplace variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The sale
              appears profitable after entered costs and fees.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The sale
              is profitable, but buyer offers, delivery, shipping, or fee changes
              could erase profit quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The sale
              does not cover all entered costs and fees.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Facebook Marketplace sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, repair cost, cleaning cost, and prep supplies.",
              "Shipping cost, delivery cost, fuel cost, packaging, and pickup expenses.",
              "Shipping charged to buyer when shipped marketplace sales apply.",
              "Marketplace fee, checkout fee, shipping fee, or payment processing cost when applicable.",
              "Other selling costs before treating sale revenue as profit.",
              "Local sold comps, buyer negotiation, distance, pickup effort, and safety/time cost.",
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
          Ways to improve Facebook Marketplace profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise sale price",
              "Build enough room for buyer offers, delivery costs, shipping, fees, and item cost.",
            ],
            [
              "Lower item cost",
              "Source inventory with enough spread between cost and realistic local sold prices.",
            ],
            [
              "Reduce delivery drag",
              "Limit delivery distance, charge for delivery, or use pickup when delivery erases margin.",
            ],
            [
              "Improve sold price",
              "Use better photos, clear condition notes, measurements, and quick replies to support price.",
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
          Related Facebook Marketplace seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/facebook-marketplace/pricing-calculator", "Pricing Calculator"],
            ["/facebook-marketplace/break-even-calculator", "Break-Even Calculator"],
            ["/facebook-marketplace/negotiation-calculator", "Negotiation Calculator"],
            ["/facebook-marketplace/shipping-profit-calculator", "Shipping Profit Calculator"],
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