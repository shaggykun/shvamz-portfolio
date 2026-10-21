import Link from "next/link";

export const metadata = { title: "Contact | Shivam Designs" };

export default function ContactPage() {
  return <main id="content" className="standalone-page contact-page">
    <div className="contact-layout">
      <header className="contact-intro"><p className="page-eyebrow">Contact</p><h1>Let&apos;s <em>talk.</em></h1><p>Tell me what you&apos;re working on.</p><div className="contact-page-actions"><Link className="hero-cta" href="/work">Explore projects</Link><a className="pill" href="/resume/Shivam_Tiwari_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a></div></header>
      <address className="contact-methods" aria-label="Contact details">
        <a className="contact-method" href="mailto:shivam.me202@gmail.com">
          <span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></svg></span>
          <span className="contact-method-copy"><span className="contact-method-label">Email</span><span className="contact-method-value">shivam.me202@gmail.com</span></span>
        </a>
        <a className="contact-method" href="tel:+918529429299">
          <span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z" /></svg></span>
          <span className="contact-method-copy"><span className="contact-method-label">Phone</span><span className="contact-method-value">+91 8529429299</span></span>
        </a>
      </address>
    </div>
  </main>;
}
