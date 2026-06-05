"use client";

import { useMemo, useState } from "react";

type Status = "Healthy" | "Watch" | "Risky" | "Losing";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function percent(value: number) {
  return `${value.toFixed(1)}%`;
}

function numberFormat(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ShopifyRefundImpactCalculatorPage() {
  const [salePrice, setSalePrice] = useState(45);
  const [productCost, setProductCost] = useState(14);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [adCost, setAdCost] = useState(5);
  const [paymentPercent, setPaymentPercent] = useState(2.9);
  const [paymentFixed, setPaymentFixed] = useState(0.3);
  const [monthlyOrders, setMonthlyOrders] = useState(100);

  const [refundRate, setRefundRate] = useState(4);
  const [refundPercent, setRefundPercent] = useState(100);
  const [replacementRate, setReplacementRate] = useState(2);
  const [chargebackRate, setChargebackRate] = useState(0.5);
  const [chargebackFee, setChargebackFee] = useState(15);
  const [supportCost, setSupportCost] = useState(1.5);
  const [recoveredInventoryPercent, setRecoveredInventoryPercent] = useState(30);

  const results = useMemo(() => {
    const safeSalePrice = Math.max(0, salePrice);
    const safeProductCost = Math.max(0, productCost);
    const safeShippingCost = Math.max(0, shippingCost);
    const safePackagingCost = Math.max(0, packagingCost);
    const safeAdCost = Math.max(0, adCost);
    const safePaymentPercent = clamp(paymentPercent, 0, 100);
    const safePaymentFixed = Math.max(0, paymentFixed);
    const safeMonthlyOrders = Math.max(0, monthlyOrders);

    const safeRefundRate = clamp(refundRate, 0, 100);
    const safeRefundPercent = clamp(refundPercent, 0, 100);
    const safeReplacementRate = clamp(replacementRate, 0, 100);
    const safeChargebackRate = clamp(chargebackRate, 0, 100);
    const safeChargebackFee = Math.max(0, chargebackFee);
    const safeSupportCost = Math.max(0, supportCost);
    const safeRecoveredInventoryPercent = clamp(recoveredInventoryPercent, 0, 100);

    const paymentFee =
      safeSalePrice * (safePaymentPercent / 100) + safePaymentFixed;

    const normalOrderCost =
      safeProductCost +
      safeShippingCost +
      safePackagingCost +
      safeAdCost +
      paymentFee;

    const regularProfit = safeSalePrice - normalOrderCost;
    const regularMargin =
      safeSalePrice > 0 ? (regularProfit / safeSalePrice) * 100 : 0;

    const regularMonthlyProfit = regularProfit * safeMonthlyOrders;

    const expectedRefunds = safeMonthlyOrders * (safeRefundRate / 100);
    const expectedReplacements = safeMonthlyOrders * (safeReplacementRate / 100);
    const expectedChargebacks = safeMonthlyOrders * (safeChargebackRate / 100);

    const refundedRevenue = safeSalePrice * (safeRefundPercent / 100);
    const inventoryRecovery =
      safeProductCost * (safeRecoveredInventoryPercent / 100);

    const costPerRefund =
      refundedRevenue +
      safeShippingCost +
      safePackagingCost +
      safeAdCost +
      paymentFee +
      safeSupportCost -
      inventoryRecovery;

    const replacementCostPerOrder =
      safeProductCost + safeShippingCost + safePackagingCost + safeSupportCost;

    const chargebackCostPerOrder =
      safeSalePrice +
      safeChargebackFee +
      safeProductCost +
      safeShippingCost +
      safePackagingCost +
      safeAdCost +
      paymentFee +
      safeSupportCost;

    const monthlyRefundCost = expectedRefunds * costPerRefund;
    const monthlyReplacementCost =
      expectedReplacements * replacementCostPerOrder;
    const monthlyChargebackCost =
      expectedChargebacks * chargebackCostPerOrder;

    const totalMonthlyIssueCost =
      monthlyRefundCost + monthlyReplacementCost + monthlyChargebackCost;

    const monthlyProfitAfterIssues =
      regularMonthlyProfit - totalMonthlyIssueCost;

    const profitPerOrderAfterIssues =
      safeMonthlyOrders > 0
        ? monthlyProfitAfterIssues / safeMonthlyOrders
        : 0;

    const marginAfterIssues =
      safeSalePrice > 0
        ? (profitPerOrderAfterIssues / safeSalePrice) * 100
        : 0;

    const issueCostShare =
      regularMonthlyProfit > 0
        ? (totalMonthlyIssueCost / regularMonthlyProfit) * 100
        : 0;

    const breakEvenRefundRate =
      costPerRefund > 0 && safeMonthlyOrders > 0
        ? clamp(
            (regularMonthlyProfit / (costPerRefund * safeMonthlyOrders)) * 100,
            0,
            100
          )
        : 100;

    const status: Status =
      monthlyProfitAfterIssues <= 0
        ? "Losing"
        : issueCostShare >= 50
          ? "Risky"
          : issueCostShare >= 25
            ? "Watch"
            : "Healthy";

    const statusText =
      status === "Healthy"
        ? "Refunds and order issues appear manageable under the entered assumptions."
        : status === "Watch"
          ? "Refunds and order issues are taking a noticeable share of monthly profit."
          : status === "Risky"
            ? "Refunds, replacements, or chargebacks are putting heavy pressure on profit."
            : "Refunds and order issues are estimated to erase monthly profit.";

    const scenarios = [0, 2, 4, 6, 8, 10, 15].map((rate) => {
      const scenarioRefunds = safeMonthlyOrders * (rate / 100);
      const scenarioRefundCost = scenarioRefunds * costPerRefund;
      const scenarioTotalCost =
        scenarioRefundCost + monthlyReplacementCost + monthlyChargebackCost;
      const scenarioProfit = regularMonthlyProfit - scenarioTotalCost;

      const scenarioShare =
        regularMonthlyProfit > 0
          ? (scenarioTotalCost / regularMonthlyProfit) * 100
          : 0;

      const scenarioStatus: Status =
        scenarioProfit <= 0
          ? "Losing"
          : scenarioShare >= 50
            ? "Risky"
            : scenarioShare >= 25
              ? "Watch"
              : "Healthy";

      return {
        rate,
        refunds: scenarioRefunds,
        monthlyCost: scenarioTotalCost,
        monthlyProfit: scenarioProfit,
        status: scenarioStatus,
      };
    });

    return {
      paymentFee,
      regularProfit,
      regularMargin,
      regularMonthlyProfit,
      expectedRefunds,
      expectedReplacements,
      expectedChargebacks,
      refundedRevenue,
      inventoryRecovery,
      costPerRefund,
      monthlyRefundCost,
      monthlyReplacementCost,
      monthlyChargebackCost,
      totalMonthlyIssueCost,
      monthlyProfitAfterIssues,
      marginAfterIssues,
      breakEvenRefundRate,
      status,
      statusText,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    shippingCost,
    packagingCost,
    adCost,
    paymentPercent,
    paymentFixed,
    monthlyOrders,
    refundRate,
    refundPercent,
    replacementRate,
    chargebackRate,
    chargebackFee,
    supportCost,
    recoveredInventoryPercent,
  ]);

  const statusClass =
    results.status === "Healthy"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : results.status === "Watch"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : results.status === "Risky"
          ? "bg-orange-50 text-orange-700 border-orange-200"
          : "bg-red-50 text-red-700 border-red-200";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Refund Impact Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate how refunds, returns, chargebacks, replacement orders, and
          support costs affect Shopify monthly profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Refund inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your order economics, expected refund rate, replacement rate,
              chargeback rate, and recovery assumptions.
            </p>

            <div className="mt-5 space-y-4">
              <Input label="Sale price" value={salePrice} prefix="$" onChange={setSalePrice} />
              <Input label="Product cost" value={productCost} prefix="$" onChange={setProductCost} />
              <Input label="Shipping cost" value={shippingCost} prefix="$" onChange={setShippingCost} />
              <Input label="Packaging cost" value={packagingCost} prefix="$" onChange={setPackagingCost} />
              <Input label="Ad cost per order" value={adCost} prefix="$" onChange={setAdCost} />
              <Input label="Payment fee rate" value={paymentPercent} suffix="%" onChange={setPaymentPercent} />
              <Input label="Payment fixed fee" value={paymentFixed} prefix="$" onChange={setPaymentFixed} />
              <Input label="Monthly orders" value={monthlyOrders} onChange={setMonthlyOrders} />
              <Input label="Refund rate" value={refundRate} suffix="%" onChange={setRefundRate} />
              <Input label="Refund percent" value={refundPercent} suffix="%" onChange={setRefundPercent} />
              <Input label="Replacement order rate" value={replacementRate} suffix="%" onChange={setReplacementRate} />
              <Input label="Chargeback rate" value={chargebackRate} suffix="%" onChange={setChargebackRate} />
              <Input label="Chargeback fee" value={chargebackFee} prefix="$" onChange={setChargebackFee} />
              <Input label="Support cost per issue" value={supportCost} prefix="$" onChange={setSupportCost} />
              <Input
                label="Recovered inventory value"
                value={recoveredInventoryPercent}
                suffix="%"
                onChange={setRecoveredInventoryPercent}
              />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Shopify refund outcomes can vary
              based on your refund policy, payment processor, dispute outcome,
              shipping carrier, product condition, and customer behavior.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify refund impact.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Cost per refund"
                value={money(results.costPerRefund)}
                note="Estimated cost created by one refunded order."
                tone="yellow"
              />
              <ResultCard
                label="Monthly refund cost"
                value={money(results.monthlyRefundCost)}
                note="Expected monthly cost from refunded orders."
                tone="yellow"
              />
              <ResultCard
                label="Expected refunds"
                value={numberFormat(results.expectedRefunds)}
                note="Monthly refunds based on refund rate."
                tone="blue"
              />
              <ResultCard
                label="Expected replacements"
                value={numberFormat(results.expectedReplacements)}
                note="Monthly replacement orders based on replacement rate."
                tone="blue"
              />
              <ResultCard
                label="Expected chargebacks"
                value={numberFormat(results.expectedChargebacks)}
                note="Monthly chargebacks based on dispute rate."
                tone="yellow"
              />
              <ResultCard
                label="Chargeback cost"
                value={money(results.monthlyChargebackCost)}
                note="Estimated monthly chargeback loss."
                tone="yellow"
              />
              <ResultCard
                label="Replacement cost"
                value={money(results.monthlyReplacementCost)}
                note="Estimated monthly replacement order cost."
                tone="yellow"
              />
              <ResultCard
                label="Total issue cost"
                value={money(results.totalMonthlyIssueCost)}
                note="Refunds, replacements, and chargebacks combined."
                tone="yellow"
              />
              <ResultCard
                label="Regular monthly profit"
                value={money(results.regularMonthlyProfit)}
                note="Profit before refunds and order issues."
                tone="blue"
              />
              <ResultCard
                label="Profit after issues"
                value={money(results.monthlyProfitAfterIssues)}
                note="Estimated monthly profit after refund impact."
                tone={results.monthlyProfitAfterIssues >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Margin after issues"
                value={percent(results.marginAfterIssues)}
                note="Average margin after expected refund impact."
                tone="blue"
              />
              <ResultCard
                label="Break-even refund rate"
                value={percent(results.breakEvenRefundRate)}
                note="Refund rate where monthly profit reaches zero."
                tone="yellow"
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Each refunded order is estimated to cost{" "}
                <strong>{money(results.costPerRefund)}</strong>. At the entered
                refund rate, monthly refund cost is estimated at{" "}
                <strong>{money(results.monthlyRefundCost)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                After refunds, replacements, and chargebacks, monthly profit is
                estimated at{" "}
                <strong>{money(results.monthlyProfitAfterIssues)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Refund rate scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Refund rate</th>
                      <th className="px-3 py-2">Refunds</th>
                      <th className="px-3 py-2">Issue cost</th>
                      <th className="px-3 py-2">Monthly profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario) => (
                      <tr key={scenario.rate} className="border-t bg-white">
                        <td className="px-3 py-2 font-medium">
                          {percent(scenario.rate)}
                        </td>
                        <td className="px-3 py-2">
                          {numberFormat(scenario.refunds)}
                        </td>
                        <td className="px-3 py-2">
                          {money(scenario.monthlyCost)}
                        </td>
                        <td className="px-3 py-2">
                          {money(scenario.monthlyProfit)}
                        </td>
                        <td className="px-3 py-2">
                          <StatusPill status={scenario.status} />
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
            How to use this Shopify Refund Impact Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter order costs"
              text="Add product cost, shipping, packaging, ad spend, and payment fees."
            />
            <StepCard
              title="Add refund assumptions"
              text="Enter refund rate, refund percentage, replacement rate, and chargeback rate."
            />
            <StepCard
              title="Estimate recovery"
              text="Include recovered inventory value if some returned products can still be resold."
            />
            <StepCard
              title="Review profit impact"
              text="Check whether refunds are manageable or creating a serious profit leak."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify refund cost breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the major costs included in the refund impact estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Refunded revenue" value={money(results.refundedRevenue)} />
              <Breakdown label="Original shipping cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Ad cost per order" value={money(adCost)} />
              <Breakdown label="Payment fee" value={money(results.paymentFee)} />
              <Breakdown label="Support cost" value={money(supportCost)} />
              <Breakdown
                label="Recovered inventory value"
                value={`-${money(results.inventoryRecovery)}`}
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify refund mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Only counting the refunded sale price and ignoring shipping, ads, and support time." />
              <Warning text="Assuming every returned product can be resold at full value." />
              <Warning text="Ignoring replacement orders when customers receive free replacements instead of refunds." />
              <Warning text="Not separating normal refunds from chargebacks and payment disputes." />
              <Warning text="Using one store-wide refund rate when certain products have much higher refund risk." />
              <Warning text="Running aggressive discounts without checking whether refund losses wipe out the extra sales." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Understanding your Shopify refund result
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-emerald-700">Healthy:</strong> Refunds and
                issue costs appear small compared with your monthly profit.
              </p>
              <p>
                <strong className="text-yellow-700">Watch:</strong> Refunds are
                noticeable and should be monitored by product, campaign, and source.
              </p>
              <p>
                <strong className="text-orange-700">Risky:</strong> Refunds,
                replacements, or disputes are consuming a large share of profit.
              </p>
              <p>
                <strong className="text-red-700">Losing:</strong> Refund-related
                losses may erase monthly profit under the entered assumptions.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Product cost, original shipping, packaging, payment fees, and ad cost." />
              <Check text="Refund percentage based on your actual store policy." />
              <Check text="Replacement order costs when customers receive a free replacement." />
              <Check text="Chargeback fees and total dispute losses." />
              <Check text="Support, handling, inspection, or customer service costs." />
              <Check text="Recovered inventory value when returned items can be resold." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to reduce Shopify refund losses</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve product pages"
              text="Use clearer descriptions, photos, sizing, specs, and expectation-setting."
            />
            <StepCard
              title="Track refund reasons"
              text="Separate damaged items, buyer remorse, shipping issues, sizing problems, and disputes."
            />
            <StepCard
              title="Fix high-refund products"
              text="Raise prices, improve packaging, change suppliers, or stop advertising poor performers."
            />
            <StepCard
              title="Protect cash flow"
              text="Build refund losses into pricing, ad limits, restock plans, and monthly profit goals."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/discount-impact-calculator" label="Discount Calculator" />
            <Related href="/shopify/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/shopify/break-even-calculator" label="Break-Even Calculator" />
          </div>
        </section>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
        {label}
      </span>
      <div className="mt-1 flex overflow-hidden rounded-md border bg-white">
        {prefix ? (
          <span className="flex items-center border-r bg-slate-50 px-3 text-sm text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
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
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "blue" | "green" | "yellow" | "red";
}) {
  const toneClass =
    tone === "blue"
      ? "border-blue-200 bg-blue-50"
      : tone === "green"
        ? "border-emerald-200 bg-emerald-50"
        : tone === "red"
          ? "border-red-200 bg-red-50"
          : "border-amber-200 bg-amber-50";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-xs font-bold text-slate-700">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{note}</p>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const className =
    status === "Healthy"
      ? "rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700"
      : status === "Watch"
        ? "rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700"
        : status === "Risky"
          ? "rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700"
          : "rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700";

  return <span className={className}>{status}</span>;
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

function Check({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
        ✓
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