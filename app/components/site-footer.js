import Link from "next/link";
import BrandWordmark from "./brand-wordmark";

export default function SiteFooter() { return (
      <footer>
        <Link className="wordmark footer-mark" href="/" aria-label="Shivam Designs home"><BrandWordmark /></Link>
        <div><Link href="/">Home</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
        <p>© 2026 Shivam Designs. All rights reserved.</p>
      </footer>
); }
