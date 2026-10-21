"use client";

import { useLayoutEffect } from "react";

// CSS optimizers can serialize 500ms as .5s; Web Animations expects milliseconds.
export function motionTimeMs(value) {
  const time = value.trim();
  return parseFloat(time) * (time.endsWith("ms") ? 1 : 1000);
}

// Animate only after JavaScript is ready: server-rendered content stays readable.
export default function usePageMotion(mainRef, pageKey) {
  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const selectors = [
      "[data-reveal]", ".hero > *", ".brand-marquee", ".about-scroll-text",
      ".creative-heading", ".creative-marquee", ".capability-float", ".contact-actions > *",
      ".standalone-page > header > *", ".about-profile-heading > *", ".about-profile-portrait",
      ".about-profile-story > *", ".about-profile section:not(.about-profile-story) > *",
      ".contact-intro > *", ".contact-method", ".page-detail > *", ".work-project", ".work-page-outro > *",
      ".train-hero-copy > *", ".train-hero > .train-back", ".train-hero-visual",
      ".train-project-details > *", ".train-hero > .train-screen-group", ".train-section > *", ".train-ending > *",
      ".case-hero > *", ".case-cover", ".next-case",
    ].join(", ");
    const candidates = [...main.querySelectorAll(selectors)];
    // Animate the inner pieces once rather than stacking a parent and child reveal.
    const items = candidates.filter((item) => !candidates.some((other) => other !== item && item.contains(other)));
    const footer = document.querySelector("footer");
    if (footer && !items.includes(footer)) items.push(footer);
    const active = new Map();
    const shown = new Set();
    const heroItems = [...main.querySelectorAll(".hero > *")];
    const reveal = (item) => {
      if (shown.has(item)) return;
      shown.add(item);
      item.removeAttribute("data-motion-pending");
      if (reduce.matches) return;
      // Read responsive tokens at reveal time, including after device rotation.
      const timing = getComputedStyle(main);
      const duration = motionTimeMs(timing.getPropertyValue("--stagger-dur"));
      const stagger = motionTimeMs(timing.getPropertyValue("--stagger-stagger"));
      const distance = timing.getPropertyValue("--stagger-distance").trim();
      const easing = timing.getPropertyValue("--stagger-ease").trim();
      const scale = Number(timing.getPropertyValue("--reveal-scale")) || .97;
      const heroIndex = heroItems.indexOf(item);
      const siblings = item.matches(".project-card, .capability-float, .contact-actions > *, .train-project-details > *, .contact-method, .train-section > *, .about-profile-heading > *") ? [...item.parentElement.children] : [];
      const delay = heroIndex >= 0 ? Math.min(heroIndex, 3) * stagger : Math.max(0, siblings.indexOf(item) % 3) * stagger;
      const animation = item.animate([
        { translate: `0 ${distance}`, scale },
        { translate: "0 0", scale: 1 },
      ], { duration, delay, easing, fill: "backwards" });
      active.set(item, animation);
      animation.onfinish = () => { if (active.get(item) === animation) active.delete(item); };
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
        // Tall sections must also reveal inside short mobile viewports.
        if (isIntersecting) reveal(target);
        // Rearm only after an element has fully left the screen.
        else if (boundingClientRect.bottom <= 0 || boundingClientRect.top >= window.innerHeight) {
          shown.delete(target);
          active.get(target)?.cancel();
          active.delete(target);
          if (!reduce.matches) target.setAttribute("data-motion-pending", "");
        }
      });
    }, { threshold: 0 });
    items.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) reveal(item);
      else if (!reduce.matches) item.setAttribute("data-motion-pending", "");
      observer.observe(item);
    });
    const stop = () => {
      active.forEach((animation) => animation.cancel());
      active.clear();
      items.forEach((item) => item.removeAttribute("data-motion-pending"));
    };
    const focus = (event) => {
      items.forEach((item) => {
        if (item.hasAttribute("data-motion-pending") && item.contains(event.target)) reveal(item);
      });
      active.forEach((animation, item) => {
        if (item.contains(event.target)) animation.finish();
      });
    };
    reduce.addEventListener("change", stop);
    document.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      stop();
      reduce.removeEventListener("change", stop);
      document.removeEventListener("focusin", focus);
    };
  }, [mainRef, pageKey]);
}
