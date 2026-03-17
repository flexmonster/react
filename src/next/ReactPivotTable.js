"use client";

import dynamic from "next/dynamic";

const ReactPivotTable = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactPivotTable), {
  ssr: false
});

export default ReactPivotTable;