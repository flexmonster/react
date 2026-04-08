"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMFilterRef, FMFilterProps } from "@flexmonster/react";

const FMFilter = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMFilter),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMFilterProps & React.RefAttributes<FMFilterRef>>;

export default FMFilter;
