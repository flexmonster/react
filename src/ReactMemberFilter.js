"use client";

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { MemberFilter } from '@flexmonster/flexmonster';

const ReactMemberFilter = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`member-filter-container-${Math.random().toString(36).substr(2, 9)}`);
    const memberFilterRef = useRef(null);

    // Expose the MemberFilter instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get memberFilter() {
            return memberFilterRef.current;
        },
        
        // You can also expose specific methods directly:
        // refresh: () => memberFilterRef.current?.refresh(),
        // clear: () => memberFilterRef.current?.clear(),
        // dispose: () => memberFilterRef.current?.dispose(),
        // getReport: () => memberFilterRef.current?.getReport(),
        // setReport: (report) => memberFilterRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const memberFilter = MemberFilter(containerId, {
            "state": state,
            ...props
        });

        memberFilterRef.current = memberFilter;
        return () => {
            memberFilterRef.current?.dispose();
            memberFilterRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    // Handle state/props updates separately without recreating the instance
    // Here we can update component based on new props 
    useEffect(() => {
        if (memberFilterRef.current && state) {
            //memberFilterRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactMemberFilter.displayName = 'ReactMemberFilter';

export default ReactMemberFilter;