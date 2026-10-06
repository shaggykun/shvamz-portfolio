"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuWasOpen = useRef(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const handleMenuKeys = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab" && menuOpen) {
        const links = menuLinksRef.current;
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          menuButtonRef.current?.focus();
        } else if (!event.shiftKey && document.activeElement === menuButtonRef.current) {
          event.preventDefault();
          first?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleMenuKeys);
    if (menuOpen) {
      menuWasOpen.current = true;
      requestAnimationFrame(() => menuLinksRef.current[0]?.focus());
    } else if (menuWasOpen.current) {
      menuButtonRef.current?.focus();
      menuWasOpen.current = false;
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleMenuKeys);
    };
  }, [menuOpen]);

  return (<>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Shivam home">SHIVAM</Link>
        <div className="header-meta">
          <div className="location">India<br /><small>IST (GMT+5:30)</small></div>
          <Link className="pill pill-small" href="/contact">Let&apos;s talk</Link>
          <button ref={menuButtonRef} className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}><span /><span /></button>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Main navigation">
          {[['Home','/'],['Work','/work'],['About','/about'],['Contact','/contact']].map(([label, href], index) => (
            <Link key={label} ref={(node) => { menuLinksRef.current[index] = node; }} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}</Link>
          ))}
        </nav>
      </div>

    </>);
}
