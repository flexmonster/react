"use client";

import React from 'react';
import type { StateInputParams } from '@flexmonster/js';

export interface FMGroupProps {
    state?: StateInputParams;
    children?: React.ReactNode;
}

const FMGroup: React.FC<FMGroupProps> = ({ state, children }) => {
    const childrenWithState = React.Children.map(children, (child) => {
        if (!React.isValidElement(child) || typeof child.type === 'string') {
            return child;
        }
        const childProps = child.props as { state?: StateInputParams };
        return React.cloneElement(
            child as React.ReactElement<{ state?: StateInputParams }>,
            { state: childProps.state ?? state },
        );
    });

    return <>{childrenWithState}</>;
};

FMGroup.displayName = 'FMGroup';

export default FMGroup;
