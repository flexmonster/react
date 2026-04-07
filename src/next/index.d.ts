import { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

export interface FlexmonsterRef {
  flexmonster: any;
}

export interface FlexmonsterProps {
  state?: any;
  [key: string]: any;
}

export const ReactFlexmonster: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
export const ReactPivotTable: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
export const ReactToolbar: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
export const ReactFlatFieldList: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
export const ReactFlatTable: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
export const ReactPivotFieldList: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
export const ReactFilter: ForwardRefExoticComponent<FlexmonsterProps & RefAttributes<FlexmonsterRef>>;
