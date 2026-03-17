"use client";

import dynamic from "next/dynamic";

const ReactMemberFilter = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactMemberFilter), {
  ssr: false
});

export default ReactMemberFilter;