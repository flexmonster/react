"use client";

import React, { useContext, useEffect, useId, useRef, forwardRef, useImperativeHandle } from 'react';
import { PivotFieldList, type IFMPivotFieldList, type IFMPivotFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/js';
import { FMStateContext } from './FMStateContext';

export interface FMPivotFieldListRef extends IFMPivotFieldList {
}

export interface FMPivotFieldListProps {
  state?: StateInputParams;
  options?: IFMPivotFieldListOptionsInputParams;
}

const FMPivotFieldList = forwardRef<FMPivotFieldListRef, FMPivotFieldListProps>(({ state: ownState, options }, ref) => {
    const groupState = useContext(FMStateContext);
    const state = ownState ?? groupState;

    const containerId = `fm-pivot-field-list-${useId()}`;
    const pivotFieldListRef = useRef<IFMPivotFieldList | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMPivotFieldList> = {
            get(_, prop) {
                const instance = pivotFieldListRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        pivotFieldListRef.current
                            ? (pivotFieldListRef.current as any)[prop]?.apply(pivotFieldListRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
            },
        };

        return new Proxy({} as IFMPivotFieldList, handler) as FMPivotFieldListRef;
    }, []);

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

    return <div style={{ width: '100%', height: '100%' }} id={containerId} />;
});

FMPivotFieldList.displayName = 'FMPivotFieldList';

export default FMPivotFieldList;
