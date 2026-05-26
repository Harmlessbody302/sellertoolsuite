"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import {
  calculateEtsyPrice,
  defaultEtsyFeeSettings,
  toMoney,
  toPercent,
} from "@/lib/etsyCalculations";

export default function EtsyPricingCalculatorPage() {
  const [pricingMode, setPricingMode] = useState<"profit" | "margin">("profit");

  const [productCost, setProductCost] = useState(6);
  const [shippingCost, setShippingCost] = useState(4);
  const [packagingCost, setPackagingCost] = useState(1);
  const [laborCost, setLaborCost] = useState(5);
  const [otherCost, setOtherCost] = useState(0);
  const [shippingCharged, setShippingCharged] = useState(5);

  const [desiredProfit, setDesiredProfit] = useState(10);
  const [desiredMarginPercent, setDesiredMarginPercent] = useState(30);

  const [listingFee, setListingFee] = useState(0.2);
  const [transactionFeePercent, setTransactionFeePercent] = useState(6.5);
  const [processingPercent, setProcessingPercent] = useState(3);
  const [processingFixedFee, setProcessingFixedFee] = useState(0.25);
  const [offsiteAdsPercent, setOffsiteAdsPercent] = useState(0);

  const result = useMemo(() => {
    return calculateEtsyPrice({
      productCost,
      shippingCost,
      packagingCost,
      laborCost,
      otherCost,
      desiredProfit,
      desiredMarginRate: desiredMarginPercent / 100,
      pricingMode,
      shippingCharged,
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
    productCost,
    shippingCost,
    packagingCost,
    laborCost,
    otherCost,
    desiredProfit,
    desiredMarginPercent,
    pricingMode,
    shippingCharged,
    listingFee,
    transactionFeePercent,
    processingPercent,
    processingFixedFee,
    offsiteAdsPercent,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Pricing Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate what price to charge based on your costs, Etsy fees, desired
          profit, or desired profit margin.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Pricing mode</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPricingMode("profit")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                pricingMode === "profit"
                  ? "bg-blue-700 text-white"
                  : "border bg-white text-gray-950"
              }`}
            >
              Desired dollar profit
            </button>

            <button
              type="button"
              onClick={() => setPricingMode("margin")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                pricingMode === "margin"
                  ? "bg-blue-700 text-white"
                  : "border bg-white text-gray-950"
              }`}
            >
              Desired profit margin
            </button>
          </div>

          <h2 className="mt-8 text-xl font-bold text-gray-950">Cost inputs</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Product/material cost"
              prefix="$"
              value={productCost}
              onChange={setProductCost}
            />

            <NumberInput
              label="Shipping cost paid by seller"
              prefix="$"
              value={shippingCost}
              onChange={setShippingCost}
            />

            <NumberInput
              label="Packaging cost"
              prefix="$"
              value={packagingCost}
              onChange={setPackagingCost}
            />

            <NumberInput
              label="Labor cost"
              prefix="$"
              value={laborCost}
              onChange={setLaborCost}
            />

            <NumberInput
              label="Other cost"
              prefix="$"
              value={otherCost}
              onChange={setOtherCost}
            />

            <NumberInput
              label="Shipping charged to buyer"
              prefix="$"
              value={shippingCharged}
              onChange={setShippingCharged}
            />

            {pricingMode === "profit" ? (
              <NumberInput
                label="Desired profit"
                prefix="$"
                value={desiredProfit}
                onChange={setDesiredProfit}
              />
            ) : (
              <NumberInput
                label="Desired profit margin"
                suffix="%"
                value={desiredMarginPercent}
                onChange={setDesiredMarginPercent}
              />
            )}
          </div>

          <h2 className="mt-8 text-xl font-bold text-gray-950">
            Fee assumptions
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Listing fee"
              prefix="$"
              value={listingFee}
              onChange={setListingFee}
            />

            <NumberInput
              label="Transaction fee"
              suffix="%"
              value={transactionFeePercent}
              onChange={setTransactionFeePercent}
            />

            <NumberInput
              label="Payment processing rate"
              suffix="%"
              value={processingPercent}
              onChange={setProcessingPercent}
            />

            <NumberInput
              label="Payment processing fixed fee"
              prefix="$"
              value={processingFixedFee}
              onChange={setProcessingFixedFee}
            />

            <NumberInput
              label="Offsite ads fee"
              suffix="%"
              value={offsiteAdsPercent}
              onChange={setOffsiteAdsPercent}
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator provides estimates only. Actual Etsy fees, taxes,
            ad charges, refunds, discounts, and payment processing fees may
            vary.
          </div>
        </section>

        <section className="space-y-4">
          <ResultCard
            label="Recommended item price"
            value={toMoney(result.recommendedPrice)}
          />

          <ResultCard
            label="Estimated net profit"
            value={toMoney(result.netProfit)}
          />

          <ResultCard
            label="Estimated profit margin"
            value={toPercent(result.profitMargin)}
          />

          <ResultCard
            label="Estimated total fees"
            value={toMoney(result.totalFees)}
          />

          <ResultCard
            label="Estimated total costs"
            value={toMoney(result.totalCosts)}
          />

          <ResultCard
            label="Gross revenue at recommended price"
            value={toMoney(result.grossRevenue)}
          />
        </section>
      </div>

      <section className="mt-12 max-w-3xl leading-7 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-950">
          How this Etsy pricing calculator works
        </h2>

        <p className="mt-4">
          This calculator works backward from your costs, fee assumptions, and
          target profit. It estimates a selling price that can cover your costs,
          estimated Etsy fees, payment processing fees, and desired profit.
        </p>

        <p className="mt-4">
          The desired dollar profit mode is usually easiest for beginners. The
          profit margin mode is useful if you already know the margin you want
          each product to reach.
        </p>
      </section>
    </main>
  );
}