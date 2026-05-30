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
        : status === "Watch Cost"
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
        : status === "Watch"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function EbayProductCostCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [mainItemCost, setMainItemCost] = useState(18);
  const [repairPrepCost, setRepairPrepCost] = useState(3);
  const [cleaningSupplyCost, setCleaningSupplyCost] = useState(1);
  const [packagingCost, setPackagingCost] = useState(2);
  const [shippingCost, setShippingCost] = useState(7);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [laborTime, setLaborTime] = useState(20);
  const [targetHourlyRate, setTargetHourlyRate] = useState(20);
  const [finalValueFeeRate, setFinalValueFeeRate] = useState(13.25);
  const [fixedOrderFee, setFixedOrderFee] = useState(0.4);
  const [promotedListingRate, setPromotedListingRate] = useState(2);
  const [wasteAllowance, setWasteAllowance] = useState(5);

  const result = useMemo(() => {
    const price = Math.max(0, salePrice);
    const item = Math.max(0, mainItemCost);
    const repair = Math.max(0, repairPrepCost);
    const supplies = Math.max(0, cleaningSupplyCost);
    const packaging = Math.max(0, packagingCost);
    const actualShipping = Math.max(0, shippingCost);
    const buyerShipping = Math.max(0, shippingCharged);
    const minutes = Math.max(0, laborTime);
    const hourly = Math.max(0, targetHourlyRate);
    const feeRate = Math.min(95, Math.max(0, finalValueFeeRate));
    const fixedFee = Math.max(0, fixedOrderFee);
    const promoRate = Math.min(95, Math.max(0, promotedListingRate));
    const wasteRate = Math.min(95, Math.max(0, wasteAllowance));

    const revenue = price + buyerShipping;
    const directItemCost = item + repair + supplies;
    const wasteCost = directItemCost * (wasteRate / 100);
    const laborCost = (minutes / 60) * hourly;
    const ebayFees = revenue * (feeRate / 100) + fixedFee + revenue * (promoRate / 100);
    const shippingGap = buyerShipping - actualShipping;

    const productCostBeforeLabor =
      directItemCost + wasteCost + packaging + actualShipping + ebayFees;

    const fullProductCost = productCostBeforeLabor + laborCost;
    const estimatedProfit = revenue - fullProductCost;
    const profitBeforeLabor = revenue - productCostBeforeLabor;
    const profitMargin = revenue > 0 ? (estimatedProfit / revenue) * 100 : 0;
    const marginBeforeLabor = revenue > 0 ? (profitBeforeLabor / revenue) * 100 : 0;
    const costShare = revenue > 0 ? (fullProductCost / revenue) * 100 : 0;
    const feeShare = revenue > 0 ? (ebayFees / revenue) * 100 : 0;
    const laborShare = fullProductCost > 0 ? (laborCost / fullProductCost) * 100 : 0;
    const shippingShare = fullProductCost > 0 ? (actualShipping / fullProductCost) * 100 : 0;
    const roiOnProductCost = fullProductCost > 0 ? (estimatedProfit / fullProductCost) * 100 : 0;
    const markupOnDirectCost = directItemCost > 0 ? ((price - directItemCost) / directItemCost) * 100 : 0;

    const breakEvenPrice =
      (directItemCost + wasteCost + packaging + actualShipping + laborCost - buyerShipping + fixedFee) /
      Math.max(0.01, 1 - feeRate / 100 - promoRate / 100);

    const targetMarginPrice =
      (directItemCost + wasteCost + packaging + actualShipping + laborCost - buyerShipping + fixedFee) /
      Math.max(0.01, 1 - feeRate / 100 - promoRate / 100 - 0.25);

    const impliedHourlyEarnings =
      minutes > 0 ? (profitBeforeLabor / (minutes / 60)) : 0;

    let status = "Healthy";
    let statusText =
      "This eBay product cost structure appears workable under the current assumptions.";
    let recommendation =
      "Review sold comps, sourcing cost, shipping weight, prep time, and fee assumptions before scaling this product.";

    if (estimatedProfit <= 0) {
      status = "High Cost";
      statusText =
        "This eBay product may not cover product cost, shipping, labor, fees, packaging, and waste allowance.";
      recommendation =
        "Raise price, lower sourcing cost, reduce shipping drag, simplify prep, lower promoted listing rate, or avoid this product.";
    } else if (profitMargin < 15 || costShare > 85) {
      status = "Watch Cost";
      statusText =
        "This eBay product is profitable, but the cost structure is tight.";
      recommendation =
        "Be careful with offers, refunds, shipping changes, promoted listing spend, or extra prep time because profit could disappear quickly.";
    } else if (profitMargin >= 30 && roiOnProductCost >= 40) {
      status = "Efficient";
      statusText =
        "This eBay product appears to have an efficient cost structure and strong estimated profit.";
      recommendation =
        "This may be a good product to source again if demand, sold comps, shipping assumptions, and return risk are realistic.";
    }

    const getScenarioStatus = (profit: number, margin: number) => {
      if (profit <= 0) return "High Cost";
      if (margin < 15) return "Watch";
      if (margin >= 30) return "Efficient";
      return "Healthy";
    };

    const priceScenarios = [35, 40, 45, 50, 60].map((scenarioPrice) => {
      const scenarioRevenue = scenarioPrice + buyerShipping;
      const scenarioFees =
        scenarioRevenue * (feeRate / 100) +
        fixedFee +
        scenarioRevenue * (promoRate / 100);
      const scenarioFullCost =
        directItemCost +
        wasteCost +
        packaging +
        actualShipping +
        laborCost +
        scenarioFees;
      const scenarioProfit = scenarioRevenue - scenarioFullCost;
      const scenarioMargin =
        scenarioRevenue > 0 ? (scenarioProfit / scenarioRevenue) * 100 : 0;

      return {
        price: scenarioPrice,
        revenue: scenarioRevenue,
        fullCost: scenarioFullCost,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Item / sourcing cost", item],
      ["Repair / prep cost", repair],
      ["Cleaning / supply cost", supplies],
      ["Waste allowance", wasteCost],
      ["Packaging cost", packaging],
      ["Shipping cost", actualShipping],
      ["Labor cost", laborCost],
      ["eBay fees", ebayFees],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share: fullProductCost > 0 ? (Number(amount) / fullProductCost) * 100 : 0,
      revenueShare: revenue > 0 ? (Number(amount) / revenue) * 100 : 0,
    }));

    return {
      price,
      item,
      repair,
      supplies,
      packaging,
      actualShipping,
      buyerShipping,
      minutes,
      hourly,
      feeRate,
      fixedFee,
      promoRate,
      wasteRate,
      revenue,
      directItemCost,
      wasteCost,
      laborCost,
      ebayFees,
      shippingGap,
      productCostBeforeLabor,
      fullProductCost,
      estimatedProfit,
      profitBeforeLabor,
      profitMargin,
      marginBeforeLabor,
      costShare,
      feeShare,
      laborShare,
      shippingShare,
      roiOnProductCost,
      markupOnDirectCost,
      breakEvenPrice,
      targetMarginPrice,
      impliedHourlyEarnings,
      status,
      statusText,
      recommendation,
      priceScenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    mainItemCost,
    repairPrepCost,
    cleaningSupplyCost,
    packagingCost,
    shippingCost,
    shippingCharged,
    laborTime,
    targetHourlyRate,
    finalValueFeeRate,
    fixedOrderFee,
    promotedListingRate,
    wasteAllowance,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.estimatedProfit <= 0
      ? "bad"
      : result.profitMargin < 15
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          eBay Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          eBay Product Cost Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate the true eBay product cost per item after sourcing cost,
          repair or prep cost, supplies, packaging, shipping, labor, eBay fees,
          promoted listing costs, and waste allowance.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Cost inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter sale price, sourcing cost, repair or cleaning costs, shipping,
            labor, eBay fees, and risk allowance to estimate true product cost
            and profit.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale and product costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Item / sourcing cost"
                  prefix="$"
                  value={mainItemCost}
                  onChange={setMainItemCost}
                />

                <NumberInput
                  label="Repair / prep cost"
                  prefix="$"
                  value={repairPrepCost}
                  onChange={setRepairPrepCost}
                />

                <NumberInput
                  label="Cleaning / supply cost"
                  prefix="$"
                  value={cleaningSupplyCost}
                  onChange={setCleaningSupplyCost}
                />

                <NumberInput
                  label="Waste allowance"
                  suffix="%"
                  value={wasteAllowance}
                  onChange={setWasteAllowance}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Shipping and fulfillment
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Shipping charged to buyer"
                  prefix="$"
                  value={shippingCharged}
                  onChange={setShippingCharged}
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
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Labor and eBay fees
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Prep / listing labor time"
                  suffix="min"
                  value={laborTime}
                  onChange={setLaborTime}
                />

                <NumberInput
                  label="Target hourly rate"
                  prefix="$"
                  value={targetHourlyRate}
                  onChange={setTargetHourlyRate}
                />

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
            This calculator is an estimate. Actual eBay fees, promoted listing
            costs, shipping costs, item condition issues, defects, returns,
            repair time, taxes, and seller-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated eBay product cost and profit.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.estimatedProfit)}
              helper="Revenue minus full product cost, shipping, labor, and fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.profitMargin)}
              helper="Estimated profit divided by total revenue"
              tone={profitTone}
            />

            <MetricCard
              label="Full product cost"
              value={toMoney(result.fullProductCost)}
              helper="Product, prep, waste, packaging, shipping, labor, and eBay fees"
              tone="warning"
            />

            <MetricCard
              label="Cost share"
              value={percent(result.costShare)}
              helper="Full product cost divided by total revenue"
              tone={result.costShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Product cost before labor"
              value={toMoney(result.productCostBeforeLabor)}
              helper="Costs before assigning labor value"
              tone="blue"
            />

            <MetricCard
              label="Profit before labor"
              value={toMoney(result.profitBeforeLabor)}
              helper="Estimated profit before paying yourself for time"
              tone="blue"
            />

            <MetricCard
              label="Labor cost"
              value={toMoney(result.laborCost)}
              helper="Prep/listing time multiplied by target hourly rate"
              tone="warning"
            />

            <MetricCard
              label="Implied hourly earnings"
              value={toMoney(result.impliedHourlyEarnings)}
              helper="Profit before labor divided by entered labor time"
              tone={result.impliedHourlyEarnings >= result.hourly ? "good" : "warning"}
            />

            <MetricCard
              label="Direct product cost"
              value={toMoney(result.directItemCost)}
              helper="Sourcing, repair/prep, and supplies before waste"
              tone="neutral"
            />

            <MetricCard
              label="Waste allowance"
              value={toMoney(result.wasteCost)}
              helper="Extra product cost from entered waste percentage"
              tone="warning"
            />

            <MetricCard
              label="eBay fees"
              value={toMoney(result.ebayFees)}
              helper="Final value, fixed order, and promoted listing fees"
              tone="warning"
            />

            <MetricCard
              label="Fee share"
              value={percent(result.feeShare)}
              helper="eBay fees divided by total revenue"
              tone="warning"
            />

            <MetricCard
              label="Shipping gap"
              value={toMoney(result.shippingGap)}
              helper="Buyer-paid shipping minus actual shipping cost"
              tone={result.shippingGap >= 0 ? "good" : "warning"}
            />

            <MetricCard
              label="ROI on product cost"
              value={percent(result.roiOnProductCost)}
              helper="Profit divided by full product cost"
              tone={result.roiOnProductCost >= 30 ? "good" : "warning"}
            />

            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Approximate item price needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="25% margin price"
              value={toMoney(result.targetMarginPrice)}
              helper="Approximate item price needed for 25% margin"
              tone="good"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At a sale price of <strong>{toMoney(result.price)}</strong> and
                buyer-paid shipping of{" "}
                <strong>{toMoney(result.buyerShipping)}</strong>, total revenue
                is <strong>{toMoney(result.revenue)}</strong>.
              </p>

              <p>
                Your estimated full product cost is{" "}
                <strong>{toMoney(result.fullProductCost)}</strong>, leaving
                estimated profit of{" "}
                <strong>{toMoney(result.estimatedProfit)}</strong> with a margin
                of <strong>{percent(result.profitMargin)}</strong>.
              </p>

              <p>
                Before labor is included, this product appears to have{" "}
                <strong>{toMoney(result.profitBeforeLabor)}</strong> in profit,
                which implies about{" "}
                <strong>{toMoney(result.impliedHourlyEarnings)}</strong> per
                hour for the entered prep/listing time.
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
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Full cost</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.priceScenarios.map((row) => (
                    <tr
                      key={row.price}
                      className={
                        row.price === result.price ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{toMoney(row.price)}</td>
                      <td className="px-4 py-3">{toMoney(row.revenue)}</td>
                      <td className="px-4 py-3">{toMoney(row.fullCost)}</td>
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
          How to use this eBay Product Cost Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter product costs",
              "Add sourcing cost, repair, prep, cleaning supplies, waste allowance, and packaging.",
            ],
            [
              "Add shipping",
              "Include buyer-paid shipping and actual shipping label cost to estimate shipping drag.",
            ],
            [
              "Include labor",
              "Add prep, listing, cleaning, testing, packing, or handling time at your target hourly rate.",
            ],
            [
              "Review profit",
              "Compare full product cost, break-even price, margin, and implied hourly earnings before sourcing more.",
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
            eBay product cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which costs are taking the largest share of the estimated
            full product cost.
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
                  <p>{percent(item.share)} of full cost</p>
                  <p>{percent(item.revenueShare)} of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common eBay product cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing products from sourcing cost alone.",
              "Ignoring repair, testing, cleaning, prep, and listing labor.",
              "Forgetting boxes, labels, tape, packaging supplies, and handling time.",
              "Treating buyer-paid shipping as profit without comparing it to actual shipping cost.",
              "Ignoring promoted listing fees, refunds, returns, defects, or damaged inventory.",
              "Buying more inventory before checking whether the product supports enough margin.",
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
            Understanding your eBay product cost results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Efficient:</strong> The product
              appears to have strong estimated profit after product cost,
              shipping, labor, fees, and risk allowance.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The product
              appears workable under the entered cost and fee assumptions.
            </p>

            <p>
              <strong className="text-amber-700">Watch Cost:</strong> The product
              is profitable, but shipping, labor, fees, refunds, or offers could
              reduce margin quickly.
            </p>

            <p>
              <strong className="text-red-700">High Cost:</strong> The product
              may not cover all entered costs at the current sale price.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What eBay sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Item sourcing cost, repair cost, prep cost, and cleaning supplies.",
              "Packaging materials, labels, tape, boxes, inserts, and shipping supplies.",
              "Actual shipping cost and buyer-paid shipping amount.",
              "eBay final value fees, fixed order fees, and promoted listing fees.",
              "Labor time for sourcing, cleaning, testing, photographing, listing, and packing.",
              "Waste, defects, returns, damaged inventory, stale stock, and refund risk.",
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
          Ways to lower eBay product cost
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Source better",
              "Compare sold comps, shipping weight, repair needs, and margin before buying inventory.",
            ],
            [
              "Reduce prep time",
              "Avoid products that require too much cleaning, testing, repair, or customer support.",
            ],
            [
              "Lower shipping drag",
              "Use accurate package sizes, efficient boxes, and realistic shipping settings.",
            ],
            [
              "Track real costs",
              "Review actual order costs after sale so future sourcing and pricing decisions improve.",
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
            ["/ebay/fee-calculator", "Fee Calculator"],
            ["/ebay/inventory-restock-calculator", "Inventory Restock Calculator"],
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