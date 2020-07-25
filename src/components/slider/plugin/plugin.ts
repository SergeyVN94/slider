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
  MIN_MAX: 'min-max',
};

const convertCustomScale = function convertCustomScale(customScale: string[]): string[] {
  if (!Array.isArray(customScale)) return DEFAULT_CONFIG.customScale;
  return customScale.map((value) => String(value));
};

const convertMinMax = function convertMinMax(min: number, max: number): {
  min: number;
  max: number;
} {
  const minMax = { min, max };

  if (typeof min !== 'number') {
    try {
      minMax.min = parseInt(min, 10);
    } catch (error) {
      minMax.min = DEFAULT_CONFIG.min;
      console.error(new TypeError('The minimum must be a number'));
    }
  }

  if (typeof max !== 'number') {
    try {
      minMax.max = parseInt(max, 10);
    } catch (error) {
      minMax.max = DEFAULT_CONFIG.max;
      console.error(new TypeError('The maximum must be a number'));
    }
  }

  return minMax;
};

const convertValuesForCustomScale = function convertValuesForCustomScale(
  values: string[],
  customScale: string[],
): string[] {
  if (!Array.isArray(values)) {
    console.error(new Error('Values ​​must be an array.'));
    return customScale.slice(0);
  }

  return values.map((value) => String(value));
};

const convertValuesForMinMax = function convertValuesForMinMax(
  values: number[],
  min: number,
): number[] {
  if (!Array.isArray(values)) {
    console.error(new Error('Values ​​must be an array.'));
    return [min];
  }

  const isPossibleToConvert = values.every((value) => {
    try {
      parseInt(String(value), 10);
      return true;
    } catch (error) {
      return false;
    }
  });

  if (!isPossibleToConvert) {
    console.error(new Error('An array of numbers, or strings, is expected, which can be converted to a number.'));
    return [min];
  }

  return values.map((value) => parseInt(String(value), 10));
};

const convertConfig = function convertConfig(config: ISliderConfig): ISliderConfig {
  if (config === null) return DEFAULT_CONFIG;

  const {
    customScale,
    min,
    max,
    values,
    prettify = DEFAULT_CONFIG.prettify,
    tooltips = true,
    bgLine = true,
    step = 1,
    viewName = 'horizontal',
  } = config;

  const newConfig: ISliderConfig = {};

  if (customScale) {
    newConfig.customScale = convertCustomScale(customScale);
    newConfig.values = convertValuesForCustomScale(values as string[], customScale);
  } else {
    const minMax = convertMinMax(min, max);
    newConfig.min = minMax.min;
    newConfig.max = minMax.max;
    newConfig.values = convertValuesForMinMax(values as number[], minMax.min);
  }

  newConfig.tooltips = Boolean(tooltips);
  newConfig.bgLine = Boolean(bgLine);

  if (['horizontal', 'vertical'].includes(viewName)) {
    newConfig.viewName = viewName;
  } else {
    console.error(new TypeError('viewName must be "horizontal" or "vertical".'));
    newConfig.viewName = DEFAULT_CONFIG.viewName;
  }

  if (typeof step !== 'number') {
    try {
      newConfig.step = parseInt(String(step), 10);
    } catch (error) {
      newConfig.step = DEFAULT_CONFIG.step;
      console.error(new TypeError('The step must be a number.'));
    }
  } else newConfig.step = step;

  if (typeof prettify !== 'function') {
    newConfig.prettify = DEFAULT_CONFIG.prettify;
    console.error(new TypeError('prettify should be a function.'));
  } else newConfig.prettify = prettify;

  return newConfig;
};

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.slider = function pluginMainFunction(
  this: JQuery,
  command: 'init' | 'step' | 'values' | 'show-tooltips' | 'view-name' | 'show-bg-line' | 'custom-scale' | 'min-max',
  args: ISliderConfig
  | number
  | boolean
  | string[]
  | number[]
  | ViewName
  = null,
  args2?: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const slider = this.data('slider') as Slider;
  const config = (this.data('config') || DEFAULT_CONFIG) as ISliderConfig;

  if (command === COMMANDS.INIT) {
    const _config = args ? convertConfig(args as ISliderConfig) : DEFAULT_CONFIG;
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
    if (typeof args !== 'boolean') console.error(new TypeError('Boolean expected.'));
    slider.areTooltipsVisible = Boolean(args);

    return this;
  }

  if (command === COMMANDS.SHOW_BG_LINE) {
    if (args === null) return slider.isBgLineVisible;
    if (typeof args !== 'boolean') console.error(new TypeError('Boolean expected.'));
    slider.isBgLineVisible = Boolean(args);

    return this;
  }

  if (command === COMMANDS.VIEW_NAME) {
    if (args === null) return config.viewName;

    if (!['horizontal', 'vertical'].includes(String(args))) {
      console.error(new TypeError('Expected values ​​of "horizontal" or "vertical".'));
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

    try {
      config.step = parseInt(String(args), 10);
    } catch (error) {
      console.error(new TypeError('A number was expected, or a string from which to get a number.'));
      return this;
    }

    if (config.customScale) {
      if (!Model.checkStepForCustomScale(args as number, config.customScale)) return this;
    } else if (!Model.checkStepForMinMax(args as number, config.min, config.max)) return this;

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

    if (config.customScale) {
      if (!Model.checkValuesForCustomScale(
        (args as string[]).map((value) => String(value)),
        config.customScale,
      )) return this;
    } else {
      const isCorrectValues = args.every((value: string | number) => {
        if (typeof value === 'number') return true;
        try {
          parseInt(String(value), 10);
          return true;
        } catch (error) {
          return false;
        }
      });

      if (!isCorrectValues) {
        console.error(new Error('An array of numbers, or strings, is expected, which can be converted to a number.'));
        return this;
      }

      if (!Model.checkValuesForMinMax(args as number[], config.min, config.max)) return this;
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
      console.error(new TypeError('The custom scale must be an array'));
      return this;
    }

    const _customScale = (args as string[]).map((value) => String(value));

    if (!Model.checkCustomScale(_customScale)) return this;

    return this
      .data('config', config)
      .data('slider', initSlider(this, config));
  }

  if (command === COMMANDS.MIN_MAX) {
    if (args === null) return [config.min, config.max];

    let min: number;
    let max: number;

    if (typeof args !== 'number') {
      try {
        min = parseInt(String(args), 10);
      } catch (error) {
        console.error(new Error('Args parameter must be number or convert to number.'));
        return this;
      }
    } else min = args;

    if (typeof args2 !== 'number') {
      try {
        min = parseInt(String(args2), 10);
      } catch (error) {
        console.error(new Error('Args2 parameter must be number or convert to number.'));
        return this;
      }
    } else max = args2;

    if (!Model.checkMinMax(min, max)) return this;

    config.min = min;
    config.max = max;

    return this
      .data('slider', initSlider(this, config))
      .data('config', config);
  }

  console.error(new Error(`Unknown command "${command}"`));
  return this;
};
