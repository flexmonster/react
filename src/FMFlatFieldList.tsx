"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { FlatFieldList, type IFMFlatFieldList, type IFMFlatFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/js';

export interface FMFlatFieldListRef extends IFMFlatFieldList {
}

export interface FMFlatFieldListProps {
  state?: StateInputParams;
  options?: IFMFlatFieldListOptionsInputParams;
}

const FMFlatFieldList = forwardRef<FMFlatFieldListRef, FMFlatFieldListProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`fm-flat-field-list-${Math.random().toString(36).substr(2, 9)}`);
    const flatFieldListRef = useRef<IFMFlatFieldList | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMFlatFieldList> = {
            get(_, prop) {
                const instance = flatFieldListRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        flatFieldListRef.current
                            ? (flatFieldListRef.current as any)[prop]?.apply(flatFieldListRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
            },
        };

        return new Proxy({} as IFMFlatFieldList, handler) as FMFlatFieldListRef;
    });

    useEffect(() => {
        const flatFieldList = FlatFieldList(containerId, { state, options });
        flatFieldListRef.current = flatFieldList;
        return () => {
            flatFieldListRef.current?.dispose();
            flatFieldListRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (flatFieldListRef.current && state) {
            // flatFieldListRef.current.setReport({ state });
        }
    }, [state]);

    return <div style={{ width: '100%', height: '100%' }} id={containerId} />;
});

FMFlatFieldList.displayName = 'FMFlatFieldList';

export default FMFlatFieldList;
