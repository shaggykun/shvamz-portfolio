import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../projects";
import TrainStaffCaseStudy from "../../components/train-staff-case-study";
import HumBeeCaseStudy from "../../components/humbee-case-study";
import AdaniCaseStudy from "../../components/adani-case-study";
import ScrollTop from "./scroll-top";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  if (slug === "project-one") return <TrainStaffCaseStudy next={next} />;
  if (slug === "project-two") return <AdaniCaseStudy next={next} />;
  if (slug === "project-four") return <HumBeeCaseStudy next={next} />;
  return (
    <main id="content" className="case-page">
      <ScrollTop />
      <nav className="case-nav"><Link href="/">SHIVAM</Link><Link href="/#work">Close case ×</Link></nav>
      <header className="case-hero"><p>(CASE STUDY / {project.year})</p><h1>{project.title}</h1><div><span>{project.role}</span><span>{project.summary}</span></div></header>
      <div className={`case-cover visual-${projects.indexOf(project) + 1}`}><span>Replace with project hero image</span></div>
      <Link className="next-case" href={`/work/${next.slug}`}><small>NEXT CASE</small><span>{next.title} <b>↗</b></span></Link>
    </main>
  );
}
