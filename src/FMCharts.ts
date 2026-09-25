import {
  ECharts,
  type IFMEChartsInputParams,
  type IFMECharts,
} from '@flexmonster/js';

export const FMCharts = {
  ECharts(chart: object, params: IFMEChartsInputParams): IFMECharts {
    return ECharts(chart, params);
  },
};
