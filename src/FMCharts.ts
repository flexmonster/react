import {
  ECharts,
  type IFMEChartsInputParams,
  type IFMECharts,
} from '@flexmonster/js';

export const FMCharts = {
  ECharts(params: IFMEChartsInputParams): IFMECharts {
    return ECharts(params);
  },
};
