"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariRefundImpactCalculatorPage() {
  const [salePrice, setSalePrice] = useState(35);
  const [itemCost, setItemCost] = useState(10);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [monthlySales, setMonthlySales] = useState(100);
  const [refundRate, setRefundRate] = useState(4);
  const [cancellationRate, setCancellationRate] = useState(2);
  const [damagedItemRate, setDamagedItemRate] = useState(1);
  const [supportCostPerIssue, setSupportCostPerIssue] = useState(1.5);
  const [recoveredItemValue, setRecoveredItemValue] = useState(35);

  const results = useMemo(() => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const estimatedFees = salePrice * feeRate + fixedFee;
    const normalProfit = salePrice - itemCost - shippingCost - packagingCost - estimatedFees;

    const expectedRefunds = monthlySales * (refundRate / 100);
    const expectedCancellations = monthlySales * (cancellationRate / 100);
    const expectedDamagedItems = monthlySales * (damagedItemRate / 100);

    const recoveredValue = itemCost * (recoveredItemValue / 100);

    const refundCostPerIssue =
      salePrice + shippingCost + packagingCost + supportCostPerIssue - recoveredValue;

    const cancellationCostPerIssue = packagingCost * 0.5 + supportCostPerIssue;
    const damagedItemCostPerIssue =
      itemCost + shippingCost + packagingCost + supportCostPerIssue;

    const refundCost = expectedRefunds * refundCostPerIssue;
    const cancellationCost = expectedCancellations * cancellationCostPerIssue;
    const damagedItemCost = expectedDamagedItems * damagedItemCostPerIssue;
    const totalIssueCost = refundCost + cancellationCost + damagedItemCost;

    const regularMonthlyProfit = normalProfit * monthlySales;
    const profitAfterIssues = regularMonthlyProfit - totalIssueCost;
    const marginAfterIssues =
      monthlySales * salePrice > 0 ? (profitAfterIssues / (monthlySales * salePrice)) * 100 : 0;

    const breakEvenRefundRate =
      refundCostPerIssue > 0
        ? Math.max(0, (regularMonthlyProfit / refundCostPerIssue / monthlySales) * 100)
        : 0;

    let status = "Healthy";
    if (profitAfterIssues < 0) status = "Losing";
    else if (marginAfterIssues < 10) status = "Risky";
    else if (marginAfterIssues < 20) status = "Watch";

    return {
      estimatedFees,
      normalProfit,
      expectedRefunds,
      expectedCancellations,
      expectedDamagedItems,
      recoveredValue,
      refundCostPerIssue,
      cancellationCostPerIssue,
      damagedItemCostPerIssue,
      refundCost,
      cancellationCost,
      damagedItemCost,
      totalIssueCost,
      regularMonthlyProfit,
      profitAfterIssues,
      marginAfterIssues,
      breakEvenRefundRate,
      status,
    };
  }, [
    salePrice,
    itemCost,
    shippingCost,
    packagingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    monthlySales,
    refundRate,
    cancellationRate,
    damagedItemRate,
    supportCostPerIssue,
    recoveredItemValue,
  ]);

  const scenarios = [0, 2, 4, 6, 8, 10, 15].map((rate) => {
    const expectedRefunds = monthlySales * (rate / 100);
    const refundCost = expectedRefunds * results.refundCostPerIssue;
    const totalIssueCost =
      refundCost + results.cancellationCost + results.damagedItemCost;
    const profit = results.regularMonthlyProfit - totalIssueCost;
    const margin = monthlySales * salePrice > 0 ? (profit / (monthlySales * salePrice)) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (margin < 10) status = "Risky";
    else if (margin < 20) status = "Watch";

    return { rate, expectedRefunds, totalIssueCost, profit, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Refund Impact Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate how Mercari refunds, returns, cancellations, damaged items,
          support time, recovered item value, and replacement losses affect
          monthly profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Refund inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item economics, issue rates, support cost, and recovered
              item value to estimate Mercari refund impact.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="Sale price" value={salePrice} setValue={setSalePrice} prefix="$" />
              <NumberInput label="Item cost" value={itemCost} setValue={setItemCost} prefix="$" />
              <NumberInput label="Shipping cost" value={shippingCost} setValue={setShippingCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Monthly sales" value={monthlySales} setValue={setMonthlySales} />
              <NumberInput label="Refund rate" value={refundRate} setValue={setRefundRate} suffix="%" />
              <NumberInput label="Cancellation rate" value={cancellationRate} setValue={setCancellationRate} suffix="%" />
              <NumberInput label="Damaged item rate" value={damagedItemRate} setValue={setDamagedItemRate} suffix="%" />
              <NumberInput label="Support cost per issue" value={supportCostPerIssue} setValue={setSupportCostPerIssue} prefix="$" />
              <NumberInput label="Recovered item value" value={recoveredItemValue} setValue={setRecoveredItemValue} suffix="%" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari refund outcomes,
              cancellations, damaged items, shipping costs, payment processing,
              and dispute results may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari refund and issue impact.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard title="Cost per refund" value={money(results.refundCostPerIssue)} tone="yellow" text="Estimated cost created by one refunded order." />
              <ResultCard title="Monthly refund cost" value={money(results.refundCost)} tone="yellow" text="Expected monthly refund cost." />
              <ResultCard title="Expected refunds" value={number(results.expectedRefunds)} tone="blue" text="Monthly refunds based on refund rate." />
              <ResultCard title="Expected cancellations" value={number(results.expectedCancellations)} tone="blue" text="Monthly cancellations based on cancellation rate." />
              <ResultCard title="Expected damaged items" value={number(results.expectedDamagedItems)} tone="yellow" text="Monthly damaged item issues." />
              <ResultCard title="Total issue cost" value={money(results.totalIssueCost)} tone="yellow" text="Refunds, cancellations, and damaged items combined." />
              <ResultCard title="Regular monthly profit" value={money(results.regularMonthlyProfit)} tone="blue" text="Profit before refund and issue impact." />
              <ResultCard title="Profit after issues" value={money(results.profitAfterIssues)} tone={results.profitAfterIssues >= 0 ? "green" : "yellow"} text="Estimated monthly profit after issue impact." />
              <ResultCard title="Margin after issues" value={`${results.marginAfterIssues.toFixed(1)}%`} tone={results.marginAfterIssues >= 20 ? "green" : "yellow"} text="Monthly profit after issues divided by revenue." />
              <ResultCard title="Break-even refund rate" value={`${results.breakEvenRefundRate.toFixed(1)}%`} tone="yellow" text="Refund rate where monthly profit reaches zero." />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Each refunded order is estimated to cost{" "}
                <strong>{money(results.refundCostPerIssue)}</strong>. At the
                entered refund rate, monthly refund cost is estimated at{" "}
                <strong>{money(results.refundCost)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                After refunds, cancellations, and damaged items, monthly profit
                is estimated at <strong>{money(results.profitAfterIssues)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "Refund and issue costs appear manageable under the entered assumptions."
                  : results.status === "Watch"
                    ? "Refunds or item issues are noticeable and should be monitored."
                    : results.status === "Risky"
                      ? "Refunds and issue costs are consuming a large share of profit."
                      : "Refund and issue costs may erase monthly profit under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Refund rate scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Refund rate</th>
                      <th className="px-3 py-2">Refunds</th>
                      <th className="px-3 py-2">Issue cost</th>
                      <th className="px-3 py-2">Monthly profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.rate} className="border-t">
                        <td className="px-3 py-2">{row.rate.toFixed(1)}%</td>
                        <td className="px-3 py-2">{number(row.expectedRefunds)}</td>
                        <td className="px-3 py-2">{money(row.totalIssueCost)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">
                          <span className={statusClass(row.status)}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            How to use this Mercari Refund Impact Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter order costs" text="Add item cost, shipping, packaging, fees, and sale price." />
            <StepCard title="Add issue rates" text="Enter refund rate, cancellation rate, and damaged item rate." />
            <StepCard title="Estimate recovery" text="Include how much item value can be recovered after a refund or return." />
            <StepCard title="Review profit" text="Check whether refund and issue costs are manageable." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari refund cost breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the major costs included in the refund impact estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Refunded revenue" value={money(salePrice)} />
              <Breakdown label="Item cost" value={money(itemCost)} />
              <Breakdown label="Shipping cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Support cost" value={money(supportCostPerIssue)} />
              <Breakdown label="Recovered value" value={`-${money(results.recoveredValue)}`} />
              <Breakdown label="Cost per refund" value={money(results.refundCostPerIssue)} />
              <Breakdown label="Total issue cost" value={money(results.totalIssueCost)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari refund mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Assuming every returned item can be resold at full value." />
              <Warning text="Ignoring shipping and packaging lost on problem orders." />
              <Warning text="Selling fragile items without enough packaging protection." />
              <Warning text="Not describing item condition clearly enough." />
              <Warning text="Forgetting cancellation, damage, or dispute risk when pricing." />
              <Warning text="Using weak photos that create buyer expectation issues." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Mercari refund losses</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Describe clearly" text="Mention flaws, measurements, condition, and included parts." />
            <StepCard title="Use strong photos" text="Show all angles, defects, tags, and important details." />
            <StepCard title="Pack safely" text="Protect fragile items to reduce damage and dispute risk." />
            <StepCard title="Avoid risky items" text="Skip categories that create too many issues or returns." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function NumberInput({
  label,
  value,
  setValue,
  prefix,
  suffix,
}: NumberInputProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        {prefix ? (
          <span className="flex items-center border-r bg-slate-50 px-3 text-sm text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          value={value}
          onChange={(event) => setValue(Number(event.target.value) || 0)}
          type="number"
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {suffix ? (
          <span className="flex items-center border-l bg-slate-50 px-3 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function ResultCard({
  title,
  value,
  text,
  tone,
}: {
  title: string;
  value: string;
  text: string;
  tone: "green" | "yellow" | "blue";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "yellow"
        ? "border-amber-200 bg-amber-50"
        : "border-blue-200 bg-blue-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-xs font-bold">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StepCard({ title, text }: { title: string; text: string }) {
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
    <div className="flex gap-3">
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

function statusClass(status: string) {
  if (status === "Healthy") {
    return "rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700";
  }

  if (status === "Watch") {
    return "rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700";
  }

  if (status === "Risky" || status === "Thin") {
    return "rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700";
  }

  return "rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700";
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function number(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}