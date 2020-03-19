import Slider from './Slider';

const initSlider = function initSlider($slider: JQuery, params: ISliderConfig): void {
    const slider = new Slider({
        $slider,
        ...params,
    });
    $slider.data('slider', slider);
};

const COMMANDS = {
    INIT: 'init',
    STEP: 'step',
    VALUE: 'value',
    SHOW_TOOLTIPS: 'showTooltips',
    VIEW_NAME: 'viewName',
    BG_LINE: 'bg-line',
};

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.slider = function pluginMainFunction(
    this: JQuery,
    command: 'init' | 'step' | 'value' | 'showTooltips' | 'viewName' | 'bg-line',
    args: {
        readonly start?: string[] | number[];
        readonly scale?: SliderScale;
        readonly viewName?: SliderViewName;
        readonly showTooltips?: boolean;
        readonly step?: number;
        readonly prettify?: PrettifyFunc;
        readonly showBgLine?: boolean;
    }
    | number
    | string[]
    | number[]
    | boolean
    | 'horizontal'
    | 'vertical'
    = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): JQuery | number | string[] | number[] | boolean | 'horizontal' | 'vertical' | any {
    const slider = this.data('slider') as Slider;

    switch (command) {
        case COMMANDS.INIT:
            if (args === null) {
                throw new TypeError('Configuration object expected.');
            }

            initSlider(this, args as ISliderConfig);
            return this;

        case COMMANDS.SHOW_TOOLTIPS:
            if (args === null) {
                return slider.isShowTooltips;
            }

            if (typeof args !== 'boolean') {
                throw new TypeError('Boolean expected.');
            }

            slider.isShowTooltips = args;
            return this;

        case COMMANDS.STEP:
            if (args === null) {
                return slider.step;
            }

            slider.step = parseInt(args as string, 10);

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

            slider.viewName = args as 'horizontal' | 'vertical';
            return this;

        case COMMANDS.BG_LINE:
            if (args === null) {
                return slider.isShowBgLine;
            }

            slider.isShowBgLine = args as boolean;
            return this;

        default:
            console.error(new Error(`Unknown command ${command}`));
            return this;
    }
};
