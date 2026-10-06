import Image from "next/image";
import Link from "next/link";
import CaseStudyNav from "./case-study-nav";
import ScrollTop from "../work/[slug]/scroll-top";

const sections = [["humbee-overview", "Overview"], ["humbee-research", "Research"], ["humbee-landscape", "The landscape"], ["humbee-insights", "Key themes"], ["humbee-personas", "User needs"], ["humbee-direction", "Product direction"], ["humbee-next", "Next steps"]];

function Section({ id, number, title, children }) {
  return <section className="train-section" id={id}><div className="train-section-title"><span>{number}</span><h2>{title}</h2></div>{children}</section>;
}

export default function HumBeeCaseStudy({ next }) {
  return <main id="content" className="train-case train-case-refined humbee-case">
    <ScrollTop />
    <header className="train-hero humbee-hero">
      <Link className="train-back" href="/work">← All projects</Link>
      <div className="train-hero-layout">
        <div className="train-hero-copy">
          <p className="train-eyebrow">HumBee · An avatar based social network</p>
          <h1>Connection first.<br /><em>Identity later.</em></h1>
          <p className="train-lead">An avatar-first social and dating concept that lets people meet through interests and conversation, then reveal their identity when both feel ready.</p>
        </div>
        <div className="humbee-brand-visual"><Image src="/images/humbee-logo.png" width={840} height={1078} sizes="(max-width: 800px) 55vw, 24vw" alt="HumBee logo: a cream bee symbol on a coral app icon, with the HumBee wordmark" preload /></div>
      </div>
      <dl className="train-project-details">
        <div><dt>Product</dt><dd>Avatar-first social + dating</dd></div>
        <div><dt>Focus</dt><dd>UX research & concept direction</dd></div>
        <div><dt>Stage</dt><dd>Research before first build</dd></div>
        <div><dt>Core idea</dt><dd>Private discovery · mutual reveal</dd></div>
      </dl>
    </header>

    <div className="train-editorial-layout">
      <aside className="train-section-nav"><CaseStudyNav sections={sections} /></aside>
      <article className="train-article">
        <Section id="humbee-overview" number="01" title="Meet the person before the profile.">
          <div className="train-reading"><p>Photo-first discovery can expose someone’s identity before they are comfortable sharing it. HumBee explores a different starting point: an avatar, shared interests, and a conversation.</p><p>The concept gives people control over disclosure. Identity reveal is optional and requires agreement from both sides.</p></div>
          <div className="humbee-opportunity"><span className="humbee-label">The opportunity</span><h3>Make the first hello feel more comfortable.</h3><p>Create space for personality and conversation before appearance becomes the first filter.</p></div>
          <figure className="humbee-concept-flow"><ol><li><span>01</span><h3>Discover</h3><p>Meet through an avatar and shared interests.</p></li><li><span>02</span><h3>Connect</h3><p>Start a conversation while identity stays private.</p></li><li><span>03</span><h3>Reveal</h3><p>Share identity only when both people choose to.</p></li></ol><figcaption>Proposed interaction model · not a shipped product flow.</figcaption></figure>
        </Section>

        <Section id="humbee-research" number="02" title="Understand comfort before designing screens.">
          <div className="train-reading"><p>The research notes explore photo privacy, matching relevance, first-message hesitation, and what makes anonymous interaction trustworthy. The aim is to understand the conditions people need before sharing their identity.</p></div>
          <div className="humbee-methods">{[
            ["Explore the landscape", "Desk research and competitor review to identify familiar patterns and gaps."],
            ["Listen to expectations", "Survey and interview notes focused on privacy, safety, matching, and disclosure."],
            ["Map the experience", "Journey and mental-model mapping to connect user concerns with product decisions."],
            ["Prioritise the concept", "Persona synthesis and feature prioritisation before a first clickable prototype."],
          ].map(([title, description], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
          <details className="humbee-research-note"><summary>Research context</summary><p>The document describes students and IT professionals as the intended research audience. The workbook includes additional draft participant entries and no raw survey responses, so sample totals and survey averages are omitted pending confirmation. Qualitative themes below summarise the supplied notes; they are not launch outcomes.</p></details>
        </Section>

        <Section id="humbee-landscape" number="03" title="A familiar space. A different starting point.">
          <div className="train-reading"><p>The supplied competitor review compares photo-led discovery with avatar-led social identity. HumBee’s proposed distinction is the combination of private discovery, conversation, and mutual disclosure.</p></div>
          <div className="humbee-competitors">{[
            ["Tinder", "Photo-led discovery", "The notes describe a familiar matching model where appearance is an early signal.", "Lead with interests and conversation."],
            ["Bumble", "Profile-led connections", "The review highlights clear connection intent, with discovery still centred on profiles and photos.", "Make privacy and reveal control part of the starting experience."],
            ["Vibe / Hike", "Avatar-led identity", "The notes use avatar-based interaction as a reference for digital social identity.", "Combine avatar discovery with explicit disclosure and safety controls."],
          ].map(([name, model, observation, opportunity]) => <div key={name}><div className="humbee-competitor-heading"><h3>{name}</h3><span>{model}</span></div><p>{observation}</p><div className="humbee-competitor-opportunity"><span>HumBee opportunity</span><p>{opportunity}</p></div></div>)}</div>
          <p className="train-evidence-note">Historical review from the supplied project documents; not a claim about competitors’ current features.</p>
        </Section>

        <Section id="humbee-insights" number="04" title="Privacy needs more than an avatar.">
          <div className="train-evidence-grid">{[
            ["Control before exposure", "The notes emphasise deciding when personal identity becomes visible.", "Keep real identity private at discovery; make reveal mutual and optional."],
            ["Relevance before speed", "A quick match only feels useful when there is something in common.", "Use interests, connection intent, and conversation prompts as early signals."],
            ["Trust alongside anonymity", "An avatar does not remove concerns about fake profiles or uncomfortable interactions.", "Keep block and report accessible, with moderation and credibility signals."],
          ].map(([title, finding, response]) => <div key={title}><h3>{title}</h3><p>{finding}</p><p className="humbee-theme-response"><strong>Direction</strong><br />{response}</p></div>)}</div>
          <p className="train-evidence-note">Qualitative synthesis from Interview Notes and Themes; proposed responses, not measured improvements.</p>
        </Section>

        <Section id="humbee-personas" number="05" title="Different people. Shared need for control.">
          <div className="train-reading"><p>The persona summaries capture three ways people may approach the concept. They represent needs and behaviours, rather than individual participant profiles.</p></div>
          <div className="humbee-personas">{[
            ["The private student", "Wants to meet people without immediate recognition by classmates or strangers.", "Avatar-first discovery, disclosure control, and visible safety tools."],
            ["The fast explorer", "Enjoys new connections but loses interest in repetitive swiping.", "Quick discovery with shared interests and a clear reason to connect."],
            ["The working privacy seeker", "Wants personal social or dating activity separate from professional circles.", "Discreet discovery and credible signals before revealing identity."],
          ].map(([title, goal, need], index) => <div key={title}><span className="humbee-persona-index">0{index + 1}</span><div><h3>{title}</h3><p>{goal}</p><p><strong>Needs:</strong> {need}</p></div></div>)}</div>
        </Section>

        <Section id="humbee-direction" number="06" title="Build around privacy, relevance, and choice.">
          <div className="humbee-priority-panel"><div><span className="humbee-label">Core concept</span><h3>Private by default.</h3><p>Avatar-first identity, interest signals, mutual reveal, and accessible block/report actions form the proposed foundation.</p></div><div><span className="humbee-label">Matching concept</span><h3>A five-second starting point.</h3><p>Fast matching is a concept target to test. Relevance and user confidence matter as much as speed; five seconds is not a measured result.</p></div></div>
          <div className="train-direction-list">{[
            ["Start the conversation", "Shared prompts and icebreakers could reduce the pressure of the first message."],
            ["Set expectations", "Dating or friendship intent could make the purpose of a connection clearer."],
            ["Support trust", "Moderation and verification signals need to balance privacy with accountability."],
          ].map(([title, text]) => <div key={title}><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
          <figure className="humbee-journey"><p className="humbee-label">Proposed flow to prototype</p><ol>{["Sign up", "Create avatar", "Find a match", "First chat", "Mutual reveal"].map((step) => <li key={step}>{step}</li>)}</ol><figcaption>Safety controls should remain accessible throughout the journey. Detailed UI and interaction rules are still to be designed.</figcaption></figure>
        </Section>

        <Section id="humbee-next" number="07" title="From research to a first prototype.">
          <div className="train-reading"><p>The supplied project documents end before detailed UI design and development. The next step is to translate the research direction into information architecture, user flows, and a clickable prototype.</p><p>Validation should cover sign-up, avatar creation, match relevance, starting a conversation, mutual reveal, and finding safety actions. Iteration would focus on where people hesitate or misunderstand how privacy works.</p></div>
          <div className="humbee-validation"><span className="humbee-label">Questions for the next round</span><ul><li>Do people understand what stays private before a reveal?</li><li>Does a fast match feel relevant enough to start a conversation?</li><li>Can both people control disclosure without pressure?</li><li>Can people find block and report when they need them?</li></ul></div>
          <p className="train-evidence-note">No shipped features, completed usability results, or business outcomes are claimed for this research-stage concept.</p>
        </Section>
      </article>
    </div>
    <section className="train-ending"><p className="train-eyebrow">Keep exploring</p><h2>On to the next project.</h2><Link href={`/work/${next.slug}`} className="train-next-card"><div><h3>{next.title}</h3></div><span aria-hidden="true">↗</span></Link><Link className="train-back" href="/work">← All projects</Link></section>
  </main>;
}
