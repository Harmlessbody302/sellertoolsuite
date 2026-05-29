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
        : status === "Tight"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function FacebookMarketplaceNegotiationCalculatorPage() {
  const [listingPrice, setListingPrice] = useState(90);
  const [itemCost, setItemCost] = useState(35);
  const [shippingCost, setShippingCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [negotiationDiscount, setNegotiationDiscount] = useState(10);

  const result = useMemo(() => {
    const listing = Math.max(0, listingPrice);
    const item = Math.max(0, itemCost);
    const shipping = Math.max(0, shippingCost);
    const delivery = Math.max(0, deliveryCost);
    const packaging = Math.max(0, packagingCost);
    const feeRate = Math.min(95, Math.max(0, platformFeeRate));
    const discountRate = Math.min(95, Math.max(0, negotiationDiscount));

    const fixedCosts = item + shipping + delivery + packaging;

    const evaluateDiscount = (discount: number) => {
      const acceptedPrice = listing * (1 - discount / 100);
      const platformFee = acceptedPrice * (feeRate / 100);
      const totalCosts = fixedCosts + platformFee;
      const netProfit = acceptedPrice - totalCosts;
      const margin = acceptedPrice > 0 ? (netProfit / acceptedPrice) * 100 : 0;
      const feeShare =
        acceptedPrice > 0 ? (platformFee / acceptedPrice) * 100 : 0;
      const fixedCostShare =
        acceptedPrice > 0 ? (fixedCosts / acceptedPrice) * 100 : 0;

      return {
        acceptedPrice,
        platformFee,
        totalCosts,
        netProfit,
        margin,
        feeShare,
        fixedCostShare,
      };
    };

    const current = evaluateDiscount(discountRate);
    const noDiscount = evaluateDiscount(0);

    const profitLost = noDiscount.netProfit - current.netProfit;

    const negotiationROI =
      profitLost > 0 ? (current.netProfit / profitLost) * 100 : 0;

    const breakEvenDiscount =
      listing > 0 && feeRate < 100
        ? Math.max(
            0,
            ((listing - fixedCosts / (1 - feeRate / 100)) / listing) * 100,
          )
        : 0;

    const maxHealthyDiscount = Math.max(0, breakEvenDiscount - 10);

    const profitKept =
      noDiscount.netProfit > 0
        ? (current.netProfit / noDiscount.netProfit) * 100
        : 0;

    const acceptedPriceShare =
      listing > 0 ? (current.acceptedPrice / listing) * 100 : 0;

    const totalCostPressure =
      fixedCosts + current.platformFee + (listing - current.acceptedPrice);

    let status = "Healthy";
    let statusText =
      "This negotiation discount still leaves a healthy Facebook Marketplace profit margin.";
    let recommendation =
      "You have room to negotiate while preserving a solid local-sale return.";

    if (current.netProfit <= 0) {
      status = "Losing Money";
      statusText =
        "This negotiation discount would likely make the sale unprofitable.";
      recommendation =
        "Reject this offer level or increase your listing price before negotiating.";
    } else if (current.margin < 15) {
      status = "Tight";
      statusText =
        "This negotiation leaves limited room for delivery costs or additional buyer pressure.";
      recommendation =
        "Use caution before accepting repeated offers at this discount.";
    } else if (current.margin >= 35) {
      status = "Strong";
      statusText =
        "This negotiation discount still preserves strong pricing flexibility.";
      recommendation =
        "This is likely a workable negotiation level for local buyers.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0) return "Losing Money";
      if (margin < 15) return "Tight";
      if (margin >= 35) return "Strong";
      return "Healthy";
    };

    const scenarios = [5, 10, 15, 20, 25].map((discount) => {
      const evaluation = evaluateDiscount(discount);

      return {
        discount,
        ...evaluation,
        status: getScenarioStatus(evaluation.netProfit, evaluation.margin),
      };
    });

    const costBreakdown = [
      ["Item cost", item],
      ["Shipping cost", shipping],
      ["Delivery / fuel cost", delivery],
      ["Packaging cost", packaging],
      ["Platform fee", current.platformFee],
      ["Negotiation discount", listing - current.acceptedPrice],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalCostPressure > 0
          ? (Number(amount) / totalCostPressure) * 100
          : 0,
      acceptedShare:
        current.acceptedPrice > 0
          ? (Number(amount) / current.acceptedPrice) * 100
          : 0,
    }));

    return {
      listing,
      item,
      shipping,
      delivery,
      packaging,
      feeRate,
      discountRate,
      fixedCosts,
      acceptedPrice: current.acceptedPrice,
      platformFee: current.platformFee,
      totalCosts: current.totalCosts,
      netProfit: current.netProfit,
      margin: current.margin,
      feeShare: current.feeShare,
      fixedCostShare: current.fixedCostShare,
      noDiscountProfit: noDiscount.netProfit,
      profitLost,
      negotiationROI,
      breakEvenDiscount,
      maxHealthyDiscount,
      profitKept,
      acceptedPriceShare,
      totalCostPressure,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    listingPrice,
    itemCost,
    shippingCost,
    deliveryCost,
    packagingCost,
    platformFeeRate,
    negotiationDiscount,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.netProfit <= 0
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
          Facebook Marketplace Negotiation Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate how buyer negotiation affects Facebook Marketplace profit and
          determine how much discount room you can safely accept after item
          cost, delivery, fuel, shipping, packaging, and platform fees.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Negotiation inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your listing price, item cost, fulfillment costs, platform fee
            assumptions, and expected buyer negotiation discount to estimate
            whether an offer is worth accepting.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Listing and item costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Listing price"
                  prefix="$"
                  value={listingPrice}
                  onChange={setListingPrice}
                />

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
                  label="Negotiation discount"
                  suffix="%"
                  value={negotiationDiscount}
                  onChange={setNegotiationDiscount}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Facebook Marketplace
            negotiation outcomes can vary based on buyer demand, local comps,
            pickup distance, delivery expectations, platform fees, payment
            processing, cancellations, and buyer behavior.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Facebook Marketplace negotiation profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Accepted price"
              value={toMoney(result.acceptedPrice)}
              helper="Listing price after expected buyer negotiation"
              tone="blue"
            />

            <MetricCard
              label="Net profit"
              value={toMoney(result.netProfit)}
              helper="Accepted price minus fixed costs and platform fee"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Net profit divided by accepted buyer price"
              tone={profitTone}
            />

            <MetricCard
              label="Profit lost to negotiation"
              value={toMoney(result.profitLost)}
              helper="Profit difference compared with full listing price"
              tone="warning"
            />

            <MetricCard
              label="Negotiation ROI"
              value={percent(result.negotiationROI)}
              helper="Net profit divided by profit lost to negotiation"
              tone={result.negotiationROI >= 100 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even discount"
              value={percent(result.breakEvenDiscount)}
              helper="Estimated maximum discount before profit reaches zero"
              tone="warning"
            />

            <MetricCard
              label="Max healthy discount"
              value={percent(result.maxHealthyDiscount)}
              helper="Break-even discount minus 10 percentage-point cushion"
              tone="good"
            />

            <MetricCard
              label="Profit kept"
              value={percent(result.profitKept)}
              helper="Current profit divided by no-discount profit"
              tone={result.profitKept >= 70 ? "good" : "warning"}
            />

            <MetricCard
              label="Listing price"
              value={toMoney(result.listing)}
              helper="Entered Facebook Marketplace listing price"
              tone="blue"
            />

            <MetricCard
              label="Fixed costs"
              value={toMoney(result.fixedCosts)}
              helper="Item, shipping, delivery, fuel, and packaging costs"
            />

            <MetricCard
              label="Platform fee"
              value={toMoney(result.platformFee)}
              helper="Estimated fee after accepted buyer price"
              tone={result.platformFee > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Fee share"
              value={percent(result.feeShare)}
              helper="Platform fee divided by accepted buyer price"
              tone={result.feeShare > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Fixed cost share"
              value={percent(result.fixedCostShare)}
              helper="Fixed costs divided by accepted buyer price"
              tone={result.fixedCostShare < 65 ? "good" : "warning"}
            />

            <MetricCard
              label="Accepted price share"
              value={percent(result.acceptedPriceShare)}
              helper="Accepted buyer price divided by listing price"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This buyer negotiation would likely land at{" "}
                <strong>{toMoney(result.acceptedPrice)}</strong>, producing
                approximately <strong>{toMoney(result.netProfit)}</strong> in
                profit after fixed costs and any platform fee.
              </p>

              <p>
                Compared with selling at full listing price, this negotiation
                reduces profit by about{" "}
                <strong>{toMoney(result.profitLost)}</strong>.
              </p>

              <p>
                Your estimated maximum break-even negotiation discount is{" "}
                <strong>{percent(result.breakEvenDiscount)}</strong>. A safer
                discount target is closer to{" "}
                <strong>{percent(result.maxHealthyDiscount)}</strong>.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Discount comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Discount</th>
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
                      key={row.discount}
                      className={
                        row.discount === negotiationDiscount
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.discount}%</td>
                      <td className="px-4 py-3">
                        {toMoney(row.acceptedPrice)}
                      </td>
                      <td className="px-4 py-3">
                        {toMoney(row.platformFee)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.netProfit)}</td>
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
          How to use this Facebook Marketplace Negotiation Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing price",
              "Add the price shown on your Facebook Marketplace listing before negotiation.",
            ],
            [
              "Add seller costs",
              "Include item cost, shipping, delivery, fuel, packaging, and prep expenses.",
            ],
            [
              "Estimate discount",
              "Enter the buyer negotiation discount you expect from local offers or counteroffers.",
            ],
            [
              "Review offer room",
              "Compare discount levels before accepting an offer, reducing price, or agreeing to delivery.",
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
            Facebook Marketplace negotiation breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs and discounts are taking the largest share of the
            accepted buyer price.
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
            Common Facebook Marketplace negotiation mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating the listing price as the final accepted sale price.",
              "Accepting buyer offers without recalculating profit after item cost.",
              "Forgetting delivery, fuel, parking, tolls, or pickup effort.",
              "Ignoring payment processing or shipping fees when checkout applies.",
              "Dropping price repeatedly without protecting a minimum acceptable offer.",
              "Comparing against active listings instead of realistic local sold prices.",
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
            Understanding your negotiation results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The accepted
              price leaves strong room for negotiation, delivery, and normal
              local marketplace variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The buyer
              offer appears workable under the current cost and fee assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Tight:</strong> The offer may
              still work, but delivery, shipping, lower counteroffers, or fee
              changes could reduce profit quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              accepted offer would not cover all entered costs and fees.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Facebook Marketplace sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Listing price before buyer negotiation or counteroffers.",
              "Minimum acceptable offer before replying to lowball messages.",
              "Item cost, repair cost, cleaning cost, prep cost, and supplies.",
              "Delivery cost, fuel cost, pickup effort, and meeting distance.",
              "Platform fee, checkout fee, shipping fee, or processing fee when applicable.",
              "Local sold comps and realistic buyer negotiation patterns.",
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
          Ways to improve Facebook Marketplace negotiation
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "List with room",
              "Set pricing with enough cushion to accept reasonable offers without dropping below profit.",
            ],
            [
              "Charge for delivery",
              "Do not absorb delivery, fuel, or time costs unless the accepted price still works.",
            ],
            [
              "Set a floor",
              "Know your lowest acceptable offer before responding to buyer messages.",
            ],
            [
              "Improve listing quality",
              "Use better photos, clear measurements, condition notes, and fast replies to reduce pressure.",
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
            ["/facebook-marketplace/break-even-calculator", "Break-Even Calculator"],
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