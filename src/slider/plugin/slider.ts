import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';
import {SliderModel} from './domain-model/slider-model';

export class Slider implements ISlider {
    readonly _presenter: ISliderPresenter;
    readonly _model: ISliderModel;

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

        this._model = new SliderModel({
            selectMode: config.selectMode || 'single',
            scale: scale,
            step: !isNaN(config.step) ? Math.round(config.step) : 1
        });

        if (config.start) {
            if (typeof config.start === 'string' || typeof config.start === 'number') {
                this._model.setStateThroughValue(config.start);
            } else {
                if (config.selectMode === 'single') {
                    throw "The slider in single mode cannot be initialized with a pair of values";
                }
                const t: Couple =  config.start as Couple;
                this._model.setStateThroughValues(config.start);
            }
        }

        this._presenter = new SliderPresenter(view, this._model);
    }
}