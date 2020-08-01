const DEFAULT_CONFIG = {
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
  min: 0,
  max: 100,
  range: 100,
  step: 1,
  values: ['Январь'],
  pointsCount: 1,
  viewName: 'horizontal' as ViewName,
  bgLine: true,
  tooltips: true,
  prettify: (value: string | number): string => String(value),
};

export default DEFAULT_CONFIG;
