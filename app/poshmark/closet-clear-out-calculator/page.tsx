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

export default function PoshmarkClosetClearOutCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState(50);
  const [droppedPrice, setDroppedPrice] = useState(42);
  const [itemCost, setItemCost] = useState(14);
  const [packagingCost, setPackagingCost] = useState(1.25);
  const [sellerFeeRate, setSellerFeeRate] = useState(20);
  const [flatFeeThreshold, setFlatFeeThreshold] = useState(15);
  const [flatFee, setFlatFee] = useState(2.95);
  const [expectedExtraSales, setExpectedExtraSales] = useState(3);
  const [normalExpectedSales, setNormalExpectedSales] = useState(1);
  const [relistCost, setRelistCost] = useState(1);
  const [storageCost, setStorageCost] = useState(0.5);
  const [refundAllowance, setRefundAllowance] = useState(1);
  const [targetProfit, setTargetProfit] = useState(12);

  const results = useMemo(() => {
    const originalFee =
      originalPrice < flatFeeThreshold
        ? Math.min(flatFee, originalPrice)
        : originalPrice * (sellerFeeRate / 100);

    const droppedFee =
      droppedPrice < flatFeeThreshold
        ? Math.min(flatFee, droppedPrice)
        : droppedPrice * (sellerFeeRate / 100);

    const originalProfit =
      originalPrice - itemCost - packagingCost - originalFee - refundAllowance;

    const droppedProfit =
      droppedPrice - itemCost - packagingCost - droppedFee - refundAllowance;

    const priceDropAmount = Math.max(0, originalPrice - droppedPrice);
    const priceDropPercent =
      originalPrice > 0 ? (priceDropAmount / originalPrice) * 100 : 0;

    const profitLostPerSale = originalProfit - droppedProfit;

    const normalProfit = normalExpectedSales * originalProfit;
    const clearOutProfit =
      expectedExtraSales * droppedProfit - relistCost - storageCost;

    const incrementalProfit = clearOutProfit - normalProfit;
    const extraSalesNeeded =
      droppedProfit > 0
        ? Math.ceil((normalProfit + relistCost + storageCost) / droppedProfit)
        : 0;

    const revenueAtDroppedPrice = expectedExtraSales * droppedPrice;
    const marginAfterDrop =
      droppedPrice > 0 ? (droppedProfit / droppedPrice) * 100 : 0;

    const breakEvenDroppedPrice =
      itemCost +
      packagingCost +
      refundAllowance +
      (droppedPrice < flatFeeThreshold ? flatFee : 0);

    const priceForTarget =
      droppedPrice < flatFeeThreshold
        ? itemCost + packagingCost + refundAllowance + flatFee + targetProfit
        : (itemCost + packagingCost + refundAllowance + targetProfit) /
          (1 - sellerFeeRate / 100);

    let status: Status = "Healthy";
    if (droppedProfit < 0 || clearOutProfit < 0) status = "Losing";
    else if (droppedProfit < targetProfit * 0.5) status = "Thin";
    else if (droppedProfit < targetProfit || incrementalProfit < 0) status = "Watch";

    const scenarios = [0, 5, 10, 15, 20, 25, 30].map((dropPercent) => {
      const scenarioPrice = originalPrice * (1 - dropPercent / 100);
      const scenarioFee =
        scenarioPrice < flatFeeThreshold
          ? Math.min(flatFee, scenarioPrice)
          : scenarioPrice * (sellerFeeRate / 100);

      const scenarioProfit =
        scenarioPrice - itemCost - packagingCost - scenarioFee - refundAllowance;

      const scenarioClearOutProfit =
        expectedExtraSales * scenarioProfit - relistCost - storageCost;

      let scenarioStatus: Status = "Healthy";
      if (scenarioProfit < 0 || scenarioClearOutProfit < 0) scenarioStatus = "Losing";
      else if (scenarioProfit < targetProfit * 0.5) scenarioStatus = "Thin";
      else if (scenarioProfit < targetProfit) scenarioStatus = "Watch";

      return {
        dropPercent,
        scenarioPrice,
        scenarioProfit,
        scenarioClearOutProfit,
        status: scenarioStatus,
      };
    });

    return {
      originalFee,
      droppedFee,
      originalProfit,
      droppedProfit,
      priceDropAmount,
      priceDropPercent,
      profitLostPerSale,
      normalProfit,
      clearOutProfit,
      incrementalProfit,
      extraSalesNeeded,
      revenueAtDroppedPrice,
      marginAfterDrop,
      breakEvenDroppedPrice,
      priceForTarget,
      status,
      scenarios,
    };
  }, [
    originalPrice,
    droppedPrice,
    itemCost,
    packagingCost,
    sellerFeeRate,
    flatFeeThreshold,
    flatFee,
    expectedExtraSales,
    normalExpectedSales,
    relistCost,
    storageCost,
    refundAllowance,
    targetProfit,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          Poshmark Seller Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Poshmark Closet Clear Out Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Estimate whether a Closet Clear Out price drop can create enough extra
          sales to protect profit after item cost, Poshmark fees, packaging,
          refund allowance, relisting effort, and storage pressure.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Closet Clear Out inputs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter original price, dropped price, item economics, expected sales
              lift, fees, relist cost, storage cost, and target profit.
            </p>

            <div className="mt-5 space-y-4">
              <MoneyInput label="Original price" value={originalPrice} setValue={setOriginalPrice} />
              <MoneyInput label="Dropped price" value={droppedPrice} setValue={setDroppedPrice} />
              <MoneyInput label="Item cost" value={itemCost} setValue={setItemCost} />
              <MoneyInput label="Packaging cost" value={packagingCost} setValue={setPackagingCost} />
              <PercentInput label="Poshmark fee rate" value={sellerFeeRate} setValue={setSellerFeeRate} />
              <MoneyInput label="Flat fee threshold" value={flatFeeThreshold} setValue={setFlatFeeThreshold} />
              <MoneyInput label="Flat fee" value={flatFee} setValue={setFlatFee} />
              <NumberInput label="Expected CCO sales" value={expectedExtraSales} setValue={setExpectedExtraSales} />
              <NumberInput label="Normal expected sales" value={normalExpectedSales} setValue={setNormalExpectedSales} />
              <MoneyInput label="Relist/listing cost" value={relistCost} setValue={setRelistCost} />
              <MoneyInput label="Storage cost" value={storageCost} setValue={setStorageCost} />
              <MoneyInput label="Refund allowance" value={refundAllowance} setValue={setRefundAllowance} />
              <MoneyInput label="Target profit" value={targetProfit} setValue={setTargetProfit} />
            </div>

            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              This calculator is an estimate. Actual Poshmark Closet Clear Out
              timing, buyer behavior, shipping incentives, fee treatment, and
              sale outcomes may vary.
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Results</h2>
                <p className="text-sm text-slate-600">
                  Estimated Poshmark Closet Clear Out profitability.
                </p>
              </div>
              <StatusBadge status={results.status} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ResultCard
                tone="green"
                title="Profit after price drop"
                value={money(results.droppedProfit)}
                text="Profit per sale after the Closet Clear Out price drop."
              />
              <ResultCard
                tone="blue"
                title="Original profit"
                value={money(results.originalProfit)}
                text="Estimated profit before the price drop."
              />
              <ResultCard
                tone="yellow"
                title="Price drop amount"
                value={money(results.priceDropAmount)}
                text="Dollar reduction from original price to dropped price."
              />
              <ResultCard
                tone="yellow"
                title="Price drop percent"
                value={pct(results.priceDropPercent)}
                text="Price drop as a share of original price."
              />
              <ResultCard
                tone="yellow"
                title="Profit lost per sale"
                value={money(results.profitLostPerSale)}
                text="Profit reduction caused by the lower sale price."
              />
              <ResultCard
                tone="green"
                title="Closet Clear Out profit"
                value={money(results.clearOutProfit)}
                text="Estimated total profit from expected CCO sales."
              />
              <ResultCard
                tone="blue"
                title="Normal profit"
                value={money(results.normalProfit)}
                text="Estimated profit without the Closet Clear Out lift."
              />
              <ResultCard
                tone="yellow"
                title="Incremental profit"
                value={money(results.incrementalProfit)}
                text="Closet Clear Out profit compared with normal expected profit."
              />
              <ResultCard
                tone="blue"
                title="Revenue at dropped price"
                value={money(results.revenueAtDroppedPrice)}
                text="Expected CCO sales multiplied by dropped price."
              />
              <ResultCard
                tone="green"
                title="Margin after drop"
                value={pct(results.marginAfterDrop)}
                text="Dropped-price profit divided by dropped price."
              />
              <ResultCard
                tone="yellow"
                title="Extra sales needed"
                value={String(results.extraSalesNeeded)}
                text="Estimated CCO sales needed to beat normal expected profit."
              />
              <ResultCard
                tone="yellow"
                title="Price for target profit"
                value={money(results.priceForTarget)}
                text="Dropped price needed to reach the target profit per sale."
              />
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-5">
              <h3 className="font-bold">What this means</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Dropping the price from <strong>{money(originalPrice)}</strong>{" "}
                to <strong>{money(droppedPrice)}</strong> reduces profit by about{" "}
                <strong>{money(results.profitLostPerSale)}</strong> per sale.
                With the expected sales lift, Closet Clear Out profit is
                estimated at <strong>{money(results.clearOutProfit)}</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>{results.status}:</strong>{" "}
                {results.status === "Healthy"
                  ? "The price drop appears profitable under the entered assumptions."
                  : results.status === "Watch"
                    ? "The price drop may work, but profit or incremental return should be watched."
                    : results.status === "Thin"
                      ? "The price drop leaves thin profit after costs and fees."
                      : "The price drop is estimated to lose money under these assumptions."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Price drop scenario comparison</h3>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-2">Drop</th>
                      <th className="px-3 py-2">Dropped price</th>
                      <th className="px-3 py-2">Profit/sale</th>
                      <th className="px-3 py-2">CCO profit</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.scenarios.map((row) => (
                      <tr key={row.dropPercent} className="border-t">
                        <td className="px-3 py-2">{pct(row.dropPercent)}</td>
                        <td className="px-3 py-2">{money(row.scenarioPrice)}</td>
                        <td className="px-3 py-2">{money(row.scenarioProfit)}</td>
                        <td className="px-3 py-2">{money(row.scenarioClearOutProfit)}</td>
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
            How to use this Poshmark Closet Clear Out Calculator
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Enter prices"
              text="Add the original listing price and the proposed Closet Clear Out price."
            />
            <StepCard
              title="Add item costs"
              text="Include item cost, packaging, Poshmark fees, refund allowance, and listing costs."
            />
            <StepCard
              title="Estimate lift"
              text="Compare normal expected sales against expected sales after the price drop."
            />
            <StepCard
              title="Review profit"
              text="Check whether the price drop creates more profit or just lowers margin."
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Closet Clear Out breakdown</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review the numbers behind the Closet Clear Out estimate.
            </p>

            <div className="mt-5 space-y-3">
              <Breakdown label="Original price" value={money(originalPrice)} />
              <Breakdown label="Dropped price" value={money(droppedPrice)} />
              <Breakdown label="Price drop amount" value={money(results.priceDropAmount)} />
              <Breakdown label="Original profit" value={money(results.originalProfit)} />
              <Breakdown label="Dropped profit" value={money(results.droppedProfit)} />
              <Breakdown label="Expected CCO sales" value={String(expectedExtraSales)} />
              <Breakdown label="Normal expected sales" value={String(normalExpectedSales)} />
              <Breakdown label="Incremental profit" value={money(results.incrementalProfit)} />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Common Poshmark Closet Clear Out mistakes
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Dropping prices without checking profit after item cost and Poshmark fees.",
                "Assuming every price drop creates enough extra sales to offset lower margin.",
                "Running Closet Clear Out on weak listings before improving photos, title, or description.",
                "Dropping prices below the minimum acceptable profit floor.",
                "Ignoring stale inventory, storage cost, and relisting alternatives.",
                "Using price drops as the only strategy instead of improving listing quality.",
              ].map((text) => (
                <Warning key={text} text={text} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            Ways to improve Closet Clear Out results
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StepCard
              title="Improve first"
              text="Update photos, title, description, measurements, and condition notes before dropping price."
            />
            <StepCard
              title="Use profit floors"
              text="Know the lowest acceptable price before using a price drop."
            />
            <StepCard
              title="Target stale items"
              text="Use CCO to test older listings instead of cutting strong listings too early."
            />
            <StepCard
              title="Track outcomes"
              text="Compare actual sales and profit after price drops, not just likes or views."
            />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-xl font-bold">Related Poshmark seller tools</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Related href="/poshmark/offer-roi-calculator" label="Offer ROI Calculator" />
            <Related href="/poshmark/pricing-calculator" label="Pricing Calculator" />
            <Related href="/poshmark/profit-calculator" label="Profit Calculator" />
            <Related href="/poshmark/listing-roi-calculator" label="Listing ROI Calculator" />
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
          Included in the Closet Clear Out estimate.
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