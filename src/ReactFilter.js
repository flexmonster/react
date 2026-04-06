"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { Filter } from '@flexmonster/flexmonster';

const ReactFilter = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`filter-container-${Math.random().toString(36).substr(2, 9)}`);
    const filterRef = useRef(null);

    // Expose the Filter instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get filter() {
            return filterRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => filterRef.current?.refresh(),
        // clear: () => filterRef.current?.clear(),
        // dispose: () => filterRef.current?.dispose(),
        // getReport: () => filterRef.current?.getReport(),
        // setReport: (report) => filterRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const filter = Filter(containerId, {
            "state": state,
            ...props
        });

        filterRef.current = filter;
        return () => {
            filterRef.current?.dispose();
            filterRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (filterRef.current && state) {
            //filterRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactFilter.displayName = 'ReactFilter';

export default ReactFilter;