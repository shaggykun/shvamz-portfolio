import Link from "next/link";
import NdaPasswordForm from "./nda-password-form";

export default function NdaRestrictedPage({ projectTitle }) {
  return <main id="content" className="standalone-page nda-restricted-page"><div className="nda-restricted-card"><NdaPasswordForm projectTitle={projectTitle} headingAs="h1" /><Link className="nda-back" href="/#work">Back to projects</Link></div></main>;
}
