"use client";

import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { FlatTable, type IFMFlatTable, type IFMFlatTableOptionsInputParams, type StateInputParams } from '@flexmonster/js';
import { FMStateContext } from './FMStateContext';

export interface FMFlatTableRef extends IFMFlatTable {
}

export interface FMFlatTableProps {
  state?: StateInputParams;
  options?: IFMFlatTableOptionsInputParams;
}

const FMFlatTable = forwardRef<FMFlatTableRef, FMFlatTableProps>(({ state: ownState, options }, ref) => {
    const groupState = useContext(FMStateContext);
    const state = ownState ?? groupState;

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

        return new Proxy({} as IFMFlatTable, handler) as FMFlatTableRef;
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

    return <div style={{ width: '100%', height: '100%' }} id={containerId} />;
});

FMFlatTable.displayName = 'FMFlatTable';

export default FMFlatTable;
