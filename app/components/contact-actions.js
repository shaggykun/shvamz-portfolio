import Link from "next/link";

export default function ContactActions() {
  return <div className="contact-actions">
    <Link className="contact-button contact-button-primary" href="/contact">Contact Me</Link>
    <a className="contact-button contact-button-secondary" href="/resume/Shivam_Tiwari_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
  </div>;
}
