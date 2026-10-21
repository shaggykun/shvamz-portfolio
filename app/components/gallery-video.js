"use client";

import { useEffect, useRef, useState } from "react";

export default function GalleryVideo({ src, label, paused }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const video = ref.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible) setLoaded(true);
      if (visible && !paused && !reduce.matches && !document.hidden) {
        video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(video);
    video.addEventListener("loadeddata", update);
    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
    return () => {
      observer.disconnect();
      video.pause();
      video.removeEventListener("loadeddata", update);
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", update);
    };
  }, [paused]);
  return <video ref={ref} src={loaded ? src : undefined} muted loop playsInline preload={loaded ? "metadata" : "none"} aria-label={label} />;
}
