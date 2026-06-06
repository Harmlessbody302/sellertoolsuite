"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceBundlePricingCalculatorPage() {
  const [itemOnePrice, setItemOnePrice] = useState(45);
  const [itemTwoPrice, setItemTwoPrice] = useState(30);
  const [itemThreePrice, setItemThreePrice] = useState(20);
  const [itemOneCost, setItemOneCost] = useState(18);
  const [itemTwoCost, setItemTwoCost] = useState(12);
  const [itemThreeCost, setItemThreeCost] = useState(8);
  const [bundlePrice, setBundlePrice] = useState(80);
  const [packagingCost, setPackagingCost] = useState(2);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [negotiationDiscount, setNegotiationDiscount] = useState(5);
  const [refundAllowance, setRefundAllowance] = useState(2);
  const [targetProfit, setTargetProfit] = useState(25);

  const results = useMemo(() => {
    const separateItemPriceTotal = itemOnePrice + itemTwoPrice + itemThreePrice;
    const productCostTotal = itemOneCost + itemTwoCost + itemThreeCost;
    const bundleDiscount = Math.max(0, separateItemPriceTotal - bundlePrice);
    const bundleDiscountPercent =
      separateItemPriceTotal > 0
        ? (bundleDiscount / separateItemPriceTotal) * 100
        : 0;

    const orderCosts =
      productCostTotal +
      packagingCost +
      deliveryCost +
      shippingCost +
      negotiationDiscount +
      refundAllowance;

    const profitPerBundle = bundlePrice - orderCosts;
    const bundleMargin = bundlePrice > 0 ? (profitPerBundle / bundlePrice) * 100 : 0;
    const breakEvenBundlePrice = orderCosts;
    const priceForTargetProfit = orderCosts + targetProfit;
    const extraPriceNeeded = Math.max(0, priceForTargetProfit - bundlePrice);

    const separateSaleProfit =
      separateItemPriceTotal -
      productCostTotal -
      packagingCost -
      deliveryCost -
      shippingCost -
      refundAllowance;

    const bundleVsSeparateProfit = profitPerBundle - separateSaleProfit;
    const costShare = bundlePrice > 0 ? (orderCosts / bundlePrice) * 100 : 0;

    let status = "Healthy";
    if (profitPerBundle < 0) status = "Losing";
    else if (profitPerBundle < targetProfit * 0.5) status = "Thin";
    else if (profitPerBundle < targetProfit) status = "Watch";

    return {
      separateItemPriceTotal,
      productCostTotal,
      bundleDiscount,
      bundleDiscountPercent,
      orderCosts,
      profitPerBundle,
      bundleMargin,
      breakEvenBundlePrice,
      priceForTargetProfit,
      extraPriceNeeded,
      separateSaleProfit,
      bundleVsSeparateProfit,
      costShare,
      status,
    };
  }, [
    itemOnePrice,
    itemTwoPrice,
    itemThreePrice,
    itemOneCost,
    itemTwoCost,
    itemThreeCost,
    bundlePrice,
    packagingCost,
    deliveryCost,
    shippingCost,
    negotiationDiscount,
    refundAllowance,
    targetProfit,
  ]);

  const statusTone: Tone =
    results.status === "Healthy"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const discountRows = [0, 5, 10, 15, 20, 25, 30].map((discountPercent) => {
    const price =
      results.separateItemPriceTotal * (1 - discountPercent / 100);
    const profit = price - results.orderCosts;
    const margin = price > 0 ? (profit / price) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.5) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return {
      discountPercent,
      price,
      profit,
      margin,
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
          Facebook Marketplace Bundle Pricing Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate Facebook Marketplace bundle price, bundle discount, combined
          item cost, packaging cost, delivery cost, shipping cost, negotiation
          discount, refund allowance, target profit, and whether a bundle offer
          is worth accepting.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Bundle inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter separate item prices, item costs, bundle price, delivery,
              shipping, negotiation discount, and target profit.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Item 1 regular price" value={itemOnePrice} onChange={setItemOnePrice} />
              <MoneyInput label="Item 2 regular price" value={itemTwoPrice} onChange={setItemTwoPrice} />
              <MoneyInput label="Item 3 regular price" value={itemThreePrice} onChange={setItemThreePrice} />
              <MoneyInput label="Item 1 cost" value={itemOneCost} onChange={setItemOneCost} />
              <MoneyInput label="Item 2 cost" value={itemTwoCost} onChange={setItemTwoCost} />
              <MoneyInput label="Item 3 cost" value={itemThreeCost} onChange={setItemThreeCost} />
              <MoneyInput label="Bundle price" value={bundlePrice} onChange={setBundlePrice} />
              <MoneyInput label="Packaging cost" value={packagingCost} onChange={setPackagingCost} />
              <MoneyInput label="Delivery cost" value={deliveryCost} onChange={setDeliveryCost} />
              <MoneyInput label="Shipping cost" value={shippingCost} onChange={setShippingCost} />
              <MoneyInput label="Negotiation discount" value={negotiationDiscount} onChange={setNegotiationDiscount} />
              <MoneyInput label="Refund allowance" value={refundAllowance} onChange={setRefundAllowance} />
              <MoneyInput label="Target profit" value={targetProfit} onChange={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace bundle
              behavior, buyer negotiation, pickup timing, delivery requests,
              shipping costs, refunds, and final sale outcomes may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace bundle profitability.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Profit per bundle"
                value={formatMoney(results.profitPerBundle)}
                tone={results.profitPerBundle >= targetProfit ? "green" : "yellow"}
                text="Bundle price minus item costs, packaging, delivery, shipping, discounts, and refund allowance."
              />
              <ResultCard
                label="Bundle margin"
                value={`${results.bundleMargin.toFixed(1)}%`}
                tone={results.bundleMargin >= 30 ? "green" : "yellow"}
                text="Profit per bundle divided by bundle price."
              />
              <ResultCard
                label="Bundle discount"
                value={formatMoney(results.bundleDiscount)}
                tone="yellow"
                text="Discount compared with selling the items separately."
              />
              <ResultCard
                label="Bundle discount percent"
                value={`${results.bundleDiscountPercent.toFixed(1)}%`}
                tone="yellow"
                text="Discount as a share of separate item prices."
              />
              <ResultCard
                label="Separate item price total"
                value={formatMoney(results.separateItemPriceTotal)}
                tone="blue"
                text="Combined standalone price of the bundled items."
              />
              <ResultCard
                label="Product cost total"
                value={formatMoney(results.productCostTotal)}
                tone="blue"
                text="Combined item cost for all bundled items."
              />
              <ResultCard
                label="Order cost total"
                value={formatMoney(results.orderCosts)}
                tone="yellow"
                text="Product cost, packaging, delivery, shipping, discount, and refund allowance."
              />
              <ResultCard
                label="Break-even bundle price"
                value={formatMoney(results.breakEvenBundlePrice)}
                tone="yellow"
                text="Minimum bundle price before profit reaches zero."
              />
              <ResultCard
                label="Price for target profit"
                value={formatMoney(results.priceForTargetProfit)}
                tone="green"
                text="Bundle price needed to reach target profit."
              />
              <ResultCard
                label="Extra price needed"
                value={formatMoney(results.extraPriceNeeded)}
                tone={results.extraPriceNeeded === 0 ? "green" : "yellow"}
                text="Additional bundle price needed to reach target profit."
              />
              <ResultCard
                label="Bundle vs. separate profit"
                value={formatMoney(results.bundleVsSeparateProfit)}
                tone={results.bundleVsSeparateProfit >= 0 ? "green" : "yellow"}
                text="Bundle profit compared with selling the items separately."
              />
              <ResultCard
                label="Cost share"
                value={`${results.costShare.toFixed(1)}%`}
                tone="yellow"
                text="Order costs as a share of bundle price."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The separate item price total is{" "}
                <strong>{formatMoney(results.separateItemPriceTotal)}</strong>.
                At a bundle price of{" "}
                <strong>{formatMoney(bundlePrice)}</strong>, the bundle discount
                is <strong>{formatMoney(results.bundleDiscount)}</strong>, or{" "}
                <strong>{results.bundleDiscountPercent.toFixed(1)}%</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "The bundle appears profitable under the entered assumptions."
                  : results.status === "Watch"
                    ? "The bundle is profitable, but does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "The bundle has weak profit after costs, discounts, and local selling pressure."
                      : "The bundle appears to lose money under the entered assumptions."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Bundle discount scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Discount</th>
                      <th className="border px-3 py-2">Bundle price</th>
                      <th className="border px-3 py-2">Profit</th>
                      <th className="border px-3 py-2">Margin</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discountRows.map((row) => (
                      <tr key={row.discountPercent} className="border">
                        <td className="border px-3 py-2">
                          {row.discountPercent.toFixed(1)}%
                        </td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.price)}
                        </td>
                        <td className="border px-3 py-2">
                          {formatMoney(row.profit)}
                        </td>
                        <td className="border px-3 py-2">
                          {row.margin.toFixed(1)}%
                        </td>
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
            How to use this Facebook Marketplace Bundle Pricing Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter item prices"
              text="Add the standalone price for each item in the bundle."
            />
            <InfoCard
              title="Add product costs"
              text="Enter item cost, packaging, delivery, shipping, discount, and refund assumptions."
            />
            <InfoCard
              title="Set bundle price"
              text="Add the proposed bundle price and target profit."
            />
            <InfoCard
              title="Review profit"
              text="Check whether the bundle discount still leaves enough margin."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace bundle cost breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the main costs included in the bundle pricing estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Separate item price total" value={formatMoney(results.separateItemPriceTotal)} />
              <Breakdown label="Bundle price" value={formatMoney(bundlePrice)} />
              <Breakdown label="Bundle discount" value={formatMoney(results.bundleDiscount)} />
              <Breakdown label="Product cost total" value={formatMoney(results.productCostTotal)} />
              <Breakdown label="Packaging cost" value={formatMoney(packagingCost)} />
              <Breakdown label="Delivery cost" value={formatMoney(deliveryCost)} />
              <Breakdown label="Shipping cost" value={formatMoney(shippingCost)} />
              <Breakdown label="Profit per bundle" value={formatMoney(results.profitPerBundle)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace bundle pricing mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Discounting a bundle without adding up the cost of every item.",
                "Forgetting delivery, shipping, packaging, and refund pressure.",
                "Accepting bundle offers without checking total profit.",
                "Using bundles only to increase revenue while lowering profit per order.",
                "Combining weak items without balancing them with stronger-margin items.",
                "Making the bundle price too close to break-even after negotiation.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace bundle profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Pair margins wisely"
              text="Combine lower-margin items with stronger-margin items to protect total bundle profit."
            />
            <InfoCard
              title="Control discounts"
              text="Avoid stacking bundle discounts, delivery concessions, and buyer negotiation too deeply."
            />
            <InfoCard
              title="Use pickup value"
              text="Bundles can be more useful when one pickup moves multiple items at once."
            />
            <InfoCard
              title="Set a floor price"
              text="Know the lowest acceptable bundle price before negotiating with buyers."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
            <Related href="/facebook-marketplace/product-cost-calculator" label="Product Cost Calculator" />
          </div>
        </section>
      </section>
    </main>
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
          Included in the bundle pricing estimate.
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