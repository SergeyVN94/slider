import $ from 'jquery';
import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';

export class Slider implements ISlider {
    _setting: SliderSetting;
    readonly _presenter: ISliderPresenter;

    constructor(slider: JQuery, config: SliderConfig) {
        this._setting = {};
        
        const view: ISliderView = new SliderView(slider, {
            selectMode: config.selectMode,
            showValue: config.showValue,
            viewName: config.viewName
        });
        this._presenter = new SliderPresenter(view);
    }
}