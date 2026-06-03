"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tone = "good" | "warn" | "bad" | "neutral" | "blue";

function money(value: number) {
  if (!Number.isFinite(value)) return "$0.00";

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function percent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

function safeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function ResultCard({
  title,
  value,
  note,
  tone = "neutral",
}: {
  title: string;
  value: string;
  note: string;
  tone?: Tone;
}) {
  const toneClass =
    tone === "good"
      ? "border-green-200 bg-green-50"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50"
        : tone === "bad"
          ? "border-red-200 bg-red-50"
          : tone === "blue"
            ? "border-blue-200 bg-blue-50"
            : "border-gray-200 bg-gray-50";

  return (
    <div className={`rounded-xl border p-5 ${toneClass}`}>
      <p className="text-sm font-bold text-gray-700">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      <p className="mt-2 text-sm leading-5 text-gray-600">{note}</p>
    </div>
  );
}

export default function AmazonFbmProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState("35");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [itemCost, setItemCost] = useState("12");
  const [shippingCost, setShippingCost] = useState("6");
  const [packagingCost, setPackagingCost] = useState("1.25");
  const [handlingCost, setHandlingCost] = useState("2");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [ppcCost, setPpcCost] = useState("2");
  const [refundAllowance, setRefundAllowance] = useState("1");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyOrders, setMonthlyOrders] = useState("100");

  const results = useMemo(() => {
    const price = safeNumber(salePrice);
    const buyerShipping = safeNumber(shippingCharged);
    const cost = safeNumber(itemCost);
    const labelCost = safeNumber(shippingCost);
    const packaging = safeNumber(packagingCost);
    const handling = safeNumber(handlingCost);
    const referralRate = safeNumber(referralFeeRate) / 100;
    const ppc = safeNumber(ppcCost);
    const refunds = safeNumber(refundAllowance);
    const misc = safeNumber(otherCosts);
    const orders = safeNumber(monthlyOrders);

    const revenue = price + buyerShipping;
    const referralFee = revenue * referralRate;
    const totalCosts =
      cost + labelCost + packaging + handling + referralFee + ppc + refunds + misc;
    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const costShare = revenue > 0 ? (totalCosts / revenue) * 100 : 0;
    const shippingGap = buyerShipping - labelCost;
    const shippingTotal = labelCost + packaging + handling;
    const amazonAndSellingCosts = referralFee + ppc + refunds + misc;
    const monthlyProfit = profit * orders;
    const monthlyRevenue = revenue * orders;
    const monthlyCosts = totalCosts * orders;
    const breakEvenPrice =
      (cost + labelCost + packaging + handling + ppc + refunds + misc) /
        Math.max(0.0001, 1 - referralRate) -
      buyerShipping;
    const target20MarginPrice =
      (cost + labelCost + packaging + handling + ppc + refunds + misc) /
        Math.max(0.0001, 1 - referralRate - 0.2) -
      buyerShipping;

    const status =
      profit < 0
        ? "Losing Money"
        : margin < 10
          ? "Thin Margin"
          : margin < 20
            ? "Healthy"
            : "Strong";

    const statusTone: Tone =
      profit < 0 ? "bad" : margin < 10 ? "warn" : "good";

    const scenarios = [20, 30, 40, 50, 60].map((scenarioPrice) => {
      const scenarioRevenue = scenarioPrice + buyerShipping;
      const scenarioReferralFee = scenarioRevenue * referralRate;
      const scenarioCosts =
        cost +
        labelCost +
        packaging +
        handling +
        scenarioReferralFee +
        ppc +
        refunds +
        misc;
      const scenarioProfit = scenarioRevenue - scenarioCosts;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        price: scenarioPrice,
        revenue: scenarioRevenue,
        costs: scenarioCosts,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status:
          scenarioProfit < 0
            ? "Losing"
            : scenarioMargin < 10
              ? "Thin"
              : scenarioMargin < 20
                ? "Healthy"
                : "Strong",
      };
    });

    return {
      price,
      buyerShipping,
      cost,
      labelCost,
      packaging,
      handling,
      referralRate,
      ppc,
      refunds,
      misc,
      orders,
      revenue,
      referralFee,
      totalCosts,
      profit,
      margin,
      roi,
      costShare,
      shippingGap,
      shippingTotal,
      amazonAndSellingCosts,
      monthlyProfit,
      monthlyRevenue,
      monthlyCosts,
      breakEvenPrice,
      target20MarginPrice,
      status,
      statusTone,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    itemCost,
    shippingCost,
    packagingCost,
    handlingCost,
    referralFeeRate,
    ppcCost,
    refundAllowance,
    otherCosts,
    monthlyOrders,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon FBM Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon FBM profit after item cost, buyer-paid shipping,
          shipping label cost, packaging, handling, referral fees, PPC, refunds,
          and other merchant-fulfilled selling costs.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">FBM inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, shipping charged, item cost, shipping label cost,
            packaging, handling, Amazon fees, PPC, refunds, and order volume.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Revenue
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Sale price
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={salePrice}
                  onChange={(event) => setSalePrice(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Shipping charged to buyer
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={shippingCharged}
                  onChange={(event) => setShippingCharged(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Monthly orders
              </label>
              <input
                value={monthlyOrders}
                onChange={(event) => setMonthlyOrders(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 outline-none"
                inputMode="decimal"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Product and fulfillment costs
              </p>

              {[
                ["Item cost", itemCost, setItemCost],
                ["Shipping label cost", shippingCost, setShippingCost],
                ["Packaging cost", packagingCost, setPackagingCost],
                ["Handling / labor cost", handlingCost, setHandlingCost],
              ].map(([label, value, setter]) => (
                <div key={label as string}>
                  <label className="mt-3 block text-sm font-medium text-gray-700">
                    {label as string}
                  </label>
                  <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      value={value as string}
                      onChange={(event) =>
                        (setter as (value: string) => void)(event.target.value)
                      }
                      className="w-full rounded-r-lg px-3 py-2 outline-none"
                      inputMode="decimal"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Amazon and selling costs
              </p>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Referral fee rate
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={referralFeeRate}
                  onChange={(event) => setReferralFeeRate(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">%</span>
              </div>

              {[
                ["PPC cost per order", ppcCost, setPpcCost],
                ["Refund allowance", refundAllowance, setRefundAllowance],
                ["Other costs", otherCosts, setOtherCosts],
              ].map(([label, value, setter]) => (
                <div key={label as string}>
                  <label className="mt-3 block text-sm font-medium text-gray-700">
                    {label as string}
                  </label>
                  <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                    <span className="px-3 py-2 text-gray-500">$</span>
                    <input
                      value={value as string}
                      onChange={(event) =>
                        (setter as (value: string) => void)(event.target.value)
                      }
                      className="w-full rounded-r-lg px-3 py-2 outline-none"
                      inputMode="decimal"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon referral fees,
            shipping costs, packaging costs, handling time, PPC results, refunds,
            taxes, and seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon FBM profitability.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                results.statusTone === "good"
                  ? "bg-green-100 text-green-700"
                  : results.statusTone === "warn"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {results.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ResultCard
              title="Estimated profit"
              value={money(results.profit)}
              note="Revenue minus item cost, shipping, packaging, Amazon fees, refunds, and selling costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Profit margin"
              value={percent(results.margin)}
              note="Estimated profit divided by total FBM order revenue"
              tone={results.statusTone}
            />

            <ResultCard
              title="Total revenue"
              value={money(results.revenue)}
              note="Sale price plus shipping charged to buyer"
              tone="blue"
            />

            <ResultCard
              title="Total costs"
              value={money(results.totalCosts)}
              note="Item cost, shipping, packaging, handling, referral fee, PPC, refunds, and other costs"
              tone="warn"
            />

            <ResultCard
              title="Monthly profit"
              value={money(results.monthlyProfit)}
              note="Estimated profit multiplied by monthly orders"
              tone={results.monthlyProfit > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Monthly revenue"
              value={money(results.monthlyRevenue)}
              note="Total order revenue multiplied by monthly orders"
              tone="blue"
            />

            <ResultCard
              title="Monthly costs"
              value={money(results.monthlyCosts)}
              note="Total order costs multiplied by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="ROI on item cost"
              value={percent(results.roi)}
              note="Estimated profit divided by item cost"
              tone={results.roi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Referral fee"
              value={money(results.referralFee)}
              note="Total order revenue multiplied by referral fee rate"
              tone="warn"
            />

            <ResultCard
              title="Shipping gap"
              value={money(results.shippingGap)}
              note="Shipping charged to buyer minus shipping label cost"
              tone={results.shippingGap >= 0 ? "good" : "warn"}
            />

            <ResultCard
              title="Fulfillment cost"
              value={money(results.shippingTotal)}
              note="Shipping label, packaging, and handling costs"
              tone="warn"
            />

            <ResultCard
              title="Amazon and selling costs"
              value={money(results.amazonAndSellingCosts)}
              note="Referral fee, PPC, refund allowance, and other costs"
              tone="warn"
            />

            <ResultCard
              title="Cost share"
              value={percent(results.costShare)}
              note="Total costs divided by order revenue"
              tone="warn"
            />

            <ResultCard
              title="Break-even price"
              value={money(results.breakEvenPrice)}
              note="Approximate item price needed before profit starts"
              tone="warn"
            />

            <ResultCard
              title="20% margin price"
              value={money(results.target20MarginPrice)}
              note="Approximate item price needed for a 20% margin"
              tone="good"
            />

            <ResultCard
              title="Shipping charged"
              value={money(results.buyerShipping)}
              note="Buyer-paid shipping entered for the order"
              tone="blue"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                This FBM order is estimated to produce{" "}
                <strong className="text-gray-950">
                  {money(results.profit)}
                </strong>{" "}
                in profit with a{" "}
                <strong className="text-gray-950">
                  {percent(results.margin)}
                </strong>{" "}
                margin.
              </p>

              <p>
                Total order revenue is{" "}
                <strong className="text-gray-950">
                  {money(results.revenue)}
                </strong>
                , while total estimated costs are{" "}
                <strong className="text-gray-950">
                  {money(results.totalCosts)}
                </strong>
                .
              </p>

              <p>
                The shipping gap is{" "}
                <strong className="text-gray-950">
                  {money(results.shippingGap)}
                </strong>
                . If this is negative, the order is subsidizing shipping from
                product profit.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">Price scenario comparison</h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Costs</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.price}
                      className={
                        Math.abs(scenario.price - results.price) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">{money(scenario.price)}</td>
                      <td className="px-4 py-3">{money(scenario.revenue)}</td>
                      <td className="px-4 py-3">{money(scenario.costs)}</td>
                      <td className="px-4 py-3">{money(scenario.profit)}</td>
                      <td className="px-4 py-3">{percent(scenario.margin)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.status === "Losing"
                              ? "bg-red-100 text-red-700"
                              : scenario.status === "Thin"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {scenario.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          How to use this Amazon FBM Profit Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter revenue",
              "Add the item sale price and any shipping charged to the buyer.",
            ],
            [
              "Add FBM costs",
              "Include item cost, shipping label, packaging, handling, and seller labor.",
            ],
            [
              "Add Amazon costs",
              "Include referral fees, PPC, refunds, and other selling costs.",
            ],
            [
              "Review profit",
              "Compare profit, margin, shipping gap, break-even price, and monthly profit.",
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
            FBM cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs reduce merchant-fulfilled profit.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Item cost", results.cost],
              ["Shipping label cost", results.labelCost],
              ["Packaging cost", results.packaging],
              ["Handling cost", results.handling],
              ["Referral fee", results.referralFee],
              ["PPC cost", results.ppc],
              ["Refund allowance", results.refunds],
              ["Other costs", results.misc],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {money(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {percent(
                    results.totalCosts > 0
                      ? ((value as number) / results.totalCosts) * 100
                      : 0,
                  )}{" "}
                  of total costs
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon FBM profit mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Treating buyer-paid shipping as profit without comparing it to the shipping label cost.",
              "Ignoring boxes, mailers, tape, labels, padding, inserts, and fulfillment supplies.",
              "Forgetting handling time, labor, customer messages, carrier issues, and drop-off work.",
              "Pricing from item cost alone instead of total merchant-fulfilled cost.",
              "Ignoring referral fees, PPC, refund allowance, and return-related losses.",
              "Using one shipping estimate for every item even when package size and weight differ.",
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
            Understanding your FBM profit result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The order
              appears to have useful profit after merchant-fulfilled costs and
              Amazon selling costs.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> The order
              appears workable, but sellers should still review shipping cost,
              refunds, and PPC pressure.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> Small
              changes in shipping, packaging, PPC, or refunds may reduce profit
              quickly.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The order
              may not cover all entered costs at the current price.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon FBM sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item sale price and shipping charged to the buyer.",
              "Item cost, supplier cost, inbound cost, and product prep.",
              "Shipping label cost, packaging materials, tape, labels, mailers, boxes, and padding.",
              "Handling time, labor, customer messages, carrier issues, and delivery expectations.",
              "Amazon referral fee, PPC, refunds, returns, damaged packages, and replacement shipments.",
              "Break-even price, shipping gap, profit margin, and monthly order volume.",
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
          Ways to improve Amazon FBM profit
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Reduce shipping cost",
              "Compare package sizes, carriers, service levels, and shipping settings.",
            ],
            [
              "Improve packaging",
              "Use packaging that protects the item without adding unnecessary weight or size.",
            ],
            [
              "Raise price carefully",
              "Increase price when the market allows and shipping costs are eating too much margin.",
            ],
            [
              "Control returns",
              "Use accurate listings, clear photos, reliable packaging, and better quality checks.",
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
          Related Amazon seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/amazon/fba-vs-fbm-calculator", "FBA vs FBM Calculator"],
            ["/amazon/fba-profit-calculator", "FBA Profit Calculator"],
            ["/amazon/fee-calculator", "Fee Calculator"],
            ["/amazon/pricing-calculator", "Pricing Calculator"],
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