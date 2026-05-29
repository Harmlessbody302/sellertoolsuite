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

export default function ShopifyProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [productCost, setProductCost] = useState(18);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [paymentFeeRate, setPaymentFeeRate] = useState(2.9);
  const [fixedPaymentFee, setFixedPaymentFee] = useState(0.3);
  const [adCost, setAdCost] = useState(5);
  const [appCostPerOrder, setAppCostPerOrder] = useState(1);
  const [returnsAllowance, setReturnsAllowance] = useState(1);

  const result = useMemo(() => {
    const feeRate = Math.min(95, Math.max(0, paymentFeeRate)) / 100;

    const totalRevenue = salePrice + shippingCharged;
    const paymentFee = totalRevenue * feeRate + fixedPaymentFee;

    const fulfillmentCosts = shippingCost + packagingCost;
    const operatingCosts = adCost + appCostPerOrder + returnsAllowance;

    const totalCosts =
      productCost + fulfillmentCosts + paymentFee + operatingCosts;

    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi = productCost > 0 ? (profit / productCost) * 100 : 0;

    const breakEvenPrice =
      feeRate < 1
        ? Math.max(
            0,
            (productCost +
              shippingCost +
              packagingCost +
              fixedPaymentFee +
              adCost +
              appCostPerOrder +
              returnsAllowance -
              shippingCharged) /
              (1 - feeRate),
          )
        : 0;

    const profitBeforeAds = profit + adCost;
    const shippingDifference = shippingCharged - shippingCost;
    const shippingAndPackagingGap = shippingCharged - fulfillmentCosts;
    const paymentFeePercent =
      totalRevenue > 0 ? (paymentFee / totalRevenue) * 100 : 0;
    const costPerDollarRevenue =
      totalRevenue > 0 ? (totalCosts / totalRevenue) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "This Shopify order appears profitable after product cost, shipping, payment fees, ads, app costs, and returns allowance.";
    let recommendation =
      "This product looks workable. Monitor ad cost, shipping cost, app costs, and returns so they do not quietly reduce margin.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This Shopify order is losing money or breaking even after estimated costs.";
      recommendation =
        "Raise price, reduce product cost, lower ad spend, adjust shipping, or reduce app and fulfillment costs before scaling.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText = "This Shopify order is profitable, but the margin is thin.";
      recommendation =
        "Small increases in ads, shipping, returns, discounts, payment fees, or app costs could erase profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This Shopify order has a strong estimated margin after Shopify-related costs.";
      recommendation =
        "This product may be a good candidate for ads, bundles, upsells, or scaling if demand and conversion are strong.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioMargin < 10) return "Thin";
      if (scenarioMargin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioPrice = Math.max(0, salePrice + change);
      const scenarioRevenue = scenarioPrice + shippingCharged;
      const scenarioPaymentFee = scenarioRevenue * feeRate + fixedPaymentFee;
      const scenarioCosts =
        productCost +
        fulfillmentCosts +
        scenarioPaymentFee +
        operatingCosts;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        change,
        price: scenarioPrice,
        revenue: scenarioRevenue,
        paymentFee: scenarioPaymentFee,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      {
        label: "Product cost",
        amount: productCost,
      },
      {
        label: "Shipping cost",
        amount: shippingCost,
      },
      {
        label: "Packaging cost",
        amount: packagingCost,
      },
      {
        label: "Payment fee",
        amount: paymentFee,
      },
      {
        label: "Ad cost",
        amount: adCost,
      },
      {
        label: "App cost",
        amount: appCostPerOrder,
      },
      {
        label: "Returns allowance",
        amount: returnsAllowance,
      },
    ].map((item) => ({
      ...item,
      share: totalCosts > 0 ? (item.amount / totalCosts) * 100 : 0,
    }));

    return {
      totalRevenue,
      paymentFee,
      fulfillmentCosts,
      operatingCosts,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      profitBeforeAds,
      shippingDifference,
      shippingAndPackagingGap,
      paymentFeePercent,
      costPerDollarRevenue,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    productCost,
    shippingCharged,
    shippingCost,
    packagingCost,
    paymentFeeRate,
    fixedPaymentFee,
    adCost,
    appCostPerOrder,
    returnsAllowance,
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
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Shopify profit after product cost, shipping, packaging,
          payment processing, ads, app costs, returns allowance, and customer
          shipping charges.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale revenue, product cost, shipping income, fulfillment
            costs, payment fees, ad cost, app cost, and returns allowance to
            estimate real Shopify profit.
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
                  label="Shipping charged to customer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Product and fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Product cost"
                  prefix="$"
                  value={productCost}
                  onChange={setProductCost}
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
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Fee and operating assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Payment processing rate"
                  suffix="%"
                  value={paymentFeeRate}
                  onChange={setPaymentFeeRate}
                />

                <NumberInput
                  label="Fixed payment fee"
                  prefix="$"
                  value={fixedPaymentFee}
                  onChange={setFixedPaymentFee}
                />

                <NumberInput
                  label="Ad cost per order"
                  prefix="$"
                  value={adCost}
                  onChange={setAdCost}
                />

                <NumberInput
                  label="App cost per order"
                  prefix="$"
                  value={appCostPerOrder}
                  onChange={setAppCostPerOrder}
                />

                <NumberInput
                  label="Returns allowance"
                  prefix="$"
                  value={returnsAllowance}
                  onChange={setReturnsAllowance}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify profit can vary based
            on payment processor, app costs, ad performance, refunds, returns,
            chargebacks, shipping rates, discounts, taxes, and fulfillment
            decisions.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Shopify profit breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Total revenue minus all entered costs and fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Profit divided by total revenue"
              tone={profitTone}
            />

            <MetricCard
              label="ROI on product cost"
              value={percent(result.roi)}
              helper="Profit divided by product cost"
              tone={result.roi > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Approximate sale price needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Total revenue"
              value={toMoney(result.totalRevenue)}
              helper="Sale price plus customer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Product, fulfillment, payment, ads, apps, and returns"
            />

            <MetricCard
              label="Payment fee"
              value={toMoney(result.paymentFee)}
              helper="Payment processing percentage plus fixed fee"
              tone="warning"
            />

            <MetricCard
              label="Payment fee share"
              value={percent(result.paymentFeePercent)}
              helper="Payment fee divided by total revenue"
              tone="warning"
            />

            <MetricCard
              label="Profit before ads"
              value={toMoney(result.profitBeforeAds)}
              helper="Estimated profit before ad cost per order"
              tone="blue"
            />

            <MetricCard
              label="Cost share of revenue"
              value={percent(result.costPerDollarRevenue)}
              helper="Total costs divided by total revenue"
              tone={result.costPerDollarRevenue < 70 ? "good" : "warning"}
            />

            <MetricCard
              label="Shipping difference"
              value={toMoney(result.shippingDifference)}
              helper="Customer shipping charge minus actual shipping"
              tone={result.shippingDifference >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Shipping + packaging gap"
              value={toMoney(result.shippingAndPackagingGap)}
              helper="Customer shipping charge minus shipping and packaging"
              tone={result.shippingAndPackagingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Fulfillment costs"
              value={toMoney(result.fulfillmentCosts)}
              helper="Actual shipping plus packaging cost"
              tone="warning"
            />

            <MetricCard
              label="Ad / app / return costs"
              value={toMoney(result.operatingCosts)}
              helper="Ad cost, app cost, and returns allowance"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This order brings in{" "}
                <strong>{toMoney(result.totalRevenue)}</strong> in total
                revenue and has estimated total costs of{" "}
                <strong>{toMoney(result.totalCosts)}</strong>, leaving estimated
                profit of <strong>{toMoney(result.profit)}</strong>.
              </p>

              <p>
                Estimated payment processing fees are{" "}
                <strong>{toMoney(result.paymentFee)}</strong>. Profit before ads
                is <strong>{toMoney(result.profitBeforeAds)}</strong>.
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
                    <th className="px-4 py-3">Revenue</th>
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
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
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
          How to use this Shopify Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale revenue",
              "Add the product sale price and any shipping amount charged to the customer.",
            ],
            [
              "Add product costs",
              "Include product cost, actual shipping cost, packaging, and fulfillment expenses.",
            ],
            [
              "Include operating costs",
              "Add payment fees, ad cost, app cost, and returns allowance.",
            ],
            [
              "Review scenarios",
              "Compare price changes to see how small changes affect profit and margin.",
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
            Shopify cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of estimated order
            expenses.
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
                  <p>{percent(result.totalRevenue > 0 ? (item.amount / result.totalRevenue) * 100 : 0)} of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Shopify profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating revenue as profit before subtracting product cost and shipping.",
              "Forgetting app costs, packaging, returns, chargebacks, and fulfillment costs.",
              "Ignoring ad cost per order when reviewing product margin.",
              "Counting customer-paid shipping as profit before subtracting actual shipping.",
              "Scaling products without checking how discounts or price changes affect margin.",
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
            Understanding your Shopify profit results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Profit margin
              is strong enough to support ads, discounts, returns, and scaling.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The order
              appears profitable after entered costs and fees.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The order
              is profitable, but ads, returns, shipping, or discounts could erase
              profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The order
              does not cover all entered costs and fees.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Shopify sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Product cost and landed cost per unit.",
              "Actual shipping cost, packaging cost, labels, and fulfillment materials.",
              "Payment processing percentage and fixed payment fee.",
              "Ad cost per order or estimated customer acquisition cost.",
              "App cost per order, subscriptions, return allowance, and chargeback risk.",
              "Customer-paid shipping and any shipping subsidy absorbed by the seller.",
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
          Ways to improve Shopify profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise order value",
              "Use bundles, upsells, cross-sells, and free-shipping thresholds to increase revenue.",
            ],
            [
              "Lower fulfillment cost",
              "Review packaging, carrier rates, shipping zones, and fulfillment workflow.",
            ],
            [
              "Control ad cost",
              "Track contribution profit instead of relying only on ROAS or revenue from ads.",
            ],
            [
              "Reduce app drag",
              "Remove apps that add cost without improving conversion, operations, or retention.",
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
            ["/shopify/fee-calculator", "Fee Calculator"],
            ["/shopify/pricing-calculator", "Pricing Calculator"],
            ["/shopify/break-even-calculator", "Break-Even Calculator"],
            ["/shopify/ad-roi-calculator", "Ad ROI Calculator"],
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