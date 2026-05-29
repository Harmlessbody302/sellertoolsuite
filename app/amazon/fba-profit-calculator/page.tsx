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

export default function AmazonFBAProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState(35);
  const [productCost, setProductCost] = useState(10);
  const [referralFeeRate, setReferralFeeRate] = useState(15);
  const [fbaFee, setFbaFee] = useState(5.25);
  const [inboundShipping, setInboundShipping] = useState(1.25);
  const [prepPackagingCost, setPrepPackagingCost] = useState(0.75);
  const [storageCost, setStorageCost] = useState(0.4);
  const [ppcCost, setPpcCost] = useState(3);
  const [returnsAllowance, setReturnsAllowance] = useState(1);

  const result = useMemo(() => {
    const referralRate = Math.min(95, Math.max(0, referralFeeRate));
    const referralFee = salePrice * (referralRate / 100);

    const totalAmazonFees = referralFee + fbaFee + storageCost;

    const operationalCosts =
      productCost +
      inboundShipping +
      prepPackagingCost +
      ppcCost +
      returnsAllowance;

    const totalCosts = operationalCosts + totalAmazonFees;

    const profit = salePrice - totalCosts;
    const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;
    const roi = productCost > 0 ? (profit / productCost) * 100 : 0;

    const breakEvenPrice =
      referralRate < 100
        ? (productCost +
            fbaFee +
            storageCost +
            inboundShipping +
            prepPackagingCost +
            ppcCost +
            returnsAllowance) /
          (1 - referralRate / 100)
        : 0;

    const profitBeforeAds = salePrice - (totalCosts - ppcCost);
    const acos = salePrice > 0 ? (ppcCost / salePrice) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "This Amazon FBA product appears profitable after referral fees, FBA fees, ads, storage, returns, and prep costs.";
    let recommendation =
      "This product looks workable. Compare the margin against your category, competition, return rate, and PPC performance before scaling.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This product is losing money or breaking even after estimated Amazon FBA costs.";
      recommendation =
        "Raise the sale price, reduce product cost, lower ad spend, or review FBA, storage, and return assumptions before scaling.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText = "This product is profitable, but the margin is thin.";
      recommendation =
        "Be careful with PPC, returns, storage, and price competition. Small changes could erase profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This product has a strong estimated margin after Amazon FBA costs.";
      recommendation =
        "This may be a strong product candidate if demand, reviews, competition, and inventory risk are also favorable.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioMargin < 10) return "Thin";
      if (scenarioMargin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [-5, 0, 5, 10, 15].map((change) => {
      const scenarioPrice = Math.max(0, salePrice + change);
      const scenarioReferral = scenarioPrice * (referralRate / 100);
      const scenarioAmazonFees = scenarioReferral + fbaFee + storageCost;
      const scenarioCosts = operationalCosts + scenarioAmazonFees;
      const scenarioProfit = scenarioPrice - scenarioCosts;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

      return {
        change,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        amazonFees: scenarioAmazonFees,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    return {
      referralFee,
      totalAmazonFees,
      operationalCosts,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      profitBeforeAds,
      acos,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    referralFeeRate,
    fbaFee,
    inboundShipping,
    prepPackagingCost,
    storageCost,
    ppcCost,
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
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon FBA Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon FBA profit after product cost, referral fees, FBA
          fulfillment fees, inbound shipping, storage, PPC, returns, and prep
          costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your sale price, product cost, Amazon fees, fulfillment costs,
            advertising cost, and return allowance to estimate real FBA profit.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale and product costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Product cost"
                  prefix="$"
                  value={productCost}
                  onChange={setProductCost}
                />

                <NumberInput
                  label="Inbound shipping per unit"
                  prefix="$"
                  value={inboundShipping}
                  onChange={setInboundShipping}
                />

                <NumberInput
                  label="Prep / packaging cost"
                  prefix="$"
                  value={prepPackagingCost}
                  onChange={setPrepPackagingCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Amazon fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Referral fee rate"
                  suffix="%"
                  value={referralFeeRate}
                  onChange={setReferralFeeRate}
                />

                <NumberInput
                  label="FBA fulfillment fee"
                  prefix="$"
                  value={fbaFee}
                  onChange={setFbaFee}
                />

                <NumberInput
                  label="Storage cost per unit"
                  prefix="$"
                  value={storageCost}
                  onChange={setStorageCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Ads and risk assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="PPC / ad cost per sale"
                  prefix="$"
                  value={ppcCost}
                  onChange={setPpcCost}
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
            This calculator is an estimate. Actual Amazon referral fees, FBA
            fees, storage costs, placement fees, PPC results, prep costs,
            returns, taxes, and product-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon FBA profit breakdown.
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
              value={toMoney(Math.max(0, result.breakEvenPrice))}
              helper="Approximate sale price needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Total Amazon fees"
              value={toMoney(result.totalAmazonFees)}
              helper="Referral fee, FBA fee, and storage cost"
              tone="warning"
            />

            <MetricCard
              label="Referral fee"
              value={toMoney(result.referralFee)}
              helper="Estimated category referral fee"
              tone="warning"
            />

            <MetricCard
              label="Profit before advertising"
              value={toMoney(result.profitBeforeAds)}
              helper="Estimated profit before PPC cost per sale"
              tone="blue"
            />

            <MetricCard
              label="Ad cost of sale"
              value={percent(result.acos)}
              helper="PPC cost divided by sale price"
              tone="warning"
            />

            <MetricCard
              label="Operational costs"
              value={toMoney(result.operationalCosts)}
              helper="Product, inbound, prep, PPC, and returns allowance"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="All entered Amazon fees and seller costs"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This product has estimated total costs of{" "}
                <strong>{toMoney(result.totalCosts)}</strong>, leaving
                estimated profit of <strong>{toMoney(result.profit)}</strong>{" "}
                per sale.
              </p>

              <p>
                Amazon fees are estimated at{" "}
                <strong>{toMoney(result.totalAmazonFees)}</strong>, including a
                referral fee of <strong>{toMoney(result.referralFee)}</strong>.
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
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Amazon fees</th>
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
                      <td className="px-4 py-3">{toMoney(row.profit)}</td>
                      <td className="px-4 py-3">{percent(row.margin)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.amazonFees)}
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
          How to use this Amazon FBA Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale price",
              "Add your expected Amazon sale price before coupons, refunds, or returns.",
            ],
            [
              "Add FBA costs",
              "Include product cost, referral fee, FBA fulfillment fee, storage, prep, and inbound shipping.",
            ],
            [
              "Include PPC and returns",
              "Add ad cost per sale and return allowance so profit is not overstated.",
            ],
            [
              "Compare scenarios",
              "Review how different sale prices affect profit, margin, fees, and product viability.",
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
            Common Amazon FBA profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Ignoring PPC cost per sale when estimating true profit.",
              "Forgetting inbound shipping, storage, prep, and packaging costs.",
              "Using revenue as profit before subtracting Amazon fees and product cost.",
              "Underestimating returns, refunds, replacements, and damaged inventory.",
              "Scaling inventory before checking margin under realistic price competition.",
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
            Understanding your FBA profit results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Margin is
              healthy enough to support competition, PPC, and inventory risk.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              product appears profitable after estimated Amazon costs.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              product is profitable, but PPC, returns, storage, or price changes
              could erase profit.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              product does not cover all entered costs and fees.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve Amazon FBA profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower landed cost",
              "Negotiate supplier pricing, reduce inbound shipping, or improve product prep efficiency.",
            ],
            [
              "Control PPC",
              "Track ad cost per sale and avoid scaling campaigns that erase net margin.",
            ],
            [
              "Reduce FBA drag",
              "Review product size tier, packaging, storage, placement, and fulfillment cost impact.",
            ],
            [
              "Build price buffer",
              "Leave room for coupons, returns, competitive price changes, and Amazon fee changes.",
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
          Related Amazon seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/amazon/fee-calculator", "Fee Calculator"],
            ["/amazon/pricing-calculator", "Pricing Calculator"],
            ["/amazon/break-even-calculator", "Break-Even Calculator"],
            ["/amazon/ppc-roi-calculator", "PPC ROI Calculator"],
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