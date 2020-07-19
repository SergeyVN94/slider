import initSlider from '../scripts/initSlider';
import Slider from '../scripts/Slider';
import '../slider.sass';

interface ISliderConfig {
  start?: string[] | number[];
  customScale?: string[];
  min?: number;
  max?: number;
  viewName?: ViewName;
  tooltips?: boolean;
  step?: number;
  prettify?: PrettifyFunc;
  bgLine?: boolean;
}

interface IResConfig {
  start?: string[] | number[];
  scale?: [number, number] | string[];
  viewName?: ViewName;
  tooltips?: boolean;
  step?: number;
  prettify?: PrettifyFunc;
  bgLine?: boolean;
}

const COMMANDS = {
  INIT: 'init',
  STEP: 'step',
  VALUE: 'value',
  SHOW_TOOLTIPS: 'show-tooltips',
  VIEW_NAME: 'view-name',
  SHOW_BG_LINE: 'show-bg-line',
  SCALE: 'scale',
};

const DEFAULT_CONFIG = {
  scale: [0, 100] as [number, number],
  start: [0],
  step: 1,
  viewName: 'horizontal' as ViewName,
  bgLine: true,
  tooltips: true,
  prettify: (value: string | number): string => String(value),
};

const normalizeScale = function normalizeScale(
  customScale: string[],
  min: number,
  max: number,
): SliderScale {
  const scaleRange: number[] = [];

  if (typeof min !== 'number') {
    try {
      scaleRange[0] = parseInt(min, 10);
    } catch (error) {
      scaleRange[0] = 0;
      console.error(new TypeError('The minimum scale value must be a number'));
    }
  } else scaleRange[0] = min;

  if (typeof max !== 'number') {
    try {
      scaleRange[1] = parseInt(max, 10);
    } catch (error) {
      scaleRange[1] = scaleRange[0] + 100;
      console.error(new TypeError('The maximum scale value must be a number'));
    }
  } else scaleRange[1] = max;

  const useCustomScale = Array.isArray(customScale) && customScale.length;

  if (useCustomScale) {
    return customScale.map((item) => String(item));
  }

  return scaleRange as [number, number];
};

const normalizeStartValues = function normalizeStartValues(
  values: number[] | string[],
  scale: SliderScale,
): number[] | string[] {
  // if (typeof values === 'string' || typeof values === 'number') return [values];

  if (!Array.isArray(values)) {
    console.error(new Error('Starting values ​​must be an array.'));
    return [scale[0]] as string[] | number[];
  }

  if (values.length === 0) {
    console.error('The array of start values ​​must not be empty.');
    return [scale[0]] as string[] | number[];
  }

  const isScaleAreNumberRange = typeof scale[0] === 'number';
  if (!isScaleAreNumberRange) return (values as string[]).map((value) => String(value));

  const isCorrectValues = values.every((value: number | string) => {
    try {
      parseInt(String(value), 10);
    } catch (error) {
      return false;
    }

    return true;
  });

  if (!isCorrectValues) {
    console.error(new Error(''));
    return [scale[0]] as string[] | number[];
  }

  return (values as number[]).map((value) => parseInt(String(value), 10));
};

const normalizeConfig = function normalizeConfig(config: ISliderConfig): IResConfig {
  if (config === null) return DEFAULT_CONFIG;

  const {
    customScale,
    min,
    max,
    start,
    prettify = DEFAULT_CONFIG.prettify,
    tooltips = true,
    bgLine = true,
    step = 1,
    viewName = 'horizontal',
  } = config;

  const newConfig: IResConfig = {};

  newConfig.scale = normalizeScale(customScale, min, max);
  newConfig.start = normalizeStartValues(start, newConfig.scale);
  newConfig.tooltips = Boolean(tooltips);
  newConfig.bgLine = Boolean(bgLine);

  if (['horizontal', 'vertical'].includes(viewName)) {
    newConfig.viewName = viewName;
  } else {
    console.error(new TypeError('viewName must be "horizontal" or "vertical".'));
    newConfig.viewName = 'horizontal';
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

  let _start: number[] | string[] = [];

  if (!Array.isArray(start)) _start[0] = start;
  else _start = start;

  return newConfig;
};

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.slider = function pluginMainFunction(
  this: JQuery,
  command: 'init' | 'step' | 'value' | 'show-tooltips' | 'view-name' | 'show-bg-line' | 'scale',
  args: ISliderConfig
  | number
  | string[]
  | number[]
  | boolean
  | ViewName
  | SliderScale
  = null, // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const slider = this.data('slider') as Slider;
  const config = (this.data('config') || DEFAULT_CONFIG) as IResConfig;

  if (command === COMMANDS.INIT) {
    this
      .data('slider', initSlider(this, normalizeConfig(args as ISliderConfig)))
      .data('config', normalizeConfig(args as ISliderConfig));

    return this;
  }

  if (command === COMMANDS.SHOW_TOOLTIPS) {
    if (args === null) return slider.areTooltipsVisible;
    if (typeof args !== 'boolean') console.error(new TypeError('Boolean expected.'));
    slider.areTooltipsVisible = Boolean(args);

    return this;
  }

  if (command === COMMANDS.SHOW_BG_LINE) {
    if (args === null) return slider.areBgLineVisible;
    if (typeof args !== 'boolean') console.error(new TypeError('Boolean expected.'));
    slider.areBgLineVisible = Boolean(args);

    return this;
  }

  if (command === COMMANDS.VIEW_NAME) {
    if (args === null) return config.viewName;

    if (['horizontal', 'vertical'].includes(String(args))) {
      config.viewName = args as ViewName;
      return this
        .data('slider', initSlider(this, config))
        .data('config', config);
    }

    console.error(new TypeError('Expected values ​​of "horizontal" or "vertical".'));
    return this;
  }

  if (command === COMMANDS.STEP) {
    if (args === null) return config.step;

    try {
      config.step = parseInt(String(args), 10);
    } catch (error) {
      console.error(new TypeError('A number was expected, or a string from which to get a number.'));
      return this;
    }

    return this
      .data('slider', initSlider(this, config))
      .data('config', config);
  }

  if (command === COMMANDS.VALUE) {
    if (args === null) return slider.values;

    if (!Array.isArray(args)) {
      console.error(new Error('The parameter must be an array.'));
      return this;
    }

    if ((args as string[] | number[]).length === 0) {
      console.error(new Error('The array must be not empty.'));
      return this;
    }

    let values: string[] | number[];

    if (typeof config.scale[0] === 'string') {
      values = (args as string[]).map((value) => String(value));
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
      if (isCorrectValues) {
        values = (args as number[]).map((value: number) => parseInt(String(value), 10));
      }
    }

    if (slider.values.length === values.length) {
      slider.values = values;
      return this;
    }

    config.start = values;

    return this
      .data('slider', initSlider(this, config))
      .data('config', config);
  }

  if (command === COMMANDS.SCALE) {
    if (args === null) {
      return config.scale;
    }

    if (!Array.isArray(args)) {
      console.error(new TypeError('The scale must be an array'));
      return this;
    }

    if (args.length < 2) {
      console.error(new Error('The scale array must be at least 2 elements.'));
      return this;
    }

    if (args.length === 2) {
      try {
        const min = parseInt(String(args[0]), 10);
        const max = parseInt(String(args[1]), 10);
        config.scale = [min, max];
      } catch (error) {
        config.scale = (args as string[]).map((item) => String(item));
      }
    } else {
      config.scale = (args as string[]).map((item) => String(item));
    }

    return this
      .data('slider', initSlider(this, config))
      .data('config', config);
  }

  console.error(new Error(`Unknown command ${command}`));
  return this;
};
