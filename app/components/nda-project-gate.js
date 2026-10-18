"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../projects";
import NdaPasswordForm from "./nda-password-form";

const lockedProjects = new Map(projects.filter((project) => project.nda).map((project) => [`/work/${project.slug}`, project]));

export default function NdaProjectGate() {
  const [project, setProject] = useState(null);
  const dialogRef = useRef(null);
  const closeTimer = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => {
    const intercept = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download") || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const locked = lockedProjects.get(url.pathname.replace(/\/$/, ""));
      if (!locked) return;
      event.preventDefault();
      event.stopPropagation();
      returnFocus.current = link;
      setProject(locked);
    };
    document.addEventListener("click", intercept, true);
    return () => document.removeEventListener("click", intercept, true);
  }, []);

  useEffect(() => {
    if (!project) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    // Establish the closed scale before starting the entrance transition.
    void dialog.offsetHeight;
    dialog.classList.add("is-open");
    const focusFrame = requestAnimationFrame(() => dialog.querySelector("input")?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(focusFrame);
      clearTimeout(closeTimer.current);
      dialog.close();
      dialog.classList.remove("is-open", "is-closing");
      document.body.style.overflow = previousOverflow;
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [project]);

  const close = () => {
    if (closeTimer.current) return;
    const dialog = dialogRef.current;
    dialog.classList.remove("is-open");
    dialog.classList.add("is-closing");
    const time = getComputedStyle(dialog).getPropertyValue("--modal-close-dur").trim();
    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : parseFloat(time) * (time.endsWith("ms") ? 1 : 1000);
    closeTimer.current = setTimeout(() => { closeTimer.current = null; setProject(null); }, delay);
  };

  return <dialog ref={dialogRef} className="nda-dialog t-modal" aria-labelledby="nda-dialog-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  }}>
    <button className="nda-close" type="button" aria-label="Close password dialog" onClick={close}>×</button>
    {project && <NdaPasswordForm key={project.slug} projectTitle={project.title} titleId="nda-dialog-title" onCancel={close} />}
  </dialog>;
}
