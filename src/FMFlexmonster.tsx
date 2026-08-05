"use client";

import React, { useEffect, useId, useRef, forwardRef, useImperativeHandle } from 'react';
import { Flexmonster, IFMFlexmonsterInputParams, type IFMFlexmonster, type IFMFlexmonsterOptionsInputParams, type StateInputParams } from '@flexmonster/js';

export interface FMFlexmonsterRef extends IFMFlexmonster {
}

export interface FMFlexmonsterProps extends IFMFlexmonsterInputParams {
  state?: StateInputParams;
  options?: IFMFlexmonsterOptionsInputParams;
}

const FMFlexmonster = forwardRef<FMFlexmonsterRef, FMFlexmonsterProps>(({ state, options }, ref) => {
    const containerId = `fm-flexmonster-${useId()}`;
    const flexmonsterRef = useRef<IFMFlexmonster | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMFlexmonster> = {
            get(_, prop) {
                const instance = flexmonsterRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        flexmonsterRef.current
                            ? (flexmonsterRef.current as any)[prop]?.apply(flexmonsterRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
            },
        };

        return new Proxy({} as IFMFlexmonster, handler) as FMFlexmonsterRef;
    }, []);

    useEffect(() => {
        const flexmonster = Flexmonster(containerId, { state, options });
        flexmonsterRef.current = flexmonster;
        return () => {
            flexmonsterRef.current?.dispose();
            flexmonsterRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (flexmonsterRef.current && state) {
            // flexmonsterRef.current.setReport({ state });
        }
    }, [state]);

    return <div style={{ width: '100%', height: '100%' }} id={containerId} />;
});

FMFlexmonster.displayName = 'FMFlexmonster';

export default FMFlexmonster;
