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
        : status === "Tight"
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
        : status === "Break-even"
          ? "bg-blue-100 text-blue-700"
          : status === "Tight"
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function FacebookMarketplaceBreakEvenCalculatorPage() {
  const [itemCost, setItemCost] = useState(35);
  const [shippingCost, setShippingCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [negotiationDiscount, setNegotiationDiscount] = useState(10);
  const [targetProfit, setTargetProfit] = useState(35);

  const result = useMemo(() => {
    const item = Math.max(0, itemCost);
    const shipping = Math.max(0, shippingCost);
    const delivery = Math.max(0, deliveryCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, platformFeeRate));
    const negotiationRate = Math.min(95, Math.max(0, negotiationDiscount));
    const target = Math.max(0, targetProfit);

    const fixedCosts = item + shipping + delivery + packaging;
    const feeMultiplier = 1 - feeRate / 100;
    const negotiationMultiplier = 1 - negotiationRate / 100;
    const totalMultiplier = feeMultiplier * negotiationMultiplier;

    const evaluatePrice = (listingPrice: number) => {
      const acceptedPrice = listingPrice * negotiationMultiplier;
      const platformFee = acceptedPrice * (feeRate / 100);
      const profit = acceptedPrice - platformFee - fixedCosts;
      const margin = acceptedPrice > 0 ? (profit / acceptedPrice) * 100 : 0;
      const feeShare =
        acceptedPrice > 0 ? (platformFee / acceptedPrice) * 100 : 0;
      const costShare =
        acceptedPrice > 0 ? (fixedCosts / acceptedPrice) * 100 : 0;

      return {
        acceptedPrice,
        platformFee,
        profit,
        margin,
        feeShare,
        costShare,
      };
    };

    const breakEvenPrice =
      totalMultiplier > 0 ? fixedCosts / totalMultiplier : 0;

    const targetProfitPrice =
      totalMultiplier > 0 ? (fixedCosts + target) / totalMultiplier : 0;

    const aggressiveFloor = targetProfitPrice * 0.9;
    const safeBuffer = targetProfitPrice * 1.15;

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetEval = evaluatePrice(targetProfitPrice);
    const aggressiveEval = evaluatePrice(aggressiveFloor);
    const safeEval = evaluatePrice(safeBuffer);

    const negotiationDiscountAmount =
      targetProfitPrice * (negotiationRate / 100);

    const totalCostPressure =
      fixedCosts + targetEval.platformFee + negotiationDiscountAmount;

    let status = "Healthy";
    let statusText =
      "Your Facebook Marketplace cost structure produces a workable break-even listing price.";
    let recommendation =
      "Compare this pricing range against similar local listings before accepting buyer offers.";

    if (breakEvenPrice <= 0 || totalMultiplier <= 0) {
      status = "Check Inputs";
      statusText =
        "The break-even price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your platform fee and negotiation discount assumptions are realistic and below 100%.";
    } else if (targetEval.margin < 15) {
      status = "Tight";
      statusText =
        "Your target-profit price leaves limited room for negotiation or extra fulfillment costs.";
      recommendation =
        "Consider raising your listing price, reducing delivery costs, or accepting fewer low offers.";
    } else if (targetEval.margin >= 40) {
      status = "Strong";
      statusText =
        "Your target-profit price leaves strong room for negotiation and local selling variation.";
      recommendation =
        "This item may have enough margin for buyer negotiation, local delivery, or small price drops.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 15) return "Tight";
      if (margin >= 40) return "Strong";
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
        price: aggressiveFloor,
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
        price: safeBuffer,
        ...safeEval,
        status: getScenarioStatus(safeEval.profit, safeEval.margin),
      },
    ];

    const costBreakdown = [
      ["Item cost", item],
      ["Shipping cost", shipping],
      ["Delivery / fuel cost", delivery],
      ["Packaging cost", packaging],
      ["Platform fee at target", targetEval.platformFee],
      ["Negotiation discount", negotiationDiscountAmount],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalCostPressure > 0
          ? (Number(amount) / totalCostPressure) * 100
          : 0,
      acceptedShare:
        targetEval.acceptedPrice > 0
          ? (Number(amount) / targetEval.acceptedPrice) * 100
          : 0,
    }));

    return {
      item,
      shipping,
      delivery,
      packaging,
      feeRate,
      negotiationRate,
      fixedCosts,
      breakEvenPrice,
      targetProfitPrice,
      aggressiveFloor,
      safeBuffer,
      breakEvenEval,
      targetEval,
      aggressiveEval,
      safeEval,
      negotiationDiscountAmount,
      totalCostPressure,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    itemCost,
    shippingCost,
    deliveryCost,
    packagingCost,
    platformFeeRate,
    negotiationDiscount,
    targetProfit,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Facebook Marketplace Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate the minimum Facebook Marketplace listing price needed to
          avoid losing money after item cost, shipping, local delivery, fuel,
          packaging, platform fees, and expected buyer negotiation.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter item cost, shipping, delivery, packaging, marketplace fee
            assumptions, negotiation discount, and target profit to estimate
            viable Facebook Marketplace listing prices.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Product and fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Shipping cost"
                  prefix="$"
                  value={shippingCost}
                  onChange={setShippingCost}
                />

                <NumberInput
                  label="Delivery / fuel cost"
                  prefix="$"
                  value={deliveryCost}
                  onChange={setDeliveryCost}
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
                Fee and negotiation assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Platform fee rate"
                  suffix="%"
                  value={platformFeeRate}
                  onChange={setPlatformFeeRate}
                />

                <NumberInput
                  label="Expected negotiation discount"
                  suffix="%"
                  value={negotiationDiscount}
                  onChange={setNegotiationDiscount}
                />

                <NumberInput
                  label="Target profit"
                  prefix="$"
                  value={targetProfit}
                  onChange={setTargetProfit}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Facebook Marketplace fees,
            shipping costs, local delivery costs, fuel costs, buyer negotiation,
            cancellations, taxes, payment processing, and account-specific
            charges may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Minimum viable Facebook Marketplace pricing thresholds.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Break-even listing price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum listing price before profit starts"
              tone="blue"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Estimated listing price needed for target profit"
              tone="good"
            />

            <MetricCard
              label="Safe buffer price"
              value={toMoney(result.safeBuffer)}
              helper="Target profit price plus 15% cushion"
              tone="good"
            />

            <MetricCard
              label="Aggressive floor"
              value={toMoney(result.aggressiveFloor)}
              helper="Lower pricing test near target-profit price"
              tone="warning"
            />

            <MetricCard
              label="Target profit"
              value={toMoney(result.targetEval.profit)}
              helper="Estimated profit at target-profit listing price"
              tone={result.targetEval.profit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Target margin"
              value={percent(result.targetEval.margin)}
              helper="Profit divided by accepted buyer price"
              tone={result.targetEval.margin >= 40 ? "good" : "warning"}
            />

            <MetricCard
              label="Accepted price after negotiation"
              value={toMoney(result.targetEval.acceptedPrice)}
              helper="Target listing price after expected buyer negotiation"
              tone="blue"
            />

            <MetricCard
              label="Negotiation discount"
              value={toMoney(result.negotiationDiscountAmount)}
              helper="Estimated discount from target-profit listing price"
              tone="warning"
            />

            <MetricCard
              label="Fixed costs"
              value={toMoney(result.fixedCosts)}
              helper="Item, shipping, delivery, packaging, and fulfillment costs"
            />

            <MetricCard
              label="Platform fee at target"
              value={toMoney(result.targetEval.platformFee)}
              helper="Estimated platform fee after accepted buyer price"
              tone={result.targetEval.platformFee > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Fee share"
              value={percent(result.targetEval.feeShare)}
              helper="Platform fee divided by accepted buyer price"
              tone={result.targetEval.feeShare > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Fixed cost share"
              value={percent(result.targetEval.costShare)}
              helper="Fixed costs divided by accepted buyer price"
              tone={result.targetEval.costShare < 65 ? "good" : "warning"}
            />

            <MetricCard
              label="Total cost pressure"
              value={toMoney(result.totalCostPressure)}
              helper="Fixed costs, platform fee, and negotiation discount"
            />

            <MetricCard
              label="Buyer discount rate"
              value={percent(result.negotiationRate)}
              helper="Expected buyer negotiation percentage"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your estimated Facebook Marketplace break-even listing price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing below
                this may make the sale unprofitable after buyer negotiation and
                fulfillment costs.
              </p>

              <p>
                To earn your target profit, list at approximately{" "}
                <strong>{toMoney(result.targetProfitPrice)}</strong>, which may
                become about{" "}
                <strong>{toMoney(result.targetEval.acceptedPrice)}</strong>{" "}
                after buyer negotiation.
              </p>

              <p>
                At the target-profit price, estimated profit is{" "}
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
                    <th className="px-4 py-3">Listing</th>
                    <th className="px-4 py-3">Accepted</th>
                    <th className="px-4 py-3">Fee</th>
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
                        row.label === "Target profit"
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.acceptedPrice)}
                      </td>
                      <td className="px-4 py-3">
                        {toMoney(row.platformFee)}
                      </td>
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
          How to use this Facebook Marketplace Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Add item cost, shipping, delivery, fuel, packaging, and fulfillment expenses.",
            ],
            [
              "Add fee assumptions",
              "Include marketplace fee or payment processing percentage if the sale uses checkout or shipping.",
            ],
            [
              "Estimate negotiation",
              "Enter the buyer discount you expect from local offers or accepted counteroffers.",
            ],
            [
              "Compare prices",
              "Review break-even, aggressive, target-profit, and safe-buffer listing prices.",
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
            Facebook Marketplace cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the target-profit
            listing estimate.
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
                  <p>{percent(item.share)} of total cost pressure</p>
                  <p>{percent(item.acceptedShare)} of accepted price</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Facebook Marketplace break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without including delivery, fuel, or packaging.",
              "Forgetting that local buyers often negotiate below the listing price.",
              "Treating the listing price as the accepted sale price.",
              "Ignoring shipping, checkout, or payment processing fees when applicable.",
              "Accepting low offers without recalculating break-even profit.",
              "Comparing only active listings instead of realistic local sold prices.",
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
            Understanding your Facebook Marketplace break-even results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Target-profit
              pricing leaves strong room for negotiation, delivery costs, and
              normal local marketplace variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              break-even and target-profit prices appear workable under the
              current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Tight:</strong> The sale may
              still work, but buyer negotiation, delivery, shipping, or fee
              changes could reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Fee or
              negotiation assumptions may be preventing a realistic calculation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Facebook Marketplace sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, repair cost, cleaning cost, and prep supplies.",
              "Shipping cost, delivery cost, fuel cost, packaging, and pickup expenses.",
              "Expected buyer negotiation discount and minimum acceptable offer.",
              "Marketplace fee, checkout fee, shipping fee, or payment processing cost when applicable.",
              "Target profit before accepting low offers or offering delivery.",
              "Local sold comps, demand, distance, pickup effort, and safety/time cost.",
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
          Ways to lower your Facebook Marketplace break-even price
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower item cost",
              "Source inventory with enough spread between cost and realistic local sold prices.",
            ],
            [
              "Reduce delivery drag",
              "Limit delivery distance, charge for delivery, or use pickup when delivery erases profit.",
            ],
            [
              "Build negotiation room",
              "List high enough to accept reasonable buyer offers without dropping below break-even.",
            ],
            [
              "Improve listing quality",
              "Use better photos, clear condition notes, measurements, and fast replies to support price.",
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
          Related Facebook Marketplace seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/facebook-marketplace/profit-calculator", "Profit Calculator"],
            ["/facebook-marketplace/pricing-calculator", "Pricing Calculator"],
            ["/facebook-marketplace/negotiation-calculator", "Negotiation Calculator"],
            ["/facebook-marketplace/shipping-profit-calculator", "Shipping Profit Calculator"],
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