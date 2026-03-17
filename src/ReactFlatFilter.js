"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { FlatFilter } from '@flexmonster/flexmonster';

const ReactFlatFilter = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`flat-filter-container-${Math.random().toString(36).substr(2, 9)}`);
    const flatFilterRef = useRef(null);

    // Expose the FlatFilter instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get flatFilter() {
            return flatFilterRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => flatFilterRef.current?.refresh(),
        // clear: () => flatFilterRef.current?.clear(),
        // dispose: () => flatFilterRef.current?.dispose(),
        // getReport: () => flatFilterRef.current?.getReport(),
        // setReport: (report) => flatFilterRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const flatFilter = FlatFilter(containerId, {
            "state": state,
            ...props
        });

        flatFilterRef.current = flatFilter;
        return () => {
            flatFilterRef.current?.dispose();
            flatFilterRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (flatFilterRef.current && state) {
            //flatFilterRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactFlatFilter.displayName = 'ReactFlatFilter';

export default ReactFlatFilter;