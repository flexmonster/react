"use client";

import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Filter, type IFMFilter, type IFilterOptionsInputParams, type StateInputParams } from '@flexmonster/js';
import { FMStateContext } from './FMStateContext';

export interface FMFilterRef extends IFMFilter {
}

export interface FMFilterProps {
    fieldName?: string;
    state?: StateInputParams;
    options?: IFilterOptionsInputParams;
}

const FMFilter = forwardRef<FMFilterRef, FMFilterProps>(({ state: ownState, options, fieldName }, ref) => {
    const groupState = useContext(FMStateContext);
    const state = ownState ?? groupState;

    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`fm-filter-${Math.random().toString(36).substr(2, 9)}`);
    const filterRef = useRef<IFMFilter | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMFilter> = {
            get(_, prop) {
                const instance = filterRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        filterRef.current
                            ? (filterRef.current as any)[prop]?.apply(filterRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
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

    return <div style={{ width: '100%', height: '100%' }} id={containerId} />;
});

FMFilter.displayName = 'FMFilter';

export default FMFilter;
