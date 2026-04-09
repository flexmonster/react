"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMFlexmonsterRef, FMFlexmonsterProps } from "@flexmonster/react";

const FMFlexmonster = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMFlexmonster),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMFlexmonsterProps & React.RefAttributes<FMFlexmonsterRef>>;

export default FMFlexmonster;
