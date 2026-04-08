"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Flexmonster, type IFMComposite, type IFMCompositeOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMCompositeRef extends IFMComposite {
}

export interface FMCompositeProps {
  state?: StateInputParams;
  options?: IFMCompositeOptionsInputParams;
}

const FMComposite = forwardRef<FMCompositeRef, FMCompositeProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`flexmonster-container-${Math.random().toString(36).substr(2, 9)}`);
    const flexmonsterRef = useRef<IFMComposite | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMComposite> = {
            get(target, prop) {
                const instance = flexmonsterRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
            },
        };
        return new Proxy({} as IFMComposite, handler) as FMCompositeRef;
    });

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

    return <div id={containerId} />;
});

FMComposite.displayName = 'FMComposite';

export default FMComposite;
