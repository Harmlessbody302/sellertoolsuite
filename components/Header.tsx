import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-950">
          SellerToolSuite
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-gray-950">
            Home
          </Link>

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

          <Link href="/facebook-marketplace" className="hover:text-gray-950">
            Facebook Marketplace
          </Link>
        </nav>
      </div>
    </header>
  );
}