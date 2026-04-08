"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { FlatFieldList, type IFMFlatFieldList, type IFMFlatFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

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

    const [containerId] = useState(`flat-field-list-container-${Math.random().toString(36).substr(2, 9)}`);
    const flatFieldListRef = useRef<IFMFlatFieldList | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMFlatFieldList> = {
            get(target, prop) {
                const instance = flatFieldListRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
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

    return <div id={containerId} />;
});

FMFlatFieldList.displayName = 'FMFlatFieldList';

export default FMFlatFieldList;
