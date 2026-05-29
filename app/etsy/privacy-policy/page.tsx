export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          SellerToolSuite
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Privacy Policy
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-700">
          SellerToolSuite provides calculators, planning tools, and educational
          resources for online marketplace sellers. This Privacy Policy explains
          how information may be handled when you use this website.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Last updated: May 2026
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Information you enter into calculators
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite calculators are designed to process your inputs in your
          browser to generate estimates and planning guidance.
        </p>

        <p className="mt-4 leading-8 text-gray-700">
          You should never enter sensitive personal, financial, tax, payment,
          login, or marketplace account information into any calculator or form
          on this website.
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-8">
          <h2 className="text-2xl font-bold text-gray-950">
            Analytics and usage data
          </h2>

          <p className="mt-4 leading-8 text-gray-700">
            SellerToolSuite may use analytics tools to better understand how
            visitors use the site.
          </p>

          <ul className="mt-5 space-y-3 text-gray-700">
            {[
              "Page views",
              "Browser and device type",
              "Referring pages",
              "General geographic region",
              "Popular calculators and guides",
              "Basic site performance metrics",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-bold text-blue-700">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 leading-8 text-gray-700">
            This information is used to improve tools, content quality, and site
            usability.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-8">
          <h2 className="text-2xl font-bold text-gray-950">
            Third-party services
          </h2>

          <p className="mt-4 leading-8 text-gray-700">
            SellerToolSuite may use trusted third-party providers for:
          </p>

          <ul className="mt-5 space-y-3 text-gray-700">
            {[
              "Website hosting",
              "Analytics",
              "Advertising",
              "Affiliate programs",
              "Performance monitoring",
              "Security and infrastructure tools",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-bold text-blue-700">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 leading-8 text-gray-700">
            These services may collect limited technical data according to their
            own privacy policies.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Cookies and browser storage
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite may use cookies or browser storage technologies to:
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Improve calculator usability",
            "Remember interface preferences",
            "Measure site performance",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-gray-50 p-4 text-sm font-medium text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          External links
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          SellerToolSuite may link to external websites, marketplace resources,
          and third-party services. SellerToolSuite is not responsible for the
          privacy practices or content of external websites.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Policy updates
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          This Privacy Policy may be updated as SellerToolSuite evolves, adds new
          tools, or integrates additional services.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-8">
        <h2 className="text-2xl font-bold text-gray-950">
          Contact
        </h2>

        <p className="mt-4 leading-8 text-gray-700">
          Questions regarding this Privacy Policy can be sent to:
        </p>

        <p className="mt-4 text-lg font-semibold text-blue-700">
          harmlessbody302@gmail.com
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-sm leading-7 text-amber-900">
          SellerToolSuite calculators provide planning estimates only and do not
          constitute legal, tax, financial, accounting, or marketplace
          compliance advice.
        </p>
      </section>
    </main>
  );
}