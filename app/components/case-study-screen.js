"use client";

import { useRef } from "react";

export default function CaseStudyScreen({ screen, draft = true }) {
  const dialogRef = useRef(null);
  if (!screen.src) {
    return draft ? <div className="train-screen-placeholder"><span>Screen pending</span><strong>{screen.label}</strong><p>{screen.note || "Actual application screenshot to be added."}</p></div> : null;
  }
  return <>
    <button className="train-screen-button" onClick={() => dialogRef.current.showModal()} aria-label={`Expand ${screen.alt}`}>
      {/* Real supplied screenshots retain their aspect ratio, including in the viewer. */}
      <img src={screen.src} alt={screen.alt} loading="lazy" decoding="async" />
      <span>Inspect screen</span>
    </button>
    <dialog className="train-screen-dialog" ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
      <button className="train-dialog-close" onClick={() => dialogRef.current.close()} aria-label="Close expanded screenshot" autoFocus>Close ×</button>
      <img src={screen.src} alt={screen.alt} loading="lazy" decoding="async" />
      <p>{screen.caption || screen.alt}</p>
    </dialog>
  </>;
}
