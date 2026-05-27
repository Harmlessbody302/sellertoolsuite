"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import {
  calculateEtsyFees,
  defaultEtsyFeeSettings,
  toMoney,
  toPercent,
} from "@/lib/etsyCalculations";

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
          Estimate Etsy listing fees, transaction fees, payment processing fees,
          optional offsite ad fees, and payout before product costs.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Sale inputs</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Item price"
              prefix="$"
              value={itemPrice}
              onChange={setItemPrice}
            />

            <NumberInput
              label="Shipping charged to buyer"
              prefix="$"
              value={shippingCharged}
              onChange={setShippingCharged}
            />

            <NumberInput
              label="Quantity sold"
              value={quantity}
              onChange={setQuantity}
              step={1}
            />
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
            This calculator estimates Etsy-related selling fees only. It does
            not subtract product cost, shipping cost, packaging cost, labor,
            taxes, refunds, or other business expenses.
          </div>
        </section>

        <section className="space-y-4">
          <ResultCard
            label="Total estimated fees"
            value={toMoney(result.totalFees)}
          />

          <ResultCard
            label="Effective fee rate"
            value={toPercent(result.effectiveFeeRate)}
          />

          <ResultCard
            label="Gross revenue"
            value={toMoney(result.grossRevenue)}
          />

          <ResultCard
            label="Listing fees"
            value={toMoney(result.listingFees)}
          />

          <ResultCard
            label="Transaction fee"
            value={toMoney(result.transactionFee)}
          />

          <ResultCard
            label="Payment processing fee"
            value={toMoney(result.paymentProcessingFee)}
          />

          <ResultCard
            label="Offsite ads fee"
            value={toMoney(result.offsiteAdsFee)}
          />

          <ResultCard
            label="Revenue after Etsy/payment fees"
            value={toMoney(result.payoutBeforeCosts)}
          />
        </section>
      </div>

      <section className="mt-12 max-w-3xl leading-7 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-950">
          How this Etsy fee calculator works
        </h2>

        <p className="mt-4">
          This calculator starts with the item price, shipping charged to the
          buyer, and quantity sold. It then estimates listing fees, transaction
          fees, payment processing fees, and optional offsite ad fees.
        </p>

        <p className="mt-4">
          Use the Etsy Profit Calculator if you also want to subtract product
          costs, shipping costs, packaging, labor, and other expenses.
        </p>
      </section>
    </main>
  );
}