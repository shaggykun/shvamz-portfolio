import Image from "next/image";
import Link from "next/link";
import AboutText from "../components/about-text";

export const metadata = { title: "About — Shivam" };

export default function AboutPage() {
  return <main id="content" className="standalone-page">
    <header className="page-intro"><p className="page-eyebrow">Senior Product Designer</p><h1>Design with<br /><em>purpose.</em></h1><p>Six years of turning complex products into clear, useful experiences.</p></header>
    <section className="about-intro section-light"><div className="about-content">
      <AboutText />
      <div className="about-illustration"><Image src="/images/about-designer-v3.webp" width={1024} height={1024} sizes="(max-width: 800px) 80vw, 32vw" alt="Illustration of Shivam working on a laptop" /></div>
    </div></section>
    <section className="page-detail"><h2>From understanding to interface.</h2><p>I work across UX research, experience design, interface design, and interaction design, with experience in FinTech, B2C, B2B, and SaaS.</p><Link className="pill" href="/work">Explore my work ↗</Link></section>
  </main>;
}
