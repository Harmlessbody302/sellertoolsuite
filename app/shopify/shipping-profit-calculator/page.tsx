"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tone = "good" | "warn" | "bad" | "neutral" | "blue";

function money(value: number) {
  if (!Number.isFinite(value)) return "$0.00";

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function percent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

function safeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function ResultCard({
  title,
  value,
  note,
  tone = "neutral",
}: {
  title: string;
  value: string;
  note: string;
  tone?: Tone;
}) {
  const toneClass =
    tone === "good"
      ? "border-green-200 bg-green-50"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50"
        : tone === "bad"
          ? "border-red-200 bg-red-50"
          : tone === "blue"
            ? "border-blue-200 bg-blue-50"
            : "border-gray-200 bg-gray-50";

  return (
    <div className={`rounded-xl border p-5 ${toneClass}`}>
      <p className="text-sm font-bold text-gray-700">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      <p className="mt-2 text-sm leading-5 text-gray-600">{note}</p>
    </div>
  );
}

export default function ShopifyShippingProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState("45");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [productCost, setProductCost] = useState("14");
  const [shippingLabelCost, setShippingLabelCost] = useState("6.5");
  const [packagingCost, setPackagingCost] = useState("1.25");
  const [handlingCost, setHandlingCost] = useState("2");
  const [fulfillmentCost, setFulfillmentCost] = useState("0");
  const [paymentFeeRate, setPaymentFeeRate] = useState("2.9");
  const [paymentFixedFee, setPaymentFixedFee] = useState("0.3");
  const [adCost, setAdCost] = useState("5");
  const [refundAllowance, setRefundAllowance] = useState("1.5");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyOrders, setMonthlyOrders] = useState("100");

  const results = useMemo(() => {
    const price = safeNumber(salePrice);
    const buyerShipping = safeNumber(shippingCharged);
    const itemCost = safeNumber(productCost);
    const labelCost = safeNumber(shippingLabelCost);
    const packaging = safeNumber(packagingCost);
    const handling = safeNumber(handlingCost);
    const fulfillment = safeNumber(fulfillmentCost);
    const paymentRate = safeNumber(paymentFeeRate) / 100;
    const fixedFee = safeNumber(paymentFixedFee);
    const ads = safeNumber(adCost);
    const refunds = safeNumber(refundAllowance);
    const misc = safeNumber(otherCosts);
    const orders = safeNumber(monthlyOrders);

    const revenue = price + buyerShipping;
    const paymentFee = revenue * paymentRate + fixedFee;

    const shippingCostTotal = labelCost + packaging + handling + fulfillment;
    const shippingProfit = buyerShipping - shippingCostTotal;
    const shippingCoverage =
      shippingCostTotal > 0 ? (buyerShipping / shippingCostTotal) * 100 : 0;

    const totalCosts =
      itemCost + shippingCostTotal + paymentFee + ads + refunds + misc;

    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const productMargin = price > 0 ? (profit / price) * 100 : 0;
    const costShare = revenue > 0 ? (totalCosts / revenue) * 100 : 0;

    const monthlyRevenue = revenue * orders;
    const monthlyShippingCharged = buyerShipping * orders;
    const monthlyShippingCost = shippingCostTotal * orders;
    const monthlyShippingProfit = shippingProfit * orders;
    const monthlyProfit = profit * orders;
    const monthlyPaymentFees = paymentFee * orders;

    const breakEvenShippingCharge = shippingCostTotal;
    const shippingNeededFor20Margin =
      (itemCost + shippingCostTotal + fixedFee + ads + refunds + misc - price * 0.8) /
      Math.max(0.0001, 0.8 - paymentRate);

    const freeShippingPriceNeeded =
      (itemCost + shippingCostTotal + fixedFee + ads + refunds + misc) /
      Math.max(0.0001, 1 - paymentRate - 0.2);

    const shippingShareOfRevenue =
      revenue > 0 ? (shippingCostTotal / revenue) * 100 : 0;

    const status =
      profit < 0
        ? "Losing Money"
        : shippingProfit < 0 && margin < 15
          ? "Shipping Drag"
          : margin < 10
            ? "Thin Margin"
            : "Healthy";

    const statusTone: Tone =
      profit < 0
        ? "bad"
        : shippingProfit < 0 || margin < 10
          ? "warn"
          : "good";

    const scenarios = [0, 3, 5, 8, 10].map((scenarioShipping) => {
      const scenarioRevenue = price + scenarioShipping;
      const scenarioPaymentFee = scenarioRevenue * paymentRate + fixedFee;
      const scenarioShippingProfit = scenarioShipping - shippingCostTotal;
      const scenarioTotalCosts =
        itemCost + shippingCostTotal + scenarioPaymentFee + ads + refunds + misc;
      const scenarioProfit = scenarioRevenue - scenarioTotalCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        shippingCharged: scenarioShipping,
        revenue: scenarioRevenue,
        shippingProfit: scenarioShippingProfit,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status:
          scenarioProfit < 0
            ? "Losing"
            : scenarioShippingProfit < 0
              ? "Shipping Drag"
              : scenarioMargin < 10
                ? "Thin"
                : "Healthy",
      };
    });

    return {
      price,
      buyerShipping,
      itemCost,
      labelCost,
      packaging,
      handling,
      fulfillment,
      paymentRate,
      fixedFee,
      ads,
      refunds,
      misc,
      orders,
      revenue,
      paymentFee,
      shippingCostTotal,
      shippingProfit,
      shippingCoverage,
      totalCosts,
      profit,
      margin,
      productMargin,
      costShare,
      monthlyRevenue,
      monthlyShippingCharged,
      monthlyShippingCost,
      monthlyShippingProfit,
      monthlyProfit,
      monthlyPaymentFees,
      breakEvenShippingCharge,
      shippingNeededFor20Margin,
      freeShippingPriceNeeded,
      shippingShareOfRevenue,
      status,
      statusTone,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    productCost,
    shippingLabelCost,
    packagingCost,
    handlingCost,
    fulfillmentCost,
    paymentFeeRate,
    paymentFixedFee,
    adCost,
    refundAllowance,
    otherCosts,
    monthlyOrders,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Shipping Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether Shopify shipping charged to customers covers shipping
          labels, packaging, handling, fulfillment, payment fees, ads, refunds,
          and other order costs.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Shipping inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, shipping charged, actual shipping label cost,
            packaging, handling, fulfillment, Shopify payment fees, ads,
            refunds, and monthly order volume.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Revenue
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Sale price
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={salePrice}
                  onChange={(event) => setSalePrice(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Shipping charged to customer
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={shippingCharged}
                  onChange={(event) => setShippingCharged(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly orders
              </label>
              <input
                value={monthlyOrders}
                onChange={(event) => setMonthlyOrders(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Product and shipping costs
              </p>

              {[
                ["Product cost", productCost, setProductCost],
                ["Shipping label cost", shippingLabelCost, setShippingLabelCost],
                ["Packaging cost", packagingCost, setPackagingCost],
                ["Handling / labor cost", handlingCost, setHandlingCost],
                ["Fulfillment cost", fulfillmentCost, setFulfillmentCost],
              ].map(([label, value, setter]) => (
                <div key={label as string}>
                  <label className="mt-3 block text-sm font-medium text-gray-700">
                    {label as string}
                  </label>
                  <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      value={value as string}
                      onChange={(event) =>
                        (setter as (value: string) => void)(event.target.value)
                      }
                      className="w-full rounded-r-lg px-3 py-2 outline-none"
                      inputMode="decimal"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Shopify and selling costs
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Payment fee rate
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={paymentFeeRate}
                  onChange={(event) => setPaymentFeeRate(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>

              {[
                ["Payment fixed fee", paymentFixedFee, setPaymentFixedFee],
                ["Ad cost per order", adCost, setAdCost],
                ["Refund allowance", refundAllowance, setRefundAllowance],
                ["Other costs", otherCosts, setOtherCosts],
              ].map(([label, value, setter]) => (
                <div key={label as string}>
                  <label className="mt-3 block text-sm font-medium text-gray-700">
                    {label as string}
                  </label>
                  <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      value={value as string}
                      onChange={(event) =>
                        (setter as (value: string) => void)(event.target.value)
                      }
                      className="w-full rounded-r-lg px-3 py-2 outline-none"
                      inputMode="decimal"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify shipping labels,
            carrier rates, packaging costs, payment fees, fulfillment costs,
            ad results, refunds, taxes, and seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Shopify shipping and order profitability.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                results.statusTone === "good"
                  ? "bg-green-100 text-green-700"
                  : results.statusTone === "warn"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {results.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ResultCard
              title="Order profit"
              value={money(results.profit)}
              note="Revenue minus product, shipping, payment, ad, refund, and other costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Profit margin"
              value={percent(results.margin)}
              note="Order profit divided by total order revenue"
              tone={results.statusTone}
            />

            <ResultCard
              title="Shipping profit"
              value={money(results.shippingProfit)}
              note="Shipping charged minus label, packaging, handling, and fulfillment"
              tone={results.shippingProfit >= 0 ? "good" : "warn"}
            />

            <ResultCard
              title="Shipping coverage"
              value={percent(results.shippingCoverage)}
              note="Shipping charged divided by true shipping cost"
              tone={results.shippingCoverage >= 100 ? "good" : "warn"}
            />

            <ResultCard
              title="Order revenue"
              value={money(results.revenue)}
              note="Sale price plus shipping charged to customer"
              tone="blue"
            />

            <ResultCard
              title="True shipping cost"
              value={money(results.shippingCostTotal)}
              note="Shipping label, packaging, handling, and fulfillment cost"
              tone="warn"
            />

            <ResultCard
              title="Payment fee"
              value={money(results.paymentFee)}
              note="Payment fee on product price plus shipping charged"
              tone="warn"
            />

            <ResultCard
              title="Total order cost"
              value={money(results.totalCosts)}
              note="All entered costs for the order"
              tone="warn"
            />

            <ResultCard
              title="Monthly shipping charged"
              value={money(results.monthlyShippingCharged)}
              note="Shipping charged multiplied by monthly orders"
              tone="blue"
            />

            <ResultCard
              title="Monthly shipping cost"
              value={money(results.monthlyShippingCost)}
              note="True shipping cost multiplied by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Monthly shipping profit"
              value={money(results.monthlyShippingProfit)}
              note="Shipping profit multiplied by monthly orders"
              tone={results.monthlyShippingProfit >= 0 ? "good" : "warn"}
            />

            <ResultCard
              title="Monthly profit"
              value={money(results.monthlyProfit)}
              note="Order profit multiplied by monthly orders"
              tone={results.monthlyProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Break-even shipping charge"
              value={money(results.breakEvenShippingCharge)}
              note="Shipping charge needed to cover shipping cost only"
              tone="warn"
            />

            <ResultCard
              title="Free shipping price needed"
              value={money(results.freeShippingPriceNeeded)}
              note="Approximate product price needed for 20% margin with free shipping"
              tone="good"
            />

            <ResultCard
              title="Shipping share of revenue"
              value={percent(results.shippingShareOfRevenue)}
              note="Shipping cost divided by order revenue"
              tone="warn"
            />

            <ResultCard
              title="Monthly payment fees"
              value={money(results.monthlyPaymentFees)}
              note="Payment fee multiplied by monthly orders"
              tone="warn"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                Shipping charged is estimated to produce{" "}
                <strong className="text-gray-950">
                  {money(results.shippingProfit)}
                </strong>{" "}
                in shipping profit per order after shipping label, packaging,
                handling, and fulfillment costs.
              </p>

              <p>
                The full order is estimated to produce{" "}
                <strong className="text-gray-950">
                  {money(results.profit)}
                </strong>{" "}
                in profit with a{" "}
                <strong className="text-gray-950">
                  {percent(results.margin)}
                </strong>{" "}
                margin.
              </p>

              <p>
                At{" "}
                <strong className="text-gray-950">
                  {results.orders.toLocaleString("en-US")}
                </strong>{" "}
                monthly orders, estimated monthly shipping profit is{" "}
                <strong className="text-gray-950">
                  {money(results.monthlyShippingProfit)}
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Shipping charge scenario comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Shipping</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Shipping profit</th>
                    <th className="px-4 py-3">Order profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.shippingCharged}
                      className={
                        Math.abs(
                          scenario.shippingCharged - results.buyerShipping,
                        ) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">
                        {money(scenario.shippingCharged)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.revenue)}</td>
                      <td className="px-4 py-3">
                        {money(scenario.shippingProfit)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.margin)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Losing"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "Shipping Drag" ||
                                  scenario.status === "Thin"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {scenario.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Shopify Shipping Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter order revenue",
              "Add product sale price and shipping charged to the customer.",
            ],
            [
              "Add shipping costs",
              "Include shipping label, packaging, handling, and fulfillment cost.",
            ],
            [
              "Add Shopify costs",
              "Include payment fees, ads, refunds, product cost, and other selling costs.",
            ],
            [
              "Review profit",
              "Compare shipping profit, order profit, margin, free shipping price, and monthly impact.",
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
            Shopify shipping cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which shipping-related costs reduce order profitability.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Shipping label cost", results.labelCost],
              ["Packaging cost", results.packaging],
              ["Handling / labor cost", results.handling],
              ["Fulfillment cost", results.fulfillment],
              ["Payment fee", results.paymentFee],
              ["Ad cost", results.ads],
              ["Refund allowance", results.refunds],
              ["Other costs", results.misc],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {money(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {percent(
                    results.totalCosts > 0
                      ? ((value as number) / results.totalCosts) * 100
                      : 0,
                  )}{" "}
                  of total order cost
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Shopify shipping profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating shipping charged to customers as profit without comparing it to label cost.",
              "Forgetting packaging, labels, tape, mailers, inserts, boxes, and handling time.",
              "Offering free shipping without raising product price enough to protect margin.",
              "Ignoring payment fees on shipping charged to the customer.",
              "Using one shipping estimate for every product even when weights and zones differ.",
              "Scaling ads before checking whether shipping drag reduces final order profit.",
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
            Understanding your Shopify shipping result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Healthy:</strong> Shipping
              charged appears to support order profitability under the entered
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Shipping Drag:</strong>{" "}
              Shipping cost may be reducing product margin and should be
              reviewed before scaling.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              order remains profitable, but small changes in label cost, ads, or
              refunds could reduce profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The order
              may not cover product cost, shipping cost, Shopify fees, ads,
              refunds, and other costs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Shopify sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Product sale price and shipping charged to the customer.",
              "Actual shipping label cost by weight, zone, package size, and carrier.",
              "Packaging materials, labels, tape, mailers, boxes, inserts, and handling labor.",
              "Fulfillment cost, warehouse cost, pick-and-pack cost, or third-party logistics fees.",
              "Payment processing fees, ad cost, refunds, returns, and customer support.",
              "Free shipping thresholds, shipping discounts, and whether product price covers shipping.",
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
          Ways to improve Shopify shipping profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Review package size",
              "Reduce package dimensions and weight where possible without increasing damage risk.",
            ],
            [
              "Compare carriers",
              "Check shipping services, carrier discounts, zones, and label rates.",
            ],
            [
              "Set free shipping thresholds",
              "Use minimum order values that protect margin instead of offering free shipping too early.",
            ],
            [
              "Build shipping into price",
              "Raise product price carefully when customers expect free or low-cost shipping.",
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
          Related Shopify seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/shopify/profit-calculator", "Profit Calculator"],
            ["/shopify/product-cost-calculator", "Product Cost Calculator"],
            ["/shopify/pricing-calculator", "Pricing Calculator"],
            ["/shopify/break-even-calculator", "Break-Even Calculator"],
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