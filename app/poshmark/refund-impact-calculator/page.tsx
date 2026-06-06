"use client";

import { useMemo, useState } from "react";

type Status = "Healthy" | "Watch" | "Thin" | "Losing";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function pct(value: number) {
  return `${value.toFixed(1)}%`;
}

function clamp(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export default function PoshmarkRefundImpactCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [itemCost, setItemCost] = useState(14);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [shippingDiscount, setShippingDiscount] = useState(2.02);
  const [monthlySales, setMonthlySales] = useState(100);
  const [returnRate, setReturnRate] = useState(4);
  const [cancellationRate, setCancellationRate] = useState(2);
  const [damagedItemRate, setDamagedItemRate] = useState(1);
  const [supportCostPerIssue, setSupportCostPerIssue] = useState(1.5);
  const [recoveredItemValue, setRecoveredItemValue] = useState(35);

  const results = useMemo(() => {
    const fee =
      salePrice < flatFeeThreshold
        ? Math.min(flatFee, salePrice)
        : salePrice * (sellerFeeRate / 100);

    const regularProfit =
      salePrice - itemCost - packagingCost - fee - shippingDiscount;

    const expectedReturns = Math.round(monthlySales * (returnRate / 100));
    const expectedCancellations = Math.round(monthlySales * (cancellationRate / 100));
    const expectedDamagedItems = Math.round(monthlySales * (damagedItemRate / 100));

    const recoveredValue = itemCost * (recoveredItemValue / 100);

    const costPerReturn =
      salePrice +
      packagingCost +
      shippingDiscount +
      supportCostPerIssue +
      Math.max(0, itemCost - recoveredValue);

    const monthlyReturnCost = expectedReturns * costPerReturn;
    const monthlyCancellationCost = expectedCancellations * supportCostPerIssue;
    const monthlyDamageCost =
      expectedDamagedItems *
      (itemCost + packagingCost + shippingDiscount + supportCostPerIssue);

    const totalIssueCost =
      monthlyReturnCost + monthlyCancellationCost + monthlyDamageCost;

    const regularMonthlyProfit = monthlySales * regularProfit;
    const profitAfterIssues = regularMonthlyProfit - totalIssueCost;
    const monthlyRevenue = monthlySales * salePrice;
    const marginAfterIssues =
      monthlyRevenue > 0 ? (profitAfterIssues / monthlyRevenue) * 100 : 0;

    const breakEvenReturnRate =
      regularProfit > 0 && costPerReturn > 0
        ? Math.max(0, (regularMonthlyProfit / (monthlySales * costPerReturn)) * 100)
        : 0;

    let status: Status = "Healthy";
    if (profitAfterIssues < 0) status = "Losing";
    else if (marginAfterIssues < 10) status = "Thin";
    else if (marginAfterIssues < 20) status = "Watch";

    const scenarios = [0, 2, 4, 6, 8, 10, 15].map((rate) => {
      const returns = Math.round(monthlySales * (rate / 100));
      const issueCost =
        returns * costPerReturn + monthlyCancellationCost + monthlyDamageCost;
      const profit = regularMonthlyProfit - issueCost;

      let scenarioStatus: Status = "Healthy";
      if (profit < 0) scenarioStatus = "Losing";
      else if (monthlyRevenue > 0 && (profit / monthlyRevenue) * 100 < 10)
        scenarioStatus = "Thin";
      else if (monthlyRevenue > 0 && (profit / monthlyRevenue) * 100 < 20)
        scenarioStatus = "Watch";

      return {
        rate,
        returns,
        issueCost,
        profit,
        status: scenarioStatus,
      };
    });

    return {
      fee,
      regularProfit,
      expectedReturns,
      expectedCancellations,
      expectedDamagedItems,
      recoveredValue,
      costPerReturn,
      monthlyReturnCost,
      monthlyCancellationCost,
      monthlyDamageCost,
      totalIssueCost,
      regularMonthlyProfit,
      profitAfterIssues,
      marginAfterIssues,
      breakEvenReturnRate,
      status,
      scenarios,
    };
  }, [
    salePrice,
    itemCost,
    packagingCost,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    shippingDiscount,
    monthlySales,
    returnRate,
    cancellationRate,
    damagedItemRate,
    supportCostPerIssue,
    recoveredItemValue,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Refund Impact Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate how Poshmark returns, cancellations, damaged items, support
          time, recovered item value, packaging cost, shipping discounts, and
          replacement losses affect monthly closet profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Refund inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item economics, issue rates, monthly sales, support cost, and
              recovered item value to estimate Poshmark refund impact.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Sale price" value={salePrice} setValue={setSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} setValue={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <MoneyInput label="Shipping discount" value={shippingDiscount} setValue={setShippingDiscount} />
              <NumberInput label="Monthly sales" value={monthlySales} setValue={setMonthlySales} />
              <PercentInput label="Return rate" value={returnRate} setValue={setReturnRate} />
              <PercentInput label="Cancellation rate" value={cancellationRate} setValue={setCancellationRate} />
              <PercentInput label="Damaged item rate" value={damagedItemRate} setValue={setDamagedItemRate} />
              <MoneyInput label="Support cost per issue" value={supportCostPerIssue} setValue={setSupportCostPerIssue} />
              <PercentInput label="Recovered item value" value={recoveredItemValue} setValue={setRecoveredItemValue} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark returns,
              cancellations, damaged items, support time, shipping discounts,
              buyer behavior, and recovered value may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark refund and issue impact.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="yellow"
                title="Cost per return"
                value={money(results.costPerReturn)}
                text="Estimated cost created by one returned order."
              />
              <ResultCard
                tone="yellow"
                title="Monthly return cost"
                value={money(results.monthlyReturnCost)}
                text="Expected monthly cost from returned orders."
              />
              <ResultCard
                tone="blue"
                title="Expected returns"
                value={String(results.expectedReturns)}
                text="Monthly returns based on return rate."
              />
              <ResultCard
                tone="blue"
                title="Expected cancellations"
                value={String(results.expectedCancellations)}
                text="Monthly cancellations based on cancellation rate."
              />
              <ResultCard
                tone="yellow"
                title="Expected damaged items"
                value={String(results.expectedDamagedItems)}
                text="Monthly damaged item issues."
              />
              <ResultCard
                tone="yellow"
                title="Total issue cost"
                value={money(results.totalIssueCost)}
                text="Returns, cancellations, damaged items, and support cost combined."
              />
              <ResultCard
                tone="blue"
                title="Regular monthly profit"
                value={money(results.regularMonthlyProfit)}
                text="Profit before refund and issue impact."
              />
              <ResultCard
                tone="green"
                title="Profit after issues"
                value={money(results.profitAfterIssues)}
                text="Estimated monthly profit after issue impact."
              />
              <ResultCard
                tone="green"
                title="Margin after issues"
                value={pct(results.marginAfterIssues)}
                text="Profit after issues divided by monthly revenue."
              />
              <ResultCard
                tone="yellow"
                title="Break-even return rate"
                value={pct(results.breakEvenReturnRate)}
                text="Approximate return rate where monthly profit reaches zero."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Each returned Poshmark order is estimated to cost{" "}
                <strong>{money(results.costPerReturn)}</strong>. At the entered
                return rate, monthly return cost is estimated at{" "}
                <strong>{money(results.monthlyReturnCost)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                After returns, cancellations, and damaged item issues, monthly
                profit is estimated at{" "}
                <strong>{money(results.profitAfterIssues)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "Refund and issue costs appear manageable under the entered assumptions."
                  : results.status === "Watch"
                    ? "Refund and issue costs should be watched because they reduce margin meaningfully."
                    : results.status === "Thin"
                      ? "Refund and issue costs leave thin margin after problems."
                      : "Refund and issue costs are estimated to wipe out monthly profit."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Return rate scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Return rate</th>
                      <th className="px-3 py-2">Returns</th>
                      <th className="px-3 py-2">Issue cost</th>
                      <th className="px-3 py-2">Monthly profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.rate} className="border-t">
                        <td className="px-3 py-2">{pct(row.rate)}</td>
                        <td className="px-3 py-2">{row.returns}</td>
                        <td className="px-3 py-2">{money(row.issueCost)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">
                          <StatusBadge status={row.status} />
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
            How to use this Poshmark Refund Impact Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter order costs"
              text="Add item cost, packaging, shipping discount, fees, and support assumptions."
            />
            <StepCard
              title="Add issue rates"
              text="Enter return rate, cancellation rate, and damaged item rate."
            />
            <StepCard
              title="Estimate recovery"
              text="Include how much item value can be recovered after a return."
            />
            <StepCard
              title="Review profit"
              text="Check whether refund and issue costs remain manageable."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Poshmark refund cost breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the major costs included in the refund impact estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Sale price" value={money(salePrice)} />
              <Breakdown label="Item cost" value={money(itemCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Shipping discount" value={money(shippingDiscount)} />
              <Breakdown label="Support cost" value={money(supportCostPerIssue)} />
              <Breakdown label="Recovered value" value={money(results.recoveredValue)} />
              <Breakdown label="Cost per return" value={money(results.costPerReturn)} />
              <Breakdown label="Total issue cost" value={money(results.totalIssueCost)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark refund mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Assuming every returned item can be resold at full value.",
                "Ignoring packaging and seller-paid shipping discounts on problem orders.",
                "Selling fragile or condition-sensitive items without enough margin.",
                "Not describing item condition, flaws, measurements, and fit clearly.",
                "Forgetting cancellation, damage, and support time when pricing.",
                "Restocking similar items before checking return and dispute risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to reduce Poshmark refund losses
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Describe clearly"
              text="Mention flaws, measurements, condition, sizing notes, and included items."
            />
            <StepCard
              title="Use strong photos"
              text="Show all angles, defects, tags, scale, wear, and important details."
            />
            <StepCard
              title="Pack safely"
              text="Protect fragile or high-risk items to reduce damage and dispute risk."
            />
            <StepCard
              title="Avoid risky items"
              text="Skip categories or conditions that create too many issues for the expected profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/product-cost-calculator" label="Product Cost Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/break-even-calculator" label="Break-Even Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <span className="bg-slate-50 px-3 py-2 text-slate-500">$</span>
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
      </div>
    </label>
  );
}

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <input
        className="mt-1 w-full rounded border px-3 py-2 outline-none"
        type="number"
        value={value}
        onChange={(event) => setValue(clamp(Number(event.target.value)))}
      />
    </label>
  );
}

function PercentInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded border">
        <input
          className="w-full px-3 py-2 outline-none"
          type="number"
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value)))}
        />
        <span className="bg-slate-50 px-3 py-2 text-slate-500">%</span>
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
  tone: "green" | "blue" | "yellow";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "blue"
        ? "border-blue-200 bg-blue-50"
        : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const className =
    status === "Healthy"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Watch"
        ? "bg-amber-100 text-amber-700"
        : status === "Thin"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
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