import { Link } from "wouter";
import { LegalList, LegalPageShell, LegalSection, LegalTable } from "@/components/legal/LegalPageShell";


export default function Cookies() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      documentTitle="This Cookie Policy explains what cookies and similar technologies EduMeUp.com uses."
      description="Read EduMeUp Cookie Policy covering essential cookies, functional cookies, analytics cookies, Stripe cookies, consent, and browser controls."
    >
      <LegalSection title="Cookie Policy">
        <p>
          This Cookie Policy explains what cookies and similar technologies EduMeUp.com uses, why we use them, and how you can manage your cookie preferences. This policy forms part of our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="1. What Are Cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow the website to remember your actions and preferences over time. Some cookies are essential for the website to work correctly. Others help us understand how visitors use the Platform so we can improve it.
        </p>
      </LegalSection>

      <LegalSection title="2. What Cookies Does EduMeUp Use?">
        <LegalTable
          headers={["Cookie Name / Type", "Category", "Duration", "Purpose"]}
          rows={[
            ["edume_auth", "Essential", "7 days, or 30 days if Remember Me is selected", "Authentication token stored httpOnly. Keeps you logged in. Cannot be disabled."],
            ["edume_session", "Essential", "Session", "Maintains current session state such as diagnostic in progress or course position. Cannot be disabled."],
            ["edume_csrf", "Essential", "Session", "Cross-site request forgery prevention token. Cannot be disabled."],
            ["edume_prefs", "Functional", "1 year", "Stores non-essential preferences including language, dashboard layout, and notifications."],
            ["_ga / _ga_XXXX", "Analytics", "2 years", "Google Analytics measures platform usage. IP addresses are anonymised before storage. Can be disabled."],
            ["_gid", "Analytics", "24 hours", "Google Analytics differentiates between sessions. Can be disabled."],
            ["stripe_sid / stripe_mid", "Functional - Third Party", "Session / 1 year", "Stripe payment processing cookies active on payment pages and required for Stripe Checkout."],
          ]}
        />
      </LegalSection>

      <LegalSection title="3. What We Do Not Use Cookies For">
        <LegalList
          items={[
            "We do not use advertising or tracking cookies from social media platforms.",
            "We do not use cookies to build personal profiles for advertising purposes.",
            "We do not share cookie data with advertisers or data brokers.",
            "EduMeUp is an ad-free platform and uses no advertising cookies of any kind.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Essential Cookies - Cannot Be Disabled">
        <p>
          The authentication cookie, session cookie, and CSRF token are essential for the Platform to function. They cannot be disabled. If your browser blocks these cookies, you will not be able to log in or use the Platform.
        </p>
      </LegalSection>

      <LegalSection title="5. How to Manage Cookies">
        <h3 className="font-semibold text-slate-950">5.1 Via Your Browser</h3>
        <LegalList
          items={[
            "Google Chrome: Settings > Privacy and Security > Cookies and other site data.",
            "Mozilla Firefox: Settings > Privacy and Security > Cookies and Site Data.",
            "Safari: Preferences > Privacy > Manage Website Data.",
            "Microsoft Edge: Settings > Privacy, Search and Services > Cookies.",
          ]}
        />
        <p>Blocking all cookies will prevent you from logging in to EduMeUp. We recommend allowing cookies from EduMeUp while blocking third-party cookies if you have privacy concerns.</p>
        <h3 className="font-semibold text-slate-950">5.2 Analytics Opt-Out</h3>
        <p>
          To opt out of Google Analytics tracking specifically, you can install the Google Analytics Opt-Out Browser Add-On at tools.google.com/dlpage/gaoptout.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookie Consent">
        <p>When you first visit EduMeUp, a cookie consent notice will appear. You can:</p>
        <LegalList
          items={[
            "Accept all cookies - essential, functional, and analytics.",
            "Accept essential cookies only - functional and analytics cookies will not be set.",
            "Manage your preferences in detail.",
          ]}
        />
        <p>You can change cookie preferences at any time by clicking Cookie Settings in the footer of any page.</p>
      </LegalSection>

      <LegalSection title="7. Changes to This Cookie Policy">
        <p>
          We may update this Cookie Policy when we add or remove cookies from the Platform. The Effective Date will be updated accordingly. Significant changes will be notified through the cookie consent notice on your next visit.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>Questions about our use of cookies: privacy@edumeup.com</p>
      </LegalSection>
    </LegalPageShell>
  );
}
