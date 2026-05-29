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
        : status === "Low Margin"
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
        : status === "Low"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function MercariProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [productCost, setProductCost] = useState(18);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [mercariFeeRate, setMercariFeeRate] = useState(10);
  const [paymentProcessingFee, setPaymentProcessingFee] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [promotionCost, setPromotionCost] = useState(2);
  const [returnsAllowance, setReturnsAllowance] = useState(1);

  const result = useMemo(() => {
    const sale = Math.max(0, salePrice);
    const product = Math.max(0, productCost);
    const shipping = Math.max(0, shippingCost);
    const packaging = Math.max(0, packagingCost);
    const mercariRate = Math.min(95, Math.max(0, mercariFeeRate)) / 100;
    const processingRate =
      Math.min(95, Math.max(0, paymentProcessingFee)) / 100;
    const fixed = Math.max(0, fixedFee);
    const promo = Math.max(0, promotionCost);
    const returns = Math.max(0, returnsAllowance);

    const marketplaceFees = sale * mercariRate + sale * processingRate + fixed;
    const fulfillmentCosts = shipping + packaging;
    const operatingCosts = promo + returns;

    const totalCosts =
      product + shipping + packaging + marketplaceFees + promo + returns;

    const profit = sale - totalCosts;
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    const roi = product > 0 ? (profit / product) * 100 : 0;
    const breakEvenPrice = totalCosts;
    const feePercent = sale > 0 ? (marketplaceFees / sale) * 100 : 0;
    const totalCostShare = sale > 0 ? (totalCosts / sale) * 100 : 0;
    const promotionShare = sale > 0 ? (promo / sale) * 100 : 0;
    const returnsShare = sale > 0 ? (returns / sale) * 100 : 0;
    const combinedFeeRate = (mercariRate + processingRate) * 100;
    const profitBeforePromotions = profit + promo;
    const profitBeforeReturns = profit + returns;

    let status = "Healthy";
    let statusText =
      "This Mercari listing appears profitable after item cost, shipping, packaging, platform fees, promotion cost, and returns allowance.";
    let recommendation =
      "This listing looks workable. Monitor buyer offers, promotion costs, shipping changes, and returns so they do not reduce margin.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This Mercari listing is losing money or breaking even after estimated costs.";
      recommendation =
        "Raise the sale price, reduce item cost, reduce shipping cost, avoid promotions, or improve sourcing before listing similar items.";
    } else if (margin < 15) {
      status = "Low Margin";
      statusText =
        "This Mercari listing is profitable, but the margin is thin.";
      recommendation =
        "Buyer offers, promotions, refunds, or shipping changes could erase profit quickly. Build more margin before scaling.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This Mercari listing has a strong estimated profit margin.";
      recommendation =
        "This item may have enough room for offers, promotions, and normal marketplace variation if demand supports the price.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioMargin < 15) return "Low";
      if (scenarioMargin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioSale = Math.max(0, sale + change);
      const scenarioFees =
        scenarioSale * mercariRate + scenarioSale * processingRate + fixed;

      const scenarioTotalCosts =
        product + shipping + packaging + scenarioFees + promo + returns;

      const scenarioProfit = scenarioSale - scenarioTotalCosts;

      const scenarioMargin =
        scenarioSale > 0 ? (scenarioProfit / scenarioSale) * 100 : 0;

      return {
        change,
        sale: scenarioSale,
        fees: scenarioFees,
        totalCosts: scenarioTotalCosts,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Product cost", product],
      ["Shipping cost", shipping],
      ["Packaging cost", packaging],
      ["Mercari fees", marketplaceFees],
      ["Promotion cost", promo],
      ["Returns allowance", returns],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: totalCosts > 0 ? (Number(amount) / totalCosts) * 100 : 0,
      revenueShare: sale > 0 ? (Number(amount) / sale) * 100 : 0,
    }));

    return {
      sale,
      product,
      shipping,
      packaging,
      marketplaceFees,
      fulfillmentCosts,
      operatingCosts,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      feePercent,
      totalCostShare,
      promotionShare,
      returnsShare,
      combinedFeeRate,
      profitBeforePromotions,
      profitBeforeReturns,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    productCost,
    shippingCost,
    packagingCost,
    mercariFeeRate,
    paymentProcessingFee,
    fixedFee,
    promotionCost,
    returnsAllowance,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0
      ? "bad"
      : result.margin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Mercari Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Mercari profit after item cost, shipping, packaging, selling
          fees, payment processing, fixed fees, promotions, returns allowance,
          and other listing costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, item cost, shipping, packaging, Mercari fees,
            promotion cost, and returns allowance to estimate real Mercari
            profit.
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
                  label="Shipping cost"
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
                Mercari fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Mercari selling fee"
                  suffix="%"
                  value={mercariFeeRate}
                  onChange={setMercariFeeRate}
                />

                <NumberInput
                  label="Payment processing fee"
                  suffix="%"
                  value={paymentProcessingFee}
                  onChange={setPaymentProcessingFee}
                />

                <NumberInput
                  label="Fixed processing fee"
                  prefix="$"
                  value={fixedFee}
                  onChange={setFixedFee}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Promotion and risk assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Promotion cost"
                  prefix="$"
                  value={promotionCost}
                  onChange={setPromotionCost}
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
            This calculator is an estimate. Actual Mercari fees, payment
            processing costs, shipping costs, promotions, discounts, taxes,
            refunds, returns, damaged items, and category-specific costs may
            vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Mercari profit breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Sale price minus all entered costs and fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Profit divided by sale price"
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
              label="Sale price"
              value={toMoney(result.sale)}
              helper="Entered Mercari sale price"
              tone="blue"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Product, shipping, packaging, fees, promotion, and returns"
            />

            <MetricCard
              label="Mercari fees"
              value={toMoney(result.marketplaceFees)}
              helper="Selling fee, processing fee, and fixed fee"
              tone="warning"
            />

            <MetricCard
              label="Fee percentage"
              value={percent(result.feePercent)}
              helper="Mercari fees divided by sale price"
              tone="warning"
            />

            <MetricCard
              label="Total cost share"
              value={percent(result.totalCostShare)}
              helper="All entered costs divided by sale price"
              tone={result.totalCostShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Combined fee rate"
              value={percent(result.combinedFeeRate)}
              helper="Mercari selling fee plus processing percentage"
              tone="warning"
            />

            <MetricCard
              label="Profit before promotions"
              value={toMoney(result.profitBeforePromotions)}
              helper="Estimated profit before promotion cost"
              tone="blue"
            />

            <MetricCard
              label="Profit before returns"
              value={toMoney(result.profitBeforeReturns)}
              helper="Estimated profit before returns allowance"
              tone="blue"
            />

            <MetricCard
              label="Fulfillment costs"
              value={toMoney(result.fulfillmentCosts)}
              helper="Shipping plus packaging cost"
              tone="warning"
            />

            <MetricCard
              label="Promotion + return costs"
              value={toMoney(result.operatingCosts)}
              helper="Promotion cost plus returns allowance"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This listing sells for{" "}
                <strong>{toMoney(result.sale)}</strong> and has estimated total
                costs of <strong>{toMoney(result.totalCosts)}</strong>, leaving
                estimated profit of <strong>{toMoney(result.profit)}</strong>.
              </p>

              <p>
                Estimated Mercari platform fees are{" "}
                <strong>{toMoney(result.marketplaceFees)}</strong>, or{" "}
                <strong>{percent(result.feePercent)}</strong> of the sale price.
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
                    <th className="px-4 py-3">Fees</th>
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
                      <td className="px-4 py-3">{toMoney(row.sale)}</td>
                      <td className="px-4 py-3">{toMoney(row.fees)}</td>
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
          How to use this Mercari Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add the expected Mercari sale price before shipping, fees, or item cost.",
            ],
            [
              "Add item costs",
              "Include product cost, shipping cost, packaging, and fulfillment supplies.",
            ],
            [
              "Include Mercari fees",
              "Enter selling fee, payment processing rate, fixed fee, promotion cost, and returns allowance.",
            ],
            [
              "Review scenarios",
              "Compare lower and higher sale prices to see how offers or price changes affect profit.",
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
            Mercari cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the estimated
            listing cost.
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
                  <p>{percent(item.revenueShare)} of sale price</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Mercari profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating sale price as profit before subtracting item cost and shipping.",
              "Forgetting fixed processing fees when estimating smaller listings.",
              "Ignoring promotion costs, price drops, or seller-funded discounts.",
              "Accepting buyer offers without recalculating profit after fees.",
              "Comparing listings by sale price only instead of net profit.",
              "Forgetting returns, damaged items, or refund exposure.",
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
            Understanding your Mercari profit results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Profit margin
              is strong enough to support offers, promotions, returns, and
              normal marketplace variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The listing
              appears profitable after entered costs and fees.
            </p>

            <p>
              <strong className="text-amber-700">Low Margin:</strong> The
              listing is profitable, but offers, promotions, shipping changes, or
              refunds could erase profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              listing does not cover all entered costs and fees.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Mercari sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, prep cost, and cleaning supplies.",
              "Shipping cost, packaging cost, labels, tape, and mailers.",
              "Mercari selling fee, payment processing fee, and fixed fee.",
              "Promotion cost, price-drop strategy, discounts, and buyer offer room.",
              "Returns allowance, damaged item risk, and refund exposure.",
              "Minimum acceptable profit before accepting offers.",
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
          Ways to improve Mercari profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise sale price",
              "Use realistic sold comps to test whether a higher price can still convert.",
            ],
            [
              "Lower item cost",
              "Source inventory with enough spread between item cost and expected sale price.",
            ],
            [
              "Reduce shipping drag",
              "Use accurate weights, right-sized packaging, and efficient shipping options.",
            ],
            [
              "Limit promotions",
              "Avoid price drops or promotions that erase profit on low-margin listings.",
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
          Related Mercari seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/mercari/fee-calculator", "Fee Calculator"],
            ["/mercari/pricing-calculator", "Pricing Calculator"],
            ["/mercari/break-even-calculator", "Break-Even Calculator"],
            ["/mercari/promotion-roi-calculator", "Promotion ROI Calculator"],
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