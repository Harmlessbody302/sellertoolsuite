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

function numberFormat(value: number) {
  if (!Number.isFinite(value)) return "0";

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 1,
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

export default function AmazonProductCostCalculatorPage() {
  const [salePrice, setSalePrice] = useState("35");
  const [productCost, setProductCost] = useState("12");
  const [inboundShipping, setInboundShipping] = useState("1.5");
  const [prepCost, setPrepCost] = useState("0.75");
  const [packagingCost, setPackagingCost] = useState("0.5");
  const [inspectionCost, setInspectionCost] = useState("0.25");
  const [defectAllowance, setDefectAllowance] = useState("0.5");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [fulfillmentCost, setFulfillmentCost] = useState("5.5");
  const [storageCost, setStorageCost] = useState("0.25");
  const [ppcCost, setPpcCost] = useState("2");
  const [refundAllowance, setRefundAllowance] = useState("1");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyOrders, setMonthlyOrders] = useState("100");

  const results = useMemo(() => {
    const price = safeNumber(salePrice);
    const item = safeNumber(productCost);
    const inbound = safeNumber(inboundShipping);
    const prep = safeNumber(prepCost);
    const packaging = safeNumber(packagingCost);
    const inspection = safeNumber(inspectionCost);
    const defects = safeNumber(defectAllowance);
    const referralRate = safeNumber(referralFeeRate) / 100;
    const fulfillment = safeNumber(fulfillmentCost);
    const storage = safeNumber(storageCost);
    const ppc = safeNumber(ppcCost);
    const refunds = safeNumber(refundAllowance);
    const misc = safeNumber(otherCosts);
    const orders = safeNumber(monthlyOrders);

    const trueProductCost =
      item + inbound + prep + packaging + inspection + defects;

    const referralFee = price * referralRate;

    const amazonCosts = referralFee + fulfillment + storage;
    const sellingCosts = ppc + refunds + misc;

    const totalCost = trueProductCost + amazonCosts + sellingCosts;
    const profit = price - totalCost;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const markup = trueProductCost > 0 ? (profit / trueProductCost) * 100 : 0;
    const roi = trueProductCost > 0 ? (profit / trueProductCost) * 100 : 0;
    const costShare = price > 0 ? (totalCost / price) * 100 : 0;

    const breakEvenPrice =
      (trueProductCost + fulfillment + storage + ppc + refunds + misc) /
      Math.max(0.0001, 1 - referralRate);

    const target20MarginPrice =
      (trueProductCost + fulfillment + storage + ppc + refunds + misc) /
      Math.max(0.0001, 1 - referralRate - 0.2);

    const target30MarginPrice =
      (trueProductCost + fulfillment + storage + ppc + refunds + misc) /
      Math.max(0.0001, 1 - referralRate - 0.3);

    const monthlyRevenue = price * orders;
    const monthlyTrueProductCost = trueProductCost * orders;
    const monthlyTotalCost = totalCost * orders;
    const monthlyProfit = profit * orders;

    const productCostShare =
      totalCost > 0 ? (trueProductCost / totalCost) * 100 : 0;
    const amazonCostShare = totalCost > 0 ? (amazonCosts / totalCost) * 100 : 0;
    const sellingCostShare =
      totalCost > 0 ? (sellingCosts / totalCost) * 100 : 0;

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
      const scenarioReferralFee = scenarioPrice * referralRate;
      const scenarioAmazonCosts = scenarioReferralFee + fulfillment + storage;
      const scenarioTotalCost =
        trueProductCost + scenarioAmazonCosts + sellingCosts;
      const scenarioProfit = scenarioPrice - scenarioTotalCost;
      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

      return {
        price: scenarioPrice,
        totalCost: scenarioTotalCost,
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
      item,
      inbound,
      prep,
      packaging,
      inspection,
      defects,
      referralRate,
      fulfillment,
      storage,
      ppc,
      refunds,
      misc,
      orders,
      trueProductCost,
      referralFee,
      amazonCosts,
      sellingCosts,
      totalCost,
      profit,
      margin,
      markup,
      roi,
      costShare,
      breakEvenPrice,
      target20MarginPrice,
      target30MarginPrice,
      monthlyRevenue,
      monthlyTrueProductCost,
      monthlyTotalCost,
      monthlyProfit,
      productCostShare,
      amazonCostShare,
      sellingCostShare,
      status,
      statusTone,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    inboundShipping,
    prepCost,
    packagingCost,
    inspectionCost,
    defectAllowance,
    referralFeeRate,
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
          Amazon Product Cost Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate the true cost of an Amazon product after sourcing, inbound
          shipping, prep, packaging, inspection, defect allowance, Amazon fees,
          fulfillment costs, PPC, refunds, storage, and other selling costs.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Product cost inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, product cost, landed cost details, Amazon fees,
            fulfillment cost, PPC, refunds, and monthly order volume.
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
                Landed product cost
              </p>

              {[
                ["Product cost", productCost, setProductCost],
                ["Inbound shipping per unit", inboundShipping, setInboundShipping],
                ["Prep / label cost", prepCost, setPrepCost],
                ["Packaging cost", packagingCost, setPackagingCost],
                ["Inspection cost", inspectionCost, setInspectionCost],
                ["Defect / waste allowance", defectAllowance, setDefectAllowance],
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
                ["Fulfillment cost", fulfillmentCost, setFulfillmentCost],
                ["Storage cost per unit", storageCost, setStorageCost],
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
            This calculator is an estimate. Actual product cost, inbound
            shipping, prep costs, Amazon fees, fulfillment costs, PPC results,
            refunds, storage fees, taxes, and seller-specific expenses may vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated true product cost and profit.
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
              note="Sale price minus true product cost, Amazon costs, PPC, and refunds"
              tone={results.statusTone}
            />

            <ResultCard
              title="Profit margin"
              value={percent(results.margin)}
              note="Estimated profit divided by sale price"
              tone={results.statusTone}
            />

            <ResultCard
              title="True product cost"
              value={money(results.trueProductCost)}
              note="Product cost plus inbound, prep, packaging, inspection, and defect allowance"
              tone="warn"
            />

            <ResultCard
              title="Total cost"
              value={money(results.totalCost)}
              note="True product cost plus Amazon and selling costs"
              tone="warn"
            />

            <ResultCard
              title="Amazon costs"
              value={money(results.amazonCosts)}
              note="Referral fee, fulfillment cost, and storage cost"
              tone="warn"
            />

            <ResultCard
              title="Selling costs"
              value={money(results.sellingCosts)}
              note="PPC, refund allowance, and other costs"
              tone="warn"
            />

            <ResultCard
              title="Referral fee"
              value={money(results.referralFee)}
              note="Sale price multiplied by referral fee rate"
              tone="warn"
            />

            <ResultCard
              title="ROI on true product cost"
              value={percent(results.roi)}
              note="Estimated profit divided by true product cost"
              tone={results.roi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="Cost share"
              value={percent(results.costShare)}
              note="Total cost divided by sale price"
              tone="warn"
            />

            <ResultCard
              title="Break-even price"
              value={money(results.breakEvenPrice)}
              note="Approximate sale price needed before profit starts"
              tone="warn"
            />

            <ResultCard
              title="20% margin price"
              value={money(results.target20MarginPrice)}
              note="Approximate sale price needed for a 20% margin"
              tone="good"
            />

            <ResultCard
              title="30% margin price"
              value={money(results.target30MarginPrice)}
              note="Approximate sale price needed for a 30% margin"
              tone="good"
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
              note="Sale price multiplied by monthly orders"
              tone="blue"
            />

            <ResultCard
              title="Monthly total cost"
              value={money(results.monthlyTotalCost)}
              note="Total cost multiplied by monthly orders"
              tone="warn"
            />

            <ResultCard
              title="Monthly product cost"
              value={money(results.monthlyTrueProductCost)}
              note="True product cost multiplied by monthly orders"
              tone="warn"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                This Amazon product is estimated to have a true product cost of{" "}
                <strong className="text-gray-950">
                  {money(results.trueProductCost)}
                </strong>{" "}
                per unit before final profit is calculated.
              </p>

              <p>
                At a sale price of{" "}
                <strong className="text-gray-950">
                  {money(results.price)}
                </strong>
                , estimated profit is{" "}
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
                The estimated break-even sale price is{" "}
                <strong className="text-gray-950">
                  {money(results.breakEvenPrice)}
                </strong>
                . Pricing below that level may lose money under these
                assumptions.
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
                    <th className="px-4 py-3">Total cost</th>
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
                      <td className="px-4 py-3">
                        {money(scenario.totalCost)}
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
          How to use this Amazon Product Cost Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product cost",
              "Add item cost, inbound shipping, prep, packaging, inspection, and waste allowance.",
            ],
            [
              "Add Amazon costs",
              "Include referral fee, fulfillment cost, storage cost, and other Amazon-related costs.",
            ],
            [
              "Add selling costs",
              "Include PPC, refunds, and any other cost that affects profit per order.",
            ],
            [
              "Review pricing",
              "Compare profit, margin, break-even price, target margin prices, and monthly profit.",
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
            Product cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which cost categories are taking up the largest share of the
            sale price.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Product cost", results.item],
              ["Inbound shipping", results.inbound],
              ["Prep / label cost", results.prep],
              ["Packaging cost", results.packaging],
              ["Inspection cost", results.inspection],
              ["Defect allowance", results.defects],
              ["Amazon costs", results.amazonCosts],
              ["Selling costs", results.sellingCosts],
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
                    results.totalCost > 0
                      ? ((value as number) / results.totalCost) * 100
                      : 0,
                  )}{" "}
                  of total cost
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Amazon product cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Only using the supplier price as the product cost.",
              "Forgetting inbound shipping, prep, labels, packaging, inspection, or waste allowance.",
              "Ignoring Amazon referral fees, fulfillment fees, storage, PPC, and refunds.",
              "Pricing products before calculating break-even and target margin prices.",
              "Restocking inventory before checking whether true product cost still supports profit.",
              "Using the same cost assumptions after supplier, shipping, or fee changes.",
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
            Understanding your product cost result
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> The product
              appears to have enough margin after true product cost and selling
              costs.
            </p>

            <p>
              <strong className="text-green-700">Healthy:</strong> The product
              appears workable, but Amazon fees, PPC, refunds, and storage
              should still be reviewed.
            </p>

            <p>
              <strong className="text-amber-700">Thin Margin:</strong> The
              product may be vulnerable to fee changes, refund issues, PPC cost,
              or sourcing increases.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> The
              product may not cover its full cost structure under the entered
              assumptions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Amazon sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Supplier price, product cost, and landed cost.",
              "Inbound shipping, prep, labeling, packaging, inspection, and samples.",
              "Defect allowance, waste allowance, damaged units, and unsellable inventory.",
              "Amazon referral fees, fulfillment fees, storage costs, and category-specific costs.",
              "PPC, coupon cost, refund allowance, return cost, and customer issue risk.",
              "Break-even price, target margin price, monthly orders, and cash flow.",
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
          Ways to improve Amazon product cost
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Reduce sourcing cost",
              "Negotiate supplier pricing, compare vendors, or improve order planning.",
            ],
            [
              "Reduce landed cost",
              "Review inbound shipping, prep, packaging, inspection, and waste allowance.",
            ],
            [
              "Reduce selling costs",
              "Improve PPC efficiency, refund prevention, storage planning, and fulfillment choices.",
            ],
            [
              "Raise price carefully",
              "Increase price when the market supports it and the product needs more margin.",
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
            ["/amazon/profit-calculator", "Profit Calculator"],
            ["/amazon/pricing-calculator", "Pricing Calculator"],
            ["/amazon/fee-calculator", "Fee Calculator"],
            ["/amazon/fba-vs-fbm-calculator", "FBA vs FBM Calculator"],
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