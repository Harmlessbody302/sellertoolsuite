"use client";

import { useMemo, useState } from "react";

export default function EbayPromotedListingROICalculator() {
  const [monthlySales, setMonthlySales] = useState("40");
  const [salePrice, setSalePrice] = useState("45");
  const [profitPerOrder, setProfitPerOrder] = useState("16");
  const [promotedRate, setPromotedRate] = useState("5");
  const [promotedSalesShare, setPromotedSalesShare] = useState("50");
  const [extraOrdersFromPromotion, setExtraOrdersFromPromotion] = useState("8");

  const result = useMemo(() => {
    const sales = Number(monthlySales) || 0;
    const price = Number(salePrice) || 0;
    const profit = Number(profitPerOrder) || 0;
    const rate = Number(promotedRate) || 0;
    const promotedShare = Number(promotedSalesShare) || 0;
    const extraOrders = Number(extraOrdersFromPromotion) || 0;

    const promotedOrders = sales * (promotedShare / 100);
    const promotedFeePerOrder = price * (rate / 100);
    const monthlyPromotedFees = promotedOrders * promotedFeePerOrder;

    const extraGrossProfit = extraOrders * profit;
    const netPromotionProfit = extraGrossProfit - monthlyPromotedFees;

    const roi =
      monthlyPromotedFees > 0
        ? (netPromotionProfit / monthlyPromotedFees) * 100
        : 0;

    const breakEvenExtraOrders =
      profit > 0 ? Math.ceil(monthlyPromotedFees / profit) : 0;

    const adjustedProfitPerPromotedOrder = profit - promotedFeePerOrder;

    let status = "Healthy";
    let statusText =
      "Your promoted listing assumptions appear profitable after ad fees.";
    let recommendation =
      "This promoted listing rate may be workable if the extra orders are truly coming from promotion.";

    if (netPromotionProfit <= 0) {
      status = "Losing Money";
      statusText =
        "Promoted listing fees may be costing more than the extra profit they generate.";
      recommendation =
        "Lower the promoted listing rate, improve listing conversion, or pause promotion until the listing is more profitable.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText =
        "Promotion is profitable, but the return is weak.";
      recommendation =
        "Consider testing a lower promoted rate or only promoting listings with stronger margins.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "Promotion appears to be generating strong return based on your assumptions.";
      recommendation =
        "This listing may be a good candidate for continued promotion, but monitor performance regularly.";
    }

    const scenarios = [2, 5, 8, 10, 12].map((scenarioRate) => {
      const feePerOrder = price * (scenarioRate / 100);
      const fees = promotedOrders * feePerOrder;
      const net = extraGrossProfit - fees;
      const scenarioRoi = fees > 0 ? (net / fees) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (net <= 0) scenarioStatus = "Losing Money";
      else if (scenarioRoi < 25) scenarioStatus = "Low ROI";
      else if (scenarioRoi >= 100) scenarioStatus = "Strong";

      return {
        rate: scenarioRate,
        fees,
        net,
        roi: scenarioRoi,
        status: scenarioStatus,
      };
    });

    return {
      promotedOrders,
      promotedFeePerOrder,
      monthlyPromotedFees,
      extraGrossProfit,
      netPromotionProfit,
      roi,
      breakEvenExtraOrders,
      adjustedProfitPerPromotedOrder,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlySales,
    salePrice,
    profitPerOrder,
    promotedRate,
    promotedSalesShare,
    extraOrdersFromPromotion,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const number = (value: number) => value.toLocaleString("en-US");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            eBay Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            eBay Promoted Listing ROI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate whether eBay promoted listings are increasing profit or
            quietly reducing your margins after ad fees.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Promotion details</h2>

            <div className="space-y-4">
              <Input
                label="Monthly orders"
                value={monthlySales}
                onChange={setMonthlySales}
                helper="Total monthly orders for this listing or item type."
              />

              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Profit per order before promotion"
                value={profitPerOrder}
                onChange={setProfitPerOrder}
                prefix="$"
              />

              <Input
                label="Promoted listing rate"
                value={promotedRate}
                onChange={setPromotedRate}
                suffix="%"
              />

              <Input
                label="Orders affected by promotion"
                value={promotedSalesShare}
                onChange={setPromotedSalesShare}
                suffix="%"
                helper="Estimate what share of orders are attributed to promoted listings."
              />

              <Input
                label="Extra orders from promotion"
                value={extraOrdersFromPromotion}
                onChange={setExtraOrdersFromPromotion}
                helper="Estimated additional orders caused by promotion, not total promoted orders."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on promoted listing rate, attributed orders, and added
                  sales.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Net promotion profit"
                value={money(result.netPromotionProfit)}
                variant={result.netPromotionProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Promotion ROI"
                value={percent(result.roi)}
                variant={
                  result.roi < 0
                    ? "danger"
                    : result.roi < 25
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Monthly promoted fees"
                value={money(result.monthlyPromotedFees)}
                variant="danger"
              />

              <ResultCard
                label="Extra gross profit"
                value={money(result.extraGrossProfit)}
                variant="info"
              />

              <ResultCard
                label="Break-even extra orders"
                value={`${number(result.breakEvenExtraOrders)} orders`}
                variant="warning"
              />

              <ResultCard
                label="Fee per promoted order"
                value={money(result.promotedFeePerOrder)}
              />

              <ResultCard
                label="Promoted orders"
                value={`${number(Number(result.promotedOrders.toFixed(1)))} orders`}
              />

              <ResultCard
                label="Profit after promo fee"
                value={money(result.adjustedProfitPerPromotedOrder)}
                variant={
                  result.adjustedProfitPerPromotedOrder > 0 ? "good" : "danger"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated promoted listing fees are{" "}
                <span className="font-semibold">
                  {money(result.monthlyPromotedFees)}
                </span>
                . The extra orders from promotion generate about{" "}
                <span className="font-semibold">
                  {money(result.extraGrossProfit)}
                </span>{" "}
                in gross profit, leaving{" "}
                <span className="font-semibold">
                  {money(result.netPromotionProfit)}
                </span>{" "}
                after promoted listing fees.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                You need about{" "}
                <span className="font-semibold">
                  {number(result.breakEvenExtraOrders)}
                </span>{" "}
                extra orders from promotion to break even on the promoted
                listing fees entered.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Promoted rate comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Promo rate</th>
                      <th className="px-4 py-3">Fees</th>
                      <th className="px-4 py-3">Net profit</th>
                      <th className="px-4 py-3">ROI</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.rate}
                        className={
                          row.rate === Number(promotedRate)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.rate}%</td>
                        <td className="px-4 py-3">{money(row.fees)}</td>
                        <td className="px-4 py-3">{money(row.net)}</td>
                        <td className="px-4 py-3">{percent(row.roi)}</td>
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
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {prefix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-3 py-2 outline-none"
        />

        {suffix && (
          <span className="flex items-center bg-slate-100 px-3 text-slate-500">
            {suffix}
          </span>
        )}
      </div>

      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </label>
  );
}

function ResultCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "good" | "warning" | "danger" | "info";
}) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    danger: "border-red-300 bg-red-50",
    info: "border-blue-300 bg-blue-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Low ROI"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Low ROI"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}