"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMFlatRef, FMFlatProps } from "@flexmonster/react";

const FMFlat = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMFlat),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMFlatProps & React.RefAttributes<FMFlatRef>>;

export default FMFlat;
