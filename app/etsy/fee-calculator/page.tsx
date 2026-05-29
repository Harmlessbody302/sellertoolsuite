"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateEtsyFees,
  defaultEtsyFeeSettings,
} from "@/lib/etsyCalculations";

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "neutral" | "good" | "blue" | "warning";
}) {
  const tones = {
    neutral: "border-gray-200 bg-gray-50",
    good: "border-emerald-200 bg-emerald-50",
    blue: "border-blue-200 bg-blue-50",
    warning: "border-amber-200 bg-amber-50",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-gray-600">{helper}</p> : null}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>

      <div className="flex overflow-hidden rounded-xl border border-gray-400 bg-white">
        {prefix && (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 outline-none"
        />

        {suffix && (
          <span className="flex items-center bg-gray-100 px-3 text-gray-500">
            {suffix}
          </span>
        )}
      </div>

      {helper && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}
    </label>
  );
}

export default function EtsyFeeCalculatorPage() {
  const [itemPrice, setItemPrice] = useState(25);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [quantity, setQuantity] = useState(1);

  const [listingFee, setListingFee] = useState(0.2);
  const [transactionFeePercent, setTransactionFeePercent] = useState(6.5);
  const [processingPercent, setProcessingPercent] = useState(3);
  const [processingFixedFee, setProcessingFixedFee] = useState(0.25);
  const [offsiteAdsPercent, setOffsiteAdsPercent] = useState(0);

  const result = useMemo(() => {
    return calculateEtsyFees({
      itemPrice,
      shippingCharged,
      quantity,
      feeSettings: {
        ...defaultEtsyFeeSettings,
        listingFee,
        transactionFeeRate: transactionFeePercent / 100,
        paymentProcessingRate: processingPercent / 100,
        paymentProcessingFixedFee: processingFixedFee,
        offsiteAdsRate: offsiteAdsPercent / 100,
      },
    });
  }, [
    itemPrice,
    shippingCharged,
    quantity,
    listingFee,
    transactionFeePercent,
    processingPercent,
    processingFixedFee,
    offsiteAdsPercent,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) =>
    `${(value * 100).toFixed(1)}%`;

  const feeStatus =
    result.effectiveFeeRate < 0.12
      ? "Low"
      : result.effectiveFeeRate < 0.18
        ? "Typical"
        : "High";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Fee Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate Etsy listing, transaction, payment processing, and optional
          offsite ad fees to understand your true payout before product costs.
        </p>
      </section>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <h2 className="text-2xl font-bold">Sale inputs</h2>

          <div className="mt-6 space-y-4">
            <Input
              label="Item price"
              value={itemPrice}
              onChange={setItemPrice}
              prefix="$"
            />

            <Input
              label="Shipping charged"
              value={shippingCharged}
              onChange={setShippingCharged}
              prefix="$"
            />

            <Input
              label="Quantity sold"
              value={quantity}
              onChange={setQuantity}
            />
          </div>

          <h3 className="mt-8 text-xl font-bold">
            Fee assumptions
          </h3>

          <div className="mt-5 space-y-4">
            <Input label="Listing fee" value={listingFee} onChange={setListingFee} prefix="$" />
            <Input label="Transaction fee" value={transactionFeePercent} onChange={setTransactionFeePercent} suffix="%" />
            <Input label="Processing %" value={processingPercent} onChange={setProcessingPercent} suffix="%" />
            <Input label="Processing fixed fee" value={processingFixedFee} onChange={setProcessingFixedFee} prefix="$" />
            <Input label="Offsite ads fee" value={offsiteAdsPercent} onChange={setOffsiteAdsPercent} suffix="%" />
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This estimates Etsy platform-related fees only. Product costs,
            labor, packaging, taxes, refunds, and shipping expenses are not included.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-400 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Etsy fee breakdown at a glance.
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              {feeStatus}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Total estimated fees"
              value={money(result.totalFees)}
              tone="warning"
            />

            <MetricCard
              label="Effective fee rate"
              value={percent(result.effectiveFeeRate)}
              tone="blue"
            />

            <MetricCard
              label="Gross revenue"
              value={money(result.grossRevenue)}
              tone="good"
            />

            <MetricCard
              label="Revenue after fees"
              value={money(result.payoutBeforeCosts)}
              tone="good"
            />

            <MetricCard
              label="Listing fees"
              value={money(result.listingFees)}
            />

            <MetricCard
              label="Transaction fee"
              value={money(result.transactionFee)}
            />

            <MetricCard
              label="Payment processing"
              value={money(result.paymentProcessingFee)}
            />

            <MetricCard
              label="Offsite ads fee"
              value={money(result.offsiteAdsFee)}
            />
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-5">
            <h3 className="font-bold">What this means</h3>

            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              <p>
                Etsy is taking approximately{" "}
                <strong>{percent(result.effectiveFeeRate)}</strong> of gross revenue.
              </p>

              <p>
                Your estimated payout before product costs is{" "}
                <strong>{money(result.payoutBeforeCosts)}</strong>.
              </p>

              <p>
                If your fee rate feels too high, review shipping strategy,
                offsite ad participation, and product pricing.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold">
          How to use this Etsy Fee Calculator
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            ["Enter pricing", "Use your actual listing price and buyer shipping charge."],
            ["Adjust fees", "Match Etsy's current fee structure for your region."],
            ["Test scenarios", "Compare offsite ads and pricing combinations."],
            ["Review payout", "Use final payout to feed into your profit calculator."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold">{title}</p>
              <p className="mt-3 text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold">Common fee mistakes</h2>

          <ul className="mt-5 space-y-3 text-sm text-gray-600">
            <li>Ignoring payment processing fixed fees.</li>
            <li>Forgetting shipping is often fee-applicable.</li>
            <li>Not accounting for offsite ads.</li>
            <li>Pricing too low relative to Etsy fee structure.</li>
            <li>Using revenue instead of payout for profit calculations.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold">Understanding your results</h2>

          <div className="mt-5 space-y-4 text-sm text-gray-600">
            <p><strong className="text-emerald-700">Low:</strong> Efficient fee structure.</p>
            <p><strong className="text-blue-700">Typical:</strong> Normal Etsy seller range.</p>
            <p><strong className="text-amber-700">High:</strong> Review pricing and ad strategy.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold">Related Etsy seller tools</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/etsy/profit-calculator", "Etsy Profit Calculator"],
            ["/etsy/pricing-calculator", "Pricing Calculator"],
            ["/etsy/ad-roi-calculator", "Ad ROI Calculator"],
            ["/etsy/break-even-calculator", "Break-Even Calculator"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}