"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { toMoney, toPercent } from "@/lib/etsyCalculations";

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

export default function EtsyBreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState(100);
  const [pricePerSale, setPricePerSale] = useState(25);
  const [costPerSale, setCostPerSale] = useState(12);
  const [feesPerSale, setFeesPerSale] = useState(3);

  const result = useMemo(() => {
    const variableCostsPerSale = costPerSale + feesPerSale;
    const profitPerSale = pricePerSale - variableCostsPerSale;
    const contributionMargin =
      pricePerSale > 0 ? profitPerSale / pricePerSale : 0;

    const breakEvenSales =
      profitPerSale > 0 ? Math.ceil(fixedCosts / profitPerSale) : 0;

    const revenueNeeded = breakEvenSales * pricePerSale;
    const totalVariableCosts = breakEvenSales * variableCostsPerSale;
    const estimatedProfitAtBreakEven =
      breakEvenSales * profitPerSale - fixedCosts;

    const status =
      profitPerSale > 0
        ? "Break-even possible"
        : profitPerSale === 0
          ? "No profit per sale"
          : "Losing money per sale";

    const strength =
      profitPerSale > 0 && contributionMargin >= 0.35
        ? "Strong"
        : profitPerSale > 0
          ? "Healthy"
          : "Weak";

    const recommendation =
      profitPerSale > 0
        ? `You need about ${breakEvenSales} sales to cover your fixed costs with these numbers. After that point, each additional sale contributes about ${toMoney(
            profitPerSale,
          )} before taxes and other unlisted costs.`
        : profitPerSale === 0
          ? "Your average sale does not create profit after product costs and fees. You need to raise prices, lower costs, or reduce fees before you can break even."
          : "Each sale is currently losing money before fixed costs. Breaking even is not possible until your average selling price is higher than your cost and fee total.";

    return {
      variableCostsPerSale,
      profitPerSale,
      contributionMargin,
      breakEvenSales,
      revenueNeeded,
      totalVariableCosts,
      estimatedProfitAtBreakEven,
      status,
      strength,
      recommendation,
    };
  }, [fixedCosts, pricePerSale, costPerSale, feesPerSale]);

  const resultTone =
    result.profitPerSale > 0
      ? "good"
      : result.profitPerSale === 0
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how many Etsy sales you need to cover fixed costs like
          software, supplies, equipment, ads, subscriptions, or other shop
          expenses.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your fixed costs and average sale numbers. Use typical monthly
            expenses if you want to estimate how many sales you need per month.
          </p>

          <div className="mt-6 grid gap-4">
            <NumberInput
              label="Fixed costs"
              prefix="$"
              value={fixedCosts}
              onChange={setFixedCosts}
            />

            <NumberInput
              label="Average selling price"
              prefix="$"
              value={pricePerSale}
              onChange={setPricePerSale}
            />

            <NumberInput
              label="Average cost per sale"
              prefix="$"
              value={costPerSale}
              onChange={setCostPerSale}
            />

            <NumberInput
              label="Estimated fees per sale"
              prefix="$"
              value={feesPerSale}
              onChange={setFeesPerSale}
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            This calculator is an estimate. Actual break-even points may change
            based on Etsy fees, payment processing, refunds, discounts, ads,
            shipping, taxes, and other shop costs.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Your Etsy break-even point at a glance.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                result.profitPerSale > 0
                  ? "bg-emerald-100 text-emerald-700"
                  : result.profitPerSale === 0
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {result.strength}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Sales needed to break even"
              value={result.breakEvenSales.toString()}
              helper="Rounded up to the next full sale"
              tone={resultTone}
            />

            <MetricCard
              label="Revenue needed to break even"
              value={toMoney(result.revenueNeeded)}
              helper="Break-even sales × average selling price"
              tone="blue"
            />

            <MetricCard
              label="Profit per sale before fixed costs"
              value={toMoney(result.profitPerSale)}
              helper="Price minus product costs and fees"
              tone={resultTone}
            />

            <MetricCard
              label="Contribution margin"
              value={toPercent(result.contributionMargin)}
              helper="Profit per sale divided by selling price"
              tone={result.profitPerSale > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Variable costs per sale"
              value={toMoney(result.variableCostsPerSale)}
              helper="Product costs plus estimated fees"
            />

            <MetricCard
              label="Total variable costs at break-even"
              value={toMoney(result.totalVariableCosts)}
              helper="Costs tied to the break-even sales count"
            />

            <MetricCard
              label="Fixed costs"
              value={toMoney(fixedCosts)}
              helper="Costs you entered for the period"
            />

            <MetricCard
              label="Status"
              value={result.status}
              helper="Based on profit per sale"
              tone={resultTone}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.recommendation}</p>

              {result.profitPerSale > 0 ? (
                <p>
                  At the break-even point, your estimated profit after fixed
                  costs is about{" "}
                  <strong>{toMoney(result.estimatedProfitAtBreakEven)}</strong>.
                  This may be slightly above zero because sales are rounded up.
                </p>
              ) : (
                <p>
                  Since profit per sale is not positive, the sales count cannot
                  realistically cover fixed costs.
                </p>
              )}

              <p>
                Your variable costs per sale are{" "}
                <strong>{toMoney(result.variableCostsPerSale)}</strong>, leaving{" "}
                <strong>{toMoney(result.profitPerSale)}</strong> before fixed
                costs.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Etsy Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Use fixed costs",
              "Enter shop costs that do not change much per sale, such as software, equipment, subscriptions, tools, or monthly ad tests.",
            ],
            [
              "Use average selling price",
              "Enter the average amount customers pay per order or listing sale before subtracting costs.",
            ],
            [
              "Use average cost per sale",
              "Include materials, packaging, labels, shipping you pay, production costs, and other per-order expenses.",
            ],
            [
              "Use estimated fees",
              "Include Etsy transaction fees, listing fees, payment processing fees, and any other selling fees per sale.",
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
            Common break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Forgetting fixed costs like software, subscriptions, tools, equipment, or paid design assets.",
              "Using revenue instead of profit per sale to estimate break-even sales.",
              "Ignoring Etsy fees, payment processing fees, refunds, discounts, and shipping costs.",
              "Assuming every product has the same profit margin.",
              "Treating break-even as the goal instead of the minimum point before real profit starts.",
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
              <strong className="text-emerald-700">Break-even possible:</strong>{" "}
              Your average sale has enough profit to eventually cover fixed
              costs.
            </p>

            <p>
              <strong className="text-amber-700">No profit per sale:</strong>{" "}
              Your sale price only covers variable costs, so fixed costs are not
              being paid down.
            </p>

            <p>
              <strong className="text-red-700">Losing money per sale:</strong>{" "}
              Your costs and fees are higher than your selling price.
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
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/fee-calculator", "Etsy Fee Calculator"],
            ["/etsy/pricing-calculator", "Etsy Pricing Calculator"],
            ["/etsy/ad-roi-calculator", "Etsy Ad ROI Calculator"],
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