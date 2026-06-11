"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMGroupProps } from "@flexmonster/react";

const FMGroup = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMGroup),
  { ssr: false }
) as React.FC<FMGroupProps>;

export default FMGroup;
