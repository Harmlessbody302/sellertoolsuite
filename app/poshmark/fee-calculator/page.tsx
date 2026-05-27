"use client";

import { useMemo, useState } from "react";

export default function PoshmarkFeeCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [shippingDiscount, setShippingDiscount] = useState("2");
  const [buyerOfferDiscount, setBuyerOfferDiscount] = useState("10");
  const [closetClearOutSubsidy, setClosetClearOutSubsidy] = useState("0");
  const [packagingCost, setPackagingCost] = useState("1");
  const [otherFees, setOtherFees] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const shipping = Number(shippingDiscount) || 0;
    const offerDiscountRate = Number(buyerOfferDiscount) || 0;
    const closetSubsidy = Number(closetClearOutSubsidy) || 0;
    const packaging = Number(packagingCost) || 0;
    const misc = Number(otherFees) || 0;

    const offerDiscount = price * (offerDiscountRate / 100);
    const effectiveSalePrice = Math.max(0, price - offerDiscount);

    const poshmarkFee =
      effectiveSalePrice < 15 && effectiveSalePrice > 0
        ? 2.95
        : effectiveSalePrice * 0.2;

    const totalFees =
      poshmarkFee + shipping + closetSubsidy + packaging + misc;

    const netAfterFees = effectiveSalePrice - totalFees;
    const feePercent =
      effectiveSalePrice > 0 ? (totalFees / effectiveSalePrice) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your Poshmark fee structure looks workable based on the effective sale price entered.";
    let recommendation =
      "Use this fee estimate alongside item cost before accepting offers or sending shipping discounts.";

    if (feePercent > 40) {
      status = "High Cost";
      statusText =
        "Fees, discounts, and seller-paid costs are consuming a large share of your Poshmark sale.";
      recommendation =
        "Consider raising the listing price, reducing the offer discount, or limiting seller-paid shipping incentives.";
    } else if (feePercent > 28) {
      status = "Moderate";
      statusText =
        "Your fee burden is elevated and should be monitored.";
      recommendation =
        "Make sure your item cost leaves enough room for profit after offers, shipping discounts, and packaging.";
    }

    const scenarios = [10, 15, 25, 45, 75].map((scenarioPrice) => {
      const scenarioOfferDiscount =
        scenarioPrice * (offerDiscountRate / 100);
      const scenarioEffectivePrice = Math.max(
        0,
        scenarioPrice - scenarioOfferDiscount
      );

      const fee =
        scenarioEffectivePrice < 15 && scenarioEffectivePrice > 0
          ? 2.95
          : scenarioEffectivePrice * 0.2;

      const total = fee + shipping + closetSubsidy + packaging + misc;
      const pct =
        scenarioEffectivePrice > 0
          ? (total / scenarioEffectivePrice) * 100
          : 0;

      let scenarioStatus = "Healthy";
      if (pct > 40) scenarioStatus = "High Cost";
      else if (pct > 28) scenarioStatus = "Moderate";

      return {
        price: scenarioPrice,
        effectivePrice: scenarioEffectivePrice,
        fee,
        total,
        pct,
        net: scenarioEffectivePrice - total,
        status: scenarioStatus,
      };
    });

    return {
      offerDiscount,
      effectiveSalePrice,
      poshmarkFee,
      totalFees,
      netAfterFees,
      feePercent,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    salePrice,
    shippingDiscount,
    buyerOfferDiscount,
    closetClearOutSubsidy,
    packagingCost,
    otherFees,
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
            Poshmark Fee Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate Poshmark seller fees, offer discounts, shipping discounts,
            packaging costs, and total selling costs using Poshmark’s flat-fee
            and 20% commission structure.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Fee details</h2>

            <div className="space-y-4">
              <Input
                label="Listing price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Buyer offer discount"
                value={buyerOfferDiscount}
                onChange={setBuyerOfferDiscount}
                suffix="%"
                helper="Estimated discount from offers to likers or accepted buyer offers."
              />

              <Input
                label="Shipping discount"
                value={shippingDiscount}
                onChange={setShippingDiscount}
                prefix="$"
                helper="Seller-paid shipping discount for offers."
              />

              <Input
                label="Closet Clear Out subsidy"
                value={closetClearOutSubsidy}
                onChange={setClosetClearOutSubsidy}
                prefix="$"
                helper="Use 0 if the shipping discount is not paid by you."
              />

              <Input
                label="Packaging cost"
                value={packagingCost}
                onChange={setPackagingCost}
                prefix="$"
              />

              <Input
                label="Other selling costs"
                value={otherFees}
                onChange={setOtherFees}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on current Poshmark fee rules and your offer assumptions.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Effective sale price"
                value={money(result.effectiveSalePrice)}
                variant="info"
              />

              <ResultCard
                label="Poshmark fee"
                value={money(result.poshmarkFee)}
                variant="warning"
              />

              <ResultCard
                label="Total selling costs"
                value={money(result.totalFees)}
                variant={
                  result.status === "High Cost"
                    ? "danger"
                    : result.status === "Moderate"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Fee percentage"
                value={percent(result.feePercent)}
                variant={
                  result.status === "High Cost"
                    ? "danger"
                    : result.status === "Moderate"
                    ? "warning"
                    : "good"
                }
              />

              <ResultCard
                label="Net after fees"
                value={money(result.netAfterFees)}
                variant={result.netAfterFees > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Offer discount amount"
                value={money(result.offerDiscount)}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                After the estimated offer discount, the effective sale price is{" "}
                <span className="font-semibold">
                  {money(result.effectiveSalePrice)}
                </span>
                . Poshmark takes{" "}
                <span className="font-semibold">
                  {money(result.poshmarkFee)}
                </span>{" "}
                on this sale.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                After estimated selling costs, you would have{" "}
                <span className="font-semibold">
                  {money(result.netAfterFees)}
                </span>{" "}
                left before item cost.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {result.recommendation}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Price comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Listing price</th>
                      <th className="px-4 py-3">After offer</th>
                      <th className="px-4 py-3">Fee</th>
                      <th className="px-4 py-3">Cost %</th>
                      <th className="px-4 py-3">Net</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.price}
                        className={
                          row.price === Number(salePrice)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{money(row.price)}</td>
                        <td className="px-4 py-3">
                          {money(row.effectivePrice)}
                        </td>
                        <td className="px-4 py-3">{money(row.fee)}</td>
                        <td className="px-4 py-3">{percent(row.pct)}</td>
                        <td className="px-4 py-3">{money(row.net)}</td>
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
    status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
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
    status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
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