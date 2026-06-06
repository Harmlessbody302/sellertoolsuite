"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceRefundImpactCalculatorPage() {
  const [salePrice, setSalePrice] = useState(80);
  const [itemCost, setItemCost] = useState(35);
  const [packagingCost, setPackagingCost] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(5);
  const [shippingCost, setShippingCost] = useState(0);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [monthlySales, setMonthlySales] = useState(100);
  const [refundRate, setRefundRate] = useState(3);
  const [cancellationRate, setCancellationRate] = useState(2);
  const [damagedItemRate, setDamagedItemRate] = useState(1);
  const [supportCostPerIssue, setSupportCostPerIssue] = useState(2);
  const [recoveredItemValue, setRecoveredItemValue] = useState(40);

  const results = useMemo(() => {
    const platformFee = salePrice * (platformFeeRate / 100);
    const orderCost =
      itemCost + packagingCost + deliveryCost + shippingCost + platformFee;
    const regularProfitPerSale = salePrice - orderCost;

    const expectedRefunds = Math.round(monthlySales * (refundRate / 100));
    const expectedCancellations = Math.round(monthlySales * (cancellationRate / 100));
    const expectedDamagedItems = Math.round(monthlySales * (damagedItemRate / 100));

    const recoveredValue = salePrice * (recoveredItemValue / 100);
    const costPerRefund =
      salePrice + itemCost + packagingCost + deliveryCost + shippingCost + supportCostPerIssue - recoveredValue;

    const cancellationCost =
      expectedCancellations * (packagingCost + supportCostPerIssue);
    const refundCost = expectedRefunds * costPerRefund;
    const damagedItemCost =
      expectedDamagedItems *
      (itemCost + packagingCost + deliveryCost + shippingCost + supportCostPerIssue - recoveredValue);

    const totalIssueCost = refundCost + cancellationCost + damagedItemCost;

    const regularMonthlyProfit = monthlySales * regularProfitPerSale;
    const profitAfterIssues = regularMonthlyProfit - totalIssueCost;
    const monthlyRevenue = monthlySales * salePrice;
    const marginAfterIssues =
      monthlyRevenue > 0 ? (profitAfterIssues / monthlyRevenue) * 100 : 0;

    const issueCostShare =
      regularMonthlyProfit > 0 ? (totalIssueCost / regularMonthlyProfit) * 100 : 0;

    const breakEvenRefundRate =
      costPerRefund > 0 && monthlySales > 0
        ? (regularMonthlyProfit / (monthlySales * costPerRefund)) * 100
        : 0;

    let status = "Healthy";
    if (profitAfterIssues < 0) status = "Losing";
    else if (issueCostShare > 50) status = "High Risk";
    else if (issueCostShare > 25) status = "Watch";

    return {
      platformFee,
      orderCost,
      regularProfitPerSale,
      expectedRefunds,
      expectedCancellations,
      expectedDamagedItems,
      recoveredValue,
      costPerRefund,
      cancellationCost,
      refundCost,
      damagedItemCost,
      totalIssueCost,
      regularMonthlyProfit,
      profitAfterIssues,
      monthlyRevenue,
      marginAfterIssues,
      issueCostShare,
      breakEvenRefundRate,
      status,
    };
  }, [
    salePrice,
    itemCost,
    packagingCost,
    deliveryCost,
    shippingCost,
    platformFeeRate,
    monthlySales,
    refundRate,
    cancellationRate,
    damagedItemRate,
    supportCostPerIssue,
    recoveredItemValue,
  ]);

  const statusTone: Tone =
    results.status === "Healthy"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const scenarioRows = [0, 1, 2, 3, 5, 8, 10].map((rate) => {
    const refunds = Math.round(monthlySales * (rate / 100));
    const refundCost = refunds * results.costPerRefund;
    const totalIssueCost =
      refundCost + results.cancellationCost + results.damagedItemCost;
    const monthlyProfit = results.regularMonthlyProfit - totalIssueCost;

    let status = "Healthy";
    if (monthlyProfit < 0) status = "Losing";
    else if (
      results.regularMonthlyProfit > 0 &&
      totalIssueCost / results.regularMonthlyProfit > 0.5
    )
      status = "High Risk";
    else if (
      results.regularMonthlyProfit > 0 &&
      totalIssueCost / results.regularMonthlyProfit > 0.25
    )
      status = "Watch";

    return {
      rate,
      refunds,
      issueCost: totalIssueCost,
      monthlyProfit,
      status,
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Facebook Marketplace Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Facebook Marketplace Refund Impact Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate how Facebook Marketplace refunds, cancellations, damaged
          items, no-shows, support time, recovered item value, delivery cost,
          shipping cost, and replacement losses affect monthly profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Refund inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item economics, issue rates, support cost, and recovered
              item value to estimate Facebook Marketplace refund impact.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Sale price" value={salePrice} onChange={setSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} onChange={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} onChange={setPackagingCost} />
              <MoneyInput label="Delivery cost" value={deliveryCost} onChange={setDeliveryCost} />
              <MoneyInput label="Shipping cost" value={shippingCost} onChange={setShippingCost} />
              <NumberInput label="Platform fee rate" value={platformFeeRate} onChange={setPlatformFeeRate} suffix="%" />
              <NumberInput label="Monthly sales" value={monthlySales} onChange={setMonthlySales} />
              <NumberInput label="Refund rate" value={refundRate} onChange={setRefundRate} suffix="%" />
              <NumberInput label="Cancellation rate" value={cancellationRate} onChange={setCancellationRate} suffix="%" />
              <NumberInput label="Damaged item rate" value={damagedItemRate} onChange={setDamagedItemRate} suffix="%" />
              <MoneyInput label="Support cost per issue" value={supportCostPerIssue} onChange={setSupportCostPerIssue} />
              <NumberInput label="Recovered item value" value={recoveredItemValue} onChange={setRecoveredItemValue} suffix="%" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace
              refunds, cancellations, no-shows, buyer disputes, damaged items,
              delivery costs, shipping costs, payment terms, and recovered value
              may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace refund and issue impact.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Cost per refund"
                value={formatMoney(results.costPerRefund)}
                tone="yellow"
                text="Estimated cost created by one refunded order."
              />
              <ResultCard
                label="Monthly refund cost"
                value={formatMoney(results.refundCost)}
                tone="yellow"
                text="Expected monthly cost from refunded orders."
              />
              <ResultCard
                label="Expected refunds"
                value={String(results.expectedRefunds)}
                tone="blue"
                text="Monthly refunds based on refund rate."
              />
              <ResultCard
                label="Expected cancellations"
                value={String(results.expectedCancellations)}
                tone="blue"
                text="Monthly cancellations based on cancellation rate."
              />
              <ResultCard
                label="Expected damaged items"
                value={String(results.expectedDamagedItems)}
                tone="yellow"
                text="Monthly damaged item issues."
              />
              <ResultCard
                label="Total issue cost"
                value={formatMoney(results.totalIssueCost)}
                tone="yellow"
                text="Refunds, cancellations, damaged items, and support cost combined."
              />
              <ResultCard
                label="Regular monthly profit"
                value={formatMoney(results.regularMonthlyProfit)}
                tone="blue"
                text="Profit before refund and issue impact."
              />
              <ResultCard
                label="Profit after issues"
                value={formatMoney(results.profitAfterIssues)}
                tone={results.profitAfterIssues > 0 ? "green" : "red"}
                text="Estimated monthly profit after issue impact."
              />
              <ResultCard
                label="Margin after issues"
                value={`${results.marginAfterIssues.toFixed(1)}%`}
                tone={results.marginAfterIssues >= 25 ? "green" : "yellow"}
                text="Profit after issues divided by monthly revenue."
              />
              <ResultCard
                label="Issue cost share"
                value={`${results.issueCostShare.toFixed(1)}%`}
                tone={results.issueCostShare <= 25 ? "green" : "yellow"}
                text="Issue costs as a share of regular monthly profit."
              />
              <ResultCard
                label="Recovered value"
                value={formatMoney(results.recoveredValue)}
                tone="blue"
                text="Estimated resale or recovered value after a returned item."
              />
              <ResultCard
                label="Break-even refund rate"
                value={`${results.breakEvenRefundRate.toFixed(1)}%`}
                tone="yellow"
                text="Approximate refund rate where monthly profit reaches zero."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Each refunded Facebook Marketplace order is estimated to cost{" "}
                <strong>{formatMoney(results.costPerRefund)}</strong>. At the
                entered refund rate, monthly refund cost is estimated at{" "}
                <strong>{formatMoney(results.refundCost)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "Refund and issue costs appear manageable under the entered assumptions."
                  : results.status === "Watch"
                    ? "Refund and issue costs are starting to pressure monthly profit."
                    : results.status === "High Risk"
                      ? "Refund and issue costs are consuming a large share of regular profit."
                      : "Refund and issue costs appear to erase monthly profit."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Refund rate scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Refund rate</th>
                      <th className="border px-3 py-2">Refunds</th>
                      <th className="border px-3 py-2">Issue cost</th>
                      <th className="border px-3 py-2">Monthly profit</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.rate} className="border">
                        <td className="border px-3 py-2">{row.rate.toFixed(1)}%</td>
                        <td className="border px-3 py-2">{row.refunds}</td>
                        <td className="border px-3 py-2">{formatMoney(row.issueCost)}</td>
                        <td className="border px-3 py-2">{formatMoney(row.monthlyProfit)}</td>
                        <td className="border px-3 py-2">
                          <StatusBadge
                            tone={
                              row.status === "Healthy"
                                ? "green"
                                : row.status === "Losing"
                                  ? "red"
                                  : "yellow"
                            }
                            label={row.status}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Facebook Marketplace Refund Impact Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter order costs"
              text="Add item cost, packaging, delivery, shipping, platform fee, and support assumptions."
            />
            <InfoCard
              title="Add issue rates"
              text="Enter refund rate, cancellation rate, and damaged item rate."
            />
            <InfoCard
              title="Estimate recovery"
              text="Include how much item value can be recovered after a return or issue."
            />
            <InfoCard
              title="Review profit"
              text="Check whether refund and issue costs remain manageable."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace refund cost breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the major costs included in the refund impact estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value={formatMoney(salePrice)} />
              <Breakdown label="Item cost" value={formatMoney(itemCost)} />
              <Breakdown label="Packaging cost" value={formatMoney(packagingCost)} />
              <Breakdown label="Delivery cost" value={formatMoney(deliveryCost)} />
              <Breakdown label="Shipping cost" value={formatMoney(shippingCost)} />
              <Breakdown label="Support cost" value={formatMoney(supportCostPerIssue)} />
              <Breakdown label="Recovered value" value={formatMoney(results.recoveredValue)} />
              <Breakdown label="Cost per refund" value={formatMoney(results.costPerRefund)} />
              <Breakdown label="Total issue cost" value={formatMoney(results.totalIssueCost)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace refund mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Assuming every refunded item can be resold at full value.",
                "Ignoring delivery, shipping, and packaging loss on problem orders.",
                "Selling fragile or condition-sensitive items without enough margin.",
                "Not describing flaws, measurements, pickup details, or condition clearly enough.",
                "Forgetting cancellation, damaged item, no-show, and support time cost.",
                "Restocking similar items before checking refund and dispute risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Facebook Marketplace refund losses
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Describe clearly"
              text="Mention flaws, measurements, condition, pickup details, and included items."
            />
            <InfoCard
              title="Use strong photos"
              text="Show all angles, defects, scale, wear, model numbers, and important details."
            />
            <InfoCard
              title="Confirm pickup details"
              text="Reduce no-shows and misunderstandings by confirming time, place, and item expectations."
            />
            <InfoCard
              title="Avoid risky items"
              text="Skip categories or conditions that create too many issues for the expected profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/break-even-calculator" label="Break-Even Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {suffix ? (
          <span className="border-l bg-slate-50 px-3 py-2 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        <span className="border-r bg-slate-50 px-3 py-2 text-sm text-slate-500">
          $
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full px-3 py-2 text-sm outline-none"
        />
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  tone,
  text,
}: {
  label: string;
  value: string;
  tone: Tone;
  text: string;
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "red"
        ? "border-red-200 bg-red-50"
        : tone === "blue"
          ? "border-blue-200 bg-blue-50"
          : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-sm font-bold">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ tone, label }: { tone: Tone; label: string }) {
  const toneClass =
    tone === "green"
      ? "bg-green-100 text-green-700"
      : tone === "red"
        ? "bg-red-100 text-red-700"
        : tone === "blue"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${toneClass}`}>
      {label}
    </span>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Breakdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="font-bold">{label}</p>
        <p className="mt-1 text-xs text-slate-600">
          Included in the refund impact estimate.
        </p>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-slate-700">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
        !
      </span>
      <p>{text}</p>
    </div>
  );
}

function Related({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-100"
    >
      {label}
    </a>
  );
}

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}