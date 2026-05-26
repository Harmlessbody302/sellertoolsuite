import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="text-lg font-bold text-gray-950">
              SellerToolSuite
            </Link>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Free calculators, guides, and planning tools for and
              online marketplace sellers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-gray-950">Platforms</p>

              <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
                <Link href="/etsy" className="hover:text-gray-950">
                  Etsy
                </Link>
                <Link href="/ebay" className="hover:text-gray-950">
                  eBay
                </Link>
                <Link href="/amazon" className="hover:text-gray-950">
                  Amazon
                </Link>
                <Link href="/shopify" className="hover:text-gray-950">
                  Shopify
                </Link>
                <Link href="/mercari" className="hover:text-gray-950">
                  Mercari
                </Link>
                <Link href="/poshmark" className="hover:text-gray-950">
                  Poshmark
                </Link>
                <Link
                  href="/facebook-marketplace"
                  className="hover:text-gray-950 sm:col-span-2"
                >
                  Facebook Marketplace
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-950">Site</p>

              <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
                <Link href="/etsy/about" className="hover:text-gray-950">
                  About
                </Link>
                <Link
                  href="/etsy/privacy-policy"
                  className="hover:text-gray-950"
                >
                  Privacy Policy
                </Link>
                <Link href="/etsy/terms" className="hover:text-gray-950">
                  Terms / Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t pt-5 text-xs leading-6 text-gray-500">
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