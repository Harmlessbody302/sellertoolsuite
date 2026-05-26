import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-gray-950">
              SellerToolSuite
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Free calculators and planning tools for Etsy sellers and online
              marketplace sellers.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-950">Live Tools</p>

            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/etsy/profit-calculator">Etsy Profit Calculator</Link>
              <Link href="/etsy/fee-calculator">Etsy Fee Calculator</Link>
              <Link href="/etsy/pricing-calculator">Etsy Pricing Calculator</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-950">Platforms</p>

            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/etsy">Etsy</Link>
              <Link href="/ebay">eBay</Link>
              <Link href="/amazon">Amazon</Link>
              <Link href="/shopify">Shopify</Link>
              <Link href="/mercari">Mercari</Link>
              <Link href="/poshmark">Poshmark</Link>
              <Link href="/facebook-marketplace">Facebook Marketplace</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-950">Site</p>

            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/etsy/about">About</Link>
              <Link href="/etsy/privacy-policy">Privacy Policy</Link>
              <Link href="/etsy/terms">Terms / Disclaimer</Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs leading-5 text-gray-500">
          SellerToolSuite is not affiliated with Etsy, eBay, Amazon, Shopify,
          Mercari, Poshmark, Facebook, Meta, or any marketplace listed.
          Calculators are estimates for planning purposes only. Actual fees,
          taxes, payment processing fees, ad charges, refunds, and other costs
          may vary.
        </p>
      </div>
    </footer>
  );
}