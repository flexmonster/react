"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { FMPivotTableRef, FMPivotTableProps } from "@flexmonster/react";

const FMPivotTable = dynamic(
  () => import("@flexmonster/react").then((mod) => mod.FMPivotTable),
  { ssr: false }
) as React.ForwardRefExoticComponent<FMPivotTableProps & React.RefAttributes<FMPivotTableRef>>;

export default FMPivotTable;
