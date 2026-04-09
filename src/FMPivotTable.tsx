"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PivotTable, type IFMPivotTable, type IFMPivotTableOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMPivotTableRef extends IFMPivotTable {
}

export interface FMPivotTableProps {
  state?: StateInputParams;
  options?: IFMPivotTableOptionsInputParams;
}

const FMPivotTable = forwardRef<FMPivotTableRef, FMPivotTableProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`fm-pivot-table-${Math.random().toString(36).substr(2, 9)}`);
    const pivotTableRef = useRef<IFMPivotTable | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMPivotTable> = {
            get(_, prop) {
                const instance = pivotTableRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        pivotTableRef.current
                            ? (pivotTableRef.current as any)[prop]?.apply(pivotTableRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
            },
        };

        return new Proxy({} as IFMPivotTable, handler) as FMPivotTableRef;
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

FMPivotTable.displayName = 'FMPivotTable';

export default FMPivotTable;
