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
        : status === "Watch"
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
        : status === "Break-even"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function ShopifyBreakEvenCalculatorPage() {
  const [productCost, setProductCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [paymentRate, setPaymentRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.3);
  const [adCost, setAdCost] = useState(5);
  const [appCost, setAppCost] = useState(1);
  const [returnsAllowance, setReturnsAllowance] = useState(1);

  const result = useMemo(() => {
    const rate = Math.min(95, Math.max(0, paymentRate)) / 100;

    const sellerCostsBeforePaymentFee =
      productCost +
      shippingCost +
      packagingCost +
      adCost +
      appCost +
      returnsAllowance -
      shippingCharged;

    const breakEvenPrice =
      rate < 1 ? (sellerCostsBeforePaymentFee + fixedFee) / (1 - rate) : 0;

    const aggressivePrice = breakEvenPrice * 1.08;
    const safePrice = breakEvenPrice * 1.2;
    const targetProfitPrice = breakEvenPrice + 15;

    const evaluatePrice = (price: number) => {
      const paymentFee = price * rate + fixedFee;
      const revenue = price + shippingCharged;
      const totalCosts =
        productCost +
        shippingCost +
        packagingCost +
        adCost +
        appCost +
        returnsAllowance +
        paymentFee;

      const profit = revenue - totalCosts;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

      return {
        paymentFee,
        revenue,
        totalCosts,
        profit,
        margin,
      };
    };

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const aggressiveEval = evaluatePrice(aggressivePrice);
    const targetEval = evaluatePrice(targetProfitPrice);
    const safeEval = evaluatePrice(safePrice);

    const totalSellerCosts =
      productCost +
      shippingCost +
      packagingCost +
      adCost +
      appCost +
      returnsAllowance;

    const fulfillmentCosts = shippingCost + packagingCost;
    const shippingGap = shippingCharged - fulfillmentCosts;

    let status = "Healthy";
    let statusText =
      "Your Shopify break-even price appears workable under the current assumptions.";
    let recommendation =
      "Compare this price against your product positioning, traffic source, conversion rate, and expected customer acquisition cost.";

    if (breakEvenPrice > 60) {
      status = "High";
      statusText =
        "Your Shopify break-even price is high relative to the default cost structure.";
      recommendation =
        "Review product cost, shipping cost, ad cost, app cost, returns allowance, and whether the market can support the needed price.";
    } else if (breakEvenPrice > 45) {
      status = "Watch";
      statusText =
        "Your Shopify break-even price is workable, but it should be watched closely.";
      recommendation =
        "Make sure your price leaves room for discounts, refunds, payment fees, shipping changes, and ad performance swings.";
    } else if (safeEval.margin >= 25) {
      status = "Strong";
      statusText =
        "Your safe-buffer price leaves a strong estimated Shopify margin.";
      recommendation =
        "This setup may leave enough room for ads, discounts, returns, and customer acquisition if demand supports the price.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin >= 25) return "Strong";
      if (margin < 12) return "Watch";
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
        label: "Aggressive",
        price: aggressivePrice,
        ...aggressiveEval,
        status: getScenarioStatus(aggressiveEval.profit, aggressiveEval.margin),
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
        ...targetEval,
        status: getScenarioStatus(targetEval.profit, targetEval.margin),
      },
      {
        label: "Safe buffer",
        price: safePrice,
        ...safeEval,
        status: getScenarioStatus(safeEval.profit, safeEval.margin),
      },
    ];

    return {
      sellerCostsBeforePaymentFee,
      totalSellerCosts,
      fulfillmentCosts,
      shippingGap,
      breakEvenPrice,
      aggressivePrice,
      targetProfitPrice,
      safePrice,
      breakEvenEval,
      aggressiveEval,
      targetEval,
      safeEval,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    productCost,
    shippingCost,
    packagingCost,
    shippingCharged,
    paymentRate,
    fixedFee,
    adCost,
    appCost,
    returnsAllowance,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate the minimum Shopify sale price required to avoid losing
          money after product costs, shipping, packaging, payment fees, ads,
          apps, returns, and customer shipping charges.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter product cost, fulfillment cost, payment processing, ad cost,
            app cost, return allowance, and any shipping charged to the customer.
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
                Payment assumptions
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
                  value={fixedFee}
                  onChange={setFixedFee}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Operating assumptions
              </h3>

              <div className="space-y-4">
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
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify profitability can
            vary based on payment processor, app costs, ad performance, refunds,
            shipping rates, discounts, taxes, and fulfillment decisions.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Minimum viable Shopify pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum product price before profit starts"
              tone="blue"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Break-even price plus $15 target profit"
              tone="good"
            />

            <MetricCard
              label="Safe buffer price"
              value={toMoney(result.safePrice)}
              helper="Break-even price plus 20% cushion"
              tone="good"
            />

            <MetricCard
              label="Aggressive floor"
              value={toMoney(result.aggressivePrice)}
              helper="Lower pricing test near break-even"
              tone="warning"
            />

            <MetricCard
              label="Target profit"
              value={toMoney(result.targetEval.profit)}
              helper="Estimated profit at target-profit price"
              tone={result.targetEval.profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Target margin"
              value={percent(result.targetEval.margin)}
              helper="Profit divided by revenue at target price"
              tone={result.targetEval.margin >= 25 ? "good" : "warning"}
            />

            <MetricCard
              label="Safe buffer margin"
              value={percent(result.safeEval.margin)}
              helper="Estimated margin at safe-buffer price"
              tone={result.safeEval.margin >= 25 ? "good" : "warning"}
            />

            <MetricCard
              label="Payment fee at target"
              value={toMoney(result.targetEval.paymentFee)}
              helper="Estimated payment processing fee at target price"
              tone="warning"
            />

            <MetricCard
              label="Total seller costs"
              value={toMoney(result.totalSellerCosts)}
              helper="Product, shipping, packaging, ads, apps, and returns"
              tone="warning"
            />

            <MetricCard
              label="Shipping and packaging"
              value={toMoney(result.fulfillmentCosts)}
              helper="Actual shipping plus packaging cost"
              tone="warning"
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="Customer shipping charge minus fulfillment costs"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="Costs before payment fee"
              value={toMoney(result.sellerCostsBeforePaymentFee)}
              helper="Seller costs after customer shipping credit"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your estimated Shopify break-even product price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing near
                this point leaves no meaningful profit.
              </p>

              <p>
                A target-profit price of{" "}
                <strong>{toMoney(result.targetProfitPrice)}</strong> produces
                estimated profit of{" "}
                <strong>{toMoney(result.targetEval.profit)}</strong> with a
                margin of <strong>{percent(result.targetEval.margin)}</strong>.
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
                        row.label === "Target profit"
                          ? "bg-blue-50 font-bold"
                          : ""
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
          How to use this Shopify Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product costs",
              "Add product cost, shipping cost, packaging, and any customer-paid shipping.",
            ],
            [
              "Add payment fees",
              "Include payment processing percentage and fixed payment fee per order.",
            ],
            [
              "Include operating costs",
              "Add ad cost, app cost, and returns allowance so break-even is realistic.",
            ],
            [
              "Compare prices",
              "Review break-even, aggressive, target-profit, and safe-buffer pricing scenarios.",
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
            Common Shopify break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Ignoring ad cost per order when estimating break-even price.",
              "Forgetting app costs, packaging, shipping supplies, and return allowance.",
              "Treating customer shipping charges as profit before subtracting actual shipping.",
              "Using break-even price as a selling price instead of building in profit.",
              "Running discounts without checking whether the discounted price still covers costs.",
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
            Understanding your break-even results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Safe-buffer
              pricing leaves a strong estimated margin after entered costs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              break-even price appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Watch:</strong> Break-even
              pricing is getting high and should be compared against demand,
              conversion rate, and competition.
            </p>

            <p>
              <strong className="text-red-700">High:</strong> The required
              break-even price may be difficult to support unless the product
              has strong demand or premium positioning.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to lower your Shopify break-even price
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower product cost",
              "Improve supplier pricing, reduce landed cost, or adjust product bundle structure.",
            ],
            [
              "Reduce fulfillment cost",
              "Use better package sizing, lighter materials, or more efficient shipping options.",
            ],
            [
              "Control ad spend",
              "Avoid relying on a price that only works when customer acquisition costs stay low.",
            ],
            [
              "Raise order value",
              "Use bundles, upsells, and free-shipping thresholds to spread fixed costs over more revenue.",
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
            ["/shopify/pricing-calculator", "Pricing Calculator"],
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