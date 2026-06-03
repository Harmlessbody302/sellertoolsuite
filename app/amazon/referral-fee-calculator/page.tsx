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

export default function AmazonReferralFeeCalculatorPage() {
  const [salePrice, setSalePrice] = useState("35");
  const [shippingCharged, setShippingCharged] = useState("0");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [minimumReferralFee, setMinimumReferralFee] = useState("0.3");
  const [productCost, setProductCost] = useState("12");
  const [fulfillmentCost, setFulfillmentCost] = useState("5.5");
  const [storageCost, setStorageCost] = useState("0.25");
  const [ppcCost, setPpcCost] = useState("2");
  const [refundAllowance, setRefundAllowance] = useState("1");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyOrders, setMonthlyOrders] = useState("100");

  const results = useMemo(() => {
    const price = safeNumber(salePrice);
    const shipping = safeNumber(shippingCharged);
    const rate = safeNumber(referralFeeRate) / 100;
    const minimumFee = safeNumber(minimumReferralFee);
    const itemCost = safeNumber(productCost);
    const fulfillment = safeNumber(fulfillmentCost);
    const storage = safeNumber(storageCost);
    const ppc = safeNumber(ppcCost);
    const refunds = safeNumber(refundAllowance);
    const misc = safeNumber(otherCosts);
    const orders = safeNumber(monthlyOrders);

    const revenue = price + shipping;
    const percentageReferralFee = revenue * rate;
    const referralFee = Math.max(percentageReferralFee, minimumFee);
    const minimumFeeDifference = Math.max(0, minimumFee - percentageReferralFee);

    const nonReferralCosts = itemCost + fulfillment + storage + ppc + refunds + misc;
    const totalCosts = nonReferralCosts + referralFee;
    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const referralFeeShare = revenue > 0 ? (referralFee / revenue) * 100 : 0;
    const costShare = revenue > 0 ? (totalCosts / revenue) * 100 : 0;
    const roi = itemCost > 0 ? (profit / itemCost) * 100 : 0;

    const breakEvenPrice =
      (itemCost + fulfillment + storage + ppc + refunds + misc + minimumFeeDifference) /
        Math.max(0.0001, 1 - rate) -
      shipping;

    const target20MarginPrice =
      (itemCost + fulfillment + storage + ppc + refunds + misc + minimumFeeDifference) /
        Math.max(0.0001, 1 - rate - 0.2) -
      shipping;

    const monthlyRevenue = revenue * orders;
    const monthlyReferralFees = referralFee * orders;
    const monthlyCosts = totalCosts * orders;
    const monthlyProfit = profit * orders;

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

    const scenarios = [8, 10, 12, 15, 18, 20].map((scenarioRate) => {
      const scenarioReferralFee = Math.max(revenue * (scenarioRate / 100), minimumFee);
      const scenarioCosts = nonReferralCosts + scenarioReferralFee;
      const scenarioProfit = revenue - scenarioCosts;
      const scenarioMargin = revenue > 0 ? (scenarioProfit / revenue) * 100 : 0;

      return {
        rate: scenarioRate,
        referralFee: scenarioReferralFee,
        totalCosts: scenarioCosts,
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
      shipping,
      rate,
      minimumFee,
      itemCost,
      fulfillment,
      storage,
      ppc,
      refunds,
      misc,
      orders,
      revenue,
      percentageReferralFee,
      referralFee,
      minimumFeeDifference,
      nonReferralCosts,
      totalCosts,
      profit,
      margin,
      referralFeeShare,
      costShare,
      roi,
      breakEvenPrice,
      target20MarginPrice,
      monthlyRevenue,
      monthlyReferralFees,
      monthlyCosts,
      monthlyProfit,
      status,
      statusTone,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    referralFeeRate,
    minimumReferralFee,
    productCost,
    fulfillmentCost,
    storageCost,
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
          Amazon Referral Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Amazon referral fees, profit after referral fees, monthly
          referral fee cost, margin, break-even price, and how category fee
          rates can affect seller profitability.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Referral fee inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter the item price, shipping charged, referral fee rate, minimum
            referral fee, product cost, fulfillment cost, PPC, refunds, and
            order volume.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Revenue and fee rate
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

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Minimum referral fee
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={minimumReferralFee}
                  onChange={(event) => setMinimumReferralFee(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Product and selling costs
              </p>

              {[
                ["Product cost", productCost, setProductCost],
                ["Fulfillment cost", fulfillmentCost, setFulfillmentCost],
                ["Storage cost", storageCost, setStorageCost],
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
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Amazon referral fee rates, minimum
            fees, category rules, fulfillment costs, PPC results, refunds, and
            seller-specific costs may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon referral fee impact.
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
              note="Revenue after product, fulfillment, referral fee, and other costs"
              tone={results.statusTone}
            />

            <ResultCard
              title="Profit margin"
              value={percent(results.margin)}
              note="Estimated profit divided by order revenue"
              tone={results.statusTone}
            />

            <ResultCard
              title="Referral fee"
              value={money(results.referralFee)}
              note="Greater of percentage referral fee or minimum referral fee"
              tone="warn"
            />

            <ResultCard
              title="Referral fee share"
              value={percent(results.referralFeeShare)}
              note="Referral fee divided by order revenue"
              tone="warn"
            />

            <ResultCard
              title="Order revenue"
              value={money(results.revenue)}
              note="Sale price plus shipping charged to buyer"
              tone="blue"
            />

            <ResultCard
              title="Total costs"
              value={money(results.totalCosts)}
              note="Product, fulfillment, referral fee, PPC, refunds, and other costs"
              tone="warn"
            />

            <ResultCard
              title="Monthly referral fees"
              value={money(results.monthlyReferralFees)}
              note="Referral fee multiplied by monthly orders"
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
              note="Order revenue multiplied by monthly orders"
              tone="blue"
            />

            <ResultCard
              title="Monthly costs"
              value={money(results.monthlyCosts)}
              note="Total costs multiplied by monthly orders"
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
              title="ROI on product cost"
              value={percent(results.roi)}
              note="Estimated profit divided by product cost"
              tone={results.roi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Cost share"
              value={percent(results.costShare)}
              note="Total costs divided by order revenue"
              tone="warn"
            />

            <ResultCard
              title="Percentage fee"
              value={money(results.percentageReferralFee)}
              note="Order revenue multiplied by referral fee rate"
              tone="warn"
            />

            <ResultCard
              title="Minimum fee adjustment"
              value={money(results.minimumFeeDifference)}
              note="Extra fee pressure if minimum fee is higher than percentage fee"
              tone={results.minimumFeeDifference > 0 ? "warn" : "good"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                This order has an estimated Amazon referral fee of{" "}
                <strong className="text-gray-950">
                  {money(results.referralFee)}
                </strong>
                , or{" "}
                <strong className="text-gray-950">
                  {percent(results.referralFeeShare)}
                </strong>{" "}
                of revenue.
              </p>

              <p>
                Estimated profit after product, fulfillment, referral fee, and
                selling costs is{" "}
                <strong className="text-gray-950">
                  {money(results.profit)}
                </strong>{" "}
                with a margin of{" "}
                <strong className="text-gray-950">
                  {percent(results.margin)}
                </strong>
                .
              </p>

              <p>
                At{" "}
                <strong className="text-gray-950">
                  {results.orders.toLocaleString("en-US")}
                </strong>{" "}
                monthly orders, estimated referral fees total{" "}
                <strong className="text-gray-950">
                  {money(results.monthlyReferralFees)}
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">
              Referral fee rate comparison
            </h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Rate</th>
                    <th className="px-4 py-3">Referral fee</th>
                    <th className="px-4 py-3">Total costs</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.rate}
                      className={
                        Math.abs(scenario.rate / 100 - results.rate) < 0.001
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">{percent(scenario.rate)}</td>
                      <td className="px-4 py-3">
                        {money(scenario.referralFee)}
                      </td>
                      <td className="px-4 py-3">
                        {money(scenario.totalCosts)}
                      </td>
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
          How to use this Amazon Referral Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter revenue",
              "Add the sale price and any shipping charged to the buyer.",
            ],
            [
              "Set fee rate",
              "Enter the referral fee rate and minimum referral fee for the category.",
            ],
            [
              "Add costs",
              "Include product cost, fulfillment, storage, PPC, refunds, and other costs.",
            ],
            [
              "Review profit",
              "Compare referral fee impact, margin, break-even price, and monthly fee cost.",
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
            Referral fee cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how much of the order is going toward referral fees and other
            seller costs.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Product cost", results.itemCost],
              ["Fulfillment cost", results.fulfillment],
              ["Storage cost", results.storage],
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
            Common Amazon referral fee mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Using one referral fee rate for every category.",
              "Ignoring minimum referral fees on lower-priced products.",
              "Pricing products without checking referral fee impact on margin.",
              "Forgetting that shipping charged to the buyer can affect fee calculations depending on rules and assumptions.",
              "Ignoring fulfillment, PPC, storage, refunds, and product cost when reviewing referral fees.",
              "Restocking products before checking whether the current referral fee still supports profit.",
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
            Understanding your referral fee result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The product
              appears to have useful margin after referral fees and entered
              seller costs.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> The product
              appears workable, but fee pressure and other costs should still be
              reviewed.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> Referral
              fees, PPC, refunds, or fulfillment costs may leave little room for
              mistakes.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The order
              may not cover all entered costs after the referral fee is applied.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Sale price and shipping charged to the buyer.",
              "Referral fee rate for the correct product category.",
              "Minimum referral fee if it applies to the category or price point.",
              "Product cost, fulfillment cost, storage, PPC, refunds, and other seller costs.",
              "Monthly order volume and monthly referral fee exposure.",
              "Break-even price, target margin price, and profit after fees.",
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

      <section className="mt-8 rounded-2xl border border-blue-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Related Amazon seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/amazon/fee-calculator", "Fee Calculator"],
            ["/amazon/profit-calculator", "Profit Calculator"],
            ["/amazon/pricing-calculator", "Pricing Calculator"],
            ["/amazon/product-cost-calculator", "Product Cost Calculator"],
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