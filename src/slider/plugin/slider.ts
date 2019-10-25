import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';
import {SliderModel} from './domain-model/slider-model';

export class Slider implements ISlider {
    readonly _presenter: ISliderPresenter;

    constructor(slider: JQuery, config: SliderConfig) {        
        const view: ISliderView = new SliderView(slider, {
            selectMode: config.selectMode,
            showValue: config.showValue,
            viewName: config.viewName
        });

        const model: ISliderModel = new SliderModel();

        this._presenter = new SliderPresenter(view, model);
    }
}