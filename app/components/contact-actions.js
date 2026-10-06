import Link from "next/link";

export default function ContactActions() {
  return <div className="contact-actions">
    <Link className="contact-button contact-button-primary" href="/contact">Contact Me <span aria-hidden="true">↗</span></Link>
    <Link className="contact-button" href="/resume">View Resume <span aria-hidden="true">↗</span></Link>
  </div>;
}
