"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { PivotTable } from '@flexmonster/flexmonster';

const ReactPivotTable = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`pivot-table-container-${Math.random().toString(36).substr(2, 9)}`);
    const pivotTableRef = useRef(null);

    // Expose the PivotTable instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get pivotTable() {
            return pivotTableRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => pivotTableRef.current?.refresh(),
        // clear: () => pivotTableRef.current?.clear(),
        // dispose: () => pivotTableRef.current?.dispose(),
        // getReport: () => pivotTableRef.current?.getReport(),
        // setReport: (report) => pivotTableRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const pivotTable = PivotTable(containerId, {
            ...props
        });

        pivotTableRef.current = pivotTable;

        return () => {
            pivotTableRef.current?.dispose();
            pivotTableRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (pivotTableRef.current && state) {
            //pivotTableRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactPivotTable.displayName = 'ReactPivotTable';

export default ReactPivotTable;