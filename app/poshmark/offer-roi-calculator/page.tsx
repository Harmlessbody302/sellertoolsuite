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
        : status === "Moderate"
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
        : status === "Moderate"
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default function PoshmarkOfferROICalculatorPage() {
  const [monthlySales, setMonthlySales] = useState(30);
  const [listingPrice, setListingPrice] = useState(45);
  const [profitPerSale, setProfitPerSale] = useState(12);
  const [offerDiscount, setOfferDiscount] = useState(5);
  const [customersReceivingOffer, setCustomersReceivingOffer] = useState(25);
  const [extraSales, setExtraSales] = useState(10);

  const result = useMemo(() => {
    const sales = Math.max(0, monthlySales);
    const price = Math.max(0, listingPrice);
    const profit = Math.max(0, profitPerSale);
    const discountRate = Math.min(95, Math.max(0, offerDiscount));
    const affectedRate = Math.min(100, Math.max(0, customersReceivingOffer));
    const addedSales = Math.max(0, extraSales);

    const affectedSales = sales * (affectedRate / 100);
    const discountPerSale = price * (discountRate / 100);
    const discountCost = affectedSales * discountPerSale;
    const discountedProfit = profit - discountPerSale;
    const addedProfitFromExtraSales = addedSales * discountedProfit;
    const netOfferProfit = addedProfitFromExtraSales - discountCost;

    const roi = discountCost > 0 ? (netOfferProfit / discountCost) * 100 : 0;

    const breakEvenExtraSales =
      discountedProfit > 0 ? Math.ceil(discountCost / discountedProfit) : 0;

    const extraSalesGap = addedSales - breakEvenExtraSales;

    const profitReduction =
      profit > 0 ? (discountPerSale / profit) * 100 : 0;

    const affectedRevenue = affectedSales * price;
    const discountCostShare =
      affectedRevenue > 0 ? (discountCost / affectedRevenue) * 100 : 0;

    const profitAfterDiscountShare =
      profit > 0 ? (discountedProfit / profit) * 100 : 0;

    const extraSalesLift = sales > 0 ? (addedSales / sales) * 100 : 0;

    const offerCoverage =
      breakEvenExtraSales > 0 ? (addedSales / breakEvenExtraSales) * 100 : 0;

    let status = "Healthy";
    let statusText =
      "Your Poshmark offer strategy appears profitable based on the extra sales and discount assumptions entered.";
    let recommendation =
      "This offer strategy appears workable if the extra sales are genuinely caused by the offer.";

    if (netOfferProfit <= 0) {
      status = "Losing Money";
      statusText =
        "Your current Poshmark offer assumptions may reduce total monthly profit.";
      recommendation =
        "Reduce the discount, send offers to fewer buyers, or use offers only on stronger-margin items.";
    } else if (roi < 25) {
      status = "Moderate";
      statusText =
        "Your offer strategy is profitable, but the return is limited.";
      recommendation =
        "Monitor conversion closely. A smaller discount or more selective offer targeting may produce better margin.";
    } else if (roi >= 75) {
      status = "Strong";
      statusText = "Your offer strategy shows strong estimated ROI.";
      recommendation =
        "This looks like an efficient promotional approach if comparable listings support the expected conversion lift.";
    }

    const getScenarioStatus = (profitValue: number, scenarioRoi: number) => {
      if (profitValue <= 0) return "Losing Money";
      if (scenarioRoi < 25) return "Moderate";
      if (scenarioRoi >= 75) return "Strong";
      return "Healthy";
    };

    const scenarios = [5, 10, 15, 20, 25].map((discount) => {
      const scenarioDiscountPerSale = price * (discount / 100);
      const scenarioDiscountCost = affectedSales * scenarioDiscountPerSale;
      const scenarioDiscountedProfit = profit - scenarioDiscountPerSale;
      const scenarioAddedProfit = addedSales * scenarioDiscountedProfit;
      const scenarioNetProfit = scenarioAddedProfit - scenarioDiscountCost;

      const scenarioRoi =
        scenarioDiscountCost > 0
          ? (scenarioNetProfit / scenarioDiscountCost) * 100
          : 0;

      const scenarioBreakEvenExtraSales =
        scenarioDiscountedProfit > 0
          ? Math.ceil(scenarioDiscountCost / scenarioDiscountedProfit)
          : 0;

      return {
        discount,
        discountPerSale: scenarioDiscountPerSale,
        discountCost: scenarioDiscountCost,
        discountedProfit: scenarioDiscountedProfit,
        addedProfit: scenarioAddedProfit,
        netProfit: scenarioNetProfit,
        roi: scenarioRoi,
        breakEvenExtraSales: scenarioBreakEvenExtraSales,
        status: getScenarioStatus(scenarioNetProfit, scenarioRoi),
      };
    });

    const offerBreakdown = [
      ["Discount cost", discountCost],
      ["Added profit from extra sales", addedProfitFromExtraSales],
      ["Net offer profit", netOfferProfit],
    ].map(([label, amount]) => ({
      label: String(label),
      amount: Number(amount),
      share:
        Math.abs(addedProfitFromExtraSales) > 0
          ? (Math.abs(Number(amount)) / Math.abs(addedProfitFromExtraSales)) *
            100
          : 0,
    }));

    return {
      sales,
      price,
      profit,
      discountRate,
      affectedRate,
      addedSales,
      affectedSales,
      discountPerSale,
      discountCost,
      discountedProfit,
      addedProfitFromExtraSales,
      netOfferProfit,
      roi,
      breakEvenExtraSales,
      extraSalesGap,
      profitReduction,
      affectedRevenue,
      discountCostShare,
      profitAfterDiscountShare,
      extraSalesLift,
      offerCoverage,
      status,
      statusText,
      recommendation,
      scenarios,
      offerBreakdown,
    };
  }, [
    monthlySales,
    listingPrice,
    profitPerSale,
    offerDiscount,
    customersReceivingOffer,
    extraSales,
  ]);

  const percent = (value: number) => `${value.toFixed(1)}%`;

  const number = (value: number) =>
    value.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });

  const profitTone =
    result.netOfferProfit <= 0
      ? "bad"
      : result.roi < 25
        ? "warning"
        : "good";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Poshmark Offer ROI Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate whether Poshmark offer discounts, offers to likers, closet
          promotions, and seller-funded discounts are increasing profit or
          quietly reducing monthly margins.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">Offer inputs</h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter monthly sales, listing price, profit per sale, offer discount,
            customers receiving the offer, and estimated extra sales caused by
            the offer.
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
                  label="Listing price"
                  prefix="$"
                  value={listingPrice}
                  onChange={setListingPrice}
                />

                <NumberInput
                  label="Profit per sale before offer"
                  prefix="$"
                  value={profitPerSale}
                  onChange={setProfitPerSale}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Offer assumptions
              </h3>

              <div className="space-y-4">
                <NumberInput
                  label="Offer discount"
                  suffix="%"
                  value={offerDiscount}
                  onChange={setOfferDiscount}
                />

                <NumberInput
                  label="Customers receiving offer"
                  suffix="%"
                  value={customersReceivingOffer}
                  onChange={setCustomersReceivingOffer}
                />

                <NumberInput
                  label="Extra sales generated"
                  value={extraSales}
                  onChange={setExtraSales}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator is an estimate. Actual Poshmark offer results can
            vary based on buyer demand, closet activity, listing quality, price,
            discount size, shipping incentives, conversion rate, and whether
            extra sales were truly caused by the offer.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Estimated Poshmark offer profitability.
              </p>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Net offer profit"
              value={toMoney(result.netOfferProfit)}
              helper="Added profit from extra sales minus discount cost"
              tone={profitTone}
            />

            <MetricCard
              label="Offer ROI"
              value={percent(result.roi)}
              helper="Net offer profit divided by discount cost"
              tone={profitTone}
            />

            <MetricCard
              label="Discount cost"
              value={toMoney(result.discountCost)}
              helper="Affected sales multiplied by discount per sale"
              tone="warning"
            />

            <MetricCard
              label="Added profit from extra sales"
              value={toMoney(result.addedProfitFromExtraSales)}
              helper="Extra sales multiplied by profit after discount"
              tone="blue"
            />

            <MetricCard
              label="Break-even extra sales"
              value={`${number(result.breakEvenExtraSales)} sales`}
              helper="Extra sales needed to cover discount cost"
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
              helper="Listing price multiplied by offer discount"
              tone="warning"
            />

            <MetricCard
              label="Profit after discount"
              value={toMoney(result.discountedProfit)}
              helper="Profit per sale after offer discount"
              tone={result.discountedProfit > 0 ? "good" : "bad"}
            />

            <MetricCard
              label="Affected sales"
              value={`${number(result.affectedSales)} sales`}
              helper="Monthly sales estimated to receive the offer"
            />

            <MetricCard
              label="Profit reduction"
              value={percent(result.profitReduction)}
              helper="Discount per sale divided by profit before offer"
              tone={result.profitReduction < 40 ? "good" : "warning"}
            />

            <MetricCard
              label="Extra sales lift"
              value={percent(result.extraSalesLift)}
              helper="Extra sales divided by monthly sales"
              tone="blue"
            />

            <MetricCard
              label="Offer coverage"
              value={percent(result.offerCoverage)}
              helper="Extra sales divided by break-even extra sales"
              tone={result.offerCoverage >= 100 ? "good" : "bad"}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold text-gray-950">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>{result.statusText}</p>

              <p>
                Offer discounts cost approximately{" "}
                <strong>{toMoney(result.discountCost)}</strong>, while extra
                sales generate about{" "}
                <strong>{toMoney(result.addedProfitFromExtraSales)}</strong> in
                added profit. Net offer profit is{" "}
                <strong>{toMoney(result.netOfferProfit)}</strong>.
              </p>

              <p>
                You need about{" "}
                <strong>{number(result.breakEvenExtraSales)}</strong> extra
                sales to break even on the discount cost entered. Your estimate
                is <strong>{number(result.addedSales)}</strong> extra sales.
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
                    <th className="px-4 py-3">Discount cost</th>
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
                        row.discount === offerDiscount
                          ? "bg-blue-50 font-bold"
                          : ""
                      }
                    >
                      <td className="px-4 py-3">{row.discount}%</td>
                      <td className="px-4 py-3">
                        {toMoney(row.discountCost)}
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
          How to use this Poshmark Offer ROI Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Enter sales volume",
              "Add monthly sales for the closet, listing, product type, or group of similar listings.",
            ],
            [
              "Add profit per sale",
              "Use profit before offer discounts so the calculator can estimate discount drag.",
            ],
            [
              "Estimate offer impact",
              "Enter the share of customers receiving offers and extra sales you believe the offer caused.",
            ],
            [
              "Compare discounts",
              "Review whether a smaller or larger offer discount produces better net profit.",
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
            Poshmark offer breakdown
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Review how offer discount cost compares with added profit and net
            offer profit.
          </p>

          <div className="mt-5 space-y-3">
            {result.offerBreakdown.map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-gray-950">{item.label}</p>
                  <p className="text-sm font-bold text-gray-700">
                    {toMoney(item.amount)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {percent(item.share)} compared with added profit from extra
                  sales
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Common Poshmark offer mistakes
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Counting all offer sales as extra sales instead of estimating incremental orders.",
              "Using discounts on listings with already thin profit margins.",
              "Ignoring shipping discounts that may be required with offers to likers.",
              "Increasing offer depth before improving photos, titles, sharing, and pricing.",
              "Not comparing discount cost against profit per order.",
              "Sending broad offers without checking whether the lower price still leaves profit.",
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
            Understanding your offer ROI
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-green-700">Strong:</strong> Offer
              strategy appears to generate a strong return after discount cost.
            </p>

            <p>
              <strong className="text-emerald-700">Healthy:</strong> Offer
              strategy appears profitable, but should still be monitored against
              normal closet sales.
            </p>

            <p>
              <strong className="text-amber-700">Moderate:</strong> Offer
              strategy is profitable, but the return may be too weak for broad
              or repeated use.
            </p>

            <p>
              <strong className="text-red-700">Losing Money:</strong> Offer
              discounts may exceed the extra profit created by additional sales.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What Poshmark sellers should include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "Normal monthly sales before using the offer strategy.",
              "Profit per sale before any buyer offer discount.",
              "Offer discount percentage or expected accepted-offer discount.",
              "Share of buyers or sales receiving the offer.",
              "Extra sales caused by offers, not total offer sales.",
              "Shipping discounts required for offers to likers when applicable.",
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
          Ways to improve Poshmark offer ROI
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            [
              "Lower discount",
              "Test smaller offers before using larger discounts that reduce margin.",
            ],
            [
              "Target better buyers",
              "Send offers more selectively to likers or listings with stronger conversion intent.",
            ],
            [
              "Improve conversion",
              "Upgrade photos, title, description, sharing activity, pricing, and closet presentation.",
            ],
            [
              "Protect margin",
              "Avoid sending offers on items that already have weak profit after fees and shipping discounts.",
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
          Related Poshmark seller tools
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/poshmark/fee-calculator", "Fee Calculator"],
            ["/poshmark/profit-calculator", "Profit Calculator"],
            ["/poshmark/pricing-calculator", "Pricing Calculator"],
            ["/poshmark/break-even-calculator", "Break-Even Calculator"],
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