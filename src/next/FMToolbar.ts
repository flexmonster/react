"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMToolbarRef, FMToolbarProps } from "@flexmonster/react";

const FMToolbar = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMToolbar),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMToolbarProps & React.RefAttributes<FMToolbarRef>>;

export default FMToolbar;
