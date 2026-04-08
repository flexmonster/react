"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Toolbar, type IFMToolbar, type IFMToolbarOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

export interface FMToolbarRef extends IFMToolbar {
}

export interface FMToolbarProps {
  state?: StateInputParams;
  options?: IFMToolbarOptionsInputParams;
}

const FMToolbar = forwardRef<FMToolbarRef, FMToolbarProps>(({ state, options }, ref) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const [containerId] = useState(`toolbar-container-${Math.random().toString(36).substr(2, 9)}`);
    const toolbarRef = useRef<IFMToolbar | null>(null);

    useImperativeHandle(ref, () => {
        const handler: ProxyHandler<IFMToolbar> = {
            get(target, prop) {
                const instance = toolbarRef.current;
                if (instance && prop in instance) {
                    const value = (instance as any)[prop];
                    return typeof value === 'function' 
                        ? (...args: any[]) => value.apply(instance, args) 
                        : value;
                }
                return undefined;
            },
        };
        return new Proxy({} as IFMToolbar, handler) as FMToolbarRef;
    });

    useEffect(() => {
        const toolbar = Toolbar(containerId, { state, options });
        toolbarRef.current = toolbar;
        return () => {
            toolbarRef.current?.dispose();
            toolbarRef.current = null;
        };
    }, [containerId]);

    useEffect(() => {
        if (toolbarRef.current && state) {
            // toolbarRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

FMToolbar.displayName = 'FMToolbar';

export default FMToolbar;
