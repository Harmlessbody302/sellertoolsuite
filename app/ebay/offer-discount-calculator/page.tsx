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

export default function EbayOfferDiscountCalculatorPage() {
  const [listingPrice, setListingPrice] = useState(45);
  const [acceptedOffer, setAcceptedOffer] = useState(38);
  const [itemCost, setItemCost] = useState(18);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [shippingCost, setShippingCost] = useState(7);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedOrderFee, setFixedOrderFee] = useState(0.4);
  const [promotedListingRate, setPromotedListingRate] = useState(2);
  const [otherCosts, setOtherCosts] = useState(1);

  const result = useMemo(() => {
    const listed = Math.max(0, listingPrice);
    const offer = Math.max(0, acceptedOffer);
    const item = Math.max(0, itemCost);
    const chargedShipping = Math.max(0, shippingCharged);
    const actualShipping = Math.max(0, shippingCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, finalValueFeeRate));
    const fixedFee = Math.max(0, fixedOrderFee);
    const promotedRate = Math.min(95, Math.max(0, promotedListingRate));
    const other = Math.max(0, otherCosts);

    const discountAmount = Math.max(0, listed - offer);
    const discountRate = listed > 0 ? (discountAmount / listed) * 100 : 0;
    const revenue = offer + chargedShipping;
    const finalValueFee = revenue * (feeRate / 100) + fixedFee;
    const promotedFee = revenue * (promotedRate / 100);
    const totalFees = finalValueFee + promotedFee;
    const shippingGap = chargedShipping - actualShipping;
    const sellerCosts = item + actualShipping + packaging + other + totalFees;
    const profit = revenue - sellerCosts;
    const profitAtList =
      listed +
      chargedShipping -
      (item +
        actualShipping +
        packaging +
        other +
        ((listed + chargedShipping) * feeRate) / 100 +
        fixedFee +
        ((listed + chargedShipping) * promotedRate) / 100);

    const profitLost = profitAtList - profit;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const marginAtOffer = offer > 0 ? (profit / offer) * 100 : 0;
    const roiOnItemCost = item > 0 ? (profit / item) * 100 : 0;
    const feeShare = revenue > 0 ? (totalFees / revenue) * 100 : 0;
    const costShare = revenue > 0 ? (sellerCosts / revenue) * 100 : 0;
    const breakEvenOffer =
      item + actualShipping + packaging + other - chargedShipping + fixedFee;
    const adjustedBreakEvenOffer =
      breakEvenOffer / Math.max(0.01, 1 - feeRate / 100 - promotedRate / 100);
    const minimumHealthyOffer =
      (item + actualShipping + packaging + other - chargedShipping + fixedFee) /
      Math.max(0.01, 1 - feeRate / 100 - promotedRate / 100 - 0.2);

    let status = "Healthy";
    let statusText =
      "This accepted eBay offer appears workable under the current assumptions.";
    let recommendation =
      "Compare this offer against realistic sold comps, buyer demand, shipping cost, and your minimum acceptable profit.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This accepted eBay offer may not cover item cost, shipping, fees, packaging, and other seller costs.";
      recommendation =
        "Reject the offer, counter higher, reduce shipping drag, lower item cost, or avoid promoted listing spend on this item.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This accepted offer is profitable, but the margin is thin after eBay costs.";
      recommendation =
        "Be careful accepting lower offers, adding discounts, paying extra shipping, or absorbing returns because profit could disappear quickly.";
    } else if (margin >= 35) {
      status = "Strong";
      statusText =
        "This accepted offer leaves a strong estimated margin after entered eBay seller costs.";
      recommendation =
        "This offer appears strong if the sold comp, buyer reliability, and fulfillment assumptions are realistic.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing";
      if (scenarioMargin < 15) return "Thin";
      if (scenarioMargin >= 35) return "Strong";
      return "Healthy";
    };

    const offerScenarios = [0.7, 0.8, 0.9, 1, 1.1].map((multiplier) => {
      const scenarioOffer = offer * multiplier;
      const scenarioRevenue = scenarioOffer + chargedShipping;
      const scenarioFees =
        scenarioRevenue * (feeRate / 100) +
        fixedFee +
        scenarioRevenue * (promotedRate / 100);
      const scenarioCosts = item + actualShipping + packaging + other + scenarioFees;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        label: multiplier === 1 ? "Current" : toMoney(scenarioOffer),
        offer: scenarioOffer,
        discount:
          listed > 0 ? Math.max(0, ((listed - scenarioOffer) / listed) * 100) : 0,
        fees: scenarioFees,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Item cost", item],
      ["Shipping cost", actualShipping],
      ["Packaging cost", packaging],
      ["Final value fee", finalValueFee],
      ["Promoted listing fee", promotedFee],
      ["Other costs", other],
      ["Offer discount", discountAmount],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: sellerCosts > 0 ? (Number(amount) / sellerCosts) * 100 : 0,
      revenueShare: revenue > 0 ? (Number(amount) / revenue) * 100 : 0,
    }));

    return {
      listed,
      offer,
      item,
      chargedShipping,
      actualShipping,
      packaging,
      feeRate,
      fixedFee,
      promotedRate,
      other,
      discountAmount,
      discountRate,
      revenue,
      finalValueFee,
      promotedFee,
      totalFees,
      shippingGap,
      sellerCosts,
      profit,
      profitAtList,
      profitLost,
      margin,
      marginAtOffer,
      roiOnItemCost,
      feeShare,
      costShare,
      adjustedBreakEvenOffer,
      minimumHealthyOffer,
      status,
      statusText,
      recommendation,
      offerScenarios,
      costBreakdown,
    };
  }, [
    listingPrice,
    acceptedOffer,
    itemCost,
    shippingCharged,
    shippingCost,
    packagingCost,
    finalValueFeeRate,
    fixedOrderFee,
    promotedListingRate,
    otherCosts,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0 ? "bad" : result.margin < 15 ? "warning" : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Offer Discount Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether an accepted eBay offer, discount, coupon, markdown,
          or counteroffer still leaves profit after item cost, shipping, eBay
          fees, promoted listing fees, packaging, and other selling costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Offer inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your list price, accepted offer, shipping charged, item cost,
            fee assumptions, promoted listing rate, and seller costs to estimate
            offer profitability.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Price and offer details
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Listing price"
                  prefix="$"
                  value={listingPrice}
                  onChange={setListingPrice}
                />

                <NumberInput
                  label="Accepted offer"
                  prefix="$"
                  value={acceptedOffer}
                  onChange={setAcceptedOffer}
                />

                <NumberInput
                  label="Shipping charged to buyer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Item and fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Item cost"
                  prefix="$"
                  value={itemCost}
                  onChange={setItemCost}
                />

                <NumberInput
                  label="Actual shipping cost"
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

                <NumberInput
                  label="Other costs"
                  prefix="$"
                  value={otherCosts}
                  onChange={setOtherCosts}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                eBay fee assumptions
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
                  value={fixedOrderFee}
                  onChange={setFixedOrderFee}
                />

                <NumberInput
                  label="Promoted listing rate"
                  suffix="%"
                  value={promotedListingRate}
                  onChange={setPromotedListingRate}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual eBay final value fees,
            promoted listing fees, shipping costs, refunds, taxes, payment
            holds, international fees, category rates, and seller-specific costs
            may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay offer profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated offer profit"
              value={toMoney(result.profit)}
              helper="Accepted offer plus shipping minus item cost, shipping, fees, and seller costs"
              tone={profitTone}
            />

            <MetricCard
              label="Offer margin"
              value={percent(result.margin)}
              helper="Estimated profit divided by offer revenue"
              tone={profitTone}
            />

            <MetricCard
              label="Accepted offer"
              value={toMoney(result.offer)}
              helper="Entered accepted buyer offer"
              tone="blue"
            />

            <MetricCard
              label="Discount from list"
              value={toMoney(result.discountAmount)}
              helper={`${percent(result.discountRate)} below listing price`}
              tone="warning"
            />

            <MetricCard
              label="Total revenue"
              value={toMoney(result.revenue)}
              helper="Accepted offer plus buyer-paid shipping"
              tone="blue"
            />

            <MetricCard
              label="Profit at list price"
              value={toMoney(result.profitAtList)}
              helper="Estimated profit if sold at full listing price"
              tone="good"
            />

            <MetricCard
              label="Profit lost to offer"
              value={toMoney(result.profitLost)}
              helper="Difference between full-price profit and offer profit"
              tone="warning"
            />

            <MetricCard
              label="Break-even offer"
              value={toMoney(result.adjustedBreakEvenOffer)}
              helper="Approximate offer needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Healthy offer estimate"
              value={toMoney(result.minimumHealthyOffer)}
              helper="Approximate offer needed for 20% margin"
              tone="good"
            />

            <MetricCard
              label="Total eBay fees"
              value={toMoney(result.totalFees)}
              helper="Final value fee plus promoted listing fee"
              tone="warning"
            />

            <MetricCard
              label="Fee share"
              value={percent(result.feeShare)}
              helper="Total fees divided by offer revenue"
              tone="warning"
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="Buyer shipping charge minus actual shipping cost"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="ROI on item cost"
              value={percent(result.roiOnItemCost)}
              helper="Profit divided by item cost"
              tone={result.roiOnItemCost > 40 ? "good" : "warning"}
            />

            <MetricCard
              label="Cost share"
              value={percent(result.costShare)}
              helper="Seller costs divided by revenue"
              tone={result.costShare < 75 ? "good" : "warning"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Your listing price is <strong>{toMoney(result.listed)}</strong>,
                and the accepted offer is{" "}
                <strong>{toMoney(result.offer)}</strong>. That is a discount of{" "}
                <strong>{toMoney(result.discountAmount)}</strong>, or{" "}
                <strong>{percent(result.discountRate)}</strong>.
              </p>

              <p>
                Estimated offer revenue is{" "}
                <strong>{toMoney(result.revenue)}</strong>. After item cost,
                shipping, packaging, eBay fees, promoted listing fees, and other
                costs, estimated profit is{" "}
                <strong>{toMoney(result.profit)}</strong> with a margin of{" "}
                <strong>{percent(result.margin)}</strong>.
              </p>

              <p>
                Compared with selling at list price, this offer reduces
                estimated profit by{" "}
                <strong>{toMoney(result.profitLost)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Offer scenario comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3">Offer</th>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Fees</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.offerScenarios.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.label === "Current" ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{toMoney(row.offer)}</td>
                      <td className="px-4 py-3">{percent(row.discount)}</td>
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
          How to use this eBay Offer Discount Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing price",
              "Add the original eBay listing price before accepting an offer, markdown, or discount.",
            ],
            [
              "Add offer amount",
              "Enter the accepted buyer offer, counteroffer, coupon-adjusted price, or discounted sale price.",
            ],
            [
              "Include eBay costs",
              "Add item cost, shipping, packaging, final value fees, promoted listing rate, and other expenses.",
            ],
            [
              "Compare margin",
              "Review whether the accepted offer still leaves enough profit before accepting or countering.",
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
            eBay offer cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs and discounts are taking the largest share of the
            accepted-offer order.
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
                  <p>{percent(item.share)} of seller costs</p>
                  <p>{percent(item.revenueShare)} of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay offer mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Accepting buyer offers without subtracting item cost, shipping, and fees.",
              "Ignoring promoted listing fees when calculating offer profit.",
              "Offering free shipping or discounts without raising the starting price enough.",
              "Comparing offers to active listings instead of realistic sold comps.",
              "Accepting low offers on items with high shipping or packaging costs.",
              "Forgetting refunds, returns, cancellations, and buyer issue risk before accepting thin-margin offers.",
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
            Understanding your eBay offer results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The accepted
              offer leaves strong estimated profit after entered eBay seller
              costs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The offer
              appears workable under the current assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The offer
              is profitable, but shipping changes, returns, fees, or additional
              discounts could reduce profit quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The offer
              may not cover item cost, shipping, eBay fees, packaging, and other
              seller costs.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Original listing price and accepted offer amount.",
              "Item cost, sourcing cost, cleaning cost, and prep cost.",
              "Actual shipping cost, packaging, labels, and handling materials.",
              "eBay final value fee, fixed order fee, and promoted listing rate.",
              "Shipping charged to the buyer or seller-paid shipping subsidy.",
              "Refund, return, cancellation, and damaged item allowance.",
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
          Ways to improve eBay offer profitability
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise list price",
              "Build enough room for buyer offers, seller coupons, shipping, fees, and target profit.",
            ],
            [
              "Set an offer floor",
              "Know your minimum acceptable offer before responding to buyer messages or counteroffers.",
            ],
            [
              "Reduce shipping drag",
              "Use accurate weights, right-sized packaging, and efficient shipping services.",
            ],
            [
              "Promote carefully",
              "Avoid high promoted listing rates on listings that already have thin offer margins.",
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
          Related eBay seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/ebay/profit-calculator", "Profit Calculator"],
            ["/ebay/pricing-calculator", "Pricing Calculator"],
            ["/ebay/break-even-calculator", "Break-Even Calculator"],
            ["/ebay/promoted-listing-roi-calculator", "Promoted Listing ROI Calculator"],
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