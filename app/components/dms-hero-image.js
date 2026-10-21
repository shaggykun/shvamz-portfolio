"use client";

import Image from "next/image";
import { useState } from "react";

export default function DmsHeroImage({ src, alt }) {
  const [ready, setReady] = useState(false);
  return <div className={`dms-hero-motion${ready ? " is-ready" : ""}`}>
    <div className="dms-hero-flip"><div className="dms-hero-float">
      <div className="dms-hero-visual">
      <Image src={src} alt={alt} width={1920} height={1320} sizes="(max-width: 800px) 100vw, 50vw" preload onLoad={() => setReady(true)} onError={() => setReady(true)} />
      </div>
    </div></div>
  </div>;
}
