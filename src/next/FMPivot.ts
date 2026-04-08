"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMPivotRef, FMPivotProps } from "@flexmonster/react";

const FMPivot = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMPivot),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMPivotProps & React.RefAttributes<FMPivotRef>>;

export default FMPivot;
