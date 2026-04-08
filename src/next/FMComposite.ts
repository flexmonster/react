"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMCompositeRef, FMCompositeProps } from "@flexmonster/react";

const FMComposite = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMComposite),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMCompositeProps & React.RefAttributes<FMCompositeRef>>;

export default FMComposite;
