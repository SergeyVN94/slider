import initSlider from '../scripts/initSlider';
import Slider from '../scripts/Slider';
import '../slider.sass';

interface ISliderConfig {
  start?: string[] | number[];
  customScale?: string[];
  min?: number;
  max?: number;
  viewName?: SliderViewName;
  showTooltips?: boolean;
  step?: number;
  prettify?: PrettifyFunc;
  showBgLine?: boolean;
}

interface IResConfig {
  start?: string[] | number[];
  scale?: [number, number] | string[];
  viewName?: SliderViewName;
  showTooltips?: boolean;
  step?: number;
  prettify?: PrettifyFunc;
  showBgLine?: boolean;
}

const COMMANDS = {
  INIT: 'init',
  STEP: 'step',
  VALUE: 'value',
  SHOW_TOOLTIPS: 'show-tooltips',
  VIEW_NAME: 'view-name',
  BG_LINE: 'show-bg-line',
  SCALE: 'scale',
};

const DEFAULT_CONFIG = {
  scale: [0, 100] as [number, number],
  start: [0],
  step: 1,
  viewName: 'horizontal' as SliderViewName,
  showBgLine: true,
  showTooltips: true,
  prettify: (value: string | number): string => String(value),
};

const normalizeConfig = function normalizeConfig(config: ISliderConfig): IResConfig {
  if (config === null) return DEFAULT_CONFIG;

  const newConfig: IResConfig = {};

  const {
    customScale,
    min = 0,
    max = (min + 1) * 100,
    start = [min],
    prettify = DEFAULT_CONFIG.prettify,
    showTooltips = true,
    showBgLine = true,
    step = 1,
    viewName = 'horizontal',
  } = config;

  newConfig.showTooltips = Boolean(showTooltips);
  newConfig.showBgLine = Boolean(showBgLine);

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
      scaleRange[1] = 0;
      console.error(new TypeError('The maximum scale value must be a number'));
    }
  } else scaleRange[1] = max;

  const useCustomScale = Array.isArray(customScale) && customScale.length;

  if (useCustomScale) {
    newConfig.scale = customScale.map((item) => String(item));
  } else {
    newConfig.scale = scaleRange as [number, number];
  }

  let _start: number[] | string[] = [];

  if (!Array.isArray(start)) _start[0] = start;
  else _start = start;

  newConfig.start = [];

  if (_start.length === 0) {
    // eslint-disable-next-line max-len
    newConfig.start = useCustomScale ? [customScale[0]] as string[] : [newConfig.scale[0]] as number[];
  } else if (useCustomScale) {
    _start.forEach((item: string | number) => {
      (newConfig.start as string[]).push(String(item));
    });
  } else {
    let itIsPossibleToNormalize = true;

    _start.forEach((item: string | number) => {
      try {
        (newConfig.start as number[]).push(parseInt(String(item), 10));
      } catch (error) {
        console.error(new TypeError('The start value must be a number.'));
        itIsPossibleToNormalize = false;
      }
    });

    if (!itIsPossibleToNormalize) newConfig.start = [newConfig.scale[0] as number];
  }

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
  | SliderViewName
  | SliderScale
  = null, // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const slider = this.data('slider') as Slider;
  const config = (this.data('config') || DEFAULT_CONFIG) as ISliderConfig;

  switch (command) {
    case COMMANDS.INIT:
      this
        .data('slider', initSlider(this, normalizeConfig(args as ISliderConfig)))
        .data('config', normalizeConfig(args as ISliderConfig));

      return this;

    case COMMANDS.STEP:
      if (args === null) return config.step;

      try {
        config.step = parseInt(String(args), 10);
      } catch (error) {
        console.error(new TypeError('A number was expected, or a string from which to get a number.'));
        return this;
      }

      if (config.step < 1) config.step = 1;

      this
        .data('slider', initSlider(this, config))
        .data('config', config);

      return this;

    case COMMANDS.VALUE:
      if (args === null) return slider.values;

      if (slider.values.length === (args as string[] | number[]).length) {
        slider.values = (args as string[] | number[]);
        return this;
      }

      if ((args as string[] | number[]).length === 0) {
        console.error(new Error('The array must not be empty.'));
      } else {
        config.start = (args as string[] | number[]);
      }

      return this
        .data('slider', initSlider(this, config))
        .data('config', config);

    case COMMANDS.VIEW_NAME:
      if (args === null) return config.viewName;

      if (['horizontal', 'vertical'].includes(String(args))) {
        config.viewName = args as SliderViewName;
      } else {
        console.error(new TypeError('Expected values ​​of "horizontal" or "vertical".'));
        return this;
      }

      return this
        .data('slider', initSlider(this, config))
        .data('config', config);

    case COMMANDS.SCALE:
      if (args === null) {
        return (config.customScale ? config.customScale : [config.min, config.max]);
      }

      if (!Array.isArray(args)) {
        console.error(new TypeError('The scale must be an array'));
        return this;
      }

      if (args.length === 2) {
        config.min = parseInt(String(args[0]), 10);
        config.max = parseInt(String(args[1]), 10);
      } else {
        config.customScale = (args as string[]).map((item) => String(item));
      }

      this
        .data('slider', initSlider(this, config))
        .data('config', config);

      return this;

    case COMMANDS.BG_LINE:
      if (args === null) return slider.showBgLine;
      if (typeof args !== 'boolean') console.error(new TypeError('Boolean expected.'));
      slider.showBgLine = Boolean(args);

      return this;

    case COMMANDS.SHOW_TOOLTIPS:
      if (args === null) return slider.showTooltips;
      if (typeof args !== 'boolean') console.error(new TypeError('Boolean expected.'));
      slider.showTooltips = Boolean(args);

      return this;

    default:
      console.error(new Error(`Unknown command ${command}`));
      return this;
  }
};
