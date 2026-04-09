"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMFlatTableRef, FMFlatTableProps } from "@flexmonster/react";

const FMFlatTable = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMFlatTable),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMFlatTableProps & React.RefAttributes<FMFlatTableRef>>;

export default FMFlatTable;
