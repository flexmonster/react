"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMPivotFieldListRef, FMPivotFieldListProps } from "@flexmonster/react";

const FMPivotFieldList = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMPivotFieldList),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMPivotFieldListProps & React.RefAttributes<FMPivotFieldListRef>>;

export default FMPivotFieldList;
