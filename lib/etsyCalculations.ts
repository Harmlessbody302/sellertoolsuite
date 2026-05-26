export type EtsyFeeSettings = {
  listingFee: number;
  transactionFeeRate: number;
  paymentProcessingRate: number;
  paymentProcessingFixedFee: number;
  offsiteAdsRate: number;
};

export type EtsyProfitInput = {
  itemPrice: number;
  shippingCharged: number;
  productCost: number;
  shippingCost: number;
  packagingCost: number;
  laborCost: number;
  otherCost: number;
  quantity: number;
  discountRate: number;
  feeSettings: EtsyFeeSettings;
};

export const defaultEtsyFeeSettings: EtsyFeeSettings = {
  listingFee: 0.2,
  transactionFeeRate: 0.065,
  paymentProcessingRate: 0.03,
  paymentProcessingFixedFee: 0.25,
  offsiteAdsRate: 0,
};

export function toMoney(value: number): string {
  if (!Number.isFinite(value)) {
    return "$0.00";
  }

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function toPercent(value: number): string {
  if (!Number.isFinite(value)) {
    return "0.00%";
  }

  return `${(value * 100).toFixed(2)}%`;
}

export function safeNumber(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return value;
}

export function calculateEtsyProfit(input: EtsyProfitInput) {
  const quantity = Math.max(1, safeNumber(input.quantity));

  const itemPrice = safeNumber(input.itemPrice);
  const shippingCharged = safeNumber(input.shippingCharged);
  const productCost = safeNumber(input.productCost);
  const shippingCost = safeNumber(input.shippingCost);
  const packagingCost = safeNumber(input.packagingCost);
  const laborCost = safeNumber(input.laborCost);
  const otherCost = safeNumber(input.otherCost);
  const discountRate = safeNumber(input.discountRate);

  const settings = input.feeSettings;

  const grossRevenue = (itemPrice + shippingCharged) * quantity;

  const discountAmount = grossRevenue * discountRate;
  const discountedRevenue = grossRevenue - discountAmount;

  const listingFees = settings.listingFee * quantity;

  const transactionFee =
    discountedRevenue * settings.transactionFeeRate;

  const paymentProcessingFee =
    discountedRevenue * settings.paymentProcessingRate +
    settings.paymentProcessingFixedFee * quantity;

  const offsiteAdsFee =
    discountedRevenue * settings.offsiteAdsRate;

  const totalFees =
    listingFees +
    transactionFee +
    paymentProcessingFee +
    offsiteAdsFee;

  const totalNonFeeCosts =
    (productCost +
      shippingCost +
      packagingCost +
      laborCost +
      otherCost) *
    quantity;

  const totalCosts = totalNonFeeCosts + totalFees;

  const netProfit = discountedRevenue - totalCosts;

  const profitMargin =
    discountedRevenue > 0 ? netProfit / discountedRevenue : 0;

  const profitPerUnit = netProfit / quantity;

  return {
    grossRevenue,
    discountedRevenue,
    listingFees,
    transactionFee,
    paymentProcessingFee,
    offsiteAdsFee,
    totalFees,
    totalCosts,
    netProfit,
    profitMargin,
    profitPerUnit,
  };
}
export type EtsyFeeInput = {
  itemPrice: number;
  shippingCharged: number;
  quantity: number;
  feeSettings: EtsyFeeSettings;
};

export function calculateEtsyFees(input: EtsyFeeInput) {
  const quantity = Math.max(1, safeNumber(input.quantity));

  const itemPrice = safeNumber(input.itemPrice);
  const shippingCharged = safeNumber(input.shippingCharged);

  const grossRevenue = (itemPrice + shippingCharged) * quantity;

  const listingFees = input.feeSettings.listingFee * quantity;

  const transactionFee =
    grossRevenue * input.feeSettings.transactionFeeRate;

  const paymentProcessingFee =
    grossRevenue * input.feeSettings.paymentProcessingRate +
    input.feeSettings.paymentProcessingFixedFee * quantity;

  const offsiteAdsFee =
    grossRevenue * input.feeSettings.offsiteAdsRate;

  const totalFees =
    listingFees +
    transactionFee +
    paymentProcessingFee +
    offsiteAdsFee;

  const payoutBeforeCosts = grossRevenue - totalFees;

  const effectiveFeeRate =
    grossRevenue > 0 ? totalFees / grossRevenue : 0;

  return {
    grossRevenue,
    listingFees,
    transactionFee,
    paymentProcessingFee,
    offsiteAdsFee,
    totalFees,
    payoutBeforeCosts,
    effectiveFeeRate,
  };
}
export type EtsyPricingInput = {
  productCost: number;
  shippingCost: number;
  packagingCost: number;
  laborCost: number;
  otherCost: number;
  desiredProfit: number;
  desiredMarginRate: number;
  pricingMode: "profit" | "margin";
  shippingCharged: number;
  feeSettings: EtsyFeeSettings;
};

export function calculateEtsyPrice(input: EtsyPricingInput) {
  const productCost = safeNumber(input.productCost);
  const shippingCost = safeNumber(input.shippingCost);
  const packagingCost = safeNumber(input.packagingCost);
  const laborCost = safeNumber(input.laborCost);
  const otherCost = safeNumber(input.otherCost);
  const shippingCharged = safeNumber(input.shippingCharged);

  const baseCosts =
    productCost +
    shippingCost +
    packagingCost +
    laborCost +
    otherCost;

  const variableFeeRate =
    input.feeSettings.transactionFeeRate +
    input.feeSettings.paymentProcessingRate +
    input.feeSettings.offsiteAdsRate;

  const fixedFees =
    input.feeSettings.listingFee +
    input.feeSettings.paymentProcessingFixedFee;

  let recommendedPrice = 0;

  if (input.pricingMode === "profit") {
    const desiredProfit = safeNumber(input.desiredProfit);

    recommendedPrice =
      (baseCosts + fixedFees + desiredProfit) /
        Math.max(0.01, 1 - variableFeeRate) -
      shippingCharged;
  } else {
    const desiredMarginRate = Math.min(
      safeNumber(input.desiredMarginRate),
      0.95
    );

    recommendedPrice =
      (baseCosts + fixedFees) /
        Math.max(0.01, 1 - variableFeeRate - desiredMarginRate) -
      shippingCharged;
  }

  recommendedPrice = Math.max(0, recommendedPrice);

  const profitResult = calculateEtsyProfit({
    itemPrice: recommendedPrice,
    shippingCharged,
    productCost,
    shippingCost,
    packagingCost,
    laborCost,
    otherCost,
    quantity: 1,
    discountRate: 0,
    feeSettings: input.feeSettings,
  });

  return {
    recommendedPrice,
    ...profitResult,
  };
}