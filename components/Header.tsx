import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-950">
          SellerToolSuite
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-gray-950">
            Home
          </Link>

          <Link href="/etsy/profit-calculator" className="hover:text-gray-950">
            Profit Calculator
          </Link>

          <Link href="/etsy/fee-calculator" className="hover:text-gray-950">
            Fee Calculator
          </Link>

          <Link href="/etsy/pricing-calculator" className="hover:text-gray-950">
            Pricing Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}