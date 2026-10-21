import Link from "next/link";
import Image from "next/image";
import CaseStudyScreen from "./case-study-screen";
import CaseStudyNav from "./case-study-nav";
import { trainStaffScreens as screens } from "../train-staff";
import ScrollTop from "../work/[slug]/scroll-top";

const sections = [["overview", "Overview"], ["challenge", "The challenge"], ["approach", "Design direction"], ["solution", "Key workflows"], ["launch", "Launch & next steps"], ["impact", "Impact"]];
const publishedSections = sections.filter(([id]) => ["overview", "launch", "impact"].includes(id));

function ScreenGroup({ names, caption, draft, showcase = false, showLabels = true, diagonal = false, horizontal = false }) {
  const visible = names.filter((name) => draft || screens[name].src);
  if (!visible.length) return null;
  return <figure className={`train-screen-group${showcase ? " train-screen-showcase" : ""}${diagonal ? " train-screen-diagonal" : ""}${horizontal ? " train-screen-horizontal" : ""}`}>
    <div className="train-screen-grid">{visible.map((name) => <CaseStudyScreen key={name} screen={screens[name]} draft={draft} showLabel={!showcase && showLabels} />)}</div>
    {caption && <figcaption>{caption}</figcaption>}
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
      <Link className="train-back" href="/work">All projects</Link>
      <div className="train-hero-layout">
        <div className="train-hero-copy">
      <div className="train-hero-meta"><p className="train-eyebrow">FirstGroup · UK Train Staff Application</p><span className="train-launch-label">Launched</span></div>
      <h1><em>Designed</em> for<br />railway staff.</h1>
      <p className="train-lead">I worked on an iOS and Android train staff app for FirstGroup in the UK. It helps railway staff check their duties, keep up with service changes, and report issues during a shift.</p>
        </div>
        <div className="train-hero-visual">
          <Image src="/images/train-staff-hero.webp" width={2800} height={2800} sizes="(max-width: 800px) 140vw, 65vw" alt="Train Staff application phone mockup showing duty route progress, facility and occupancy status, train location, and reporting actions" preload />
          <div className="train-image-note train-image-note-route">
            <span>Check the route<br />and next stop.</span>
            <svg viewBox="0 0 130 70" aria-hidden="true"><path d="M116 8C120 52 70 65 12 48M12 48l15-9M12 48l12 13" /></svg>
          </div>
          <div className="train-image-note train-image-note-actions">
            <span>Report an issue<br />from here.</span>
            <svg viewBox="0 0 130 65" aria-hidden="true"><path d="M10 8C3 39 48 55 118 40M118 40l-15-7M118 40l-10 14" /></svg>
          </div>
        </div>
      </div>
      <dl className="train-project-details">{[
        ["Role", "UI/UX Designer & UX Researcher"], ["Timeline", "August 2025 – January 2026"],
        ["Platform", "iOS & Android"], ["Status", "Launched"],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <ScreenGroup names={["trainDuties", "stationDuties", "dutyStatuses", "trainFormation", "arrivals", "serviceOverview", "trainDetails"]} showcase draft={draft} />
    </header>

    <div className="train-editorial-layout">
      <aside className="train-section-nav"><CaseStudyNav sections={draft ? sections : publishedSections} /></aside>
      <article className="train-article">
        <Section id="overview" number="01" title="About the project">
          <div className="train-reading"><p>Railway staff have a lot to keep track of during a shift: which service they are assigned to, where it is heading, whether anything has changed, and what needs to be reported. This app brings those tasks together on their phone.</p><p>My role covered UI/UX design and UX research. I focused on making the information easy to read and the steps easy to follow, so staff could check what they needed and get back to their work.</p></div>

        </Section>

        {draft && <>
          <Section id="challenge" number="02" title="What needed attention">
            <p className="train-section-caption">The project workbook helped frame three areas to work on.</p>
            <div className="train-evidence-grid">{[
              ["Finding duty details", "Staff need to know which service they are working on and where it is going. My aim was to keep those details together rather than make someone look through several screens."],
              ["Reporting an issue", "A report can involve a description, supporting evidence, and a final check before sending. I wanted those steps to feel like one task, with a clear indication of what was still needed."],
              ["Following service changes", "A delay label only tells part of the story. Staff also need to see where the train is and what the change means for its journey. The design direction was to show that information together."],
            ].map(([title, description], index) => <div key={title}><span className="train-card-label">2.{index + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
          </Section>

          <Section id="approach" number="03" title="How I approached the design">
            <div className="train-reading"><p>I organised the design around three things staff need to do during a shift: check their duty, report a problem, and follow the service. Each screen should make the next step easy to find.</p></div>
            <div className="train-direction-list">{[
              ["Keep duty details together", "Keep the assigned service and route details close together, with a way to open more information when it is needed."],
              ["Make reporting easy to follow", "Break the report into manageable steps. If something is missing, explain it beside the field so staff can fix it before sending."],
              ["Show where the train is", "Show the previous, current, and next stops. Add clear status labels so staff can read the situation without relying on colour alone."],
            ].map(([title, text], index) => <div key={title}><span>3.{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
            <p className="train-evidence-note">These were design goals. I do not have task-level results to say how much each change helped.</p>
          </Section>

          <Section id="solution" number="04" title="A closer look at the main tasks">
            <p className="train-section-caption">The workflows below show the design direction for duties, reporting, and service progress.</p>
            <div className="train-walkthrough"><h3><span className="train-number-circle">4.1</span>Check the assigned duty</h3><div className="train-reading"><p>The duty overview is the starting point. I wanted staff to be able to pick out their current service, check the route, and see what was coming next. Separating active, upcoming, and finished duties makes the list easier to scan.</p></div>
              <ScreenGroup names={["activeDutyList", "activeDutyDetails", "activePassengerCount", "activeDutyAndroid"]} diagonal showLabels={false} draft={draft} />
            </div>
            <div className="train-walkthrough"><h3><span className="train-number-circle">4.2</span>Report a problem</h3><div className="train-reading"><p>Staff can report an equipment defect or record a delay from their duty. The forms keep the coach or station details alongside the description, with attachments available when more context is needed.</p></div>
              <ScreenGroup names={["defectList", "addDefect", "viewDefect", "delayTime", "delayAttachments"]} horizontal showLabels={false} draft={draft} />
            </div>
            <div className="train-walkthrough"><h3><span className="train-number-circle">4.3</span>Check service progress</h3><div className="train-reading"><p>The progress view puts the journey in order, showing where the train has been and where it is going next. The proposed filters would help staff narrow down updates, then open a delay to read its reason and who was handling it.</p></div>
            </div>
          </Section>
        </>}

        <Section id="launch" number={draft ? "05" : "02"} title="Launch and what comes next">
          <div className="train-reading"><p>I worked on the project from August 2025 to January 2026. The app launched on both iOS and Android.</p><p>After launch, daily active time increased by 51% and daily active users increased by 34%. Those numbers show a change in usage. To understand how well the design supports the work, I would also want to see staff completing the main tasks.</p></div>
          <div className="train-next-steps"><span>What I would test next</span><p>Can staff find their duty, check a service change, and submit a report without help? I would look at where they pause, go back, or need an explanation.</p></div>
        </Section>
        <Section id="impact" number={draft ? "06" : "03"} title="Results after launch">
          <p className="train-section-caption">The recorded changes in app usage were:</p>
          <div className="train-impact-grid">
            <div><span className="train-impact-value">+51%</span><h3>Daily active time</h3><p>Daily active time increased by 51%.</p></div>
            <div><span className="train-impact-value">+34%</span><h3>Daily active users</h3><p>Daily active users increased by 34%.</p></div>
          </div>
          
        </Section>
      </article>
    </div>

    <section className="train-ending"><p className="train-eyebrow">Keep exploring</p><h2>More of my work</h2><Link href={`/work/${next.slug}`} className="train-next-card"><div><h3>{next.title}</h3></div></Link><Link className="train-back" href="/work">All projects</Link></section>
  </main>;
}
