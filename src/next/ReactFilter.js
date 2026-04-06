"use client";

import dynamic from "next/dynamic";

const ReactFilter = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactFilter), {
  ssr: false
});

export default ReactFilter;