import {
  LegalCopyright,
  LegalDocument,
  LegalEmailLink,
  LegalIntro,
  LegalLastUpdated,
  LegalParagraph,
  LegalSection,
} from "@/src/components/legal/LegalDocument";

export default function TermsOfServiceContent() {
  return (
    <LegalDocument>
      <LegalLastUpdated date="September 10, 2026" />

      <LegalIntro>
        These Terms of Service govern your use of Redux, operated by Levi
        Purkey, doing business as Redux (&quot;Redux,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;).
      </LegalIntro>

      <LegalSection title="1. Acceptance of Terms" isFirst>
        <LegalParagraph>
          By creating an account, clicking a sign-up or continue button,
          purchasing Credits or a subscription, or using Redux (the
          &quot;Service&quot;), you agree to these Terms and our Privacy Policy.
          If you do not agree, do not use the Service.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Eligibility and Accounts">
        <LegalParagraph>
          You must be at least 18 years old to use the Service. You are
          responsible for providing accurate account information, protecting
          your login credentials, and all activity under your account. Notify us
          at <LegalEmailLink email="admin@redux.so" /> if you suspect
          unauthorized access. You may not create multiple accounts to avoid
          usage limits, payment requirements, or enforcement actions.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. Use License">
        <LegalParagraph>
          We grant you a limited, non-exclusive, non-transferable, and revocable
          license to use the Service for lawful personal or internal business
          purposes. You may not copy, resell, reverse engineer, interfere with,
          or attempt to gain unauthorized access to the Service except where
          permitted by law or an applicable open-source license.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="4. Your Content and AI Features">
        <LegalParagraph>
          You retain ownership of the photos, images, prompts, and other content
          you upload (&quot;Your Content&quot;). You give us and our service
          providers permission to store, process, transmit, and modify Your
          Content only as reasonably necessary to operate the Service and
          provide the features you request, including AI-powered edits.
        </LegalParagraph>
        <LegalParagraph>
          You must have all rights and permissions needed to upload and process
          Your Content. You are responsible for Your Content and for how you
          use or publish edited results.
        </LegalParagraph>
        <LegalParagraph>
          AI results may be inaccurate, incomplete, unexpected, or similar to
          results generated for others. You must review results before relying
          on or publishing them. To the extent permitted by law, we do not claim
          ownership of the output generated specifically for you, but we do not
          guarantee that any output is unique, copyrightable, or free of
          third-party rights.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Credits, Subscriptions, and Payments">
        <LegalParagraph>
          Some features require Credits. Credits have no cash value, are not
          transferable, and are deducted when processing begins. We may restore
          Credits when a job fails because of a verified Service error, but we
          do not guarantee a refund when you dislike a valid result.
        </LegalParagraph>
        <LegalParagraph>
          Paid subscriptions automatically renew at the price and billing
          frequency shown at checkout until cancelled. You may cancel through
          your account billing settings or the Stripe Customer Portal.
          Cancellation takes effect at the end of the current billing period.
          Payments are non-refundable except where required by law or expressly
          stated by us. We may change prices or Credit requirements
          prospectively, with notice as required by law.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Prohibited Uses">
        <LegalParagraph>
          You may not use the Service to break the law, infringe intellectual
          property or privacy rights, impersonate or defraud others, create or
          distribute sexual content involving minors, create non-consensual
          intimate imagery, upload malware, disrupt the Service, bypass rate
          limits or payment controls, or generate deceptive or harmful content.
          We may remove content, restrict features, or suspend accounts that
          violate these rules.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <LegalParagraph>
          The Service, including its software, design, branding, and original
          content, is owned by Redux or its licensors and is protected by
          intellectual property laws. These Terms do not transfer ownership of
          the Service or the Redux name and logos to you. Open-source components
          remain subject to their applicable licenses.
        </LegalParagraph>
        <LegalParagraph>
          If you believe content processed through the Service infringes your
          copyright, contact <LegalEmailLink email="admin@redux.so" /> with
          enough information for us to identify the work and the allegedly
          infringing material. We may remove infringing content and terminate
          repeat infringers.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Third-Party Services">
        <LegalParagraph>
          The Service relies on third-party providers for hosting,
          authentication, storage, payments, analytics, and AI processing. Your
          use of some features may also be subject to those providers&apos;
          terms. We are not responsible for third-party outages, services, or
          actions outside our reasonable control.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Suspension and Termination">
        <LegalParagraph>
          You may stop using the Service or close your account at any time. We
          may suspend or terminate your access if you violate these Terms, fail
          to pay, misuse the Service, create legal or security risk, or if
          required by law. Sections concerning ownership, payments, disclaimers,
          liability, indemnification, and general terms continue after
          termination where applicable.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title='10. Disclaimer of Warranties'>
        <LegalParagraph>
          The Service and all AI results are provided &quot;as is&quot; and
          &quot;as available.&quot; To the fullest extent permitted by law, we
          disclaim all express, implied, and statutory warranties, including
          warranties of merchantability, fitness for a particular purpose, title,
          and non-infringement. We do not guarantee that the Service will be
          uninterrupted, secure, error-free, or that results will be accurate or
          meet your expectations. You are responsible for keeping backups of
          important original files and exports.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Limitation of Liability">
        <LegalParagraph>
          To the fullest extent permitted by law, Redux and its service
          providers will not be liable for indirect, incidental, special,
          consequential, exemplary, or punitive damages, or for lost profits,
          revenue, data, content, or edits arising from your use of the Service.
        </LegalParagraph>
        <LegalParagraph>
          To the fullest extent permitted by law, our total liability for claims
          related to the Service will not exceed the greater of the amount you
          paid us during the 12 months before the claim arose or $100. These
          limitations do not apply where liability cannot legally be limited.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Indemnification">
        <LegalParagraph>
          To the extent permitted by law, you agree to defend, indemnify, and
          hold harmless Redux from third-party claims, damages, and reasonable
          legal expenses arising from Your Content, your use of AI results, your
          violation of these Terms or the law, or your infringement of another
          person&apos;s rights.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Changes, Governing Law, and Contact">
        <LegalParagraph>
          We may update these Terms from time to time. Material changes will be
          communicated through the Service, by email, or by updating the date
          above. Continued use after the updated Terms take effect means you
          accept them.
        </LegalParagraph>
        <LegalParagraph>
          These Terms are governed by the laws of the State of Georgia, without
          regard to conflict-of-law rules, except where mandatory consumer
          protections apply.
        </LegalParagraph>
        <LegalParagraph>
          Unless applicable law requires otherwise, any legal proceeding relating
          to these Terms or the Service must be brought exclusively in the state
          or federal courts located in Fulton County, Georgia, and you consent
          to their jurisdiction and venue.
        </LegalParagraph>
        <LegalParagraph>
          Questions or legal notices may be sent to{" "}
          <LegalEmailLink email="admin@redux.so" />.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="14. General Terms">
        <LegalParagraph>
          These Terms and our Privacy Policy constitute the entire agreement
          between you and Redux regarding the Service. If any provision is found
          unenforceable, the remaining provisions will remain in effect. Our
          failure to enforce a provision is not a waiver of our right to enforce
          it later.
        </LegalParagraph>
        <LegalCopyright>
          © 2026 Levi Purkey, doing business as Redux. All rights reserved.
        </LegalCopyright>
      </LegalSection>
    </LegalDocument>
  );
}
