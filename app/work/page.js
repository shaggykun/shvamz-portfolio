import Image from "next/image";
import Link from "next/link";
import { projects } from "../projects";

export const metadata = { title: "Work — Shivam Designs" };

const covers = {
  "project-one": { src: "/images/rail-operations-showcase.webp", alt: "Train staff application design showcase" },
  "project-two": { src: "/images/adani-electricity-showcase.webp", alt: "Adani Electricity mobile application design showcase" },
};

export default function WorkPage() {
  return <main id="content" className="standalone-page work-page">
    <header className="work-page-intro">
      <p className="page-eyebrow">Selected work</p>
      <h1>Different challenges.<br /><em>Thoughtful design.</em></h1>
      <p>A selection of work across mobile apps, enterprise platforms, and connected devices.</p>
    </header>
    <section className="work-collection" aria-label="Projects">
      {projects.map((project, index) => {
        const cover = project.showcase || covers[project.slug];
        return <Link className="project-card work-project" href={`/work/${project.slug}`} key={project.slug}>
          <div className="work-project-image"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 800px) 100vw, 55vw" loading={index === 0 ? "eager" : "lazy"} /></div>
          <div className="work-project-content">
            {project.nda && <span className="work-project-nda"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>NDA protected</span>}
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <span className="work-project-action">{project.nda ? "View project" : "View case study"}</span>
          </div>
        </Link>;
      })}
    </section>
    <section className="work-page-outro"><div><p className="page-eyebrow">Your project could be next</p><h2>Have a challenge in mind?</h2></div><Link className="hero-cta" href="/contact">Let&apos;s talk</Link></section>
  </main>;
}
