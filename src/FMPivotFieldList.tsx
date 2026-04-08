"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PivotFieldList, type IFMPivotFieldList, type IFMPivotFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMPivotFieldListRef extends IFMPivotFieldList {
}

export interface FMPivotFieldListProps {
  state?: StateInputParams;
  options?: IFMPivotFieldListOptionsInputParams;
}

const FMPivotFieldList = forwardRef<FMPivotFieldListRef, FMPivotFieldListProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`pivot-field-list-container-${Math.random().toString(36).substr(2, 9)}`);
    const pivotFieldListRef = useRef<IFMPivotFieldList | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMPivotFieldList> = {
            get(target, prop) {
                const instance = pivotFieldListRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
            },
        };
        return new Proxy({} as IFMPivotFieldList, handler) as FMPivotFieldListRef;
    });

    useEffect(() => {
        const pivotFieldList = PivotFieldList(containerId, { state, options });
        pivotFieldListRef.current = pivotFieldList;
        return () => {
            pivotFieldListRef.current?.dispose();
            pivotFieldListRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (pivotFieldListRef.current && state) {
            // pivotFieldListRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

FMPivotFieldList.displayName = 'FMPivotFieldList';

export default FMPivotFieldList;
