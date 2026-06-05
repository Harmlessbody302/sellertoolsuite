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

export default function ShopifyProductCostCalculatorPage() {
  const [salePrice, setSalePrice] = useState("45");
  const [productCost, setProductCost] = useState("14");
  const [inboundShipping, setInboundShipping] = useState("2");
  const [packagingCost, setPackagingCost] = useState("1.25");
  const [fulfillmentCost, setFulfillmentCost] = useState("4");
  const [paymentFeeRate, setPaymentFeeRate] = useState("2.9");
  const [paymentFixedFee, setPaymentFixedFee] = useState("0.3");
  const [adCostPerOrder, setAdCostPerOrder] = useState("5");
  const [discountCost, setDiscountCost] = useState("3");
  const [refundAllowance, setRefundAllowance] = useState("1.5");
  const [appCostPerOrder, setAppCostPerOrder] = useState("0.75");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyOrders, setMonthlyOrders] = useState("100");

  const results = useMemo(() => {
    const price = safeNumber(salePrice);
    const item = safeNumber(productCost);
    const inbound = safeNumber(inboundShipping);
    const packaging = safeNumber(packagingCost);
    const fulfillment = safeNumber(fulfillmentCost);
    const paymentRate = safeNumber(paymentFeeRate) / 100;
    const fixedFee = safeNumber(paymentFixedFee);
    const ads = safeNumber(adCostPerOrder);
    const discount = safeNumber(discountCost);
    const refunds = safeNumber(refundAllowance);
    const apps = safeNumber(appCostPerOrder);
    const misc = safeNumber(otherCosts);
    const orders = safeNumber(monthlyOrders);

    const paymentFee = price * paymentRate + fixedFee;
    const landedProductCost = item + inbound + packaging;
    const sellingCosts = fulfillment + paymentFee + ads + discount + refunds + apps + misc;
    const totalCost = landedProductCost + sellingCosts;
    const profit = price - totalCost;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const costShare = price > 0 ? (totalCost / price) * 100 : 0;
    const roi = landedProductCost > 0 ? (profit / landedProductCost) * 100 : 0;

    const breakEvenPrice =
      (landedProductCost +
        fulfillment +
        fixedFee +
        ads +
        discount +
        refunds +
        apps +
        misc) /
      Math.max(0.0001, 1 - paymentRate);

    const target20MarginPrice =
      (landedProductCost +
        fulfillment +
        fixedFee +
        ads +
        discount +
        refunds +
        apps +
        misc) /
      Math.max(0.0001, 1 - paymentRate - 0.2);

    const target30MarginPrice =
      (landedProductCost +
        fulfillment +
        fixedFee +
        ads +
        discount +
        refunds +
        apps +
        misc) /
      Math.max(0.0001, 1 - paymentRate - 0.3);

    const monthlyRevenue = price * orders;
    const monthlyLandedCost = landedProductCost * orders;
    const monthlySellingCosts = sellingCosts * orders;
    const monthlyTotalCost = totalCost * orders;
    const monthlyProfit = profit * orders;

    const productCostShare = totalCost > 0 ? (landedProductCost / totalCost) * 100 : 0;
    const fulfillmentShare = totalCost > 0 ? (fulfillment / totalCost) * 100 : 0;
    const paymentShare = totalCost > 0 ? (paymentFee / totalCost) * 100 : 0;
    const adShare = totalCost > 0 ? (ads / totalCost) * 100 : 0;

    const status =
      profit < 0
        ? "Losing Money"
        : margin < 10
          ? "Thin Margin"
          : margin < 20
            ? "Healthy"
            : "Strong";

    const statusTone: Tone =
      profit < 0 ? "bad" : margin < 10 ? "warn" : "good";

    const scenarios = [25, 35, 45, 55, 65].map((scenarioPrice) => {
      const scenarioPaymentFee = scenarioPrice * paymentRate + fixedFee;
      const scenarioSellingCosts =
        fulfillment + scenarioPaymentFee + ads + discount + refunds + apps + misc;
      const scenarioTotalCost = landedProductCost + scenarioSellingCosts;
      const scenarioProfit = scenarioPrice - scenarioTotalCost;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

      return {
        price: scenarioPrice,
        totalCost: scenarioTotalCost,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status:
          scenarioProfit < 0
            ? "Losing"
            : scenarioMargin < 10
              ? "Thin"
              : scenarioMargin < 20
                ? "Healthy"
                : "Strong",
      };
    });

    return {
      price,
      item,
      inbound,
      packaging,
      fulfillment,
      paymentRate,
      fixedFee,
      ads,
      discount,
      refunds,
      apps,
      misc,
      orders,
      paymentFee,
      landedProductCost,
      sellingCosts,
      totalCost,
      profit,
      margin,
      costShare,
      roi,
      breakEvenPrice,
      target20MarginPrice,
      target30MarginPrice,
      monthlyRevenue,
      monthlyLandedCost,
      monthlySellingCosts,
      monthlyTotalCost,
      monthlyProfit,
      productCostShare,
      fulfillmentShare,
      paymentShare,
      adShare,
      status,
      statusTone,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    inboundShipping,
    packagingCost,
    fulfillmentCost,
    paymentFeeRate,
    paymentFixedFee,
    adCostPerOrder,
    discountCost,
    refundAllowance,
    appCostPerOrder,
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
          Shopify Product Cost Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate the true cost of selling a product on Shopify after product
          cost, inbound shipping, packaging, fulfillment, payment processing
          fees, ad cost, discounts, refunds, app costs, and other order-level
          expenses.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Product cost inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your product cost, Shopify payment fees, fulfillment cost, ad
            cost, discount cost, refund allowance, app cost, and monthly order
            volume.
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
                Product and fulfillment costs
              </p>

              {[
                ["Product cost", productCost, setProductCost],
                ["Inbound shipping per unit", inboundShipping, setInboundShipping],
                ["Packaging cost", packagingCost, setPackagingCost],
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
                ["Ad cost per order", adCostPerOrder, setAdCostPerOrder],
                ["Discount cost per order", discountCost, setDiscountCost],
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
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify payment fees,
            fulfillment costs, app costs, ad results, refund rates, discounts,
            shipping costs, taxes, and seller-specific expenses may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated true Shopify product cost and profit.
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
              title="Estimated profit"
              value={money(results.profit)}
              note="Sale price minus product, fulfillment, payment, ads, discount, refund, app, and other costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Profit margin"
              value={percent(results.margin)}
              note="Estimated profit divided by sale price"
              tone={results.statusTone}
            />

            <ResultCard
              title="Landed product cost"
              value={money(results.landedProductCost)}
              note="Product cost plus inbound shipping and packaging"
              tone="warn"
            />

            <ResultCard
              title="Selling costs"
              value={money(results.sellingCosts)}
              note="Fulfillment, payment fee, ads, discounts, refunds, apps, and other costs"
              tone="warn"
            />

            <ResultCard
              title="Total cost"
              value={money(results.totalCost)}
              note="Landed product cost plus Shopify selling costs"
              tone="warn"
            />

            <ResultCard
              title="Payment fee"
              value={money(results.paymentFee)}
              note="Payment rate plus fixed payment fee"
              tone="warn"
            />

            <ResultCard
              title="ROI on landed cost"
              value={percent(results.roi)}
              note="Estimated profit divided by landed product cost"
              tone={results.roi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Cost share"
              value={percent(results.costShare)}
              note="Total cost divided by sale price"
              tone="warn"
            />

            <ResultCard
              title="Break-even price"
              value={money(results.breakEvenPrice)}
              note="Approximate sale price needed before profit starts"
              tone="warn"
            />

            <ResultCard
              title="20% margin price"
              value={money(results.target20MarginPrice)}
              note="Approximate sale price needed for a 20% margin"
              tone="good"
            />

            <ResultCard
              title="30% margin price"
              value={money(results.target30MarginPrice)}
              note="Approximate sale price needed for a 30% margin"
              tone="good"
            />

            <ResultCard
              title="Monthly profit"
              value={money(results.monthlyProfit)}
              note="Estimated profit multiplied by monthly orders"
              tone={results.monthlyProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Monthly revenue"
              value={money(results.monthlyRevenue)}
              note="Sale price multiplied by monthly orders"
              tone="blue"
            />

            <ResultCard
              title="Monthly landed cost"
              value={money(results.monthlyLandedCost)}
              note="Landed product cost multiplied by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Monthly selling costs"
              value={money(results.monthlySellingCosts)}
              note="Selling costs multiplied by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Monthly total cost"
              value={money(results.monthlyTotalCost)}
              note="Total product cost multiplied by monthly orders"
              tone="warn"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                This Shopify product is estimated to produce{" "}
                <strong className="text-gray-950">
                  {money(results.profit)}
                </strong>{" "}
                in profit per order with a{" "}
                <strong className="text-gray-950">
                  {percent(results.margin)}
                </strong>{" "}
                margin.
              </p>

              <p>
                Landed product cost is{" "}
                <strong className="text-gray-950">
                  {money(results.landedProductCost)}
                </strong>
                , and total estimated cost is{" "}
                <strong className="text-gray-950">
                  {money(results.totalCost)}
                </strong>
                .
              </p>

              <p>
                At{" "}
                <strong className="text-gray-950">
                  {results.orders.toLocaleString("en-US")}
                </strong>{" "}
                monthly orders, estimated monthly profit is{" "}
                <strong className="text-gray-950">
                  {money(results.monthlyProfit)}
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">Price scenario comparison</h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Total cost</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.price}
                      className={
                        Math.abs(scenario.price - results.price) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">{money(scenario.price)}</td>
                      <td className="px-4 py-3">
                        {money(scenario.totalCost)}
                      </td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.margin)}</td>
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
          How to use this Shopify Product Cost Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product cost",
              "Add product cost, inbound shipping, packaging, and fulfillment cost.",
            ],
            [
              "Add Shopify fees",
              "Include payment processing rate, fixed transaction fee, and app cost per order.",
            ],
            [
              "Add selling costs",
              "Include ads, discounts, refunds, and other order-level costs.",
            ],
            [
              "Review pricing",
              "Compare profit, margin, break-even price, target prices, and monthly profit.",
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
            Shopify product cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which cost categories are taking up the largest share of the
            sale price.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Product cost", results.item],
              ["Inbound shipping", results.inbound],
              ["Packaging cost", results.packaging],
              ["Fulfillment cost", results.fulfillment],
              ["Payment fee", results.paymentFee],
              ["Ad cost", results.ads],
              ["Discount cost", results.discount],
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
                  {percent(
                    results.totalCost > 0
                      ? ((value as number) / results.totalCost) * 100
                      : 0,
                  )}{" "}
                  of total cost
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Shopify product cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Only using the supplier price as the product cost.",
              "Forgetting inbound shipping, packaging, fulfillment, and payment processing fees.",
              "Ignoring ad cost, discount cost, app costs, refunds, and returns.",
              "Pricing products before checking break-even and target margin prices.",
              "Treating Shopify revenue as profit before subtracting fulfillment and marketing cost.",
              "Using the same cost assumptions after supplier, ad, app, or payment fee changes.",
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

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Shopify seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/shopify/profit-calculator", "Profit Calculator"],
            ["/shopify/pricing-calculator", "Pricing Calculator"],
            ["/shopify/fee-calculator", "Fee Calculator"],
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