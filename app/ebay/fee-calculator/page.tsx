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
    status === "Low"
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
    status === "Low"
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

export default function EbayFeeCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [shippingCharged, setShippingCharged] = useState(6);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedFee, setFixedFee] = useState(0.4);
  const [promotedRate, setPromotedRate] = useState(5);
  const [internationalFeeRate, setInternationalFeeRate] = useState(0);
  const [otherFees, setOtherFees] = useState(0);

  const result = useMemo(() => {
    const grossRevenue = salePrice + shippingCharged;

    const finalValueFee = grossRevenue * (finalValueFeeRate / 100);
    const promotedFee = grossRevenue * (promotedRate / 100);
    const internationalFee = grossRevenue * (internationalFeeRate / 100);

    const totalFees =
      finalValueFee +
      fixedFee +
      promotedFee +
      internationalFee +
      otherFees;

    const feePercentage =
      grossRevenue > 0 ? (totalFees / grossRevenue) * 100 : 0;

    const netRevenue = grossRevenue - totalFees;

    let status = "Low";
    let message =
      "Your estimated eBay fee load is relatively low and leaves more revenue available for product cost, shipping cost, and profit.";
    let recommendation =
      "Continue checking category fee rates and promoted listing costs before scaling this listing.";

    if (feePercentage > 25) {
      status = "High";
      message =
        "Fees are consuming a large share of gross revenue. This listing may need stronger pricing, lower ad spend, or lower costs to remain profitable.";
      recommendation =
        "Review promoted listing rate, category fee rate, shipping pricing, and item price before relying on this listing for profit.";
    } else if (feePercentage > 18) {
      status = "Moderate";
      message =
        "Fees are noticeable and should be reviewed against your expected profit margin.";
      recommendation =
        "Make sure your item cost, shipping cost, packaging, and offer strategy still leave enough profit after these fees.";
    }

    const getStatus = (percent: number) => {
      if (percent > 25) return "High";
      if (percent > 18) return "Moderate";
      return "Low";
    };

    const scenarios = [0, 2, 5, 8, 10].map((promo) => {
      const promoFee = grossRevenue * (promo / 100);

      const fee =
        finalValueFee +
        fixedFee +
        promoFee +
        internationalFee +
        otherFees;

      const percent = grossRevenue > 0 ? (fee / grossRevenue) * 100 : 0;

      return {
        promo,
        fee,
        percent,
        netRevenue: grossRevenue - fee,
        status: getStatus(percent),
      };
    });

    return {
      grossRevenue,
      finalValueFee,
      fixedFee,
      promotedFee,
      internationalFee,
      otherFees,
      totalFees,
      feePercentage,
      netRevenue,
      status,
      message,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    finalValueFeeRate,
    fixedFee,
    promotedRate,
    internationalFeeRate,
    otherFees,
  ]);

  const percent = (n: number) => `${n.toFixed(1)}%`;

  const feeTone =
    result.status === "Low"
      ? "good"
      : result.status === "Moderate"
        ? "warning"
        : "bad";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate eBay final value fees, promoted listing costs, international
          charges, fixed order fees, and total fee impact before pricing or
          promoting a listing.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Fee inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your sale price, buyer-paid shipping, eBay fee rate, promoted
            listing rate, and any additional selling fees.
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
                Fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Final value fee rate"
                  suffix="%"
                  value={finalValueFeeRate}
                  onChange={setFinalValueFeeRate}
                />

                <NumberInput
                  label="Fixed order fee"
                  prefix="$"
                  value={fixedFee}
                  onChange={setFixedFee}
                />

                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedRate}
                  onChange={setPromotedRate}
                />

                <NumberInput
                  label="International fee rate"
                  suffix="%"
                  value={internationalFeeRate}
                  onChange={setInternationalFeeRate}
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
            This calculator is an estimate. Actual eBay fees may vary by
            category, promoted listing strategy, international destination,
            shipping settings, account status, refunds, and taxes.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay fee breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Total estimated fees"
              value={toMoney(result.totalFees)}
              helper="All entered eBay selling fees combined"
              tone={feeTone}
            />

            <MetricCard
              label="Effective fee rate"
              value={percent(result.feePercentage)}
              helper="Total fees divided by gross revenue"
              tone={feeTone}
            />

            <MetricCard
              label="Gross revenue"
              value={toMoney(result.grossRevenue)}
              helper="Sale price plus buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Net revenue after fees"
              value={toMoney(result.netRevenue)}
              helper="Gross revenue minus estimated fees"
              tone="good"
            />

            <MetricCard
              label="Final value fee"
              value={toMoney(result.finalValueFee)}
              helper="Category percentage fee estimate"
              tone="warning"
            />

            <MetricCard
              label="Promoted listing fee"
              value={toMoney(result.promotedFee)}
              helper="Estimated ad fee from promoted listing rate"
              tone="warning"
            />

            <MetricCard
              label="Fixed order fee"
              value={toMoney(result.fixedFee)}
              helper="Flat per-order transaction charge"
            />

            <MetricCard
              label="International / other fees"
              value={toMoney(result.internationalFee + result.otherFees)}
              helper="International fee plus any extra fees entered"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.message}</p>

              <p>
                Estimated fees total{" "}
                <strong>{toMoney(result.totalFees)}</strong>, consuming{" "}
                <strong>{percent(result.feePercentage)}</strong> of gross
                revenue.
              </p>

              <p>
                After fees, estimated revenue available for product cost,
                shipping cost, packaging, and profit is{" "}
                <strong>{toMoney(result.netRevenue)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Promoted listing comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Promo rate</th>
                    <th className="px-4 py-3">Total fees</th>
                    <th className="px-4 py-3">Fee %</th>
                    <th className="px-4 py-3">Net revenue</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.promo}
                      className={
                        row.promo === promotedRate ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.promo}%</td>
                      <td className="px-4 py-3">{toMoney(row.fee)}</td>
                      <td className="px-4 py-3">{percent(row.percent)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.netRevenue)}
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
          How to use this eBay Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sale revenue",
              "Add your item sale price and any shipping amount charged to the buyer.",
            ],
            [
              "Add eBay fees",
              "Enter the final value fee, fixed order fee, and any international or extra fees.",
            ],
            [
              "Test promoted rates",
              "Compare different promoted listing rates to see how ads change total fees.",
            ],
            [
              "Review net revenue",
              "Use revenue after fees before calculating item cost, shipping cost, and final profit.",
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
            Common eBay fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Ignoring that eBay fees may apply to item price plus shipping.",
              "Forgetting promoted listing fees when estimating profit.",
              "Using one fee rate for every category without checking the actual category.",
              "Ignoring international fees, extra fees, refunds, and seller-specific adjustments.",
              "Treating revenue after fees as profit before subtracting product and shipping costs.",
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
            Understanding your fee results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-emerald-700">Low:</strong> Fees are a
              smaller share of revenue and may leave more room for profit.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Fees are
              noticeable and should be reviewed against expected item margin.
            </p>

            <p>
              <strong className="text-red-700">High:</strong> Fees may consume
              too much revenue unless pricing, sourcing, or ad performance is
              strong.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to reduce eBay fee pressure
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Review promoted rates",
              "Avoid using high promoted listing rates unless they produce profitable sales.",
            ],
            [
              "Check category fees",
              "Confirm the correct final value fee for your item category before pricing.",
            ],
            [
              "Improve pricing buffer",
              "Build enough margin into the price to absorb fees, offers, and returns.",
            ],
            [
              "Track net revenue",
              "Use revenue after fees as the starting point for profit calculations.",
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
          Related eBay seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
            ["/ebay/break-even-calculator", "Break-Even Calculator"],
            ["/ebay/shipping-profit-calculator", "Shipping Profit Calculator"],
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