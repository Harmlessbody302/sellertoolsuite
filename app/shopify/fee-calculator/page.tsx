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
    status === "Excellent"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Moderate"
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
    status === "Excellent"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Moderate"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function ShopifyFeeCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [paymentRate, setPaymentRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.3);
  const [transactionFee, setTransactionFee] = useState(0);
  const [appCost, setAppCost] = useState(1);
  const [returnsAllowance, setReturnsAllowance] = useState(1);
  const [otherFees, setOtherFees] = useState(0);

  const result = useMemo(() => {
    const payment = Math.min(95, Math.max(0, paymentRate));
    const transaction = Math.min(95, Math.max(0, transactionFee));

    const revenue = salePrice + shippingCharged;
    const paymentFee = revenue * (payment / 100) + fixedFee;
    const transactionCost = revenue * (transaction / 100);

    const operatingFees = appCost + returnsAllowance + otherFees;
    const totalFees = paymentFee + transactionCost + operatingFees;

    const feePercent = revenue > 0 ? (totalFees / revenue) * 100 : 0;
    const netAfterFees = revenue - totalFees;

    let status = "Healthy";
    let statusText =
      "Your Shopify fee structure looks manageable based on the order revenue entered.";
    let recommendation =
      "This fee structure leaves reasonable room for product cost, ads, shipping, returns, and profit.";

    if (feePercent < 10) {
      status = "Excellent";
      statusText =
        "Your Shopify fees are low relative to the order revenue.";
      recommendation =
        "Your current fee structure appears efficient and may leave strong margin room for product cost, ads, discounts, and returns.";
    } else if (feePercent >= 25) {
      status = "High Cost";
      statusText =
        "Shopify-related fees and per-order costs are consuming a large share of order revenue.";
      recommendation =
        "Review app costs, transaction fees, returns allowance, payment processing assumptions, and pricing before scaling.";
    } else if (feePercent >= 15) {
      status = "Moderate";
      statusText =
        "Shopify fees are meaningful and should be watched closely.";
      recommendation =
        "Make sure your product margin can absorb fees, ads, discounts, returns, shipping costs, and app costs.";
    }

    const getScenarioStatus = (scenarioPercent: number) => {
      if (scenarioPercent < 10) return "Excellent";
      if (scenarioPercent >= 25) return "High Cost";
      if (scenarioPercent >= 15) return "Moderate";
      return "Healthy";
    };

    const scenarios = [2.4, 2.9, 3.4, 4.0].map((rate) => {
      const scenarioPaymentFee = revenue * (rate / 100) + fixedFee;
      const scenarioTotalFees =
        scenarioPaymentFee + transactionCost + operatingFees;

      const scenarioPercent =
        revenue > 0 ? (scenarioTotalFees / revenue) * 100 : 0;

      const scenarioNet = revenue - scenarioTotalFees;

      return {
        rate,
        paymentFee: scenarioPaymentFee,
        totalFees: scenarioTotalFees,
        feePercent: scenarioPercent,
        netAfterFees: scenarioNet,
        status: getScenarioStatus(scenarioPercent),
      };
    });

    return {
      revenue,
      paymentFee,
      transactionCost,
      operatingFees,
      totalFees,
      feePercent,
      netAfterFees,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    paymentRate,
    fixedFee,
    transactionFee,
    appCost,
    returnsAllowance,
    otherFees,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const feeTone =
    result.status === "High Cost"
      ? "bad"
      : result.status === "Moderate"
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Shopify Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Shopify payment processing fees, transaction fees, app costs,
          return allowance, other per-order charges, and total fee impact before
          pricing or scaling a product.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Fee inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale revenue, customer shipping charge, payment processing
            rate, transaction fee, app cost, return allowance, and any extra
            Shopify-related fees.
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
                  label="Shipping charged"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Payment fee assumptions
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

                <NumberInput
                  label="Additional transaction fee"
                  suffix="%"
                  value={transactionFee}
                  onChange={setTransactionFee}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Other per-order costs
              </h3>

              <div className="space-y-4">
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

                <NumberInput
                  label="Other fees"
                  prefix="$"
                  value={otherFees}
                  onChange={setOtherFees}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Shopify fees can vary based
            on payment processor, Shopify plan, third-party transaction fees,
            app costs, refunds, returns, chargebacks, taxes, and store-specific
            settings.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Shopify fee breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Total fees"
              value={toMoney(result.totalFees)}
              helper="Payment, transaction, app, return, and other fees"
              tone={feeTone}
            />

            <MetricCard
              label="Fee percentage"
              value={percent(result.feePercent)}
              helper="Total fees divided by order revenue"
              tone={feeTone}
            />

            <MetricCard
              label="Net after fees"
              value={toMoney(result.netAfterFees)}
              helper="Gross revenue minus entered fees"
              tone={result.netAfterFees > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Gross revenue"
              value={toMoney(result.revenue)}
              helper="Sale price plus customer shipping charge"
              tone="blue"
            />

            <MetricCard
              label="Payment fee"
              value={toMoney(result.paymentFee)}
              helper="Payment processing percentage plus fixed fee"
              tone="warning"
            />

            <MetricCard
              label="Transaction fee"
              value={toMoney(result.transactionCost)}
              helper="Additional transaction fee if not using Shopify Payments"
              tone={result.transactionCost > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="App / return / other fees"
              value={toMoney(result.operatingFees)}
              helper="App cost, return allowance, and extra per-order fees"
              tone="warning"
            />

            <MetricCard
              label="Revenue kept after fees"
              value={percent(
                result.revenue > 0
                  ? (result.netAfterFees / result.revenue) * 100
                  : 0,
              )}
              helper="Net after fees divided by gross revenue"
              tone={result.netAfterFees > 0 ? "good" : "bad"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Total estimated Shopify-related fees are{" "}
                <strong>{toMoney(result.totalFees)}</strong>, consuming{" "}
                <strong>{percent(result.feePercent)}</strong> of order revenue.
              </p>

              <p>
                After estimated fees, you would have{" "}
                <strong>{toMoney(result.netAfterFees)}</strong> left before
                product cost, shipping cost, packaging, ad spend, and profit.
              </p>

              <p>
                Payment processing alone contributes{" "}
                <strong>{toMoney(result.paymentFee)}</strong> to the total fee
                load.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Processing rate comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Rate</th>
                    <th className="px-4 py-3">Payment fee</th>
                    <th className="px-4 py-3">Total fees</th>
                    <th className="px-4 py-3">Fee %</th>
                    <th className="px-4 py-3">Net after fees</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.rate}
                      className={
                        row.rate === paymentRate ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.rate}%</td>
                      <td className="px-4 py-3">{toMoney(row.paymentFee)}</td>
                      <td className="px-4 py-3">{toMoney(row.totalFees)}</td>
                      <td className="px-4 py-3">
                        {percent(row.feePercent)}
                      </td>
                      <td className="px-4 py-3">
                        {toMoney(row.netAfterFees)}
                      </td>
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
          How to use this Shopify Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter order revenue",
              "Add the sale price and any shipping charged to the customer.",
            ],
            [
              "Add payment fees",
              "Enter payment processing rate, fixed payment fee, and transaction fee if applicable.",
            ],
            [
              "Include operating fees",
              "Add app costs, return allowance, and other per-order fees.",
            ],
            [
              "Review fee load",
              "Compare total fees against revenue before pricing, discounting, or scaling ads.",
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
            Common Shopify fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating revenue after fees as profit before product cost and shipping.",
              "Forgetting app costs, return allowance, chargebacks, and other per-order costs.",
              "Ignoring additional transaction fees when not using Shopify Payments.",
              "Using gross revenue to judge profitability without subtracting payment fees.",
              "Running discounts without checking whether fees and costs still leave profit.",
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
            Understanding your Shopify fee results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Excellent:</strong> Fees are
              low relative to order revenue and may leave strong room for
              product cost, ads, and profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Fees
              appear manageable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Fees are
              meaningful and should be checked against margin, ads, and shipping.
            </p>

            <p>
              <strong className="text-red-700">High Cost:</strong> Fees and
              per-order costs are consuming a large share of revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce Shopify fee pressure
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Review app stack",
              "Remove or consolidate apps that add cost without improving profit or conversion.",
            ],
            [
              "Check payment setup",
              "Confirm whether third-party transaction fees apply to your payment method.",
            ],
            [
              "Reduce returns",
              "Improve product pages, sizing, support, and fulfillment quality to reduce refund pressure.",
            ],
            [
              "Build margin buffer",
              "Price with enough room for fees, discounts, ads, shipping, and unexpected costs.",
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