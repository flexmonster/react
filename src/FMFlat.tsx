"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { FlatTable, type IFMFlatTable, type IFMFlatTableOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMFlatRef extends IFMFlatTable {
}

export interface FMFlatProps {
  state?: StateInputParams;
  options?: IFMFlatTableOptionsInputParams;
}

const FMFlat = forwardRef<FMFlatRef, FMFlatProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`fm-flat-table-${Math.random().toString(36).substr(2, 9)}`);
    const flatTableRef = useRef<IFMFlatTable | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMFlatTable> = {
            get(_, prop) {
                const instance = flatTableRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        flatTableRef.current
                            ? (flatTableRef.current as any)[prop]?.apply(flatTableRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
            },
        };

        return new Proxy({} as IFMFlatTable, handler) as FMFlatRef;
    });

    useEffect(() => {
        const flatTable = FlatTable(containerId, { state, options });
        flatTableRef.current = flatTable;
        return () => {
            flatTableRef.current?.dispose();
            flatTableRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (flatTableRef.current && state) {
            // flatTableRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

FMFlat.displayName = 'FMFlat';

export default FMFlat;
