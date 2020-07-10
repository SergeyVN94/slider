import initSlider from '../scripts/initSlider';
import Slider from '../scripts/Slider';
import '../slider.sass';

interface ISliderConfig {
  readonly start?: string[] | number[];
  readonly scale?: SliderScale;
  readonly viewName?: SliderViewName;
  readonly showTooltips?: boolean;
  readonly step?: number;
  readonly prettify?: PrettifyFunc;
  readonly showBgLine?: boolean;
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

const defaultConfig = {
  scale: [0, 100],
  start: [0],
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
  = null,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const slider = this.data('slider') as Slider;

  switch (command) {
    case COMMANDS.INIT:
      this.data('slider', initSlider({
        $slider: this,
        ...(args || defaultConfig) as ISliderConfig,
      }));
      return this;

    case COMMANDS.SHOW_TOOLTIPS:
      if (args === null) {
        return slider.showTooltips;
      }

      if (typeof args !== 'boolean') {
        throw new TypeError('Boolean expected.');
      }

      slider.showTooltips = Boolean(args);
      return this;

    case COMMANDS.STEP:
      if (args === null) {
        return slider.step;
      }

      slider.step = parseInt(String(args), 10);
      return this;

    case COMMANDS.VALUE:
      if (args === null) {
        return slider.value;
      }

      slider.value = args as string[] | number[];
      return this;

    case COMMANDS.VIEW_NAME:
      if (args === null) {
        return slider.viewName;
      }

      slider.viewName = args as SliderViewName;
      return this;

    case COMMANDS.BG_LINE:
      if (args === null) {
        return slider.showBgLine;
      }

      slider.showBgLine = Boolean(args);
      return this;

    case COMMANDS.SCALE:
      if (args === null) {
        return [...slider.scale];
      }

      slider.scale = args as SliderScale;
      return this;

    default:
      console.error(new Error(`Unknown command ${command}`));
      return this;
  }
};
