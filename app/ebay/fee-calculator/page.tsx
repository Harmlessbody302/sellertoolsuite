"use client";

import { useMemo, useState } from "react";

export default function EbayFeeCalculator() {
  const [salePrice, setSalePrice] = useState("45");
  const [shippingCharged, setShippingCharged] = useState("6");
  const [finalValueFeeRate, setFinalValueFeeRate] = useState("13.25");
  const [fixedFee, setFixedFee] = useState("0.40");
  const [promotedRate, setPromotedRate] = useState("5");
  const [internationalFeeRate, setInternationalFeeRate] = useState("0");
  const [otherFees, setOtherFees] = useState("0");

  const result = useMemo(() => {
    const price = Number(salePrice) || 0;
    const shipping = Number(shippingCharged) || 0;
    const fvfRate = Number(finalValueFeeRate) || 0;
    const fixed = Number(fixedFee) || 0;
    const promoted = Number(promotedRate) || 0;
    const international = Number(internationalFeeRate) || 0;
    const extra = Number(otherFees) || 0;

    const grossRevenue = price + shipping;

    const finalValueFee = grossRevenue * (fvfRate / 100);
    const promotedFee = grossRevenue * (promoted / 100);
    const internationalFee = grossRevenue * (international / 100);

    const totalFees =
      finalValueFee +
      fixed +
      promotedFee +
      internationalFee +
      extra;

    const feePercentage =
      grossRevenue > 0 ? (totalFees / grossRevenue) * 100 : 0;

    const netRevenue = grossRevenue - totalFees;

    let status = "Healthy";
    let message =
      "Your fee load is within a workable range for many eBay categories.";

    if (feePercentage > 25) {
      status = "High";
      message =
        "Fees are consuming a large share of revenue. Review pricing and promoted listing spend.";
    } else if (feePercentage > 18) {
      status = "Moderate";
      message =
        "Fees are noticeable but may still be acceptable depending on margins.";
    }

    const scenarios = [0, 2, 5, 8, 10].map((promo) => {
      const promoFee = grossRevenue * (promo / 100);
      const total =
        finalValueFee + fixed + promoFee + internationalFee + extra;

      return {
        promo,
        fee: total,
        percent: grossRevenue > 0 ? (total / grossRevenue) * 100 : 0,
      };
    });

    return {
      grossRevenue,
      finalValueFee,
      promotedFee,
      internationalFee,
      totalFees,
      feePercentage,
      netRevenue,
      status,
      message,
      scenarios,
    };
  }, [
    salePrice,
    shippingCharged,
    finalValueFeeRate,
    fixedFee,
    promotedRate,
    internationalFeeRate,
    otherFees,
  ]);

  const money = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (n: number) => `${n.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            eBay Seller Tool
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            eBay Fee Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate final value fees, promoted listing costs, international
            fees, and total fee impact on your eBay sales.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Fee details</h2>

            <div className="space-y-4">
              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Shipping charged"
                value={shippingCharged}
                onChange={setShippingCharged}
                prefix="$"
              />

              <Input
                label="Final value fee rate"
                value={finalValueFeeRate}
                onChange={setFinalValueFeeRate}
                suffix="%"
              />

              <Input
                label="Fixed order fee"
                value={fixedFee}
                onChange={setFixedFee}
                prefix="$"
              />

              <Input
                label="Promoted listing rate"
                value={promotedRate}
                onChange={setPromotedRate}
                suffix="%"
              />

              <Input
                label="International fee rate"
                value={internationalFeeRate}
                onChange={setInternationalFeeRate}
                suffix="%"
              />

              <Input
                label="Other fees"
                value={otherFees}
                onChange={setOtherFees}
                prefix="$"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Breakdown of estimated eBay selling fees.
                </p>
              </div>

              <Badge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                label="Total fees"
                value={money(result.totalFees)}
                variant="danger"
              />

              <Card
                label="Fee percentage"
                value={percent(result.feePercentage)}
                variant="warning"
              />

              <Card
                label="Final value fee"
                value={money(result.finalValueFee)}
              />

              <Card
                label="Promoted fee"
                value={money(result.promotedFee)}
              />

              <Card
                label="International fee"
                value={money(result.internationalFee)}
              />

              <Card
                label="Net revenue after fees"
                value={money(result.netRevenue)}
                variant="good"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm text-slate-700 leading-6">
                {result.message}
              </p>

              <p className="mt-3 text-sm text-slate-700 leading-6">
                Total estimated fees are{" "}
                <strong>{money(result.totalFees)}</strong>, which is{" "}
                <strong>{percent(result.feePercentage)}</strong> of gross
                revenue.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">
                Promoted listing comparison
              </h3>

              <div className="overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3">Promo rate</th>
                      <th className="px-4 py-3">Total fees</th>
                      <th className="px-4 py-3">Fee %</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.promo}
                        className={
                          row.promo === Number(promotedRate)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.promo}%</td>
                        <td className="px-4 py-3">{money(row.fee)}</td>
                        <td className="px-4 py-3">{percent(row.percent)}</td>
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

function Input({ label, value, onChange, prefix, suffix }: any) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <div className="flex overflow-hidden rounded-xl border bg-white">
        {prefix && (
          <span className="bg-slate-100 px-3 flex items-center">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 outline-none"
        />
        {suffix && (
          <span className="bg-slate-100 px-3 flex items-center">{suffix}</span>
        )}
      </div>
    </label>
  );
}

function Card({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "good" | "warning" | "danger";
}) {
  const styles = {
    default: "border-slate-300 bg-slate-50",
    good: "border-green-300 bg-green-50",
    warning: "border-yellow-300 bg-yellow-50",
    danger: "border-red-300 bg-red-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Badge({ status }: any) {
  const style =
    status === "Healthy"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${style}`}>
      {status}
    </span>
  );
}