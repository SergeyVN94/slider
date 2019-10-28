import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';
import {SliderModel} from './domain-model/slider-model';

export class Slider implements ISlider {
    readonly _presenter: ISliderPresenter;

    constructor(slider: JQuery, config: SliderConfig) {        
        const view: ISliderView = new SliderView(slider, {
            selectMode: config.selectMode,
            showValue: config.showValue,
            viewName: config.viewName,
            prettify: config.prettify
        });

        let scale: SliderScale;
        if (!config.scale) {
            scale = {
                type: 'range',
                value: [0, 100]
            }
        } else {
            scale = config.scale;
        }

        const model: ISliderModel = new SliderModel({
            selectMode: config.selectMode || 'single',
            scale: scale,
            step: !isNaN(config.step) ? Math.round(config.step) : 1
        });

        this._presenter = new SliderPresenter(view, model);
    }
}