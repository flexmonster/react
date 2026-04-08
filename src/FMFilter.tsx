"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Filter, type IFMFilter, type IFMFilterInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMFilterRef extends IFMFilter {
}

export interface FMFilterProps {
  state?: StateInputParams;
  options?: IFMFilterInputParams;
  fieldName?: string;
}

const FMFilter = forwardRef<FMFilterRef, FMFilterProps>(({ state, options, fieldName }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`filter-container-${Math.random().toString(36).substr(2, 9)}`);
    const filterRef = useRef<IFMFilter | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMFilter> = {
            get(target, prop) {
                const instance = filterRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
            },
        };
        return new Proxy({} as IFMFilter, handler) as FMFilterRef;
    });

    useEffect(() => {
        const filter = Filter(containerId, { state, options, fieldName: fieldName! });
        filterRef.current = filter;
        return () => {
            filterRef.current?.dispose();
            filterRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (filterRef.current && state) {
            // filterRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

FMFilter.displayName = 'FMFilter';

export default FMFilter;
