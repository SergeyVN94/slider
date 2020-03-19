import Slider from './Slider';
import View from './view/View';
import Model from './domain-model/Model';
import Presenter from './Presenter';

const initSlider = function initSlider(config: {
    readonly $slider: JQuery;
    readonly start?: string[] | number[];
    readonly scale?: SliderScale;
    readonly viewName?: SliderViewName;
    readonly showTooltips?: boolean;
    readonly step?: number;
    readonly prettify?: PrettifyFunc;
    readonly showBgLine?: boolean;
}): Slider {
    const {
        scale = [0, 100] as CoupleNum,
        step = 1,
        start = [scale[0]] as string[] | number[],
    } = config;

    const view = new View({
        points: start.length,
        ...config,
    });

    const model = new Model({
        start,
        scale,
        step,
    });

    new Presenter(view, model);

    return new Slider(view, model);
};

export default initSlider;
