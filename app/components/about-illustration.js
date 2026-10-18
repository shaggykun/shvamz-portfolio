"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutIllustration() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = wrapper.querySelector(".t-tilt-card");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const reset = () => {
      wrapper.classList.remove("is-hover");
      card.classList.remove("is-tilting");
      card.style.setProperty("--tilt-rx", "0deg");
      card.style.setProperty("--tilt-ry", "0deg");
    };
    const track = (event) => {
      if (reduce.matches || !hover.matches || event.pointerType !== "mouse") return;
      const bounds = wrapper.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
      wrapper.classList.add("is-hover");
      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-rx", `${(0.5 - y) * 14}deg`);
      card.style.setProperty("--tilt-ry", `${(x - 0.5) * 14}deg`);
      card.style.setProperty("--tilt-gx", `${x * 100}%`);
      card.style.setProperty("--tilt-gy", `${y * 100}%`);
    };
    wrapper.addEventListener("pointermove", track);
    wrapper.addEventListener("pointerleave", reset);
    reduce.addEventListener("change", reset);
    hover.addEventListener("change", reset);
    return () => {
      wrapper.removeEventListener("pointermove", track);
      wrapper.removeEventListener("pointerleave", reset);
      reduce.removeEventListener("change", reset);
      hover.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div className="about-illustration t-tilt" ref={wrapperRef} data-reveal>
      <div className="about-illustration-halo" aria-hidden="true" />
      <div className="t-tilt-card">
        <Image src="/images/about-designer-v3.webp" width={1024} height={1024} sizes="(max-width: 800px) 66vw, 27vw" loading="eager" alt="Illustration of a designer in a charcoal hoodie working on a laptop" />
        <div className="t-tilt-glare" aria-hidden="true" />
      </div>
      <span className="about-orbit-spark" aria-hidden="true">✦</span>
    </div>
  );
}
