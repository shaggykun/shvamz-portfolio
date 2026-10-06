"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AboutText from "./components/about-text";
import ContactActions from "./components/contact-actions";
import { projects } from "./projects";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const portraitRef = useRef(null);

  useEffect(() => {
    const wrapper = portraitRef.current;
    const card = wrapper.querySelector(".t-tilt-card");
    const ripple = wrapper.querySelector(".hero-portrait-ripple");
    let rippleAnimation;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const enter = (event) => {
      if (!hover.matches || event.pointerType !== "mouse") return;
      const bounds = wrapper.getBoundingClientRect();
      const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
      const y = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));
      // Reach the farthest corner, including a little room for the parallax.
      const radius = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y)) + 64;
      rippleAnimation?.cancel();
      ripple.style.width = `${radius * 2}px`;
      ripple.style.height = `${radius * 2}px`;
      ripple.style.left = `${x - radius}px`;
      ripple.style.top = `${y - radius}px`;
      wrapper.classList.add("is-hover");
      const timing = getComputedStyle(wrapper);
      rippleAnimation = ripple.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" },
      ], {
        duration: reduce.matches ? 0 : parseFloat(timing.getPropertyValue("--portrait-ripple-duration")),
        easing: timing.getPropertyValue("--portrait-ripple-ease").trim(),
        fill: "forwards",
      });
    };
    const reset = () => {
      wrapper.classList.remove("is-hover");
      card.classList.remove("is-tilting");
      ["--tilt-rx", "--tilt-ry"].forEach((key) => card.style.setProperty(key, "0deg"));
      ["--portrait-x", "--portrait-y"].forEach((key) => card.style.setProperty(key, "0px"));
    };
    const track = (event) => {
      if (reduce.matches || !hover.matches || event.pointerType !== "mouse") return;
      const bounds = wrapper.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
      wrapper.classList.add("is-hover");
      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-rx", `${(0.5 - y) * 10}deg`);
      card.style.setProperty("--tilt-ry", `${(x - 0.5) * 10}deg`);
      card.style.setProperty("--tilt-gx", `${x * 100}%`);
      card.style.setProperty("--tilt-gy", `${y * 100}%`);
      card.style.setProperty("--portrait-x", `${(x - 0.5) * 24}px`);
      card.style.setProperty("--portrait-y", `${(y - 0.5) * 18}px`);
    };
    wrapper.addEventListener("pointerenter", enter);
    wrapper.addEventListener("pointermove", track);
    wrapper.addEventListener("pointerleave", reset);
    wrapper.addEventListener("pointercancel", reset);
    reduce.addEventListener("change", reset);
    hover.addEventListener("change", reset);
    return () => {
      rippleAnimation?.cancel();
      wrapper.removeEventListener("pointerenter", enter);
      wrapper.removeEventListener("pointermove", track);
      wrapper.removeEventListener("pointerleave", reset);
      wrapper.removeEventListener("pointercancel", reset);
      reduce.removeEventListener("change", reset);
      hover.removeEventListener("change", reset);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);


  return (
    <>
      <main id="content">
        <section className="hero" id="top">
          <div className="hero-name">SENIOR PRODUCT DESIGNER</div>
          <div className="hero-portrait t-tilt" ref={portraitRef}>
            <div className="t-tilt-card">
              <div className="hero-portrait-background" aria-hidden="true"><div className="hero-portrait-ripple" />
                <div className="hero-portrait-details" />
              </div>
              <div className="hero-portrait-person"><Image src="/images/hero-portrait-transparent-v2.png" alt="Shivam standing with casually crossed arms" fill sizes="(max-width: 800px) 100vw, 40vw" preload /></div>
              <div className="t-tilt-glare" aria-hidden="true" />
            </div>
          </div>
          <h1>A designer<br />who moves<br /><em>numbers.</em></h1>
          <p className="hero-copy">Hi, I&apos;m Shivam. For 6 years, I&apos;ve simplified complex products across <strong>FinTech, B2C, B2B and SaaS</strong> into clear, useful experiences.</p>
          <div className="hero-trust"><span>6 years in design</span><span>UX research</span><span>UI design</span><span>Product</span></div>
          <a className="hero-cta" href="#work">Explore my projects <Arrow /></a>
        </section>

        <section className="about-intro section-light" id="about">
          <div className="about-content">
            <AboutText />
            <div className="about-illustration" data-reveal>
              <Image src="/images/about-designer-v3.png" width={1024} height={1024} sizes="(max-width: 800px) 80vw, 32vw" alt="Illustration of a designer in a charcoal hoodie working on a laptop" />
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading" data-reveal><h2>MY PROJECTS</h2></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Link className="project-card" href={`/work/${project.slug}`} key={project.slug} data-reveal>
                <div className={`project-card-image visual-${index + 1}`}>
                  {project.slug === "project-four" ? <Image className="humbee-project-logo" src="/images/humbee-logo.png" width={840} height={1078} sizes="165px" alt="HumBee avatar-first social network logo" /> : <div className="browser-mockup"><i /><i /><i /><div>{project.title}</div></div>}
                  <span className="view-badge">View case <Arrow /></span>
                </div>
                <div className="project-card-copy">
                  <div><h3>{project.title}</h3><p>{project.summary}</p></div>
                  <span>{project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="experience section-light">
          <div className="section-heading dark" data-reveal><h2>HOW I CAN HELP</h2></div>
          <div className="capability-list">{[
            ["01", "UX research", "Interviews, usability studies, research synthesis, and actionable insights."],
            ["02", "Experience design", "User flows, information architecture, wireframes, and prototypes."],
            ["03", "Interface design", "Appealing, accessible interfaces and scalable design systems."],
            ["04", "Interaction design", "Motion and micro-interactions that make products easier to understand."],
          ].map(([num, title, copy]) => <article key={num} data-reveal><span>{num}.</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="contact" id="contact">
          <h2 data-reveal>LET&apos;S MAKE<br />SOMETHING<br />MEANINGFUL.</h2>
          <ContactActions />
        </section>
      </main>


    </>
  );
}
