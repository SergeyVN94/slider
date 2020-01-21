import Slider from './Slider';

const initSlider = function initSliderDomElement($slider: JQuery, params: SliderConfig): void {
    const slider: Slider = new Slider({
        $slider,
        ...params,
    });
    $slider.get()[0].slider = slider;
};

const pluginFunction = function pluginMainFunction(
    this: JQuery,
    command: 'init' | 'step' | 'value' | 'showTooltips',
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
    = null
): JQuery | number | string[] | number[] | boolean {
    const [domElementSlider] = this.get();
    const { slider } = domElementSlider;

    switch (command) {
        case 'init':
            if (args === null) {
                throw new TypeError('Configuration object expected.');
            }

            initSlider(this, args as SliderConfig);
            return this;

        case 'showTooltips':
            if (args === null) {
                return slider.isShowTooltips;
            }

            if (typeof args !== 'boolean') {
                throw new TypeError('Boolean expected.');
            }

            slider.isShowTooltips = args;
            return this;

        case 'step':
            if (args === null) {
                return slider.step;
            }

            if (typeof args !== 'number') {
                throw new TypeError('Expected number.');
            }

            slider.step = args;
            return this;

        case 'value':
            if (args === null) {
                return slider.value;
            }

            slider.value = args as string[] | number[];
            return this;

        default:
            console.error(new Error(`Unknown command ${command}`));
            return this;
    }
};

export default pluginFunction;
