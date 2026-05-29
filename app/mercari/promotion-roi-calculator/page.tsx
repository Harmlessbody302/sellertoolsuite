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
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Low ROI"
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
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Healthy"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Low ROI"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function MercariPromotionROICalculatorPage() {
  const [monthlySales, setMonthlySales] = useState(35);
  const [salePrice, setSalePrice] = useState(45);
  const [profitPerSaleBeforePromo, setProfitPerSaleBeforePromo] = useState(12);
  const [promotionDiscount, setPromotionDiscount] = useState(10);
  const [promotedSalesShare, setPromotedSalesShare] = useState(50);
  const [extraSalesFromPromotion, setExtraSalesFromPromotion] = useState(8);

  const result = useMemo(() => {
    const sales = Math.max(0, monthlySales);
    const price = Math.max(0, salePrice);
    const baseProfit = Math.max(0, profitPerSaleBeforePromo);
    const discountRate = Math.min(95, Math.max(0, promotionDiscount));
    const promoShare = Math.min(100, Math.max(0, promotedSalesShare));
    const extraSales = Math.max(0, extraSalesFromPromotion);

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

    const extraSalesGap = extraSales - breakEvenExtraSales;

    const profitReduction =
      baseProfit > 0 ? (discountPerSale / baseProfit) * 100 : 0;

    const promotedRevenue = promotedSales * price;

    const discountCostShare =
      promotedRevenue > 0 ? (promotionCost / promotedRevenue) * 100 : 0;

    const profitAfterDiscountShare =
      baseProfit > 0 ? (profitPerPromotedSale / baseProfit) * 100 : 0;

    const extraSalesLift = sales > 0 ? (extraSales / sales) * 100 : 0;

    const promotionCoverage =
      breakEvenExtraSales > 0 ? (extraSales / breakEvenExtraSales) * 100 : 0;

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
      statusText = "This promotion is profitable, but the return is weak.";
      recommendation =
        "Consider using a smaller price drop or reserving promotions for listings that need velocity.";
    } else if (roi >= 100) {
      status = "Strong";
      statusText =
        "This promotion appears to generate strong return after discount cost.";
      recommendation =
        "This promotion may be worth repeating on similar listings if buyer demand remains strong.";
    }

    const getScenarioStatus = (profit: number, scenarioRoi: number) => {
      if (profit <= 0) return "Losing Money";
      if (scenarioRoi < 25) return "Low ROI";
      if (scenarioRoi >= 100) return "Strong";
      return "Healthy";
    };

    const scenarios = [5, 10, 15, 20, 25].map((discount) => {
      const scenarioDiscountPerSale = price * (discount / 100);
      const scenarioPromoCost = promotedSales * scenarioDiscountPerSale;
      const scenarioProfitPerPromotedSale =
        baseProfit - scenarioDiscountPerSale;
      const scenarioExtraGrossProfit =
        extraSales * scenarioProfitPerPromotedSale;
      const scenarioNetProfit = scenarioExtraGrossProfit - scenarioPromoCost;

      const scenarioRoi =
        scenarioPromoCost > 0
          ? (scenarioNetProfit / scenarioPromoCost) * 100
          : 0;

      const scenarioBreakEvenExtraSales =
        scenarioProfitPerPromotedSale > 0
          ? Math.ceil(scenarioPromoCost / scenarioProfitPerPromotedSale)
          : 0;

      return {
        discount,
        discountPerSale: scenarioDiscountPerSale,
        promotionCost: scenarioPromoCost,
        profitPerPromotedSale: scenarioProfitPerPromotedSale,
        extraGrossProfit: scenarioExtraGrossProfit,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
        breakEvenExtraSales: scenarioBreakEvenExtraSales,
        status: getScenarioStatus(scenarioNetProfit, scenarioRoi),
      };
    });

    const costBreakdown = [
      ["Promotion cost", promotionCost],
      ["Extra gross profit", extraGrossProfit],
      ["Net promotion profit", netPromotionProfit],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        Math.abs(extraGrossProfit) > 0
          ? (Math.abs(Number(amount)) / Math.abs(extraGrossProfit)) * 100
          : 0,
    }));

    return {
      sales,
      price,
      baseProfit,
      promotedSales,
      discountPerSale,
      promotionCost,
      profitPerPromotedSale,
      extraGrossProfit,
      netPromotionProfit,
      roi,
      breakEvenExtraSales,
      extraSalesGap,
      profitReduction,
      promotedRevenue,
      discountCostShare,
      profitAfterDiscountShare,
      extraSalesLift,
      promotionCoverage,
      status,
      statusText,
      recommendation,
      scenarios,
      costBreakdown,
    };
  }, [
    monthlySales,
    salePrice,
    profitPerSaleBeforePromo,
    promotionDiscount,
    promotedSalesShare,
    extraSalesFromPromotion,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const number = (value: number) =>
    value.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });

  const profitTone =
    result.netPromotionProfit <= 0
      ? "bad"
      : result.roi < 25
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Mercari Promotion ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether Mercari promotions, price drops, seller-funded
          discounts, and offer strategies are increasing profit or quietly
          reducing listing margins.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Promotion inputs
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter monthly sales, sale price, profit per sale, promotion
            discount, promoted sales share, and estimated extra sales caused by
            the promotion.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Listing performance
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Monthly sales"
                  value={monthlySales}
                  onChange={setMonthlySales}
                />

                <NumberInput
                  label="Sale price"
                  prefix="$"
                  value={salePrice}
                  onChange={setSalePrice}
                />

                <NumberInput
                  label="Profit per sale before promotion"
                  prefix="$"
                  value={profitPerSaleBeforePromo}
                  onChange={setProfitPerSaleBeforePromo}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Promotion assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Promotion discount"
                  suffix="%"
                  value={promotionDiscount}
                  onChange={setPromotionDiscount}
                />

                <NumberInput
                  label="Sales affected by promotion"
                  suffix="%"
                  value={promotedSalesShare}
                  onChange={setPromotedSalesShare}
                />

                <NumberInput
                  label="Extra sales from promotion"
                  value={extraSalesFromPromotion}
                  onChange={setExtraSalesFromPromotion}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Mercari promotion results can
            vary based on buyer demand, listing quality, pricing, competition,
            promoted visibility, discount size, conversion rate, returns, and
            whether extra sales were truly caused by the promotion.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Mercari promotion profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net promotion profit"
              value={toMoney(result.netPromotionProfit)}
              helper="Extra gross profit minus promotion discount cost"
              tone={profitTone}
            />

            <MetricCard
              label="Promotion ROI"
              value={percent(result.roi)}
              helper="Net promotion profit divided by promotion cost"
              tone={profitTone}
            />

            <MetricCard
              label="Promotion cost"
              value={toMoney(result.promotionCost)}
              helper="Promoted sales multiplied by discount per sale"
              tone="warning"
            />

            <MetricCard
              label="Extra gross profit"
              value={toMoney(result.extraGrossProfit)}
              helper="Extra sales multiplied by profit after discount"
              tone="blue"
            />

            <MetricCard
              label="Break-even extra sales"
              value={`${number(result.breakEvenExtraSales)} sales`}
              helper="Extra sales needed to cover promotion cost"
              tone="warning"
            />

            <MetricCard
              label="Extra sales gap"
              value={`${number(result.extraSalesGap)} sales`}
              helper="Extra sales above or below break-even"
              tone={result.extraSalesGap >= 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Discount per sale"
              value={toMoney(result.discountPerSale)}
              helper="Sale price multiplied by promotion discount"
              tone="warning"
            />

            <MetricCard
              label="Profit after discount"
              value={toMoney(result.profitPerPromotedSale)}
              helper="Profit per sale after discount cost"
              tone={result.profitPerPromotedSale > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Promoted sales"
              value={`${number(result.promotedSales)} sales`}
              helper="Monthly sales affected by the promotion"
            />

            <MetricCard
              label="Profit reduction"
              value={percent(result.profitReduction)}
              helper="Discount per sale divided by profit before promotion"
              tone={result.profitReduction < 40 ? "good" : "warning"}
            />

            <MetricCard
              label="Extra sales lift"
              value={percent(result.extraSalesLift)}
              helper="Extra sales divided by monthly sales"
              tone="blue"
            />

            <MetricCard
              label="Promotion coverage"
              value={percent(result.promotionCoverage)}
              helper="Extra sales divided by break-even extra sales"
              tone={result.promotionCoverage >= 100 ? "good" : "bad"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                This promotion costs about{" "}
                <strong>{toMoney(result.promotionCost)}</strong> in discounts.
                Extra sales generate about{" "}
                <strong>{toMoney(result.extraGrossProfit)}</strong> in gross
                profit, leaving{" "}
                <strong>{toMoney(result.netPromotionProfit)}</strong> after
                promotion cost.
              </p>

              <p>
                You need about{" "}
                <strong>{number(result.breakEvenExtraSales)}</strong> extra
                sales to break even on the discount cost entered. Your estimate
                is <strong>{number(extraSalesFromPromotion)}</strong> extra
                sales.
              </p>

              <p>{result.recommendation}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-gray-950">
              Discount comparison
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Discount</th>
                    <th className="px-4 py-3">Promo cost</th>
                    <th className="px-4 py-3">Net profit</th>
                    <th className="px-4 py-3">ROI</th>
                    <th className="px-4 py-3">Break-even sales</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {result.scenarios.map((row) => (
                    <tr
                      key={row.discount}
                      className={
                        row.discount === promotionDiscount
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.discount}%</td>
                      <td className="px-4 py-3">
                        {toMoney(row.promotionCost)}
                      </td>
                      <td className="px-4 py-3">{toMoney(row.netProfit)}</td>
                      <td className="px-4 py-3">{percent(row.roi)}</td>
                      <td className="px-4 py-3">
                        {number(row.breakEvenExtraSales)}
                      </td>
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
          How to use this Mercari Promotion ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter listing volume",
              "Add monthly sales for the listing, product type, or group of similar listings.",
            ],
            [
              "Add profit per sale",
              "Use profit before promotion fees so the calculator can estimate discount drag.",
            ],
            [
              "Estimate promotion impact",
              "Enter promoted sales share and extra sales you believe the promotion caused.",
            ],
            [
              "Compare discounts",
              "Review whether a lower or higher discount produces better net promotion profit.",
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
            Mercari promotion breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how discount cost compares with extra gross profit and net
            promotion profit.
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

                <p className="mt-2 text-sm text-gray-600">
                  {percent(item.share)} compared with extra gross profit
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Mercari promotion mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Counting all promoted sales as extra sales instead of estimating incremental orders.",
              "Using discounts on listings with already thin profit margins.",
              "Ignoring whether promotion is replacing organic sales rather than adding new sales.",
              "Increasing discounts before improving photos, title, pricing, and conversion.",
              "Not comparing discount cost against profit per order.",
              "Promoting slow inventory without checking whether the discount still leaves profit.",
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
            Understanding your promotion ROI
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Promotion
              appears to generate a strong return after discount cost.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Promotion
              appears profitable, but should still be monitored against organic
              sales.
            </p>

            <p>
              <strong className="text-amber-700">Low ROI:</strong> Promotion is
              profitable, but the return may be too weak for repeated use.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Promotion
              cost may exceed the extra profit created by additional sales.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Mercari sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Normal monthly sales before promotion.",
              "Profit per sale before any seller-funded discount.",
              "Discount percentage, price drop, or offer cost.",
              "Estimated sales affected by the promotion.",
              "Extra sales caused by promotion, not total promoted orders.",
              "Organic sales that may have happened without the discount.",
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
          Ways to improve Mercari promotion ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower discount",
              "Test smaller price drops before using larger discounts that reduce margin.",
            ],
            [
              "Promote winners",
              "Use promotions on listings with strong demand, good photos, and healthy margin.",
            ],
            [
              "Improve conversion",
              "Upgrade title, photos, price, shipping setup, and description before increasing discounts.",
            ],
            [
              "Track incrementality",
              "Compare promoted performance against normal sales to avoid overcounting promotion impact.",
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
          Related Mercari seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/mercari/profit-calculator", "Profit Calculator"],
            ["/mercari/fee-calculator", "Fee Calculator"],
            ["/mercari/pricing-calculator", "Pricing Calculator"],
            ["/mercari/break-even-calculator", "Break-Even Calculator"],
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