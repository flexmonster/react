"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { Flexmonster } from '@flexmonster/flexmonster';

const ReactFlexmonster = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`flexmonster-container-${Math.random().toString(36).substr(2, 9)}`);
    const flexmonsterRef = useRef(null);

    // Expose the Flexmonster instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get flexmonster() {
            return flexmonsterRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => flexmonsterRef.current?.refresh(),
        // clear: () => flexmonsterRef.current?.clear(),
        // dispose: () => flexmonsterRef.current?.dispose(),
        // getReport: () => flexmonsterRef.current?.getReport(),
        // setReport: (report) => flexmonsterRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const flexmonster = Flexmonster(containerId, {
            "state": state,
            ...props
        });

        flexmonsterRef.current = flexmonster;

        return () => {
            flexmonsterRef.current?.dispose();
            flexmonsterRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (flexmonsterRef.current && state) {
            //flexmonsterRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactFlexmonster.displayName = 'ReactFlexmonster';

// ReactFlexmonster.propTypes = {
    
// };

export default ReactFlexmonster;