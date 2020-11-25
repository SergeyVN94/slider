import { NormalizedConfig } from './types';

export const DEFAULT_PLUGIN_CONFIG: NormalizedConfig = {
  min: 0,
  max: 100,
  step: 1,
  values: [0, 20, 42],
  bgLine: true,
  tooltips: true,
  viewName: 'horizontal',
};

export const CONFIG = {
  customScale: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  viewName: 'vertical',
  range: 100,
};
