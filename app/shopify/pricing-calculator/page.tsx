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
          : "bg-blue-100 text-blue-700";

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
          : status === "Break-even"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function ShopifyPricingCalculatorPage() {
  const [productCost, setProductCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [paymentRate, setPaymentRate] = useState(2.9);
  const [fixedPaymentFee, setFixedPaymentFee] = useState(0.3);
  const [adCost, setAdCost] = useState(5);
  const [appCost, setAppCost] = useState(1);
  const [returnsAllowance, setReturnsAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(15);
  const [targetMargin, setTargetMargin] = useState(30);

  const result = useMemo(() => {
    const rate = Math.min(95, Math.max(0, paymentRate)) / 100;
    const marginTarget = Math.min(90, Math.max(0, targetMargin)) / 100;

    const baseCosts =
      productCost +
      shippingCost +
      packagingCost +
      adCost +
      appCost +
      returnsAllowance;

    const paymentDenominator = 1 - rate;
    const marginDenominator = 1 - rate - marginTarget;

    const breakEvenPrice =
      paymentDenominator > 0
        ? Math.max(0, (baseCosts + fixedPaymentFee) / paymentDenominator - shippingCharged)
        : 0;

    const targetProfitPrice =
      paymentDenominator > 0
        ? Math.max(
            0,
            (baseCosts + fixedPaymentFee + targetProfit) / paymentDenominator -
              shippingCharged,
          )
        : 0;

    const targetMarginPrice =
      marginDenominator > 0
        ? Math.max(
            0,
            (baseCosts + fixedPaymentFee) / marginDenominator -
              shippingCharged,
          )
        : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
    );

    const evaluatePrice = (price: number) => {
      const revenue = price + shippingCharged;
      const paymentFee = revenue * rate + fixedPaymentFee;
      const totalCosts = baseCosts + paymentFee;
      const profit = revenue - totalCosts;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      const roi = productCost > 0 ? (profit / productCost) * 100 : 0;

      return {
        revenue,
        paymentFee,
        totalCosts,
        profit,
        margin,
        roi,
      };
    };

    const recommendedEval = evaluatePrice(recommendedPrice);
    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetProfitEval = evaluatePrice(targetProfitPrice);
    const targetMarginEval = evaluatePrice(targetMarginPrice);

    const fulfillmentCosts = shippingCost + packagingCost;
    const shippingGap = shippingCharged - fulfillmentCosts;

    let status = "Healthy";
    let statusText =
      "The recommended Shopify price appears workable based on your costs, fees, and pricing targets.";
    let recommendation =
      "Use this as a pricing estimate, then compare against your market, conversion rate, offer strength, and customer willingness to pay.";

    if (recommendedPrice <= 0 || marginDenominator <= 0) {
      status = "Check Inputs";
      statusText =
        "The pricing target could not be calculated with the current fee and target margin assumptions.";
      recommendation =
        "Lower the target margin, check the payment processing rate, or review your cost assumptions.";
    } else if (recommendedEval.margin < 10) {
      status = "Thin Margin";
      statusText =
        "The recommended price creates profit, but the margin is thin.";
      recommendation =
        "Consider raising price, lowering fulfillment costs, reducing ad cost, improving average order value, or reducing app and return costs.";
    } else if (recommendedEval.margin >= 30) {
      status = "Strong";
      statusText =
        "The recommended Shopify price leaves a strong estimated margin.";
      recommendation =
        "This price may leave enough room for ads, discounts, returns, and profit if the market supports it.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 10) return "Thin";
      if (margin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [
      {
        label: "Break-even",
        price: breakEvenPrice,
        ...breakEvenEval,
        status: "Break-even",
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
        ...targetProfitEval,
        status: getScenarioStatus(
          targetProfitEval.profit,
          targetProfitEval.margin,
        ),
      },
      {
        label: "Target margin",
        price: targetMarginPrice,
        ...targetMarginEval,
        status: getScenarioStatus(
          targetMarginEval.profit,
          targetMarginEval.margin,
        ),
      },
      {
        label: "Recommended",
        price: recommendedPrice,
        ...recommendedEval,
        status: getScenarioStatus(
          recommendedEval.profit,
          recommendedEval.margin,
        ),
      },
    ];

    return {
      baseCosts,
      fulfillmentCosts,
      shippingGap,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      revenue: recommendedEval.revenue,
      paymentFee: recommendedEval.paymentFee,
      totalCosts: recommendedEval.totalCosts,
      profit: recommendedEval.profit,
      margin: recommendedEval.margin,
      roi: recommendedEval.roi,
      status,
      statusText,
      recommendation,
      scenarios,
      marginDenominator,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    shippingCharged,
    paymentRate,
    fixedPaymentFee,
    adCost,
    appCost,
    returnsAllowance,
    targetProfit,
    targetMargin,
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
          Shopify Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Find a profitable Shopify selling price based on product cost,
          shipping, packaging, payment fees, ads, app costs, returns, target
          profit, and target margin.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter product costs, fulfillment costs, payment processing, ad cost,
            app cost, return allowance, and pricing targets to estimate a
            recommended Shopify price.
          </p>

          <div className="mt-6 space-y-6">
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
                Fee and operating assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Payment processing rate"
                  suffix="%"
                  value={paymentRate}
                  onChange={setPaymentRate}
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
                  value={appCost}
                  onChange={setAppCost}
                />

                <NumberInput
                  label="Returns allowance"
                  prefix="$"
                  value={returnsAllowance}
                  onChange={setReturnsAllowance}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Pricing targets
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Target profit"
                  prefix="$"
                  value={targetProfit}
                  onChange={setTargetProfit}
                />

                <NumberInput
                  label="Target margin"
                  suffix="%"
                  value={targetMargin}
                  onChange={setTargetMargin}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify profitability can
            vary based on payment processor, app costs, ad performance, refunds,
            shipping rates, discounts, taxes, chargebacks, and fulfillment
            decisions.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended Shopify pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended price"
              value={toMoney(result.recommendedPrice)}
              helper="Highest required price from target profit, target margin, and break-even"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Profit after product cost, fulfillment, fees, ads, apps, and returns"
              tone={profitTone}
            />

            <MetricCard
              label="Estimated margin"
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
              helper="Minimum product price before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Price needed to reach target dollar profit"
              tone="good"
            />

            <MetricCard
              label="Target margin price"
              value={toMoney(result.targetMarginPrice)}
              helper="Price needed to reach target margin percentage"
              tone={result.marginDenominator > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Payment fee at price"
              value={toMoney(result.paymentFee)}
              helper="Estimated payment processing fee at recommended price"
              tone="warning"
            />

            <MetricCard
              label="Total revenue"
              value={toMoney(result.revenue)}
              helper="Recommended product price plus customer shipping charge"
              tone="blue"
            />

            <MetricCard
              label="Total costs at price"
              value={toMoney(result.totalCosts)}
              helper="All entered costs plus estimated payment fee"
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="Customer shipping charge minus shipping and packaging"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Base seller costs"
              value={toMoney(result.baseCosts)}
              helper="Product, shipping, packaging, ads, apps, and returns"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Recommended pricing is{" "}
                <strong>{toMoney(result.recommendedPrice)}</strong>, producing
                estimated profit of <strong>{toMoney(result.profit)}</strong>{" "}
                at <strong>{percent(result.margin)}</strong> margin.
              </p>

              <p>
                Estimated payment fees at this price are{" "}
                <strong>{toMoney(result.paymentFee)}</strong>, and total costs
                are <strong>{toMoney(result.totalCosts)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Pricing scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Payment fee</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Recommended" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.margin)}</td>
                      <td className="px-4 py-3">{toMoney(row.paymentFee)}</td>
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
          How to use this Shopify Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product costs",
              "Add product cost, shipping cost, packaging, and any customer-paid shipping.",
            ],
            [
              "Add operating costs",
              "Include payment fees, ads, app cost, and return allowance.",
            ],
            [
              "Set price targets",
              "Choose your target dollar profit and target margin percentage.",
            ],
            [
              "Compare scenarios",
              "Review break-even, target profit, target margin, and recommended price scenarios.",
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
            Common Shopify pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from product cost alone without including payment fees and shipping.",
              "Ignoring ad cost per order when setting target margin.",
              "Forgetting app costs, packaging, returns, chargebacks, and fulfillment costs.",
              "Treating customer shipping charges as profit before subtracting actual shipping.",
              "Choosing a target margin that is too high for the fee and cost structure.",
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
            Understanding your pricing results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Recommended
              pricing leaves a strong estimated margin after entered costs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              recommended price appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              price may work, but ads, returns, discounts, or shipping changes
              could reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> The
              target margin may be too high relative to payment fees and cost
              assumptions.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve Shopify pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower landed cost",
              "Reduce product cost, fulfillment costs, packaging, or supplier costs.",
            ],
            [
              "Raise order value",
              "Use bundles, upsells, cross-sells, and free-shipping thresholds to improve margin.",
            ],
            [
              "Control ad cost",
              "Avoid setting prices that only work if customer acquisition cost stays low.",
            ],
            [
              "Build buffer",
              "Leave room for discounts, returns, chargebacks, payment fees, and app costs.",
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
          Related Shopify seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/shopify/profit-calculator", "Profit Calculator"],
            ["/shopify/fee-calculator", "Fee Calculator"],
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