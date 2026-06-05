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

function numberFormat(value: number) {
  if (!Number.isFinite(value)) return "0";

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 1,
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

export default function ShopifyDiscountImpactCalculatorPage() {
  const [regularPrice, setRegularPrice] = useState("45");
  const [discountPercent, setDiscountPercent] = useState("15");
  const [productCost, setProductCost] = useState("14");
  const [shippingCost, setShippingCost] = useState("6.5");
  const [packagingCost, setPackagingCost] = useState("1.25");
  const [paymentFeeRate, setPaymentFeeRate] = useState("2.9");
  const [paymentFixedFee, setPaymentFixedFee] = useState("0.3");
  const [adCostPerOrder, setAdCostPerOrder] = useState("5");
  const [refundAllowance, setRefundAllowance] = useState("1.5");
  const [appCostPerOrder, setAppCostPerOrder] = useState("0.75");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyOrdersBeforeDiscount, setMonthlyOrdersBeforeDiscount] =
    useState("100");
  const [expectedOrderLift, setExpectedOrderLift] = useState("25");

  const results = useMemo(() => {
    const price = safeNumber(regularPrice);
    const discountRate = safeNumber(discountPercent) / 100;
    const itemCost = safeNumber(productCost);
    const shipping = safeNumber(shippingCost);
    const packaging = safeNumber(packagingCost);
    const paymentRate = safeNumber(paymentFeeRate) / 100;
    const fixedFee = safeNumber(paymentFixedFee);
    const ads = safeNumber(adCostPerOrder);
    const refunds = safeNumber(refundAllowance);
    const apps = safeNumber(appCostPerOrder);
    const misc = safeNumber(otherCosts);
    const baseOrders = safeNumber(monthlyOrdersBeforeDiscount);
    const orderLift = safeNumber(expectedOrderLift) / 100;

    const discountedPrice = price * (1 - discountRate);
    const discountAmount = price - discountedPrice;

    const regularPaymentFee = price * paymentRate + fixedFee;
    const discountedPaymentFee = discountedPrice * paymentRate + fixedFee;

    const nonPaymentCosts =
      itemCost + shipping + packaging + ads + refunds + apps + misc;

    const regularTotalCost = nonPaymentCosts + regularPaymentFee;
    const discountedTotalCost = nonPaymentCosts + discountedPaymentFee;

    const regularProfit = price - regularTotalCost;
    const discountedProfit = discountedPrice - discountedTotalCost;

    const profitLossPerOrder = regularProfit - discountedProfit;

    const regularMargin = price > 0 ? (regularProfit / price) * 100 : 0;
    const discountedMargin =
      discountedPrice > 0 ? (discountedProfit / discountedPrice) * 100 : 0;

    const newOrders = baseOrders * (1 + orderLift);
    const extraOrders = Math.max(0, newOrders - baseOrders);

    const regularMonthlyProfit = regularProfit * baseOrders;
    const discountedMonthlyProfit = discountedProfit * newOrders;
    const monthlyProfitChange = discountedMonthlyProfit - regularMonthlyProfit;

    const regularMonthlyRevenue = price * baseOrders;
    const discountedMonthlyRevenue = discountedPrice * newOrders;
    const monthlyRevenueChange = discountedMonthlyRevenue - regularMonthlyRevenue;

    const breakEvenOrders =
      discountedProfit > 0 ? Math.ceil(regularMonthlyProfit / discountedProfit) : 0;

    const extraOrdersNeeded = Math.max(0, breakEvenOrders - baseOrders);

    const requiredOrderLift =
      baseOrders > 0 ? ((breakEvenOrders - baseOrders) / baseOrders) * 100 : 0;

    const maxDiscountForBreakEven =
      price > 0
        ? Math.max(
            0,
            ((price -
              (nonPaymentCosts + fixedFee) / Math.max(0.0001, 1 - paymentRate)) /
              price) *
              100,
          )
        : 0;

    const discountShareOfPrice = price > 0 ? (discountAmount / price) * 100 : 0;
    const costShareAtDiscount =
      discountedPrice > 0 ? (discountedTotalCost / discountedPrice) * 100 : 0;

    const status =
      discountedProfit < 0
        ? "Losing Money"
        : monthlyProfitChange < 0
          ? "Profit Drop"
          : discountedMargin < 10
            ? "Thin Margin"
            : "Healthy";

    const statusTone: Tone =
      discountedProfit < 0
        ? "bad"
        : monthlyProfitChange < 0 || discountedMargin < 10
          ? "warn"
          : "good";

    const scenarios = [0, 10, 15, 20, 25, 30].map((scenarioDiscount) => {
      const scenarioRate = scenarioDiscount / 100;
      const scenarioPrice = price * (1 - scenarioRate);
      const scenarioPaymentFee = scenarioPrice * paymentRate + fixedFee;
      const scenarioTotalCost = nonPaymentCosts + scenarioPaymentFee;
      const scenarioProfit = scenarioPrice - scenarioTotalCost;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;
      const scenarioMonthlyProfit = scenarioProfit * newOrders;

      return {
        discount: scenarioDiscount,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        monthlyProfit: scenarioMonthlyProfit,
        status:
          scenarioProfit < 0
            ? "Losing"
            : scenarioMargin < 10
              ? "Thin"
              : "Healthy",
      };
    });

    return {
      price,
      discountRate,
      itemCost,
      shipping,
      packaging,
      paymentRate,
      fixedFee,
      ads,
      refunds,
      apps,
      misc,
      baseOrders,
      orderLift,
      discountedPrice,
      discountAmount,
      regularPaymentFee,
      discountedPaymentFee,
      nonPaymentCosts,
      regularTotalCost,
      discountedTotalCost,
      regularProfit,
      discountedProfit,
      profitLossPerOrder,
      regularMargin,
      discountedMargin,
      newOrders,
      extraOrders,
      regularMonthlyProfit,
      discountedMonthlyProfit,
      monthlyProfitChange,
      regularMonthlyRevenue,
      discountedMonthlyRevenue,
      monthlyRevenueChange,
      breakEvenOrders,
      extraOrdersNeeded,
      requiredOrderLift,
      maxDiscountForBreakEven,
      discountShareOfPrice,
      costShareAtDiscount,
      status,
      statusTone,
      scenarios,
    };
  }, [
    regularPrice,
    discountPercent,
    productCost,
    shippingCost,
    packagingCost,
    paymentFeeRate,
    paymentFixedFee,
    adCostPerOrder,
    refundAllowance,
    appCostPerOrder,
    otherCosts,
    monthlyOrdersBeforeDiscount,
    expectedOrderLift,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Discount Impact Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how Shopify discounts, coupons, sales, and promotions affect
          product profit, margin, order volume, monthly revenue, and break-even
          order lift.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Discount inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter regular price, discount rate, product cost, shipping,
            packaging, payment fees, ad cost, refunds, app costs, monthly
            orders, and expected order lift.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Price and discount
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Regular price
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={regularPrice}
                  onChange={(event) => setRegularPrice(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Discount percent
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={discountPercent}
                  onChange={(event) => setDiscountPercent(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Product and order costs
              </p>

              {[
                ["Product cost", productCost, setProductCost],
                ["Shipping cost", shippingCost, setShippingCost],
                ["Packaging cost", packagingCost, setPackagingCost],
                ["Ad cost per order", adCostPerOrder, setAdCostPerOrder],
                ["Refund allowance", refundAllowance, setRefundAllowance],
                ["App cost per order", appCostPerOrder, setAppCostPerOrder],
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

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Shopify payment and volume
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

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Payment fixed fee
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={paymentFixedFee}
                  onChange={(event) => setPaymentFixedFee(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly orders before discount
              </label>
              <input
                value={monthlyOrdersBeforeDiscount}
                onChange={(event) =>
                  setMonthlyOrdersBeforeDiscount(event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Expected order lift
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={expectedOrderLift}
                  onChange={(event) => setExpectedOrderLift(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify conversion rate,
            discount performance, ad results, payment fees, refunds, customer
            behavior, taxes, and seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Shopify discount impact.
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
              title="Discounted profit"
              value={money(results.discountedProfit)}
              note="Profit per order after the discount and entered costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Discounted margin"
              value={percent(results.discountedMargin)}
              note="Discounted profit divided by discounted price"
              tone={results.statusTone}
            />

            <ResultCard
              title="Discounted price"
              value={money(results.discountedPrice)}
              note="Regular price minus discount"
              tone="blue"
            />

            <ResultCard
              title="Discount amount"
              value={money(results.discountAmount)}
              note="Dollar discount per order"
              tone="warn"
            />

            <ResultCard
              title="Profit loss per order"
              value={money(results.profitLossPerOrder)}
              note="Regular profit minus discounted profit"
              tone="warn"
            />

            <ResultCard
              title="Regular profit"
              value={money(results.regularProfit)}
              note="Profit per order before discount"
              tone="blue"
            />

            <ResultCard
              title="Monthly profit change"
              value={money(results.monthlyProfitChange)}
              note="Discounted monthly profit minus regular monthly profit"
              tone={results.monthlyProfitChange >= 0 ? "good" : "warn"}
            />

            <ResultCard
              title="Discounted monthly profit"
              value={money(results.discountedMonthlyProfit)}
              note="Discounted profit multiplied by expected orders"
              tone={results.discountedMonthlyProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Regular monthly profit"
              value={money(results.regularMonthlyProfit)}
              note="Regular profit multiplied by current orders"
              tone="blue"
            />

            <ResultCard
              title="Expected orders after discount"
              value={numberFormat(results.newOrders)}
              note="Current orders plus expected order lift"
              tone="blue"
            />

            <ResultCard
              title="Extra orders expected"
              value={numberFormat(results.extraOrders)}
              note="Additional monthly orders expected from the discount"
              tone="blue"
            />

            <ResultCard
              title="Break-even orders"
              value={numberFormat(results.breakEvenOrders)}
              note="Orders needed for discounted profit to match regular monthly profit"
              tone="warn"
            />

            <ResultCard
              title="Extra orders needed"
              value={numberFormat(results.extraOrdersNeeded)}
              note="Additional orders needed to avoid profit loss"
              tone={results.extraOrdersNeeded > results.extraOrders ? "warn" : "good"}
            />

            <ResultCard
              title="Required order lift"
              value={percent(results.requiredOrderLift)}
              note="Order lift needed to maintain regular monthly profit"
              tone={results.requiredOrderLift > results.orderLift * 100 ? "warn" : "good"}
            />

            <ResultCard
              title="Max break-even discount"
              value={percent(results.maxDiscountForBreakEven)}
              note="Approximate maximum discount before order profit reaches zero"
              tone="warn"
            />

            <ResultCard
              title="Cost share at discount"
              value={percent(results.costShareAtDiscount)}
              note="Discounted total cost divided by discounted price"
              tone="warn"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                The discounted price is{" "}
                <strong className="text-gray-950">
                  {money(results.discountedPrice)}
                </strong>
                , producing estimated profit of{" "}
                <strong className="text-gray-950">
                  {money(results.discountedProfit)}
                </strong>{" "}
                per order.
              </p>

              <p>
                The discount reduces profit by{" "}
                <strong className="text-gray-950">
                  {money(results.profitLossPerOrder)}
                </strong>{" "}
                per order compared with the regular price.
              </p>

              <p>
                With the expected order lift, monthly profit changes by{" "}
                <strong className="text-gray-950">
                  {money(results.monthlyProfitChange)}
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Discount scenario comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Profit/order</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Monthly profit</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.discount}
                      className={
                        Math.abs(scenario.discount / 100 - results.discountRate) <
                        0.001
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">
                        {percent(scenario.discount)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.price)}</td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.margin)}</td>
                      <td className="px-4 py-3">
                        {money(scenario.monthlyProfit)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Losing"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "Thin"
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
          How to use this Shopify Discount Impact Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter regular price",
              "Add the normal product price before coupon, sale, or promotion.",
            ],
            [
              "Apply discount",
              "Enter the discount percentage and expected order lift from the promotion.",
            ],
            [
              "Add true costs",
              "Include product cost, shipping, packaging, payment fees, ads, refunds, and apps.",
            ],
            [
              "Review profit",
              "Check whether extra orders are enough to offset lower profit per order.",
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
            Shopify discount cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review the costs that affect discounted order profitability.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Product cost", results.itemCost],
              ["Shipping cost", results.shipping],
              ["Packaging cost", results.packaging],
              ["Discount amount", results.discountAmount],
              ["Discounted payment fee", results.discountedPaymentFee],
              ["Ad cost", results.ads],
              ["Refund allowance", results.refunds],
              ["App cost", results.apps],
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
                  Included in the discounted profit estimate.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Shopify discount mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Discounting before checking product cost, payment fees, shipping, ads, and refunds.",
              "Assuming more orders automatically means more profit.",
              "Running coupons without knowing the order lift needed to break even.",
              "Combining discounts with paid ads without checking total acquisition cost.",
              "Offering free shipping and a discount together without protecting margin.",
              "Using the same discount on every product even when margins are different.",
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
            Understanding your Shopify discount result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Healthy:</strong> The discount
              appears to preserve profit under the entered assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Profit Drop:</strong> The
              promotion may increase orders but still reduce monthly profit.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              discounted product remains profitable, but there may be little
              room for ads, refunds, or fee changes.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              discounted product may not cover its costs under the entered
              assumptions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Shopify sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Regular product price and discounted product price.",
              "Product cost, shipping, packaging, fulfillment, and payment fees.",
              "Ad cost, app cost, refund allowance, and other selling costs.",
              "Expected order lift from the discount, coupon, or promotion.",
              "Break-even orders needed to match regular monthly profit.",
              "Whether the discount is meant to clear inventory, acquire customers, or increase repeat purchases.",
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
          Ways to improve Shopify discount profitability
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Limit discount depth",
              "Use the smallest discount that still improves conversion or clears inventory.",
            ],
            [
              "Raise average order value",
              "Use bundles, quantity breaks, or free shipping thresholds to protect margin.",
            ],
            [
              "Avoid stacking discounts",
              "Be careful combining coupons, sales, free shipping, and paid ads.",
            ],
            [
              "Track repeat buyers",
              "A lower first-order margin may be acceptable only if repeat purchase value supports it.",
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
            ["/shopify/pricing-calculator", "Pricing Calculator"],
            ["/shopify/profit-calculator", "Profit Calculator"],
            ["/shopify/ad-roi-calculator", "Ad ROI Calculator"],
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