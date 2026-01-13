"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { FlatFieldList } from '@flexmonster/flexmonster';

const ReactFlatFieldList = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`flat-field-list-container-${Math.random().toString(36).substr(2, 9)}`);
    const flatFieldListRef = useRef(null);

    // Expose the FlatFieldList instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get flatFieldList() {
            return flatFieldListRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => flatFieldListRef.current?.refresh(),
        // clear: () => flatFieldListRef.current?.clear(),
        // dispose: () => flatFieldListRef.current?.dispose(),
        // getReport: () => flatFieldListRef.current?.getReport(),
        // setReport: (report) => flatFieldListRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const flatFieldList = FlatFieldList(containerId, {
            ...props
        });

        flatFieldListRef.current = flatFieldList;
        return () => {
            flatFieldListRef.current?.dispose();
            flatFieldListRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (flatFieldListRef.current && state) {
            //flatFieldListRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactFlatFieldList.displayName = 'ReactFlatFieldList';

export default ReactFlatFieldList;