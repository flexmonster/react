"use client";

import React from 'react';
import type { StateInputParams } from '@flexmonster/js';

/**
 * Carries the state shared by an <FMGroup> to every Flexmonster component
 * rendered inside it, no matter how deeply it is nested.
 */
export const FMStateContext = React.createContext<StateInputParams | undefined>(undefined);
