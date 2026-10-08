import Image from "next/image";
import Link from "next/link";
import { projects } from "../projects";

export const metadata = { title: "Work — Shivam" };

export default function WorkPage() {
  return <main id="content" className="standalone-page work-page">
    <header className="page-intro"><p className="page-eyebrow">Product design</p><h1>My<br /><em>projects.</em></h1><p>Explore my work across research, product experiences, and interface design.</p></header>
    <section className="work-section" aria-label="Projects"><div className="project-grid">
      {projects.map((project, index) => <Link className="project-card" href={`/work/${project.slug}`} key={project.slug}>
        <div className={`project-card-image visual-${index + 1}`} style={project.showcase ? { aspectRatio: "1920 / 1320", minHeight: 0 } : undefined}>{project.showcase ? <Image src={project.showcase.src} alt={project.showcase.alt} fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "contain" }} /> : project.slug === "project-two" ? <Image className="adani-project-screen" src="/images/adani/welcome.webp" width={750} height={1624} sizes="200px" alt="Adani Electricity mobile application welcome screen" /> : project.slug === "project-four" ? <Image className="humbee-project-logo" src="/images/humbee-logo.webp" width={840} height={1078} sizes="165px" alt="HumBee avatar-first social network logo" /> : <div className="browser-mockup"><i /><i /><i /><div>{project.title}</div></div>}<span className="view-badge">View case ↗</span></div>
        <div className="project-card-copy"><div><h2>{project.title}</h2><p>{project.summary}</p></div><span>{project.year}</span></div>
      </Link>)}
    </div></section>
  </main>;
}
