"use client";

import { useMemo, useState } from "react";

export default function AmazonPpcRoiCalculator() {
  const [salePrice, setSalePrice] = useState("35");
  const [productCost, setProductCost] = useState("10");
  const [amazonFees, setAmazonFees] = useState("10.90");
  const [adSpendPerSale, setAdSpendPerSale] = useState("4");
  const [conversionRate, setConversionRate] = useState("12");
  const [clickCost, setClickCost] = useState("0.48");
  const [organicSalesLift, setOrganicSalesLift] = useState("20");

  const result = useMemo(() => {
    const sale = Number(salePrice) || 0;
    const cost = Number(productCost) || 0;
    const fees = Number(amazonFees) || 0;
    const adSpend = Number(adSpendPerSale) || 0;
    const conversion = Number(conversionRate) || 1;
    const cpc = Number(clickCost) || 0;
    const lift = Number(organicSalesLift) || 0;

    const profitBeforeAds = sale - cost - fees;
    const netProfit = profitBeforeAds - adSpend;

    const acos = sale > 0 ? (adSpend / sale) * 100 : 0;
    const tacos =
      sale > 0
        ? ((adSpend * (100 / (100 + lift))) / sale) * 100
        : 0;

    const roi =
      adSpend > 0 ? (netProfit / adSpend) * 100 : 0;

    const clicksPerSale = 100 / conversion;
    const breakEvenCpc =
      clicksPerSale > 0
        ? profitBeforeAds / clicksPerSale
        : 0;

    let status = "Healthy";

    if (roi >= 100) status = "Strong";
    else if (roi < 25) status = "Weak";

    const scenarios = [
      { label: "-20% ad spend", spend: adSpend * 0.8 },
      { label: "Current", spend: adSpend },
      { label: "+20% ad spend", spend: adSpend * 1.2 },
      { label: "+40% ad spend", spend: adSpend * 1.4 },
    ].map((s) => {
      const profit = profitBeforeAds - s.spend;
      const scenarioRoi =
        s.spend > 0 ? (profit / s.spend) * 100 : 0;

      let scenarioStatus = "Healthy";
      if (scenarioRoi >= 100) scenarioStatus = "Strong";
      else if (scenarioRoi < 25) scenarioStatus = "Weak";

      return {
        ...s,
        profit,
        roi: scenarioRoi,
        status: scenarioStatus,
      };
    });

    return {
      profitBeforeAds,
      netProfit,
      acos,
      tacos,
      roi,
      breakEvenCpc,
      status,
      scenarios,
    };
  }, [
    salePrice,
    productCost,
    amazonFees,
    adSpendPerSale,
    conversionRate,
    clickCost,
    organicSalesLift,
  ]);

  const money = (n: number) =>
    `$${n.toFixed(2)}`;

  const percent = (n: number) =>
    `${n.toFixed(1)}%`;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Amazon Seller Tool
        </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight text-slate-900">
          Amazon PPC ROI Calculator
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Measure Amazon ad profitability using ACoS, TACoS, ROI,
          break-even CPC, and ad spend scenarios.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-3xl font-semibold">
              PPC details
            </h2>

            <Input label="Sale price" value={salePrice} setValue={setSalePrice} prefix="$" />
            <Input label="Product cost" value={productCost} setValue={setProductCost} prefix="$" />
            <Input label="Amazon fees" value={amazonFees} setValue={setAmazonFees} prefix="$" />
            <Input label="Ad spend per sale" value={adSpendPerSale} setValue={setAdSpendPerSale} prefix="$" />
            <Input label="Conversion rate" value={conversionRate} setValue={setConversionRate} suffix="%" />
            <Input label="Average click cost" value={clickCost} setValue={setClickCost} prefix="$" />
            <Input label="Organic sales lift" value={organicSalesLift} setValue={setOrganicSalesLift} suffix="%" />
          </section>

          <section className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="mb-6 flex justify-between">
              <h2 className="text-3xl font-semibold">Results</h2>
              <Status status={result.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card label="Net profit after ads" value={money(result.netProfit)} good />
              <Card label="Ad ROI" value={percent(result.roi)} good />
              <Card label="ACoS" value={percent(result.acos)} />
              <Card label="TACoS" value={percent(result.tacos)} />
              <Card label="Break-even CPC" value={money(result.breakEvenCpc)} warning />
              <Card label="Profit before ads" value={money(result.profitBeforeAds)} />
            </div>

            <div className="mt-8 rounded-2xl bg-slate-100 p-6">
              <h3 className="text-xl font-semibold">
                What this means
              </h3>

              <p className="mt-3 text-slate-700">
                Current ad ROI is{" "}
                <strong>{percent(result.roi)}</strong>.
                Break-even CPC is{" "}
                <strong>{money(result.breakEvenCpc)}</strong>.
              </p>

              <p className="mt-2 text-slate-700">
                ACoS is <strong>{percent(result.acos)}</strong>
                , while TACoS is{" "}
                <strong>{percent(result.tacos)}</strong>.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-semibold">
                Ad spend comparison
              </h3>

              <table className="w-full overflow-hidden rounded-xl border text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3">Scenario</th>
                    <th className="p-3">Spend</th>
                    <th className="p-3">Profit</th>
                    <th className="p-3">ROI</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.scenarios.map((s) => (
                    <tr key={s.label} className="border-t">
                      <td className="p-3">{s.label}</td>
                      <td className="p-3">{money(s.spend)}</td>
                      <td className="p-3">{money(s.profit)}</td>
                      <td className="p-3">{percent(s.roi)}</td>
                      <td className="p-3">
                        <Status status={s.status} small />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Input({ label, value, setValue, prefix, suffix }: any) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-medium">{label}</label>
      <div className="flex overflow-hidden rounded-xl border">
        {prefix && <span className="bg-slate-100 px-4 py-3">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-3 outline-none"
        />
        {suffix && <span className="bg-slate-100 px-4 py-3">{suffix}</span>}
      </div>
    </div>
  );
}

function Card({ label, value, good, warning }: any) {
  return (
    <div className={`rounded-xl border p-5 ${
      good
        ? "border-green-300 bg-green-50"
        : warning
        ? "border-yellow-300 bg-yellow-50"
        : "bg-slate-50"
    }`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function Status({ status, small }: any) {
  const colors =
    status === "Strong"
      ? "bg-green-100 text-green-700"
      : status === "Weak"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`rounded-full px-4 py-2 font-semibold ${colors} ${small ? "text-xs" : ""}`}>
      {status}
    </span>
  );
}