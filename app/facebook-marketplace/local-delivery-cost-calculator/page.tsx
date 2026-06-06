"use client";

import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red" | "blue";

export default function FacebookMarketplaceLocalDeliveryCostCalculatorPage() {
  const [salePrice, setSalePrice] = useState(80);
  const [itemCost, setItemCost] = useState(35);
  const [deliveryFeeCharged, setDeliveryFeeCharged] = useState(10);
  const [roundTripMiles, setRoundTripMiles] = useState(18);
  const [fuelCostPerMile, setFuelCostPerMile] = useState(0.25);
  const [timeMinutes, setTimeMinutes] = useState(45);
  const [hourlyTimeValue, setHourlyTimeValue] = useState(15);
  const [packagingCost, setPackagingCost] = useState(1);
  const [platformFeeRate, setPlatformFeeRate] = useState(0);
  const [otherCosts, setOtherCosts] = useState(1);
  const [targetProfit, setTargetProfit] = useState(25);

  const results = useMemo(() => {
    const platformFee = salePrice * (platformFeeRate / 100);
    const fuelCost = roundTripMiles * fuelCostPerMile;
    const timeCost = (timeMinutes / 60) * hourlyTimeValue;
    const deliveryCost = fuelCost + timeCost;
    const totalCosts =
      itemCost + packagingCost + platformFee + deliveryCost + otherCosts;

    const totalRevenue = salePrice + deliveryFeeCharged;
    const profitWithDelivery = totalRevenue - totalCosts;
    const profitWithoutDelivery =
      salePrice - itemCost - packagingCost - platformFee - otherCosts;
    const deliveryNet = deliveryFeeCharged - deliveryCost;
    const deliveryMargin =
      deliveryFeeCharged > 0 ? (deliveryNet / deliveryFeeCharged) * 100 : 0;
    const profitMargin =
      totalRevenue > 0 ? (profitWithDelivery / totalRevenue) * 100 : 0;
    const breakEvenDeliveryFee = deliveryCost;
    const deliveryFeeForTarget = Math.max(
      0,
      targetProfit + totalCosts - salePrice
    );
    const extraFeeNeeded = Math.max(0, deliveryFeeForTarget - deliveryFeeCharged);
    const profitDifference = profitWithDelivery - profitWithoutDelivery;

    let status = "Healthy";
    if (profitWithDelivery < 0) status = "Losing";
    else if (profitWithDelivery < targetProfit * 0.5) status = "Thin";
    else if (profitWithDelivery < targetProfit) status = "Watch";

    return {
      platformFee,
      fuelCost,
      timeCost,
      deliveryCost,
      totalCosts,
      totalRevenue,
      profitWithDelivery,
      profitWithoutDelivery,
      deliveryNet,
      deliveryMargin,
      profitMargin,
      breakEvenDeliveryFee,
      deliveryFeeForTarget,
      extraFeeNeeded,
      profitDifference,
      status,
    };
  }, [
    salePrice,
    itemCost,
    deliveryFeeCharged,
    roundTripMiles,
    fuelCostPerMile,
    timeMinutes,
    hourlyTimeValue,
    packagingCost,
    platformFeeRate,
    otherCosts,
    targetProfit,
  ]);

  const statusTone: Tone =
    results.status === "Healthy"
      ? "green"
      : results.status === "Losing"
        ? "red"
        : "yellow";

  const scenarioRows = [0, 5, 10, 15, 20, 25, 30].map((deliveryFee) => {
    const totalRevenue = salePrice + deliveryFee;
    const profit = totalRevenue - results.totalCosts;
    const deliveryNet = deliveryFee - results.deliveryCost;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) status = "Losing";
    else if (profit < targetProfit * 0.5) status = "Thin";
    else if (profit < targetProfit) status = "Watch";

    return {
      deliveryFee,
      deliveryNet,
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
          Facebook Marketplace Local Delivery Cost Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether Facebook Marketplace local delivery is worth offering
          after mileage, fuel, time, delivery fee, item cost, packaging, platform
          fees, and target profit are included.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Delivery inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter sale price, item cost, delivery fee, miles, fuel cost, time
              value, fees, and target profit to estimate local delivery profit.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Sale price" value={salePrice} onChange={setSalePrice} />
              <MoneyInput label="Item cost" value={itemCost} onChange={setItemCost} />
              <MoneyInput label="Delivery fee charged" value={deliveryFeeCharged} onChange={setDeliveryFeeCharged} />
              <NumberInput label="Round-trip miles" value={roundTripMiles} onChange={setRoundTripMiles} suffix="mi" />
              <MoneyInput label="Fuel cost per mile" value={fuelCostPerMile} onChange={setFuelCostPerMile} />
              <NumberInput label="Delivery time" value={timeMinutes} onChange={setTimeMinutes} suffix="min" />
              <MoneyInput label="Hourly time value" value={hourlyTimeValue} onChange={setHourlyTimeValue} />
              <MoneyInput label="Packaging cost" value={packagingCost} onChange={setPackagingCost} />
              <NumberInput label="Platform fee rate" value={platformFeeRate} onChange={setPlatformFeeRate} suffix="%" />
              <MoneyInput label="Other costs" value={otherCosts} onChange={setOtherCosts} />
              <MoneyInput label="Target profit" value={targetProfit} onChange={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Facebook Marketplace
              delivery time, buyer reliability, traffic, fuel cost, pickup or
              drop-off risk, payment terms, and local selling results may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Estimated Facebook Marketplace local delivery profitability.
                </p>
              </div>

              <StatusBadge tone={statusTone} label={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                label="Profit with delivery"
                value={formatMoney(results.profitWithDelivery)}
                tone={results.profitWithDelivery >= targetProfit ? "green" : "yellow"}
                text="Revenue after item cost, delivery cost, packaging, fees, and other costs."
              />
              <ResultCard
                label="Delivery net"
                value={formatMoney(results.deliveryNet)}
                tone={results.deliveryNet >= 0 ? "green" : "yellow"}
                text="Delivery fee charged minus fuel and time cost."
              />
              <ResultCard
                label="Fuel cost"
                value={formatMoney(results.fuelCost)}
                tone="blue"
                text="Round-trip miles multiplied by fuel cost per mile."
              />
              <ResultCard
                label="Time cost"
                value={formatMoney(results.timeCost)}
                tone="blue"
                text="Delivery time multiplied by hourly time value."
              />
              <ResultCard
                label="Total delivery cost"
                value={formatMoney(results.deliveryCost)}
                tone="yellow"
                text="Fuel cost plus estimated time cost."
              />
              <ResultCard
                label="Break-even delivery fee"
                value={formatMoney(results.breakEvenDeliveryFee)}
                tone="yellow"
                text="Approximate delivery fee needed to cover fuel and time."
              />
              <ResultCard
                label="Profit without delivery"
                value={formatMoney(results.profitWithoutDelivery)}
                tone="blue"
                text="Estimated profit if the buyer picked up instead."
              />
              <ResultCard
                label="Profit difference"
                value={formatMoney(results.profitDifference)}
                tone={results.profitDifference >= 0 ? "green" : "yellow"}
                text="Extra profit or loss created by offering delivery."
              />
              <ResultCard
                label="Profit margin"
                value={`${results.profitMargin.toFixed(1)}%`}
                tone={results.profitMargin >= 30 ? "green" : "yellow"}
                text="Profit with delivery divided by total revenue."
              />
              <ResultCard
                label="Delivery fee for target"
                value={formatMoney(results.deliveryFeeForTarget)}
                tone="green"
                text="Estimated delivery fee needed to reach target profit."
              />
              <ResultCard
                label="Extra fee needed"
                value={formatMoney(results.extraFeeNeeded)}
                tone={results.extraFeeNeeded === 0 ? "green" : "yellow"}
                text="Additional delivery fee needed to reach target profit."
              />
              <ResultCard
                label="Total revenue"
                value={formatMoney(results.totalRevenue)}
                tone="blue"
                text="Sale price plus delivery fee charged."
              />
            </div>

            <section className="mt-6 rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Delivery is estimated to cost{" "}
                <strong>{formatMoney(results.deliveryCost)}</strong> after fuel
                and time. At the entered delivery fee, delivery net is{" "}
                <strong>{formatMoney(results.deliveryNet)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "Local delivery appears profitable under the entered assumptions."
                  : results.status === "Watch"
                    ? "Delivery is profitable, but it does not fully reach your target profit."
                    : results.status === "Thin"
                      ? "Delivery creates weak profit after fuel, time, and costs."
                      : "Delivery appears to lose money under the entered assumptions."}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="font-bold">Delivery fee scenario comparison</h3>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border bg-slate-100 text-left">
                      <th className="border px-3 py-2">Delivery fee</th>
                      <th className="border px-3 py-2">Delivery net</th>
                      <th className="border px-3 py-2">Profit</th>
                      <th className="border px-3 py-2">Margin</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioRows.map((row) => (
                      <tr key={row.deliveryFee} className="border">
                        <td className="border px-3 py-2">{formatMoney(row.deliveryFee)}</td>
                        <td className="border px-3 py-2">{formatMoney(row.deliveryNet)}</td>
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
            How to use this Facebook Marketplace Local Delivery Cost Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Enter sale info"
              text="Add sale price, item cost, packaging, fees, and other selling costs."
            />
            <InfoCard
              title="Add delivery"
              text="Enter round-trip mileage, fuel cost, delivery time, and time value."
            />
            <InfoCard
              title="Set delivery fee"
              text="Add what you plan to charge the buyer for local delivery."
            />
            <InfoCard
              title="Review profit"
              text="Check whether delivery improves profit or only adds unpaid work."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Facebook Marketplace delivery cost breakdown
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review the major values behind the local delivery estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Round-trip miles" value={`${roundTripMiles.toFixed(1)} mi`} />
              <Breakdown label="Fuel cost" value={formatMoney(results.fuelCost)} />
              <Breakdown label="Delivery time" value={`${timeMinutes.toFixed(0)} min`} />
              <Breakdown label="Time cost" value={formatMoney(results.timeCost)} />
              <Breakdown label="Total delivery cost" value={formatMoney(results.deliveryCost)} />
              <Breakdown label="Delivery fee charged" value={formatMoney(deliveryFeeCharged)} />
              <Breakdown label="Delivery net" value={formatMoney(results.deliveryNet)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Facebook Marketplace delivery mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Offering delivery for free without checking fuel and time cost.",
                "Only counting fuel and ignoring the time spent driving or waiting.",
                "Driving too far for low-margin items.",
                "Letting buyers change delivery details without adjusting the fee.",
                "Forgetting traffic, parking, pickup delays, and no-show risk.",
                "Using delivery to save weak listings that should be repriced or skipped.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Facebook Marketplace delivery profit
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              title="Set a minimum fee"
              text="Do not offer delivery unless the fee covers fuel, time, and inconvenience."
            />
            <InfoCard
              title="Limit distance"
              text="Keep delivery radius small unless the sale price and profit justify the trip."
            />
            <InfoCard
              title="Bundle deliveries"
              text="Deliver only when multiple items or higher-value orders make the trip worthwhile."
            />
            <InfoCard
              title="Prefer pickup"
              text="Use pickup for low-margin items where delivery would erase profit."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">
            Related Facebook Marketplace seller tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/facebook-marketplace/profit-calculator" label="Profit Calculator" />
            <Related href="/facebook-marketplace/shipping-profit-calculator" label="Shipping Profit Calculator" />
            <Related href="/facebook-marketplace/pricing-calculator" label="Pricing Calculator" />
            <Related href="/facebook-marketplace/negotiation-calculator" label="Negotiation Calculator" />
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
          Included in the local delivery estimate.
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