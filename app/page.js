"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AboutText from "./components/about-text";
import AboutIllustration from "./components/about-illustration";
import CapabilityCloud from "./components/capability-cloud";
import usePageMotion from "./components/use-page-motion";
import ContactActions from "./components/contact-actions";
import BrandMarquee from "./components/brand-marquee";
import { projects } from "./projects";


export default function Home() {
  const mainRef = useRef(null);
  usePageMotion(mainRef);
  const portraitRef = useRef(null);
  const creativeRef = useRef(null);
  const creativePausedRef = useRef(false);
  const [creativePaused, setCreativePaused] = useState(false);

  useEffect(() => { creativePausedRef.current = creativePaused; }, [creativePaused]);

  useEffect(() => {
    const gallery = creativeRef.current;
    const group = gallery.querySelector(".creative-group");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let lap = group.getBoundingClientRect().width;
    let pointer = null;
    let previousX = 0;
    let touchStart = null;
    let touchAxis = null;
    let remainder = 0;
    let previousTime = performance.now();
    let frame;
    const resize = new ResizeObserver(() => { lap = group.getBoundingClientRect().width; });
    resize.observe(group);
    const moveBy = (distance) => {
      const next = gallery.scrollLeft + distance + remainder;
      const target = !reduce.matches && lap > 0 ? ((next % lap) + lap) % lap : next;
      gallery.scrollLeft = target;
      // Keep fractional movement on browsers that round scrollLeft.
      remainder = Math.abs(target - gallery.scrollLeft) < 1 ? target - gallery.scrollLeft : 0;
    };
    const tick = (time) => {
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;
      if (!reduce.matches && pointer === null && !creativePausedRef.current) {
        moveBy(lap * elapsed / 60000);
      }
      frame = requestAnimationFrame(tick);
    };
    const down = (event) => {
      if (event.pointerType === "touch" || !event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
      pointer = event.pointerId;
      previousX = event.clientX;
      gallery.setPointerCapture(pointer);
      gallery.classList.add("is-dragging");
    };
    const move = (event) => {
      if (event.pointerId !== pointer) return;
      moveBy(previousX - event.clientX);
      previousX = event.clientX;
    };
    const end = (event) => {
      if (event.pointerId !== pointer) return;
      pointer = null;
      gallery.classList.remove("is-dragging");
      if (gallery.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
    };
    const touchEnd = () => {
      if (!touchStart) return;
      touchStart = null;
      touchAxis = null;
      pointer = null;
      gallery.classList.remove("is-dragging");
    };
    const touchDown = (event) => {
      touchEnd();
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      touchStart = { x: touch.clientX, y: touch.clientY, id: touch.identifier };
      previousX = touch.clientX;
      pointer = `touch-${touch.identifier}`;
    };
    const touchMove = (event) => {
      if (!touchStart) return;
      if (event.touches.length !== 1) { touchEnd(); return; }
      const touch = event.touches[0];
      if (touch.identifier !== touchStart.id) return;
      if (!touchAxis) {
        const dx = Math.abs(touch.clientX - touchStart.x);
        const dy = Math.abs(touch.clientY - touchStart.y);
        if (dx === 0 && dy === 0) return;
        touchAxis = dx > dy ? "horizontal" : "vertical";
      }
      if (touchAxis === "vertical") { touchEnd(); return; }
      if (!event.cancelable) { touchEnd(); return; }
      // Own horizontal motion so native momentum cannot fight autoplay.
      event.preventDefault();
      gallery.classList.add("is-dragging");
      moveBy(previousX - touch.clientX);
      previousX = touch.clientX;
    };
    const key = (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      moveBy(event.key === "ArrowLeft" ? -300 : 300);
    };
    const preventDrag = (event) => event.preventDefault();
    gallery.addEventListener("touchstart", touchDown, { passive: true });
    gallery.addEventListener("touchmove", touchMove, { passive: false });
    gallery.addEventListener("touchend", touchEnd);
    gallery.addEventListener("touchcancel", touchEnd);
    gallery.addEventListener("pointerdown", down);
    gallery.addEventListener("pointermove", move);
    gallery.addEventListener("pointerup", end);
    gallery.addEventListener("pointercancel", end);
    gallery.addEventListener("lostpointercapture", end);
    gallery.addEventListener("keydown", key);
    gallery.addEventListener("dragstart", preventDrag);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      gallery.removeEventListener("touchstart", touchDown);
      gallery.removeEventListener("touchmove", touchMove);
      gallery.removeEventListener("touchend", touchEnd);
      gallery.removeEventListener("touchcancel", touchEnd);
      gallery.removeEventListener("pointerdown", down);
      gallery.removeEventListener("pointermove", move);
      gallery.removeEventListener("pointerup", end);
      gallery.removeEventListener("pointercancel", end);
      gallery.removeEventListener("lostpointercapture", end);
      gallery.removeEventListener("keydown", key);
      gallery.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  useEffect(() => {
    const wrapper = portraitRef.current;
    const card = wrapper.querySelector(".t-tilt-card");
    const ripple = wrapper.querySelector(".hero-portrait-ripple");
    let rippleAnimation;
    let activeTouch = null;
    let pendingTouch = null;
    let holdTimer;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const enter = (event) => {
      if (event.pointerType === "mouse" ? !hover.matches : event.pointerId !== activeTouch) return;
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
      clearTimeout(holdTimer);
      pendingTouch = null;
      activeTouch = null;
      wrapper.classList.remove("is-hover");
      card.classList.remove("is-tilting");
      ["--tilt-rx", "--tilt-ry"].forEach((key) => card.style.setProperty(key, "0deg"));
      ["--portrait-x", "--portrait-y"].forEach((key) => card.style.setProperty(key, "0px"));
    };
    const track = (event) => {
      if (reduce.matches || (event.pointerType === "mouse" ? !hover.matches : event.pointerId !== activeTouch)) return;
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
    const touchPoint = (touch) => ({
      pointerType: "touch", pointerId: touch.identifier,
      clientX: touch.clientX, clientY: touch.clientY,
    });
    const startTouch = (event) => {
      reset();
      if (reduce.matches || event.touches.length !== 1) return;
      const point = touchPoint(event.touches[0]);
      pendingTouch = point;
      holdTimer = setTimeout(() => {
        if (!pendingTouch) return;
        activeTouch = point.pointerId;
        enter(point);
        track(point);
      }, 350);
    };
    const moveTouch = (event) => {
      if (event.touches.length !== 1) { reset(); return; }
      const point = touchPoint(event.touches[0]);
      if (activeTouch === point.pointerId) {
        if (!event.cancelable) { reset(); return; }
        event.preventDefault();
        track(point);
      } else if (pendingTouch && Math.hypot(point.clientX - pendingTouch.clientX, point.clientY - pendingTouch.clientY) > 10) {
        // A swipe before the hold completes belongs to the page.
        reset();
      }
    };
    const mouseEnter = (event) => { if (event.pointerType === "mouse") enter(event); };
    const mouseMove = (event) => { if (event.pointerType === "mouse") track(event); };
    const mouseLeave = (event) => { if (event.pointerType === "mouse") reset(); };
    const preventTouchMenu = (event) => { if (pendingTouch || activeTouch !== null) event.preventDefault(); };
    wrapper.addEventListener("touchstart", startTouch, { passive: true });
    wrapper.addEventListener("touchmove", moveTouch, { passive: false });
    wrapper.addEventListener("touchend", reset);
    wrapper.addEventListener("touchcancel", reset);
    wrapper.addEventListener("contextmenu", preventTouchMenu);
    wrapper.addEventListener("pointerenter", mouseEnter);
    wrapper.addEventListener("pointermove", mouseMove);
    wrapper.addEventListener("pointerleave", mouseLeave);
    reduce.addEventListener("change", reset);
    hover.addEventListener("change", reset);
    return () => {
      rippleAnimation?.cancel();
      clearTimeout(holdTimer);
      wrapper.removeEventListener("touchstart", startTouch);
      wrapper.removeEventListener("touchmove", moveTouch);
      wrapper.removeEventListener("touchend", reset);
      wrapper.removeEventListener("touchcancel", reset);
      wrapper.removeEventListener("contextmenu", preventTouchMenu);
      wrapper.removeEventListener("pointerenter", mouseEnter);
      wrapper.removeEventListener("pointermove", mouseMove);
      wrapper.removeEventListener("pointerleave", mouseLeave);
      reduce.removeEventListener("change", reset);
      hover.removeEventListener("change", reset);
    };
  }, []);


  return (
    <>
      <main id="content" ref={mainRef}>
        <section className="hero" id="top">
          <div className="hero-name">SENIOR PRODUCT DESIGNER</div>
          <div className="hero-portrait t-tilt" ref={portraitRef}>
            <div className="t-tilt-card">
              <div className="hero-portrait-background" aria-hidden="true"><div className="hero-portrait-ripple" />
                <div className="hero-portrait-details" />
              </div>
              <div className="hero-portrait-person"><Image src="/images/hero-portrait-transparent-v2.webp" alt="Shivam standing with casually crossed arms" fill sizes="(max-width: 800px) 100vw, 40vw" preload /></div>
              <div className="t-tilt-glare" aria-hidden="true" />
            </div>
          </div>
          <h1>A designer<br className="hero-heading-break" /><span className="hero-heading-space"> </span>who<br className="hero-heading-desktop-break" /><span className="hero-heading-mobile-space"> </span><span className="hero-heading-end">moves<br className="hero-heading-break" /><span className="hero-heading-space"> </span><em>numbers.</em></span></h1>
          <p className="hero-copy">Hi, I&apos;m Shivam. For 6 years, I&apos;ve simplified complex products across <strong>FinTech, B2C, B2B and SaaS</strong> into clear, useful experiences.</p>
          <div className="hero-trust"><span>6 years in design</span><span>UX research</span><span>UI design</span><span>Product</span></div>
          <a className="hero-cta" href="#work">Explore my projects</a>
        </section>

        <BrandMarquee />

        <section className="about-intro section-light" id="about">
          <div className="about-content">
            <AboutText />
            <AboutIllustration />
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading" data-reveal><h2>MY PROJECTS</h2></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Link className="project-card home-project-card" href={`/work/${project.slug}`} key={project.slug} data-reveal>
                <div className={`project-card-image visual-${index + 1}`} style={project.showcase || ["project-one", "project-two"].includes(project.slug) ? { aspectRatio: "1920 / 1320", minHeight: 0 } : undefined}>
                  {project.showcase ? <Image src={project.showcase.src} alt={project.showcase.alt} fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "contain" }} /> : project.slug === "project-one" ? <Image src="/images/rail-operations-showcase.webp" alt="Train staff application design showcase" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "contain" }} /> : project.slug === "project-two" ? <Image src="/images/adani-electricity-showcase.webp" alt="Adani Electricity application design showcase" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "contain" }} /> : project.slug === "project-four" ? <Image className="humbee-project-logo" src="/images/humbee-logo.webp" width={840} height={1078} sizes="165px" alt="HumBee avatar-first social network logo" /> : <div className="browser-mockup"><i /><i /><i /><div>{project.title}</div></div>}
                  <span className="view-badge">View case</span>
                </div>
                <div className="project-card-copy">
                  <div><h3>{project.title}</h3><p>{project.summary}</p></div>
                </div>
              </Link>
            ))}
          </div>
          <Link className="wide-link" href="/work" data-reveal>Explore More Projects</Link>
        </section>

        <section className="creative-section" aria-label="Creative work">
          <div className="creative-heading">
            <h2>Beyond UIUX Design</h2>
            <button className="pill creative-pause" type="button" aria-pressed={creativePaused} aria-controls="creative-carousel" onClick={() => setCreativePaused((paused) => !paused)}>{creativePaused ? "Resume motion" : "Pause motion"}</button>
          </div>
          <div className="creative-marquee" ref={creativeRef} tabIndex={0} role="region" aria-label="Beyond UIUX Design gallery. Drag left or right, or use arrow keys." id="creative-carousel" data-paused={creativePaused}>
            <div className="creative-track">
              {[false, true].map((duplicate) => <div className="creative-group" key={String(duplicate)} aria-hidden={duplicate ? "true" : undefined} inert={duplicate ? true : undefined}>
                {[
                  ["dapper-branding.webp", "Dapper branding"],
                  ["swagatam-dosa-logo.webp", "Swagatam Dosa logo"],
                  ["va-creations.webp", "VA Creations"],
                ].map(([file, title]) => <article className="creative-card" key={file}><div className="creative-media"><Image src={`/images/creative/${file}`} alt={duplicate ? "" : title} fill sizes="(max-width: 800px) 76vw, 340px" /></div></article>)}
                <article className="creative-card"><div className="creative-media creative-video"><video src="/videos/tagbudy-animation.mp4" autoPlay muted loop playsInline preload="auto" aria-label={duplicate ? undefined : "Tagbudy animation"} /></div></article>
                {[1, 2, 3, 4, 5].map((number) => <article className={`creative-card creative-coming-${number}`} key={number}><div className="creative-media creative-placeholder"><span className="creative-placeholder-mark" aria-hidden="true">✳</span><span className="creative-placeholder-status">COMING SOON</span></div></article>)}
              </div>)}
            </div>
          </div>
        </section>

        <section className="experience section-light">
          <div className="section-heading dark" data-reveal><h2>HOW I CAN HELP</h2></div>
          <CapabilityCloud>{[
            ["UX research", "M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"],
            ["User interface design", "M3 4h18v16H3ZM3 9h18M9 9v11"],
            ["Experience design", "M5 5h5v5H5ZM14 14h5v5h-5ZM10 7h7v7M7 10v7h7"],
            ["Motion graphics", "M8 4l13 8-13 8ZM3 7v10"],
            ["Brand identity", "M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"],
            ["Interaction design", "M5 3l3 16 4-6 7-2ZM16 3v3M19 6h3"],
          ].map(([title, icon], index) => <div className="capability-float" key={title} style={{ "--card-index": index }}><div className="capability-scatter"><article className="capability-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg><h3>{title}</h3><div className="capability-glow" aria-hidden="true" /></article></div></div>)}</CapabilityCloud>
        </section>

        <section className="contact" id="contact">
          <h2 data-reveal>Let&apos;s connect and create something meaningful.</h2>
          <ContactActions />
        </section>
      </main>


    </>
  );
}
