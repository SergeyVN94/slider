import initSlider from '../scripts/initSlider';
import Slider from '../scripts/Slider';
import '../slider.sass';
import DEFAULT_CONFIG from '../scripts/defaultConfig';
import Model from '../scripts/domain-model/Model';

const COMMANDS = {
  INIT: 'init',
  STEP: 'step',
  VALUES: 'values',
  SHOW_TOOLTIPS: 'show-tooltips',
  VIEW_NAME: 'view-name',
  SHOW_BG_LINE: 'show-bg-line',
  CUSTOM_SCALE: 'custom-scale',
  MIN: 'min',
  MAX: 'max',
};

const convertCustomScale = (customScale: unknown): string[] => {
  if (!Array.isArray(customScale)) {
    console.error(Error('The custom scale must be an array.'));
    console.warn('Set to custom scale by default');
    return DEFAULT_CONFIG.customScale;
  }

  return customScale.map((value) => String(value));
};

const convertMinMax = (min: unknown, max: unknown): {
  min: number;
  max: number;
} => {
  const minMax = {
    min: parseInt(String(min), 10),
    max: parseInt(String(max), 10),
  };

  if (Number.isNaN(minMax.min)) {
    if (min !== undefined) console.error(Error('The min must be a number.'));
    console.warn(`The min is set by default ${DEFAULT_CONFIG.min}`);
    minMax.min = DEFAULT_CONFIG.min;
  }

  if (Number.isNaN(minMax.max)) {
    if (max !== undefined) console.error(Error('The max must be a number.'));
    console.warn(`The max is set at least + the default slider range ${DEFAULT_CONFIG.range}.`);
    minMax.max = (minMax.min + DEFAULT_CONFIG.range);
  }

  return minMax;
};

const convertStringValues = (values: unknown, customScale: string[]): string[] => {
  if (values === undefined) return [customScale[0]];

  if (!Array.isArray(values)) {
    console.error(new Error('Values ​​must be an array.'));
    console.warn(`The value set is "${customScale[0]}".`);
    return [customScale[0]];
  }

  return values.map((value) => String(value));
};

const convertNumberValues = (values: unknown, min: number): number[] => {
  if (values === undefined) return [min];

  if (!Array.isArray(values)) {
    console.error(new Error('Values ​​must be an array.'));
    console.warn(`The value set is "${min}".`);
    return [min];
  }

  const isPossibleToConvert = values.every((value) => !Number.isNaN(parseInt(String(value), 10)));

  if (!isPossibleToConvert) {
    console.error(new Error('An array of numbers is expected.'));
    console.warn(`The value set is "${min}".`);
    return [min];
  }

  return values.map((value) => parseInt(String(value), 10));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertConfig = (config: any): ISliderConfig => {
  if (config === null || typeof config !== 'object') {
    return {
      customScale: DEFAULT_CONFIG.customScale,
      step: DEFAULT_CONFIG.step,
      prettify: DEFAULT_CONFIG.prettify,
      values: DEFAULT_CONFIG.values,
      viewName: DEFAULT_CONFIG.viewName,
      tooltips: DEFAULT_CONFIG.tooltips,
      bgLine: DEFAULT_CONFIG.bgLine,
    };
  }

  const {
    customScale,
    min,
    max,
    values,
    prettify = DEFAULT_CONFIG.prettify,
    tooltips = DEFAULT_CONFIG.tooltips,
    bgLine = DEFAULT_CONFIG.bgLine,
    step = DEFAULT_CONFIG.step,
    viewName = DEFAULT_CONFIG.viewName,
  } = config;

  const newConfig: ISliderConfig = {};

  if (customScale) {
    newConfig.customScale = convertCustomScale(customScale);
    newConfig.values = convertStringValues(values, newConfig.customScale);
  } else {
    const minMax = convertMinMax(min, max);
    newConfig.min = minMax.min;
    newConfig.max = minMax.max;
    newConfig.values = convertNumberValues(values, minMax.min);
  }

  newConfig.tooltips = Boolean(tooltips);
  newConfig.bgLine = Boolean(bgLine);

  if (['horizontal', 'vertical'].includes(viewName)) {
    newConfig.viewName = viewName;
  } else {
    console.error(new TypeError('viewName must be "horizontal" or "vertical".'));
    console.warn(`viewName is set by default "${DEFAULT_CONFIG.viewName}".`);
    newConfig.viewName = DEFAULT_CONFIG.viewName;
  }

  newConfig.step = parseInt(String(step), 10);
  if (Number.isNaN(newConfig.step)) {
    newConfig.step = DEFAULT_CONFIG.step;
    console.error(new TypeError('The step must be a number.'));
    console.warn(`Step is set by default "${DEFAULT_CONFIG.step}".`);
  }

  if (typeof prettify !== 'function') {
    newConfig.prettify = DEFAULT_CONFIG.prettify;
    console.error(new TypeError('"prettify" should be a function.'));
    console.warn('"prettify" is set by default.');
  } else {
    newConfig.prettify = prettify;
  }

  return newConfig;
};

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.slider = function pluginMainFunction(
  this: JQuery,
  command: 'init'
  | 'step'
  | 'values'
  | 'show-tooltips'
  | 'view-name'
  | 'show-bg-line'
  | 'custom-scale'
  | 'min'
  | 'max',
  args: unknown = null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const slider = this.data('slider') as Slider;
  const config = (this.data('config') || DEFAULT_CONFIG) as ISliderConfig;

  if (command === COMMANDS.INIT) {
    const _config = args ? convertConfig(args) : DEFAULT_CONFIG;
    const _slider = initSlider(this, _config);

    const resultConfig = _slider.getConfig();
    if (resultConfig.customScale) _config.customScale = resultConfig.customScale;
    if (resultConfig.min) _config.min = resultConfig.min;
    if (resultConfig.max) _config.max = resultConfig.max;
    if (resultConfig.step) _config.step = resultConfig.step;

    this
      .data('config', _config)
      .data('slider', _slider);

    return this;
  }

  if (command === COMMANDS.SHOW_TOOLTIPS) {
    if (args === null) return slider.areTooltipsVisible;

    if (typeof args !== 'boolean') {
      console.error(new TypeError('Boolean expected.'));
      console.warn('areTooltipsVisible cast to boolean.');
    }

    slider.areTooltipsVisible = Boolean(args);
    config.tooltips = slider.areTooltipsVisible;

    return this.data('config', config);
  }

  if (command === COMMANDS.SHOW_BG_LINE) {
    if (args === null) return slider.isBgLineVisible;

    if (typeof args !== 'boolean') {
      console.error(new TypeError('Boolean expected.'));
      console.warn('isBgLineVisible cast to boolean.');
    }

    slider.isBgLineVisible = Boolean(args);
    config.bgLine = slider.isBgLineVisible;

    return this.data('config', config);
  }

  if (command === COMMANDS.VIEW_NAME) {
    if (args === null) return config.viewName;

    if (!['horizontal', 'vertical'].includes(String(args))) {
      console.error(new TypeError('Expected "horizontal" or "vertical".'));
      return this;
    }

    config.viewName = args as ViewName;
    config.values = slider.values;

    return this
      .data('config', config)
      .data('slider', initSlider(this, config));
  }

  if (command === COMMANDS.STEP) {
    if (args === null) return config.step;

    const newStep = parseInt(String(args), 10);
    if (Number.isNaN(newStep)) {
      console.error(new TypeError('A number was expected.'));
      return this;
    }

    const errorCheckingStep = config.customScale
      ? Model.checkStepForCustomScale(newStep, config.customScale)
      : Model.checkStepForMinMax(newStep, config.min, config.max);

    if (errorCheckingStep) {
      console.error(errorCheckingStep);
      return this;
    }

    config.step = newStep;

    return this
      .data('config', config)
      .data('slider', initSlider(this, config));
  }

  if (command === COMMANDS.VALUES) {
    if (args === null) return slider.values;

    if (!Array.isArray(args)) {
      console.error(new Error('The parameter must be an array.'));
      return this;
    }

    if (!config.customScale) {
      const areValuesCorrect = args.every((value) => !Number.isNaN(parseInt(String(value), 10)));

      if (!areValuesCorrect) {
        console.error(new Error('An array of numbers, or strings, is expected.'));
        return this;
      }
    }

    const errorCheckingValues = config.customScale
      ? Model.checkValuesForCustomScale(
        args.map((value) => String(value)),
        config.customScale,
      )
      : Model.checkValuesForMinMax(args, config.min, config.max);

    if (errorCheckingValues) {
      console.error(errorCheckingValues);
      return this;
    }

    if (args.length === slider.values.length) {
      slider.values = args;
      return this;
    }

    config.values = args;

    return this
      .data('config', config)
      .data('slider', initSlider(this, config));
  }

  if (command === COMMANDS.CUSTOM_SCALE) {
    if (args === null) return config.customScale;

    if (!Array.isArray(args)) {
      console.error(new TypeError('The custom scale must be an array.'));
      return this;
    }

    const normalizedCustomScale = args.map((value) => String(value));
    const errorCheckingCustomScale = Model.checkCustomScale(normalizedCustomScale);

    if (errorCheckingCustomScale) {
      console.error(errorCheckingCustomScale);
      return this;
    }

    config.customScale = normalizedCustomScale;

    return this
      .data('config', config)
      .data('slider', initSlider(this, config));
  }

  if (command === COMMANDS.MIN || command === COMMANDS.MAX) {
    const isCommandMin = command === COMMANDS.MIN;

    if (args === null) return (isCommandMin ? config.min : config.max);

    const minOrMax = parseInt(String(args), 10);
    if (Number.isNaN(minOrMax)) {
      console.error(new Error('Args parameter must be number.'));
      return this;
    }

    const errorCheckingMinMax = isCommandMin
      ? Model.checkMinMax(minOrMax, config.max)
      : Model.checkMinMax(config.min, minOrMax);

    if (errorCheckingMinMax) {
      console.error(errorCheckingMinMax);
      return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isCommandMin ? config.min = minOrMax : config.max = minOrMax;

    return this
      .data('slider', initSlider(this, config))
      .data('config', config);
  }

  console.error(new Error(`Unknown command "${command}"`));
  return this;
};
