"use client";

import { useMemo, useState } from "react";

export default function FacebookMarketplaceNegotiationCalculator() {
  const [listingPrice, setListingPrice] = useState("90");
  const [itemCost, setItemCost] = useState("35");
  const [shippingCost, setShippingCost] = useState("0");
  const [deliveryCost, setDeliveryCost] = useState("5");
  const [packagingCost, setPackagingCost] = useState("1");
  const [platformFeeRate, setPlatformFeeRate] = useState("0");
  const [negotiationDiscount, setNegotiationDiscount] = useState("10");

  const result = useMemo(() => {
    const listing = Number(listingPrice) || 0;
    const item = Number(itemCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const delivery = Number(deliveryCost) || 0;
    const packaging = Number(packagingCost) || 0;
    const feeRate = Number(platformFeeRate) || 0;
    const discount = Number(negotiationDiscount) || 0;

    const fixedCosts = item + shipping + delivery + packaging;
    const acceptedPrice = listing * (1 - discount / 100);
    const platformFee = acceptedPrice * (feeRate / 100);
    const totalCosts = fixedCosts + platformFee;
    const netProfit = acceptedPrice - totalCosts;
    const margin = acceptedPrice > 0 ? (netProfit / acceptedPrice) * 100 : 0;

    const noDiscountPlatformFee = listing * (feeRate / 100);
    const noDiscountProfit = listing - noDiscountPlatformFee - fixedCosts;
    const profitLost = noDiscountProfit - netProfit;

    const negotiationROI =
      profitLost > 0 ? (netProfit / profitLost) * 100 : 0;

    const breakEvenDiscount =
      listing > 0 && feeRate < 100
        ? Math.max(
            0,
            ((listing - fixedCosts / (1 - feeRate / 100)) / listing) * 100
          )
        : 0;

    let status = "Healthy";
    let statusText =
      "This negotiation discount still leaves a healthy Facebook Marketplace profit margin.";
    let recommendation =
      "You have room to negotiate while preserving a solid local-sale return.";

    if (netProfit <= 0) {
      status = "Losing Money";
      statusText =
        "This negotiation discount would likely make the sale unprofitable.";
      recommendation =
        "Reject this offer level or increase your listing price before negotiating.";
    } else if (margin < 15) {
      status = "Tight";
      statusText =
        "This negotiation leaves limited room for delivery costs or additional buyer pressure.";
      recommendation =
        "Use caution before accepting repeated offers at this discount.";
    } else if (margin >= 35) {
      status = "Strong";
      statusText =
        "This negotiation discount still preserves strong pricing flexibility.";
      recommendation =
        "This is likely a workable negotiation level for local buyers.";
    }

    const scenarios = [5, 10, 15, 20, 25].map((scenarioDiscount) => {
      const scenarioAccepted = listing * (1 - scenarioDiscount / 100);
      const scenarioFee = scenarioAccepted * (feeRate / 100);
      const scenarioTotalCosts = fixedCosts + scenarioFee;
      const scenarioProfit = scenarioAccepted - scenarioTotalCosts;
      const scenarioMargin =
        scenarioAccepted > 0 ? (scenarioProfit / scenarioAccepted) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioProfit <= 0) scenarioStatus = "Losing";
      else if (scenarioMargin < 15) scenarioStatus = "Tight";
      else if (scenarioMargin >= 35) scenarioStatus = "Strong";

      return {
        discount: scenarioDiscount,
        accepted: scenarioAccepted,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      listing,
      acceptedPrice,
      platformFee,
      totalCosts,
      netProfit,
      margin,
      profitLost,
      negotiationROI,
      breakEvenDiscount,
      fixedCosts,
      status,
      statusText,
      recommendation,
      scenarios,
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
            Facebook Marketplace Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Facebook Marketplace Negotiation Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate how buyer negotiation affects profit and determine the
            maximum discount you can safely accept on Facebook Marketplace.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Negotiation details
            </h2>

            <div className="space-y-3">
              <Input
                label="Listing price"
                value={listingPrice}
                onChange={setListingPrice}
                prefix="$"
              />

              <Input
                label="Item cost"
                value={itemCost}
                onChange={setItemCost}
                prefix="$"
              />

              <Input
                label="Shipping cost"
                value={shippingCost}
                onChange={setShippingCost}
                prefix="$"
              />

              <Input
                label="Delivery / fuel cost"
                value={deliveryCost}
                onChange={setDeliveryCost}
                prefix="$"
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
              />

              <Input
                label="Platform fee rate"
                value={platformFeeRate}
                onChange={setPlatformFeeRate}
                suffix="%"
              />

              <Input
                label="Negotiation discount"
                value={negotiationDiscount}
                onChange={setNegotiationDiscount}
                suffix="%"
                helper="Typical Facebook Marketplace buyer negotiation often ranges from 5–20%."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Negotiation profitability estimates.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Accepted price"
                value={money(result.acceptedPrice)}
                variant="info"
              />

              <ResultCard
                label="Net profit"
                value={money(result.netProfit)}
                variant={result.netProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Profit margin"
                value={percent(result.margin)}
                variant={
                  result.margin >= 35
                    ? "good"
                    : result.margin < 15
                    ? "warning"
                    : "default"
                }
              />

              <ResultCard
                label="Profit lost to negotiation"
                value={money(result.profitLost)}
                variant="warning"
              />

              <ResultCard
                label="Negotiation ROI"
                value={percent(result.negotiationROI)}
                variant="info"
              />

              <ResultCard
                label="Break-even discount"
                value={percent(result.breakEvenDiscount)}
              />

              <ResultCard
                label="Fixed costs"
                value={money(result.fixedCosts)}
              />

              <ResultCard
                label="Platform fee"
                value={money(result.platformFee)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This buyer negotiation would likely land at{" "}
                <span className="font-semibold">
                  {money(result.acceptedPrice)}
                </span>
                , producing approximately{" "}
                <span className="font-semibold">
                  {money(result.netProfit)}
                </span>{" "}
                in profit.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Compared with selling at full listing price, this negotiation
                reduces profit by about{" "}
                <span className="font-semibold">
                  {money(result.profitLost)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Your estimated maximum safe negotiation discount is{" "}
                <span className="font-semibold">
                  {percent(result.breakEvenDiscount)}
                </span>
                .
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Discount comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Accepted</th>
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
                          row.discount === Number(negotiationDiscount)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.discount}%</td>
                        <td className="px-4 py-3">{money(row.accepted)}</td>
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
      : status === "Tight"
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
      : status === "Tight"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex min-w-[88px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}