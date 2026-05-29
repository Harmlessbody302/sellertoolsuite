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
        : status === "Thin"
          ? "bg-amber-100 text-amber-700"
          : status === "Break-even"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function FacebookMarketplacePricingCalculatorPage() {
  const [itemCost, setItemCost] = useState(35);
  const [shippingCost, setShippingCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [negotiationDiscount, setNegotiationDiscount] = useState(10);
  const [targetProfit, setTargetProfit] = useState(35);
  const [targetMargin, setTargetMargin] = useState(35);

  const result = useMemo(() => {
    const item = Math.max(0, itemCost);
    const shipping = Math.max(0, shippingCost);
    const delivery = Math.max(0, deliveryCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, platformFeeRate));
    const discountRate = Math.min(95, Math.max(0, negotiationDiscount));
    const desiredProfit = Math.max(0, targetProfit);
    const desiredMargin = Math.min(90, Math.max(0, targetMargin));

    const fixedCosts = item + shipping + delivery + packaging;
    const feeMultiplier = 1 - feeRate / 100;
    const negotiationMultiplier = 1 - discountRate / 100;
    const totalMultiplier = feeMultiplier * negotiationMultiplier;

    const evaluatePrice = (listingPrice: number) => {
      const acceptedPrice = listingPrice * negotiationMultiplier;
      const platformFee = acceptedPrice * (feeRate / 100);
      const totalCosts = fixedCosts + platformFee;
      const profit = acceptedPrice - totalCosts;
      const margin = acceptedPrice > 0 ? (profit / acceptedPrice) * 100 : 0;
      const roi = item > 0 ? (profit / item) * 100 : 0;
      const feeShare =
        acceptedPrice > 0 ? (platformFee / acceptedPrice) * 100 : 0;
      const fixedCostShare =
        acceptedPrice > 0 ? (fixedCosts / acceptedPrice) * 100 : 0;
      const totalCostShare =
        acceptedPrice > 0 ? (totalCosts / acceptedPrice) * 100 : 0;

      return {
        acceptedPrice,
        platformFee,
        totalCosts,
        profit,
        margin,
        roi,
        feeShare,
        fixedCostShare,
        totalCostShare,
      };
    };

    const breakEvenPrice =
      totalMultiplier > 0 ? fixedCosts / totalMultiplier : 0;

    const targetProfitPrice =
      totalMultiplier > 0 ? (fixedCosts + desiredProfit) / totalMultiplier : 0;

    const targetMarginPrice =
      totalMultiplier > 0 && desiredMargin < 100
        ? fixedCosts / ((1 - desiredMargin / 100) * totalMultiplier)
        : 0;

    const recommendedPrice = Math.max(
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
    );

    const offerFloor = Math.max(breakEvenPrice, recommendedPrice * 0.9);
    const safeBufferPrice = recommendedPrice * 1.15;

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetProfitEval = evaluatePrice(targetProfitPrice);
    const targetMarginEval = evaluatePrice(targetMarginPrice);
    const recommendedEval = evaluatePrice(recommendedPrice);
    const offerFloorEval = evaluatePrice(offerFloor);
    const safeBufferEval = evaluatePrice(safeBufferPrice);

    const negotiationDiscountAmount =
      recommendedPrice * (discountRate / 100);

    const totalCostPressure =
      recommendedEval.totalCosts + negotiationDiscountAmount;

    let status = "Healthy";
    let statusText =
      "Your recommended Facebook Marketplace listing price should support your target goals.";
    let recommendation =
      "This price gives you room for normal buyer negotiation while protecting profit.";

    if (recommendedPrice <= 0 || totalMultiplier <= 0) {
      status = "Check Inputs";
      statusText =
        "The recommended price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your platform fee, negotiation discount, and margin assumptions are realistic and below 100%.";
    } else if (recommendedEval.margin < 15) {
      status = "Thin Margin";
      statusText =
        "This price leaves limited room for buyer negotiation or extra fulfillment costs.";
      recommendation =
        "Consider increasing your listing price, reducing delivery costs, or accepting fewer low offers.";
    } else if (recommendedEval.margin >= 40) {
      status = "Strong";
      statusText =
        "This price leaves strong room for negotiation and local selling variation.";
      recommendation =
        "This listing may have enough margin for delivery, negotiation, or minor price drops.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 15) return "Thin";
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
        label: "Offer floor",
        price: offerFloor,
        ...offerFloorEval,
        status: getScenarioStatus(offerFloorEval.profit, offerFloorEval.margin),
      },
      {
        label: "Target profit",
        price: targetProfitPrice,
        ...targetProfitEval,
        status: getScenarioStatus(
          targetProfitEval.profit,
          targetProfitEval.margin,
        ),
      },
      {
        label: "Target margin",
        price: targetMarginPrice,
        ...targetMarginEval,
        status: getScenarioStatus(
          targetMarginEval.profit,
          targetMarginEval.margin,
        ),
      },
      {
        label: "Recommended",
        price: recommendedPrice,
        ...recommendedEval,
        status: getScenarioStatus(
          recommendedEval.profit,
          recommendedEval.margin,
        ),
      },
      {
        label: "Safe buffer",
        price: safeBufferPrice,
        ...safeBufferEval,
        status: getScenarioStatus(safeBufferEval.profit, safeBufferEval.margin),
      },
    ];

    const costBreakdown = [
      ["Item cost", item],
      ["Shipping cost", shipping],
      ["Delivery / fuel cost", delivery],
      ["Packaging cost", packaging],
      ["Platform fee at price", recommendedEval.platformFee],
      ["Negotiation discount", negotiationDiscountAmount],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalCostPressure > 0
          ? (Number(amount) / totalCostPressure) * 100
          : 0,
      acceptedShare:
        recommendedEval.acceptedPrice > 0
          ? (Number(amount) / recommendedEval.acceptedPrice) * 100
          : 0,
    }));

    return {
      item,
      shipping,
      delivery,
      packaging,
      feeRate,
      discountRate,
      fixedCosts,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      offerFloor,
      safeBufferPrice,
      acceptedPrice: recommendedEval.acceptedPrice,
      platformFee: recommendedEval.platformFee,
      totalCosts: recommendedEval.totalCosts,
      profit: recommendedEval.profit,
      margin: recommendedEval.margin,
      roi: recommendedEval.roi,
      feeShare: recommendedEval.feeShare,
      fixedCostShare: recommendedEval.fixedCostShare,
      totalCostShare: recommendedEval.totalCostShare,
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
    targetMargin,
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
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Facebook Marketplace Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Find a profitable Facebook Marketplace listing price based on item
          cost, shipping, delivery, fuel, packaging, platform fees, expected
          buyer negotiation, target profit, and target margin.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter item cost, delivery expenses, fee assumptions, negotiation
            discount, target profit, and target margin to estimate a recommended
            Facebook Marketplace listing price.
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
                Fee and pricing targets
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

                <NumberInput
                  label="Target margin"
                  suffix="%"
                  value={targetMargin}
                  onChange={setTargetMargin}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Facebook Marketplace fees,
            buyer negotiation, shipping costs, local delivery costs, fuel costs,
            payment processing, cancellations, taxes, and item-specific costs
            may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended local resale pricing estimates.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended listing price"
              value={toMoney(result.recommendedPrice)}
              helper="Highest required price from break-even, target profit, and target margin"
              tone="blue"
            />

            <MetricCard
              label="Expected accepted price"
              value={toMoney(result.acceptedPrice)}
              helper="Recommended listing price after expected negotiation"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Accepted price minus fixed costs and platform fee"
              tone={profitTone}
            />

            <MetricCard
              label="Estimated margin"
              value={percent(result.margin)}
              helper="Profit divided by expected accepted price"
              tone={profitTone}
            />

            <MetricCard
              label="ROI on item cost"
              value={percent(result.roi)}
              helper="Profit divided by item cost"
              tone={result.roi > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Break-even listing price"
              value={toMoney(result.breakEvenPrice)}
              helper="Minimum listing price before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Offer floor"
              value={toMoney(result.offerFloor)}
              helper="Lower offer-friendly price above break-even"
              tone="warning"
            />

            <MetricCard
              label="Target profit price"
              value={toMoney(result.targetProfitPrice)}
              helper="Listing price needed to reach target dollar profit"
              tone="good"
            />

            <MetricCard
              label="Target margin price"
              value={toMoney(result.targetMarginPrice)}
              helper="Listing price needed to reach target margin percentage"
              tone="good"
            />

            <MetricCard
              label="Safe buffer price"
              value={toMoney(result.safeBufferPrice)}
              helper="Recommended price plus 15% cushion"
              tone="good"
            />

            <MetricCard
              label="Platform fee at price"
              value={toMoney(result.platformFee)}
              helper="Estimated platform fee at expected accepted price"
              tone={result.platformFee > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Negotiation discount"
              value={toMoney(result.negotiationDiscountAmount)}
              helper="Estimated discount from recommended listing price"
              tone="warning"
            />

            <MetricCard
              label="Fixed costs"
              value={toMoney(result.fixedCosts)}
              helper="Item, shipping, delivery, fuel, and packaging costs"
            />

            <MetricCard
              label="Total costs at price"
              value={toMoney(result.totalCosts)}
              helper="Fixed costs plus platform fee"
            />

            <MetricCard
              label="Fixed cost share"
              value={percent(result.fixedCostShare)}
              helper="Fixed costs divided by expected accepted price"
              tone={result.fixedCostShare < 65 ? "good" : "warning"}
            />

            <MetricCard
              label="Total cost share"
              value={percent(result.totalCostShare)}
              helper="Total costs divided by expected accepted price"
              tone={result.totalCostShare < 75 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Recommended listing price is{" "}
                <strong>{toMoney(result.recommendedPrice)}</strong>. After
                expected negotiation, the accepted price would be about{" "}
                <strong>{toMoney(result.acceptedPrice)}</strong>.
              </p>

              <p>
                At that price, estimated profit is{" "}
                <strong>{toMoney(result.profit)}</strong> at a{" "}
                <strong>{percent(result.margin)}</strong> margin.
              </p>

              <p>
                Your estimated break-even listing price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing below
                this may make the sale unprofitable after negotiation, delivery,
                and fees.
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
                        row.label === "Recommended" ? "bg-blue-50 font-bold" : ""
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
          How to use this Facebook Marketplace Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Add item cost, shipping, delivery, fuel, packaging, and fulfillment expenses.",
            ],
            [
              "Add fee assumptions",
              "Include marketplace fee or payment processing percentage if checkout or shipping applies.",
            ],
            [
              "Set targets",
              "Choose your target dollar profit and target margin percentage.",
            ],
            [
              "Compare prices",
              "Review break-even, offer floor, target profit, target margin, recommended, and safe-buffer prices.",
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
            Review which costs are taking the largest share of the recommended
            listing price estimate.
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
            Common Facebook Marketplace pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without including delivery, fuel, packaging, or fees.",
              "Forgetting that buyers often negotiate below the listing price.",
              "Treating listing price as the accepted sale price.",
              "Ignoring checkout, shipping, or payment processing fees when applicable.",
              "Choosing a target margin that leaves no room for buyer offers.",
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
            Understanding your Facebook Marketplace pricing results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Pricing gives
              strong room for negotiation, delivery costs, and normal local
              marketplace variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              recommended price appears workable under the current cost, fee,
              and negotiation assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              price may work, but buyer negotiation, delivery, shipping, or fee
              changes could reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Fee,
              negotiation, or target margin assumptions may be preventing a
              realistic calculation.
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
              "Target profit and target margin before accepting low offers or offering delivery.",
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
          Ways to improve Facebook Marketplace pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower item cost",
              "Source inventory with enough spread between cost and realistic local sold prices.",
            ],
            [
              "Reduce delivery drag",
              "Limit delivery distance, charge for delivery, or use pickup when delivery erases margin.",
            ],
            [
              "Build offer room",
              "List with enough cushion to accept reasonable buyer offers without losing profit.",
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
            ["/facebook-marketplace/break-even-calculator", "Break-Even Calculator"],
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