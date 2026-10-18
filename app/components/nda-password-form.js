"use client";

import { useId, useState } from "react";

export default function NdaPasswordForm({ projectTitle, titleId, headingAs: Heading = "h2", onCancel }) {
  const id = useId();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  return <form className="nda-form" noValidate onSubmit={(event) => {
    event.preventDefault();
    setError(password.trim() ? "Wrong password. Please try again." : "Please enter the password to continue.");
  }}>
    <div className="nda-lock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg></div>
    <p className="nda-eyebrow">NDA-protected project</p>
    <Heading id={titleId}>{projectTitle}</Heading>
    <p className="nda-description">This project is covered by a signed non-disclosure agreement. To continue, please enter the password.</p>
    <label htmlFor={`${id}-password`}>Password</label>
    <input id={`${id}-password`} type="password" placeholder="Enter project password" autoComplete="off" autoCapitalize="none" spellCheck={false} value={password} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} onChange={(event) => { setPassword(event.target.value); setError(""); }} />
    <div className="nda-error" id={`${id}-error`} role="status" aria-live="polite">{error}</div>
    <div className="nda-actions">
      {onCancel && <button className="nda-cancel" type="button" onClick={onCancel}>Cancel</button>}
      <button className="nda-submit" type="submit">View project</button>
    </div>
  </form>;
}
