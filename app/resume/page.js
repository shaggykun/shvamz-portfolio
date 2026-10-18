import Link from "next/link";

export const metadata = { title: "Resume — Shivam Designs" };

export default function ResumePage() {
  return <main id="content" className="standalone-page resume-page">
    <header className="page-intro"><p className="page-eyebrow">Resume</p><h1>Shivam</h1><p>Senior Product Designer · India</p><p className="resume-note">The PDF resume will be available here soon. In the meantime, here’s a quick overview.</p></header>
    <section className="page-detail"><h2>Profile</h2><p>Six years of end-to-end product design experience. I simplify complex products into clear, useful experiences across FinTech, B2C, B2B, and SaaS.</p><h2>Capabilities</h2><ul><li>UX research: interviews, usability studies, synthesis, and actionable insights.</li><li>Experience design: user flows, information architecture, wireframes, and prototypes.</li><li>Interface design: accessible interfaces and scalable design systems.</li><li>Interaction design: motion and micro-interactions.</li></ul><Link className="pill" href="/work">View projects</Link></section>
  </main>;
}
