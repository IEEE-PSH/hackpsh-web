import PublicSiteHeader from "@/app/_components/nav/public-site-header";
import { siteConfig } from "@/app/_config/site";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HackPSH",
  description: "Terms of Service for HackPSH",
};

export default function Page() {
  return (
    <div>
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <article className="prose-xl">
            <ol>
              <h2 className="font-bold">Terms of Service</h2>
              <p className="text-md">Updated 10/27/23</p>
              <li>
                <a className="text-2xl font-bold">1. Overview & Acceptance</a>
                <p>
                  Welcome to HackPSH, a collegiate hackathon platform. By
                  accessing or using our platform, you are agreeing to these
                  terms and any incorporated guidelines, policies, or
                  disclaimers. If you do not agree, please refrain from using
                  HackPSH.
                </p>
              </li>
              <li>
                <a className="text-2xl font-bold">2. Definitions</a>
                <ul>
                  <li>
                    <a className="font-bold">2.1 Platform: </a>
                    All HackPSH-associated websites, applications, services,
                    tools, and forums.
                  </li>
                  <li>
                    <a className="font-bold">2.2 Users: </a> Anyone accessing or
                    using the platform, including participants, judges, mentors,
                    and sponsors
                  </li>
                  <li>
                    <a className="font-bold">2.3 Content: </a> Data, text,
                    software, scripts, graphics, photos, sounds, videos, and
                    other materials on the platform.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  3. Eligibility & Registration
                </a>
                <ul>
                  <li>
                    <a className="font-bold">3.1 Age Requirement: </a>
                    Users must be 18 or older, or have valid parental/guardian
                    consent.
                  </li>
                  <li>
                    <a className="font-bold">3.2 Academic Verification: </a>{" "}
                    Current and active enrollment in a recognized academic
                    institution might be verified.
                  </li>
                  <li>
                    <a className="font-bold">3.3 Account Integrity: </a> Users
                    should provide accurate information and promptly update any
                    changes.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">4. User Responsibilities </a>
                <ul>
                  <li>
                    <a className="font-bold">4.1 Account Security: </a> Users
                    are responsible for all activities under their account.
                    Users may not share their accounts and passwords with
                    others. Any unauthorized access should be reported
                    immediately.
                  </li>
                  <li>
                    <a className="font-bold">4.2 Content Responsibility: </a>
                    Users bear full responsibility for the content they post,
                    including its legality, reliability, and appropriateness.
                  </li>
                  <li>
                    <a className="font-bold">4.3 Commercial Use: </a> Users may
                    not use HackPSH resources for commercial purposes other than
                    those officially sanctioned by the university.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">5. Code of Conduct</a>
                <ul>
                  <li>
                    <a className="font-bold">5.1 Respectful Interaction: </a> No
                    form of discrimination, harassment, or hate speech will be
                    tolerated.
                  </li>
                  <li>
                    <a className="font-bold">5.2 Academic Integrity: </a>
                    Plagiarism or misrepresentation will result in
                    disqualification.
                  </li>
                  <li>
                    <a className="font-bold">5.3 Prohibited Actions: </a>
                    Distributing malicious software, attempting to gain
                    unauthorized access, or disrupting the platform&apos;s
                    operations are strictly forbidden.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">6. Intellectual Property</a>
                <ul>
                  <li>
                    <a className="font-bold">6.1 User Rights: </a>
                    Users maintain intellectual property rights over their
                    submissions but grant HackPSH a non-exclusive license for
                    platform-related activities.
                  </li>
                  <li>
                    <a className="font-bold">6.2 Platform Content: </a>
                    All platform-related graphics, logos, and content are the
                    property of HackPSH and are protected under U.S. and
                    Pennsylvania laws.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  7. Disclaimers & Limitations
                </a>
                <ul>
                  <li>
                    <a className="font-bold">7.1 As-Is Basis: </a>
                    The platformis provided &quot;as is&quot; without warranties
                    of any kind, either express or implied.
                  </li>
                  <li>
                    <a className="font-bold">7.2 Limitation on Liability: </a>{" "}
                    HackPSH shall not be liable for any indirect, incidental, or
                    consequential damages, unless due to gross negligence or
                    intentional misconduct.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  8. Third-Party Interactions
                </a>
                <ul>
                  <li>
                    <a className="font-bold">8.1 External Links: </a> HackPSH
                    may link to other websites but assumes no responsibility for
                    third-party content.
                  </li>
                  <li>
                    <a className="font-bold">8.2 Sponsors & Partners: </a>
                    Interactions with event sponsors or partners, including any
                    transactions, are solely between the user and the third
                    party.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  9. Termination & Account Cancellation
                </a>
                <ul>
                  <li>
                    <a className="font-bold">9.1 User Discretion: </a> Users may
                    deactivate or delete their accounts at any time.
                  </li>
                  <li>
                    <a className="font-bold">9.2 HackPSH Discretion: </a>
                    HackPSH reserves the right to suspend, terminate, or ban
                    users who violate these terms.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">
                  10. Governing Law & Disputes{" "}
                </a>
                <ul>
                  <li>
                    <a className="font-bold">10.1 Jurisdiction: </a> All terms
                    are governed by Pennsylvania laws. Any disputes shall be
                    resolved in Pennsylvania courts.
                  </li>
                  <li>
                    <a className="font-bold">10.2 Arbitration: </a>
                    Users agree to resolve any disputes through binding
                    arbitration in Pennsylvania, rather than in court.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">11. Changes to Terms</a>
                <ul>
                  <li>
                    <a className="font-bold">11.1 Updates: </a> HackPSH may
                    periodically update these terms to reflect platform changes
                    or legal updates.
                  </li>
                  <li>
                    <a className="font-bold">11.2 Notification: </a>
                    Significant changes will be communicated via email or
                    platform notifications.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">12. Miscellaneous</a>
                <ul>
                  <li>
                    <a className="font-bold">12.1 Severability: </a>If any
                    provision is found invalid, the remainder of these terms
                    remain in effect.
                  </li>
                  <li>
                    <a className="font-bold">12.2 No Waiver: </a>
                    Failure to enforce any rights or provisions does not waive
                    such rights or provisions.
                  </li>
                </ul>
              </li>
              <li>
                <a className="text-2xl font-bold">13. Contact & Feedback</a>
                <p>
                  If you have any questions or feedback, please reach out to our
                  support team at {siteConfig.emails.general}.
                </p>
              </li>
            </ol>
          </article>
        </div>
      </main>
    </div>
  );
}
