import Link from "next/link";

export default function ContactActions() {
  return <div className="contact-actions">
    <Link className="contact-button contact-button-primary" href="/contact">Contact Me</Link>
    <Link className="contact-button contact-button-secondary" href="/resume">View Resume</Link>
  </div>;
}
