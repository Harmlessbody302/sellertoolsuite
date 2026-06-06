"use client";

import { useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function MercariOfferProfitCalculatorPage() {
  const [listPrice, setListPrice] = useState(40);
  const [buyerOffer, setBuyerOffer] = useState(32);
  const [minimumAcceptableProfit, setMinimumAcceptableProfit] = useState(10);
  const [itemCost, setItemCost] = useState(10);
  const [shippingCost, setShippingCost] = useState(6.5);
  const [packagingCost, setPackagingCost] = useState(1);
  const [sellingFeeRate, setSellingFeeRate] = useState(10);
  const [processingFeeRate, setProcessingFeeRate] = useState(2.9);
  const [fixedFee, setFixedFee] = useState(0.5);
  const [promotionCost, setPromotionCost] = useState(0);
  const [refundAllowance, setRefundAllowance] = useState(1);
  const [counterOffer, setCounterOffer] = useState(35);

  const results = useMemo(() => {
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;

    const profitAtList =
      listPrice -
      itemCost -
      shippingCost -
      packagingCost -
      listPrice * feeRate -
      fixedFee -
      promotionCost -
      refundAllowance;

    const profitAtOffer =
      buyerOffer -
      itemCost -
      shippingCost -
      packagingCost -
      buyerOffer * feeRate -
      fixedFee -
      promotionCost -
      refundAllowance;

    const profitAtCounter =
      counterOffer -
      itemCost -
      shippingCost -
      packagingCost -
      counterOffer * feeRate -
      fixedFee -
      promotionCost -
      refundAllowance;

    const offerDiscount = Math.max(0, listPrice - buyerOffer);
    const offerDiscountPercent =
      listPrice > 0 ? (offerDiscount / listPrice) * 100 : 0;

    const counterDiscount = Math.max(0, listPrice - counterOffer);
    const counterDiscountPercent =
      listPrice > 0 ? (counterDiscount / listPrice) * 100 : 0;

    const profitLostFromOffer = profitAtList - profitAtOffer;
    const profitRecoveredByCounter = profitAtCounter - profitAtOffer;

    const breakEvenBeforeFees =
      itemCost +
      shippingCost +
      packagingCost +
      fixedFee +
      promotionCost +
      refundAllowance;
    const breakEvenPrice =
      feeRate < 1 ? breakEvenBeforeFees / (1 - feeRate) : 0;

    const minimumPriceBeforeFees =
      itemCost +
      shippingCost +
      packagingCost +
      fixedFee +
      promotionCost +
      refundAllowance +
      minimumAcceptableProfit;
    const minimumAcceptablePrice =
      feeRate < 1 ? minimumPriceBeforeFees / (1 - feeRate) : 0;

    const offerMargin = buyerOffer > 0 ? (profitAtOffer / buyerOffer) * 100 : 0;
    const counterMargin =
      counterOffer > 0 ? (profitAtCounter / counterOffer) * 100 : 0;

    let status = "Acceptable";
    if (profitAtOffer < 0) status = "Losing";
    else if (profitAtOffer < minimumAcceptableProfit * 0.6) status = "Thin";
    else if (profitAtOffer < minimumAcceptableProfit) status = "Counter";

    return {
      profitAtList,
      profitAtOffer,
      profitAtCounter,
      offerDiscount,
      offerDiscountPercent,
      counterDiscount,
      counterDiscountPercent,
      profitLostFromOffer,
      profitRecoveredByCounter,
      breakEvenPrice,
      minimumAcceptablePrice,
      offerMargin,
      counterMargin,
      status,
    };
  }, [
    listPrice,
    buyerOffer,
    minimumAcceptableProfit,
    itemCost,
    shippingCost,
    packagingCost,
    sellingFeeRate,
    processingFeeRate,
    fixedFee,
    promotionCost,
    refundAllowance,
    counterOffer,
  ]);

  const scenarios = [0, 5, 10, 15, 20, 25, 30].map((discountPercent) => {
    const offerPrice = listPrice * (1 - discountPercent / 100);
    const feeRate = (sellingFeeRate + processingFeeRate) / 100;
    const profit =
      offerPrice -
      itemCost -
      shippingCost -
      packagingCost -
      offerPrice * feeRate -
      fixedFee -
      promotionCost -
      refundAllowance;
    const margin = offerPrice > 0 ? (profit / offerPrice) * 100 : 0;

    let status = "Acceptable";
    if (profit < 0) status = "Losing";
    else if (profit < minimumAcceptableProfit * 0.6) status = "Thin";
    else if (profit < minimumAcceptableProfit) status = "Counter";

    return { discountPercent, offerPrice, profit, margin, status };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Mercari Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Mercari Offer Profit Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether accepting a Mercari buyer offer still leaves enough
          profit after item cost, shipping, packaging, fees, promotion cost,
          refund allowance, and minimum profit requirements.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Offer inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter list price, buyer offer, counteroffer, item costs, shipping,
              fees, and minimum acceptable profit.
            </p>

            <div className="mt-5 space-y-4">
              <NumberInput label="List price" value={listPrice} setValue={setListPrice} prefix="$" />
              <NumberInput label="Buyer offer" value={buyerOffer} setValue={setBuyerOffer} prefix="$" />
              <NumberInput label="Counteroffer" value={counterOffer} setValue={setCounterOffer} prefix="$" />
              <NumberInput label="Minimum acceptable profit" value={minimumAcceptableProfit} setValue={setMinimumAcceptableProfit} prefix="$" />
              <NumberInput label="Item cost" value={itemCost} setValue={setItemCost} prefix="$" />
              <NumberInput label="Shipping cost" value={shippingCost} setValue={setShippingCost} prefix="$" />
              <NumberInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} prefix="$" />
              <NumberInput label="Selling fee rate" value={sellingFeeRate} setValue={setSellingFeeRate} suffix="%" />
              <NumberInput label="Processing fee rate" value={processingFeeRate} setValue={setProcessingFeeRate} suffix="%" />
              <NumberInput label="Fixed fee" value={fixedFee} setValue={setFixedFee} prefix="$" />
              <NumberInput label="Promotion cost" value={promotionCost} setValue={setPromotionCost} prefix="$" />
              <NumberInput label="Refund allowance" value={refundAllowance} setValue={setRefundAllowance} prefix="$" />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Mercari fees, payment
              processing costs, buyer behavior, shipping costs, promotions,
              refunds, and offer outcomes may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Mercari buyer offer profitability.
                </p>
              </div>

              <span className={statusClass(results.status)}>
                {results.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                title="Profit at buyer offer"
                value={money(results.profitAtOffer)}
                tone={results.profitAtOffer >= minimumAcceptableProfit ? "green" : "yellow"}
                text="Estimated profit if the buyer offer is accepted."
              />
              <ResultCard
                title="Profit at list price"
                value={money(results.profitAtList)}
                tone="green"
                text="Estimated profit if the item sells at full list price."
              />
              <ResultCard
                title="Profit at counteroffer"
                value={money(results.profitAtCounter)}
                tone={results.profitAtCounter >= minimumAcceptableProfit ? "green" : "yellow"}
                text="Estimated profit if the buyer accepts your counteroffer."
              />
              <ResultCard
                title="Profit lost from offer"
                value={money(results.profitLostFromOffer)}
                tone="yellow"
                text="Difference between full-price profit and offer profit."
              />
              <ResultCard
                title="Offer discount"
                value={money(results.offerDiscount)}
                tone="yellow"
                text="Dollar discount from list price to buyer offer."
              />
              <ResultCard
                title="Offer discount percent"
                value={`${results.offerDiscountPercent.toFixed(1)}%`}
                tone="yellow"
                text="Buyer offer discount as a share of list price."
              />
              <ResultCard
                title="Minimum acceptable price"
                value={money(results.minimumAcceptablePrice)}
                tone="blue"
                text="Estimated price needed to reach your minimum profit."
              />
              <ResultCard
                title="Break-even price"
                value={money(results.breakEvenPrice)}
                tone="yellow"
                text="Approximate price needed to avoid losing money."
              />
              <ResultCard
                title="Offer margin"
                value={`${results.offerMargin.toFixed(1)}%`}
                tone={results.offerMargin >= 25 ? "green" : "yellow"}
                text="Profit at buyer offer divided by buyer offer price."
              />
              <ResultCard
                title="Counteroffer margin"
                value={`${results.counterMargin.toFixed(1)}%`}
                tone={results.counterMargin >= 25 ? "green" : "yellow"}
                text="Profit at counteroffer divided by counteroffer price."
              />
              <ResultCard
                title="Counteroffer discount"
                value={`${results.counterDiscountPercent.toFixed(1)}%`}
                tone="blue"
                text="Counteroffer discount compared with list price."
              />
              <ResultCard
                title="Profit recovered by counter"
                value={money(results.profitRecoveredByCounter)}
                tone="green"
                text="Extra profit from counteroffer compared with buyer offer."
              />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The buyer offer of <strong>{money(buyerOffer)}</strong> creates
                an estimated profit of{" "}
                <strong>{money(results.profitAtOffer)}</strong>. Your minimum
                acceptable price for the target profit is about{" "}
                <strong>{money(results.minimumAcceptablePrice)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Acceptable"
                  ? "The buyer offer appears to meet or exceed your minimum profit."
                  : results.status === "Counter"
                    ? "The offer is profitable but below your minimum target, so a counteroffer may make more sense."
                    : results.status === "Thin"
                      ? "The offer leaves thin profit and could be weakened by refunds, shipping changes, or extra costs."
                      : "The buyer offer appears to lose money under the entered assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Offer discount scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Discount</th>
                      <th className="px-3 py-2">Offer price</th>
                      <th className="px-3 py-2">Profit</th>
                      <th className="px-3 py-2">Margin</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((row) => (
                      <tr key={row.discountPercent} className="border-t">
                        <td className="px-3 py-2">{row.discountPercent.toFixed(1)}%</td>
                        <td className="px-3 py-2">{money(row.offerPrice)}</td>
                        <td className="px-3 py-2">{money(row.profit)}</td>
                        <td className="px-3 py-2">{row.margin.toFixed(1)}%</td>
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
            How to use this Mercari Offer Profit Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Enter prices" text="Add your list price, buyer offer, and possible counteroffer." />
            <StepCard title="Add costs" text="Include item cost, shipping, packaging, fees, promotion cost, and refunds." />
            <StepCard title="Set minimum profit" text="Enter the minimum profit required to make the sale worthwhile." />
            <StepCard title="Review decision" text="Use the results to accept, counter, or reject the buyer offer." />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Mercari offer profit breakdown</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the buyer offer estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="List price" value={money(listPrice)} />
              <Breakdown label="Buyer offer" value={money(buyerOffer)} />
              <Breakdown label="Counteroffer" value={money(counterOffer)} />
              <Breakdown label="Item cost" value={money(itemCost)} />
              <Breakdown label="Shipping cost" value={money(shippingCost)} />
              <Breakdown label="Packaging cost" value={money(packagingCost)} />
              <Breakdown label="Minimum acceptable price" value={money(results.minimumAcceptablePrice)} />
              <Breakdown label="Profit at buyer offer" value={money(results.profitAtOffer)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Common Mercari offer mistakes</h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <Warning text="Accepting buyer offers without checking item cost, fees, and shipping." />
              <Warning text="Forgetting seller-paid shipping when judging offer profit." />
              <Warning text="Using list price as the profit reference instead of break-even price." />
              <Warning text="Countering randomly instead of using a minimum acceptable price." />
              <Warning text="Letting low offers move inventory while quietly erasing margin." />
              <Warning text="Ignoring refund allowance, packaging supplies, and promotion cost." />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Ways to improve Mercari offer strategy</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard title="Know your floor" text="Calculate the lowest acceptable price before offers arrive." />
            <StepCard title="Build offer room" text="List with enough room to accept reasonable buyer offers." />
            <StepCard title="Counter with data" text="Use minimum profit and break-even price to guide counteroffers." />
            <StepCard title="Reject weak offers" text="Avoid accepting offers that move inventory but damage profit." />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Mercari seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/mercari/pricing-calculator" label="Pricing Calculator" />
            <Related href="/mercari/profit-calculator" label="Profit Calculator" />
            <Related href="/mercari/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/mercari/promotion-roi-calculator" label="Promotion ROI Calculator" />
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
          Included in the offer profit estimate.
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
  if (status === "Acceptable") {
    return "rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700";
  }

  if (status === "Counter") {
    return "rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700";
  }

  if (status === "Thin") {
    return "rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700";
  }

  return "rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700";
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}