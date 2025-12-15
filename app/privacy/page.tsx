import React from "react";
import Header from "../../components/Header";

export const metadata = {
  title: "Privacy Policy - Chainx Go",
  description: "Privacy Policy for Chainx Go — a leads analytics tool.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header centered />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Privacy Policy for Chainx Go</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">Effective date: December 15, 2025</p>

          <nav className="mb-10 bg-gray-100 rounded-lg p-4" aria-label="Table of contents">
            <h2 className="sr-only">Table of contents</h2>
            <ul className="flex flex-wrap gap-4 text-sm justify-center">
              <li><a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="#data-we-collect">Data We Collect</a></li>
              <li><a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="#how-we-use-data">How We Use Data</a></li>
              <li><a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="#sharing">Sharing & Disclosure</a></li>
              <li><a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="#rights">Your Rights</a></li>
              <li><a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="#contact">Contact</a></li>
            </ul>
          </nav>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Chainx Go ("we", "us", "our") provides leads analytics and insights to
              help teams track, enrich, and analyze prospective contacts. We respect
              your privacy and are committed to protecting personal data. This policy
              explains what data we collect, how we use it, when we share it, and the
              choices you have.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Scope</h2>
            <p className="text-gray-700 leading-relaxed">
              This policy applies to data we collect through our website, application,
              and any integrations (including optional integrations with third-party
              services such as LinkedIn) that you authorize. If you choose to connect
              third-party accounts or import data from other services, additional
              terms may apply.
            </p>
          </section>

          <section className="mb-8" id="data-we-collect">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2" id="information-you-provide">Information you provide</h3>
                <p className="text-gray-700 leading-relaxed">
                  Account information (name, email), billing details, and any content you
                  upload or submit to the service.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically collected data</h3>
                <p className="text-gray-700 leading-relaxed">
                  Usage data, logs, IP address, device and browser information, and
                  analytics collected to operate and improve the service.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data from third parties (including LinkedIn)</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you choose to connect a LinkedIn account or otherwise import or
                  analyze LinkedIn data, we will only access and process the data you
                  explicitly authorize and only to the extent permitted by LinkedIn's
                  developer policies and applicable law. Examples may include profile
                  names, job titles, company names, contact details and other limited
                  profile fields you permit.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8" id="how-we-use-data">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Data</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li>Provide and operate the service, analytics and reporting.</li>
              <li>Enrich leads and deduplicate records to improve accuracy.</li>
              <li>Send transactional communications and account notices.</li>
              <li>Detect, prevent and investigate fraud, abuse, and security incidents.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Basis</h2>
            <p className="text-gray-700 leading-relaxed">
              Where required, our processing is based on your consent, the performance
              of a contract, our legitimate interests (for example to operate,
              improve and secure the service), or compliance with legal obligations.
            </p>
          </section>

          <section className="mb-8" id="sharing">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell personal data. We may share data with: service
              providers who perform services on our behalf (hosting, analytics,
              payment processors), law enforcement or regulators when required by
              law, and with your consent. If you import LinkedIn or other third-party
              data, any sharing will follow the permissions you grant and LinkedIn's
              developer policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">LinkedIn Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              If you connect LinkedIn or use LinkedIn APIs with Chainx Go, you agree
              that we will handle data in accordance with LinkedIn's Developer
              Guidelines and the requirements for app association and member data
              access. We will only request the least privileged permissions necessary
              to provide the requested features. We will not store or use LinkedIn
              member data for purposes beyond those permitted by LinkedIn's terms and
              applicable law. You are responsible for ensuring you have the right to
              provide any LinkedIn data to us and for obtaining any necessary member
              consents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain personal data as long as necessary to provide the service,
              fulfill legal obligations, resolve disputes and enforce agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We apply reasonable technical and organizational measures to protect
              data. However, no online service is completely secure — if you suspect
              a security issue, contact us immediately.
            </p>
          </section>

          <section className="mb-8" id="rights">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Depending on your jurisdiction, you may have rights to access, correct,
              port, restrict, or erase your personal data, and to object to certain
              processing. To exercise your rights, contact us at the address below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not directed to children under 16. We do not knowingly
              collect personal data from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy; material changes will be posted with an
              updated effective date. Continued use of the service after changes
              indicates acceptance of the updated policy.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">For questions or requests regarding this policy or your data, contact:</p>
            <address className="not-italic bg-gray-50 rounded-lg p-4 border border-gray-200">
              <strong className="text-gray-900">Chainx Go</strong>
              <br />
              Email: <a href="mailto:privacy@chainxgo.example" className="text-blue-600 hover:text-blue-800 hover:underline">privacy@chainx.id</a>
            </address>
          </section>

          <hr className="my-8 border-gray-300" />

          <p className="text-xs text-gray-500 italic">
            Note on LinkedIn data: Chainx Go follows LinkedIn's developer and app
            association requirements. If you connect LinkedIn to Chainx Go, you are
            responsible for ensuring you have the right to share that data and for
            complying with LinkedIn policies: <a href="https://www.linkedin.com/help/linkedin/answer/a548360/" className="text-blue-600 hover:text-blue-800 hover:underline">https://www.linkedin.com/help/linkedin/answer/a548360/</a>
          </p>
        </div>
      </main>
    </div>
  );
}
