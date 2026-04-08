"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PivotTable, type IFMPivotTable, type IFMPivotTableOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMPivotRef extends IFMPivotTable {
}

export interface FMPivotProps {
  state?: StateInputParams;
  options?: IFMPivotTableOptionsInputParams;
}

const FMPivot = forwardRef<FMPivotRef, FMPivotProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`pivot-table-container-${Math.random().toString(36).substr(2, 9)}`);
    const pivotTableRef = useRef<IFMPivotTable | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMPivotTable> = {
            get(target, prop) {
                const instance = pivotTableRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
            },
        };
        return new Proxy({} as IFMPivotTable, handler) as FMPivotRef;
    });

    useEffect(() => {
        const pivotTable = PivotTable(containerId, { state, options });
        pivotTableRef.current = pivotTable;
        return () => {
            pivotTableRef.current?.dispose();
            pivotTableRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (pivotTableRef.current && state) {
            // pivotTableRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

FMPivot.displayName = 'FMPivot';

export default FMPivot;
