"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMFlatFieldListRef, FMFlatFieldListProps } from "@flexmonster/react";

const FMFlatFieldList = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMFlatFieldList),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMFlatFieldListProps & React.RefAttributes<FMFlatFieldListRef>>;

export default FMFlatFieldList;
