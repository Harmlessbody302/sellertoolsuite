"use client";

import { useMemo, useState } from "react";

type Status = "Healthy" | "Watch" | "Thin" | "Losing";

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

export default function ShopifyBundlePricingCalculatorPage() {
  const [itemOnePrice, setItemOnePrice] = useState(30);
  const [itemTwoPrice, setItemTwoPrice] = useState(25);
  const [itemThreePrice, setItemThreePrice] = useState(15);
  const [itemOneCost, setItemOneCost] = useState(9);
  const [itemTwoCost, setItemTwoCost] = useState(8);
  const [itemThreeCost, setItemThreeCost] = useState(4);
  const [bundlePrice, setBundlePrice] = useState(59);
  const [shippingCost, setShippingCost] = useState(7.5);
  const [packagingCost, setPackagingCost] = useState(1.75);
  const [fulfillmentCost, setFulfillmentCost] = useState(2);
  const [paymentPercent, setPaymentPercent] = useState(2.9);
  const [paymentFixed, setPaymentFixed] = useState(0.3);
  const [adCostPerBundle, setAdCostPerBundle] = useState(6);
  const [refundAllowance, setRefundAllowance] = useState(2);
  const [targetMargin, setTargetMargin] = useState(25);
  const [monthlyBundleOrders, setMonthlyBundleOrders] = useState(80);

  const results = useMemo(() => {
    const safeItemOnePrice = Math.max(0, itemOnePrice);
    const safeItemTwoPrice = Math.max(0, itemTwoPrice);
    const safeItemThreePrice = Math.max(0, itemThreePrice);
    const safeItemOneCost = Math.max(0, itemOneCost);
    const safeItemTwoCost = Math.max(0, itemTwoCost);
    const safeItemThreeCost = Math.max(0, itemThreeCost);
    const safeBundlePrice = Math.max(0, bundlePrice);
    const safeShippingCost = Math.max(0, shippingCost);
    const safePackagingCost = Math.max(0, packagingCost);
    const safeFulfillmentCost = Math.max(0, fulfillmentCost);
    const safePaymentPercent = clamp(paymentPercent, 0, 100);
    const safePaymentFixed = Math.max(0, paymentFixed);
    const safeAdCostPerBundle = Math.max(0, adCostPerBundle);
    const safeRefundAllowance = Math.max(0, refundAllowance);
    const safeTargetMargin = clamp(targetMargin, 0, 95);
    const safeMonthlyBundleOrders = Math.max(0, monthlyBundleOrders);

    const separatePriceTotal =
      safeItemOnePrice + safeItemTwoPrice + safeItemThreePrice;

    const productCostTotal =
      safeItemOneCost + safeItemTwoCost + safeItemThreeCost;

    const bundleDiscount =
      Math.max(0, separatePriceTotal - safeBundlePrice);

    const bundleDiscountPercent =
      separatePriceTotal > 0 ? (bundleDiscount / separatePriceTotal) * 100 : 0;

    const paymentFee =
      safeBundlePrice * (safePaymentPercent / 100) + safePaymentFixed;

    const totalBundleCost =
      productCostTotal +
      safeShippingCost +
      safePackagingCost +
      safeFulfillmentCost +
      paymentFee +
      safeAdCostPerBundle +
      safeRefundAllowance;

    const profitPerBundle = safeBundlePrice - totalBundleCost;

    const bundleMargin =
      safeBundlePrice > 0 ? (profitPerBundle / safeBundlePrice) * 100 : 0;

    const regularSeparateProfit =
      separatePriceTotal -
      productCostTotal -
      safeShippingCost -
      safePackagingCost -
      safeFulfillmentCost -
      (separatePriceTotal * (safePaymentPercent / 100) + safePaymentFixed) -
      safeAdCostPerBundle -
      safeRefundAllowance;

    const profitDifference = profitPerBundle - regularSeparateProfit;

    const monthlyRevenue = safeBundlePrice * safeMonthlyBundleOrders;

    const monthlyProfit = profitPerBundle * safeMonthlyBundleOrders;

    const monthlyDiscountGiven = bundleDiscount * safeMonthlyBundleOrders;

    const breakEvenPrice = totalBundleCost;

    const priceForTargetMargin =
      safeTargetMargin < 100
        ? totalBundleCost / (1 - safeTargetMargin / 100)
        : totalBundleCost;

    const extraPriceNeededForTarget = Math.max(
      0,
      priceForTargetMargin - safeBundlePrice
    );

    const maxDiscountBeforeBreakEven =
      Math.max(0, separatePriceTotal - breakEvenPrice);

    const maxDiscountPercentBeforeBreakEven =
      separatePriceTotal > 0
        ? (maxDiscountBeforeBreakEven / separatePriceTotal) * 100
        : 0;

    const costShare =
      safeBundlePrice > 0 ? (totalBundleCost / safeBundlePrice) * 100 : 0;

    const status: Status =
      profitPerBundle <= 0
        ? "Losing"
        : bundleMargin < 15
          ? "Thin"
          : bundleMargin < safeTargetMargin
            ? "Watch"
            : "Healthy";

    const statusText =
      status === "Healthy"
        ? "This bundle appears to meet or beat the target margin under the entered assumptions."
        : status === "Watch"
          ? "This bundle is profitable, but it does not reach the target margin."
          : status === "Thin"
            ? "This bundle is profitable, but the margin is thin after bundle costs."
            : "This bundle is estimated to lose money under the entered assumptions.";

    const scenarios = [0, 5, 10, 15, 20, 25, 30].map((discount) => {
      const scenarioPrice = separatePriceTotal * (1 - discount / 100);
      const scenarioPaymentFee =
        scenarioPrice * (safePaymentPercent / 100) + safePaymentFixed;

      const scenarioCost =
        productCostTotal +
        safeShippingCost +
        safePackagingCost +
        safeFulfillmentCost +
        scenarioPaymentFee +
        safeAdCostPerBundle +
        safeRefundAllowance;

      const scenarioProfit = scenarioPrice - scenarioCost;

      const scenarioMargin =
        scenarioPrice > 0 ? (scenarioProfit / scenarioPrice) * 100 : 0;

      const scenarioStatus: Status =
        scenarioProfit <= 0
          ? "Losing"
          : scenarioMargin < 15
            ? "Thin"
            : scenarioMargin < safeTargetMargin
              ? "Watch"
              : "Healthy";

      return {
        discount,
        price: scenarioPrice,
        profit: scenarioProfit,
        margin: scenarioMargin,
        status: scenarioStatus,
      };
    });

    return {
      separatePriceTotal,
      productCostTotal,
      bundleDiscount,
      bundleDiscountPercent,
      paymentFee,
      totalBundleCost,
      profitPerBundle,
      bundleMargin,
      regularSeparateProfit,
      profitDifference,
      monthlyRevenue,
      monthlyProfit,
      monthlyDiscountGiven,
      breakEvenPrice,
      priceForTargetMargin,
      extraPriceNeededForTarget,
      maxDiscountBeforeBreakEven,
      maxDiscountPercentBeforeBreakEven,
      costShare,
      status,
      statusText,
      scenarios,
    };
  }, [
    itemOnePrice,
    itemTwoPrice,
    itemThreePrice,
    itemOneCost,
    itemTwoCost,
    itemThreeCost,
    bundlePrice,
    shippingCost,
    packagingCost,
    fulfillmentCost,
    paymentPercent,
    paymentFixed,
    adCostPerBundle,
    refundAllowance,
    targetMargin,
    monthlyBundleOrders,
  ]);

  const statusClass =
    results.status === "Healthy"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : results.status === "Watch"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : results.status === "Thin"
          ? "bg-orange-50 text-orange-700 border-orange-200"
          : "bg-red-50 text-red-700 border-red-200";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Shopify Seller Tools
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Bundle Pricing Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate bundle discounts, bundle margin, profit per bundle, fulfillment
          cost, ad cost, break-even price, and whether your Shopify bundle price
          protects profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Bundle inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter the standalone prices, product costs, bundle price, fulfillment
              costs, payment fees, ad costs, and target margin.
            </p>

            <div className="mt-5 space-y-4">
              <Input label="Item 1 regular price" value={itemOnePrice} prefix="$" onChange={setItemOnePrice} />
              <Input label="Item 2 regular price" value={itemTwoPrice} prefix="$" onChange={setItemTwoPrice} />
              <Input label="Item 3 regular price" value={itemThreePrice} prefix="$" onChange={setItemThreePrice} />
              <Input label="Item 1 product cost" value={itemOneCost} prefix="$" onChange={setItemOneCost} />
              <Input label="Item 2 product cost" value={itemTwoCost} prefix="$" onChange={setItemTwoCost} />
              <Input label="Item 3 product cost" value={itemThreeCost} prefix="$" onChange={setItemThreeCost} />
              <Input label="Bundle price" value={bundlePrice} prefix="$" onChange={setBundlePrice} />
              <Input label="Shipping cost" value={shippingCost} prefix="$" onChange={setShippingCost} />
              <Input label="Packaging cost" value={packagingCost} prefix="$" onChange={setPackagingCost} />
              <Input label="Fulfillment cost" value={fulfillmentCost} prefix="$" onChange={setFulfillmentCost} />
              <Input label="Payment fee rate" value={paymentPercent} suffix="%" onChange={setPaymentPercent} />
              <Input label="Payment fixed fee" value={paymentFixed} prefix="$" onChange={setPaymentFixed} />
              <Input label="Ad cost per bundle" value={adCostPerBundle} prefix="$" onChange={setAdCostPerBundle} />
              <Input label="Refund allowance" value={refundAllowance} prefix="$" onChange={setRefundAllowance} />
              <Input label="Target margin" value={targetMargin} suffix="%" onChange={setTargetMargin} />
              <Input label="Monthly bundle orders" value={monthlyBundleOrders} onChange={setMonthlyBundleOrders} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Shopify bundle profit can
              vary by fulfillment setup, shipping zone, payment processor, ad
              performance, refunds, supplier costs, and customer behavior.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Shopify bundle profitability.
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Profit per bundle"
                value={money(results.profitPerBundle)}
                note="Bundle price minus product, shipping, fees, ads, and refund allowance."
                tone={results.profitPerBundle >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Bundle margin"
                value={percent(results.bundleMargin)}
                note="Profit per bundle divided by bundle price."
                tone={results.bundleMargin >= targetMargin ? "green" : "yellow"}
              />
              <ResultCard
                label="Bundle discount"
                value={money(results.bundleDiscount)}
                note="Discount compared with buying the items separately."
                tone="yellow"
              />
              <ResultCard
                label="Bundle discount percent"
                value={percent(results.bundleDiscountPercent)}
                note="Discount as a share of separate item prices."
                tone="yellow"
              />
              <ResultCard
                label="Bundle cost"
                value={money(results.totalBundleCost)}
                note="Total estimated cost to sell and fulfill the bundle."
                tone="blue"
              />
              <ResultCard
                label="Break-even bundle price"
                value={money(results.breakEvenPrice)}
                note="Minimum bundle price before profit reaches zero."
                tone="yellow"
              />
              <ResultCard
                label="Price for target margin"
                value={money(results.priceForTargetMargin)}
                note="Bundle price needed to reach the target margin."
                tone="yellow"
              />
              <ResultCard
                label="Extra price needed"
                value={money(results.extraPriceNeededForTarget)}
                note="Additional bundle price needed to hit target margin."
                tone="yellow"
              />
              <ResultCard
                label="Monthly bundle revenue"
                value={money(results.monthlyRevenue)}
                note="Bundle price multiplied by monthly bundle orders."
                tone="green"
              />
              <ResultCard
                label="Monthly bundle profit"
                value={money(results.monthlyProfit)}
                note="Profit per bundle multiplied by monthly bundle orders."
                tone={results.monthlyProfit >= 0 ? "green" : "red"}
              />
              <ResultCard
                label="Monthly discount given"
                value={money(results.monthlyDiscountGiven)}
                note="Total discount offered across monthly bundle orders."
                tone="yellow"
              />
              <ResultCard
                label="Cost share"
                value={percent(results.costShare)}
                note="Total bundle cost divided by bundle price."
                tone="blue"
              />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                The separate item price total is{" "}
                <strong>{money(results.separatePriceTotal)}</strong>. At a bundle
                price of <strong>{money(bundlePrice)}</strong>, the bundle discount
                is <strong>{money(results.bundleDiscount)}</strong>, or{" "}
                <strong>{percent(results.bundleDiscountPercent)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Estimated profit per bundle is{" "}
                <strong>{money(results.profitPerBundle)}</strong>, with a bundle
                margin of <strong>{percent(results.bundleMargin)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong> {results.statusText}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Bundle discount scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2">Discount</th>
                      <th className="px-3 py-2">Bundle price</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((scenario) => (
                      <tr key={scenario.discount} className="border-t bg-white">
                        <td className="px-3 py-2 font-medium">
                          {percent(scenario.discount)}
                        </td>
                        <td className="px-3 py-2">{money(scenario.price)}</td>
                        <td className="px-3 py-2">{money(scenario.profit)}</td>
                        <td className="px-3 py-2">{percent(scenario.margin)}</td>
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
            How to use this Shopify Bundle Pricing Calculator
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter item prices"
              text="Add the regular standalone prices for each product in the bundle."
            />
            <StepCard
              title="Add product costs"
              text="Enter product cost, shipping, packaging, fulfillment, and payment fees."
            />
            <StepCard
              title="Set bundle price"
              text="Add the proposed bundle price, ad cost, refund allowance, and target margin."
            />
            <StepCard
              title="Review profit"
              text="Check whether the bundle discount still leaves enough margin."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Shopify bundle cost breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the main costs included in the bundle profit estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Separate item price total" value={money(results.separatePriceTotal)} />
              <Breakdown label="Bundle price" value={money(bundlePrice)} />
              <Breakdown label="Product cost total" value={money(results.productCostTotal)} />
              <Breakdown label="Shipping cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Fulfillment cost" value={money(fulfillmentCost)} />
              <Breakdown label="Payment fee" value={money(results.paymentFee)} />
              <Breakdown label="Ad cost per bundle" value={money(adCostPerBundle)} />
              <Breakdown label="Refund allowance" value={money(refundAllowance)} />
              <Breakdown label="Profit per bundle" value={money(results.profitPerBundle)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Shopify bundle pricing mistakes</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Discounting the bundle without checking the combined product cost." />
              <Warning text="Ignoring higher shipping, packaging, or fulfillment costs for larger orders." />
              <Warning text="Using bundles to increase order value while accidentally lowering margin too much." />
              <Warning text="Forgetting ad cost and refund allowance when pricing bundle offers." />
              <Warning text="Making the bundle cheaper than the break-even price." />
              <Warning text="Assuming all bundle items have the same margin profile." />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Understanding your Shopify bundle result
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-emerald-700">Healthy:</strong> The bundle
                appears to meet or beat the target margin.
              </p>
              <p>
                <strong className="text-yellow-700">Watch:</strong> The bundle is
                profitable but does not reach the target margin.
              </p>
              <p>
                <strong className="text-orange-700">Thin:</strong> The bundle is
                profitable, but the remaining margin is limited.
              </p>
              <p>
                <strong className="text-red-700">Losing:</strong> The bundle is
                estimated to lose money under the entered assumptions.
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">What Shopify sellers should include</h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <Check text="Standalone price for each product in the bundle." />
              <Check text="Product cost for every bundled item." />
              <Check text="Shipping, packaging, fulfillment, and payment fees." />
              <Check text="Ad cost, refund allowance, and expected support cost." />
              <Check text="Target margin for deciding how deep the bundle discount can be." />
              <Check text="Monthly bundle orders for revenue and profit planning." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Shopify bundle profit</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Bundle high-margin items"
              text="Pair lower-margin products with higher-margin add-ons to protect profit."
            />
            <StepCard
              title="Raise order value"
              text="Use bundles to increase AOV while keeping the discount smaller than the added margin."
            />
            <StepCard
              title="Control fulfillment cost"
              text="Watch shipping weight, packaging size, pick-pack labor, and fulfillment fees."
            />
            <StepCard
              title="Test discount depth"
              text="Compare 5%, 10%, 15%, and 20% bundle discounts before scaling the offer."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Shopify seller tools</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/shopify/pricing-calculator" label="Pricing Calculator" />
            <Related href="/shopify/discount-impact-calculator" label="Discount Calculator" />
            <Related href="/shopify/profit-calculator" label="Profit Calculator" />
            <Related href="/shopify/subscription-profit-calculator" label="Subscription Profit Calculator" />
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
        : status === "Thin"
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
          Included in the bundle pricing estimate.
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