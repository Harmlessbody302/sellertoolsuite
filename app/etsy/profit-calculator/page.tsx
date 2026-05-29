"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import {
  calculateEtsyProfit,
  defaultEtsyFeeSettings,
  toMoney,
  toPercent,
} from "@/lib/etsyCalculations";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "blue" | "warning" | "bad";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    blue: "border-blue-200 bg-blue-50",
    warning: "border-amber-200 bg-amber-50",
    bad: "border-red-200 bg-red-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-gray-600">{helper}</p> : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong Profit"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Healthy"
        ? "bg-green-100 text-green-700"
        : status === "Thin Margin"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong Profit"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Healthy"
        ? "bg-green-100 text-green-700"
        : status === "Thin Margin"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsyProfitCalculatorPage() {
  const [itemPrice, setItemPrice] = useState(25);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [productCost, setProductCost] = useState(6);
  const [shippingCost, setShippingCost] = useState(4);
  const [packagingCost, setPackagingCost] = useState(1);
  const [laborCost, setLaborCost] = useState(5);
  const [otherCost, setOtherCost] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [discountPercent, setDiscountPercent] = useState(0);

  const result = useMemo(() => {
    const calculated = calculateEtsyProfit({
      itemPrice,
      shippingCharged,
      productCost,
      shippingCost,
      packagingCost,
      laborCost,
      otherCost,
      quantity,
      discountRate: discountPercent / 100,
      feeSettings: defaultEtsyFeeSettings,
    });

    const getStatus = (profit: number, margin: number) => {
      if (profit <= 0) return "Losing Money";
      if (margin < 0.15) return "Thin Margin";
      if (margin > 0.45) return "Strong Profit";
      return "Healthy";
    };

    const status = getStatus(calculated.netProfit, calculated.profitMargin);

    const statusText =
      status === "Strong Profit"
        ? "This product has a strong estimated margin and should have room for discounts, ad tests, or cost changes."
        : status === "Healthy"
          ? "This product appears profitable under the current assumptions."
          : status === "Thin Margin"
            ? "This product is profitable, but the margin is thin. Small changes in fees, shipping, discounts, or refunds could weaken profit."
            : "This product appears to lose money under the current assumptions. Review pricing, costs, fees, and discounts before selling.";

    const scenarios = [
      { label: "Current", multiplier: 1 },
      { label: "10% discount", multiplier: 0.9 },
      { label: "15% discount", multiplier: 0.85 },
      { label: "20% discount", multiplier: 0.8 },
    ].map((scenario) => {
      const scenarioResult = calculateEtsyProfit({
        itemPrice: itemPrice * scenario.multiplier,
        shippingCharged,
        productCost,
        shippingCost,
        packagingCost,
        laborCost,
        otherCost,
        quantity,
        discountRate: 0,
        feeSettings: defaultEtsyFeeSettings,
      });

      return {
        ...scenario,
        profit: scenarioResult.netProfit,
        margin: scenarioResult.profitMargin,
        status: getStatus(
          scenarioResult.netProfit,
          scenarioResult.profitMargin,
        ),
      };
    });

    return {
      ...calculated,
      status,
      statusText,
      scenarios,
    };
  }, [
    itemPrice,
    shippingCharged,
    productCost,
    shippingCost,
    packagingCost,
    laborCost,
    otherCost,
    quantity,
    discountPercent,
  ]);

  const tone =
    result.status === "Losing Money"
      ? "bad"
      : result.status === "Thin Margin"
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Etsy profit after marketplace fees, product costs, shipping,
          packaging, labor, discounts, and other expenses.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your price, costs, quantity, and discount to estimate real
            profit after Etsy fees and seller-paid expenses.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale details
              </h3>

              <div className="space-y-4">
                <NumberInput label="Item price" prefix="$" value={itemPrice} onChange={setItemPrice} />
                <NumberInput label="Shipping charged to buyer" prefix="$" value={shippingCharged} onChange={setShippingCharged} />
                <NumberInput label="Quantity sold" value={quantity} onChange={setQuantity} step={1} />
                <NumberInput label="Discount" suffix="%" value={discountPercent} onChange={setDiscountPercent} />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Cost details
              </h3>

              <div className="space-y-4">
                <NumberInput label="Product/material cost" prefix="$" value={productCost} onChange={setProductCost} />
                <NumberInput label="Shipping cost paid by seller" prefix="$" value={shippingCost} onChange={setShippingCost} />
                <NumberInput label="Packaging cost" prefix="$" value={packagingCost} onChange={setPackagingCost} />
                <NumberInput label="Labor cost" prefix="$" value={laborCost} onChange={setLaborCost} />
                <NumberInput label="Other cost" prefix="$" value={otherCost} onChange={setOtherCost} />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Etsy fees, refunds, ad costs,
            taxes, and discounts may affect real profit.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Profitability at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated net profit"
              value={toMoney(result.netProfit)}
              helper="Profit after costs and estimated fees"
              tone={tone}
            />

            <MetricCard
              label="Profit margin"
              value={toPercent(result.profitMargin)}
              helper="Net profit divided by gross revenue"
              tone={tone}
            />

            <MetricCard
              label="Profit per unit"
              value={toMoney(result.profitPerUnit)}
              helper="Estimated profit per item sold"
              tone={tone}
            />

            <MetricCard
              label="Gross revenue"
              value={toMoney(result.grossRevenue)}
              helper="Item price plus buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Revenue after discount"
              value={toMoney(result.discountedRevenue)}
              helper="Revenue after applied discount"
            />

            <MetricCard
              label="Total Etsy/payment fees"
              value={toMoney(result.totalFees)}
              helper="Estimated platform and payment fees"
              tone="warning"
            />

            <MetricCard
              label="Total combined costs"
              value={toMoney(result.totalCosts)}
              helper="Costs plus estimated Etsy/payment fees"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This product generates estimated net profit of{" "}
                <strong>{toMoney(result.netProfit)}</strong> with a margin of{" "}
                <strong>{toPercent(result.profitMargin)}</strong>.
              </p>

              <p>
                Your estimated combined costs, including Etsy/payment fees, are{" "}
                <strong>{toMoney(result.totalCosts)}</strong>.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Discount impact scenarios
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
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
                        row.label === "Current" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{toPercent(row.margin)}</td>
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
          How to use this Etsy Profit Calculator
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Enter real costs", "Include product materials, packaging, labor, shipping, and all seller-paid expenses."],
            ["Adjust pricing", "Test item pricing and shipping combinations to find profitable selling ranges."],
            ["Test discounts", "Use discount scenarios to understand how promotions affect final margin."],
            ["Compare results", "Review profit margin, fee burden, and discount impact before listing."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-bold text-gray-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Ignoring labor when pricing products.",
              "Forgetting packaging and shipping supplies.",
              "Running discounts without recalculating margin.",
              "Treating revenue as profit.",
              "Failing to account for Etsy fees and payment processing.",
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
            Understanding your results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-emerald-700">Strong Profit:</strong>{" "}
              Healthy margin with room for discounts, ads, or scaling.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> Product
              appears profitable under current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> Small
              cost increases or discounts could erase profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Current
              pricing does not cover all estimated costs.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/fee-calculator", "Fee Calculator"],
            ["/etsy/discount-impact-calculator", "Discount Impact Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
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