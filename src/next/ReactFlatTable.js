"use client";

import dynamic from "next/dynamic";

const ReactFlatTable = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactFlatTable), {
  ssr: false
});

export default ReactFlatTable;