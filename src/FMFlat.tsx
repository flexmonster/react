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

    const [containerId] = useState(`flat-table-container-${Math.random().toString(36).substr(2, 9)}`);
    const flatTableRef = useRef<IFMFlatTable | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMFlatTable> = {
            get(target, prop) {
                const instance = flatTableRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
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
