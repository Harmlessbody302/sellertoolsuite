"use client";

import { useMemo, useState } from "react";

export default function FacebookMarketplaceShippingProfitCalculator() {
  const [salePrice, setSalePrice] = useState("80");
  const [itemCost, setItemCost] = useState("35");
  const [shippingCharged, setShippingCharged] = useState("10");
  const [actualShippingCost, setActualShippingCost] = useState("8");
  const [deliveryCost, setDeliveryCost] = useState("5");
  const [packagingCost, setPackagingCost] = useState("1");
  const [platformFeeRate, setPlatformFeeRate] = useState("0");
  const [otherCosts, setOtherCosts] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const item = Number(itemCost) || 0;
    const chargedShipping = Number(shippingCharged) || 0;
    const shipping = Number(actualShippingCost) || 0;
    const delivery = Number(deliveryCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const feeRate = Number(platformFeeRate) || 0;
    const other = Number(otherCosts) || 0;

    const platformFee = (price + chargedShipping) * (feeRate / 100);

    const shippedRevenue = price + chargedShipping;
    const shippedCosts = item + shipping + packaging + platformFee + other;
    const shippedProfit = shippedRevenue - shippedCosts;
    const shippedMargin =
      shippedRevenue > 0 ? (shippedProfit / shippedRevenue) * 100 : 0;

    const pickupRevenue = price;
    const pickupFee = pickupRevenue * (feeRate / 100);
    const pickupCosts = item + pickupFee + other;
    const pickupProfit = pickupRevenue - pickupCosts;
    const pickupMargin =
      pickupRevenue > 0 ? (pickupProfit / pickupRevenue) * 100 : 0;

    const deliveryRevenue = price;
    const deliveryFee = deliveryRevenue * (feeRate / 100);
    const deliveryCosts = item + delivery + packaging + deliveryFee + other;
    const deliveryProfit = deliveryRevenue - deliveryCosts;
    const deliveryMargin =
      deliveryRevenue > 0 ? (deliveryProfit / deliveryRevenue) * 100 : 0;

    const shippingSubsidy = shipping - chargedShipping;
    const bestOption =
      shippedProfit >= pickupProfit && shippedProfit >= deliveryProfit
        ? "Shipped order"
        : pickupProfit >= deliveryProfit
        ? "Local pickup"
        : "Local delivery";

    const bestProfit = Math.max(shippedProfit, pickupProfit, deliveryProfit);
    const worstProfit = Math.min(shippedProfit, pickupProfit, deliveryProfit);
    const profitSpread = bestProfit - worstProfit;

    let status = "Healthy";
    let statusText =
      "Your fulfillment options appear profitable based on the entered costs.";
    let recommendation =
      "Compare buyer convenience against the extra cost and time required for shipping or delivery.";

    if (bestProfit <= 0) {
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
    } else if (bestProfit >= 40) {
      status = "Strong";
      statusText =
        "Your fulfillment options leave strong estimated profit.";
      recommendation =
        "This sale has room for local delivery, shipping variation, or buyer negotiation.";
    }

    const scenarios = [
      {
        label: "Local pickup",
        revenue: pickupRevenue,
        costs: pickupCosts,
        profit: pickupProfit,
        margin: pickupMargin,
      },
      {
        label: "Local delivery",
        revenue: deliveryRevenue,
        costs: deliveryCosts,
        profit: deliveryProfit,
        margin: deliveryMargin,
      },
      {
        label: "Shipped order",
        revenue: shippedRevenue,
        costs: shippedCosts,
        profit: shippedProfit,
        margin: shippedMargin,
      },
    ].map((scenario) => {
      let scenarioStatus = "Healthy";

      if (scenario.profit <= 0) scenarioStatus = "Losing";
      else if (scenario.margin < 15) scenarioStatus = "Thin";
      else if (scenario.profit === bestProfit) scenarioStatus = "Best";

      return {
        ...scenario,
        status: scenarioStatus,
      };
    });

    return {
      shippedRevenue,
      shippedCosts,
      shippedProfit,
      shippedMargin,
      pickupProfit,
      deliveryProfit,
      shippingSubsidy,
      bestOption,
      bestProfit,
      profitSpread,
      status,
      statusText,
      recommendation,
      scenarios,
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

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Facebook Marketplace Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Facebook Marketplace Shipping Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Compare local pickup, local delivery, and shipped Facebook
            Marketplace orders to estimate how fulfillment choices affect
            profit.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Shipping details
            </h2>

            <div className="space-y-3">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
              />

              <Input
                label="Shipping charged to buyer"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
              />

              <Input
                label="Actual shipping cost"
                value={actualShippingCost}
                onChange={setActualShippingCost}
                prefix="$"
              />

              <Input
                label="Delivery / fuel cost"
                value={deliveryCost}
                onChange={setDeliveryCost}
                prefix="$"
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
              />

              <Input
                label="Platform fee rate"
                value={platformFeeRate}
                onChange={setPlatformFeeRate}
                suffix="%"
              />

              <Input
                label="Other selling costs"
                value={otherCosts}
                onChange={setOtherCosts}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Fulfillment profitability comparison.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Best fulfillment option"
                value={result.bestOption}
                variant="info"
              />

              <ResultCard
                label="Best estimated profit"
                value={money(result.bestProfit)}
                variant={result.bestProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Shipped order profit"
                value={money(result.shippedProfit)}
                variant={result.shippedProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Shipped order margin"
                value={percent(result.shippedMargin)}
                variant={
                  result.shippedMargin >= 35
                    ? "good"
                    : result.shippedMargin < 15
                    ? "warning"
                    : "default"
                }
              />

              <ResultCard
                label="Shipping subsidy"
                value={money(result.shippingSubsidy)}
                variant={result.shippingSubsidy > 0 ? "warning" : "good"}
              />

              <ResultCard
                label="Profit spread"
                value={money(result.profitSpread)}
                variant="warning"
              />

              <ResultCard
                label="Local pickup profit"
                value={money(result.pickupProfit)}
              />

              <ResultCard
                label="Local delivery profit"
                value={money(result.deliveryProfit)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                The most profitable fulfillment option is{" "}
                <span className="font-semibold">{result.bestOption}</span>,
                with estimated profit of{" "}
                <span className="font-semibold">
                  {money(result.bestProfit)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                If shipping costs more than the amount charged to the buyer, the
                difference becomes a shipping subsidy. Current subsidy is{" "}
                <span className="font-semibold">
                  {money(result.shippingSubsidy)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Fulfillment comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Option</th>
                      <th className="px-4 py-3">Revenue</th>
                      <th className="px-4 py-3">Costs</th>
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
                          row.status === "Best"
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">{money(row.revenue)}</td>
                        <td className="px-4 py-3">{money(row.costs)}</td>
                        <td className="px-4 py-3">{money(row.profit)}</td>
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
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 outline-none"
        />

        {suffix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "good" | "warning" | "danger" | "info";
}) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    danger: "border-red-300 bg-red-50",
    info: "border-blue-300 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Compare Options"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Best" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Thin"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex min-w-[88px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}