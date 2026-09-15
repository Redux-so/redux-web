import {
  LegalContactBlock,
  LegalCopyright,
  LegalDocument,
  LegalEmailLink,
  LegalIntro,
  LegalLastUpdated,
  LegalParagraph,
  LegalSection,
  LegalSubsection,
} from "@/src/components/legal/LegalDocument";

export default function PrivacyPolicyContent() {
  return (
    <LegalDocument>
      <LegalLastUpdated date="September 10, 2026" />

      <LegalIntro>
        This Privacy Policy explains how Levi Purkey, doing business as Redux
        (&quot;Redux,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
        collects, uses, and shares information when you use our websites, photo
        editing application, AI features, and related services (the
        &quot;Service&quot;).
      </LegalIntro>

      <LegalSection title="1. Information We Collect" isFirst>
        <LegalSubsection title="Account information.">
          When you create an account, we collect information such as your name,
          email address, account identifier, profile information, authentication
          details, and account settings. Authentication is provided through
          Clerk, which may process login credentials and social sign-in
          information on our behalf.
        </LegalSubsection>

        <LegalSubsection title="Photos and other content.">
          We collect the photos, images, files, prompts, messages, edits, and
          other content you upload or create through the Service (&quot;Your
          Content&quot;). This may include file names, formats, dimensions,
          metadata, edit history, and generated results. If you use semantic
          search, we may create and store numerical representations, commonly
          called embeddings, to help locate related images.
        </LegalSubsection>

        <LegalSubsection title="Payment information.">
          If you purchase Credits or a subscription, Stripe processes your
          payment information. We receive transaction details such as your
          plan, purchase amount, billing status, payment history, and limited
          payment-method information. We do not store complete payment card
          numbers.
        </LegalSubsection>

        <LegalSubsection title="Usage and device information.">
          We automatically collect information such as your IP address, browser
          and device type, operating system, pages and features used, actions
          taken, timestamps, referring pages, approximate location derived from
          IP address, performance data, crash reports, and diagnostic logs.
        </LegalSubsection>

        <LegalSubsection title="Communications.">
          We collect information you provide when you contact support, report a
          problem, submit feedback, or communicate with an AI assistant through
          the Service.
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. How We Use Information">
        <LegalParagraph>
          We use information to provide and operate the Service; authenticate
          users; store and edit images; generate AI results; provide semantic
          search; process payments and Credits; save preferences and edit
          history; prevent fraud and abuse; enforce usage limits; secure,
          maintain, and troubleshoot the Service; analyze performance and
          product usage; communicate with you; comply with law; and protect our
          users, rights, and property.
        </LegalParagraph>
        <LegalParagraph>
          We may use aggregated or de-identified information that cannot
          reasonably identify you for analytics, product development, and other
          lawful purposes.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. Image and AI Processing">
        <LegalParagraph>
          When you use AI-powered features, relevant photos, prompts, and
          instructions may be sent to AI service providers such as Anthropic and
          Replicate to produce the requested result. Other providers may process
          images for storage, delivery, conversion, optimization, or background
          jobs.
        </LegalParagraph>
        <LegalParagraph>
          We do not use Your Content to train a general-purpose AI model
          operated by Redux unless you separately choose to participate in such a
          program. Third-party providers process information under their
          agreements with us and their applicable terms. Do not upload content
          that you do not have permission to process or information that you do
          not want processed as described in this Policy.
        </LegalParagraph>
        <LegalParagraph>
          Redux does not use uploaded photographs for facial recognition or
          biometric identification. AI features may still detect or modify
          visual features, including faces, when necessary to perform an edit
          requested by you.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="4. How We Share Information">
        <LegalParagraph>
          We may share information with service providers that help us operate
          the Service, including providers for authentication, hosting,
          databases, storage, content delivery, image processing, AI generation,
          payments, analytics, security, error monitoring, communications, and
          background processing. These providers may include Clerk, Vercel, Neon,
          Cloudinary, Stripe, Anthropic, Replicate, Inngest, PostHog, Sentry,
          and similar providers that replace or supplement them.
        </LegalParagraph>
        <LegalParagraph>
          We may also share information when you direct us to do so; when
          necessary to comply with law, legal process, or valid government
          requests; to investigate fraud, abuse, security incidents, or
          violations of our Terms; to protect rights, safety, and property; or
          as part of a merger, financing, acquisition, reorganization,
          bankruptcy, or sale of assets.
        </LegalParagraph>
        <LegalParagraph>
          We do not sell personal information. We do not share personal
          information for cross-context behavioral advertising, and we do not use
          Your Content to serve targeted advertisements. If these practices
          change, we will update this Policy and provide any legally required
          choices before the change applies.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Cookies and Analytics">
        <LegalParagraph>
          We and our providers may use cookies, local storage, and similar
          technologies to keep you signed in, remember preferences, prevent
          abuse, measure performance, and understand how the Service is used.
          Analytics and monitoring providers may include PostHog, Sentry, and
          Vercel Analytics.
        </LegalParagraph>
        <LegalParagraph>
          You can control cookies through your browser settings. Blocking
          essential storage may prevent account login or other Service features
          from working. Where required by law, we will request consent before
          using non-essential cookies or similar technologies.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <LegalParagraph>
          We retain personal information for as long as reasonably necessary to
          provide the Service, maintain your account, complete transactions,
          comply with legal obligations, resolve disputes, prevent fraud, and
          enforce our agreements. Retention periods depend on the type of
          information and why it was collected.
        </LegalParagraph>
        <LegalParagraph>
          Your Content is generally retained while it remains in your account or
          is needed to provide a requested feature. When you delete content or
          close your account, we will delete or de-identify associated
          information within a reasonable period, except where it must be
          retained for backups, security, fraud prevention, payment records,
          legal compliance, or disputes. Backup copies may remain until they are
          overwritten through our normal backup cycle.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Security">
        <LegalParagraph>
          We use reasonable administrative, technical, and organizational
          safeguards designed to protect information. These may include access
          controls, encryption in transit, rate limiting, monitoring, and
          restricted administrative access. No online service or storage system
          is completely secure, so we cannot guarantee absolute security. Keep
          independent copies of important original photos and exports.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Your Choices and Privacy Rights">
        <LegalParagraph>
          You may update certain account information through your settings,
          cancel subscriptions through your billing settings or the Stripe
          Customer Portal, and delete supported content through the Service. You
          may also request access to, correction of, deletion of, or a copy of
          your personal information by emailing{" "}
          <LegalEmailLink email="admin@redux.so" />.
        </LegalParagraph>
        <LegalParagraph>
          Depending on where you live, you may also have rights to object to or
          restrict certain processing, withdraw consent, appeal a denied request,
          or complain to a privacy regulator. We will not discriminate against
          you for exercising a privacy right. We may verify your identity before
          completing a request and may deny or limit requests where permitted by
          law.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. United States State Privacy Rights">
        <LegalParagraph>
          Residents of certain U.S. states may have rights to know what personal
          information we collect and use, request access, correction, or
          deletion, obtain a portable copy, and opt out of certain sales,
          targeted advertising, or profiling. Redux does not currently sell
          personal information or use it for cross-context behavioral
          advertising.
        </LegalParagraph>
        <LegalParagraph>
          You or an authorized agent may submit a request at{" "}
          <LegalEmailLink email="admin@redux.so" />. We may request information
          needed to verify the request and the agent&apos;s authority. If we deny
          a request, you may appeal by replying to our decision. These rights
          apply only where required by applicable law and may be subject to
          exceptions.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. International Users">
        <LegalParagraph>
          Redux is operated from the United States. If you use the Service from
          another country, your information may be transferred to and processed
          in the United States and other countries where our providers operate.
          Those countries may have different data-protection laws from your
          country.
        </LegalParagraph>
        <LegalParagraph>
          Where applicable, we process personal information because it is
          necessary to provide the Service or perform our contract with you,
          because we have legitimate interests in operating and securing the
          Service, because we must comply with legal obligations, or because you
          have given consent. Where required, we use legally recognized
          safeguards for international transfers.
        </LegalParagraph>
        <LegalParagraph>
          Users in the European Economic Area, United Kingdom, Switzerland, and
          other applicable regions may request access, correction, deletion,
          portability, restriction, or objection, and may withdraw consent where
          processing is based on consent. You may also complain to your local
          data-protection authority.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Children's Privacy">
        <LegalParagraph>
          The Service is intended only for users who are at least 18 years old.
          We do not knowingly collect personal information from children. If you
          believe a child has provided personal information to us, contact{" "}
          <LegalEmailLink email="admin@redux.so" /> so we can investigate and
          delete it where appropriate.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Third-Party Links and Services">
        <LegalParagraph>
          The Service may contain links to or integrations with third-party
          services. Their privacy practices are governed by their own policies,
          not this Policy. Review their policies before providing information
          directly to them.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Changes to This Policy">
        <LegalParagraph>
          We may update this Policy as the Service, providers, or legal
          requirements change. We will update the date above and provide
          additional notice through the Service or by email when a change is
          material. Your continued use of the Service after the effective date
          is subject to the updated Policy, but we will request consent where
          required by law.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="14. Contact Us">
        <LegalParagraph>
          For privacy questions, requests, or complaints, contact:
        </LegalParagraph>
        <LegalContactBlock>
          <p>Levi Purkey, Doing business as Redux</p>
          <p>
            Email: <LegalEmailLink email="admin@redux.so" />
          </p>
          <p>Location: Atlanta, Georgia, United States</p>
        </LegalContactBlock>
        <LegalCopyright>
          © 2026 Levi Purkey, doing business as Redux. All rights reserved.
        </LegalCopyright>
      </LegalSection>
    </LegalDocument>
  );
}
