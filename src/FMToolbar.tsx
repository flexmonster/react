"use client";

import React, { useContext, useEffect, useId, useRef, forwardRef, useImperativeHandle } from 'react';
import { Toolbar, type IFMToolbar, type IFMToolbarOptionsInputParams, type StateInputParams } from '@flexmonster/js';
import { FMStateContext } from './FMStateContext';

export interface FMToolbarRef extends IFMToolbar {
}

export interface FMToolbarProps {
  state?: StateInputParams;
  options?: IFMToolbarOptionsInputParams;
  for?: string;
}

const FMToolbar = forwardRef<FMToolbarRef, FMToolbarProps>(({ state: ownState, options, for: forControl }, ref) => {
    const groupState = useContext(FMStateContext);
    const state = ownState ?? groupState;

    const containerId = `fm-toolbar-${useId()}`;
    const toolbarRef = useRef<IFMToolbar | null>(null);

    useImperativeHandle(ref, () => {
        const methodCache = new Map<string | symbol, (...args: any[]) => any>();

        const handler: ProxyHandler<IFMToolbar> = {
            get(_, prop) {
                const instance = toolbarRef.current;
                if (!instance || !(prop in instance)) return undefined;

                const value = (instance as any)[prop];
                if (typeof value !== 'function') return value;

                if (!methodCache.has(prop)) {
                    methodCache.set(prop, (...args: any[]) =>
                        toolbarRef.current
                            ? (toolbarRef.current as any)[prop]?.apply(toolbarRef.current, args)
                            : undefined
                    );
                }
                return methodCache.get(prop);
            },
        };

        return new Proxy({} as IFMToolbar, handler) as FMToolbarRef;
    }, []);

    useEffect(() => {
        // The standalone `for` attribute takes priority; fall back to `options.for` when it is empty.
        const resolvedOptions = forControl ? { ...options, for: forControl } : options;
        const toolbar = Toolbar(containerId, { state, options: resolvedOptions });
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

    return <div style={{ width: '100%', height: '100%' }} id={containerId} />;
});

FMToolbar.displayName = 'FMToolbar';

export default FMToolbar;
