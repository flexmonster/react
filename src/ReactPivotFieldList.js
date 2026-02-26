"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { PivotFieldList } from '@flexmonster/flexmonster';

const ReactPivotFieldList = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`pivot-field-list-container-${Math.random().toString(36).substr(2, 9)}`);
    const pivotFieldListRef = useRef(null);

    // Expose the PivotFieldList instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get pivotFieldList() {
            return pivotFieldListRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => pivotFieldListRef.current?.refresh(),
        // clear: () => pivotFieldListRef.current?.clear(),
        // dispose: () => pivotFieldListRef.current?.dispose(),
        // getReport: () => pivotFieldListRef.current?.getReport(),
        // setReport: (report) => pivotFieldListRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const pivotFieldList = PivotFieldList(containerId, {
            "state": state,
            ...props
        });

        pivotFieldListRef.current = pivotFieldList;
        return () => {
            pivotFieldListRef.current?.dispose();
            pivotFieldListRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (pivotFieldListRef.current && state) {
            //pivotFieldListRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactPivotFieldList.displayName = 'ReactPivotFieldList';

export default ReactPivotFieldList;