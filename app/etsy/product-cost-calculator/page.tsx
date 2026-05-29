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
    status === "Best"
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

export default function EtsyProductCostCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [mainMaterialCost, setMainMaterialCost] = useState(8);
  const [secondaryMaterialCost, setSecondaryMaterialCost] = useState(2);
  const [packagingCost, setPackagingCost] = useState(2);
  const [supplyCost, setSupplyCost] = useState(1);
  const [wasteRate, setWasteRate] = useState(10);
  const [batchCost, setBatchCost] = useState(60);
  const [batchUnits, setBatchUnits] = useState(10);
  const [laborMinutes, setLaborMinutes] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [etsyFeeRate, setEtsyFeeRate] = useState(9.5);
  const [fixedFees, setFixedFees] = useState(0.45);
  const [shippingCost, setShippingCost] = useState(5);

  const result = useMemo(() => {
    const price = Math.max(0, salePrice);
    const mainMaterial = Math.max(0, mainMaterialCost);
    const secondaryMaterial = Math.max(0, secondaryMaterialCost);
    const packaging = Math.max(0, packagingCost);
    const supplies = Math.max(0, supplyCost);
    const waste = Math.min(95, Math.max(0, wasteRate));
    const batch = Math.max(0, batchCost);
    const units = Math.max(1, batchUnits);
    const minutes = Math.max(0, laborMinutes);
    const rate = Math.max(0, hourlyRate);
    const feeRate = Math.min(95, Math.max(0, etsyFeeRate));
    const fixed = Math.max(0, fixedFees);
    const shipping = Math.max(0, shippingCost);

    const directMaterials = mainMaterial + secondaryMaterial;
    const materialWasteCost = directMaterials * (waste / 100);
    const batchCostPerUnit = batch / units;
    const laborHours = minutes / 60;
    const laborCost = laborHours * rate;
    const etsyFees = price * (feeRate / 100) + fixed;

    const productCostBeforeLabor =
      directMaterials +
      materialWasteCost +
      packaging +
      supplies +
      batchCostPerUnit;

    const totalProductCost = productCostBeforeLabor + laborCost;
    const fullCostWithFeesAndShipping = totalProductCost + etsyFees + shipping;
    const profit = price - fullCostWithFeesAndShipping;
    const profitBeforeLabor =
      price - (productCostBeforeLabor + etsyFees + shipping);

    const margin = price > 0 ? (profit / price) * 100 : 0;
    const costShare = price > 0 ? (fullCostWithFeesAndShipping / price) * 100 : 0;
    const productCostShare = price > 0 ? (totalProductCost / price) * 100 : 0;
    const materialShare = price > 0 ? (directMaterials / price) * 100 : 0;
    const laborShare = price > 0 ? (laborCost / price) * 100 : 0;
    const wasteShare = price > 0 ? (materialWasteCost / price) * 100 : 0;

    const markupOnProductCost =
      totalProductCost > 0 ? ((price - totalProductCost) / totalProductCost) * 100 : 0;

    const roiOnProductCost =
      totalProductCost > 0 ? (profit / totalProductCost) * 100 : 0;

    const breakEvenPrice = fullCostWithFeesAndShipping;
    const targetMargin = 25;
    const targetMarginPrice =
      targetMargin >= 100
        ? fullCostWithFeesAndShipping
        : fullCostWithFeesAndShipping / (1 - targetMargin / 100);

    const impliedHourlyEarnings =
      laborHours > 0 ? profitBeforeLabor / laborHours : profitBeforeLabor;

    let status = "Healthy";
    let statusText =
      "This Etsy product appears to cover product cost, labor, shipping, and estimated fees.";
    let recommendation =
      "This product cost structure looks workable, but compare it against demand, conversion rate, and realistic production capacity.";

    if (profit <= 0) {
      status = "High Cost";
      statusText =
        "This product may not cover all entered costs, labor, shipping, and estimated Etsy fees.";
      recommendation =
        "Raise the price, lower material cost, reduce waste, increase batch efficiency, simplify packaging, or choose a higher-margin product.";
    } else if (margin < 15 || costShare > 85) {
      status = "Watch Cost";
      statusText =
        "This product is profitable under the current assumptions, but the cost structure is tight.";
      recommendation =
        "Be careful with discounts, refunds, Offsite Ads, free shipping, and production changes because they could erase profit.";
    } else if (margin >= 35 && costShare <= 65) {
      status = "Efficient";
      statusText =
        "This product has an efficient estimated cost structure and strong margin.";
      recommendation =
        "This item may have room for discounts, ads, packaging upgrades, or production variation if buyer demand supports the price.";
    }

    const getScenarioStatus = (scenarioProfit: number, scenarioMargin: number) => {
      if (scenarioProfit <= 0) return "High Cost";
      if (scenarioMargin < 15) return "Watch";
      if (scenarioMargin >= 35) return "Best";
      return "Healthy";
    };

    const batchScenarios = [5, 10, 25, 50].map((scenarioUnits) => {
      const scenarioBatchUnitCost = batch / scenarioUnits;
      const scenarioProductCostBeforeLabor =
        directMaterials +
        materialWasteCost +
        packaging +
        supplies +
        scenarioBatchUnitCost;
      const scenarioTotalProductCost =
        scenarioProductCostBeforeLabor + laborCost;
      const scenarioFullCost =
        scenarioTotalProductCost + etsyFees + shipping;
      const scenarioProfit = price - scenarioFullCost;
      const scenarioMargin = price > 0 ? (scenarioProfit / price) * 100 : 0;

      return {
        units: scenarioUnits,
        batchUnitCost: scenarioBatchUnitCost,
        totalProductCost: scenarioTotalProductCost,
        fullCost: scenarioFullCost,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: getScenarioStatus(scenarioProfit, scenarioMargin),
      };
    });

    const costBreakdown = [
      ["Main materials", mainMaterial],
      ["Secondary materials", secondaryMaterial],
      ["Material waste allowance", materialWasteCost],
      ["Packaging", packaging],
      ["Supplies", supplies],
      ["Batch cost per unit", batchCostPerUnit],
      ["Labor cost", laborCost],
      ["Shipping cost", shipping],
      ["Estimated Etsy fees", etsyFees],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        fullCostWithFeesAndShipping > 0
          ? (Number(amount) / fullCostWithFeesAndShipping) * 100
          : 0,
      priceShare: price > 0 ? (Number(amount) / price) * 100 : 0,
    }));

    return {
      price,
      mainMaterial,
      secondaryMaterial,
      packaging,
      supplies,
      waste,
      batch,
      units,
      minutes,
      rate,
      feeRate,
      fixed,
      shipping,
      directMaterials,
      materialWasteCost,
      batchCostPerUnit,
      laborHours,
      laborCost,
      etsyFees,
      productCostBeforeLabor,
      totalProductCost,
      fullCostWithFeesAndShipping,
      profit,
      profitBeforeLabor,
      margin,
      costShare,
      productCostShare,
      materialShare,
      laborShare,
      wasteShare,
      markupOnProductCost,
      roiOnProductCost,
      breakEvenPrice,
      targetMarginPrice,
      impliedHourlyEarnings,
      status,
      statusText,
      recommendation,
      batchScenarios,
      costBreakdown,
    };
  }, [
    salePrice,
    mainMaterialCost,
    secondaryMaterialCost,
    packagingCost,
    supplyCost,
    wasteRate,
    batchCost,
    batchUnits,
    laborMinutes,
    hourlyRate,
    etsyFeeRate,
    fixedFees,
    shippingCost,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const profitTone =
    result.profit <= 0 ? "bad" : result.margin < 15 ? "warning" : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Product Cost Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate the true Etsy product cost per unit after materials,
          packaging, supplies, waste, batch costs, labor, shipping, and estimated
          Etsy fees are included.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Cost inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter material costs, packaging, supplies, waste allowance, batch
            cost, labor time, shipping, and Etsy fee assumptions to estimate
            product cost and profit.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Sale and material costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Main material cost"
                  prefix="$"
                  value={mainMaterialCost}
                  onChange={setMainMaterialCost}
                />

                <NumberInput
                  label="Secondary material cost"
                  prefix="$"
                  value={secondaryMaterialCost}
                  onChange={setSecondaryMaterialCost}
                />

                <NumberInput
                  label="Material waste allowance"
                  suffix="%"
                  value={wasteRate}
                  onChange={setWasteRate}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Batch and fulfillment costs
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Batch overhead / setup cost"
                  prefix="$"
                  value={batchCost}
                  onChange={setBatchCost}
                />

                <NumberInput
                  label="Units made per batch"
                  value={batchUnits}
                  onChange={setBatchUnits}
                />

                <NumberInput
                  label="Packaging cost"
                  prefix="$"
                  value={packagingCost}
                  onChange={setPackagingCost}
                />

                <NumberInput
                  label="Supply cost"
                  prefix="$"
                  value={supplyCost}
                  onChange={setSupplyCost}
                />

                <NumberInput
                  label="Shipping cost"
                  prefix="$"
                  value={shippingCost}
                  onChange={setShippingCost}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Labor and fee assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Labor time"
                  suffix="min"
                  value={laborMinutes}
                  onChange={setLaborMinutes}
                />

                <NumberInput
                  label="Target hourly rate"
                  prefix="$"
                  value={hourlyRate}
                  onChange={setHourlyRate}
                />

                <NumberInput
                  label="Etsy fee estimate"
                  suffix="%"
                  value={etsyFeeRate}
                  onChange={setEtsyFeeRate}
                />

                <NumberInput
                  label="Fixed Etsy / payment fees"
                  prefix="$"
                  value={fixedFees}
                  onChange={setFixedFees}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Etsy fees, payment processing
            fees, material costs, waste, batch efficiency, labor time, packaging,
            shipping, refunds, taxes, and product-specific costs may vary.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Etsy product cost and profit.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Estimated profit"
              value={toMoney(result.profit)}
              helper="Sale price minus product cost, labor, shipping, and estimated Etsy fees"
              tone={profitTone}
            />

            <MetricCard
              label="Profit margin"
              value={percent(result.margin)}
              helper="Estimated profit divided by sale price"
              tone={profitTone}
            />

            <MetricCard
              label="Total product cost"
              value={toMoney(result.totalProductCost)}
              helper="Materials, waste, packaging, supplies, batch cost, and labor"
              tone="warning"
            />

            <MetricCard
              label="Full cost with fees"
              value={toMoney(result.fullCostWithFeesAndShipping)}
              helper="Product cost plus shipping and estimated Etsy fees"
              tone={result.costShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Product cost before labor"
              value={toMoney(result.productCostBeforeLabor)}
              helper="Materials, waste, packaging, supplies, and batch cost per unit"
              tone="blue"
            />

            <MetricCard
              label="Labor cost"
              value={toMoney(result.laborCost)}
              helper="Labor time multiplied by target hourly rate"
              tone="warning"
            />

            <MetricCard
              label="Direct materials"
              value={toMoney(result.directMaterials)}
              helper="Main and secondary materials before waste allowance"
            />

            <MetricCard
              label="Waste allowance"
              value={toMoney(result.materialWasteCost)}
              helper="Extra material cost from entered waste percentage"
              tone={result.wasteShare < 10 ? "good" : "warning"}
            />

            <MetricCard
              label="Batch cost per unit"
              value={toMoney(result.batchCostPerUnit)}
              helper="Batch overhead divided by units made per batch"
              tone="blue"
            />

            <MetricCard
              label="Implied hourly earnings"
              value={toMoney(result.impliedHourlyEarnings)}
              helper="Profit before labor divided by production hours"
              tone={
                result.impliedHourlyEarnings >= result.rate
                  ? "good"
                  : "warning"
              }
            />

            <MetricCard
              label="ROI on product cost"
              value={percent(result.roiOnProductCost)}
              helper="Profit divided by total product cost"
              tone={result.roiOnProductCost > 50 ? "good" : "warning"}
            />

            <MetricCard
              label="Markup on product cost"
              value={percent(result.markupOnProductCost)}
              helper="Sale price above product cost divided by product cost"
              tone="blue"
            />

            <MetricCard
              label="Break-even price"
              value={toMoney(result.breakEvenPrice)}
              helper="Approximate price needed before profit starts"
              tone="warning"
            />

            <MetricCard
              label="25% margin price"
              value={toMoney(result.targetMarginPrice)}
              helper="Approximate price needed for 25% margin after all entered costs"
              tone="good"
            />

            <MetricCard
              label="Cost share"
              value={percent(result.costShare)}
              helper="Full cost with fees divided by sale price"
              tone={result.costShare < 75 ? "good" : "warning"}
            />

            <MetricCard
              label="Estimated Etsy fees"
              value={toMoney(result.etsyFees)}
              helper="Percentage fee estimate plus fixed fees"
              tone="warning"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                At a sale price of <strong>{toMoney(result.price)}</strong>,
                your estimated total product cost is{" "}
                <strong>{toMoney(result.totalProductCost)}</strong>. After
                shipping and estimated Etsy fees, full cost is{" "}
                <strong>{toMoney(result.fullCostWithFeesAndShipping)}</strong>.
              </p>

              <p>
                Estimated profit is <strong>{toMoney(result.profit)}</strong>{" "}
                with a margin of <strong>{percent(result.margin)}</strong>.
                Before labor is included, estimated profit would be{" "}
                <strong>{toMoney(result.profitBeforeLabor)}</strong>.
              </p>

              <p>
                Your batch cost per unit is{" "}
                <strong>{toMoney(result.batchCostPerUnit)}</strong>, based on{" "}
                <strong>{result.units.toFixed(0)}</strong> units per batch.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Batch size comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Units</th>
                    <th className="px-4 py-3">Batch/unit</th>
                    <th className="px-4 py-3">Product cost</th>
                    <th className="px-4 py-3">Full cost</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Margin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.batchScenarios.map((row) => (
                    <tr
                      key={row.units}
                      className={
                        row.units === result.units ? "bg-blue-50 font-bold" : ""
                      }
                    >
                      <td className="px-4 py-3">{row.units}</td>
                      <td className="px-4 py-3">
                        {toMoney(row.batchUnitCost)}
                      </td>
                      <td className="px-4 py-3">
                        {toMoney(row.totalProductCost)}
                      </td>
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
          How to use this Etsy Product Cost Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter materials",
              "Add main materials, secondary materials, waste allowance, and supplies used per product.",
            ],
            [
              "Add batch costs",
              "Enter setup or batch overhead and divide it across the number of units made per batch.",
            ],
            [
              "Include labor",
              "Add production time and your target hourly rate so the product cost reflects your work.",
            ],
            [
              "Review profit",
              "Compare product cost, full cost, break-even price, and target margin price before selling.",
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
            Etsy product cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review which inputs are taking the largest share of your estimated
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
                  <p>{percent(item.priceShare)} of sale price</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Etsy product cost mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Pricing products from main materials only.",
              "Forgetting secondary materials, supplies, packaging, waste, and batch setup cost.",
              "Ignoring labor time when calculating product cost.",
              "Dividing batch costs across too many units when some units may not sell.",
              "Forgetting that larger batches can reduce unit cost but increase cash tied up in inventory.",
              "Using product cost without adding Etsy fees, shipping, refunds, ads, or discounts.",
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
            Understanding your Etsy product cost results
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Efficient:</strong> The product
              has a strong estimated cost structure and leaves room after entered
              costs.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> The product
              appears to cover entered costs, labor, shipping, and estimated Etsy
              fees.
            </p>

            <p>
              <strong className="text-amber-700">Watch Cost:</strong> The
              product is profitable, but discounts, refunds, ads, or cost changes
              could reduce margin quickly.
            </p>

            <p>
              <strong className="text-red-700">High Cost:</strong> The product
              may not cover all entered costs at the current sale price.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Etsy sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Main materials, components, ingredients, or blanks.",
              "Secondary materials, labels, inserts, glue, thread, ink, or finishing supplies.",
              "Packaging, mailers, boxes, tape, padding, and shipping supplies.",
              "Waste, defects, test units, damaged inventory, and unusable material.",
              "Batch setup cost, equipment use, software, tools, molds, or templates.",
              "Labor time, Etsy fees, shipping cost, refunds, ads, discounts, and overhead.",
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
          Ways to lower Etsy product cost
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Reduce waste",
              "Improve measuring, cutting, batching, storage, and quality control to lower wasted material.",
            ],
            [
              "Batch efficiently",
              "Spread setup costs across realistic batch sizes without overproducing slow-moving inventory.",
            ],
            [
              "Simplify materials",
              "Remove unnecessary components or packaging that do not improve buyer value.",
            ],
            [
              "Review suppliers",
              "Compare suppliers, bulk pricing, shipping costs, and material quality before scaling.",
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
          Related Etsy seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/labor-cost-calculator", "Labor Cost Calculator"],
            ["/etsy/profit-calculator", "Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/seller-cost-checklist", "Seller Cost Checklist"],
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