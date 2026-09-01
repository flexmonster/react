import {
  eCharts,
  type IFMEChartsInputParams,
  type IFMECharts,
} from '@flexmonster/js';

export const FMCharts = {
  eCharts(params: IFMEChartsInputParams): IFMECharts {
    return eCharts(params);
  },
};
