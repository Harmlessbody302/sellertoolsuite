"use client";

import { useMemo, useState } from "react";

export default function MercariPromotionROICalculator() {
  const [monthlySales, setMonthlySales] = useState("35");
  const [salePrice, setSalePrice] = useState("45");
  const [profitPerSaleBeforePromo, setProfitPerSaleBeforePromo] = useState("12");
  const [promotionDiscount, setPromotionDiscount] = useState("10");
  const [promotedSalesShare, setPromotedSalesShare] = useState("50");
  const [extraSalesFromPromotion, setExtraSalesFromPromotion] = useState("8");

  const result = useMemo(() => {
    const sales = Number(monthlySales) || 0;
    const price = Number(salePrice) || 0;
    const baseProfit = Number(profitPerSaleBeforePromo) || 0;
    const discountRate = Number(promotionDiscount) || 0;
    const promoShare = Number(promotedSalesShare) || 0;
    const extraSales = Number(extraSalesFromPromotion) || 0;

    const promotedSales = sales * (promoShare / 100);
    const discountPerSale = price * (discountRate / 100);
    const promotionCost = promotedSales * discountPerSale;

    const profitPerPromotedSale = baseProfit - discountPerSale;
    const extraGrossProfit = extraSales * profitPerPromotedSale;
    const netPromotionProfit = extraGrossProfit - promotionCost;

    const roi =
      promotionCost > 0 ? (netPromotionProfit / promotionCost) * 100 : 0;

    const breakEvenExtraSales =
      profitPerPromotedSale > 0
        ? Math.ceil(promotionCost / profitPerPromotedSale)
        : 0;

    const profitReduction =
      baseProfit > 0 ? (discountPerSale / baseProfit) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your Mercari promotion appears profitable based on the extra sales and discount assumptions entered.";
    let recommendation =
      "This promotion looks workable if the extra sales are genuinely caused by the promotion.";

    if (netPromotionProfit <= 0) {
      status = "Losing Money";
      statusText =
        "This promotion may be costing more in discounts than it earns from extra sales.";
      recommendation =
        "Reduce the discount, promote fewer listings, or use promotions only on items with stronger margins.";
    } else if (roi < 25) {
      status = "Low ROI";
      statusText =
        "This promotion is profitable, but the return is weak.";
      recommendation =
        "Consider using a smaller price drop or reserving promotion for listings that need velocity.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "This promotion appears to generate strong return after discount cost.";
      recommendation =
        "This promotion may be worth repeating on similar listings if buyer demand remains strong.";
    }

    const scenarios = [5, 10, 15, 20, 25].map((discount) => {
      const scenarioDiscountPerSale = price * (discount / 100);
      const scenarioPromoCost = promotedSales * scenarioDiscountPerSale;
      const scenarioProfitPerPromotedSale =
        baseProfit - scenarioDiscountPerSale;
      const scenarioExtraGrossProfit =
        extraSales * scenarioProfitPerPromotedSale;
      const scenarioNetProfit =
        scenarioExtraGrossProfit - scenarioPromoCost;
      const scenarioRoi =
        scenarioPromoCost > 0
          ? (scenarioNetProfit / scenarioPromoCost) * 100
          : 0;

      let scenarioStatus = "Healthy";

      if (scenarioNetProfit <= 0) scenarioStatus = "Losing Money";
      else if (scenarioRoi < 25) scenarioStatus = "Low ROI";
      else if (scenarioRoi >= 100) scenarioStatus = "Strong";

      return {
        discount,
        promotionCost: scenarioPromoCost,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
        status: scenarioStatus,
      };
    });

    return {
      promotedSales,
      discountPerSale,
      promotionCost,
      profitPerPromotedSale,
      extraGrossProfit,
      netPromotionProfit,
      roi,
      breakEvenExtraSales,
      profitReduction,
      status,
      statusText,
      recommendation,
      scenarios,
    };
  }, [
    monthlySales,
    salePrice,
    profitPerSaleBeforePromo,
    promotionDiscount,
    promotedSalesShare,
    extraSalesFromPromotion,
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
            Mercari Seller Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mercari Promotion ROI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Estimate whether Mercari promotions, price drops, and seller-funded
            discounts are increasing profit or quietly reducing margins.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Promotion details</h2>

            <div className="space-y-4">
              <Input
                label="Monthly sales"
                value={monthlySales}
                onChange={setMonthlySales}
                helper="Total monthly sales for this item type or listing group."
              />

              <Input
                label="Sale price"
                value={salePrice}
                onChange={setSalePrice}
                prefix="$"
              />

              <Input
                label="Profit per sale before promotion"
                value={profitPerSaleBeforePromo}
                onChange={setProfitPerSaleBeforePromo}
                prefix="$"
              />

              <Input
                label="Promotion discount"
                value={promotionDiscount}
                onChange={setPromotionDiscount}
                suffix="%"
                helper="Estimated price drop, offer discount, or seller-funded promotion percentage."
              />

              <Input
                label="Sales affected by promotion"
                value={promotedSalesShare}
                onChange={setPromotedSalesShare}
                suffix="%"
                helper="Estimate what share of your sales receive the promotional discount."
              />

              <Input
                label="Extra sales from promotion"
                value={extraSalesFromPromotion}
                onChange={setExtraSalesFromPromotion}
                helper="Estimated additional sales caused by the promotion, not total promoted sales."
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-slate-500">
                  Based on discount cost, promoted sales, and extra sales.
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
                label="Promotion cost"
                value={money(result.promotionCost)}
                variant="danger"
              />

              <ResultCard
                label="Extra gross profit"
                value={money(result.extraGrossProfit)}
                variant="info"
              />

              <ResultCard
                label="Break-even extra sales"
                value={`${number(result.breakEvenExtraSales)} sales`}
                variant="warning"
              />

              <ResultCard
                label="Discount per sale"
                value={money(result.discountPerSale)}
              />

              <ResultCard
                label="Promoted sales"
                value={`${number(result.promotedSales)} sales`}
              />

              <ResultCard
                label="Profit after discount"
                value={money(result.profitPerPromotedSale)}
                variant={
                  result.profitPerPromotedSale > 0 ? "good" : "danger"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">What this means</h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.statusText}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                This promotion costs about{" "}
                <span className="font-semibold">
                  {money(result.promotionCost)}
                </span>{" "}
                in discounts. Extra promoted sales generate about{" "}
                <span className="font-semibold">
                  {money(result.extraGrossProfit)}
                </span>{" "}
                in gross profit, leaving{" "}
                <span className="font-semibold">
                  {money(result.netPromotionProfit)}
                </span>{" "}
                after promotion cost.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                You need about{" "}
                <span className="font-semibold">
                  {number(result.breakEvenExtraSales)}
                </span>{" "}
                extra sales to break even on the discount cost entered.
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
                      <th className="px-4 py-3">Promo cost</th>
                      <th className="px-4 py-3">Net profit</th>
                      <th className="px-4 py-3">ROI</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y bg-white">
                    {result.scenarios.map((row) => (
                      <tr
                        key={row.discount}
                        className={
                          row.discount === Number(promotionDiscount)
                            ? "bg-blue-50 font-semibold"
                            : ""
                        }
                      >
                        <td className="px-4 py-3">{row.discount}%</td>
                        <td className="px-4 py-3">
                          {money(row.promotionCost)}
                        </td>
                        <td className="px-4 py-3">{money(row.netProfit)}</td>
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