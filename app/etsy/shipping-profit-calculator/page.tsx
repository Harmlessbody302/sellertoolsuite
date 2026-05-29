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
    status === "Strong" || status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Thin Margin" || status === "Shipping Drag"
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
    status === "Strong" || status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Thin"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function EtsyShippingProfitCalculatorPage() {
  const [itemPrice, setItemPrice] = useState(35);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [actualShippingCost, setActualShippingCost] = useState(8);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [productCost, setProductCost] = useState(10);
  const [fees, setFees] = useState(4);

  const result = useMemo(() => {
    const totalRevenue = itemPrice + shippingCharged;
    const totalCosts = actualShippingCost + packagingCost + productCost + fees;
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const shippingDifference = shippingCharged - actualShippingCost;
    const shippingLabel =
      shippingDifference < 0 ? "Shipping subsidy" : "Shipping surplus";

    const breakEvenShipping = Math.max(
      0,
      actualShippingCost + packagingCost + productCost + fees - itemPrice,
    );

    const freeShippingProfit =
      itemPrice - (actualShippingCost + packagingCost + productCost + fees);

    const flat5Profit =
      itemPrice + 5 - (actualShippingCost + packagingCost + productCost + fees);

    const flat10Profit =
      itemPrice + 10 - (actualShippingCost + packagingCost + productCost + fees);

    let status = "Healthy";
    let statusText =
      "Your shipping setup appears sustainable and leaves a healthy margin.";
    let recommendation =
      "Your shipping pricing appears workable. Continue watching actual carrier costs, packaging costs, and refund or replacement losses.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This setup is losing money after shipping, packaging, product cost, and fees.";
      recommendation =
        "Raise the item price, charge more for shipping, reduce fulfillment costs, or revise the listing before scaling sales.";
    } else if (margin < 10) {
      status = "Thin Margin";
      statusText =
        "This setup is still profitable, but shipping and fulfillment costs leave a thin margin.";
      recommendation =
        "Increase price slightly, reduce packaging cost, or avoid stacking discounts and ads on this listing.";
    } else if (shippingDifference < 0 && margin < 25) {
      status = "Shipping Drag";
      statusText =
        "This listing is profitable, but the buyer shipping charge does not fully cover your actual shipping cost.";
      recommendation =
        "Make sure your item price is high enough to absorb the shipping subsidy without weakening your margin.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "Shipping costs are well covered by your pricing, and profitability remains strong.";
      recommendation =
        "This setup may have room for free shipping tests, bundles, or small promotions while preserving profit.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioMargin < 10) return "Thin";
      if (scenarioMargin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [
      { label: "Free shipping", charge: 0 },
      { label: "$5 flat", charge: 5 },
      { label: "Current", charge: shippingCharged },
      { label: "$10 flat", charge: 10 },
    ].map((scenario) => {
      const scenarioRevenue = itemPrice + scenario.charge;
      const scenarioProfit = scenarioRevenue - totalCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        ...scenario,
        revenue: scenarioRevenue,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    return {
      totalRevenue,
      totalCosts,
      profit,
      margin,
      shippingDifference,
      shippingLabel,
      breakEvenShipping,
      freeShippingProfit,
      flat5Profit,
      flat10Profit,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    itemPrice,
    shippingCharged,
    actualShippingCost,
    packagingCost,
    productCost,
    fees,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0
      ? "bad"
      : result.margin < 10
        ? "warning"
        : "good";

  const shippingTone = result.shippingDifference < 0 ? "warning" : "blue";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Shipping Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how shipping charges, packaging, product costs, and
          fulfillment expenses affect Etsy listing profitability.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Shipping inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your listing price, buyer shipping charge, actual shipping
            cost, packaging cost, product cost, and estimated marketplace fees.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item price"
                  prefix="$"
                  value={itemPrice}
                  onChange={setItemPrice}
                />

                <NumberInput
                  label="Shipping charged to buyer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />

                <NumberInput
                  label="Marketplace fees"
                  prefix="$"
                  value={fees}
                  onChange={setFees}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Actual shipping cost"
                  prefix="$"
                  value={actualShippingCost}
                  onChange={setActualShippingCost}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Product cost"
                  prefix="$"
                  value={productCost}
                  onChange={setProductCost}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator estimates shipping profitability. Actual results may
            vary based on carrier rate changes, packaging waste, dimensional
            pricing, insurance, refunds, replacements, and return shipping.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Shipping profitability at a glance.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Revenue minus shipping, product, packaging, and fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Profit divided by total revenue"
              tone={profitTone}
            />

            <MetricCard
              label={result.shippingLabel}
              value={toMoney(Math.abs(result.shippingDifference))}
              helper={
                result.shippingDifference < 0
                  ? "Shipping cost not covered by buyer charge"
                  : "Shipping charge above actual shipping cost"
              }
              tone={shippingTone}
            />

            <MetricCard
              label="Break-even shipping charge"
              value={toMoney(result.breakEvenShipping)}
              helper="Shipping charge needed to avoid losing money"
              tone="blue"
            />

            <MetricCard
              label="Free shipping profit"
              value={toMoney(result.freeShippingProfit)}
              helper="Estimated profit if buyer shipping charge is $0"
              tone={result.freeShippingProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="$5 flat shipping profit"
              value={toMoney(result.flat5Profit)}
              helper="Estimated profit with $5 buyer shipping"
              tone={result.flat5Profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="$10 flat shipping profit"
              value={toMoney(result.flat10Profit)}
              helper="Estimated profit with $10 buyer shipping"
              tone={result.flat10Profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Total combined costs"
              value={toMoney(result.totalCosts)}
              helper="Product, shipping, packaging, and fees"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your total estimated revenue is{" "}
                <strong>{toMoney(result.totalRevenue)}</strong> and your total
                combined cost is{" "}
                <strong>{toMoney(result.totalCosts)}</strong>, leaving estimated
                profit of <strong>{toMoney(result.profit)}</strong>.
              </p>

              {result.shippingDifference < 0 ? (
                <p>
                  You are covering{" "}
                  <strong>{toMoney(Math.abs(result.shippingDifference))}</strong>{" "}
                  of the shipping cost through your item price or profit margin.
                </p>
              ) : (
                <p>
                  Your shipping charge covers actual shipping with{" "}
                  <strong>{toMoney(result.shippingDifference)}</strong> left over
                  before packaging and other costs.
                </p>
              )}

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Shipping strategy comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Strategy</th>
                    <th className="px-4 py-3">Charge</th>
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
                      <td className="px-4 py-3">{toMoney(row.charge)}</td>
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
          How to use this Etsy Shipping Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing price",
              "Use the item price before adding any separate shipping charge.",
            ],
            [
              "Add shipping costs",
              "Enter the actual postage, label, packaging, and product fulfillment costs.",
            ],
            [
              "Compare strategies",
              "Review free shipping, flat-rate shipping, and current shipping charge scenarios.",
            ],
            [
              "Check margin",
              "Use profit and margin to decide whether shipping is weakening the listing.",
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
            Common shipping profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Offering free shipping without raising item price enough.",
              "Ignoring packaging, labels, tape, inserts, and shipping supplies.",
              "Using old carrier rates after postage increases.",
              "Forgetting dimensional weight or oversized package charges.",
              "Scaling ads on listings with weak shipping-adjusted profit.",
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
              <strong className="text-emerald-700">Strong:</strong> Shipping
              and fulfillment costs are well covered with healthy profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The setup
              appears profitable, but costs should still be monitored.
            </p>

            <p>
              <strong className="text-amber-700">Shipping Drag:</strong> You
              are subsidizing shipping and may need a higher item price.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              listing is profitable, but shipping costs leave little room for
              discounts, refunds, or ads.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The setup
              does not cover shipping, product, packaging, and fee costs.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve shipping profitability
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise item price",
              "Build shipping subsidies into the item price when offering free or reduced shipping.",
            ],
            [
              "Reduce package weight",
              "Use lighter packaging, better box sizes, and lower-cost fulfillment methods where possible.",
            ],
            [
              "Review carrier rates",
              "Compare current postage costs and update pricing when shipping rates change.",
            ],
            [
              "Bundle carefully",
              "Use bundles to spread shipping cost across a larger order value and improve margin.",
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
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Profit Calculator"],
            ["/etsy/fee-calculator", "Fee Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/refund-impact-calculator", "Refund Impact Calculator"],
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