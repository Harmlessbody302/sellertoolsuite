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

export default function PoshmarkPricingCalculatorPage() {
  const [itemCost, setItemCost] = useState(18);
  const [shippingDiscount, setShippingDiscount] = useState(2);
  const [packagingCost, setPackagingCost] = useState(1);
  const [otherCosts, setOtherCosts] = useState(0);
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState(10);
  const [targetProfit, setTargetProfit] = useState(12);
  const [targetMargin, setTargetMargin] = useState(25);

  const result = useMemo(() => {
    const cost = Math.max(0, itemCost);
    const shipping = Math.max(0, shippingDiscount);
    const packaging = Math.max(0, packagingCost);
    const other = Math.max(0, otherCosts);
    const offerRate = Math.min(95, Math.max(0, buyerOfferDiscount));
    const desiredProfit = Math.max(0, targetProfit);
    const desiredMargin = Math.min(90, Math.max(0, targetMargin));

    const fixedCosts = cost + shipping + packaging + other;
    const offerMultiplier = 1 - offerRate / 100;

    const evaluatePrice = (listingPrice: number) => {
      const saleAfterOffer = listingPrice * offerMultiplier;

      const poshmarkFee =
        saleAfterOffer > 0 && saleAfterOffer < 15
          ? 2.95
          : saleAfterOffer * 0.2;

      const profit = saleAfterOffer - poshmarkFee - fixedCosts;
      const margin =
        saleAfterOffer > 0 ? (profit / saleAfterOffer) * 100 : 0;
      const roi = cost > 0 ? (profit / cost) * 100 : 0;
      const feeShare =
        saleAfterOffer > 0 ? (poshmarkFee / saleAfterOffer) * 100 : 0;
      const totalCosts = fixedCosts + poshmarkFee;
      const totalCostShare =
        saleAfterOffer > 0 ? (totalCosts / saleAfterOffer) * 100 : 0;

      return {
        saleAfterOffer,
        poshmarkFee,
        profit,
        margin,
        roi,
        feeShare,
        totalCosts,
        totalCostShare,
      };
    };

    const findListingPriceForProfit = (profitTarget: number) => {
      if (offerMultiplier <= 0) return 0;

      let low = 0;
      let high = Math.max(20, fixedCosts + profitTarget + 20);

      while (evaluatePrice(high).profit < profitTarget && high < 10000) {
        high *= 2;
      }

      for (let index = 0; index < 80; index += 1) {
        const mid = (low + high) / 2;
        const midProfit = evaluatePrice(mid).profit;

        if (midProfit >= profitTarget) {
          high = mid;
        } else {
          low = mid;
        }
      }

      return high;
    };

    const findListingPriceForMargin = (marginTarget: number) => {
      if (offerMultiplier <= 0) return 0;

      let low = 0;
      let high = Math.max(20, fixedCosts + desiredProfit + 20);

      while (
        evaluatePrice(high).margin < marginTarget &&
        high < 10000
      ) {
        high *= 2;
      }

      for (let index = 0; index < 80; index += 1) {
        const mid = (low + high) / 2;
        const midMargin = evaluatePrice(mid).margin;

        if (midMargin >= marginTarget) {
          high = mid;
        } else {
          low = mid;
        }
      }

      return high;
    };

    const breakEvenPrice = findListingPriceForProfit(0);
    const targetProfitPrice = findListingPriceForProfit(desiredProfit);
    const targetMarginPrice = findListingPriceForMargin(desiredMargin);

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

    const offerDiscountAmount = recommendedPrice * (offerRate / 100);
    const sellerCostBeforeFee = fixedCosts;
    const fixedCostShare =
      recommendedEval.saleAfterOffer > 0
        ? (fixedCosts / recommendedEval.saleAfterOffer) * 100
        : 0;

    let status = "Healthy";
    let statusText =
      "Your recommended Poshmark listing price should support your target goals.";
    let recommendation =
      "This listing price appears workable based on your entered offer discount assumptions.";

    if (recommendedPrice <= 0 || offerMultiplier <= 0) {
      status = "Check Inputs";
      statusText =
        "The recommended price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your buyer offer discount is realistic and below 100%.";
    } else if (recommendedEval.margin < 15) {
      status = "Thin Margin";
      statusText =
        "This pricing leaves limited room for aggressive offers or additional selling costs.";
      recommendation =
        "Consider raising your listing price, reducing offer discounts, lowering item cost, or limiting shipping incentives.";
    } else if (recommendedEval.margin >= 30) {
      status = "Strong";
      statusText = "This pricing gives strong margin flexibility.";
      recommendation =
        "You have room for negotiation, offers, or promotional discounts if comparable sold listings support the price.";
    }

    const getScenarioStatus = (profitValue: number, marginValue: number) => {
      if (profitValue <= 0.01) return "Break-even";
      if (marginValue < 15) return "Thin";
      if (marginValue >= 30) return "Strong";
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
        status: getScenarioStatus(
          safeBufferEval.profit,
          safeBufferEval.margin,
        ),
      },
    ];

    const costBreakdown = [
      ["Item cost", cost],
      ["Shipping discount", shipping],
      ["Packaging cost", packaging],
      ["Other selling costs", other],
      ["Poshmark fee at price", recommendedEval.poshmarkFee],
      ["Buyer offer discount", offerDiscountAmount],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        recommendedEval.totalCosts + offerDiscountAmount > 0
          ? (Number(amount) /
              (recommendedEval.totalCosts + offerDiscountAmount)) *
            100
          : 0,
      saleShare:
        recommendedEval.saleAfterOffer > 0
          ? (Number(amount) / recommendedEval.saleAfterOffer) * 100
          : 0,
    }));

    return {
      fixedCosts,
      offerMultiplier,
      offerRate,
      breakEvenPrice,
      targetProfitPrice,
      targetMarginPrice,
      recommendedPrice,
      offerFloor,
      safeBufferPrice,
      sellerCostBeforeFee,
      fixedCostShare,
      offerDiscountAmount,
      estimatedProfit: recommendedEval.profit,
      margin: recommendedEval.margin,
      roi: recommendedEval.roi,
      effectiveSalePrice: recommendedEval.saleAfterOffer,
      poshmarkFee: recommendedEval.poshmarkFee,
      feeShare: recommendedEval.feeShare,
      totalCosts: recommendedEval.totalCosts,
      totalCostShare: recommendedEval.totalCostShare,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    itemCost,
    shippingDiscount,
    packagingCost,
    otherCosts,
    buyerOfferDiscount,
    targetProfit,
    targetMargin,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.estimatedProfit <= 0
      ? "bad"
      : result.margin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Poshmark Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate profitable Poshmark listing prices based on item cost,
          buyer offer discounts, shipping incentives, packaging, other selling
          costs, target profit, and target margin goals.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Pricing inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter item cost, shipping discount, packaging, offer discount,
            target profit, and target margin to estimate a recommended Poshmark
            listing price.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Item and seller costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Shipping discount"
                  prefix="$"
                  value={shippingDiscount}
                  onChange={setShippingDiscount}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Other selling costs"
                  prefix="$"
                  value={otherCosts}
                  onChange={setOtherCosts}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Offer and pricing targets
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Buyer offer discount"
                  suffix="%"
                  value={buyerOfferDiscount}
                  onChange={setBuyerOfferDiscount}
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
            This calculator is an estimate. Actual Poshmark fees, buyer offers,
            shipping discounts, Closet Clear Out behavior, packaging, taxes,
            returns, and seller-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Recommended Poshmark pricing estimates.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Recommended listing price"
              value={toMoney(result.recommendedPrice)}
              helper="Highest required listing price from break-even, target profit, and target margin"
              tone="blue"
            />

            <MetricCard
              label="Estimated profit"
              value={toMoney(result.estimatedProfit)}
              helper="Profit after offer discount, Poshmark fee, and seller costs"
              tone={profitTone}
            />

            <MetricCard
              label="Estimated margin"
              value={percent(result.margin)}
              helper="Profit divided by sale price after offer discount"
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
              label="Sale after offer"
              value={toMoney(result.effectiveSalePrice)}
              helper="Recommended listing price after buyer offer discount"
              tone="blue"
            />

            <MetricCard
              label="Poshmark fee at price"
              value={toMoney(result.poshmarkFee)}
              helper="Flat fee under $15 or 20% of sale after offer"
              tone="warning"
            />

            <MetricCard
              label="Buyer offer discount"
              value={toMoney(result.offerDiscountAmount)}
              helper="Estimated discount from recommended listing price"
              tone="warning"
            />

            <MetricCard
              label="Fee share"
              value={percent(result.feeShare)}
              helper="Poshmark fee divided by sale after offer"
              tone="warning"
            />

            <MetricCard
              label="Seller costs before fee"
              value={toMoney(result.sellerCostBeforeFee)}
              helper="Item cost, shipping discount, packaging, and other costs"
            />

            <MetricCard
              label="Total costs at price"
              value={toMoney(result.totalCosts)}
              helper="Seller costs plus Poshmark fee"
            />

            <MetricCard
              label="Total cost share"
              value={percent(result.totalCostShare)}
              helper="Total costs divided by sale after offer"
              tone={result.totalCostShare < 75 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Recommended listing price is{" "}
                <strong>{toMoney(result.recommendedPrice)}</strong>, producing
                estimated profit of{" "}
                <strong>{toMoney(result.estimatedProfit)}</strong> at{" "}
                <strong>{percent(result.margin)}</strong> margin.
              </p>

              <p>
                After your estimated offer discount, the sale price would be{" "}
                <strong>{toMoney(result.effectiveSalePrice)}</strong>, with an
                estimated Poshmark fee of{" "}
                <strong>{toMoney(result.poshmarkFee)}</strong>.
              </p>

              <p>
                Your estimated break-even listing price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing below
                this may make the sale unprofitable after offers, fees, and
                seller costs.
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
                    <th className="px-4 py-3">After offer</th>
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
                        {toMoney(row.saleAfterOffer)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.poshmarkFee)}</td>
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
          How to use this Poshmark Pricing Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Add item cost, packaging, shipping discount, and other seller-paid costs.",
            ],
            [
              "Add offer assumptions",
              "Enter the buyer offer discount you expect to accept from your listing price.",
            ],
            [
              "Set targets",
              "Choose your target dollar profit and target margin percentage.",
            ],
            [
              "Compare scenarios",
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
            Poshmark cost breakdown
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
                  <p>{percent(item.saleShare)} of sale after offer</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Poshmark pricing mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without including Poshmark fees and offer discounts.",
              "Forgetting shipping discounts when sending offers to likers.",
              "Accepting buyer offers without checking whether the lower sale still covers costs.",
              "Ignoring packaging, labels, supplies, and other closet expenses.",
              "Choosing a target margin that leaves no room for negotiation.",
              "Comparing only active listing prices instead of realistic sold comps.",
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
            Understanding your Poshmark pricing results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Pricing gives
              strong margin flexibility for offers, shipping discounts, and
              normal resale variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              recommended price appears workable under the current cost and
              offer assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              price may work, but offers, shipping discounts, or sourcing
              changes could reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Offer
              discount or target margin assumptions may be preventing a
              realistic calculation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Poshmark sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item cost, sourcing cost, prep cost, and cleaning supplies.",
              "Poshmark fee based on sale price after buyer offer discount.",
              "Shipping discounts from offers to likers or closet promotions.",
              "Packaging cost, labels, tape, thank-you cards, and supplies.",
              "Expected buyer offer discount and minimum acceptable offer.",
              "Target profit and target margin before accepting offers.",
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
          Ways to improve Poshmark pricing
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower item cost",
              "Source inventory with enough spread between cost and realistic sold comps.",
            ],
            [
              "Reduce shipping discounts",
              "Use shipping incentives carefully because they reduce profit on every accepted offer.",
            ],
            [
              "Build offer room",
              "List with enough margin to accept reasonable buyer offers without losing money.",
            ],
            [
              "Improve sold price",
              "Use better photos, stronger titles, bundles, and comps to support a higher sale price.",
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
          Related Poshmark seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/poshmark/fee-calculator", "Fee Calculator"],
            ["/poshmark/profit-calculator", "Profit Calculator"],
            ["/poshmark/break-even-calculator", "Break-Even Calculator"],
            ["/poshmark/offer-roi-calculator", "Offer ROI Calculator"],
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