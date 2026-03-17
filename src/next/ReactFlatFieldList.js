"use client";

import dynamic from "next/dynamic";

const ReactFlatFieldList = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactFlatFieldList), {
  ssr: false,
});

export default ReactFlatFieldList;