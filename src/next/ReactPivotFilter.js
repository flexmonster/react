"use client";

import dynamic from "next/dynamic";

const ReactPivotFilter = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactPivotFilter), {
  ssr: false
});

export default ReactPivotFilter;