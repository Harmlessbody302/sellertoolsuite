"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import {
  calculateEtsyProfit,
  defaultEtsyFeeSettings,
  toMoney,
  toPercent,
} from "@/lib/etsyCalculations";

export default function EtsyProfitCalculatorPage() {
  const [itemPrice, setItemPrice] = useState(25);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [productCost, setProductCost] = useState(6);
  const [shippingCost, setShippingCost] = useState(4);
  const [packagingCost, setPackagingCost] = useState(1);
  const [laborCost, setLaborCost] = useState(5);
  const [otherCost, setOtherCost] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [discountPercent, setDiscountPercent] = useState(0);

  const result = useMemo(() => {
    return calculateEtsyProfit({
      itemPrice,
      shippingCharged,
      productCost,
      shippingCost,
      packagingCost,
      laborCost,
      otherCost,
      quantity,
      discountRate: discountPercent / 100,
      feeSettings: defaultEtsyFeeSettings,
    });
  }, [
    itemPrice,
    shippingCharged,
    productCost,
    shippingCost,
    packagingCost,
    laborCost,
    otherCost,
    quantity,
    discountPercent,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Etsy Seller Tools
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Etsy Profit Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estimate your Etsy profit after fees, product costs, shipping,
          packaging, labor, and discounts.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Product inputs</h2>

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
              label="Quantity sold"
              value={quantity}
              onChange={setQuantity}
              step={1}
            />

            <NumberInput
              label="Discount"
              suffix="%"
              value={discountPercent}
              onChange={setDiscountPercent}
            />
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This calculator provides estimates only. Actual Etsy fees, taxes,
            ad charges, refunds, and payment processing fees may vary.
          </div>
        </section>

        <section className="space-y-4">
          <ResultCard
            label="Estimated net profit"
            value={toMoney(result.netProfit)}
          />

          <ResultCard
            label="Profit margin"
            value={toPercent(result.profitMargin)}
          />

          <ResultCard
            label="Profit per unit"
            value={toMoney(result.profitPerUnit)}
          />

          <ResultCard
            label="Gross revenue"
            value={toMoney(result.grossRevenue)}
          />

          <ResultCard
            label="Revenue after discount"
            value={toMoney(result.discountedRevenue)}
          />

          <ResultCard
            label="Total Etsy/payment fees"
            value={toMoney(result.totalFees)}
          />

         <ResultCard label="Total combined costs (including fees)" value={toMoney(result.totalCosts)} />
        </section>
      </div>

      <section className="mt-12 max-w-3xl leading-7 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-950">
          How this Etsy profit calculator works
        </h2>

        <p className="mt-4">
          This calculator starts with your item price and shipping charged to the
          buyer, then subtracts estimated Etsy fees, payment processing fees,
          product costs, shipping costs, packaging costs, labor, and other
          expenses.
        </p>
      </section>
    </main>
  );
}