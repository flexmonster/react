"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { PivotFilter } from '@flexmonster/flexmonster';

const ReactPivotFilter = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`pivot-filter-container-${Math.random().toString(36).substr(2, 9)}`);
    const pivotFilterRef = useRef(null);

    // Expose the PivotFilter instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get pivotFilter() {
            return pivotFilterRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => pivotFilterRef.current?.refresh(),
        // clear: () => pivotFilterRef.current?.clear(),
        // dispose: () => pivotFilterRef.current?.dispose(),
        // getReport: () => pivotFilterRef.current?.getReport(),
        // setReport: (report) => pivotFilterRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const pivotFilter = PivotFilter(containerId, {
            "state": state,
            ...props
        });

        pivotFilterRef.current = pivotFilter;
        return () => {
            pivotFilterRef.current?.dispose();
            pivotFilterRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (pivotFilterRef.current && state) {
            //pivotFilterRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactPivotFilter.displayName = 'ReactPivotFilter';

export default ReactPivotFilter;