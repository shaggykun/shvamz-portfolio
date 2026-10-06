import Link from "next/link";

export const metadata = { title: "Contact — Shivam" };

export default function ContactPage() {
  return <main id="content" className="standalone-page contact-page">
    <header className="page-intro"><p className="page-eyebrow">Let’s work together</p><h1>Have something<br /><em>in mind?</em></h1><p>Let’s talk about your product, the people who use it, and what we can make better.</p></header>
    <section className="contact-details"><div><h2>Meaningful products start with a conversation.</h2><p>For product design, UX research, and thoughtful interfaces across FinTech, B2C, B2B, and SaaS.</p><a className="contact-email" href="mailto:shivam.me202@gmail.com">shivam.me202@gmail.com <span aria-hidden="true">↗</span></a></div><div className="contact-location"><span>Based in</span><p>India</p><small>IST · GMT+5:30</small><Link className="pill" href="/resume">View Resume ↗</Link></div></section>
  </main>;
}
