"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceOfferRoiCalculatorPage() {
  const [listPrice, setListPrice] = useState(80);
  const [buyerOffer, setBuyerOffer] = useState(65);
  const [counterOffer, setCounterOffer] = useState(72);
  const [itemCost, setItemCost] = useState(35);
  const [packagingCost, setPackagingCost] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [refundAllowance, setRefundAllowance] = useState(1.5);
  const [timeCost, setTimeCost] = useState(2);
  const [minimumAcceptableProfit, setMinimumAcceptableProfit] = useState(20);
  const [expectedExtraSales, setExpectedExtraSales] = useState(1);

  const results = useMemo(() => {
    const baseCosts =
      itemCost + packagingCost + deliveryCost + shippingCost + refundAllowance + timeCost;

    const fullPriceFee = listPrice * (platformFeeRate / 100);
    const buyerOfferFee = buyerOffer * (platformFeeRate / 100);
    const counterOfferFee = counterOffer * (platformFeeRate / 100);

    const profitAtListPrice = listPrice - baseCosts - fullPriceFee;
    const profitAtBuyerOffer = buyerOffer - baseCosts - buyerOfferFee;
    const profitAtCounterOffer = counterOffer - baseCosts - counterOfferFee;

    const offerDiscount = Math.max(0, listPrice - buyerOffer);
    const counterDiscount = Math.max(0, listPrice - counterOffer);
    const offerDiscountPercent = listPrice > 0 ? (offerDiscount / listPrice) * 100 : 0;
    const counterDiscountPercent =
      listPrice > 0 ? (counterDiscount / listPrice) * 100 : 0;

    const profitLostFromOffer = profitAtListPrice - profitAtBuyerOffer;
    const profitRecoveredByCounter = profitAtCounterOffer - profitAtBuyerOffer;

    const breakEvenPrice =
      baseCosts / Math.max(0.0001, 1 - platformFeeRate / 100);

    const minimumAcceptablePrice =
      (baseCosts + minimumAcceptableProfit) /
      Math.max(0.0001, 1 - platformFeeRate / 100);

    const offerRoi =
      profitLostFromOffer > 0
        ? ((profitAtBuyerOffer * expectedExtraSales) / profitLostFromOffer) * 100
        : 0;

    const marginAtOffer = buyerOffer > 0 ? (profitAtBuyerOffer / buyerOffer) * 100 : 0;
    const marginAtCounter =
      counterOffer > 0 ? (profitAtCounterOffer / counterOffer) * 100 : 0;

    const totalOfferProfit = profitAtBuyerOffer * expectedExtraSales;
    const totalCounterProfit = profitAtCounterOffer * expectedExtraSales;

    let status = "Acceptable";
    if (profitAtBuyerOffer < 0) status = "Losing";
    else if (profitAtBuyerOffer < minimumAcceptableProfit * 0.5) status = "Thin";
    else if (profitAtBuyerOffer < minimumAcceptableProfit) status = "Counter";

    return {
      baseCosts,
      fullPriceFee,
      buyerOfferFee,
      counterOfferFee,
      profitAtListPrice,
      profitAtBuyerOffer,
      profitAtCounterOffer,
      offerDiscount,
      counterDiscount,
      offerDiscountPercent,
      counterDiscountPercent,
      profitLostFromOffer,
      profitRecoveredByCounter,
      breakEvenPrice,
      minimumAcceptablePrice,
      offerRoi,
      marginAtOffer,
      marginAtCounter,
      totalOfferProfit,
      totalCounterProfit,
      status,
    };
  }, [
    listPrice,
    buyerOffer,
    counterOffer,
    itemCost,
    packagingCost,
    deliveryCost,
    shippingCost,
    platformFeeRate,
    refundAllowance,
    timeCost,
    minimumAcceptableProfit,
    expectedExtraSales,
  ]);

  const statusTone: Tone =
    results.status === "Acceptable"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const discountRows = [0, 5, 10, 15, 20, 25, 30].map((discountPercent) => {
    const offerPrice = listPrice * (1 - discountPercent / 100);
    const fee = offerPrice * (platformFeeRate / 100);
    const profit = offerPrice - results.baseCosts - fee;
    const margin = offerPrice > 0 ? (profit / offerPrice) * 100 : 0;

    let status = "Acceptable";
    if (profit < 0) status = "Losing";
    else if (profit < minimumAcceptableProfit * 0.5) status = "Thin";
    else if (profit < minimumAcceptableProfit) status = "Counter";

    return {
      discountPercent,
      offerPrice,
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
          Facebook Marketplace Offer ROI Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether accepting a Facebook Marketplace buyer offer,
          sending a counteroffer, or waiting for a higher price leaves enough
          profit after item cost, delivery, shipping, packaging, refund
          allowance, time cost, and platform fees.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Offer inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter list price, buyer offer, counteroffer, item cost, delivery
              cost, shipping cost, time cost, and minimum acceptable profit.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="List price" value={listPrice} onChange={setListPrice} />
              <MoneyInput label="Buyer offer" value={buyerOffer} onChange={setBuyerOffer} />
              <MoneyInput label="Counteroffer" value={counterOffer} onChange={setCounterOffer} />
              <MoneyInput label="Item cost" value={itemCost} onChange={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} onChange={setPackagingCost} />
              <MoneyInput label="Delivery cost" value={deliveryCost} onChange={setDeliveryCost} />
              <MoneyInput label="Shipping cost" value={shippingCost} onChange={setShippingCost} />
              <NumberInput label="Platform fee rate" value={platformFeeRate} onChange={setPlatformFeeRate} suffix="%" />
              <MoneyInput label="Refund allowance" value={refundAllowance} onChange={setRefundAllowance} />
              <MoneyInput label="Time cost" value={timeCost} onChange={setTimeCost} />
              <MoneyInput label="Minimum acceptable profit" value={minimumAcceptableProfit} onChange={setMinimumAcceptableProfit} />
              <NumberInput label="Expected extra sales" value={expectedExtraSales} onChange={setExpectedExtraSales} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace buyer
              behavior, no-shows, negotiation outcomes, pickup timing, payment
              terms, refunds, and final profit may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace offer profitability.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Profit at buyer offer"
                value={formatMoney(results.profitAtBuyerOffer)}
                tone={results.profitAtBuyerOffer >= minimumAcceptableProfit ? "green" : "yellow"}
                text="Estimated profit if the buyer offer is accepted."
              />
              <ResultCard
                label="Profit at counteroffer"
                value={formatMoney(results.profitAtCounterOffer)}
                tone={results.profitAtCounterOffer >= minimumAcceptableProfit ? "green" : "yellow"}
                text="Estimated profit if the buyer accepts your counteroffer."
              />
              <ResultCard
                label="Profit at list price"
                value={formatMoney(results.profitAtListPrice)}
                tone="blue"
                text="Estimated profit if the item sells at full list price."
              />
              <ResultCard
                label="Profit lost from offer"
                value={formatMoney(results.profitLostFromOffer)}
                tone="yellow"
                text="Difference between full-price profit and buyer-offer profit."
              />
              <ResultCard
                label="Offer discount"
                value={formatMoney(results.offerDiscount)}
                tone="yellow"
                text="Dollar discount from list price to buyer offer."
              />
              <ResultCard
                label="Offer discount percent"
                value={`${results.offerDiscountPercent.toFixed(1)}%`}
                tone="yellow"
                text="Buyer offer discount as a share of list price."
              />
              <ResultCard
                label="Counter discount"
                value={formatMoney(results.counterDiscount)}
                tone="blue"
                text="Dollar discount from list price to counteroffer."
              />
              <ResultCard
                label="Profit recovered by counter"
                value={formatMoney(results.profitRecoveredByCounter)}
                tone="green"
                text="Extra profit recovered by countering instead of accepting the first offer."
              />
              <ResultCard
                label="Minimum acceptable price"
                value={formatMoney(results.minimumAcceptablePrice)}
                tone="blue"
                text="Estimated price needed to reach your minimum acceptable profit."
              />
              <ResultCard
                label="Break-even price"
                value={formatMoney(results.breakEvenPrice)}
                tone="yellow"
                text="Approximate sale price needed to avoid losing money."
              />
              <ResultCard
                label="Offer margin"
                value={`${results.marginAtOffer.toFixed(1)}%`}
                tone={results.marginAtOffer >= 30 ? "green" : "yellow"}
                text="Profit at buyer offer divided by buyer offer."
              />
              <ResultCard
                label="Offer ROI"
                value={`${results.offerRoi.toFixed(1)}%`}
                tone={results.offerRoi >= 100 ? "green" : "yellow"}
                text="Offer profit compared with profit lost from discounting."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The buyer offer of <strong>{formatMoney(buyerOffer)}</strong>{" "}
                creates an estimated profit of{" "}
                <strong>{formatMoney(results.profitAtBuyerOffer)}</strong>. Your
                minimum acceptable price for the target profit is about{" "}
                <strong>{formatMoney(results.minimumAcceptablePrice)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Acceptable"
                  ? "The buyer offer appears acceptable under the entered assumptions."
                  : results.status === "Counter"
                    ? "The offer is profitable, but below your minimum target. A counteroffer may make more sense."
                    : results.status === "Thin"
                      ? "The offer leaves very thin profit after costs and local selling pressure."
                      : "The buyer offer appears to lose money under the entered assumptions."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Offer discount scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Discount</th>
                      <th className="border px-3 py-2">Offer price</th>
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
                          {formatMoney(row.offerPrice)}
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
                              row.status === "Acceptable"
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
            How to use this Facebook Marketplace Offer ROI Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter prices"
              text="Add list price, buyer offer, and possible counteroffer."
            />
            <InfoCard
              title="Add costs"
              text="Include item cost, packaging, delivery, shipping, time, and refund allowance."
            />
            <InfoCard
              title="Set profit floor"
              text="Enter the minimum profit required to make the sale worthwhile."
            />
            <InfoCard
              title="Review decision"
              text="Use the results to accept, counter, reject, or wait for a stronger buyer."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace offer breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the numbers behind the buyer offer estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="List price" value={formatMoney(listPrice)} />
              <Breakdown label="Buyer offer" value={formatMoney(buyerOffer)} />
              <Breakdown label="Counteroffer" value={formatMoney(counterOffer)} />
              <Breakdown label="Base costs" value={formatMoney(results.baseCosts)} />
              <Breakdown label="Profit at list price" value={formatMoney(results.profitAtListPrice)} />
              <Breakdown label="Profit at buyer offer" value={formatMoney(results.profitAtBuyerOffer)} />
              <Breakdown label="Profit at counteroffer" value={formatMoney(results.profitAtCounterOffer)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace offer mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Accepting buyer offers before checking item cost, delivery, and time.",
                "Using list price as the profit reference instead of break-even price.",
                "Leaving no negotiation room on items where buyers expect offers.",
                "Countering randomly instead of using a minimum acceptable profit.",
                "Accepting low offers just to move inventory while erasing margin.",
                "Ignoring no-shows, pickup delays, refund risk, and buyer friction.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace offer strategy
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Know your floor"
              text="Calculate the lowest acceptable price before buyer messages arrive."
            />
            <InfoCard
              title="Build offer room"
              text="List with enough margin to accept reasonable local buyer offers."
            />
            <InfoCard
              title="Counter with data"
              text="Use break-even and target profit to guide whether to accept, counter, or reject."
            />
            <InfoCard
              title="Reject weak offers"
              text="Avoid accepting offers that move inventory but damage profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/break-even-calculator" label="Break-Even Calculator" />
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
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
          Included in the offer ROI estimate.
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