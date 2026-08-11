"use client";

import React from 'react';
import type { StateInputParams } from '@flexmonster/js';
import { FMStateContext } from './FMStateContext';

export interface FMGroupProps {
    state?: StateInputParams;
    children?: React.ReactNode;
}

const FMGroup: React.FC<FMGroupProps> = ({ state, children }) => (
    <FMStateContext.Provider value={state}>{children}</FMStateContext.Provider>
);

FMGroup.displayName = 'FMGroup';

export default FMGroup;
