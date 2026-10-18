import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About — Shivam Designs",
  description: "Meet Shivam, a Senior Product Designer working across clients, products, and domains—from research and product experiences to interfaces, brand identity, and motion.",
};

const capabilities = [
  ["UX research", "Find the problem worth solving.", "I can help understand user needs through interviews, usability studies, and competitive analysis, then turn the findings into a clear direction for the product."],
  ["Experience design", "Make complex journeys feel simple.", "From information architecture and user flows to wireframes and prototypes, I connect the steps of an experience so people know where they are and what to do next."],
  ["User interface design", "Bring clarity to every screen.", "I design web and mobile interfaces with thoughtful hierarchy, typography, and visual detail. Reusable components and design systems help keep the experience consistent as the product grows."],
  ["Interaction design", "Make every action feel considered.", "I shape feedback, transitions, and micro-interactions that explain what is happening, guide the next action, and add personality without getting in the way."],
  ["Brand identity", "Give the product a personality.", "I can develop a visual direction through logos, colour, typography, and graphic elements, then carry that identity into a consistent digital experience."],
  ["Motion graphics", "Tell a story through movement.", "I create motion-led visuals and animations that explain ideas, bring a brand to life, and make communication more engaging."],
];
const interests = [
  ["Travel", "Exploring new places, different cultures, and the small details that make each place feel unique.", "M3 21h18M5 17l5-7 4 4 3-5 4 8M16 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"],
  ["Making films", "Playing with framing, movement, and editing to turn moments and ideas into stories.", "M3 5h13v14H3ZM16 10l5-3v10l-5-3M6 8h7"],
  ["Music", "Listening to music, discovering different sounds, and enjoying the mood a good track can create.", "M9 18V5l11-2v13M9 7l11-2M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3ZM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z"],
  ["Movies", "Getting lost in a good film and noticing how storytelling, visuals, and sound work together.", "M3 8h18v13H3ZM3 8V3h18v5M7 3l3 5M14 3l3 5M10 12l5 3-5 3Z"],
];

export default function AboutPage() {
  return <main id="content" className="standalone-page about-profile">
    <header className="about-profile-hero">
      <div className="about-profile-heading">
        <p className="page-eyebrow">A little about me</p>
        <h1>A designer.<br /><em>A curious mind.</em></h1>
        <p className="about-profile-lead">Hi, I&apos;m Shivam, a Senior Product Designer with 6 years of experience turning complex ideas into clear, useful digital experiences.</p>
        <div className="about-profile-actions"><Link className="hero-cta" href="/work">Explore my work</Link><Link className="pill" href="/contact">Get in touch</Link></div>
      </div>
      <div className="about-profile-portrait"><Image src="/images/shivam-about-portrait.webp" width={1200} height={1599} sizes="(max-width: 800px) 90vw, 440px" loading="eager" alt="Shivam standing outdoors against a city skyline at night" /></div>
    </header>

    <section className="about-profile-story" aria-labelledby="about-story-title">
      <div><p className="page-eyebrow">Across clients &amp; contexts</p><h2 id="about-story-title">Different challenges.<br />The same curiosity.</h2></div>
      <div className="about-profile-reading"><p>I&apos;ve worked on multiple projects with multiple clients, collaborating with product teams and developers to move from understanding a problem to designing a practical solution.</p><p>My work spans FinTech, rail operations, utility services, enterprise tools, wearables, and social products, across B2C, B2B, and SaaS experiences. That range has taught me to adapt to different users, business needs, and levels of complexity.</p><p>A customer checking a bill and a team member reviewing a document need different things. I focus on understanding that context, organising the information, and making the next action clear.</p><ul className="about-domain-tags" aria-label="Domains and product types">{["FinTech", "Rail & mobility", "Utilities", "Enterprise & SaaS", "Wearables", "Social products", "B2C & B2B"].map((domain) => <li key={domain}>{domain}</li>)}</ul></div>
    </section>

    <section className="about-profile-capabilities" aria-labelledby="about-capabilities-title">
      <div className="about-profile-section-heading"><p className="page-eyebrow">What I can do</p><h2 id="about-capabilities-title">From the first question<br />to the final detail.</h2><p>I can help shape a new product, simplify an existing experience, or give an interface a more coherent visual language.</p></div>
      <div className="about-capabilities-grid">{capabilities.map(([title, subtitle, description], index) => <article key={title}><span className="about-capability-number">0{index + 1}</span><h3>{title}</h3><h4>{subtitle}</h4><p>{description}</p></article>)}</div>
    </section>

    <section className="about-profile-process" aria-labelledby="about-process-title">
      <div className="about-profile-section-heading"><p className="page-eyebrow">How I approach the work</p><h2 id="about-process-title">Think clearly.<br />Make thoughtfully.</h2></div>
      <ol className="about-process-steps">{[
        ["Understand the context", "Start with the people, the problem, and the business needs. Ask questions before deciding what the solution should be."],
        ["Explore and make", "Map the experience, try different directions, and use wireframes and prototypes to make ideas concrete."],
        ["Refine together", "Work with the team, consider feedback and implementation constraints, and refine both the overall flow and the small details."],
      ].map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <Link className="pill" href="/contact">Let&apos;s work together</Link>
    </section>

    <section className="about-profile-personal" aria-labelledby="about-personal-title">
      <div className="about-profile-section-heading"><p className="page-eyebrow">Beyond the design file</p><h2 id="about-personal-title">There&apos;s more<br /><em>to the story.</em></h2><p>Outside work, I travel, make films, listen to music, and watch movies. Different ways to explore, observe, and enjoy a good story.</p></div>
      <div className="about-interests-grid">{interests.map(([title, description, icon]) => <article key={title}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
  </main>;
}
