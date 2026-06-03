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

export default function AmazonFbaVsFbmCalculatorPage() {
  const [salePrice, setSalePrice] = useState("35");
  const [productCost, setProductCost] = useState("12");
  const [referralFeeRate, setReferralFeeRate] = useState("15");
  const [monthlyOrders, setMonthlyOrders] = useState("240");

  const [fbaFulfillmentFee, setFbaFulfillmentFee] = useState("5.5");
  const [inboundShipping, setInboundShipping] = useState("1.5");
  const [fbaPrepLabelCost, setFbaPrepLabelCost] = useState("0.75");
  const [storageCostPerUnit, setStorageCostPerUnit] = useState("0.25");
  const [fbaRefundAllowance, setFbaRefundAllowance] = useState("1");

  const [fbmShippingCost, setFbmShippingCost] = useState("6");
  const [shippingCharged, setShippingCharged] = useState("5");
  const [fbmPackagingCost, setFbmPackagingCost] = useState("1.25");
  const [fbmHandlingCost, setFbmHandlingCost] = useState("2");
  const [fbmRefundAllowance, setFbmRefundAllowance] = useState("1");

  const [ppcCostPerOrder, setPpcCostPerOrder] = useState("2");
  const [otherCosts, setOtherCosts] = useState("0.5");
  const [monthlyFbaStorageExtra, setMonthlyFbaStorageExtra] = useState("20");
  const [fbmMonthlyTimeHours, setFbmMonthlyTimeHours] = useState("8");
  const [hourlyTimeValue, setHourlyTimeValue] = useState("20");

  const results = useMemo(() => {
    const price = safeNumber(salePrice);
    const cost = safeNumber(productCost);
    const referralRate = safeNumber(referralFeeRate) / 100;
    const orders = safeNumber(monthlyOrders);

    const fbaFee = safeNumber(fbaFulfillmentFee);
    const inbound = safeNumber(inboundShipping);
    const fbaPrep = safeNumber(fbaPrepLabelCost);
    const storage = safeNumber(storageCostPerUnit);
    const fbaRefunds = safeNumber(fbaRefundAllowance);

    const fbmShipping = safeNumber(fbmShippingCost);
    const buyerShipping = safeNumber(shippingCharged);
    const fbmPackaging = safeNumber(fbmPackagingCost);
    const fbmHandling = safeNumber(fbmHandlingCost);
    const fbmRefunds = safeNumber(fbmRefundAllowance);

    const ppc = safeNumber(ppcCostPerOrder);
    const misc = safeNumber(otherCosts);
    const extraStorage = safeNumber(monthlyFbaStorageExtra);
    const fbmHours = safeNumber(fbmMonthlyTimeHours);
    const hourly = safeNumber(hourlyTimeValue);

    const fbaRevenue = price;
    const fbmRevenue = price + buyerShipping;

    const fbaReferralFee = fbaRevenue * referralRate;
    const fbmReferralFee = fbmRevenue * referralRate;

    const fbaCostPerOrder =
      cost +
      fbaReferralFee +
      fbaFee +
      inbound +
      fbaPrep +
      storage +
      fbaRefunds +
      ppc +
      misc;

    const fbmCostPerOrder =
      cost +
      fbmReferralFee +
      fbmShipping +
      fbmPackaging +
      fbmHandling +
      fbmRefunds +
      ppc +
      misc;

    const fbaProfitPerOrder = fbaRevenue - fbaCostPerOrder;
    const fbmProfitPerOrder = fbmRevenue - fbmCostPerOrder;

    const fbaMargin = fbaRevenue > 0 ? (fbaProfitPerOrder / fbaRevenue) * 100 : 0;
    const fbmMargin = fbmRevenue > 0 ? (fbmProfitPerOrder / fbmRevenue) * 100 : 0;

    const fbaMonthlyProfit = fbaProfitPerOrder * orders - extraStorage;
    const fbmTimeCost = fbmHours * hourly;
    const fbmMonthlyProfit = fbmProfitPerOrder * orders - fbmTimeCost;

    const monthlyProfitDifference = fbaMonthlyProfit - fbmMonthlyProfit;
    const profitPerOrderDifference = fbaProfitPerOrder - fbmProfitPerOrder;

    const fbaTotalMonthlyCost = fbaCostPerOrder * orders + extraStorage;
    const fbmTotalMonthlyCost = fbmCostPerOrder * orders + fbmTimeCost;

    const fbaMonthlyRevenue = fbaRevenue * orders;
    const fbmMonthlyRevenue = fbmRevenue * orders;

    const fbaCostShare = fbaRevenue > 0 ? (fbaCostPerOrder / fbaRevenue) * 100 : 0;
    const fbmCostShare = fbmRevenue > 0 ? (fbmCostPerOrder / fbmRevenue) * 100 : 0;

    const fbaRoi = cost > 0 ? (fbaProfitPerOrder / cost) * 100 : 0;
    const fbmRoi = cost > 0 ? (fbmProfitPerOrder / cost) * 100 : 0;

    const fbaBreakEvenPrice =
      (cost + fbaFee + inbound + fbaPrep + storage + fbaRefunds + ppc + misc) /
      Math.max(0.0001, 1 - referralRate);

    const fbmBreakEvenPrice =
      (cost + fbmShipping + fbmPackaging + fbmHandling + fbmRefunds + ppc + misc) /
        Math.max(0.0001, 1 - referralRate) -
      buyerShipping;

    const shippingGap = buyerShipping - fbmShipping;

    const winner =
      fbaMonthlyProfit > fbmMonthlyProfit
        ? "FBA Leads"
        : fbmMonthlyProfit > fbaMonthlyProfit
          ? "FBM Leads"
          : "Tie";

    const statusTone: Tone =
      Math.max(fbaMonthlyProfit, fbmMonthlyProfit) < 0
        ? "bad"
        : Math.abs(monthlyProfitDifference) < 100
          ? "warn"
          : "good";

    const scenarios = [50, 100, 250, 500, 1000].map((scenarioOrders) => {
      const scenarioFbaProfit = fbaProfitPerOrder * scenarioOrders - extraStorage;
      const scenarioFbmTimeCost =
        (fbmHours / Math.max(1, orders)) * scenarioOrders * hourly;
      const scenarioFbmProfit = fbmProfitPerOrder * scenarioOrders - scenarioFbmTimeCost;
      const scenarioDifference = scenarioFbaProfit - scenarioFbmProfit;

      return {
        orders: scenarioOrders,
        fbaProfit: scenarioFbaProfit,
        fbmProfit: scenarioFbmProfit,
        difference: scenarioDifference,
        winner:
          scenarioFbaProfit > scenarioFbmProfit
            ? "FBA"
            : scenarioFbmProfit > scenarioFbaProfit
              ? "FBM"
              : "Tie",
      };
    });

    return {
      price,
      cost,
      referralRate,
      orders,
      fbaFee,
      inbound,
      fbaPrep,
      storage,
      fbaRefunds,
      fbmShipping,
      buyerShipping,
      fbmPackaging,
      fbmHandling,
      fbmRefunds,
      ppc,
      misc,
      extraStorage,
      fbmHours,
      hourly,
      fbaRevenue,
      fbmRevenue,
      fbaReferralFee,
      fbmReferralFee,
      fbaCostPerOrder,
      fbmCostPerOrder,
      fbaProfitPerOrder,
      fbmProfitPerOrder,
      fbaMargin,
      fbmMargin,
      fbaMonthlyProfit,
      fbmMonthlyProfit,
      monthlyProfitDifference,
      profitPerOrderDifference,
      fbaTotalMonthlyCost,
      fbmTotalMonthlyCost,
      fbaMonthlyRevenue,
      fbmMonthlyRevenue,
      fbaCostShare,
      fbmCostShare,
      fbaRoi,
      fbmRoi,
      fbaBreakEvenPrice,
      fbmBreakEvenPrice,
      shippingGap,
      fbmTimeCost,
      winner,
      statusTone,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    referralFeeRate,
    monthlyOrders,
    fbaFulfillmentFee,
    inboundShipping,
    fbaPrepLabelCost,
    storageCostPerUnit,
    fbaRefundAllowance,
    fbmShippingCost,
    shippingCharged,
    fbmPackagingCost,
    fbmHandlingCost,
    fbmRefundAllowance,
    ppcCostPerOrder,
    otherCosts,
    monthlyFbaStorageExtra,
    fbmMonthlyTimeHours,
    hourlyTimeValue,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Amazon Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Amazon FBA vs FBM Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Compare Amazon FBA and FBM profit after referral fees, fulfillment
          fees, shipping cost, storage, prep, packaging, labor, refunds, PPC,
          and seller workload.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Comparison inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter shared product assumptions, then compare Amazon FBA costs
            against FBM shipping, packaging, handling, and seller time.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Shared order assumptions
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
                Product cost
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={productCost}
                  onChange={(event) => setProductCost(event.target.value)}
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
                FBA assumptions
              </p>

              {[
                ["FBA fulfillment fee", fbaFulfillmentFee, setFbaFulfillmentFee],
                ["Inbound shipping per unit", inboundShipping, setInboundShipping],
                ["FBA prep / label cost", fbaPrepLabelCost, setFbaPrepLabelCost],
                ["Storage cost per unit", storageCostPerUnit, setStorageCostPerUnit],
                ["FBA refund allowance", fbaRefundAllowance, setFbaRefundAllowance],
                ["Monthly extra FBA storage", monthlyFbaStorageExtra, setMonthlyFbaStorageExtra],
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
                FBM assumptions
              </p>

              {[
                ["Shipping charged to buyer", shippingCharged, setShippingCharged],
                ["FBM shipping label cost", fbmShippingCost, setFbmShippingCost],
                ["FBM packaging cost", fbmPackagingCost, setFbmPackagingCost],
                ["FBM handling / labor cost", fbmHandlingCost, setFbmHandlingCost],
                ["FBM refund allowance", fbmRefundAllowance, setFbmRefundAllowance],
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
                Shared extra costs
              </p>

              {[
                ["PPC cost per order", ppcCostPerOrder, setPpcCostPerOrder],
                ["Other costs per order", otherCosts, setOtherCosts],
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
                FBM monthly time spent
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <input
                  value={fbmMonthlyTimeHours}
                  onChange={(event) => setFbmMonthlyTimeHours(event.target.value)}
                  className="w-full rounded-l-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
                <span className="px-3 py-2 text-gray-500">hr</span>
              </div>

              <label className="mt-3 block text-sm font-medium text-gray-700">
                Hourly time value
              </label>
              <div className="mt-1 flex rounded-lg border border-gray-400 bg-white">
                <span className="px-3 py-2 text-gray-500">$</span>
                <input
                  value={hourlyTimeValue}
                  onChange={(event) => setHourlyTimeValue(event.target.value)}
                  className="w-full rounded-r-lg px-3 py-2 outline-none"
                  inputMode="decimal"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Amazon FBA fees, FBM shipping
            costs, referral fees, storage fees, buy box effects, delivery
            promises, return costs, labor value, and seller-specific costs may
            vary.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Amazon FBA vs FBM profitability.
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
              {results.winner}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ResultCard
              title="FBA monthly profit"
              value={money(results.fbaMonthlyProfit)}
              note="FBA profit per order multiplied by monthly orders minus extra storage"
              tone={results.fbaMonthlyProfit >= results.fbmMonthlyProfit ? "good" : "warn"}
            />

            <ResultCard
              title="FBM monthly profit"
              value={money(results.fbmMonthlyProfit)}
              note="FBM profit per order multiplied by monthly orders minus time cost"
              tone={results.fbmMonthlyProfit >= results.fbaMonthlyProfit ? "good" : "warn"}
            />

            <ResultCard
              title="Monthly profit difference"
              value={money(Math.abs(results.monthlyProfitDifference))}
              note="Difference between estimated FBA and FBM monthly profit"
              tone={results.statusTone}
            />

            <ResultCard
              title="Better option"
              value={results.winner}
              note="Higher estimated monthly profit under entered assumptions"
              tone={results.statusTone}
            />

            <ResultCard
              title="FBA profit per order"
              value={money(results.fbaProfitPerOrder)}
              note="FBA revenue minus product cost, referral fee, fulfillment, storage, PPC, and refund costs"
              tone={results.fbaProfitPerOrder > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="FBM profit per order"
              value={money(results.fbmProfitPerOrder)}
              note="FBM revenue minus product cost, referral fee, shipping, packaging, handling, PPC, and refund costs"
              tone={results.fbmProfitPerOrder > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="FBA margin"
              value={percent(results.fbaMargin)}
              note="FBA profit per order divided by FBA revenue"
              tone={results.fbaMargin > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="FBM margin"
              value={percent(results.fbmMargin)}
              note="FBM profit per order divided by FBM revenue"
              tone={results.fbmMargin > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="FBA cost per order"
              value={money(results.fbaCostPerOrder)}
              note="Product cost, referral fee, FBA costs, PPC, refunds, and other costs"
              tone="warn"
            />

            <ResultCard
              title="FBM cost per order"
              value={money(results.fbmCostPerOrder)}
              note="Product cost, referral fee, shipping, packaging, handling, PPC, refunds, and other costs"
              tone="warn"
            />

            <ResultCard
              title="FBA break-even price"
              value={money(results.fbaBreakEvenPrice)}
              note="Approximate FBA item price needed before profit starts"
              tone="warn"
            />

            <ResultCard
              title="FBM break-even price"
              value={money(results.fbmBreakEvenPrice)}
              note="Approximate FBM item price needed before profit starts"
              tone="warn"
            />

            <ResultCard
              title="FBA ROI on item cost"
              value={percent(results.fbaRoi)}
              note="FBA profit per order divided by product cost"
              tone={results.fbaRoi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="FBM ROI on item cost"
              value={percent(results.fbmRoi)}
              note="FBM profit per order divided by product cost"
              tone={results.fbmRoi > 0 ? "good" : "bad"}
            />

            <ResultCard
              title="FBM shipping gap"
              value={money(results.shippingGap)}
              note="Buyer-paid shipping minus FBM shipping label cost"
              tone={results.shippingGap >= 0 ? "good" : "warn"}
            />

            <ResultCard
              title="FBM time cost"
              value={money(results.fbmTimeCost)}
              note="Monthly FBM time multiplied by hourly time value"
              tone="warn"
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
              <p>
                Under the current assumptions,{" "}
                <strong className="text-gray-950">{results.winner}</strong>.
                Estimated FBA monthly profit is{" "}
                <strong className="text-gray-950">
                  {money(results.fbaMonthlyProfit)}
                </strong>
                , while estimated FBM monthly profit is{" "}
                <strong className="text-gray-950">
                  {money(results.fbmMonthlyProfit)}
                </strong>
                .
              </p>

              <p>
                FBA profit per order is{" "}
                <strong className="text-gray-950">
                  {money(results.fbaProfitPerOrder)}
                </strong>
                . FBM profit per order is{" "}
                <strong className="text-gray-950">
                  {money(results.fbmProfitPerOrder)}
                </strong>
                .
              </p>

              <p>
                FBA may be better when labor, shipping complexity, delivery
                expectations, and scale matter. FBM may be better when the seller
                can ship cheaply, avoid storage drag, or maintain more control.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-950">Order volume comparison</h3>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">FBA profit</th>
                    <th className="px-4 py-3">FBM profit</th>
                    <th className="px-4 py-3">Difference</th>
                    <th className="px-4 py-3">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((scenario) => (
                    <tr
                      key={scenario.orders}
                      className={
                        Math.abs(scenario.orders - results.orders) < 0.01
                          ? "border-t bg-blue-50 font-bold"
                          : "border-t"
                      }
                    >
                      <td className="px-4 py-3">
                        {numberFormat(scenario.orders)}
                      </td>
                      <td className="px-4 py-3">
                        {money(scenario.fbaProfit)}
                      </td>
                      <td className="px-4 py-3">
                        {money(scenario.fbmProfit)}
                      </td>
                      <td className="px-4 py-3">
                        {money(Math.abs(scenario.difference))}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            scenario.winner === "FBA"
                              ? "bg-green-100 text-green-700"
                              : scenario.winner === "FBM"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {scenario.winner}
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
          How to use this Amazon FBA vs FBM Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter shared costs",
              "Add sale price, product cost, referral fee rate, monthly order volume, PPC, and other costs.",
            ],
            [
              "Add FBA costs",
              "Include FBA fulfillment fee, inbound shipping, prep, labels, storage, and refund allowance.",
            ],
            [
              "Add FBM costs",
              "Include shipping charged, label cost, packaging, handling, refunds, and seller time.",
            ],
            [
              "Compare options",
              "Review monthly profit, profit per order, margins, break-even price, and workload before choosing.",
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
            FBA vs FBM cost breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Compare the major fulfillment costs affecting each method.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["FBA referral fee", results.fbaReferralFee],
              ["FBA fulfillment fee", results.fbaFee],
              ["FBA inbound / prep / storage", results.inbound + results.fbaPrep + results.storage],
              ["FBM referral fee", results.fbmReferralFee],
              ["FBM shipping / packaging / handling", results.fbmShipping + results.fbmPackaging + results.fbmHandling],
              ["FBM time cost", results.fbmTimeCost],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{label}</p>
                  <p className="font-bold text-gray-950">
                    {money(value as number)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Key cost used in the fulfillment method comparison.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common FBA vs FBM mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Comparing FBA and FBM without including seller time.",
              "Ignoring FBA inbound shipping, prep, labels, storage, and aged inventory risk.",
              "Ignoring FBM packaging, shipping zones, handling time, support, and carrier issues.",
              "Assuming FBA is always better because Amazon handles fulfillment.",
              "Assuming FBM is always better because it avoids FBA fees.",
              "Choosing a fulfillment method before checking buy box competitiveness, delivery expectations, margin, and scale.",
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
            When FBA may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-green-700">Higher order volume:</strong>{" "}
              FBA may become more attractive when manual packing and shipping
              would consume too much time.
            </p>

            <p>
              <strong className="text-green-700">Simple fulfillment:</strong>{" "}
              Standardized products with predictable dimensions may work well
              with FBA fulfillment.
            </p>

            <p>
              <strong className="text-green-700">
                Faster delivery expectations:
              </strong>{" "}
              FBA may support stronger delivery promises and reduce seller
              fulfillment workload.
            </p>

            <p>
              <strong className="text-green-700">Operational scale:</strong>{" "}
              FBA may help sellers manage more orders without personally packing
              every shipment.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            When FBM may make sense
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              <strong className="text-blue-700">Low shipping cost:</strong> FBM
              may work well when the seller can ship cheaply and reliably.
            </p>

            <p>
              <strong className="text-blue-700">Slow-moving inventory:</strong>{" "}
              FBM may avoid storage pressure when products sell slowly or
              unpredictably.
            </p>

            <p>
              <strong className="text-blue-700">More control:</strong> FBM can
              give the seller more control over packaging, inserts, handling,
              and carrier choice.
            </p>

            <p>
              <strong className="text-blue-700">Special products:</strong> FBM
              may be better for fragile, oversized, customized, or unusual
              inventory.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Ways to improve FBA vs FBM profitability
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Reduce FBA drag",
              "Review storage, inbound shipping, prep, labels, dimensions, and aged inventory pressure.",
            ],
            [
              "Reduce FBM drag",
              "Improve package size, shipping rates, handling workflow, and carrier choices.",
            ],
            [
              "Raise profit per order",
              "Improve sourcing, pricing, bundles, coupons, and refund prevention.",
            ],
            [
              "Test both methods",
              "Compare actual order data before making a long-term fulfillment decision.",
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
            ["/amazon/fba-profit-calculator", "FBA Profit Calculator"],
            ["/amazon/fbm-profit-calculator", "FBM Profit Calculator"],
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