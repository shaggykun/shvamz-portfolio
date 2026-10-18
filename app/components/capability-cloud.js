"use client";

import { useEffect, useRef } from "react";

export default function CapabilityCloud({ children }) {
  const cloudRef = useRef(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups = [...cloudRef.current.querySelectorAll(".capability-scatter")].map((wrapper) => {
      const card = wrapper.querySelector(".capability-card");
      const reset = () => {
        wrapper.classList.remove("is-hover");
        card.style.setProperty("--magnet-x", "0px");
        card.style.setProperty("--magnet-y", "0px");
      };
      const track = (event) => {
        if (reduce.matches || !hover.matches || event.pointerType !== "mouse") return;
        // Track the flat wrapper, independently of the moving card.
        const bounds = wrapper.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        wrapper.classList.add("is-hover");
        card.style.setProperty("--magnet-x", `${(x - 0.5) * 56}px`);
        card.style.setProperty("--magnet-y", `${(y - 0.5) * 36}px`);
        card.style.setProperty("--glow-x", `${x * 100}%`);
        card.style.setProperty("--glow-y", `${y * 100}%`);
      };
      wrapper.addEventListener("pointermove", track);
      wrapper.addEventListener("pointerleave", reset);
      window.addEventListener("scroll", reset, { passive: true });
      reduce.addEventListener("change", reset);
      hover.addEventListener("change", reset);
      return () => {
        reset();
        wrapper.removeEventListener("pointermove", track);
        wrapper.removeEventListener("pointerleave", reset);
        window.removeEventListener("scroll", reset);
        reduce.removeEventListener("change", reset);
        hover.removeEventListener("change", reset);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <div className="capability-cloud" ref={cloudRef}>{children}</div>;
}
