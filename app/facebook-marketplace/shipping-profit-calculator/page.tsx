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
        : status === "Compare Options"
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
    status === "Best"
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

export default function FacebookMarketplaceShippingProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(80);
  const [itemCost, setItemCost] = useState(35);
  const [shippingCharged, setShippingCharged] = useState(10);
  const [actualShippingCost, setActualShippingCost] = useState(8);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);

  const result = useMemo(() => {
    const price = Math.max(0, salePrice);
    const item = Math.max(0, itemCost);
    const chargedShipping = Math.max(0, shippingCharged);
    const shipping = Math.max(0, actualShippingCost);
    const delivery = Math.max(0, deliveryCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, platformFeeRate));
    const other = Math.max(0, otherCosts);

    const evaluateOption = ({
      label,
      revenue,
      fulfillmentCost,
      packagingIncluded,
    }: {
      label: string;
      revenue: number;
      fulfillmentCost: number;
      packagingIncluded: boolean;
    }) => {
      const platformFee = revenue * (feeRate / 100);
      const packagingUsed = packagingIncluded ? packaging : 0;
      const totalCosts =
        item + fulfillmentCost + packagingUsed + platformFee + other;
      const profit = revenue - totalCosts;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      const roi = item > 0 ? (profit / item) * 100 : 0;
      const feeShare = revenue > 0 ? (platformFee / revenue) * 100 : 0;
      const fulfillmentShare =
        revenue > 0 ? ((fulfillmentCost + packagingUsed) / revenue) * 100 : 0;

      return {
        label,
        revenue,
        platformFee,
        fulfillmentCost,
        packagingUsed,
        totalCosts,
        profit,
        margin,
        roi,
        feeShare,
        fulfillmentShare,
      };
    };

    const pickup = evaluateOption({
      label: "Local pickup",
      revenue: price,
      fulfillmentCost: 0,
      packagingIncluded: false,
    });

    const localDelivery = evaluateOption({
      label: "Local delivery",
      revenue: price,
      fulfillmentCost: delivery,
      packagingIncluded: true,
    });

    const shippedOrder = evaluateOption({
      label: "Shipped order",
      revenue: price + chargedShipping,
      fulfillmentCost: shipping,
      packagingIncluded: true,
    });

    const options = [pickup, localDelivery, shippedOrder];
    const bestOption = options.reduce((best, option) =>
      option.profit > best.profit ? option : best,
    );
    const worstOption = options.reduce((worst, option) =>
      option.profit < worst.profit ? option : worst,
    );

    const shippingSubsidy = shipping - chargedShipping;
    const shippingGap = chargedShipping - shipping;
    const profitSpread = bestOption.profit - worstOption.profit;
    const bestMargin = bestOption.margin;
    const bestRevenue = bestOption.revenue;
    const bestCosts = bestOption.totalCosts;

    const shippedVsPickup = shippedOrder.profit - pickup.profit;
    const deliveryVsPickup = localDelivery.profit - pickup.profit;

    const breakEvenShippingCharge = Math.max(0, shipping);
    const breakEvenDeliveryFee = Math.max(0, delivery + packaging);
    const shippingChargeCoverage =
      shipping > 0 ? (chargedShipping / shipping) * 100 : 100;

    let status = "Healthy";
    let statusText =
      "Your fulfillment options appear profitable based on the entered costs.";
    let recommendation =
      "Compare buyer convenience against the extra cost and time required for shipping or delivery.";

    if (bestOption.profit <= 0) {
      status = "Losing Money";
      statusText =
        "None of the fulfillment options appear profitable with the current assumptions.";
      recommendation =
        "Raise your sale price, reduce item cost, charge more for shipping, or avoid delivery-heavy sales.";
    } else if (profitSpread > 15) {
      status = "Compare Options";
      statusText =
        "Fulfillment choice has a meaningful impact on profit for this sale.";
      recommendation =
        "Use the most profitable option when possible, or price delivery and shipping separately.";
    } else if (bestOption.profit >= 40 || bestOption.margin >= 35) {
      status = "Strong";
      statusText =
        "Your fulfillment options leave strong estimated profit.";
      recommendation =
        "This sale has room for local delivery, shipping variation, or buyer negotiation.";
    }

    const getScenarioStatus = (option: typeof pickup) => {
      if (option.profit <= 0) return "Losing";
      if (option.margin < 15) return "Thin";
      if (option.label === bestOption.label) return "Best";
      return "Healthy";
    };

    const scenarios = options.map((option) => ({
      ...option,
      status: getScenarioStatus(option),
    }));

    const costBreakdown = [
      ["Item cost", item],
      ["Actual shipping cost", shipping],
      ["Delivery / fuel cost", delivery],
      ["Packaging cost", packaging],
      ["Platform fee on shipped order", shippedOrder.platformFee],
      ["Other selling costs", other],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        shippedOrder.totalCosts > 0
          ? (Number(amount) / shippedOrder.totalCosts) * 100
          : 0,
      revenueShare:
        shippedOrder.revenue > 0
          ? (Number(amount) / shippedOrder.revenue) * 100
          : 0,
    }));

    return {
      price,
      item,
      chargedShipping,
      shipping,
      delivery,
      packaging,
      feeRate,
      other,
      pickup,
      localDelivery,
      shippedOrder,
      bestOption,
      worstOption,
      bestMargin,
      bestRevenue,
      bestCosts,
      shippingSubsidy,
      shippingGap,
      profitSpread,
      shippedVsPickup,
      deliveryVsPickup,
      breakEvenShippingCharge,
      breakEvenDeliveryFee,
      shippingChargeCoverage,
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
    actualShippingCost,
    deliveryCost,
    packagingCost,
    platformFeeRate,
    otherCosts,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const bestProfitTone =
    result.bestOption.profit <= 0
      ? "bad"
      : result.bestOption.margin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Facebook Marketplace Shipping Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Compare local pickup, local delivery, and shipped Facebook Marketplace
          orders to estimate how fulfillment choices affect profit, margin,
          buyer convenience, shipping charges, delivery costs, and seller time.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Shipping inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, item cost, shipping charged, actual shipping,
            delivery cost, packaging, platform fee, and other selling expenses
            to compare fulfillment profit.
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
                  label="Platform fee rate"
                  suffix="%"
                  value={platformFeeRate}
                  onChange={setPlatformFeeRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Shipping charged to buyer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />

                <NumberInput
                  label="Actual shipping cost"
                  prefix="$"
                  value={actualShippingCost}
                  onChange={setActualShippingCost}
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
            This calculator is an estimate. Actual Facebook Marketplace shipping
            costs, delivery distance, fuel costs, packaging, buyer behavior,
            pickup reliability, payment processing, cancellations, returns, and
            item-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Fulfillment profitability comparison.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Best fulfillment option"
              value={result.bestOption.label}
              helper="Highest-profit fulfillment method from the current inputs"
              tone="blue"
            />

            <MetricCard
              label="Best estimated profit"
              value={toMoney(result.bestOption.profit)}
              helper="Profit from the best fulfillment option"
              tone={bestProfitTone}
            />

            <MetricCard
              label="Best option margin"
              value={percent(result.bestMargin)}
              helper="Best option profit divided by its revenue"
              tone={bestProfitTone}
            />

            <MetricCard
              label="Profit spread"
              value={toMoney(result.profitSpread)}
              helper="Difference between best and worst fulfillment option"
              tone={result.profitSpread > 15 ? "warning" : "good"}
            />

            <MetricCard
              label="Shipped order profit"
              value={toMoney(result.shippedOrder.profit)}
              helper="Profit if the item is shipped to the buyer"
              tone={result.shippedOrder.profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Shipped order margin"
              value={percent(result.shippedOrder.margin)}
              helper="Shipped profit divided by shipped revenue"
              tone={
                result.shippedOrder.margin >= 35
                  ? "good"
                  : result.shippedOrder.margin < 15
                    ? "warning"
                    : "neutral"
              }
            />

            <MetricCard
              label="Local pickup profit"
              value={toMoney(result.pickup.profit)}
              helper="Profit if the buyer picks up locally"
              tone={result.pickup.profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Local delivery profit"
              value={toMoney(result.localDelivery.profit)}
              helper="Profit if you deliver locally"
              tone={result.localDelivery.profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="Buyer shipping charge minus actual shipping cost"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Shipping subsidy"
              value={toMoney(result.shippingSubsidy)}
              helper="Actual shipping cost minus buyer shipping charge"
              tone={result.shippingSubsidy > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Shipping charge coverage"
              value={percent(result.shippingChargeCoverage)}
              helper="Buyer shipping charge divided by actual shipping cost"
              tone={result.shippingChargeCoverage >= 100 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even shipping charge"
              value={toMoney(result.breakEvenShippingCharge)}
              helper="Shipping charge needed to fully cover actual shipping cost"
              tone="warning"
            />

            <MetricCard
              label="Break-even delivery fee"
              value={toMoney(result.breakEvenDeliveryFee)}
              helper="Delivery fee needed to cover delivery plus packaging"
              tone="warning"
            />

            <MetricCard
              label="Shipped revenue"
              value={toMoney(result.shippedOrder.revenue)}
              helper="Sale price plus shipping charged to buyer"
              tone="blue"
            />

            <MetricCard
              label="Shipped costs"
              value={toMoney(result.shippedOrder.totalCosts)}
              helper="Item, shipping, packaging, platform fee, and other costs"
            />

            <MetricCard
              label="Platform fee on shipped order"
              value={toMoney(result.shippedOrder.platformFee)}
              helper="Estimated fee on sale price plus shipping charged"
              tone={result.shippedOrder.platformFee > 0 ? "warning" : "good"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                The most profitable fulfillment option is{" "}
                <strong>{result.bestOption.label}</strong>, with estimated
                profit of <strong>{toMoney(result.bestOption.profit)}</strong>{" "}
                and margin of <strong>{percent(result.bestOption.margin)}</strong>.
              </p>

              <p>
                Shipped orders produce estimated profit of{" "}
                <strong>{toMoney(result.shippedOrder.profit)}</strong>. Local
                pickup produces <strong>{toMoney(result.pickup.profit)}</strong>,
                and local delivery produces{" "}
                <strong>{toMoney(result.localDelivery.profit)}</strong>.
              </p>

              <p>
                Your current shipping gap is{" "}
                <strong>{toMoney(result.shippingGap)}</strong>. A positive gap
                means the buyer shipping charge covers actual shipping; a
                negative gap means you are subsidizing shipping.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Fulfillment comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Option</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Costs</th>
                    <th className="px-4 py-3">Fee</th>
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
                        row.status === "Best" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        {row.label}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">{toMoney(row.totalCosts)}</td>
                      <td className="px-4 py-3">{toMoney(row.platformFee)}</td>
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
          How to use this Facebook Marketplace Shipping Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add the expected Facebook Marketplace sale price before fulfillment choice or item cost.",
            ],
            [
              "Add shipping costs",
              "Enter the amount charged to the buyer and the actual shipping label or postage cost.",
            ],
            [
              "Include delivery costs",
              "Add local delivery, fuel, pickup effort, packaging, platform fees, and other selling costs.",
            ],
            [
              "Compare options",
              "Review pickup, delivery, and shipped-order profit before deciding how to fulfill the sale.",
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
            Facebook Marketplace fulfillment breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the shipped-order
            estimate.
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
                  <p>{percent(item.share)} of shipped-order costs</p>
                  <p>{percent(item.revenueShare)} of shipped revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Facebook Marketplace shipping mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Offering free shipping without increasing the sale price enough.",
              "Forgetting packaging, labels, tape, boxes, or other shipping supplies.",
              "Charging less for shipping than the actual label or postage cost.",
              "Offering local delivery without pricing fuel, distance, and time.",
              "Comparing fulfillment options without checking profit by option.",
              "Treating buyer convenience as free when delivery or shipping reduces margin.",
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
            Understanding your fulfillment results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Best:</strong> This option
              produces the highest estimated profit among pickup, delivery, and
              shipping.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> This
              fulfillment method appears profitable under the current
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin:</strong> This option may
              still work, but shipping, delivery, packaging, or fee changes
              could erase profit quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing:</strong> This fulfillment
              method does not cover all entered costs and fees.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Facebook Marketplace sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Sale price and item cost before choosing fulfillment method.",
              "Shipping charged to buyer and actual shipping or postage cost.",
              "Packaging cost, boxes, labels, tape, inserts, and supplies.",
              "Delivery distance, fuel cost, parking, tolls, and pickup effort.",
              "Marketplace fee, checkout fee, shipping fee, or processing fee when applicable.",
              "Buyer convenience, local demand, cancellation risk, and seller time cost.",
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
          Ways to improve Facebook Marketplace fulfillment profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Charge enough shipping",
              "Make sure buyer-paid shipping covers the actual label, packaging, and handling cost.",
            ],
            [
              "Use pickup when possible",
              "Local pickup can avoid delivery and shipping costs when the buyer is reliable.",
            ],
            [
              "Price delivery separately",
              "Charge extra for delivery when fuel, distance, or time would otherwise reduce profit.",
            ],
            [
              "Reduce package cost",
              "Use efficient packaging sizes and avoid oversized boxes that raise postage.",
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
            ["/facebook-marketplace/profit-calculator", "Profit Calculator"],
            ["/facebook-marketplace/pricing-calculator", "Pricing Calculator"],
            ["/facebook-marketplace/break-even-calculator", "Break-Even Calculator"],
            ["/facebook-marketplace/negotiation-calculator", "Negotiation Calculator"],
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