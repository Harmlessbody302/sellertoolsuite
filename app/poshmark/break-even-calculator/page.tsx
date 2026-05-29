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

export default function PoshmarkBreakEvenCalculatorPage() {
  const [itemCost, setItemCost] = useState(18);
  const [shippingDiscount, setShippingDiscount] = useState(2);
  const [packagingCost, setPackagingCost] = useState(1);
  const [otherCosts, setOtherCosts] = useState(0);
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState(10);
  const [targetProfit, setTargetProfit] = useState(12);

  const result = useMemo(() => {
    const cost = Math.max(0, itemCost);
    const shipping = Math.max(0, shippingDiscount);
    const packaging = Math.max(0, packagingCost);
    const other = Math.max(0, otherCosts);
    const offerRate = Math.min(95, Math.max(0, buyerOfferDiscount));
    const target = Math.max(0, targetProfit);

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
      const feeShare =
        saleAfterOffer > 0 ? (poshmarkFee / saleAfterOffer) * 100 : 0;

      return {
        saleAfterOffer,
        poshmarkFee,
        profit,
        margin,
        feeShare,
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

    const breakEvenPrice = findListingPriceForProfit(0);
    const targetProfitPrice = findListingPriceForProfit(target);
    const aggressiveFloor = targetProfitPrice * 0.9;
    const safeBuffer = targetProfitPrice * 1.15;

    const breakEvenEval = evaluatePrice(breakEvenPrice);
    const targetEval = evaluatePrice(targetProfitPrice);
    const aggressiveEval = evaluatePrice(aggressiveFloor);
    const safeEval = evaluatePrice(safeBuffer);

    let status = "Healthy";
    let statusText =
      "Your Poshmark cost structure produces a workable break-even listing price.";
    let recommendation =
      "Compare this pricing range against similar sold listings before accepting offers or sending shipping discounts.";

    if (breakEvenPrice <= 0 || offerMultiplier <= 0) {
      status = "Check Inputs";
      statusText =
        "The break-even price could not be calculated with the current assumptions.";
      recommendation =
        "Check that your buyer offer discount is realistic and below 100%.";
    } else if (targetEval.margin < 15) {
      status = "Tight";
      statusText =
        "Your target-profit price leaves a fairly tight Poshmark margin.";
      recommendation =
        "Consider raising your listing price, reducing your offer discount, limiting shipping incentives, or lowering item cost.";
    } else if (targetEval.margin >= 30) {
      status = "Strong";
      statusText =
        "Your target-profit price leaves strong estimated room for offers and selling costs.";
      recommendation =
        "This item may have enough margin for negotiation, offers, and shipping incentives if demand supports the price.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0.01) return "Break-even";
      if (margin < 15) return "Tight";
      if (margin >= 30) return "Strong";
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

    const offerDiscountAmount = targetProfitPrice * (offerRate / 100);
    const targetTotalCosts =
      fixedCosts + targetEval.poshmarkFee + offerDiscountAmount;

    const costBreakdown = [
      ["Item cost", cost],
      ["Shipping discount", shipping],
      ["Packaging cost", packaging],
      ["Other selling costs", other],
      ["Poshmark fee at target", targetEval.poshmarkFee],
      ["Buyer offer discount", offerDiscountAmount],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        targetTotalCosts > 0 ? (Number(amount) / targetTotalCosts) * 100 : 0,
    }));

    return {
      fixedCosts,
      offerMultiplier,
      offerRate,
      breakEvenPrice,
      targetProfitPrice,
      aggressiveFloor,
      safeBuffer,
      breakEvenEval,
      targetEval,
      aggressiveEval,
      safeEval,
      targetTotalCosts,
      offerDiscountAmount,
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
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Poshmark Break-Even Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Calculate the minimum Poshmark listing price needed to avoid losing
          money after item cost, Poshmark fees, buyer offer discounts, shipping
          discounts, packaging, and other selling costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Break-even inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter item cost, offer discount, shipping discount, packaging,
            other costs, and target profit to estimate viable Poshmark listing
            prices.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Item and selling costs
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
                Offer and profit assumptions
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
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Poshmark fees, buyer offers,
            closet discounts, shipping discounts, labels, packaging, taxes,
            returns, and seller-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Minimum viable Poshmark pricing thresholds.
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
              helper="Profit divided by sale price after offer discount"
              tone={result.targetEval.margin >= 30 ? "good" : "warning"}
            />

            <MetricCard
              label="Sale after offer"
              value={toMoney(result.targetEval.saleAfterOffer)}
              helper="Target listing price after buyer offer discount"
              tone="blue"
            />

            <MetricCard
              label="Poshmark fee at target"
              value={toMoney(result.targetEval.poshmarkFee)}
              helper="Flat fee under $15 or 20% of sale after offer"
              tone="warning"
            />

            <MetricCard
              label="Buyer offer discount"
              value={toMoney(result.offerDiscountAmount)}
              helper="Estimated discount from target listing price"
              tone="warning"
            />

            <MetricCard
              label="Fixed seller costs"
              value={toMoney(result.fixedCosts)}
              helper="Item, shipping discount, packaging, and other costs"
            />

            <MetricCard
              label="Fee share"
              value={percent(result.targetEval.feeShare)}
              helper="Poshmark fee divided by sale after offer"
              tone="warning"
            />

            <MetricCard
              label="Total cost pressure"
              value={toMoney(result.targetTotalCosts)}
              helper="Seller costs, Poshmark fee, and offer discount"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your estimated Poshmark break-even listing price is{" "}
                <strong>{toMoney(result.breakEvenPrice)}</strong>. Pricing below
                this may make the sale unprofitable after offers, fees, shipping
                discounts, and selling costs.
              </p>

              <p>
                To earn your target profit, list at approximately{" "}
                <strong>{toMoney(result.targetProfitPrice)}</strong>, which
                would sell for about{" "}
                <strong>{toMoney(result.targetEval.saleAfterOffer)}</strong>{" "}
                after the buyer offer discount.
              </p>

              <p>
                Estimated Poshmark fee at the target-profit price is{" "}
                <strong>{toMoney(result.targetEval.poshmarkFee)}</strong>.
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
                        row.label === "Target profit"
                          ? "bg-blue-50 font-bold"
                          : ""
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
          How to use this Poshmark Break-Even Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter item costs",
              "Add item cost, packaging, shipping discount, and other required selling costs.",
            ],
            [
              "Add offer assumptions",
              "Enter the buyer offer discount you expect to accept from your listing price.",
            ],
            [
              "Set target profit",
              "Choose how much profit you want after Poshmark fees, offers, and costs.",
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
            Poshmark cost breakdown
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

                <p className="mt-2 text-sm text-gray-600">
                  {percent(item.share)} of estimated target-price cost pressure
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Poshmark break-even mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing from item cost alone without including Poshmark fees and offer discounts.",
              "Forgetting shipping discounts when sending offers to likers.",
              "Accepting buyer offers without checking whether the lower sale still covers costs.",
              "Ignoring packaging, labels, supplies, and other closet expenses.",
              "Using active listing prices instead of realistic sold comps.",
              "Listing too low and leaving no room for negotiation or closet discounts.",
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
            Understanding your Poshmark break-even results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Target-profit
              pricing leaves strong room for offers, shipping discounts, and
              normal resale variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The
              break-even and target-profit prices appear workable under the
              current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Tight:</strong> The sale may
              still work, but offers, shipping discounts, or sourcing changes
              could reduce profit quickly.
            </p>

            <p>
              <strong className="text-blue-700">Check Inputs:</strong> Offer
              discount or cost assumptions may be preventing a realistic
              calculation.
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
              "Poshmark fee based on sale price after offer discount.",
              "Shipping discounts from offers to likers or closet promotions.",
              "Packaging cost, labels, tape, thank-you cards, and supplies.",
              "Expected buyer offer discount and minimum acceptable offer.",
              "Target profit before accepting offers or sending discounts.",
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
          Ways to lower your Poshmark break-even price
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
            ["/poshmark/pricing-calculator", "Pricing Calculator"],
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