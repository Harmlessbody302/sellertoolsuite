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
    status === "Efficient"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
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
    status === "Efficient"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
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

export default function PoshmarkFeeCalculatorPage() {
  const [listingPrice, setListingPrice] = useState(45);
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState(10);
  const [shippingDiscount, setShippingDiscount] = useState(2);
  const [closetClearOutSubsidy, setClosetClearOutSubsidy] = useState(0);
  const [packagingCost, setPackagingCost] = useState(1);
  const [otherCosts, setOtherCosts] = useState(0);

  const result = useMemo(() => {
    const price = Math.max(0, listingPrice);
    const offerRate = Math.min(95, Math.max(0, buyerOfferDiscount));
    const shipping = Math.max(0, shippingDiscount);
    const closetSubsidy = Math.max(0, closetClearOutSubsidy);
    const packaging = Math.max(0, packagingCost);
    const other = Math.max(0, otherCosts);

    const offerDiscountAmount = price * (offerRate / 100);
    const effectiveSalePrice = Math.max(0, price - offerDiscountAmount);

    const poshmarkFee =
      effectiveSalePrice > 0 && effectiveSalePrice < 15
        ? 2.95
        : effectiveSalePrice * 0.2;

    const sellerPaidCosts = shipping + closetSubsidy + packaging + other;
    const totalSellingCosts = poshmarkFee + sellerPaidCosts;
    const netAfterFees = effectiveSalePrice - totalSellingCosts;

    const costPercentage =
      effectiveSalePrice > 0
        ? (totalSellingCosts / effectiveSalePrice) * 100
        : 0;

    const feePercentage =
      effectiveSalePrice > 0 ? (poshmarkFee / effectiveSalePrice) * 100 : 0;

    const netKeptPercentage =
      effectiveSalePrice > 0 ? (netAfterFees / effectiveSalePrice) * 100 : 0;

    const offerDiscountShare =
      price > 0 ? (offerDiscountAmount / price) * 100 : 0;

    const sellerPaidCostShare =
      effectiveSalePrice > 0 ? (sellerPaidCosts / effectiveSalePrice) * 100 : 0;

    const shippingDiscountShare =
      effectiveSalePrice > 0 ? (shipping / effectiveSalePrice) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your Poshmark fee structure looks workable based on the effective sale price entered.";
    let recommendation =
      "Use this fee estimate alongside item cost before accepting offers or sending shipping discounts.";

    if (costPercentage > 40) {
      status = "High Cost";
      statusText =
        "Fees, discounts, and seller-paid costs are consuming a large share of your Poshmark sale.";
      recommendation =
        "Consider raising the listing price, reducing the offer discount, or limiting seller-paid shipping incentives.";
    } else if (costPercentage > 28) {
      status = "Moderate";
      statusText =
        "Your Poshmark fee burden is elevated and should be monitored.";
      recommendation =
        "Make sure your item cost leaves enough room for profit after offers, shipping discounts, packaging, and other closet costs.";
    } else if (costPercentage < 24) {
      status = "Efficient";
      statusText =
        "Your Poshmark selling costs are relatively efficient compared with the effective sale price.";
      recommendation =
        "This setup may leave more room for item cost and profit, but still check your sourcing cost before accepting offers.";
    }

    const getScenarioStatus = (percentage: number) => {
      if (percentage > 40) return "High Cost";
      if (percentage > 28) return "Moderate";
      if (percentage < 24) return "Efficient";
      return "Healthy";
    };

    const scenarios = [10, 15, 25, 45, 75].map((scenarioPrice) => {
      const scenarioOfferDiscount = scenarioPrice * (offerRate / 100);
      const scenarioEffectivePrice = Math.max(
        0,
        scenarioPrice - scenarioOfferDiscount,
      );

      const scenarioFee =
        scenarioEffectivePrice > 0 && scenarioEffectivePrice < 15
          ? 2.95
          : scenarioEffectivePrice * 0.2;

      const scenarioTotalCosts = scenarioFee + sellerPaidCosts;
      const scenarioCostPercentage =
        scenarioEffectivePrice > 0
          ? (scenarioTotalCosts / scenarioEffectivePrice) * 100
          : 0;
      const scenarioNet = scenarioEffectivePrice - scenarioTotalCosts;

      return {
        price: scenarioPrice,
        offerDiscount: scenarioOfferDiscount,
        effectivePrice: scenarioEffectivePrice,
        fee: scenarioFee,
        totalCosts: scenarioTotalCosts,
        costPercentage: scenarioCostPercentage,
        net: scenarioNet,
        status: getScenarioStatus(scenarioCostPercentage),
      };
    });

    const costBreakdown = [
      ["Poshmark fee", poshmarkFee],
      ["Shipping discount", shipping],
      ["Closet Clear Out subsidy", closetSubsidy],
      ["Packaging cost", packaging],
      ["Other selling costs", other],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalSellingCosts > 0
          ? (Number(amount) / totalSellingCosts) * 100
          : 0,
      saleShare:
        effectiveSalePrice > 0
          ? (Number(amount) / effectiveSalePrice) * 100
          : 0,
    }));

    return {
      price,
      offerRate,
      offerDiscountAmount,
      offerDiscountShare,
      effectiveSalePrice,
      poshmarkFee,
      sellerPaidCosts,
      totalSellingCosts,
      netAfterFees,
      costPercentage,
      feePercentage,
      netKeptPercentage,
      sellerPaidCostShare,
      shippingDiscountShare,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    listingPrice,
    buyerOfferDiscount,
    shippingDiscount,
    closetClearOutSubsidy,
    packagingCost,
    otherCosts,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const costTone =
    result.status === "High Cost"
      ? "bad"
      : result.status === "Moderate"
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Poshmark Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Poshmark seller fees, buyer offer discounts, shipping
          discounts, Closet Clear Out subsidies, packaging costs, other selling
          costs, total fee pressure, and net revenue before item cost.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Fee inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter listing price, buyer offer discount, seller-paid shipping
            discount, Closet Clear Out subsidy, packaging cost, and other closet
            expenses to estimate Poshmark selling costs.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Listing price"
                  prefix="$"
                  value={listingPrice}
                  onChange={setListingPrice}
                />

                <NumberInput
                  label="Buyer offer discount"
                  suffix="%"
                  value={buyerOfferDiscount}
                  onChange={setBuyerOfferDiscount}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Seller-paid costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Shipping discount"
                  prefix="$"
                  value={shippingDiscount}
                  onChange={setShippingDiscount}
                />

                <NumberInput
                  label="Closet Clear Out subsidy"
                  prefix="$"
                  value={closetClearOutSubsidy}
                  onChange={setClosetClearOutSubsidy}
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
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Poshmark fees, buyer offers,
            Closet Clear Out discounts, shipping discounts, labels, packaging,
            taxes, returns, and seller-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Poshmark fee breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Effective sale price"
              value={toMoney(result.effectiveSalePrice)}
              helper="Listing price after buyer offer discount"
              tone="blue"
            />

            <MetricCard
              label="Net after fees"
              value={toMoney(result.netAfterFees)}
              helper="Effective sale price minus Poshmark fee and seller-paid costs"
              tone={result.netAfterFees > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Total selling costs"
              value={toMoney(result.totalSellingCosts)}
              helper="Poshmark fee, shipping discount, packaging, and other selling costs"
              tone={costTone}
            />

            <MetricCard
              label="Cost percentage"
              value={percent(result.costPercentage)}
              helper="Total selling costs divided by effective sale price"
              tone={costTone}
            />

            <MetricCard
              label="Poshmark fee"
              value={toMoney(result.poshmarkFee)}
              helper="Flat fee under $15 or 20% of effective sale price"
              tone="warning"
            />

            <MetricCard
              label="Poshmark fee share"
              value={percent(result.feePercentage)}
              helper="Poshmark fee divided by effective sale price"
              tone="warning"
            />

            <MetricCard
              label="Offer discount amount"
              value={toMoney(result.offerDiscountAmount)}
              helper="Listing price multiplied by buyer offer discount"
              tone="warning"
            />

            <MetricCard
              label="Offer discount share"
              value={percent(result.offerDiscountShare)}
              helper="Buyer offer discount as a share of listing price"
              tone="warning"
            />

            <MetricCard
              label="Seller-paid costs"
              value={toMoney(result.sellerPaidCosts)}
              helper="Shipping discount, Closet Clear Out, packaging, and other costs"
              tone={result.sellerPaidCosts > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Seller-paid cost share"
              value={percent(result.sellerPaidCostShare)}
              helper="Seller-paid costs divided by effective sale price"
              tone={result.sellerPaidCosts > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Revenue kept after fees"
              value={percent(result.netKeptPercentage)}
              helper="Net after fees divided by effective sale price"
              tone={result.netKeptPercentage >= 70 ? "good" : "warning"}
            />

            <MetricCard
              label="Listing price"
              value={toMoney(result.price)}
              helper="Entered Poshmark listing price before offer discount"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                After the estimated buyer offer discount, the effective sale
                price is{" "}
                <strong>{toMoney(result.effectiveSalePrice)}</strong>. Poshmark
                fees are estimated at{" "}
                <strong>{toMoney(result.poshmarkFee)}</strong>.
              </p>

              <p>
                Total selling costs are{" "}
                <strong>{toMoney(result.totalSellingCosts)}</strong>, consuming{" "}
                <strong>{percent(result.costPercentage)}</strong> of the
                effective sale price.
              </p>

              <p>
                After Poshmark fees and seller-paid costs, you would have{" "}
                <strong>{toMoney(result.netAfterFees)}</strong> left before item
                cost.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Listing price comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Listing price</th>
                    <th className="px-4 py-3">After offer</th>
                    <th className="px-4 py-3">Poshmark fee</th>
                    <th className="px-4 py-3">Cost %</th>
                    <th className="px-4 py-3">Net after fees</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.price}
                      className={
                        row.price === listingPrice ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.effectivePrice)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.fee)}</td>
                      <td className="px-4 py-3">
                        {percent(row.costPercentage)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.net)}</td>
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
          How to use this Poshmark Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing price",
              "Add the Poshmark listing price before buyer offers, discounts, or item cost.",
            ],
            [
              "Add offer discount",
              "Enter the buyer offer discount you expect from offers to likers or accepted offers.",
            ],
            [
              "Include seller-paid costs",
              "Add shipping discounts, Closet Clear Out subsidy, packaging, and other closet expenses.",
            ],
            [
              "Review fee load",
              "Compare net after fees before subtracting item cost or accepting buyer offers.",
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
            Poshmark fee breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which fees and seller-paid costs make up the largest share of
            total Poshmark selling costs.
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
                  <p>{percent(item.share)} of selling costs</p>
                  <p>{percent(item.saleShare)} of effective sale</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Poshmark fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating listing price as the money kept after offers and fees.",
              "Forgetting that buyer offers reduce the sale before Poshmark fees are calculated.",
              "Ignoring shipping discounts when sending offers to likers.",
              "Counting Closet Clear Out incentives incorrectly when the seller is not paying the subsidy.",
              "Using net after fees as profit before subtracting item cost and prep cost.",
              "Accepting low offers without recalculating fee load and seller-paid costs.",
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
            Understanding your Poshmark fee results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Efficient:</strong> Selling
              costs are relatively low compared with the effective sale price
              and may leave more room for item cost and profit.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Fee load
              appears workable under the current listing price and offer
              assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Fees,
              offers, or seller-paid costs are meaningful and should be checked
              against item cost.
            </p>

            <p>
              <strong className="text-red-700">High Cost:</strong> Fees,
              discounts, and seller-paid costs are consuming a large share of
              the sale.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Poshmark sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Listing price before buyer offer discounts.",
              "Expected buyer offer discount from accepted offers or offers to likers.",
              "Poshmark flat fee under $15 or 20% fee on higher sales.",
              "Seller-paid shipping discounts and closet promotion costs.",
              "Packaging, labels, tape, thank-you cards, and other closet supplies.",
              "Net after fees before subtracting item cost or accepting offers.",
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
          Ways to reduce Poshmark fee pressure
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise listing price",
              "Build enough room for buyer offers, Poshmark fees, shipping discounts, and item cost.",
            ],
            [
              "Limit shipping discounts",
              "Use shipping incentives carefully because they reduce net after fees on every accepted offer.",
            ],
            [
              "Bundle carefully",
              "Use bundles to increase order value when combined shipping and pricing still protect margin.",
            ],
            [
              "Review offers",
              "Calculate net after fees before accepting buyer offers or lowering closet prices.",
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
            ["/poshmark/profit-calculator", "Profit Calculator"],
            ["/poshmark/pricing-calculator", "Pricing Calculator"],
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