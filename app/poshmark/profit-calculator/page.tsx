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

export default function PoshmarkProfitCalculatorPage() {
  const [listingPrice, setListingPrice] = useState(45);
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState(10);
  const [itemCost, setItemCost] = useState(18);
  const [shippingDiscount, setShippingDiscount] = useState(2);
  const [packagingCost, setPackagingCost] = useState(1);
  const [otherCosts, setOtherCosts] = useState(0);

  const result = useMemo(() => {
    const price = Math.max(0, listingPrice);
    const discountRate = Math.min(95, Math.max(0, buyerOfferDiscount));
    const cost = Math.max(0, itemCost);
    const shipping = Math.max(0, shippingDiscount);
    const packaging = Math.max(0, packagingCost);
    const other = Math.max(0, otherCosts);

    const offerDiscount = price * (discountRate / 100);
    const saleAfterOffer = Math.max(0, price - offerDiscount);

    const poshmarkFee =
      saleAfterOffer > 0 && saleAfterOffer < 15
        ? 2.95
        : saleAfterOffer * 0.2;

    const sellerPaidCosts = shipping + packaging + other;
    const totalCosts = cost + poshmarkFee + sellerPaidCosts;
    const profit = saleAfterOffer - totalCosts;
    const margin = saleAfterOffer > 0 ? (profit / saleAfterOffer) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const breakEvenAfterOffer = totalCosts;
    const feeShare =
      saleAfterOffer > 0 ? (poshmarkFee / saleAfterOffer) * 100 : 0;
    const totalCostShare =
      saleAfterOffer > 0 ? (totalCosts / saleAfterOffer) * 100 : 0;
    const sellerPaidCostShare =
      saleAfterOffer > 0 ? (sellerPaidCosts / saleAfterOffer) * 100 : 0;
    const offerDiscountShare =
      price > 0 ? (offerDiscount / price) * 100 : 0;
    const revenueKeptAfterFees =
      saleAfterOffer > 0
        ? ((saleAfterOffer - poshmarkFee - sellerPaidCosts) / saleAfterOffer) *
          100
        : 0;
    const profitBeforeOffer = price - poshmarkFee - cost - sellerPaidCosts;
    const profitBeforeShippingDiscount = profit + shipping;

    let status = "Healthy";
    let statusText =
      "This Poshmark sale appears profitable after item cost, seller fees, offer discount, shipping discount, packaging, and selling costs.";
    let recommendation =
      "This listing looks workable. Compare against similar sold listings before accepting offers or sending shipping discounts.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This Poshmark sale may lose money after fees, item cost, offer discount, and seller-paid costs.";
      recommendation =
        "Raise your listing price, lower your offer discount, reduce shipping incentives, reduce item cost, or avoid selling this item at the entered price.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This Poshmark sale is profitable, but the margin is thin.";
      recommendation =
        "Be careful with offers, shipping discounts, and closet promotions because small changes could erase profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This Poshmark sale has a strong estimated profit margin.";
      recommendation =
        "This item may have enough room for offers, shipping discounts, or promotion if demand is strong.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "Losing Money";
      if (scenarioMargin < 15) return "Thin";
      if (scenarioMargin >= 30) return "Strong";
      return "Healthy";
    };

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioListingPrice = Math.max(0, price + change);
      const scenarioOfferDiscount = scenarioListingPrice * (discountRate / 100);
      const scenarioSaleAfterOffer = Math.max(
        0,
        scenarioListingPrice - scenarioOfferDiscount,
      );

      const scenarioFee =
        scenarioSaleAfterOffer > 0 && scenarioSaleAfterOffer < 15
          ? 2.95
          : scenarioSaleAfterOffer * 0.2;

      const scenarioTotalCosts = cost + scenarioFee + sellerPaidCosts;
      const scenarioProfit = scenarioSaleAfterOffer - scenarioTotalCosts;
      const scenarioMargin =
        scenarioSaleAfterOffer > 0
          ? (scenarioProfit / scenarioSaleAfterOffer) * 100
          : 0;

      return {
        change,
        listingPrice: scenarioListingPrice,
        saleAfterOffer: scenarioSaleAfterOffer,
        poshmarkFee: scenarioFee,
        totalCosts: scenarioTotalCosts,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Item cost", cost],
      ["Poshmark fee", poshmarkFee],
      ["Shipping discount", shipping],
      ["Packaging cost", packaging],
      ["Other selling costs", other],
      ["Buyer offer discount", offerDiscount],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        totalCosts + offerDiscount > 0
          ? (Number(amount) / (totalCosts + offerDiscount)) * 100
          : 0,
      saleShare:
        saleAfterOffer > 0 ? (Number(amount) / saleAfterOffer) * 100 : 0,
    }));

    return {
      price,
      discountRate,
      offerDiscount,
      offerDiscountShare,
      saleAfterOffer,
      poshmarkFee,
      sellerPaidCosts,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenAfterOffer,
      feeShare,
      totalCostShare,
      sellerPaidCostShare,
      revenueKeptAfterFees,
      profitBeforeOffer,
      profitBeforeShippingDiscount,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    listingPrice,
    buyerOfferDiscount,
    itemCost,
    shippingDiscount,
    packagingCost,
    otherCosts,
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
          Poshmark Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Poshmark Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Poshmark profit after item cost, seller fees, buyer offer
          discounts, shipping discounts, packaging, and other selling costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Profit inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter listing price, expected buyer offer discount, item cost,
            shipping discount, packaging, and other costs to estimate real
            Poshmark profit.
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
                Item and seller-paid costs
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
                Estimated Poshmark profit breakdown.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Sale after offer minus item cost, Poshmark fee, and seller-paid costs"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
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
              label="Sale after offer"
              value={toMoney(result.saleAfterOffer)}
              helper="Listing price after buyer offer discount"
              tone="blue"
            />

            <MetricCard
              label="Listing price"
              value={toMoney(result.price)}
              helper="Entered Poshmark listing price before offer discount"
              tone="blue"
            />

            <MetricCard
              label="Buyer offer discount"
              value={toMoney(result.offerDiscount)}
              helper="Estimated discount from listing price"
              tone="warning"
            />

            <MetricCard
              label="Poshmark fee"
              value={toMoney(result.poshmarkFee)}
              helper="Flat fee under $15 or 20% of sale after offer"
              tone="warning"
            />

            <MetricCard
              label="Fee share"
              value={percent(result.feeShare)}
              helper="Poshmark fee divided by sale after offer"
              tone="warning"
            />

            <MetricCard
              label="Total costs"
              value={toMoney(result.totalCosts)}
              helper="Item cost, Poshmark fee, shipping discount, packaging, and other costs"
            />

            <MetricCard
              label="Total cost share"
              value={percent(result.totalCostShare)}
              helper="Total costs divided by sale after offer"
              tone={result.totalCostShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Seller-paid costs"
              value={toMoney(result.sellerPaidCosts)}
              helper="Shipping discount, packaging, and other costs"
              tone={result.sellerPaidCosts > 0 ? "warning" : "good"}
            />

            <MetricCard
              label="Revenue kept after fees"
              value={percent(result.revenueKeptAfterFees)}
              helper="Sale after offer minus fee and seller-paid costs"
              tone={result.revenueKeptAfterFees >= 70 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even after-offer sale"
              value={toMoney(result.breakEvenAfterOffer)}
              helper="Approximate sale after offer needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="Profit before shipping discount"
              value={toMoney(result.profitBeforeShippingDiscount)}
              helper="Estimated profit if no shipping discount were applied"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This listing is priced at{" "}
                <strong>{toMoney(result.price)}</strong>. After the estimated
                buyer offer discount, the sale becomes{" "}
                <strong>{toMoney(result.saleAfterOffer)}</strong>.
              </p>

              <p>
                Poshmark fees are estimated at{" "}
                <strong>{toMoney(result.poshmarkFee)}</strong>. Total entered
                costs are <strong>{toMoney(result.totalCosts)}</strong>,
                leaving estimated profit of{" "}
                <strong>{toMoney(result.profit)}</strong>.
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
                    <th className="px-4 py-3">Change</th>
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
                      <td className="px-4 py-3">{toMoney(row.listingPrice)}</td>
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
          How to use this Poshmark Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing price",
              "Add the expected Poshmark listing price before buyer offers, discounts, or item cost.",
            ],
            [
              "Add offer discount",
              "Enter the buyer offer discount you expect to accept from your listing price.",
            ],
            [
              "Include seller costs",
              "Add item cost, shipping discount, packaging, and any other closet expenses.",
            ],
            [
              "Review scenarios",
              "Compare lower and higher listing prices to see how offers or price changes affect profit.",
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
            Review which costs are taking the largest share of the estimated
            Poshmark sale.
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
            Common Poshmark profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating listing price as profit before subtracting offer discounts and fees.",
              "Forgetting shipping discounts when sending offers to likers.",
              "Using net after fees as profit before subtracting item cost and prep cost.",
              "Accepting buyer offers without recalculating profit after seller-paid costs.",
              "Ignoring packaging, labels, supplies, and other closet expenses.",
              "Comparing listings by active price only instead of actual sold comps.",
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
            Understanding your Poshmark profit results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Profit margin
              is strong enough to support offers, shipping discounts, closet
              promotion, and normal resale variation.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The sale
              appears profitable after entered costs and fees.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The sale
              is profitable, but offers, shipping discounts, or seller-paid costs
              could erase profit quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The sale
              does not cover all entered costs and fees.
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
              "Other closet expenses before treating net revenue as profit.",
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
          Ways to improve Poshmark profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Raise listing price",
              "Build enough room for buyer offers, Poshmark fees, shipping discounts, and item cost.",
            ],
            [
              "Lower item cost",
              "Source inventory with enough spread between item cost and realistic sold comps.",
            ],
            [
              "Limit shipping discounts",
              "Use shipping incentives carefully because they reduce profit on every accepted offer.",
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