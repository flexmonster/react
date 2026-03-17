"use client";

import dynamic from "next/dynamic";

const ReactFlexmonster = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactFlexmonster), {
  ssr: false
});

export default ReactFlexmonster;