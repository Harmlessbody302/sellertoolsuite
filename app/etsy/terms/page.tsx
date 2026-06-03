export default function TermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          SellerToolSuite
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Terms of Use and Disclaimer
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-700">
          SellerToolSuite provides calculators, planning tools, and educational
          resources for online marketplace sellers. By using this website, you
          acknowledge that all calculator outputs are estimates and that business
          decisions remain your responsibility.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Last updated: May 2026
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Acceptance of terms
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          By accessing or using SellerToolSuite, you agree to these terms and
          understand that use of the calculators and guides is entirely at your
          own discretion.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Calculator estimates and accuracy
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          All calculator outputs are estimates generated using the information
          you provide and the assumptions built into each tool.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Marketplace fee structures may change",
            "Shipping and material costs may vary",
            "Taxes, refunds, discounts, and promotions affect real outcomes",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-gray-50 p-4 text-sm font-medium text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-5 leading-8 text-gray-700">
          SellerToolSuite does not guarantee that any estimate will match actual
          marketplace performance, profitability, fees, or financial outcomes.
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-8">
          <h2 className="text-2xl font-bold text-gray-950">
            No professional advice
          </h2>

          <p className="mt-4 leading-8 text-gray-700">
            Content on SellerToolSuite is provided for informational and planning
            purposes only.
          </p>

          <ul className="mt-5 space-y-3 text-gray-700">
            {[
              "Not legal advice",
              "Not tax advice",
              "Not accounting advice",
              "Not financial advice",
              "Not marketplace compliance advice",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-bold text-blue-700">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 leading-8 text-gray-700">
            You should consult qualified professionals for guidance specific to
            your situation.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-8">
          <h2 className="text-2xl font-bold text-gray-950">
            User responsibility
          </h2>

          <p className="mt-4 leading-8 text-gray-700">
            You are solely responsible for:
          </p>

          <ul className="mt-5 space-y-3 text-gray-700">
            {[
              "Verifying all calculations",
              "Checking current marketplace fee structures",
              "Validating assumptions before making business decisions",
              "Reviewing pricing and profitability regularly",
              "Ensuring compliance with platform policies",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-bold text-blue-700">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Marketplace independence
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite is an independent educational resource.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite is not affiliated with, endorsed by, sponsored by, or
          officially connected to Etsy, eBay, Amazon, Shopify, Mercari,
          Facebook Marketplace, Meta, Poshmark, or any other marketplace or
          platform referenced on this website.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          External links and third-party services
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite may include links to external resources, affiliate
          offers, marketplace tools, and third-party websites.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite is not responsible for external website content,
          services, pricing, policies, or business practices.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Limitation of liability
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite and its creator shall not be liable for any direct,
          indirect, incidental, consequential, financial, or business losses
          resulting from reliance on calculator outputs, estimates, guides, or
          website content.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Updates to these terms
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          These terms may be updated as SellerToolSuite evolves, adds new tools,
          or introduces new services.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Contact
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          Questions regarding these terms can be sent to:
        </p>

        <p className="mt-4 text-lg font-semibold text-blue-700">
          contact@sellertoolsuite.com
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-sm leading-7 text-amber-900">
          Use SellerToolSuite calculators as planning aids only. Always verify
          fee structures, pricing assumptions, and marketplace conditions before
          making financial or operational decisions.
        </p>
      </section>
    </main>
  );
}