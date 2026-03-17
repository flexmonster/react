"use client";

import dynamic from "next/dynamic";

const ReactToolbar = dynamic(() => import("@flexmonster/react").then((mod) => mod.ReactToolbar), {
  ssr: false
});

export default ReactToolbar;