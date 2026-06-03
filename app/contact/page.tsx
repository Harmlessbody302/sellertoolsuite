import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Contact SellerToolSuite
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
          Contact
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Have a question, found an issue, or want to suggest a marketplace
          calculator or seller guide? Use the contact information below to reach
          SellerToolSuite.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Email contact
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            For questions, corrections, calculator suggestions, resource
            recommendations, or general website feedback, email:
          </p>

          <div className="mt-5 rounded-xl border border-blue-300 bg-blue-50 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
              Contact email
            </p>

            <a
              href="mailto:contact@sellertoolsuite.com"
              className="mt-2 block text-lg font-bold text-blue-700 hover:text-blue-900"
            >
              contact@sellertoolsuite.com
            </a>
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-600">
            Please include the page URL and a short description if you are
            reporting an issue with a calculator, guide, or sitemap/indexing
            page.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            What to include
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
            {[
              "The marketplace or platform your message is about.",
              "The page URL if you are reporting a calculator or guide issue.",
              "A short explanation of what looks incorrect, unclear, or missing.",
              "Any suggested calculator, guide, resource, or feature idea.",
              "Whether the issue appears on desktop, mobile, or both.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-950">
          Common reasons to contact SellerToolSuite
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Calculator issue",
              "Report a calculation, label, input, default value, or explanation that seems unclear or incorrect.",
            ],
            [
              "Guide suggestion",
              "Suggest a seller guide, checklist, or informational page that would help marketplace sellers.",
            ],
            [
              "Resource idea",
              "Recommend a useful resource category, seller tool, spreadsheet, service, or educational topic.",
            ],
            [
              "Website feedback",
              "Share feedback about navigation, readability, page layout, broken links, or missing information.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-950">{title}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Useful starting pages
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            These pages may help before sending a message.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["/", "Homepage"],
              ["/etsy", "Etsy Seller Tools"],
              ["/ebay", "eBay Seller Tools"],
              ["/about", "About SellerToolSuite"],
              ["/privacy-policy", "Privacy Policy"],
              ["/terms", "Terms and Disclaimer"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-blue-500 bg-white p-4 text-sm font-bold text-blue-700 hover:bg-blue-100"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-950">
            Response expectations
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              SellerToolSuite is a growing independent seller-tool website, so
              responses may not be immediate.
            </p>

            <p>
              Calculator suggestions, broken-link reports, confusing wording,
              and missing seller-cost categories are especially helpful because
              they can improve the site for future marketplace sellers.
            </p>

            <p>
              SellerToolSuite calculators and guides are for planning purposes
              only. They do not replace official marketplace fee pages, tax
              advice, accounting advice, legal advice, or professional business
              guidance.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        Please avoid sending passwords, payment details, private marketplace
        account access, tax identification numbers, or other sensitive
        information by email.
      </div>
    </main>
  );
}