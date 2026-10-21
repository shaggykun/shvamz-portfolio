"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import usePageMotion from "./use-page-motion";

export default function PageMotion({ children }) {
  const ref = useRef(null);
  const pathname = usePathname();
  usePageMotion(ref, pathname);
  return <div ref={ref} style={{ display: "contents" }}>{children}</div>;
}
