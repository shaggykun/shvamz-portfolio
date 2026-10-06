import Link from "next/link";

export default function SiteFooter() { return (
      <footer>
        <Link className="wordmark footer-mark" href="/">SHIVAM</Link>
        <div><Link href="/">Home</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
        <p>© 2026 Shivam. All rights reserved.</p>
      </footer>
); }
