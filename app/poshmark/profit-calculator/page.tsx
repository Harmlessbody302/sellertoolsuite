"use client";

import { useMemo, useState } from "react";

export default function PoshmarkProfitCalculator() {
  const [listingPrice, setListingPrice] = useState("45");
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState("10");
  const [itemCost, setItemCost] = useState("18");
  const [shippingDiscount, setShippingDiscount] = useState("2");
  const [packagingCost, setPackagingCost] = useState("1");
  const [otherCosts, setOtherCosts] = useState("0");

  const result = useMemo(() => {
    const price = Number(listingPrice) || 0;
    const discountRate = Number(buyerOfferDiscount) || 0;
    const cost = Number(itemCost) || 0;
    const shipping = Number(shippingDiscount) || 0;
    const packaging = Number(packagingCost) || 0;
    const other = Number(otherCosts) || 0;

    const offerDiscount = price * (discountRate / 100);
    const salePrice = Math.max(0, price - offerDiscount);

    const poshmarkFee =
      salePrice > 0 && salePrice < 15 ? 2.95 : salePrice * 0.2;

    const totalCosts = cost + poshmarkFee + shipping + packaging + other;
    const profit = salePrice - totalCosts;
    const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const breakEvenPrice = cost + shipping + packaging + other + poshmarkFee;

    let status = "Healthy";
    let statusText =
      "This Poshmark sale appears profitable after item cost, seller fees, shipping discount, and selling costs.";
    let recommendation =
      "This listing looks workable. Compare against similar sold listings before accepting offers.";

    if (profit <= 0) {
      status = "Losing Money";
      statusText =
        "This Poshmark sale may lose money after fees, item cost, and seller-paid costs.";
      recommendation =
        "Raise your listing price, lower your offer discount, reduce shipping incentives, or avoid selling this item at the entered price.";
    } else if (margin < 15) {
      status = "Thin Margin";
      statusText =
        "This sale is profitable, but the margin is thin.";
      recommendation =
        "Be careful with offers, shipping discounts, and closet promotions because small changes could erase profit.";
    } else if (margin >= 30) {
      status = "Strong";
      statusText =
        "This Poshmark sale has a strong estimated margin.";
      recommendation =
        "This item may have enough room for offers, shipping discounts, or promotion if demand is strong.";
    }

    const scenarios = [-10, -5, 0, 5, 10].map((change) => {
      const scenarioListPrice = Math.max(0, price + change);
      const scenarioDiscount = scenarioListPrice * (discountRate / 100);
      const scenarioSalePrice = Math.max(0, scenarioListPrice - scenarioDiscount);

      const scenarioFee =
        scenarioSalePrice > 0 && scenarioSalePrice < 15
          ? 2.95
          : scenarioSalePrice * 0.2;

      const scenarioCosts = cost + scenarioFee + shipping + packaging + other;
      const scenarioProfit = scenarioSalePrice - scenarioCosts;
      const scenarioMargin =
        scenarioSalePrice > 0 ? (scenarioProfit / scenarioSalePrice) * 100 : 0;

      let scenarioStatus = "Healthy";
      if (scenarioProfit <= 0) scenarioStatus = "Losing Money";
      else if (scenarioMargin < 15) scenarioStatus = "Thin";
      else if (scenarioMargin >= 30) scenarioStatus = "Strong";

      return {
        change,
        listingPrice: scenarioListPrice,
        salePrice: scenarioSalePrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      offerDiscount,
      salePrice,
      poshmarkFee,
      totalCosts,
      profit,
      margin,
      roi,
      breakEvenPrice,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    listingPrice,
    buyerOfferDiscount,
    itemCost,
    shippingDiscount,
    packagingCost,
    otherCosts,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Poshmark Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Poshmark Profit Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Poshmark profit after item cost, seller fees, offer
            discounts, shipping discounts, packaging, and other selling costs.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Sale details</h2>

            <div className="space-y-4">
              <Input label="Listing price" value={listingPrice} onChange={setListingPrice} prefix="$" />
              <Input label="Buyer offer discount" value={buyerOfferDiscount} onChange={setBuyerOfferDiscount} suffix="%" />
              <Input label="Item cost" value={itemCost} onChange={setItemCost} prefix="$" />
              <Input label="Shipping discount" value={shippingDiscount} onChange={setShippingDiscount} prefix="$" />
              <Input label="Packaging cost" value={packagingCost} onChange={setPackagingCost} prefix="$" />
              <Input label="Other selling costs" value={otherCosts} onChange={setOtherCosts} prefix="$" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on your Poshmark sale, fee, and cost assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Estimated profit"
                value={money(result.profit)}
                variant={result.profit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Profit margin"
                value={percent(result.margin)}
                variant={
                  result.margin < 15
                    ? "warning"
                    : result.margin >= 30
                    ? "good"
                    : "default"
                }
              />

              <ResultCard label="Sale price after offer" value={money(result.salePrice)} variant="info" />
              <ResultCard label="Poshmark fee" value={money(result.poshmarkFee)} variant="warning" />
              <ResultCard label="ROI on item cost" value={percent(result.roi)} variant="info" />
              <ResultCard label="Total costs" value={money(result.totalCosts)} />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                After the estimated offer discount, this item sells for{" "}
                <span className="font-semibold">{money(result.salePrice)}</span>.
                Poshmark takes{" "}
                <span className="font-semibold">{money(result.poshmarkFee)}</span>,
                leaving estimated profit of{" "}
                <span className="font-semibold">{money(result.profit)}</span>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Price scenario comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Change</th>
                      <th className="px-4 py-3">Listing</th>
                      <th className="px-4 py-3">After offer</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Margin</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.change}
                        className={row.change === 0 ? "bg-blue-50 font-semibold" : ""}
                      >
                        <td className="px-4 py-3">
                          {row.change === 0
                            ? "Current"
                            : `${row.change > 0 ? "+" : ""}${money(row.change)}`}
                        </td>
                        <td className="px-4 py-3">{money(row.listingPrice)}</td>
                        <td className="px-4 py-3">{money(row.salePrice)}</td>
                        <td className="px-4 py-3">{money(row.profit)}</td>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
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
      : status === "Thin Margin"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function SmallStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Strong" || status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Thin"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}