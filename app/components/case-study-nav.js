"use client";

import { useEffect, useRef, useState } from "react";

export default function CaseStudyNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.[0]);
  const navRef = useRef(null);

  useEffect(() => {
    const targets = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.min(190, window.innerHeight * .3);
      let current = targets[0];
      for (const section of targets) {
        if (section.getBoundingClientRect().top <= readingLine) current = section;
      }
      if (current) setActive(current.id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    targets.forEach((target) => resize.observe(target));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  useEffect(() => {
    // Keep the active link visible within the mobile strip without moving the page.
    const nav = navRef.current;
    const link = nav?.querySelector('[aria-current="location"]');
    if (nav && link && nav.scrollWidth > nav.clientWidth) {
      nav.scrollLeft = link.offsetLeft - nav.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    }
  }, [active]);

  return <nav ref={navRef} aria-label="Case study sections">
    <p>On this page</p>
    {sections.map(([id, label], index) => <a href={`#${id}`} key={id} className={active === id ? "is-active" : undefined} aria-current={active === id ? "location" : undefined}>
      <span>{String(index + 1).padStart(2, "0")}</span>{label}
    </a>)}
  </nav>;
}
