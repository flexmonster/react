import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, use } from 'react';
//import ReactDOM from 'react-dom';
//import Props from 'prop-types';
import { Toolbar } from '@flexmonster/flexmonster';

const ReactToolbar = forwardRef(({ state, ...props }, ref) => {
    if (typeof window === 'undefined') {
        return null; // Prevents SSR by returning null on the server
    }

    const [containerId] = useState(`toolbar-container-${Math.random().toString(36).substr(2, 9)}`);
    const toolbarRef = useRef(null);


    // Expose the Toolbar instance API through the ref
    useImperativeHandle(ref, () => ({
        // Expose getters that return the current component instance
        get toolbar() {
            return toolbarRef.current;
        },
            
        // You can also expose specific methods directly:
        // refresh: () => toolbarRef.current?.refresh(),
        // clear: () => toolbarRef.current?.clear(),
        // dispose: () => toolbarRef.current?.dispose(),
        // getReport: () => toolbarRef.current?.getReport(),
        // setReport: (report) => toolbarRef.current?.setReport(report),
        // Add any other methods you want to expose
    }));

    useEffect(() => {
        // Only create the instance once when component mounts
        const toolbar = Toolbar(containerId, {
            "state": state,
            ...props
        });

        toolbarRef.current = toolbar;

        return () => {
            toolbarRef.current?.dispose();
            toolbarRef.current = null;
        };
    }, [containerId]); // Only depend on containerId (which never changes)

    useEffect(() => {
        if (toolbarRef.current && state) {
            //toolbarRef.current.setReport({ state });
        }
    }, [state]);

    return <div id={containerId} />;
});

ReactToolbar.displayName = 'ReactToolbar';

export default ReactToolbar;