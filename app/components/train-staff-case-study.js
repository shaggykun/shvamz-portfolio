import Link from "next/link";
import Image from "next/image";
import CaseStudyScreen from "./case-study-screen";
import CaseStudyNav from "./case-study-nav";
import { trainStaffScreens as screens } from "../train-staff";
import ScrollTop from "../work/[slug]/scroll-top";

const sections = [["overview", "Overview"], ["challenge", "The challenge"], ["approach", "Design direction"], ["solution", "Key workflows"], ["launch", "Launch & next steps"], ["impact", "Impact"]];
const publishedSections = sections.filter(([id]) => ["overview", "launch", "impact"].includes(id));

function ScreenGroup({ names, caption, draft }) {
  const visible = names.filter((name) => draft || screens[name].src);
  if (!visible.length) return null;
  return <figure className="train-screen-group">
    <div className="train-screen-grid">{visible.map((name) => <CaseStudyScreen key={name} screen={screens[name]} draft={draft} />)}</div>
    <figcaption>{caption}</figcaption>
  </figure>;
}
function Section({ id, number, title, children }) {
  return <section className="train-section" id={id}><div className="train-section-title"><span>{number}</span><h2>{title}</h2></div>{children}</section>;
}

export default function TrainStaffCaseStudy({ next }) {
  const draft = process.env.TRAIN_STAFF_PUBLISHED !== "true";
  return <main id="content" className="train-case train-case-refined">
    <ScrollTop />
    <header className="train-hero">
      <Link className="train-back" href="/work">← All projects</Link>
      <div className="train-hero-layout">
        <div className="train-hero-copy">
      <div className="train-hero-meta"><p className="train-eyebrow">UK based Train Staff Application</p><span className="train-launch-label">Launched</span></div>
      <h1><em>Designed</em> for<br />railway staff.</h1>
      <p className="train-lead">An iOS and Android application for a UK-based train operating company. Designed to help railway staff find essential duty information, follow operational updates, and complete everyday tasks with greater clarity.</p>
        </div>
        <div className="train-hero-visual">
          <Image src="/images/train-staff-hero.png" width={2800} height={2800} sizes="(max-width: 800px) 140vw, 65vw" alt="Train Staff application phone mockup showing duty route progress, facility and occupancy status, train location, and reporting actions" preload />
          <div className="train-image-note train-image-note-route">
            <span>Duty context,<br />at a glance.</span>
            <svg viewBox="0 0 130 70" aria-hidden="true"><path d="M116 8C120 52 70 65 12 48M12 48l15-9M12 48l12 13" /></svg>
          </div>
          <div className="train-image-note train-image-note-actions">
            <span>Everyday actions,<br />within reach.</span>
            <svg viewBox="0 0 130 65" aria-hidden="true"><path d="M10 8C3 39 48 55 118 40M118 40l-15-7M118 40l-10 14" /></svg>
          </div>
        </div>
      </div>
      <dl className="train-project-details">{[
        ["Role", "UI/UX Designer & UX Researcher"], ["Timeline", "August 2025 – January 2026"],
        ["Platform", "iOS & Android"], ["Status", "Launched"],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <ScreenGroup names={["home", "duty", "report"]} caption="Home, active duty, and reporting · application screenshots pending." draft={draft} />
    </header>

    <div className="train-editorial-layout">
      <aside className="train-section-nav"><CaseStudyNav sections={draft ? sections : publishedSections} /></aside>
      <article className="train-article">
        <Section id="overview" number="01" title="One app. A working day.">
          <div className="train-reading"><p>Throughout a shift, railway staff need to understand their duties, respond to changes, and record operational issues. The application brings these everyday tasks into one mobile experience for a UK-based train operating company, with essential information close at hand.</p><p>I worked as a UI/UX Designer and UX Researcher. My focus was to make information easier to understand and interactions easier to follow in the context of a busy working day.</p></div>

        </Section>

        {draft && <>
          <Section id="challenge" number="02" title="Less searching. More clarity.">
            <p className="train-section-caption">Illustrative challenges from the operational workbook.</p>
            <div className="train-evidence-grid">{[
              ["Duty context", "When duty and route details are spread across screens, staff have to piece together the context. The proposed direction brings the information needed for an active duty into one view."],
              ["Issue reporting", "Long forms and separate attachment steps can make reporting feel fragmented. The proposal keeps details, supporting evidence, and confirmation within a clear sequence."],
              ["Live status", "A delay is easier to interpret when its status, reason, and route context are visible together. The proposal uses clearer progress information and filters to help staff find relevant updates."],
            ].map(([title, description], index) => <div key={title}><span className="train-card-label">0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
          </Section>

          <Section id="approach" number="03" title="Put the task first.">
            <div className="train-reading"><p>The proposed direction is simple: surface current duty, keep reporting focused, and make status easy to interpret.</p></div>
            <div className="train-direction-list">{[
              ["Bring context together", "Place essential duty and route information together, with direct access to details instead of repeated navigation."],
              ["Keep reporting in one flow", "Guide staff through report details and evidence, using inline validation to explain what is needed before submission."],
              ["Make progress readable", "Show previous, current, and next stations alongside labelled delay states, so staff can interpret the current situation."],
            ].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
            <p className="train-evidence-note">Proposed responses from the source material. Benefits have not been measured.</p>
          </Section>

          <Section id="solution" number="04" title="Three moments that matter.">
            <p className="train-section-caption">Proposed workflows · final application screens pending.</p>
            <div className="train-walkthrough"><h3><span className="train-number-circle">01</span>Start with the duty</h3><div className="train-reading"><p>The proposed duty overview brings route information and current-duty context together. A clear distinction between active and upcoming duties would help staff find what matters now and prepare for what comes next.</p></div>
              <ScreenGroup names={["duty"]} caption="Active-duty overview · actual screen pending." draft={draft} />
            </div>
            <div className="train-walkthrough"><h3><span className="train-number-circle">02</span>Report with confidence</h3><div className="train-reading"><p>The proposed reporting flow guides staff through essential details, evidence attachments, and submission. Inline validation would clarify missing information, while a confirmation state would make the outcome of the action explicit.</p></div>
              <ol className="train-report-steps"><li>Details</li><li>Evidence</li><li>Confirmation</li></ol>
              <ScreenGroup names={["reportDetails", "reportEvidence", "reportConfirm"]} caption="Illustrative reporting sequence · actual screens pending." draft={draft} />
            </div>
            <div className="train-walkthrough"><h3><span className="train-number-circle">03</span>Understand the situation</h3><div className="train-reading"><p>The proposed progress view shows the previous, current, and next station. Filters would help staff locate relevant delays, while a consolidated detail view would keep the status, owner, and reason together.</p></div>
              <ScreenGroup names={["progress", "delayDetail"]} caption="Train progress and delay detail · actual screens pending." draft={draft} />
            </div>
          </Section>
        </>}

        <Section id="launch" number={draft ? "05" : "02"} title="Launched. Ready to learn.">
          <div className="train-reading"><p>The application launched on iOS and Android. My project timeline ran from August 2025 to January 2026.</p><p>Measured engagement increased: daily active time rose by 51%, and daily active users rose by 34%. A next evaluation could explore how independently staff complete core tasks.</p></div>
          <div className="train-next-steps"><span>Next to validate</span><p>Can staff complete these core tasks independently, and where do they need help?</p></div>
        </Section>
        <Section id="impact" number={draft ? "06" : "03"} title="Measured product impact.">
          <p className="train-section-caption">Measured engagement results.</p>
          <div className="train-impact-grid">
            <div><span className="train-impact-value">+51%</span><h3>Daily active time</h3><p>Increase in daily active time spent using the application.</p></div>
            <div><span className="train-impact-value">+34%</span><h3>Daily active users</h3><p>Increase in the number of users active in the application each day.</p></div>
          </div>
          
        </Section>
      </article>
    </div>

    <section className="train-ending"><p className="train-eyebrow">Keep exploring</p><h2>On to the next project.</h2><Link href={`/work/${next.slug}`} className="train-next-card"><div><h3>{next.title}</h3></div><span aria-hidden="true">↗</span></Link><Link className="train-back" href="/work">← All projects</Link></section>
  </main>;
}
