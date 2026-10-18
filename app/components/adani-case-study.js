import Image from "next/image";
import Link from "next/link";
import CaseStudyNav from "./case-study-nav";
import CaseStudyScreen from "./case-study-screen";
import ScrollTop from "../work/[slug]/scroll-top";

const sections = [["adani-overview", "Overview"], ["adani-research", "Competitive analysis"], ["adani-experience", "Account access"], ["adani-services", "Services & insights"], ["adani-themes", "Light & dark"], ["adani-support", "Connections & support"], ["adani-interface", "Interface details"], ["adani-reflection", "Next steps"]];
const screens = {
  welcome: { src: "/images/adani/welcome.webp", alt: "Adani Electricity welcome screen with login, registration, new connection and helpline actions" },
  login: { src: "/images/adani/login.webp", alt: "Login and registration screen with a mobile or customer account number field and Continue action" },
  home: { src: "/images/adani/home.webp", alt: "Adani Electricity home screen showing bill amount, consumption, payment actions, services, payment trends and support" },
  verification: { src: "/images/adani/verification.webp", alt: "Six-digit OTP verification screen with a masked mobile number, resend link, and Verify OTP action" },
  services: { src: "/images/adani/services.webp", alt: "Services screen with labelled shortcuts for bills, payments, consumption, meter readings, complaints, new connections, outages and rooftop solar" },
  dashboard: { src: "/images/adani/dashboard.webp", alt: "Dashboard showing a two-month payment comparison, bill increase explanation, and consumption-trend controls" },
  servicesDark: { src: "/images/adani/services-dark.webp", alt: "Dark-theme Services screen with labelled utility-service icons and the active Services navigation tab" },
  dashboardDark: { src: "/images/adani/dashboard-dark.webp", alt: "Full dark-theme dashboard showing payment and consumption charts, paperless billing, email and SMS alert settings" },
  helpDark: { src: "/images/adani/help-dark.webp", alt: "Dark-theme Help Videos screen with tutorials for applying for a connection and raising a complaint" },
  connectionDark: { src: "/images/adani/connection-dark.webp", alt: "Dark-theme Add New Connection form with name, customer account number, meter number and Add Connection button" },
  notificationsDark: { src: "/images/adani/notifications-dark.webp", alt: "Dark-theme Notifications screen with an unread outage notice, bill-generated notification, timestamps and Mark all as read action" },
};
function Section({ id, number, title, children }) {
  return <section className="train-section" id={id}><div className="train-section-title"><span>{number}</span><h2>{title}</h2></div>{children}</section>;
}

export default function AdaniCaseStudy({ next }) {
  return <main id="content" className="train-case train-case-refined adani-case">
    <ScrollTop />
    <header className="train-hero">
      <Link className="train-back" href="/work">All projects</Link>
      <div className="train-hero-layout">
        <div className="train-hero-copy"><p className="train-eyebrow">Adani Electricity · Mobile application</p><h1>Everyday energy.<br /><em>Clearer control.</em></h1><p className="train-lead">A customer-facing interface that brings bills, electricity consumption, essential services, and support into one mobile experience. My work focused on UI design, supported by competitive analysis.</p></div>
        <div className="adani-hero-visual"><div className="adani-hero-halo" aria-hidden="true" /><Image src="/images/adani/welcome.webp" width={750} height={1624} sizes="(max-width: 800px) 56vw, 260px" alt={screens.welcome.alt} preload /><span className="adani-visual-label">Your electricity. At a glance.</span></div>
      </div>
      <dl className="train-project-details"><div><dt>Role</dt><dd>UI Designer</dd></div><div><dt>Research contribution</dt><dd>Competitive analysis</dd></div><div><dt>Product</dt><dd>Electricity customer app</dd></div><div><dt>Focus</dt><dd>Account · Bills · Services</dd></div></dl>
    </header>
    <div className="train-editorial-layout"><aside className="train-section-nav"><CaseStudyNav sections={sections} /></aside><article className="train-article">
      <Section id="adani-overview" number="01" title="More than a monthly bill.">
        <div className="train-reading"><p>Adani Electricity is a power distribution utility serving Mumbai. Its digital services let customers manage accounts, pay bills, and access electricity consumption information.</p><p>The interface connects those everyday needs: enter an account, understand what is due, take action, and find help. The selected designs cover welcome and account verification, a service-rich home, service discovery, and payment and consumption insights.</p></div>
        <div className="train-evidence-grid">{[["Understand", "Bring the amount due, billing period, and consumption together."], ["Act", "Give bill viewing and payment a clear place in the hierarchy."], ["Get support", "Keep complaints, outage checks, and assistance within the service experience."]].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
        <p className="train-evidence-note">Company context: <a href="https://www.adanielectricity.com/corporate/who-we-are" target="_blank" rel="noreferrer">Adani Electricity</a> · <a href="https://www.adanielectricity.com/services" target="_blank" rel="noreferrer">Customer services</a></p>
      </Section>
      <Section id="adani-research" number="02" title="Learning from familiar payment experiences.">
        <div className="train-reading"><p>My research contribution was competitive analysis of payment experiences, including Paytm. This provided a reference for familiar bill-payment interactions alongside the broader needs of an electricity service application.</p><p>Paytm’s published electricity-payment flow moves from selecting a provider and entering a consumer number to payment. An electricity provider’s app also needs to make consumption, account services, and support easy to discover.</p></div>
        <div className="train-table-wrap"><table><caption>Case-study comparison lens · not usability-test findings</caption><thead><tr><th>Area</th><th>Reference to consider</th><th>In the supplied design</th></tr></thead><tbody><tr><td>Account entry</td><td>Clear identification before payment</td><td>A mobile or customer account number entry point</td></tr><tr><td>Payment hierarchy</td><td>Visible amount and a clear next action</td><td>Bill summary with separate View Bill and Pay Bill actions</td></tr><tr><td>Beyond payment</td><td>How customers find ongoing service needs</td><td>Services, consumption information, and support on the home screen</td></tr></tbody></table></div>
        <p className="train-evidence-note">Public reference: <a href="https://paytm.com/faqs/electricity-bill/pay-electricity-bill-using-paytm" target="_blank" rel="noreferrer">Paytm electricity bill payment</a>. The comparison above describes visible patterns; it does not claim measured competitor performance.</p>
      </Section>
      <Section id="adani-experience" number="03" title="From first visit to everyday essentials.">
        <div className="adani-entry-grid adani-access-grid"><figure><CaseStudyScreen screen={screens.welcome} /><figcaption><strong>A welcoming starting point.</strong> Brand imagery introduces the service, with login and registration as the primary action. New connection requests have a separate entry point.</figcaption></figure><figure><CaseStudyScreen screen={screens.login} /><figcaption><strong>One clear step to begin.</strong> A labelled mobile or account-number field, numeric keyboard, and prominent Continue button focus the screen on account entry.</figcaption></figure><figure><CaseStudyScreen screen={screens.verification} /><figcaption><strong>Confirm the account.</strong> Six distinct input slots clarify the code length. A masked number identifies the destination, while Resend OTP provides a recovery action.</figcaption></figure></div>
        <div className="adani-home-layout"><figure><CaseStudyScreen screen={screens.home} /><figcaption>The complete supplied home screen. Expand to inspect services, trends, and support in detail.</figcaption></figure><div className="adani-home-notes"><h3>A useful home for the account.</h3><p>The home screen places the current bill and consumption at the top, followed by a grid of service shortcuts. Secondary content and assistance sit further down the page.</p>{[["Bill context first", "Amount, due date, billing month, and consumption are grouped in one summary card."], ["Services within reach", "Bills, payments, consumption, complaints, meter readings, and outage checks use labelled shortcuts."], ["More detail when needed", "Payment trends, help videos, and contact options support deeper exploration without competing with the main payment action."]].map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div></div>
      </Section>
      <Section id="adani-services" number="04" title="Find a service. Understand the account.">
        <div className="train-reading"><p>Beyond the home summary, two dedicated destinations give customers room to explore. Services organises account tasks into labelled shortcuts; the dashboard focuses on payment and consumption comparisons.</p></div>
        <div className="adani-entry-grid"><figure><CaseStudyScreen screen={screens.services} /><figcaption><strong>A directory built around tasks.</strong> Bills, payments, complaints, meter readings, and outage checks share a consistent icon-and-label pattern. The selected Services tab makes the current location visible.</figcaption></figure><figure><CaseStudyScreen screen={screens.dashboard} /><figcaption><strong>Make trends easier to interpret.</strong> Period controls, labelled payment values, and a contextual bill-change card connect the chart with a practical explanation. Figures shown are screen content, not project outcome metrics.</figcaption></figure></div>
        <div className="train-direction-list"><div><div><h3>One navigation system across destinations</h3><p>Home, Dashboard, Services, Support, and More remain in the bottom navigation. Active icons and labels identify the selected destination across the exported screens.</p></div></div></div>
        <p className="train-evidence-note">Screens exported from the <a href="https://www.figma.com/design/UJFhwUE6pnJH9Y2rEvWRds/Public-Portfolio?node-id=37-23976" target="_blank" rel="noreferrer">Adani Electricity Figma designs</a>. Each screen can be expanded for closer inspection.</p>
      </Section>
      <Section id="adani-themes" number="05" title="Two themes. One familiar experience.">
        <div className="train-reading"><p>The light and dark designs preserve the same service grouping, icon labels, and bottom navigation. The surface colours change while the structure stays recognisable.</p></div>
        <div className="adani-entry-grid adani-theme-comparison"><figure><p className="adani-gallery-label">Light theme</p><CaseStudyScreen screen={screens.services} /><figcaption>Light surfaces and charcoal icons separate the service shortcuts from the page.</figcaption></figure><figure><p className="adani-gallery-label">Dark theme</p><CaseStudyScreen screen={screens.servicesDark} /><figcaption>Deep charcoal surfaces, lighter icons, and a raised navigation bar retain the same task hierarchy.</figcaption></figure></div>
        <div className="adani-home-layout"><figure><CaseStudyScreen screen={screens.dashboardDark} /><figcaption>The complete dark dashboard includes trends and account preferences further down the screen.</figcaption></figure><div className="adani-home-notes"><h3>Detail without losing the hierarchy.</h3><p>The full dashboard gives payment trends, consumption comparisons, and billing preferences their own card surfaces.</p><div><h4>Compare across periods</h4><p>Month and year controls sit beside the charts they affect, with legends and values explaining the information shown.</p></div><div><h4>Explain a change</h4><p>A gradient card connects the payment comparison to a bill-increase message and a supporting action.</p></div><div><h4>Manage account preferences</h4><p>Paperless billing, email alerts, and SMS alerts use labelled switches with short explanations.</p></div></div></div>
      </Section>
      <Section id="adani-support" number="06" title="Support the moments beyond payment.">
        <div className="train-reading"><p>The additional designs cover linking a connection, understanding service updates, and finding guidance. Each screen focuses on a different customer need while keeping the same dark-theme visual language.</p></div>
        <div className="adani-entry-grid adani-access-grid adani-dark-gallery">{[
          [screens.connectionDark, "Link a connection", "Name, customer account number, and meter number are grouped in a short form with one primary action."],
          [screens.notificationsDark, "Keep customers informed", "An unread indicator distinguishes the outage notice, while timestamps and a read-all action help organise updates."],
          [screens.helpDark, "Offer practical guidance", "Tutorial cards pair a clear task title with a preview, description, and duration for connection and complaint guidance."],
        ].map(([screen, title, caption]) => <figure key={screen.src}><CaseStudyScreen screen={screen} /><figcaption><strong>{title}</strong>{caption}</figcaption></figure>)}</div>
      </Section>
      <Section id="adani-interface" number="07" title="A calm system with a clear next action.">
        <div className="train-reading"><p>The supplied UI uses saturated blue for primary actions, dark text for information, and pale neutral surfaces for grouping. Rounded cards and buttons give billing, services, and support a consistent visual rhythm.</p></div>
        <div className="adani-palette" aria-label="Interface colour palette derived from supplied screens">{[["#0D63CB", "Action blue"], ["#1C252C", "Text charcoal"], ["#F2F4F6", "Soft neutral"], ["#EEEAFE", "Bill-card tint"]].map(([color, label]) => <div key={label}><span style={{ backgroundColor: color }} aria-hidden="true" /><strong>{label}</strong><small>{color}</small></div>)}</div>
        <div className="train-direction-list">{[["Hierarchy through contrast", "Blue filled buttons distinguish primary actions, while secondary actions use white or quieter surfaces."], ["Labels alongside icons", "Service names accompany icons, so customers can identify actions without interpreting symbols alone."], ["Information in groups", "Cards separate bill details, payment trends, service shortcuts, and assistance into distinct areas."]].map(([title, text]) => <div key={title}><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        <p className="train-evidence-note">Palette values are visual references from the supplied screens, rather than a formal brand specification.</p>
      </Section>
      <Section id="adani-reflection" number="08" title="Clarity to carry into the next iteration.">
        <div className="train-reading"><p>The key design consideration is balancing an immediate task—understanding and paying a bill—with a wider service offering. A strong summary and a recognisable primary action help give a dense home screen a clear starting point.</p><p>A next validation round could assess account entry, bill comprehension, service discovery, and finding urgent assistance. Accessibility checks should cover contrast, text scaling, touch targets, and chart interpretation.</p></div>
        <p className="train-evidence-note">This case study presents supplied UI designs and the confirmed competitive-analysis contribution. Testing results and launch outcomes have not been supplied.</p>
      </Section>
    </article></div>
    <section className="train-ending"><p className="train-eyebrow">Keep exploring</p><h2>On to the next project.</h2><Link href={`/work/${next.slug}`} className="train-next-card"><div><h3>{next.title}</h3><p>{next.summary}</p></div></Link><Link className="train-back" href="/work">All projects</Link></section>
  </main>;
}
