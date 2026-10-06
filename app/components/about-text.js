"use client";

import { useEffect, useRef } from "react";

const aboutStatement = "I like figuring out where people get stuck and designing a better way forward. Over the past 6 years, I've worked with product teams and developers to turn complex ideas into intuitive UX and thoughtful UI that people can use with confidence.";

const aboutWords = aboutStatement.split(" ");

export default function AboutText() {
  const aboutTextRef = useRef(null);
  useEffect(() => {
    const paragraph = aboutTextRef.current;
    const words = [...paragraph.querySelectorAll(".about-word")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = paragraph.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Read from the first words entering the viewport to the last line
      // reaching its upper third. Scrolling back reverses the highlight.
      const progress = reduce.matches ? 1 : Math.min(1, Math.max(0,
        (viewport * .82 - bounds.top) / (bounds.height + viewport * .47)
      ));
      words.forEach((word, index) => {
        const fill = Math.min(1, Math.max(0, progress * words.length - index));
        word.style.setProperty("--word-fill", `${fill * 100}%`);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(paragraph);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, []);

  return (
            <p className="statement about-scroll-text" ref={aboutTextRef}>
              {aboutWords.map((word, index) => (
                <span key={index}><span className="about-word">{word}</span>{index < aboutWords.length - 1 ? " " : ""}</span>
              ))}
            </p>
  );
}
