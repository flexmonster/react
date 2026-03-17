"use client";

import dynamic from "next/dynamic";

const ReactPivotFieldList = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactPivotFieldList), {
  ssr: false
});

export default ReactPivotFieldList;