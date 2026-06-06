"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceProductCostCalculatorPage() {
  const [purchaseCost, setPurchaseCost] = useState(20);
  const [sourcingCost, setSourcingCost] = useState(3);
  const [cleaningCost, setCleaningCost] = useState(2);
  const [repairCost, setRepairCost] = useState(4);
  const [packagingCost, setPackagingCost] = useState(1.5);
  const [storageCost, setStorageCost] = useState(0.5);
  const [listingPrepCost, setListingPrepCost] = useState(1);
  const [expectedSalePrice, setExpectedSalePrice] = useState(55);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [negotiationDiscount, setNegotiationDiscount] = useState(5);
  const [refundAllowance, setRefundAllowance] = useState(1.5);
  const [targetProfit, setTargetProfit] = useState(15);

  const results = useMemo(() => {
    const totalProductCost =
      purchaseCost +
      sourcingCost +
      cleaningCost +
      repairCost +
      packagingCost +
      storageCost +
      listingPrepCost;

    const sellingCosts =
      deliveryCost + shippingCost + negotiationDiscount + refundAllowance;

    const totalCostAtSale = totalProductCost + sellingCosts;
    const estimatedProfit = expectedSalePrice - totalCostAtSale;
    const breakEvenPrice = totalCostAtSale;
    const targetSalePrice = totalCostAtSale + targetProfit;
    const margin =
      expectedSalePrice > 0 ? (estimatedProfit / expectedSalePrice) * 100 : 0;
    const costShare =
      expectedSalePrice > 0 ? (totalCostAtSale / expectedSalePrice) * 100 : 0;
    const extraPriceNeeded = Math.max(0, targetSalePrice - expectedSalePrice);

    let status = "Healthy";
    if (estimatedProfit < 0) status = "Losing";
    else if (estimatedProfit < targetProfit * 0.5) status = "Thin";
    else if (estimatedProfit < targetProfit) status = "Watch";

    return {
      totalProductCost,
      sellingCosts,
      totalCostAtSale,
      estimatedProfit,
      breakEvenPrice,
      targetSalePrice,
      margin,
      costShare,
      extraPriceNeeded,
      status,
    };
  }, [
    purchaseCost,
    sourcingCost,
    cleaningCost,
    repairCost,
    packagingCost,
    storageCost,
    listingPrepCost,
    expectedSalePrice,
    deliveryCost,
    shippingCost,
    negotiationDiscount,
    refundAllowance,
    targetProfit,
  ]);

  const statusTone: Tone =
    results.status === "Healthy"
      ? "green"
      : results.status === "Watch"
        ? "yellow"
        : results.status === "Thin"
          ? "yellow"
          : "red";

  const scenarioRows = [30, 40, 50, 55, 60, 70, 80].map((salePrice) => {
    const profit = salePrice - results.totalCostAtSale;
    const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.5) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return {
      salePrice,
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
          Facebook Marketplace Product Cost Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate total Facebook Marketplace item cost after purchase cost,
          sourcing, cleaning, repair, packaging, storage, listing prep, delivery,
          shipping, negotiation discounts, refund allowance, and target profit.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Product cost inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter item cost, prep costs, sale costs, expected sale price, and
              target profit to estimate whether a Facebook Marketplace item is
              worth listing.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Purchase cost" value={purchaseCost} onChange={setPurchaseCost} />
              <MoneyInput label="Sourcing cost" value={sourcingCost} onChange={setSourcingCost} />
              <MoneyInput label="Cleaning cost" value={cleaningCost} onChange={setCleaningCost} />
              <MoneyInput label="Repair cost" value={repairCost} onChange={setRepairCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} onChange={setPackagingCost} />
              <MoneyInput label="Storage cost" value={storageCost} onChange={setStorageCost} />
              <MoneyInput label="Listing prep cost" value={listingPrepCost} onChange={setListingPrepCost} />
              <MoneyInput label="Expected sale price" value={expectedSalePrice} onChange={setExpectedSalePrice} />
              <MoneyInput label="Delivery cost" value={deliveryCost} onChange={setDeliveryCost} />
              <MoneyInput label="Shipping cost" value={shippingCost} onChange={setShippingCost} />
              <MoneyInput label="Negotiation discount" value={negotiationDiscount} onChange={setNegotiationDiscount} />
              <MoneyInput label="Refund allowance" value={refundAllowance} onChange={setRefundAllowance} />
              <MoneyInput label="Target profit" value={targetProfit} onChange={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace buyer
              behavior, delivery costs, shipping costs, item condition, pickup
              friction, no-shows, refunds, and selling results may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace product cost and listing profit.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Total product cost"
                value={formatMoney(results.totalProductCost)}
                tone="yellow"
                text="Purchase, sourcing, cleaning, repair, packaging, storage, and listing prep."
              />
              <ResultCard
                label="Estimated profit"
                value={formatMoney(results.estimatedProfit)}
                tone={results.estimatedProfit >= targetProfit ? "green" : "yellow"}
                text="Expected sale price minus product cost, selling costs, and discounts."
              />
              <ResultCard
                label="Selling costs"
                value={formatMoney(results.sellingCosts)}
                tone="blue"
                text="Delivery, shipping, negotiation discount, and refund allowance."
              />
              <ResultCard
                label="Break-even price"
                value={formatMoney(results.breakEvenPrice)}
                tone="yellow"
                text="Minimum sale price needed to avoid losing money."
              />
              <ResultCard
                label="Total cost at sale"
                value={formatMoney(results.totalCostAtSale)}
                tone="blue"
                text="Product cost plus delivery, shipping, discount, and refund allowance."
              />
              <ResultCard
                label="Price for target profit"
                value={formatMoney(results.targetSalePrice)}
                tone="green"
                text="Estimated sale price needed to reach your target profit."
              />
              <ResultCard
                label="Estimated margin"
                value={`${results.margin.toFixed(1)}%`}
                tone={results.margin >= 30 ? "green" : "yellow"}
                text="Profit divided by expected sale price."
              />
              <ResultCard
                label="Cost share"
                value={`${results.costShare.toFixed(1)}%`}
                tone="yellow"
                text="Total cost as a share of expected sale price."
              />
              <ResultCard
                label="Extra price needed"
                value={formatMoney(results.extraPriceNeeded)}
                tone={results.extraPriceNeeded === 0 ? "green" : "yellow"}
                text="Additional sale price needed to reach target profit."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Your total product cost before buyer negotiation, delivery,
                shipping, and refund risk is estimated at{" "}
                <strong>{formatMoney(results.totalProductCost)}</strong>. At the
                entered sale price, estimated profit is{" "}
                <strong>{formatMoney(results.estimatedProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "This item appears profitable under the entered assumptions."
                  : results.status === "Watch"
                    ? "This item is profitable, but it does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "This item has weak profit after costs and negotiation pressure."
                      : "This item appears to lose money under the entered assumptions."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Sale price scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Sale price</th>
                      <th className="border px-3 py-2">Profit</th>
                      <th className="border px-3 py-2">Margin</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.salePrice} className="border">
                        <td className="border px-3 py-2">{formatMoney(row.salePrice)}</td>
                        <td className="border px-3 py-2">{formatMoney(row.profit)}</td>
                        <td className="border px-3 py-2">{row.margin.toFixed(1)}%</td>
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
            How to use this Facebook Marketplace Product Cost Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter item cost"
              text="Start with purchase cost, sourcing cost, cleaning, repair, and storage."
            />
            <InfoCard
              title="Add listing costs"
              text="Include packaging, listing prep, supplies, and any work needed before selling."
            />
            <InfoCard
              title="Add sale pressure"
              text="Include delivery, shipping, negotiation discounts, and refund allowance."
            />
            <InfoCard
              title="Review price"
              text="Check whether the item can sell high enough to meet your target profit."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace product cost breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the major costs included in the product cost estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Purchase cost" value={formatMoney(purchaseCost)} />
              <Breakdown label="Sourcing cost" value={formatMoney(sourcingCost)} />
              <Breakdown label="Cleaning cost" value={formatMoney(cleaningCost)} />
              <Breakdown label="Repair cost" value={formatMoney(repairCost)} />
              <Breakdown label="Packaging cost" value={formatMoney(packagingCost)} />
              <Breakdown label="Storage cost" value={formatMoney(storageCost)} />
              <Breakdown label="Listing prep cost" value={formatMoney(listingPrepCost)} />
              <Breakdown label="Total product cost" value={formatMoney(results.totalProductCost)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace product cost mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Counting only the purchase price and forgetting sourcing or cleaning costs.",
                "Ignoring repair cost, packaging supplies, labels, tape, or boxes.",
                "Offering delivery without including mileage, fuel, and time.",
                "Accepting lower offers without checking total product cost first.",
                "Restocking similar items before checking whether the first item was profitable.",
                "Forgetting no-shows, pickup delays, refund allowance, and buyer issue risk.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace product profitability
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Buy lower"
              text="Lower sourcing cost gives more room for negotiation, delivery, and discounts."
            />
            <InfoCard
              title="Reduce prep cost"
              text="Avoid items that need too much cleaning, repair, storage, or handling."
            />
            <InfoCard
              title="Price from costs"
              text="Use total cost, not purchase price alone, to set listings."
            />
            <InfoCard
              title="Track winners"
              text="Source more items only after confirming actual profit and sell-through."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/facebook-marketplace/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Included in the product cost estimate.
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