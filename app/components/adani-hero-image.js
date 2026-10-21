"use client";

import Image from "next/image";
import { useState } from "react";

export default function AdaniHeroImage({ src, alt }) {
  const [ready, setReady] = useState(false);
  return <div className={`dms-hero-motion${ready ? " is-ready" : ""}`}>
    <div className="dms-hero-flip"><div className="dms-hero-float">
      <div className="adani-hero-visual">
        <div className="adani-hero-halo" aria-hidden="true" />
        <Image src={src} width={750} height={1624} sizes="(max-width: 800px) 56vw, 260px" alt={alt} preload onLoad={() => setReady(true)} onError={() => setReady(true)} />
        <span className="adani-visual-label">Your electricity. At a glance.</span>
      </div>
    </div></div>
  </div>;
}
