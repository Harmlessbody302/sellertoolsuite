"use client";

import { useMemo, useState } from "react";

export default function PoshmarkOfferROICalculator() {
  const [monthlySales, setMonthlySales] = useState("30");
  const [listingPrice, setListingPrice] = useState("45");
  const [profitPerSale, setProfitPerSale] = useState("12");
  const [offerDiscount, setOfferDiscount] = useState("5");
  const [customersReceivingOffer, setCustomersReceivingOffer] = useState("25");
  const [extraSales, setExtraSales] = useState("10");

  const result = useMemo(() => {
    const sales = Number(monthlySales) || 0;
    const price = Number(listingPrice) || 0;
    const profit = Number(profitPerSale) || 0;
    const discount = Number(offerDiscount) || 0;
    const affected = Number(customersReceivingOffer) || 0;
    const added = Number(extraSales) || 0;

    const affectedSales = sales * (affected / 100);
    const discountPerSale = price * (discount / 100);
    const discountCost = affectedSales * discountPerSale;
    const discountedProfit = profit - discountPerSale;
    const addedProfitFromExtraSales = added * discountedProfit;
    const netOfferProfit = addedProfitFromExtraSales - discountCost;

    const roi = discountCost > 0 ? (netOfferProfit / discountCost) * 100 : 0;

    const breakEvenExtraSales =
      discountedProfit > 0 ? discountCost / discountedProfit : 0;

    let status = "Healthy";
    let statusText =
      "Your offer strategy appears profitable based on your assumptions.";
    let recommendation =
      "Your offer strategy appears profitable and should increase monthly contribution margin if the extra sales are truly caused by the offer.";

    if (netOfferProfit <= 0) {
      status = "Losing Money";
      statusText =
        "Your current offer assumptions may reduce total monthly profit.";
      recommendation =
        "Current discount depth likely erodes profitability unless conversion improves. Reduce the discount, send offers to fewer buyers, or use offers only on stronger-margin items.";
    } else if (roi < 25) {
      status = "Moderate";
      statusText =
        "Your offer strategy is profitable, but the return is limited.";
      recommendation =
        "Monitor conversion closely. A smaller discount or more selective offer targeting may produce better margin.";
    } else if (roi >= 75) {
      status = "Strong";
      statusText =
        "Your offer strategy shows strong estimated ROI.";
      recommendation =
        "This looks like an efficient promotional approach if comparable listings support the expected conversion lift.";
    }

    const scenarios = [5, 10, 15, 20, 25].map((scenarioDiscount) => {
      const scenarioDiscountPerSale = price * (scenarioDiscount / 100);
      const scenarioCost = affectedSales * scenarioDiscountPerSale;
      const scenarioDiscountedProfit = profit - scenarioDiscountPerSale;
      const scenarioAddedProfit = added * scenarioDiscountedProfit;
      const scenarioNet = scenarioAddedProfit - scenarioCost;
      const scenarioROI =
        scenarioCost > 0 ? (scenarioNet / scenarioCost) * 100 : 0;

      let scenarioStatus = "Healthy";

      if (scenarioNet <= 0) scenarioStatus = "Losing";
      else if (scenarioROI < 25) scenarioStatus = "Moderate";
      else if (scenarioROI >= 75) scenarioStatus = "Strong";

      return {
        discount: scenarioDiscount,
        cost: scenarioCost,
        net: scenarioNet,
        roi: scenarioROI,
        status: scenarioStatus,
        distanceFromBreakEven: Math.abs(scenarioROI),
      };
    });

    const closestBreakEvenDiscount = scenarios.reduce((closest, current) =>
      current.distanceFromBreakEven < closest.distanceFromBreakEven
        ? current
        : closest
    ).discount;

    return {
      affectedSales,
      discountCost,
      discountedProfit,
      addedProfitFromExtraSales,
      netOfferProfit,
      roi,
      breakEvenExtraSales,
      status,
      statusText,
      recommendation,
      scenarios,
      closestBreakEvenDiscount,
    };
  }, [
    monthlySales,
    listingPrice,
    profitPerSale,
    offerDiscount,
    customersReceivingOffer,
    extraSales,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const number = (value: number) =>
    value.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Poshmark Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Poshmark Offer ROI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate whether Poshmark offer discounts are increasing profit or
            quietly reducing monthly margins.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Offer details</h2>

            <div className="space-y-3">
              <Input
                label="Monthly sales"
                value={monthlySales}
                onChange={setMonthlySales}
                helper="Current monthly sales before using this offer strategy."
              />

              <Input
                label="Listing price"
                value={listingPrice}
                onChange={setListingPrice}
                prefix="$"
              />

              <Input
                label="Profit per sale"
                value={profitPerSale}
                onChange={setProfitPerSale}
                prefix="$"
                helper="Estimated profit before the offer discount."
              />

              <Input
                label="Offer discount"
                value={offerDiscount}
                onChange={setOfferDiscount}
                suffix="%"
              />

              <Input
                label="Customers receiving offer"
                value={customersReceivingOffer}
                onChange={setCustomersReceivingOffer}
                suffix="%"
                helper="Estimated share of monthly buyers or sales receiving the offer."
              />

              <Input
                label="Extra sales generated"
                value={extraSales}
                onChange={setExtraSales}
                helper="Estimated additional sales caused by the offer."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Offer profitability estimates.
                </p>
              </div>

              <StatusBadge status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Net offer profit"
                value={money(result.netOfferProfit)}
                variant={result.netOfferProfit > 0 ? "good" : "danger"}
              />

              <ResultCard
                label="Offer ROI"
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
                label="Discount cost"
                value={money(result.discountCost)}
                variant="warning"
              />

              <ResultCard
                label="Added profit from extra sales"
                value={money(result.addedProfitFromExtraSales)}
                variant="info"
              />

              <ResultCard
                label="Break-even extra sales"
                value={number(result.breakEvenExtraSales)}
                variant="info"
              />

              <ResultCard
                label="Discounted profit per sale"
                value={money(result.discountedProfit)}
                variant={result.discountedProfit > 0 ? "good" : "danger"}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Offer discounts cost approximately{" "}
                <span className="font-semibold">
                  {money(result.discountCost)}
                </span>
                , while added sales generate about{" "}
                <span className="font-semibold">
                  {money(result.addedProfitFromExtraSales)}
                </span>{" "}
                in added profit.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                You need approximately{" "}
                <span className="font-semibold">
                  {number(result.breakEvenExtraSales)}
                </span>{" "}
                extra sales to break even.
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
                      <th className="px-4 py-3">Cost</th>
                      <th className="px-4 py-3">Net</th>
                      <th className="px-4 py-3">ROI</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => {
                      const isCurrent =
                        row.discount === Number(offerDiscount);
                      const isNearBreakEven =
                        row.discount === result.closestBreakEvenDiscount;

                      return (
                        <tr
                          key={row.discount}
                          className={
                            isCurrent
                              ? "bg-blue-50 font-semibold"
                              : isNearBreakEven
                              ? "bg-yellow-50"
                              : ""
                          }
                        >
                          <td className="px-4 py-3">{row.discount}%</td>
                          <td className="px-4 py-3">{money(row.cost)}</td>
                          <td className="px-4 py-3">{money(row.net)}</td>
                          <td className="px-4 py-3">{percent(row.roi)}</td>
                          <td className="px-4 py-3">
                            <SmallStatusBadge status={row.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Yellow row indicates the discount level closest to break-even
                ROI among the comparison options.
              </p>
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
    status === "Healthy" || status === "Strong"
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
    status === "Healthy" || status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Moderate"
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