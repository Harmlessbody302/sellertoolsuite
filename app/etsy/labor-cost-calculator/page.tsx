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

export default function EtsyLaborCostCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [materialCost, setMaterialCost] = useState(10);
  const [packagingCost, setPackagingCost] = useState(2);
  const [shippingCost, setShippingCost] = useState(5);
  const [laborMinutes, setLaborMinutes] = useState(45);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [etsyFeeRate, setEtsyFeeRate] = useState(9.5);
  const [fixedFees, setFixedFees] = useState(0.45);
  const [overheadCost, setOverheadCost] = useState(3);

  const result = useMemo(() => {
    const price = Math.max(0, salePrice);
    const materials = Math.max(0, materialCost);
    const packaging = Math.max(0, packagingCost);
    const shipping = Math.max(0, shippingCost);
    const minutes = Math.max(0, laborMinutes);
    const rate = Math.max(0, hourlyRate);
    const feeRate = Math.min(95, Math.max(0, etsyFeeRate));
    const fixed = Math.max(0, fixedFees);
    const overhead = Math.max(0, overheadCost);

    const laborHours = minutes / 60;
    const laborCost = laborHours * rate;
    const etsyFees = price * (feeRate / 100) + fixed;
    const nonLaborCosts = materials + packaging + shipping + overhead + etsyFees;
    const totalCosts = nonLaborCosts + laborCost;

    const profitBeforeLabor = price - nonLaborCosts;
    const profitAfterLabor = price - totalCosts;

    const marginBeforeLabor = price > 0 ? (profitBeforeLabor / price) * 100 : 0;
    const marginAfterLabor = price > 0 ? (profitAfterLabor / price) * 100 : 0;

    const impliedHourlyEarnings =
      laborHours > 0 ? profitBeforeLabor / laborHours : profitBeforeLabor;

    const extraProfitPerLaborHour =
      laborHours > 0 ? profitAfterLabor / laborHours : profitAfterLabor;

    const laborShare = price > 0 ? (laborCost / price) * 100 : 0;
    const costShare = price > 0 ? (totalCosts / price) * 100 : 0;
    const nonLaborCostShare = price > 0 ? (nonLaborCosts / price) * 100 : 0;

    const breakEvenPrice = totalCosts;
    const priceBeforeLaborBreakEven = nonLaborCosts;
    const targetMargin = 25;
    const targetMarginPrice =
      targetMargin >= 100 ? totalCosts : totalCosts / (1 - targetMargin / 100);

    let status = "Healthy";
    let statusText =
      "This Etsy product appears to cover labor and entered seller costs.";
    let recommendation =
      "This listing looks workable, but compare labor time against demand, conversion rate, shop capacity, and repeatability.";

    if (profitAfterLabor <= 0) {
      status = "Losing Money";
      statusText =
        "This Etsy product may not cover labor, materials, shipping, packaging, fees, and overhead.";
      recommendation =
        "Raise the price, reduce production time, lower material costs, batch production, simplify fulfillment, or choose a higher-margin product.";
    } else if (marginAfterLabor < 15) {
      status = "Thin Margin";
      statusText =
        "This product covers labor, but the margin after labor is thin.";
      recommendation =
        "Be careful with discounts, refunds, Offsite Ads, free shipping, and extra customer service because they could erase profit.";
    } else if (marginAfterLabor >= 35) {
      status = "Strong";
      statusText =
        "This product leaves a strong estimated margin after labor and entered costs.";
      recommendation =
        "This item may have room for discounts, ads, packaging upgrades, or production variation if buyer demand supports the price.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0) return "Losing";
      if (margin < 15) return "Thin";
      if (margin >= 35) return "Strong";
      return "Healthy";
    };

    const scenarios = [0.75, 1, 1.25, 1.5, 2].map((multiplier) => {
      const scenarioRate = rate * multiplier;
      const scenarioLaborCost = laborHours * scenarioRate;
      const scenarioTotalCosts = nonLaborCosts + scenarioLaborCost;
      const scenarioProfit = price - scenarioTotalCosts;
      const scenarioMargin = price > 0 ? (scenarioProfit / price) * 100 : 0;

      return {
        label: multiplier === 1 ? "Current" : `${toMoney(scenarioRate)}/hr`,
        hourlyRate: scenarioRate,
        laborCost: scenarioLaborCost,
        totalCosts: scenarioTotalCosts,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Labor cost", laborCost],
      ["Materials", materials],
      ["Packaging", packaging],
      ["Shipping cost", shipping],
      ["Estimated Etsy fees", etsyFees],
      ["Overhead", overhead],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: totalCosts > 0 ? (Number(amount) / totalCosts) * 100 : 0,
      priceShare: price > 0 ? (Number(amount) / price) * 100 : 0,
    }));

    return {
      price,
      materials,
      packaging,
      shipping,
      minutes,
      rate,
      feeRate,
      fixed,
      overhead,
      laborHours,
      laborCost,
      etsyFees,
      nonLaborCosts,
      totalCosts,
      profitBeforeLabor,
      profitAfterLabor,
      marginBeforeLabor,
      marginAfterLabor,
      impliedHourlyEarnings,
      extraProfitPerLaborHour,
      laborShare,
      costShare,
      nonLaborCostShare,
      breakEvenPrice,
      priceBeforeLaborBreakEven,
      targetMarginPrice,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    materialCost,
    packagingCost,
    shippingCost,
    laborMinutes,
    hourlyRate,
    etsyFeeRate,
    fixedFees,
    overheadCost,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profitAfterLabor <= 0
      ? "bad"
      : result.marginAfterLabor < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Labor Cost Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether an Etsy product properly pays for your production
          time after materials, packaging, shipping, Etsy fees, overhead, and
          labor are included.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Labor inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your sale price, production time, target hourly rate, material
            costs, shipping cost, packaging cost, Etsy fee estimate, and overhead
            to estimate true labor-adjusted profit.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale and labor details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Labor time"
                  suffix="min"
                  value={laborMinutes}
                  onChange={setLaborMinutes}
                />

                <NumberInput
                  label="Target hourly rate"
                  prefix="$"
                  value={hourlyRate}
                  onChange={setHourlyRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Product and seller costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Material cost"
                  prefix="$"
                  value={materialCost}
                  onChange={setMaterialCost}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Shipping cost"
                  prefix="$"
                  value={shippingCost}
                  onChange={setShippingCost}
                />

                <NumberInput
                  label="Etsy fee estimate"
                  suffix="%"
                  value={etsyFeeRate}
                  onChange={setEtsyFeeRate}
                />

                <NumberInput
                  label="Fixed Etsy / payment fees"
                  prefix="$"
                  value={fixedFees}
                  onChange={setFixedFees}
                />

                <NumberInput
                  label="Overhead cost"
                  prefix="$"
                  value={overheadCost}
                  onChange={setOverheadCost}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Etsy fees, payment processing
            fees, material costs, production time, shipping costs, packaging,
            labor efficiency, refunds, taxes, and order-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Etsy labor-adjusted profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Profit after labor"
              value={toMoney(result.profitAfterLabor)}
              helper="Sale price minus labor, fees, materials, shipping, packaging, and overhead"
              tone={profitTone}
            />

            <MetricCard
              label="Margin after labor"
              value={percent(result.marginAfterLabor)}
              helper="Profit after labor divided by sale price"
              tone={profitTone}
            />

            <MetricCard
              label="Implied hourly earnings"
              value={toMoney(result.impliedHourlyEarnings)}
              helper="Profit before labor divided by production hours"
              tone={
                result.impliedHourlyEarnings >= result.rate
                  ? "good"
                  : "warning"
              }
            />

            <MetricCard
              label="Extra profit per labor hour"
              value={toMoney(result.extraProfitPerLaborHour)}
              helper="Profit left per labor hour after target labor cost is included"
              tone={result.extraProfitPerLaborHour > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Labor cost"
              value={toMoney(result.laborCost)}
              helper="Labor time multiplied by target hourly rate"
              tone="warning"
            />

            <MetricCard
              label="Labor share"
              value={percent(result.laborShare)}
              helper="Labor cost divided by sale price"
              tone={result.laborShare < 35 ? "good" : "warning"}
            />

            <MetricCard
              label="Production time"
              value={`${result.minutes.toFixed(0)} min`}
              helper={`${result.laborHours.toFixed(2)} production hours per order`}
              tone="blue"
            />

            <MetricCard
              label="Profit before labor"
              value={toMoney(result.profitBeforeLabor)}
              helper="Estimated profit before paying yourself for time"
              tone="blue"
            />

            <MetricCard
              label="Margin before labor"
              value={percent(result.marginBeforeLabor)}
              helper="Margin before labor cost is included"
              tone="blue"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Labor, materials, packaging, shipping, Etsy fees, and overhead"
            />

            <MetricCard
              label="Non-labor costs"
              value={toMoney(result.nonLaborCosts)}
              helper="Costs before labor is added"
            />

            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Approximate price needed to cover all entered costs"
              tone="warning"
            />

            <MetricCard
              label="25% margin price"
              value={toMoney(result.targetMarginPrice)}
              helper="Approximate price needed for 25% margin after labor"
              tone="good"
            />

            <MetricCard
              label="Estimated Etsy fees"
              value={toMoney(result.etsyFees)}
              helper="Percentage fee estimate plus fixed fees"
              tone="warning"
            />

            <MetricCard
              label="Cost share"
              value={percent(result.costShare)}
              helper="Total costs divided by sale price"
              tone={result.costShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Overhead"
              value={toMoney(result.overhead)}
              helper="Utilities, tools, software, workspace, or other overhead estimate"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At a sale price of <strong>{toMoney(result.price)}</strong>,
                your estimated labor cost is{" "}
                <strong>{toMoney(result.laborCost)}</strong>, based on{" "}
                <strong>{result.minutes.toFixed(0)} minutes</strong> at{" "}
                <strong>{toMoney(result.rate)}</strong> per hour.
              </p>

              <p>
                Before labor is included, this product appears to have{" "}
                <strong>{toMoney(result.profitBeforeLabor)}</strong> available
                to pay for your time. That equals about{" "}
                <strong>{toMoney(result.impliedHourlyEarnings)}</strong> per
                production hour before applying your target labor rate.
              </p>

              <p>
                After labor and entered seller costs, estimated profit is{" "}
                <strong>{toMoney(result.profitAfterLabor)}</strong> with a{" "}
                <strong>{percent(result.marginAfterLabor)}</strong> margin.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Labor rate comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Hourly rate</th>
                    <th className="px-4 py-3">Labor cost</th>
                    <th className="px-4 py-3">Total costs</th>
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
                      <td className="px-4 py-3">{toMoney(row.hourlyRate)}</td>
                      <td className="px-4 py-3">{toMoney(row.laborCost)}</td>
                      <td className="px-4 py-3">{toMoney(row.totalCosts)}</td>
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
          How to use this Etsy Labor Cost Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add the Etsy product price before subtracting materials, labor, fees, or fulfillment costs.",
            ],
            [
              "Add labor time",
              "Enter how many minutes it takes to make, prep, customize, package, or fulfill the order.",
            ],
            [
              "Choose hourly rate",
              "Use the hourly amount you want your time to earn before deciding whether the product works.",
            ],
            [
              "Review margin",
              "Compare profit before and after labor to see whether the listing truly pays for your time.",
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
            Etsy labor cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the estimated
            product cost structure.
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
                  <p>{percent(item.priceShare)} of sale price</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy labor pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing handmade products from materials alone.",
              "Counting production time but forgetting packaging, messages, personalization, or fulfillment work.",
              "Using revenue as profit before subtracting Etsy fees and labor.",
              "Running discounts without checking whether labor is still paid.",
              "Scaling a product that sells well but pays too little per hour.",
              "Ignoring overhead such as tools, software, utilities, workspace, or equipment wear.",
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
            Understanding your Etsy labor results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The product
              appears to pay for labor and still leaves a strong estimated
              margin.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              product appears to cover labor and entered seller costs under the
              current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              product covers labor, but discounts, refunds, ads, or extra
              fulfillment work could reduce profit quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              product may not cover labor, materials, fees, shipping, packaging,
              and overhead at the current price.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Etsy sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Product making time, prep time, and finishing time.",
              "Personalization, customization, and message handling time.",
              "Packaging, labeling, and fulfillment time.",
              "Target hourly rate for your work.",
              "Materials, supplies, packaging, and shipping cost.",
              "Etsy fees, payment processing, ads, refunds, and overhead.",
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
          Ways to improve Etsy labor profitability
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Batch production",
              "Make or prep multiple units at once to reduce labor time per order.",
            ],
            [
              "Raise price",
              "Increase the product price when the item sells but does not pay enough for your time.",
            ],
            [
              "Simplify fulfillment",
              "Reduce packaging complexity, customization steps, or manual message work.",
            ],
            [
              "Improve product mix",
              "Prioritize products with better profit, faster production, and lower support burden.",
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
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/seller-cost-checklist", "Seller Cost Checklist"],
            ["/etsy/product-cost-calculator", "Product Cost Calculator"],
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