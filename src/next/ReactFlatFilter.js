"use client";

import dynamic from "next/dynamic";

const ReactFlatFilter = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactFlatFilter), {
  ssr: false
});

export default ReactFlatFilter;