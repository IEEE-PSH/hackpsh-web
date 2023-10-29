import PublicSiteHeader from "@/app/_components/nav/public-site-header";
import { siteConfig } from "@/app/_config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackPSH | Privacy Policy",
  description: "Privacy Policy for HackPSH",
};

export default function Page() {
  return (
    <div>
      <PublicSiteHeader />
      <main className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <article className="prose-xl">
            <ol>
              <h2 className="font-bold">Privacy Policy</h2>
              <p className="text-md">Updated 10/27/23</p>
              <li>
                <a className="text-2xl font-bold">1. Introduction</a>
                <p>
                  Welcome to HackPSH. We value your privacy and are committed to
                  safeguarding your personal information. This privacy policy
                  provides details on the type of data we collect, and how
                  it's processed, stored, and shared, in accordance with
                  U.S. federal laws and Pennsylvania state regulations.
                </p>
              </li>
              <li>
                <a className="text-2xl font-bold">2. Data We Collect</a>
                <ul>
                  <li>
                    <a className="font-bold">
                      2.1 Personal Identification Data:{" "}
                    </a>
                    Your full name, email address, academic affiliations, device
                    data.
                  </li>
                  <li>
                    <a className="font-bold">2.2 Technical Data: </a> IP
                    address, browser details, device information, access
                    duration, and other technical markers.
                  </li>
                  <li>
                    <a className="font-bold">2.3 Submitted Projects: </a> All
                    content—code, graphics, multimedia, descriptions, or other
                    materials—provided during your participation.
                  </li>
                  <li>
                    <a className="font-bold">2.4 Analytics: </a> We may use
                    third-party providers to monitor and analyze platform usage.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">3. How We Use Your Data</a>
                <ul>
                  <li>
                    <a className="font-bold">
                      3.1 Registration & Participation:{" "}
                    </a>
                    Account management, participant tracking, judging, and award
                    distribution. HackPSH may hold users' data as long as it
                    needs, but the user may delete their accounts at any time.
                  </li>
                  <li>
                    <a className="font-bold">3.2 Platform Improvement: </a> For
                    optimizing user experience, addressing technical challenges,
                    and refining platform features.
                  </li>
                  <li>
                    <a className="font-bold">3.3 Communication: </a> To inform
                    you about event updates, policy alterations, promotional
                    offers, or compliance notifications through email or text.
                  </li>
                  <li>
                    <a className="font-bold">3.4 Legal Compliance: </a> To meet
                    legal and regulatory mandates.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  4. Data Sharing and Disclosure
                </a>
                <ul>
                  <li>
                    <a className="font-bold">4.1 Third Parties: </a> We only
                    share data with third parties who provide necessary services
                    to HackPSH, such as web hosting or email delivery, under
                    strict confidentiality terms.
                  </li>
                  <li>
                    <a className="font-bold">
                      4.2 Legal & Regulatory Requirements:{" "}
                    </a>
                    We may disclose your data if required by law, court order,
                    or pertinent Pennsylvania regulations.
                  </li>
                  <li>
                    <a className="font-bold">4.3 Business Transfers:</a> In
                    cases of a merger, sale, or asset transfer, user information
                    may be a transferred asset.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">5. Data Security</a>
                <ul>
                  <li>
                    <a className="font-bold">5.1 Protective Measures:</a> Our
                    multi-layered security includes SSL encryption, firewalls,
                    and access controls.
                  </li>
                  <li>
                    <a className="font-bold">5.2 Data Breach Protocol:</a> In
                    the unlikely event of a data breach, affected individuals
                    will be notified in compliance with Pennsylvania's Data
                    Breach Notification Law.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">6. Data Retention</a>
                <ul>
                  <li>
                    We store your data only as long as necessary to fulfill its
                    intended purpose. Certain records may be retained longer due
                    to legal or audit reasons.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">7. Your Legal Rights</a>
                <ul>
                  <li>
                    <a className="font-bold">7.1 Access & Correction:</a> You
                    have the right to access your data and request corrections.
                  </li>
                  <li>
                    <a className="font-bold">7.2 Deletion:</a> Under certain
                    circumstances, you can request data deletion.
                  </li>
                  <li>
                    <a className="font-bold">7.3 Objection:</a> You can object
                    to data processing or ask for restricted processing.
                  </li>
                  <li>
                    <a className="font-bold">7.4 Portability:</a> You have the
                    right to request your data in a structured, commonly used
                    format.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">8. Third-Party Links</a>
                <p>
                  HackPSH might link to external sites. We don't control and
                  aren't responsible for their content or privacy
                  practices.
                </p>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  9. Changes to the Privacy Policy
                </a>
                <p>
                  Any substantial changes will be communicated through our
                  platform or email. Continued use after changes implies
                  acceptance.
                </p>
              </li>
              <li>
                <a className="text-2xl font-bold">10. Contact Information</a>
                <p>
                  For any questions or concerns regarding this privacy policy,
                  please contact our designated Data Protection Officer at
                  {siteConfig.emails.general}.
                </p>
                <p>
                  Under relevant laws, you are empowered to review, amend, or
                  even erase your personal data from our systems. You can also
                  object to processing or request data portability.
                </p>
              </li>
            </ol>
          </article>
        </div>
      </main>
    </div>
  );
}
