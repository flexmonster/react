"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { FlatTable } from '@flexmonster/flexmonster';

const ReactFlatTable = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`flat-table-container-${Math.random().toString(36).substr(2, 9)}`);
    const flatTableRef = useRef(null);

    // Expose the FlatTable instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get flatTable() {
            return flatTableRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => flatTableRef.current?.refresh(),
        // clear: () => flatTableRef.current?.clear(),
        // dispose: () => flatTableRef.current?.dispose(),
        // getReport: () => flatTableRef.current?.getReport(),
        // setReport: (report) => flatTableRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const flatTable = FlatTable(containerId, {
            ...props
        });

        flatTableRef.current = flatTable;
        return () => {
            flatTableRef.current?.dispose();
            flatTableRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (flatTableRef.current && state) {
            //flatTableRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactFlatTable.displayName = 'ReactFlatTable';

export default ReactFlatTable;