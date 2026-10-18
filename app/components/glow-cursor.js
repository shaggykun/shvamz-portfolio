"use client";

import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const cursorColor = getComputedStyle(root).getPropertyValue("--cursor-color").trim() || "#e65042";
    // Cache the soft light once instead of running blur/shadow filters per segment.
    const glow = document.createElement("canvas");
    glow.width = glow.height = 40;
    const glowContext = glow.getContext("2d");
    if (!glowContext) return;
    const gradient = glowContext.createRadialGradient(20, 20, 0, 20, 20, 20);
    // A warm, bright core and color-matched transparent edges read as emitted light.
    // Keep the halo warm all the way to its transparent edge.
    gradient.addColorStop(0, "#fff6e9");
    gradient.addColorStop(.12, "#ffd4b8");
    gradient.addColorStop(.32, cursorColor);
    gradient.addColorStop(.65, "rgba(230, 80, 66, .16)");
    gradient.addColorStop(1, "rgba(230, 80, 66, 0)");
    glowContext.fillStyle = gradient;
    glowContext.fillRect(0, 0, 40, 40);
    const trailLifetime = 180;
    let points = [];
    let frame = 0;
    let pointer = null;
    let visible = false;
    let interactiveTarget = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      // Sample once per display frame, regardless of the mouse's polling rate.
      const latest = points[points.length - 1];
      if (pointer && (!latest || pointer.x !== latest.x || pointer.y !== latest.y) && time - pointer.time < trailLifetime) {
        if (latest && pointer.time - latest.time > 80) points = [];
        points.push({ ...pointer });
      }
      points = points.filter((point) => time - point.time < trailLifetime);
      points = points.slice(-18);
      for (let index = 1; index < points.length; index++) {
        const from = points[index - 1];
        const to = points[index];
        const life = Math.min(1, Math.max(0, 1 - (time - from.time) / trailLifetime));
        const samples = Math.min(6, Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / 10)));
        const size = 10 + life * 22;
        context.globalAlpha = life * .3;
        for (let sample = 1; sample <= samples; sample++) {
          const progress = sample / samples;
          context.drawImage(glow, from.x + (to.x - from.x) * progress - size / 2, from.y + (to.y - from.y) * progress - size / 2, size, size);
        }
      }
      // A fine luminous center joins the cached halos without expensive live blur.
      context.lineCap = "round";
      context.strokeStyle = "#ffd4b8";
      for (let index = 1; index < points.length; index++) {
        const from = points[index - 1];
        const to = points[index];
        const life = Math.min(1, Math.max(0, 1 - (time - from.time) / trailLifetime));
        context.globalAlpha = life * .5;
        context.lineWidth = .5 + life * 1.5;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
      }
      frame = points.length ? requestAnimationFrame(draw) : 0;
    };
    const hide = () => {
      root.classList.remove("has-glow-cursor");
      cursor.classList.remove("is-visible", "is-interactive", "is-pressed", "is-contact");
      cancelAnimationFrame(frame);
      frame = 0;
      points = [];
      pointer = null;
      visible = false;
      interactiveTarget = null;
      context.clearRect(0, 0, width, height);
    };
    const enabled = () => fine.matches && !reduce.matches;
    const interactiveAt = (target) => {
      cursor.classList.toggle("is-contact", Boolean(target?.closest?.(".contact")));
      const control = target?.closest?.('a[href], button, input:not([type="hidden"]), select, textarea, summary, label[for], [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="tab"], [role="menuitem"], [onclick], [tabindex]:not([tabindex="-1"]), [data-cursor="pointer"]');
      if (control === interactiveTarget) return;
      interactiveTarget = control;
      const interactive = control && !control.matches(":disabled") && !control.closest('[inert], [aria-disabled="true"]') && !control.control?.disabled;
      cursor.classList.toggle("is-interactive", Boolean(interactive));
    };
    const move = (event) => {
      // Native cursors remain available for touch, pen, and top-layer dialogs.
      if (!enabled() || event.pointerType !== "mouse" || event.target.closest?.("dialog[open]")) {
        hide();
        return;
      }
      const now = performance.now();
      pointer = { x: event.clientX, y: event.clientY, time: now };
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      if (!visible) {
        interactiveAt(event.target);
        cursor.classList.add("is-visible");
        root.classList.add("has-glow-cursor");
        visible = true;
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const over = (event) => {
      if (event.target.closest?.("dialog[open]")) hide();
      else interactiveAt(event.target);
    };
    const out = (event) => { if (!event.relatedTarget) hide(); };
    const down = () => cursor.classList.add("is-pressed");
    const up = () => cursor.classList.remove("is-pressed");
    const scroll = () => { if (pointer) interactiveAt(document.elementFromPoint(pointer.x, pointer.y)); };
    const visibility = () => { if (document.hidden) hide(); };
    const resize = () => {
      hide();
      width = window.innerWidth;
      height = window.innerHeight;
      // The diffuse trail needs no high-DPI buffer (4x the pixels on Retina).
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", hide);
    reduce.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", hide);
      reduce.removeEventListener("change", hide);
    };
  }, []);

  return <><canvas className="cursor-trail" ref={canvasRef} aria-hidden="true" /><div className="glow-cursor" ref={cursorRef} aria-hidden="true"><span className="glow-cursor-dot" /></div></>;
}
